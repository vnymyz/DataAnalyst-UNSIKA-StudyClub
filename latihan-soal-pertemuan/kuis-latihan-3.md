# Kuis & Latihan 3 — NumPy, Pandas, dan CSV

## Identitas Peserta

- **Nama lengkap:** ........................................................
- **Jurusan:** ........................................................
- **Kelas:** ........................................................
- **Tanggal:** ........................................................

Gunakan DataFrame `df` dari CSV latihan untuk bagian praktik.

## Bagian A — Pemahaman Konsep

1. Apa kegunaan NumPy?

   **Jawaban:** ........................................................................

2. Apa itu DataFrame?

   **Jawaban:** ........................................................................

3. Apa fungsi `df.head()` dan `df.info()`?

   **Jawaban:** ........................................................................

4. Mengapa tipe data kolom perlu diperiksa?

   **Jawaban:** ........................................................................

5. Apa hasil dari NumPy array `np.array([1, 2]) * 2`?

   **Jawaban:** ........................................................................

## Bagian B — Praktik Coding

6. Import Pandas sebagai `pd` dan baca file `data.csv`.

   ```python
   # Tulis jawaban di sini
   ```

7. Buat NumPy array `[10, 20, 30, 40]`, lalu kalikan semua elemen dengan 2.

   ```python
   # Tulis jawaban di sini
   ```

8. Tampilkan lima baris pertama dan informasi struktur `df`.

   ```python
   # Tulis jawaban di sini
   ```

9. Pilih kolom `nama_produk`, `kategori`, dan `harga`; lalu filter harga di atas 100000.

   ```python
   # Tulis jawaban di sini
   ```

10. Tuliskan dua pertanyaan analisis yang ingin kamu jawab dari dataset e-commerce.

   **Jawaban:** ........................................................................

## Target Hasil untuk Bagian Coding

**Nomor 6 — Contoh output yang diharapkan** (nilai mengikuti isi CSV):

```text
   id_pesanan nama_produk    kategori   harga
0           1       Mouse  Elektronik  150000
1           2       Buku       Buku    30000
```

**Nomor 7 — Output yang diharapkan:**

```text
[20 40 60 80]
```

**Nomor 8 — Contoh output yang diharapkan:**

```text
<class 'pandas.core.frame.DataFrame'>
RangeIndex: ... entries
Data columns (total ... columns):
 #   Column        Non-Null Count  Dtype
 0   nama_produk   ... non-null    object
 1   harga         ... non-null    int64
```

**Nomor 9 — Contoh hasil filter yang diharapkan:**

```text
  nama_produk    kategori   harga
0       Mouse  Elektronik  150000
```

**Nomor 10 — Contoh jawaban yang diharapkan:**

```text
Kategori mana yang memiliki total penjualan terbesar?
Produk apa yang memiliki harga tertinggi?
```
