"use client";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import PersonalizedRoadmap from "../../components/dashboard/PersonalizedRoadmap";

export default function RoadmapPage() {
    return (
        <DashboardLayout
            pageTitle="Learning Roadmap"
            pageDescription="Personalizovaný plán vzdelávania"
        >
            <PersonalizedRoadmap />
        </DashboardLayout>
    );
}
