import AdminDashboard from "./AdminDashboard";
import AdminSidebar from "./components/pages/AdminSidebar";
import { SidebarProvider } from "./components/ui/sidebar";
import AdminNavbar from "./components/pages/AdminNavbar";

export default function App() {
    return (
        <SidebarProvider defaultOpen={true}>
            <AdminSidebar />
            <div className="w-full">
                <AdminNavbar />
                <div className="container mx-auto py-8 px-5">
                    <AdminDashboard />
                </div>
            </div>
        </SidebarProvider>
    );
}
