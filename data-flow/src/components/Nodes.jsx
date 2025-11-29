import React from 'react';
import { motion } from 'framer-motion';
import { User, Calculator, FileText, Activity, CheckCircle, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
            "relative p-4 rounded-xl border border-white/20 bg-white/5 backdrop-blur-xl shadow-2xl",
            "hover:border-neon-cyan/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all duration-300",
            "before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-b before:from-white/10 before:to-transparent before:pointer-events-none",
            className
        )}
    >
        {children}
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neon-cyan opacity-50 rounded-tl-sm" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neon-cyan opacity-50 rounded-tr-sm" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-neon-cyan opacity-50 rounded-bl-sm" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neon-cyan opacity-50 rounded-br-sm" />
    </motion.div>
);

export const InputNode = ({ data }) => (
    <NodeContainer className="w-72 border-neon-cyan/30">
        <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-full bg-neon-cyan/10 text-neon-cyan">
                <User size={20} />
            </div>
            <h3 className="font-mono text-sm font-bold text-neon-cyan">USER PROFILE</h3>
        </div>
        <div className="space-y-1 text-xs text-gray-400 font-mono">
            <p><span className="text-gray-500">ROLE:</span> {data.jobTitle}</p>
            <p><span className="text-gray-500">AGE:</span> {data.age}</p>
            <p><span className="text-gray-500">LOC:</span> {data.location}</p>
            <p className="truncate"><span className="text-gray-500">EDU:</span> {data.education}</p>
        </div>
    </NodeContainer>
);

export const DecompositionNode = ({ title, items, type = "tasks" }) => (
    <NodeContainer className="w-80 border-neon-purple/30" delay={0.2}>
        <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-full bg-neon-purple/10 text-neon-purple">
                <Activity size={20} />
            </div>
            <h3 className="font-mono text-sm font-bold text-neon-purple">
                {title.toUpperCase()}
            </h3>
        </div>
        <div className="space-y-2">
            {items.slice(0, 4).map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs font-mono bg-white/5 p-2 rounded border border-white/5">
                    <span className="truncate max-w-[180px]">
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
    
    return (
        <NodeContainer className={compact ? "w-[150px] p-2 border-acid-green/30" : "w-48 border-acid-green/30"} delay={0.4}>
            <div className="flex items-center gap-2 mb-1">
                {status === "analyzing" && (
                    <span className="w-1.5 h-1.5 bg-acid-green rounded-full animate-ping" />
                )}
                <h3 className="font-mono text-[10px] font-bold text-acid-green">AI AGENT</h3>
            </div>
            {!compact && (
                <div className="text-[10px] text-gray-300 font-mono mb-2">
                    Analyzing: <span className="text-white block truncate">{taskName}</span>
                </div>
            )}
            <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden mb-1">
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
                 <span className="text-[9px] text-gray-400 truncate max-w-[60px]" title={taskName}>{taskName}</span>
                 <div className="text-right text-[9px] font-bold text-acid-green">
                    {scorePercent}%
                 </div>
            </div>
        </NodeContainer>
    );
};

export const ScoringNode = ({ taskScore, skillScore, finalScore }) => (
    <NodeContainer className="w-64 border-white/50 text-center" delay={0.6}>
        <div className="flex justify-center mb-2">
            <div className="p-2 rounded-full bg-white/10 text-white">
                <Calculator size={24} />
            </div>
        </div>
        <h3 className="font-mono text-xs text-gray-400 mb-2">REPLACABILITY SCORE</h3>

        <div className="flex justify-between text-[10px] text-gray-500 mb-1 px-2">
            <span>Tasks (40%)</span>
            <span>Skills (60%)</span>
        </div>
        <div className="flex justify-between text-xs font-mono text-gray-300 mb-3 px-2">
            <span>{(taskScore * 100).toFixed(0)}%</span>
            <span>{(skillScore * 100).toFixed(0)}%</span>
        </div>

        <div className="text-5xl font-bold font-mono text-white tracking-tighter text-shadow-glow">
            {(finalScore * 100).toFixed(0)}%
        </div>
    </NodeContainer>
);

export const ScenarioNode = ({ title, description, likelihood }) => (
    <NodeContainer className="w-80 border-neon-cyan/40" delay={0.8}>
        <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-full bg-neon-cyan/10 text-neon-cyan">
                <FileText size={20} />
            </div>
            <h3 className="font-mono text-sm font-bold text-neon-cyan">FUTURE SCENARIO</h3>
        </div>
        <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
        <p className="text-xs text-gray-400 font-mono leading-relaxed mb-3">
            {description}
        </p>
        <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase text-gray-500 font-bold">Likelihood:</span>
            <span className={cn(
                "text-[10px] px-2 py-0.5 rounded-full font-bold uppercase",
                likelihood === "high" ? "bg-red-500/20 text-red-400" :
                    likelihood === "medium" ? "bg-yellow-500/20 text-yellow-400" :
                        "bg-green-500/20 text-green-400"
            )}>
                {likelihood}
            </span>
        </div>
    </NodeContainer>
);
