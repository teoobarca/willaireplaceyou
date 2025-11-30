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
import { useRef, useState, useEffect } from "react";

function AnimatedNumber({ value, duration = 2, delay = 0, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const end = typeof value === "string" ? parseFloat(value) : value;
          const startTime = Date.now() + delay * 1000;
          const animationDuration = duration * 1000;

          const animate = () => {
            const now = Date.now();
            const timeSinceStart = now - startTime;

            if (timeSinceStart < 0) {
              requestAnimationFrame(animate);
              return;
            }

            const progress = Math.min(timeSinceStart / animationDuration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = easeOutQuart * end;

            setCount(current);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [value, duration, delay, hasAnimated]);

  const formatNumber = (num) => {
    if (value.toString().includes("M")) {
      return Math.floor(num) + "M";
    }
    if (value.toString().includes("%")) {
      return Math.floor(num) + "%";
    }
    return Math.floor(num).toString();
  };

  return <span ref={ref}>{formatNumber(count)}</span>;
}

// ============ WHY IT EXISTS ============
function WhyItExists() {
  return (
    <section
      id="about"
      className="scroll-mt-[20px] pb-24 md:pb-40 relative overflow-hidden"
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
              stat: "85M",
              description: "jobs displaced by automation by 2025",
              icon: TrendingUp,
              accent: "from-green-500 to-green-800",
            },
            {
              stat: "97M",
              description: "new roles emerging in AI/tech sectors",
              icon: Sparkles,
              accent: "from-blue-500 to-blue-800",
            },
            {
              stat: "44%",
              description: "of core skills will change by 2027",
              icon: Zap,
              accent: "from-yellow-500 to-yellow-800",
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
                      <AnimatedNumber
                        value={item.stat}
                        duration={2.5}
                        delay={0.3 + index * 0.2}
                      />
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
  return;
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
                [0, 1, 1, 0],
              );

              const x = useTransform(
                scrollYProgress,
                [start, mid, end],
                [100, 0, -100],
              );

              const scale = useTransform(
                scrollYProgress,
                [start, mid, end],
                [0.8, 1, 0.8],
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
                [0, 1, 1, 0],
              );

              const x = useTransform(
                scrollYProgress,
                [start, mid, end],
                [100, 0, -100],
              );

              const scale = useTransform(
                scrollYProgress,
                [start, mid, end],
                [0.8, 1, 0.8],
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
