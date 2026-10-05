"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Shield,
    Copy,
    QrCode,
    Eye,
    EyeOff,
    RefreshCw,
    Clock,
    Zap,
    TrendingUp,
    TrendingDown,
    Activity,
    Calendar,
    ChevronRight,
    Wifi,
    AlertTriangle,
    Power,
    Check,
} from "lucide-react";
import Link from "next/link";
import { useClerk } from "@clerk/nextjs";
import { useOverviewData } from "@/hooks/use-dashboard-data";
import { OverviewSkeleton } from "./skeletons/overview-skeleton";
import { toast } from "sonner";


const DonutChart = ({
    used,
    total,
    unit,
    color,
}: {
    used: number;
    total: number;
    unit: string;
    color: string;
}) => {
    const pct = Math.min((used / total) * 100, 100);
    const r = 38;
    const circ = 2 * Math.PI * r;
    const offset = circ - (pct / 100) * circ;

    const trackColor = "rgba(255,255,255,0.05)";
    const strokeColor =
        pct > 80 ? "#f43f5e" : pct > 60 ? "#f59e0b" : color;

    return (
        <div className="relative flex items-center justify-center">
            <svg width="100" height="100" className="-rotate-90">
                <circle cx="50" cy="50" r={r} stroke={trackColor} strokeWidth="8" fill="none" />
                <circle
                    cx="50"
                    cy="50"
                    r={r}
                    stroke={strokeColor}
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={circ}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 1s ease, stroke 0.3s ease" }}
                    filter={`drop-shadow(0 0 6px ${strokeColor})`}
                />
            </svg>
            <div className="absolute flex flex-col items-center">
                <span className="text-lg font-bold text-white">{used}</span>
                <span className="text-[9px] text-white/30 uppercase">{unit}</span>
            </div>
        </div>
    );
};


const Sparkline = ({ data, color }: { data: number[]; color: string }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const w = 80;
    const h = 28;
    const pts = data
        .map((v, i) => {
            const x = (i / (data.length - 1)) * w;
            const y = h - ((v - min) / (max - min || 1)) * h;
            return `${x},${y}`;
        })
        .join(" ");
    const areaBottom = `${w},${h} 0,${h}`;

    return (
        <svg width={w} height={h} className="overflow-visible">
            <defs>
                <linearGradient id={`sg-${color}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
            </defs>
            <polygon points={`${pts} ${areaBottom}`} fill={`url(#sg-${color})`} />
            <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};


const DashboardOverview = () => {
    const { user } = useClerk();
    
    
    const {
        data,
        isLoading,
        isRefreshing,
        refetch,
        regenerateToken,
        toggleConnection,
    } = useOverviewData();

    const [subVisible, setSubVisible] = useState(false);
    const [copied, setCopied] = useState(false);
    const [qrModalOpen, setQrModalOpen] = useState(false);

    
    if (isLoading) {
        return <OverviewSkeleton />;
    }

    const { connection, stats, bandwidth, subscription, recentActivity } = data;

    const handleCopy = () => {
        navigator.clipboard.writeText(subscription.vlessLink);
        setCopied(true);
        toast.success("VLESS subscription link copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    };

    const getStatIcon = (id: string) => {
        switch (id) {
            case "down_speed":
                return TrendingDown;
            case "up_speed":
                return TrendingUp;
            case "active_sessions":
                return Wifi;
            default:
                return Activity;
        }
    };

    const fadeUp = (delay = 0) => ({
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94], delay },
    });

    return (
        <div className="flex flex-col gap-6 p-4 md:p-6 max-w-7xl mx-auto w-full">
            
            <motion.div
                {...fadeUp(0)}
                className="relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-blue-600/20 via-[#0d1121] to-purple-600/15 p-6"
            >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.15),transparent_60%)]" />
                <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none">
                    <Shield className="w-full h-full text-blue-400" />
                </div>
                <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm text-white/40">Welcome back,</span>
                            {isRefreshing && (
                                <span className="flex items-center gap-1 text-[11px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                                    <RefreshCw className="h-3 w-3 animate-spin" /> Syncing...
                                </span>
                            )}
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white">
                            {user?.firstName || "Alex"} 👋
                        </h1>
                        <p className="text-sm text-white/40 mt-1">
                            {connection.status === "connected"
                                ? "Your VPN is active and traffic is fully encrypted."
                                : "VPN is currently disconnected. Reconnect to restore protection."}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        
                        <button
                            onClick={refetch}
                            disabled={isRefreshing}
                            title="Refresh dashboard metrics"
                            className="flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-xs text-white/70 hover:text-white hover:bg-white/10 transition-all"
                        >
                            <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin text-blue-400" : ""}`} />
                            <span className="hidden sm:inline">Refresh</span>
                        </button>

                        
                        <button
                            onClick={toggleConnection}
                            className={`flex items-center gap-2 rounded-xl border px-4 py-2 transition-all ${
                                connection.status === "connected"
                                    ? "bg-emerald-400/10 border-emerald-400/25 hover:bg-emerald-400/15"
                                    : "bg-rose-400/10 border-rose-400/25 hover:bg-rose-400/15"
                            }`}
                        >
                            <span
                                className={`h-2 w-2 rounded-full ${
                                    connection.status === "connected"
                                        ? "bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse"
                                        : "bg-rose-400"
                                }`}
                            />
                            <span
                                className={`text-sm font-semibold uppercase ${
                                    connection.status === "connected"
                                        ? "text-emerald-400"
                                        : "text-rose-400"
                                }`}
                            >
                                {connection.status}
                            </span>
                        </button>

                        <Link
                            href="/dashboard/servers"
                            className="flex items-center gap-2 rounded-xl bg-blue-500/10 border border-blue-500/20 px-4 py-2 hover:bg-blue-500/20 transition-colors"
                        >
                            <span className="text-sm font-medium text-blue-400">
                                {connection.server.flag} {connection.server.country}
                            </span>
                            <ChevronRight className="h-4 w-4 text-blue-400" />
                        </Link>
                    </div>
                </div>
            </motion.div>

            
            <motion.div {...fadeUp(0.1)} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s) => {
                    const IconComponent = getStatIcon(s.id);
                    return (
                        <div
                            key={s.id}
                            className="group rounded-2xl border border-white/5 bg-[#0d1121] hover:border-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-black/30 p-4"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div
                                    className="h-8 w-8 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: `${s.color}15` }}
                                >
                                    <IconComponent className="h-4 w-4" style={{ color: s.color }} />
                                </div>
                                <Sparkline data={s.data} color={s.color} />
                            </div>
                            <div className="flex items-end gap-1">
                                <span className="text-2xl font-bold text-white">{s.value}</span>
                                <span className="text-xs text-white/30 mb-0.5">{s.unit}</span>
                            </div>
                            <div className="flex items-center justify-between mt-1">
                                <p className="text-xs text-white/30">{s.label}</p>
                                <span
                                    className={`text-[10px] font-medium ${
                                        s.up ? "text-emerald-400" : "text-rose-400"
                                    }`}
                                >
                                    {s.change}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </motion.div>

            
            <motion.div {...fadeUp(0.2)} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <div className="rounded-2xl border border-white/5 bg-[#0d1121] p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-white/80">Data Usage</h3>
                        <span className="text-[10px] text-white/25 uppercase tracking-wider">
                            Resets {bandwidth.resetDate}
                        </span>
                    </div>
                    <div className="flex items-center justify-center gap-6 mb-4">
                        <div className="flex flex-col items-center gap-1">
                            <DonutChart
                                used={bandwidth.used}
                                total={bandwidth.total}
                                unit={bandwidth.unit}
                                color="#3b82f6"
                            />
                            <p className="text-xs text-white/30">Total Used</p>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-[10px] text-white/30">Download</span>
                                    <span className="text-[10px] text-blue-400">{bandwidth.downloadGB} GB</span>
                                </div>
                                <div className="h-1.5 w-32 rounded-full bg-white/5 overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-blue-500 shadow-sm shadow-blue-500"
                                        style={{ width: `${(bandwidth.downloadGB / bandwidth.total) * 100}%` }}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-[10px] text-white/30">Upload</span>
                                    <span className="text-[10px] text-purple-400">{bandwidth.uploadGB} GB</span>
                                </div>
                                <div className="h-1.5 w-32 rounded-full bg-white/5 overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-purple-500 shadow-sm shadow-purple-500"
                                        style={{ width: `${(bandwidth.uploadGB / bandwidth.total) * 100}%` }}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-[10px] text-white/30">Remaining</span>
                                    <span className="text-[10px] text-emerald-400">{bandwidth.remainingGB} GB</span>
                                </div>
                                <div className="h-1.5 w-32 rounded-full bg-white/5 overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-emerald-500 shadow-sm shadow-emerald-500"
                                        style={{ width: `${(bandwidth.remainingGB / bandwidth.total) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-white/25">
                            {bandwidth.used} GB used of {bandwidth.total} GB monthly allowance
                        </p>
                    </div>
                </div>

                
                <div className="rounded-2xl border border-white/5 bg-[#0d1121] p-5 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-semibold text-white/80">Subscription</h3>
                            <span className="text-[10px] text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-full px-2 py-0.5">
                                Expiring Soon
                            </span>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center gap-3 py-1">
                            <div className="h-16 w-16 rounded-2xl bg-amber-400/10 border border-amber-400/15 flex items-center justify-center">
                                <Calendar className="h-8 w-8 text-amber-400" />
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-white mb-0.5">
                                    {subscription.daysRemaining}
                                </div>
                                <div className="text-sm text-white/40">days remaining</div>
                                <div className="text-xs text-white/25 mt-1">
                                    Expires {subscription.expiresAt}
                                </div>
                            </div>
                            <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
                                    style={{
                                        width: `${Math.min(100, (subscription.daysRemaining / 30) * 100)}%`,
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <Link
                        href="/dashboard/subscriptions"
                        className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                    >
                        <Zap className="h-4 w-4" />
                        Renew Now
                    </Link>
                </div>

                
                <div className="rounded-2xl border border-white/5 bg-[#0d1121] p-5 flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-white/80">Quick Connect</h3>
                        <span className="text-[10px] text-white/25 uppercase font-mono">VLESS / Reality</span>
                    </div>
                    <div className="flex-1 flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                            <span className="text-xs text-white/50">Active Subscription Link</span>
                        </div>

                        
                        <div className="relative rounded-xl bg-white/5 border border-white/5 p-3 font-mono">
                            <p
                                className={`text-[10px] text-white/60 break-all leading-relaxed transition-all ${
                                    subVisible ? "" : "blur-sm select-none"
                                }`}
                            >
                                {subscription.vlessLink}
                            </p>
                            <button
                                onClick={() => setSubVisible(!subVisible)}
                                title={subVisible ? "Hide Link" : "Show Link"}
                                className="absolute top-2 right-2 h-6 w-6 rounded-md bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white/80 transition-all"
                            >
                                {subVisible ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={handleCopy}
                                className={`flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-medium transition-all border ${
                                    copied
                                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                                        : "bg-white/5 border-white/5 text-white/60 hover:bg-blue-500/10 hover:border-blue-500/20 hover:text-blue-400"
                                }`}
                            >
                                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                                {copied ? "Copied!" : "Copy Link"}
                            </button>
                            <button
                                onClick={() => setQrModalOpen(!qrModalOpen)}
                                className="flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-medium bg-white/5 border border-white/5 text-white/60 hover:bg-purple-500/10 hover:border-purple-500/20 hover:text-purple-400 transition-all"
                            >
                                <QrCode className="h-3 w-3" />
                                {qrModalOpen ? "Hide QR" : "View QR"}
                            </button>
                        </div>

                        {qrModalOpen && (
                            <div className="p-3 bg-white rounded-xl flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-200">
                                <QrCode className="h-28 w-28 text-black" />
                                <span className="text-[9px] text-black/60 font-mono mt-1">Scan in v2rayNG / Hiddify</span>
                            </div>
                        )}

                        <button
                            onClick={regenerateToken}
                            className="flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-medium bg-white/5 border border-white/5 text-white/40 hover:bg-white/8 hover:text-white/70 transition-all"
                        >
                            <RefreshCw className="h-3 w-3" />
                            Regenerate Access Token
                        </button>
                    </div>
                </div>
            </motion.div>

            
            <motion.div
                {...fadeUp(0.3)}
                className="rounded-2xl border border-white/5 bg-[#0d1121] overflow-hidden"
            >
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-white/30" />
                        <h3 className="text-sm font-semibold text-white/80">Recent Activity</h3>
                    </div>
                    <Link
                        href="/dashboard/analytics"
                        className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                    >
                        View all <ChevronRight className="h-3 w-3" />
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="text-left text-[10px] uppercase tracking-wider text-white/20 px-5 py-3 font-medium">
                                    Server
                                </th>
                                <th className="text-left text-[10px] uppercase tracking-wider text-white/20 px-4 py-3 font-medium hidden sm:table-cell">
                                    IP Address
                                </th>
                                <th className="text-left text-[10px] uppercase tracking-wider text-white/20 px-4 py-3 font-medium hidden md:table-cell">
                                    Duration
                                </th>
                                <th className="text-left text-[10px] uppercase tracking-wider text-white/20 px-4 py-3 font-medium hidden md:table-cell">
                                    Data Used
                                </th>
                                <th className="text-left text-[10px] uppercase tracking-wider text-white/20 px-4 py-3 font-medium">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/3">
                            {recentActivity.map((row) => (
                                <tr key={row.id} className="hover:bg-white/2 transition-colors group">
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center gap-2.5">
                                            <span className="text-base">{row.flag}</span>
                                            <span className="text-sm text-white/70 font-medium">{row.server}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3.5 hidden sm:table-cell">
                                        <code className="text-xs text-white/30 bg-white/5 px-2 py-0.5 rounded font-mono">
                                            {row.ip}
                                        </code>
                                    </td>
                                    <td className="px-4 py-3.5 hidden md:table-cell">
                                        <span className="text-xs text-white/40">{row.duration}</span>
                                    </td>
                                    <td className="px-4 py-3.5 hidden md:table-cell">
                                        <span className="text-xs text-white/40">{row.bytes}</span>
                                    </td>
                                    <td className="px-4 py-3.5">
                                        <span
                                            className={`text-[10px] font-semibold uppercase rounded-full px-2 py-0.5 ${
                                                row.status === "active"
                                                    ? "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20"
                                                    : "bg-white/5 text-white/25 border border-white/5"
                                            }`}
                                        >
                                            {row.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            
            <motion.div
                {...fadeUp(0.4)}
                className="flex items-start gap-3 rounded-2xl border border-amber-400/15 bg-amber-400/5 p-4"
            >
                <AlertTriangle className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                    <p className="text-xs font-semibold text-amber-400">Subscription Expiring Soon</p>
                    <p className="text-xs text-white/40 mt-0.5">
                        Your {subscription.planName} plan expires in {subscription.daysRemaining} days. Renew now to avoid service interruption and keep your traffic protected.{" "}
                        <Link href="/dashboard/subscriptions" className="text-blue-400 hover:underline">
                            View plans →
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default DashboardOverview;
