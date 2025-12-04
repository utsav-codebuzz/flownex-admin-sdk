import { ReactNode, useState } from "react";
import { NavLink } from "react-router-dom";
import {
    Bell,
    Menu,
    X,
    Sun,
    Moon,
    LayoutDashboard,
    UserPlus,
    FilePlus2,
} from "lucide-react";

export interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
    const [notifOpen, setNotifOpen] = useState<boolean>(false);
    const [dark, setDark] = useState<boolean>(false);

    const menuItems = [
        { to: "/login", label: "Login", icon: LayoutDashboard },
        { to: "/add-user", label: "Add User", icon: UserPlus },
        { to: "/add-case-type", label: "Add Case Type", icon: FilePlus2 },
    ];

    return (
        <div className={dark ? "dark" : ""}>
            <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-gray-100">
                <aside
                    className={`
            ${sidebarOpen ? "w-72" : "w-24"}
            bg-white/80 dark:bg-gray-800/80
            backdrop-blur-xl border-r
            dark:border-gray-700 shadow-2xl
            transition-all duration-300
            flex flex-col relative
          `}
                >
                    <div className="px-6 py-5 border-b dark:border-gray-700 flex items-center justify-between">
                        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {sidebarOpen ? "Flownex Admin" : "FX"}
                        </h1>

                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 rounded-xl text-gray-500 hover:bg-gray-200 
              dark:hover:bg-gray-700 dark:text-gray-300 transition"
                        >
                            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>

                    {sidebarOpen && (
                        <div className="px-6 pt-4 pb-2 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            Main Navigation
                        </div>
                    )}

                    <nav className="px-3 py-2 flex flex-col gap-2">
                        {menuItems.map(({ to, label, icon: Icon }) => (
                            <NavLink
                                key={to}
                                to={to}
                                className={({ isActive }) =>
                                    `
                    group relative flex items-center gap-3
                    px-4 py-3 rounded-xl font-medium transition-all
                    ${isActive
                                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20"
                                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-200/70 dark:hover:bg-gray-700"
                                    }
                  `
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && (
                                            <span className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r-xl"></span>
                                        )}
                                        <Icon size={20} className="min-w-[20px]" />
                                        {sidebarOpen && <span>{label}</span>}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="mt-auto p-5 border-t dark:border-gray-700">
                        {sidebarOpen ? (
                            <div className="text-sm text-gray-500 dark:text-gray-400">© 2025 Flownex Admin</div>
                        ) : (
                            <div className="text-xs text-center text-gray-400">© FX</div>
                        )}
                    </div>
                </aside>

                <div className="flex-1 flex flex-col">
                    <header className="bg-white dark:bg-gray-800 shadow-lg px-8 py-5 flex items-center justify-between border-b dark:border-gray-700">
                        <h2 className="font-bold text-2xl">Admin Dashboard</h2>

                        <div className="flex items-center gap-5">
                            <button
                                onClick={() => setDark(!dark)}
                                className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700
                  text-gray-700 dark:text-gray-200 hover:shadow-md transition"
                            >
                                {dark ? <Sun size={20} /> : <Moon size={20} />}
                            </button>

                            <div className="relative">
                                <button
                                    onClick={() => setNotifOpen(!notifOpen)}
                                    className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700 hover:shadow-md relative"
                                >
                                    <Bell size={20} />
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px]
                    w-5 h-5 flex items-center justify-center rounded-full shadow ring-2 ring-white dark:ring-gray-800">
                                        3
                                    </span>
                                </button>

                                {notifOpen && (
                                    <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-800
                    border dark:border-gray-700 shadow-xl rounded-xl animate-dropdown z-50">
                                        <div className="px-4 py-3 border-b dark:border-gray-700 flex justify-between">
                                            <h3 className="font-semibold">Notifications</h3>
                                            <button className="text-xs text-blue-600 hover:underline">Mark all as read</button>
                                        </div>

                                        <ul className="max-h-64 overflow-y-auto">
                                            {["New User Registered", "New Case Type Added", "Server Backup Completed"].map((title, i) => (
                                                <li key={i} className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 border-b dark:border-gray-700">
                                                    <p className="font-medium">{title}</p>
                                                    <p className="text-xs text-gray-500">Just now</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 p-10 overflow-y-auto">
                        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-10 min-h-[500px] border dark:border-gray-700">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
