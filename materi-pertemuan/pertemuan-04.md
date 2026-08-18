# Pertemuan 4 — Data Cleaning dan Exploratory Data Analysis

**Durasi:** 19.30–21.00 WIB  
**Tools:** Google Colab, Pandas  
**Output:** Peserta dapat membersihkan data dasar dan menjawab pertanyaan analisis dengan agregasi.

## Tujuan belajar

- Mengidentifikasi missing value, data duplikat, dan tipe data salah.
- Menggunakan statistik deskriptif dan `groupby`.
- Menyusun pertanyaan EDA sebelum membuat grafik.

## Rundown

| Waktu | Aktivitas |
|---|---|
| 19.30–19.40 | Review hasil inspeksi data |
| 19.40–20.05 | Missing value, duplikat, dan tipe data |
| 20.05–20.25 | Statistik deskriptif dan outlier dasar |
| 20.25–20.45 | `groupby`, `agg`, sort, dan pivot sederhana |
| 20.45–20.55 | EDA: pertanyaan → bukti → insight |
| 20.55–21.00 | Rangkuman dan kuis 4 |

## Materi inti

```python
df.isna().sum()
df = df.drop_duplicates()
df["tanggal"] = pd.to_datetime(df["tanggal"], errors="coerce")
df["harga"] = pd.to_numeric(df["harga"], errors="coerce")

ringkasan = (
    df.groupby("kategori", as_index=False)
      .agg(total_penjualan=("nilai_penjualan", "sum"),
           jumlah_transaksi=("id_pesanan", "nunique"))
      .sort_values("total_penjualan", ascending=False)
)
```

Tidak semua missing value harus dihapus. Pilih tindakan berdasarkan konteks: isi nilai, hapus baris, atau tandai sebagai kategori “Tidak diketahui”. Catat keputusan cleaning agar analisis dapat dipertanggungjawabkan.

## Pertanyaan EDA contoh

- Kategori mana yang menyumbang penjualan terbesar?
- Apakah penjualan berubah menurut bulan?
- Wilayah mana yang transaksinya banyak tetapi nilai belanjanya rendah?

## Aktivitas

Buat tabel ringkasan penjualan per kategori. Tulis satu insight berbentuk kalimat lengkap, bukan hanya angka.

## Rangkuman

Cleaning yang baik membuat data layak dipercaya. EDA yang baik selalu dimulai dengan pertanyaan dan berakhir dengan jawaban berbasis bukti.
