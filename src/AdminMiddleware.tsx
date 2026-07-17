import { Navigate } from "react-router";
import { useAuth } from "@/hooks/use-auth";
import type { ReactNode } from "react";
import AdminNavbar from "./components/pages/AdminNavbar";
import AdminSidebar from "./components/pages/AdminSidebar";

type AdminMiddlewareProps = {
    children: ReactNode;
};

export default function AdminMiddleware({ children }: AdminMiddlewareProps) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            <AdminSidebar />
            <div className="w-full">
                <AdminNavbar />
                <div className=" mx-auto py-8 px-5 w-full">{children}</div>
            </div>
        </>
    );
}
