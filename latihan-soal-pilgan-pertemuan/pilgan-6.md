# Kuis Pilihan Ganda — Pertemuan 6: Dashboard Streamlit dan GitHub Dasar

> Dokumen ini untuk kebutuhan internal (disiapkan moderator ke Slido untuk ditampilkan live saat kelas, lihat `cara-import-slido.md`). Jawaban benar ditandai ✅ — jangan dibagikan mentah ke peserta sebelum kuis berlangsung.

## Soal 1
Apa fungsi `st.title(...)` di Streamlit?

A. Menampilkan judul besar di halaman dashboard ✅
B. Menyimpan data ke file CSV
C. Menjalankan aplikasi di terminal
D. Membuat grafik interaktif

## Soal 2
Apa fungsi `st.multiselect(...)` pada dashboard Streamlit?

A. Menampilkan satu angka metrik saja
B. Membuat filter yang memungkinkan pengguna memilih beberapa opsi sekaligus ✅
C. Menghapus baris data yang dipilih
D. Mengurutkan kolom tabel secara otomatis

## Soal 3
Apa fungsi `st.metric(...)` pada kode berikut?

```python
col1.metric("Total Penjualan", f"Rp {data_tampil['nilai_penjualan'].sum():,.0f}")
```

A. Menampilkan grafik batang
B. Menampilkan satu angka ringkasan dengan label, misalnya total penjualan ✅
C. Membuat tabel dari DataFrame
D. Mengganti tema warna dashboard

## Soal 4
Perintah apa yang dipakai untuk menjalankan aplikasi Streamlit dari terminal?

A. `python app.py`
B. `streamlit run app.py` ✅
C. `run streamlit app.py`
D. `streamlit start app.py`

## Soal 5
Manakah struktur folder proyek Streamlit yang sesuai dengan materi?

A. Hanya perlu satu file `app.py`, tidak butuh file lain
B. `app.py`, folder `data/` berisi CSV, `requirements.txt`, dan `README.md` ✅
C. Semua kode harus ada dalam satu file bernama `main.py` tanpa folder tambahan
D. Data harus disimpan di database, tidak boleh berupa file CSV

## Soal 6
Urutan perintah Git yang benar untuk pertama kali mengunggah proyek ke GitHub adalah...

A. `git push` → `git init` → `git commit` → `git add`
B. `git init` → `git add .` → `git commit -m "..."` → `git push` ✅
C. `git commit` → `git init` → `git push` → `git add`
D. `git add .` → `git push` → `git init` → `git commit`

## Soal 7
Apa yang TIDAK boleh diunggah ke repository GitHub menurut materi?

A. Kode `app.py`
B. `README.md` proyek
C. Password, API key, atau file data pribadi ✅
D. File `requirements.txt`

## Soal 8
Apa isi yang sebaiknya ada di `README.md` sebuah proyek dashboard?

A. Hanya nama pembuat, tanpa penjelasan lain
B. Tujuan proyek, sumber data, cara instalasi, dan insight yang ditemukan ✅
C. Salinan penuh kode `app.py`
D. Daftar harga produk yang dianalisis

## Soal 9
Kode berikut dipakai untuk apa dalam dashboard?

```python
ringkasan = data_tampil.groupby("kategori", as_index=False)["nilai_penjualan"].sum()
fig = px.bar(ringkasan, x="kategori", y="nilai_penjualan")
```

A. Menghapus kategori yang tidak dipilih dari database
B. Meringkas total penjualan per kategori, lalu menampilkannya sebagai bar chart ✅
C. Mengubah semua nilai penjualan menjadi nol
D. Menyimpan grafik langsung ke Google Drive

## Soal 10
Apa yang sebaiknya dilakukan setiap anggota kelompok agar kontribusinya terlacak di proyek akhir?

A. Hanya satu orang yang boleh menyentuh kode, lainnya cukup menonton
B. Melakukan commit sendiri ke repository dengan pesan yang jelas ✅
C. Mengirim kode lewat chat pribadi ke satu orang saja
D. Kontribusi tidak perlu tercatat, cukup dikerjakan bersama secara lisan
