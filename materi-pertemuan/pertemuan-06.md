# Pertemuan 6 — Dashboard Streamlit dan GitHub Dasar

**Durasi:** 19.30–21.00 WIB  
**Tools:** VS Code, Python, Streamlit, Pandas, Plotly, GitHub  
**Output:** Peserta dapat menjalankan dashboard sederhana secara lokal dan mengunggah proyek ke GitHub.

## Tujuan belajar

- Memahami struktur aplikasi dashboard Streamlit.
- Menampilkan data, metrik, filter, dan grafik di aplikasi.
- Menjalankan aplikasi secara lokal.
- Membuat repository GitHub, commit, push, dan README dasar.

## Rundown

| Waktu | Aktivitas |
|---|---|
| 19.30–19.40 | Cek setup dan struktur folder proyek |
| 19.40–20.05 | Streamlit: judul, data, metrik, tabel |
| 20.05–20.30 | Filter dan grafik dashboard |
| 20.30–20.42 | Menjalankan serta debugging aplikasi |
| 20.42–20.55 | GitHub: repository, commit, push, README |
| 20.55–21.00 | Arahan proyek akhir dan penutup |

## Struktur minimal proyek

```text
dashboard-kelompok/
├── app.py
├── data/
│   └── data.csv
├── requirements.txt
└── README.md
```

## Contoh `app.py`

```python
import streamlit as st
import pandas as pd
import plotly.express as px

st.set_page_config(page_title="Dashboard Penjualan", layout="wide")
st.title("Dashboard Penjualan E-commerce")

df = pd.read_csv("data/data.csv")
kategori = st.multiselect("Pilih kategori", df["kategori"].dropna().unique())

data_tampil = df.copy()
if kategori:
    data_tampil = data_tampil[data_tampil["kategori"].isin(kategori)]

col1, col2 = st.columns(2)
col1.metric("Total Penjualan", f"Rp {data_tampil['nilai_penjualan'].sum():,.0f}")
col2.metric("Jumlah Baris", len(data_tampil))

ringkasan = data_tampil.groupby("kategori", as_index=False)["nilai_penjualan"].sum()
fig = px.bar(ringkasan, x="kategori", y="nilai_penjualan")
st.plotly_chart(fig, use_container_width=True)
```

Jalankan aplikasi dari terminal pada folder proyek:

```bash
streamlit run app.py
```

## GitHub dasar

```bash
git init
git add .
git commit -m "Buat dashboard penjualan awal"
git branch -M main
git remote add origin URL_REPOSITORY_KAMU
git push -u origin main
```

Jangan mengunggah password, API key, atau file data yang bersifat pribadi. Tuliskan tujuan proyek, sumber data, cara instalasi, dan insight pada `README.md`.

## Arahan proyek akhir

Gunakan `panduan-proyek-akhir.md` sebagai checklist. Pilih topik yang disetujui kelompok, bagi peran secara jelas, dan pastikan semua anggota memahami hasil proyek—AI boleh membantu, tetapi bukan pengganti pemahaman.
