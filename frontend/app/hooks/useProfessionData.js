"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook to fetch profession data from localStorage
 * @returns {Object} { data, loading, error }
 */
export default function useProfessionData() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            setLoading(true);

            // Get data from localStorage
            const storedData = localStorage.getItem("professionData");

            if (storedData) {
                const parsedData = JSON.parse(storedData);
                console.log(parsedData)
                setData(parsedData);
            } else {
                setError("No profession data found. Please analyze a profession first.");
            }
        } catch (err) {
            console.error("Error loading profession data:", err);
            setError("Failed to load profession data");
        } finally {
            setLoading(false);
        }
    }, []);

    return { data, loading, error };
}

/**
 * Utility function to get risk level from score
 * @param {number} score - Weighted final score (0-1)
 * @returns {string} - 'low', 'medium', or 'high'
 */
export function getRiskLevel(score) {
    const percentage = score * 100;
    if (percentage > 70) return "high";
    if (percentage > 40) return "medium";
    return "low";
}

/**
 * Utility function to get top tasks by time share
 * @param {Object} taskBreakdown - Task automation breakdown
 * @param {number} limit - Number of top tasks to return
 * @returns {Array} - Array of [taskName, taskData] sorted by time_share
 */
export function getTopTasks(taskBreakdown, limit = 5) {
    if (!taskBreakdown) return [];
    return Object.entries(taskBreakdown)
        .sort((a, b) => b[1].time_share - a[1].time_share)
        .slice(0, limit);
}

/**
 * Utility function to get top skills by importance
 * @param {Object} skillBreakdown - Skill automation breakdown
 * @param {number} limit - Number of top skills to return
 * @returns {Array} - Array of [skillName, skillData] sorted by importance
 */
export function getTopSkills(skillBreakdown, limit = 10) {
    if (!skillBreakdown) return [];
    return Object.entries(skillBreakdown)
        .sort((a, b) => b[1].importance - a[1].importance)
        .slice(0, limit);
}
