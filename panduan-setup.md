# Panduan Setup Tools

## Saat sesi 1–5: Google Colab

1. Buka [Google Colab](https://colab.research.google.com/) dengan akun Google.
2. Buat notebook baru dan beri nama jelas, misalnya `latihan-data-01-nama.ipynb`.
3. Jalankan cell memakai tombol ▶ atau `Shift + Enter`.
4. Simpan notebook di Google Drive. Jangan menghapus cell soal saat mengerjakan latihan.

Google Colab dipakai lebih dulu supaya semua peserta dapat belajar tanpa hambatan instalasi.

## Sebelum sesi 6: lingkungan lokal untuk Streamlit

1. Instal [Python 3.13](https://www.python.org/downloads/release/python-3130/). Saat instalasi Windows, centang **Add Python to PATH**.
2. Instal [VS Code](https://code.visualstudio.com/Download?_exp_download=fb315fc982) dan ekstensi **Python** dari Microsoft.
3. Buka Terminal VS Code pada folder proyek, lalu jalankan:

```bash
python -m venv .venv
.venv\Scripts\activate
pip install streamlit pandas numpy matplotlib seaborn plotly
```

4. Buat file `app.py`, lalu uji dengan:

```bash
streamlit run app.py
```

Jika perintah `python` tidak dikenali, tutup-buka VS Code setelah instalasi, atau gunakan `py` pada Windows.

## Akun yang perlu disiapkan

- Google account untuk Colab dan Google Drive.
- [GitHub](https://github.com/) untuk repository dan kolaborasi.
- [Kaggle](https://www.kaggle.com/) untuk mencari dataset CSV (opsional, tetapi direkomendasikan untuk proyek).
- Akun Streamlit Community Cloud dapat dibuat saat aplikasi siap di-hosting.

## Menggunakan AI dengan bijak

AI boleh dipakai sebagai teman berpikir: meminta penjelasan error, alternatif visualisasi, atau review kode. Jangan langsung menyalin hasilnya. Baca, jalankan, ubah sesuai data, dan pastikan kamu dapat menjelaskan logika setiap baris penting.
