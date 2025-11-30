"use client";

import React, { useState, useEffect } from "react";
import { Brain, Bot, Users, Lightbulb, TrendingUp, Clock } from "lucide-react";
import useProfessionData, { getTopSkills } from "../../hooks/useProfessionData";

export default function SkillsEngine() {
  const { data: professionData, loading, error } = useProfessionData();
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    if (!professionData || !professionData.skill_automation_breakdown) return;

    const topSkills = getTopSkills(
      professionData.skill_automation_breakdown,
      8,
    );

    const formattedSkills = topSkills.map(([skillName, skillData]) => {
      const automationScore = Math.round(skillData.score * 100);
      const importance = Math.round(skillData.importance * 100);

      // Determine category based on automation score
      let category = "Core Skills";
      let icon = Brain;
      let color = "text-purple-400";

      if (automationScore < 40) {
        category = "Human Skills";
        icon = Users;
        color = "text-green-400";
      } else if (automationScore > 70) {
        category = "Technical Skills";
        icon = Bot;
        color = "text-red-400";
      } else {
        category = "Hybrid Skills";
        icon = Lightbulb;
        color = "text-yellow-400";
      }

      return {
        name:
          skillName.length > 100
            ? skillName.substring(0, 100) + " ..."
            : skillName,
        automation: automationScore,
        importance,
        category,
        icon,
        color,
        // Priority: high importance + low automation = high priority
        priority: importance - automationScore,
      };
    });

    // Sort by priority (high importance, low automation first)
    formattedSkills.sort((a, b) => b.priority - a.priority);

    setSkills(formattedSkills);
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

  if (error || skills.length === 0) {
    return (
      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-zinc-400">
            {error || "No skills data available"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Required Skills</h2>
        <p className="text-sm text-zinc-400">
          Skills prioritized by importance and automation resistance
        </p>
      </div>

      {professionData && (
        <div className="mb-6 pb-6 border-b border-white/10">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-zinc-400">Total Skills</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {
                  Object.keys(professionData.skill_automation_breakdown || {})
                    .length
                }
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-zinc-400">Avg Automation</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {Math.round((professionData.total_skill_automation || 0) * 100)}
                %
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {skills.map((skill, index) => {
          const IconComponent = skill.icon;
          return (
            <div
              key={index}
              className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg bg-white/5 ${skill.color}`}>
                  <IconComponent className="w-5 h-5" />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-1">
                        {skill.name}
                      </h3>
                      <p className="text-xs text-zinc-500">{skill.category}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-white">
                        {skill.importance}%
                      </div>
                      <div className="text-xs text-zinc-500">Importance</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs text-zinc-400 mb-1">
                        <span>Automation Risk</span>
                        <span className={`${skill.color}`}>
                          {skill.automation}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            skill.automation > 70
                              ? "bg-red-500"
                              : skill.automation > 40
                                ? "bg-yellow-500"
                                : "bg-green-500"
                          }`}
                          style={{ width: `${skill.automation}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

