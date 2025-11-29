"use client";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import MarketAnalytics from "../../components/dashboard/MarketAnalytics";

export default function AnalyticsPage() {
    return (
        <DashboardLayout
            pageTitle="Market Analytics"
            pageDescription="Trendy a analytiky pracovného trhu 2025-2030"
        >
            <MarketAnalytics />
        </DashboardLayout>
    );
}
