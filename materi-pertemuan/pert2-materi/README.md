# Pertemuan 2 — Logika, Perulangan, dan Function

**Durasi:** 19.30–21.00 WIB
**Tools:** Google Colab, Python 3
**Output:** Peserta dapat membuat program yang mengambil keputusan sendiri (`if`), mengulang pekerjaan (`for`/`while`), dan membungkus kode berulang jadi function yang bisa dipakai lagi.

## Cara Menjalankan Kode di Folder Ini

`pertemuan-2.ipynb` di folder ini adalah **hasil akhir** hands-on sesi ini. Buka lewat [colab.research.google.com](https://colab.research.google.com/) (`File > Upload notebook`, lalu pilih file ini) atau lewat Jupyter Notebook lokal kalau sudah terpasang. Kalau ikut kelas dari awal, jangan buka file ini dulu — ikuti bagian Hands-on di bawah dan lanjutkan notebook `pertemuan-1.ipynb` milikmu sendiri; file ini jadi jaring pengaman kalau tertinggal.

## Tujuan Belajar

- Menggunakan `if`/`elif`/`else` untuk mengambil keputusan.
- Menggunakan operator logika `and`, `or`, `not` untuk mengecek beberapa syarat sekaligus.
- Menggunakan `for` dan `while` secara tepat, termasuk `range()`, `enumerate()`, `break`, dan `continue`.
- Membuat function dengan parameter, nilai default, dan `return`.
- Menulis list comprehension sebagai bentuk ringkas dari `for` yang sudah dipahami.
- Mengenal konsep class/object sebagai pengantar OOP.

## Rundown

| Waktu | Aktivitas |
|---|---|
| 19.30–19.40 | Review dan bedah satu jawaban kuis |
| 19.40–20.05 | Conditional dengan kasus diskon toko |
| 20.05–20.30 | `for`, `while`, `range`, dan `enumerate` |
| 20.30–20.50 | Function, parameter, `return`, latihan |
| 20.50–20.55 | Wawasan OOP: class dan object |
| 20.55–21.00 | Rangkuman dan kuis 2 |

## Teori

### Dari Data ke Keputusan

Sejauh ini di pertemuan 1, program kita cuma menjalankan kode dari atas ke bawah tanpa memilih apa-apa — apa pun datanya, alurnya selalu sama. Padahal program yang berguna biasanya perlu **mengambil keputusan**: kasir perlu tahu apakah pembeli dapat diskon atau tidak, sistem perlu tahu apakah stok masih ada atau habis.

- Operator perbandingan yang sudah dipelajari (`>`, `<`, `>=`, `<=`, `==`, `!=`) menghasilkan `True` atau `False`.
- `True`/`False` inilah yang dipakai program untuk memutuskan jalur mana yang dijalankan — disebut **conditional**.
- Bayangkan lampu lalu lintas: programnya sama, tapi jalur yang diambil beda tergantung warna lampu saat itu.

### `if` dan `else`: Dua Jalur

**`if`** menjalankan sebuah blok kode hanya kalau kondisinya `True`. **`else`** menampung jalur satunya, kalau kondisinya `False`.

```python
stok = 0
if stok > 0:
    print("Barang tersedia")
else:
    print("Stok habis")
```

- Baris di dalam `if`/`else` harus **menjorok ke dalam** (indentasi) — dibahas lebih detail di sub-bab berikutnya.
- Kalau cuma ada `if` tanpa `else`, program tetap jalan seperti biasa saat kondisinya `False`, cuma blok `if`-nya dilewati.
- Analoginya seperti pintu otomatis: kalau ada orang (`True`) pintu terbuka, kalau tidak (`False`) pintu tetap tertutup — tidak ada jalur ketiga.

### `if`/`elif`/`else`: Banyak Jalur

Kalau pilihannya lebih dari dua, tambahkan **`elif`** (singkatan dari "else if") di antara `if` dan `else`.

```python
total_belanja = 175000
if total_belanja >= 200000:
    diskon = 0.15
elif total_belanja >= 100000:
    diskon = 0.10
else:
    diskon = 0

print(f"Diskon: {diskon:.0%}")
```

- Python mengecek dari atas: `if` dulu, kalau `False` baru cek `elif` berikutnya, begitu seterusnya sampai ada yang `True` atau sampai jatuh ke `else`.
- `elif` boleh ditulis berkali-kali, tapi `else` di paling akhir maksimal satu dan sifatnya opsional.
- Begitu satu kondisi ketemu `True`, sisanya otomatis dilewati — tidak dicek lagi meski sebenarnya juga `True`.

> Slide visual: diagram alur (flowchart) kotak `if` → panah "False" ke `elif` → panah "False" ke `else`, tiap kotak kondisi bercabang ke kotak hasil.

### Indentasi: Aturan Main Python

Python **tidak pakai** kurung kurawal `{ }` untuk menandai isi sebuah blok kode seperti banyak bahasa lain — Python pakai **indentasi** (spasi di awal baris).

```python
if total_belanja >= 100000:
    diskon = 0.10
    print("Selamat, dapat diskon!")
print("Transaksi selesai")
```

- Baris `diskon = 0.10` dan `print("Selamat...")` sama-sama menjorok — keduanya **bagian dari** blok `if`.
- Baris terakhir `print("Transaksi selesai")` tidak menjorok — artinya dia **selalu** jalan, di luar blok `if`.
- Indentasi yang tidak konsisten (misalnya campur tab dan spasi, atau lupa menjorok) menghasilkan `IndentationError`.
- Jebakan umum lain: menulis `if nilai = 80:` (satu sama dengan) padahal maksudnya membandingkan, bukan mengisi nilai. Tanda `=` itu untuk **menyimpan** nilai, tanda `==` untuk **membandingkan** — keduanya beda tombol, beda arti, dan sering tertukar bahkan oleh yang sudah lama coding.

### Operator Logika: `and`, `or`, `not`

Kadang satu kondisi saja tidak cukup — perlu mengecek **beberapa syarat sekaligus**. Di sinilah operator logika dipakai.

```python
member = True
total_belanja = 120000

if member and total_belanja >= 100000:
    print("Dapat promo member!")
```

| Operator | Artinya | Hasil `True` kalau |
|---|---|---|
| `and` | DAN | kedua kondisi `True` |
| `or` | ATAU | salah satu (atau keduanya) `True` |
| `not` | KEBALIKAN | membalik `True` jadi `False`, atau sebaliknya |

- Analoginya seperti syarat promo di kasir: "member **dan** belanja minimal 100rb" — dua-duanya harus terpenuhi, kalau cuma satu tetap tidak dapat promo.
- `or` lebih longgar: "member **atau** belanja minimal 200rb" — cukup salah satu saja.
- `not member` berarti "bukan member" — membalik nilai `True`/`False` yang ada.

### Kenapa Perlu Loop?

Bayangkan mau menampilkan 100 nama kategori produk satu per satu pakai `print()` — menulis 100 baris `print()` jelas tidak masuk akal. **Loop** (perulangan) memungkinkan satu blok kode dijalankan berkali-kali tanpa menulis ulang.

- List dari pertemuan 1 (`kategori = ["Elektronik", "Fashion", "Makanan"]`) jadi jauh lebih berguna kalau bisa "dijalani" satu per satu secara otomatis, bukan diambil manual lewat index satu-satu (`kategori[0]`, `kategori[1]`, ...).
- Python punya dua jenis loop utama: `for` dan `while`, dipakai di situasi yang berbeda.

### `for` dan `range()`

**`for`** dipakai ketika jumlah perulangan sudah pasti — misalnya sebanyak jumlah item dalam list.

```python
kategori = ["Elektronik", "Fashion", "Makanan"]
for nama in kategori:
    print(nama)
```

- `for nama in kategori` artinya "untuk setiap item di dalam `kategori`, sebut sementara namanya `nama`, lalu jalankan bloknya".
- Kalau cuma butuh angka berurutan (bukan isi list), pakai `range()`.

```python
for i in range(1, 5):
    print(i)
```

- `range(1, 5)` menghasilkan angka `1, 2, 3, 4` — **berhenti sebelum** angka batas atas (`5` tidak ikut). Ini jebakan umum: dikira sampai `5`, ternyata cuma sampai `4`.
- `range(5)` (satu argumen saja) sama dengan `range(0, 5)` — mulai dari `0`.

### `enumerate()`: Loop Sambil Bawa Nomor Urut

Kadang selain isi datanya, kita juga butuh **nomor urutnya** saat loop — misalnya menampilkan "Hari ke berapa" untuk tiap data penjualan.

```python
penjualan = [120, 80, 150]
for nomor, nilai in enumerate(penjualan, start=1):
    print(f"Hari {nomor}: {nilai} transaksi")
```

- `enumerate(penjualan, start=1)` menghasilkan pasangan `(nomor, nilai)` untuk tiap item — nomornya mulai dari `1` karena ada `start=1`.
- Tanpa `start=1`, `enumerate()` mulai menghitung dari `0` (default).
- Ini menghindari cara manual yang lebih ribet (bikin variabel counter sendiri, `+= 1` setiap iterasi).

### Akumulasi dalam Loop

Pola yang sangat sering dipakai: menjumlahkan semua nilai dalam list jadi satu total, sambil loop berjalan.

```python
penjualan = [120000, 85000, 200000]
total = 0
for nilai in penjualan:
    total += nilai

print(f"Total penjualan: {total}")
```

- `total = 0` disiapkan **sebelum** loop dimulai — ini disebut nilai awal (initial value).
- `total += nilai` artinya "ambil `total` sekarang, tambahkan `nilai`, simpan lagi ke `total`" — bentuk singkat dari `total = total + nilai`.
- Pola "siapkan nilai awal → loop → update tiap iterasi" ini adalah dasar dari yang nanti disebut **agregasi** (menjumlahkan, merata-rata, dst) saat mengolah data beneran dengan Pandas di pertemuan 4 — bedanya nanti Pandas sudah punya fungsi siap pakai, tapi konsepnya identik.

### `while`: Ulang Selama Kondisi Masih Benar

**`while`** cocok saat jumlah perulangan **belum pasti** dari awal — loop terus berjalan selama kondisinya masih `True`.

```python
target = 500000
total_terkumpul = 0
hari = 0

while total_terkumpul < target:
    total_terkumpul += 100000
    hari += 1

print(f"Target tercapai dalam {hari} hari")
```

- Setiap kali sebelum menjalankan blok, Python cek dulu kondisinya — kalau masih `True`, jalankan lagi; kalau sudah `False`, berhenti.
- **Jebakan besar:** kalau di dalam loop lupa mengubah nilai yang dicek (di contoh ini `total_terkumpul`), kondisinya tidak akan pernah jadi `False` — program terjebak jalan selamanya, disebut **infinite loop**.
- Kalau ini terjadi di Colab, cell akan terus menampilkan `[*]` tanpa selesai — hentikan manual lewat tombol stop (kotak) di sebelah cell.

### `break` dan `continue`

Dua kata kunci ini mengatur alur di dalam loop tanpa harus mengubah kondisinya:

```python
stok = [5, 3, 0, 8]
for jumlah in stok:
    if jumlah == 0:
        break
    print(f"Sisa stok: {jumlah}")
```

```python
penjualan = [120000, 0, 95000, 0, 200000]
for nilai in penjualan:
    if nilai == 0:
        continue
    print(f"Transaksi: {nilai}")
```

- **`break`** langsung **menghentikan seluruh loop**, sisa item tidak diproses sama sekali — dipakai di contoh pertama begitu ketemu stok `0`.
- **`continue`** cuma **melewati iterasi saat itu**, lalu lanjut ke item berikutnya — loop tetap jalan sampai selesai, dipakai di contoh kedua untuk melewati data penjualan kosong (`0`).
- Ini nanti sangat berguna saat data cleaning di pertemuan 4 — data mentah sering punya baris kosong atau tidak valid yang perlu dilewati, bukan menghentikan seluruh proses.

### Function: `def`, Parameter, dan `return`

**Function** adalah blok kode yang diberi nama, bisa dipanggil ulang kapan pun tanpa menulis ulang isinya — analoginya seperti mesin: masukkan bahan (parameter), mesin memproses, keluar hasil (`return`).

```python
def hitung_total(harga, jumlah):
    return harga * jumlah

hasil = hitung_total(15000, 3)
print(hasil)
```

- `def nama_function(parameter):` mendefinisikan function baru — belum dijalankan sampai **dipanggil**.
- `harga` dan `jumlah` adalah **parameter** — nilai yang "dimasukkan" saat function dipanggil.
- `return` mengirim hasil keluar dari function, supaya bisa disimpan ke variabel (`hasil`) dan dipakai lagi di tempat lain.
- Function yang sama bisa dipanggil berkali-kali dengan nilai berbeda-beda, tanpa menulis ulang logikanya.

### Default Parameter dan `print()` vs `return`

Parameter bisa diberi **nilai default**, dipakai otomatis kalau saat pemanggilan nilainya tidak diisi.

```python
def hitung_diskon(total, persen=0.10):
    return total * persen

print(hitung_diskon(200000))          # pakai default: 0.10
print(hitung_diskon(200000, 0.20))    # override jadi 0.20
```

- `persen=0.10` di definisi function berarti "kalau saat dipanggil `persen` tidak diisi, anggap saja `0.10`".
- Ini beda dari `print()` yang cuma **menampilkan** nilai ke layar — hasilnya tidak bisa disimpan atau dipakai lagi.
- `return` **mengirim** nilai keluar dari function sehingga bisa ditampung variabel, dihitung lebih lanjut, atau dipakai sebagai bahan function lain.
- Function tanpa `return` otomatis menghasilkan `None` kalau hasilnya coba disimpan ke variabel — pengingat bahwa `print()` dan `return` bukan hal yang sama.

### List Comprehension: Bentuk Ringkas dari `for`

Kalau isi sebuah loop hanya untuk membuat list baru dari list yang sudah ada, Python punya bentuk yang lebih ringkas: **list comprehension**.

```python
penjualan = [120000, 85000, 200000]

# Cara biasa dengan for
hasil_pajak = []
for nilai in penjualan:
    hasil_pajak.append(nilai * 1.11)

# Cara ringkas dengan list comprehension
hasil_pajak = [nilai * 1.11 for nilai in penjualan]
```

- Polanya: `[ekspresi for item in list_asal]` — baca dari kiri ke kanan: "buat list baru berisi `ekspresi`, untuk tiap `item` di `list_asal`".
- Hasilnya identik dengan loop biasa di atasnya, cuma ditulis dalam satu baris.
- Berguna untuk transformasi sederhana; kalau logikanya sudah rumit (banyak `if`/`elif`, banyak baris), loop biasa yang ditulis panjang biasanya lebih gampang dibaca — list comprehension bukan keharusan, cuma alternatif yang lebih ringkas.

### Sekilas OOP: Class dan Object

**OOP** (Object-Oriented Programming) cukup dikenalkan sebagai pola berpikir dulu — dibahas lebih dalam di materi lanjutan lain, bukan fokus pertemuan ini.

```python
class Produk:
    def __init__(self, nama, harga):
        self.nama = nama
        self.harga = harga

    def info(self):
        return f"{self.nama} - Rp {self.harga}"

produk1 = Produk("Headset", 250000)
print(produk1.info())
```

- **`class`** adalah cetakan/blueprint untuk membuat **object**. `Produk` di atas adalah cetakannya.
- `produk1 = Produk("Headset", 250000)` membuat satu **object** nyata dari cetakan itu — bisa dibuat berkali-kali dengan data berbeda (`produk2 = Produk("Mouse", 150000)`, dst).
- Object punya **data miliknya sendiri** (`self.nama`, `self.harga`) dan **method** — function yang menempel di object itu (`info()`).
- Kenapa ini penting sekarang: `DataFrame` di Pandas (dipakai mulai pertemuan 3) sebenarnya adalah **object** — dia punya data (isi tabel) sekaligus method siap pakai (`.head()`, `.describe()`, dst). Memahami "object = data + method miliknya sendiri" sekarang membuat Pandas nanti terasa lebih masuk akal, bukan sekadar dihafal.

## Hands-on: Langkah demi Langkah

### Langkah 1 — Mengecek Stok dengan `if`

Buat cell baru, ketik:

```python
stok = 5

if stok > 0:
    print("Barang tersedia")
```

Jalankan cell.

**Cek hasil:**
```text
Barang tersedia
```

### Langkah 2 — `if`/`else`: Dua Jalur

Buat cell baru:

```python
stok = 0

if stok > 0:
    print("Barang tersedia")
else:
    print("Stok habis")
```

**Cek hasil:**
```text
Stok habis
```

### Langkah 3 — `if`/`elif`/`else`: Diskon Toko

Buat cell baru:

```python
total_belanja = 175000

if total_belanja >= 200000:
    diskon = 0.15
elif total_belanja >= 100000:
    diskon = 0.10
else:
    diskon = 0

print(f"Diskon: {diskon:.0%}")
```

**Cek hasil:**
```text
Diskon: 10%
```

### Langkah 4 — Sengaja Salah Indentasi

Buat cell baru, ketik **persis seperti ini** (baris kedua sengaja tidak menjorok):

```python
total_belanja = 175000
if total_belanja >= 100000:
print("Dapat diskon!")
```

**Cek hasil:** muncul error `IndentationError: expected an indented block after 'if' statement on line 2`.

**Kalau error (memang disengaja!):** baris di dalam `if` wajib menjorok. Perbaiki jadi:

```python
total_belanja = 175000
if total_belanja >= 100000:
    print("Dapat diskon!")
```

**Cek hasil setelah diperbaiki:**
```text
Dapat diskon!
```

### Langkah 5 — Operator Logika: Syarat Promo

Buat cell baru:

```python
member = True
total_belanja = 120000

if member and total_belanja >= 100000:
    print("Dapat promo member!")
else:
    print("Belum memenuhi syarat promo")
```

**Cek hasil:**
```text
Dapat promo member!
```

### Langkah 6 — `for` pada List Kategori

Buat cell baru:

```python
kategori = ["Elektronik", "Fashion", "Makanan", "Buku", "Olahraga"]

for nama in kategori:
    print(nama)
```

**Cek hasil:**
```text
Elektronik
Fashion
Makanan
Buku
Olahraga
```

### Langkah 7 — `for` dengan `range()`

Buat cell baru:

```python
for i in range(1, 5):
    print(i)
```

**Cek hasil:**
```text
1
2
3
4
```

**Kalau bingung kenapa tidak sampai 5:** `range(1, 5)` berhenti **sebelum** angka batas atas — jadi cuma sampai `4`, bukan `5`.

### Langkah 8 — `enumerate()`: Penjualan Harian

Buat cell baru:

```python
penjualan = [120, 80, 150]

for nomor, nilai in enumerate(penjualan, start=1):
    print(f"Hari {nomor}: {nilai} transaksi")
```

**Cek hasil:**
```text
Hari 1: 120 transaksi
Hari 2: 80 transaksi
Hari 3: 150 transaksi
```

### Langkah 9 — Akumulasi: Total Penjualan

Buat cell baru:

```python
penjualan = [120000, 85000, 200000]
total = 0

for nilai in penjualan:
    total += nilai

print(f"Total penjualan: {total}")
```

**Cek hasil:**
```text
Total penjualan: 405000
```

### Langkah 10 — `while`: Kejar Target Penjualan

Buat cell baru:

```python
target = 500000
total_terkumpul = 0
hari = 0

while total_terkumpul < target:
    total_terkumpul += 100000
    hari += 1

print(f"Target tercapai dalam {hari} hari")
```

**Cek hasil:**
```text
Target tercapai dalam 5 hari
```

**Kalau cell menggantung tanpa selesai:** kemungkinan lupa menaikkan `total_terkumpul` atau `hari` di dalam loop, jadi kondisinya tidak pernah `False` (infinite loop). Klik tombol stop di sebelah cell, cek lagi baris `total_terkumpul += 100000` sudah ada dan menjorok dengan benar di dalam `while`.

### Langkah 11 — `break`: Berhenti Saat Stok Habis

Buat cell baru:

```python
stok = [5, 3, 0, 8]

for jumlah in stok:
    if jumlah == 0:
        break
    print(f"Sisa stok: {jumlah}")
```

**Cek hasil:**
```text
Sisa stok: 5
Sisa stok: 3
```

Angka `8` di akhir list tidak pernah ditampilkan karena `break` langsung menghentikan seluruh loop begitu ketemu `0`.

### Langkah 12 — `continue`: Lewati Data Kosong

Buat cell baru:

```python
penjualan_harian = [120000, 0, 95000, 0, 200000]

for nilai in penjualan_harian:
    if nilai == 0:
        continue
    print(f"Transaksi: {nilai}")
```

**Cek hasil:**
```text
Transaksi: 120000
Transaksi: 95000
Transaksi: 200000
```

Bedanya dengan `break`: loop tetap lanjut sampai item terakhir, cuma yang bernilai `0` dilewati.

### Langkah 13 — Function Pertama Tanpa Parameter

Buat cell baru:

```python
def sapa_toko():
    print("Selamat datang di Toko UNSIKA!")

sapa_toko()
```

**Cek hasil:**
```text
Selamat datang di Toko UNSIKA!
```

### Langkah 14 — Function dengan Parameter dan `return`

Buat cell baru:

```python
def hitung_total(harga, jumlah):
    return harga * jumlah

hasil = hitung_total(15000, 3)
print(hasil)
```

**Cek hasil:**
```text
45000
```

### Langkah 15 — Default Parameter

Buat cell baru:

```python
def hitung_diskon(total, persen=0.10):
    return total * persen

print(hitung_diskon(200000))
print(hitung_diskon(200000, 0.20))
```

**Cek hasil:**
```text
20000.0
40000.0
```

### Langkah 16 — Beda `print()` dan `return`

Buat cell baru:

```python
def tampilkan_saja(nilai):
    print(nilai * 2)

def kembalikan_nilai(nilai):
    return nilai * 2

hasil_print = tampilkan_saja(10)
hasil_return = kembalikan_nilai(10)

print("Nilai dari tampilkan_saja():", hasil_print)
print("Nilai dari kembalikan_nilai():", hasil_return)
```

**Cek hasil:**
```text
20
Nilai dari tampilkan_saja(): None
Nilai dari kembalikan_nilai(): 20
```

`tampilkan_saja()` cuma menampilkan `20` ke layar lewat `print()`, tapi tidak mengirim apa pun keluar — makanya `hasil_print` isinya `None`. `kembalikan_nilai()` mengirim hasilnya lewat `return`, jadi bisa ditampung dan dipakai lagi.

### Langkah 17 — Gabungan: Kategori Penjualan untuk Semua Data

Buat cell baru:

```python
def kategori_penjualan(nilai):
    if nilai < 100000:
        return "Rendah"
    elif nilai < 500000:
        return "Sedang"
    else:
        return "Tinggi"

penjualan = [50000, 120000, 600000, 95000, 300000]

for nilai in penjualan:
    print(f"{nilai} -> {kategori_penjualan(nilai)}")
```

**Cek hasil:**
```text
50000 -> Rendah
120000 -> Sedang
600000 -> Tinggi
95000 -> Rendah
300000 -> Sedang
```

### Langkah 18 — List Comprehension

Buat cell baru, tulis ulang hasil langkah 17 jadi satu baris:

```python
penjualan = [50000, 120000, 600000, 95000, 300000]
hasil_kategori = [kategori_penjualan(nilai) for nilai in penjualan]

print(hasil_kategori)
```

**Cek hasil:**
```text
['Rendah', 'Sedang', 'Tinggi', 'Rendah', 'Sedang']
```

### Langkah 19 — Coba Sendiri

Buat cell kosong. Buat function `cek_stok(jumlah)` yang mengembalikan `"Perlu restock"` kalau `jumlah` kurang dari `10`, selain itu `"Stok aman"`. Panggil function itu untuk angka `5` dan `20`, tebak dulu hasilnya sebelum run.

**Cek hasil:** `cek_stok(5)` harus `"Perlu restock"`, `cek_stok(20)` harus `"Stok aman"`.

### Langkah 20 — Sekilas OOP: Class Produk

Buat cell baru:

```python
class Produk:
    def __init__(self, nama, harga):
        self.nama = nama
        self.harga = harga

    def info(self):
        return f"{self.nama} - Rp {self.harga}"

produk1 = Produk("Headset", 250000)
produk2 = Produk("Mouse", 150000)

print(produk1.info())
print(produk2.info())
```

**Cek hasil:**
```text
Headset - Rp 250000
Mouse - Rp 150000
```

`produk1` dan `produk2` adalah dua object berbeda dari cetakan (class) yang sama, masing-masing punya datanya sendiri.

### Hasil Akhir Sesi Ini

Notebook `pertemuan-2.ipynb` berisi 20 cell: conditional (`if`/`elif`/`else`, indentasi, operator logika), loop (`for`, `range`, `enumerate`, akumulasi, `while`, `break`, `continue`), function (parameter, `return`, default parameter, list comprehension), sampai pengantar OOP. Semua masih pakai variabel dan list yang ditulis langsung — belum baca file CSV beneran, itu baru mulai pertemuan 3.

## Catatan AI

Contoh prompt yang baik: "Jelaskan kapan sebaiknya pakai `for` dan kapan pakai `while`, kasih contoh kasus data penjualan. Jangan berikan jawaban latihan saya." Verifikasi selalu jawaban AI dengan menjalankan kodenya sendiri di Colab — jangan langsung percaya sebelum dicoba, terutama untuk kode yang melibatkan `while` (rawan infinite loop kalau salah).

## Latihan Mandiri

Buat function `kategori_penjualan(nilai)` yang mengembalikan `"Rendah"`, `"Sedang"`, atau `"Tinggi"`. Gunakan function tersebut untuk seluruh nilai pada sebuah list penjualan buatanmu sendiri (minimal 5 angka), tampilkan hasilnya satu per satu memakai `for`.

## Rangkuman

Conditional (`if`/`elif`/`else`, operator logika `and`/`or`/`not`) membuat program memilih tindakan sesuai kondisi; loop (`for`, `while`, `break`, `continue`) mengulang proses tanpa menulis ulang kode; function (parameter, `return`, default parameter) menghindari penulisan kode yang sama berkali-kali dan bisa dipanggil ulang kapan pun. List comprehension adalah bentuk ringkas dari loop yang sudah dipahami. OOP dikenalkan sekilas lewat `class` dan `object` — pola yang sama dipakai `DataFrame` di Pandas. Minggu depan kita mulai mengolah data beneran dari file CSV memakai NumPy dan Pandas.

## Istilah Penting

| Istilah | Artinya |
|---|---|
| Conditional | Struktur kode (`if`/`elif`/`else`) yang membuat program memilih jalur berdasarkan kondisi `True`/`False` |
| Indentasi | Spasi di awal baris yang menandai suatu baris adalah bagian dari sebuah blok kode di Python |
| Operator logika | `and`, `or`, `not` — dipakai untuk mengecek beberapa kondisi sekaligus |
| Loop | Struktur kode (`for`/`while`) yang menjalankan satu blok berkali-kali |
| `range()` | Function yang menghasilkan deret angka berurutan, berhenti sebelum angka batas atas |
| `enumerate()` | Function yang menghasilkan pasangan (nomor urut, nilai) saat looping |
| Akumulasi | Pola menjumlahkan nilai satu per satu dalam loop ke sebuah variabel total |
| Infinite loop | Loop `while` yang tidak pernah berhenti karena kondisinya tidak pernah jadi `False` |
| `break` | Kata kunci yang langsung menghentikan seluruh loop |
| `continue` | Kata kunci yang melewati iterasi saat itu, lalu lanjut ke item berikutnya |
| Function | Blok kode bernama yang bisa dipanggil ulang, opsional menerima parameter dan mengirim hasil lewat `return` |
| Default parameter | Nilai parameter yang dipakai otomatis kalau tidak diisi saat function dipanggil |
| List comprehension | Bentuk ringkas menulis loop `for` yang menghasilkan list baru, dalam satu baris |
| Class | Cetakan/blueprint untuk membuat object |
| Object | Hasil nyata dari sebuah class, punya data dan method miliknya sendiri |
