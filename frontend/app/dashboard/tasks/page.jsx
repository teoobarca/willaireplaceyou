"use client";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import TasksBreakdown from "../../components/dashboard/TasksBreakdown";

export default function TasksPage() {
    return (
        <DashboardLayout
        >
            <TasksBreakdown />
        </DashboardLayout>
    );
}
