import React from 'react';
import {
    Brain,
    Terminal,
    Cpu,
    Zap,
    Clock,
    ArrowUpRight,
    Activity,
    BoxSelect
} from 'lucide-react';

const SkillsDashboard = () => {
    return (
        <div className="min-h-screen bg-[#050505] text-[#e5e5e5] p-6 md:p-12 font-sans flex items-center justify-center selection:bg-[#ff3333] selection:text-white">

            {/* Main Chassis */}
            <div className="max-w-6xl w-full border border-[#262626] bg-[#0a0a0a] shadow-2xl relative">

                {/* Top Technical Bar */}
                <div className="flex justify-between items-center px-6 py-3 border-b border-[#262626] bg-[#0f0f0f]">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#ff3333] animate-pulse"></div>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#666]">System Analysis // v.4.0.2</span>
                    </div>
                    <div className="flex gap-4">
                        {/* Decorative indicator lights */}
                        <div className="flex gap-1">
                            <div className="w-1 h-3 bg-[#333]"></div>
                            <div className="w-1 h-3 bg-[#333]"></div>
                            <div className="w-1 h-3 bg-[#ff3333]"></div>
                        </div>
                    </div>
                </div>

                {/* Header Section */}
                <header className="p-8 md:p-10 border-b border-[#262626] bg-[linear-gradient(45deg,#0a0a0a_25%,#0d0d0d_25%,#0d0d0d_50%,#0a0a0a_50%,#0a0a0a_75%,#0d0d0d_75%,#0d0d0d_100%)] bg-[size:20px_20px]">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-3xl md:text-5xl font-serif tracking-tight text-white mb-2">
                                Odporúčané zručnosti
                            </h1>
                            <p className="font-mono text-sm text-[#888] max-w-md">
                                _AI_SKILLS_ENGINE output sequence. Optimized for high-latency career adaptation.
                            </p>
                        </div>
                        <div className="hidden md:flex border border-[#333] p-2 items-center gap-4 bg-[#050505]">
                            <Activity size={20} className="text-[#666]" />
                            <div className="flex flex-col">
                                <span className="text-[10px] text-[#444] uppercase font-bold">Processing</span>
                                <span className="text-xs font-mono text-[#ff3333]">ACTIVE</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* The Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#262626]">

                    {/* Quadrant 1: Soft Skills */}
                    <Section
                        title="Human Interface"
                        subtitle="Soft Skills"
                        icon={<Brain size={16} />}
                        accent="border-[#ff9900]"
                    >
                        <SkillRow
                            label="Kritické myslenie"
                            time="6 mo"
                            level={60}
                            activeColor="bg-[#ff9900]"
                        />
                        <SkillRow
                            label="Komunikácia"
                            time="3 mo"
                            level={40}
                            activeColor="bg-[#ff9900]"
                        />
                        <SkillRow
                            label="Adaptabilita"
                            time="4 mo"
                            level={80}
                            activeColor="bg-[#ff9900]"
                        />
                    </Section>

                    {/* Quadrant 2: Tech Skills */}
                    <Section
                        title="Core Runtime"
                        subtitle="Technické Skills"
                        icon={<Terminal size={16} />}
                        accent="border-[#00ccff]"
                    >
                        <SkillRow
                            label="Python"
                            time="8 mo"
                            level={90}
                            activeColor="bg-[#00ccff]"
                        />
                        <SkillRow
                            label="Data Analysis"
                            time="6 mo"
                            level={80}
                            activeColor="bg-[#00ccff]"
                        />
                        <SkillRow
                            label="SQL Protocols"
                            time="4 mo"
                            level={60}
                            activeColor="bg-[#00ccff]"
                        />
                    </Section>

                    {/* Quadrant 3: AI Tools */}
                    <Section
                        title="Neural Tools"
                        subtitle="AI Nástroje"
                        icon={<Zap size={16} />}
                        accent="border-[#ff3333]"
                        className="border-t border-[#262626]"
                    >
                        <SkillRow
                            label="ChatGPT Adv."
                            time="2 mo"
                            level={40}
                            activeColor="bg-[#ff3333]"
                        />
                        <SkillRow
                            label="Midjourney"
                            time="1 mo"
                            level={20}
                            activeColor="bg-[#ff3333]"
                        />
                        <SkillRow
                            label="GitHub Copilot"
                            time="3 mo"
                            level={60}
                            activeColor="bg-[#ff3333]"
                        />
                    </Section>

                    {/* Quadrant 4: Future */}
                    <Section
                        title="Future State"
                        subtitle="Budúce Kompetencie"
                        icon={<Cpu size={16} />}
                        accent="border-[#ccff00]"
                        className="border-t border-[#262626]"
                    >
                        <SkillRow
                            label="AI Ethics"
                            time="5 mo"
                            level={80}
                            activeColor="bg-[#ccff00]"
                        />
                        <SkillRow
                            label="Prompt Eng."
                            time="3 mo"
                            level={60}
                            activeColor="bg-[#ccff00]"
                        />
                        <SkillRow
                            label="Model Training"
                            time="12 mo"
                            level={100}
                            activeColor="bg-[#ccff00]"
                        />
                    </Section>

                </div>

                {/* Footer Metrics */}
                <div className="border-t border-[#262626] bg-[#0d0d0d] grid grid-cols-1 md:grid-cols-3">
                    <StatBox number="12" label="Total Modules" sub="Active streams" />
                    <StatBox number="~6" label="Avg Duration" sub="Months estimated" />
                    <StatBox number="3.2" label="Difficulty Index" sub="Scale 1.0 - 5.0" last />
                </div>

            </div>
        </div>
    );
};

// --- Subcomponents ---

const Section = ({ title, subtitle, icon, accent, children, className }) => (
    <div className={`p-8 relative group ${className} bg-[#0a0a0a] hover:bg-[#0f0f0f] transition-colors duration-300`}>
        <div className={`absolute left-0 top-8 bottom-8 w-[2px] ${accent} opacity-40 group-hover:opacity-100 transition-opacity`}></div>

        <div className="flex items-center gap-3 mb-8 pl-4">
            <div className="p-2 border border-[#333] bg-[#050505] text-[#888]">
                {icon}
            </div>
            <div>
                <h3 className="text-xs font-mono uppercase text-[#666] tracking-widest">{title}</h3>
                <h4 className="text-lg font-bold text-[#eee]">{subtitle}</h4>
            </div>
        </div>

        <div className="space-y-6 pl-4">
            {children}
        </div>
    </div>
);

const SkillRow = ({ label, time, level, activeColor }) => (
    <div className="group/item">
        <div className="flex justify-between items-end mb-2">
            <span className="font-serif text-lg text-[#ccc] group-hover/item:text-white transition-colors">
                {label}
            </span>
            <div className="flex items-center gap-1 text-[10px] font-mono text-[#555] bg-[#0f0f0f] px-1.5 py-0.5 border border-[#222]">
                <Clock size={10} />
                {time}
            </div>
        </div>

        {/* Technical Progress Bar */}
        <div className="h-1.5 w-full bg-[#1a1a1a] flex gap-[1px]">
            {[...Array(10)].map((_, i) => (
                <div
                    key={i}
                    className={`flex-1 transition-all duration-300 ${(i * 10) < level
                            ? `${activeColor} opacity-80 group-hover/item:opacity-100 shadow-[0_0_5px_currentColor]`
                            : 'bg-[#1a1a1a]'
                        }`}
                ></div>
            ))}
        </div>
    </div>
);

const StatBox = ({ number, label, sub, last }) => (
    <div className={`p-6 md:p-8 flex items-center justify-between group hover:bg-[#111] transition-colors ${!last ? 'md:border-r border-[#262626] border-b md:border-b-0' : ''}`}>
        <div>
            <div className="text-4xl font-bold text-white tracking-tighter mb-1">{number}</div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#666] group-hover:text-[#999]">{label}</div>
        </div>
        <div className="text-right">
            <BoxSelect size={20} className="ml-auto mb-2 text-[#333] group-hover:text-[#555]" />
            <div className="text-[10px] text-[#444] font-mono">{sub}</div>
        </div>
    </div>
);

export default SkillsDashboard;