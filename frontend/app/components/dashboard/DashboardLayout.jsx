"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    BarChart3,
    Lightbulb,
    Calendar,
    Shuffle,
    Menu,
    X,
    Home,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children, pageTitle, pageDescription }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
        { name: "Analytics", icon: BarChart3, href: "/dashboard/analytics" },
        { name: "Skills", icon: Lightbulb, href: "/dashboard/skills" },
        { name: "Roadmap", icon: Calendar, href: "/dashboard/roadmap" },
        { name: "Career Paths", icon: Shuffle, href: "/dashboard/careers" },
    ];

    return (
        <div className="min-h-screen bg-black text-white">

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-white/5 backdrop-blur-2xl border-r border-white/10 z-50 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full p-6">
                    {/* Logo */}
                    <div className="flex items-center justify-between mb-8">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                                <Home className="w-5 h-5" />
                            </div>
                            <span className="text-xl font-bold">AI Career</span>
                        </Link>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden text-zinc-400 hover:text-white"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                        ? "bg-white/10 text-white"
                                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:ml-64">
                {/* Header */}
                <header className="sticky top-0 z-30 bg-black/50 backdrop-blur-xl border-b border-white/10">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden text-zinc-400 hover:text-white"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-white">{pageTitle}</h1>
                                {pageDescription && (
                                    <p className="text-sm text-zinc-400">{pageDescription}</p>
                                )}
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="hidden md:flex items-center gap-4">
                            <div className="bg-white/5 rounded-xl px-4 py-2 border border-white/10">
                                <p className="text-xs text-zinc-400">Riziko</p>
                                <p className="text-lg font-bold text-red-400">68%</p>
                            </div>
                            <div className="bg-white/5 rounded-xl px-4 py-2 border border-white/10">
                                <p className="text-xs text-zinc-400">Pokrok</p>
                                <p className="text-lg font-bold text-green-400">25%</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6 relative">
                    <div className="max-w-7xl mx-auto">{children}</div>
                </main>
            </div>
        </div>
    );
}
