# Kuis Pilihan Ganda — Pertemuan 3: NumPy, Pandas, dan CSV

> Dokumen ini untuk kebutuhan internal (disiapkan moderator ke Slido untuk ditampilkan live saat kelas, lihat `cara-import-slido.md`). Jawaban benar ditandai ✅ — jangan dibagikan mentah ke peserta sebelum kuis berlangsung.

## Soal 1
Diberi kode berikut, apa hasilnya?

```python
angka = np.array([10, 20, 30])
print(angka * 2)
```

A. `[10, 20, 30, 10, 20, 30]`
B. `[20, 40, 60]` ✅
C. Error, karena array tidak bisa dikalikan
D. `60`

## Soal 2
Analogi paling tepat untuk DataFrame di Pandas adalah...

A. Sebuah kalimat panjang berisi banyak kata
B. Sebuah tabel, di mana kolom mewakili variabel dan baris mewakili observasi ✅
C. Sebuah angka tunggal hasil perhitungan
D. Sebuah gambar yang menampilkan grafik

## Soal 3
Fungsi apa yang dipakai untuk membaca file CSV ke dalam Pandas?

A. `pd.open_csv("nama_file.csv")`
B. `pd.read_csv("nama_file.csv")` ✅
C. `pd.load_csv("nama_file.csv")`
D. `pd.import_csv("nama_file.csv")`

## Soal 4
Apa fungsi `df.head()`?

A. Menampilkan seluruh baris dalam DataFrame
B. Menampilkan lima baris pertama dari DataFrame secara default ✅
C. Menghapus baris pertama dari DataFrame
D. Mengurutkan data dari baris terakhir

## Soal 5
Apa yang ditampilkan oleh `df.info()`?

A. Nilai rata-rata tiap kolom numerik
B. Struktur DataFrame: nama kolom, tipe data, dan jumlah non-null ✅
C. Lima baris pertama data
D. Grafik distribusi tiap kolom

## Soal 6
Apa yang ditampilkan oleh `df.describe()`?

A. Struktur kolom dan tipe datanya
B. Ringkasan statistik seperti mean, minimum, dan maksimum untuk kolom numerik ✅
C. Daftar nama semua kolom saja
D. Jumlah baris yang mengandung nilai kosong

## Soal 7
Apa perbedaan `df["kolom"]` dan `df[["kolom_a", "kolom_b"]]`?

A. Keduanya menghasilkan hal yang sama persis
B. `df["kolom"]` mengambil satu kolom, `df[["kolom_a", "kolom_b"]]` mengambil beberapa kolom sekaligus ✅
C. `df["kolom"]` hanya bisa dipakai untuk angka
D. `df[["kolom_a", "kolom_b"]]` selalu error kalau kolomnya lebih dari satu

## Soal 8
Kode berikut dipakai untuk apa?

```python
produk_mahal = df[df["harga"] > 100000]
```

A. Mengurutkan produk dari harga termurah
B. Menyaring baris yang nilai kolom `harga`-nya lebih dari 100000 ✅
C. Menghitung rata-rata harga semua produk
D. Menghapus kolom `harga` dari DataFrame

## Soal 9
Sebelum memakai dataset dari Kaggle, hal apa yang paling penting dicek terlebih dahulu?

A. Jumlah like/upvote dataset itu
B. Deskripsi kolom, periode data, satuan nilai, dan lisensinya ✅
C. Warna tampilan halaman Kaggle-nya
D. Apakah dataset itu dibuat hari ini atau tidak

## Soal 10
NumPy paling cocok dipakai untuk kebutuhan seperti apa?

A. Menulis teks panjang dan laporan naratif
B. Komputasi numerik berbasis array secara efisien ✅
C. Membuat tampilan dashboard interaktif
D. Menghubungkan ke database secara langsung
