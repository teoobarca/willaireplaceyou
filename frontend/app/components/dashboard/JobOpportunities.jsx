"use client";

import { useState, useEffect } from "react";
import {
  Briefcase,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Map,
  Target,
} from "lucide-react";

export default function JobOpportunities() {
  const [jobs, setJobs] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showRoadmap, setShowRoadmap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = () => {
      try {
        // Načítaj dáta z localStorage
        const storedData = localStorage.getItem("professionData");

        if (!storedData) {
          setError("No profession data found");
          setLoading(false);
          return;
        }

        const professionData = JSON.parse(storedData);

        if (professionData?.career_recommendations) {
          setJobs(professionData.career_recommendations);
        } else {
          setError("No career recommendations available");
        }

        setLoading(false);
      } catch (err) {
        console.error("Error loading profession data:", err);
        setError("Failed to load career recommendations");
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getTransitionColor = (ease) => {
    if (ease === "Easy" || ease === "Low")
      return {
        bg: "bg-green-500/10",
        border: "border-green-500/30",
        text: "text-green-400",
        dot: "bg-green-500",
      };
    if (ease === "Medium")
      return {
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/30",
        text: "text-yellow-400",
        dot: "bg-yellow-500",
      };
    return {
      bg: "bg-orange-500/10",
      border: "border-orange-500/30",
      text: "text-orange-400",
      dot: "bg-orange-500",
    };
  };

  const getPhaseColor = (index) => {
    const colors = [
      "from-blue-500/20 to-blue-600/5 border-blue-500/30",
      "from-green-500/20 to-green-600/5 border-green-500/30",
      "from-orange-500/20 to-orange-600/5 border-orange-500/30",
      "from-purple-500/20 to-purple-600/5 border-purple-500/30",
    ];
    return colors[index % colors.length];
  };

  const parseRoadmap = (roadmapString) => {
    if (!roadmapString) return [];

    // Parsing Mermaid flowchart syntax
    const lines = roadmapString.split("\n").filter((line) => line.trim());
    const phases = [];
    let currentPhase = null;

    lines.forEach((line) => {
      if (line.includes("subgraph")) {
        const phaseName = line.match(/\[(.*?)\]/)?.[1] || "";
        currentPhase = {
          phase: phaseName.replace(/Phase \d+: /, ""),
          steps: [],
        };
      } else if (line.includes("-->") || (line.includes("(") && currentPhase)) {
        const stepMatch = line.match(/\((.*?)\)/);
        if (stepMatch) {
          currentPhase.steps.push(stepMatch[1]);
        }
      } else if (line.includes("end") && currentPhase) {
        phases.push(currentPhase);
        currentPhase = null;
      }
    });

    return phases;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-zinc-400">Loading job opportunities...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error || jobs.length === 0) {
    return (
      <div className="space-y-6">
        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-zinc-400">
              {error || "No job recommendations available"}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-2xl font-bold text-white">
            Career Opportunities
          </h2>
        </div>
        <p className="text-sm text-zinc-400">
          Alternative career paths based on your transferable skills
        </p>
      </div>

      {/* Job Cards */}
      <div className="space-y-4">
        {jobs.map((job, index) => {
          const colors = getTransitionColor(job.ease_of_transition);
          const isExpanded = expandedIndex === index;
          const isRoadmapVisible = showRoadmap[index];
          const roadmapPhases = parseRoadmap(job.roadmap);

          return (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all"
            >
              {/* Job Header */}
              <button
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
                className="w-full p-6 text-left hover:bg-white/5 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-xl font-semibold text-white">
                        {job.job_title}
                      </h3>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.border} ${colors.text} border flex items-center gap-2`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${colors.dot}`}
                        ></div>
                        {job.ease_of_transition} Transition
                      </div>
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {job.reason}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-zinc-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-zinc-400" />
                    )}
                  </div>
                </div>
              </button>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="border-t border-white/10">
                  <div className="p-6 space-y-6">
                    {/* Stats Bar */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-xs text-zinc-400 uppercase font-semibold">
                            Transferable
                          </span>
                        </div>
                        <div className="text-2xl font-bold text-white">
                          {job.transferable_skills?.length || 0}
                        </div>
                        <div className="text-xs text-zinc-400">
                          existing skills
                        </div>
                      </div>
                      <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <TrendingUp className="w-4 h-4 text-blue-400" />
                          <span className="text-xs text-zinc-400 uppercase font-semibold">
                            To Learn
                          </span>
                        </div>
                        <div className="text-2xl font-bold text-white">
                          {job.new_skills_needed?.length || 0}
                        </div>
                        <div className="text-xs text-zinc-400">
                          new competencies
                        </div>
                      </div>
                      <div
                        className={`${colors.bg} border ${colors.border} rounded-lg p-4`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Target className="w-4 h-4 text-zinc-400" />
                          <span className="text-xs text-zinc-400 uppercase font-semibold">
                            Difficulty
                          </span>
                        </div>
                        <div className={`text-2xl font-bold ${colors.text}`}>
                          {job.ease_of_transition}
                        </div>
                        <div className="text-xs text-zinc-400">
                          transition level
                        </div>
                      </div>
                    </div>

                    {/* Transferable Skills */}
                    {job.transferable_skills &&
                      job.transferable_skills.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            <h4 className="font-semibold text-white">
                              Your Transferable Skills
                            </h4>
                          </div>
                          <div className="grid md:grid-cols-2 gap-2">
                            {job.transferable_skills.map((skill, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-2 text-sm text-zinc-300 bg-green-500/5 border border-green-500/20 rounded-lg px-3 py-2"
                              >
                                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                <span>{skill}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    {/* New Skills Needed */}
                    {job.new_skills_needed &&
                      job.new_skills_needed.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <TrendingUp className="w-5 h-5 text-blue-400" />
                            <h4 className="font-semibold text-white">
                              Skills to Develop
                            </h4>
                          </div>
                          <div className="grid md:grid-cols-2 gap-2">
                            {job.new_skills_needed.map((skill, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-2 text-sm text-zinc-300 bg-blue-500/5 border border-blue-500/20 rounded-lg px-3 py-2"
                              >
                                <ArrowRight className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                                <span>{skill}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    {/* Roadmap Toggle */}
                    {roadmapPhases.length > 0 && (
                      <>
                        <button
                          onClick={() =>
                            setShowRoadmap({
                              ...showRoadmap,
                              [index]: !isRoadmapVisible,
                            })
                          }
                          className="w-full bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 hover:border-purple-500/50 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Map className="w-5 h-5 text-purple-400" />
                              <span className="font-semibold text-white">
                                {isRoadmapVisible ? "Hide" : "View"} Transition
                                Roadmap
                              </span>
                            </div>
                            <ChevronDown
                              className={`w-5 h-5 text-zinc-400 transition-transform ${
                                isRoadmapVisible ? "rotate-180" : ""
                              }`}
                            />
                          </div>
                        </button>

                        {/* Roadmap */}
                        {isRoadmapVisible && (
                          <div className="space-y-4 pt-2">
                            {roadmapPhases.map((phase, phaseIdx) => (
                              <div
                                key={phaseIdx}
                                className={`bg-gradient-to-r ${getPhaseColor(
                                  phaseIdx
                                )} border rounded-lg p-4`}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="px-3 py-1 bg-white/5 rounded-full text-xs font-bold text-zinc-300">
                                    Phase {phaseIdx + 1}
                                  </div>
                                  <h4 className="font-bold text-white">
                                    {phase.phase}
                                  </h4>
                                </div>
                                <div className="space-y-2">
                                  {phase.steps.map((step, stepIdx) => (
                                    <div
                                      key={stepIdx}
                                      className="flex items-center gap-3 bg-white/5 rounded-lg px-3 py-2"
                                    >
                                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-zinc-300">
                                        {stepIdx + 1}
                                      </div>
                                      <span className="text-sm text-zinc-200">
                                        {step}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}

                    {/* Transition Summary */}
                    <div
                      className={`${colors.bg} border ${colors.border} rounded-lg p-4`}
                    >
                      <div className="flex items-start gap-3">
                        <Briefcase
                          className={`w-5 h-5 ${colors.text} flex-shrink-0 mt-0.5`}
                        />
                        <div>
                          <h5 className="font-semibold text-white mb-1">
                            Transition Path
                          </h5>
                          <p className="text-sm text-zinc-300">
                            This role leverages{" "}
                            <strong>
                              {job.transferable_skills?.length || 0} of your
                              existing skills
                            </strong>{" "}
                            and requires learning{" "}
                            <strong>
                              {job.new_skills_needed?.length || 0} new
                              competencies
                            </strong>
                            . The transition difficulty is rated as{" "}
                            <strong className={colors.text}>
                              {job.ease_of_transition}
                            </strong>
                            .
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
