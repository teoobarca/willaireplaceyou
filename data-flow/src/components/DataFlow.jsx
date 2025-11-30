import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { InputNode, DecompositionNode, AgentNode, ScoringNode, ScenarioNode } from './Nodes';
import { Edge } from './Edges';

// Utility for class merging
function cn(...inputs) {
    return twMerge(clsx(inputs));
}

// --- MOCK DATA (Psychologist Scenario) ---
const MOCK_DATA = {
    profile: {
        jobTitle: "Psychológ",
        age: "35 rokov",
        location: "Bratislava",
        education: "PhD. Klinická psychológia"
    },
    tasks: [
        { task_name: "Diagnostické rozhovory", time_share: 0.30, score: 0.15 },
        { task_name: "Terapeutické sedenia", time_share: 0.40, score: 0.05 },
        { task_name: "Analýza a dokumentácia", time_share: 0.20, score: 0.85 },
        { task_name: "Administratíva", time_share: 0.10, score: 0.95 },
    ],
    skills: [
        { skill_name: "Empatia a aktívne počúvanie", importance: 0.35, score: 0.02 },
        { skill_name: "Klinická diagnostika", importance: 0.25, score: 0.30 },
        { skill_name: "Krízová intervencia", importance: 0.20, score: 0.10 },
        { skill_name: "Analytické myslenie", importance: 0.20, score: 0.70 },
    ],
    scenarios: [
        {
            title: "Hybridný Terapeut",
            description: "AI preberá 90% administratívy a diagnostiky. Psychológ sa venuje výhradne terapii a krízovým stavom.",
            likelihood: "high"
        },
        {
            title: "Plne Digitálny Kouč",
            description: "Pre bežné úzkosti AI nahrádza terapeuta. Ľudský psychológ rieši len najťažšie patológie.",
            likelihood: "medium"
        }
    ],
    scores: {
        taskScore: 0.36, // (0.3*0.15 + 0.4*0.05 + 0.2*0.85 + 0.1*0.95) = 0.045 + 0.02 + 0.17 + 0.095 = 0.33 (approx)
        skillScore: 0.24, // (0.35*0.02 + 0.25*0.30 + 0.20*0.10 + 0.20*0.70) = 0.007 + 0.075 + 0.02 + 0.14 = 0.242
        finalScore: 0.29  // (0.33 * 0.4) + (0.242 * 0.6) = 0.132 + 0.1452 = 0.277
    }
};

// --- 2. Generic Animated Component ---
const NodeContainer = ({ children, className, layout, id }) => {
    // Default layout if undefined
    const { x = 0, y = 0, opacity = 0, scale = 0.8, zIndex = 0, visible = false } = layout || {};

    if (!visible) return null;

    return (
        <motion.div
            layoutId={id} // Helps with smooth transitions between states if component stays mounted
            initial={false}
            animate={{
                x,
                y,
                opacity,
                scale,
                zIndex,
                translateX: "-50%",
                translateY: "-50%"
            }}
            transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier
                opacity: { duration: 0.5 }
            }}
            className={cn(
                "absolute top-1/2 left-1/2", // Centering hack
                className
            )}
        >
            {children}
        </motion.div>
    );
};

// --- 3. Scene Orchestration API ---

const OBJECTS = {
    INTRO: 'intro',
    INPUT_FORM: 'input_form',
    DECOMP_TASKS: 'decomp_tasks',
    DECOMP_SKILLS: 'decomp_skills',
    AGENTS_TASKS: 'agents_tasks', // Group of agents for tasks
    AGENTS_SKILLS: 'agents_skills', // Group of agents for skills
    SCORING: 'scoring',
    SCENARIO_1: 'scenario_1',
    SCENARIO_2: 'scenario_2',
    OUTRO: 'outro'
};

const SCENE_CONFIG = {
    0: { // Intro
        [OBJECTS.INTRO]: { x: 0, y: 0, opacity: 1, scale: 1.2, zIndex: 10, visible: true },
        [OBJECTS.INPUT_FORM]: { x: 500, y: 0, opacity: 0, scale: 0.8, visible: false },
    },
    1: { // Input Form (User Profile)
        [OBJECTS.INTRO]: { x: -500, y: 0, opacity: 0, scale: 0.8, visible: false },
        [OBJECTS.INPUT_FORM]: { x: 0, y: 0, opacity: 1, scale: 1.2, zIndex: 10, visible: true },
        [OBJECTS.DECOMP_TASKS]: { x: 500, y: -200, opacity: 0, scale: 0.5, visible: false },
        [OBJECTS.DECOMP_SKILLS]: { x: 500, y: 200, opacity: 0, scale: 0.5, visible: false },
    },
    2: { // Decomposition (Input -> Tasks/Skills)
        [OBJECTS.INPUT_FORM]: { x: -600, y: 0, opacity: 1, scale: 0.8, zIndex: 5, visible: true }, // Moved further left
        [OBJECTS.DECOMP_TASKS]: { x: 100, y: -250, opacity: 1, scale: 1.1, zIndex: 10, visible: true }, // Adjusted to right
        [OBJECTS.DECOMP_SKILLS]: { x: 100, y: 250, opacity: 1, scale: 1.1, zIndex: 10, visible: true }, // Adjusted to right
        [OBJECTS.AGENTS_TASKS]: { x: 500, y: -250, opacity: 0, scale: 0.5, visible: false },
        [OBJECTS.AGENTS_SKILLS]: { x: 500, y: 250, opacity: 0, scale: 0.5, visible: false },
    },
    3: { // Analysis Agents (Tasks/Skills -> Agents)
        [OBJECTS.INPUT_FORM]: { x: -1000, y: 0, opacity: 0, scale: 0.5, visible: false },
        [OBJECTS.DECOMP_TASKS]: { x: -600, y: -300, opacity: 0.5, scale: 0.9, zIndex: 5, visible: true }, // Moved further left
        [OBJECTS.DECOMP_SKILLS]: { x: -600, y: 300, opacity: 0.5, scale: 0.9, zIndex: 5, visible: true }, // Moved further left
        [OBJECTS.AGENTS_TASKS]: { x: 400, y: -300, opacity: 1, scale: 1.5, zIndex: 10, visible: true }, // Moved further right
        [OBJECTS.AGENTS_SKILLS]: { x: 400, y: 300, opacity: 1, scale: 1.5, zIndex: 10, visible: true }, // Moved further right
        [OBJECTS.SCORING]: { x: 600, y: 0, opacity: 0, scale: 0.5, visible: false },
    },
    4: { // Scoring (Agents -> Score)
        [OBJECTS.DECOMP_TASKS]: { x: -1000, y: -250, opacity: 0, scale: 0.5, visible: false },
        [OBJECTS.DECOMP_SKILLS]: { x: -1000, y: 250, opacity: 0, scale: 0.5, visible: false },
        [OBJECTS.AGENTS_TASKS]: { x: -500, y: -250, opacity: 0.5, scale: 0.8, zIndex: 5, visible: true }, // Keep left
        [OBJECTS.AGENTS_SKILLS]: { x: -500, y: 250, opacity: 0.5, scale: 0.8, zIndex: 5, visible: true }, // Keep left
        [OBJECTS.SCORING]: { x: 300, y: 0, opacity: 1, scale: 1.3, zIndex: 10, visible: true }, // Moved right from 0 to 300
        [OBJECTS.SCENARIO_1]: { x: 800, y: -150, opacity: 0, scale: 0.5, visible: false },
        [OBJECTS.SCENARIO_2]: { x: 800, y: 150, opacity: 0, scale: 0.5, visible: false },
    },
    5: { // Scenarios (Score -> Scenarios)
        [OBJECTS.AGENTS_TASKS]: { x: -1000, y: -250, opacity: 0, scale: 0.5, visible: false },
        [OBJECTS.AGENTS_SKILLS]: { x: -1000, y: 250, opacity: 0, scale: 0.5, visible: false },
        [OBJECTS.SCORING]: { x: -500, y: 0, opacity: 0.5, scale: 0.8, zIndex: 5, visible: true },
        [OBJECTS.SCENARIO_1]: { x: 0, y: -180, opacity: 1, scale: 1.1, zIndex: 10, visible: true },
        [OBJECTS.SCENARIO_2]: { x: 0, y: 180, opacity: 1, scale: 1.1, zIndex: 10, visible: true },
        [OBJECTS.OUTRO]: { x: 500, y: 0, opacity: 0, scale: 0.5, visible: false },
    },
    6: { // Outro
        [OBJECTS.SCORING]: { x: -1000, y: 0, opacity: 0, scale: 0.5, visible: false },
        [OBJECTS.SCENARIO_1]: { x: -500, y: -180, opacity: 0, scale: 0.5, visible: false },
        [OBJECTS.SCENARIO_2]: { x: -500, y: 180, opacity: 0, scale: 0.5, visible: false },
        [OBJECTS.OUTRO]: { x: 0, y: 0, opacity: 1, scale: 1.2, zIndex: 10, visible: true },
    }
};

const TOTAL_STEPS = Object.keys(SCENE_CONFIG).length;

const DataFlow = () => {
    const [step, setStep] = useState(0);
    const layout = SCENE_CONFIG[step];

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') setStep(s => Math.min(s + 1, TOTAL_STEPS - 1));
            if (e.key === 'ArrowLeft') setStep(s => Math.max(s - 1, 0));
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Debug log
    useEffect(() => {
        console.log(`Step ${step} Layout:`, layout);
    }, [step, layout]);

    // --- Dynamic Edge Calculation ---
    // This function calculates start/end points based on the current SCENE_CONFIG layout
    // instead of using hardcoded offsets. It assumes approximate node widths.
    const getEdgeCoordinates = () => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // Approximate widths for edge anchor points
        // UPDATED to match new larger sizes in Nodes.jsx
        const WIDTHS = {
            [OBJECTS.INPUT_FORM]: 500,
            [OBJECTS.DECOMP_TASKS]: 500,
            [OBJECTS.DECOMP_SKILLS]: 500,
            [OBJECTS.AGENTS_TASKS]: 580, // Grid: 2 columns of 280px + gap
            [OBJECTS.AGENTS_SKILLS]: 580,
            [OBJECTS.SCORING]: 450,
            [OBJECTS.SCENARIO_1]: 500,
            [OBJECTS.SCENARIO_2]: 500,
        };

        // Helper to get absolute position of a node's anchor point
        const getAnchor = (objKey, side) => { // side: 'left' | 'right' | 'top' | 'bottom' | 'center'
            if (!layout[objKey]) return { x: 0, y: 0 };
            const nodeX = centerX + layout[objKey].x;
            const nodeY = centerY + layout[objKey].y;
            const halfWidth = (WIDTHS[objKey] || 200) / 2;
            // Scale correction
            const scale = layout[objKey].scale || 1;

            if (side === 'left') return { x: nodeX - halfWidth * scale, y: nodeY };
            if (side === 'right') return { x: nodeX + halfWidth * scale, y: nodeY };
            return { x: nodeX, y: nodeY }; // 'center' or default
        };

        // Helper to get anchor for specific agent in a grid group (Step 3 specific)
        // objKey: AGENTS_TASKS or AGENTS_SKILLS
        // index: 0..3
        const getAgentAnchor = (objKey, index, side = 'left') => {
            if (!layout[objKey]) return { x: 0, y: 0 };
            const containerX = centerX + layout[objKey].x;
            const containerY = centerY + layout[objKey].y;
            const scale = layout[objKey].scale || 1;

            // Grid layout params updated for larger sizes
            // AgentNode compact width = 280px
            // Gap = 16px (gap-4)
            // Total Row Width = 280 * 2 + 16 = 576px

            // Offsets from center (unscaled)
            const col = index % 2; // 0 or 1
            const row = Math.floor(index / 2); // 0 or 1

            // Width calc:
            // Col 0 center: -280/2 - 16/2 = -140 - 8 = -148
            // Col 1 center: +280/2 + 16/2 = +140 + 8 = +148
            const xOffset = col === 0 ? -148 : 148;

            // Height calc (Assuming AgentNode height approx 100px?):
            // Let's approximate height with padding as ~120px
            // Row 0 center: -60 - 8 = -68
            // Row 1 center: +60 + 8 = +68
            const yOffset = row === 0 ? -68 : 68;

            // Target the specific side of the specific agent
            // Agent half width = 140
            const halfWidth = 140;

            const targetXLocal = side === 'right'
                ? xOffset + halfWidth
                : xOffset - halfWidth;

            return {
                x: containerX + (targetXLocal * scale),
                y: containerY + (yOffset * scale)
            };
        };

        return { getAnchor, getAgentAnchor };
    };

    const { getAnchor, getAgentAnchor } = getEdgeCoordinates();

    // --- Render Logic ---
    return (
        <div className="relative w-full h-screen bg-void overflow-hidden font-mono text-white">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* --- Edges Layer (Absolute SVG Overlay) --- */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Step 2: Input -> Tasks/Skills */}
                {step === 2 && (
                    <>
                        <Edge
                            start={getAnchor(OBJECTS.INPUT_FORM, 'right')}
                            end={getAnchor(OBJECTS.DECOMP_TASKS, 'left')}
                            active={true}
                        />
                        <Edge
                            start={getAnchor(OBJECTS.INPUT_FORM, 'right')}
                            end={getAnchor(OBJECTS.DECOMP_SKILLS, 'left')}
                            active={true}
                        />
                    </>
                )}

                {/* Step 3: Tasks/Skills -> Agents (8 Individual Arrows) */}
                {step === 3 && (
                    <>
                        {/* Arrows for Tasks */}
                        {MOCK_DATA.tasks.map((_, i) => (
                            <Edge
                                key={`edge-task-${i}`}
                                start={getAnchor(OBJECTS.DECOMP_TASKS, 'right')}
                                end={getAgentAnchor(OBJECTS.AGENTS_TASKS, i)}
                                active={true}
                            />
                        ))}

                        {/* Arrows for Skills */}
                        {MOCK_DATA.skills.map((_, i) => (
                            <Edge
                                key={`edge-skill-${i}`}
                                start={getAnchor(OBJECTS.DECOMP_SKILLS, 'right')}
                                end={getAgentAnchor(OBJECTS.AGENTS_SKILLS, i)}
                                active={true}
                            />
                        ))}
                    </>
                )}

                {/* Step 4: Agents -> Scoring (Only Right-Side Arrows) */}
                {step === 4 && (
                    <>
                        {/* Arrows from Task Agents to Scoring */}
                        {MOCK_DATA.tasks.map((_, i) => {
                            // Only draw arrows from the right-side agents (odd indices in 2-col grid)
                            // to avoid lines crossing over the left-side agents.
                            if (i % 2 === 0) return null;

                            return (
                                <Edge
                                    key={`edge-score-task-${i}`}
                                    start={getAgentAnchor(OBJECTS.AGENTS_TASKS, i, 'right')}
                                    end={getAnchor(OBJECTS.SCORING, 'left')}
                                    active={true}
                                />
                            );
                        })}

                        {/* Arrows from Skill Agents to Scoring */}
                        {MOCK_DATA.skills.map((_, i) => {
                            if (i % 2 === 0) return null;

                            return (
                                <Edge
                                    key={`edge-score-skill-${i}`}
                                    start={getAgentAnchor(OBJECTS.AGENTS_SKILLS, i, 'right')}
                                    end={getAnchor(OBJECTS.SCORING, 'left')}
                                    active={true}
                                />
                            );
                        })}
                    </>
                )}

                {/* Step 5: Scoring -> Scenarios */}
                {step === 5 && (
                    <>
                        <Edge
                            start={getAnchor(OBJECTS.SCORING, 'right')}
                            end={getAnchor(OBJECTS.SCENARIO_1, 'left')}
                            active={true}
                        />
                        <Edge
                            start={getAnchor(OBJECTS.SCORING, 'right')}
                            end={getAnchor(OBJECTS.SCENARIO_2, 'left')}
                            active={true}
                        />
                    </>
                )}
            </div>


            {/* --- Nodes Layer --- */}

            {/* 1. Intro */}
            <NodeContainer layout={layout[OBJECTS.INTRO]} className="w-[600px] border-neon-cyan/20">
                <h1 className="text-6xl font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-white">
                    AI REPLACABILITY
                </h1>
                <p className="text-xl text-gray-400">Analysis Pipeline</p>
            </NodeContainer>

            {/* 2. Input Form */}
            <NodeContainer layout={layout[OBJECTS.INPUT_FORM]} className="">
                <InputNode data={MOCK_DATA.profile} />
            </NodeContainer>

            {/* 3. Decomposition Nodes */}
            <NodeContainer layout={layout[OBJECTS.DECOMP_TASKS]} className="">
                <DecompositionNode title="Tasks" items={MOCK_DATA.tasks} type="tasks" />
            </NodeContainer>

            <NodeContainer layout={layout[OBJECTS.DECOMP_SKILLS]} className="">
                <DecompositionNode title="Skills" items={MOCK_DATA.skills} type="skills" />
            </NodeContainer>

            {/* 4. Agent Groups */}
            <NodeContainer layout={layout[OBJECTS.AGENTS_TASKS]} className="w-[600px] !bg-transparent !border-none !shadow-none !p-0">
                <div className="grid grid-cols-2 gap-4">
                    {MOCK_DATA.tasks.map((t, i) => (
                        <AgentNode key={i} taskName={t.task_name} score={t.score} status="complete" compact={true} />
                    ))}
                </div>
            </NodeContainer>

            <NodeContainer layout={layout[OBJECTS.AGENTS_SKILLS]} className="w-[600px] !bg-transparent !border-none !shadow-none !p-0">
                <div className="grid grid-cols-2 gap-4">
                    {MOCK_DATA.skills.map((s, i) => (
                        <AgentNode key={i} taskName={s.skill_name} score={s.score} status="complete" compact={true} />
                    ))}
                </div>
            </NodeContainer>

            {/* 5. Scoring */}
            <NodeContainer layout={layout[OBJECTS.SCORING]} className="">
                <ScoringNode
                    taskScore={MOCK_DATA.scores.taskScore}
                    skillScore={MOCK_DATA.scores.skillScore}
                    finalScore={MOCK_DATA.scores.finalScore}
                />
            </NodeContainer>

            {/* 6. Scenarios */}
            <NodeContainer layout={layout[OBJECTS.SCENARIO_1]} className="">
                <ScenarioNode {...MOCK_DATA.scenarios[0]} />
            </NodeContainer>
            <NodeContainer layout={layout[OBJECTS.SCENARIO_2]} className="">
                <ScenarioNode {...MOCK_DATA.scenarios[1]} />
            </NodeContainer>

            {/* 7. Outro */}
            <NodeContainer layout={layout[OBJECTS.OUTRO]} className="w-[600px] border-neon-cyan/20">
                <h2 className="text-5xl font-bold mb-6">FUTURE IS NOW</h2>
                <p className="text-gray-400">Adapt. Evolve. Overcome.</p>
            </NodeContainer>

            {/* Navigation Dots */}
            <div className="absolute bottom-12 flex gap-3 z-50 left-1/2 -translate-x-1/2">
                {Array.from({ length: TOTAL_STEPS }).map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setStep(idx)}
                        className={cn(
                            "w-3 h-3 rounded-full transition-all duration-500",
                            step === idx
                                ? "bg-neon-cyan w-8 shadow-[0_0_10px_rgba(0,240,255,0.5)]"
                                : "bg-white/20 hover:bg-white/40"
                        )}
                    />
                ))}
            </div>
        </div>
    );
};

export default DataFlow;
