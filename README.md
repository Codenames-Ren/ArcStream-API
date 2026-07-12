# Arc Stream API

<p align="center">
  <img src="./src/assets/icon.png" width="120" alt="Arc Stream API Logo">
</p>

<p align="center">
  Playground API interaktif untuk menguji seluruh endpoint ArcGateway.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react">
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite">
  <img src="https://img.shields.io/badge/TailwindCSS-4-38BDF8?logo=tailwindcss">
  <img src="https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript">
</p>

---

## Tentang Proyek

**Arc Stream API** merupakan aplikasi web berbasis React + Vite yang berfungsi sebagai playground interaktif untuk menguji seluruh endpoint API yang tersedia.

Melalui aplikasi ini, pengguna dapat mengirim request API secara langsung dari browser, melihat response JSON secara real-time, menyalin hasil response, serta melakukan pengujian endpoint tanpa memerlukan aplikasi pihak ketiga seperti Postman atau Insomnia.

---

## Fitur

- Playground API interaktif
- Pengujian endpoint secara langsung
- Preview URL request
- Tampilan response JSON
- Copy response ke clipboard
- Dark Mode & Light Mode
- Responsive Design
- Konfigurasi melalui Environment Variable

---

## Teknologi

| Teknologi | Kegunaan |
|-----------|----------|
| React 19 | Frontend Framework |
| Vite | Build Tool |
| TypeScript | Type Safety |
| Tailwind CSS v4 | Styling |
| React Icons | Icon Library |

---

## Struktur Proyek

```text
src/
├── components/
├── config/
├── data/
├── hooks/
├── services/
├── styles.css
├── App.tsx
└── main.tsx

public/
```

---

## Environment Variable

Buat file `.env` pada root project.

```env
VITE_APP_NAME=ArcGateway
VITE_APP_VERSION=v1
VITE_API_BASE_URL=https://your-api-domain.com
VITE_GITHUB_URL=https://github.com/Codenames-Ren
```

---

## Instalasi

Clone repository.

```bash
git clone https://github.com/Codenames-Ren/ArcStream-API.git
```

Masuk ke folder project.

```bash
cd ArcStream-API
```

Install seluruh dependency.

```bash
npm install
```

Jalankan development server.

```bash
npm run dev
```

Buka browser.

```text
http://localhost:5173
```

---

## Build Production

Membuat hasil build production.

```bash
npm run build
```

Menjalankan hasil build secara lokal.

```bash
npm run preview
```

---

## Website

https://arcgateway-api.byproject.web.id

---

<p align="center">
Made with 🩷 using React, Vite, and Tailwind CSS.
</p>
