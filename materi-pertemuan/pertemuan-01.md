# Pertemuan 1 — Kenalan dengan Data Analyst & Python Dasar

**Durasi:** 19.30–21.00 WIB  
**Tools:** Google Colab, Python  
**Output:** Peserta dapat menjalankan notebook, memakai variabel dan struktur data sederhana.

## Tujuan belajar

- Memahami kerja seorang Data Analyst dari data mentah sampai insight.
- Menggunakan Google Colab dan menulis kode Python dasar.
- Menggunakan `print()`, variabel, tipe data, operator, list, dan dictionary.

## Rundown

| Waktu | Aktivitas |
|---|---|
| 19.30–19.40 | Pembukaan, ice breaking: “data apa yang paling sering kalian lihat hari ini?” |
| 19.40–19.55 | Data Analyst, contoh dashboard, alur kerja data |
| 19.55–20.10 | Google Colab: cell, run, komentar, error sederhana |
| 20.10–20.35 | Variabel, tipe data, `print`, f-string, operator |
| 20.35–20.55 | List, dictionary, indexing; latihan bersama |
| 20.55–21.00 | Rangkuman dan kuis 1 |

## Materi inti

Alur Data Analyst: **pertanyaan → kumpulkan data → bersihkan → analisis → visualisasi → rekomendasi**. Kode adalah alat untuk menjawab pertanyaan, bukan tujuan akhirnya.

```python
nama = "Alya"
jumlah_pesanan = 25
rata_rata_nilai = 87.5
aktif = True

print(f"{nama} memiliki {jumlah_pesanan} pesanan.")
```

Tipe data umum: `str` (teks), `int` (bilangan bulat), `float` (desimal), `bool` (benar/salah). Cek dengan `type(nama)`.

```python
kategori = ["Elektronik", "Fashion", "Makanan"]
produk = {"nama": "Headset", "harga": 250000, "stok": 12}

print(kategori[0])
print(produk["harga"])
```

## Catatan AI

Contoh prompt yang baik: “Jelaskan perbedaan list dan dictionary dengan contoh data penjualan sederhana. Jangan berikan jawaban latihan saya.” Verifikasi selalu jawaban AI dengan menjalankan kode.

## Aktivitas

Simpan tiga data produk dalam dictionary, lalu tampilkan nama produk dan harga memakai f-string. Kerjakan di Colab, kemudian minta teman mengecek apakah outputnya sudah masuk akal.

## Rangkuman

Python menyimpan data dalam variabel. List dipakai untuk urutan data; dictionary dipakai untuk pasangan `key: value`. Minggu depan kita membuat program yang bisa mengambil keputusan dan mengulang pekerjaan.
