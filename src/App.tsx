import AdminDashboard from "./AdminDashboard";
import { SidebarProvider } from "./components/ui/sidebar";
import AdminMiddleware from "./AdminMiddleware";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./contexts/AuthContext";
import { Routes, Route } from "react-router";

export default function App() {
    return (
        <AuthProvider>
            <SidebarProvider defaultOpen={true}>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/*"
                        element={
                            <AdminMiddleware>
                                <AdminDashboard />
                            </AdminMiddleware>
                        }
                    />
                </Routes>
            </SidebarProvider>
        </AuthProvider>
    );
}
