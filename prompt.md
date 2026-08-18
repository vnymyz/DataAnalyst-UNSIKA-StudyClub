# Context Handoff — Data Analyst UNSIKA

> Jika percakapan ini dilanjutkan pada sesi baru atau setelah context compact, berikan instruksi berikut kepada AI:  
> **“Baca dulu `D:\HALTEV\UNSIKA-DATA\Data-Analyst-UNSIKA\prompt.md`, lalu lanjutkan diskusi dari konteks tersebut. Jangan mengubah file apa pun sebelum saya memberi instruksi.”**

## Lokasi Kerja Utama

Semua perubahan untuk program ini **wajib** dilakukan hanya di:

```text
D:\HALTEV\UNSIKA-DATA\Data-Analyst-UNSIKA
```

Jangan lagi mengubah folder lama `D:\HALTEV\2. Data Science Bootcamp\Materi dan Code\Data-Analyst-UNSIKA`.

## Ringkasan Program

- **Nama:** Data Analyst UNSIKA
- **Penyelenggara:** Haltev
- **Tutor:** Vanya Mayazura, Software Engineer Instructor
- **Peserta:** sekitar 20–30 mahasiswa Sistem Informasi; mayoritas pemula atau masih memahami coding dasar.
- **Durasi:** 6 pertemuan, pukul 19.30–21.00 WIB (90 menit/sesi).
- **Bahasa:** Bahasa Indonesia yang sederhana, natural, profesional, dan tidak terasa terlalu “AI”.
- **Gaya kelas:** praktik, studi kasus relevan, tanya jawab, ice breaking ringan, dan boleh diselipkan meme secara wajar.

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
│   ├── pertemuan-01.md
│   ├── pertemuan-02.md
│   ├── pertemuan-03.md
│   ├── pertemuan-04.md
│   ├── pertemuan-05.md
│   └── pertemuan-06.md
├── latihan-soal-pertemuan/
│   ├── kuis-latihan-1.md
│   ├── kuis-latihan-2.md
│   ├── kuis-latihan-3.md
│   ├── kuis-latihan-4.md
│   ├── kuis-latihan-5.md
│   └── kuis-latihan-6.md
└── kunci-jawaban-pertemuan/
    ├── kunci-latihan-data1-6.md
    └── kunci-kuis-data1-5.md
```

## Progress / Yang Sudah Selesai

- [x] Membuat folder program Data Analyst UNSIKA.
- [x] Menyusun kurikulum 6 pertemuan untuk level pemula.
- [x] Membuat README dengan daftar isi, alur belajar, cara memakai materi, struktur folder, tech stack, aturan AI, penilaian, dan proyek akhir.
- [x] Menambahkan panduan Google Colab, Python, VS Code, Streamlit, GitHub, serta Kaggle pada `panduan-setup.md`.
- [x] Menambahkan panduan proyek dashboard kelompok 3–4 orang pada `panduan-proyek-akhir.md`.
- [x] Menulis enam modul Markdown: Python dasar hingga Streamlit dan GitHub.
- [x] Membuat enam file gabungan kuis dan latihan.
- [x] Menambahkan identitas peserta (nama, jurusan, kelas, tanggal) pada setiap file kuis-latihan.
- [x] Menambahkan area jawaban serta contoh output dalam code block untuk setiap soal coding.
- [x] Membuat dua file kunci jawaban.
- [x] Menambahkan panduan VS Code: klik kanan file Markdown → **Open Preview** atau gunakan `Ctrl + Shift + V`.

## Change Log Terakhir

| Perubahan | Detail |
|---|---|
| Lokasi folder | Program dipindahkan ke `D:\HALTEV\UNSIKA-DATA\Data-Analyst-UNSIKA`. Semua perubahan lanjutan wajib dilakukan di sini. |
| README | Diperluas dengan daftar isi, panduan penggunaan materi, struktur folder, dan petunjuk Markdown Preview VS Code. |
| Soal | File lama `kuis-data*.md` dan `latihan-data*.md` dihapus. Diganti dengan `kuis-latihan-1.md` sampai `kuis-latihan-6.md`. |
| Soal coding | Ditambahkan contoh **Output yang Diharapkan** dalam code block; solusi kode lengkap tetap hanya berada di folder kunci jawaban. |
| GitHub | Materi sudah diunggah pengguna ke GitHub. AI tidak melakukan push atau perubahan remote. |

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

## Proyek Akhir

- Kelompok: 3–4 peserta.
- Peserta bebas memilih topik dan dataset publik dari Kaggle; tersedia ide cadangan di `panduan-proyek-akhir.md`.
- Output minimal: dashboard Streamlit, minimal tiga insight/rekomendasi, README, dan repository GitHub.
- Pengumpulan: GitHub atau Google Drive, menunggu arahan penyelenggara.
- Status presentasi dan tenggat: **belum diputuskan**. Jangan mengasumsikan presentasi wajib sebelum pengguna mengonfirmasi.

## Aturan Kolaborasi dengan Pengguna

1. Diskusikan kebutuhan terlebih dahulu jika pengguna belum meminta eksekusi.
2. Jangan mengubah file atau melakukan push ke GitHub kecuali diminta secara eksplisit.
3. Jika diminta perubahan, edit hanya folder pada bagian “Lokasi Kerja Utama”.
4. Jangan menyentuh submission murid atau materi lain di luar folder Data Analyst UNSIKA.
5. Setelah membuat perubahan, jelaskan singkat file mana yang berubah dan apa hasilnya.

## To Do / Menunggu Keputusan

- [ ] Konfirmasi dari penyelenggara: apakah proyek akhir memiliki sesi presentasi atau hanya pengumpulan.
- [ ] Konfirmasi tenggat pengumpulan proyek akhir dan platform final (GitHub, Google Drive, atau keduanya).
- [ ] Tentukan apakah kunci jawaban tetap digabung dalam dua file atau dipecah menjadi satu file per pertemuan.
- [ ] Tentukan apakah materi Markdown perlu diubah menjadi notebook Google Colab/Jupyter yang siap dijalankan.
- [ ] Siapkan dataset e-commerce CSV yang akan dipakai saat kelas beserta sumber/lisensinya.
- [ ] Buat template dashboard Streamlit dan `requirements.txt` untuk proyek kelompok bila diminta.
- [ ] Tambahkan rubrik presentasi apabila format presentasi sudah disetujui.
