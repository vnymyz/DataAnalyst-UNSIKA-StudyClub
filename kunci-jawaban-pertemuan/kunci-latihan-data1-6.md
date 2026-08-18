# Kunci Latihan Data 1–6

> Jawaban dapat memiliki variasi. Pahami logikanya, jangan hanya menyamakan teks kode.

## Latihan 1

```python
nama, jurusan, semester = "Bima", "Sistem Informasi", 3
print(f"Saya {nama}, mahasiswa {jurusan} semester {semester}.")
kategori = ["Elektronik", "Fashion", "Makanan", "Buku", "Olahraga"]
print(kategori[2])
produk = {"nama": "Mouse", "harga": 150000, "stok": 10}
print(produk["harga"])
produk["stok"] -= 2
```

List untuk kumpulan data berurutan; dictionary untuk data yang diberi nama dengan key.

## Latihan 2

```python
nilai = 80
print("Lulus" if nilai >= 75 else "Perlu belajar lagi")

for angka in range(1, 11):
    if angka % 2 == 0:
        print(angka)

hitung = 5
while hitung >= 1:
    print(hitung)
    hitung -= 1

def hitung_total(harga, jumlah):
    return harga * jumlah

def kategori_penjualan(nilai):
    if nilai < 100000:
        return "Rendah"
    if nilai < 500000:
        return "Sedang"
    return "Tinggi"
```

## Latihan 3

```python
import numpy as np
import pandas as pd

angka = np.array([10, 20, 30, 40])
print(angka * 2)
display(df.head())
df.info()
df[["nama_produk", "kategori", "harga"]]
df[df["harga"] > 100000]
```

Contoh pertanyaan: kategori mana yang paling besar penjualannya? Produk apa yang paling mahal?

## Latihan 4

```python
df.isna().sum()
print(df.duplicated().sum())
df = df.drop_duplicates()
df["tanggal"] = pd.to_datetime(df["tanggal"], errors="coerce")

ringkasan = (df.groupby("kategori", as_index=False)["nilai_penjualan"]
               .sum()
               .sort_values("nilai_penjualan", ascending=False))
```

Insight harus mengikuti hasil data, misalnya: “Kategori X memiliki total penjualan tertinggi.” Pertanyaan lanjutannya: “Apakah kategori X juga memiliki margin tertinggi?”

## Latihan 5

```python
import matplotlib.pyplot as plt
import seaborn as sns

sns.barplot(data=ringkasan, x="nilai_penjualan", y="kategori")
plt.title("Total Penjualan per Kategori")
plt.show()

df_bulan = df.groupby("bulan", as_index=False)["nilai_penjualan"].sum()
plt.plot(df_bulan["bulan"], df_bulan["nilai_penjualan"])
plt.title("Tren Penjualan Bulanan")
plt.show()
```

Pie chart sering kurang tepat untuk banyak kategori. Contoh KPI: rata-rata nilai pesanan = total penjualan / jumlah pesanan.

## Latihan 6

```python
import streamlit as st
import pandas as pd

st.title("Dashboard Penjualan")
df = pd.read_csv("data/data.csv")
st.dataframe(df.head())
st.metric("Total Penjualan", f"Rp {df['nilai_penjualan'].sum():,.0f}")

pilihan = st.multiselect("Kategori", df["kategori"].dropna().unique())
if pilihan:
    df = df[df["kategori"].isin(pilihan)]
```

README minimal berisi tujuan, anggota, sumber data, instruksi menjalankan, dan insight.
