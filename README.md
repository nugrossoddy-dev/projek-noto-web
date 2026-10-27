# NOTO — Marketing Website

> Website publik dan landing page resmi untuk platform produktivitas **NOTO — Get Things Done**.

Proyek ini dibangun murni menggunakan **HTML5 semantik, CSS3 responsif, dan Vanilla JavaScript (ES6+)** tanpa framework, bundler, atau dependensi eksternal.

---

## 📁 Struktur Direktori

```
web/
├── index.html        # Landing page utama (Hero, Fitur, Cara Kerja, Harga, FAQ, Footer)
├── styles.css        # Sistem desain editorial, tipografi, dan mode gelap/terang
├── web.js            # Controller interaktif website & navigasi ke aplikasi
├── assets/
│   ├── icons/        # Favicon dan ikon web
│   └── images/       # Logo dan ilustrasi grafis
└── README.md         # Dokumentasi proyek web
```

---

## 🔗 Hubungan dengan Aplikasi (Apps)

Pada file `web.js`, terdapat konfigurasi alamat aplikasi:

```javascript
const CONFIG = {
  // Ganti URL ini dengan URL GitHub Pages atau domain aplikasi Anda setelah di-publish
  // Contoh: 'https://username.github.io/noto-apps/'
  APP_URL: '../apps/index.html'
};
```

Jika website dan aplikasi Anda di-publish pada repositori GitHub yang berbeda:
1. Publish repositori `apps` ke GitHub Pages terlebih dahulu (misal: `https://<username>.github.io/<repo-apps>/`).
2. Masukkan URL tersebut ke variabel `APP_URL` di `web.js`.
3. Publish repositori `web` ke GitHub Pages.

---

## 🚀 Cara Menjalankan Secara Lokal

Buka file `index.html` langsung di browser favorit Anda, atau jalankan static server:

```bash
# Menggunakan Python
python -m http.server 8000

# Atau menggunakan npx serve
npx serve .
```

Kunjungi `http://localhost:8000` di browser.

---

## 📤 Cara Publish ke GitHub Pages

1. Buat repositori baru di GitHub (misal: `noto-web`).
2. Masuk ke folder `web` di komputer Anda:
   ```bash
   cd web
   git init
   git add .
   git commit -m "feat: initial commit for NOTO website"
   git branch -M main
   git remote add origin https://github.com/<username>/noto-web.git
   git push -u origin main
   ```
3. Buka repositori di GitHub > Masuk ke **Settings** > **Pages**.
4. Pada bagian **Branch**, pilih `main` dan folder `/ (root)`, lalu klik **Save**.
5. Website Anda akan aktif dalam beberapa saat di `https://<username>.github.io/noto-web/`.
