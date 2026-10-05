"use client";

import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Activity, Clock, Database, Zap, Copy, QrCode, Eye, EyeOff, Check, AlertTriangle, Monitor, Shield, Power } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


interface StatCardProps {
    icon: React.ElementType;
    title: string;
    value: string | number;
    subtitle?: string;
    color: string;
    progress?: number;
    isPulse?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
    icon: Icon,
    title,
    value,
    subtitle,
    color,
    progress,
    isPulse,
}) => {
    return (
        <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#0a0d14]/80 backdrop-blur-xl p-6 hover:border-white/20 transition-all duration-300 shadow-xl group">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ backgroundImage: `radial-gradient(circle at top right, ${color}, transparent)` }} />
            
            <div className="flex items-start justify-between mb-4 relative z-10">
                <div 
                    className="h-12 w-12 rounded-[16px] flex items-center justify-center border border-white/5 shadow-inner"
                    style={{ backgroundColor: `${color}15` }}
                >
                    <Icon className="h-6 w-6" style={{ color: color }} />
                </div>
                {isPulse && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">Active</span>
                    </div>
                )}
            </div>
            
            <div className="flex flex-col gap-1 relative z-10">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40">{title}</h3>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white">{value}</span>
                    {subtitle && <span className="text-xs font-semibold text-white/30">{subtitle}</span>}
                </div>
            </div>

            {progress !== undefined && (
                <div className="mt-5 w-full bg-white/5 rounded-full h-2 overflow-hidden border border-white/5">
                    <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                            width: `${progress}%`,
                            backgroundColor: color,
                            boxShadow: `0 0 15px ${color}80`
                        }}
                    />
                </div>
            )}
        </div>
    );
};


const mockChartData = [
    { time: "00:00", upload: 120, download: 340 },
    { time: "04:00", upload: 80, download: 210 },
    { time: "08:00", upload: 450, download: 890 },
    { time: "12:00", upload: 620, download: 1450 },
    { time: "16:00", upload: 380, download: 980 },
    { time: "20:00", upload: 520, download: 1100 },
    { time: "24:00", upload: 190, download: 430 },
];

export const UsageAnalytics = () => {
    return (
        <div className="rounded-[32px] border border-white/10 bg-[#0a0d14]/80 backdrop-blur-xl p-6 md:p-8 h-full flex flex-col shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <div>
                    <h3 className="text-lg font-bold text-white">Live Traffic</h3>
                    <p className="text-xs text-white/40 mt-1">Real-time bandwidth usage (MB)</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                        <span className="text-[10px] font-bold text-white/60 uppercase">Download</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]" />
                        <span className="text-[10px] font-bold text-white/60 uppercase">Upload</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 min-h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockChartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorDownloadOverview" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.0}/>
                            </linearGradient>
                            <linearGradient id="colorUploadOverview" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" vertical={false} />
                        <XAxis dataKey="time" stroke="rgba(255,255,255,0.1)" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} tickLine={false} axisLine={false} />
                        <YAxis stroke="rgba(255,255,255,0.1)" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} tickLine={false} axisLine={false} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: 'rgba(10, 13, 20, 0.95)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '16px', backdropFilter: 'blur(8px)' }}
                            itemStyle={{ fontSize: 12, fontWeight: 'bold' }}
                        />
                        <Area type="monotone" dataKey="download" stroke="#22d3ee" strokeWidth={3} fillOpacity={1} fill="url(#colorDownloadOverview)" animationDuration={1500} />
                        <Area type="monotone" dataKey="upload" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorUploadOverview)" animationDuration={1500} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};


export default function VpnClientStats() {
    const [clientData, setClientData] = useState<{
        totalData: number;
        usedData: number;
        daysRemaining: number;
        status: string;
        isLoading: boolean;
        subscriptionLink: string;
    }>({
        totalData: 0,
        usedData: 0,
        daysRemaining: 0,
        status: "Checking...",
        isLoading: true,
        subscriptionLink: ""
    });

    const [subVisible, setSubVisible] = useState(false);
    const [copied, setCopied] = useState(false);
    const [qrModalOpen, setQrModalOpen] = useState(false);

    useEffect(() => {
        const fetchClientData = () => {
            setTimeout(() => {
                setClientData({
                    totalData: 50,
                    usedData: 14.8,
                    daysRemaining: 12,
                    status: "Connected",
                    isLoading: false,
                    subscriptionLink: "vless://a2b9f34-1290-4c3d-b450-482930f30c3@104.28.12.199:443?type=tcp&security=xtls&pbk=123#Nexbit-Premium"
                });
            }, 1200);
        };
        fetchClientData();
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(clientData.subscriptionLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const dataProgress = clientData.totalData > 0 ? (clientData.usedData / clientData.totalData) * 100 : 0;
    const daysProgress = (clientData.daysRemaining / 30) * 100; 

    return (
        <div className="relative flex flex-col w-full min-h-screen bg-[#06080d] overflow-hidden p-4 md:p-8">
            
            
            <div className="absolute top-0 inset-x-0 h-[600px] pointer-events-none opacity-40 mix-blend-screen transition-colors duration-1000">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-6">
                
                
                <div className="mb-4 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
                            Dashboard <span className="text-blue-400">Overview</span>
                        </h1>
                        <p className="text-white/40 text-sm">Welcome back, Sachith. Here's what's happening with your network.</p>
                    </div>

                    <div className="flex items-center gap-4 bg-[#0a0d14]/80 border border-white/10 rounded-2xl p-4 backdrop-blur-md shadow-xl w-max">
                        <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                            <span className="text-emerald-400 text-lg font-bold">₨</span>
                        </div>
                        <div>
                            <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-0.5">Total Spent</p>
                            <p className="text-xl font-black text-white tracking-tight">LKR 2,500</p>
                        </div>
                    </div>
                </div>

                
                {!clientData.isLoading && clientData.daysRemaining <= 14 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 backdrop-blur-xl p-5 shadow-lg shadow-amber-500/5"
                    >
                        <div className="h-10 w-10 rounded-xl bg-amber-500/20 flex items-center justify-center border border-amber-500/30 flex-shrink-0">
                            <AlertTriangle className="h-5 w-5 text-amber-400" />
                        </div>
                        <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h4 className="text-sm font-bold text-amber-400">Subscription Expiring Soon</h4>
                                <p className="text-xs font-medium text-amber-400/70 mt-0.5">
                                    Your VPN service expires in <span className="text-white font-bold">{clientData.daysRemaining} days</span>.
                                </p>
                            </div>
                            <button className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all active:scale-95">
                                Renew Now
                            </button>
                        </div>
                    </motion.div>
                )}

                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    <StatCard 
                        icon={Power} title="Status" value={clientData.isLoading ? "..." : clientData.status} 
                        subtitle={clientData.status === "Connected" ? "Secured" : "Offline"} color="#10b981" isPulse={clientData.status === "Connected"}
                    />
                    <StatCard 
                        icon={Database} title="Data Usage" value={`${clientData.isLoading ? "0.0" : clientData.usedData} GB`} 
                        subtitle={`of ${clientData.totalData} GB`} color="#3b82f6" progress={clientData.isLoading ? 0 : dataProgress}
                    />
                    <StatCard 
                        icon={Clock} title="Validity" value={clientData.isLoading ? "0" : clientData.daysRemaining} 
                        subtitle="Days remaining" color="#f59e0b" progress={clientData.isLoading ? 0 : daysProgress}
                    />
                    <StatCard 
                        icon={Shield} title="Protocol" value="VLESS" subtitle="xtls-rprx-vision" color="#a855f7"
                    />
                </motion.div>

                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="lg:col-span-2">
                        <UsageAnalytics />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="rounded-[32px] border border-white/10 bg-[#0a0d14]/80 backdrop-blur-xl p-8 flex flex-col h-full shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 h-32 w-32 bg-blue-500/10 blur-[50px] pointer-events-none" />

                        <div className="flex items-center justify-between mb-8 relative z-10">
                            <h3 className="text-lg font-bold text-white">Quick Connect</h3>
                            <span className="text-[10px] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full uppercase font-bold tracking-widest">VLESS Link</span>
                        </div>
                        
                        <div className="flex-1 flex flex-col gap-6 relative z-10">
                            <div className="relative rounded-2xl bg-black/40 border border-white/5 p-5 shadow-inner">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 block mb-2">Subscription URL</label>
                                <p className={`text-xs text-white/80 break-all font-mono leading-relaxed transition-all duration-300 ${subVisible ? "" : "blur-md select-none opacity-50"}`}>
                                    {clientData.isLoading ? "Loading configuration..." : clientData.subscriptionLink}
                                </p>
                                
                                <button
                                    onClick={() => setSubVisible(!subVisible)}
                                    className="absolute top-4 right-4 h-8 w-8 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center text-white/50 hover:text-white transition-all backdrop-blur-md"
                                >
                                    {subVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-auto">
                                <button
                                    onClick={handleCopy}
                                    disabled={clientData.isLoading}
                                    className={`flex items-center justify-center gap-2 rounded-2xl py-4 text-xs font-bold transition-all border ${
                                        copied
                                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                                            : "bg-blue-600 hover:bg-blue-500 border-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                                    }`}
                                >
                                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    {copied ? "Copied!" : "Copy URL"}
                                </button>
                                <button
                                    onClick={() => setQrModalOpen(!qrModalOpen)}
                                    disabled={clientData.isLoading}
                                    className={`flex items-center justify-center gap-2 rounded-2xl py-4 text-xs font-bold transition-all border ${
                                        qrModalOpen 
                                            ? "bg-white/20 border-white/30 text-white"
                                            : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                                    }`}
                                >
                                    <QrCode className="h-4 w-4" />
                                    {qrModalOpen ? "Close QR" : "Show QR"}
                                </button>
                            </div>

                            <AnimatePresence>
                                {qrModalOpen && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="p-5 bg-white rounded-2xl flex flex-col items-center justify-center overflow-hidden border-4 border-white/10"
                                    >
                                        <QrCode className="h-28 w-28 text-black" strokeWidth={1.5} />
                                        <span className="text-[10px] text-black/60 font-bold mt-3 text-center uppercase tracking-widest">
                                            Scan with v2rayNG / Hiddify
                                        </span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
