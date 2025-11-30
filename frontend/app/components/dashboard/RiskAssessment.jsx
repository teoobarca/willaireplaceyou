"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, TrendingUp, Brain, Users, Clock } from "lucide-react";
import { motion } from "framer-motion";
import useProfessionData, {
  getRiskLevel,
  getTopTasks,
} from "../../hooks/useProfessionData";

export default function RiskAssessment() {
  const { data: professionData, loading, error } = useProfessionData();
  const [riskData, setRiskData] = useState(null);

  useEffect(() => {
    if (!professionData) return;

    // Calculate risk percentage from weighted_final_score
    const riskPercentage = Math.round(
      professionData.weighted_final_score * 100,
    );
    const riskLevel = getRiskLevel(professionData.weighted_final_score);

    // Get top 3 tasks by time share
    const topTasks = getTopTasks(professionData.task_automation_breakdown, 3);

    // Extract summary from highest likelihood scenario
    const highScenario = professionData.future_scenarios?.find(
      (s) => s.likelihood === "high",
    );
    const summary = highScenario ? highScenario.title : "AI Impact Analysis";

    // Determine timeframe based on risk level
    let timeframe = "5-7 years";
    if (riskLevel === "high") {
      timeframe = "2-3 years";
    } else if (riskLevel === "medium") {
      timeframe = "3-5 years";
    } else {
      timeframe = "7+ years";
    }

    // Format breakdown for display
    const breakdown = topTasks.map(([taskName, taskData]) => {
      const automationScore = Math.round(taskData.score * 100);
      let color = "bg-green-500";

      // Shorten task name
      const shortName = taskName.split("(")[0].trim();
      const category =
        shortName.length > 100
          ? shortName.substring(0, 100) + "..."
          : shortName;

      if (automationScore > 70) {
        color = "bg-red-500";
      } else if (automationScore > 40) {
        color = "bg-yellow-500";
      }

      return {
        category,
        percentage: automationScore,
        color,
        timeShare: Math.round(taskData.time_share * 100),
      };
    });

    setRiskData({
      overallRisk: riskPercentage,
      breakdown,
      summary,
      timeframe,
      riskLevel,
    });
  }, [professionData]);

  if (loading) {
    return (
      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-zinc-400">Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !riskData) {
    return (
      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-zinc-400">{error || "No data available"}</div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6"
    >
      <div className="relative">
        <div className="flex items-center gap-3 mb-6">
          <div
            className={`p-3 rounded-lg ${
              riskData.riskLevel === "high"
                ? "bg-red-500/10"
                : riskData.riskLevel === "medium"
                  ? "bg-yellow-500/10"
                  : "bg-green-500/10"
            }`}
          >
            <AlertTriangle
              className={`w-6 h-6 ${
                riskData.riskLevel === "high"
                  ? "text-red-400"
                  : riskData.riskLevel === "medium"
                    ? "text-yellow-400"
                    : "text-green-400"
              }`}
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              Automation Risk Assessment
            </h3>
            <p className="text-sm text-zinc-400">{riskData.summary}</p>
          </div>
        </div>

        {/* Risk Circle */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="12"
                fill="none"
              />
              <motion.circle
                cx="96"
                cy="96"
                r="88"
                stroke={
                  riskData.riskLevel === "high"
                    ? "#ef4444"
                    : riskData.riskLevel === "medium"
                      ? "#f59e0b"
                      : "#10b981"
                }
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="552"
                animate={{
                  strokeDashoffset: 552 - (riskData.overallRisk / 100) * 552,
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold text-white">
                {riskData.overallRisk}%
              </span>
              <span className="text-sm text-zinc-400 mt-1">Risk Score</span>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white/5 rounded-lg p-4 mb-6">
          <p className="text-sm text-zinc-300 leading-relaxed">
            Based on current AI capabilities, this role has a{" "}
            <strong
              className={
                riskData.riskLevel === "high"
                  ? "text-red-400"
                  : riskData.riskLevel === "medium"
                    ? "text-yellow-400"
                    : "text-green-400"
              }
            >
              {riskData.riskLevel} automation risk
            </strong>{" "}
            with significant changes expected within{" "}
            <strong className="text-white">{riskData.timeframe}</strong>.
          </p>
        </div>

        {/* Breakdown */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
            Top Automatable Tasks
          </h4>
          {riskData.breakdown.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-300">{item.category}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-zinc-500">
                    {item.timeShare}% of time
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {item.percentage}%
                  </span>
                </div>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${item.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percentage}%` }}
                  transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6"></div>
      </div>
    </motion.div>
  );
}
