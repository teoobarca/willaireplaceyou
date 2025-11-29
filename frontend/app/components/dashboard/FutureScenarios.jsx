"use client";

import { useState, useEffect } from "react";
import { Calendar, TrendingUp, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useProfessionData from "../../hooks/useProfessionData";

export default function FutureScenarios() {
    const { data: professionData, loading, error } = useProfessionData();
    const [scenarios, setScenarios] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(0);

    useEffect(() => {
        if (!professionData || !professionData.future_scenarios) return;

        const formattedScenarios = professionData.future_scenarios.map((scenario, index) => {
            let likelihoodColor = "text-green-400";
            let likelihoodBg = "bg-green-500/10";
            let year = 2025 + index * 2;

            if (scenario.likelihood === "high") {
                likelihoodColor = "text-green-400";
                likelihoodBg = "bg-green-500/10";
            } else if (scenario.likelihood === "medium") {
                likelihoodColor = "text-yellow-400";
                likelihoodBg = "bg-yellow-500/10";
            } else {
                likelihoodColor = "text-red-400";
                likelihoodBg = "bg-red-500/10";
            }

            return {
                ...scenario,
                year,
                likelihoodColor,
                likelihoodBg,
            };
        });

        setScenarios(formattedScenarios);
    }, [professionData]);

    if (loading) {
        return (
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="text-zinc-400">Loading...</div>
                </div>
            </div>
        );
    }

    if (error || scenarios.length === 0) {
        return (
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="text-zinc-400">{error || "No scenarios data available"}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Future Scenarios</h2>
                <p className="text-sm text-zinc-400">
                    Potential evolution paths for your profession over the next 5-10 years
                </p>
            </div>

            {/* Timeline Overview */}
            <div className="mb-8 bg-white/5 rounded-lg p-4">
                <div className="flex items-center justify-between">
                    {scenarios.map((scenario, index) => (
                        <div key={index} className="flex flex-col items-center flex-1">
                            <div className={`w-12 h-12 rounded-full ${scenario.likelihoodBg} flex items-center justify-center mb-2`}>
                                <Calendar className={`w-6 h-6 ${scenario.likelihoodColor}`} />
                            </div>
                            <div className="text-xs font-semibold text-white">{scenario.year}</div>
                            <div className={`text-xs ${scenario.likelihoodColor} capitalize`}>
                                {scenario.likelihood}
                            </div>
                            {index < scenarios.length - 1 && (
                                <div className="w-full h-0.5 bg-white/10 mt-2"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Scenarios List */}
            <div className="space-y-4">
                {scenarios.map((scenario, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/5 rounded-lg border border-white/10 overflow-hidden"
                    >
                        <button
                            onClick={() => setExpandedIndex(expandedIndex === index ? -1 : index)}
                            className="w-full p-4 text-left hover:bg-white/5 transition-colors"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${scenario.likelihoodBg} ${scenario.likelihoodColor} border border-current`}>
                                            {scenario.likelihood.toUpperCase()}
                                        </div>
                                        <div className="text-xs text-zinc-500">~{scenario.year}</div>
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-1">
                                        {scenario.title}
                                    </h3>
                                    <p className="text-sm text-zinc-400 line-clamp-2">
                                        {scenario.description.split('\n')[0]}
                                    </p>
                                </div>
                                <div className="ml-4">
                                    {expandedIndex === index ? (
                                        <ChevronUp className="w-5 h-5 text-zinc-400" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-zinc-400" />
                                    )}
                                </div>
                            </div>
                        </button>

                        <AnimatePresence>
                            {expandedIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="border-t border-white/10"
                                >
                                    <div className="p-4 bg-white/5">
                                        <div className="prose prose-invert prose-sm max-w-none">
                                            {scenario.description.split('\n').map((paragraph, pIndex) => (
                                                paragraph.trim() && (
                                                    <p key={pIndex} className="text-sm text-zinc-300 mb-3 leading-relaxed">
                                                        {paragraph}
                                                    </p>
                                                )
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            {/* Summary */}
            <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-1">Key Takeaway</h4>
                        <p className="text-sm text-zinc-300">
                            The most likely scenario ({scenarios.find(s => s.likelihood === "high")?.title || "AI-Augmented Role"})
                            suggests that AI will augment rather than replace your role, with emphasis on human skills and strategic thinking.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
