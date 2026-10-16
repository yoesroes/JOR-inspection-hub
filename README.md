# JOR Inspection Hub — pratinjau mobile v4 (dirapikan)

Pratinjau front-end dengan data ilustratif dan tanpa backend. Paket ini mempertahankan tampilan mobile yang disetujui dan merapikan navigasi serta kode antarmukanya.

## Perilaku yang tercermin

- **Peran:** Inspektur, Senior Engineer, Admin JOR. Signup menunggu persetujuan Admin JOR, yang menetapkan peran pengguna saat menyetujui.
- **Navigasi utama:** Beranda, Dashboard, Laporan, Joint Insp., Profile. Menu Laporan menjadi satu-satunya tempat membuat laporan lapangan.
- **Dashboard:** Rencana kerja pribadi (disusun sendiri oleh setiap inspektur), kartu Library proyek yang berdiri sendiri, notifikasi, riwayat pekerjaan, dan alat. Tidak ada pintasan pelaporan di Dashboard.
- **Library:** Dapat dibuka dari kartu khusus di Dashboard dan dipakai seluruh pengguna aktif untuk mencari shop drawing serta dokumen teknis.
- **Laporan:** Form kegiatan atau issue dengan lampiran. Foto terkirim dikelompokkan dalam folder proyek dan elemen yang dipilih.
- **Beranda:** Informasi proyek global. Database status P1–P10 menampilkan tahap masing-masing pier (misalnya survey, clearance, bored pile, dan pile cap) dan bisa dicari berdasarkan lokasi.
- **Kegiatan lapangan:** Memuat lokasi, inspektur, waktu mulai, selesai, serta waktu dan alasan hold/delay. Ketuk kegiatan untuk meninjau foto dan keterangan laporan inspektur.
- **Warna status kegiatan:** Hijau untuk sedang berjalan, merah untuk hold, kuning untuk delay, dan biru kehijauan untuk selesai.
- **Issue global:** Issue dari laporan pengguna ditampilkan di Beranda dengan tindakan yang dilakukan atau direncanakan. Detail issue menyimpan kronologi/history, foto, catatan tindakan, dan penutupan.
- **Profile:** Informasi akun, foto profil, kontak darurat, status pribadi, dan keluar akun. DM tersedia di area Profile.

## Batas pratinjau

Autentikasi, penyimpanan permanen, unggah file, persetujuan signup, dan akses dokumen sungguhan memerlukan backend. Status pier dan foto saat ini adalah data demonstrasi.
