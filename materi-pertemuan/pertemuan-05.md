# Pertemuan 5 — Visualisasi, KPI, dan Data Storytelling

**Durasi:** 19.30–21.00 WIB  
**Tools:** Google Colab, Matplotlib, Seaborn, Plotly  
**Output:** Peserta dapat membuat grafik yang tepat dan menulis insight berbasis data.

## Tujuan belajar

- Memilih grafik sesuai pertanyaan dan tipe data.
- Membuat bar chart, line chart, histogram, dan scatter plot.
- Menggunakan Seaborn dan Plotly dasar.
- Mengubah temuan menjadi insight serta rekomendasi.

## Rundown

| Waktu | Aktivitas |
|---|---|
| 19.30–19.40 | Review EDA: angka belum otomatis menjadi insight |
| 19.40–20.05 | Prinsip visualisasi: audience, judul, warna, skala |
| 20.05–20.25 | Matplotlib dan Seaborn |
| 20.25–20.40 | Plotly untuk grafik interaktif |
| 20.40–20.52 | KPI dan data storytelling |
| 20.52–20.57 | Instruksi setup lokal sebelum sesi 6 |
| 20.57–21.00 | Rangkuman dan kuis 5 |

## Memilih grafik

| Pertanyaan | Grafik yang umum dipakai |
|---|---|
| Bandingkan kategori | Bar chart |
| Lihat perubahan waktu | Line chart |
| Lihat sebaran angka | Histogram atau boxplot |
| Lihat hubungan dua angka | Scatter plot |

## Materi inti

```python
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px

sns.barplot(data=ringkasan, x="total_penjualan", y="kategori")
plt.title("Total Penjualan per Kategori")
plt.xlabel("Total Penjualan (Rp)")
plt.ylabel("Kategori")
plt.show()

fig = px.line(df_bulanan, x="bulan", y="total_penjualan",
              title="Tren Penjualan Bulanan")
fig.show()
```

KPI (Key Performance Indicator) adalah ukuran yang membantu mengambil keputusan, misalnya total revenue, jumlah transaksi, rata-rata nilai pesanan, atau pertumbuhan bulanan. Pilih KPI yang menjawab tujuan analisis—bukan yang sekadar mudah dihitung.

## Formula insight

**Temuan data + makna bisnis + rekomendasi.**  
Contoh: “Kategori A menyumbang 42% penjualan tetapi transaksinya hanya 18%. Tim dapat meninjau strategi promosi kategori lain agar ketergantungan pada satu kategori berkurang.”

## Aktivitas

Buat satu bar chart dan satu line chart dari data e-commerce. Perbaiki grafik teman dengan checklist: judul jelas, label sumbu ada, satuan terbaca, warna tidak berlebihan, dan kesimpulan tidak melebihi bukti.

## Persiapan sesi 6

Ikuti `panduan-setup.md` sebelum sesi berikutnya: Python, VS Code, dan package Streamlit harus siap agar waktu kelas digunakan untuk praktik dashboard.
