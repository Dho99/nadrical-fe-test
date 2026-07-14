import AdminDashboard from "./AdminDashboard";
import AdminSidebar from "./components/pages/AdminSidebar";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";

export default function App() {
    return (
        <SidebarProvider>
            <AdminSidebar />
            <SidebarTrigger />
            <div className="container mx-auto py-8 px-5">
                <AdminDashboard />
            </div>
        </SidebarProvider>
    );
}
