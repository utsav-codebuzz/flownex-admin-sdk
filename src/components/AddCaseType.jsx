import { useState } from "react";
import { FlownexAdminSDK } from "../utils/sdk";

export default function AddCaseType({ baseURL, token }) {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async () => {
        setError("");
        setSuccess("");

        if (!name.trim()) {
            setError("Case type name is required");
            return;
        }

        setLoading(true);
        try {
            const sdk = new FlownexAdminSDK({ baseURL, token });
            const res = await sdk.addCaseType({ name });
            console.log("Case Type Added:", res);
            setSuccess("Case type added successfully!");
            setName("");
        } catch (err) {
            setError(err?.message || "Failed to add case type");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-lg p-8 animate-fadeIn">
            <h2 className="text-2xl font-bold mb-6">Add Case Type</h2>

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

            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Case Type Name</label>
                <input
                    className="border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-3 w-full rounded-lg focus:ring-2 focus:ring-purple-500 dark:text-white"
                    placeholder="Enter case type name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <button
                className={`w-full p-3 rounded-lg text-white font-semibold transition flex items-center justify-center gap-2
${loading ? "bg-gray-400" : "bg-purple-600 hover:bg-purple-700"}`}
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading && <span className="loader"></span>}
                {loading ? "Adding..." : "Add Case Type"}
            </button>
        </div>
    );
}