import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InputNode, DecompositionNode, AgentNode, ScoringNode, ScenarioNode } from './Nodes';
import { Edge } from './Edges';

// Mock Data matching main.py models
const MOCK_DATA = {
    profile: {
        age: "25 rokov",
        gender: "muz",
        jobTitle: "psycholog",
        jobDescription: "Pomaham klientom s ich mentalnym stavom na zaklade medziludskej komunikacie.",
        dailyRoutine: "Skoro rano pridem do prace, citam si diar, pride klient...",
        location: "kancelaria v Kosiciach",
        education: "univerzita komenskeho v Bratislave, psychologia"
    },
    tasks: [
        { task_name: "Individuálne terapeutické sedenia", time_share: 0.45, score: 0.15 },
        { task_name: "Diagnostické rozhovory", time_share: 0.10, score: 0.25 },
        { task_name: "Vedenie klinickej dokumentácie", time_share: 0.08, score: 0.85 },
        { task_name: "Príprava terapeutických plánov", time_share: 0.06, score: 0.60 },
    ],
    skills: [
        { skill_name: "Aktívne počúvanie", importance: 0.20, score: 0.05 },
        { skill_name: "Empatická komunikácia", importance: 0.20, score: 0.10 },
        { skill_name: "Analytické myslenie", importance: 0.15, score: 0.65 },
        { skill_name: "Práca s dokumentáciou", importance: 0.10, score: 0.90 },
    ],
    scenarios: [
        {
            title: "Hybridný Terapeut",
            description: "AI preberá administratívu a diagnostiku (30% práce), terapeut sa sústredí na hlbokú intervenciu.",
            likelihood: "high"
        },
        {
            title: "Supervízor AI Agentov",
            description: "Terapeut manažuje AI, ktorá robí prvotný kontakt a základnú terapiu.",
            likelihood: "medium"
        }
    ]
};

// Slide Components
const IntroSlide = () => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl mx-auto"
    >
        <h1 className="text-6xl font-bold font-mono text-white mb-6 tracking-tight">
            AI REPLACABILITY
            <span className="block text-neon-cyan mt-2">ANALYSIS</span>
        </h1>
        <p className="text-xl text-gray-400 font-mono leading-relaxed mb-8">
            Preskúmajte, ako AI môže ovplyvniť vašu kariéru
        </p>
    </motion.div>
);

const OutroSlide = () => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl mx-auto"
    >
        <h2 className="text-5xl font-bold font-mono text-white mb-6 tracking-tight">
            BUDÚCNOSŤ JE VO VAŠICH RUKÁCH
        </h2>
        <p className="text-xl text-gray-400 font-mono leading-relaxed mb-8">
            Pripravte sa na zmeny a adaptujte sa na nové technológie
        </p>
        <div className="text-sm text-gray-500 font-mono">
            ← Vráťte sa späť alebo obnovte stránku
        </div>
    </motion.div>
);

const DataFlow = () => {
    // Steps: 0: Intro, 1: Input, 2: Decomp, 3: Agents, 4: Scoring, 5: Scenarios, 6: Outro
    const [step, setStep] = useState(0);
    const TOTAL_STEPS = 6;

    // Calculate totals for visualization
    const totalTaskAutomation = MOCK_DATA.tasks.reduce((acc, t) => acc + (t.time_share * t.score), 0);
    const totalSkillAutomation = MOCK_DATA.skills.reduce((acc, s) => acc + (s.importance * s.score), 0);
    const finalScore = (totalTaskAutomation * 0.4) + (totalSkillAutomation * 0.6);

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') {
                setStep(s => Math.min(s + 1, TOTAL_STEPS));
            } else if (e.key === 'ArrowLeft') {
                setStep(s => Math.max(s - 1, 0));
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Component dimensions (in pixels)
    const dimensions = {
        input: { width: 288, height: 150 },      // w-72 = 288px
        decomposition: { width: 320, height: 250 }, // w-80 = 320px
        agent: { width: 150, height: 80 },      // Reduced size
        scoring: { width: 256, height: 200 },    // w-64 = 256px
        scenario: { width: 320, height: 200 },    // w-80 = 320px
        gap: 40,                                  // gap between components
    };

    // Memoized Layout Calculations
    const layout = useMemo(() => {
        // Calculate all positions
        const inputPos = { left: 0, top: -dimensions.input.height / 2 };
        const tasksPos = { left: dimensions.input.width + dimensions.gap, top: -150 };
        const skillsPos = { left: dimensions.input.width + dimensions.gap, top: 50 };

        const agentsStartLeft = dimensions.input.width + dimensions.decomposition.width + dimensions.gap * 2;

        // Calculate Vertical stacks for Agents
        // Task Agents Stack (aligned with Tasks Node)
        const taskAgentsPos = {
            left: agentsStartLeft,
            top: tasksPos.top // Start aligning from top of tasks
        };

        // Skill Agents Stack (aligned with Skills Node)
        const skillAgentsPos = {
            left: agentsStartLeft,
            top: skillsPos.top // Start aligning from top of skills
        };


        const scoringPos = {
            left: agentsStartLeft + dimensions.agent.width * 2 + dimensions.gap * 2, // Shifted right
            top: -dimensions.scoring.height / 2
        };

        const scenariosPos = {
            left: scoringPos.left + dimensions.scoring.width + dimensions.gap,
            top1: -100,
            top2: 100
        };

        const totalWidth = scenariosPos.left + dimensions.scenario.width;

        return {
            inputPos,
            tasksPos,
            skillsPos,
            taskAgentsPos,
            skillAgentsPos,
            scoringPos,
            scenariosPos,
            totalWidth
        };
    }, [dimensions]);

    // Debug logging
    useEffect(() => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        console.log('=== DATA FLOW LAYOUT DEBUG ===');
        console.log('Current Step:', step);
        console.log('Viewport:', { width: viewportWidth, height: viewportHeight });
        console.log('Total Diagram Width:', layout.totalWidth);
        console.log('Centering Offset (X):', (viewportWidth - layout.totalWidth) / 2);
        console.log('--- Node Positions (relative to container start) ---');
        console.log('Input Node:', layout.inputPos);
        console.log('Tasks Node:', layout.tasksPos);
        console.log('Skills Node:', layout.skillsPos);
        console.log('Task Agents Start:', layout.taskAgentsPos);
        console.log('Skill Agents Start:', layout.skillAgentsPos);
        console.log('Scoring Node:', layout.scoringPos);
        console.log('Scenarios Start:', layout.scenariosPos.left);
        console.log('================================================');
    }, [step, layout]);

    return (
        <div className="relative w-full h-screen bg-void overflow-hidden">
            {/* Grid Background - static */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* Content Container - centered */}
            <div className="absolute inset-0 flex items-center justify-center">
                {/* 
                    Main Diagram Container 
                    - Width set to total calculated width
                    - Height 0 to center vertically (children use negative/positive top relative to center)
                */}
                <div
                    className="relative transition-all duration-500 ease-in-out"
                    style={{
                        width: layout.totalWidth,
                        height: 0 // Height 0 makes this div a horizontal line in the exact vertical center
                    }}
                >
                    {/* Edges */}
                    <AnimatePresence>
                        {step >= 2 && step < 6 && (
                            <>
                                <Edge
                                    key="edge-input-to-tasks"
                                    start={{ x: dimensions.input.width / 2, y: 0 }}
                                    end={{ x: layout.tasksPos.left + dimensions.decomposition.width / 2, y: layout.tasksPos.top + dimensions.decomposition.height / 2 }}
                                    active={true}
                                />
                                <Edge
                                    key="edge-input-to-skills"
                                    start={{ x: dimensions.input.width / 2, y: 0 }}
                                    end={{ x: layout.skillsPos.left + dimensions.decomposition.width / 2, y: layout.skillsPos.top + dimensions.decomposition.height / 2 }}
                                    active={true}
                                />
                            </>
                        )}
                        {step >= 3 && step < 6 && (
                            <>
                                {/* Edges from Tasks to Task Agents */}
                                {MOCK_DATA.tasks.map((task, index) => {
                                    const row = Math.floor(index / 2);
                                    const col = index % 2;
                                    // 2x2 Grid for Task Agents
                                    const agentX = layout.taskAgentsPos.left + col * (dimensions.agent.width + dimensions.gap) + dimensions.agent.width / 2;
                                    const agentY = layout.taskAgentsPos.top + row * (dimensions.agent.height + dimensions.gap) + dimensions.agent.height / 2;

                                    return (
                                        <Edge
                                            key={`edge-task-${index}`}
                                            start={{ x: layout.tasksPos.left + dimensions.decomposition.width, y: layout.tasksPos.top + dimensions.decomposition.height / 2 }}
                                            end={{ x: agentX, y: agentY }}
                                            active={true}
                                        />
                                    );
                                })}
                                {/* Edges from Skills to Skill Agents */}
                                {MOCK_DATA.skills.map((skill, index) => {
                                    const row = Math.floor(index / 2);
                                    const col = index % 2;
                                    // 2x2 Grid for Skill Agents
                                    const agentX = layout.skillAgentsPos.left + col * (dimensions.agent.width + dimensions.gap) + dimensions.agent.width / 2;
                                    const agentY = layout.skillAgentsPos.top + row * (dimensions.agent.height + dimensions.gap) + dimensions.agent.height / 2;

                                    return (
                                        <Edge
                                            key={`edge-skill-${index}`}
                                            start={{ x: layout.skillsPos.left + dimensions.decomposition.width, y: layout.skillsPos.top + dimensions.decomposition.height / 2 }}
                                            end={{ x: agentX, y: agentY }}
                                            active={true}
                                        />
                                    );
                                })}
                            </>
                        )}
                        {step >= 4 && step < 6 && (
                            <>
                                {/* Edge from Agents to Scoring */}
                                <Edge
                                    key="edge-agents-to-scoring"
                                    start={{ x: layout.taskAgentsPos.left + (dimensions.agent.width * 2 + dimensions.gap), y: 0 }}
                                    end={{ x: layout.scoringPos.left + dimensions.scoring.width / 2, y: 0 }}
                                    active={true}
                                />
                            </>
                        )}
                        {step >= 5 && step < 6 && (
                            <>
                                <Edge
                                    key="edge-scoring-to-scenario1"
                                    start={{ x: layout.scoringPos.left + dimensions.scoring.width, y: 0 }}
                                    end={{ x: layout.scenariosPos.left + dimensions.scenario.width / 2, y: layout.scenariosPos.top1 + dimensions.scenario.height / 2 }}
                                    active={true}
                                />
                                <Edge
                                    key="edge-scoring-to-scenario2"
                                    start={{ x: layout.scoringPos.left + dimensions.scoring.width, y: 0 }}
                                    end={{ x: layout.scenariosPos.left + dimensions.scenario.width / 2, y: layout.scenariosPos.top2 + dimensions.scenario.height / 2 }}
                                    active={true}
                                />
                            </>
                        )}
                    </AnimatePresence>

                    {/* Intro Slide - animates out to left */}
                    <AnimatePresence mode="wait">
                        {step === 0 && (
                            <motion.div
                                key="intro"
                                initial={{ opacity: 1, x: 0 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -200 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className="absolute"
                                style={{ left: '50%', top: 0, transform: 'translateX(-50%)' }} // Centered
                            >
                                <div className="relative -top-32"> {/* Shift up a bit */}
                                    <IntroSlide />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* User Profile - appears from right */}
                    <AnimatePresence>
                        {step >= 1 && step < 6 && (
                            <motion.div
                                key="input"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="absolute"
                                style={layout.inputPos}
                            >
                                <InputNode data={MOCK_DATA.profile} />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Tasks & Skills - appear when step >= 2 */}
                    <AnimatePresence>
                        {step >= 2 && step < 6 && (
                            <>
                                <motion.div
                                    key="tasks"
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                                    className="absolute"
                                    style={layout.tasksPos}
                                >
                                    <DecompositionNode title="Tasks" items={MOCK_DATA.tasks} type="tasks" />
                                </motion.div>
                                <motion.div
                                    key="skills"
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                                    className="absolute"
                                    style={layout.skillsPos}
                                >
                                    <DecompositionNode title="Skills" items={MOCK_DATA.skills} type="skills" />
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>

                    {/* AI Agents - 2x2 grid, appears when step >= 3 */}
                    <AnimatePresence>
                        {step >= 3 && step < 6 && (
                            <motion.div
                                key="agents"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="absolute"
                                style={{ left: 0, top: 0 }} // Relative to container
                            >
                                {/* Task Agents - 2x2 grid positioned near Tasks */}
                                <div className="absolute" style={{
                                    left: layout.taskAgentsPos.left,
                                    top: layout.taskAgentsPos.top,
                                    width: dimensions.agent.width * 2 + dimensions.gap,
                                    height: dimensions.agent.height * 2 + dimensions.gap
                                }}>
                                    {MOCK_DATA.tasks.map((task, index) => {
                                        const row = Math.floor(index / 2);
                                        const col = index % 2;
                                        return (
                                            <div
                                                key={`task-${index}`}
                                                className="absolute"
                                                style={{
                                                    left: col * (dimensions.agent.width + dimensions.gap),
                                                    top: row * (dimensions.agent.height + dimensions.gap)
                                                }}
                                            >
                                                <AgentNode
                                                    taskName={task.task_name}
                                                    status={step >= 4 ? "complete" : "analyzing"}
                                                    score={task.score}
                                                    compact={true}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Skill Agents - 2x2 grid positioned near Skills */}
                                <div className="absolute" style={{
                                    left: layout.skillAgentsPos.left,
                                    top: layout.skillAgentsPos.top,
                                    width: dimensions.agent.width * 2 + dimensions.gap,
                                    height: dimensions.agent.height * 2 + dimensions.gap
                                }}>
                                    {MOCK_DATA.skills.map((skill, index) => {
                                        const row = Math.floor(index / 2);
                                        const col = index % 2;
                                        return (
                                            <div
                                                key={`skill-${index}`}
                                                className="absolute"
                                                style={{
                                                    left: col * (dimensions.agent.width + dimensions.gap),
                                                    top: row * (dimensions.agent.height + dimensions.gap)
                                                }}
                                            >
                                                <AgentNode
                                                    taskName={skill.skill_name}
                                                    status={step >= 4 ? "complete" : "analyzing"}
                                                    score={skill.score}
                                                    compact={true}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Scoring - appears when step >= 4 */}
                    <AnimatePresence>
                        {step >= 4 && step < 6 && (
                            <motion.div
                                key="scoring"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="absolute"
                                style={layout.scoringPos}
                            >
                                <ScoringNode
                                    taskScore={totalTaskAutomation}
                                    skillScore={totalSkillAutomation}
                                    finalScore={finalScore}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Scenarios - appear when step >= 5 */}
                    <AnimatePresence>
                        {step >= 5 && step < 6 && (
                            <>
                                <motion.div
                                    key="scenario1"
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                                    className="absolute"
                                    style={{
                                        left: layout.scenariosPos.left,
                                        top: layout.scenariosPos.top1
                                    }}
                                >
                                    <ScenarioNode {...MOCK_DATA.scenarios[0]} />
                                </motion.div>
                                <motion.div
                                    key="scenario2"
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                                    className="absolute"
                                    style={{
                                        left: layout.scenariosPos.left,
                                        top: layout.scenariosPos.top2
                                    }}
                                >
                                    <ScenarioNode {...MOCK_DATA.scenarios[1]} />
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>

                    {/* Outro Slide - appears when step === 6 */}
                    <AnimatePresence>
                        {step === 6 && (
                            <motion.div
                                key="outro"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="absolute"
                                style={{ left: '50%', top: 0, transform: 'translateX(-50%) translateY(-50%)' }}
                            >
                                <OutroSlide />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Navigation Dots - fixed position */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center z-50">
                <div className="flex gap-1 justify-center">
                    {[0, 1, 2, 3, 4, 5, 6].map(s => (
                        <div
                            key={s}
                            className={`w-3 h-3 rounded-full transition-colors duration-300 ${step === s ? 'bg-neon-cyan shadow-[0_0_10px_rgba(0,240,255,0.5)]' : step > s ? 'bg-neon-cyan/30' : 'bg-white/10'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DataFlow;
