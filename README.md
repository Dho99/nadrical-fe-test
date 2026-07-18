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

# Bug 4 — Fungsi `calculateStatistics()` selalu berjalan saat user mengetik

## Permasalahan

Fungsi `calculateStatistics()` melakukan proses komputasi yang cukup berat.

```jsx
const stats = calculateStatistics(users);
```

Hal ini disebabkan karena fungsi tersebut dipanggil langsung di dalam body komponen, React akan menjalankannya setiap kali komponen dirender ulang. Saat user mengetik pada kolom pencarian,

```jsx
setSearch(e.target.value);
```

state search akan berubah sehingga react melakukan render ulang. Akibatnya, meskipun data users tidak berubah sama, fungsi `calculateStatistics()` akan tetap dijalankan kembali.

Hal ini menyebabkan:

- Proses mengetik menjadi terasa lambat (_lag_).
- Penggunaan CPU meningkat.
- Pengguna menjadi kurang nyaman.

---

## Penyebab

Pada react, setiap perubahan state akan menyebabkan seluruh fungsi komponen dieksekusi kembali. Hal ini dikarenakan `calculateStatistics(users)` berada di dalam proses render, sehingga react akan selalu menghitung ulang meskipun data `users` sebenarnya tidak mengalami perubahan.

---

## Solusi

Menggunakan `useMemo()` untuk melakukan _memoization_ terhadap hasil perhitungan.

```jsx
const stats = useMemo(() => {
  return calculateStatistics(users);
}, [users]);
```

---

## Alasan Menggunakan `useMemo`

seMemo adalah React Hook yang berfungsi untuk meningkatkan performa aplikasi dengan cara menyimpan (memo) hasil perhitungan yang berat di memori

`useMemo` akan menyimpan (_cache_) hasil dari proses komputasi.

Selama data users tidak berubah, React akan menggunakan hasil yang sudah disimpan tanpa menjalankan ulang fungsi `calculateStatistics()`. Dengan demikian, ketika user mengetik pada kolom pencarian, proses komputasi berat tidak akan dijalankan.

### Manfaat

- Mengurangi proses komputasi yang tidak diperlukan.
- Meningkatkan performa aplikasi.
- Membuat proses pencarian lebih responsif.
- Mengurangi beban CPU.

---

## Referensi React

https://react.dev/reference/react/useMemo

---

# Bug 5 — Kolom pencarian tidak otomatis fokus saat halaman terbuka

## Permasalahan

Saat halaman pertama kali dibuka, kursor seharusnya langsung berada pada kolom pencarian sehingga pengguna bisa langsung mengetik. Namun pada implementasi saat ini, pengguna masih harus mengklik kolom input secara manual. Hal tersebut mengurangi kenyamanan pengguna.

---

## Penyebab

React tidak secara otomatis memberikan fokus pada elemen HTML setelah proses render selesai karena tidak terdapat referensi ke elemen input, aplikasi tidak memiliki akses untuk memanggil method `focus()`.

---

## Solusi

Menggunakan kombinasi `useRef()` dan `useEffect()`.

```jsx
const inputRef = useRef(null);

useEffect(() => {
  inputRef.current?.focus();
}, []);
```

Kemudian memasangkan `ref` pada komponen input.

```jsx
<input
    ref={inputRef}
    ...
/>
```

---

## Alasan Menggunakan `useRef`

useRef adalah React Hook yang berfungsi untuk menyimpan nilai yang dapat diubah tanpa memicu re-render pada komponen. useEffect adalah fitur bawaan (hook) pada React yang memungkinkan Anda untuk menjalankan kode saat komponen pertama kali dimuat (mount), diperbarui (update), atau dihapus dari layar (unmount).

`useRef` digunakan untuk mendapatkan referensi langsung elemen DOM tanpa menyebabkan proses render ulang. Sedangkan `useEffect` digunakan agar fungsi `focus()` dijalankan setelah komponen selesai dirender (_mounted_).

### Manfaat

- Cursor langsung aktif pada kolom pencarian.
- Meningkatkan pengalaman pengguna.

---

## Referensi React

https://react.dev/reference/react/useRef

https://react.dev/reference/react/useEffect

---

# Bug 6 — `React.memo` tidak berfungsi karena `handleDelete()` selalu dibuat ulang

## Permasalahan

Komponen DataItem sudah dibungkus menggunakan `React.memo`. Namun ketika user mengetik pada kolom pencarian, seluruh komponen DataItem tetap dirender ulang.

---

## Penyebab

Fungsi `handleDelete` dideklarasikan di dalam body komponen.

```jsx
const handleDelete = (id) => {
  console.log("Menghapus user:", id);
};
```

Pada setiap proses render, react akan membuat objek fungsi yang baru. Meskipun isi fungsi sama, react membandingkan referensi fungsi, bukan isi dari fungsi tersebut.

Akibatnya,

```jsx
oldHandleDelete !== newHandleDelete;
```

Disebabkan referensi berubah, `React.memo` menganggap props berubah sehingga seluruh komponen children ikut dirender ulang.

---

## Solusi

Menggunakan `useCallback()`.

```jsx
const handleDelete = useCallback((id) => {
  console.log("Menghapus user:", id);
}, []);
```

---

## Alasan Menggunakan `useCallback`

useCallback adalah React Hook bawaan yang berfungsi untuk menyimpan (memoisasi) definisi fungsi di antara proses render ulang.

`useCallback` akan menyimpan referensi fungsi sehingga react tetap menggunakan objek fungsi yang sama selama dependency tidak berubah. Oleh karena itu, `React.memo` dapat mendeteksi bahwa props tidak berubah dan tidak perlu melakukan render ulang terhadap komponen anak.

### Manfaat

- Mengurangi render yang tidak diperlukan.
- Membuat `React.memo` bekerja secara optimal.

---

## Referensi React

https://react.dev/reference/react/useCallback

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

## 📋 Log Kontribusi

| Anggota   | Kontribusi                                                                                                                                                                             |
| :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Ridho** | • Setup Vite & UI Frameworks<br>• Inisialisasi GitHub Repository<br>• Analisis bug 1, 2, dan 3                                                                                         |
| **Sukma** | • Analisis & implementasi bug 4, 5, dan 6<br>• Konfigurasi UI **UserTable** & **SuperHeavyChart**<br>• Implementasi animasi pada bar chart<br>• Implementasi ekspor data ke file Excel |
