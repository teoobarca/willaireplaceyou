"use client";

import {
  Search,
  ArrowRight,
  Sparkles,
  Code,
  GraduationCap,
  Palette,
  Scale,
  Car,
  Stethoscope,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LightRays from "./LightRays";

export default function HeroSection() {
  const [profession, setProfession] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    keyTasks: "",
  });

  const commonJobs = [
    { name: "Developer", icon: Code },
    { name: "Teacher", icon: GraduationCap },
    { name: "Designer", icon: Palette },
    { name: "Lawyer", icon: Scale },
    { name: "Driver", icon: Car },
    { name: "Doctor", icon: Stethoscope },
    { name: "Marketer", icon: TrendingUp },
  ];

  return (
    <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48 min-h-screen flex items-center">
      <div className="absolute inset-0 z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#49218f"
          raysSpeed={1.8}
          lightSpread={1.2}
          rayLength={10}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
        />
      </div>
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
          className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl mix-blend-screen"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-40 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl mix-blend-screen"
        />
      </div>
      <div className="container mx-auto px-4 relative z-10 w-full">
        <AnimatePresence mode="wait">
          {!showForm ? (
            /* Hero Content */
            <motion.div
              key="hero"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 mt-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm text-zinc-300 mb-8 shadow-lg">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span>Future of Work 2030</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                  Will AI Replace Your Job?
                </h1>

                <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                  Discover your career's future in the age of artificial
                  intelligence. We analyze risks and reveal the skills you need
                  to become irreplaceable.
                </p>

                {/* Search Component */}
                <div className="max-w-2xl mx-auto mb-12">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/40 to-blue-600/40 rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition duration-1000"></div>
                    <div className="relative flex items-center bg-white/5 backdrop-blur-2xl border border-white/20 rounded-2xl p-2 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
                      <Search className="w-6 h-6 text-zinc-400 ml-4" />
                  <input
  type="text"
  value={profession}
  onChange={(e) => setProfession(e.target.value)}
  placeholder="Enter a profession (e.g. UX Designer)"
  className="w-full bg-transparent border-none focus:ring-0 text-lg text-white placeholder-zinc-400 px-4 py-3 outline-none custom-placeholder"
/>
                      <button
                        onClick={() => {
                          if (profession.trim()) {
                            setFormData({ ...formData, jobTitle: profession });
                            setShowForm(true);
                          }
                        }}
                        className="group/btn bg-gradient-to-br hover:cursor-pointer from-white to-zinc-100 text-black px-6 px-5 pl-2 py-3 rounded-xl font-medium hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)] active:scale-[0.98] transition-all duration-300 flex items-center gap-2 whitespace-nowrap shadow-[0_4px_14px_rgba(0,0,0,0.15)] relative overflow-hidden"
                      >
                        <span className="relative z-10 flex  justify-center items-center gap-1 mr-4 ">
                          Analyze{" "}
                          <ArrowRight className="w-4 h-4 relative text-black z-10 group-hover/btn:translate-x-1 transition-transform" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Access Buttons */}
                <div className="flex flex-wrap justify-center gap-3">
                  {commonJobs.map((job) => {
                    const IconComponent = job.icon;
                    return (
                      <button
                        key={job.name}
                        onClick={() => {
                          setProfession(job.name);
                          setFormData({ ...formData, jobTitle: job.name });
                        }}
                        className="px-4 py-2 rounded-full hover:cursor-pointer bg-white/10 backdrop-blur-md border border-white/20 text-sm text-zinc-300 hover:bg-white/20 hover:border-white/30 transition-all shadow-lg flex items-center gap-2"
                      >
                        <IconComponent className="w-4 h-4" />
                        {job.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ) : (
            /* Form Section */
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="-mt-7"
            >
              <div className="max-w-xl mx-auto">
                <div className="relative">
                  <div className="relative bg-white/5 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
                    <div>
                      <button
                        onClick={() => setShowForm(false)}
                        className="mb-6 text-zinc-400 hover:cursor-pointer hover:text-white transition-colors flex items-center gap-2"
                      >
                        <ArrowRight className="w-4 h-4 rotate-180 hover:cursor-pointer" />{" "}
                        Go back
                      </button>

                      <h2 className="text-2xl font-bold text-white mb-5">
                        Tell us more about your profession
                      </h2>
                    </div>

                    <div className="space-y-4">
                      {/* Job Title */}
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                          Job Title
                        </label>
                        <input
                          type="text"
                          value={formData.jobTitle}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              jobTitle: e.target.value,
                            })
                          }
                          placeholder="e.g., UX Designer"
                          className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                        />
                      </div>

                      {/* Job Description */}
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                          Job Description
                        </label>
                        <textarea
                          value={formData.jobDescription}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              jobDescription: e.target.value,
                            })
                          }
                          placeholder="Describe what you do in your role..."
                          rows={3}
                          className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all resize-none"
                        />
                      </div>

                      {/* Key Tasks */}
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                          Key Tasks
                        </label>
                        <textarea
                          value={formData.keyTasks}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              keyTasks: e.target.value,
                            })
                          }
                          placeholder="List your main responsibilities and tasks..."
                          rows={3}
                          className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <button className="w-full hover:cursor-pointer bg-gradient-to-br from-white to-zinc-100 text-black px-6 py-3 rounded-xl font-medium hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(0,0,0,0.15)] mt-6">
                        <span>Analyze My Job</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
