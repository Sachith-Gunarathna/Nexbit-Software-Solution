"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils";
import {
    LayoutDashboard,
    Shield,
    BarChart3,
    Monitor,
    Settings,
    ChevronLeft,
    ChevronRight,
    Package,
    CreditCard,
    HelpCircle,
    Zap,
} from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
    {
        label: "Overview",
        href: "/dashboard",
        icon: LayoutDashboard,
        exact: true,
    },
    {
        label: "Subscriptions",
        href: "/dashboard/subscriptions",
        icon: Package,
    },
    {
        label: "Devices",
        href: "/dashboard/devices",
        icon: Monitor,
    },
    {
        label: "Analytics",
        href: "/dashboard/analytics",
        icon: BarChart3,
    },
    {
        label: "Billing",
        href: "/dashboard/billing",
        icon: CreditCard,
    },
];

const bottomItems = [
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
    { label: "Help", href: "/dashboard/help", icon: HelpCircle },
];

const Sidebar = () => {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    const isActive = (href: string, exact?: boolean) => {
        if (exact) return pathname === href;
        return pathname.startsWith(href);
    };

    return (
        <aside
            className={cn(
                "hidden md:flex flex-col border-r border-white/5 bg-[#03040b]/90 backdrop-blur-3xl transition-all duration-300 ease-in-out relative z-50",
                collapsed ? "w-20" : "w-64"
            )}
        >
            {/* Logo */}
            <div className={cn("flex items-center h-20 px-6 flex-shrink-0", collapsed && "justify-center px-0")}>
                <img 
                    src="/logo2.png" 
                    alt="Nexbit" 
                    className={cn("object-contain transition-all duration-300", collapsed ? "w-10 h-10" : "w-32 h-auto")} 
                />
            </div>

            {/* Collapse toggle */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-3.5 top-7 z-10 h-7 w-7 rounded-full border border-white/10 bg-[#0a0d14] flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all shadow-xl"
            >
                {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
            </button>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-1">
                {!collapsed && (
                    <p className="text-[9px] uppercase tracking-widest text-white/30 font-bold px-3 mb-3">
                        Main Menu
                    </p>
                )}
                {navItems.map((item) => {
                    const active = isActive(item.href, item.exact);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "relative flex items-center gap-3.5 rounded-xl px-3 py-3 text-sm font-semibold transition-all duration-300 group",
                                active
                                    ? "text-white"
                                    : "text-white/40 hover:text-white/90 hover:bg-white/5",
                                collapsed && "justify-center px-0"
                            )}
                            title={collapsed ? item.label : undefined}
                        >
                            {active && (
                                <motion.div 
                                    layoutId="sidebarActiveIndicator"
                                    className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" 
                                />
                            )}
                            {active && !collapsed && (
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                            )}
                            <item.icon className={cn("h-4 w-4 flex-shrink-0 relative z-10 transition-colors", active ? "text-blue-400" : "text-white/30 group-hover:text-white/60")} />
                            {!collapsed && <span className="relative z-10 tracking-wide">{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* Upgrade CTA */}
            {!collapsed && (
                <div className="px-4 pb-4">
                    <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-blue-500/10 p-5 backdrop-blur-md group hover:border-blue-500/30 transition-all">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-transparent pointer-events-none" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-3">
                                <Zap className="h-4 w-4 text-blue-400" />
                                <p className="text-sm font-bold text-white">Upgrade Plan</p>
                            </div>
                            <p className="text-xs text-white/50 mb-4 leading-relaxed font-medium">
                                Unlock dedicated LK IPs and uncapped bandwidth.
                            </p>
                            <Link
                                href="/dashboard/subscriptions"
                                className="block w-full text-center text-xs font-bold py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all active:scale-95"
                            >
                                View Packages
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Bottom items */}
            <div className="border-t border-white/5 px-4 py-4 flex flex-col gap-1">
                {bottomItems.map((item) => {
                    const active = isActive(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "relative flex items-center gap-3.5 rounded-xl px-3 py-3 text-sm font-semibold transition-all group",
                                active
                                    ? "text-white bg-white/5 border border-white/10"
                                    : "text-white/30 hover:text-white/80 hover:bg-white/5 border border-transparent",
                                collapsed && "justify-center px-0"
                            )}
                            title={collapsed ? item.label : undefined}
                        >
                            <item.icon className="h-4 w-4 flex-shrink-0 transition-colors" />
                            {!collapsed && <span className="tracking-wide">{item.label}</span>}
                        </Link>
                    );
                })}
            </div>
        </aside>
    );
};

export default Sidebar;
