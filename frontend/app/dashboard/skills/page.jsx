"use client";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import SkillsEngine from "../../components/dashboard/SkillsEngine";

export default function SkillsPage() {
    return (
        <DashboardLayout
            pageTitle="Required Skills"
            pageDescription="Develop these skills to stay ahead"
        >
            <SkillsEngine />
        </DashboardLayout>
    );
}
