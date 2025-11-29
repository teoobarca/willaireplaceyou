"use client";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import AlternativeCareers from "../../components/dashboard/AlternativeCareers";

export default function CareersPage() {
    return (
        <DashboardLayout
            pageTitle="Career Paths"
            pageDescription="Alternatívne kariérne možnosti s vyššou odolnosťou"
        >
            <AlternativeCareers />
        </DashboardLayout>
    );
}
