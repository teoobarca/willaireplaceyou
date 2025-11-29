"use client";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import FutureScenarios from "../../components/dashboard/FutureScenarios";

export default function ScenariosPage() {
    return (
        <DashboardLayout
            pageTitle="Future Scenarios"
            pageDescription="Potential evolution paths for your profession"
        >
            <FutureScenarios />
        </DashboardLayout>
    );
}
