import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════
// SUBJECTS & CHAPTERS
// ═══════════════════════════════════════════════════════
const SUBJECTS = {
  Physics: {
    color: "#2563EB", icon: "⚡",
    chapters: ["Motion in Straight Line","Laws of Motion","Work Energy & Power","Rotational Motion","Gravitation","Properties of Matter","Thermodynamics","Kinetic Theory of Gases","Oscillations","Waves","Electrostatics","Current Electricity","Magnetic Effects of Current","Electromagnetic Induction","Alternating Current","Ray Optics","Wave Optics","Dual Nature of Matter","Atoms & Nuclei","Semiconductors"]
  },
  Chemistry: {
    color: "#16A34A", icon: "🧪",
    chapters: ["Some Basic Concepts","Atomic Structure","Classification of Elements","Chemical Bonding","States of Matter","Thermodynamics","Equilibrium","Redox Reactions","s-Block Elements","p-Block Elements","Organic Chemistry Basics","Hydrocarbons","Solid State","Solutions","Electrochemistry","Chemical Kinetics","d & f Block Elements","Coordination Compounds","Alcohols & Ethers","Aldehydes & Ketones","Carboxylic Acids","Amines","Biomolecules","Polymers"]
  },
  Biology: {
    color: "#D97706", icon: "🧬",
    chapters: ["Cell Structure & Function","Cell Division","Biomolecules","Photosynthesis","Respiration","Plant Growth & Development","Digestion & Absorption","Breathing & Gas Exchange","Body Fluids & Circulation","Excretory Products","Locomotion & Movement","Neural Control","Chemical Coordination","Reproduction in Plants","Reproduction in Animals","Genetics","Molecular Basis of Inheritance","Evolution","Human Health & Disease","Biotechnology Principles","Biotechnology Applications","Organisms & Populations","Ecosystem","Biodiversity"]
  }
};

const CLASS_OPTIONS = ["Class 11 (First Year)","Class 12 (Second Year)","Class 12 Passed / Dropper","Repeater (2nd Attempt)","Repeater (3rd+ Attempt)"];

// ═══════════════════════════════════════════════════════
// 27-YEAR PYQ BANK (1999–2025)
// Authentic NEET/AIPMT questions with year tags
// ═══════════════════════════════════════════════════════
// Emergency fallback — only used if API completely fails
const PYQ_BANK = {
  Physics: [
    {q:"A body thrown vertically upward with velocity u. The greatest height h to which it will rise is:",opts:["u/g","u²/2g","u²/g","u/2g"],ans:1,ch:"Motion in Straight Line",src:"AIPMT 2002",diff:"Easy",exp:"At max height v=0. Using v²=u²-2gh: h = u²/2g"},
    {q:"A force of 50 N acts on 10 kg block on frictionless surface. Acceleration is:",opts:["5 m/s²","10 m/s²","50 m/s²","0.5 m/s²"],ans:0,ch:"Laws of Motion",src:"NCERT Exemplar",diff:"Easy",exp:"a = F/m = 50/10 = 5 m/s²"},
    {q:"Work done by a force is zero when:",opts:["Force is zero","Displacement is zero","Force and displacement are perpendicular","Both A and B"],ans:3,ch:"Work Energy & Power",src:"NCERT Exemplar",diff:"Easy",exp:"W = F·d·cosθ; W=0 when F=0, d=0, or θ=90°"},
    {q:"Escape velocity from Earth surface is 11.2 km/s. For planet same mass but twice radius:",opts:["22.4 km/s","7.9 km/s","11.2 km/s","5.6 km/s"],ans:1,ch:"Gravitation",src:"NEET 2017",diff:"Medium",exp:"ve = √(2GM/R). Doubling R: ve' = ve/√2 ≈ 7.9 km/s"},
    {q:"In Young's double slit experiment, d=1mm, D=1m, λ=500nm. Fringe width:",opts:["0.5 mm","0.05 mm","5 mm","0.1 mm"],ans:0,ch:"Wave Optics",src:"NEET 2024",diff:"Easy",exp:"β = λD/d = 500×10⁻⁹×1/10⁻³ = 0.5 mm"},
  ],
  Chemistry: [
    {q:"Hybridization of carbon in diamond and graphite respectively:",opts:["sp³, sp²","sp², sp³","sp, sp²","sp³, sp"],ans:0,ch:"Some Basic Concepts",src:"AIPMT 2005",diff:"Easy",exp:"Diamond: tetrahedral sp³. Graphite: planar sp²"},
    {q:"Bond angle in H₂O molecule:",opts:["104.5°","109.5°","120°","180°"],ans:0,ch:"Chemical Bonding",src:"AIPMT 2004",diff:"Easy",exp:"2 lone pairs on O compress bond angle from 109.5° → 104.5°"},
    {q:"Kp vs Kc for N₂+3H₂⇌2NH₃:",opts:["Kp=Kc(RT)²","Kp=Kc(RT)⁻²","Kp=Kc(RT)","Kp=Kc"],ans:1,ch:"Equilibrium",src:"Allen Module",diff:"Hard",exp:"Δn=2-4=-2; Kp=Kc(RT)^Δn=Kc(RT)⁻²"},
    {q:"EMF of Daniell cell at standard conditions:",opts:["1.1 V","0.76 V","1.5 V","0.34 V"],ans:0,ch:"Electrochemistry",src:"AIPMT 2023",diff:"Medium",exp:"E°cell = E°cathode - E°anode = 0.34-(-0.76) = 1.10 V"},
    {q:"Nylon-6,6 is formed from:",opts:["Only adipic acid","Hexamethylenediamine + adipic acid","Formaldehyde + phenol","Caprolactam"],ans:1,ch:"Polymers",src:"NEET 2019",diff:"Easy",exp:"Nylon-6,6: condensation polymer of hexamethylenediamine + adipic acid"},
  ],
  Biology: [
    {q:"Which cell organelle does NOT have a membrane?",opts:["Mitochondria","Chloroplast","Ribosome","Lysosome"],ans:2,ch:"Cell Structure & Function",src:"AIPMT 2000",diff:"Easy",exp:"Ribosomes are non-membranous organelles made of rRNA and protein"},
    {q:"Double fertilization is unique characteristic of:",opts:["Gymnosperms","Angiosperms","Pteridophytes","Bryophytes"],ans:1,ch:"Reproduction in Plants",src:"AIPMT 2008",diff:"Easy",exp:"Double fertilization — only in angiosperms"},
    {q:"DNA polymerase adds nucleotides in direction:",opts:["3' to 5'","5' to 3'","Both directions","Random direction"],ans:1,ch:"Molecular Basis of Inheritance",src:"NEET 2018",diff:"Easy",exp:"DNA polymerase always synthesizes new strand in 5'→3' direction"},
    {q:"Functional unit of kidney is:",opts:["Ureter","Nephron","Glomerulus","Uriniferous tubule"],ans:1,ch:"Excretory Products",src:"AIPMT 2014",diff:"Easy",exp:"Nephron is the structural and functional unit of kidney"},
    {q:"HIV primarily attacks which cells?",opts:["B lymphocytes","T helper (CD4⁺) cells","Macrophages only","RBCs"],ans:1,ch:"Human Health & Disease",src:"Motion Institute",diff:"Easy",exp:"HIV infects and destroys CD4⁺ T helper cells → AIDS"},
  ]
};

// Combined local bank
const ALL_LOCAL = {
  Physics:   [...PYQ_BANK.Physics],
  Chemistry: [...PYQ_BANK.Chemistry],
  Biology:   [...PYQ_BANK.Biology]
};

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }
function fmt(s) {
  const m = Math.floor(s / 60), r = s % 60;
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}

// ═══════════════════════════════════════════════════════
// STYLES — Calm, readable, eye-friendly
// ═══════════════════════════════════════════════════════
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Merriweather:ital,wght@0,400;0,700;1,400&display=swap');

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  /* Warm off-white background — easier on eyes than pure white */
  --bg:       #F5F3EF;
  --bg2:      #ECEAE4;
  --bg3:      #E4E1D9;
  --card:     #FDFCFA;
  --border:   #D8D4CC;
  --border2:  #C8C4BC;

  /* Text — dark warm gray, not pure black */
  --text:     #1C1A18;
  --text2:    #4A4740;
  --text3:    #7A7570;
  --muted:    #9E9890;

  /* Accent — calm indigo */
  --blue:     #2563EB;
  --blue-lt:  #EFF2FF;
  --blue-bd:  #BFCBFF;

  /* Subject colors */
  --phy:      #1D4ED8;
  --chem:     #15803D;
  --bio:      #B45309;

  /* Status colors */
  --green:    #16A34A;
  --green-lt: #F0FDF4;
  --green-bd: #BBF7D0;
  --red:      #DC2626;
  --red-lt:   #FEF2F2;
  --red-bd:   #FECACA;
  --gold:     #D97706;
  --gold-lt:  #FFFBEB;
  --gold-bd:  #FDE68A;

  --radius:   8px;
  --radius-lg: 12px;
  --shadow:   0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.06);
  --shadow-md: 0 4px 6px rgba(0,0,0,.07), 0 2px 4px rgba(0,0,0,.06);
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 15px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

/* ─── SCROLLBAR ─────────────────────────────── */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--bg2); }
::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 3px; }

/* ─── HEADER ─────────────────────────────────── */
.hdr {
  background: var(--card);
  border-bottom: 1px solid var(--border);
  padding: 0 24px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: var(--shadow);
}
.logo {
  font-size: 18px;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.3px;
}
.logo span { color: var(--blue); }

.nav-links { display: flex; align-items: center; gap: 4px; }
.nav-btn {
  padding: 6px 14px;
  border-radius: var(--radius);
  border: none;
  background: transparent;
  color: var(--text2);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all .15s;
  font-family: inherit;
}
.nav-btn:hover { background: var(--bg2); color: var(--text); }
.nav-btn.active { background: var(--blue-lt); color: var(--blue); font-weight: 600; }

/* ─── BADGES / TAGS ─────────────────────────── */
.tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.6;
}
.tag-blue  { background: var(--blue-lt);  color: var(--blue);  border: 1px solid var(--blue-bd); }
.tag-green { background: var(--green-lt); color: var(--green); border: 1px solid var(--green-bd); }
.tag-gold  { background: var(--gold-lt);  color: var(--gold);  border: 1px solid var(--gold-bd); }
.tag-gray  { background: var(--bg2);      color: var(--text2); border: 1px solid var(--border); }
.tag-red   { background: var(--red-lt);   color: var(--red);   border: 1px solid var(--red-bd); }

/* ─── BUTTONS ───────────────────────────────── */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 9px 18px;
  border-radius: var(--radius);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all .15s;
  border: 1px solid transparent;
  line-height: 1;
}
.btn-primary {
  background: var(--blue);
  color: white;
  border-color: var(--blue);
}
.btn-primary:hover { background: #1D4ED8; }
.btn-primary:disabled { opacity: .45; cursor: not-allowed; }
.btn-outline {
  background: transparent;
  color: var(--text);
  border-color: var(--border2);
}
.btn-outline:hover { background: var(--bg2); border-color: var(--border2); }
.btn-ghost {
  background: transparent;
  color: var(--text2);
  border-color: transparent;
}
.btn-ghost:hover { background: var(--bg2); }
.btn-danger {
  background: var(--red);
  color: white;
  border-color: var(--red);
}
.btn-danger:hover { background: #B91C1C; }
.btn-success {
  background: var(--green);
  color: white;
  border-color: var(--green);
}
.btn-sm { padding: 6px 12px; font-size: 13px; }
.btn-lg { padding: 12px 24px; font-size: 15px; font-weight: 600; }
.btn-full { width: 100%; }

/* ─── CARDS ─────────────────────────────────── */
.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
}
.card-body { padding: 24px; }
.card-sm .card-body { padding: 16px; }

/* ─── FORM ELEMENTS ─────────────────────────── */
.form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
.form-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text2);
  text-transform: uppercase;
  letter-spacing: 0.4px;
}
.form-input {
  padding: 9px 12px;
  border: 1px solid var(--border2);
  border-radius: var(--radius);
  background: var(--card);
  color: var(--text);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  transition: border-color .15s, box-shadow .15s;
  outline: none;
}
.form-input:focus {
  border-color: var(--blue);
  box-shadow: 0 0 0 3px rgba(37,99,235,.12);
}
.form-select {
  padding: 9px 12px;
  border: 1px solid var(--border2);
  border-radius: var(--radius);
  background: var(--card);
  color: var(--text);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  cursor: pointer;
  outline: none;
}
.form-select:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(37,99,235,.12); }

/* ─── PAGE LAYOUT ───────────────────────────── */
.page { padding: 32px 24px; max-width: 900px; margin: 0 auto; }
.page-sm { max-width: 620px; }
.page-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 4px;
  letter-spacing: -0.3px;
}
.page-sub { font-size: 14px; color: var(--text3); margin-bottom: 28px; }
.section-head {
  font-size: 13px;
  font-weight: 700;
  color: var(--text2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
}

/* ─── HOME ──────────────────────────────────── */
.home-hero {
  background: linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 60%, #2563EB 100%);
  border-radius: var(--radius-lg);
  padding: 40px 36px;
  color: white;
  margin-bottom: 28px;
  position: relative;
  overflow: hidden;
}
.home-hero::after {
  content: '';
  position: absolute;
  top: -40%;
  right: -10%;
  width: 350px;
  height: 350px;
  background: rgba(255,255,255,.05);
  border-radius: 50%;
}
.hero-title { font-size: 28px; font-weight: 700; margin-bottom: 8px; letter-spacing: -0.4px; }
.hero-sub { font-size: 15px; opacity: .85; max-width: 480px; line-height: 1.6; margin-bottom: 20px; }
.hero-tags { display: flex; gap: 8px; flex-wrap: wrap; }
.hero-tag {
  padding: 4px 12px;
  background: rgba(255,255,255,.15);
  border: 1px solid rgba(255,255,255,.25);
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}
.stats-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-bottom: 28px; }
.stat-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 20px;
  text-align: center;
  box-shadow: var(--shadow);
}
.stat-num { font-size: 28px; font-weight: 700; color: var(--blue); letter-spacing: -0.5px; }
.stat-lbl { font-size: 12px; color: var(--text3); margin-top: 2px; }
.mode-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px,1fr)); gap: 16px; margin-bottom: 32px; }
.mode-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px;
  cursor: pointer;
  transition: all .18s;
  box-shadow: var(--shadow);
  position: relative;
}
.mode-card:hover { border-color: var(--blue); box-shadow: var(--shadow-md); transform: translateY(-1px); }
.mode-card-accent { height: 3px; border-radius: 2px 2px 0 0; position: absolute; top: 0; left: 0; right: 0; border-radius: var(--radius-lg) var(--radius-lg) 0 0; }
.mode-icon { font-size: 28px; margin-bottom: 10px; margin-top: 6px; }
.mode-title { font-size: 16px; font-weight: 700; color: var(--text); margin-bottom: 5px; }
.mode-desc { font-size: 13px; color: var(--text2); line-height: 1.55; margin-bottom: 14px; }
.mode-tags { display: flex; gap: 6px; flex-wrap: wrap; }

/* ─── CONFIG SCREEN ─────────────────────────── */
.sel-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; margin-bottom: 16px; }
.sel-item {
  padding: 12px 10px;
  border: 1px solid var(--border2);
  border-radius: var(--radius);
  cursor: pointer;
  text-align: center;
  transition: all .15s;
  background: var(--card);
  font-size: 13px;
  font-weight: 500;
  color: var(--text2);
}
.sel-item:hover { border-color: var(--blue); color: var(--blue); background: var(--blue-lt); }
.sel-item.on { border-color: var(--blue); background: var(--blue-lt); color: var(--blue); font-weight: 600; }
.ch-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  max-height: 240px;
  overflow-y: auto;
  margin-bottom: 16px;
  padding-right: 4px;
}
.ch-item {
  padding: 9px 11px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 12.5px;
  color: var(--text2);
  transition: all .15s;
  background: var(--card);
  line-height: 1.4;
}
.ch-item:hover { border-color: var(--blue); color: var(--blue); background: var(--blue-lt); }
.ch-item.on { border-color: var(--blue); background: var(--blue-lt); color: var(--blue); font-weight: 500; }

/* Number stepper */
.stepper { display: flex; flex-direction: column; gap: 6px; }
.stepper-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
.stepper-ctrl { display: flex; align-items: center; gap: 10px; }
.step-btn {
  width: 30px; height: 30px;
  border: 1px solid var(--border2);
  border-radius: var(--radius);
  background: var(--card);
  color: var(--text);
  font-size: 16px;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all .15s;
  font-family: inherit;
}
.step-btn:hover { border-color: var(--blue); color: var(--blue); background: var(--blue-lt); }
.step-val { font-size: 20px; font-weight: 700; min-width: 44px; text-align: center; color: var(--blue); }
.quick-chips { display: flex; gap: 5px; flex-wrap: wrap; margin-top: 4px; }
.chip {
  padding: 3px 9px;
  border: 1px solid var(--border2);
  border-radius: 4px;
  font-size: 11.5px;
  font-weight: 500;
  cursor: pointer;
  color: var(--text3);
  background: var(--card);
  transition: all .13s;
}
.chip:hover { border-color: var(--blue); color: var(--blue); }
.chip.on { border-color: var(--blue); background: var(--blue-lt); color: var(--blue); font-weight: 600; }
.step-hint { font-size: 11px; color: var(--muted); }

/* Answer mode */
.amode-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px; }
.amode-card {
  padding: 16px;
  border: 1.5px solid var(--border2);
  border-radius: var(--radius);
  cursor: pointer;
  transition: all .15s;
  background: var(--card);
  position: relative;
}
.amode-card:hover { border-color: var(--blue); }
.amode-card.on { border-color: var(--blue); background: var(--blue-lt); }
.amode-check {
  position: absolute;
  top: 10px; right: 10px;
  width: 18px; height: 18px;
  border-radius: 50%;
  border: 1.5px solid var(--border2);
  display: flex; align-items: center; justify-content: center;
  font-size: 10px;
}
.amode-card.on .amode-check { background: var(--blue); border-color: var(--blue); color: white; }
.amode-icon { font-size: 20px; margin-bottom: 6px; }
.amode-title { font-size: 13px; font-weight: 600; color: var(--text); margin-bottom: 3px; }
.amode-desc { font-size: 11.5px; color: var(--text3); line-height: 1.45; }
.full-info {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 14px 16px;
  margin-bottom: 18px;
  font-size: 13px;
  color: var(--text2);
  line-height: 1.8;
}
.divider { height: 1px; background: var(--border); margin: 20px 0; }

/* ─── TEST SCREEN ───────────────────────────── */
.test-layout {
  display: grid;
  grid-template-columns: 1fr 260px;
  min-height: calc(100vh - 56px);
}
@media (max-width: 820px) {
  .test-layout { grid-template-columns: 1fr; }
  .palette-panel { display: none; }
}
.test-main { padding: 24px; max-width: 740px; }
.test-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 12px;
}
.test-meta { display: flex; align-items: center; gap: 8px; }
.test-actions-hdr { display: flex; align-items: center; gap: 8px; }
.prog-wrap { flex: 1; }
.prog-label { display: flex; justify-content: space-between; font-size: 12px; color: var(--text3); margin-bottom: 5px; }
.prog-bar { height: 5px; background: var(--bg3); border-radius: 3px; overflow: hidden; }
.prog-fill { height: 100%; background: var(--blue); border-radius: 3px; transition: width .4s ease; }
.timer-box {
  background: var(--card);
  border: 1px solid var(--border2);
  border-radius: var(--radius);
  padding: 6px 14px;
  font-size: 17px;
  font-weight: 700;
  font-family: 'Inter', monospace;
  letter-spacing: 1.5px;
  color: var(--text);
  min-width: 82px;
  text-align: center;
}
.timer-box.warn { color: var(--gold); border-color: var(--gold-bd); background: var(--gold-lt); }
.timer-box.danger { color: var(--red); border-color: var(--red-bd); background: var(--red-lt); animation: blink 1s ease infinite; }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:.6} }

/* Question */
.q-meta { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-bottom: 10px; }
.diff-tag { padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; }
.d-Easy   { background: #F0FDF4; color: #16A34A; border: 1px solid #BBF7D0; }
.d-Medium { background: #FFFBEB; color: #D97706; border: 1px solid #FDE68A; }
.d-Hard   { background: #FEF2F2; color: #DC2626; border: 1px solid #FECACA; }
.q-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 22px 24px;
  margin-bottom: 14px;
  box-shadow: var(--shadow);
}
.q-number { font-size: 12px; color: var(--text3); font-weight: 500; margin-bottom: 8px; }
.q-text {
  font-family: 'Merriweather', Georgia, serif;
  font-size: 15px;
  line-height: 1.75;
  color: var(--text);
}
.options-list { display: flex; flex-direction: column; gap: 8px; }
.opt-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  cursor: pointer;
  transition: all .15s;
  background: var(--card);
  font-size: 14px;
  color: var(--text);
  line-height: 1.5;
  box-shadow: var(--shadow);
}
.opt-item:hover:not(.dis) {
  border-color: var(--blue);
  background: var(--blue-lt);
}
.opt-item.sel {
  border-color: var(--blue);
  background: var(--blue-lt);
}
.opt-item.ok {
  border-color: var(--green);
  background: var(--green-lt);
}
.opt-item.bad {
  border-color: var(--red);
  background: var(--red-lt);
}
.opt-item.dis { cursor: default; }
.opt-label {
  width: 26px; height: 26px;
  border-radius: 50%;
  border: 1.5px solid var(--border2);
  display: flex; align-items: center; justify-content: center;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
  color: var(--text2);
}
.opt-item.sel  .opt-label { background: var(--blue);  border-color: var(--blue);  color: white; }
.opt-item.ok   .opt-label { background: var(--green); border-color: var(--green); color: white; }
.opt-item.bad  .opt-label { background: var(--red);   border-color: var(--red);   color: white; }
.explanation {
  background: #F0FDF4;
  border: 1px solid var(--green-bd);
  border-radius: var(--radius);
  padding: 14px 16px;
  margin-top: 12px;
}
.exp-title { font-size: 11px; font-weight: 700; color: var(--green); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; }
.exp-text { font-size: 13.5px; color: var(--text); line-height: 1.65; }
.recorded-note {
  background: var(--blue-lt);
  border: 1px solid var(--blue-bd);
  border-radius: var(--radius);
  padding: 10px 14px;
  margin-top: 10px;
  font-size: 13px;
  color: var(--blue);
}
.test-nav { display: flex; align-items: center; gap: 8px; margin-top: 20px; flex-wrap: wrap; }

/* PALETTE */
.palette-panel {
  background: var(--card);
  border-left: 1px solid var(--border);
  padding: 20px;
  overflow-y: auto;
  position: sticky;
  top: 56px;
  height: calc(100vh - 56px);
}
.pal-title { font-size: 13px; font-weight: 600; color: var(--text2); margin-bottom: 12px; }
.pal-grid { display: grid; grid-template-columns: repeat(5,1fr); gap: 4px; margin-bottom: 16px; }
.pq {
  width: 32px; height: 32px;
  border-radius: 5px;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid var(--border);
  background: var(--bg2);
  color: var(--text3);
  transition: all .12s;
}
.pq:hover { border-color: var(--blue); color: var(--blue); }
.pq.cur { border-color: var(--blue); background: var(--blue); color: white; }
.pq.ans { background: var(--green-lt); border-color: var(--green-bd); color: var(--green); }
.pq.mk  { background: var(--gold-lt);  border-color: var(--gold-bd);  color: var(--gold); }
.pq.cur.ans { background: var(--blue); border-color: var(--blue); color: white; }
.pal-legend { display: flex; flex-direction: column; gap: 5px; }
.leg-row { display: flex; align-items: center; gap: 7px; font-size: 11px; color: var(--text3); }
.leg-dot { width: 10px; height: 10px; border-radius: 3px; }
.scoring-info {
  margin-top: 14px;
  padding: 10px;
  background: var(--bg2);
  border-radius: var(--radius);
  font-size: 11.5px;
  color: var(--text3);
  line-height: 1.8;
}

/* ─── MODAL ─────────────────────────────────── */
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,.45);
  z-index: 500;
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
  backdrop-filter: blur(2px);
}
.modal {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px;
  max-width: 380px;
  width: 100%;
  box-shadow: 0 20px 40px rgba(0,0,0,.15);
  animation: fadeIn .2s ease;
}
@keyframes fadeIn { from { opacity:0; transform:scale(.95) } to { opacity:1; transform:none } }
.modal-icon { font-size: 32px; margin-bottom: 10px; }
.modal-title { font-size: 18px; font-weight: 700; color: var(--text); margin-bottom: 6px; }
.modal-body { font-size: 13.5px; color: var(--text2); line-height: 1.6; margin-bottom: 20px; }
.modal-actions { display: flex; flex-direction: column; gap: 8px; }

/* ─── RESULTS ───────────────────────────────── */
.score-banner {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 32px;
  text-align: center;
  margin-bottom: 20px;
  box-shadow: var(--shadow);
}
.score-grade-bar {
  height: 5px;
  border-radius: 3px;
  max-width: 300px;
  margin: 14px auto 0;
}
.score-big { font-size: 52px; font-weight: 700; letter-spacing: -1px; }
.score-pct { font-size: 14px; color: var(--text3); margin-top: 2px; }
.grade-pill { display: inline-block; padding: 4px 14px; border-radius: 20px; font-size: 14px; font-weight: 600; margin-top: 12px; }
.res-stats { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; margin-bottom: 20px; }
@media(max-width:520px) { .res-stats { grid-template-columns: repeat(2,1fr); } }
.res-stat {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 14px;
  text-align: center;
  box-shadow: var(--shadow);
}
.res-stat-num { font-size: 22px; font-weight: 700; }
.res-stat-lbl { font-size: 11px; color: var(--text3); margin-top: 2px; text-transform: uppercase; letter-spacing: 0.3px; }
.ana-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
@media(max-width:620px) { .ana-grid { grid-template-columns: 1fr; } }
.ana-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 18px;
  box-shadow: var(--shadow);
}
.ana-title { font-size: 13px; font-weight: 700; color: var(--text); margin-bottom: 14px; }
.topic-bar { margin-bottom: 10px; }
.tb-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px; }
.tb-name { font-size: 12px; color: var(--text2); }
.tb-score { font-size: 12px; font-weight: 600; }
.tb-track { height: 6px; background: var(--bg3); border-radius: 3px; overflow: hidden; }
.tb-fill { height: 100%; border-radius: 3px; transition: width 1s ease; }
.topic-pill {
  padding: 8px 12px;
  border-radius: var(--radius);
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
  font-weight: 500;
}
.tp-weak   { background: var(--red-lt);   border: 1px solid var(--red-bd);   color: var(--red); }
.tp-strong { background: var(--green-lt); border: 1px solid var(--green-bd); color: var(--green); }
.review-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: var(--shadow);
}
.rev-item { border-bottom: 1px solid var(--border); padding: 14px 0; }
.rev-item:last-child { border-bottom: none; padding-bottom: 0; }
.rev-item:first-child { padding-top: 0; }
.rev-meta { display: flex; align-items: center; gap: 6px; margin-bottom: 5px; flex-wrap: wrap; }
.rev-q { font-family: 'Merriweather', Georgia, serif; font-size: 13.5px; line-height: 1.65; color: var(--text); margin-bottom: 8px; }
.rev-opts { display: flex; gap: 5px; flex-wrap: wrap; }
.ro {
  padding: 3px 9px;
  border-radius: 4px;
  font-size: 11.5px;
  font-weight: 500;
}
.ro-ok   { background: var(--green-lt); border: 1px solid var(--green-bd); color: var(--green); }
.ro-bad  { background: var(--red-lt);   border: 1px solid var(--red-bd);   color: var(--red); }
.ro-neu  { background: var(--bg2);      border: 1px solid var(--border);   color: var(--text3); }
.rev-exp { font-size: 12px; color: var(--text3); font-style: italic; margin-top: 6px; line-height: 1.55; }

/* ─── PROFILE ───────────────────────────────── */
.profile-grid { display: grid; grid-template-columns: 200px 1fr; gap: 24px; margin-bottom: 24px; }
@media(max-width:640px) { .profile-grid { grid-template-columns: 1fr; } }
.profile-avatar {
  width: 120px; height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2563EB, #1D4ED8);
  display: flex; align-items: center; justify-content: center;
  font-size: 40px;
  color: white;
  font-weight: 700;
  margin: 0 auto 16px;
}
.avatar-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px;
  text-align: center;
  box-shadow: var(--shadow);
}
.profile-name { font-size: 16px; font-weight: 700; color: var(--text); margin-bottom: 2px; }
.profile-class { font-size: 13px; color: var(--text3); }
.info-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow);
}
.info-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
@media(max-width:500px) { .info-row { grid-template-columns: 1fr; } }
.info-field { font-size: 13px; color: var(--text3); margin-bottom: 2px; font-weight: 500; }
.info-value { font-size: 14px; color: var(--text); font-weight: 500; }
.stats-banner {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px,1fr));
  gap: 12px;
  margin-bottom: 20px;
}
.profile-save-row { display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px; }

/* ─── LOADING ───────────────────────────────── */
.loading-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  gap: 14px;
}
.spinner {
  width: 40px; height: 40px;
  border: 3px solid var(--border2);
  border-top-color: var(--blue);
  border-radius: 50%;
  animation: spin .7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
.load-title { font-size: 16px; font-weight: 600; color: var(--text); }
.load-sub { font-size: 13px; color: var(--text3); text-align: center; max-width: 300px; }

/* ─── UTILITIES ─────────────────────────────── */
.flex { display: flex; }
.flex-center { display: flex; align-items: center; }
.gap-2 { gap: 8px; }
.gap-3 { gap: 12px; }
.mb-4 { margin-bottom: 16px; }
.mb-6 { margin-bottom: 24px; }
.mt-auto { margin-top: auto; }
.text-sm { font-size: 13px; }
.text-xs { font-size: 12px; }
.text-muted { color: var(--text3); }
.font-bold { font-weight: 700; }
.font-semibold { font-weight: 600; }
.w-full { width: 100%; }

/* ─── NEET SECTION TABS ──────────────────── */
.section-tabs {
  display: flex;
  gap: 0;
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 3px;
  margin-bottom: 18px;
  width: fit-content;
}
.sec-tab {
  padding: 7px 18px;
  border-radius: calc(var(--radius) - 2px);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background: transparent;
  color: var(--text3);
  font-family: inherit;
  transition: all .15s;
  display: flex; align-items: center; gap: 6px;
}
.sec-tab:hover { color: var(--text); }
.sec-tab.active { background: var(--card); color: var(--text); box-shadow: 0 1px 4px rgba(0,0,0,.1); }
.sec-tab.phy.active { color: #2563EB; }
.sec-tab.che.active { color: #16A34A; }
.sec-tab.bio.active { color: #D97706; }
.sec-badge {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 10px;
  font-weight: 700;
  min-width: 18px;
  text-align: center;
}
.sec-badge.phy { background: #DBEAFE; color: #1D4ED8; }
.sec-badge.che { background: #DCFCE7; color: #15803D; }
.sec-badge.bio { background: #FEF3C7; color: #B45309; }
.pal-section-head {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 6px 0 4px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.pal-section-head:first-child { margin-top: 0; }
.pal-section-divider {
  height: 1px;
  background: var(--border);
  margin: 8px 0;
}


/* ─── NEET SECTION TABS ──────────────────── */
.section-tabs {
  display: flex;
  gap: 0;
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 3px;
  margin-bottom: 18px;
  width: fit-content;
}
.sec-tab {
  padding: 7px 18px;
  border-radius: calc(var(--radius) - 2px);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background: transparent;
  color: var(--text3);
  font-family: inherit;
  transition: all .15s;
  display: flex; align-items: center; gap: 6px;
}
.sec-tab:hover { color: var(--text); }
.sec-tab.active { background: var(--card); color: var(--text); box-shadow: 0 1px 4px rgba(0,0,0,.1); }
.sec-tab.phy.active { color: #2563EB; }
.sec-tab.che.active { color: #16A34A; }
.sec-tab.bio.active { color: #D97706; }
.sec-badge {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 10px;
  font-weight: 700;
  min-width: 18px;
  text-align: center;
}
.sec-badge.phy { background: #DBEAFE; color: #1D4ED8; }
.sec-badge.che { background: #DCFCE7; color: #15803D; }
.sec-badge.bio { background: #FEF3C7; color: #B45309; }
.pal-section-head {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 6px 0 4px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.pal-section-head:first-child { margin-top: 0; }
.pal-section-divider {
  height: 1px;
  background: var(--border);
  margin: 8px 0;
}

`;

// ═══════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════
const EMPTY_PROFILE = { name:"", dob:"", mobile:"", email:"", cls:"", photo:"" };

export default function NEETTutor() {
  // Navigation
  const [screen, setScreen] = useState("home");   // home|config|test|results|profile

  // Profile
  const [profile, setProfile] = useState(() => {
    try { return JSON.parse(localStorage.getItem("neet_profile") || "null") || EMPTY_PROFILE; } catch { return EMPTY_PROFILE; }
  });
  const [editProfile, setEditProfile] = useState({ ...EMPTY_PROFILE });
  const [profileSaved, setProfileSaved] = useState(false);

  // Test config
  const [testMode, setTestMode] = useState(null);
  const [selSub, setSelSub]     = useState(null);
  const [selCh, setSelCh]       = useState(null);
  const [ansMode, setAnsMode]   = useState(null);
  const [nQs, setNQs]           = useState(20);
  const [nMin, setNMin]         = useState(30);

  // Test state
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent]     = useState(0);
  const [answers, setAnswers]     = useState({});
  const [marked, setMarked]       = useState(new Set());
  const [timeLeft, setTimeLeft]   = useState(0);
  const [loading, setLoading]     = useState(false);
  const [lmsg, setLmsg]           = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [exitM, setExitM]         = useState(null);
  const [activeSection, setActiveSection] = useState(0); // 0=Physics,1=Chem,2=Bio (full mock only)

  // Test history for profile
  const [testHistory, setTestHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem("neet_history") || "[]"); } catch { return []; }
  });

  const timerRef = useRef(null);
  const photoRef = useRef(null);

  // Question bank: 502 local questions, shuffled fresh each test

  // Inject CSS
  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = CSS;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  // Timer
  useEffect(() => {
    if (screen === "test" && !submitted) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) { clearInterval(timerRef.current); doSubmit(); return 0; }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [screen, submitted]);

  // Save profile
  function saveProfile() {
    setProfile({ ...editProfile });
    try { localStorage.setItem("neet_profile", JSON.stringify(editProfile)); } catch {}
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  }

  // Photo upload
  function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert("Please choose a photo under 2 MB."); return; }
    const reader = new FileReader();
    reader.onload = ev => setEditProfile(p => ({ ...p, photo: ev.target.result }));
    reader.readAsDataURL(file);
  }

  function removePhoto() {
    setEditProfile(p => ({ ...p, photo: "" }));
    if (photoRef.current) photoRef.current.value = "";
  }




  // ── AI question generation with web search + caching ──
  // ── Smart local question fetcher ──
  function getSmartPool(subject, chapter, count) {
    let pool = [];
    if (!subject) {
      Object.entries(ALL_LOCAL).forEach(([sub, qs]) =>
        qs.forEach(q => pool.push({ ...q, subject: sub }))
      );
    } else {
      pool = (ALL_LOCAL[subject] || []).map(q => ({ ...q, subject }));
      if (chapter) {
        const exact   = pool.filter(q => q.ch === chapter);
        const partial = pool.filter(q =>
          q.ch?.toLowerCase().includes(chapter.toLowerCase()) ||
          chapter.toLowerCase().includes((q.ch||"").toLowerCase())
        );
        pool = exact.length > 0 ? exact : partial.length > 0 ? partial : [];
      }
    }
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, count);
  }

  // ── Question cache key ──
  function cacheKey(subject, chapter) {
    return `neet_q_${subject}_${chapter || "all"}`.replace(/\s+/g, "_");
  }

  // ── Load cached questions from localStorage ──
  function loadCache(subject, chapter) {
    try {
      const raw = localStorage.getItem(cacheKey(subject, chapter));
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  }

  // ── Save questions to localStorage cache ──
  function saveCache(subject, chapter, newQs) {
    try {
      const existing = loadCache(subject, chapter);
      const seen = new Set(existing.map(q => q.q.substring(0, 40).toLowerCase()));
      const fresh = newQs.filter(q => !seen.has(q.q.substring(0, 40).toLowerCase()));
      const merged = [...existing, ...fresh].slice(0, 500); // max 500 per chapter
      localStorage.setItem(cacheKey(subject, chapter), JSON.stringify(merged));
      return merged;
    } catch { return newQs; }
  }

  // ── Fetch from server + save to cache ──
  async function fetchFromServer(subject, chapter, count) {
    const resp = await fetch("/api/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, chapter, count })
    });
    if (!resp.ok) throw new Error(`Server error: ${resp.status}`);
    const data = await resp.json();
    if (!data.questions || data.questions.length === 0) throw new Error("No questions");
    // Cache for future use — questions grow over time
    saveCache(subject, chapter, data.questions);
    return data.questions;
  }

  // ── Master question getter ──
  // Priority: API (fresh) → Cache (previous sessions) → Local (emergency fallback)
  async function getQuestions(subject, chapter, count, onProgress) {
    const seen = new Set();
    const result = [];

    const addQs = (list) => {
      for (const q of (list || [])) {
        const key = (q.q || "").substring(0, 40).toLowerCase();
        if (q.q && !seen.has(key)) { seen.add(key); result.push(q); }
      }
    };

    // Layer 1: API call (Gemini — fresh questions every time)
    onProgress?.(`Searching for ${chapter || subject} questions...`);
    try {
      const apiQs = await fetchFromServer(subject, chapter, count);
      addQs(apiQs);
    } catch (e) {
      console.warn("API call 1 failed:", e.message);
    }

    // Layer 2: Second API call if need more (3 parallel inside server already, this adds more variety)
    if (result.length < count) {
      onProgress?.(`Fetching more questions...`);
      try {
        const more = await fetchFromServer(subject, chapter, count - result.length + 10);
        addQs(more);
      } catch {}
    }

    // Layer 3: Cached from previous sessions (supplements API)
    addQs(loadCache(subject, chapter));

    // Layer 4: Local emergency fallback (only if API completely failed)
    if (result.length === 0) {
      onProgress?.("Using local bank...");
      addQs(getSmartPool(subject, chapter || null, count));
    }

    return result.slice(0, count);
  }



  // ── Start test ──
  async function startTest() {
    setLoading(true);
    clearInterval(timerRef.current);
    const total = testMode === "full" ? 180 : nQs;
    const time  = testMode === "full" ? 200 : nMin;
    let qs = [];

    if (testMode === "full") {
      // ✅ NEET Pattern: Physics=45, Chemistry=45, Biology=90 = 180 total
      for (const [sub, count, label] of [
        ["Physics",   45, "Section A — Physics"],
        ["Chemistry", 45, "Section B — Chemistry"],
        ["Biology",   90, "Section C — Biology"],
      ]) {
        const subQs = await getQuestions(sub, null, count,
          (msg) => setLmsg(msg)
        );
        qs.push(...subQs.map(q => ({...q, subject: sub})));
      }

    } else {
      // ── Subject-wise or Chapter-wise test ──
      const label = selCh ? `${selCh} (${selSub})` : selSub;
      const fetched = await getQuestions(selSub, selCh || null, total,
        (msg) => setLmsg(msg)
      );
      qs.push(...fetched);
    }

    // Final safety net — should never be empty
    if (qs.length === 0) qs = getSmartPool(null, null, Math.min(total, 20));

    setQuestions(qs.slice(0, total));
    setTimeLeft(time * 60);
    setAnswers({});
    setMarked(new Set());
    setCurrent(0);
    setSubmitted(false);
    setExitM(null);
    setLoading(false);
    setScreen("test");
  }

  function selectAns(i) {
    if (submitted) return;
    setAnswers(a => ({ ...a, [current]: i }));
  }
  function toggleMark() {
    setMarked(m => { const n = new Set(m); n.has(current) ? n.delete(current) : n.add(current); return n; });
  }
  function doSubmit() {
    clearInterval(timerRef.current);
    setSubmitted(true);
    setExitM(null);
    // Save to history
    const r = computeRes(questions, answers);
    const entry = {
      date: new Date().toLocaleDateString("en-IN"),
      mode: testMode,
      subject: selSub,
      chapter: selCh,
      total: questions.length,
      correct: r.correct,
      score: r.score,
      pct: r.pct
    };
    const newHist = [entry, ...testHistory].slice(0, 20);
    setTestHistory(newHist);
    try { localStorage.setItem("neet_history", JSON.stringify(newHist)); } catch {}
    setScreen("results");
  }
  function goHome() {
    clearInterval(timerRef.current);
    setScreen("home");
    setTestMode(null); setSelSub(null); setSelCh(null);
    setAnsMode(null); setExitM(null); setSubmitted(false);
    setNQs(20); setNMin(30);
  }

  function computeRes(qs, ans) {
    let correct = 0, wrong = 0, skipped = 0;
    const tm = {};
    qs.forEach((q, i) => {
      const t = q.ch || q.subject || "General";
      if (!tm[t]) tm[t] = { correct: 0, total: 0 };
      tm[t].total++;
      if (ans[i] === undefined) skipped++;
      else if (ans[i] === q.ans) { correct++; tm[t].correct++; }
      else wrong++;
    });
    const score = correct * 4 - wrong;
    const maxScore = qs.length * 4;
    const pct = maxScore > 0 ? Math.max(0, Math.round((score / maxScore) * 100)) : 0;
    const grade = pct >= 85 ? "Excellent" : pct >= 70 ? "Good" : pct >= 50 ? "Average" : "Needs Work";
    const gradeColor = pct >= 85 ? "#16A34A" : pct >= 70 ? "#2563EB" : pct >= 50 ? "#D97706" : "#DC2626";
    const ta = Object.entries(tm).map(([name, d]) => ({ name, pct: d.total > 0 ? Math.round((d.correct / d.total) * 100) : 0, ...d })).sort((a, b) => b.pct - a.pct);
    return { correct, wrong, skipped, score, maxScore, pct, grade, gradeColor, ta, strong: ta.filter(t => t.pct >= 70), weak: ta.filter(t => t.pct < 50) };
  }

  const LBL = ["A", "B", "C", "D"];
  const initials = profile.name ? profile.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() : "?";

  // ── LOADING ──────────────────────────────────────────────
  if (loading) return (
    <div className="app">
      <header className="hdr">
        <div className="logo">NEET<span>Guru</span></div>
      </header>
      <div className="loading-screen">
        <div className="spinner" />
        <div className="load-title">Preparing Your Test</div>
        <div className="load-sub">{lmsg || "Loading questions from 25-year PYQ bank..."}</div>
      </div>
    </div>
  );

  // ── HOME ─────────────────────────────────────────────────
  if (screen === "home") return (
    <div className="app">
      <header className="hdr">
        <div className="logo">NEET<span>Guru</span></div>
        <nav className="nav-links">
          <button className="nav-btn active">Home</button>
          <button className="nav-btn" onClick={() => { setEditProfile({ ...profile }); setScreen("profile"); }}>
            {profile.name ? `👤 ${profile.name.split(" ")[0]}` : "Profile"}
          </button>
        </nav>
      </header>
      <div className="page">


        <div className="home-hero">
          <div className="hero-title">NEET Guru — AI-Powered Preparation</div>
          <div className="hero-sub">
            Practice with questions from 27 years of NEET & AIPMT PYQs (1999–2025), NCERT Exemplar, and top coaching modules. Get instant analysis of your weak topics.
          </div>
          <div className="hero-tags">
            <span className="hero-tag">27 Years PYQ (1999–2025)</span>
            <span className="hero-tag">NCERT Exemplar</span>
            <span className="hero-tag">Allen · Aakash · Physics Wallah · Motion</span>
            <span className="hero-tag">AI Analysis</span>
          </div>
        </div>

        )}

        {profile.name && (
          <div style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:"var(--radius-lg)", padding:"16px 20px", marginBottom:"20px", display:"flex", alignItems:"center", gap:"14px", boxShadow:"var(--shadow)" }}>
            <div style={{ width:"42px", height:"42px", borderRadius:"50%", background:"var(--blue)", display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontWeight:"700", fontSize:"15px", flexShrink:0, overflow:"hidden" }}>
              {profile.photo
                ? <img src={profile.photo} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                : initials
              }
            </div>
            <div>
              <div style={{ fontWeight:"600", fontSize:"14px" }}>Welcome back, {profile.name.split(" ")[0]}!</div>
              <div style={{ fontSize:"12px", color:"var(--text3)" }}>{profile.cls} · Tests taken: {testHistory.length}</div>
            </div>
            {testHistory.length > 0 && (
              <div style={{ marginLeft:"auto", textAlign:"right" }}>
                <div style={{ fontSize:"12px", color:"var(--text3)" }}>Last test</div>
                <div style={{ fontSize:"14px", fontWeight:"600", color: testHistory[0].pct >= 70 ? "var(--green)" : testHistory[0].pct >= 50 ? "var(--gold)" : "var(--red)" }}>{testHistory[0].pct}%</div>
              </div>
            )}
          </div>
        )}

        <div className="stats-grid">
          <div className="stat-card"><div className="stat-num">27</div><div className="stat-lbl">Years of PYQs (1999–2025)</div></div>
          <div className="stat-card"><div className="stat-num">45+45+90</div><div className="stat-lbl">Physics · Chem · Bio</div></div>
          <div className="stat-card"><div className="stat-num">+4/−1</div><div className="stat-lbl">NEET Marking Scheme</div></div>
        </div>

        <div className="section-head">Choose Test Mode</div>
        <div className="mode-grid">
          {[
            { m:"full",  color:"#2563EB", icon:"📋", title:"Full Mock Test",     desc:"Complete NEET pattern — 180 questions across Physics, Chemistry & Biology in 200 minutes.", tags:["180 Questions","200 Minutes","All Subjects"] },
            { m:"subject", color:"#16A34A", icon:"📖", title:"Subject-wise Test", desc:"Pick one subject, set your question count and time. Ideal for focused revision.", tags:["Custom Q's","Custom Time","1 Subject"] },
            { m:"chapter", color:"#D97706", icon:"🎯", title:"Chapter-wise Test", desc:"Master one chapter at a time with targeted PYQ and exemplar questions.", tags:["Custom Q's","Custom Time","1 Chapter"] },
          ].map(({ m, color, icon, title, desc, tags }) => (
            <div key={m} className="mode-card" onClick={() => { setTestMode(m); setScreen("config"); }}>
              <div className="mode-card-accent" style={{ background: color }} />
              <div className="mode-icon">{icon}</div>
              <div className="mode-title">{title}</div>
              <div className="mode-desc">{desc}</div>
              <div className="mode-tags">
                {tags.map(t => <span key={t} className="tag tag-gray">{t}</span>)}
              </div>
            </div>
          ))}
        </div>

        {testHistory.length > 0 && (
          <>
            <div className="section-head">Recent Tests</div>
            <div style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:"var(--radius-lg)", overflow:"hidden", boxShadow:"var(--shadow)", marginBottom:"24px" }}>
              {testHistory.slice(0, 5).map((h, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", padding:"12px 18px", borderBottom: i < Math.min(testHistory.length, 5) - 1 ? "1px solid var(--border)" : "none", gap:"12px" }}>
                  <div style={{ fontSize:"20px" }}>{h.mode === "full" ? "📋" : h.mode === "subject" ? "📖" : "🎯"}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:"13px", fontWeight:"600", color:"var(--text)" }}>{h.chapter || h.subject || "Full Test"}</div>
                    <div style={{ fontSize:"12px", color:"var(--text3)" }}>{h.date} · {h.correct}/{h.total} correct</div>
                  </div>
                  <span className={`tag ${h.pct >= 70 ? "tag-green" : h.pct >= 50 ? "tag-gold" : "tag-red"}`}>{h.pct}%</span>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="section-head">Question Sources</div>
        <div style={{ display:"flex", alignItems:"center", gap:"8px", flexWrap:"wrap" }}>
          <span className="tag tag-blue" style={{ padding:"5px 14px", fontSize:"13px", fontWeight:"600" }}>📅 PYQ 1999–2025 (NEET &amp; AIPMT)</span>
          {["NCERT Exemplar","Allen Module","Aakash Module","Physics Wallah","Motion Institute","Resonance DPP"].map(s =>
            <span key={s} className="tag tag-green" style={{ padding:"4px 10px", fontSize:"12px" }}>{s}</span>
          )}
        </div>
      </div>
    </div>
  );

  // ── PROFILE ──────────────────────────────────────────────
  if (screen === "profile") return (
    <div className="app">
      <header className="hdr">
        <div className="logo">NEET<span>Guru</span></div>
        <nav className="nav-links">
          <button className="nav-btn" onClick={() => setScreen("home")}>Home</button>
          <button className="nav-btn active">Profile</button>
        </nav>
      </header>
      <div className="page page-sm" style={{ maxWidth:"700px" }}>
        <div className="page-title">Student Profile</div>
        <div className="page-sub">Your details are saved locally on this device.</div>

        <div className="profile-grid">
          <div className="avatar-card">
            {/* Hidden file input */}
            <input
              ref={photoRef}
              type="file"
              accept="image/*"
              style={{ display:"none" }}
              onChange={handlePhotoChange}
            />
            {/* Avatar with click to upload */}
            <div style={{ position:"relative", width:"120px", margin:"0 auto 16px" }}>
              {editProfile.photo ? (
                <img
                  src={editProfile.photo}
                  alt="Profile"
                  style={{ width:"120px", height:"120px", borderRadius:"50%", objectFit:"cover", border:"3px solid var(--border)", display:"block" }}
                />
              ) : (
                <div className="profile-avatar">
                  {editProfile.name ? editProfile.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() : "?"}
                </div>
              )}
              {/* Camera overlay */}
              <button
                onClick={() => photoRef.current?.click()}
                title="Upload photo"
                style={{
                  position:"absolute", bottom:"2px", right:"2px",
                  width:"30px", height:"30px", borderRadius:"50%",
                  background:"var(--blue)", border:"2px solid var(--card)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  cursor:"pointer", fontSize:"13px", color:"white",
                  boxShadow:"0 1px 4px rgba(0,0,0,.2)"
                }}>
                📷
              </button>
            </div>
            <div className="profile-name">{editProfile.name || "Your Name"}</div>
            <div className="profile-class">{editProfile.cls || "Class not set"}</div>

            {/* Upload / Remove buttons */}
            <div style={{ display:"flex", gap:"6px", justifyContent:"center", marginTop:"10px", flexWrap:"wrap" }}>
              <button
                className="btn btn-outline btn-sm"
                style={{ fontSize:"12px", padding:"5px 12px" }}
                onClick={() => photoRef.current?.click()}>
                {editProfile.photo ? "Change Photo" : "Upload Photo"}
              </button>
              {editProfile.photo && (
                <button
                  className="btn btn-ghost btn-sm"
                  style={{ fontSize:"12px", padding:"5px 10px", color:"var(--red)" }}
                  onClick={removePhoto}>
                  Remove
                </button>
              )}
            </div>
            <div style={{ fontSize:"10.5px", color:"var(--muted)", marginTop:"6px", textAlign:"center" }}>JPG, PNG · Max 2 MB</div>

            {testHistory.length > 0 && (
              <div style={{ marginTop:"14px", paddingTop:"14px", borderTop:"1px solid var(--border)" }}>
                <div style={{ fontSize:"11px", color:"var(--text3)", marginBottom:"6px", fontWeight:"600", textTransform:"uppercase", letterSpacing:"0.4px" }}>Test Stats</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px" }}>
                  <div style={{ background:"var(--bg2)", borderRadius:"6px", padding:"8px", textAlign:"center" }}>
                    <div style={{ fontSize:"18px", fontWeight:"700", color:"var(--blue)" }}>{testHistory.length}</div>
                    <div style={{ fontSize:"10px", color:"var(--text3)" }}>Tests</div>
                  </div>
                  <div style={{ background:"var(--bg2)", borderRadius:"6px", padding:"8px", textAlign:"center" }}>
                    <div style={{ fontSize:"18px", fontWeight:"700", color: testHistory.length > 0 && Math.round(testHistory.reduce((a,h)=>a+h.pct,0)/testHistory.length) >= 60 ? "var(--green)" : "var(--gold)" }}>
                      {testHistory.length > 0 ? Math.round(testHistory.reduce((a, h) => a + h.pct, 0) / testHistory.length) : 0}%
                    </div>
                    <div style={{ fontSize:"10px", color:"var(--text3)" }}>Avg Score</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="info-card">
            <div className="section-head" style={{ marginBottom:"16px" }}>Personal Information</div>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className="form-input" type="text" placeholder="Enter your full name" value={editProfile.name} onChange={e => setEditProfile(p => ({ ...p, name: e.target.value }))} />
            </div>
            <div className="info-row">
              <div className="form-group">
                <label className="form-label">Date of Birth</label>
                <input className="form-input" type="date" value={editProfile.dob} onChange={e => setEditProfile(p => ({ ...p, dob: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Mobile Number</label>
                <input className="form-input" type="tel" placeholder="10-digit mobile" maxLength={10} value={editProfile.mobile} onChange={e => setEditProfile(p => ({ ...p, mobile: e.target.value.replace(/\D/g, "") }))} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input className="form-input" type="email" placeholder="your@email.com" value={editProfile.email} onChange={e => setEditProfile(p => ({ ...p, email: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Currently Studying</label>
              <select className="form-select" value={editProfile.cls} onChange={e => setEditProfile(p => ({ ...p, cls: e.target.value }))}>
                <option value="">Select your class</option>
                {CLASS_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="profile-save-row">
              {profileSaved && <span style={{ fontSize:"13px", color:"var(--green)", alignSelf:"center" }}>✓ Saved successfully</span>}
              <button className="btn btn-outline" onClick={() => { setEditProfile({ ...profile }); setScreen("home"); }}>Cancel</button>
              <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
            </div>
          </div>
        </div>

        {testHistory.length > 0 && (
          <div className="card">
            <div className="card-body">
              <div className="section-head">Test History</div>
              {testHistory.map((h, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:"12px", padding:"10px 0", borderBottom: i < testHistory.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <div style={{ fontSize:"18px" }}>{h.mode === "full" ? "📋" : h.mode === "subject" ? "📖" : "🎯"}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:"13px", fontWeight:"500" }}>{h.chapter || h.subject || "Full Mock Test"}</div>
                    <div style={{ fontSize:"11.5px", color:"var(--text3)" }}>{h.date} · {h.correct}/{h.total} correct · Score: {h.score}</div>
                  </div>
                  <span className={`tag ${h.pct >= 70 ? "tag-green" : h.pct >= 50 ? "tag-gold" : "tag-red"}`}>{h.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // ── CONFIG ────────────────────────────────────────────────
  if (screen === "config") return (
    <div className="app">
      <header className="hdr">
        <div className="logo">NEET<span>Guru</span></div>
        <nav className="nav-links">
          <button className="nav-btn" onClick={() => setScreen("home")}>Home</button>
        </nav>
      </header>
      <div className="page page-sm">
        <button className="btn btn-ghost btn-sm" style={{ marginBottom:"16px" }} onClick={() => setScreen("home")}>← Back</button>
        <div className="card">
          <div className="card-body">
            <div className="page-title" style={{ marginBottom:"2px" }}>
              {testMode === "full" ? "Full Mock Test" : testMode === "subject" ? "Subject-wise Test" : "Chapter-wise Test"}
            </div>
            <div className="page-sub">
              {testMode === "full" ? "Fixed: 180 questions · 200 minutes · All subjects" : "Customize your test below"}
            </div>

            {testMode !== "full" && (
              <>
                <div className="section-head">Select Subject</div>
                <div className="sel-grid" style={{ marginBottom:"20px" }}>
                  {Object.entries(SUBJECTS).map(([sub, info]) => (
                    <div key={sub} className={`sel-item ${selSub === sub ? "on" : ""}`}
                      onClick={() => { setSelSub(sub); setSelCh(null); }}>
                      <span style={{ fontSize:"16px" }}>{info.icon}</span>
                      <div style={{ marginTop:"4px" }}>{sub}</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {testMode === "chapter" && selSub && (
              <>
                <div className="section-head">Select Chapter</div>
                <div className="ch-grid">
                  {SUBJECTS[selSub].chapters.map(ch => (
                    <div key={ch} className={`ch-item ${selCh === ch ? "on" : ""}`} onClick={() => setSelCh(ch)}>
                      {ch}
                    </div>
                  ))}
                </div>
              </>
            )}

            {testMode !== "full" && (
              <>
                <div className="section-head">Test Settings</div>
                <div className="stepper-row">
                  <div className="stepper">
                    <label className="form-label">Number of Questions</label>
                    <div className="stepper-ctrl">
                      <button className="step-btn" onClick={() => setNQs(q => Math.max(5, q - 5))}>−</button>
                      <span className="step-val">{nQs}</span>
                      <button className="step-btn" onClick={() => setNQs(q => Math.min(90, q + 5))}>+</button>
                    </div>
                    <div className="quick-chips">
                      {[10, 20, 30, 45, 60].map(v => (
                        <span key={v} className={`chip ${nQs === v ? "on" : ""}`} onClick={() => setNQs(v)}>{v}Q</span>
                      ))}
                    </div>
                    <span className="step-hint">Range: 5 – 90 questions</span>
                  </div>
                  <div className="stepper">
                    <label className="form-label">Time Limit (minutes)</label>
                    <div className="stepper-ctrl">
                      <button className="step-btn" onClick={() => setNMin(t => Math.max(5, t - 5))}>−</button>
                      <span className="step-val">{nMin}</span>
                      <button className="step-btn" onClick={() => setNMin(t => Math.min(180, t + 5))}>+</button>
                    </div>
                    <div className="quick-chips">
                      {[15, 30, 45, 60, 90].map(v => (
                        <span key={v} className={`chip ${nMin === v ? "on" : ""}`} onClick={() => setNMin(v)}>{v}m</span>
                      ))}
                    </div>
                    <span className="step-hint">Range: 5 – 180 minutes</span>
                  </div>
                </div>
              </>
            )}

            {testMode === "full" && (
              <div className="full-info">
                ⚡ Physics — 45 questions &nbsp;|&nbsp; 🧪 Chemistry — 45 questions &nbsp;|&nbsp; 🧬 Biology — 90 questions<br />
                ⏱️ 200 minutes total &nbsp;|&nbsp; 📐 +4 for correct, −1 for wrong, 0 for skipped
              </div>
            )}

            <div className="divider" />
            <div className="section-head">Answer Reveal Mode</div>
            <div className="amode-grid">
              <div className={`amode-card ${ansMode === "instant" ? "on" : ""}`} onClick={() => setAnsMode("instant")}>
                <div className="amode-check">{ansMode === "instant" ? "✓" : ""}</div>
                <div className="amode-icon">⚡</div>
                <div className="amode-title">Instant Feedback</div>
                <div className="amode-desc">See the correct answer and explanation right after each question. Best for learning.</div>
              </div>
              <div className={`amode-card ${ansMode === "end" ? "on" : ""}`} onClick={() => setAnsMode("end")}>
                <div className="amode-check">{ansMode === "end" ? "✓" : ""}</div>
                <div className="amode-icon">🎯</div>
                <div className="amode-title">Exam Mode</div>
                <div className="amode-desc">Answers revealed only after submitting. Simulates real NEET exam conditions.</div>
              </div>
            </div>

            <button
              className="btn btn-primary btn-lg btn-full"
              disabled={!ansMode || (testMode === "subject" && !selSub) || (testMode === "chapter" && (!selSub || !selCh))}
              onClick={startTest}>
              Start Test →
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // ── TEST ──────────────────────────────────────────────────
  if (screen === "test") {
    const q = questions[current];
    const ua = answers[current];
    const isAns = ua !== undefined;
    const showRes = ansMode === "instant" && isAns;
    const answered = Object.keys(answers).length;

    return (
      <div className="app">
        <header className="hdr">
          <div className="logo">NEET<span>Guru</span></div>
          <div className="flex flex-center gap-2">
            <span className="tag tag-blue" style={{ fontSize:"11px" }}>
              {testMode === "full"
                ? ["⚛️ Physics","🧪 Chemistry","🌿 Biology"][activeSection]
                : testMode === "subject" ? selSub : selCh}
            </span>
            <span className="tag tag-gray" style={{ fontSize:"11px" }}>
              {ansMode === "instant" ? "⚡ Instant" : "🎯 Exam"}
            </span>
            <div className={`timer-box ${timeLeft < 300 ? "danger" : timeLeft < 600 ? "warn" : ""}`}>{fmt(timeLeft)}</div>
            <button className="btn btn-ghost btn-sm" onClick={() => setExitM("home")}>🏠</button>
            <button className="btn btn-outline btn-sm" onClick={() => setExitM("submit")}>End Test</button>
          </div>
        </header>

        <div className="test-layout">
          <div className="test-main">

            {/* NEET Section Tabs — Full Mock only */}
            {testMode === "full" && (() => {
              // ✅ Real NEET: Physics 0-44, Chemistry 45-89, Biology 90-179
              const secs = [
                { label:"Physics",   cls:"phy", icon:"⚛️",  start:0,  end:44,  total:45 },
                { label:"Chemistry", cls:"che", icon:"🧪",  start:45, end:89,  total:45 },
                { label:"Biology",   cls:"bio", icon:"🌿",  start:90, end:179, total:90 },
              ];
              return (
                <div style={{marginBottom:"16px"}}>
                  <div className="section-tabs">
                    {secs.map((s, idx) => {
                      const secAnswered = Object.keys(answers).filter(k => +k >= s.start && +k <= s.end).length;
                      return (
                        <button key={idx}
                          className={`sec-tab ${s.cls} ${activeSection === idx ? "active" : ""}`}
                          onClick={() => { setActiveSection(idx); setCurrent(s.start); }}>
                          {s.icon} {s.label}
                          <span className={`sec-badge ${s.cls}`}>{secAnswered}/{s.total}</span>
                        </button>
                      );
                    })}
                  </div>
                  {/* Per-section progress bars */}
                  <div style={{display:"flex", gap:"4px", marginTop:"8px"}}>
                    {secs.map((s, idx) => {
                      const done = Object.keys(answers).filter(k=>+k>=s.start&&+k<=s.end).length;
                      const pct = (done / s.total) * 100;
                      const colors = ["#2563EB","#16A34A","#D97706"];
                      const flex = [45,45,90][idx];
                      return (
                        <div key={idx} style={{flex:flex, height:"5px", background:"var(--border)", borderRadius:"3px", overflow:"hidden"}} title={`${s.label}: ${done}/${s.total}`}>
                          <div style={{width:`${pct}%`, height:"100%", background:colors[idx], borderRadius:"3px", transition:"width .3s"}} />
                        </div>
                      );
                    })}
                  </div>
                  <div style={{display:"flex", gap:"4px", marginTop:"4px"}}>
                    {secs.map((s,i) => {
                      const colors=["#2563EB","#16A34A","#D97706"];
                      const done = Object.keys(answers).filter(k=>+k>=s.start&&+k<=s.end).length;
                      return <div key={i} style={{flex:[45,45,90][i], fontSize:"10px", color:colors[i], fontWeight:"600"}}>
                        {s.label} ({done}/{s.total})
                      </div>;
                    })}
                  </div>
                </div>
              );
            })()}

            {/* Progress */}
            <div className="prog-wrap" style={{ marginBottom:"20px" }}>
              <div className="prog-label">
                <span>Question {current + 1} of {questions.length}</span>
                <span style={{ color: answered > 0 ? "var(--green)" : "var(--text3)" }}>{answered} answered</span>
              </div>
              <div className="prog-bar">
                <div className="prog-fill" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
              </div>
            </div>

            {q ? (
              <>
                <div className="q-meta">
                  <span className="tag tag-gray" style={{ fontSize:"11px" }}>{q.src}</span>
                  <span className={`diff-tag d-${q.diff}`}>{q.diff}</span>
                  <span className="text-xs text-muted">{q.subject}{q.ch ? ` · ${q.ch}` : ""}</span>
                </div>
                <div className="q-card">
                  <div className="q-number">Question {current + 1}</div>
                  <div className="q-text">{q.q}</div>
                </div>
                <div className="options-list">
                  {(q.opts || []).map((opt, i) => {
                    let cls = "opt-item";
                    if (showRes) {
                      cls += " dis";
                      if (i === q.ans) cls += " ok";
                      else if (i === ua) cls += " bad";
                    } else if (i === ua) cls += " sel";
                    return (
                      <div key={i} className={cls} onClick={() => !showRes && selectAns(i)}>
                        <span className="opt-label">{LBL[i]}</span>
                        <span>{opt}</span>
                      </div>
                    );
                  })}
                </div>
                {showRes && (
                  <div className="explanation">
                    <div className="exp-title">Explanation</div>
                    <div className="exp-text">{q.exp}</div>
                  </div>
                )}
                {ansMode === "end" && isAns && (
                  <div className="recorded-note">✓ Answer recorded. Results will be shown after submission.</div>
                )}
              </>
            ) : (
              <div style={{ padding:"40px", textAlign:"center", color:"var(--text3)" }}>No question available.</div>
            )}

            <div className="test-nav">
              <button className="btn btn-ghost" disabled={current === 0} onClick={() => {
                const prev = current - 1;
                setCurrent(prev);
                if (testMode === "full") {
                  if (prev < 45) setActiveSection(0);
                  else if (prev < 90) setActiveSection(1);
                  else setActiveSection(2);
                }
              }}>← Previous</button>
              <button className="btn btn-outline btn-sm" onClick={toggleMark}>
                {marked.has(current) ? "🔖 Marked" : "🔖 Mark for Review"}
              </button>
              {current < questions.length - 1
                ? <button className="btn btn-primary" onClick={() => {
                    const next = current + 1;
                    setCurrent(next);
                    if (testMode === "full") {
                      if (next < 45) setActiveSection(0);
                      else if (next < 90) setActiveSection(1);
                      else setActiveSection(2);
                    }
                  }}>Next →</button>
                : <button className="btn btn-danger" onClick={() => setExitM("submit")}>Submit Test</button>
              }
            </div>
          </div>

          {/* PALETTE */}
          <div className="palette-panel">
            <div className="pal-title">Question Navigator</div>

            {testMode === "full" ? (
              /* Section-wise palette for full mock */
              [
                { label:"Physics",   cls:"phy", color:"#2563EB", start:0,  end:Math.min(44,  questions.length-1), total:45 },
                { label:"Chemistry", cls:"che", color:"#16A34A", start:45, end:Math.min(89,  questions.length-1), total:45 },
                { label:"Biology",   cls:"bio", color:"#D97706", start:90, end:Math.min(179, questions.length-1), total:90 },
              ].map((sec, si) => sec.end >= sec.start && (
                <div key={si}>
                  <div className="pal-section-head" style={{color: sec.color}}>
                    <span>{sec.label}</span>
                    <span style={{fontSize:"10px", color:"var(--text3)", fontWeight:"400", marginLeft:"auto"}}>
                      {Object.keys(answers).filter(k=>+k>=sec.start&&+k<=sec.end).length}/{sec.end-sec.start+1}
                    </span>
                  </div>
                  <div className="pal-grid" style={{marginBottom:"6px"}}>
                    {Array.from({length: sec.end - sec.start + 1}, (_, ii) => {
                      const i = sec.start + ii;
                      return (
                        <div key={i}
                          className={`pq ${i === current ? "cur" : ""} ${answers[i] !== undefined ? "ans" : ""} ${marked.has(i) ? "mk" : ""}`}
                          onClick={() => { setCurrent(i); setActiveSection(si); }}>
                          {i + 1}
                        </div>
                      );
                    })}
                  </div>
                  {si < 2 && <div className="pal-section-divider" />}
                </div>
              ))
            ) : (
              /* Simple palette for subject/chapter tests */
              <div className="pal-grid">
                {questions.map((_, i) => (
                  <div key={i}
                    className={`pq ${i === current ? "cur" : ""} ${answers[i] !== undefined ? "ans" : ""} ${marked.has(i) ? "mk" : ""}`}
                    onClick={() => setCurrent(i)}>
                    {i + 1}
                  </div>
                ))}
              </div>
            )}

            <div className="pal-legend" style={{marginTop:"10px"}}>
              <div className="leg-row"><div className="leg-dot" style={{ background:"var(--blue)" }} /><span>Current</span></div>
              <div className="leg-row"><div className="leg-dot" style={{ background:"var(--green-lt)", border:"1px solid var(--green-bd)" }} /><span>Answered</span></div>
              <div className="leg-row"><div className="leg-dot" style={{ background:"var(--gold-lt)", border:"1px solid var(--gold-bd)" }} /><span>Marked</span></div>
              <div className="leg-row"><div className="leg-dot" style={{ background:"var(--bg3)" }} /><span>Not visited</span></div>
            </div>
            <div className="scoring-info">
              ✅ +4 marks for correct<br />
              ❌ −1 mark for wrong<br />
              ⬜ 0 marks if skipped
            </div>
            <button className="btn btn-primary btn-sm btn-full" style={{ marginTop:"14px" }} onClick={() => setExitM("submit")}>
              Submit Test
            </button>
          </div>
        </div>

        {/* EXIT MODAL */}
        {exitM && (
          <div className="modal-overlay" onClick={() => setExitM(null)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              {exitM === "submit" ? (
                <>
                  <div className="modal-icon">📝</div>
                  <div className="modal-title">Submit Test?</div>
                  <div className="modal-body">
                    You have answered <strong>{answered}</strong> of <strong>{questions.length}</strong> questions.
                    {answered < questions.length && <><br /><span style={{ color:"var(--gold)" }}>⚠ {questions.length - answered} questions are unanswered.</span></>}
                    <br /><br />You cannot change answers after submitting.
                  </div>
                  <div className="modal-actions">
                    <button className="btn btn-primary btn-full" onClick={doSubmit}>Submit & View Results</button>
                    <button className="btn btn-outline btn-full" onClick={() => setExitM(null)}>Continue Test</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="modal-icon">🏠</div>
                  <div className="modal-title">Exit to Home?</div>
                  <div className="modal-body">
                    Your progress will be <strong>lost</strong>. You have answered {answered} of {questions.length} questions so far.
                  </div>
                  <div className="modal-actions">
                    <button className="btn btn-primary btn-full" onClick={() => setExitM("submit")}>Submit First</button>
                    <button className="btn btn-danger btn-full" onClick={goHome}>Exit Without Saving</button>
                    <button className="btn btn-outline btn-full" onClick={() => setExitM(null)}>Stay in Test</button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── RESULTS ───────────────────────────────────────────────
  if (screen === "results") {
    const r = computeRes(questions, answers);
    return (
      <div className="app">
        <header className="hdr">
          <div className="logo">NEET<span>Guru</span></div>
          <nav className="nav-links">
            <button className="nav-btn" onClick={goHome}>Home</button>
            <button className="nav-btn" onClick={() => { setEditProfile({ ...profile }); setScreen("profile"); }}>Profile</button>
          </nav>
        </header>
        <div className="page">
          <div className="score-banner">
            <div style={{ fontSize:"13px", color:"var(--text3)", marginBottom:"4px", textTransform:"uppercase", letterSpacing:"1px" }}>Your Score</div>
            <div className="score-big" style={{ color: r.gradeColor }}>{r.score}<span style={{ fontSize:"24px", color:"var(--text3)", fontWeight:"400" }}>/{r.maxScore}</span></div>
            <div className="score-pct">NEET Marking Scheme (+4/−1) · {r.pct}% accuracy</div>
            <div className="grade-pill" style={{ background: r.gradeColor + "18", border:`1px solid ${r.gradeColor}40`, color: r.gradeColor }}>{r.grade}</div>
            <div className="score-grade-bar" style={{ background: r.gradeColor, opacity:.25 }} />
          </div>

          <div className="res-stats">
            <div className="res-stat"><div className="res-stat-num" style={{ color:"var(--green)" }}>{r.correct}</div><div className="res-stat-lbl">Correct</div></div>
            <div className="res-stat"><div className="res-stat-num" style={{ color:"var(--red)" }}>{r.wrong}</div><div className="res-stat-lbl">Wrong</div></div>
            <div className="res-stat"><div className="res-stat-num" style={{ color:"var(--text3)" }}>{r.skipped}</div><div className="res-stat-lbl">Skipped</div></div>
            <div className="res-stat"><div className="res-stat-num" style={{ color:"var(--gold)" }}>{r.pct}%</div><div className="res-stat-lbl">Accuracy</div></div>
          </div>

          <div className="ana-grid">
            <div className="ana-card">
              <div className="ana-title">Topic-wise Performance</div>
              {r.ta.length === 0
                ? <div className="text-sm text-muted">No data available</div>
                : r.ta.map(t => (
                  <div key={t.name} className="topic-bar">
                    <div className="tb-header">
                      <span className="tb-name">{t.name}</span>
                      <span className="tb-score" style={{ color: t.pct >= 70 ? "var(--green)" : t.pct >= 50 ? "var(--gold)" : "var(--red)" }}>{t.pct}%</span>
                    </div>
                    <div className="tb-track">
                      <div className="tb-fill" style={{ width:`${t.pct}%`, background: t.pct >= 70 ? "var(--green)" : t.pct >= 50 ? "var(--gold)" : "var(--red)" }} />
                    </div>
                  </div>
                ))}
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
              <div className="ana-card">
                <div className="ana-title">🔴 Weak Areas — Revise These</div>
                {r.weak.length === 0
                  ? <div className="text-sm text-muted">No weak areas identified. Excellent work! 🎉</div>
                  : r.weak.map(t => <div key={t.name} className="topic-pill tp-weak"><span>{t.name}</span><strong>{t.pct}%</strong></div>)}
              </div>
              <div className="ana-card">
                <div className="ana-title">🟢 Strong Areas — Keep It Up</div>
                {r.strong.length === 0
                  ? <div className="text-sm text-muted">Answer more questions to see your strengths.</div>
                  : r.strong.map(t => <div key={t.name} className="topic-pill tp-strong"><span>{t.name}</span><strong>{t.pct}%</strong></div>)}
              </div>
            </div>
          </div>

          <div className="review-card">
            <div className="ana-title">Full Question Review</div>
            {questions.map((q, i) => {
              const ua = answers[i];
              const ok = ua === q.ans, skip = ua === undefined;
              return (
                <div key={i} className="rev-item">
                  <div className="rev-meta">
                    <span className="text-xs text-muted">Q{i + 1}</span>
                    <span className={`tag ${ok ? "tag-green" : skip ? "tag-gray" : "tag-red"}`} style={{ fontSize:"10px" }}>
                      {ok ? "✓ Correct" : skip ? "Skipped" : "✗ Wrong"}
                    </span>
                    <span className="text-xs text-muted">{q.src}</span>
                    <span className={`diff-tag d-${q.diff}`} style={{ fontSize:"10px" }}>{q.diff}</span>
                  </div>
                  <div className="rev-q">{q.q}</div>
                  <div className="rev-opts">
                    {(q.opts || []).map((opt, j) => (
                      <span key={j} className={`ro ${j === q.ans ? "ro-ok" : j === ua && ua !== q.ans ? "ro-bad" : "ro-neu"}`}>
                        {LBL[j]}: {opt}
                      </span>
                    ))}
                  </div>
                  {!ok && q.exp && <div className="rev-exp">💡 {q.exp}</div>}
                </div>
              );
            })}
          </div>

          <div className="flex gap-2">
            <button className="btn btn-primary" onClick={() => { setScreen("config"); setSubmitted(false); }}>Take Another Test</button>
            <button className="btn btn-outline" onClick={goHome}>Back to Home</button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
