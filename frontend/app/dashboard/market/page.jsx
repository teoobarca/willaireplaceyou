"use client";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import MarketAnalytics from "../../components/dashboard/MarketAnalytics";

export default function RoadmapPage() {
    return (
        <DashboardLayout
            pageTitle="Market Analytics"
            pageDescription="Trends and analytical work trhu 2025-2030"
        >
            <MarketAnalytics />
        </DashboardLayout>
    );
}
