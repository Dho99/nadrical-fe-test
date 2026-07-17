import { Skeleton } from "@/components/ui/skeleton";

function TableSkeleton() {
    return (
        <div className="space-y-4 w-full">
            {/* Judul/Header Tabel Dummy */}
            <div className="flex justify-between border-b pb-2">
                <Skeleton className="h-4 w-[40px]" />
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[60px]" />
            </div>
            {/* Baris Data Dummy (3 Baris) */}
            {[1, 2, 3].map((i) => (
                <div
                    key={i}
                    className="flex justify-between items-center py-2 border-b"
                >
                    <Skeleton className="h-4 w-[30px]" />
                    <Skeleton className="h-4 w-[130px]" />
                    <Skeleton className="h-4 w-[90px]" />
                    <Skeleton className="h-4 w-[140px]" />
                    <Skeleton className="h-8 w-[60px] rounded-md" />{" "}
                    {/* Button skeleton */}
                </div>
            ))}
        </div>
    );
}

export default TableSkeleton;
