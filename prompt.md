# Context Handoff — Data Analyst UNSIKA

> Jika percakapan ini dilanjutkan pada sesi baru atau setelah context compact, berikan instruksi berikut kepada AI:
> **"Baca dulu `D:\HALTEV\UNSIKA-StudyClub\Data-Analyst-UNSIKA\prompt.md`, lalu lanjutkan diskusi dari konteks tersebut. Jangan mengubah file apa pun sebelum saya memberi instruksi."**

## Lokasi Kerja Utama

Semua perubahan untuk program ini **wajib** dilakukan hanya di:

```text
D:\HALTEV\UNSIKA-StudyClub\Data-Analyst-UNSIKA
```

> Catatan: path lama di file ini sebelumnya salah tertulis `D:\HALTEV\UNSIKA-DATA\...` — sudah diperbaiki. Folder ini juga pernah ada di lokasi lebih lama `D:\HALTEV\2. Data Science Bootcamp\Materi dan Code\Data-Analyst-UNSIKA` — jangan ubah folder itu lagi, sudah tidak dipakai.

Folder ini bertetangga dengan `Website-UNSIKA` (program terpisah, kurikulum web development) di dalam `D:\HALTEV\UNSIKA-StudyClub\`. Struktur/pola file di kedua program sengaja dibuat konsisten, tapi isinya independen — jangan menyalin konten Website ke sini atau sebaliknya, hanya pola/template-nya yang sama.

## Ringkasan Program

- **Nama:** Data Analyst UNSIKA
- **Penyelenggara:** Haltev
- **Tutor:** Vanya Mayazura, Software Engineer Instructor
- **Peserta:** sekitar 20–30 mahasiswa Sistem Informasi; mayoritas pemula atau masih memahami coding dasar.
- **Durasi:** 6 pertemuan, pukul 19.30–21.00 WIB (90 menit/sesi).
- **Bahasa:** Bahasa Indonesia yang sederhana, natural, profesional, dan tidak terasa terlalu "AI".
- **Gaya kelas:** praktik, studi kasus relevan, tanya jawab, ice breaking ringan, dan boleh diselipkan meme secara wajar.
- **Kebutuhan khusus (sama seperti Website-UNSIKA):** materi teori tiap pertemuan ditulis detail dan terstruktur per sub-bab, karena dijadikan bahan PowerPoint. Bahasa sederhana, pakai analogi.

## Tujuan Pembelajaran

Peserta diharapkan mampu:

1. Memahami fundamental Python yang relevan untuk Data Analyst.
2. Mengolah CSV dengan NumPy dan Pandas.
3. Melakukan data cleaning, EDA, visualisasi, dan data storytelling.
4. Membuat dashboard Streamlit sederhana.
5. Menggunakan GitHub untuk dokumentasi dan kolaborasi dasar.
6. Menggunakan AI secara bertanggung jawab sebagai coding assistant serta mampu menjelaskan kode yang digunakan.

## Keputusan Kurikulum yang Sudah Dikunci

| Pertemuan | Materi utama |
|---|---|
| 1 | Pengenalan Data Analyst, Google Colab, Python dasar: input/output, variabel, tipe data, operator, list, dictionary |
| 2 | Conditional, `for`, `while`, function, dan pengenalan OOP singkat (bukan fokus utama) |
| 3 | NumPy, Pandas, CSV, DataFrame, seleksi, dan filtering |
| 4 | Data cleaning, statistik deskriptif, `groupby`, agregasi, dan EDA |
| 5 | Matplotlib, Seaborn, Plotly, KPI, dan data storytelling |
| 6 | Streamlit dasar, dashboard report, GitHub dasar, dan arahan proyek akhir |

### Batasan penting

- Fokus pada jalur **Data Analyst**, bukan Machine Learning.
- Dataset latihan bersama: **e-commerce dalam format CSV**.
- SQLite/MySQL bersifat opsional dan belum masuk materi inti.
- Sesi 1–5 memakai Google Colab terlebih dahulu.
- Peserta diminta setup Python 3.13, VS Code, dan Streamlit **sebelum sesi 6**.
- Proyek dashboard dikerjakan **setelah sesi 6**, bukan harus selesai di dalam sesi 6.

## Tech Stack

- Python 3.13
- Google Colab, Jupyter Notebook, dan VS Code
- NumPy dan Pandas
- Matplotlib, Seaborn, dan Plotly
- Streamlit
- CSV dan Kaggle
- GitHub dan Google Drive

## Struktur yang Sudah Ada

```text
Data-Analyst-UNSIKA/
├── README.md
├── prompt.md
├── panduan-setup.md
├── panduan-proyek-akhir.md
├── materi-pertemuan/
│   ├── pert1-materi/                  # README.md (Teori+Hands-on) + pertemuan-1.ipynb + pertemuan-1-data.pptx
│   ├── pert2-materi/                  # menyusul, pola identik
│   ├── pert3-materi/                  # menyusul
│   ├── pert4-materi/                  # menyusul
│   ├── pert5-materi/                  # menyusul
│   └── pert6-materi/                  # menyusul
├── latihan-soal-pertemuan/
│   ├── kuis-latihan-1.md
│   ├── kuis-latihan-2.md
│   ├── kuis-latihan-3.md
│   ├── kuis-latihan-4.md
│   ├── kuis-latihan-5.md
│   └── kuis-latihan-6.md
├── kunci-jawaban-pertemuan/
│   ├── kunci-latihan-data1-6.md
│   └── kunci-kuis-data1-5.md
└── latihan-soal-pilgan-pertemuan/     # bank soal pilihan ganda untuk Slido, ditampilkan live oleh moderator
    ├── pilgan-1.md / pilgan-1.csv     # selesai — 10 soal
    ├── pilgan-2.md / pilgan-2.csv     # selesai — 10 soal
    ├── pilgan-3.md / pilgan-3.csv     # selesai — 10 soal
    ├── pilgan-4.md / pilgan-4.csv     # selesai — 10 soal
    ├── pilgan-5.md / pilgan-5.csv     # selesai — 10 soal
    ├── pilgan-6.md / pilgan-6.csv     # selesai — 10 soal
    └── cara-import-slido.md           # panduan moderator (disalin dari Website-UNSIKA, disesuaikan)
```

## Status Kelas Saat Ini

| Pertemuan | Materi (README Teori+Hands-on) | Notebook `.ipynb` | PPT | Pilgan (Slido) | Status |
|---|---|---|---|---|---|
| 1 | Selesai (diperluas dari `pertemuan-01.md` lama) | Selesai | Selesai | Selesai (10 soal) | **Siap diajarkan** |
| 2 | Belum diperluas (masih `pertemuan-02.md` format lama) | Belum | Belum | Selesai (10 soal) | Pilgan siap, materi/notebook/PPT menunggu arahan |
| 3 | Belum diperluas (masih `pertemuan-03.md` format lama) | Belum | Belum | Selesai (10 soal) | Pilgan siap, materi/notebook/PPT menunggu arahan |
| 4 | Belum diperluas (masih `pertemuan-04.md` format lama) | Belum | Belum | Selesai (10 soal) | Pilgan siap, materi/notebook/PPT menunggu arahan |
| 5 | Belum diperluas (masih `pertemuan-05.md` format lama) | Belum | Belum | Selesai (10 soal) | Pilgan siap, materi/notebook/PPT menunggu arahan |
| 6 | Belum diperluas (masih `pertemuan-06.md` format lama) | Belum | Belum | Selesai (10 soal) | Pilgan siap, materi/notebook/PPT menunggu arahan |

**Penting:** user secara eksplisit minta pilgan (MCQ) dan essay (`kuis-latihan-N.md`, sudah lengkap dari awal) dikerjakan duluan untuk semua 6 pertemuan — **restrukturisasi materi jadi `pertN-materi/` + notebook + PPT untuk pertemuan 2–6 SENGAJA belum dikerjakan**, menunggu arahan lebih lanjut ("untuk codingan enggak usah jangan dulu. nanti nunggu arahan dari aku dulu"). Jangan mengerjakan materi/notebook/PPT pertemuan 2–6 sebelum ada instruksi baru dari user.

## Anatomi Materi Baru (`pertN-materi/README.md`)

Diperluas dari format lama (`## Materi inti` singkat) ke pola Website-UNSIKA:

1. `# Pertemuan N — Judul`
2. Meta: **Durasi**, **Tools**, **Output**
3. `## Cara Menjalankan Kode di Folder Ini` — buka `.ipynb` lewat Colab/Jupyter
4. `## Tujuan Belajar`
5. `## Rundown` — tabel waktu 19.30–21.00
6. `## Teori` — dipecah `###` sub-bab (1 sub-bab = 1 slide PPT), analogi sehari-hari, `> Slide visual: ...`, kode dijelaskan baris per baris
7. `## Hands-on: Langkah demi Langkah` — bernomor, tiap langkah = 1 cell Colab baru, **Cek hasil** + **Kalau error**
8. `## Catatan AI`
9. `## Latihan Mandiri`
10. `## Rangkuman` + teaser pertemuan berikutnya
11. `## Istilah Penting` — glosarium tabel

Target panjang serupa Website: ~250-480 baris per pertemuan.

## Cara Generate PPT

Script generator sama dengan yang dipakai Website-UNSIKA (reusable, sudah diparameterkan supaya nama kelas tidak hardcode):

```bash
python build_slides.py "materi-pertemuan/pertN-materi/README.md" "materi-pertemuan/pertN-materi/pertemuan-N-data.pptx" "Data Analyst UNSIKA" "Studi Kasus: Data Penjualan E-commerce"
```

Script ada di scratchpad sesi: `C:\Users\Vanya\AppData\Local\Temp\claude\D--HALTEV-UNSIKA-StudyClub\0a38cc8c-7973-42d6-ae70-154cd539832b\scratchpad\build_slides.py`. Kalau sesi baru dan file scratchpad sudah hilang, script perlu ditulis ulang berdasarkan pola yang sudah terbukti di kedua repo (parsing markdown generic + styling matcha).

## Progress / Yang Sudah Selesai

- [x] Program awal: README, prompt.md, panduan-setup.md, panduan-proyek-akhir.md, 6 modul materi format lama, 6 kuis-latihan, 2 kunci jawaban.
- [x] Path lokasi kerja di `prompt.md` diperbaiki (dulu salah tertulis `UNSIKA-DATA`, seharusnya `UNSIKA-StudyClub`).
- [x] `materi-pertemuan/pertemuan-01.md` (format lama) dihapus, digantikan `pert1-materi/README.md` — diperluas ke format Teori (11 sub-bab) + Hands-on (10 langkah bernomor), topik tetap sama (Data Analyst, Colab, Python dasar), studi kasus e-commerce.
- [x] `pert1-materi/pertemuan-1.ipynb` dibuat — notebook asli 10 code cell + 12 markdown cell, semua cell sudah dites jalan dan outputnya cocok dengan "Cek hasil" di README.
- [x] `pert1-materi/pertemuan-1-data.pptx` di-generate (15 slide: cover, gambaran sesi, rundown, 11 sub-bab teori, penutup), tema matcha sama seperti Website.
- [x] Script generator PPT diupdate supaya nama kelas & tagline jadi parameter (`kelas_name`, `tagline`), tidak hardcode "Website UNSIKA" lagi — dipakai bergantian oleh kedua repo.
- [x] `latihan-soal-pilgan-pertemuan/pilgan-1.md` sampai `pilgan-6.md` (+ `.csv` masing-masing) — 10 soal MCQ baru per pertemuan (60 soal total), topik diambil dari `## Materi inti` file `pertemuan-0N.md` format lama (belum diperluas), jawaban inline ✅.
- [x] `cara-import-slido.md` disalin dari Website-UNSIKA, disesuaikan (nama kelas di contoh event).
- [x] Soal esai/coding (`kuis-latihan-N.md`) dan kunci jawabannya — **tidak disentuh**, sudah lengkap 6 pertemuan sejak awal, sesuai pola.
- [ ] **SENGAJA DITUNDA** atas instruksi user: replikasi materi diperluas (Teori+Hands-on) + notebook `.ipynb` + PPT ke pertemuan 2–6. Menunggu arahan lebih lanjut, jangan dikerjakan sebelum diminta.

## Change Log Terakhir

| Perubahan | Detail |
|---|---|
| Program awal dibuat | Kurikulum 6 pertemuan, README, panduan setup & proyek akhir, materi format lama, kuis-latihan, kunci jawaban. |
| Upgrade ke parity dengan Website-UNSIKA (pertemuan 1) | Materi pertemuan 1 diperluas ke format Teori+Hands-on, direstrukturisasi ke `pert1-materi/` (dari file flat), ditambah notebook `.ipynb`, PPT tema matcha, dan bank soal pilihan ganda untuk Slido. Path lokasi kerja yang salah di `prompt.md` diperbaiki. |
| Pilgan 6 pertemuan sekaligus | Atas instruksi user, `pilgan-2.md` sampai `pilgan-6.md` (+ CSV) dibuat langsung untuk semua sisa pertemuan, topiknya diambil dari `pertemuan-02.md` s.d. `pertemuan-06.md` (format lama, belum diperluas). Restrukturisasi materi/notebook/PPT pertemuan 2–6 **sengaja tidak dikerjakan**, menunggu arahan user. |

## Aturan File Kuis & Latihan

- Gunakan nama `kuis-latihan-1.md` sampai `kuis-latihan-6.md`; jangan membuat file kuis dan latihan terpisah lagi.
- Setiap file wajib memiliki kolom identitas: **nama lengkap, jurusan, kelas, dan tanggal**.
- Setiap soal coding wajib memiliki:
  1. instruksi yang jelas;
  2. area kode kosong agar peserta menjawab;
  3. bagian **Target Hasil** dengan contoh output dalam code block, misalnya:

  ```text
  2
  4
  6
  8
  10
  ```

- Jangan langsung menuliskan solusi kode lengkap pada file soal.
- Kunci jawaban disimpan terpisah di folder `kunci-jawaban-pertemuan`.
- File ini (`kuis-latihan-N.md` dan kunci jawabannya) **tidak ikut direstrukturisasi** saat upgrade ke parity Website — formatnya sudah dari awal identik dengan pola yang dipakai Website.

## Aturan File Pilgan (Baru)

- Nama file: `pilgan-1.md` sampai `pilgan-6.md`, plus versi `.csv`-nya, di folder `latihan-soal-pilgan-pertemuan/`.
- 10 soal per pertemuan, 4 opsi (A-D), jawaban benar ditandai ✅ langsung di file (bukan dipisah ke folder kunci) — karena dokumen ini untuk kebutuhan internal moderator menyiapkan Slido, bukan dibaca peserta.
- Topik soal harus benar-benar diangkat dari `## Teori` pertemuan yang sesuai — jangan mengarang topik di luar kurikulum yang sudah dikunci.
- CSV harus transkripsi 1:1 dari markdown (bukan ditulis independen), supaya tidak ada risiko drift.

## Proyek Akhir

- Kelompok: 3–4 peserta.
- Peserta bebas memilih topik dan dataset publik dari Kaggle; tersedia ide cadangan di `panduan-proyek-akhir.md`.
- Output minimal: dashboard Streamlit, minimal tiga insight/rekomendasi, README, dan repository GitHub.
- Pengumpulan: GitHub atau Google Drive, menunggu arahan penyelenggara.
- Status presentasi dan tenggat: **belum diputuskan**. Jangan mengasumsikan presentasi wajib sebelum pengguna mengonfirmasi.

## Catatan Konteks: Lomba di Akhir Program

Sama seperti catatan di `prompt.md` Website-UNSIKA — ini catatan konteks buat AI, bukan dokumen resmi untuk peserta.

- Kampus peserta berencana mengadakan lomba sendiri secara offline setelah **seluruh rangkaian pembelajaran** (Data Analyst maupun Website) selesai.
- Tutor tidak hadir/tidak mengatur lomba tersebut — aturan, waktu, format, dan penjurian sepenuhnya kewenangan kampus masing-masing peserta.
- Implikasi: tidak perlu membuat dokumen aturan lomba resmi untuk Data Analyst juga. Pastikan saja 6 pertemuan menghasilkan skill yang memadai (Python, Pandas/NumPy, EDA, visualisasi, dashboard Streamlit) untuk peserta tampil di lomba semacam itu.
- Kalau nanti ada detail lomba lebih lanjut dari kampus, baru dipertimbangkan apakah perlu materi tambahan.

## Aturan Kolaborasi dengan Pengguna

1. Diskusikan kebutuhan terlebih dahulu jika pengguna belum meminta eksekusi.
2. Jangan mengubah file atau melakukan push ke GitHub kecuali diminta secara eksplisit. **Repo ini belum dapat izin push** (beda dari Website-UNSIKA yang sudah eksplisit diizinkan) — commit lokal boleh, push tunggu instruksi baru.
3. Jika diminta perubahan, edit hanya folder pada bagian "Lokasi Kerja Utama".
4. Jangan menyentuh submission murid, folder `Website-UNSIKA`, atau materi lain di luar folder Data Analyst UNSIKA.
5. Setelah membuat perubahan, jelaskan singkat file mana yang berubah dan apa hasilnya.

## To Do / Menunggu Keputusan

- [ ] Konfirmasi dari penyelenggara: apakah proyek akhir memiliki sesi presentasi atau hanya pengumpulan.
- [ ] Konfirmasi tenggat pengumpulan proyek akhir dan platform final (GitHub, Google Drive, atau keduanya).
- [ ] Tentukan apakah kunci jawaban tetap digabung dalam dua file atau dipecah menjadi satu file per pertemuan.
- [ ] Siapkan dataset e-commerce CSV yang akan dipakai saat kelas beserta sumber/lisensinya.
- [ ] Buat template dashboard Streamlit dan `requirements.txt` untuk proyek kelompok bila diminta.
- [ ] Tambahkan rubrik presentasi apabila format presentasi sudah disetujui.
- [ ] Lanjutkan replikasi pola pertemuan 1 (materi diperluas, notebook, PPT, pilgan) ke pertemuan 2–6 setelah dikonfirmasi user.
- [ ] Konfirmasi apakah repo ini boleh di-push ke GitHub (dan ke mana) — belum ada izin eksplisit seperti Website-UNSIKA.
