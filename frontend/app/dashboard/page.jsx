"use client";

import { motion } from "framer-motion";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import RiskAssessment from "../components/dashboard/RiskAssessment";

export default function DashboardPage() {
    return (
        <DashboardLayout
            pageTitle="Dashboard"
            pageDescription="Vitajte späť! Tu je váš prehľad."
        >
            <div className="space-y-6">
                {/* Welcome Message */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-6"
                >
                    <h2 className="text-xl font-bold text-white mb-2">
                        Vitajte vo vašom AI Career Dashboard
                    </h2>
                    <p className="text-zinc-400">
                        Analyzujte svoju pozíciu, objavte nové príležitosti a pripravte sa
                        na budúcnosť práce s umelou inteligenciou.
                    </p>
                </motion.div>

                {/* Risk Assessment - Main Component */}
                <RiskAssessment />

                {/* Quick Links to Other Sections */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                    <a
                        href="/dashboard/analytics"
                        className="group bg-white/5 backdrop-blur-2xl border border-white/20 rounded-xl p-6 hover:bg-white/10 transition-all cursor-pointer"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-all">
                                <svg
                                    className="w-5 h-5 text-blue-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-white">Market Analytics</h3>
                        </div>
                        <p className="text-sm text-zinc-400">
                            Trendy a analytiky pracovného trhu 2025-2030
                        </p>
                    </a>

                    <a
                        href="/dashboard/skills"
                        className="group bg-white/5 backdrop-blur-2xl border border-white/20 rounded-xl p-6 hover:bg-white/10 transition-all cursor-pointer"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-all">
                                <svg
                                    className="w-5 h-5 text-purple-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                    />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-white">Skills Engine</h3>
                        </div>
                        <p className="text-sm text-zinc-400">
                            Odporúčané zručnosti pre vašu pozíciu
                        </p>
                    </a>

                    <a
                        href="/dashboard/roadmap"
                        className="group bg-white/5 backdrop-blur-2xl border border-white/20 rounded-xl p-6 hover:bg-white/10 transition-all cursor-pointer"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-all">
                                <svg
                                    className="w-5 h-5 text-green-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-white">Learning Roadmap</h3>
                        </div>
                        <p className="text-sm text-zinc-400">
                            Personalizovaný plán vzdelávania
                        </p>
                    </a>

                    <a
                        href="/dashboard/careers"
                        className="group bg-white/5 backdrop-blur-2xl border border-white/20 rounded-xl p-6 hover:bg-white/10 transition-all cursor-pointer"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-orange-500/20 rounded-lg group-hover:bg-orange-500/30 transition-all">
                                <svg
                                    className="w-5 h-5 text-orange-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                                    />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-white">Career Paths</h3>
                        </div>
                        <p className="text-sm text-zinc-400">
                            Alternatívne kariérne možnosti
                        </p>
                    </a>
                </motion.div>

                {/* Footer Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center py-8"
                >
                    <p className="text-sm text-zinc-500">
                        Údaje sú aktualizované v reálnom čase na základe trhových trendov a
                        AI analýz.
                    </p>
                </motion.div>
            </div>
        </DashboardLayout>
    );
}