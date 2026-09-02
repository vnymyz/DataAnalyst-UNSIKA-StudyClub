/**
 * build_slides.js — Generator PowerPoint "Data Analyst UNSIKA"
 * Tema: Dark Matcha
 *
 * Pemakaian:  node build_slides.js <output.pptx>
 *
 * Struktur file ini:
 *   1. PALET & TIPOGRAFI  — ubah di sini kalau tema mau digeser
 *   2. HELPER KOMPONEN    — kartu, code block, nomor bulat, chip, footer, dll
 *   3. IKON               — react-icons dirender jadi PNG, dipakai di slide visual
 *   4. DEFINISI SLIDE     — satu function per slide, dipanggil di build()
 *
 * Untuk pertemuan 2-6: bagian 1-3 bisa dipakai ulang apa adanya,
 * yang ditulis ulang hanya bagian 4.
 */

const pptxgen = require("pptxgenjs");
const React = require("react");
const RDS = require("react-dom/server");
const sharp = require("sharp");
const Fi = require("react-icons/fi");

// ─────────────────────────────────────────────────────────────
// 1. PALET & TIPOGRAFI — Dark Matcha
// ─────────────────────────────────────────────────────────────
const C = {
  bg: "1A231A", // hijau gelap pekat  — background utama
  panel: "22301C", // panel / kartu
  panel2: "2A3823", // panel lebih terang (header tabel, kartu bertumpuk)
  line: "3A4C30", // garis pemisah halus
  text: "F6F3E7", // krem — teks utama
  dim: "B7C9A8", // sage terang — teks sekunder
  sage: "7C9473", // aksen 1
  gold: "C9A66B", // aksen 2 / highlight
  codeBg: "0F160F", // background code block
  codeTx: "DCEFD1", // teks kode
  warn: "E0A07A", // aksen peringatan / error
};

const F = { head: "Poppins", body: "Calibri", mono: "Consolas" };

const W = 13.333;
const H = 7.5;
const MX = 0.62; // margin kiri/kanan
const CW = W - MX * 2; // lebar konten = 12.093

// ─────────────────────────────────────────────────────────────
// 2. HELPER KOMPONEN
// ─────────────────────────────────────────────────────────────

/** Text box — selalu isTextBox + margin 0 supaya sejajar dengan shape */
function T(s, text, o = {}) {
  s.addText(text, {
    isTextBox: true,
    margin: 0,
    fontFace: F.body,
    color: C.text,
    valign: "top",
    ...o,
  });
}

/** Kartu dasar: rounded rectangle bertumpuk di atas background */
function card(s, x, y, w, h, o = {}) {
  s.addShape("roundRect", {
    x,
    y,
    w,
    h,
    rectRadius: 0.09,
    fill: { color: o.fill || C.panel },
    line: { color: o.line || C.line, width: 1 },
    ...(o.shadow ? { shadow: o.shadow } : {}),
  });
}

/** Lingkaran aksen berisi angka / huruf — motif utama deck ini */
function badge(s, x, y, d, label, o = {}) {
  s.addShape("ellipse", {
    x,
    y,
    w: d,
    h: d,
    fill: { color: o.fill || C.gold },
    line: { color: o.fill || C.gold, width: 1 },
  });
  T(s, label, {
    x,
    y,
    w: d,
    h: d,
    align: "center",
    valign: "middle",
    fontFace: F.head,
    bold: true,
    fontSize: o.fontSize || 13,
    color: o.color || C.bg,
  });
}

/** Blok kode gaya editor gelap */
function code(s, x, y, w, h, lines, o = {}) {
  s.addShape("roundRect", {
    x,
    y,
    w,
    h,
    rectRadius: 0.06,
    fill: { color: C.codeBg },
    line: { color: C.line, width: 1 },
  });
  T(s, lines, {
    x: x + 0.22,
    y: y + 0.16,
    w: w - 0.44,
    h: h - 0.32,
    fontFace: F.mono,
    fontSize: o.fontSize || 12,
    color: o.color || C.codeTx,
    lineSpacingMultiple: 1.25,
    valign: o.valign || "top",
  });
}

/** Kotak output (hasil dijalankan) */
function outputBox(s, x, y, w, h, lines, o = {}) {
  s.addShape("roundRect", {
    x,
    y,
    w,
    h,
    rectRadius: 0.06,
    fill: { color: "162014" },
    line: { color: C.sage, width: 1 },
  });
  T(s, "OUTPUT", {
    x: x + 0.22,
    y: y + 0.13,
    w: 1.2,
    h: 0.2,
    fontSize: 8,
    bold: true,
    charSpacing: 1.4,
    color: C.sage,
  });
  T(s, lines, {
    x: x + 0.22,
    y: y + 0.38,
    w: w - 0.44,
    h: h - 0.56,
    fontFace: F.mono,
    fontSize: o.fontSize || 12,
    color: C.text,
    lineSpacingMultiple: 1.2,
  });
}

/** Chip kecil berlabel */
function chip(s, x, y, w, h, label, o = {}) {
  s.addShape("roundRect", {
    x,
    y,
    w,
    h,
    rectRadius: 0.5,
    fill: { color: o.fill || C.panel2 },
    line: { color: o.line || C.sage, width: 1 },
  });
  T(s, label, {
    x,
    y,
    w,
    h,
    align: "center",
    valign: "middle",
    fontSize: o.fontSize || 11,
    bold: o.bold !== false,
    color: o.color || C.dim,
  });
}

/** Header standar: eyebrow + judul */
function header(s, eyebrow, title, o = {}) {
  T(s, eyebrow.toUpperCase(), {
    x: MX,
    y: 0.42,
    w: CW,
    h: 0.24,
    fontSize: 9.5,
    bold: true,
    charSpacing: 2,
    color: C.sage,
  });
  T(s, title, {
    x: MX,
    y: 0.7,
    w: o.titleW || CW,
    h: 0.66,
    fontFace: F.head,
    fontSize: o.fontSize || 29,
    bold: true,
    color: C.text,
  });
}

/** Footer: nama kelas + nomor slide (teks saja, tanpa bar dekoratif) */
function footer(s, n) {
  T(s, "Data Analyst UNSIKA  ·  Pertemuan 1", {
    x: MX,
    y: 7.0,
    w: 6,
    h: 0.24,
    fontSize: 8.5,
    color: "6F8264",
  });
  T(s, String(n), {
    x: W - MX - 1,
    y: 7.0,
    w: 1,
    h: 0.24,
    fontSize: 8.5,
    bold: true,
    align: "right",
    color: C.gold,
  });
}

/** Baris bullet dengan titik sage kecil */
function bulletRow(s, x, y, w, text, o = {}) {
  s.addShape("ellipse", {
    x,
    y: y + 0.09,
    w: 0.1,
    h: 0.1,
    fill: { color: o.dot || C.gold },
    line: { color: o.dot || C.gold, width: 1 },
  });
  T(s, text, {
    x: x + 0.25,
    y,
    w: w - 0.25,
    h: o.h || 0.5,
    fontSize: o.fontSize || 12.5,
    color: o.color || C.dim,
    lineSpacingMultiple: 1.15,
  });
}

/** Panah kanan (penghubung antar kotak alur) */
function arrowRight(s, x, y, w, h, o = {}) {
  s.addShape("rightArrow", {
    x,
    y,
    w,
    h,
    fill: { color: o.color || C.sage },
    line: { color: o.color || C.sage, width: 1 },
  });
}

function arrowDown(s, x, y, w, h, o = {}) {
  s.addShape("downArrow", {
    x,
    y,
    w,
    h,
    fill: { color: o.color || C.sage },
    line: { color: o.color || C.sage, width: 1 },
  });
}

/** Lingkaran dekoratif transparan — dipakai di cover & penutup */
function blob(s, x, y, d, color, transparency) {
  s.addShape("ellipse", {
    x,
    y,
    w: d,
    h: d,
    fill: { color, transparency },
    line: { color, width: 1, transparency },
  });
}

function slide(pres) {
  const s = pres.addSlide();
  s.background = { color: C.bg };
  return s;
}

// ─────────────────────────────────────────────────────────────
// 3. IKON — react-icons → PNG base64
// ─────────────────────────────────────────────────────────────
async function renderIcon(name, color) {
  const Comp = Fi[name];
  if (!Comp) throw new Error("Ikon tidak ada: " + name);
  let svg = RDS.renderToStaticMarkup(
    React.createElement(Comp, { size: 256, strokeWidth: 2 })
  );
  svg = svg.replace(/currentColor/g, "#" + color);
  const buf = await sharp(Buffer.from(svg), { density: 300 })
    .resize(256, 256)
    .png()
    .toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

const ICONS = {};
async function loadIcons() {
  const spec = [
    ["search", "FiSearch", C.gold],
    ["play", "FiPlay", C.gold],
    ["tag", "FiTag", C.gold],
    ["list", "FiList", C.gold],
    ["key", "FiKey", C.gold],
    ["question", "FiHelpCircle", C.gold],
    ["database", "FiDatabase", C.gold],
    ["broom", "FiTrash2", C.gold],
    ["chart", "FiBarChart2", C.gold],
    ["pie", "FiPieChart", C.gold],
    ["check", "FiCheckSquare", C.gold],
    ["alert", "FiAlertTriangle", C.warn],
    ["table", "FiGrid", C.sage],
    ["trend", "FiTrendingUp", C.sage],
    ["book", "FiBookOpen", C.gold],
    ["terminal", "FiTerminal", C.gold],
    ["users", "FiUsers", C.gold],
    ["layers", "FiLayers", C.gold],
  ];
  for (const [k, n, col] of spec) ICONS[k] = await renderIcon(n, col);
}

/** Ikon di dalam lingkaran gelap — motif visual deck */
function iconCircle(s, x, y, d, key, o = {}) {
  s.addShape("ellipse", {
    x,
    y,
    w: d,
    h: d,
    fill: { color: o.fill || C.panel2 },
    line: { color: o.line || C.sage, width: 1 },
  });
  const p = d * 0.3;
  s.addImage({ data: ICONS[key], x: x + p / 2, y: y + p / 2, w: d - p, h: d - p });
}

// ─────────────────────────────────────────────────────────────
// 4. DEFINISI SLIDE
// ─────────────────────────────────────────────────────────────

// ── 1. Cover ────────────────────────────────────────────────
function s01(pres) {
  const s = slide(pres);
  blob(s, 9.1, -1.35, 5.6, C.sage, 90);
  blob(s, 10.6, 3.4, 3.2, C.gold, 92);
  blob(s, 8.3, 4.9, 1.5, C.sage, 82);

  T(s, "HALTEV STUDY CLUB", {
    x: 0.95, y: 1.72, w: 7, h: 0.28,
    fontSize: 12, bold: true, charSpacing: 3.5, color: C.gold,
  });
  T(s, "DATA ANALYST", {
    x: 0.95, y: 2.12, w: 8, h: 0.95,
    fontFace: F.head, fontSize: 52, bold: true, color: C.text,
  });
  T(s, "UNSIKA", {
    x: 0.95, y: 3.02, w: 8, h: 0.95,
    fontFace: F.head, fontSize: 52, bold: true, color: C.sage,
  });
  T(s, "Pertemuan 1 — Kenalan dengan Data Analyst & Python Dasar", {
    x: 0.95, y: 4.24, w: 7.5, h: 0.72,
    fontSize: 17, color: C.dim, lineSpacingMultiple: 1.2,
  });
  T(s, "Studi Kasus: Data Penjualan E-commerce", {
    x: 0.95, y: 4.98, w: 7.5, h: 0.32,
    fontSize: 13, italic: true, color: C.gold,
  });

  chip(s, 0.95, 5.72, 2.35, 0.46, "19.30–21.00 WIB");
  chip(s, 3.45, 5.72, 2.35, 0.46, "Google Colab");
  chip(s, 5.95, 5.72, 2.35, 0.46, "Python 3");

  T(s, "Tutor: Vanya Mayazura  ·  Software Engineer Instructor", {
    x: 0.95, y: 6.72, w: 8, h: 0.3, fontSize: 10, color: "6F8264",
  });
  return s;
}

// ── 2. Gambaran sesi ────────────────────────────────────────
function s02(pres) {
  const s = slide(pres);
  header(s, "Pertemuan 1", "Gambaran Sesi Ini");

  const meta = [
    ["DURASI", "19.30 – 21.00 WIB", 1.6, 0.95],
    ["TOOLS", "Google Colab  ·  Python 3", 2.68, 0.95],
    [
      "OUTPUT SESI INI",
      "Peserta dapat menjalankan notebook di Colab dan memakai variabel, tipe data, list, serta dictionary untuk menyimpan data sederhana.",
      3.76, 1.78,
    ],
  ];
  for (const [label, val, y, h] of meta) {
    card(s, MX, y, 4.35, h);
    T(s, label, {
      x: MX + 0.28, y: y + 0.2, w: 3.8, h: 0.22,
      fontSize: 8.5, bold: true, charSpacing: 1.8, color: C.gold,
    });
    T(s, val, {
      x: MX + 0.28, y: y + 0.5, w: 3.8, h: h - 0.68,
      fontSize: label === "OUTPUT SESI INI" ? 12 : 14.5,
      bold: label !== "OUTPUT SESI INI",
      color: label === "OUTPUT SESI INI" ? C.dim : C.text,
      lineSpacingMultiple: 1.18,
    });
  }

  T(s, "Tujuan Belajar", {
    x: 5.35, y: 1.6, w: 7.35, h: 0.4,
    fontFace: F.head, fontSize: 18, bold: true, color: C.text,
  });

  const goals = [
    "Memahami peran Data Analyst dan alur kerja dari data mentah sampai insight.",
    "Menggunakan Google Colab: membuat cell, menjalankan kode, membaca error sederhana.",
    "Menggunakan variabel, tipe data, print(), dan f-string.",
    "Menggunakan operator aritmatika dan perbandingan dasar.",
    "Menyimpan dan mengakses data dengan list dan dictionary.",
  ];
  goals.forEach((g, i) => {
    const y = 2.16 + i * 0.87;
    badge(s, 5.35, y, 0.4, String(i + 1), { fontSize: 12 });
    T(s, g, {
      x: 5.92, y: y - 0.02, w: 6.8, h: 0.7,
      fontSize: 13, color: C.dim, lineSpacingMultiple: 1.2,
    });
  });

  footer(s, 2);
}

// ── 3. Rundown ──────────────────────────────────────────────
function s03(pres) {
  const s = slide(pres);
  header(s, "Pertemuan 1", "Rundown Sesi Ini");

  const rows = [
    ["19.30 – 19.40", "Pembukaan & ice breaking: “data apa yang paling sering kalian lihat hari ini?”"],
    ["19.40 – 19.55", "Teori: apa itu Data Analyst, alur kerjanya, contoh dashboard"],
    ["19.55 – 20.10", "Teori + hands-on: Google Colab, cell, run, membaca error sederhana"],
    ["20.10 – 20.35", "Teori + hands-on: variabel, tipe data, print, f-string, operator"],
    ["20.35 – 20.55", "Teori + hands-on: list, dictionary, indexing"],
    ["20.55 – 21.00", "Rangkuman dan pengantar Kuis 1"],
  ];

  const table = [
    [
      { text: "WAKTU", options: { bold: true, color: C.gold, fontSize: 10, charSpacing: 1.5 } },
      { text: "AKTIVITAS", options: { bold: true, color: C.gold, fontSize: 10, charSpacing: 1.5 } },
    ],
    ...rows.map(([t, a], i) => [
      {
        text: t,
        options: { bold: true, color: C.text, fontSize: 12, fill: { color: i % 2 ? "1E2A19" : C.panel } },
      },
      {
        text: a,
        options: { color: C.dim, fontSize: 12, fill: { color: i % 2 ? "1E2A19" : C.panel } },
      },
    ]),
  ];

  s.addTable(table, {
    x: MX, y: 1.68, w: CW,
    colW: [2.45, CW - 2.45],
    rowH: [0.42, ...rows.map(() => 0.63)],
    fontFace: F.body,
    border: { type: "solid", color: C.line, pt: 1 },
    fill: { color: C.panel2 },
    valign: "middle",
    margin: [0.06, 0.16, 0.06, 0.16],
  });

  T(s, "Sesi ini 90 menit: kira-kira 40 menit teori, 45 menit praktik langsung di Colab, 5 menit penutup.", {
    x: MX, y: 6.32, w: CW, h: 0.4, fontSize: 11.5, italic: true, color: C.sage,
  });

  footer(s, 3);
}

// ── 4. Peta materi ──────────────────────────────────────────
function s04(pres) {
  const s = slide(pres);
  header(s, "Pertemuan 1", "Peta Perjalanan Sesi Ini");
  T(s, "Lima perhentian, dari “kenapa profesi ini ada” sampai cara Python menyimpan data.", {
    x: MX, y: 1.46, w: CW, h: 0.34, fontSize: 13, color: C.dim,
  });

  const stops = [
    ["search", "Peran Data\nAnalyst", "Kenapa profesi ini ada dan seperti apa hasil kerjanya"],
    ["play", "Google Colab", "Tempat menulis dan menjalankan kode langsung dari browser"],
    ["tag", "Variabel &\nTipe Data", "Menyimpan nilai dan mengenali jenis datanya"],
    ["list", "List", "Kumpulan data berurutan, diakses lewat nomor index"],
    ["key", "Dictionary", "Pasangan key–value, diakses lewat nama labelnya"],
  ];

  const cw = 2.19, gap = 0.285, y = 2.2, ch = 3.35;
  stops.forEach(([ic, title, desc], i) => {
    const x = MX + i * (cw + gap);
    card(s, x, y, cw, ch);
    iconCircle(s, x + cw / 2 - 0.36, y + 0.34, 0.72, ic);
    T(s, title, {
      x: x + 0.14, y: y + 1.24, w: cw - 0.28, h: 0.68,
      align: "center", fontFace: F.head, fontSize: 13, bold: true,
      color: C.text, lineSpacingMultiple: 1.05,
    });
    T(s, desc, {
      x: x + 0.18, y: y + 1.96, w: cw - 0.36, h: 0.9,
      align: "center", fontSize: 10.5, color: C.dim, lineSpacingMultiple: 1.15,
    });
    if (i < stops.length - 1) {
      arrowRight(s, x + cw + 0.05, y + ch / 2 - 0.09, 0.19, 0.18, { color: C.gold });
    }
  });

  T(s, "Perhentian 4 dan 5 adalah fondasi DataFrame di Pertemuan 3 — jadi bukan sekadar teori Python.", {
    x: MX, y: 5.95, w: CW, h: 0.4, fontSize: 12, italic: true, color: C.sage,
  });

  footer(s, 4);
}

// ── 5. Apa itu Data Analyst ─────────────────────────────────
function s05(pres) {
  const s = slide(pres);
  header(s, "Teori 1 dari 11", "Apa itu Data Analyst?");

  T(s, "Data Analyst adalah orang yang mengubah data mentah menjadi informasi yang bisa dipakai untuk mengambil keputusan.", {
    x: MX, y: 1.58, w: 6.2, h: 1.0,
    fontSize: 15, color: C.text, lineSpacingMultiple: 1.25,
  });

  card(s, MX, 2.78, 6.2, 1.85, { fill: C.panel2 });
  iconCircle(s, MX + 0.32, 3.12, 0.66, "search", { fill: C.bg });
  T(s, "Analoginya: seorang detektif", {
    x: MX + 1.16, y: 3.06, w: 4.8, h: 0.3,
    fontFace: F.head, fontSize: 13.5, bold: true, color: C.gold,
  });
  T(s, "Data adalah kumpulan petunjuk yang berserakan. Tugas Data Analyst adalah menyusun petunjuk itu jadi kesimpulan yang masuk akal.", {
    x: MX + 1.16, y: 3.42, w: 4.8, h: 1.0,
    fontSize: 12, color: C.dim, lineSpacingMultiple: 1.2,
  });

  T(s, "Kenapa data mentah saja belum cukup? Ribuan baris angka penjualan tidak langsung menjawab pertanyaan apa pun.", {
    x: MX, y: 4.86, w: 6.2, h: 0.8,
    fontSize: 12, italic: true, color: C.sage, lineSpacingMultiple: 1.2,
  });

  const steps = [
    ["Data mentah", "Ribuan baris angka penjualan — belum menjawab apa-apa"],
    ["Insight", "Temuan bermakna: “penjualan Fashion turun 20% bulan ini”"],
    ["Keputusan", "Dipakai manajer & tim marketing untuk menentukan tindakan"],
  ];
  steps.forEach(([t, d], i) => {
    const y = 1.62 + i * 1.72;
    card(s, 7.15, y, 5.55, 1.32);
    badge(s, 7.45, y + 0.28, 0.36, String(i + 1), { fontSize: 11.5 });
    T(s, t, {
      x: 7.94, y: y + 0.26, w: 4.5, h: 0.32,
      fontFace: F.head, fontSize: 14, bold: true, color: C.text,
    });
    T(s, d, {
      x: 7.94, y: y + 0.64, w: 4.5, h: 0.7,
      fontSize: 11.5, color: C.dim, lineSpacingMultiple: 1.18,
    });
    if (i < 2) arrowDown(s, 9.78, y + 1.42, 0.2, 0.2, { color: C.gold });
  });

  footer(s, 5);
}

// ── 6. VISUAL: data mentah → dashboard ──────────────────────
function s06(pres) {
  const s = slide(pres);
  header(s, "Teori 1 dari 11", "Dari Tabel Mentah ke Dashboard");

  // Kiri: data mentah
  card(s, MX, 1.62, 5.5, 4.5);
  T(s, "DATA MENTAH", {
    x: MX + 0.28, y: 1.84, w: 4.9, h: 0.24,
    fontSize: 9, bold: true, charSpacing: 1.8, color: C.sage,
  });

  const raw = [
    ["id", "produk", "kategori", "harga"],
    ["1", "Headset", "Elektronik", "250.000"],
    ["2", "Kaos Polos", "Fashion", "75.000"],
    ["3", "Kopi 200g", "Makanan", "48.000"],
    ["4", "Mouse", "Elektronik", "150.000"],
    ["5", "Novel", "Buku", "92.000"],
    ["…", "…", "…", "…"],
  ];
  s.addTable(
    raw.map((r, i) =>
      r.map((cell) => ({
        text: cell,
        options: {
          fontSize: i === 0 ? 9 : 10,
          bold: i === 0,
          color: i === 0 ? C.gold : C.dim,
          fill: { color: i === 0 ? C.panel2 : i % 2 ? "1E2A19" : C.bg },
          fontFace: F.mono,
        },
      }))
    ),
    {
      x: MX + 0.28, y: 2.2, w: 4.9,
      colW: [0.5, 1.6, 1.5, 1.3],
      rowH: [0.32, ...raw.slice(1).map(() => 0.36)],
      border: { type: "solid", color: C.line, pt: 1 },
      valign: "middle",
      margin: [0.03, 0.1, 0.03, 0.1],
    }
  );

  T(s, "5 baris pertama dari ribuan baris transaksi. Belum ada kesimpulan apa pun di sini.", {
    x: MX + 0.28, y: 4.98, w: 4.9, h: 0.66,
    fontSize: 11, italic: true, color: C.sage, lineSpacingMultiple: 1.18,
  });

  // Panah tengah
  T(s, "diolah", {
    x: 6.28, y: 3.42, w: 0.95, h: 0.24,
    align: "center", fontSize: 9.5, bold: true, charSpacing: 1, color: C.gold,
  });
  arrowRight(s, 6.42, 3.72, 0.68, 0.34, { color: C.gold });

  // Kanan: dashboard
  card(s, 7.32, 1.62, 5.38, 4.5);
  T(s, "INSIGHT & DASHBOARD", {
    x: 7.6, y: 1.84, w: 4.8, h: 0.24,
    fontSize: 9, bold: true, charSpacing: 1.8, color: C.gold,
  });
  s.addChart(
    pres.ChartType.bar,
    [
      {
        name: "Total Penjualan",
        labels: ["Elektronik", "Fashion", "Makanan", "Buku"],
        values: [48, 31, 22, 14],
      },
    ],
    {
      x: 7.5, y: 2.2, w: 5.0, h: 3.7,
      barDir: "col",
      chartColors: [C.sage, C.sage, C.sage, C.gold],
      showTitle: true,
      title: "Total Penjualan per Kategori (juta Rp)",
      titleColor: C.text,
      titleFontSize: 11,
      titleFontFace: F.body,
      showValue: true,
      dataLabelPosition: "outEnd",
      dataLabelColor: C.dim,
      dataLabelFontSize: 9,
      showLegend: false,
      catAxisLabelColor: C.dim,
      catAxisLabelFontSize: 9,
      valAxisLabelColor: C.dim,
      valAxisLabelFontSize: 9,
      valGridLine: { color: C.line, size: 1 },
      catGridLine: { style: "none" },
      valAxisMaxVal: 60,
      plotArea: { fill: { color: C.panel } },
      chartArea: { fill: { color: C.panel } },
      barGapWidthPct: 60,
    }
  );

  T(s, "Ini yang diolah Data Analyst", {
    x: MX, y: 6.28, w: 5.5, h: 0.3,
    align: "center", fontSize: 11.5, italic: true, color: C.sage,
  });
  T(s, "Ini yang dilihat orang lain", {
    x: 7.32, y: 6.28, w: 5.38, h: 0.3,
    align: "center", fontSize: 11.5, italic: true, color: C.gold,
  });

  footer(s, 6);
}

// ── 7. Alur kerja Data Analyst ──────────────────────────────
function s07(pres) {
  const s = slide(pres);
  header(s, "Teori 2 dari 11", "Alur Kerja Data Analyst");
  T(s, "Pekerjaan Data Analyst mengikuti alur yang sama, apa pun datanya.", {
    x: MX, y: 1.46, w: CW, h: 0.32, fontSize: 13, color: C.dim,
  });

  const steps = [
    ["Pertanyaan", "Semua berawal dari pertanyaan bisnis: “kategori mana yang paling laku bulan ini?”"],
    ["Kumpulkan Data", "Mengambil data yang relevan, misalnya file CSV penjualan."],
    ["Bersihkan", "Data mentah sering berantakan: kosong, salah ketik, duplikat."],
    ["Analisis", "Menghitung, mengelompokkan, mencari pola dalam data yang sudah bersih."],
    ["Visualisasi", "Mengubah angka jadi grafik supaya gampang dipahami orang lain."],
    ["Rekomendasi", "Menyimpulkan apa yang sebaiknya dilakukan berdasarkan hasil analisis."],
  ];

  const cw = 3.85, gap = 0.27, ch = 1.98;
  steps.forEach(([t, d], i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = MX + col * (cw + gap);
    const y = 1.98 + row * (ch + 0.28);
    card(s, x, y, cw, ch);
    badge(s, x + 0.3, y + 0.3, 0.42, String(i + 1), { fontSize: 13 });
    T(s, t, {
      x: x + 0.85, y: y + 0.34, w: cw - 1.1, h: 0.34,
      fontFace: F.head, fontSize: 14.5, bold: true, color: C.text,
    });
    T(s, d, {
      x: x + 0.3, y: y + 0.94, w: cw - 0.6, h: 1.1,
      fontSize: 11.5, color: C.dim, lineSpacingMultiple: 1.2,
    });
  });

  footer(s, 7);
}

// ── 8. VISUAL: diagram alur 6 tahap ─────────────────────────
function s08(pres) {
  const s = slide(pres);
  header(s, "Teori 2 dari 11", "Enam Tahap, Satu Alur");
  T(s, "Urutannya selalu sama — yang berubah cuma datanya dan pertanyaannya.", {
    x: MX, y: 1.46, w: CW, h: 0.32, fontSize: 13, color: C.dim,
  });

  const steps = [
    ["question", "Pertanyaan"],
    ["database", "Kumpulkan"],
    ["broom", "Bersihkan"],
    ["chart", "Analisis"],
    ["pie", "Visualisasi"],
    ["check", "Rekomendasi"],
  ];

  const cw = 1.78, gap = 0.284, y = 1.98, ch = 2.12;
  steps.forEach(([ic, label], i) => {
    const x = MX + i * (cw + gap);
    card(s, x, y, cw, ch);
    iconCircle(s, x + cw / 2 - 0.33, y + 0.36, 0.66, ic);
    T(s, label, {
      x: x + 0.08, y: y + 1.16, w: cw - 0.16, h: 0.34,
      align: "center", fontFace: F.head, fontSize: 12, bold: true, color: C.text,
    });
    T(s, String(i + 1).padStart(2, "0"), {
      x: x + 0.08, y: y + 1.56, w: cw - 0.16, h: 0.3,
      align: "center", fontFace: F.head, fontSize: 15, bold: true, color: C.gold,
    });
    if (i < 5) arrowRight(s, x + cw + 0.055, y + 0.94, 0.175, 0.17, { color: C.gold });
  });

  card(s, MX, 4.72, CW, 1.6, { fill: C.panel2 });
  iconCircle(s, MX + 0.34, 5.08, 0.62, "terminal", { fill: C.bg });
  T(s, "Kode adalah alat, bukan tujuan", {
    x: MX + 1.16, y: 5.02, w: 10.6, h: 0.32,
    fontFace: F.head, fontSize: 14.5, bold: true, color: C.gold,
  });
  T(s, "Python, Pandas, dan NumPy dipakai untuk menjalankan alur di atas. Tujuannya selalu menjawab pertanyaan bisnis — bukan sekadar menulis kode yang jalan.", {
    x: MX + 1.16, y: 5.4, w: 10.6, h: 0.66,
    fontSize: 12, color: C.dim, lineSpacingMultiple: 1.2,
  });

  footer(s, 8);
}

// ── 9. Google Colab ─────────────────────────────────────────
function s09(pres) {
  const s = slide(pres);
  header(s, "Teori 3 dari 11", "Apa itu Google Colab?");

  T(s, "Tempat menulis dan menjalankan kode Python langsung dari browser — gratis, tanpa instalasi apa pun di laptop.", {
    x: MX, y: 1.56, w: 6.0, h: 0.85,
    fontSize: 14.5, color: C.text, lineSpacingMultiple: 1.25,
  });

  const pts = [
    "Seperti Google Docs, tapi isinya kode — bisa dibuka dari laptop mana saja asal ada akun Google.",
    "Semua kode berjalan di server Google, hasilnya dikirim balik ke browser kita.",
    "Kerjaan tersimpan otomatis ke Google Drive.",
    "Dipakai dari Pertemuan 1 sampai 5 supaya tidak ada yang tertinggal karena masalah instalasi.",
  ];
  pts.forEach((p, i) => bulletRow(s, MX, 2.66 + i * 0.86, 6.0, p, { h: 0.76 }));

  // Mock jendela browser
  const bx = 6.95, by = 1.58, bw = 5.75, bh = 4.55;
  card(s, bx, by, bw, bh, { fill: C.panel });
  s.addShape("roundRect", {
    x: bx, y: by, w: bw, h: 0.46, rectRadius: 0.09,
    fill: { color: C.panel2 }, line: { color: C.line, width: 1 },
  });
  ["E0A07A", "C9A66B", "7C9473"].forEach((c, i) =>
    s.addShape("ellipse", {
      x: bx + 0.22 + i * 0.24, y: by + 0.16, w: 0.14, h: 0.14,
      fill: { color: c }, line: { color: c, width: 1 },
    })
  );
  T(s, "colab.research.google.com", {
    x: bx + 1.1, y: by + 0.13, w: 4.2, h: 0.22,
    fontSize: 9.5, color: C.dim, fontFace: F.mono,
  });

  // Cell 1
  s.addShape("roundRect", {
    x: bx + 0.28, y: by + 0.78, w: bw - 0.56, h: 0.92, rectRadius: 0.05,
    fill: { color: C.codeBg }, line: { color: C.line, width: 1 },
  });
  s.addShape("ellipse", {
    x: bx + 0.42, y: by + 1.06, w: 0.34, h: 0.34,
    fill: { color: C.sage }, line: { color: C.sage, width: 1 },
  });
  s.addShape("triangle", {
    x: bx + 0.505, y: by + 1.145, w: 0.17, h: 0.16, rotate: 90,
    fill: { color: C.bg }, line: { color: C.bg, width: 1 },
  });
  T(s, 'print("Halo, Data Analyst!")', {
    x: bx + 0.92, y: by + 1.12, w: bw - 1.3, h: 0.28,
    fontFace: F.mono, fontSize: 11.5, color: C.codeTx,
  });

  T(s, "Halo, Data Analyst!", {
    x: bx + 0.92, y: by + 1.85, w: bw - 1.3, h: 0.28,
    fontFace: F.mono, fontSize: 11.5, color: C.text,
  });
  T(s, "hasil tampil tepat di bawah cell", {
    x: bx + 0.92, y: by + 2.16, w: bw - 1.3, h: 0.26,
    fontSize: 9.5, italic: true, color: C.sage,
  });

  // Cell 2 (text cell)
  s.addShape("roundRect", {
    x: bx + 0.28, y: by + 2.66, w: bw - 0.56, h: 0.82, rectRadius: 0.05,
    fill: { color: "1E2A19" }, line: { color: C.line, width: 1 },
  });
  T(s, "## Catatan saya", {
    x: bx + 0.5, y: by + 2.8, w: bw - 1.0, h: 0.26,
    fontFace: F.mono, fontSize: 11, color: C.dim,
  });
  T(s, "text cell — untuk catatan, tidak dijalankan", {
    x: bx + 0.5, y: by + 3.1, w: bw - 1.0, h: 0.26,
    fontSize: 9.5, italic: true, color: C.sage,
  });

  T(s, "Notebook tersusun dari cell — kotak kecil berisi kode atau teks.", {
    x: bx + 0.28, y: by + 3.72, w: bw - 0.56, h: 0.5,
    fontSize: 11, color: C.dim, lineSpacingMultiple: 1.15,
  });

  footer(s, 9);
}

// ── 10. Cell ────────────────────────────────────────────────
function s10(pres) {
  const s = slide(pres);
  header(s, "Teori 4 dari 11", "Cell: Blok Kode di Colab");

  const kinds = [
    ["Code cell", "Tempat menulis kode Python. Dijalankan dengan tombol Run di kiri cell, atau Shift + Enter.", "play"],
    ["Text cell", "Tempat menulis catatan dalam format Markdown. Tidak dieksekusi sebagai kode.", "book"],
  ];
  kinds.forEach(([t, d, ic], i) => {
    const y = 1.62 + i * 2.08;
    card(s, MX, y, 5.3, 1.86);
    iconCircle(s, MX + 0.3, y + 0.32, 0.6, ic);
    T(s, t, {
      x: MX + 1.06, y: y + 0.34, w: 3.9, h: 0.32,
      fontFace: F.head, fontSize: 15, bold: true, color: C.text,
    });
    T(s, d, {
      x: MX + 0.3, y: y + 1.02, w: 4.7, h: 0.72,
      fontSize: 11.5, color: C.dim, lineSpacingMultiple: 1.2,
    });
  });

  T(s, "Cell dijalankan satu per satu, urutannya bebas — tapi hasil cell sebelumnya tetap “diingat” notebook selama runtime masih hidup.", {
    x: MX, y: 5.82, w: 5.3, h: 0.85,
    fontSize: 11.5, italic: true, color: C.sage, lineSpacingMultiple: 1.2,
  });

  code(s, 6.4, 1.62, 6.3, 1.25, [
    { text: "# Ini komentar, tidak dieksekusi\n", options: { color: "7F9470" } },
    { text: 'print("Halo, Data Analyst!")', options: { color: C.codeTx } },
  ], { fontSize: 13 });

  outputBox(s, 6.4, 3.05, 6.3, 1.0, "Halo, Data Analyst!", { fontSize: 13 });

  card(s, 6.4, 4.28, 6.3, 2.4, { fill: C.panel2 });
  T(s, "Dua hal yang perlu dikenali", {
    x: 6.68, y: 4.5, w: 5.74, h: 0.3,
    fontFace: F.head, fontSize: 13.5, bold: true, color: C.gold,
  });
  bulletRow(s, 6.68, 4.94, 5.74, "# di awal baris membuat baris itu jadi komentar — catatan untuk manusia, diabaikan Python.", { h: 0.72, fontSize: 12 });
  bulletRow(s, 6.68, 5.76, 5.74, "print(...) menampilkan teks atau nilai ke layar output, tepat di bawah cell.", { h: 0.72, fontSize: 12 });

  footer(s, 10);
}

// ── 11. Membaca error ───────────────────────────────────────
function s11(pres) {
  const s = slide(pres);
  header(s, "Teori 5 dari 11", "Membaca Error Sederhana");
  T(s, "Error itu wajar dan sering terjadi. Bagian penting belajar coding adalah belajar membacanya — bukan menghindarinya.", {
    x: MX, y: 1.46, w: CW, h: 0.34, fontSize: 13.5, color: C.dim,
  });

  const cards = [
    ["alert", "Error bukan kegagalan", "Semua programmer kena error setiap hari. Yang membedakan cuma kecepatan membacanya."],
    ["search", "Baca jenis error-nya", "Pesan error menyebutkan kategori masalah: NameError, SyntaxError, TypeError, dan seterusnya."],
    ["terminal", "Cek nomor barisnya", "Colab menunjukkan baris keberapa yang bermasalah. Lihat ke sana dulu sebelum bertanya."],
  ];
  const cw = 3.85, gap = 0.27;
  cards.forEach(([ic, t, d], i) => {
    const x = MX + i * (cw + gap);
    card(s, x, 2.0, cw, 2.5);
    iconCircle(s, x + 0.32, 2.32, 0.62, ic);
    T(s, t, {
      x: x + 0.32, y: 3.1, w: cw - 0.64, h: 0.34,
      fontFace: F.head, fontSize: 14, bold: true, color: C.text,
    });
    T(s, d, {
      x: x + 0.32, y: 3.5, w: cw - 0.64, h: 0.86,
      fontSize: 11.5, color: C.dim, lineSpacingMultiple: 1.2,
    });
  });

  card(s, MX, 4.82, CW, 1.5, { fill: C.panel2 });
  T(s, "Aturan dasarnya", {
    x: MX + 0.34, y: 5.04, w: 11.4, h: 0.3,
    fontFace: F.head, fontSize: 14, bold: true, color: C.gold,
  });
  T(s, "Python membaca kode dari atas ke bawah. Kalau kita memakai variabel yang belum pernah dibuat, Python berhenti dan memunculkan NameError. Jadi variabel harus didefinisikan dulu sebelum dipakai.", {
    x: MX + 0.34, y: 5.42, w: 11.4, h: 0.85,
    fontSize: 12.5, color: C.dim, lineSpacingMultiple: 1.22,
  });

  footer(s, 11);
}

// ── 12. VISUAL: anatomi NameError ───────────────────────────
function s12(pres) {
  const s = slide(pres);
  header(s, "Teori 5 dari 11", "Membedah Satu Pesan Error");

  code(s, 2.9, 1.6, 7.55, 0.85, 'print(nama_pelanggan)', { fontSize: 14, valign: "middle" });

  arrowDown(s, 6.5, 2.55, 0.28, 0.3, { color: C.sage });

  // Kotak error
  s.addShape("roundRect", {
    x: 2.55, y: 3.0, w: 8.25, h: 1.15, rectRadius: 0.06,
    fill: { color: "2A1A16" }, line: { color: C.warn, width: 1 },
  });

  const parts = [
    ["NameError", 2.9, 1.45, C.warn, true],
    [": name", 4.35, 1.0, C.dim, false],
    ["'nama_pelanggan'", 5.4, 2.3, C.gold, true],
    ["is not defined", 7.75, 1.9, C.dim, false],
  ];
  for (const [txt, x, w, col, bold] of parts) {
    T(s, txt, {
      x, y: 3.44, w, h: 0.3,
      fontFace: F.mono, fontSize: 13.5, color: col, bold,
    });
  }

  // Garis penunjuk
  s.addShape("line", {
    x: 3.6, y: 4.18, w: 0, h: 0.72,
    line: { color: C.warn, width: 1.5, dashType: "dash", endArrowType: "triangle" },
    flipV: true,
  });
  s.addShape("line", {
    x: 6.5, y: 4.18, w: 0, h: 0.72,
    line: { color: C.gold, width: 1.5, dashType: "dash", endArrowType: "triangle" },
    flipV: true,
  });

  card(s, 1.55, 4.95, 4.65, 1.36);
  T(s, "Jenis error-nya", {
    x: 1.85, y: 5.16, w: 4.05, h: 0.3,
    fontFace: F.head, fontSize: 13.5, bold: true, color: C.warn,
  });
  T(s, "Kategori masalahnya. NameError = ada nama yang dipanggil tapi belum pernah dibuat.", {
    x: 1.85, y: 5.54, w: 4.05, h: 0.8,
    fontSize: 11.5, color: C.dim, lineSpacingMultiple: 1.2,
  });

  card(s, 6.5, 4.95, 4.65, 1.36);
  T(s, "Nama yang bermasalah", {
    x: 6.8, y: 5.16, w: 4.05, h: 0.3,
    fontFace: F.head, fontSize: 13.5, bold: true, color: C.gold,
  });
  T(s, "Python menyebut variabel persisnya. Perbaikannya: definisikan dulu di atas baris ini.", {
    x: 6.8, y: 5.54, w: 4.05, h: 0.8,
    fontSize: 11.5, color: C.dim, lineSpacingMultiple: 1.2,
  });

  T(s, "Colab juga menyebut baris keberapa masalahnya — baca pesan itu dulu sebelum panik atau bertanya.", {
    x: MX, y: 6.52, w: CW, h: 0.3,
    align: "center", fontSize: 11.5, italic: true, color: C.sage,
  });

  footer(s, 12);
}

// ── 13. Variabel & tipe data ────────────────────────────────
function s13(pres) {
  const s = slide(pres);
  header(s, "Teori 6 dari 11", "Variabel dan Tipe Data");

  T(s, "Variabel adalah nama yang dipakai untuk menyimpan sebuah nilai, supaya nilai itu bisa dipanggil lagi tanpa ditulis ulang.", {
    x: MX, y: 1.54, w: 6.1, h: 0.8,
    fontSize: 14, color: C.text, lineSpacingMultiple: 1.25,
  });

  code(s, MX, 2.48, 6.1, 1.4, [
    { text: 'nama = "Alya"\n', options: {} },
    { text: "jumlah_pesanan = 25\n", options: {} },
    { text: "rata_rata_nilai = 87.5\n", options: {} },
    { text: "aktif = True", options: {} },
  ], { fontSize: 13 });

  card(s, MX, 4.12, 6.1, 2.45, { fill: C.panel2 });
  iconCircle(s, MX + 0.3, 4.46, 0.6, "search", { fill: C.bg });
  T(s, "Cek tipe dengan type(nama_variabel)", {
    x: MX + 1.06, y: 4.48, w: 4.7, h: 0.3,
    fontFace: F.head, fontSize: 13, bold: true, color: C.gold,
  });
  T(s, "Berguna banget nanti saat data dari CSV ternyata bertipe beda dari yang diharapkan — misalnya angka yang malah terbaca sebagai teks.", {
    x: MX + 0.3, y: 5.22, w: 5.5, h: 1.1,
    fontSize: 11.5, color: C.dim, lineSpacingMultiple: 1.25,
  });

  const types = [
    ["str", '"Alya"', "Teks, diapit tanda kutip"],
    ["int", "25", "Bilangan bulat"],
    ["float", "87.5", "Bilangan desimal"],
    ["bool", "True / False", "Benar atau salah"],
  ];
  T(s, "Empat tipe data dasar", {
    x: 7.15, y: 1.56, w: 5.55, h: 0.32,
    fontFace: F.head, fontSize: 16, bold: true, color: C.text,
  });
  types.forEach(([t, ex, d], i) => {
    const y = 2.06 + i * 1.15;
    card(s, 7.15, y, 5.55, 1.0);
    chip(s, 7.42, y + 0.28, 0.95, 0.44, t, { color: C.gold, fontSize: 11.5, line: C.gold });
    T(s, ex, {
      x: 8.55, y: y + 0.2, w: 3.9, h: 0.28,
      fontFace: F.mono, fontSize: 12, color: C.codeTx,
    });
    T(s, d, {
      x: 8.55, y: y + 0.54, w: 3.9, h: 0.3,
      fontSize: 11, color: C.dim,
    });
  });

  footer(s, 13);
}

// ── 14. print() dan f-string ────────────────────────────────
function s14(pres) {
  const s = slide(pres);
  header(s, "Teori 7 dari 11", "print() dan f-string");
  T(s, "Untuk menggabungkan teks dan variabel dalam satu kalimat, cara paling praktis adalah f-string.", {
    x: MX, y: 1.46, w: CW, h: 0.32, fontSize: 13.5, color: C.dim,
  });

  card(s, MX, 1.94, 5.85, 2.5);
  T(s, "TANPA F-STRING", {
    x: MX + 0.3, y: 2.16, w: 5.25, h: 0.24,
    fontSize: 9, bold: true, charSpacing: 1.8, color: C.warn,
  });
  code(s, MX + 0.3, 2.5, 5.25, 1.15, 'print(nama + " memiliki "\n      + str(jumlah) + " pesanan.")', { fontSize: 11.5 });
  T(s, "Harus digabung manual pakai + dan dikonversi tipenya satu per satu.", {
    x: MX + 0.3, y: 3.76, w: 5.25, h: 0.5,
    fontSize: 11, color: C.dim, lineSpacingMultiple: 1.15,
  });

  card(s, 6.88, 1.94, 5.83, 2.5, { fill: C.panel2 });
  T(s, "DENGAN F-STRING", {
    x: 7.18, y: 2.16, w: 5.23, h: 0.24,
    fontSize: 9, bold: true, charSpacing: 1.8, color: C.gold,
  });
  code(s, 7.18, 2.5, 5.23, 1.15, 'print(f"{nama} memiliki\n       {jumlah} pesanan.")', { fontSize: 11.5 });
  T(s, "Satu baris, langsung terbaca seperti kalimat aslinya.", {
    x: 7.18, y: 3.76, w: 5.23, h: 0.5,
    fontSize: 11, color: C.dim, lineSpacingMultiple: 1.15,
  });

  outputBox(s, MX, 4.66, CW, 0.95, "Alya memiliki 25 pesanan.", { fontSize: 13 });

  bulletRow(s, MX, 5.86, 5.85, "Huruf f sebelum tanda kutip menandai string itu sebagai f-string.", { h: 0.7, fontSize: 12 });
  bulletRow(s, 6.88, 5.86, 5.83, "Bagian di dalam { } otomatis diganti nilai variabelnya saat dijalankan.", { h: 0.7, fontSize: 12 });

  footer(s, 14);
}

// ── 15. Operator dasar ──────────────────────────────────────
function s15(pres) {
  const s = slide(pres);
  header(s, "Teori 8 dari 11", "Operator Dasar");

  code(s, MX, 1.6, 6.3, 1.6, [
    { text: "harga = 50000\n", options: {} },
    { text: "jumlah = 3\n", options: {} },
    { text: "total = harga * jumlah\n", options: {} },
    { text: "diskon_berlaku = total > 100000", options: {} },
  ], { fontSize: 12.5 });

  outputBox(s, MX, 3.42, 6.3, 1.28, "total           → 150000\ndiskon_berlaku  → True", { fontSize: 12.5 });

  card(s, MX, 5.0, 6.3, 1.66, { fill: C.panel2 });
  T(s, "Kenapa perbandingan penting?", {
    x: MX + 0.3, y: 5.22, w: 5.7, h: 0.32,
    fontFace: F.head, fontSize: 13.5, bold: true, color: C.gold,
  });
  T(s, "Hasil True/False inilah bahan bakar pengambilan keputusan: if, elif, dan else yang dipelajari di Pertemuan 2, serta filter data di Pandas nanti.", {
    x: MX + 0.3, y: 5.62, w: 5.7, h: 0.85,
    fontSize: 11.5, color: C.dim, lineSpacingMultiple: 1.22,
  });

  card(s, 7.15, 1.6, 5.55, 2.28);
  T(s, "Aritmatika", {
    x: 7.45, y: 1.82, w: 4.95, h: 0.32,
    fontFace: F.head, fontSize: 15, bold: true, color: C.text,
  });
  ["+", "−", "×", "÷"].forEach((op, i) =>
    chip(s, 7.45 + i * 1.24, 2.28, 1.05, 0.55, op, { color: C.gold, fontSize: 16, line: C.gold })
  );
  T(s, "Urutan operasinya sama seperti matematika biasa: kali dan bagi lebih dulu.", {
    x: 7.45, y: 3.02, w: 4.95, h: 0.6,
    fontSize: 11, color: C.dim, lineSpacingMultiple: 1.15,
  });

  card(s, 7.15, 4.06, 5.55, 2.6, { fill: C.panel2 });
  T(s, "Perbandingan", {
    x: 7.45, y: 4.28, w: 4.95, h: 0.32,
    fontFace: F.head, fontSize: 15, bold: true, color: C.text,
  });
  [">", "<", ">=", "<=", "==", "!="].forEach((op, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    chip(s, 7.45 + col * 1.68, 4.74 + row * 0.7, 1.45, 0.55, op, {
      color: C.gold, fontSize: 14, line: C.sage, fill: C.bg,
    });
  });
  T(s, "Hasilnya selalu True atau False, bukan angka.", {
    x: 7.45, y: 6.16, w: 4.95, h: 0.32,
    fontSize: 11, color: C.dim,
  });

  footer(s, 15);
}

// ── 16. List ────────────────────────────────────────────────
function s16(pres) {
  const s = slide(pres);
  header(s, "Teori 9 dari 11", "List: Menyimpan Data Berurutan");

  T(s, "List dipakai untuk menyimpan sekumpulan data yang urutannya penting, dan biasanya sejenis.", {
    x: MX, y: 1.54, w: 6.2, h: 0.8,
    fontSize: 14, color: C.text, lineSpacingMultiple: 1.25,
  });

  code(s, MX, 2.46, 6.2, 1.72, [
    { text: 'kategori = ["Elektronik", "Fashion",\n            "Makanan"]\n\n', options: {} },
    { text: 'print(kategori[0])   ', options: {} },
    { text: '# "Elektronik"\n', options: { color: "7F9470" } },
    { text: 'print(kategori[1])   ', options: {} },
    { text: '# "Fashion"', options: { color: "7F9470" } },
  ], { fontSize: 12 });

  card(s, MX, 4.42, 6.2, 2.16, { fill: C.panel2 });
  iconCircle(s, MX + 0.3, 4.76, 0.6, "layers", { fill: C.bg });
  T(s, "Analoginya: rak sepatu bernomor", {
    x: MX + 1.06, y: 4.78, w: 4.8, h: 0.3,
    fontFace: F.head, fontSize: 13, bold: true, color: C.gold,
  });
  T(s, "Rak nomor 0 berisi barang pertama — bukan rak nomor 1. Nomor raknya tetap, isinya yang bisa kita ganti.", {
    x: MX + 0.3, y: 5.5, w: 5.6, h: 0.85,
    fontSize: 11.5, color: C.dim, lineSpacingMultiple: 1.22,
  });

  const pts = [
    ["Kurung siku", "List ditulis dengan [ ], tiap item dipisah koma."],
    ["Punya index", "Tiap item punya posisi/index, dimulai dari 0 — bukan 1."],
    ["Urutan dijaga", "Item tetap berada di urutan yang sama sampai kita ubah sendiri."],
    ["Error paling umum", "IndexError muncul kalau index yang diminta melebihi jumlah item."],
  ];
  pts.forEach(([t, d], i) => {
    const y = 1.6 + i * 1.28;
    card(s, 7.15, y, 5.55, 1.14);
    badge(s, 7.45, y + 0.26, 0.36, String(i + 1), { fontSize: 11.5 });
    T(s, t, {
      x: 7.94, y: y + 0.24, w: 4.5, h: 0.3,
      fontFace: F.head, fontSize: 13, bold: true, color: C.text,
    });
    T(s, d, {
      x: 7.94, y: y + 0.58, w: 4.5, h: 0.5,
      fontSize: 11, color: C.dim, lineSpacingMultiple: 1.15,
    });
  });

  footer(s, 16);
}

// ── 17. VISUAL: rak index ───────────────────────────────────
function s17(pres) {
  const s = slide(pres);
  header(s, "Teori 9 dari 11", "Index Dimulai dari Nol");

  code(s, 2.35, 1.5, 8.65, 0.78, 'kategori = ["Elektronik", "Fashion", "Makanan"]', {
    fontSize: 13.5, valign: "middle",
  });

  const items = ["Elektronik", "Fashion", "Makanan"];
  const bw = 3.0, gap = 0.5, y = 3.16, bh = 1.4;
  const x0 = (W - (items.length * bw + (items.length - 1) * gap)) / 2;

  items.forEach((it, i) => {
    const x = x0 + i * (bw + gap);
    card(s, x, y, bw, bh, { fill: i === 1 ? C.panel2 : C.panel });
    T(s, it, {
      x: x + 0.12, y: y + 0.5, w: bw - 0.24, h: 0.42,
      align: "center", fontFace: F.head, fontSize: 16, bold: true,
      color: i === 1 ? C.gold : C.text,
    });
    // label index di atas kotak
    badge(s, x + bw / 2 - 0.26, y - 0.66, 0.52, String(i), { fontSize: 15 });
    T(s, "index " + i, {
      x: x + 0.12, y: y + bh + 0.34, w: bw - 0.24, h: 0.28,
      align: "center", fontSize: 11, bold: true, color: C.sage,
    });
  });

  // "papan rak"
  s.addShape("roundRect", {
    x: x0 - 0.2, y: y + bh + 0.08, w: items.length * bw + (items.length - 1) * gap + 0.4, h: 0.13,
    rectRadius: 0.06,
    fill: { color: C.sage }, line: { color: C.sage, width: 1 },
  });

  card(s, MX, 5.52, CW, 1.26, { fill: C.panel2 });
  iconCircle(s, MX + 0.34, 5.8, 0.6, "alert", { fill: C.bg, line: C.warn });
  T(s, "kategori[1] berisi “Fashion”, bukan “Elektronik”", {
    x: MX + 1.14, y: 5.8, w: 10.6, h: 0.3,
    fontFace: F.head, fontSize: 14, bold: true, color: C.gold,
  });
  T(s, "Ini sumber kebingungan paling umum di minggu pertama. Item pertama selalu ada di index 0.", {
    x: MX + 1.14, y: 6.18, w: 10.6, h: 0.32,
    fontSize: 12, color: C.dim,
  });

  footer(s, 17);
}

// ── 18. Dictionary ──────────────────────────────────────────
function s18(pres) {
  const s = slide(pres);
  header(s, "Teori 10 dari 11", "Dictionary: Menyimpan Data Berpasangan");

  T(s, "Dictionary dipakai saat setiap nilai punya nama/label sendiri — disebut key — bukan sekadar urutan.", {
    x: MX, y: 1.54, w: 6.2, h: 0.8,
    fontSize: 14, color: C.text, lineSpacingMultiple: 1.25,
  });

  code(s, MX, 2.46, 6.2, 1.82, [
    { text: 'produk = {"nama": "Headset",\n          "harga": 250000,\n          "stok": 12}\n\n', options: {} },
    { text: 'print(produk["nama"])    ', options: {} },
    { text: '# "Headset"', options: { color: "7F9470" } },
  ], { fontSize: 12 });

  card(s, MX, 4.5, 6.2, 2.08, { fill: C.panel2 });
  iconCircle(s, MX + 0.3, 4.84, 0.6, "key", { fill: C.bg });
  T(s, "Analoginya: KTP", {
    x: MX + 1.06, y: 4.86, w: 4.8, h: 0.3,
    fontFace: F.head, fontSize: 13, bold: true, color: C.gold,
  });
  T(s, "Tiap kolom punya label jelas (“Nama”, “Alamat”). Datanya diambil lewat label itu, bukan lewat urutan kolom ke berapa.", {
    x: MX + 0.3, y: 5.58, w: 5.6, h: 0.8,
    fontSize: 11.5, color: C.dim, lineSpacingMultiple: 1.2,
  });

  // Kartu "KTP produk"
  card(s, 7.15, 1.6, 5.55, 3.52);
  T(s, "SATU DATA PRODUK", {
    x: 7.45, y: 1.84, w: 4.95, h: 0.24,
    fontSize: 9, bold: true, charSpacing: 1.8, color: C.gold,
  });
  const kv = [["nama", '"Headset"'], ["harga", "250000"], ["stok", "12"]];
  kv.forEach(([k, v], i) => {
    const y = 2.3 + i * 0.82;
    s.addShape("roundRect", {
      x: 7.45, y, w: 4.95, h: 0.64, rectRadius: 0.05,
      fill: { color: C.bg }, line: { color: C.line, width: 1 },
    });
    T(s, k, {
      x: 7.65, y: y + 0.18, w: 1.6, h: 0.28,
      fontFace: F.mono, fontSize: 12, bold: true, color: C.sage,
    });
    T(s, ":", {
      x: 9.3, y: y + 0.18, w: 0.2, h: 0.28,
      fontFace: F.mono, fontSize: 12, color: C.dim,
    });
    T(s, v, {
      x: 9.55, y: y + 0.18, w: 2.7, h: 0.28,
      fontFace: F.mono, fontSize: 12, color: C.codeTx,
    });
  });
  T(s, "key", {
    x: 7.65, y: 4.76, w: 1.6, h: 0.24,
    fontSize: 9.5, bold: true, charSpacing: 1.2, color: C.sage,
  });
  T(s, "value", {
    x: 9.55, y: 4.76, w: 1.6, h: 0.24,
    fontSize: 9.5, bold: true, charSpacing: 1.2, color: C.gold,
  });

  card(s, 7.15, 5.34, 5.55, 1.24, { fill: C.panel2 });
  T(s, "Diakses lewat nama, bukan posisi", {
    x: 7.45, y: 5.54, w: 4.95, h: 0.3,
    fontFace: F.head, fontSize: 13, bold: true, color: C.text,
  });
  T(s, 'produk["harga"]  ✓      produk[1]  ✗', {
    x: 7.45, y: 5.92, w: 4.95, h: 0.32,
    fontFace: F.mono, fontSize: 12, color: C.dim,
  });

  footer(s, 18);
}

// ── 19. VISUAL: list vs dictionary → DataFrame ──────────────
function s19(pres) {
  const s = slide(pres);
  header(s, "Teori 11 dari 11", "Kapan Pakai List, Kapan Pakai Dictionary?");

  const cols = [
    {
      x: MX, w: 5.85, icon: "list", title: "List", accent: C.sage,
      when: "Kumpulan hal sejenis, urutannya penting.",
      ex: 'kategori = ["Elektronik",\n            "Fashion"]',
      how: "Diakses lewat nomor index  →  kategori[0]",
    },
    {
      x: 6.88, w: 5.83, icon: "key", title: "Dictionary", accent: C.gold,
      when: "Satu data dengan beberapa atribut bernama.",
      ex: 'produk = {"nama": "Mouse",\n          "harga": 150000}',
      how: 'Diakses lewat nama key  →  produk["harga"]',
    },
  ];

  cols.forEach((c) => {
    card(s, c.x, 1.55, c.w, 3.28);
    iconCircle(s, c.x + 0.3, 1.85, 0.62, c.icon, { line: c.accent });
    T(s, c.title, {
      x: c.x + 1.06, y: 1.9, w: c.w - 1.36, h: 0.34,
      fontFace: F.head, fontSize: 17, bold: true, color: c.accent,
    });
    T(s, c.when, {
      x: c.x + 0.3, y: 2.62, w: c.w - 0.6, h: 0.4,
      fontSize: 12, color: C.dim,
    });
    code(s, c.x + 0.3, 3.06, c.w - 0.6, 0.86, c.ex, { fontSize: 11 });
    T(s, c.how, {
      x: c.x + 0.3, y: 4.06, w: c.w - 0.6, h: 0.55,
      fontSize: 11.5, color: C.sage, lineSpacingMultiple: 1.15,
    });
  });

  arrowDown(s, 3.3, 4.94, 0.26, 0.32, { color: C.gold });
  arrowDown(s, 9.68, 4.94, 0.26, 0.32, { color: C.gold });

  card(s, MX, 5.42, CW, 1.4, { fill: C.panel2 });
  iconCircle(s, MX + 0.34, 5.72, 0.62, "table", { fill: C.bg });
  T(s, "Gabungan keduanya = DataFrame (Pandas)", {
    x: MX + 1.16, y: 5.7, w: 10.6, h: 0.32,
    fontFace: F.head, fontSize: 14.5, bold: true, color: C.gold,
  });
  T(s, "Tabel data punya kolom bernama seperti dictionary, dan baris berurutan seperti list — dipelajari di Pertemuan 3.", {
    x: MX + 1.16, y: 6.08, w: 10.6, h: 0.34,
    fontSize: 12, color: C.dim,
  });

  footer(s, 19);
}

// ── 20. Penanda praktik ─────────────────────────────────────
function s20(pres) {
  const s = slide(pres);
  header(s, "Hands-on", "Sekarang Praktik di Colab");
  T(s, "Sepuluh langkah, satu langkah = satu cell baru. Ikuti pelan-pelan, jangan menyalin semuanya sekaligus.", {
    x: MX, y: 1.46, w: CW, h: 0.32, fontSize: 13, color: C.dim,
  });

  const steps = [
    "Buat notebook baru, ganti namanya jadi pertemuan-1.ipynb",
    "Cell pertama: komentar + print(\"Halo, Data Analyst!\")",
    "Bikin error dengan sengaja, lalu baca pesannya",
    "Variabel + f-string: tulis kalimat perkenalan",
    "Cek tipe data setiap variabel dengan type()",
    "Operator: hitung total belanja lalu bandingkan",
    "Buat list kategori, ambil item lewat index",
    "Buat dictionary produk, ambil nilai lewat key",
    "Ubah nilai di dictionary — stok berkurang 2",
    "Gabungan: tiga produk, tampilkan nama dan harganya",
  ];

  steps.forEach((st, i) => {
    const col = i < 5 ? 0 : 1;
    const row = i % 5;
    const x = col === 0 ? MX : 6.88;
    const w = col === 0 ? 5.85 : 5.83;
    const y = 2.02 + row * 0.86;
    card(s, x, y, w, 0.74, { fill: col === 0 ? C.panel : C.panel2 });
    badge(s, x + 0.2, y + 0.17, 0.4, String(i + 1), { fontSize: 12 });
    T(s, st, {
      x: x + 0.74, y: y + 0.13, w: w - 0.94, h: 0.52,
      fontSize: 11.5, color: C.dim, valign: "middle", lineSpacingMultiple: 1.1,
    });
  });

  T(s, "Tiap langkah punya bagian “Cek hasil” dan “Kalau error” di README pertemuan ini — pakai itu kalau tertinggal.", {
    x: MX, y: 6.5, w: CW, h: 0.32,
    align: "center", fontSize: 11.5, italic: true, color: C.sage,
  });

  footer(s, 20);
}

// ── 21. Rangkuman + istilah ─────────────────────────────────
function s21(pres) {
  const s = slide(pres);
  header(s, "Penutup", "Rangkuman & Istilah Penting");

  const sum = [
    ["Alur kerjanya tetap", "Pertanyaan → kumpulkan → bersihkan → analisis → visualisasi → rekomendasi."],
    ["Python itu alat", "Bukan tujuan akhir. Tujuannya selalu menjawab pertanyaan bisnis."],
    ["List vs Dictionary", "List untuk urutan, dictionary untuk pasangan key–value bernama."],
  ];
  sum.forEach(([t, d], i) => {
    const y = 1.6 + i * 1.62;
    card(s, MX, y, 6.1, 1.32);
    badge(s, MX + 0.3, y + 0.3, 0.4, String(i + 1), { fontSize: 12 });
    T(s, t, {
      x: MX + 0.86, y: y + 0.28, w: 4.9, h: 0.32,
      fontFace: F.head, fontSize: 14, bold: true, color: C.text,
    });
    T(s, d, {
      x: MX + 0.3, y: y + 0.78, w: 5.5, h: 0.55,
      fontSize: 11.5, color: C.dim, lineSpacingMultiple: 1.18,
    });
  });

  T(s, "Istilah Penting", {
    x: 7.15, y: 1.56, w: 5.55, h: 0.34,
    fontFace: F.head, fontSize: 16, bold: true, color: C.text,
  });

  const terms = [
    ["Insight", "Temuan bermakna hasil olahan data"],
    ["Google Colab", "Notebook Python di browser"],
    ["Cell", "Blok kode atau teks di notebook"],
    ["Variabel", "Nama untuk menyimpan sebuah nilai"],
    ["f-string", 'Menyisipkan variabel lewat f"..." dan { }'],
    ["List", "Kumpulan nilai berurutan"],
    ["Dictionary", "Pasangan key–value bernama"],
  ];
  terms.forEach(([t, d], i) => {
    const y = 2.06 + i * 0.68;
    T(s, t, {
      x: 7.15, y, w: 1.85, h: 0.3,
      fontSize: 11.5, bold: true, color: C.gold,
    });
    T(s, d, {
      x: 9.1, y, w: 3.6, h: 0.42,
      fontSize: 11, color: C.dim, lineSpacingMultiple: 1.1,
    });
    if (i < terms.length - 1) {
      s.addShape("line", {
        x: 7.15, y: y + 0.5, w: 5.55, h: 0,
        line: { color: C.line, width: 1 },
      });
    }
  });

  footer(s, 21);
}

// ── 22. Penutup ─────────────────────────────────────────────
function s22(pres) {
  const s = slide(pres);
  blob(s, -1.6, 3.7, 5.4, C.sage, 90);
  blob(s, 10.4, -1.1, 4.6, C.gold, 92);

  T(s, "MINGGU DEPAN", {
    x: 1.4, y: 1.95, w: 8, h: 0.3,
    fontSize: 12, bold: true, charSpacing: 3.5, color: C.gold,
  });
  T(s, "Pertemuan 2", {
    x: 1.4, y: 2.35, w: 9, h: 0.85,
    fontFace: F.head, fontSize: 44, bold: true, color: C.text,
  });
  T(s, "Logika, Perulangan, dan Function", {
    x: 1.4, y: 3.24, w: 9.5, h: 0.6,
    fontFace: F.head, fontSize: 26, bold: true, color: C.sage,
  });
  T(s, "Membuat program yang bisa mengambil keputusan sendiri dan mengulang pekerjaan tanpa menulis kode yang sama berkali-kali.", {
    x: 1.4, y: 4.0, w: 8.2, h: 0.7,
    fontSize: 13.5, color: C.dim, lineSpacingMultiple: 1.25,
  });

  ["if / elif / else", "for & while", "function & return"].forEach((t, i) =>
    chip(s, 1.4 + i * 2.9, 4.9, 2.65, 0.5, t, { color: C.dim })
  );

  card(s, 1.4, 5.85, 10.5, 0.92, { fill: C.panel2 });
  T(s, "Sebelum pulang: kerjakan Kuis 1 dan latihan mandiri di README pertemuan ini.", {
    x: 1.72, y: 6.1, w: 9.9, h: 0.42,
    fontSize: 13, bold: true, color: C.gold, valign: "middle",
  });
}

// ─────────────────────────────────────────────────────────────
// BUILD
// ─────────────────────────────────────────────────────────────
async function build(outPath) {
  await loadIcons();

  const pres = new pptxgen();
  pres.defineLayout({ name: "DM16x9", width: W, height: H });
  pres.layout = "DM16x9";
  pres.author = "Vanya Mayazura";
  pres.company = "Haltev Study Club";
  pres.title = "Data Analyst UNSIKA — Pertemuan 1";
  pres.subject = "Kenalan dengan Data Analyst & Python Dasar";

  [s01, s02, s03, s04, s05, s06, s07, s08, s09, s10, s11,
   s12, s13, s14, s15, s16, s17, s18, s19, s20, s21, s22]
    .forEach((fn) => fn(pres));

  await pres.writeFile({ fileName: outPath });
  console.log("OK →", outPath);
}

build(process.argv[2] || "pertemuan-1-data.pptx").catch((e) => {
  console.error(e);
  process.exit(1);
});
