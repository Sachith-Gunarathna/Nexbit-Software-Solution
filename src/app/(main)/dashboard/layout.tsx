import React from "react";
import { DashboardNavbar, Sidebar } from "@/components";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen dashboard-bg">
            <Sidebar />
            <div className="flex flex-1 flex-col min-w-0">
                <DashboardNavbar />
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
