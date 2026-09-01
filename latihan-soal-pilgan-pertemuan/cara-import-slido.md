# Cara Menyiapkan Kuis di Slido

Peserta Unsika Study Club sudah biasa memakai **Slido**. Kuis pilihan ganda ditampilkan **live saat pertemuan berlangsung**, dikendalikan moderator lewat presenter view — bukan link take-home yang dikerjakan peserta sendirian di luar jam kelas. Peserta join lewat kode/link yang tampil di layar, lalu menjawab dari HP masing-masing secara real-time.

Panduan ini untuk moderator yang menyiapkan Slido, bukan untuk peserta.

## Sebelum Mulai

- Soal ada di `pilgan-1.md` sampai `pilgan-6.md` di folder ini, plus versi CSV-nya untuk memudahkan copy-paste.
- Tampilan menu Slido bisa sedikit berbeda tergantung versi/paket yang dipakai study club. Kalau ada langkah di bawah yang tidak persis sama, cek pusat bantuan resmi Slido di [help.sli.do](https://help.sli.do/).

## Langkah 1 — Siapkan Event di Slido

1. Buka [slido.com](https://www.slido.com/), login dengan akun yang dipakai Unsika Study Club (atau buat akun baru kalau belum ada).
2. Buat **event baru** — bisa satu event per pertemuan, atau satu event besar untuk seluruh program dengan poll dikelompokkan per sesi (Slido punya fitur mengelompokkan poll ke dalam beberapa bagian/agenda). Pilih yang paling gampang dikelola tim kamu.
3. Beri nama event yang jelas, misalnya "Kuis Pertemuan 1 — Data Analyst UNSIKA".

**Cek hasil:** event baru muncul di dashboard Slido, siap ditambahkan poll.

## Langkah 2 — Tambahkan 10 Soal sebagai Poll

Ada dua cara, pakai yang paling sesuai dengan paket Slido yang tersedia:

### Cara A — Import massal (kalau tersedia)

1. Di dalam event, buka bagian **Polls**, cari tombol **Import** atau **Bulk import** (letak persisnya bisa beda tergantung versi Slido).
2. Unduh **template resmi dari Slido sendiri** lewat tombol itu — jangan pakai file CSV di folder ini langsung sebagai file import, karena format resmi Slido bisa berubah sewaktu-waktu dan cuma template dari Slido sendiri yang dijamin cocok.
3. Buka template itu berdampingan dengan `pilgan-1.csv` (atau pertemuan lain), lalu salin pertanyaan, 4 opsi jawaban, dan tandai jawaban benar sesuai kolom yang diminta template.
4. Upload kembali file yang sudah diisi ke Slido.

**Cek hasil:** 10 poll pertemuan itu otomatis muncul di daftar Polls, sesuai urutan di file.

### Cara B — Tambah manual satu per satu (kalau fitur import tidak tersedia)

1. Klik **+ Add poll**, pilih tipe **Multiple Choice** (pakai tipe **Quiz** kalau paket yang dipakai mendukung, supaya jawaban benar bisa ditandai dan skor peserta muncul otomatis).
2. Copy-paste pertanyaan dan 4 opsi dari `pilgan-1.md` (atau pertemuan lain) ke form poll.
3. Tandai opsi yang benar (lihat tanda ✅ di file markdown).
4. Ulangi untuk semua 10 soal.

**Cek hasil:** 10 poll tersusun di daftar, urutannya sama seperti nomor soal di file markdown.

**Kalau error:** kalau tipe **Quiz** tidak muncul sebagai pilihan, kemungkinan paket Slido yang dipakai tidak mendukungnya — pakai tipe **Multiple Choice** biasa saja, jawaban benar cukup diketahui moderator secara manual saat membahas hasil di kelas.

## Langkah 3 — Jalankan Live Saat Pertemuan

1. Sebelum sesi dimulai, buka event yang sudah disiapkan lewat **Presenter View**.
2. Tampilkan layar presenter ke proyektor — di situ ada kode/link join yang harus diketik/scan peserta dari HP masing-masing di [slido.com](https://www.slido.com/) atau lewat QR code.
3. Saat pembahasan materi sampai ke bagian yang relevan, klik **Activate** pada poll nomor itu — poll baru muncul ke layar peserta setelah diaktifkan, bukan otomatis semua dari awal.
4. Hasil jawaban peserta muncul real-time di layar presenter, bisa langsung dibahas bareng.

**Cek hasil:** poll aktif tampil di layar peserta begitu diklik Activate, jawaban masuk secara live, dan hasilnya bisa dibuka lagi setelahnya di dashboard Slido untuk rekap.

**Kalau error:** kalau peserta tidak bisa join, cek lagi kode/link yang ditampilkan sudah benar (sesuai event yang sedang dibuka), dan pastikan koneksi internet ruangan stabil untuk seluruh peserta.

## Setelah Pertemuan Selesai

Slido biasanya menyimpan rekap hasil tiap poll (jumlah suara tiap opsi, dan skor peserta kalau pakai tipe Quiz). Ekspor/screenshot rekap itu kalau perlu didokumentasikan buat laporan kelas.
