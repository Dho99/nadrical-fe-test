import { useState, useEffect, Suspense, lazy } from "react";
import DataItem from "@/components/pages/DataItem";
import ChartFallback from "./components/pages/ChartFallback";
import type { User } from "@/types/user";

const ChartComponent = lazy(() => import("@/components/pages/SuperHeavyChart"));

export default function AdminDashboard() {
    // Bug 1: Sidebar tidak ter-update di layar
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState("");

    // Bug 4: Fungsi berat ini berjalan ulang SETIAP KALI user mengetik di kolom pencarian
    const calculateStatistics = (data: User[]) => {
        console.log("Menghitung statistik berat...");
        // Simulasi proses lambat
        let i = 0;
        while (i < 50000000) i++;
        return { total: data.length };
    };
    const stats = calculateStatistics(users);

    // Bug 6: Fungsi ini selalu direferensikan ulang tiap kali render
    const handleDelete = (id: User["id"]) => {
        console.log("Menghapus user ID:", id);
        // (Tidak perlu implementasi filter data beneran, cukup console log saja)
    };

    // Filter data berdasarkan search
    const filteredUsers = users.filter((u) =>
        u?.name?.toLowerCase().includes(search.toLowerCase()),
    );

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.json())
            .then((data) => setUsers(data));
    }, [search]);

    return (
        <div>
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
                <Suspense fallback={<ChartFallback />}>
                    <ChartComponent data={stats} />
                </Suspense>
            </div>
        </div>
    );
}
