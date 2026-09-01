# Data Analyst UNSIKA

Selamat datang di materi **Data Analyst UNSIKA**. Program ini dirancang untuk mahasiswa pemula yang ingin belajar mengubah data mentah menjadi insight dan dashboard yang mudah dipahami.

Kelas berlangsung selama **6 pertemuan**, setiap **19.30–21.00 WIB**. Pembelajaran dimulai dari Google Colab agar semua peserta dapat langsung praktik, lalu beralih ke VS Code dan Streamlit pada sesi terakhir.

## Daftar Isi

1. [Tujuan Pembelajaran](#tujuan-pembelajaran)
2. [Alur Belajar](#alur-belajar)
3. [Cara Menggunakan Materi](#cara-menggunakan-materi)
4. [Struktur Folder](#struktur-folder)
5. [Tools yang Digunakan](#tools-yang-digunakan)
6. [Aturan Penggunaan AI](#aturan-penggunaan-ai)
7. [Latihan, Kuis, dan Penilaian](#latihan-kuis-dan-penilaian)
8. [Proyek Akhir](#proyek-akhir)

## Tujuan Pembelajaran

Setelah menyelesaikan program ini, peserta diharapkan mampu:

- Memahami peran dan alur kerja seorang Data Analyst.
- Menggunakan Python dasar untuk menyelesaikan masalah sederhana.
- Mengolah data CSV memakai NumPy dan Pandas.
- Membersihkan data, melakukan Exploratory Data Analysis (EDA), serta menarik insight.
- Membuat visualisasi dengan Matplotlib, Seaborn, dan Plotly.
- Menyusun data storytelling serta rekomendasi berbasis data.
- Membuat dashboard report sederhana dengan Streamlit.
- Mengunggah serta mendokumentasikan proyek di GitHub.

## Alur Belajar

| Pertemuan | Fokus | Hasil yang Diharapkan |
|---|---|---|
| 1 | Data Analyst, Google Colab, dan Python dasar | Menjalankan kode, memakai variabel, list, dan dictionary |
| 2 | Conditional, loop, dan function | Membuat program dengan logika dan kode yang reusable |
| 3 | NumPy, Pandas, dan CSV | Membaca, memahami, memilih, serta memfilter data |
| 4 | Data cleaning dan EDA | Membersihkan data dan membuat tabel ringkasan analisis |
| 5 | Visualisasi, KPI, dan storytelling | Membuat grafik yang tepat serta menjelaskan insight |
| 6 | Streamlit dan GitHub | Menjalankan dashboard lokal dan mengunggah proyek ke GitHub |

## Cara Menggunakan Materi

1. Baca modul sesuai urutan pada folder `materi-pertemuan`. Tiap folder `pertN-materi` berisi `README.md` (materi Teori + Hands-on lengkap), notebook `pertemuan-N.ipynb` hasil hands-on, dan `pertemuan-N-data.pptx` — slide presentasi ringkas dari bagian Teori.
2. Pelajari bagian **Teori** untuk memahami konsep, lalu ikuti **Hands-on: Langkah demi Langkah** di Google Colab atau VS Code persis seperti instruksinya.
3. Kerjakan file latihan untuk sesi tersebut di folder `latihan-soal-pertemuan`.
4. Kerjakan kuis sesi 1–5 secara mandiri sebelum melihat kunci.
5. Buka folder `kunci-jawaban-pertemuan` hanya setelah mencoba seluruh soal.
6. Catat error atau bagian yang belum dipahami untuk dibahas pada sesi tanya jawab.

> Belajar coding bukan tentang cepat menemukan jawaban, tetapi memahami alasan kode bekerja.

### Bahan Presentasi (PPT)

Tiap pertemuan punya file PowerPoint sendiri, isinya slide ringkas dari bagian Teori — dipakai mentor untuk mengajar di kelas. Klik link di bawah untuk langsung buka filenya:

- [Pertemuan 1 — pertemuan-1-data.pptx](materi-pertemuan/pert1-materi/pertemuan-1-data.pptx)
- Pertemuan 2 — `materi-pertemuan/pert2-materi/pertemuan-2-data.pptx` (belum tersedia)
- Pertemuan 3 — `materi-pertemuan/pert3-materi/pertemuan-3-data.pptx` (belum tersedia)
- Pertemuan 4 — `materi-pertemuan/pert4-materi/pertemuan-4-data.pptx` (belum tersedia)
- Pertemuan 5 — `materi-pertemuan/pert5-materi/pertemuan-5-data.pptx` (belum tersedia)
- Pertemuan 6 — `materi-pertemuan/pert6-materi/pertemuan-6-data.pptx` (belum tersedia)

Polanya: `materi-pertemuan/pertN-materi/pertemuan-N-data.pptx`, di dalam folder pertemuan yang sama dengan `README.md` dan notebooknya. Isi slide selalu ringkasan dari `README.md` pertemuan itu — kalau butuh detail lebih lengkap, buka `README.md`-nya, bukan PPT-nya.

### Membaca Markdown dengan nyaman di VS Code

Jika membuka materi melalui VS Code, klik kanan file Markdown (misalnya `pert1-materi/README.md` atau `kuis-latihan-1.md`), lalu pilih **Open Preview**. VS Code akan menampilkan judul, tabel, kode, dan daftar isi dengan format yang lebih rapi.

Kamu juga dapat memakai shortcut `Ctrl + Shift + V` untuk membuka preview dari file Markdown yang sedang aktif.

## Struktur Folder

```text
Data-Analyst-UNSIKA/
├── materi-pertemuan/             # Folder pertN-materi: README (teori + hands-on) + notebook + PPT per pertemuan
├── latihan-soal-pertemuan/       # Latihan praktik + kuis sesi 1–5
├── kunci-jawaban-pertemuan/      # Kunci latihan dan kuis
├── latihan-soal-pilgan-pertemuan/ # Bank soal pilihan ganda untuk Slido, ditampilkan live saat kelas (khusus moderator)
├── panduan-setup.md              # Setup Google Colab, Python, VS Code, Streamlit
├── panduan-proyek-akhir.md       # Ketentuan dashboard proyek kelompok
└── README.md                     # Panduan ini
```

## Tools yang Digunakan

| Kebutuhan | Tools |
|---|---|
| Belajar awal | Google Colab |
| Bahasa pemrograman | Python 3.13 |
| Pengolahan data | NumPy dan Pandas |
| Visualisasi | Matplotlib, Seaborn, dan Plotly |
| Dashboard | Streamlit |
| Kolaborasi dan portofolio | GitHub dan Google Drive |
| Sumber dataset | CSV dan Kaggle |

Lihat [panduan-setup.md](panduan-setup.md) sebelum memulai. Peserta wajib menyiapkan Python, VS Code, dan package Streamlit sebelum pertemuan 6.

## Aturan Penggunaan AI

AI boleh digunakan sebagai coding assistant untuk menjelaskan konsep, membantu membaca error, memberi contoh, atau mereview kode. Namun peserta tetap wajib:

- Membaca dan menjalankan kode sebelum menggunakannya.
- Memahami logika setiap bagian penting.
- Memodifikasi jawaban agar sesuai dengan dataset dan masalahnya.
- Mampu menjelaskan kode saat ditanya pengajar.

Jangan memasukkan password, API key, data pribadi, atau data sensitif ke layanan AI maupun repository publik.

## Latihan, Kuis, dan Penilaian

- Setiap sesi memiliki latihan praktik untuk menguatkan materi.
- Sesi 1–5 memiliki kuis berisi **10 soal**: konsep/isian singkat dan membaca atau menulis potongan kode.
- Kunci jawaban tersedia terpisah untuk mendorong peserta mencoba secara mandiri terlebih dahulu.
- Saat menjawab, penjelasan logika lebih penting daripada kode yang sekadar berjalan.

## Proyek Akhir

Setelah sesi 6, peserta membentuk kelompok **3–4 orang** untuk membuat dashboard Streamlit berbasis dataset publik. Dataset dapat berasal dari Kaggle dan harus memiliki sumber yang jelas.

Output minimal proyek:

- Dashboard dengan visualisasi, metrik, dan filter yang relevan.
- Minimal tiga insight dan rekomendasi berbasis data.
- Repository GitHub berisi kode, data yang aman dibagikan, serta `README.md`.
- Kontribusi yang dapat dilacak dari setiap anggota kelompok.

Aturan lengkap, ide topik cadangan, dan rubrik awal tersedia di [panduan-proyek-akhir.md](panduan-proyek-akhir.md). Mekanisme presentasi dan tenggat akan mengikuti pengumuman penyelenggara.
