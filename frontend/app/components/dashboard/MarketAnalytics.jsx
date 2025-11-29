"use client";

import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

export default function MarketAnalytics() {
    const sectors = [
        { name: "IT & Tech", growth: 85, trend: "up" },
        { name: "Healthcare", growth: 72, trend: "up" },
        { name: "Finance", growth: 45, trend: "down" },
        { name: "Manufacturing", growth: 38, trend: "down" },
        { name: "Retail", growth: 42, trend: "down" },
        { name: "Education", growth: 65, trend: "up" },
    ];

    const trends = {
        declining: [
            "Copywriting",
            "Data Entry",
            "Basic Accounting",
            "Customer Service",
        ],
        growing: [
            "AI Trainer",
            "Prompt Engineer",
            "Data Scientist",
            "Cybersecurity",
        ],
    };

    const yearlyData = [
        { year: "2025", value: 100 },
        { year: "2026", value: 115 },
        { year: "2027", value: 135 },
        { year: "2028", value: 160 },
        { year: "2029", value: 190 },
        { year: "2030", value: 225 },
    ];

    const maxValue = Math.max(...yearlyData.map((d) => d.value));

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative bg-white/5 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
        >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl opacity-30"></div>

            <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-blue-500/20 rounded-xl">
                        <BarChart3 className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">
                            Grafy a analytiky pracovného trhu
                        </h3>
                        <p className="text-sm text-zinc-400">Trendy 2025-2030</p>
                    </div>
                </div>

                {/* Outlook Chart */}
                <div className="mb-8">
                    <h4 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-4">
                        Výhľad AI-adaptovaných rolí
                    </h4>
                    <div className="bg-white/5 rounded-xl p-4">
                        <div className="flex items-end justify-between h-40 gap-2">
                            {yearlyData.map((data, index) => (
                                <div key={data.year} className="flex-1 flex flex-col items-center gap-2">
                                    <motion.div
                                        className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg relative group"
                                        initial={{ height: 0 }}
                                        animate={{ height: `${(data.value / maxValue) * 100}%` }}
                                        transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                                    >
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-2 py-1 rounded text-xs whitespace-nowrap">
                                            {data.value}%
                                        </div>
                                    </motion.div>
                                    <span className="text-xs text-zinc-400">{data.year}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Heatmap */}
                <div className="mb-8">
                    <h4 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-4">
                        Heatmapa zamestnanosti podľa odvetvia
                    </h4>
                    <div className="space-y-3">
                        {sectors.map((sector, index) => (
                            <motion.div
                                key={sector.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + index * 0.05 }}
                                className="flex items-center gap-3"
                            >
                                <div className="flex-1">
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm text-zinc-300">{sector.name}</span>
                                        <div className="flex items-center gap-2">
                                            {sector.trend === "up" ? (
                                                <TrendingUp className="w-4 h-4 text-green-400" />
                                            ) : (
                                                <TrendingDown className="w-4 h-4 text-red-400" />
                                            )}
                                            <span className="text-sm font-semibold text-white">
                                                {sector.growth}%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            className={`h-full ${sector.growth > 60
                                                    ? "bg-green-500"
                                                    : sector.growth > 40
                                                        ? "bg-yellow-500"
                                                        : "bg-red-500"
                                                }`}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${sector.growth}%` }}
                                            transition={{ duration: 1, delay: 0.4 + index * 0.05 }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Trends */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <TrendingDown className="w-5 h-5 text-red-400" />
                            <h5 className="font-semibold text-white">Klesajúce pozície</h5>
                        </div>
                        <div className="space-y-2">
                            {trends.declining.map((role) => (
                                <div
                                    key={role}
                                    className="text-sm text-zinc-300 bg-white/5 px-3 py-2 rounded-lg"
                                >
                                    {role}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <TrendingUp className="w-5 h-5 text-green-400" />
                            <h5 className="font-semibold text-white">Rastúce pozície</h5>
                        </div>
                        <div className="space-y-2">
                            {trends.growing.map((role) => (
                                <div
                                    key={role}
                                    className="text-sm text-zinc-300 bg-white/5 px-3 py-2 rounded-lg"
                                >
                                    {role}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
