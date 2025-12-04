import React, { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { FlownexAdminSDK } from "../utils/sdk";

export default function Login({ baseURL, onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setError("");
        if (!email || !password) {
            setError("Email and password are required.");
            return;
        }
        setLoading(true);
        try {
            const sdk = new FlownexAdminSDK({ baseURL });
            const res = await sdk.loginAdmin({ email, password });
            if (onLogin) onLogin(res);
        } catch (err) {
            setError(err?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border dark:border-gray-700">
            <h2 className="text-2xl font-bold text-center mb-6 tracking-tight">Sub Admin Login</h2>

            {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 border border-red-300">
                    {error}
                </div>
            )}

            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>

            <div className="mb-5">
                <label className="block text-sm font-medium mb-1">Password</label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full px-4 py-3 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                    />

                    <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
            </div>

            <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full py-3 flex items-center justify-center rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
            >
                {loading ? <Loader2 size={20} className="animate-spin" /> : "Login"}
            </button>
        </div>
    );
}
