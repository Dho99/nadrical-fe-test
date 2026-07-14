import AdminDashboard from "./AdminDashboard";
import AdminSidebar from "./components/pages/AdminSidebar";
import { SidebarProvider } from "./components/ui/sidebar";

export default function App() {
    return (
        <SidebarProvider>
            <AdminSidebar />
            <div className="container max-w-7xl mx-auto px-4 py-8">
                <AdminDashboard />
            </div>
        </SidebarProvider>
    );
}
