# Pertemuan 2 — Logika, Perulangan, dan Function

**Durasi:** 19.30–21.00 WIB  
**Tools:** Google Colab, Python  
**Output:** Peserta dapat membuat logika sederhana dan function untuk tugas berulang.

## Tujuan belajar

- Menggunakan `if`/`elif`/`else` untuk mengambil keputusan.
- Menggunakan `for` dan `while` secara tepat.
- Membuat function dengan parameter dan `return`.
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

## Materi inti

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

`for` cocok ketika jumlah perulangan diketahui; `while` cocok saat perulangan berjalan selama kondisi masih benar.

```python
penjualan = [120, 80, 150]
for nomor, nilai in enumerate(penjualan, start=1):
    print(f"Hari {nomor}: {nilai}")

def hitung_diskon(total, persen=0.10):
    return total * persen
```

`print()` hanya menampilkan nilai; `return` mengirim hasil agar dapat dipakai lagi. OOP cukup dikenalkan sebagai pola: `DataFrame` dan model ML nanti adalah objek yang punya data serta method.

## Aktivitas

Buat function `kategori_penjualan(nilai)` yang mengembalikan “Rendah”, “Sedang”, atau “Tinggi”. Gunakan function tersebut untuk seluruh nilai pada list penjualan.

## Rangkuman

Conditional membuat program memilih tindakan, loop mengulang proses, dan function menghindari penulisan kode yang sama berkali-kali.
