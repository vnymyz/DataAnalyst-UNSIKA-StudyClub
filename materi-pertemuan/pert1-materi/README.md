# Pertemuan 1 — Kenalan dengan Data Analyst & Python Dasar

**Durasi:** 19.30–21.00 WIB
**Tools:** Google Colab, Python 3
**Output:** Peserta dapat menjalankan notebook di Colab dan memakai variabel, tipe data, list, serta dictionary untuk menyimpan data sederhana.

## Cara Menjalankan Kode di Folder Ini

`pertemuan-1.ipynb` di folder ini adalah **hasil akhir** hands-on sesi ini. Buka lewat [colab.research.google.com](https://colab.research.google.com/) (`File > Upload notebook`, lalu pilih file ini) atau lewat Jupyter Notebook lokal kalau sudah terpasang. Kalau ikut kelas dari awal, jangan buka file ini dulu — ikuti bagian Hands-on di bawah dan buat notebook sendiri; file ini jadi jaring pengaman kalau tertinggal.

## Tujuan Belajar

- Memahami peran Data Analyst dan alur kerja dari data mentah sampai insight.
- Menggunakan Google Colab: membuat cell, menjalankan kode, membaca error sederhana.
- Menggunakan variabel, tipe data, `print()`, dan f-string.
- Mengambil input dari pengguna dengan `input()` dan mengubah tipe datanya (type casting).
- Menggunakan operator aritmatika dan perbandingan dasar.
- Menyimpan dan mengakses data dengan list dan dictionary.

## Rundown

| Waktu | Aktivitas |
|---|---|
| 19.30–19.40 | Pembukaan, ice breaking: "data apa yang paling sering kalian lihat hari ini?" |
| 19.40–19.50 | Teori: apa itu Data Analyst, alur kerja, contoh dashboard |
| 19.50–20.00 | Teori + hands-on: Google Colab, cell, run, error sederhana |
| 20.00–20.20 | Hands-on: variabel, print, f-string, input, type casting |
| 20.20–20.35 | Hands-on: operator, list, dictionary, indexing |
| 20.35–20.50 | Hands-on: latihan cepat dan kalkulator sederhana (penutup) |
| 20.50–21.00 | Rangkuman dan pengantar kuis 1 |

## Teori

### Apa itu Data Analyst?

Data Analyst adalah orang yang mengubah data mentah menjadi informasi yang bisa dipakai untuk mengambil keputusan. Bayangkan seorang detektif: data adalah kumpulan petunjuk berserakan, dan tugas Data Analyst adalah menyusun petunjuk itu jadi kesimpulan yang masuk akal.

- Data mentah sendirian biasanya belum berguna — ribuan baris angka penjualan tidak langsung menjawab apa-apa.
- Data Analyst mengolah data itu jadi **insight**: temuan yang punya makna, misalnya "penjualan kategori Fashion turun 20% bulan ini".
- Insight itu lalu dipakai orang lain (manajer, tim marketing) untuk mengambil keputusan.

> Slide visual: contoh dashboard sederhana (grafik batang penjualan per kategori) dengan anotasi "ini yang dilihat orang lain", di sebelahnya tabel data mentah dengan anotasi "ini yang diolah Data Analyst".

### Alur Kerja Data Analyst

Pekerjaan Data Analyst secara umum mengikuti alur yang sama, apapun datanya:

```text
Pertanyaan → Kumpulkan Data → Bersihkan → Analisis → Visualisasi → Rekomendasi
```

- **Pertanyaan** — semua berawal dari pertanyaan bisnis, misalnya "kategori produk mana yang paling laku bulan ini?"
- **Kumpulkan data** — mengambil data yang relevan, misalnya file CSV penjualan.
- **Bersihkan** — data mentah sering berantakan (ada yang kosong, salah ketik, duplikat) — dibersihkan dulu sebelum dipakai.
- **Analisis** — menghitung, mengelompokkan, mencari pola dalam data yang sudah bersih.
- **Visualisasi** — mengubah angka jadi grafik supaya gampang dipahami orang lain.
- **Rekomendasi** — menyimpulkan apa yang sebaiknya dilakukan berdasarkan hasil analisis.

Kode (Python, dan nanti Pandas/NumPy) adalah **alat** untuk menjalankan alur ini — bukan tujuan akhirnya. Tujuannya selalu menjawab pertanyaan bisnis.

> Slide visual: diagram alur 6 kotak di atas, dengan ikon sederhana di tiap tahap (kaca pembesar untuk "kumpulkan", sapu untuk "bersihkan", dst).

### Apa itu Google Colab?

**Google Colab** adalah tempat menulis dan menjalankan kode Python langsung dari browser, gratis, tanpa perlu instalasi apa pun di laptop. Semua kode berjalan di server Google, hasilnya ditampilkan balik ke browser kita.

- Analoginya seperti Google Docs, tapi isinya kode, bukan tulisan — bisa dibuka dari laptop mana saja asal ada akun Google dan internet.
- Colab menyimpan kerjaan otomatis ke Google Drive.
- Karena tidak perlu instalasi, Colab dipakai dari pertemuan 1 sampai 5 supaya semua peserta bisa langsung praktik tanpa hambatan setup.

### Cell: Blok Kode di Colab

Notebook Colab tersusun dari **cell** — kotak-kotak kecil yang masing-masing bisa diisi kode atau teks.

- **Code cell** — tempat menulis kode Python, dijalankan dengan tombol ▶ di sebelah kiri cell, atau shortcut `Shift + Enter`.
- **Text cell** — tempat menulis catatan/penjelasan dalam format Markdown, tidak dieksekusi sebagai kode.
- Cell dijalankan **satu per satu**, urutannya bisa diatur bebas — tapi hasil dari cell sebelumnya tetap "diingat" notebook selama sesi masih berjalan (disebut runtime).

```python
# Ini komentar, tidak dieksekusi sebagai kode
print("Halo, Data Analyst!")
```

- `#` di awal baris membuat baris itu jadi **komentar** — catatan untuk manusia, diabaikan Python saat dijalankan.
- `print(...)` menampilkan teks/nilai ke layar output, tepat di bawah cell.

### Membaca Error Sederhana

Error itu wajar dan sering terjadi — bagian penting belajar coding adalah belajar membaca pesan error, bukan menghindarinya.

```python
print(nama_pelanggan)
```

```text
NameError: name 'nama_pelanggan' is not defined
```

- Python membaca kode dari atas ke bawah. Kalau memakai variabel yang belum pernah dibuat, muncul `NameError`.
- Pesan error di Colab biasanya menyebutkan **jenis error** (`NameError`, `SyntaxError`, dst) dan **baris berapa** masalahnya — baca pesan itu dulu sebelum panik atau bertanya ke orang lain.

> Slide visual: tangkapan layar pesan error Colab dengan anotasi panah menunjuk ke jenis error dan nomor baris.

### Variabel dan Tipe Data

Variabel adalah nama yang dipakai untuk menyimpan sebuah nilai, supaya nilai itu bisa dipanggil lagi tanpa menulis ulang.

```python
nama = "Alya"
jumlah_pesanan = 25
rata_rata_nilai = 87.5
aktif = True
```

Empat tipe data dasar di Python:

| Tipe | Contoh | Keterangan |
|---|---|---|
| `str` | `"Alya"` | Teks, diapit tanda kutip |
| `int` | `25` | Bilangan bulat |
| `float` | `87.5` | Bilangan desimal |
| `bool` | `True` / `False` | Benar atau salah |

Cek tipe data sebuah variabel dengan `type(nama_variabel)`. Ini berguna banget nanti saat data dari file CSV ternyata bertipe beda dari yang diharapkan (misalnya angka yang terbaca sebagai teks).

### print() dan f-string

`print()` menampilkan nilai ke layar. Untuk menggabungkan teks dan variabel dalam satu kalimat, cara paling praktis adalah **f-string**.

```python
nama = "Alya"
jumlah_pesanan = 25

print(f"{nama} memiliki {jumlah_pesanan} pesanan.")
```

- Huruf `f` sebelum tanda kutip menandai string itu sebagai f-string.
- Bagian di dalam `{ }` otomatis diganti dengan nilai variabelnya saat dijalankan.
- Tanpa f-string, harus digabung manual pakai `+` dan konversi tipe data secara eksplisit — jauh lebih ribet, terutama kalau variabelnya bukan teks.

### Mengambil Input dari Pengguna (`input()`)

`input()` dipakai buat nanya sesuatu ke orang yang menjalankan program, kayak kasir nanya nama pembeli.

```python
nama = input("Siapa nama kamu? ")
print(f"Halo, {nama}! Selamat datang.")
```

- Program berhenti sebentar nunggu diketik, lalu lanjut setelah Enter.
- Jawabannya masuk ke variabel `nama`.
- Hasil `input()` **selalu `str`**, walau yang diketik angka. Ini penting buat sub-bab berikutnya.

### Mengubah Tipe Data (Type Casting)

Karena `input()` selalu `str`, kalau mau dihitung sebagai angka harus diubah dulu tipenya — disebut **type casting**.

```python
umur = int(input("Umur kamu berapa? "))
tahun_lahir = 2026 - umur
print(f"Kamu kemungkinan lahir tahun {tahun_lahir}.")
```

- `int()` ubah ke bilangan bulat, `float()` ke desimal, `str()` balik ke teks.
- Lupa `int()` → error `TypeError`, Python nggak bisa ngurangin angka dengan teks.
- Jebakan umum: `"20" + "5"` hasilnya `"205"` (nyambung teks), bukan `25`.

### Operator Dasar

Operator dipakai untuk melakukan operasi terhadap nilai/variabel.

```python
harga = 50000
jumlah = 3
total = harga * jumlah      # 150000, operator aritmatika
diskon_berlaku = total > 100000   # True, operator perbandingan
```

- Operator aritmatika: `+` `-` `*` `/` seperti matematika biasa, dengan urutan operasi yang sama (perkalian/pembagian dikerjakan lebih dulu daripada penjumlahan/pengurangan).
- Operator perbandingan: `>` `<` `>=` `<=` `==` `!=` menghasilkan `True` atau `False` — nanti dipakai untuk mengambil keputusan (dipelajari lebih lanjut pertemuan 2).

### List: Menyimpan Data Berurutan

**List** dipakai untuk menyimpan sekumpulan data yang urutannya penting, semuanya biasanya sejenis.

```python
kategori = ["Elektronik", "Fashion", "Makanan"]

print(kategori[0])   # "Elektronik"
print(kategori[1])   # "Fashion"
```

- List ditulis dengan tanda kurung siku `[ ]`, tiap item dipisah koma.
- Tiap item punya **posisi/index**, dimulai dari `0` (bukan `1`) — jadi `kategori[0]` adalah item pertama, `kategori[1]` item kedua, dan seterusnya.
- Analoginya seperti rak sepatu bernomor: rak nomor 0 berisi barang pertama, bukan rak nomor 1.
- Bonus: `kategori[-1]` = item terakhir. Index negatif dihitung dari belakang.

> Slide visual: ilustrasi rak dengan 3 kotak berlabel index 0, 1, 2 berisi "Elektronik", "Fashion", "Makanan".

### Dictionary: Menyimpan Data Berpasangan

**Dictionary** dipakai untuk menyimpan data yang setiap nilainya punya nama/label sendiri (disebut **key**), bukan sekadar urutan.

```python
produk = {"nama": "Headset", "harga": 250000, "stok": 12}

print(produk["nama"])    # "Headset"
print(produk["harga"])   # 250000
```

- Dictionary ditulis dengan kurung kurawal `{ }`, tiap pasangan ditulis `key: value`.
- Mengambil nilai dilakukan lewat nama key-nya, bukan lewat posisi angka seperti list: `produk["harga"]`, bukan `produk[1]`.
- Analoginya seperti KTP: tiap kolom punya label jelas ("Nama", "Alamat"), kita ambil datanya berdasarkan label itu, bukan berdasarkan urutan kolom ke berapa.

### Kapan Pakai List, Kapan Pakai Dictionary?

- Pakai **list** kalau data berupa kumpulan hal sejenis dan urutannya penting — misalnya daftar nama kategori, daftar harga.
- Pakai **dictionary** kalau satu data punya beberapa atribut berbeda yang masing-masing perlu nama jelas — misalnya satu produk dengan nama, harga, dan stok.
- Nanti di pertemuan 3, kita akan lihat bahwa tabel data (DataFrame di Pandas) sebenarnya gabungan dari ide list dan dictionary ini dalam skala besar.

## Hands-on: Langkah demi Langkah

### Langkah 1 — Membuat Notebook Baru di Colab

1. Buka [colab.research.google.com](https://colab.research.google.com/), login pakai akun Google.
2. Klik **File > New notebook**.
3. Ganti nama notebook (klik judul "Untitled0.ipynb" di kiri atas) menjadi `pertemuan-1.ipynb`.

**Cek hasil:** notebook kosong terbuka dengan satu code cell kosong, judul sudah berubah sesuai yang diketik.

**Kalau error:** kalau diminta login/verifikasi akun Google, ikuti saja prosesnya — ini normal untuk akun baru.

### Langkah 2 — Cell Pertama: Komentar dan print()

1. Di code cell pertama, ketik:

```python
# Ini adalah notebook pertama saya di Data Analyst UNSIKA
print("Halo, Data Analyst!")
```

2. Jalankan cell dengan `Shift + Enter` (atau klik tombol ▶ di kiri cell).

**Cek hasil:** muncul teks `Halo, Data Analyst!` di bawah cell. Baris komentar tidak ikut tampil di output.

### Langkah 3 — Mencoba Error dengan Sengaja

1. Buat cell baru (klik `+ Code` di toolbar atas atau bawah cell terakhir).
2. Ketik dan jalankan:

```python
print(nama_pelanggan)
```

**Cek hasil:** muncul error berwarna merah `NameError: name 'nama_pelanggan' is not defined`.

**Kalau error (memang disengaja!):** baca pesan errornya — itu memberitahu bahwa variabel `nama_pelanggan` belum pernah dibuat. Ini contoh kenapa Python selalu perlu variabel didefinisikan dulu sebelum dipakai.

3. Perbaiki dengan menambahkan baris definisi sebelum `print`:

```python
nama_pelanggan = "Alya"
print(nama_pelanggan)
```

**Cek hasil:** kali ini output menampilkan `Alya`, tanpa error.

### Langkah 4 — Variabel, Tipe Data, dan f-string

Buat cell baru, ketik:

```python
nama = "Bima"
jurusan = "Sistem Informasi"
semester = 3

print(f"Saya {nama}, mahasiswa {jurusan} semester {semester}.")
```

Jalankan cell.

**Cek hasil:**
```text
Saya Bima, mahasiswa Sistem Informasi semester 3.
```

### Langkah 5 — Menyapa Pengguna dengan `input()`

Buat cell baru, ketik:

```python
nama_pengguna = input("Siapa nama kamu? ")
print(f"Halo, {nama_pengguna}! Selamat datang di Data Analyst UNSIKA.")
```

Jalankan cell — akan muncul kotak isian di bawah cell, ketik nama kamu, lalu tekan Enter.

**Cek hasil:** setelah Enter, muncul kalimat sapaan dengan nama yang tadi diketik, misalnya:
```text
Siapa nama kamu? Bima
Halo, Bima! Selamat datang di Data Analyst UNSIKA.
```

**Kalau error:** kalau cell terlihat "menggantung" (ada tanda `[*]` terus tanpa output), itu bukan error — Colab sedang **menunggu** kamu mengetik jawaban di kotak yang muncul. Ketik jawabannya lalu tekan Enter.

### Langkah 6 — Menghitung dari Input (Type Casting)

Buat cell baru, ketik:

```python
umur_teks = input("Umur kamu berapa? ")
umur = int(umur_teks)

tahun_lahir = 2026 - umur
print(f"Kamu kemungkinan lahir tahun {tahun_lahir}.")
```

Jalankan, ketik angka umur (misalnya `20`), tekan Enter.

**Cek hasil:**
```text
Umur kamu berapa? 20
Kamu kemungkinan lahir tahun 2006.
```

**Kalau error:** kalau muncul `TypeError: unsupported operand type(s) for -: 'int' and 'str'`, cek lagi apakah baris `umur = int(umur_teks)` sudah ditulis — tanpa itu, `umur_teks` masih berupa `str` dan tidak bisa dikurangkan dari angka.

### Langkah 7 — Mengecek Tipe Data

Buat cell baru:

```python
print(type(nama))
print(type(semester))
print(type(87.5))
print(type(True))
```

**Cek hasil:**
```text
<class 'str'>
<class 'int'>
<class 'float'>
<class 'bool'>
```

### Langkah 8 — Operator Aritmatika dan Perbandingan

Buat cell baru:

```python
harga = 50000
jumlah = 3
total = harga * jumlah

print(f"Total harga: {total}")
print(total > 100000)
```

**Cek hasil:**
```text
Total harga: 150000
True
```

### Langkah 9 — Membuat List Kategori Produk

Buat cell baru:

```python
kategori = ["Elektronik", "Fashion", "Makanan", "Buku", "Olahraga"]

print(kategori[0])
print(kategori[2])
```

**Cek hasil:**
```text
Elektronik
Makanan
```

**Kalau error:** kalau muncul `IndexError: list index out of range`, biasanya karena angka index yang diminta lebih besar dari jumlah item di list — ingat, index dimulai dari 0.

### Langkah 10 — Membuat Dictionary Produk

Buat cell baru:

```python
produk = {"nama": "Mouse", "harga": 150000, "stok": 10}

print(produk["nama"])
print(produk["harga"])
```

**Cek hasil:**
```text
Mouse
150000
```

### Langkah 11 — Mengubah Nilai di Dictionary

Buat cell baru:

```python
produk["stok"] -= 2
print(produk)
```

**Cek hasil:**
```text
{'nama': 'Mouse', 'harga': 150000, 'stok': 8}
```

`produk["stok"] -= 2` artinya "ambil nilai stok sekarang, kurangi 2, simpan lagi ke stok" — bentuk singkat dari `produk["stok"] = produk["stok"] - 2`.

### Langkah 12 — Latihan Gabungan: Tiga Data Produk

Buat cell baru, simpan tiga data produk berbeda dalam tiga dictionary terpisah, lalu tampilkan nama dan harganya:

```python
produk_1 = {"nama": "Headset", "harga": 250000, "stok": 12}
produk_2 = {"nama": "Mouse", "harga": 150000, "stok": 10}
produk_3 = {"nama": "Keyboard", "harga": 300000, "stok": 5}

print(f"{produk_1['nama']} - Rp {produk_1['harga']}")
print(f"{produk_2['nama']} - Rp {produk_2['harga']}")
print(f"{produk_3['nama']} - Rp {produk_3['harga']}")
```

**Cek hasil:**
```text
Headset - Rp 250000
Mouse - Rp 150000
Keyboard - Rp 300000
```

**Kalau error:** kalau muncul `SyntaxError` di baris f-string, cek tanda kutip di dalam `{ }` — karena f-string-nya sendiri pakai kutip ganda `" "`, bagian di dalam `{ }` harus pakai kutip tunggal `' '` (seperti `produk_1['nama']`), supaya Python tidak bingung tanda kutip mana yang menutup string.

### Langkah 13 — Coba Sendiri

Buat cell kosong. Minta 2 angka lewat `input()`, jadikan `int`, jumlahkan, print pakai f-string. Tebak dulu hasilnya sebelum run.

**Cek hasil:** masukin `4` dan `5` harus keluar `9`, bukan `45` (kalau `45` berarti lupa `int()`).

### Langkah 14 — Kalkulator dari Input (Penutup)

Gabungan input + casting + operator + f-string. Buat cell baru, ketik:

```python
angka1 = float(input("Masukkan angka pertama: "))
angka2 = float(input("Masukkan angka kedua: "))

print(f"Penjumlahan: {angka1 + angka2}")
print(f"Pengurangan: {angka1 - angka2}")
print(f"Perkalian: {angka1 * angka2}")
print(f"Pembagian: {angka1 / angka2}")
```

Jalankan, masukkan dua angka (misalnya `10` dan `4`).

**Cek hasil:**
```text
Masukkan angka pertama: 10
Masukkan angka kedua: 4
Penjumlahan: 14.0
Pengurangan: 6.0
Perkalian: 40.0
Pembagian: 2.5
```

**Kalau error:** kalau muncul `ZeroDivisionError`, itu karena angka kedua diisi `0` — pembagian dengan nol memang tidak bisa dihitung, ini wajar dan akan dibahas cara menanganinya lebih lanjut nanti.

### Hasil Akhir Sesi Ini

Notebook `pertemuan-1.ipynb` berisi 14 cell: print, error, variabel/f-string, input, type casting, list, dictionary, sampai kalkulator dari input. Semua masih variabel lepas, belum baca file CSV beneran — itu baru mulai pertemuan 3.

## Catatan AI

Contoh prompt yang baik: "Jelaskan perbedaan list dan dictionary dengan contoh data penjualan sederhana. Jangan berikan jawaban latihan saya." Verifikasi selalu jawaban AI dengan menjalankan kodenya sendiri di Colab — jangan langsung percaya sebelum dicoba.

## Latihan Mandiri

Simpan tiga data produk dalam dictionary (nama, harga, stok), lalu tampilkan nama produk dan harga memakai f-string. Kerjakan di Colab, lalu minta teman mengecek apakah outputnya sudah masuk akal.

## Rangkuman

Data Analyst mengikuti alur pertanyaan → kumpulkan data → bersihkan → analisis → visualisasi → rekomendasi, dengan Python sebagai alat bantu, bukan tujuan akhir. Python menyimpan data dalam variabel; `input()` mengambil data dari pengguna (selalu bertipe `str`, perlu di-casting ke `int`/`float` untuk dihitung); list dipakai untuk urutan data, dictionary dipakai untuk pasangan `key: value`. Minggu depan kita membuat program yang bisa mengambil keputusan sendiri (`if`/`else`) dan mengulang pekerjaan (`for`/`while`).

## Istilah Penting

| Istilah | Artinya |
|---|---|
| Data Analyst | Orang yang mengubah data mentah menjadi insight untuk pengambilan keputusan |
| Insight | Temuan bermakna hasil olahan data, bukan sekadar angka mentah |
| Google Colab | Layanan notebook Python berbasis browser dari Google, tanpa instalasi |
| Cell | Blok kode atau teks di dalam notebook Colab |
| Variabel | Nama yang dipakai untuk menyimpan sebuah nilai |
| f-string | Cara menyisipkan variabel ke dalam teks memakai `f"..."` dan `{}` |
| `input()` | Function untuk mengambil data yang diketik pengguna, hasilnya selalu bertipe `str` |
| Type casting | Mengubah tipe data suatu nilai, misalnya `str` ke `int` lewat `int(nilai)` |
| List | Struktur data untuk kumpulan nilai berurutan |
| Dictionary | Struktur data untuk pasangan key-value bernama |
