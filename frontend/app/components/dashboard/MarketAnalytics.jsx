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

    // Generate SVG path for the curve
    const generatePath = () => {
        const points = yearlyData.map((data, i) => {
            const x = (i / (yearlyData.length - 1)) * 100;
            const y = 100 - (data.value / maxValue) * 100;
            return { x, y };
        });

        let path = `M ${points[0].x} ${points[0].y}`;
        for (let i = 1; i < points.length; i++) {
            path += ` L ${points[i].x} ${points[i].y}`;
        }
        return path;
    };

    const generateAreaPath = () => {
        const linePath = generatePath();
        return `${linePath} L 100 100 L 0 100 Z`;
    };

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
                            Job Market Graphs & Analytics
                        </h3>
                        <p className="text-sm text-zinc-400">Trends 2025–2030</p>
                    </div>
                </div>

                {/* Line Chart with Curve */}
                <div className="mb-8">
                    <h4 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-4">
                        AI-Adapted Role Outlook
                    </h4>
                    <div className="bg-white/5 rounded-xl p-6">
                        <div className="relative h-48">
                            {/* SVG Chart */}
                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#3b82f6" />
                                        <stop offset="100%" stopColor="#a855f7" />
                                    </linearGradient>
                                    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                                        <stop offset="100%" stopColor="#a855f7" stopOpacity="0.05" />
                                    </linearGradient>
                                </defs>

                                {/* Area under curve */}
                                <motion.path
                                    d={generateAreaPath()}
                                    fill="url(#areaGradient)"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1, delay: 0.3 }}
                                />

                                {/* Curve line */}
                                <motion.path
                                    d={generatePath()}
                                    stroke="url(#lineGradient)"
                                    strokeWidth="0.5"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1.5, delay: 0.2 }}
                                />

                                {/* Data points */}
                                {yearlyData.map((data, i) => {
                                    const x = (i / (yearlyData.length - 1)) * 100;
                                    const y = 100 - (data.value / maxValue) * 100;
                                    return (
                                        <motion.g key={i}>
                                            <motion.circle
                                                cx={x}
                                                cy={y}
                                                r="1.5"
                                                fill="#fff"
                                                stroke="url(#lineGradient)"
                                                strokeWidth="0.5"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                                            />
                                        </motion.g>
                                    );
                                })}
                            </svg>

                            {/* Year labels */}
                            <div className="absolute -bottom-6 left-0 right-0 flex justify-between">
                                {yearlyData.map((data) => (
                                    <span key={data.year} className="text-xs text-zinc-400">
                                        {data.year}
                                    </span>
                                ))}
                            </div>

                            {/* Hover tooltips */}
                            {yearlyData.map((data, index) => (
                                <div
                                    key={index}
                                    className="absolute group cursor-pointer"
                                    style={{
                                        left: `${(index / (yearlyData.length - 1)) * 100}%`,
                                        top: `${100 - (data.value / maxValue) * 100}%`,
                                        transform: 'translate(-50%, -50%)',
                                    }}
                                >
                                    <div className="w-3 h-3 rounded-full bg-transparent group-hover:bg-white/20 transition-all"></div>
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap font-semibold border border-white/20 pointer-events-none">
                                        {data.value}% Growth
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Heatmap */}
                <div className="mb-8">
                    <h4 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-4">
                        Employment Heatmap by Sector
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
                            <h5 className="font-semibold text-white">Declining Positions</h5>
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
                            <h5 className="font-semibold text-white">Growing Positions</h5>
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
