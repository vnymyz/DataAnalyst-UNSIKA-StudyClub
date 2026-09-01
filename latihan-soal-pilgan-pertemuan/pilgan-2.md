# Kuis Pilihan Ganda — Pertemuan 2: Logika, Perulangan, dan Function

> Dokumen ini untuk kebutuhan internal (disiapkan moderator ke Slido untuk ditampilkan live saat kelas, lihat `cara-import-slido.md`). Jawaban benar ditandai ✅ — jangan dibagikan mentah ke peserta sebelum kuis berlangsung.

## Soal 1
Diberi kode berikut, berapa nilai `diskon` kalau `total_belanja = 150000`?

```python
total_belanja = 150000
if total_belanja >= 200000:
    diskon = 0.15
elif total_belanja >= 100000:
    diskon = 0.10
else:
    diskon = 0
```

A. 0.15
B. 0.10 ✅
C. 0
D. Error, karena tidak ada `if` yang cocok

## Soal 2
Kapan sebaiknya memakai `while` dibanding `for`?

A. Saat jumlah perulangan sudah pasti diketahui dari awal
B. Saat perulangan perlu berjalan selama sebuah kondisi masih benar, jumlahnya belum pasti ✅
C. `while` selalu lebih cepat dari `for` sehingga dipakai terus
D. `for` hanya bisa dipakai untuk angka, `while` untuk teks

## Soal 3
Apa fungsi `enumerate()` pada kode berikut?

```python
penjualan = [120, 80, 150]
for nomor, nilai in enumerate(penjualan, start=1):
    print(f"Hari {nomor}: {nilai}")
```

A. Mengurutkan isi list dari kecil ke besar
B. Menghapus duplikat dalam list
C. Memberi nomor urut pada tiap item saat looping ✅
D. Mengubah list menjadi dictionary

## Soal 4
Apa perbedaan utama `print()` dan `return` di dalam sebuah function?

A. Keduanya persis sama, hanya beda nama
B. `print()` cuma menampilkan nilai ke layar, `return` mengirim nilai supaya bisa dipakai lagi di luar function ✅
C. `return` hanya bisa dipakai sekali, `print()` bisa berkali-kali
D. `print()` hanya untuk angka, `return` untuk teks

## Soal 5
Diberi function berikut, apa hasil dari `hitung_diskon(200000)` (tanpa mengisi parameter `persen`)?

```python
def hitung_diskon(total, persen=0.10):
    return total * persen
```

A. Error, karena `persen` wajib diisi
B. `0`, karena `persen` dianggap kosong
C. `20000.0`, karena `persen` otomatis pakai nilai default 0.10 ✅
D. `200000`, karena `persen` diabaikan

## Soal 6
Apa yang dihasilkan oleh `range(1, 5)`?

A. Angka 1, 2, 3, 4, 5
B. Angka 1, 2, 3, 4 ✅
C. Angka 0, 1, 2, 3, 4
D. Angka 5, 4, 3, 2, 1

## Soal 7
Dalam pengantar OOP, `DataFrame` di Pandas nantinya dipahami sebagai...

A. Sebuah function bawaan Python
B. Sebuah objek yang punya data serta method (fungsi bawaan) miliknya sendiri ✅
C. Nama lain dari list biasa
D. Sebuah file CSV yang tidak bisa diubah

## Soal 8
Manakah pernyataan yang benar tentang `elif`?

A. `elif` hanya boleh dipakai maksimal satu kali dalam satu blok kondisi
B. `elif` dicek hanya kalau kondisi `if` sebelumnya bernilai `False` ✅
C. `elif` selalu dijalankan bersamaan dengan `if`
D. `elif` wajib ada di setiap blok `if`

## Soal 9
Apa output dari kode berikut?

```python
for i in range(3):
    print(i * 2)
```

A. `0 2 4` (masing-masing baris berbeda) ✅
B. `1 2 3`
C. `0 1 2`
D. Error, karena `i` belum didefinisikan

## Soal 10
Function `kategori_penjualan(nilai)` dibuat untuk mengembalikan "Rendah", "Sedang", atau "Tinggi". Bagian mana dari function yang membuat hasilnya bisa dipakai lagi di variabel lain?

A. Nama function-nya
B. Parameter `nilai`
C. Kata kunci `return` di akhir function ✅
D. Indentasi kode di dalam function
