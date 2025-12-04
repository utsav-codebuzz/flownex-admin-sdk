import { useState } from "react";
import { FlownexAdminSDK } from "../utils/sdk";

export interface AddUserProps {
    baseURL: string;
    token?: string;
}

export interface UserForm {
    name: string;
    email: string;
    phone: string;
}

export default function AddUser({ baseURL }: AddUserProps) {
    const [form, setForm] = useState<UserForm>({ name: "", email: "", phone: "" });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    const update = (k: keyof UserForm, v: string) =>
        setForm((prev) => ({ ...prev, [k]: v }));

    const handleSubmit = async () => {
        setError("");
        setSuccess("");

        if (!form.name || !form.email || !form.phone) {
            setError("All fields are required");
            return;
        }

        setLoading(true);

        try {
            const sdk = new FlownexAdminSDK({ baseURL, storage: localStorage });
            const res = await sdk.addUser(form);

            console.log("User created:", res);
            setSuccess("User created successfully!");
            setForm({ name: "", email: "", phone: "" });
        } catch (err: any) {
            setError(err?.message || "Failed to create user");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-lg p-8 animate-fadeIn">
            <h2 className="text-2xl font-bold mb-6">Add User</h2>

            {error && (
                <div className="mb-4 p-3 text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-200 rounded-lg text-sm">
                    {error}
                </div>
            )}

            {success && (
                <div className="mb-4 p-3 text-green-700 bg-green-100 dark:bg-green-900 dark:text-green-200 rounded-lg text-sm">
                    {success}
                </div>
            )}

            {(["name", "email", "phone"] as Array<keyof UserForm>).map((field) => (
                <div key={field} className="mb-4">
                    <label className="block text-sm font-medium mb-1 capitalize">{field}</label>
                    <input
                        className="border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 dark:text-white"
                        placeholder={`Enter ${field}`}
                        value={form[field]}
                        onChange={(e) => update(field, e.target.value)}
                    />
                </div>
            ))}

            <button
                className={`w-full p-3 rounded-lg text-white font-semibold transition flex items-center justify-center gap-2
        ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? "Adding..." : "Add User"}
            </button>
        </div>
    );
}
