# Kuis Pilihan Ganda — Pertemuan 4: Data Cleaning dan Exploratory Data Analysis

> Dokumen ini untuk kebutuhan internal (disiapkan moderator ke Slido untuk ditampilkan live saat kelas, lihat `cara-import-slido.md`). Jawaban benar ditandai ✅ — jangan dibagikan mentah ke peserta sebelum kuis berlangsung.

## Soal 1
Apa fungsi `df.isna().sum()`?

A. Menghapus semua baris yang kosong
B. Menghitung jumlah nilai kosong (missing value) di tiap kolom ✅
C. Mengganti nilai kosong dengan angka 0
D. Menjumlahkan seluruh angka di DataFrame

## Soal 2
Apa fungsi `df.drop_duplicates()`?

A. Menghapus kolom yang tidak dipakai
B. Menghapus baris yang datanya duplikat/kembar ✅
C. Menghapus baris yang mengandung nilai kosong
D. Mengurutkan data dari yang paling sering muncul

## Soal 3
Pada kode berikut, apa fungsi `errors="coerce"`?

```python
df["tanggal"] = pd.to_datetime(df["tanggal"], errors="coerce")
```

A. Membuat program berhenti total kalau ada tanggal yang formatnya salah
B. Mengubah nilai yang gagal dikonversi menjadi `NaT`/kosong, alih-alih menyebabkan error ✅
C. Menghapus otomatis kolom `tanggal` dari DataFrame
D. Mengubah semua tanggal jadi hari ini

## Soal 4
Apakah missing value SELALU harus dihapus dari data?

A. Ya, semua missing value wajib dihapus tanpa terkecuali
B. Tidak — bisa juga diisi nilai tertentu, atau ditandai sebagai kategori "Tidak diketahui", tergantung konteks ✅
C. Tidak, missing value harus dibiarkan apa adanya dan tidak boleh disentuh
D. Missing value otomatis hilang sendiri saat file CSV dibuka

## Soal 5
Diberi kode berikut, apa yang dilakukan `.agg(...)` di dalamnya?

```python
ringkasan = (
    df.groupby("kategori", as_index=False)
      .agg(total_penjualan=("nilai_penjualan", "sum"),
           jumlah_transaksi=("id_pesanan", "nunique"))
)
```

A. Mengurutkan data berdasarkan kategori
B. Menghitung agregasi (jumlah, hitung unik, dst) untuk tiap grup hasil `groupby` ✅
C. Menghapus kolom `kategori` dari hasil akhir
D. Menggabungkan dua DataFrame menjadi satu

## Soal 6
`groupby("kategori")` pada Pandas paling mirip dengan konsep apa?

A. Mengurutkan data dari A ke Z
B. Mengelompokkan baris berdasarkan nilai yang sama pada kolom tertentu, sebelum dihitung ringkasannya ✅
C. Menghapus baris yang kategorinya sama
D. Menggabungkan seluruh kolom jadi satu teks panjang

## Soal 7
Manakah yang merupakan contoh pertanyaan EDA yang baik untuk data penjualan?

A. "Berapa banyak warna yang dipakai di grafik?"
B. "Kategori mana yang menyumbang penjualan terbesar?" ✅
C. "Siapa yang membuat file CSV ini?"
D. "Berapa ukuran file CSV dalam megabyte?"

## Soal 8
Kenapa penting mencatat keputusan cleaning data (misalnya kenapa baris tertentu dihapus)?

A. Supaya file jadi lebih besar ukurannya
B. Supaya analisis dapat ditelusuri dan dipertanggungjawabkan ke orang lain ✅
C. Karena itu wajib menurut aturan Python
D. Tidak penting, cleaning tidak perlu dicatat sama sekali

## Soal 9
Apa perbedaan mendasar antara "temuan" dan "insight" dalam konteks EDA?

A. Keduanya adalah istilah yang sama persis
B. Temuan adalah hasil observasi data mentah; insight memberi makna dan arah tindakan dari temuan itu ✅
C. Insight hanya berupa angka, temuan hanya berupa grafik
D. Temuan dibuat manusia, insight dibuat otomatis oleh komputer

## Soal 10
Kolom `harga` dalam data ternyata terbaca sebagai teks (`str`), bukan angka. Fungsi apa yang tepat untuk memperbaikinya?

A. `df["harga"].drop_duplicates()`
B. `pd.to_numeric(df["harga"], errors="coerce")` ✅
C. `df["harga"].isna().sum()`
D. `df.groupby("harga")`
