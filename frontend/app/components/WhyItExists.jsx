"use client";

import {
  Shield,
  Lightbulb,
  Target,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Activity,
  Search,
  Cpu,
  LineChart,
  Sparkles,
  Zap,
  Code2,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// ============ WHY IT EXISTS ============
 function WhyItExists() {
   return (
     <section
       id="about"
       className="scroll-mt-[20px] py-24 md:py-40 relative overflow-hidden"
     >
       {/* Background gradients */}

       <div className="container mx-auto px-4 relative z-10">
         <div className="max-w-4xl mx-auto mb-20 md:mb-32">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="mb-6 flex items-center gap-3 justify-center"
           >
             <div className="h-px w-8 bg-gradient-to-r from-transparent to-purple-400" />
             <span className="text-sm uppercase tracking-widest text-white">
               Why we exist
             </span>
             <div className="h-px w-8 bg-gradient-to-l from-transparent to-purple-400" />
           </motion.div>

           <motion.h2
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.1 }}
             className="text-5xl md:text-7xl font-bold mb-8  text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60"
           >
             The future demands preparation, not panic
           </motion.h2>

           <motion.p
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="text-lg text-zinc-400 text-center max-w-2xl mx-auto leading-relaxed"
           >
             Job markets shift in months. Skills become obsolete. But
             opportunities emerge for those prepared. We help you navigate this
             transition with clarity and strategy.
           </motion.p>
         </div>

         <div className="grid md:grid-cols-3 gap-8 md:gap-6 max-w-5xl mx-auto mb-24">
           {[
             {
               stat: "73%",
               description: "of jobs will change by 2030",
               icon: TrendingUp,
               accent: "from-blue-500 to-cyan-500",
             },
             {
               stat: "4.3M",
               description: "new roles emerging in AI/tech sectors",
               icon: Sparkles,
               accent: "from-blue-400 to-purple-500",
             },
             {
               stat: "Now",
               description: "is the time to upskill for tomorrow",
               icon: Zap,
               accent: "from-blue-500 to-green-500",
             },
           ].map((item, index) => {
             const Icon = item.icon;
             return (
               <motion.div
                 key={index}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                 className="group relative"
               >
                 <div className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-sm p-8 hover:border-white/20 transition-all duration-300">
                   <div
                     className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                   />

                   <div className="relative z-10">
                     <div className="flex items-start justify-between mb-4">
                       <div
                         className={`p-3 rounded-lg bg-gradient-to-br ${item.accent} bg-opacity-10 border border-white/10`}
                       >
                         <Icon className="w-6 h-6 text-white" />
                       </div>
                     </div>

                     <div className="text-4xl md:text-5xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                       {item.stat}
                     </div>
                     <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors">
                       {item.description}
                     </p>
                   </div>
                 </div>
               </motion.div>
             );
           })}
         </div>
       </div>
     </section>
   );
 }


// ============ RESULT PREVIEW ============
function ResultPreview() {
  return (
    <section className="py-32 px-4 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl mix-blend-screen"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl mix-blend-screen"
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            Real Analysis of Your Position
          </h2>
          <p className="text-xl text-zinc-400">
            Instant analysis of how AI will impact your profession by 2030
          </p>
        </motion.div>

        {/* Mock Interface with glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-3xl blur-xl opacity-40 group-hover:opacity-70 transition duration-1000"></div>
          <div className="relative rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/20 overflow-hidden shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
            {/* Mock Header */}
            <div className="border-b border-white/10 p-4 flex items-center gap-4 bg-white/5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/40 border border-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/40 border border-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/40 border border-green-500/60" />
              </div>
              <div className="h-6 w-64 bg-white/10 backdrop-blur-md rounded-full border border-white/20" />
            </div>

            <div className="grid md:grid-cols-3 gap-8 p-8">
              {/* Profile Card */}
              <div className="md:col-span-1 space-y-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="relative rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-md border border-white/20 p-6 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
                  <div className="relative z-10">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center mb-4 shadow-lg">
                      <Code2
                        className="w-10 h-10 text-white"
                        strokeWidth={2.5}
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      Software Developer
                    </h3>
                    <p className="text-sm text-zinc-400 mb-4">
                      Full-stack Engineer
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-zinc-400">
                          Automation Risk
                        </span>
                        <span className="text-lg font-bold text-yellow-400">
                          42%
                        </span>
                      </div>
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "42%" }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1.5,
                            delay: 0.5,
                            ease: "easeOut",
                          }}
                          className="h-full bg-gradient-to-r from-yellow-400 to-orange-400"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="p-4 rounded-xl bg-yellow-500/10 backdrop-blur-md border border-yellow-500/30 flex items-start gap-3"
                >
                  <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-yellow-200 text-sm">
                      Medium Risk
                    </div>
                    <div className="text-xs text-yellow-300/70 mt-1">
                      AI tools can already generate basic code. By 2030, the
                      ability to work with AI will be crucial.
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Analysis Details */}
              <div className="md:col-span-2 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-400" />
                    Task Breakdown & AI Potential
                  </h3>

                  <div className="space-y-3">
                    {[
                      {
                        label: "Writing boilerplate code",
                        score: 85,
                        color: "bg-red-500",
                        impact: "Copilot, ChatGPT already handle this",
                      },
                      {
                        label: "Debugging & testing",
                        score: 65,
                        color: "bg-orange-500",
                        impact: "AI helps, but needs human oversight",
                      },
                      {
                        label: "System architecture",
                        score: 30,
                        color: "bg-yellow-500",
                        impact: "Requires experience and strategy",
                      },
                      {
                        label: "Team collaboration & mentoring",
                        score: 10,
                        color: "bg-green-500",
                        impact: "Human interaction irreplaceable",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                        className="group/item p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
                      >
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-zinc-300 font-medium">
                            {item.label}
                          </span>
                          <span className="text-zinc-400">
                            {item.score}% AI Ready
                          </span>
                        </div>
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden backdrop-blur-sm mb-2">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.score}%` }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 1,
                              delay: 1 + index * 0.1,
                              ease: "easeOut",
                            }}
                            className={`h-full ${item.color}`}
                          />
                        </div>
                        <p className="text-xs text-zinc-500">{item.impact}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <h3 className="text-lg font-medium text-white flex items-center gap-2 mb-4">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    Recommended Skills for the Future
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        skill: "AI Prompt Engineering",
                        desc: "Learn to communicate effectively with AI",
                      },
                      {
                        skill: "AI-Assisted Development",
                        desc: "GitHub Copilot, ChatGPT in practice",
                      },
                      {
                        skill: "System Design & Architecture",
                        desc: "High-level decision making",
                      },
                      {
                        skill: "Cloud & DevOps",
                        desc: "Infrastructure and automation",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={item.skill}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 1.2 + index * 0.1 }}
                        className="p-3 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-md border border-green-500/30 hover:border-green-500/50 transition-all group/skill"
                      >
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                          <div>
                            <div className="text-sm font-medium text-green-300 mb-1">
                              {item.skill}
                            </div>
                            <div className="text-xs text-green-400/60">
                              {item.desc}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============ HOW IT WORKS ============
function HowItWorks() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const steps = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Enter Your Profession",
      desc: "Type in your current job title. We analyze thousands of data points.",
      color: "text-purple-400",
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "AI Analysis Engine",
      desc: "Our engine breaks down your role into tasks and evaluates AI capabilities.",
      color: "text-blue-400",
    },
    {
      icon: <LineChart className="w-8 h-8" />,
      title: "Get Your Strategy",
      desc: "Receive a personalized report with risk scores and upskilling roadmap.",
      color: "text-green-400",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="how"
      className=" scroll-mt-[100px] relative h-[300vh] bg-black"
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/3 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl mix-blend-screen"
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-1/3 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl mix-blend-screen"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
              How It Works
            </h2>
            <p className="text-lg md:text-xl text-zinc-400">
              The path to future-proofing your career
            </p>
          </div>

          {/* MOBILE VIEW */}
          <div className="relative w-full max-w-4xl h-[400px] flex items-center justify-center md:hidden">
            {/* Vertical Line Container - Mobile */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div
                style={{
                  height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
                }}
                className="w-full bg-gradient-to-b from-purple-500 via-blue-500 to-green-500"
              />
            </div>

            {/* Glowing Node - Mobile */}
            <motion.div className="absolute left-8 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)] z-20" />

            {steps.map((step, index) => {
              const start = index / steps.length;
              const end = (index + 1) / steps.length;
              const mid = (start + end) / 2;

              const opacity = useTransform(
                scrollYProgress,
                [start, start + 0.1, end - 0.1, end],
                [0, 1, 1, 0]
              );

              const x = useTransform(
                scrollYProgress,
                [start, mid, end],
                [100, 0, -100]
              );

              const scale = useTransform(
                scrollYProgress,
                [start, mid, end],
                [0.8, 1, 0.8]
              );

              return (
                <motion.div
                  key={index}
                  style={{
                    opacity,
                    x,
                    scale,
                  }}
                  className="absolute left-[60px] top-1/2 -translate-y-1/2 w-[280px] sm:w-[320px]"
                >
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition duration-1000"></div>
                    <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] flex flex-col gap-3">
                      <div
                        className={`w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center ${step.color} shadow-lg`}
                      >
                        {step.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2 text-white">
                          {step.title}
                        </h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Connector Line - Mobile */}
                  <div className="absolute top-1/2 -left-[52px] w-12 h-[1px] bg-white/20 -translate-y-1/2" />
                  <div className="absolute top-1/2 -left-1.5 w-3 h-3 rounded-full bg-white/30 backdrop-blur-sm -translate-y-1/2 border border-white/40" />
                </motion.div>
              );
            })}
          </div>

          {/* DESKTOP VIEW */}
          <div className="relative w-full max-w-4xl h-[400px] hidden md:flex items-center justify-center">
            {/* Vertical Line Container - Desktop */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/10 -translate-x-1/2 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div
                style={{
                  height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
                }}
                className="w-full bg-gradient-to-b from-purple-500 via-blue-500 to-green-500"
              />
            </div>

            {/* Glowing Node - Desktop */}
            <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)] z-20" />

            {steps.map((step, index) => {
              const start = index / steps.length;
              const end = (index + 1) / steps.length;
              const mid = (start + end) / 2;

              const opacity = useTransform(
                scrollYProgress,
                [start, start + 0.1, end - 0.1, end],
                [0, 1, 1, 0]
              );

              const x = useTransform(
                scrollYProgress,
                [start, mid, end],
                [100, 0, -100]
              );

              const scale = useTransform(
                scrollYProgress,
                [start, mid, end],
                [0.8, 1, 0.8]
              );

              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  style={{
                    opacity,
                    x: isEven ? x : useTransform(x, (val) => -val),
                    scale,
                  }}
                  className={`absolute ${
                    isEven ? "left-[55%]" : "right-[55%]"
                  } top-1/2 -translate-y-1/2 w-[400px]`}
                >
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition duration-1000"></div>
                    <div className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] flex flex-col gap-4">
                      <div
                        className={`w-14 h-14 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center ${step.color} shadow-lg`}
                      >
                        {step.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2 text-white">
                          {step.title}
                        </h3>
                        <p className="text-zinc-400 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Connector Line - Desktop */}
                  <div
                    className={`absolute top-1/2 ${
                      isEven ? "-left-12" : "-right-12"
                    } w-12 h-[1px] bg-white/20 -translate-y-1/2`}
                  />
                  <div
                    className={`absolute top-1/2 ${
                      isEven ? "-left-1.5" : "-right-1.5"
                    } w-3 h-3 rounded-full bg-white/30 backdrop-blur-sm -translate-y-1/2 border border-white/40`}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ DEMO WRAPPER ============
export default function UpdatedSections() {
  return (
    <div className="bg-black text-white min-h-screen">
      <WhyItExists />
      <ResultPreview />
      <HowItWorks />
    </div>
  );
}
