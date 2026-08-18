# Pertemuan 3 — NumPy, Pandas, dan CSV

**Durasi:** 19.30–21.00 WIB  
**Tools:** Google Colab, NumPy, Pandas, CSV  
**Output:** Peserta dapat membuka, melihat, memilih, dan memfilter data e-commerce dalam DataFrame.

## Tujuan belajar

- Memahami array NumPy dan operasi vectorized dasar.
- Memahami Series dan DataFrame.
- Membaca file CSV serta melakukan inspeksi awal.
- Menyeleksi kolom, baris, dan filter data.

## Rundown

| Waktu | Aktivitas |
|---|---|
| 19.30–19.40 | Review dan konteks dataset e-commerce |
| 19.40–20.00 | NumPy: array, shape, operasi angka |
| 20.00–20.20 | Pandas: Series dan DataFrame |
| 20.20–20.45 | Membaca CSV: `head`, `info`, `describe` |
| 20.45–20.55 | Seleksi dan filter data |
| 20.55–21.00 | Rangkuman dan kuis 3 |

## Materi inti

```python
import numpy as np
import pandas as pd

angka = np.array([10, 20, 30])
print(angka * 2)

df = pd.read_csv("nama_file.csv")
display(df.head())
df.info()
display(df.describe())
```

DataFrame adalah tabel: kolom mewakili variabel dan baris mewakili observasi. Gunakan `df["kolom"]` untuk satu kolom dan `df[["kolom_a", "kolom_b"]]` untuk beberapa kolom.

```python
produk_mahal = df[df["harga"] > 100000]
kolom_pilihan = df[["nama_produk", "kategori", "harga"]]
```

## Dataset dan Kaggle

Dataset latihan bersama berupa CSV e-commerce. Saat memilih dataset Kaggle, baca deskripsinya: arti kolom, periode data, satuan nilai, serta lisensi. Jangan menganalisis kolom jika maknanya belum dipahami.

## Aktivitas

Temukan lima baris pertama, jumlah baris/kolom, kolom numerik, lalu tampilkan produk dalam satu kategori yang dipilih.

## Rangkuman

NumPy efisien untuk angka; Pandas memudahkan bekerja dengan tabel. Analisis dimulai dari memahami bentuk dan kualitas data.
