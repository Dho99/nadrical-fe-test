# nadrical-fe-test

[Deskripsi singkat project]

---

## Daftar Isi

- [Analisa Bug](#analisa-bug)
- [Instruksi Build](#instruksi-build)
- [Log Kontribusi](#log-kontribusi)

---

## Analisa Bug

### Bug 1: Sidebar tidak terbuka/tertutup

- **Lokasi:** `AdminDashboard.jsx:7`
- **Penyebab:** Variabel `isSidebarOpen` menggunakan `let` biasa yang tidak memicu re-render React saat nilainya berubah.
- **Solusi:** Gunakan `useState` untuk menyimpan state `isSidebarOpen`. Manipulasi state dengan `setIsSidebarOpen(prev => !prev)` saat tombol ditekan agar React mendeteksi perubahan dan me-render ulang komponen.

### Bug 2: Infinite loop fetch

- **Lokasi:** `AdminDashboard.jsx:14-16`
- **Penyebab:** `fetch()` dipanggil langsung di body komponen tanpa pembungkus. Setiap kali `setUsers()` dipanggil, komponen re-render dan memicu `fetch()` lagi, menyebabkan infinite loop.
- **Solusi:** Bungkus `fetch()` di dalam `useEffect` dengan array dependensi `[search]` agar fetching hanya berjalan saat nilai `search` berubah (atau array kosong `[]` jika hanya sekali di mount).

### Bug 3: SuperHeavyChart membebani loading awal

- **Lokasi:** `AdminDashboard.jsx:77` & `SuperHeavyChart.jsx`
- **Penyebab:** Komponen `SuperHeavyChart` di-import secara eager (langsung), sehingga kode library chart berukuran besar ikut diunduh saat loading awal meskipun belum tentu langsung tampil.
- **Solusi:** Gunakan `React.lazy()` untuk dynamic import + `<Suspense>` sebagai pembungkus dengan `fallback` (misal spinner/skeleton) agar komponen hanya diunduh saat akan di-render.

### Bug 4: Kinerja lambat saat pencarian

- **Lokasi:** `AdminDashboard.jsx:19-26`
- **Penyebab:** ...
- **Solusi:** ...

### Bug 5: Input tidak auto-focus

- **Lokasi:** `AdminDashboard.jsx:57-62`
- **Penyebab:** ...
- **Solusi:** ...

### Bug 6: DataItem re-render tidak perlu

- **Lokasi:** `AdminDashboard.jsx:29-32` & `DataItem.jsx:4`
- **Penyebab:** ...
- **Solusi:** ...

---

## Instruksi Build

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

---

## Log Kontribusi

| Anggota | Kontribusi                                                      |
| ------- | --------------------------------------------------------------- |
| Ridho   | - Setup Vite & UI Frameworks, init github repo, fix bug 1, 2, 3 |

- Refactor Codebase dari JSX ke TSX
- Reinstall UI Frameworks dengan Componentsnya
- Layouting Dashboard
  | - Refactor React JSX ke TSX
  | Person B | ... |
