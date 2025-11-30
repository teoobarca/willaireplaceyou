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
  Loader2,
  Brain,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import LightRays from "./LightRays";

export default function HeroSection() {
  const router = useRouter();
  const [profession, setProfession] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [currentCommentIndex, setCurrentCommentIndex] = useState(0);
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    jobTitle: "",
    jobDescription: "",
    dailyRoutine: "",
    location: "",
    education: "",
  });
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const jobsToRotate = [
    "Teachers?",
    "Lawyers?",
    "Drivers?",
    "Doctors?",
    "Marketers?",
  ];

  useEffect(() => {
    // Ak používateľ píše do inputu, nezobrazuj rotáciu
    if (profession.trim().length > 0) {
      return;
    }

    const currentJob = jobsToRotate[currentJobIndex];
    const typingSpeed = isDeleting ? 50 : 150;
    const pauseTime = 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentJob.length) {
          setDisplayedText(currentJob.slice(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(currentJob.slice(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentJobIndex((prev) => (prev + 1) % jobsToRotate.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentJobIndex, profession]);

  const thinkingComments = [
    "Asking the AI overlords for permission...",
    "Checking if robots can do your paperwork...",
    "Calculating your coffee budget...",
    "Consulting the digital crystal ball...",
    "Teaching the algorithm to be nice...",
    "Scanning for Terminators...",
    "Measuring your human charm...",
    "Reading your career horoscope...",
    "Convincing the computer you're busy...",
    "Almost done, just one more byte...",
  ];

  // Rotate through thinking comments
  useEffect(() => {
    if (!isAnalyzing) return;

    const interval = setInterval(() => {
      setCurrentCommentIndex((prev) => {
        let next;
        do {
          next = Math.floor(Math.random() * thinkingComments.length);
        } while (next === prev && thinkingComments.length > 1);
        return next;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [isAnalyzing]);

  // Animated dots
  const [dots, setDots] = useState("");
  useEffect(() => {
    if (!isAnalyzing) return;
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const handleAnalyze = async () => {
    try {
      setIsAnalyzing(true);
      setError(null);
      window.scrollTo({ top: 0, behavior: "smooth" });

      const response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          age: formData.age,
          gender: formData.gender,
          job_title: formData.jobTitle,
          job_description: formData.jobDescription,
          daily_routine: formData.dailyRoutine,
          location: formData.location,
          education: formData.education,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 400 && errorData.detail?.message) {
          setError(errorData.detail.message);
          setIsAnalyzing(false);
          return;
        }
        throw new Error(`Analysis failed: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);

      // Store result in localStorage and redirect
      localStorage.setItem("professionData", JSON.stringify(result));
      router.push("/dashboard");
    } catch (err) {
      console.error("Error analyzing profession:", err);
      setError(err.message || "Failed to analyze. Please try again.");
      setIsAnalyzing(false);
    }
  };

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
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                  Will AI Replace{" "}
                  <span className="relative text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-blue-500 to-purple-500">
                    {profession.trim().length > 0
                      ? profession + "?"
                      : displayedText}
                    <span className="animate-pulse relative text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-blue-500 to-purple-500">
                      |
                    </span>
                  </span>
                </h1>

                <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                  Discover your career's future in the age of artificial
                  intelligence. We analyze risks and reveal the skills you need
                  to become irreplaceable.
                </p>

                {/* Search Component */}
                <div className="max-w-2xl mx-auto mb-12">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/40 to-blue-600/40 rounded-full blur-xl opacity-30 group-hover:opacity-60 transition duration-1000"></div>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (profession.trim()) {
                          setFormData({ ...formData, jobTitle: profession });
                          setShowForm(true);
                        }
                      }}
                      className="relative flex items-center bg-white/5 backdrop-blur-2xl border border-white/20 rounded-full p-1.5 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
                    >
                      <input
                        type="text"
                        value={profession}
                        onChange={(e) => setProfession(e.target.value)}
                        placeholder="Enter a profession (e.g. UX Designer)"
                        className="w-full bg-transparent border-none focus:ring-0 text-lg text-white placeholder-zinc-400 px-4 py-2.5 outline-none custom-placeholder"
                      />
                      <button
                        type="submit"
                        className="group/btn bg-white text-black hover:cursor-pointer w-9 h-9 rounded-full hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center flex-shrink-0 aspect-square mr-1"
                      >
                        <ArrowRight className="w-5 h-5 text-black" />
                      </button>
                    </form>
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
          ) : isAnalyzing ? (
            /* Loading Section */
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="-mt-7 w-full"
            >
              <div className="max-w-4xl mx-auto">
                <div className="relative px-4 py-12 md:p-24 text-center">
                  <div className="mb-8 md:mb-12 relative">
                    <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse" />
                    <Brain className="w-16 h-16 md:w-24 md:h-24 text-white mx-auto relative z-10 animate-pulse" />
                  </div>
                  <h3 className="text-lg md:text-xl font-medium text-zinc-400 mb-4 md:mb-8 uppercase tracking-widest">
                    Thinking
                    <span className="inline-block w-4 text-left">{dots}</span>
                  </h3>
                  <div
                    className="h-32 sm:h-40 md:h-64 overflow-hidden relative flex justify-center items-center"
                    style={{
                      maskImage:
                        "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
                      WebkitMaskImage:
                        "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
                    }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={currentCommentIndex}
                        initial={{ y: 40, opacity: 0, filter: "blur(10px)" }}
                        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                        exit={{ y: -40, opacity: 0, filter: "blur(10px)" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-white text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight px-4 text-center"
                      >
                        {thinkingComments[currentCommentIndex]}
                      </motion.p>
                    </AnimatePresence>
                  </div>
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
              className="-mt-[100px]"
            >
              <div className="max-w-xl mx-auto">
                <div className="relative">
                  <div className="relative bg-white/5 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
                    <div className="mb-3 flex flex-row gap-3">
                      <div className="flex-1 w-1/2">
                        <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                          Gender
                        </label>
                        <input
                          type="text"
                          value={formData.gender}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              gender: e.target.value,
                            })
                          }
                          placeholder="e.g., Male, Female, Other"
                          className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                        />
                      </div>
                      <div className="flex-1 w-1/2">
                        <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                          Age
                        </label>
                        <input
                          type="text"
                          value={formData.age}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              age: e.target.value,
                            })
                          }
                          placeholder="e.g. 25"
                          className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                        />
                      </div>
                    </div>

                    {/* Job Title */}
                    <div className="mb-3">
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
                    <div className="mb-3">
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
                        placeholder="Describe your job in one sentence."
                        rows={1}
                        className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2.5 text-white overflow-hidden placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all resize-none"
                      />
                    </div>

                    {/* Daily Routine */}
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                        Work Daily Routine
                      </label>
                      <textarea
                        value={formData.dailyRoutine}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            dailyRoutine: e.target.value,
                          })
                        }
                        placeholder="Describe your everyday tasks..."
                        rows={4}
                        className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all resize-none"
                      />
                    </div>

                    {/* Location & Education Row */}
                    <div className="grid grid-cols-2 gap-4 mb-5">
                      {/* Location */}
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                          Workspace
                        </label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              location: e.target.value,
                            })
                          }
                          placeholder="e.g., Bratislava"
                          className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                        />
                      </div>

                      {/* Education */}
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                          Education
                        </label>
                        <input
                          type="text"
                          value={formData.education}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              education: e.target.value,
                            })
                          }
                          placeholder="e.g., Comenius University, Computer Science"
                          className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                        />
                      </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm mb-3">
                        {error}
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      onClick={handleAnalyze}
                      disabled={
                        isAnalyzing ||
                        !formData.jobTitle ||
                        !formData.jobDescription ||
                        !formData.dailyRoutine
                      }
                      className="w-full hover:cursor-pointer bg-gradient-to-br from-white to-zinc-100 text-black px-6 py-3 rounded-xl font-medium hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(0,0,0,0.15)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Analyzing...</span>
                        </>
                      ) : (
                        <>
                          <span>Analyze My Job</span>
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
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
