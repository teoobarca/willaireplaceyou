"use client";

import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import marketData from "./data.json"; // Import JSON súboru

export default function MarketAnalytics() {
  // Data z JSON
  const yearlyData = marketData.charts.aiAdaptedRoleOutlook.data.map(
    (item) => ({
      year: item.year.toString(),
      value: item.value,
      note: item.note,
    })
  );

  const sectors = marketData.charts.employmentBySector.rows.map((sector) => ({
    name: sector.label,
    growth: sector.score,
    trend:
      sector.direction === "up"
        ? "up"
        : sector.direction === "mixed" || sector.direction === "mixed_to_down"
        ? "mixed"
        : "down",
    notes: sector.notes,
  }));

  const trends = {
    declining: marketData.lists.decliningPositions.items.map(
      (item) => item.name
    ),
    growing: marketData.lists.growingPositions.items.map((item) => item.name),
  };

  const maxValue = Math.max(...yearlyData.map((d) => d.value));

  // Generate SVG path for the curve
  const generatePath = () => {
    const points = yearlyData.map((data, i) => {
      const x = (i / (yearlyData.length - 1)) * 100;
      const y = 100 - (data.value / maxValue) * 100;
      return { x, y };
    });

    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      path += ` L ${points[i].x} ${points[i].y}`;
    }
    return path;
  };

  const generateAreaPath = () => {
    const linePath = generatePath();
    return `${linePath} L 100 100 L 0 100 Z`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative bg-white/5 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl opacity-30"></div>

      <div className="relative">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-500/20 rounded-xl">
            <BarChart3 className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              {marketData.meta.title}
            </h3>
            <p className="text-sm text-zinc-400">{marketData.meta.subtitle}</p>
          </div>
        </div>

   

        {/* Heatmap */}
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-4">
            {marketData.charts.employmentBySector.title}
          </h4>
          <div className="space-y-3">
            {sectors.map((sector, index) => (
              <motion.div
                key={sector.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="flex items-center gap-3"
              >
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-zinc-300">{sector.name}</span>
                    <div className="flex items-center gap-2">
                      {sector.trend === "up" ? (
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      ) : sector.trend === "mixed" ? (
                        <div className="w-4 h-4 flex items-center justify-center">
                          <div className="w-3 h-0.5 bg-yellow-400 rounded"></div>
                        </div>
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-400" />
                      )}
                      <span className="text-sm font-semibold text-white">
                        {sector.growth}
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${
                        sector.growth > 60
                          ? "bg-green-500"
                          : sector.growth > 40
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${sector.growth}%` }}
                      transition={{ duration: 1, delay: 0.4 + index * 0.05 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

         {/* Trends */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingDown className="w-5 h-5 text-red-400" />
              <h5 className="font-semibold text-white">
                {marketData.lists.decliningPositions.title}
              </h5>
            </div>
            <div className="space-y-2">
              {trends.declining.map((role) => (
                <div
                  key={role}
                  className="text-sm text-zinc-300 bg-white/5 px-3 py-2 rounded-lg"
                >
                  {role}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <h5 className="font-semibold text-white">
                {marketData.lists.growingPositions.title}
              </h5>
            </div>
            <div className="space-y-2">
              {trends.growing.map((role) => (
                <div
                  key={role}
                  className="text-sm text-zinc-300 bg-white/5 px-3 py-2 rounded-lg"
                >
                  {role}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sources */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h5 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-3">
            Data Sources
          </h5>
          <div className="space-y-2">
            {marketData.meta.sources.map((source, index) => (
              <a
                key={index}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs text-zinc-400 hover:text-blue-400 transition-colors"
              >
                • {source.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
