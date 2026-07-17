import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  Suspense,
  lazy,
} from "react";
// import DataItem from "@/components/pages/DataItem";
import ChartFallback from "@/components/pages/ChartFallback";
import type { User } from "@/types/user";
import UsersTable from "@/components/pages/UsersTable";
import FilterInput from "@/components/pages/FilterInput";
import { Card } from "@/components/ui/card";
import TableSkeleton from "./components/pages/TableSkeleton";
import { Button } from "./components/ui/button";
import { Download } from "lucide-react";
import { exportUsersToExcel } from "../utils/exportUsersToExcel";

const ChartComponent = lazy(() => import("@/components/pages/SuperHeavyChart"));

export default function AdminDashboard() {
  // Bug 1: Sidebar tidak ter-update di layar
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  //untuk bug 6
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Bug 4: Fungsi berat ini berjalan ulang SETIAP KALI user mengetik di kolom pencarian
  const calculateStatistics = (data: User[]) => {
    console.log("Menghitung statistik berat...");
    // Simulasi proses lambat
    let i = 0;
    while (i < 50000000) i++;
    return { total: data.length };
  };
  const stats = useMemo(() => {
    return calculateStatistics(users);
  }, [users]);

  // Bug 6: Fungsi ini selalu direferensikan ulang tiap kali render
  const handleDelete = useCallback((id: User["id"]) => {
    console.log("Menghapus user ID:", id);
  }, []);

  // Filter data berdasarkan search
  const filteredUsers = users.filter((u) =>
    u?.name?.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setIsLoading(false);
      });
  }, []);

  //bug 6 search
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="space-y-6">
      <Card className=" rounded-2xl border border-[#27272A] bg-[#18181B] p-6 shadow-[0_0_30px_rgba(34,211,238,.05)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,211,238,.08)]">
        <div className="flex flex-col gap-6 border-b border-[#27272A] pb-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-[#FAFAFA]">
                User Management
              </h2>

              <p className="mt-1 text-sm text-[#A1A1AA]">
                Manage registered users and monitor account activity.
              </p>
            </div>
          </div>

          <div className="flex w-full items-center gap-3 lg:w-auto">
            <Button
              onClick={() => exportUsersToExcel(filteredUsers)}
              className="bg-[#22C55E] text-white transition-all duration-300 hover:bg-[#4ADE80]">
              <Download className="mr-2 h-4 w-4" />
              Export Excel
            </Button>

            <div className="w-full lg:w-80">
              <div className="rounded-xl border border-[#27272A] bg-[#09090B] p-1">
                <FilterInput
                  ref={searchInputRef}
                  onSearchChange={handleSearchChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2">
          {isLoading ? (
            <TableSkeleton />
          ) : (
            <UsersTable users={filteredUsers} handleDelete={handleDelete} />
          )}
        </div>
      </Card>

      <Card className="rounded-2xl border border-[#27272A] bg-[#18181B] p-6 shadow-[0_0_30px_rgba(34,211,238,.05)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,211,238,.08)]">
        <div className="flex items-center justify-between border-b border-[#27272A] pb-5">
          <h2 className="text-2xl font-bold tracking-tight text-[#FAFAFA]">
            Analytics Dashboard
          </h2>

          <p className="text-sm text-[#A1A1AA]">
            User statistics and activity overview
          </p>
        </div>

        <div className="mt-6 flex min-h-[350px] items-center justify-center">
          <Suspense fallback={<ChartFallback />}>
            <ChartComponent data={stats} />
          </Suspense>
        </div>
      </Card>
    </div>
  );
}
