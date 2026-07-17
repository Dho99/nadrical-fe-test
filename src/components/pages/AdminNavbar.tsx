import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Menu, BellDot } from "lucide-react";
import Breadcrumb from "@/components/pages/Breadcrumb";
import ProfileDropdown from "@/components/pages/ProfileDropdown";

function AdminNavbar() {
    const { toggleSidebar } = useSidebar();

    return (
        <nav className="py-4 px-5 sticky top-0 bg-background z-5 shadow-md border-b border-zinc-800">
            <div className="flex items-center justify-between">
                <Breadcrumb />
                <div className="flex items-center space-x-4">
                    <BellDot className="w-5 h-5" />
                    <ProfileDropdown />
                    <Button onClick={toggleSidebar} variant="outline">
                        <Menu className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </nav>
    );
}

export default AdminNavbar;
