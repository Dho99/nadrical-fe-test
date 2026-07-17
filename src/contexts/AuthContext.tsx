import { useState, useEffect, type ReactNode } from "react";
import { AuthContext } from "@/hooks/use-auth";

export type AuthUser = {
    id: number;
    name: string;
    email: string;
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(() =>
        localStorage.getItem("token"),
    );
    const [user, setUser] = useState<AuthUser | null>(() => {
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;
    });

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    const login = (newToken: string, newUser: AuthUser) => {
        setToken(newToken);
        setUser(newUser);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, token, isAuthenticated: !!token, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}
