# Pertemuan 4 — Data Cleaning dan Exploratory Data Analysis

**Durasi:** 19.30–21.00 WIB
**Tools:** Google Colab, Pandas
**Output:** Peserta dapat membersihkan data (duplikat, data kosong, tipe data, outlier) dan menjawab pertanyaan analisis dengan `groupby`, `agg`, dan `pivot_table`.

## Cara Menjalankan Kode di Folder Ini

`pertemuan-4.ipynb` di folder ini adalah **hasil akhir** hands-on sesi ini, dan `data.csv` adalah dataset yang sama persis dengan yang dipakai pertemuan 3 (belum dibereskan). Buka lewat [colab.research.google.com](https://colab.research.google.com/) (`File > Upload notebook`, lalu upload juga `data.csv` ke Colab lewat panel Files di sebelah kiri) atau lewat Jupyter Notebook lokal kalau sudah terpasang — pastikan `data.csv` ada di folder yang sama dengan notebook-nya. Kalau ikut kelas dari awal, jangan buka file ini dulu — ikuti bagian Hands-on di bawah dan buat notebook sendiri; file ini jadi jaring pengaman kalau tertinggal.

## Tujuan Belajar

- Menghapus baris duplikat dan mengisi data kosong dengan keputusan yang masuk akal, bukan asal hapus.
- Memperbaiki tipe data (`to_datetime`, `to_numeric`) dengan `errors="coerce"`.
- Mendeteksi outlier memakai aturan IQR, lalu memutuskan mana yang dipertahankan dan mana yang dibuang.
- Mencatat setiap keputusan cleaning supaya bisa dipertanggungjawabkan.
- Meringkas data dengan `groupby()`, `agg()`, `sort_values()`, dan `pivot_table()`.
- Menyusun pertanyaan EDA, mencari buktinya lewat tabel, lalu menuliskan insight — dan mengenali insight yang ternyata cuma digerakkan oleh satu baris data.

## Rundown

| Waktu | Aktivitas |
|---|---|
| 19.30–19.40 | Review hasil inspeksi data pertemuan 3 |
| 19.40–20.05 | Missing value, duplikat, dan tipe data |
| 20.05–20.25 | Statistik deskriptif dan outlier dasar |
| 20.25–20.45 | `groupby`, `agg`, sort, dan pivot sederhana |
| 20.45–20.55 | EDA: pertanyaan → bukti → insight |
| 20.55–21.00 | Rangkuman dan kuis 4 |

## Teori

### Dari "Melihat" ke "Membereskan"

Pertemuan 3 berhenti di tahap **Data Understanding** — kita cuma **melihat** dan **mencatat** kondisi `data.csv`, belum membetulkan apa pun. Ada 4 temuan yang ditinggalkan buat sesi ini:

| Temuan pertemuan 3 | Jumlah | Dibereskan gimana di sini |
|---|---|---|
| `harga` kosong (`NaN`) | 6 baris | Diisi (`fillna`) berdasarkan median per produk |
| Baris duplikat persis | 3 baris | Dihapus (`drop_duplicates`) |
| Kolom `tanggal` bertipe `object` (teks) | semua 133 baris | Dikonversi jadi tipe tanggal beneran (`to_datetime`) |
| Harga yang mencurigakan (outlier) | 2 baris kandidat | Diselidiki, baru diputuskan dibuang atau dipertahankan |

Data Understanding = melihat. **Data Cleaning** (hari ini) = membereskan apa yang sudah dilihat.

### Cleaning Itu Keputusan, Bukan Tombol Ajaib

Tidak ada satu fungsi Pandas yang otomatis tahu "baris mana yang harus dihapus" atau "nilai apa yang paling pas buat mengisi yang kosong". Tiap langkah cleaning adalah **keputusan** yang diambil orangnya (kamu), berdasarkan konteks data itu sendiri.

- Baris duplikat persis → hampir selalu aman dihapus, karena benar-benar kembar identik.
- Data kosong → belum tentu dihapus. Kadang lebih baik diisi, kadang lebih baik ditandai "Tidak diketahui".
- Outlier → belum tentu salah. Kadang itu memang data asli yang ekstrem (dijelaskan lebih lanjut di sub-bab Outlier).

Karena ini keputusan, bukan hasil otomatis, **setiap keputusan cleaning wajib dicatat**: apa yang diubah, kenapa, dan berapa baris yang terdampak. Kalau nanti ada yang bertanya "kenapa datanya cuma 129 baris, bukan 133?", jawabannya harus bisa ditelusuri, bukan "pokoknya gitu".

> Slide visual: dua kotak — kiri "Data Understanding: Lihat & Catat" (pertemuan 3), kanan "Data Cleaning: Putuskan & Bereskan" (hari ini), dengan panah dari kiri ke kanan bertuliskan "keputusan, bukan tombol ajaib".

### Menghapus Baris Duplikat: `drop_duplicates()`

```python
print(df.duplicated().sum())
df = df.drop_duplicates()
```

- `.duplicated().sum()` — sudah dipelajari pertemuan 3, cuma **melaporkan** jumlah duplikat.
- `.drop_duplicates()` — method baru hari ini, **benar-benar menghapus** baris duplikat (menyisakan kemunculan pertama, membuang sisanya).
- Kenapa duplikat berbahaya kalau dibiarkan? Karena nanti dijumlahkan (`groupby().sum()`) — satu transaksi yang sama tercatat dua kali bikin total penjualan jadi lebih besar dari kenyataan. Duplikat yang tidak dibereskan bisa membuat kesimpulan bisnis keliru.
- Hasilnya harus di-**assign ulang** ke `df` (`df = df.drop_duplicates()`) — kalau tidak, DataFrame aslinya tidak berubah, cuma hasil sementara yang ditampilkan lalu dibuang.

### Missing Value: Tiga Pilihan Tindakan

Data kosong (`NaN`) tidak selalu diperlakukan sama. Ada tiga pilihan tindakan, dan yang dipilih tergantung konteks:

| Tindakan | Kapan cocok dipakai |
|---|---|
| **Hapus baris** (`dropna()`) | Kalau baris yang kosong jumlahnya sedikit dan tidak penting dipertahankan |
| **Isi nilai** (`fillna()`) | Kalau ada cara masuk akal menebak nilainya (median, modus, nilai dari baris mirip) |
| **Tandai kategori baru** (misalnya `"Tidak diketahui"`) | Kalau kolomnya kategori (teks), dan "kosong" itu sendiri informasi yang berguna dipertahankan |

Menghapus baris **bukan** satu-satunya jawaban yang benar — kadang malah buang-buang data yang masih bisa diselamatkan.

### Mengisi dengan `fillna()` + Median per Grup

Di `data.csv`, 6 baris `harga`-nya kosong, tersebar di 4 nama produk berbeda (Speaker Bluetooth, Keyboard, Notebook Polos, Buku Resep Masakan). Untungnya, tiap produk itu juga punya baris lain yang harganya **terisi** — jadi harga yang kosong bisa ditebak dari harga produk yang sama di baris lain.

```python
df["harga"] = df["harga"].fillna(df.groupby("nama_produk")["harga"].transform("median"))
```

- `df.groupby("nama_produk")["harga"].transform("median")` — untuk **tiap baris**, menghitung median harga dari semua baris yang `nama_produk`-nya sama, lalu hasilnya "ditempelkan kembali" sepanjang DataFrame asli (beda dengan `.groupby().median()` biasa yang meringkas jadi tabel pendek).
- `.fillna(...)` — mengisi nilai kosong dengan hasil `transform` tadi; baris yang `harga`-nya sudah terisi tidak disentuh sama sekali.
- Kenapa **median**, bukan **mean** (rata-rata)? Median lebih tahan terhadap outlier. Kalau salah satu baris "Speaker Bluetooth" kebetulan harganya ekstrem, `mean` bakal ikut terseret jauh, sedangkan `median` tetap mewakili harga "yang wajar" untuk produk itu.

### Memperbaiki Tipe Data: `to_datetime` dan `to_numeric`

Kolom `tanggal` di `data.csv` bertipe `object` (teks) — sudah dicatat pertemuan 3, belum dibetulkan. Kalau tetap teks, Pandas tidak bisa menghitung selisih hari, mengelompokkan per bulan, atau mengurutkan tanggal dengan benar.

```python
df["tanggal"] = pd.to_datetime(df["tanggal"], errors="coerce")
```

- `pd.to_datetime(kolom)` — mengubah kolom teks jadi tipe tanggal (`datetime64[ns]`), supaya bisa diolah sebagai tanggal beneran (`.dt.month`, `.dt.to_period("M")`, dst).
- `errors="coerce"` — kalau ada nilai yang **gagal** dikonversi (formatnya rusak, bukan tanggal sama sekali), nilainya diubah jadi `NaT` (kosong versi tanggal) alih-alih program berhenti dengan error.
- Fungsi yang sama juga ada buat angka: `pd.to_numeric(kolom, errors="coerce")` — kalau kolom yang harusnya angka ternyata kebaca sebagai teks (misalnya `"150.000"` dengan titik ribuan, atau ada nilai `"-"` yang menyusup), `to_numeric` mengubahnya jadi angka, dan yang gagal dikonversi jadi `NaN`.

Tanpa `errors="coerce"`, satu saja nilai rusak di seluruh kolom bikin `pd.to_datetime()`/`pd.to_numeric()` langsung melempar error dan berhenti total — padahal biasanya kita cuma mau tahu **berapa banyak** yang rusak, bukan program berhenti mendadak.

### `NaN` vs `NaT`

Dua "kosong" yang kelihatannya mirip tapi beda konteks:

- **`NaN`** (*Not a Number*) — nilai kosong pada kolom **angka** (`float64`). Muncul dari `harga` yang kosong di CSV, atau dari `pd.to_numeric(errors="coerce")` yang gagal konversi.
- **`NaT`** (*Not a Time*) — nilai kosong pada kolom **tanggal** (`datetime64[ns]`). Muncul dari `pd.to_datetime(errors="coerce")` yang gagal konversi.

Keduanya sama-sama terdeteksi `True` oleh `.isna()` — Pandas memperlakukan keduanya sebagai "kosong", cuma beda tipe data yang menampungnya.

### Outlier: Mendeteksi dengan Aturan IQR

Pertemuan 3 sudah mencurigai outlier lewat `describe()` (lompatan besar dari `75%` ke `max`). Sekarang dipakai cara yang lebih sistematis: **aturan IQR** (*Interquartile Range*), berbasis Q1 dan Q3 yang sudah dipelajari pertemuan 3.

```python
q1 = df["harga"].quantile(0.25)
q3 = df["harga"].quantile(0.75)
iqr = q3 - q1
batas_bawah = q1 - 1.5 * iqr
batas_atas = q3 + 1.5 * iqr

outlier = df[(df["harga"] < batas_bawah) | (df["harga"] > batas_atas)]
```

- `iqr = q3 - q1` — rentang tempat "mayoritas data wajar" berada (50% data tengah).
- Batas bawah dan atas dihitung 1,5× IQR di luar Q1/Q3 — ini aturan yang umum dipakai (bukan angka ajaib, tapi konvensi statistik yang lazim). Nilai di luar batas ini dicurigai sebagai outlier.
- Hasilnya: sebuah DataFrame berisi baris-baris yang **dicurigai**, bukan otomatis dihapus — persis pola Data Understanding pertemuan 3, cuma sekarang lebih presisi (pakai rumus, bukan cuma "kelihatan aneh dari `describe()`").

> Slide visual: garis angka dengan kotak IQR di tengah (Q1–Q3), dan dua "pagar" di kiri-kanan menandai batas bawah/atas — titik di luar pagar ditandai sebagai kandidat outlier.

### Outlier Bukan Otomatis Salah

Aturan IQR di `data.csv` menangkap **2 baris kandidat**, tapi keduanya harus diselidiki dulu sebelum diputuskan — bukan langsung dibuang semua:

| id_pesanan | Produk | harga | modal | Keputusan |
|---|---|---|---|---|
| 1041 | Sepatu Sneakers | 8.900.000 | 245.000 | **Dibuang** |
| 1056 | Laptop Gaming (Bonus) | 10.500.000 | 9.600.000 | **Dipertahankan** |

Cara memutuskan: bandingkan `harga` dengan `modal` (biaya beli/produksi) di baris yang sama.

- Sepatu Sneakers id 1041: harga 8,9 juta, tapi modalnya cuma 245 ribu — selisihnya sampai 36 kali lipat. Bandingkan dengan baris Sepatu Sneakers lain (id 1075, harga 375 ribu dengan modal 196 ribu — masih wajar). Ini jelas **kesalahan input**, mungkin salah ketik nol tambahan, bukan harga sungguhan.
- Laptop Gaming id 1056: harga 10,5 juta, modalnya 9,6 juta — margin untungnya wajar untuk barang elektronik semahal itu. Harganya memang besar, tapi **konsisten** dengan modalnya. Ini bukan kesalahan, cuma produk yang memang mahal.

```python
df = df[df["id_pesanan"] != 1041]
```

- Cuma **satu** baris yang dibuang (id 1041), bukan dua-duanya — karena cuma satu yang terbukti salah setelah diselidiki.
- Ini alasan kenapa outlier tidak boleh dihapus otomatis lewat aturan IQR saja: aturan itu cuma **menunjuk kecurigaan**, keputusan akhirnya tetap lewat penyelidikan (di sini: cek konsistensi `harga` vs `modal`).

### Catatan Cleaning (Cleaning Log)

Setelah semua langkah di atas, keputusan cleaning-nya dirangkum jadi satu catatan singkat — ini yang membuat proses cleaning bisa dipertanggungjawabkan:

| # | Tindakan | Baris terdampak | Alasan |
|---|---|---|---|
| 1 | `drop_duplicates()` | 3 baris dihapus | Baris kembar identik (id 1029, 1071, 1118) |
| 2 | `to_datetime(errors="coerce")` pada `tanggal` | 133 baris dikonversi | Tipe data diperbaiki dari teks jadi tanggal, 0 gagal konversi |
| 3 | `fillna()` median per `nama_produk` pada `harga` | 6 baris diisi | Median produk yang sama masih representatif, lebih aman dari `mean` |
| 4 | Hapus baris id 1041 | 1 baris dihapus | Harga tidak konsisten dengan modal — indikasi kesalahan input |

Data akhir: **133 → 129 baris**, 0 data kosong, 0 duplikat, `tanggal` sudah bertipe tanggal.

### `groupby()`: Split → Apply → Combine

**`groupby()`** adalah cara Pandas mengelompokkan baris berdasarkan nilai kolom tertentu, lalu menghitung ringkasan per kelompok.

Analoginya: bayangkan struk belanja bulanan ditumpuk semua jadi satu, lalu dipilah per jenis barang (elektronik ditumpuk sendiri, makanan ditumpuk sendiri, dst) — baru dihitung totalnya per tumpukan. Itu persis tiga tahap `groupby()`:

1. **Split** — baris dipecah jadi kelompok berdasarkan nilai kolom (misalnya per `kategori`).
2. **Apply** — dalam tiap kelompok, dihitung sesuatu (jumlah, rata-rata, dst).
3. **Combine** — hasil tiap kelompok digabung jadi satu tabel ringkasan.

```python
df.groupby("kategori")["nilai_penjualan"].sum()
```

```text
kategori
Buku           3948000.0
Elektronik    44893000.0
Fashion       15775000.0
Makanan        3275000.0
Olahraga       7913000.0
```

- `df.groupby("kategori")` — mengelompokkan baris berdasarkan nilai kolom `kategori`.
- `["nilai_penjualan"].sum()` — dari tiap kelompok, jumlahkan kolom `nilai_penjualan`.
- Hasilnya sudah kelihatan Elektronik jauh di atas kategori lain — tapi ini baru satu angka. Sub-bab berikutnya bikin ringkasan yang lebih lengkap.

### `agg()`: Banyak Ringkasan Sekaligus

`.sum()` doang cuma ngasih satu ringkasan. `.agg()` (*aggregate*) bisa menghitung **beberapa** ringkasan sekaligus, dengan nama kolom hasil yang bisa ditentukan sendiri (disebut **named aggregation**).

```python
ringkasan = (
    df.groupby("kategori", as_index=False)
      .agg(total_penjualan=("nilai_penjualan", "sum"),
           jumlah_transaksi=("id_pesanan", "nunique"))
)
```

- `as_index=False` — supaya `kategori` tetap jadi kolom biasa di hasilnya, bukan dijadikan index tabel (index lebih ribet dibaca dan diurutkan ulang).
- `total_penjualan=("nilai_penjualan", "sum")` — bikin kolom baru bernama `total_penjualan`, isinya hasil `.sum()` dari kolom `nilai_penjualan` per kelompok.
- `jumlah_transaksi=("id_pesanan", "nunique")` — bikin kolom `jumlah_transaksi`, isinya jumlah **nilai unik** `id_pesanan` per kelompok. `.nunique()` (*number of unique*) dipakai, bukan `.count()`, supaya kalau ada id yang somehow tercatat dua kali di satu kategori, tetap dihitung sebagai satu transaksi.
- Pola `nama_kolom_baru=("kolom_sumber", "fungsi")` ini bisa diulang berkali-kali di dalam satu `.agg()` — setiap pasangan jadi satu kolom baru di hasil ringkasan.

### `sort_values()`: Mengurutkan Hasil Ringkasan

Tabel ringkasan hasil `groupby()`/`agg()` urutannya default alfabetis berdasarkan kolom yang dikelompokkan (di sini: nama kategori) — hampir tidak pernah itu urutan yang paling berguna dibaca.

```python
ringkasan.sort_values("total_penjualan", ascending=False)
```

- `.sort_values("kolom")` — mengurutkan berdasarkan isi kolom tertentu.
- `ascending=False` — dari besar ke kecil (turun). Tanpa ini, defaultnya dari kecil ke besar (naik).
- Mengurutkan ringkasan hampir selalu langkah wajib — supaya kategori paling penting (paling besar/kecil) langsung kelihatan di baris atas, tidak perlu dicari manual di tengah tabel.

### `pivot_table()`: Dua Dimensi Sekaligus

`groupby()` mengelompokkan berdasarkan **satu** kolom. `pivot_table()` melakukan hal serupa tapi menyusunnya jadi tabel **dua dimensi** — mirip pivot table di Excel.

```python
pd.pivot_table(df, values="nilai_penjualan", index="wilayah", columns="kategori",
                aggfunc="sum", fill_value=0)
```

- `values="nilai_penjualan"` — kolom yang mau diringkas.
- `index="wilayah"` — jadi baris tabel hasil.
- `columns="kategori"` — jadi kolom tabel hasil.
- `aggfunc="sum"` — cara meringkas tiap kombinasi wilayah × kategori (bisa juga `"mean"`, `"count"`, dst).
- `fill_value=0` — kalau ada kombinasi wilayah × kategori yang sama sekali tidak ada transaksinya, diisi `0` alih-alih `NaN` (lebih masuk akal buat data uang: "tidak ada transaksi" = 0, bukan kosong).
- Berguna buat melihat pola yang tidak kelihatan dari `groupby()` satu kolom saja — misalnya "kategori Elektronik itu larisnya di wilayah mana", bukan cuma "Elektronik total sekian".

### EDA: Pertanyaan → Bukti → Insight

**EDA** (*Exploratory Data Analysis*) bukan sekadar "menjalankan `groupby()` sebanyak-banyaknya" — EDA yang baik selalu dimulai dari **pertanyaan**, dijawab pakai **tabel bukti**, lalu disimpulkan jadi **insight**.

Bedanya temuan dan insight penting dipahami:

- **Temuan** — hasil observasi mentah dari data. Contoh: "Elektronik total penjualannya 44,9 juta, paling besar dari semua kategori."
- **Insight** — makna dan arah tindakan dari temuan itu. Contoh: "Elektronik layak jadi prioritas restock dan promosi, karena kontribusinya ke omzet paling besar."

Temuan itu angka. Insight itu **kalimat lengkap** yang menjawab "jadi maksudnya apa, dan apa yang perlu dilakukan?"

### Jebakan: Insight yang Digerakkan Satu Baris

Satu kesalahan yang sering terjadi: menarik insight dari angka agregat tanpa mengecek **apa yang membentuk** angka itu. Total penjualan Bandung (38,7 juta) dan total penjualan Januari (42,7 juta) kelihatan besar — tapi begitu satu baris "Laptop Gaming (Bonus)" senilai 31,5 juta (yang memang terjadi di Bandung, bulan Januari) dikeluarkan, sisa totalnya jadi jauh lebih kecil (Bandung tinggal 7,2 juta, Januari tinggal 11,3 juta).

Insight seperti *"Bandung adalah wilayah dengan penjualan tertinggi"* jadi **menyesatkan** kalau tidak disebutkan bahwa itu sebagian besar cuma dari satu transaksi. Sebelum menulis insight dari angka besar, selalu cek: **apakah angka ini digerakkan banyak transaksi, atau cuma segelintir (bahkan satu) transaksi ekstrem?**

> Slide visual: satu bar chart sederhana (dijelaskan lewat kata-kata, bukan digambar — visualisasi baru dipelajari pertemuan 5) — batang "Bandung total" tinggi, lalu ditunjukkan batang itu terbelah jadi "1 laptop" (besar) + "sisanya" (kecil).

## Hands-on: Langkah demi Langkah

### 1. Recap Kondisi Data (Temuan Pertemuan 3)

Buat cell baru:

```python
import pandas as pd

df = pd.read_csv("data.csv")
print(df.shape)
print(df.isna().sum())
print(df.duplicated().sum())
```

**Cek hasil:**
```text
(133, 8)
id_pesanan     0
tanggal        0
nama_produk    0
kategori       0
harga          6
jumlah         0
wilayah        0
modal          0
dtype: int64
3
```

Ini persis temuan pertemuan 3: 6 `harga` kosong, 3 baris duplikat. Belum ada yang berubah — sesi ini baru mulai membereskannya.

### 2. Menghapus Baris Duplikat

Buat cell baru:

```python
baris_duplikat = df[df.duplicated(keep=False)].sort_values("id_pesanan")
display(baris_duplikat[["id_pesanan", "nama_produk", "kategori", "harga"]])
```

**Cek hasil:** 6 baris (3 pasang identik) — `id_pesanan` 1029 (Keripik Singkong), 1071 (Buku Motivasi), 1118 (Charger), masing-masing muncul 2 kali.

Sekarang hapus beneran:

```python
df = df.drop_duplicates()
print(df.shape)
print(df.duplicated().sum())
```

**Cek hasil:**
```text
(130, 8)
0
```

Dari 133 baris jadi 130 (3 baris duplikat terhapus), dan `.duplicated().sum()` sekarang `0`.

**Kalau error:** kalau `shape`-nya masih `(133, 8)` setelah `drop_duplicates()`, pastikan hasilnya di-assign ulang ke `df` (`df = df.drop_duplicates()`), bukan cuma dijalankan tanpa disimpan.

### 3. Contoh Kecil `errors="coerce"`

Sebelum diterapkan ke `data.csv` asli, coba dulu di data kecil yang sengaja dirusak, biar efek `errors="coerce"` kelihatan jelas. Buat cell baru:

```python
tanggal_kotor = pd.Series(["2026-01-15", "31-02-2026", "2026-03-10", "bukan tanggal"])
print(pd.to_datetime(tanggal_kotor, errors="coerce"))

harga_kotor = pd.Series(["150000", "abc", "220000", "75rb"])
print(pd.to_numeric(harga_kotor, errors="coerce"))
```

**Cek hasil:**
```text
0   2026-01-15
1          NaT
2   2026-03-10
3          NaT
dtype: datetime64[ns]
0    150000.0
1         NaN
2    220000.0
3         NaN
dtype: float64
```

- `"31-02-2026"` (tanggal 31 Februari, tidak pernah ada) dan `"bukan tanggal"` sama-sama gagal dikonversi → jadi `NaT`.
- `"abc"` dan `"75rb"` (bukan angka murni) gagal dikonversi → jadi `NaN`.
- Nilai yang formatnya benar (`"2026-01-15"`, `"150000"`) tetap dikonversi dengan sukses, tidak ikut terganggu.

### 4. Konversi `tanggal` di Data Asli

Buat cell baru:

```python
print(df["tanggal"].dtype)
df["tanggal"] = pd.to_datetime(df["tanggal"], errors="coerce")
print(df["tanggal"].dtype)
print(df["tanggal"].isna().sum())
```

**Cek hasil:**
```text
object
datetime64[ns]
0
```

Tipe kolom `tanggal` berubah dari `object` (teks) jadi `datetime64[ns]` (tanggal beneran), dan `0` nilai yang gagal dikonversi — tanggal di `data.csv` memang sudah rapi formatnya dari awal, cuma belum "diberi tahu" ke Pandas kalau itu tanggal.

**Kalau error:** kalau `.isna().sum()` di sini bukan `0`, cek dulu format tanggal aslinya di CSV (harus `YYYY-MM-DD`) — `errors="coerce"` menyembunyikan error-nya, tapi tanda tanggal yang gagal parse tetap kelihatan lewat jumlah `NaT` yang muncul.

### 5. Melihat Baris `harga` Kosong

Buat cell baru:

```python
kosong = df[df["harga"].isna()]
display(kosong[["id_pesanan", "nama_produk", "kategori", "harga"]])
```

**Cek hasil:** 6 baris — Speaker Bluetooth (id 1003), Keyboard (id 1016), Keyboard (id 1045), Notebook Polos (id 1074), Speaker Bluetooth (id 1080), Buku Resep Masakan (id 1099).

### 6. Membandingkan Opsi Penanganan (Belum Dieksekusi)

Sebelum memutuskan, coba dulu bandingkan beberapa opsi — TANPA menyimpan hasilnya ke `df`. Buat cell baru:

```python
print("Kalau dihapus, shape jadi:", df.dropna(subset=["harga"]).shape)
print("Rata-rata (mean) harga:", df["harga"].mean())

for produk in kosong["nama_produk"].unique():
    median_produk = df[df["nama_produk"] == produk]["harga"].median()
    print(f"Median harga {produk}: {median_produk}")
```

**Cek hasil:**
```text
Kalau dihapus, shape jadi: (124, 8)
Rata-rata (mean) harga: 267725.8064516129
Median harga Speaker Bluetooth: 313000.0
Median harga Keyboard: 234000.0
Median harga Notebook Polos: 14000.0
Median harga Buku Resep Masakan: 57000.0
```

Kalau dihapus (`dropna`), kita kehilangan 6 baris data yang sebenarnya cuma satu kolomnya yang kosong (kolom lain lengkap) — sayang dibuang. Median per produk lebih spesifik daripada mean keseluruhan (267 ribu, dirata-rata dari SEMUA produk, tidak relevan buat menebak harga Notebook Polos yang jelas jauh lebih murah).

### 7. Mengisi `harga` dengan Median per Produk

Buat cell baru:

```python
df["harga"] = df["harga"].fillna(df.groupby("nama_produk")["harga"].transform("median"))
print(df["harga"].isna().sum())
display(df.loc[kosong.index, ["id_pesanan", "nama_produk", "harga"]])
```

**Cek hasil:**
```text
0
```
| | id_pesanan | nama_produk | harga |
|---|---|---|---|
| 2 | 1003 | Speaker Bluetooth | 313000.0 |
| 15 | 1016 | Keyboard | 234000.0 |
| 44 | 1045 | Keyboard | 234000.0 |
| 73 | 1074 | Notebook Polos | 14000.0 |
| 79 | 1080 | Speaker Bluetooth | 313000.0 |
| 98 | 1099 | Buku Resep Masakan | 57000.0 |

Semua baris yang tadinya kosong sekarang terisi angka yang cocok dengan median di Langkah 6, dan `.isna().sum()` jadi `0`.

**Kalau error:** kalau muncul `SettingWithCopyWarning`, pastikan `df` bukan hasil filter/slice dari DataFrame lain di cell sebelumnya (kalau ragu, jalankan ulang dari Langkah 1).

### 8. Mendeteksi Outlier dengan Aturan IQR

Buat cell baru:

```python
q1 = df["harga"].quantile(0.25)
q3 = df["harga"].quantile(0.75)
iqr = q3 - q1
batas_bawah = q1 - 1.5 * iqr
batas_atas = q3 + 1.5 * iqr

print("Q1:", q1, "| Q3:", q3, "| IQR:", iqr)
print("Batas bawah:", batas_bawah, "| Batas atas:", batas_atas)

outlier = df[(df["harga"] < batas_bawah) | (df["harga"] > batas_atas)]
display(outlier[["id_pesanan", "nama_produk", "kategori", "harga", "modal"]])
```

**Cek hasil:**
```text
Q1: 41250.0 | Q3: 181250.0 | IQR: 140000.0
Batas bawah: -168750.0 | Batas atas: 391250.0
```
| | id_pesanan | nama_produk | kategori | harga | modal |
|---|---|---|---|---|---|
| 40 | 1041 | Sepatu Sneakers | Fashion | 8900000.0 | 245000 |
| 55 | 1056 | Laptop Gaming (Bonus) | Elektronik | 10500000.0 | 9600000 |

Dua baris kandidat outlier — belum dihapus, baru terdeteksi.

### 9. Menyelidiki dan Memutuskan

Buat cell baru:

```python
sneakers_lain = df[df["nama_produk"] == "Sepatu Sneakers"]
display(sneakers_lain[["id_pesanan", "harga", "modal"]])
```

**Cek hasil:**
| | id_pesanan | harga | modal |
|---|---|---|---|
| 31 | 1032 | 364000.0 | 194000 |
| 36 | 1037 | 329000.0 | 197000 |
| 40 | 1041 | 8900000.0 | 245000 |
| 74 | 1075 | 375000.0 | 196000 |
| 104 | 1105 | 351000.0 | 262000 |

Bandingkan: empat baris Sepatu Sneakers lain harganya di kisaran 329–375 ribu dengan modal sekitar 194–262 ribu (wajar, margin masuk akal). id 1041 melompat jauh ke 8,9 juta padahal modalnya tetap di kisaran normal (245 ribu) — selisihnya sampai 36×. id 1041 kelihatan jelas salah input. Sementara Laptop Gaming (id 1056, harga 10,5 juta, modal 9,6 juta) — marginnya wajar, cuma memang barang mahal.

Putuskan buang cuma yang benar-benar salah:

```python
df = df[df["id_pesanan"] != 1041]
print(df.shape)
```

**Cek hasil:**
```text
(129, 8)
```

### 10. Verifikasi Kondisi Akhir

Buat cell baru:

```python
print(df.shape)
print(df.isna().sum())
print(df.duplicated().sum())
print(df.dtypes)
```

**Cek hasil:**
```text
(129, 8)
id_pesanan    0
tanggal       0
nama_produk   0
kategori      0
harga         0
jumlah        0
wilayah       0
modal         0
dtype: int64
0
id_pesanan              int64
tanggal        datetime64[ns]
nama_produk            object
kategori               object
harga                 float64
jumlah                  int64
wilayah                object
modal                   int64
dtype: object
```

133 baris awal → 129 baris bersih: 0 data kosong, 0 duplikat, `tanggal` sudah bertipe tanggal beneran.

### 11. Membuat Ulang Kolom Turunan

`nilai_penjualan` dan `untung` dari pertemuan 3 dihitung dari `harga` yang lama (sebelum dibersihkan) — dihitung ulang di atas data yang sudah bersih. Buat cell baru:

```python
df["nilai_penjualan"] = df["harga"] * df["jumlah"]
df["untung"] = (df["harga"] - df["modal"]) * df["jumlah"]
display(df[["nama_produk", "harga", "modal", "jumlah", "nilai_penjualan", "untung"]].head())
```

**Cek hasil:**
| | nama_produk | harga | modal | jumlah | nilai_penjualan | untung |
|---|---|---|---|---|---|---|
| 0 | Mouse | 150000.0 | 95000 | 2 | 300000.0 | 110000.0 |
| 1 | Mouse | 155000.0 | 113000 | 2 | 310000.0 | 84000.0 |
| 2 | Speaker Bluetooth | 313000.0 | 196000 | 5 | 1565000.0 | 585000.0 |
| 3 | Novel Fiksi | 62000.0 | 39000 | 2 | 124000.0 | 46000.0 |
| 4 | Matras Yoga | 121000.0 | 71000 | 5 | 605000.0 | 250000.0 |

### 12. `groupby()` Pertama: Total Penjualan per Kategori

Buat cell baru:

```python
display(df.groupby("kategori")["nilai_penjualan"].sum())
```

**Cek hasil:**
```text
kategori
Buku           3948000.0
Elektronik    44893000.0
Fashion       15775000.0
Makanan        3275000.0
Olahraga       7913000.0
Name: nilai_penjualan, dtype: float64
```

### 13. `agg()` dan `sort_values()`: Ringkasan Lengkap

Buat cell baru:

```python
ringkasan = (
    df.groupby("kategori", as_index=False)
      .agg(total_penjualan=("nilai_penjualan", "sum"),
           jumlah_transaksi=("id_pesanan", "nunique"),
           rata_harga=("harga", "mean"))
      .sort_values("total_penjualan", ascending=False)
)
display(ringkasan)
```

**Cek hasil:**
| | kategori | total_penjualan | jumlah_transaksi | rata_harga |
|---|---|---|---|---|
| | Elektronik | 44893000.0 | 24 | 641916.666667 |
| | Fashion | 15775000.0 | 27 | 178592.592593 |
| | Olahraga | 7913000.0 | 26 | 103153.846154 |
| | Buku | 3948000.0 | 29 | 48413.793103 |
| | Makanan | 3275000.0 | 23 | 49956.521739 |

**Kalau error:** kalau `.agg()` melempar `SpecificationError`, cek lagi formatnya — tiap pasangan harus `nama_baru=("kolom_sumber", "fungsi")`, dengan tanda kurung dan koma persis seperti contoh.

### 14. EDA 1 — Kategori Penyumbang Penjualan Terbesar

**Pertanyaan:** kategori mana yang menyumbang penjualan terbesar? Buat cell baru:

```python
print("Berdasarkan total penjualan:")
display(ringkasan.sort_values("total_penjualan", ascending=False))

print("\nBerdasarkan jumlah transaksi:")
display(ringkasan.sort_values("jumlah_transaksi", ascending=False))
```

**Cek hasil:** (baris pertama tabel total penjualan) Elektronik teratas dengan 44,9 juta. Tapi di tabel jumlah transaksi, Elektronik justru **paling sedikit** (24 transaksi) — Buku yang paling sering dibeli (29 transaksi), meski totalnya paling kecil kedua (3,9 juta).

**Insight:** Elektronik menyumbang penjualan terbesar meski jumlah transaksinya paling sedikit — artinya rata-rata nilai per transaksi Elektronik jauh lebih tinggi (barang mahal, jarang dibeli). Sebaliknya, Buku sering dibeli tapi nilainya kecil-kecil (barang murah, sering dibeli). Ini menjawab langsung pertanyaan lanjutan "apakah kategori dengan penjualan terbesar juga yang transaksinya terbanyak?" — jawabannya **tidak**.

### 15. EDA 2 — Tren Penjualan per Bulan

Buat cell baru:

```python
df["bulan"] = df["tanggal"].dt.to_period("M").astype(str)
per_bulan = df.groupby("bulan", as_index=False).agg(
    total_penjualan=("nilai_penjualan", "sum"),
    jumlah_transaksi=("id_pesanan", "nunique"),
)
display(per_bulan)
```

**Cek hasil:**
| | bulan | total_penjualan | jumlah_transaksi |
|---|---|---|---|
| 0 | 2026-01 | 42775000.0 | 40 |
| 1 | 2026-02 | 18240000.0 | 47 |
| 2 | 2026-03 | 14789000.0 | 42 |

- `.dt.to_period("M")` — mengambil bagian tahun-bulan dari kolom tanggal (butuh kolom `tanggal` sudah bertipe `datetime64[ns]`, hasil Langkah 4).
- Sekilas terlihat penjualan menurun tajam dari Januari ke Maret — tapi jumlah transaksinya justru naik (40 → 47 → 42). Pola ini mencurigakan, diselidiki lebih lanjut di Langkah 18.

**Kalau error:** kalau `.dt.to_period()` melempar `AttributeError`, berarti kolom `tanggal` masih bertipe `object` — pastikan Langkah 4 sudah dijalankan sebelum langkah ini.

### 16. EDA 3 — Wilayah Ramai vs Wilayah Bernilai Tinggi

**Pertanyaan:** wilayah mana yang transaksinya banyak tapi nilai belanjanya rendah? Buat cell baru:

```python
per_wilayah = df.groupby("wilayah", as_index=False).agg(
    total_penjualan=("nilai_penjualan", "sum"),
    jumlah_transaksi=("id_pesanan", "nunique"),
)
per_wilayah["rata_rata_per_transaksi"] = (
    per_wilayah["total_penjualan"] / per_wilayah["jumlah_transaksi"]
).round(0)
display(per_wilayah.sort_values("jumlah_transaksi", ascending=False))
```

**Cek hasil:**
| | wilayah | total_penjualan | jumlah_transaksi | rata_rata_per_transaksi |
|---|---|---|---|---|
| | Jakarta | 11089000.0 | 31 | 357710.0 |
| | Surabaya | 6620000.0 | 28 | 236429.0 |
| | Bandung | 38743000.0 | 25 | 1549720.0 |
| | Medan | 10020000.0 | 24 | 417500.0 |
| | Karawang | 9332000.0 | 21 | 444381.0 |

**Insight:** Surabaya transaksinya cukup banyak (28) tapi rata-rata nilai per transaksinya paling rendah (236 ribu) — cocok dengan pola "ramai tapi nilainya rendah". Bandung kebalikannya: transaksi paling sedikit (25) tapi rata-rata per transaksinya jauh di atas wilayah lain (1,5 juta) — dicurigai, dan memang benar terbukti di Langkah 18.

### 17. `pivot_table()`: Wilayah × Kategori

Buat cell baru:

```python
pivot = pd.pivot_table(
    df, values="nilai_penjualan", index="wilayah", columns="kategori",
    aggfunc="sum", fill_value=0,
)
display(pivot)
```

**Cek hasil:**
| wilayah | Buku | Elektronik | Fashion | Makanan | Olahraga |
|---|---|---|---|---|---|
| Bandung | 838000.0 | 35250000.0 | 1252000.0 | 330000.0 | 1073000.0 |
| Jakarta | 404000.0 | 2374000.0 | 5747000.0 | 977000.0 | 1587000.0 |
| Karawang | 346000.0 | 2041000.0 | 4468000.0 | 673000.0 | 1804000.0 |
| Medan | 709000.0 | 3773000.0 | 3395000.0 | 389000.0 | 1754000.0 |
| Surabaya | 1651000.0 | 1455000.0 | 913000.0 | 906000.0 | 1695000.0 |

Kolom Elektronik di baris Bandung (35,25 juta) mencolok jauh dibanding wilayah lain — jadi petunjuk kuat buat Langkah 18.

### 18. Menguji Jebakan: Cek Kontribusi Satu Baris

Buat cell baru:

```python
laptop = df[df["nama_produk"] == "Laptop Gaming (Bonus)"]
display(laptop[["id_pesanan", "nama_produk", "wilayah", "bulan", "nilai_penjualan"]])

bandung_total = df[df["wilayah"] == "Bandung"]["nilai_penjualan"].sum()
bandung_tanpa_laptop = df[
    (df["wilayah"] == "Bandung") & (df["nama_produk"] != "Laptop Gaming (Bonus)")
]["nilai_penjualan"].sum()
print("Bandung total:", bandung_total, "| tanpa laptop:", bandung_tanpa_laptop)

jan_total = df[df["bulan"] == "2026-01"]["nilai_penjualan"].sum()
jan_tanpa_laptop = df[
    (df["bulan"] == "2026-01") & (df["nama_produk"] != "Laptop Gaming (Bonus)")
]["nilai_penjualan"].sum()
print("Januari total:", jan_total, "| tanpa laptop:", jan_tanpa_laptop)
```

**Cek hasil:**
| | id_pesanan | nama_produk | wilayah | bulan | nilai_penjualan |
|---|---|---|---|---|---|
| 55 | 1056 | Laptop Gaming (Bonus) | Bandung | 2026-01 | 31500000.0 |

```text
Bandung total: 38743000.0 | tanpa laptop: 7243000.0
Januari total: 42775000.0 | tanpa laptop: 11275000.0
```

Terbukti: satu baris Laptop Gaming (nilai penjualannya 31,5 juta, terjadi di Bandung bulan Januari) menyumbang **81%** dari total Bandung dan **74%** dari total Januari. Insight "Bandung wilayah paling bernilai" atau "Januari bulan terbaik" jadi menyesatkan kalau tidak disebutkan bahwa itu sebagian besar cuma dari satu transaksi laptop yang memang mahal — bukan pola belanja yang konsisten di wilayah/bulan itu.

**Insight yang benar (lebih jujur):** tanpa laptop itu, Bandung dan Januari sebenarnya biasa saja dibanding wilayah/bulan lain — kesimpulan "terbaik" tadi salah kalau langsung diambil dari angka agregat tanpa mengecek pembentuknya.

### 19. Menyimpan Data Bersih ke CSV Baru

Buat cell baru:

```python
df_final = df.drop(columns=["bulan"])
df_final.to_csv("data-bersih.csv", index=False)
print("Tersimpan:", df_final.shape)
```

**Cek hasil:**
```text
Tersimpan: (129, 10)
```

- Kolom `bulan` dibuang dulu sebelum disimpan — itu kolom bantu sementara buat Langkah 15 & 18, bukan bagian dataset final.
- `data-bersih.csv` berisi 129 baris, 10 kolom (8 kolom asli + `nilai_penjualan` + `untung`), sudah bebas duplikat, data kosong, dan outlier yang salah. File ini yang dipakai pertemuan 5 buat visualisasi — tidak perlu mengulang proses cleaning dari awal.
- Di Colab, download filenya dulu (klik kanan di panel Files → Download) kalau mau dipakai lagi setelah runtime terputus.

### 20. Latihan Gabungan

Buat cell baru, kerjakan tiga hal sekaligus:

```python
print("Kolom numerik:")
print(df.select_dtypes(include="number").columns.tolist())

print("\nJumlah baris kategori Fashion:")
print(df[df["kategori"] == "Fashion"].shape)

print("\nRingkasan total penjualan per kategori, terurut dari terbesar:")
display(df.groupby("kategori", as_index=False)["nilai_penjualan"].sum()
          .sort_values("nilai_penjualan", ascending=False))
```

**Cek hasil:** kolom numerik (`id_pesanan`, `harga`, `jumlah`, `modal`, `nilai_penjualan`, `untung`), jumlah baris kategori Fashion `(27, 11)`, dan tabel ringkasan penjualan per kategori terurut sama seperti Langkah 13.

### Hasil Akhir Sesi Ini

Notebook `pertemuan-4.ipynb` berisi cell yang mengikuti 20 langkah di atas: cleaning (`drop_duplicates`, `to_datetime`/`to_numeric` dengan `errors="coerce"`, `fillna` median per grup, deteksi & penyelidikan outlier IQR) sampai data jadi 129 baris bersih, lalu EDA (`groupby`, `agg`, `sort_values`, `pivot_table`) menjawab 3 pertanyaan (kategori terbesar, tren bulanan, wilayah ramai vs bernilai tinggi), ditutup pengujian jebakan insight satu-baris dan menyimpan hasil bersih ke `data-bersih.csv` buat dipakai pertemuan 5.

## Catatan AI

Contoh prompt yang baik: "Jelaskan kenapa `errors=\"coerce\"` lebih aman dipakai daripada membiarkan `pd.to_datetime()` berhenti dengan error, dengan contoh data tanggal yang formatnya campur aduk. Jangan berikan kode buat latihan mandiri saya." Verifikasi selalu jawaban AI dengan menjalankan kodenya sendiri di Colab, dan bandingkan hasil `.shape`/`.isna().sum()` sebelum-sesudah tiap langkah cleaning — kalau angkanya tidak masuk akal, itu tanda ada yang perlu dicek ulang, bukan langsung dipercaya.

## Latihan Mandiri

Pakai `data-bersih.csv` hasil Langkah 19: hitung total `untung` per `kategori` (urutkan dari terbesar), lalu tulis satu insight dan satu pertanyaan lanjutan dari hasil itu — ikuti pola Langkah 14 (jangan cuma menyalin angka, jelaskan artinya).

## Rangkuman

Data Cleaning membereskan apa yang sudah dicatat di Data Understanding: baris duplikat dihapus (`drop_duplicates()`), tipe data diperbaiki (`to_datetime`/`to_numeric` dengan `errors="coerce"`), data kosong diisi dengan pertimbangan (`fillna()` + median per grup, bukan asal hapus), dan outlier diselidiki dulu sebelum diputuskan dibuang atau dipertahankan (aturan IQR + cek konsistensi ke kolom lain). Setiap keputusan itu dicatat sebagai cleaning log, supaya bisa dipertanggungjawabkan. Setelah data bersih, `groupby()`/`agg()`/`sort_values()`/`pivot_table()` dipakai buat meringkas dan menjawab pertanyaan EDA — dan insight yang baik selalu dicek dulu apakah benar-benar mewakili polanya, atau cuma digerakkan segelintir transaksi ekstrem. Hari ini kita **bereskan** semua temuan pertemuan 3 dan **menggali** insight pertama dari data. Minggu depan, angka-angka dan tabel ini diubah jadi **grafik** — supaya insight yang sama lebih mudah dilihat dan diceritakan ke orang lain.

## Istilah Penting

| Istilah | Artinya |
|---|---|
| Data Cleaning | Tahap membereskan temuan Data Understanding: duplikat, data kosong, tipe data, outlier |
| `drop_duplicates()` | Method Pandas buat benar-benar menghapus baris duplikat |
| Imputasi | Mengisi nilai kosong dengan nilai tebakan yang masuk akal (misalnya median per grup) |
| `errors="coerce"` | Parameter yang mengubah nilai gagal konversi jadi kosong (`NaN`/`NaT`), bukan menghentikan program |
| `NaT` | *Not a Time* — nilai kosong pada kolom bertipe tanggal |
| IQR | *Interquartile Range* — rentang Q3 dikurangi Q1, dasar aturan deteksi outlier |
| Cleaning log | Catatan tindakan cleaning: apa yang diubah, kenapa, dan berapa baris terdampak |
| `groupby()` | Mengelompokkan baris berdasarkan nilai kolom, sebelum diringkas |
| `agg()` | Menghitung beberapa ringkasan sekaligus dari hasil `groupby()`, dengan nama kolom sendiri |
| `nunique()` | Menghitung jumlah nilai unik dalam suatu kolom/grup |
| `pivot_table()` | Meringkas data jadi tabel dua dimensi (baris × kolom), mirip pivot table Excel |
| Temuan vs Insight | Temuan = hasil observasi mentah; Insight = makna dan arah tindakan dari temuan itu |
| Jebakan satu baris | Insight yang keliru karena angka agregatnya ternyata cuma digerakkan satu/segelintir transaksi ekstrem |
