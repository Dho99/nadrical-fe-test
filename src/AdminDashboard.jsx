import React, { useState } from "react";
import SuperHeavyChart from "./components/SuperHeavyChart";
import DataItem from "./components/DataItem";

export default function AdminDashboard() {
    // Bug 1: Sidebar tidak ter-update di layar
    let isSidebarOpen = false;

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    // Bug 2: Fetching data ini akan menyebabkan INFINITE LOOP sampai browser crash!
    // Karena setiap fetch sukses -> setUsers -> re-render -> fetch lagi
    fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((data) => setUsers(data));

    // Bug 4: Fungsi berat ini berjalan ulang SETIAP KALI user mengetik di kolom pencarian
    const calculateStatistics = (data) => {
        console.log("Menghitung statistik berat...");
        // Simulasi proses lambat
        let i = 0;
        while (i < 50000000) i++;
        return { total: data.length };
    };
    const stats = calculateStatistics(users);

    // Bug 6: Fungsi ini selalu direferensikan ulang tiap kali render
    const handleDelete = (id) => {
        console.log("Menghapus user ID:", id);
        // (Tidak perlu implementasi filter data beneran, cukup console log saja)
    };

    // Filter data berdasarkan search
    const filteredUsers = users.filter((u) =>
        u.name.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <div>
            <button
                onClick={() => {
                    isSidebarOpen = !isSidebarOpen;
                }}
            >
                Toggle Sidebar
            </button>

            {isSidebarOpen && (
                <div style={{ background: "red", color: "white" }}>
                    Menu Sidebar Terbuka
                </div>
            )}

            <div>
                {/* Bug 5: Input ini harusnya otomatis fokus saat halaman dimuat */}
                <input
                    type="text"
                    placeholder="Cari nama user..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <p>Total User (Statistik): {stats.total || 0}</p>

                <div>
                    {filteredUsers.map((user) => (
                        <DataItem
                            key={user.id}
                            user={user}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>

                {/* Bug 3: Komponen ini menahan loading awal halaman */}
                <SuperHeavyChart data={stats} />
            </div>
        </div>
    );
}
