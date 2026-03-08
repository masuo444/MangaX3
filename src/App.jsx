import React, { useState, useEffect } from "react";
import {
  Play, Plus, Info, Search, Home, MonitorPlay, User, ChevronLeft, ChevronRight,
  X, Heart, Share2, Crown, Globe, Settings, Upload, Wand2, DollarSign,
  Briefcase, Smile, Link as LinkIcon, AlertCircle, FileText, Palette,
  FileCheck, Mail, Languages, Lock, Sparkles, Check, Trophy, Handshake, Building,
  ThumbsUp, MessageCircle, Gift, Clock, Bell, Download, Loader2, Coins, Calendar,
  Users, PenTool, Folder, Cpu, Rocket, Coffee, CheckCircle,
} from "lucide-react";

// ==========================================
// 🎨 デザイン (CSS)
// ==========================================
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500&family=Noto+Serif+JP:wght@700&family=Playfair+Display:wght@700&family=Inter:wght@400;500&display=swap');

:root {
  --primary-red: #e50914;
  --bg-black: #141414;
  --bg-dark: #181818;
  --bg-card: #2f2f2f;
  --text-white: #ffffff;
  --text-gray: #b3b3b3;
  
  --jump-bg: #0a0a0a;
  --jump-text: #e8e8e8;
  --jump-gray: #888888;
  --jump-light-gray: #1a1a1a;
  --jump-accent: #e60012;
  --jump-border: rgba(255,255,255,0.08);

  --header-height: 68px;
  --safe-area-bottom: env(safe-area-inset-bottom);
}

* { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }

body {
  margin: 0; padding: 0;
  background-color: var(--bg-black);
  color: var(--text-white);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

.hidden { display: none !important; }
.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.gap-1 { gap: 0.25rem; }
.gap-2 { gap: 0.5rem; }
.gap-4 { gap: 1rem; }
.w-full { width: 100%; }
.h-full { height: 100%; }
.text-center { text-align: center; }
.font-bold { font-weight: bold; }
.relative { position: relative; }
.absolute { position: absolute; }
.overflow-hidden { overflow: hidden; }
.cursor-pointer { cursor: pointer; }

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes revealUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
@keyframes revealScale { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
@keyframes pulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(229,9,20,0.5); } 50% { box-shadow: 0 0 0 12px rgba(229,9,20,0); } }
@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
@keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
.animate-fade-in { animation: fadeIn 0.4s ease-out; }
.animate-slide-up { animation: slideUp 0.3s ease-out; }
.animate-spin { animation: spin 1s linear infinite; }
.reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1); }
.reveal.visible { opacity: 1; transform: translateY(0); }
.reveal-delay-1 { transition-delay: 0.1s; }
.reveal-delay-2 { transition-delay: 0.2s; }
.reveal-delay-3 { transition-delay: 0.3s; }
.cta-pulse { animation: pulse 2s ease-in-out infinite; }
.shimmer-text {
  background: linear-gradient(90deg, #fff 0%, #ffd700 25%, #fff 50%, #ffd700 75%, #fff 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 3s linear infinite;
}

.service-section {
  margin: 3rem 4% 5rem;
  padding: 2rem;
  border-radius: 16px;
  background: radial-gradient(circle at 20% 20%, rgba(229,9,20,0.08), transparent 40%), radial-gradient(circle at 80% 0%, rgba(0,255,200,0.08), transparent 40%), #0f0f0f;
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 20px 60px rgba(0,0,0,0.45);
  color: #fff;
}
.service-grid { display: grid; gap: 1.2rem; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
.service-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 12px;
  padding: 1rem;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.compare-table { display: grid; gap: 0.75rem; }
.compare-row {
  display: grid;
  grid-template-columns: 1.05fr 1fr 1fr;
  gap: 0.6rem;
  padding: 0.9rem 1rem;
  border-radius: 12px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
}
.compare-row-head { background: rgba(255,255,255,0.06); font-weight: 800; }
.compare-title { font-weight: 800; color: #fff; }
.compare-general { color: #cfcfcf; line-height: 1.5; }
.compare-fomus { color: #f4f7ff; line-height: 1.5; }
.compare-note-highlight { color: #8be5ff; font-weight: 800; }
@media (max-width: 720px) {
  .compare-row { grid-template-columns: 1fr; }
}
.comp-section { background: radial-gradient(circle at 20% 20%, rgba(255,190,120,0.08), transparent 40%), radial-gradient(circle at 80% 10%, rgba(80,200,255,0.12), transparent 45%), rgba(10,10,10,0.7); border: 1px solid rgba(255,255,255,0.08); border-radius: 18px; padding: 1.6rem; box-shadow: 0 16px 40px rgba(0,0,0,0.4); }
.comp-header h2 { margin: 0 0 0.4rem; font-size: 1.95rem; font-weight: 850; letter-spacing: 0.02em; }
.comp-header p { margin: 0; color: #cfcfcf; line-height: 1.6; }
.comp-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.1rem; margin-top: 1.1rem; padding: 0.6rem; border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; background: linear-gradient(90deg, rgba(255,190,120,0.08), rgba(80,200,255,0.08)); }
.comp-col { border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 1.1rem; position: relative; overflow: hidden; backdrop-filter: blur(4px); }
.comp-col-trad { background: linear-gradient(160deg, rgba(58,34,12,0.9), rgba(90,56,20,0.75)); box-shadow: inset 0 0 0 1px rgba(255,205,140,0.08); }
.comp-col-fomus { background: linear-gradient(160deg, rgba(12,32,68,0.9), rgba(10,70,110,0.78)); box-shadow: inset 0 0 0 1px rgba(120,210,255,0.1); border-color: rgba(120,210,255,0.2); }
.comp-col-title { margin: 0; font-size: 1.3rem; font-weight: 850; }
.comp-col-sub { margin: 0.1rem 0 0.7rem; color: #dcdcdc; line-height: 1.55; }
.comp-row { display: grid; grid-template-columns: auto 1fr; gap: 0.7rem; align-items: start; padding: 0.7rem 0; border-top: 1px solid rgba(255,255,255,0.08); }
.comp-row:first-of-type { border-top: none; }
.comp-col-trad .comp-icon { background: rgba(255,200,120,0.15); color: #ffdca8; box-shadow: 0 6px 16px rgba(0,0,0,0.35); }
.comp-col-fomus .comp-icon { background: rgba(80,200,255,0.18); color: #b7e9ff; box-shadow: 0 6px 16px rgba(0,0,0,0.35); }
.comp-icon { width: 42px; height: 42px; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; }
.comp-main-text { font-weight: 800; color: #fff; }
.comp-sub-text { color: #d0d0d0; font-size: 0.95rem; line-height: 1.5; }
.comp-badge { position: absolute; top: 12px; right: 12px; background: linear-gradient(135deg, #0f172a, #12375f); color: #8be5ff; font-weight: 800; padding: 0.35rem 0.8rem; border-radius: 999px; border: 1px solid rgba(255,255,255,0.12); box-shadow: 0 8px 18px rgba(0,0,0,0.3); }
.comp-badge-secondary { top: 44px; }
.flow-page { background: #0b0b0b; min-height: 100vh; padding: 5rem 6% 4rem; }
.flow-hero-grid { display: grid; gap: 1.2rem; padding-bottom: 1rem; }
.flow-grid { padding: 0 4%; display: grid; gap: 1.2rem; }
@media (max-width: 768px) {
  .flow-page { padding: 4rem 7% 4.5rem; }
  .flow-hero-grid { gap: 1.4rem; }
  .flow-grid { gap: 1.6rem; padding: 0; }
  .service-section { margin: 2.2rem 0 3rem; padding: 1.6rem; }
  .comp-section { padding: 1.4rem; }
  .comp-container { padding: 0.8rem; }
  .service-grid { gap: 1rem; }
}

.feature-section { background: none; border: none; border-radius: 0; padding: 0 0 1.5rem; box-shadow: none; }
.feature-grid { display: grid; gap: 0.75rem 1rem; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
.feature-card { background: none; border: none; border-radius: 0; padding: 0.3rem 0; box-shadow: none; }
.feature-card strong { font-size: 1.05rem; display: inline-block; margin-bottom: 0.25rem; }
.tag-chip { display: inline-flex; padding: 0.25rem 0.65rem; border-radius: 999px; background: rgba(255,255,255,0.1); color: #e8e8e8; font-size: 0.9rem; letter-spacing: 0.01em; }
.accent-heading { letter-spacing: 0.08em; color: #9ae6ff; font-weight: 700; font-size: 0.95rem; }
.section-title-hero { font-size: 1.9rem; font-weight: 850; margin: 0.2rem 0 0.4rem; }
.service-cta {
  margin-top: 1.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: linear-gradient(135deg, #e50914, #ff6b6b);
  color: white;
  border: none;
  border-radius: 999px;
  padding: 0.85rem 1.4rem;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 12px 30px rgba(229,9,20,0.35);
}

/* =========================
   Story LP (Story-to-Comic)
   ========================= */
.story-lp {
  background: #0A0A0A;
  color: #FFFFFF;
  min-height: 100vh;
  padding: 0 0 120px;
}
.story-lp a { color: inherit; text-decoration: none; }
.story-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}
.story-section {
  margin: 0 auto 180px;
}
.story-header {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 72px;
  background: rgba(10,10,10,0.92);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #1f1f1f;
  z-index: 100;
}
.story-header-inner {
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
}
.story-nav {
  display: flex;
  align-items: center;
  gap: 18px;
  font-family: 'Inter', 'Noto Sans JP', sans-serif;
  font-size: 15px;
}
.story-nav a { color: #e5e5e5; }
.story-lang {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #B8B8B8;
  font-size: 14px;
}
.story-header-cta {
  margin-left: 20px;
  padding: 10px 18px;
  border-radius: 999px;
  border: 1px solid #C6A667;
  background: #C6A667;
  color: #0A0A0A;
  font-weight: 700;
  cursor: pointer;
  font-family: 'Noto Sans JP', 'Inter', sans-serif;
}
.story-hero {
  text-align: center;
  padding: 240px 0 220px;
  position: relative;
}
.story-kicker {
  font-family: 'Playfair Display', 'Noto Serif JP', serif;
  font-size: 18px;
  letter-spacing: 0.08em;
  color: #C6A667;
  margin-bottom: 12px;
}
.story-h1 {
  font-family: 'Noto Serif JP', serif;
  font-size: clamp(36px, 6vw, 64px);
  line-height: 1.05;
  white-space: nowrap;
  margin: 0 0 20px;
}
.story-subcopy {
  font-family: 'Noto Sans JP', 'Inter', sans-serif;
  font-size: 18px;
  line-height: 1.8;
  color: #B8B8B8;
  max-width: 760px;
  margin: 0 auto 32px;
}
.story-hero-visual {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% 20%, rgba(198,166,103,0.12), transparent 45%), radial-gradient(circle at 80% 70%, rgba(90,120,150,0.08), transparent 45%);
  opacity: 0.9;
  pointer-events: none;
}
.story-cta-group {
  display: inline-flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}
.story-cta {
  font-family: 'Noto Sans JP', 'Inter', sans-serif;
  font-weight: 700;
  border-radius: 999px;
  padding: 16px 32px;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid #C6A667;
  transition: all 0.2s ease;
}
.story-cta.primary {
  background: #C6A667;
  color: #0A0A0A;
}
.story-cta.primary:hover { background: #b29757; }
.story-cta.secondary {
  background: transparent;
  color: #C6A667;
}
.story-cta.secondary:hover { background: rgba(198,166,103,0.12); }
.story-meta {
  margin-top: 18px;
  color: #B8B8B8;
  font-family: 'Inter', 'Noto Sans JP', sans-serif;
  font-size: 14px;
  letter-spacing: 0.04em;
}
.story-lang-row {
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
.story-lang-pill {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #7F7F7F;
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.story-back {
  position: absolute;
  top: 24px;
  left: 24px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: #151515;
  color: #FFFFFF;
  border: 1px solid #2a2a2a;
  border-radius: 999px;
  cursor: pointer;
  font-family: 'Inter', 'Noto Sans JP', sans-serif;
}

.story-section-title {
  font-family: 'Noto Serif JP', serif;
  font-size: 36px;
  line-height: 1.3;
  margin: 0 0 24px;
}
.story-section-desc {
  font-family: 'Noto Sans JP', 'Inter', sans-serif;
  color: #B8B8B8;
  font-size: 18px;
  line-height: 1.7;
  margin: 0 0 32px;
}
.story-value-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 18px;
}
.story-value-item {
  position: relative;
  display: flex;
  gap: 14px;
  align-items: flex-start;
  font-family: 'Noto Sans JP', 'Inter', sans-serif;
  padding: 18px 16px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(20,20,20,0.92), rgba(28,28,28,0.9));
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 12px 26px rgba(0,0,0,0.3);
  overflow: hidden;
}
.story-value-item::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 16% 18%, rgba(255,255,255,0.06), transparent 45%);
  opacity: 0.8;
}
.story-value-item[data-tone="amber"] { border-color: rgba(255,200,120,0.25); box-shadow: 0 12px 26px rgba(255,200,120,0.12); }
.story-value-item[data-tone="cyan"] { border-color: rgba(120,210,255,0.25); box-shadow: 0 12px 26px rgba(120,210,255,0.12); }
.story-value-item[data-tone="violet"] { border-color: rgba(190,170,255,0.25); box-shadow: 0 12px 26px rgba(190,170,255,0.12); }
.story-value-body { position: relative; z-index: 1; }
.story-value-icon {
  position: relative;
  z-index: 1;
  width: 54px;
  height: 54px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  color: #fff;
  flex-shrink: 0;
  box-shadow: 0 12px 28px rgba(0,0,0,0.3);
}
.story-value-icon::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 32% 30%, rgba(255,255,255,0.2), transparent 50%);
}
.story-value-icon[data-tone="amber"] { background: linear-gradient(135deg, #2b1d0d, #c28b29); color: #ffe7b4; }
.story-value-icon[data-tone="cyan"] { background: linear-gradient(135deg, #0f2736, #1e8fb8); color: #c8f1ff; }
.story-value-icon[data-tone="violet"] { background: linear-gradient(135deg, #1d1633, #5c4bc4); color: #e5deff; }
.story-value-label {
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #c6c6c6;
  margin-bottom: 4px;
  font-family: 'Inter', sans-serif;
}
.story-value-title {
  font-size: 20px;
  font-weight: 800;
  margin: 0 0 6px;
  color: #fff;
}
.story-value-text {
  margin: 0;
  color: #B8B8B8;
  font-size: 15px;
  line-height: 1.6;
}
@media (max-width: 720px) {
  .story-value-grid { grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
  .story-value-item { padding: 16px 14px; gap: 12px; }
  .story-value-title { font-size: 18px; }
  .story-value-text { font-size: 14px; }
}
.story-strength-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  position: relative;
}
.story-strength-grid::before {
  content: "";
  position: absolute;
  inset: -8% 6%;
  background: radial-gradient(circle at 25% 20%, rgba(255,220,170,0.08), transparent 35%), radial-gradient(circle at 70% 70%, rgba(120,200,255,0.08), transparent 35%);
  filter: blur(10px);
  z-index: 0;
}
.story-strength-card {
  position: relative;
  z-index: 1;
  display: flex;
  gap: 14px;
  align-items: center;
  padding: 18px 16px;
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(18,18,18,0.9), rgba(26,26,26,0.92));
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 14px 28px rgba(0,0,0,0.35);
  overflow: hidden;
}
.story-strength-card[data-tone="amber"] { border-color: rgba(255,200,120,0.22); box-shadow: 0 14px 28px rgba(255,200,120,0.1); }
.story-strength-card[data-tone="cyan"] { border-color: rgba(120,210,255,0.22); box-shadow: 0 14px 28px rgba(120,210,255,0.1); }
.story-strength-card[data-tone="violet"] { border-color: rgba(190,170,255,0.22); box-shadow: 0 14px 28px rgba(190,170,255,0.1); }
.story-strength-card[data-tone="pink"] { border-color: rgba(255,170,210,0.22); box-shadow: 0 14px 28px rgba(255,170,210,0.1); }
.story-strength-card::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 12% 22%, rgba(255,255,255,0.06), transparent 45%);
  opacity: 0.8;
}
.story-strength-icon {
  position: relative;
  width: 52px;
  height: 52px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  color: #fff;
  box-shadow: 0 12px 22px rgba(0,0,0,0.4);
  flex-shrink: 0;
}
.story-strength-icon::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 32% 30%, rgba(255,255,255,0.18), transparent 55%);
}
.story-strength-icon[data-tone="amber"] { background: linear-gradient(135deg, #2b1d0d, #c28b29); color: #ffe7b4; }
.story-strength-icon[data-tone="cyan"] { background: linear-gradient(135deg, #0f2736, #1e8fb8); color: #c8f1ff; }
.story-strength-icon[data-tone="violet"] { background: linear-gradient(135deg, #1d1633, #5c4bc4); color: #e5deff; }
.story-strength-icon[data-tone="pink"] { background: linear-gradient(135deg, #2b1628, #b44b87); color: #ffd5f1; }
.story-strength-body { position: relative; z-index: 1; }
.story-strength-title {
  font-family: 'Noto Serif JP', serif;
  font-size: 18px;
  font-weight: 800;
  margin: 0 0 6px;
  color: #fff;
}
.story-strength-text {
  font-family: 'Noto Sans JP', 'Inter', sans-serif;
  font-size: 14px;
  color: #cfd3d9;
  margin: 0;
  line-height: 1.6;
}
@media (max-width: 720px) {
  .story-strength-card { padding: 16px 14px; }
  .story-strength-title { font-size: 16px; }
  .story-strength-text { font-size: 13px; }
  .story-use-grid { grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
  .story-card-row { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
}

.story-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}
.story-step {
  position: relative;
  padding: 18px 16px 16px;
  border-radius: 16px;
  background: linear-gradient(140deg, rgba(255,215,141,0.08), rgba(120,140,255,0.05));
  border: 1px solid rgba(255,255,255,0.08);
  overflow: hidden;
  box-shadow: 0 16px 28px rgba(0,0,0,0.25);
}
.story-step::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 20% 20%, rgba(255,255,255,0.03), transparent 35%),
              radial-gradient(circle at 80% 60%, rgba(120,210,255,0.06), transparent 35%);
  z-index: 0;
}
.story-step-body {
  position: relative;
  z-index: 1;
  display: flex;
  gap: 12px;
  align-items: flex-start;
}
.story-step-figure {
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  border-radius: 16px;
  padding: 6px;
  position: relative;
}
.story-step-figure::after {
  content: "";
  position: absolute;
  inset: 6px;
  border-radius: 12px;
  background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.16), transparent 55%);
  filter: blur(1px);
}
.story-step-illustration {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  display: grid;
  place-items: center;
  position: relative;
  color: #fff;
  box-shadow: 0 10px 24px rgba(0,0,0,0.35);
}
.story-step-illustration[data-tone="amber"] { background: linear-gradient(135deg, #261c0b, #b8860b); color: #ffe4a3; }
.story-step-illustration[data-tone="cyan"] { background: linear-gradient(135deg, #0f2a3a, #0b6d8c); color: #a5e9ff; }
.story-step-illustration[data-tone="pink"] { background: linear-gradient(135deg, #2c0f28, #9a3b74); color: #ffd3f0; }
.story-step-illustration[data-tone="violet"] { background: linear-gradient(135deg, #1b1238, #4a3b94); color: #d9d6ff; }
.story-step-illustration[data-tone="green"] { background: linear-gradient(135deg, #0f2b20, #2f7f53); color: #c4ffd9; }
.story-step-illustration[data-tone="orange"] { background: linear-gradient(135deg, #2c1a0f, #b45d1a); color: #ffd9b0; }
.story-step-illustration .story-step-spark {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255,255,255,0.35);
  box-shadow: 0 0 0 6px rgba(255,255,255,0.1), 0 0 18px rgba(255,255,255,0.5);
}
.story-step-label {
  font-family: 'Inter', 'Noto Sans JP', sans-serif;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #cfcfcf;
  margin-bottom: 4px;
}
.story-step-title {
  font-family: 'Noto Serif JP', serif;
  font-size: 18px;
  margin: 0 0 6px;
}
.story-step-caption {
  font-family: 'Noto Sans JP', 'Inter', sans-serif;
  font-size: 14px;
  color: #B8B8B8;
  line-height: 1.6;
  margin: 0;
}

.story-use-grid {
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  position: relative;
}
.story-use-grid::before {
  content: "";
  position: absolute;
  inset: -10% 0;
  background: radial-gradient(circle at 20% 20%, rgba(120,210,255,0.07), transparent 30%), radial-gradient(circle at 80% 40%, rgba(255,190,120,0.06), transparent 30%);
  filter: blur(8px);
  z-index: 0;
}
.story-card {
  position: relative;
  z-index: 1;
  background: linear-gradient(150deg, rgba(20,20,20,0.95), rgba(28,28,28,0.92));
  border-radius: 16px;
  padding: 28px;
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 14px 32px rgba(0,0,0,0.35);
  overflow: hidden;
}
.story-card::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 18% 18%, rgba(255,255,255,0.05), transparent 55%);
  opacity: 0.7;
}
.story-card[data-tone="amber"] { border-color: rgba(255,200,120,0.28); box-shadow: 0 14px 32px rgba(255,200,120,0.12); }
.story-card[data-tone="pink"] { border-color: rgba(255,170,210,0.3); box-shadow: 0 14px 32px rgba(255,170,210,0.12); }
.story-card[data-tone="cyan"] { border-color: rgba(120,210,255,0.3); box-shadow: 0 14px 32px rgba(120,210,255,0.12); }
.story-card[data-tone="violet"] { border-color: rgba(190,170,255,0.28); box-shadow: 0 14px 32px rgba(190,170,255,0.12); }
.story-card-row {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 14px;
}


.story-card-top {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  position: relative;
  z-index: 1;
}
.story-card h3 {
  font-family: 'Noto Serif JP', serif;
  font-size: 22px;
  margin: 0 0 4px;
}
.story-card-sub {
  margin: 0 0 12px;
  color: #bfc2c7;
  font-family: 'Noto Sans JP', 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.6;
}
.story-card-eyebrow {
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #c6c6c6;
  margin-bottom: 6px;
  font-family: 'Inter', sans-serif;
}
.story-card-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  color: #fff;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  box-shadow: 0 12px 28px rgba(0,0,0,0.3);
}
.story-card-icon::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.22), transparent 50%);
}
.story-card-icon[data-tone="amber"] { background: linear-gradient(135deg, #2b1d0d, #c28b29); color: #ffe7b4; }
.story-card-icon[data-tone="pink"] { background: linear-gradient(135deg, #2b1628, #b44b87); color: #ffd5f1; }
.story-card-icon[data-tone="cyan"] { background: linear-gradient(135deg, #0f2736, #1e8fb8); color: #c8f1ff; }
.story-card-icon[data-tone="violet"] { background: linear-gradient(135deg, #1d1633, #5c4bc4); color: #e5deff; }

.story-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
  position: relative;
  z-index: 1;
}
.story-tag {
  background: rgba(255,255,255,0.08);
  border-radius: 999px;
  padding: 8px 14px;
  font-family: 'Noto Sans JP', 'Inter', sans-serif;
  font-size: 13px;
  color: #FFFFFF;
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 8px 18px rgba(0,0,0,0.25);
}

  .story-comparison-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 18px;
  }
.story-compare-col {
  border-radius: 12px;
  overflow: hidden;
}
.story-compare-trad {
  background: #2A1E14;
  color: #FFFFFF;
}
.story-compare-fomus {
  background: linear-gradient(135deg, #0A0A0A, #151515);
  border: 1px solid rgba(198,166,103,0.3);
}
.story-compare-head {
  padding: 20px 28px 10px;
  font-family: 'Playfair Display', 'Noto Serif JP', serif;
  font-size: 22px;
  letter-spacing: 0.02em;
}
.story-compare-row {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 12px;
  padding: 14px 28px;
  border-top: 1px solid rgba(255,255,255,0.06);
  align-items: center;
  font-family: 'Noto Sans JP', 'Inter', sans-serif;
}
.story-compare-label { color: #B8B8B8; font-size: 15px; }
.story-compare-value { font-size: 18px; color: #FFFFFF; }
.story-compare-value.gold { color: #C6A667; font-weight: 700; }

.story-pricing {
  background: #151515;
  border-radius: 12px;
  padding: 48px;
  border: 1px solid #1f1f1f;
}
.story-price-title {
  font-family: 'Noto Serif JP', serif;
  font-size: 24px;
  margin: 0 0 12px;
}
.story-price-amount {
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  color: #C6A667;
  margin: 0 0 18px;
}
.story-bullet {
  font-family: 'Noto Sans JP', 'Inter', sans-serif;
  color: #B8B8B8;
  font-size: 16px;
  line-height: 1.7;
  margin: 6px 0;
}
.story-option-list { margin-top: 14px; padding-top: 14px; border-top: 1px solid #2a2a2a; }

.story-faq-list { display: flex; flex-direction: column; gap: 12px; }
.story-faq-item {
  background: #151515;
  border-radius: 10px;
  border: 1px solid #1f1f1f;
  overflow: hidden;
}
.story-faq-question {
  font-family: 'Noto Sans JP', 'Inter', sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 18px;
  cursor: pointer;
  color: #FFFFFF;
}
.story-faq-answer {
  padding: 0 18px 16px;
  color: #B8B8B8;
  font-family: 'Noto Sans JP', 'Inter', sans-serif;
  font-size: 15px;
  line-height: 1.6;
  border-top: 1px solid #7F7F7F;
}

.story-application {
  text-align: center;
  padding: 200px 0;
}
.story-floating-cta {
  position: fixed;
  right: 16px;
  bottom: 20px;
  z-index: 90;
  display: none;
}
.story-footer {
  background: #0A0A0A;
  border-top: 1px solid #1f1f1f;
  padding: 40px 0 60px;
}
.story-footer-links {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  color: #B8B8B8;
  font-family: 'Inter', 'Noto Sans JP', sans-serif;
  font-size: 14px;
}
.story-logo-img { height: 26px; vertical-align: middle; margin-right: 6px; }
.story-logo-img-lg { height: 34px; vertical-align: middle; margin-right: 10px; }

/* =========================
   KUKU Sponsor Page
   ========================= */
.kuku-sponsor {
  background: radial-gradient(circle at 20% 20%, rgba(198,166,103,0.06), transparent 45%), #090909;
  color: #fff;
  min-height: 100vh;
  padding: 0 0 120px;
}
.kuku-container { max-width: 1080px; margin: 0 auto; padding: 0 24px; }
.kuku-hero { padding: 140px 0 80px; display: grid; gap: 24px; align-items: center; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
.kuku-hero-card { background: linear-gradient(135deg, #111, #0d0d0d); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; padding: 28px; position: relative; overflow: hidden; }
.kuku-hero-accent { font-family: 'Playfair Display', serif; color: #C6A667; letter-spacing: 0.08em; font-size: 16px; margin-bottom: 10px; }
.kuku-hero-brand { display: inline-flex; align-items: center; gap: 10px; margin-bottom: 6px; }
.kuku-hero h1 { font-family: 'Noto Serif JP', serif; font-size: 38px; margin: 0 0 16px; line-height: 1.3; }
.kuku-hero p { margin: 0 0 16px; color: #cfcfcf; line-height: 1.7; font-family: 'Noto Sans JP', sans-serif; }
.kuku-hero-meta { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 8px; }
.kuku-cover { width: 100%; aspect-ratio: 3 / 4; border-radius: 14px; border: 1px solid rgba(255,255,255,0.08); background: #151515 url('/assets/kuku-cover.jpg') center/cover no-repeat; box-shadow: 0 14px 40px rgba(0,0,0,0.5); }
.kuku-pill { display: inline-flex; padding: 8px 12px; border-radius: 999px; background: rgba(198,166,103,0.15); color: #C6A667; font-weight: 700; font-family: 'Inter', sans-serif; font-size: 13px; }
.kuku-cta-row { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 16px; }
.kuku-cta {
  padding: 14px 22px;
  border-radius: 999px;
  border: 1px solid #C6A667;
  font-weight: 700;
  cursor: pointer;
  font-family: 'Noto Sans JP', 'Inter', sans-serif;
}
.kuku-cta.primary { background: #C6A667; color: #0A0A0A; }
.kuku-cta.secondary { background: transparent; color: #C6A667; }
.kuku-section { margin: 0 0 120px; }
.kuku-title { font-family: 'Noto Serif JP', serif; font-size: 30px; margin: 0 0 14px; }
.kuku-desc { color: #cfcfcf; font-size: 16px; line-height: 1.7; margin: 0 0 20px; font-family: 'Noto Sans JP', sans-serif; }
.kuku-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; }
.kuku-card {
  background: #101010;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px;
  padding: 22px;
  box-shadow: 0 12px 28px rgba(0,0,0,0.35);
}
.kuku-card h3 { margin: 0 0 10px; font-family: 'Noto Serif JP', serif; font-size: 20px; }
.kuku-list { color: #cfcfcf; font-size: 15px; line-height: 1.6; padding-left: 18px; margin: 8px 0 0; font-family: 'Noto Sans JP', sans-serif; }
.kuku-badge { display: inline-flex; padding: 6px 10px; border-radius: 10px; background: rgba(198,166,103,0.12); color: #C6A667; font-size: 12px; font-weight: 700; margin-bottom: 8px; }
.kuku-table { width: 100%; border-collapse: collapse; }
.kuku-table th, .kuku-table td { padding: 12px 10px; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.06); font-family: 'Noto Sans JP', sans-serif; }
.kuku-table th { color: #C6A667; font-weight: 700; }
.kuku-highlight { color: #C6A667; font-weight: 700; }
.kuku-footer { padding: 40px 0 80px; color: #a8a8a8; font-size: 14px; text-align: center; font-family: 'Inter', sans-serif; }
.kuku-sticky-cta {
  position: fixed;
  left: 0; right: 0; bottom: 0;
  background: rgba(10,10,10,0.92);
  border-top: 1px solid rgba(255,255,255,0.08);
  padding: 14px 18px calc(14px + var(--safe-area-bottom, 0px));
  display: none;
  z-index: 120;
}
.kuku-sticky-cta button { flex: 1; }
@media (max-width: 640px) {
  .kuku-hero { padding: 120px 0 60px; }
  .kuku-hero h1 { font-size: 30px; }
  .kuku-title { font-size: 24px; }
  .kuku-sticky-cta { display: flex; gap: 10px; }
}

/* --- New sponsor LP styles --- */
.kuku-hero-new {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  background: #0c0c0c;
  border: 1px solid rgba(255,255,255,0.08);
}
.kuku-hero-bg {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.25), #0c0c0c 65%), url('https://placehold.co/1920x900/111/fff?text=KUKU+Key+Visual') center/cover no-repeat;
  opacity: 0.95;
}
.kuku-hero-inner {
  position: relative; z-index: 2;
  padding: 140px 24px 120px;
  display: grid;
  gap: 24px;
  max-width: 1080px;
  margin: 0 auto;
}
.kuku-hero-title {
  font-family: 'Noto Serif JP', serif;
  font-size: 42px;
  line-height: 1.25;
  margin: 0 0 12px;
}
.kuku-hero-copy {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 18px;
  color: #e5e5e5;
  line-height: 1.8;
  margin: 0 0 16px;
}
.kuku-hero-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.kuku-hero-cta .kuku-cta { font-size: 16px; padding: 14px 20px; }
.kuku-section-new { margin: 100px auto; }
.kuku-heading {
  font-family: 'Noto Serif JP', serif;
  font-size: 32px;
  margin: 0 0 12px;
}
.kuku-text {
  font-family: 'Noto Sans JP', sans-serif;
  color: #cfcfcf;
  line-height: 1.7;
  margin: 0 0 24px;
}
.kuku-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 12px;
}
.kuku-gallery img { width: 100%; border-radius: 12px; border: 1px solid rgba(255,255,255,0.06); }
.kuku-plan-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 18px;
}
.kuku-plan-card {
  background: #111;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  padding: 22px;
  display: grid;
  gap: 10px;
}
.kuku-plan-name { font-family: 'Noto Serif JP', serif; font-size: 22px; margin: 0; }
.kuku-plan-price { color: #C6A667; font-weight: 800; font-size: 18px; font-family: 'Inter', sans-serif; }
.kuku-plan-img { width: 100%; border-radius: 10px; border: 1px solid rgba(255,255,255,0.08); }
.kuku-list-tight { color: #cfcfcf; font-size: 15px; line-height: 1.6; padding-left: 18px; margin: 0; }
.kuku-carousel {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 70%;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 6px;
}
.kuku-carousel img { width: 100%; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08); }
.kuku-box {
  background: #151515;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  padding: 18px;
  color: #e5e5e5;
  font-family: 'Noto Sans JP', sans-serif;
  line-height: 1.7;
}
.kuku-box.gray { background: #1c1c1c; }
.kuku-faq { display: grid; gap: 12px; }
.kuku-faq-item { border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 14px; background: #0f0f0f; }
.kuku-faq-q { font-weight: 700; margin: 0 0 6px; font-family: 'Noto Sans JP', sans-serif; }
.kuku-faq-a { margin: 0; color: #cfcfcf; line-height: 1.6; font-size: 15px; }
@media (max-width: 640px) {
  .kuku-hero-inner { padding: 120px 18px 90px; }
  .kuku-hero-title { font-size: 30px; }
  .kuku-hero-copy { font-size: 16px; }
  .kuku-hero-cta .kuku-cta { width: 100%; justify-content: center; }
  .kuku-carousel { grid-auto-columns: 80%; }
  .kuku-section-new { margin: 72px auto; }
}

@media (max-width: 900px) {
  .story-hero { padding: 200px 0 180px; }
  .story-h1 { font-size: 46px; white-space: normal; line-height: 1.15; }
  .story-section { margin-bottom: 140px; }
}
@media (max-width: 640px) {
  .story-hero { padding: 180px 0 160px; }
  .story-h1 { font-size: 38px; }
  .story-subcopy { font-size: 16px; }
  .story-section-title { font-size: 28px; }
  .story-section-desc { font-size: 16px; }
  .story-container { padding: 0 16px; }
  .story-step::after { display: none; }
  .story-application { padding: 160px 0; }
  .story-floating-cta { display: block; }
}

.app-header {
  position: fixed; top: 0; left: 0; right: 0; z-index: 50;
  padding: 0 4%; height: var(--header-height);
  display: flex; justify-content: space-between; align-items: center;
  transition: background-color 0.4s;
  background: linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%);
}
.app-header.scrolled { background-color: rgb(20, 20, 20); }
.header-left { display: flex; align-items: center; gap: 2rem; }
.logo { color: var(--primary-red); font-size: 1.8rem; font-weight: 900; text-shadow: 0 0 10px rgba(229,9,20,0.5); cursor: pointer; text-decoration: none; font-family: 'Inter', sans-serif; letter-spacing: -0.02em; transition: text-shadow 0.3s; }
.logo:hover { text-shadow: 0 0 20px rgba(229,9,20,0.7), 0 0 40px rgba(229,9,20,0.3); }
.pc-nav { display: none; gap: 1.2rem; }
.pc-nav-link { color: #e5e5e5; font-size: 0.9rem; cursor: pointer; transition: color 0.2s; }
.pc-nav-link:hover, .pc-nav-link.active { color: #fff; font-weight: bold; }
.header-right { display: flex; align-items: center; gap: 1.5rem; color: white; }
.icon-btn { background: none; border: none; color: white; cursor: pointer; transition: transform 0.2s; }
.icon-btn:hover { transform: scale(1.1); }

.bottom-nav {
  position: fixed; bottom: 0; left: 0; right: 0;
  background-color: #121212; border-top: 1px solid #333;
  display: flex; justify-content: space-around;
  padding: 0.5rem 0 calc(0.5rem + var(--safe-area-bottom)); z-index: 50;
}
.nav-item { background: none; border: none; color: #666; display: flex; flex-direction: column; align-items: center; font-size: 0.6rem; cursor: pointer; }
.nav-item.active { color: var(--text-white); }

@media (min-width: 768px) {
  .bottom-nav { display: none; }
  .pc-nav { display: flex; }
  .app-header { padding: 0 60px; }
}

.hero { position: relative; height: 85vh; width: 100%; display: flex; align-items: flex-end; justify-content: center; }
@media (min-width: 768px) { .hero { align-items: center; justify-content: flex-start; height: 95vh; } }
.hero-bg { position: absolute; inset: 0; z-index: 0; }
.hero-bg img { width: 100%; height: 100%; object-fit: cover; }
.hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, #141414 0%, transparent 50%, rgba(0,0,0,0.4) 100%); }
@media (min-width: 768px) { .hero-overlay { background: linear-gradient(to right, #141414 10%, rgba(20,20,20,0.8) 40%, transparent 80%), linear-gradient(to top, #141414 0%, transparent 30%); } }

.hero-content { position: relative; z-index: 10; text-align: center; width: 100%; padding: 0 1rem 6rem; max-width: 800px; margin: 0 auto; }
@media (min-width: 768px) { .hero-content { text-align: left; padding: 0 60px; width: 100%; max-width: 1400px; display: flex; align-items: center; justify-content: flex-start; gap: 4rem; margin: 0; } }

.hero-text-area { flex: 1; max-width: 600px; }
.hero-poster-area { display: none; flex-shrink: 0; width: 300px; aspect-ratio: 257 / 364; box-shadow: 0 20px 40px rgba(0,0,0,0.8); border-radius: 8px; overflow: hidden; border: 1px solid rgba(255,255,255,0.2); transform: rotate(2deg); }
@media (min-width: 768px) { .hero-poster-area { display: block; } }
.hero-poster-img { width: 100%; height: 100%; object-fit: cover; }

.hero-title { font-size: 3rem; font-weight: 900; line-height: 1; margin-bottom: 0.5rem; font-family: 'Noto Serif JP', Impact, sans-serif; letter-spacing: -1px; text-shadow: 2px 4px 8px rgba(0,0,0,0.9), 0 0 40px rgba(229,9,20,0.15); }
@media (min-width: 768px) { .hero-title { font-size: 5rem; margin: 0 0 1rem 0; } }
.hero-desc { display: none; font-size: 1.1rem; line-height: 1.5; margin-bottom: 2rem; color: #ddd; text-shadow: 1px 1px 2px rgba(0,0,0,0.8); }
@media (min-width: 768px) { .hero-desc { display: block; } }

.hero-meta { display: flex; align-items: center; justify-content: center; gap: 0.8rem; font-size: 0.9rem; font-weight: bold; margin-bottom: 1.5rem; text-shadow: 1px 1px 2px rgba(0,0,0,0.8); flex-wrap: wrap; }
@media (min-width: 768px) { .hero-meta { justify-content: flex-start; font-size: 1.1rem; } }
.hero-tags { margin-bottom: 1.5rem; display: flex; justify-content: center; gap: 0.5rem; flex-wrap: wrap;}
@media (min-width: 768px) { .hero-tags { justify-content: flex-start; } }
.hero-actions { display: flex; gap: 1rem; justify-content: center; }
@media (min-width: 768px) { .hero-actions { justify-content: flex-start; } }

.btn { border: none; padding: 0.75rem 1.8rem; border-radius: 6px; font-weight: bold; font-size: 1.1rem; cursor: pointer; display: flex; align-items: center; gap: 0.6rem; transition: all 0.25s cubic-bezier(0.22,1,0.36,1); }
.btn:active { transform: scale(0.95); }
.btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.4); }
.btn-white { background: white; color: black; }
.btn-gray { background: rgba(109, 109, 110, 0.7); color: white; backdrop-filter: blur(4px); }

.content-container { position: relative; z-index: 30; margin-top: -4rem; padding-bottom: 4rem; }
@media (min-width: 768px) { .content-container { margin-top: -5rem; } }
.section-row { margin: 2rem 0; padding-left: 4%; }
.section-title { font-size: 1.1rem; font-weight: bold; margin-bottom: 0.8rem; color: #e5e5e5; cursor: pointer; }
@media (min-width: 768px) { .section-title { font-size: 1.5rem; } }
.carousel { display: flex; overflow-x: auto; gap: 0.5rem; padding-bottom: 2rem; padding-right: 4%; scroll-snap-type: x mandatory; scrollbar-width: none; }
.carousel::-webkit-scrollbar { display: none; }

.poster-card { position: relative; flex: 0 0 auto; width: 110px; aspect-ratio: 2/3; border-radius: 6px; overflow: hidden; background: var(--bg-card); scroll-snap-align: start; transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), z-index 0.3s, box-shadow 0.35s; cursor: pointer; border: 1px solid transparent; }
@media (min-width: 768px) { .poster-card { width: 180px; } .poster-card:hover { transform: scale(1.08) translateY(-6px); z-index: 10; box-shadow: 0 16px 40px rgba(0,0,0,0.6); border-color: rgba(229,9,20,0.4); } }
.poster-image { width: 100%; height: 100%; object-fit: cover; }

.continue-card { flex: 0 0 auto; width: 240px; background: var(--bg-card); border-radius: 4px; overflow: hidden; margin-right: 0.5rem; transition: transform 0.3s; cursor: pointer; }
@media (min-width: 768px) { .continue-card { width: 300px; } .continue-card:hover { transform: scale(1.05); z-index: 10; } }
.continue-image-wrapper { position: relative; aspect-ratio: 16/9; }
.continue-image { width: 100%; height: 100%; object-fit: cover; opacity: 0.8; }
.play-overlay { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s; }
.continue-card:hover .play-overlay { opacity: 1; }
.play-circle { width: 40px; height: 40px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.5); }
.progress-bar-bg { height: 4px; background: #333; width: 100%; }
.progress-bar-fill { height: 100%; background: var(--primary-red); }
.continue-info { padding: 0.8rem; display: flex; justify-content: space-between; align-items: center; color: #ccc; }

.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); display: flex; justify-content: center; align-items: flex-end; z-index: 100; padding: 0; }
@media (min-width: 768px) { .modal-overlay { align-items: center; padding: 2rem; } }
.modal-content { background: var(--bg-dark); width: 100%; max-width: 850px; border-radius: 16px 16px 0 0; max-height: 90vh; overflow-y: auto; position: relative; color: var(--text-white); box-shadow: 0 0 20px rgba(0,0,0,0.5); }
@media (min-width: 768px) { .modal-content { border-radius: 8px; height: auto; max-height: 95vh; } }
.modal-close { position: absolute; top: 1rem; right: 1rem; background: #181818; border: none; border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; color: white; z-index: 20; cursor: pointer; }

.jump-container { background-color: var(--jump-bg); color: var(--jump-text); min-height: 100%; }
.jump-hero { position: relative; width: 100%; aspect-ratio: 16 / 9; overflow: hidden; }
@media (min-width: 768px) { .jump-hero { aspect-ratio: 21 / 9; } }
.jump-hero img { width: 100%; height: 100%; object-fit: cover; }
.jump-hero-gradient { position: absolute; bottom: 0; left: 0; right: 0; height: 70%; background: linear-gradient(to top, var(--jump-bg) 0%, rgba(10,10,10,0.7) 40%, transparent 100%); }
.jump-info { padding: 1.5rem 1.2rem; position: relative; z-index: 2; margin-top: -3rem; }
.jump-title { font-size: 1.8rem; font-weight: 900; margin-bottom: 0.3rem; letter-spacing: -0.02em; text-shadow: 0 2px 10px rgba(0,0,0,0.5); }
.jump-author { color: var(--jump-gray); font-size: 0.85rem; margin-bottom: 1rem; }
@media (min-width: 768px) { .jump-title { font-size: 2.5rem; } }
.jump-read-btn { width: 100%; padding: 1rem; border-radius: 12px; border: none; background: var(--jump-accent); color: white; font-weight: 700; font-size: 1.05rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem; cursor: pointer; box-shadow: 0 4px 20px rgba(230, 0, 18, 0.35), 0 0 0 1px rgba(230, 0, 18, 0.1); margin-bottom: 0.75rem; transition: transform 0.2s, box-shadow 0.2s; }
.jump-read-btn:hover { transform: scale(1.02); box-shadow: 0 6px 28px rgba(230, 0, 18, 0.5); }
.jump-tabs { display: flex; border-bottom: 1px solid var(--jump-border); background: var(--jump-bg); position: sticky; top: 0; z-index: 40; margin-top: 0.5rem; }
.jump-tab { flex: 1; padding: 0.9rem; text-align: center; font-weight: 600; font-size: 0.9rem; color: var(--jump-gray); cursor: pointer; background: none; border: none; position: relative; transition: color 0.2s; letter-spacing: 0.04em; }
.jump-tab.active { color: #fff; }
.jump-tab.active::after { content: ''; position: absolute; bottom: 0; left: 20%; right: 20%; height: 2px; background: var(--jump-accent); border-radius: 2px; }
.jump-episode-item { display: flex; gap: 1rem; padding: 1rem 1.2rem; border-bottom: 1px solid var(--jump-border); cursor: pointer; align-items: center; position: relative; transition: background 0.2s; }
.jump-episode-item:hover { background: rgba(255,255,255,0.04); }
.jump-ep-thumb { width: 70px; aspect-ratio: 2/3; background: var(--jump-light-gray); border-radius: 6px; overflow: hidden; flex-shrink: 0; position: relative; box-shadow: 0 2px 8px rgba(0,0,0,0.3); }
.jump-ep-thumb img { width: 100%; height: 100%; object-fit: cover; }
.jump-ep-title { font-weight: 700; font-size: 0.95rem; color: #fff; }
.jump-ep-meta { font-size: 0.8rem; color: var(--jump-gray); margin-top: 0.2rem; display: flex; align-items: center; gap: 0.3rem; }
.production-badge { position: absolute; top: 0.5rem; left: 0.5rem; background: rgba(0,0,0,0.7); color: white; font-size: 0.7rem; padding: 2px 6px; border-radius: 4px; }

.reader-container { position: fixed; inset: 0; background: black; z-index: 200; display: flex; flex-direction: column; }
.reader-header { position: fixed; top: 0; left: 0; right: 0; padding: 1rem; background: linear-gradient(to bottom, rgba(0,0,0,0.85), transparent); display: flex; justify-content: space-between; color: white; z-index: 210; transition: transform 0.3s, opacity 0.3s; }
.reader-header.hidden { transform: translateY(-100%); opacity: 0; }
.reader-content { flex: 1; overflow-y: auto; overflow-x: hidden; display: flex; flex-direction: column; align-items: center; scrollbar-width: none; -webkit-overflow-scrolling: touch; }
.reader-content::-webkit-scrollbar { display: none; }
.reader-page { width: 100%; max-width: 800px; position: relative; flex-shrink: 0; }
.reader-page img { width: 100%; height: auto; display: block; }
@media (min-width: 768px) {
  .reader-page { height: 100vh; display: flex; align-items: center; justify-content: center; }
  .reader-page img { width: auto; max-width: 100%; height: 100vh; object-fit: contain; }
}
.reader-footer { position: fixed; bottom: 0; left: 0; right: 0; padding: 1rem; padding-bottom: 2rem; background: linear-gradient(to top, rgba(0,0,0,0.9), transparent); transition: transform 0.3s, opacity 0.3s; z-index: 210; }
.reader-footer.hidden { transform: translateY(100%); opacity: 0; }

.admin-container { padding: 2rem; background: #f3f4f6; min-height: 100vh; color: #333; padding-bottom: 6rem;}
.card { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 1rem; }

/* ==========================================
   KUKU Sponsor Page (kx-)
   ========================================== */
.kx-page {
  background: radial-gradient(circle at top, rgba(63,191,138,0.12), transparent 60%), #050712;
  color: #e5e7eb;
  min-height: 100vh;
}
.kx-header {
  position: sticky;
  top: 0;
  z-index: 120;
  backdrop-filter: blur(12px);
  background: linear-gradient(180deg, rgba(5,7,18,0.78), rgba(5,7,18,0.4));
  border-bottom: 1px solid rgba(212,175,55,0.18);
}
.kx-header-inner {
  max-width: 1040px;
  margin: 0 auto;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 18px;
}
.kx-header-logo {
  font-size: 20px;
  font-weight: 800;
  color: #d4af37;
  cursor: pointer;
}
.kx-header-nav { display: flex; gap: 14px; color: #cbd5e1; font-weight: 600; }
.kx-header-nav a { color: inherit; text-decoration: none; }
.kx-header-nav a:hover { color: #fff; }
.kx-container {
  max-width: 1040px;
  margin: 0 auto;
  padding: 0 16px;
}
.kx-section {
  padding: 72px 0;
}
.kx-section-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 16px;
}
.kx-section-lead {
  font-size: 1.05rem;
  opacity: 0.9;
  margin-bottom: 16px;
}
.kx-section-body {
  font-size: 1rem;
  line-height: 1.7;
  color: #cbd5e1;
  margin: 0;
}
.kx-hero {
  padding: 96px 0 80px;
  background: radial-gradient(circle at top, rgba(212,175,55,0.22), transparent 60%);
}
.kx-hero-inner {
  display: grid;
  gap: 32px;
  grid-template-columns: minmax(0, 1fr) 340px;
  align-items: center;
}
.kx-hero-text { flex: 1; }
.kx-hero-visual {
  display: flex;
  justify-content: center;
}
.kx-hero-frame {
  width: 100%;
  max-width: 380px;
  aspect-ratio: 4 / 5;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(212,175,55,0.35);
  box-shadow: 0 24px 45px rgba(0,0,0,0.55);
  background: linear-gradient(180deg, rgba(5,7,18,0.6), rgba(5,7,18,0.9));
  position: relative;
}
.kx-hero-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.kx-hero-frame::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.35));
}
.kx-badge {
  display: inline-block;
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid rgba(212,175,55,0.6);
  color: #d4af37;
}
.kx-hero-title {
  font-size: 2.4rem;
  line-height: 1.3;
  margin: 12px 0 16px;
}
.kx-hero-subtitle {
  font-size: 1.05rem;
  opacity: 0.9;
  margin-bottom: 24px;
}
.kx-hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.kx-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 999px;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.18s ease-out;
  border: 1px solid transparent;
  cursor: pointer;
}
.kx-btn-primary {
  background: #d4af37;
  color: #020617;
  box-shadow: 0 10px 25px rgba(0,0,0,0.35);
}
.kx-btn-primary:hover {
  background: #e1c357;
  transform: translateY(-1px);
  box-shadow: 0 14px 28px rgba(0,0,0,0.45);
}
.kx-btn-secondary {
  background: transparent;
  color: #d4af37;
  border-color: rgba(212,175,55,0.7);
}
.kx-btn-secondary:hover {
  background: rgba(212,175,55,0.08);
}
.kx-btn-full { width: 100%; justify-content: center; }
.kx-plan-grid {
  display: grid;
  gap: 24px;
  margin-top: 32px;
}
@media (min-width: 768px) {
  .kx-plan-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
.kx-plan-card {
  position: relative;
  background: rgba(15,23,42,0.9);
  border-radius: 20px;
  padding: 24px;
  border: 1px solid rgba(148,163,184,0.35);
  box-shadow: 0 18px 45px rgba(0,0,0,0.45);
}
.kx-plan-card-featured {
  border-color: rgba(212,175,55,0.8);
  box-shadow: 0 24px 55px rgba(0,0,0,0.6);
}
.kx-plan-badge {
  position: absolute;
  top: 14px;
  right: 18px;
  font-size: 0.75rem;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(212,175,55,0.16);
  color: #f9fafb;
}
.kx-plan-title { font-size: 1.3rem; margin-bottom: 4px; }
.kx-plan-price {
  font-size: 1.2rem;
  font-weight: 700;
  color: #d4af37;
  margin-bottom: 4px;
}
.kx-plan-tagline { font-size: 0.9rem; opacity: 0.85; margin-bottom: 12px; }
.kx-plan-features {
  list-style: none;
  padding: 0;
  margin: 0 0 20px;
  font-size: 0.9rem;
}
.kx-plan-features li {
  position: relative;
  padding-left: 18px;
  margin-bottom: 4px;
}
.kx-plan-features li::before {
  content: "•";
  position: absolute;
  left: 4px;
  top: 0;
  color: #3fbf8a;
}
.kx-table-wrapper { overflow-x: auto; }
.kx-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
.kx-table th, .kx-table td {
  border: 1px solid rgba(55,65,81,0.9);
  padding: 10px 12px;
}
.kx-table th { background: rgba(15,23,42,0.9); }
.kx-flow-steps {
  list-style: none;
  padding: 0;
  margin: 24px 0 0;
  display: grid;
  gap: 16px;
}
@media (min-width: 768px) {
  .kx-flow-steps { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}
.kx-flow-steps li {
  background: rgba(15,23,42,0.9);
  border-radius: 14px;
  padding: 16px 14px;
  border: 1px solid rgba(75,85,99,0.7);
}
.kx-spec-grid {
  display: grid;
  gap: 16px;
  margin-top: 16px;
}
@media (min-width: 768px) {
  .kx-spec-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
.kx-spec-grid h3 { margin-top: 0; }
.kx-spec-grid ul { margin: 8px 0 0; padding-left: 18px; line-height: 1.6; color: #cbd5e1; }
.kx-faq-list { display: grid; gap: 12px; margin-top: 16px; }
.kx-faq-item {
  background: rgba(15,23,42,0.9);
  border-radius: 12px;
  padding: 14px 16px;
  border: 1px solid rgba(75,85,99,0.6);
}
.kx-cta-final {
  background: radial-gradient(circle at center, rgba(63,191,138,0.18), transparent 60%);
  border-top: 1px solid rgba(148,163,184,0.35);
}
.kx-cta-final-inner {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
@media (min-width: 768px) {
  .kx-cta-final-inner { flex-direction: row; align-items: center; justify-content: space-between; }
}
@media (max-width: 767px) {
  .kx-section { padding: 56px 0; }
  .kx-hero { padding: 72px 0 56px; text-align: center; }
  .kx-hero-inner { grid-template-columns: 1fr; gap: 24px; }
  .kx-hero-actions { justify-content: center; }
  .kx-hero-title { font-size: 2rem; }
  .kx-section-title { font-size: 1.5rem; }
  .kx-plan-card { padding: 20px; }
}

/* ==========================================
   Install Page
   ========================================== */
.install-page {
  background: radial-gradient(circle at 10% 15%, rgba(229,9,20,0.08), transparent 32%), #0b0b0b;
  color: #fff;
  min-height: 100vh;
  padding: 100px 0 80px;
}
.install-container { max-width: 1080px; margin: 0 auto; padding: 0 24px; }
.install-hero {
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 26px 60px rgba(0,0,0,0.45);
  background: #0a0a0a;
  padding: 0;
  margin-bottom: 18px;
}
.install-hero-bg {
  width: 100%;
  height: clamp(260px, 48vw, 560px);
  overflow: hidden;
}
.install-hero-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.install-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(229,9,20,0.16);
  border: 1px solid rgba(229,9,20,0.35);
  padding: 8px 12px;
  border-radius: 999px;
  font-weight: 800;
  letter-spacing: 0.06em;
}
.install-title { margin: 0; font-size: clamp(26px, 4vw, 42px); line-height: 1.2; letter-spacing: -0.01em; }
.install-lead { margin: 0; color: #e8e8e8; line-height: 1.7; }
.install-hero-body { position: relative; z-index: 2; display: grid; gap: 12px; }
.install-hero-body > .install-download-btn { width: fit-content; }
.install-hero-visual { display: none; }
.install-hero-card {
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  border-radius: 18px;
  padding: 26px;
  background: linear-gradient(160deg, rgba(229,9,20,0.18), rgba(20,30,60,0.85));
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 18px 46px rgba(0,0,0,0.5);
  position: relative;
  overflow: hidden;
}
.install-hero-card::before {
  content: "";
  position: absolute;
  inset: 12px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.08);
  opacity: 0.6;
}
.install-hero-card::after {
  content: "";
  position: absolute;
  top: -60px; right: -60px;
  width: 160px; height: 160px;
  background: radial-gradient(circle, rgba(255,255,255,0.18), transparent 55%);
  transform: rotate(18deg);
}
.install-hero-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(255,255,255,0.12);
  color: #fff;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.04em;
  position: relative;
  z-index: 1;
}
.install-hero-card h3 {
  margin: 12px 0 6px;
  font-size: 26px;
  letter-spacing: -0.01em;
  position: relative;
  z-index: 1;
}
.install-hero-card p {
  margin: 0 0 14px;
  color: #f1f1f1;
  line-height: 1.6;
  position: relative;
  z-index: 1;
}
.install-hero-meta { display: flex; flex-wrap: wrap; gap: 8px; position: relative; z-index: 1; }
.install-meta-pill {
  padding: 7px 10px;
  border-radius: 10px;
  background: rgba(0,0,0,0.35);
  border: 1px solid rgba(255,255,255,0.14);
  color: #f7f7f7;
  font-size: 12px;
  letter-spacing: 0.02em;
}
.install-download-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  padding: 14px 18px;
  border-radius: 12px;
  background: linear-gradient(135deg, #e50914, #ff6b6b);
  color: #fff;
  font-weight: 800;
  text-decoration: none;
  border: 1px solid rgba(255,255,255,0.12);
  box-shadow: 0 14px 36px rgba(229,9,20,0.35);
}
.install-grid { display: grid; gap: 18px; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }
.install-section {
  margin-top: 32px;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 16px;
  padding: 22px;
  background: rgba(15,15,15,0.85);
  box-shadow: 0 12px 30px rgba(0,0,0,0.35);
}
.install-section h2 { margin: 0 0 12px; font-size: 22px; letter-spacing: 0.01em; }
.install-section p { margin: 0 0 12px; color: #d4d4d4; line-height: 1.7; }
.install-steps { display: grid; gap: 12px; }
.install-step {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 12px;
  align-items: start;
  padding: 12px 12px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.03);
}
.install-shot {
  grid-column: 1 / -1;
  margin-top: 10px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.08);
  background: #0f0f0f;
}
.install-shot img {
  display: block;
  width: 100%;
  height: auto;
}
.install-num {
  width: 34px; height: 34px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  font-weight: 800;
  background: linear-gradient(135deg, #e50914, #ff6b6b);
  color: #fff;
  box-shadow: 0 8px 20px rgba(229,9,20,0.3);
}
.install-step strong { display: block; margin-bottom: 4px; }
.install-note {
  margin: 10px 0 0;
  padding: 10px 12px;
  border-radius: 10px;
  background: rgba(255,255,255,0.06);
  color: #f7f7f7;
  font-size: 14px;
  line-height: 1.6;
}
.install-alert {
  border: 1px solid rgba(229,9,20,0.4);
  background: rgba(229,9,20,0.1);
  color: #ffecec;
}
.install-columns { display: grid; gap: 14px; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
.install-list { margin: 0; padding-left: 18px; color: #d4d4d4; line-height: 1.7; }
.install-subtitle { margin: 12px 0 8px; font-size: 18px; }
.install-link-box {
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  padding: 12px;
  background: rgba(255,255,255,0.04);
}
.install-chip {
  display: inline-block;
  padding: 6px 10px;
  margin: 4px 6px 0 0;
  border-radius: 10px;
  background: rgba(255,255,255,0.08);
  font-size: 13px;
  color: #e5e5e5;
}
.install-footer {
  margin-top: 32px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  color: #cfcfcf;
  font-size: 14px;
}
.install-footer strong { color: #fff; }
@media (max-width: 640px) {
  .install-page { padding: 90px 0 70px; }
  .install-section { padding: 18px; }
  .install-hero { padding: 24px; }
}
`;

// ==========================================
// データ
// ==========================================
const DEFAULT_DB = {
  series: [
    { 
      id: "kuku",
      title: "KUKU ―黎明の木神―",
      heroTitle: ["KUKU ―", "黎明の木神 ―"],
      author: "Author Name",
      coverUrl: "/assets/kuku-cover.jpg",
      heroUrl: "/assets/kuku-hero.jpg",
      description: "",
      totalLikes: 12400,
      isNew: true,
      status: "approved",
      direction: "rtl",
      language: "ja",
      tags: ["Dark Fantasy", "Action"],
      match: 98,
    },
    {
      id: "fomus",
      title: "FOMUS",
      author: "FOMUS Studio",
      coverUrl: "/fomus-manga-cover-202501.jpg",
      heroUrl: "/fomus-manga-cover-202501.jpg",
      description: "伝統×テクノロジーで拓く未来。",
      totalLikes: 8200,
      isNew: true,
      status: "published",
      direction: "ltr",
      language: "ja",
      tags: ["Technology", "Fantasy"],
      match: 95,
      oneShot: true,
    },
  ],
  chapters: [
    { id: "c1", seriesId: "kuku", number: 1, title: "1話", publishDate: "2025/11/01", likes: 1200, status: "published", thumbUrl: "/assets/kuku-ep1.jpg", pageCount: 21 },
    { id: "c2", seriesId: "kuku", number: 2, title: "2話", publishDate: "2025/11/08", likes: 980, status: "published", thumbUrl: "/assets/kuku-ep2.jpg", pageCount: 22 },
    { id: "c3", seriesId: "kuku", number: 3, title: "3話", publishDate: "2025/11/15", likes: 720, status: "published", thumbUrl: "/assets/kuku-ep3.jpg", pageCount: 22 },
    { id: "c4", seriesId: "kuku", number: 4, title: "", status: "in_production", sponsorGoal: 1, sponsors: 0, thumbUrl: "/assets/kuku-ep3.jpg", pageCount: 22 },
    { id: "c5", seriesId: "kuku", number: 5, title: "", status: "in_production", sponsorGoal: 1, sponsors: 0, thumbUrl: "/assets/kuku-ep3.jpg", pageCount: 22 },
    { id: "c6", seriesId: "kuku", number: 6, title: "", status: "in_production", sponsorGoal: 1, sponsors: 0, thumbUrl: "/assets/kuku-ep3.jpg", pageCount: 22 },
    { id: "f1", seriesId: "fomus", number: 1, title: "1話", publishDate: "2025/12/10", likes: 640, status: "published", thumbUrl: "/fomus-manga-cover-202501.jpg", pageCount: 13 },
  ],
};

const RESOURCES = {
  ja: {
    nav_home: "ホーム", nav_new: "新着", nav_mypage: "マイページ", nav_partners: "スポンサー", nav_install: "ダウンロード",
    read_now: "読む", my_list: "マイリスト",
    section_continue: "視聴中コンテンツ", section_trending: "新着", section_new: "新着エピソード",
    match: "マッチ", new_badge: "新着",
    episodes: "エピソード", details: "作品詳細", more_like_this: "似たような作品",
    read_first: "最初から読む", favorite: "お気に入り", comments: "コメント", share: "シェア",
    production: "制作中", sponsor_slots: "スポンサー枠", become_sponsor: "スポンサーになる",
    support_btn: "支援する", sponsor_desc: "制作を支援して巻末に名前を掲載しよう！", sponsor_price: "一口 5,000円",
    admin_title: "クリエイター管理", tab_dashboard: "ダッシュボード", tab_works: "作品一覧",
    close: "閉じる", lang_switch: "English", guest_name: "ゲスト",

    // Studio LP: サービス比較 (Comparison)
    comp_title_trad: "伝統的な漫画制作",
    comp_sub_trad: "(プロの技と時間)",
    comp_title_fomus: "FOMUS Story-to-Comic",
    comp_sub_fomus: "(AIとアジャイルによる革新)",

    comp_cost_trad: "30万〜50万円 / 10P",
    comp_cost_sub_trad: "多重構造による高コスト体質",
    comp_time_trad: "1.5ヶ月〜2ヶ月",
    comp_time_sub_trad: "ネーム・下書き等の確認工程が長期化",
    comp_effort_trad: "多大",
    comp_effort_sub_trad: "詳細な脚本準備、度重なるディレクションが必要",
    comp_skill_trad: "個人のスキルに依存",
    comp_skill_sub_trad: "熟練の作家による唯一無二の作品",
    comp_deliver_trad: "データ納品のみが一般的",

    comp_cost_fomus: "10万円 / 10P",
    comp_cost_sub_fomus: "AI活用による工程最適化・コスト圧縮",
    comp_time_fomus: "約2週間",
    comp_time_sub_fomus: "アジャイルな制作体制による短納期",
    comp_effort_fomus: "最小限 (60分)",
    comp_effort_sub_fomus: "ヒアリングで意図を汲み取り、構成から提案",
    comp_quality_fomus: "安定したクオリティ",
    comp_quality_sub_fomus: "プロ編集者監修による一貫した品質保証",
    comp_expand_fomus: "ワンストップ展開",
    comp_expand_sub_fomus: "多言語化、MangaX世界配信、製本まで統合支援",

    badge_fast: "爆速＆低コスト",
    badge_easy: "クライアントに優しい",

    // Studio LP: 料金プラン & ワークフロー
    studio_title: "Story-to-Comic Studio",
    studio_subtitle: "その物語を、一生残る「MANGA」に。",
    studio_intro: "AIのスピードと編集者の構成力で、あなたの物語を漫画化します。",

    studio_basic_plan: "基本制作パック (10P)",
    studio_basic_price: "100,000円 (税込)",
    studio_detail_1: "漫画制作 10ページ",
    studio_detail_2: "60分オンラインヒアリング",
    studio_detail_3: "AI作画 + 編集ディレクション",
    studio_add_page: "ページ追加 (+5,000円/P)",
    studio_book_option: "製本サービス (+1,000円/冊〜)",
  },
  en: {
    nav_home: "Home", nav_new: "New", nav_mypage: "My Page", nav_partners: "Partners", nav_install: "Download",
    read_now: "Read", my_list: "My List",
    section_continue: "Continue Reading", section_trending: "Trending", section_new: "New Releases",
    match: "Match", new_badge: "NEW",
    episodes: "Episodes", details: "Details", more_like_this: "More Like This",
    read_first: "Read First", favorite: "Favorite", comments: "Comments", share: "Share",
    production: "In Production", sponsor_slots: "Sponsor Slots", become_sponsor: "Become a Sponsor",
    support_btn: "Support", sponsor_desc: "Support production and get credited!", sponsor_price: "$50 / Slot",
    admin_title: "Creator Studio", tab_dashboard: "Dashboard", tab_works: "Works",
    close: "Close", lang_switch: "日本語", guest_name: "Guest",

    // Studio LP: Comparison
    comp_title_trad: "Traditional Manga Production",
    comp_sub_trad: "(Craft & Time)",
    comp_title_fomus: "FOMUS Story-to-Comic",
    comp_sub_fomus: "(AI & Agile Innovation)",

    comp_cost_trad: "300k–500k JPY / 10P",
    comp_cost_sub_trad: "Layered process drives higher cost",
    comp_time_trad: "1.5–2 months",
    comp_time_sub_trad: "Long review cycles for name & draft",
    comp_effort_trad: "Heavy",
    comp_effort_sub_trad: "Detailed scripts and repeated direction",
    comp_skill_trad: "Skill-dependent",
    comp_skill_sub_trad: "Unique craft by seasoned artists",
    comp_deliver_trad: "Data delivery only, typically",

    comp_cost_fomus: "100k JPY / 10P",
    comp_cost_sub_fomus: "AI-optimized workflow cuts cost",
    comp_time_fomus: "~2 weeks",
    comp_time_sub_fomus: "Agile production enables fast turnaround",
    comp_effort_fomus: "Minimal (60 mins)",
    comp_effort_sub_fomus: "We capture intent via hearing and propose structure",
    comp_quality_fomus: "Consistent quality",
    comp_quality_sub_fomus: "Editor-led QA for cohesive output",
    comp_expand_fomus: "One-stop expansion",
    comp_expand_sub_fomus: "Multilingual, MangaX global publish, printing",

    badge_fast: "Fast & Lean",
    badge_easy: "Client-friendly",

    studio_title: "Story-to-Comic Studio",
    studio_subtitle: "Turn your story into a lasting manga.",
    studio_intro: "AI speed meets editorial craft to adapt your story.",
    studio_basic_plan: "Standard Package (10P)",
    studio_basic_price: "100,000 JPY (tax incl.)",
    studio_detail_1: "10 pages of manga",
    studio_detail_2: "60-min online consultation",
    studio_detail_3: "AI art + editorial direction",
    studio_add_page: "Extra pages (+5,000 JPY/page)",
    studio_book_option: "Printing option (+1,000 JPY/book~)",
  },
  fr: {
    nav_home: "Accueil", nav_new: "Nouveautés", nav_mypage: "Mon Profil", nav_partners: "Sponsors", nav_install: "Télécharger",
    read_now: "Lire", my_list: "Ma Liste",
    section_continue: "Continuer la lecture", section_trending: "Tendances", section_new: "Nouveaux épisodes",
    match: "Correspondance", new_badge: "NOUVEAU",
    episodes: "Épisodes", details: "Détails", more_like_this: "Dans le même genre",
    read_first: "Lire depuis le début", favorite: "Favoris", comments: "Commentaires", share: "Partager",
    production: "En production", sponsor_slots: "Places sponsor", become_sponsor: "Devenir sponsor",
    support_btn: "Soutenir", sponsor_desc: "Soutenez la production et soyez crédité !", sponsor_price: "50 $ / Place",
    admin_title: "Studio Créateur", tab_dashboard: "Tableau de bord", tab_works: "Œuvres",
    close: "Fermer", lang_switch: "日本語", guest_name: "Invité",
    comp_title_trad: "Production manga traditionnelle", comp_sub_trad: "(Artisanat & Temps)",
    comp_title_fomus: "FOMUS Story-to-Comic", comp_sub_fomus: "(IA & Innovation Agile)",
    comp_cost_trad: "300k–500k JPY / 10P", comp_cost_sub_trad: "Coût élevé dû aux processus multiples",
    comp_time_trad: "1,5–2 mois", comp_time_sub_trad: "Longs cycles de révision",
    comp_effort_trad: "Important", comp_effort_sub_trad: "Scripts détaillés et direction répétée",
    comp_skill_trad: "Dépend du talent", comp_skill_sub_trad: "Œuvre unique par des artistes expérimentés",
    comp_deliver_trad: "Livraison numérique uniquement",
    comp_cost_fomus: "100k JPY / 10P", comp_cost_sub_fomus: "Flux optimisé par l'IA",
    comp_time_fomus: "~2 semaines", comp_time_sub_fomus: "Production agile et rapide",
    comp_effort_fomus: "Minimal (60 min)", comp_effort_sub_fomus: "Nous captons votre intention et proposons la structure",
    comp_quality_fomus: "Qualité constante", comp_quality_sub_fomus: "Contrôle qualité éditorial",
    comp_expand_fomus: "Expansion clé en main", comp_expand_sub_fomus: "Multilingue, diffusion mondiale MangaX, impression",
    badge_fast: "Rapide & Économique", badge_easy: "Conçu pour le client",
    studio_title: "Story-to-Comic Studio", studio_subtitle: "Transformez votre histoire en manga inoubliable.",
    studio_intro: "La vitesse de l'IA alliée au savoir-faire éditorial.",
    studio_basic_plan: "Pack Standard (10P)", studio_basic_price: "100 000 JPY (TTC)",
    studio_detail_1: "10 pages de manga", studio_detail_2: "Consultation en ligne de 60 min",
    studio_detail_3: "Art IA + direction éditoriale",
    studio_add_page: "Pages supplémentaires (+5 000 JPY/page)",
    studio_book_option: "Option impression (+1 000 JPY/livre~)",
  },
  ar: {
    nav_home: "الرئيسية", nav_new: "جديد", nav_mypage: "صفحتي", nav_partners: "الرعاة", nav_install: "تحميل",
    read_now: "اقرأ", my_list: "قائمتي",
    section_continue: "متابعة القراءة", section_trending: "الرائج", section_new: "حلقات جديدة",
    match: "تطابق", new_badge: "جديد",
    episodes: "الحلقات", details: "التفاصيل", more_like_this: "مشابه",
    read_first: "اقرأ من البداية", favorite: "المفضلة", comments: "التعليقات", share: "مشاركة",
    production: "قيد الإنتاج", sponsor_slots: "مقاعد الرعاية", become_sponsor: "كن راعياً",
    support_btn: "ادعم", sponsor_desc: "ادعم الإنتاج واحصل على ذكر اسمك!", sponsor_price: "٥٠ $ / مقعد",
    admin_title: "استوديو المبدع", tab_dashboard: "لوحة التحكم", tab_works: "الأعمال",
    close: "إغلاق", lang_switch: "日本語", guest_name: "ضيف",
    comp_title_trad: "إنتاج المانغا التقليدي", comp_sub_trad: "(حرفة ووقت)",
    comp_title_fomus: "FOMUS Story-to-Comic", comp_sub_fomus: "(ذكاء اصطناعي وابتكار مرن)",
    comp_cost_trad: "٣٠٠-٥٠٠ ألف ين / ١٠ صفحات", comp_cost_sub_trad: "تكلفة عالية بسبب العمليات المتعددة",
    comp_time_trad: "١.٥–٢ شهر", comp_time_sub_trad: "دورات مراجعة طويلة",
    comp_effort_trad: "كبير", comp_effort_sub_trad: "نصوص مفصلة وإخراج متكرر",
    comp_skill_trad: "يعتمد على المهارة", comp_skill_sub_trad: "عمل فريد من فنانين متمرسين",
    comp_deliver_trad: "تسليم رقمي فقط",
    comp_cost_fomus: "١٠٠ ألف ين / ١٠ صفحات", comp_cost_sub_fomus: "سير عمل محسّن بالذكاء الاصطناعي",
    comp_time_fomus: "~أسبوعان", comp_time_sub_fomus: "إنتاج مرن وسريع",
    comp_effort_fomus: "الحد الأدنى (٦٠ دقيقة)", comp_effort_sub_fomus: "نلتقط نيتك ونقترح الهيكل",
    comp_quality_fomus: "جودة ثابتة", comp_quality_sub_fomus: "ضمان جودة تحريري",
    comp_expand_fomus: "توسع شامل", comp_expand_sub_fomus: "متعدد اللغات، نشر عالمي، طباعة",
    badge_fast: "سريع واقتصادي", badge_easy: "مصمم للعميل",
    studio_title: "Story-to-Comic Studio", studio_subtitle: "حوّل قصتك إلى مانغا خالدة.",
    studio_intro: "سرعة الذكاء الاصطناعي مع الحرفية التحريرية.",
    studio_basic_plan: "الباقة الأساسية (١٠ صفحات)", studio_basic_price: "١٠٠,٠٠٠ ين (شامل الضريبة)",
    studio_detail_1: "١٠ صفحات مانغا", studio_detail_2: "استشارة أونلاين ٦٠ دقيقة",
    studio_detail_3: "رسم بالذكاء الاصطناعي + إخراج تحريري",
    studio_add_page: "صفحات إضافية (+٥,٠٠٠ ين/صفحة)",
    studio_book_option: "خيار الطباعة (+١,٠٠٠ ين/نسخة~)",
  },
};

const viewToPath = (view) => {
  if (view === "install") return "/download";
  if (view === "kukuSponsor") return "/partners";
  return "/";
};

const pathToView = (path) => {
  if (!path) return "home";
  if (path.startsWith("/download")) return "install";
  if (path.startsWith("/partners")) return "kukuSponsor";
  return "home";
};

// --- Scroll reveal hook ---
const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

// --- Hooks & helpers ---
const useAppNavigation = (initialView = "flow") => {
  const resolvedInitialView = pathToView(typeof window !== "undefined" ? window.location.pathname : "") || initialView;
  const [view, setView] = useState(resolvedInitialView);
  const [historyStack, setHistoryStack] = useState([resolvedInitialView]);
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [readingChapter, setReadingChapter] = useState(null);

  useEffect(() => {
    const handlePopState = () => {
      setReadingChapter(null);
      setSelectedSeries(null);
      const nextView = pathToView(window.location.pathname);
      setView(nextView);
      setHistoryStack((stack) => [...stack, nextView]);
    };
    window.addEventListener("popstate", handlePopState);
    const handleNavigateEvent = (e) => {
      if (e.detail?.view) navigate(e.detail.view);
    };
    window.addEventListener("mx_navigate", handleNavigateEvent);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("mx_navigate", handleNavigateEvent);
    };
  }, []);

  const navigate = (newView) => {
    if (newView === view) return;
    const newPath = viewToPath(newView);
    const currentPath = window.location.pathname;
    if (newPath !== currentPath) {
      window.history.pushState({ view: newView }, "", newPath);
    } else {
      window.history.pushState({ view: newView }, "");
    }
    setHistoryStack([...historyStack, newView]);
    setView(newView);
    window.scrollTo(0, 0);
  };

  const openDetail = (series) => {
    window.history.pushState({ detail: series.id }, "");
    setSelectedSeries(series);
  };

  const closeDetail = () => setSelectedSeries(null);

  const openReader = (chapter, series) => {
    window.history.pushState({ read: chapter.id }, "");
    setReadingChapter({ chapter, series });
  };

  const closeReader = () => setReadingChapter(null);

  return { view, navigate, selectedSeries, openDetail, closeDetail, readingChapter, openReader, closeReader };
};

const useData = () => {
  const [data, setData] = useState(DEFAULT_DB);
  useEffect(() => {
    fetch("/data.json")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("No external data");
      })
      .then((jsonData) => setData(jsonData))
      .catch(() => {}); // fallback to default
  }, []);
  return data;
};

const getHistory = () => JSON.parse(localStorage.getItem("mx_history") || "[]");
const saveHistory = (seriesId, chapterId, progress) => {
  const history = getHistory();
  const newEntry = { seriesId, chapterId, progress, lastReadAt: new Date().toISOString() };
  const filtered = history.filter((h) => h.seriesId !== seriesId);
  localStorage.setItem("mx_history", JSON.stringify([newEntry, ...filtered]));
};

// --- Components ---
const Header = ({ scrolled, activeTab, setActiveTab, setLang, lang }) => {
  const t = RESOURCES[lang];
  const navItems = [
    { key: "home", label: t.nav_home, target: "home" },
    { key: "install", label: t.nav_install, target: "install" },
    { key: "partners", label: t.nav_partners, target: "kukuSponsor" },
  ];

  return (
    <div className={`app-header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-left">
        <div className="logo" onClick={() => setActiveTab("home")}>MangaX</div>
        <div className="pc-nav">
          {navItems.map((item) => (
            <div
              key={item.key}
              className={`pc-nav-link ${activeTab === item.target ? "active" : ""}`}
              onClick={() => setActiveTab(item.target)}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
      <div className="header-right">
        <button className="icon-btn"><Search size={24} /></button>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          style={{
            background: "transparent", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "6px",
            color: "#e0e0e0", fontSize: "0.75rem", fontWeight: 600, padding: "4px 6px",
            cursor: "pointer", outline: "none", letterSpacing: "0.05em",
          }}
        >
          <option value="ja" style={{ background: "#1a1a1a" }}>JP</option>
          <option value="en" style={{ background: "#1a1a1a" }}>EN</option>
          <option value="fr" style={{ background: "#1a1a1a" }}>FR</option>
          <option value="ar" style={{ background: "#1a1a1a" }}>AR</option>
        </select>
      </div>
    </div>
  );
};

const BottomNav = ({ activeTab, setActiveTab, t }) => {
  const navItems = [
    { key: "home", label: t.nav_home, target: "home", icon: <Home size={24} /> },
    { key: "install", label: t.nav_install, target: "install", icon: <Download size={24} /> },
    { key: "partners", label: t.nav_partners, target: "kukuSponsor", icon: <Handshake size={24} /> },
  ];

  return (
    <div className="bottom-nav">
      {navItems.map((item) => (
        <button
          key={item.key}
          onClick={() => setActiveTab(item.target)}
          className={`nav-item ${activeTab === item.target ? "active" : ""}`}
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
};

const InstallPage = () => {
  const installSteps = [
    {
      title: "ZIPファイルをダウンロード",
      body: "ダウンロードページから最新版のZIPファイルを取得します。",
      image: "/install/step1-download.png",
    },
    {
      title: "ZIPファイルを展開",
      body: "ダウンロードしたZIPを右クリックし、「すべて展開 / 解凍」を選んで任意の場所に展開します。",
    },
    {
      title: "Chrome拡張機能ページを開く",
      body: "Chrome右上メニュー → 「拡張機能」 → 「拡張機能を管理」をクリック。",
      image: "/install/step3-chrome-extension.png",
    },
    {
      title: "デベロッパーモードをON → 拡張機能を読み込む",
      body: "拡張機能ページ右上の「デベロッパーモード」をオンにし、「パッケージ化されていない拡張機能を読み込む」から展開フォルダを選択します。",
      image: "/install/step5-load-unpacked.png",
    },
    {
      title: "ツールバーに固定",
      body: "拡張機能アイコン一覧からピン留めし、常に表示されるようにします。",
      image: "/install/step6-pin-toolbar.png",
    },
    {
      title: "インストール完了",
      body: "ツールバーのFOMUS MANGA CREATORアイコンをクリックして起動できます。",
    },
  ];

  const apiSteps = [
    { title: "FAL AIアカウントを作成", body: "FAL AI公式サイトにアクセスし、アカウントを作成します。" },
    { title: "APIキーを取得", body: "ダッシュボードの「API Keys」で「Add key」をクリックし、キーを生成します。" },
    { title: "クレジットをチャージ", body: "クレジットページで必要額をチャージ。初回は10ドル程度で十分です。" },
    { title: "APIキーを設定", body: "FOMUS MANGA CREATORを起動し、右上の「⚙️ API設定」から取得したキーを保存します。" },
  ];

  const usageSteps = [
    { title: "サムネイルを作りたいページを開く", body: "ブログやBrainの記事など対象ページを開きます。" },
    { title: "右クリックメニューを開く", body: "ページ上で右クリックし「ページ全体からデザインを作成」を選択。" },
    { title: "アスペクト比を選択", body: "16:9（YouTube等） / 4:5（Instagramフィード） / 1:1（正方形） / 9:16（ストーリー系）。" },
    { title: "テーマカラーを選択", body: "好みの配色を選択。「おまかせ」でAIが自動選定。" },
    { title: "デザインスタイルを選択", body: "モダン / ビビッド / プロフェッショナル / ミニマルから選択。" },
    { title: "生成ボタンをクリック", body: "30秒〜1分ほどで生成。画像は自動ダウンロードされます。" },
  ];

  const troubleshooting = [
    {
      title: "生成に失敗する場合",
      bullets: [
        "FAL APIキーが正しく設定されているか確認",
        "クレジット残高があるか（残高確認）",
        "ネットワーク接続が安定しているか",
        "ページ内容が入力されているか",
      ],
    },
    {
      title: "APIキーのエラー",
      bullets: [
        "コピペ時に余分なスペースが入っていないか",
        "FAL AIダッシュボードでキーが有効か確認",
        "必要に応じて新しいキーを生成して再設定",
      ],
    },
    {
      title: "タイムアウトエラー",
      bullets: [
        "ページ内容を短くシンプルにする",
        "ネットワーク接続を確認",
        "時間を置いて再試行（サーバー混雑の可能性）",
      ],
    },
    {
      title: "拡張機能が起動しない",
      bullets: [
        "Chromeを再起動",
        "chrome://extensions/ で有効化されているか確認",
        "削除して再インストール",
        "Chromeが最新バージョンか確認",
      ],
    },
  ];

  return (
    <div className="install-page">
      <div className="install-container">
        <div className="install-hero">
          <div className="install-hero-bg">
            <img src="/install/download-hero.jpg" alt="FOMUS MANGA CREATOR ヒーロー" />
          </div>
        </div>

        <div className="install-hero-card">
          <div className="install-hero-body">
            <span className="install-badge">FOMUS MANGA CREATOR</span>
            <h1 className="install-title">ダウンロード & インストール</h1>
            <p className="install-lead">最新版ZIPの入手からChromeへの導入、API設定、基本操作、高度な使い方までまとめました。</p>
            <a className="install-download-btn" href="/MANGA_creator.zip" download>
              <Download size={18} /> ZIPをダウンロード
            </a>
            <div className="install-footer">
              <strong>バージョン</strong> 最新版ZIPをお使いください / <strong>対応</strong> Google Chrome
            </div>
          </div>
        </div>

        <div className="install-section">
          <h2>インストール方法</h2>
          <div className="install-steps">
            {installSteps.map((step, idx) => (
              <div key={step.title} className="install-step">
                <div className="install-num">{idx + 1}</div>
                <div>
                  <strong>{step.title}</strong>
                  <div>{step.body}</div>
                </div>
                {step.image && (
                  <div className="install-shot">
                    <img src={step.image} alt={`${step.title} のスクリーンショット`} loading="lazy" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="install-section">
          <h2>初期設定（FAL APIキーの取得）</h2>
          <div className="install-steps">
            {apiSteps.map((step, idx) => (
              <div key={step.title} className="install-step">
                <div className="install-num">{idx + 1}</div>
                <div>
                  <strong>{step.title}</strong>
                  <div>{step.body}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="install-note install-alert">
            ⚠️ セキュリティ: APIキーはブラウザのローカルストレージに平文保存されます。共有PCや公共のPCでは使用しないでください。キーが漏洩すると第三者に不正利用される可能性があります。
          </div>
        </div>

        <div className="install-section">
          <h2>基本的な使い方</h2>
          <div className="install-steps">
            {usageSteps.map((step, idx) => (
              <div key={step.title} className="install-step">
                <div className="install-num">{idx + 1}</div>
                <div>
                  <strong>{step.title}</strong>
                  <div>{step.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="install-section">
          <h2>トラブルシューティング</h2>
          <div className="install-columns">
            {troubleshooting.map((item) => (
              <div key={item.title} className="install-link-box">
                <h3 className="install-subtitle">{item.title}</h3>
                <ul className="install-list">
                  {item.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="install-note">それでも解決しない場合：開発者のXアカウント（@masukei444）にDMでお問い合わせください。</div>
        </div>

      </div>
    </div>
  );
};

const HeroSection = ({ series, onRead, onMyList, t }) => {
  if (!series) return null;
  const heroTitleContent = series.heroTitle || (series.id === "kuku" ? ["KUKU ―", "黎明の木神 ―"] : series.title);
  return (
    <div className="hero">
      <div className="hero-bg"><img src={series.heroUrl || series.coverUrl} alt="Hero" /></div>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="hero-text-area">
          <h1 className="hero-title">
            {Array.isArray(heroTitleContent)
              ? heroTitleContent.map((line, idx) => (
                  <React.Fragment key={idx}>
                    {line.toUpperCase()}
                    {idx < heroTitleContent.length - 1 && <br />}
                  </React.Fragment>
                ))
              : heroTitleContent.toUpperCase()}
          </h1>
          <p className="hero-desc">{series.description}</p>
          <div className="hero-meta">
            <span style={{ color: "#46d369" }}>{series.match}% Match</span>
            <span className="border border-gray-500 px-1 rounded text-xs">HD</span>
          </div>
          <div className="hero-actions">
            <button onClick={onRead} className="btn btn-white"><Play size={24} fill="currentColor" /> {t.read_now}</button>
            <button onClick={onMyList} className="btn btn-gray"><Plus size={24} /> {t.my_list}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SectionRow = ({ title, items, renderItem }) => (
  <div className="section-row">
    <h3 className="section-title">{title}</h3>
    <div className="carousel">
      {items.map((item, idx) => <div key={idx}>{renderItem(item, idx)}</div>)}
    </div>
  </div>
);

const PosterCard = ({ series, onClick, t }) => (
  <div onClick={() => onClick(series)} className="poster-card">
    <img src={series.coverUrl} className="poster-image" loading="lazy" />
    <div className="absolute top-1 left-1 text-red-600 font-bold text-xs" style={{ color: "var(--primary-red)", textShadow: "0 1px 2px black" }}>N</div>
    {series.isNew && <div className="absolute bottom-0 width-full bg-red-600/90 text-white text-[9px] font-bold text-center py-0.5 w-full">{t.new_badge}</div>}
  </div>
);

const NewEpisodeCard = ({ episode, onClick }) => (
  <div onClick={() => onClick(episode)} className="poster-card">
    <img src={episode.thumbUrl} className="poster-image" loading="lazy" />
    <div className="absolute bottom-0 w-full" style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.85))", padding: "1.5rem 0.4rem 0.35rem" }}>
      <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "#fff", lineHeight: 1.2, textShadow: "0 1px 2px black" }}>{episode.series?.title}</div>
      <div style={{ fontSize: "0.6rem", color: "#ccc" }}>#{episode.number}</div>
    </div>
  </div>
);

const ServicePitch = ({ onShowFlow }) => {
  const stats = [
    { num: "10万円〜", label: "10ページから" },
    { num: "最短1週間", label: "納品スピード" },
    { num: "40+", label: "対応言語数" },
  ];
  return (
    <section style={{
      margin: "4rem 4% 5rem",
      padding: "0",
      borderRadius: "20px",
      background: "linear-gradient(135deg, #0a0a0a 0%, #1a0a1e 40%, #0a1a2e 100%)",
      border: "1px solid rgba(229,9,20,0.2)",
      boxShadow: "0 30px 80px rgba(229,9,20,0.12), 0 0 0 1px rgba(255,255,255,0.05)",
      overflow: "hidden",
      position: "relative",
    }}>
      <div style={{
        position: "absolute", inset: 0, opacity: 0.4,
        background: "radial-gradient(circle at 20% 30%, rgba(229,9,20,0.15), transparent 50%), radial-gradient(circle at 80% 70%, rgba(100,200,255,0.1), transparent 50%)",
      }} />
      <div style={{ position: "relative", zIndex: 1, padding: "2.5rem 2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.8rem" }}>
          <Sparkles size={16} style={{ color: "#ff6b6b" }} />
          <span style={{ fontSize: "0.85rem", letterSpacing: "0.14em", color: "#ff8a8a", fontWeight: 700, textTransform: "uppercase" }}>Story-to-Comic Studio</span>
        </div>
        <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", margin: "0 0 0.8rem", fontWeight: 900, lineHeight: 1.1, fontFamily: "'Noto Serif JP', serif" }}>
          あなたの物語を、<br /><span style={{ background: "linear-gradient(90deg, #ff6b6b, #ffd700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>世界にひとつの漫画に。</span>
        </h2>
        <p style={{ maxWidth: 680, color: "#c8c8c8", lineHeight: 1.7, fontSize: "1.05rem", marginBottom: "1.5rem" }}>
          60分のヒアリングだけで、プロ品質の漫画が完成。<br />
          人生の物語、ビジネスPR、ギフト ── あなたの想いを形にします。
        </p>

        <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap", marginBottom: "2rem" }}>
          {stats.map((s) => (
            <div key={s.label} style={{
              padding: "0.8rem 1.2rem",
              borderRadius: "14px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              minWidth: 120,
              textAlign: "center",
            }}>
              <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#fff", fontFamily: "'Inter', sans-serif" }}>{s.num}</div>
              <div style={{ fontSize: "0.8rem", color: "#a8a8a8", marginTop: "0.2rem" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
          <button
            className="cta-pulse"
            onClick={onShowFlow}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.6rem",
              background: "linear-gradient(135deg, #e50914, #ff4757)",
              color: "white", border: "none", borderRadius: "999px",
              padding: "1rem 2rem", fontWeight: 800, fontSize: "1rem",
              cursor: "pointer", transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.04)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <Rocket size={18} /> 詳しく見る
          </button>
          <button
            onClick={() => window.open("mailto:contact@example.com?subject=漫画制作相談")}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.6rem",
              background: "transparent", color: "#fff",
              border: "1px solid rgba(255,255,255,0.3)", borderRadius: "999px",
              padding: "1rem 2rem", fontWeight: 700, fontSize: "1rem",
              cursor: "pointer", transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
          >
            <Mail size={18} /> 無料相談する
          </button>
        </div>
      </div>
    </section>
  );
};

const ProductionFlow = () => (
  <section className="feature-section" id="production-flow" style={{ marginTop: "1.5rem" }}>
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ fontSize: "0.9rem", letterSpacing: "0.08em", color: "#9ae6ff", fontWeight: 700 }}>WORKFLOW</div>
      <h3 style={{ fontSize: "1.6rem", margin: "0.3rem 0 0.4rem", fontWeight: 800 }}>制作の流れ</h3>
      <p style={{ maxWidth: 780, color: "#cfcfcf", lineHeight: 1.6 }}>
        ご依頼から納品まで、あなたの負担は「ヒアリング」だけ。構成・AI作画・編集をワンストップで進行します。
      </p>
    </div>
    <div className="feature-grid" style={{ marginTop: "1rem" }}>
      <div className="feature-card">
        <strong>01. 申し込み</strong>
        <p style={{ color: "#cfcfcf", lineHeight: 1.5 }}>フォーム or DMでかんたん。</p>
      </div>
      <div className="feature-card">
        <strong>02. ヒアリング（60分）</strong>
        <p style={{ color: "#cfcfcf", lineHeight: 1.5 }}>まっすーがあなたの物語を丁寧に聞きます。</p>
      </div>
      <div className="feature-card">
        <strong>03. 構成案（10ページ）提出</strong>
        <p style={{ color: "#cfcfcf", lineHeight: 1.5 }}>流れ・配役・見せ場を整理。</p>
      </div>
      <div className="feature-card">
        <strong>04. 制作（AI × クリエイティブ）</strong>
        <p style={{ color: "#cfcfcf", lineHeight: 1.5 }}>アジャイル方式で高速に。</p>
      </div>
      <div className="feature-card">
        <strong>05. 納品（PDF / JPG / 冊子）</strong>
        <p style={{ color: "#cfcfcf", lineHeight: 1.5 }}>用途に合わせて提供。</p>
      </div>
      <div className="feature-card">
        <strong>06. MangaX掲載（任意）</strong>
        <p style={{ color: "#cfcfcf", lineHeight: 1.5 }}>あなたの作品が世界に公開されます。</p>
      </div>
    </div>
  </section>
);

// --- Comparison Section Component (VISUAL UPDATE) ---
const ComparisonSection = ({ t, hideHeader = false }) => {
  const rows = [
    {
      icon: <Coins size={24} />,
      tradMain: t.comp_cost_trad,
      tradSub: t.comp_cost_sub_trad,
      fomusMain: t.comp_cost_fomus,
      fomusSub: t.comp_cost_sub_fomus,
    },
    {
      icon: <Calendar size={24} />,
      tradMain: t.comp_time_trad,
      tradSub: t.comp_time_sub_trad,
      fomusMain: t.comp_time_fomus,
      fomusSub: t.comp_time_sub_fomus,
    },
    {
      icon: <Users size={24} />,
      tradMain: t.comp_effort_trad,
      tradSub: t.comp_effort_sub_trad,
      fomusMain: t.comp_effort_fomus,
      fomusSub: t.comp_effort_sub_fomus,
    },
    {
      icon: <PenTool size={24} />,
      tradMain: t.comp_skill_trad,
      tradSub: t.comp_skill_sub_trad,
      fomusMain: t.comp_quality_fomus,
      fomusSub: t.comp_quality_sub_fomus,
    },
    {
      icon: <Folder size={24} />,
      tradMain: t.comp_deliver_trad,
      tradSub: "",
      fomusMain: t.comp_expand_fomus,
      fomusSub: t.comp_expand_sub_fomus,
    },
  ];
  const fomusIcons = [Cpu, Rocket, Coffee, CheckCircle, Globe];

  return (
    <div className="comp-section">
      {!hideHeader && (
        <div className="comp-header">
          <h2>サービス比較</h2>
          <p></p>
        </div>
      )}

      <div className="comp-container">
        <div className="comp-col comp-col-trad">
          <h3 className="comp-col-title">{t.comp_title_trad}</h3>
          <p className="comp-col-sub">{t.comp_sub_trad}</p>
          {rows.map((row, idx) => (
            <div key={`trad-${idx}`} className="comp-row">
              <div className="comp-icon">{row.icon}</div>
              <div className="comp-content">
                <div className="comp-main-text">{row.tradMain}</div>
                {row.tradSub && <div className="comp-sub-text">{row.tradSub}</div>}
              </div>
            </div>
          ))}
        </div>

        <div className="comp-col comp-col-fomus">
          <div className="comp-badge">{t.badge_fast}</div>
          <h3 className="comp-col-title">{t.comp_title_fomus}</h3>
          <p className="comp-col-sub">{t.comp_sub_fomus}</p>
          {rows.map((row, idx) => (
            <div key={`fomus-${idx}`} className="comp-row">
              <div className="comp-icon">{fomusIcons[idx] ? React.createElement(fomusIcons[idx], { size: 24 }) : row.icon}</div>
              <div className="comp-content">
                <div className="comp-main-text">{row.fomusMain}</div>
                {row.fomusSub && <div className="comp-sub-text">{row.fomusSub}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StoryCTAButton = ({ variant = "primary", children, onClick }) => (
  <button type="button" className={`story-cta ${variant}`} onClick={onClick}>
    {children}
  </button>
);

const StoryFaqItem = ({ item, isOpen, onToggle }) => (
  <div className="story-faq-item">
    <div className="story-faq-question" onClick={onToggle}>
      <span>{item.q}</span>
      <ChevronRight size={18} style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
    </div>
    {isOpen && <div className="story-faq-answer">{item.a}</div>}
  </div>
);

const StoryLanding = ({ onBack }) => {
  const [openFaq, setOpenFaq] = useState(null);
  useScrollReveal();

  const valueItems = [
    { icon: <Rocket size={26} />, title: "プロ品質 × 最短2週間", text: "AI × アジャイル制作で、最短2週間の納品が可能。", tone: "amber", label: "SPEED" },
    { icon: <MessageCircle size={26} />, title: "60分ヒアリングで構成まで丸投げOK", text: "想い・背景・目的を引き出し、構成をゼロから設計。", tone: "cyan", label: "CARE" },
    { icon: <Globe size={26} />, title: "40言語対応。世界で読まれる漫画へ。", text: "SNS・展示会・海外PRに最適。", tone: "violet", label: "GLOBAL" },
  ];

  const steps = [
    {
      title: "申し込み（フォーム / DM）",
      caption: "希望や用途を簡単に入力するだけ。",
      icon: <Mail size={24} />,
      tone: "amber",
    },
    {
      title: "ヒアリング（60分）",
      caption: "プロの編集者がストーリーの核を引き出します。",
      icon: <Clock size={24} />,
      tone: "cyan",
    },
    {
      title: "構成案（10ページ）作成",
      caption: "テーマ・導入・山場までを設計し、ご提案。",
      icon: <FileText size={24} />,
      tone: "pink",
    },
    {
      title: "AI作画 × 編集",
      caption: "アートディレクターが絵柄を整え、AIで量産。",
      icon: <Wand2 size={24} />,
      tone: "violet",
    },
    {
      title: "仕上げ・レタッチ",
      caption: "表情・光・文字まわりを手作業でブラッシュアップ。",
      icon: <Sparkles size={24} />,
      tone: "green",
    },
    {
      title: "納品 ＋ MangaX掲載（任意）",
      caption: "データ納品に加え、希望者はMangaXで配信も可能。",
      icon: <Upload size={24} />,
      tone: "orange",
    },
  ];

  const useCases = [
    { title: "個人向け", blurb: "人生の節目をドラマチックに。", tags: ["自己紹介", "転職ストーリー", "SNSプロフィール"], icon: <Smile size={26} />, tone: "amber" },
    { title: "ギフト", blurb: "感謝や想い出を1冊の物語に。", tags: ["結婚", "誕生日", "家族の記録", "友人への贈り物"], icon: <Gift size={26} />, tone: "pink" },
    { title: "ビジネス", blurb: "ブランドの世界観を漫画で伝達。", tags: ["代表ストーリー", "採用漫画", "サービス説明"], icon: <Briefcase size={26} />, tone: "cyan" },
    { title: "海外向け", blurb: "多言語で広がるグローバルPR。", tags: ["英語プロモ", "展示会PR", "国際イベント用資料"], icon: <Globe size={26} />, tone: "violet" },
  ];

  const comparisonRows = [
    { label: "価格", trad: "30〜50万円 / 10P", fomus: "10万円 / 10P" },
    { label: "納期", trad: "1.5〜2ヶ月", fomus: "最短1週間" },
    { label: "手間", trad: "ネーム・下書き指示が必要", fomus: "ヒアリングのみ" },
    { label: "品質", trad: "作家によって差が大きい", fomus: "プロ編集 × AI補正で安定品質" },
    { label: "展開", trad: "データ納品のみ", fomus: "40言語展開・SNS発信可能" },
  ];

  const faqList = [
    { q: "ストーリーがまとまっていなくても大丈夫？", a: "はい。ヒアリングで整理します。" },
    { q: "公開したくない場合は？", a: "非公開制作も可能です。" },
    { q: "個人／企業の納期は？", a: "個人は約2〜3週間、ギフトは＋数日。企業案件も個別相談で対応します。" },
    { q: "ギフトとして使える？", a: "はい。結婚・誕生日・家族の記録などギフト向け構成も可能です。" },
    { q: "海外向けにも対応できる？", a: "40言語対応で海外PRや展示会資料として活用できます。" },
    { q: "どんなジャンルでも可能？", a: "はい。伝えたい想いがあればジャンル不問で制作します。" },
    { q: "MangaXに掲載しなくてもいい？", a: "非公開納品にも対応します。掲載は任意です。" },
    { q: "制作事例は見られる？", a: "ヒアリング予約の際に事例リンクを共有します。" },
    { q: "支払い方法は？", a: "お申し込み時にご案内します。法人請求も対応します。" },
    { q: "修正は何回まで？", a: "構成確定後の軽微な調整を含め、内容に応じてご相談のうえ対応します。" },
  ];

  return (
    <div className="story-lp">
      <header className="story-header">
        <div className="story-header-inner">
          <div className="story-nav" style={{ gap: 14 }}>
            <a className="logo" style={{ color: "#C62828", fontSize: 20, textShadow: "none" }} onClick={onBack}>MangaX</a>
            <a>スポンサー</a>
          </div>
          <div className="story-nav" style={{ gap: 14 }}>
            <div className="story-lang">EN / JP</div>
            <button className="story-header-cta" onClick={() => window.open("mailto:contact@example.com?subject=Story-to-Comic 申し込み", "_self")}>申し込み</button>
          </div>
        </div>
      </header>

      <div className="story-container">
        <section className="story-section story-hero">
          <div className="story-hero-visual" />
          <button className="story-back" onClick={onBack}>
            <ChevronLeft size={16} /> トップへ戻る
          </button>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "999px", background: "rgba(198,166,103,0.12)", border: "1px solid rgba(198,166,103,0.3)", marginBottom: "16px" }}>
            <Sparkles size={14} style={{ color: "#C6A667" }} />
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#C6A667", letterSpacing: "0.08em" }}>MangaX × FOMUS</span>
          </div>
          <h1 className="story-h1" style={{ marginBottom: "24px" }}>
            あなたの物語を、<br />
            <span className="shimmer-text">世界にひとつの漫画に。</span>
          </h1>
          <p className="story-subcopy">
            60分話すだけ。構成・作画・編集すべてお任せ。<br />
            人生・ビジネス・ギフト・PRストーリーを、<br />
            最短1週間でプロ品質の漫画作品に仕上げます。
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap", marginBottom: "32px" }}>
            {[
              { value: "100,000", unit: "円〜", desc: "10P制作" },
              { value: "1", unit: "週間", desc: "最短納期" },
              { value: "40+", unit: "言語", desc: "多言語対応" },
              { value: "60", unit: "分", desc: "ヒアリングのみ" },
            ].map((item) => (
              <div key={item.desc} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "28px", fontWeight: 900, color: "#fff", fontFamily: "'Inter', 'Noto Sans JP', sans-serif", lineHeight: 1 }}>
                  {item.value}<span style={{ fontSize: "16px", color: "#C6A667" }}>{item.unit}</span>
                </div>
                <div style={{ fontSize: "12px", color: "#B8B8B8", marginTop: "4px" }}>{item.desc}</div>
              </div>
            ))}
          </div>

          <div className="story-cta-group">
            <button
              type="button"
              className="story-cta primary cta-pulse"
              onClick={() => window.open("mailto:contact@example.com?subject=Story-to-Comic 予約", "_self")}
              style={{ fontSize: "17px", padding: "18px 36px" }}
            >
              無料ヒアリングを予約する
            </button>
            <StoryCTAButton variant="secondary" onClick={() => document.getElementById("story-portfolio")?.scrollIntoView({ behavior: "smooth" })}>
              制作事例を見る
            </StoryCTAButton>
          </div>
          <div className="story-meta" style={{ marginTop: "20px" }}>FOMUS Creative Studio</div>
          <div className="story-lang-row">
            {["JP", "EN", "CN", "KR", "40+"].map((lang) => (
              <span key={lang} className="story-lang-pill">{lang}</span>
            ))}
          </div>
        </section>

        <section className="story-section reveal">
          <h2 className="story-section-title">FOMUS品質の漫画制作を、誰でも。</h2>
          <div className="story-value-grid">
            {valueItems.map((item, idx) => (
              <div key={idx} className="story-value-item" data-tone={item.tone}>
                <div className="story-value-icon" data-tone={item.tone}>{item.icon}</div>
                <div className="story-value-body">
                  <div className="story-value-label">{item.label}</div>
                  <div className="story-value-title">{item.title}</div>
                  <p className="story-value-text">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="story-portfolio" className="story-section reveal">
          <h2 className="story-section-title">こんな物語が、漫画になります。</h2>
          <div className="story-use-grid">
            {useCases.slice(0, 3).map((block) => (
              <div key={block.title} className="story-card" data-tone={block.tone}>
                <div className="story-card-top">
                  <div className="story-card-icon" data-tone={block.tone}>{block.icon}</div>
                  <div>
                    <div className="story-card-eyebrow">Use Case</div>
                    <h3>{block.title}</h3>
                    {block.blurb && <p className="story-card-sub">{block.blurb}</p>}
                  </div>
                </div>
                <div className="story-tags">
                  {block.tags.map((tag) => (
                    <span key={tag} className="story-tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
            <div className="story-card-row">
              {useCases.slice(3).map((block) => (
                <div key={block.title} className="story-card" data-tone={block.tone}>
                  <div className="story-card-top">
                    <div className="story-card-icon" data-tone={block.tone}>{block.icon}</div>
                    <div>
                      <div className="story-card-eyebrow">Use Case</div>
                      <h3>{block.title}</h3>
                      {block.blurb && <p className="story-card-sub">{block.blurb}</p>}
                    </div>
                  </div>
                  <div className="story-tags">
                    {block.tags.map((tag) => (
                      <span key={tag} className="story-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="story-section reveal">
          <h2 className="story-section-title">あなたがやるのは、&ldquo;話すだけ&rdquo;。</h2>
          <div className="story-steps">
            {steps.map((step, idx) => (
              <div key={idx} className="story-step">
                <div className="story-step-body">
                  <div className="story-step-figure">
                    <div className="story-step-illustration" data-tone={step.tone}>
                      {step.icon}
                      <span className="story-step-spark" />
                    </div>
                  </div>
                  <div>
                    <div className="story-step-label">STEP {idx + 1}</div>
                    <div className="story-step-title">{step.title}</div>
                    {step.caption && <p className="story-step-caption">{step.caption}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="story-section reveal">
          <h2 className="story-section-title">従来の常識を覆す、速度と品質。</h2>
          <ComparisonSection
            t={{
              comp_title_trad: "従来の漫画制作",
              comp_sub_trad: "(プロの技と時間)",
              comp_title_fomus: "MangaX Story-to-Comic",
              comp_sub_fomus: "(AIとアジャイルによる革新)",
              comp_cost_trad: "30〜50万円 / 10P",
              comp_cost_sub_trad: "匠の技にはコストがかかります",
              comp_time_trad: "1.5ヶ月〜2ヶ月",
              comp_time_sub_trad: "緻密な工程と確認に時間を費やします",
              comp_effort_trad: "多大",
              comp_effort_sub_trad: "詳細な脚本と度重なる調整が必要",
              comp_skill_trad: "個人のスキルに依存",
              comp_skill_sub_trad: "熟練の作家による唯一無二の作品",
              comp_deliver_trad: "データ納品のみが一般的",
              comp_cost_fomus: "10万円 / 10P",
              comp_cost_sub_fomus: "AI活用による工程最適化・コスト圧縮",
              comp_time_fomus: "最短1週間",
              comp_time_sub_fomus: "アジャイルな制作体制による短納期",
              comp_effort_fomus: "最小限 (60分)",
              comp_effort_sub_fomus: "ヒアリングで意図を汲み取り、構成から提案",
              comp_quality_fomus: "安定したクオリティ",
              comp_quality_sub_fomus: "プロ編集者監修による一貫した品質保証",
              comp_expand_fomus: "ワンストップ展開",
              comp_expand_sub_fomus: "多言語化、MangaX世界配信、製本まで統合支援",
              badge_fast: "Fast & Lean",
              badge_easy: "Client-friendly",
            }}
            hideHeader
          />
        </section>

        <section className="story-section reveal">
          <h2 className="story-section-title">料金プラン</h2>
          <p className="story-section-desc" style={{ marginBottom: "28px" }}>シンプルなワンパッケージ。追加オプションも柔軟に対応します。</p>
          <div style={{
            background: "linear-gradient(160deg, #151515, #0f1a2a)",
            borderRadius: "20px",
            padding: "0",
            border: "1px solid rgba(198,166,103,0.3)",
            overflow: "hidden",
            boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
          }}>
            <div style={{
              background: "linear-gradient(135deg, rgba(198,166,103,0.12), rgba(198,166,103,0.04))",
              padding: "28px 32px 20px",
              borderBottom: "1px solid rgba(198,166,103,0.15)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                <Crown size={20} style={{ color: "#C6A667" }} />
                <span style={{ fontSize: "13px", letterSpacing: "0.1em", color: "#C6A667", fontWeight: 700 }}>STANDARD PACKAGE</span>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px", flexWrap: "wrap" }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "48px", color: "#C6A667", fontWeight: 700, lineHeight: 1 }}>100,000</span>
                <span style={{ fontSize: "18px", color: "#C6A667" }}>円（税込）</span>
              </div>
              <div style={{ fontSize: "14px", color: "#B8B8B8", marginTop: "6px" }}>漫画10ページ制作パッケージ</div>
            </div>
            <div style={{ padding: "24px 32px 28px" }}>
              <div style={{ display: "grid", gap: "12px", marginBottom: "24px" }}>
                {[
                  { icon: <FileText size={18} />, text: "漫画10ページ制作" },
                  { icon: <MessageCircle size={18} />, text: "60分オンラインヒアリング" },
                  { icon: <Wand2 size={18} />, text: "AI作画 + プロ編集ディレクション" },
                  { icon: <Download size={18} />, text: "高解像度データ納品（PDF / JPG / PNG）" },
                ].map((item) => (
                  <div key={item.text} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(198,166,103,0.12)", display: "grid", placeItems: "center", color: "#C6A667", flexShrink: 0 }}>{item.icon}</div>
                    <span style={{ color: "#e5e5e5", fontSize: "15px" }}>{item.text}</span>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "16px" }}>
                <div style={{ fontSize: "13px", color: "#888", marginBottom: "10px", letterSpacing: "0.06em" }}>OPTIONS</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "8px" }}>
                  {[
                    "追加ページ：+5,000円/P",
                    "多言語追加：+30,000円/言語",
                    "製本サービス：1冊1,000円〜",
                  ].map((opt) => (
                    <div key={opt} style={{ fontSize: "14px", color: "#a8a8a8", display: "flex", alignItems: "center", gap: "6px" }}>
                      <Plus size={12} style={{ color: "#C6A667" }} /> {opt}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="story-section reveal">
          <h2 className="story-section-title">FOMUSならではの強み</h2>
          <div className="story-strength-grid">
            {[
              { icon: <MessageCircle size={22} />, title: "まっすーの\u201C引き出すヒアリング\u201D", text: "話を聞くだけで構成ができる。", tone: "amber" },
              { icon: <Wand2 size={22} />, title: "AI×人のハイブリッド制作", text: "速い・高品質・安定。", tone: "cyan" },
              { icon: <Globe size={22} />, title: "世界展開できる多言語漫画（40言語）", text: "翻訳・SNS・展示会にも対応。", tone: "violet" },
              { icon: <Sparkles size={22} />, title: "MangaXに掲載できる（無料）", text: "個人・ギフト・企業PRとして利用可能。", tone: "pink" },
            ].map((item, idx) => (
              <div key={idx} className="story-strength-card" data-tone={item.tone}>
                <div className="story-strength-icon" data-tone={item.tone}>{item.icon}</div>
                <div className="story-strength-body">
                  <div className="story-strength-title">{item.title}</div>
                  <div className="story-strength-text">{item.text}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="story-section reveal">
          <h2 className="story-section-title">FAQ</h2>
          <div className="story-faq-list">
            {faqList.map((item, idx) => (
              <StoryFaqItem
                key={item.q}
                item={item}
                isOpen={openFaq === idx}
                onToggle={() => setOpenFaq(openFaq === idx ? null : idx)}
              />
            ))}
          </div>
        </section>

        <section className="story-section story-application" style={{ position: "relative" }}>
          <div style={{
            position: "absolute", inset: "-40% 0", opacity: 0.5,
            background: "radial-gradient(circle at 50% 50%, rgba(198,166,103,0.12), transparent 60%)",
            pointerEvents: "none",
          }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: "14px", letterSpacing: "0.14em", color: "#C6A667", marginBottom: "12px" }}>READY TO START?</div>
            <h2 className="story-section-title" style={{ fontSize: "clamp(28px, 5vw, 44px)", marginBottom: "16px" }}>
              あなたの物語を、<br />世界にひとつの漫画へ。
            </h2>
            <p style={{ color: "#B8B8B8", fontSize: "16px", maxWidth: "540px", margin: "0 auto 32px", lineHeight: 1.7 }}>
              まずは60分の無料ヒアリングから。<br />
              物語のイメージがなくても大丈夫。一緒に形にしていきましょう。
            </p>
            <button
              type="button"
              className="story-cta primary cta-pulse"
              onClick={() => window.open("mailto:contact@example.com?subject=Story-to-Comic 申し込み", "_self")}
              style={{ fontSize: "17px", padding: "18px 40px", marginBottom: "14px" }}
            >
              Story-to-Comicを申し込む
            </button>
            <div style={{ marginTop: 14 }}>
              <StoryCTAButton variant="secondary" onClick={() => window.open("mailto:contact@example.com?subject=Story-to-Comic 無料ヒアリング", "_self")}>
                無料ヒアリングを予約
              </StoryCTAButton>
            </div>
          </div>
        </section>
      </div>

      <div className="story-floating-cta">
        <StoryCTAButton variant="primary" onClick={() => window.open("mailto:contact@example.com?subject=Story-to-Comic 申し込み", "_self")}>
          Story-to-Comic を申し込む
        </StoryCTAButton>
      </div>

      <footer className="story-footer">
        <div className="story-container">
          <div className="story-footer-links">
            <span>MangaX</span>
            <span><img src="/assets/fomus-logo-new.png" alt="FOMUS" className="story-logo-img" />FOMUS Creative Studio</span>
            <span>利用規約</span>
            <span>プライバシーポリシー</span>
            <span>お問い合わせ</span>
            <span>EN / JP</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

const KukuSponsorPage = ({ onBack }) => {
  const EPISODE_LINK = "STRIPE_LINK_EPISODE";
  const FULL_LINK = "STRIPE_LINK_FULL";
  const heroVisual = "/assets/kuku-hero.jpg";

  return (
    <div className="kx-page">
      <header className="kx-header">
        <div className="kx-header-inner">
          <div className="kx-header-logo" onClick={onBack}>MangaX</div>
          <nav className="kx-header-nav">
            <a onClick={onBack}>ホーム</a>
            <a>スポンサー</a>
          </nav>
        </div>
      </header>
      <main className="kx-main">
        <section id="hero" className="kx-hero">
          <div className="kx-container kx-hero-inner">
            <div className="kx-hero-text">
              <p className="kx-badge">Official Sponsor Program</p>
              <h1 className="kx-hero-title">
                KUKU ― 一黎明の木神 ―<br />
                公式スポンサー募集
              </h1>
              <p className="kx-hero-subtitle">
                世界規模で展開する長編ファンタジー作品を、<br />
                あなたの力で未来へつなげてください。
              </p>
              <div className="kx-hero-actions">
                <a href="#plans" className="kx-btn kx-btn-primary">1話スポンサーになる（USD 200）</a>
                <a href="#plans" className="kx-btn kx-btn-secondary">全巻スポンサーについて詳しく見る</a>
              </div>
            </div>
            <div className="kx-hero-visual">
              <div className="kx-hero-frame">
                <img src={heroVisual} alt="KUKU キービジュアル" />
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="kx-section kx-about">
          <div className="kx-container">
            <h2 className="kx-section-title">KUKU｜一黎明の木神 とは</h2>
            <p className="kx-section-lead">
              『KUKU｜一黎明の木神』は、FOMUSが世界に向けて制作する長編ファンタジーシリーズです。
            </p>
            <p className="kx-section-body">
              神々、人間、森、文明が交錯する壮麗な物語は、国際アニメーション展開を視野に制作されています。
              40〜45話規模の物語を支える公式スポンサーを募集しています。
            </p>
          </div>
        </section>

        <section id="plans" className="kx-section kx-plans">
          <div className="kx-container">
            <h2 className="kx-section-title">スポンサープラン</h2>
            <p className="kx-section-lead">
              1話ごとに参加するプランから、全巻を通して伴走いただくプランまでご用意しています。
            </p>
            <div className="kx-plan-grid">
              <article className="kx-plan-card">
                <h3 className="kx-plan-title">1話スポンサー</h3>
                <p className="kx-plan-price">USD 200 / 話</p>
                <p className="kx-plan-tagline">任意のエピソードを1話単位で支援</p>
                <ul className="kx-plan-features">
                  <li>該当話の巻頭＋巻末にスポンサー名掲載（ロゴ / 日本語 / 英語）</li>
                  <li>MangaX公式「スポンサー一覧」に掲載</li>
                  <li>複数話の同時申し込みも可能</li>
                  <li>話数選択は決済後にご案内します</li>
                </ul>
                <a href={EPISODE_LINK} className="kx-btn kx-btn-primary kx-btn-full">
                  1話スポンサーになる（USD 200）
                </a>
              </article>

              <article className="kx-plan-card kx-plan-card-featured">
                <div className="kx-plan-badge">おすすめ</div>
                <h3 className="kx-plan-title">全巻スポンサー</h3>
                <p className="kx-plan-price">USD 7,000</p>
                <p className="kx-plan-tagline">全40〜45話を一括支援する最上位プラン</p>
                <ul className="kx-plan-features">
                  <li>全話の巻頭＋巻末にロゴ or 表記を掲載</li>
                  <li>「スポンサー一覧」に特別枠で掲載</li>
                  <li>シリーズ全体ページ（作品トップ）にもロゴ掲載</li>
                  <li>国際プロモーション資料にも掲載（任意）</li>
                </ul>
                <a href={FULL_LINK} className="kx-btn kx-btn-primary kx-btn-full">
                  全巻スポンサーとして参加する（USD 7,000）
                </a>
              </article>
            </div>
          </div>
        </section>

        <section id="compare" className="kx-section kx-compare">
          <div className="kx-container">
            <h2 className="kx-section-title">プラン比較</h2>
            <div className="kx-table-wrapper">
              <table className="kx-table">
                <thead>
                  <tr>
                    <th>項目</th>
                    <th>1話スポンサー</th>
                    <th>全巻スポンサー</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>対象話数</td>
                    <td>任意の1話〜複数話</td>
                    <td>全40〜45話</td>
                  </tr>
                  <tr>
                    <td>巻頭・巻末クレジット</td>
                    <td>該当話のみ</td>
                    <td>全話に掲載</td>
                  </tr>
                  <tr>
                    <td>スポンサー一覧掲載</td>
                    <td>通常枠</td>
                    <td>特別枠（上位表示）</td>
                  </tr>
                  <tr>
                    <td>シリーズTOPページ掲載</td>
                    <td>なし</td>
                    <td>ロゴ掲載あり</td>
                  </tr>
                  <tr>
                    <td>国際プロモーション資料</td>
                    <td>任意（応相談）</td>
                    <td>掲載（任意）</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="flow" className="kx-section kx-flow">
          <div className="kx-container">
            <h2 className="kx-section-title">お申し込みの流れ</h2>
            <ol className="kx-flow-steps">
              <li><h3>1. プランを選択</h3><p>ご希望のプランをお選びください。</p></li>
              <li><h3>2. Stripeで決済</h3><p>決済完了後、自動返信メールを送付します。</p></li>
              <li><h3>3. ロゴ/表記の提出</h3><p>掲載に必要な情報をご提出いただきます。</p></li>
              <li><h3>4. 掲載・公開</h3><p>制作スケジュールに沿って掲載します。</p></li>
            </ol>
          </div>
        </section>

        <section id="spec" className="kx-section kx-spec">
          <div className="kx-container">
            <h2 className="kx-section-title">掲載仕様・注意事項</h2>
            <div className="kx-spec-grid">
              <div>
                <h3>掲載仕様</h3>
                <ul>
                  <li>ロゴ / 日本語名 / 英語名から選択可能</li>
                  <li>ロゴ：PNG（透過）またはSVG推奨</li>
                  <li>ニックネーム表記可（公序良俗の範囲内）</li>
                </ul>
              </div>

              <div>
                <h3>注意事項</h3>
                <ul>
                  <li>反社会勢力・宗教団体・政治結社・ネットワークビジネス等は不可</li>
                  <li>迷惑メールフォルダに入る場合があります</li>
                  <li>キャリアメール（docomo/softbank等）は届かない場合があります</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="kx-section kx-faq">
          <div className="kx-container">
            <h2 className="kx-section-title">FAQ</h2>

            <div className="kx-faq-list">
              <div className="kx-faq-item">
                <h3>Q. 個人でもスポンサーになれますか？</h3>
                <p>A. はい、個人・法人いずれも可能です。</p>
              </div>
              <div className="kx-faq-item">
                <h3>Q. ロゴと文字表記のどちらでも掲載できますか？</h3>
                <p>A. ロゴ・日本語・英語のいずれも対応しています。</p>
              </div>
            </div>
          </div>
        </section>

        <section id="cta-final" className="kx-section kx-cta-final">
          <div className="kx-container kx-cta-final-inner">
            <div>
              <h2 className="kx-section-title">物語の一部として、世界に名を刻む。</h2>
              <p className="kx-section-lead">
                KUKU ― 一黎明の木神 ― のスポンサーとして、<br />
                あなたの名前・ブランドを物語の中に刻みませんか。
              </p>
            </div>

            <div className="kx-cta-final-actions kx-hero-actions">
              <a href={EPISODE_LINK} className="kx-btn kx-btn-primary">
                1話スポンサーになる（USD 200）
              </a>
              <a href={FULL_LINK} className="kx-btn kx-btn-secondary">
                全巻スポンサー（USD 7,000）
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

const ContinueCard = ({ historyItem, series, onClick }) => (
  <div onClick={() => onClick(series)} className="continue-card">
    <div className="continue-image-wrapper">
      <img src={series.heroUrl || series.coverUrl} className="continue-image" loading="lazy" />
      <div className="play-overlay"><div className="play-circle"><Play size={20} className="text-white ml-1" /></div></div>
    </div>
    <div className="progress-bar-bg"><div className="progress-bar-fill" style={{ width: `${historyItem.progress || 0}%` }}></div></div>
    <div className="continue-info"><span className="text-sm font-bold text-white truncate w-32">{series.title}</span><Info size={20} /></div>
  </div>
);

const DetailModal = ({ series, chapters, isOpen, onClose, onRead, t }) => {
  if (!isOpen || !series) return null;
  const [activeTab, setActiveTab] = useState("episodes");
  const firstChapter = chapters.find((c) => c.status === "published");

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="jump-container">
          <header className="jump-header">
            <button onClick={onClose} className="jump-back-btn"><ChevronLeft size={28} /></button>
            <div className="jump-header-title"></div>
          </header>
          <div className="jump-hero"><img src={series.heroUrl || series.coverUrl} /><div className="jump-hero-gradient"></div></div>
          <div className="jump-info">
            <h1 className="jump-title">{series.title}</h1>
            <p className="jump-author">{series.author}</p>
            <p className="jump-description">{series.description}</p>
            {firstChapter && <button onClick={() => onRead(firstChapter)} className="jump-read-btn"><Play size={24} /> {t.read_first}</button>}
            {series.id === "kuku" && (
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("mx_navigate", { detail: { view: "kukuSponsor" } }))}
                className="jump-read-btn"
                style={{ background: "#C6A667", color: "#0A0A0A" }}
              >
                スポンサー募集ページを見る
              </button>
            )}
          </div>
          <div className="jump-tabs">
            <button onClick={() => setActiveTab("episodes")} className={`jump-tab ${activeTab === "episodes" ? "active" : ""}`}>{t.episodes}</button>
            <button onClick={() => setActiveTab("details")} className={`jump-tab ${activeTab === "details" ? "active" : ""}`}>{t.details}</button>
          </div>
          {activeTab === "episodes" && (
            <div className="jump-episodes">
              {chapters.map((c) => (
                <div key={c.id} className="jump-episode-item" onClick={() => { if (c.status === "published") onRead(c); }} style={{ opacity: c.status === "published" ? 1 : 0.5 }}>
                  <div className="jump-ep-thumb">
                    <img src={c.thumbUrl || series.coverUrl} />
                    {c.status !== "published" && <span className="production-badge">{t.production}</span>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="jump-ep-title">{c.title || `${c.number}話`}</div>
                    {c.status === "published" ? (
                      <div className="jump-ep-meta"><span>{c.publishDate}</span><ThumbsUp size={14} /> {c.likes}</div>
                    ) : (
                      <div className="jump-ep-meta"><span style={{ color: "var(--jump-accent)" }}>{t.sponsor_slots}: {c.sponsors || 0}/{c.sponsorGoal || 5}</span></div>
                    )}
                  </div>
                  {c.status === "published" && <ChevronLeft size={18} style={{ color: "var(--jump-gray)", transform: "rotate(180deg)", flexShrink: 0 }} />}
                  {c.status !== "published" && <button className="jump-sponsor-btn" onClick={(e) => { e.stopPropagation(); alert("Sponsor flow"); }}><Gift size={14} /> {t.support_btn}</button>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const READER_LANGS = [
  { code: "off", label: "原文のみ", flag: "" },
  { code: "en", label: "English", flag: "EN" },
  { code: "ko", label: "한국어", flag: "KO" },
  { code: "zh", label: "中文", flag: "ZH" },
  { code: "es", label: "Español", flag: "ES" },
];

const Reader = ({ chapter, series, onClose, nextChapter, onNextChapter }) => {
  const [showUI, setShowUI] = useState(true);
  const [translations, setTranslations] = useState({});
  const [translationAvailable, setTranslationAvailable] = useState(false);
  const [selectedLang, setSelectedLang] = useState("off");
  const [currentPage, setCurrentPage] = useState(1);
  const [reachedEnd, setReachedEnd] = useState(false);
  const scrollRaf = React.useRef(null);
  const readerRef = React.useRef(null);
  const [preloaded, setPreloaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [showLangPicker, setShowLangPicker] = useState(false);

  const pageCount = chapter.pageCount || 20;
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  // Reset on chapter change
  useEffect(() => {
    setCurrentPage(1);
    setTranslations({});
    setTranslationAvailable(false);
    setPreloaded(false);
    setLoadedCount(0);
    setReachedEnd(false);
    setShowLangPicker(false);
    if (readerRef.current) readerRef.current.scrollTop = 0;
  }, [chapter.id]);

  // Check if translated images exist (probe first page)
  useEffect(() => {
    let cancelled = false;
    const checkTranslation = async () => {
      try {
        const res = await fetch(`/manga/${series.id}/ch${chapter.number}/1_en.png`, { method: "HEAD" });
        if (!cancelled && res.ok) {
          setTranslationAvailable(true);
        }
      } catch {}
    };
    checkTranslation();
    return () => { cancelled = true; };
  }, [chapter.id, series.id, chapter.number]);

  // Preload images
  useEffect(() => {
    let cancelled = false;
    const loadImage = (url) =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
      });

    const preload = async () => {
      for (const p of pages) {
        if (cancelled) return;
        const basePng = `/manga/${series.id}/ch${chapter.number}/${p}.png`;
        const baseJpg = `/manga/${series.id}/ch${chapter.number}/${p}.jpg`;
        const ok = await loadImage(basePng);
        if (!ok) await loadImage(baseJpg);
        setLoadedCount((c) => c + 1);
      }
      if (!cancelled) setPreloaded(true);
    };

    preload();
    return () => { cancelled = true; };
  }, [chapter.id, series.id, pageCount]);

  const handleScroll = () => {
    const el = readerRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const pageHeight = (scrollHeight - clientHeight) / Math.max(pageCount - 1, 1);
    const page = Math.round(scrollTop / Math.max(pageHeight, 1)) + 1;
    const clamped = Math.min(pageCount, Math.max(1, page));
    if (scrollRaf.current) cancelAnimationFrame(scrollRaf.current);
    scrollRaf.current = requestAnimationFrame(() => setCurrentPage(clamped));
  };

  useEffect(() => {
    setReachedEnd(currentPage >= pageCount);
  }, [currentPage, pageCount]);

  const availableLangs = READER_LANGS.filter(
    (l) => l.code === "off" || (translationAvailable && l.code === "en")
  );

  return (
    <div className="reader-container">
      {/* Header */}
      <div className={`reader-header ${showUI ? "" : "hidden"}`} style={{ justifyContent: "space-between", alignItems: "center", gap: "0.75rem" }}>
        <button onClick={onClose} style={{ background: "none", border: "none", color: "white", display: "flex", alignItems: "center", gap: 4 }}>
          <ChevronLeft size={24} />
          <span style={{ fontSize: 14, fontWeight: 600 }}>{series.title}</span>
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: 13, color: "#aaa" }}>{currentPage}/{pageCount}</span>
        </div>
      </div>

      {/* Language toggle (floating) */}
      {translationAvailable && showUI && (
        <div style={{ position: "fixed", top: 60, right: 12, zIndex: 215 }}>
          <button
            onClick={(e) => { e.stopPropagation(); setShowLangPicker(!showLangPicker); }}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              background: selectedLang === "off" ? "rgba(255,255,255,0.12)" : "rgba(229,9,20,0.9)",
              color: "#fff", border: "none", borderRadius: 10,
              padding: "8px 12px", cursor: "pointer", fontWeight: 700, fontSize: 13,
              boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
              backdropFilter: "blur(8px)",
            }}
          >
            <Languages size={16} />
            {selectedLang === "off" ? "翻訳" : availableLangs.find((l) => l.code === selectedLang)?.flag || selectedLang.toUpperCase()}
          </button>
          {showLangPicker && (
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "absolute", top: "100%", right: 0, marginTop: 6,
                background: "rgba(20,20,20,0.95)", backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12,
                padding: "6px 0", minWidth: 160,
                boxShadow: "0 12px 36px rgba(0,0,0,0.6)",
              }}
            >
              {availableLangs.map((l) => (
                <button
                  key={l.code}
                  onClick={() => { setSelectedLang(l.code); setShowLangPicker(false); }}
                  style={{
                    display: "flex", alignItems: "center", gap: 10, width: "100%",
                    padding: "10px 16px", border: "none",
                    background: selectedLang === l.code ? "rgba(229,9,20,0.2)" : "transparent",
                    color: selectedLang === l.code ? "#ff6b6b" : "#e5e5e5",
                    cursor: "pointer", fontSize: 14, fontWeight: selectedLang === l.code ? 700 : 400,
                    textAlign: "left",
                  }}
                >
                  {selectedLang === l.code && <Check size={14} />}
                  <span style={{ marginLeft: selectedLang === l.code ? 0 : 24 }}>{l.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Pages (vertical scroll) */}
      <div
        className="reader-content"
        onClick={() => { setShowUI(!showUI); setShowLangPicker(false); }}
        onScroll={handleScroll}
        ref={readerRef}
      >
        {pages.map((p) => {
          const useLangImg = selectedLang !== "off";
          const basePath = `/manga/${series.id}/ch${chapter.number}`;
          const imgSrc = useLangImg
            ? `${basePath}/${p}_${selectedLang}.png`
            : `${basePath}/${p}.png`;
          return (
            <div key={`${p}-${selectedLang}`} className="reader-page" style={{ background: "#000" }}>
              <img
                id={`reader-img-${p}`}
                src={imgSrc}
                onError={(e) => {
                  // Fallback chain: _en.png → original .png → .jpg → placeholder
                  if (useLangImg && !e.target.dataset.fallback) {
                    e.target.dataset.fallback = "original";
                    e.target.src = `${basePath}/${p}.png`;
                  } else if (e.target.dataset.fallback !== "jpg") {
                    e.target.dataset.fallback = "jpg";
                    e.target.src = `${basePath}/${p}.jpg`;
                  } else {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/800x1200/111/333?text=Page+${p}`;
                  }
                }}
                alt={`Page ${p}`}
              />
            </div>
          );
        })}

        {/* End of chapter */}
        {preloaded && (
          <div style={{
            width: "100%", padding: "48px 24px 120px", textAlign: "center",
            background: "#000", color: "#888",
          }}>
            <div style={{ fontSize: 14, marginBottom: 16 }}>
              {chapter.title || `${chapter.number}話`} - END
            </div>
            {nextChapter && (
              <button
                onClick={() => onNextChapter(nextChapter)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "rgba(229,9,20,0.95)", border: "none", borderRadius: 12,
                  color: "#fff", fontWeight: 800, padding: "0.8rem 1.5rem",
                  cursor: "pointer", boxShadow: "0 10px 24px rgba(0,0,0,0.45)", fontSize: 15,
                }}
              >
                次のエピソードへ <ChevronRight size={18} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Loading overlay */}
      {!preloaded && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          color: "#fff", zIndex: 300, gap: "1rem",
        }}>
          <Loader2 className="animate-spin" size={32} />
          <div style={{ fontWeight: 700, fontSize: 16 }}>読み込み中...</div>
          <div style={{ width: 200, height: 4, borderRadius: 2, background: "#333", overflow: "hidden" }}>
            <div style={{ height: "100%", background: "#e50914", borderRadius: 2, width: `${Math.round((loadedCount / pageCount) * 100)}%`, transition: "width 0.3s" }} />
          </div>
          <div style={{ fontSize: 13, color: "#888" }}>{loadedCount} / {pageCount} pages</div>
        </div>
      )}
    </div>
  );
};

const AdminView = ({ onBack, t }) => (
  <div className="admin-container">
    <div className="admin-header"><button onClick={onBack}><ChevronLeft /></button><h3>{t.admin_title}</h3><div /></div>
    <div className="card">Dashboard Placeholder</div>
  </div>
);

export default function App() {
  const [lang, setLang] = useState("ja");
  const [scrolled, setScrolled] = useState(false);
  const { view, navigate, selectedSeries, openDetail, closeDetail, readingChapter, openReader, closeReader } = useAppNavigation("home");
  const db = useData();
  const t = RESOURCES[lang];
  const openSeries = (series, opts = {}) => {
    if (series?.oneShot && !opts.forceDetail) {
      const ch = db.chapters.find((c) => c.seriesId === series.id && c.number === 1);
      if (ch) {
        openReader(ch, series);
        return;
      }
    }
    openDetail(series);
  };

  const LANG_ORDER = ["ja", "en", "fr", "ar"];
  const LANG_LABELS = { ja: "JP", en: "EN", fr: "FR", ar: "AR" };
  const toggleLang = () => setLang((l) => LANG_ORDER[(LANG_ORDER.indexOf(l) + 1) % LANG_ORDER.length]);

  useEffect(() => {
    document.title = selectedSeries ? `MangaX - ${selectedSeries.title}` : "MangaX - The Cross-Border Manga Platform";
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [selectedSeries]);

  if (readingChapter) {
    const chaptersForSeries = db.chapters
      .filter((c) => c.seriesId === readingChapter.series.id && c.status === "published")
      .sort((a, b) => a.number - b.number);
    const nextChapter = chaptersForSeries.find((c) => c.number > readingChapter.chapter.number) || null;

    return (
      <>
        <style>{STYLES}</style>
        <Reader
          chapter={readingChapter.chapter}
          series={readingChapter.series}
          onClose={closeReader}
          nextChapter={nextChapter}
          onNextChapter={(ch) => openReader(ch, readingChapter.series)}
        />
      </>
    );
  }

  const historyItems = getHistory();
  const featuredSeries = db.series[0];

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"}>
      <style>{STYLES}</style>
      <Header
        scrolled={scrolled}
        activeTab={view}
        setActiveTab={navigate}
        setLang={setLang}
        lang={lang}
      />

      {view === "home" && (
        <div style={{ paddingBottom: "4rem" }}>
          <HeroSection
            series={featuredSeries}
            onRead={() => openDetail(featuredSeries)}
            onMyList={() => alert("Saved")}
            t={t}
          />
          <div className="content-container">
            {historyItems.length > 0 && (
              <SectionRow
                title={t.section_continue}
                items={historyItems.map((h) => {
                  const s = db.series.find((x) => x.id === h.seriesId);
                  return s ? { ...h, ...s } : null;
                }).filter(Boolean)}
                renderItem={(item) => <ContinueCard historyItem={item} series={item} onClick={openDetail} />}
              />
            )}
            <SectionRow
              title={t.section_new}
              items={db.chapters
                .filter((c) => c.status === "published")
                .map((c) => ({ ...c, series: db.series.find((s) => s.id === c.seriesId) }))
                .filter((c) => c.series)}
              renderItem={(ep) => (
                <NewEpisodeCard
                  episode={ep}
                  onClick={(episode) => {
                    const series = db.series.find((s) => s.id === episode.seriesId);
                    if (series) {
                      openReader(episode, series);
                    }
                  }}
                />
              )}
            />
            <SectionRow title={t.section_trending} items={[...db.series].reverse()} renderItem={(s) => <PosterCard series={s} onClick={openSeries} t={t} />} />
            <ServicePitch onShowFlow={() => navigate("flow")} />
          </div>
        </div>
      )}

      {view === "install" && <InstallPage />}
      {view === "flow" && <StoryLanding onBack={() => navigate("home")} />}
      {view === "kukuSponsor" && <KukuSponsorPage onBack={() => navigate("home")} />}

      {view === "mypage" && (
        <div className="bg-black min-h-screen pt-20 px-4 text-white">
          <h1>{t.guest_name}</h1>
        </div>
      )}

      <DetailModal
        series={selectedSeries}
        isOpen={!!selectedSeries}
        onClose={closeDetail}
        t={t}
        chapters={db.chapters.filter((c) => selectedSeries && c.seriesId === selectedSeries.id)}
        onRead={(ch) => openReader(ch, selectedSeries)}
      />

      <BottomNav activeTab={view} setActiveTab={navigate} t={t} />
    </div>
  );
}
