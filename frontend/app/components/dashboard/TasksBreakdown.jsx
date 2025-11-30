"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, AlertCircle, Clock, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import useProfessionData from "../../hooks/useProfessionData";

export default function TasksBreakdown() {
  const { data: professionData, loading, error } = useProfessionData();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!professionData || !professionData.task_automation_breakdown) return;

    const taskList = Object.entries(
      professionData.task_automation_breakdown,
    ).map(([taskName, taskData]) => {
      const automationScore = Math.round(taskData.score * 100);
      const timeShare = Math.round(taskData.time_share * 100);

      // Shorten task name
      const shortName = taskName.split("(")[0].trim();
      const fullName = taskName;

      let riskLevel = "low";
      let color = "text-green-400";
      let bgColor = "bg-green-500/10";

      if (automationScore > 70) {
        riskLevel = "high";
        color = "text-red-400";
        bgColor = "bg-red-500/10";
      } else if (automationScore > 40) {
        riskLevel = "medium";
        color = "text-yellow-400";
        bgColor = "bg-yellow-500/10";
      }

      return {
        name:
          shortName.length > 150
            ? shortName.substring(0, 150) + "..."
            : shortName,
        fullName,
        automation: automationScore,
        timeShare,
        riskLevel,
        color,
        bgColor,
      };
    });

    // Sort by time share (most time-consuming first)
    taskList.sort((a, b) => b.timeShare - a.timeShare);
    setTasks(taskList);
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

  if (error || tasks.length === 0) {
    return (
      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-zinc-400">
            {error || "No tasks data available"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Task Automation Analysis
        </h2>
        <p className="text-sm text-zinc-400">
          Breakdown of your daily tasks by automation risk and time allocation
        </p>
      </div>

      {/* Summary Stats */}
      {professionData && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-zinc-400">Total Tasks</span>
            </div>
            <div className="text-2xl font-bold text-white">{tasks.length}</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-xs text-zinc-400">Avg Automation</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {Math.round((professionData.total_task_automation || 0) * 100)}%
            </div>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span className="text-xs text-zinc-400">Low Risk</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {tasks.filter((t) => t.riskLevel === "low").length}
            </div>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-xs text-zinc-400">High Risk</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {tasks.filter((t) => t.riskLevel === "high").length}
            </div>
          </div>
        </div>
      )}

      {/* Tasks List */}
      <div className="space-y-4">
        {tasks.map((task, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={` rounded-lg p-4 border border-white/10`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-md font-semibold text-white mb-1">
                  {task.name}
                </h3>
              </div>
              {/* <div */}
              {/*   className={`px-3 py-1 rounded-full text-xs font-semibold ${task.bgColor} ${task.color} border border-current`} */}
              {/* > */}
              {/*   {task.riskLevel.toUpperCase()} */}
              {/* </div> */}
            </div>

            {/* Progress bars */}
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-xs text-zinc-500 mb-1">
                  <span>Time Allocation</span>
                  <span>{task.timeShare}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{ width: `${task.timeShare}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-zinc-500 mb-1">
                  <span>Automation Risk</span>
                  <span className={`${task.color}`}>{task.automation}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      task.riskLevel === "high"
                        ? "bg-red-500"
                        : task.riskLevel === "medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }`}
                    style={{ width: `${task.automation}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
