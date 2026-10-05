"use client";

import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, Cell } from "recharts";
import { Activity, Clock, Database, Globe, ArrowUpRight, ArrowDownRight, Zap } from "lucide-react";
import { motion } from "framer-motion";

const mockBandwidthData = [
    { time: "Mon", download: 120, upload: 45 },
    { time: "Tue", download: 180, upload: 70 },
    { time: "Wed", download: 150, upload: 50 },
    { time: "Thu", download: 280, upload: 110 },
    { time: "Fri", download: 340, upload: 150 },
    { time: "Sat", download: 420, upload: 190 },
    { time: "Sun", download: 390, upload: 170 },
];

const mockProtocolData = [
    { name: "VLESS", value: 65 },
    { name: "Trojan", value: 20 },
    { name: "VMess", value: 10 },
    { name: "Shadowsocks", value: 5 },
];

export default function AnalyticsPage() {
    return (
        <div className="relative flex flex-col w-full min-h-screen bg-[#06080d] overflow-hidden p-4 md:p-8">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 inset-x-0 h-[600px] pointer-events-none opacity-40 mix-blend-screen transition-colors duration-1000">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-8">
                
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6"
                >
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
                            Network <span className="text-indigo-400">Analytics</span>
                        </h1>
                        <p className="text-white/40 text-sm">
                            Deep dive into your connection metrics and bandwidth utilization.
                        </p>
                    </div>

                    <div className="flex gap-2 bg-white/5 border border-white/10 p-1.5 rounded-2xl backdrop-blur-xl">
                        {["24H", "7D", "30D", "ALL"].map((range, i) => (
                            <button key={range} className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${i === 1 ? "bg-white text-black shadow-lg" : "text-white/40 hover:text-white"}`}>
                                {range}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Top Stats Grid */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {[
                        { title: "Total Download", value: "1.8 TB", sub: "+12% from last week", icon: ArrowDownRight, color: "text-cyan-400", bg: "bg-cyan-500/10" },
                        { title: "Total Upload", value: "450 GB", sub: "+5% from last week", icon: ArrowUpRight, color: "text-purple-400", bg: "bg-purple-500/10" },
                        { title: "Average Latency", value: "42 ms", sub: "-3 ms improved", icon: Activity, color: "text-emerald-400", bg: "bg-emerald-500/10" },
                        { title: "Active Nodes", value: "3", sub: "Singapore & Sri Lanka", icon: Globe, color: "text-amber-400", bg: "bg-amber-500/10" },
                    ].map((stat, idx) => (
                        <div key={idx} className="rounded-[24px] border border-white/10 bg-[#0a0d14]/80 backdrop-blur-xl p-6 shadow-xl flex items-start justify-between">
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-widest font-semibold text-white/40 mb-2">{stat.title}</span>
                                <span className="text-2xl font-black text-white mb-2">{stat.value}</span>
                                <span className={`text-[10px] font-bold ${stat.color}`}>{stat.sub}</span>
                            </div>
                            <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${stat.bg} border border-white/5`}>
                                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Main Charts Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Bandwidth Chart (Spans 2 columns) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-2 rounded-[32px] border border-white/10 bg-[#0a0d14]/80 backdrop-blur-xl p-8 shadow-2xl flex flex-col min-h-[400px]"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-lg font-bold text-white">Bandwidth Usage</h3>
                                <p className="text-xs text-white/40">Download & Upload distribution over time</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                                    <span className="text-[10px] font-bold text-white/60 uppercase">Download</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                                    <span className="text-[10px] font-bold text-white/60 uppercase">Upload</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 w-full relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={mockBandwidthData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorDl" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4}/>
                                            <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                                        </linearGradient>
                                        <linearGradient id="colorUl" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                    <XAxis dataKey="time" stroke="rgba(255,255,255,0.1)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} tickLine={false} axisLine={false} />
                                    <YAxis stroke="rgba(255,255,255,0.1)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} tickLine={false} axisLine={false} />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: 'rgba(10, 13, 20, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '16px', backdropFilter: 'blur(12px)' }}
                                        itemStyle={{ fontSize: 12, fontWeight: 'bold' }}
                                    />
                                    <Area type="monotone" dataKey="download" stroke="#22d3ee" strokeWidth={4} fillOpacity={1} fill="url(#colorDl)" />
                                    <Area type="monotone" dataKey="upload" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorUl)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Protocol Distribution */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="rounded-[32px] border border-white/10 bg-[#0a0d14]/80 backdrop-blur-xl p-8 shadow-2xl flex flex-col min-h-[400px]"
                    >
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-white">Protocols</h3>
                            <p className="text-xs text-white/40">Traffic by protocol type</p>
                        </div>
                        
                        <div className="flex-1 w-full relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={mockProtocolData} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.4)" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: 600 }} tickLine={false} axisLine={false} width={80} />
                                    <Tooltip 
                                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                        contentStyle={{ backgroundColor: 'rgba(10, 13, 20, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                    />
                                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                                        {mockProtocolData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={index === 0 ? '#6366f1' : index === 1 ? '#8b5cf6' : index === 2 ? '#d946ef' : '#f43f5e'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
