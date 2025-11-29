"use client";

import { useState } from "react";
import { AlertTriangle, TrendingUp, Brain, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function RiskAssessment() {
    const [riskData] = useState({
        overallRisk: 68,
        breakdown: [
            { category: "Administratíva", percentage: 70, color: "bg-red-500" },
            { category: "Kreativita", percentage: 25, color: "bg-yellow-500" },
            { category: "Soft skills", percentage: 5, color: "bg-green-500" },
        ],
        summary: "Túto pozíciu môže AI nahradiť rýchlo",
        timeframe: "2-3 roky",
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative bg-white/5 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
        >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-2xl blur-xl opacity-30"></div>

            <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-red-500/20 rounded-xl">
                        <AlertTriangle className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">
                            Vyhodnotenie rizika nahradenia AI
                        </h3>
                        <p className="text-sm text-zinc-400">
                            Analýza vašej pozície
                        </p>
                    </div>
                </div>

                {/* Risk Percentage Circle */}
                <div className="flex flex-col items-center mb-8">
                    <div className="relative w-48 h-48 mb-4">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="96"
                                cy="96"
                                r="88"
                                stroke="rgba(255,255,255,0.1)"
                                strokeWidth="12"
                                fill="none"
                            />
                            <motion.circle
                                cx="96"
                                cy="96"
                                r="88"
                                stroke="url(#riskGradient)"
                                strokeWidth="12"
                                fill="none"
                                strokeLinecap="round"
                                initial={{ strokeDasharray: "0 552" }}
                                animate={{
                                    strokeDasharray: `${(riskData.overallRisk / 100) * 552} 552`,
                                }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                            <defs>
                                <linearGradient id="riskGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#ef4444" />
                                    <stop offset="100%" stopColor="#f97316" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-5xl font-bold text-white">
                                {riskData.overallRisk}%
                            </span>
                            <span className="text-sm text-zinc-400 mt-1">riziko</span>
                        </div>
                    </div>
                    <div className="text-center">
                        <p className="text-lg font-semibold text-white mb-1">
                            {riskData.summary}
                        </p>
                        <p className="text-sm text-zinc-400">
                            Predpokladaný časový rámec: {riskData.timeframe}
                        </p>
                    </div>
                </div>

                {/* Breakdown */}
                <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
                        Rozdelenie podľa kategórií
                    </h4>
                    {riskData.breakdown.map((item, index) => (
                        <motion.div
                            key={item.category}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            className="space-y-2"
                        >
                            <div className="flex justify-between text-sm">
                                <span className="text-zinc-300">{item.category}</span>
                                <span className="text-white font-semibold">
                                    {item.percentage}%
                                </span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    className={`h-full ${item.color}`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${item.percentage}%` }}
                                    transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Insights */}
                <div className="mt-6 grid grid-cols-3 gap-3">
                    <div className="bg-white/5 rounded-xl p-3 text-center">
                        <Brain className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                        <p className="text-xs text-zinc-400">AI Impact</p>
                        <p className="text-sm font-semibold text-white">Vysoký</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 text-center">
                        <TrendingUp className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                        <p className="text-xs text-zinc-400">Trend</p>
                        <p className="text-sm font-semibold text-white">Klesajúci</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 text-center">
                        <Users className="w-5 h-5 text-green-400 mx-auto mb-1" />
                        <p className="text-xs text-zinc-400">Dopyt</p>
                        <p className="text-sm font-semibold text-white">Stredný</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
