import { useState, useEffect, Suspense, lazy } from "react";
// import DataItem from "@/components/pages/DataItem";
import ChartFallback from "./components/pages/ChartFallback";
import type { User } from "@/types/user";
import UsersTable from "@/components/pages/UsersTable";
import FilterInput from "./components/pages/FilterInput";

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

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return (
        <div>
            <div className="grid xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 gap-5">
                <div className="space-y-5 border border-slate-200 rounded-lg p-5 shadow-lg w-full overflow-hidden">
                    <FilterInput onSearchChange={handleSearchChange} />

                    <UsersTable
                        users={filteredUsers}
                        handleDelete={handleDelete}
                    />
                </div>

                <div className="space-y-5 border border-slate-200 rounded-lg p-5 shadow-lg">
                    <Suspense fallback={<ChartFallback />}>
                        <ChartComponent data={stats} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
