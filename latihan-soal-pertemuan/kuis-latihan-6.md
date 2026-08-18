# Kuis & Latihan 6 — Streamlit dan GitHub

## Identitas Peserta

- **Nama lengkap:** ........................................................
- **Jurusan:** ........................................................
- **Kelas:** ........................................................
- **Tanggal:** ........................................................

## Bagian A — Pemahaman Konsep

1. Apa fungsi Streamlit dalam proyek Data Analyst?

   **Jawaban:** ........................................................................

2. Mengapa proyek perlu memiliki `README.md`?

   **Jawaban:** ........................................................................

3. Mengapa password, API key, atau data pribadi tidak boleh diunggah ke GitHub publik?

   **Jawaban:** ........................................................................

## Bagian B — Praktik Coding dan Dokumentasi

4. Buat struktur folder proyek dashboard sesuai materi sesi 6.

   ```text
   # Tulis struktur folder di sini
   ```

5. Buat `app.py` yang memuat CSV dan menampilkan judul serta lima baris pertama data.

   ```python
   # Tulis jawaban di sini
   ```

6. Tambahkan `st.metric` untuk menampilkan total penjualan.

   ```python
   # Tulis jawaban di sini
   ```

7. Tambahkan filter kategori memakai `st.multiselect`.

   ```python
   # Tulis jawaban di sini
   ```

8. Tuliskan tiga isi minimum yang harus ada dalam README proyek.

   **Jawaban:** ........................................................................

9. Tulis urutan perintah Git dasar untuk membuat commit pertama dan mengunggah proyek ke repository remote.

   ```bash
   # Tulis jawaban di sini
   ```

10. Tuliskan satu kontribusi yang dapat kamu ambil dalam proyek kelompok dan alasan kamu memilihnya.

   **Jawaban:** ........................................................................

## Target Hasil untuk Bagian Coding dan Dokumentasi

**Nomor 4 — Output yang diharapkan:**

```text
dashboard-kelompok/
├── app.py
├── data/
│   └── data.csv
├── requirements.txt
└── README.md
```

**Nomor 5 — Output yang diharapkan di browser:**

```text
Dashboard Penjualan

   id_pesanan nama_produk    kategori   nilai_penjualan
0           1       Mouse  Elektronik            150000
1           2       Buku       Buku              30000
...
```

**Nomor 6 — Output yang diharapkan di dashboard:**

```text
Total Penjualan
Rp 1,250,000
```

**Nomor 7 — Perilaku/output yang diharapkan:**

```text
Pilih kategori: [Elektronik]

Tabel dan grafik hanya menampilkan data kategori Elektronik.
```

**Nomor 8 — Contoh isi README yang diharapkan:**

```text
Tujuan proyek: Menganalisis penjualan e-commerce.
Sumber data: Kaggle (tautan sumber).
Cara menjalankan: streamlit run app.py.
```

**Nomor 9 — Contoh jawaban yang diharapkan:**

```bash
git init
git add .
git commit -m "Buat dashboard awal"
git remote add origin URL_REPOSITORY
git push -u origin main
```

**Nomor 10 — Contoh jawaban yang diharapkan:**

```text
Saya bertanggung jawab membersihkan data karena ingin memastikan data yang dipakai tim valid sebelum divisualisasikan.
```
