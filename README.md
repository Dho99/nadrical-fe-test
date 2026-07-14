# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

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
