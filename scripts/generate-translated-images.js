/**
 * Generate translated manga page images using Gemini's image generation.
 * Sends the original manga page to Gemini and asks it to generate a new
 * version with all Japanese text replaced by English translations.
 *
 * Usage:
 *   GEMINI_API_KEY=xxx node scripts/generate-translated-images.js
 *
 * Options (env vars):
 *   GEMINI_API_KEY   - required
 *   GEMINI_MODEL     - model name (default: gemini-2.0-flash-preview-image-generation)
 *   TARGET_LANG      - language code (default: en)
 *   SERIES           - series id (default: all)
 *   CHAPTERS         - comma-separated chapter numbers (default: all)
 *   PAGES            - comma-separated page numbers (default: all)
 *   FORCE            - set to "true" to regenerate existing files
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const MANGA_DIR = path.join(ROOT, "public", "manga");

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("Error: GEMINI_API_KEY is required.");
  process.exit(1);
}

const MODEL_NAME = process.env.GEMINI_MODEL || "gemini-3.1-flash-image-preview";
const TARGET_LANG = process.env.TARGET_LANG || "en";
const SERIES_FILTER = process.env.SERIES || "";
const CHAPTERS_FILTER = process.env.CHAPTERS ? process.env.CHAPTERS.split(",").map(Number) : [];
const PAGES_FILTER = process.env.PAGES ? process.env.PAGES.split(",").map(Number) : [];
const FORCE = process.env.FORCE === "true";

const API_BASE = "https://generativelanguage.googleapis.com/v1beta";

async function generateTranslatedPage(imagePath, outputPath) {
  const buffer = fs.readFileSync(imagePath);
  const base64Data = buffer.toString("base64");
  const ext = path.extname(imagePath).toLowerCase();
  const mimeType = ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : "image/png";

  const prompt = `Edit this manga page image: replace ALL Japanese text with ${TARGET_LANG} translations.

MOST IMPORTANT RULE - DO NOT VIOLATE:
All English text MUST be written HORIZONTALLY (left-to-right). NEVER write English text vertically or rotated. Even if the original Japanese text is vertical, the English replacement MUST be horizontal. Rotate and reshape speech bubbles and narration boxes as needed to fit horizontal text.

Other rules:
- Replace ALL Japanese text (dialogue, narration, sound effects, titles) with natural ${TARGET_LANG} translations
- Reshape tall/narrow speech bubbles into wider/shorter ones to fit horizontal English text
- Keep the same art, layout, colors, and style - only change text and bubble shapes
- Text must fit naturally inside speech bubbles and text boxes
- Use appropriate font style: bold for dialogue, italic for narration, impact style for sound effects
- Erase the original Japanese text completely
- The output image must be the same dimensions as the input
- Do NOT change the artwork beyond text and bubble adjustments`;

  const requestBody = {
    contents: [
      {
        parts: [
          { text: prompt },
          { inlineData: { data: base64Data, mimeType } },
        ],
      },
    ],
    generationConfig: {
      responseModalities: ["IMAGE", "TEXT"],
      temperature: 0.2,
    },
  };

  const url = `${API_BASE}/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`API error ${response.status}: ${errText.substring(0, 300)}`);
  }

  const data = await response.json();

  // Extract generated image from response
  const candidates = data.candidates || [];
  for (const candidate of candidates) {
    const parts = candidate.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData) {
        const imgBuffer = Buffer.from(part.inlineData.data, "base64");
        fs.writeFileSync(outputPath, imgBuffer);
        return { success: true, hasImage: true };
      }
    }
  }

  // No image in response - check for text response
  const textParts = candidates[0]?.content?.parts?.filter((p) => p.text) || [];
  const responseText = textParts.map((p) => p.text).join(" ");
  console.error(`    No image generated. Response: ${responseText.substring(0, 200)}`);
  return { success: false, hasImage: false };
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function processChapter(seriesId, chapterNum) {
  const chDir = path.join(MANGA_DIR, seriesId, `ch${chapterNum}`);
  if (!fs.existsSync(chDir)) return;

  const files = fs.readdirSync(chDir)
    .filter((f) => /^\d+\.(png|jpg|jpeg)$/i.test(f) && !f.includes("_"))
    .sort((a, b) => parseInt(a) - parseInt(b));

  const pagesToProcess = PAGES_FILTER.length > 0
    ? files.filter((f) => PAGES_FILTER.includes(parseInt(f)))
    : files;

  const skipped = [];
  const toProcess = [];

  for (const file of pagesToProcess) {
    const pageNum = parseInt(file);
    const outputName = `${pageNum}_${TARGET_LANG}.png`;
    const outputPath = path.join(chDir, outputName);
    if (!FORCE && fs.existsSync(outputPath)) {
      skipped.push(pageNum);
    } else {
      toProcess.push({ file, pageNum, outputPath });
    }
  }

  if (skipped.length > 0) {
    console.log(`  [${seriesId}/ch${chapterNum}] Skipping ${skipped.length} already translated pages`);
  }

  if (toProcess.length === 0) {
    console.log(`  [${seriesId}/ch${chapterNum}] All ${files.length} pages done`);
    return;
  }

  console.log(`  [${seriesId}/ch${chapterNum}] Processing ${toProcess.length}/${files.length} pages...`);

  for (const { file, pageNum, outputPath } of toProcess) {
    const imagePath = path.join(chDir, file);
    try {
      const result = await generateTranslatedPage(imagePath, outputPath);
      const status = result.hasImage ? "OK" : "no image";
      console.log(`    Page ${pageNum}: ${status}`);
    } catch (err) {
      console.error(`    Page ${pageNum}: FAILED - ${err.message}`);
    }
    // Rate limit - image generation is heavier
    await sleep(3000);
  }
}

async function main() {
  console.log(`Model: ${MODEL_NAME}`);
  console.log(`Target: ${TARGET_LANG}`);
  console.log("");

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
      await processChapter(seriesId, chNum);
    }
  }

  console.log("\nDone!");
}

main().catch(console.error);
