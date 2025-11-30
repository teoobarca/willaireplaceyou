import React from 'react';
import { motion } from 'framer-motion';
import { User, Calculator, FileText, Activity, CheckCircle, AlertCircle, Tv, Zap } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import formImage from '../assets/form_screenshot.png';

// Utility for class merging
function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const NodeContainer = ({ children, className, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay, type: "spring" }}
        className={cn(
            "relative p-6 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl shadow-2xl",
            "hover:border-neon-cyan/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all duration-300",
            "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-b before:from-white/10 before:to-transparent before:pointer-events-none",
            className
        )}
    >
        {children}
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-neon-cyan opacity-50 rounded-tl-md" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-neon-cyan opacity-50 rounded-tr-md" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-neon-cyan opacity-50 rounded-bl-md" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-neon-cyan opacity-50 rounded-br-md" />
    </motion.div>
);

export const InputNode = ({ data }) => (
    <motion.div 
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="w-[700px] overflow-hidden rounded-2xl shadow-2xl"
    >
        <img src={formImage} alt="User Profile Form" className="w-full h-auto border border-white/20 rounded-2xl" />
    </motion.div>
);

export const CompetitionNode = () => (
    <motion.div 
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
        className="w-[900px] flex flex-col items-center text-center"
    >
        <div className="mb-12">
             <h2 className="text-2xl font-medium text-blue-300 tracking-[0.2em] uppercase mb-6">
                Challenge: Task 2
            </h2>
            <h1 className="text-7xl font-bold text-white tracking-tighter mb-8 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                Work & <span className="text-blue-400">Skills Revolution</span>
            </h1>
        </div>

        <div className="max-w-4xl relative">
            {/* Decorative quotes */}
            <span className="absolute -top-8 -left-12 text-8xl text-blue-500/20 font-serif">"</span>
            
            <p className="text-4xl font-light leading-snug text-blue-100">
                Build Something That Solves a <br/>
                <span className="text-white font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200">
                    Future Problem
                </span> 
                <span className="text-blue-300 mx-3">–</span> 
                Today.
            </p>
            
             <span className="absolute -bottom-12 -right-12 text-8xl text-blue-500/20 font-serif rotate-180">"</span>
        </div>
    </motion.div>
);

export const DecompositionNode = ({ title, items, type = "tasks" }) => (
    <NodeContainer className="w-[500px] border-neon-purple/30" delay={0.2}>
        <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-full bg-neon-purple/10 text-neon-purple">
                <Activity size={40} />
            </div>
            <h3 className="font-mono text-2xl font-bold text-neon-purple">
                {title.toUpperCase()}
            </h3>
        </div>
        <div className="space-y-3">
            {items.slice(0, 4).map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-lg font-mono bg-white/5 p-3 rounded border border-white/5">
                    <span className="truncate max-w-[350px]">
                        {type === "tasks" ? item.task_name : item.skill_name}
                    </span>
                    <span className="text-neon-purple">
                        {type === "tasks"
                            ? `${(item.time_share * 100).toFixed(0)}%`
                            : `${(item.importance * 100).toFixed(0)}%`}
                    </span>
                </div>
            ))}
        </div>
    </NodeContainer>
);

export const AgentNode = ({ taskName, status = "analyzing", score, compact = false }) => {
    const scorePercent = (score * 100).toFixed(0);
    
    // Base classes scaled up
    const widthClass = compact ? "w-[280px]" : "w-[350px]";
    
    return (
        <NodeContainer className={`${widthClass} border-acid-green/30`} delay={0.4}>
            <div className="flex items-center gap-3 mb-2">
                {status === "analyzing" && (
                    <span className="w-3 h-3 bg-acid-green rounded-full animate-ping" />
                )}
                <h3 className="font-mono text-sm font-bold text-acid-green">AI AGENT</h3>
            </div>
            {!compact && (
                <div className="text-sm text-gray-300 font-mono mb-3">
                    Analyzing: <span className="text-white block truncate">{taskName}</span>
                </div>
            )}
            <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden mb-2">
                <motion.div
                    className="h-full bg-acid-green"
                    initial={{ width: "0%" }}
                    animate={{ width: `${scorePercent}%` }}
                    transition={{ 
                        duration: 1.5,
                        ease: "easeOut"
                    }}
                />
            </div>
            <div className="flex justify-between items-center">
                 <span className="text-xs text-gray-400 truncate max-w-[180px]" title={taskName}>{taskName}</span>
                 <div className="text-right text-xs font-bold text-acid-green">
                    {scorePercent}%
                 </div>
            </div>
        </NodeContainer>
    );
};

export const ScoringNode = ({ taskScore, skillScore, finalScore }) => (
    <NodeContainer className="w-[450px] border-white/50 text-center" delay={0.6}>
        <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-white/10 text-white">
                <Calculator size={48} />
            </div>
        </div>
        <h3 className="font-mono text-xl text-gray-400 mb-4">REPLACABILITY SCORE</h3>

        <div className="flex justify-between text-sm text-gray-500 mb-2 px-4">
            <span>Tasks (40%)</span>
            <span>Skills (60%)</span>
        </div>
        <div className="flex justify-between text-xl font-mono text-gray-300 mb-6 px-4">
            <span>{(taskScore * 100).toFixed(0)}%</span>
            <span>{(skillScore * 100).toFixed(0)}%</span>
        </div>

        <div className="text-7xl font-bold font-mono text-white tracking-tighter text-shadow-glow">
            {(finalScore * 100).toFixed(0)}%
        </div>
    </NodeContainer>
);

export const ScenarioNode = ({ title, description, likelihood }) => (
    <NodeContainer className="w-[500px] border-neon-cyan/40" delay={0.8}>
        <div className="flex items-center gap-4 mb-3">
            <div className="p-3 rounded-full bg-neon-cyan/10 text-neon-cyan">
                <FileText size={32} />
            </div>
            <h3 className="font-mono text-xl font-bold text-neon-cyan">FUTURE SCENARIO</h3>
        </div>
        <h4 className="text-2xl font-bold text-white mb-2">{title}</h4>
        <p className="text-base text-gray-400 font-mono leading-relaxed mb-4">
            {description}
        </p>
        <div className="flex items-center gap-3">
            <span className="text-xs uppercase text-gray-500 font-bold">Likelihood:</span>
            <span className={cn(
                "text-xs px-3 py-1 rounded-full font-bold uppercase",
                likelihood === "high" ? "bg-red-500/20 text-red-400" :
                    likelihood === "medium" ? "bg-yellow-500/20 text-yellow-400" :
                        "bg-green-500/20 text-green-400"
            )}>
                {likelihood}
            </span>
        </div>
    </NodeContainer>
);
