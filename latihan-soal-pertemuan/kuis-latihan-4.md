# Kuis & Latihan 4 — Data Cleaning dan EDA

## Identitas Peserta

- **Nama lengkap:** ........................................................
- **Jurusan:** ........................................................
- **Kelas:** ........................................................
- **Tanggal:** ........................................................

## Bagian A — Pemahaman Konsep

1. Apa arti missing value?

   **Jawaban:** ........................................................................

2. Apa risiko data duplikat terhadap analisis?

   **Jawaban:** ........................................................................

3. Apa fungsi `groupby()`?

   **Jawaban:** ........................................................................

4. Mengapa keputusan data cleaning perlu dicatat?

   **Jawaban:** ........................................................................

5. Sebutkan satu contoh pertanyaan EDA.

   **Jawaban:** ........................................................................

## Bagian B — Praktik Coding

6. Hitung missing value pada setiap kolom di `df`.

   ```python
   # Tulis jawaban di sini
   ```

7. Hitung jumlah duplikat, lalu hapus baris duplikat.

   ```python
   # Tulis jawaban di sini
   ```

8. Ubah kolom `tanggal` menjadi datetime secara aman.

   ```python
   # Tulis jawaban di sini
   ```

9. Buat total `nilai_penjualan` per `kategori` dan urutkan dari yang terbesar.

   ```python
   # Tulis jawaban di sini
   ```

10. Tulis satu insight dan satu pertanyaan lanjutan dari hasil agregasi nomor 9.

   **Jawaban:** ........................................................................

## Target Hasil untuk Bagian Coding

**Nomor 6 — Contoh output yang diharapkan:**

```text
id_pesanan          0
kategori            0
harga               3
nilai_penjualan     0
```

**Nomor 7 — Contoh output yang diharapkan sebelum cleaning:**

```text
Jumlah data duplikat: 2
```

Setelah cleaning, jumlah duplikat:

```text
0
```

**Nomor 8 — Contoh output yang diharapkan:**

```text
tanggal    datetime64[ns]
```

**Nomor 9 — Contoh output yang diharapkan:**

```text
     kategori  nilai_penjualan
0  Elektronik          1250000
1     Fashion           850000
2        Buku           320000
```

**Nomor 10 — Contoh jawaban yang diharapkan:**

```text
Insight: Elektronik memiliki total penjualan tertinggi.
Pertanyaan lanjutan: Apakah Elektronik juga memiliki jumlah transaksi tertinggi?
```
