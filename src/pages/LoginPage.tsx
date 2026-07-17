import { useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { useNavigate } from "react-router";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Email dan password harus diisi");
            return;
        }

        setLoading(true);

        setTimeout(() => {
            login("mock-token-123", { id: 1, name: "Admin", email });
            navigate("/", { replace: true });
        }, 1000);
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 w-full">
            <div className="gradient-cyan-purple relative lg:flex hidden flex-col items-center justify-center p-12 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="glow-cyan absolute -top-20 -left-20 w-72 h-72 rounded-full bg-neon-cyan/10 blur-3xl" />
                <div className="glow-purple absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-neon-purple/10 blur-3xl" />
                <div className="relative z-10 text-center max-w-md">
                    <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center glow-cyan">
                        <svg
                            className="w-8 h-8 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold mb-4">Selamat Datang</h1>
                    <p className="text-lg text-white/80 leading-relaxed">
                        Kelola data pengguna, pantau analitik, dan optimalkan
                        workflow Anda dalam satu dashboard terintegrasi.
                    </p>
                    <div className="mt-8 flex gap-3 justify-center">
                        <span className="px-3 py-1 rounded-full bg-white/10 text-sm backdrop-blur-sm">
                            Dashboard
                        </span>
                        <span className="px-3 py-1 rounded-full bg-white/10 text-sm backdrop-blur-sm">
                            Analitik
                        </span>
                        <span className="px-3 py-1 rounded-full bg-white/10 text-sm backdrop-blur-sm">
                            Manajemen
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center p-8 bg-background">
                <Card className="w-full max-w-md glow-cyan">
                    <CardHeader>
                        <div className="w-16 h-16 mx-auto mb-8 rounded-2xl lg:hidden bg-white/10 backdrop-blur-sm flex items-center justify-center glow-cyan">
                            <svg
                                className="w-8 h-8 text-black"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                        </div>
                        <CardTitle className="text-2xl">
                            Masuk ke Akun
                        </CardTitle>
                        <CardDescription>
                            Masukkan email dan password Anda untuk melanjutkan
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <CardContent className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-transparent"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="bg-transparent"
                                />
                            </div>
                            {error && (
                                <p className="text-sm text-neon-red">{error}</p>
                            )}
                        </CardContent>
                        <CardFooter>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-neon-purple/60 text-white hover:bg-neon-cyan/80 cursor-pointer"
                            >
                                {loading ? "Memproses..." : "Masuk"}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}
