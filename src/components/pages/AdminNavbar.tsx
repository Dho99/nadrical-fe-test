import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Menu, XIcon } from "lucide-react";

function AdminNavbar() {
    const { toggleSidebar, open } = useSidebar();

    return (
        <nav className="p-4 sticky top-0 bg-background z-5 shadow-md">
            <div className="flex items-center justify-between">
                <div className="text-lg font-semibold">Admin Panel</div>
                {/* {isMobile && ( */}
                <Button onClick={toggleSidebar} variant="outline">
                    {open ? (
                        <XIcon className="w-5 h-5" />
                    ) : (
                        <Menu className="w-5 h-5" />
                    )}
                </Button>
                {/* )} */}
            </div>
        </nav>
    );
}

export default AdminNavbar;
