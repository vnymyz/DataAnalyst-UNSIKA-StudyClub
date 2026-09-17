# Pertemuan 3 — NumPy, Pandas, dan Data Understanding

**Durasi:** 19.30–21.00 WIB
**Tools:** Google Colab, NumPy, Pandas
**Output:** Peserta dapat membaca file CSV ke DataFrame, mengecek kondisi datanya (kualitas, tipe data, data kosong/duplikat), lalu menyeleksi dan memfilter data e-commerce.

## Cara Menjalankan Kode di Folder Ini

`pertemuan-3.ipynb` di folder ini adalah **hasil akhir** hands-on sesi ini, dan `data.csv` adalah dataset yang dipakai sepanjang sesi. Buka lewat [colab.research.google.com](https://colab.research.google.com/) (`File > Upload notebook`, lalu upload juga `data.csv` ke Colab lewat panel Files di sebelah kiri) atau lewat Jupyter Notebook lokal kalau sudah terpasang — pastikan `data.csv` ada di folder yang sama dengan notebook-nya. Kalau ikut kelas dari awal, jangan buka file ini dulu — ikuti bagian Hands-on di bawah dan buat notebook sendiri; file ini jadi jaring pengaman kalau tertinggal.

## Tujuan Belajar

- Memahami array NumPy dan operasi vectorized dasar.
- Memahami Series dan DataFrame sebagai struktur data Pandas.
- Membaca file CSV dan melakukan inspeksi awal (`head`, `info`, `describe`).
- Mengenali tanda-tanda data yang belum siap pakai (data kosong, duplikat, tipe data keliru) — sebagai observasi, sebelum dibereskan di pertemuan 4.
- Menyeleksi kolom, baris, dan memfilter data berdasarkan kondisi tertentu.
- Membuat kolom baru sederhana dari kolom yang sudah ada (feature engineering ringan), termasuk menemukan produk termahal/termurah dan paling untung/rugi.
- (Bonus) Menggabungkan dua tabel dengan `merge()` (`inner`/`left`/`right`/`outer` join) dan menyimpan hasil olahan ke file CSV baru.

## Rundown

| Waktu | Aktivitas |
|---|---|
| 19.30–19.40 | Review pertemuan 2, kenalan sama dataset `data.csv` |
| 19.40–19.55 | Teori: NumPy array dan operasi vectorized |
| 19.55–20.10 | Teori: Series, DataFrame, membaca CSV |
| 20.10–20.30 | Hands-on: `head`, `info`, `describe`, cek data kosong & duplikat |
| 20.30–20.50 | Hands-on: seleksi kolom, filter baris, bikin kolom baru |
| 20.50–20.55 | Menilai dataset dari Kaggle |
| 20.55–21.00 | Rangkuman dan pengantar kuis 3 |

## Teori

### Dari List/Dictionary ke Tabel Sungguhan

Di pertemuan 1 dan 2, data disimpan pakai list (`["Elektronik", "Fashion", "Makanan"]`) dan dictionary (`{"nama": "Mouse", "harga": 150000}`), lalu array of dictionary buat data yang lebih banyak. Itu cara yang benar secara konsep — tapi begitu datanya ribuan baris, cara itu jadi lambat diolah dan susah dilihat sebagai satu kesatuan.

- Data analyst sehari-hari kerja dengan tabel: baris demi baris, kolom demi kolom — persis seperti spreadsheet Excel, cuma diolah lewat kode.
- Dua library jadi andalan buat ini: **NumPy** (angka dalam jumlah besar) dan **Pandas** (tabel/DataFrame, dibangun di atas NumPy).
- Ingat pertemuan 2: `DataFrame` nanti ternyata juga **object** — punya data (isi tabel) dan method (`.head()`, `.info()`, dst) miliknya sendiri, sama seperti `class Produk` yang dibuat kemarin.

### NumPy: Array buat Angka dalam Jumlah Besar

**NumPy** (Numerical Python) adalah library buat mengolah angka secara efisien, lewat struktur data bernama **array**.

```python
import numpy as np

angka = np.array([10, 20, 30, 40])
print(angka * 2)
```

```text
[20 40 60 80]
```

- `np.array([...])` — membungkus list biasa jadi array NumPy.
- `angka * 2` — **setiap elemen** dikalikan 2 sekaligus, dalam satu baris kode. Ini disebut **operasi vectorized**.
- Bandingkan dengan list biasa: `[10, 20, 30, 40] * 2` di Python murni hasilnya list itu diulang dua kali (`[10, 20, 30, 40, 10, 20, 30, 40]`), bukan dikali per elemen — beda total dengan array NumPy.

### Kenapa NumPy Lebih Cepat dari List Biasa?

Analoginya: list biasa itu seperti mengolah barang satu-satu pakai tangan (loop `for`, satu per satu), sementara array NumPy itu seperti pakai mesin yang memproses semua barang sekaligus dalam satu gerakan.

- Tanpa NumPy, mengalikan tiap elemen list butuh `for` loop manual: `[x * 2 for x in daftar]`.
- Dengan NumPy, cukup `daftar_array * 2` — lebih ringkas ditulis, dan jauh lebih cepat dijalankan untuk data dalam jumlah besar (ribuan sampai jutaan angka).
- Inilah alasan Pandas (buat tabel) dibangun di atas NumPy (buat angka) — supaya operasi di seluruh kolom tabel bisa secepat ini juga.

### Series: Satu Kolom Data Berlabel

**Series** adalah struktur data Pandas buat menyimpan satu kolom data, tiap nilainya punya label (index).

```python
import pandas as pd

harga_produk = pd.Series([150000, 220000, 75000], name="harga")
print(harga_produk)
```

```text
0    150000
1    220000
2     75000
Name: harga, dtype: int64
```

- Angka di kiri (`0`, `1`, `2`) adalah **index**, otomatis dibuat Pandas kalau tidak ditentukan sendiri.
- `name="harga"` — memberi nama pada Series ini, nanti jadi nama kolom kalau digabung ke DataFrame.
- Series jarang dipakai sendirian — biasanya muncul sebagai **satu kolom** dari DataFrame.

### DataFrame: Tabel — Kolom itu Variabel, Baris itu Observasi

**DataFrame** adalah struktur data Pandas buat tabel: gabungan banyak Series (kolom) yang berbagi index yang sama.

```python
data_manual = {
    "nama_produk": ["Mouse", "Kaos Polos", "Novel Fiksi"],
    "kategori": ["Elektronik", "Fashion", "Buku"],
    "harga": [150000, 75000, 68000],
}
df_manual = pd.DataFrame(data_manual)
display(df_manual)
```

- `display()` — bawaan Colab/Jupyter (tidak perlu di-import), nampilin DataFrame/Series sebagai tabel rapi berwarna-warni. Beda dengan `print()` yang cuma nampilin teks polos. Dipakai terus mulai sini buat semua hasil berbentuk tabel.

```text
   nama_produk    kategori   harga
0        Mouse  Elektronik  150000
1   Kaos Polos     Fashion   75000
2  Novel Fiksi        Buku   68000
```

- Tiap **kolom** mewakili satu **variabel** (nama produk, kategori, harga).
- Tiap **baris** mewakili satu **observasi** (satu produk).
- Dictionary yang dipelajari pertemuan 1 di sini jadi bahan baku langsung — tiap key jadi nama kolom, tiap list jadi isi kolomnya.
- DataFrame adalah **object**: `df_manual.head()`, `df_manual.info()` nanti adalah method-nya, persis seperti `produk1.info()` di pertemuan 2.

### Membaca File CSV dengan `pd.read_csv()`

**CSV** (Comma-Separated Values) adalah format file teks sederhana buat tabel — tiap baris satu baris data, tiap nilai dipisah koma. Ini format paling umum dipakai buat berbagi dataset.

```python
df = pd.read_csv("data.csv")
```

- `pd.read_csv("data.csv")` — membaca file CSV, langsung diubah jadi DataFrame.
- Nama file harus persis sama (termasuk huruf besar/kecil) dan file-nya harus ada di folder yang sama dengan notebook (atau sudah diupload ke Colab).
- Setelah baris ini, `df` adalah DataFrame utuh — siap diinspeksi.

### Mengintip Data: `head()`, `tail()`, `shape`

Begitu data dibaca, jangan langsung dianalisis — intip dulu bentuknya.

```python
df.head()      # 5 baris pertama (default)
df.tail(3)     # 3 baris terakhir
df.shape       # (jumlah baris, jumlah kolom)
```

- `.head()` — buat cek apakah data terbaca dengan benar (nama kolom, tipe nilai) begitu file dibuka.
- `.tail()` — kadang baris-baris terakhir punya masalah tersendiri (misalnya baris ringkasan yang nyasar ikut terbaca) — cek juga, bukan cuma awal.
- `.shape` — jawaban cepat "datanya sebesar apa?", dalam bentuk `(baris, kolom)`.

> Slide visual: ilustrasi tabel dengan panah dari `.head()` menunjuk 5 baris teratas, dari `.tail()` menunjuk baris terbawah, dan `.shape` menunjuk ukuran keseluruhan tabel.

### Data Understanding: Kenapa Harus Dicek Dulu Sebelum Dianalisis

Sebelum data dianalisis lebih jauh, data analyst wajib berhenti sejenak dan bertanya: **"data ini sudah siap dipakai, belum?"** Tahap ini disebut **Data Understanding** — mengenali kondisi datanya, belum membereskannya.

Analoginya seperti belanja bahan masakan: sebelum mulai masak, kamu cek dulu semua bahannya — ada yang kurang? Ada yang kadaluarsa? Takarannya benar? Baru setelah tahu apa yang perlu dibetulkan, kamu mulai masak (atau di sini: mulai membersihkan datanya).

- **Data Understanding** (pertemuan ini) = **melihat** dan **mencatat** apa yang janggal: kolom mana yang kosong, baris mana yang kembar, tipe data mana yang keliru, angka mana yang mencurigakan.
- **Data Cleaning** (pertemuan depan) = **membereskan** temuan itu: mengisi/membuang data kosong, menghapus duplikat, mengubah tipe data, menangani nilai ekstrem (outlier).
- Kenapa dipisah? Supaya tidak buru-buru "membetulkan" sesuatu yang belum benar-benar dipahami. Menghapus baris atau mengisi angka kosong itu keputusan — dan keputusan yang baik butuh pemahaman dulu.

Empat alat utama buat Data Understanding yang dipakai sepanjang sisa sesi ini: `.info()`, `.describe()`, `.isna().sum()`, dan `.duplicated().sum()`.

> Slide visual: dua kotak bersebelahan — kotak kiri "Data Understanding: Lihat & Catat" (kaca pembesar), kotak kanan "Data Cleaning: Bereskan" (sapu/obeng, ditandai "Pertemuan 4").

### `df.info()`: Struktur dan Tipe Data

```python
df.info()
```

```text
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 133 entries, 0 to 132
Data columns (total 8 columns):
 #   Column       Non-Null Count  Dtype  
---  ------       --------------  -----  
 0   id_pesanan   133 non-null    int64  
 1   tanggal      133 non-null    object 
 2   nama_produk  133 non-null    object 
 3   kategori     133 non-null    object 
 4   harga        127 non-null    float64
 5   jumlah       133 non-null    int64  
 6   wilayah      133 non-null    object 
 7   modal        133 non-null    int64  
dtypes: float64(1), int64(3), object(4)
memory usage: 8.4+ KB
```

- **Non-Null Count** — jumlah nilai yang TERISI di tiap kolom. Kolom `harga` cuma 127 dari 133 baris terisi — berarti ada **6 baris kosong** di kolom itu (temuan Data Understanding, belum dibereskan sekarang).
- Kolom `modal` (harga beli/produksi) terisi penuh — nanti dipakai bareng `harga` buat menghitung untung/rugi.
- **Dtype** — tipe data tiap kolom. `object` biasanya berarti teks. Perhatikan kolom `tanggal` juga `object`, bukan tipe tanggal beneran — artinya Pandas baru menganggapnya teks biasa, belum bisa dihitung sebagai tanggal (misalnya dicari selisih hari). Ini juga dicatat dulu, baru dibereskan pertemuan 4.
- `harga` bertipe `float64` (desimal) padahal isinya harusnya bilangan bulat — itu terjadi **karena** ada nilai kosong di kolom itu; Pandas otomatis mengubah tipe kolom jadi desimal begitu ada nilai kosong (`NaN`) di dalamnya.

### `df.describe()`: Statistik Cepat buat Kolom Angka

```python
df.describe()
```

```text
        id_pesanan         harga      jumlah         modal
count   133.000000  1.270000e+02  133.000000  1.330000e+02
mean   1065.661654  2.627953e+05    3.007519  1.527669e+05
std      37.657525  1.206160e+06    1.489846  8.284011e+05
min    1001.000000  1.300000e+04    1.000000  8.000000e+03
25%    1033.000000  4.050000e+04    2.000000  2.700000e+04
50%    1066.000000  7.300000e+04    3.000000  4.700000e+04
75%    1098.000000  1.680000e+05    4.000000  1.300000e+05
max    1130.000000  1.050000e+07    5.000000  9.600000e+06
```

- `count` — jumlah data yang terisi (samakan dengan `.info()`: `harga` cuma 127, sisanya sama dengan jumlah baris).
- `mean`, `std` — rata-rata dan sebaran data.
- `min`, `25%`, `50%`, `75%`, `max` — nilai minimum, tiga kuartil, dan maksimum.
- Perhatikan kolom `harga`: `75%` cuma sekitar 168 ribu, tapi `max`-nya 10,5 juta — lompatan itu **sinyal outlier**, ada satu-dua harga yang jauh di luar kebiasaan. Dicatat dulu di sini; cara menanganinya (dibiarkan, dihapus, atau diselidiki lebih lanjut) dibahas pertemuan 4.

### Mengambil Satu Angka Statistik: `min()`, `max()`, `mean()`, dst.

`describe()` enak buat ringkasan cepat, tapi kadang cuma butuh **satu** angka spesifik — misalnya "berapa harga termahal?" doang, tanpa perlu lihat semua statistik sekaligus. Tiap angka yang muncul di `describe()` sebenarnya bisa diambil sendiri-sendiri lewat method-nya masing-masing.

```python
df["harga"].min()            # nilai terkecil
df["harga"].max()            # nilai terbesar
df["harga"].mean()           # rata-rata
df["harga"].median()         # nilai tengah
df["harga"].quantile(0.25)   # kuartil 1 (Q1) — 25% data ada di bawah nilai ini
df["harga"].quantile(0.75)   # kuartil 3 (Q3) — 75% data ada di bawah nilai ini
df["jumlah"].sum()           # total keseluruhan
```

- Semua method ini otomatis mengabaikan nilai kosong (`NaN`) — persis seperti `describe()`, dihitung dari 127 data yang terisi, bukan 133.
- `median()` sama dengan `quantile(0.5)` — nilai tepat di tengah kalau data diurutkan dari kecil ke besar.
- `quantile(0.25)` dan `quantile(0.75)` adalah cara mengambil Q1 dan Q3 satu-satu — dua angka yang sama persis dengan baris `25%` dan `75%` di `describe()`.
- `.sum()` menjumlahkan seluruh nilai di kolom — nanti sangat berguna digabung `groupby` di pertemuan 4 (misalnya "total penjualan per kategori").

`min()`/`max()` sendiri cuma ngasih **angkanya**, bukan **baris produknya**. Buat tahu produk mana yang harganya termahal/termurah, pakai `.idxmax()`/`.idxmin()` — mengembalikan index baris yang nilainya paling besar/kecil, lalu index itu dipakai buat "membuka" baris lengkapnya lewat `.loc[]`:

```python
df.loc[df["harga"].idxmax()]   # baris lengkap dengan harga termahal
df.loc[df["harga"].idxmin()]   # baris lengkap dengan harga termurah
```

- `.idxmax()` — bukan mengembalikan nilainya, tapi **posisi baris** (index) tempat nilai terbesar itu berada.
- `df.loc[index]` — mengambil satu baris utuh berdasarkan index-nya, jadi bisa lihat semua kolom lain (nama produk, kategori, dst) dari baris "pemenang" itu, bukan cuma angka hasil `.max()`-nya doang.

> Slide visual: garis angka (number line) dengan titik ditandai min, Q1, median, Q3, max — mirip diagram box plot sederhana.

### Mengenali Data Kosong dan Duplikat (Observasi Saja)

Dua pertanyaan wajib setelah `.info()` dan `.describe()`: **berapa banyak data yang kosong**, dan **apakah ada baris yang kembar**?

```python
display(df.isna().sum())
```

```text
id_pesanan     0
tanggal        0
nama_produk    0
kategori       0
harga          6
jumlah         0
wilayah        0
dtype: int64
```

```python
print(df.duplicated().sum())
```

```text
3
```

- `.isna()` — mengecek tiap nilai, `True` kalau kosong (`NaN`), `False` kalau terisi. `.sum()` di belakangnya menjumlahkan per kolom (`True` dihitung sebagai 1).
- `.duplicated()` — mengecek tiap baris, `True` kalau seluruh isinya sama persis dengan baris sebelumnya. `.sum()` menjumlahkan totalnya.
- **Penting:** dua baris kode ini cuma **melaporkan**, tidak menghapus atau mengubah apa pun. `df` tetap 133 baris setelah ini dijalankan. Membuang data kosong/duplikat (`dropna()`, `drop_duplicates()`) itu keputusan tersendiri, dipelajari pertemuan 4.

### Memilih Kolom dan Baris

Setelah paham kondisi datanya, baru masuk ke menyeleksi bagian yang relevan.

```python
df["nama_produk"]                              # satu kolom -> Series
df[["nama_produk", "kategori", "harga"]]       # beberapa kolom -> DataFrame
df[df["harga"] > 100000]                        # baris yang memenuhi syarat
```

- `df["kolom"]` (satu tanda kurung siku) — mengambil satu kolom, hasilnya Series.
- `df[["kolom_a", "kolom_b"]]` (dua tanda kurung siku, isinya list nama kolom) — mengambil beberapa kolom sekaligus, hasilnya tetap DataFrame.
- `df["harga"] > 100000` — menghasilkan Series berisi `True`/`False` per baris (mirip operator perbandingan di pertemuan 2). `df[...]` dengan Series `True`/`False` di dalamnya cuma mengambil baris yang `True`-nya — ini disebut **boolean filtering**, pola yang sama seperti `if` cuma diterapkan ke seluruh tabel sekaligus.

### Menghitung Kolom Turunan: Nilai Penjualan dan Untung/Rugi

Kolom yang ada di CSV tidak selalu langsung berguna — kadang perlu **dihitung dulu** dari kolom-kolom lain yang sudah ada. Ini pola yang sama seperti operasi vectorized NumPy di awal materi (`angka * 2`), cuma sekarang diterapkan ke kolom DataFrame.

```python
df["nilai_penjualan"] = df["harga"] * df["jumlah"]           # total transaksi per baris
df["untung"] = (df["harga"] - df["modal"]) * df["jumlah"]    # untung/rugi per baris
```

- `nilai_penjualan` — berapa uang yang masuk dari satu transaksi (harga jual dikali jumlah barang).
- `untung` — selisih harga jual dan modal (biaya beli/produksi), dikali jumlah barang. Kalau `harga` lebih besar dari `modal`, hasilnya **positif** (untung). Kalau `modal` lebih besar dari `harga` (misalnya dijual di bawah biaya produksi), hasilnya **negatif** (rugi).
- Membuat kolom baru dari kolom yang sudah ada seperti ini disebut **feature engineering** — kolomnya tidak ada di data mentah, tapi jauh lebih berguna buat menjawab pertanyaan bisnis ("produk mana yang paling menguntungkan?") dibanding kolom mentahnya sendiri-sendiri.
- Sama seperti `.idxmax()`/`.idxmin()` buat cari harga termahal/termurah, pola yang sama dipakai buat cari produk paling untung/rugi: `df.loc[df["untung"].idxmax()]` dan `df.loc[df["untung"].idxmin()]`.

> Slide visual: tabel kecil 3 kolom (harga, modal, untung) dengan satu baris untung berwarna hijau dan satu baris rugi berwarna merah, panah dari rumus `(harga - modal) * jumlah` menunjuk ke kolom untung.

### Menilai Dataset dari Kaggle

**Kaggle** adalah salah satu tempat paling umum mencari dataset publik buat latihan atau proyek. Tapi tidak semua dataset di sana langsung layak dipakai.

Sebelum memakai dataset dari Kaggle (atau sumber publik mana pun), baca dulu:

- **Deskripsi kolom** — apa arti tiap kolom? Kalau tidak dijelaskan atau namanya ambigu, jangan buru-buru dianalisis.
- **Periode data** — data ini dari kapan sampai kapan? Analisis "tren tahun ini" jadi keliru kalau datanya ternyata dari 5 tahun lalu.
- **Satuan nilai** — harga dalam Rupiah atau Dolar? Berat dalam kg atau gram? Salah asumsi satuan bikin kesimpulan salah total.
- **Lisensi** — boleh dipakai buat apa saja? Ada dataset yang cuma boleh dipakai untuk riset non-komersial.

Prinsipnya sama dengan Data Understanding di atas: jangan menganalisis kolom yang maknanya belum benar-benar dipahami.

### Bonus: Menggabungkan Dua Tabel dengan `merge()` (Join)

Sejauh ini kita cuma pakai satu tabel (`data.csv`). Di dunia nyata, data sering tersebar di beberapa tabel — misalnya data transaksi di satu tabel, data diskon per kategori di tabel lain. Pandas bisa menggabungkan dua tabel jadi satu lewat `pd.merge()`, persis seperti `JOIN` di SQL.

```python
diskon_kategori = pd.DataFrame({
    "kategori": ["Elektronik", "Fashion", "Makanan", "Olahraga"],
    "diskon_persen": [10, 15, 5, 20],
})

df_gabung = pd.merge(df, diskon_kategori, on="kategori", how="left")
```

- `on="kategori"` — kolom kunci yang dipakai mencocokkan baris antar dua tabel (harus ada di kedua tabel, nama boleh beda pakai `left_on`/`right_on`).
- `how` menentukan baris mana yang dipertahankan kalau ada yang tidak ketemu pasangannya:

| `how` | Baris yang dipertahankan |
|---|---|
| `"inner"` | Cuma baris yang kategorinya ada di **kedua** tabel |
| `"left"` | **Semua** baris tabel kiri (`df`) dipertahankan, yang tidak ketemu pasangan diisi `NaN` |
| `"right"` | Semua baris tabel kanan (`diskon_kategori`) dipertahankan |
| `"outer"` | Gabungan semuanya — baris yang tidak ketemu pasangan di tabel mana pun tetap masuk, diisi `NaN` |

Perhatikan: `diskon_kategori` di atas sengaja **tidak** punya baris "Buku". Kalau di-`merge()` pakai `how="left"`, baris-baris kategori Buku di `df` tetap ada (tidak hilang), cuma kolom `diskon_persen`-nya kosong (`NaN`). Kalau pakai `how="inner"`, baris-baris kategori Buku itu justru **hilang** dari hasilnya — karena `inner` cuma menyisakan yang match di dua-duanya.

> Slide visual: diagram lingkaran Venn (dua lingkaran bertumpuk) — irisan ditandai "inner", lingkaran kiri penuh ditandai "left", kanan penuh ditandai "right", gabungan semua ditandai "outer".

### Bonus: Menyimpan Hasil Olahan ke File CSV Baru

Setelah data diolah (digabung, ditambah kolom baru, dst), hasilnya bisa disimpan jadi file CSV baru — supaya tidak perlu mengulang semua langkah dari awal tiap kali mau dipakai lagi.

```python
df_gabung.to_csv("data_dengan_diskon.csv", index=False)
```

- `.to_csv("nama_file.csv")` — kebalikan dari `pd.read_csv()`, menyimpan DataFrame jadi file CSV.
- `index=False` — penting: tanpa ini, kolom index pandas (`0`, `1`, `2`, ...) ikut tersimpan jadi kolom baru bernama `Unnamed: 0` yang sebenarnya tidak diperlukan.
- Di Colab, file yang disimpan cuma ada **sementara** di server — hilang begitu runtime terputus. Kalau mau dipakai lagi nanti, download dulu lewat panel Files (klik kanan file-nya → Download).

## Hands-on: Langkah demi Langkah

### 1. Operasi Vectorized dengan NumPy

Buat cell baru:

```python
import numpy as np

angka = np.array([10, 20, 30, 40])
print(angka * 2)
```

**Cek hasil:**
```text
[20 40 60 80]
```

### 2. Series Sederhana

Buat cell baru:

```python
import pandas as pd

harga_produk = pd.Series([150000, 220000, 75000], name="harga")
print(harga_produk)
```

**Cek hasil:**
```text
0    150000
1    220000
2     75000
Name: harga, dtype: int64
```

### 3. DataFrame Manual dari Dictionary

Buat cell baru:

```python
data_manual = {
    "nama_produk": ["Mouse", "Kaos Polos", "Novel Fiksi"],
    "kategori": ["Elektronik", "Fashion", "Buku"],
    "harga": [150000, 75000, 68000],
}
df_manual = pd.DataFrame(data_manual)
display(df_manual)
```

**Cek hasil:** tabel rapi 3 baris 3 kolom (Mouse/Elektronik/150000, Kaos Polos/Fashion/75000, Novel Fiksi/Buku/68000) — tampilannya lebih rapi dibanding kalau dicetak pakai `print()`.

### 4. Membaca `data.csv`

Pastikan `data.csv` sudah diupload ke Colab (panel Files di kiri, drag-and-drop file-nya), lalu buat cell baru:

```python
df = pd.read_csv("data.csv")
print(type(df))
print(df.shape)
```

**Cek hasil:**
```text
<class 'pandas.core.frame.DataFrame'>
(133, 8)
```

**Kalau error:** kalau muncul `FileNotFoundError`, pastikan `data.csv` sudah benar-benar terupload (cek panel Files di Colab) dan namanya persis `data.csv`, huruf kecil semua.

### 5. `head()` dan `tail()`

Buat cell baru:

```python
display(df.head())
```

**Cek hasil:** tabel 5 baris pertama, kolom `id_pesanan`, `tanggal`, `nama_produk`, `kategori`, `harga`, `jumlah`, `wilayah`, `modal` — baris pertama produk "Mouse" harga 150000, modal 95000.

Buat cell baru lagi:

```python
display(df.tail(3))
```

**Cek hasil:** 3 baris terakhir dataset (id_pesanan 1029, 1071, 1118).

### 6. `shape`

Buat cell baru:

```python
df.shape
```

**Cek hasil:**
```text
(133, 8)
```

133 baris, 8 kolom.

### 7. `df.info()`: Cek Struktur dan Tipe Data

Buat cell baru:

```python
df.info()
```

**Cek hasil:** muncul daftar 8 kolom lengkap dengan **Non-Null Count** dan **Dtype**. Perhatikan kolom `harga` cuma `127 non-null` (dari 133 baris) — berarti ada 6 baris kosong. Perhatikan juga kolom `tanggal` bertipe `object` (teks), bukan tanggal beneran. Kolom `modal` terisi penuh (`133 non-null`).

**Kalau error:** kalau semua kolom `Dtype`-nya `object`, kemungkinan CSV-nya kebaca dengan separator yang salah — cek lagi file `data.csv`-nya (harusnya dipisah koma, bukan titik koma).

### 8. `df.describe()`: Statistik Cepat

Buat cell baru:

```python
display(df.describe())
```

**Cek hasil:** tabel statistik buat kolom `id_pesanan`, `harga`, `jumlah`, `modal`. Perhatikan `harga`: `75%`-nya sekitar 168 ribu tapi `max`-nya 10,5 juta — ada nilai yang jauh melenceng dari kebanyakan data (sinyal outlier). Kolom `modal` juga ikut melonjak di baris yang sama (`max` 9,6 juta) — petunjuk awal kalau baris itu memang satu baris yang sama-sama janggal di kedua kolom.

### 9. Statistik Satu Angka

Buat cell baru:

```python
print("Harga termurah:", df["harga"].min())
print("Harga termahal:", df["harga"].max())
print("Rata-rata harga:", df["harga"].mean())
print("Median harga:", df["harga"].median())
print("Kuartil 1 (Q1):", df["harga"].quantile(0.25))
print("Kuartil 3 (Q3):", df["harga"].quantile(0.75))
print("Total jumlah barang terjual:", df["jumlah"].sum())
```

**Cek hasil:**
```text
Harga termurah: 13000.0
Harga termahal: 10500000.0
Rata-rata harga: 262795.2755905512
Median harga: 73000.0
Kuartil 1 (Q1): 40500.0
Kuartil 3 (Q3): 168000.0
Total jumlah barang terjual: 400
```

Bandingkan angka-angka ini dengan tabel `describe()` di Langkah 8 — semuanya cocok persis, cuma sekarang diambil satu-satu.

Sekarang cari **produk**-nya, bukan cuma angkanya. Buat cell baru:

```python
produk_termahal = df.loc[df["harga"].idxmax()]
produk_termurah = df.loc[df["harga"].idxmin()]

print("Produk termahal:")
print(produk_termahal[["nama_produk", "kategori", "harga"]])

print("\nProduk termurah:")
print(produk_termurah[["nama_produk", "kategori", "harga"]])
```

**Cek hasil:**
```text
Produk termahal:
nama_produk    Laptop Gaming (Bonus)
kategori                  Elektronik
harga                     10500000.0
Name: 55, dtype: object

Produk termurah:
nama_produk    Notebook Polos
kategori                 Buku
harga                 13000.0
Name: 21, dtype: object
```

Perhatikan: "produk termahal" ini adalah baris outlier yang sama yang sudah dicurigai lewat `describe()` di Langkah 8 (harga 10,5 juta, jauh di atas kebanyakan data). `.idxmax()` cuma mencari angka terbesar apa adanya — dia tidak tahu (dan tidak peduli) apakah angka itu outlier atau bukan. Ini alasan lain kenapa outlier perlu diselidiki dulu sebelum dipakai buat kesimpulan ("produk termahal" versi data mentah belum tentu benar-benar produk termahal di dunia nyata).

### 10. Cek Data Kosong: `isna().sum()`

Buat cell baru:

```python
display(df.isna().sum())
```

**Cek hasil:**
```text
id_pesanan     0
tanggal        0
nama_produk    0
kategori       0
harga          6
jumlah         0
wilayah        0
modal          0
dtype: int64
```

Cuma kolom `harga` yang punya data kosong, sejumlah 6.

**Kalau error:** kalau hasilnya semua `0` padahal `.info()` di Langkah 7 menunjukkan `harga` tidak 133 non-null, cek lagi apakah `df` yang dipakai sudah yang benar (bukan `df_manual` dari Langkah 3).

### 11. Cek Duplikat: `duplicated().sum()`

Buat cell baru:

```python
print(df.duplicated().sum())
```

**Cek hasil:**
```text
3
```

Ada 3 baris yang isinya sama persis dengan baris lain. Belum dihapus — cuma dicatat.

### 12. Memilih Satu Kolom

Buat cell baru:

```python
display(df["nama_produk"].head())
```

**Cek hasil:** Series berisi 5 nama produk pertama (Mouse, Mouse, Speaker Bluetooth, Novel Fiksi, Matras Yoga).

### 13. Memilih Beberapa Kolom

Buat cell baru:

```python
display(df[["nama_produk", "kategori", "harga"]].head())
```

**Cek hasil:** DataFrame 3 kolom, 5 baris pertama.

### 14. Filter Baris: Harga di Atas 100.000

Buat cell baru:

```python
produk_mahal = df[df["harga"] > 100000]
print(produk_mahal.shape)
display(produk_mahal.head())
```

**Cek hasil:** `(51, 8)` — dari 133 baris, 51 di antaranya harganya di atas 100.000. Baris pertama Mouse (150000) ikut masuk hasil filter.

**Kalau error:** kalau muncul error `TypeError` soal perbandingan `str` dan `int`, cek kolom `harga` — kemungkinan tipe datanya `object` (teks) bukan angka, biasanya karena CSV-nya salah baca. Cek ulang Langkah 7.

### 15. Feature Engineering: Kolom `nilai_penjualan`

Kolom `nilai_penjualan` belum ada di `data.csv` — dibuat sendiri dari dua kolom yang sudah ada. Ini contoh sederhana **feature engineering**: bikin kolom baru yang lebih berguna buat analisis, dari kolom-kolom mentah yang sudah ada.

Buat cell baru:

```python
df["nilai_penjualan"] = df["harga"] * df["jumlah"]
display(df[["nama_produk", "harga", "jumlah", "nilai_penjualan"]].head())
```

**Cek hasil:** kolom baru `nilai_penjualan` muncul, isinya hasil `harga * jumlah` tiap baris (misalnya Mouse: 150000 × 2 = 300000). Baris yang `harga`-nya kosong, `nilai_penjualan`-nya otomatis ikut kosong juga — masuk akal, karena tidak bisa dihitung dari data yang belum lengkap.

Ini persis operasi vectorized yang dipelajari di Langkah 1 (`angka * 2`), cuma sekarang diterapkan ke dua kolom DataFrame sekaligus, bukan satu array angka.

### 16. Menghitung Untung/Rugi per Transaksi

Sekarang gabungkan kolom `harga` dan `modal` (yang belum kepakai sejak dibaca dari CSV) buat cari tahu produk mana yang paling untung, dan produk mana yang malah rugi. Buat cell baru:

```python
df["untung"] = (df["harga"] - df["modal"]) * df["jumlah"]
display(df[["nama_produk", "harga", "modal", "jumlah", "untung"]].head())

produk_paling_untung = df.loc[df["untung"].idxmax()]
produk_paling_rugi = df.loc[df["untung"].idxmin()]

print("Produk paling untung:")
print(produk_paling_untung[["nama_produk", "kategori", "harga", "modal", "jumlah", "untung"]])

print("\nProduk paling rugi:")
print(produk_paling_rugi[["nama_produk", "kategori", "harga", "modal", "jumlah", "untung"]])

print("\nJumlah baris untung:", (df["untung"] > 0).sum())
print("Jumlah baris rugi:", (df["untung"] < 0).sum())
```

**Cek hasil:**
```text
Produk paling untung:
nama_produk    Sepatu Sneakers
kategori               Fashion
harga                8900000.0
modal                   245000
jumlah                       4
untung              34620000.0
Name: 40, dtype: object

Produk paling rugi:
nama_produk    Raket Badminton
kategori              Olahraga
harga                 268000.0
modal                   319000
jumlah                       3
untung               -153000.0
Name: 75, dtype: object

Jumlah baris untung: 124
Jumlah baris rugi: 3
```

- Baris "paling untung" ini adalah baris outlier lain yang sudah muncul juga di `describe()` (harga 8,9 juta) — untungnya jadi kelihatan raksasa bukan karena benar-benar untung sebesar itu, tapi karena harga di baris itu memang tidak wajar. Ini **bukan insight bisnis**, ini **tanda data perlu diperiksa lagi** — persis pesan dari sub-bab Data Understanding.
- Baris "paling rugi" (Raket Badminton, `untung` bernilai **negatif**) itu contoh yang lebih masuk akal: produk yang dijual dengan harga lebih rendah dari modalnya.
- 6 baris yang `harga`-nya kosong otomatis punya `untung` yang kosong juga (`NaN`) — makanya jumlah untung (124) + rugi (3) belum sampai 133.

### 17. Latihan Gabungan

Buat cell baru, kerjakan empat hal sekaligus:

```python
print("5 baris pertama:")
display(df.head())

print("\njumlah baris & kolom:", df.shape)

print("\nkolom numerik:")
print(df.select_dtypes(include="number").columns.tolist())

print("\nfilter kategori Buku:")
print(df[df["kategori"] == "Buku"].shape)
```

**Cek hasil:** 5 baris pertama tampil, `(133, 10)` (sudah termasuk `modal` dari awal, plus `nilai_penjualan` dari Langkah 15 dan `untung` dari Langkah 16), daftar kolom numerik (`id_pesanan`, `harga`, `jumlah`, `modal`, `nilai_penjualan`, `untung`), dan `(30, 10)` untuk jumlah baris kategori Buku.

### 18. (Bonus) Menggabungkan Dua Tabel dengan `merge()`

Buat cell baru:

```python
diskon_kategori = pd.DataFrame({
    "kategori": ["Elektronik", "Fashion", "Makanan", "Olahraga"],
    "diskon_persen": [10, 15, 5, 20],
})
display(diskon_kategori)

df_inner = pd.merge(df, diskon_kategori, on="kategori", how="inner")
print("INNER JOIN shape:", df_inner.shape)

df_gabung = pd.merge(df, diskon_kategori, on="kategori", how="left")
print("LEFT JOIN shape:", df_gabung.shape)
display(df_gabung[df_gabung["kategori"] == "Buku"][["nama_produk", "kategori", "diskon_persen"]].head(3))
```

**Cek hasil:** tabel `diskon_kategori` (4 baris) tampil. `INNER JOIN shape: (103, 11)` — 30 baris kategori Buku hilang karena tidak ada pasangannya di `diskon_kategori`. `LEFT JOIN shape: (133, 11)` — semua baris `df` tetap ada. Tabel baris Buku menunjukkan kolom `diskon_persen` isinya `NaN` — baris itu dipertahankan (bukti `left` join), cuma tidak dapat data diskon karena memang tidak ada.

**Kalau error:** kalau muncul `MergeError`, cek nama kolom `on="kategori"` sudah persis sama di kedua tabel (huruf besar/kecil, spasi).

### 19. (Bonus) Menyimpan Hasil ke File CSV Baru

Buat cell baru:

```python
df_gabung.to_csv("data_dengan_diskon.csv", index=False)
print("Tersimpan sebagai data_dengan_diskon.csv")
```

**Cek hasil:** muncul teks "Tersimpan sebagai data_dengan_diskon.csv". Cek panel Files di Colab (ikon folder, sebelah kiri) — ada file baru `data_dengan_diskon.csv`. Klik kanan file itu → Download kalau mau disimpan ke laptop sendiri (file di Colab cuma sementara, hilang kalau runtime terputus).

### Hasil Akhir Sesi Ini

Notebook `pertemuan-3.ipynb` berisi 20 cell: array NumPy, Series, DataFrame manual, baca CSV, inspeksi (`head`/`tail`/`shape`/`info`/`describe`), statistik satu angka (`min`/`max`/`mean`/`median`/`quantile`/`sum`), produk termahal/termurah (`idxmax`/`idxmin`), cek data kosong & duplikat, seleksi kolom, filter baris, bikin kolom baru (`nilai_penjualan`, `untung`) sampai cari produk paling untung/rugi, ditutup bonus menggabungkan tabel (`merge()`) dan menyimpan hasilnya ke CSV baru (`to_csv()`). Data yang dipakai (`data.csv`) sudah kelihatan beberapa "gejala" yang belum dibereskan: 6 harga kosong, 3 baris duplikat, kolom tanggal belum bertipe tanggal, dan ada outlier di kolom harga — semua itu jadi bahan pertemuan 4.

## Catatan AI

Contoh prompt yang baik: "Jelaskan perbedaan `df.isna().sum()` dan `df.dropna()`, dengan contoh dataset penjualan. Jangan berikan kode buat latihan mandiri saya." Verifikasi selalu jawaban AI dengan menjalankan kodenya sendiri di Colab — kalau outputnya beda dari yang diharapkan, itu tanda ada yang perlu dicek ulang, bukan langsung diikuti mentah-mentah.

## Latihan Mandiri

Pakai `data.csv` yang sama: tampilkan 5 baris pertama, hitung jumlah baris dan kolom, sebutkan kolom mana saja yang bertipe numerik, lalu filter data buat satu kategori pilihanmu sendiri (boleh selain "Buku").

## Rangkuman

NumPy efisien buat mengolah angka lewat operasi vectorized; Pandas membangun DataFrame dari situ buat bekerja dengan tabel. Sebelum data dianalisis, ada tahap **Data Understanding**: `head()`/`tail()`/`shape` buat bentuknya, `info()` buat struktur dan tipe data, `describe()` buat statistik cepat (plus versi satu-satunya lewat `min()`/`max()`/`mean()`/`median()`/`quantile()`/`sum()`), `isna().sum()` dan `duplicated().sum()` buat mengenali data kosong dan duplikat — semuanya sekadar **melihat**, belum **membereskan**. Setelah paham kondisinya, data bisa diseleksi (`df["kolom"]`), difilter (`df[df["harga"] > 100000]`), bahkan ditambah kolom baru hasil olahan (feature engineering ringan) — termasuk kolom `nilai_penjualan` dan `untung`, lalu dicari produk termahal/termurah dan paling untung/rugi lewat `.idxmax()`/`.idxmin()`. Sebagai bonus, dua tabel bisa digabung pakai `merge()` (`inner`/`left`/`right`/`outer` join), dan hasil olahan bisa disimpan jadi file CSV baru lewat `to_csv()`. Hari ini kita baru **melihat** kondisi data `data.csv` — sudah ketemu beberapa yang janggal (data kosong, duplikat, tanggal belum jadi tipe tanggal, outlier di harga). Minggu depan kita **bereskan** semua temuan itu (data cleaning) dan gali lebih dalam pakai `groupby` untuk mencari insight (EDA).

## Istilah Penting

| Istilah | Artinya |
|---|---|
| NumPy | Library Python buat mengolah angka secara efisien lewat array |
| Array | Struktur data NumPy, mendukung operasi vectorized |
| Vectorized | Operasi yang diterapkan ke seluruh elemen sekaligus, tanpa loop manual |
| Series | Struktur data Pandas buat satu kolom data berlabel |
| DataFrame | Struktur data Pandas buat tabel: kolom mewakili variabel, baris mewakili observasi |
| CSV | Format file teks buat tabel, nilai dipisah koma |
| Data Understanding | Tahap mengenali kondisi data (struktur, tipe, kekosongan, duplikat) sebelum dianalisis lebih jauh |
| Kuartil | Titik yang membagi data terurut jadi empat bagian sama besar — Q1 (`quantile(0.25)`) dan Q3 (`quantile(0.75)`) yang paling sering dipakai |
| Missing value | Nilai yang kosong/tidak terisi dalam suatu kolom |
| Duplikat | Baris yang isinya sama persis dengan baris lain |
| Outlier | Nilai yang jauh menyimpang dari kebanyakan data lain di kolom yang sama |
| Boolean filtering | Menyeleksi baris DataFrame berdasarkan kondisi `True`/`False` |
| Feature engineering | Membuat kolom baru yang lebih berguna dari kolom-kolom yang sudah ada |
| Modal | Biaya beli/produksi satu unit produk — dibandingkan dengan `harga` (harga jual) buat menghitung untung/rugi |
| Untung/Rugi | Selisih harga jual dan modal dikali jumlah; positif berarti untung, negatif berarti rugi |
| `idxmax()` / `idxmin()` | Mencari index baris dengan nilai terbesar/terkecil di suatu kolom, dipakai bareng `.loc[]` buat melihat baris lengkapnya |
| Join / `merge()` | Menggabungkan dua tabel jadi satu berdasarkan kolom kunci yang sama |
| Inner join | Join yang cuma menyisakan baris yang kuncinya ada di kedua tabel |
| Left/right join | Join yang mempertahankan semua baris dari satu tabel (kiri/kanan), sisanya diisi `NaN` kalau tidak ketemu pasangan |
| Outer join | Join yang menggabungkan semua baris dari kedua tabel, kosong diisi `NaN` |
