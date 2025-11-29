"use client";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import SkillsEngine from "../../components/dashboard/SkillsEngine";

export default function SkillsPage() {
    return (
        <DashboardLayout
            pageTitle="Skills Recommendation"
            pageDescription="Odporúčané zručnosti pre vašu pozíciu"
        >
            <SkillsEngine />
        </DashboardLayout>
    );
}
