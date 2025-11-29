"use client";

import { useState } from "react";
import { Calendar, CheckCircle2, Circle, Book, Video, Brain } from "lucide-react";
import { motion } from "framer-motion";

export default function PersonalizedRoadmap() {
    const [checkedItems, setCheckedItems] = useState({});

    const roadmapData = {
        daily: "1 hodina",
        weeks: [
            {
                week: 1,
                title: "Základy AI a automatizácie",
                tasks: [
                    {
                        id: "w1t1",
                        title: "Úvod do AI a machine learning",
                        type: "video",
                        duration: "30 min",
                    },
                    {
                        id: "w1t2",
                        title: "Prečítať: AI v pracovnom prostredí",
                        type: "book",
                        duration: "30 min",
                    },
                ],
            },
            {
                week: 2,
                title: "Práca s AI nástrojmi",
                tasks: [
                    {
                        id: "w2t1",
                        title: "ChatGPT pre profesionálov - kurz",
                        type: "video",
                        duration: "45 min",
                    },
                    {
                        id: "w2t2",
                        title: "Praktické cvičenia s promptami",
                        type: "practice",
                        duration: "15 min",
                    },
                ],
            },
            {
                week: 3,
                title: "Data Analysis základy",
                tasks: [
                    {
                        id: "w3t1",
                        title: "Python pre začiatočníkov",
                        type: "video",
                        duration: "40 min",
                    },
                    {
                        id: "w3t2",
                        title: "Prvé kroky s pandas",
                        type: "practice",
                        duration: "20 min",
                    },
                ],
            },
            {
                week: 4,
                title: "Soft skills pre AI éru",
                tasks: [
                    {
                        id: "w4t1",
                        title: "Kritické myslenie a rozhodovanie",
                        type: "video",
                        duration: "35 min",
                    },
                    {
                        id: "w4t2",
                        title: "Adaptabilita v meniacom sa svete",
                        type: "book",
                        duration: "25 min",
                    },
                ],
            },
        ],
    };

    const toggleTask = (taskId) => {
        setCheckedItems((prev) => ({
            ...prev,
            [taskId]: !prev[taskId],
        }));
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case "video":
                return <Video className="w-4 h-4" />;
            case "book":
                return <Book className="w-4 h-4" />;
            case "practice":
                return <Brain className="w-4 h-4" />;
            default:
                return <Circle className="w-4 h-4" />;
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case "video":
                return "text-red-400";
            case "book":
                return "text-blue-400";
            case "practice":
                return "text-purple-400";
            default:
                return "text-zinc-400";
        }
    };

    const totalTasks = roadmapData.weeks.reduce(
        (acc, week) => acc + week.tasks.length,
        0
    );
    const completedTasks = Object.values(checkedItems).filter(Boolean).length;
    const progress = (completedTasks / totalTasks) * 100;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative bg-white/5 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
        >
            <div className="absolute -inset-1 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-2xl blur-xl opacity-30"></div>

            <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-green-500/20 rounded-xl">
                        <Calendar className="w-6 h-6 text-green-400" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-white">
                            Personalizovaná Roadmapa
                        </h3>
                        <p className="text-sm text-zinc-400">
                            Denný plán: {roadmapData.daily}
                        </p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-zinc-300">Celkový pokrok</span>
                        <span className="text-white font-semibold">
                            {completedTasks}/{totalTasks} úloh
                        </span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>

                {/* Weekly Plan */}
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                    {roadmapData.weeks.map((week, weekIndex) => (
                        <motion.div
                            key={week.week}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + weekIndex * 0.1 }}
                            className="bg-white/5 rounded-xl p-4 border border-white/10"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-sm font-bold text-white">
                                    {week.week}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white">{week.title}</h4>
                                    <p className="text-xs text-zinc-400">Týždeň {week.week}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                {week.tasks.map((task) => (
                                    <motion.div
                                        key={task.id}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => toggleTask(task.id)}
                                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${checkedItems[task.id]
                                                ? "bg-green-500/20 border border-green-500/30"
                                                : "bg-white/5 border border-white/10 hover:bg-white/10"
                                            }`}
                                    >
                                        {checkedItems[task.id] ? (
                                            <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                                        ) : (
                                            <Circle className="w-5 h-5 text-zinc-400 flex-shrink-0" />
                                        )}

                                        <div className="flex-1 min-w-0">
                                            <p
                                                className={`text-sm font-medium ${checkedItems[task.id]
                                                        ? "text-green-300 line-through"
                                                        : "text-white"
                                                    }`}
                                            >
                                                {task.title}
                                            </p>
                                            <div className="flex items-center gap-3 mt-1">
                                                <div
                                                    className={`flex items-center gap-1 text-xs ${getTypeColor(
                                                        task.type
                                                    )}`}
                                                >
                                                    {getTypeIcon(task.type)}
                                                    <span className="capitalize">{task.type}</span>
                                                </div>
                                                <span className="text-xs text-zinc-400">
                                                    {task.duration}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Stats */}
                <div className="mt-6 grid grid-cols-3 gap-3">
                    <div className="bg-white/5 rounded-xl p-3 text-center">
                        <p className="text-2xl font-bold text-white">{roadmapData.weeks.length}</p>
                        <p className="text-xs text-zinc-400">Týždňov</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 text-center">
                        <p className="text-2xl font-bold text-white">{Math.round(progress)}%</p>
                        <p className="text-xs text-zinc-400">Dokončené</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 text-center">
                        <p className="text-2xl font-bold text-white">{totalTasks - completedTasks}</p>
                        <p className="text-xs text-zinc-400">Zostáva</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
