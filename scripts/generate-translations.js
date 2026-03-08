/**
 * Batch-translate manga pages using Google Generative AI (Gemini).
 *
 * Usage:
 *   GEMINI_API_KEY=xxx node scripts/generate-translations.js
 *
 * Options (env vars):
 *   GEMINI_API_KEY   - required
 *   GEMINI_MODEL     - model name (default: gemini-2.0-flash)
 *   TARGET_LANGS     - comma-separated language codes (default: en)
 *   SERIES           - series id to translate (default: all series found in public/manga/)
 *   CHAPTERS         - comma-separated chapter numbers (default: all)
 *   CONCURRENCY      - parallel requests (default: 2, keep low to avoid rate limits)
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const MANGA_DIR = path.join(ROOT, "public", "manga");

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("Error: GEMINI_API_KEY environment variable is required.");
  process.exit(1);
}

const MODEL_NAME = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const TARGET_LANGS = (process.env.TARGET_LANGS || "en").split(",").map((s) => s.trim());
const SERIES_FILTER = process.env.SERIES || "";
const CHAPTERS_FILTER = process.env.CHAPTERS ? process.env.CHAPTERS.split(",").map(Number) : [];
const CONCURRENCY = parseInt(process.env.CONCURRENCY || "2", 10);

const genAI = new GoogleGenerativeAI(API_KEY);

async function translatePage(imagePath, targetLang) {
  const buffer = fs.readFileSync(imagePath);
  const base64Data = buffer.toString("base64");
  const ext = path.extname(imagePath).toLowerCase();
  const mimeType = ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : "image/png";

  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const prompt = `You are a professional manga/comics translator.
Look at this manga page image carefully. Extract ALL text (dialogue, narration, sound effects) visible on the page in reading order, then translate into ${targetLang}.

Return JSON with:
- "source_text": the original text extracted (as a single string, lines separated by newlines)
- "translated_text": the full translation into ${targetLang} (as a single string, lines separated by newlines)

If there is no text on the page, return: {"source_text":"","translated_text":""}
Keep translations natural and concise.`;

  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          { text: prompt },
          { inlineData: { data: base64Data, mimeType } },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.3,
      responseMimeType: "application/json",
    },
  });

  const text = result.response.text();
  try {
    const parsed = JSON.parse(text);
    return {
      source: parsed.source_text || "",
      translated: parsed.translated_text || "",
    };
  } catch {
    return { source: "", translated: text };
  }
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function processChapter(seriesId, chapterNum, targetLang) {
  const chDir = path.join(MANGA_DIR, seriesId, `ch${chapterNum}`);
  if (!fs.existsSync(chDir)) return null;

  const outputPath = path.join(chDir, "translations.json");
  let existing = {};
  if (fs.existsSync(outputPath)) {
    try {
      existing = JSON.parse(fs.readFileSync(outputPath, "utf8"));
    } catch {}
  }

  if (!existing[targetLang]) existing[targetLang] = {};

  // Find all page images
  const files = fs.readdirSync(chDir)
    .filter((f) => /^\d+\.(png|jpg|jpeg)$/i.test(f))
    .sort((a, b) => parseInt(a) - parseInt(b));

  const pagesToTranslate = files.filter((f) => {
    const pageNum = String(parseInt(f));
    return !existing[targetLang][pageNum];
  });

  if (pagesToTranslate.length === 0) {
    console.log(`  [${seriesId}/ch${chapterNum}/${targetLang}] Already complete (${files.length} pages)`);
    return existing;
  }

  console.log(`  [${seriesId}/ch${chapterNum}/${targetLang}] Translating ${pagesToTranslate.length}/${files.length} pages...`);

  // Process in batches
  for (let i = 0; i < pagesToTranslate.length; i += CONCURRENCY) {
    const batch = pagesToTranslate.slice(i, i + CONCURRENCY);
    const results = await Promise.all(
      batch.map(async (file) => {
        const pageNum = String(parseInt(file));
        const imagePath = path.join(chDir, file);
        try {
          const result = await translatePage(imagePath, targetLang);
          console.log(`    Page ${pageNum}: OK`);
          return { pageNum, result };
        } catch (err) {
          console.error(`    Page ${pageNum}: FAILED - ${err.message}`);
          return { pageNum, result: null };
        }
      })
    );

    for (const { pageNum, result } of results) {
      if (result) {
        existing[targetLang][pageNum] = {
          source: result.source,
          text: result.translated,
        };
      }
    }

    // Save after each batch (resume-friendly)
    fs.writeFileSync(outputPath, JSON.stringify(existing, null, 2), "utf8");

    // Rate limit pause
    if (i + CONCURRENCY < pagesToTranslate.length) {
      await sleep(1500);
    }
  }

  return existing;
}

async function main() {
  console.log(`Model: ${MODEL_NAME}`);
  console.log(`Languages: ${TARGET_LANGS.join(", ")}`);
  console.log("");

  // Discover series
  const seriesDirs = fs.readdirSync(MANGA_DIR).filter((d) => {
    if (SERIES_FILTER && d !== SERIES_FILTER) return false;
    return fs.statSync(path.join(MANGA_DIR, d)).isDirectory();
  });

  for (const seriesId of seriesDirs) {
    console.log(`Series: ${seriesId}`);
    const seriesDir = path.join(MANGA_DIR, seriesId);
    const chapters = fs.readdirSync(seriesDir)
      .filter((d) => /^ch\d+$/.test(d))
      .map((d) => parseInt(d.replace("ch", "")))
      .sort((a, b) => a - b);

    const filteredChapters = CHAPTERS_FILTER.length > 0
      ? chapters.filter((n) => CHAPTERS_FILTER.includes(n))
      : chapters;

    for (const chNum of filteredChapters) {
      for (const lang of TARGET_LANGS) {
        await processChapter(seriesId, chNum, lang);
      }
    }
  }

  console.log("\nDone!");
}

main().catch(console.error);
