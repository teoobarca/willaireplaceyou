import React, { useState } from 'react';
import {
    ArrowUpRight,
    GitMerge,
    Shuffle,
    Zap,
    Cpu,
    BarChart3,
    TrendingUp,
    AlertCircle,
    Layers,
    Terminal
} from 'lucide-react';

const CareerDashboard = () => {
    return (
        <div className="min-h-screen bg-[#050505] text-slate-200 p-6 md:p-12 font-sans selection:bg-amber-500/30 selection:text-amber-200 flex items-center justify-center">

            {/* Main Container - The "HUD" */}
            <div className="max-w-6xl w-full relative group">

                {/* Decorative Background Elements */}
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-900/20 via-slate-800/20 to-amber-900/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition duration-1000"></div>
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-20"></div>

                <div className="relative bg-[#0a0a0a] rounded-xl border border-white/5 overflow-hidden shadow-2xl backdrop-blur-sm">

                    {/* Header Section */}
                    <header className="p-8 border-b border-white/5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="p-2 bg-amber-500/10 rounded border border-amber-500/20 text-amber-500">
                                        <Shuffle size={20} />
                                    </span>
                                    <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500">Career Resilience Module</h2>
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                                    Alternatívne práce <span className="text-slate-500">s vyššou odolnosťou</span>
                                </h1>
                            </div>
                            <div className="text-right hidden md:block">
                                <div className="text-xs font-mono text-slate-500 mb-1">SYSTEM STATUS</div>
                                <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    OPTIMIZED FOR AI ERA
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Grid Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/5 bg-[#0a0a0a]">

                        {/* Column 1: Upgrade */}
                        <div className="relative p-6 group/col hover:bg-white/[0.02] transition-colors duration-300">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover/col:opacity-100 transition-opacity"></div>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                    <TrendingUp size={18} />
                                </div>
                                <h3 className="font-semibold text-lg text-slate-100">Upgrade Pozície</h3>
                            </div>

                            <div className="space-y-6">
                                <JobCard
                                    from="Junior Developer"
                                    to="AI-Assisted Developer"
                                    growth="+45%"
                                    difficulty="Stredná"
                                    accent="blue"
                                    icon={<Terminal size={14} />}
                                />
                                <JobCard
                                    from="Data Analyst"
                                    to="ML Engineer"
                                    growth="+65%"
                                    difficulty="Vysoká"
                                    accent="blue"
                                    icon={<Cpu size={14} />}
                                />
                            </div>
                        </div>

                        {/* Column 2: Lateral */}
                        <div className="relative p-6 group/col hover:bg-white/[0.02] transition-colors duration-300">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 opacity-0 group-hover/col:opacity-100 transition-opacity"></div>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-1.5 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                    <GitMerge size={18} />
                                </div>
                                <h3 className="font-semibold text-lg text-slate-100">Laterálny Presun</h3>
                            </div>

                            <div className="space-y-6">
                                <JobCard
                                    from="Copywriter"
                                    to="UX Writer"
                                    growth="+30%"
                                    difficulty="Nízka"
                                    accent="purple"
                                    icon={<Layers size={14} />}
                                />
                                <JobCard
                                    from="Designer"
                                    to="AI Design Specialist"
                                    growth="+50%"
                                    difficulty="Stredná"
                                    accent="purple"
                                    icon={<Zap size={14} />}
                                />
                            </div>
                        </div>

                        {/* Column 3: Pivot */}
                        <div className="relative p-6 group/col hover:bg-white/[0.02] transition-colors duration-300">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover/col:opacity-100 transition-opacity"></div>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-1.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                    <ArrowUpRight size={18} />
                                </div>
                                <h3 className="font-semibold text-lg text-slate-100">Career Pivot</h3>
                            </div>

                            <div className="space-y-6">
                                <JobCard
                                    from="Administratíva"
                                    to="AI Ops Coordinator"
                                    growth="+55%"
                                    difficulty="Stredná"
                                    accent="amber"
                                    icon={<Cpu size={14} />}
                                />
                                <JobCard
                                    from="Customer Service"
                                    to="AI Training Specialist"
                                    growth="+60%"
                                    difficulty="Stredná"
                                    accent="amber"
                                    icon={<Terminal size={14} />}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Info & Stats Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 border-t border-white/5">

                        {/* Why Change? Section */}
                        <div className="md:col-span-2 p-8 bg-gradient-to-br from-slate-900 via-[#0d0d0d] to-[#0a0a0a] relative overflow-hidden">
                            {/* Subtle background grid pattern */}
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-3 text-slate-300">
                                    <AlertCircle size={18} className="text-amber-500" />
                                    <h4 className="font-bold tracking-wide">Prečo zmeniť kariéru?</h4>
                                </div>
                                <p className="text-slate-400 leading-relaxed text-sm max-w-2xl">
                                    Pozície s vyššou odolnosťou voči AI kombinujú <span className="text-slate-200 font-medium">technické zručnosti</span> s ľudským úsudkom, kreativitou a empatiou. Tieto kompetencie sú ťažko automatizovateľné a budú v budúcnosti vysoko cenené.
                                </p>
                            </div>
                        </div>

                        {/* Stats Area */}
                        <div className="grid grid-cols-3 md:grid-cols-1 divide-x md:divide-x-0 md:divide-y divide-white/5 bg-[#080808]">
                            <StatItem label="Možností" value="6" />
                            <StatItem label="Priemerný rast" value="+51%" highlight />
                            <StatItem label="Úspešnosť" value="85%" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

// Sub-components for cleaner code

const JobCard = ({ from, to, growth, difficulty, accent, icon }) => {
    const accentColors = {
        blue: "group-hover:text-blue-400 group-hover:border-blue-500/30",
        purple: "group-hover:text-purple-400 group-hover:border-purple-500/30",
        amber: "group-hover:text-amber-400 group-hover:border-amber-500/30"
    };

    const bgColors = {
        blue: "group-hover:bg-blue-500/5",
        purple: "group-hover:bg-purple-500/5",
        amber: "group-hover:bg-amber-500/5"
    };

    const textAccents = {
        blue: "text-blue-400",
        purple: "text-purple-400",
        amber: "text-amber-400"
    }

    return (
        <div className={`group relative p-4 rounded-lg border border-white/5 bg-white/[0.01] transition-all duration-300 hover:scale-[1.02] ${accentColors[accent]} ${bgColors[accent]}`}>

            {/* Path visualizer */}
            <div className="flex flex-col gap-1 mb-3">
                <div className="text-xs text-slate-500 font-mono flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                    {from}
                </div>
                <div className="h-4 border-l border-dashed border-slate-700 ml-[3px] my-0.5"></div>
                <div className="text-sm font-bold text-slate-200 flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${textAccents[accent]} shadow-[0_0_8px_currentColor]`}></span>
                    {to}
                </div>
            </div>

            {/* Metrics Row */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5 group-hover:border-white/10">
                <div className={`text-xs font-mono font-bold flex items-center gap-1.5 ${textAccents[accent]}`}>
                    <BarChart3 size={12} />
                    {growth} ROI
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">Náročnosť</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-slate-300 ${difficulty === 'Vysoká' ? 'text-red-300 border-red-500/20' : ''}`}>
                        {difficulty}
                    </span>
                </div>
            </div>
        </div>
    );
};

const StatItem = ({ label, value, highlight }) => (
    <div className="flex flex-col items-center justify-center p-4 hover:bg-white/[0.02] transition-colors">
        <div className={`text-2xl md:text-3xl font-bold tracking-tight mb-1 ${highlight ? 'text-emerald-400' : 'text-white'}`}>
            {value}
        </div>
        <div className="text-[10px] uppercase tracking-[0.15em] text-slate-600 font-medium">
            {label}
        </div>
    </div>
);

export default CareerDashboard;