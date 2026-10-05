"use client";

import React, { useState } from "react";
import { Laptop, Smartphone, Monitor, Shield, Trash2, PowerOff, Globe, Wifi, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MOCK_DEVICES = [
    { id: "dev-1", name: "Sachith's iPhone 14", type: "mobile", os: "iOS 17.1", ip: "10.0.0.12", data: "4.2 GB", location: "Colombo, LK", status: "online", lastActive: "Just now" },
    { id: "dev-2", name: "MacBook Pro M2", type: "laptop", os: "macOS Sonoma", ip: "10.0.0.45", data: "18.5 GB", location: "Colombo, LK", status: "online", lastActive: "Just now" },
    { id: "dev-3", name: "Windows Gaming PC", type: "desktop", os: "Windows 11", ip: "10.0.0.88", data: "45.1 GB", location: "Kandy, LK", status: "offline", lastActive: "2 hours ago" },
    { id: "dev-4", name: "Samsung Galaxy S23", type: "mobile", os: "Android 14", ip: "10.0.0.23", data: "1.8 GB", location: "Colombo, LK", status: "offline", lastActive: "1 day ago" },
];

export default function DevicesPage() {
    const [devices, setDevices] = useState(MOCK_DEVICES);

    const handleDisconnect = (id: string) => {
        setDevices(devices.map(d => d.id === id ? { ...d, status: "offline" } : d));
    };

    const getIcon = (type: string) => {
        if (type === "mobile") return <Smartphone className="h-6 w-6 text-emerald-400" />;
        if (type === "laptop") return <Laptop className="h-6 w-6 text-emerald-400" />;
        return <Monitor className="h-6 w-6 text-emerald-400" />;
    };

    return (
        <div className="relative flex flex-col w-full min-h-screen bg-[#06080d] overflow-hidden p-4 md:p-8">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 inset-x-0 h-[500px] pointer-events-none opacity-40 mix-blend-screen transition-colors duration-1000">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-emerald-900/40 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col">
                
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6"
                >
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
                            Connected <span className="text-emerald-400">Devices</span>
                        </h1>
                        <p className="text-white/40 text-sm">
                            Manage your active sessions and connected hardware.
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-4 bg-[#0a0d14]/80 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/10 shadow-xl">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                                <Activity className="h-5 w-5 text-emerald-400" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-white/40 uppercase tracking-widest font-semibold">Active Sessions</span>
                                <span className="text-lg font-bold text-white leading-none mt-1">2 / 5 Allowed</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Device Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    <AnimatePresence>
                        {devices.map((device, idx) => (
                            <motion.div
                                key={device.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`relative overflow-hidden rounded-[32px] border bg-[#0a0d14]/80 backdrop-blur-xl p-6 shadow-2xl transition-all duration-300 ${
                                    device.status === "online" 
                                        ? "border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.05)]" 
                                        : "border-white/5 opacity-70 hover:opacity-100"
                                }`}
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className={`h-14 w-14 rounded-2xl flex items-center justify-center border ${
                                            device.status === "online" ? "bg-emerald-500/10 border-emerald-500/20 shadow-inner" : "bg-white/5 border-white/10"
                                        }`}>
                                            {getIcon(device.type)}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white">{device.name}</h3>
                                            <p className="text-xs font-medium text-white/40">{device.os}</p>
                                        </div>
                                    </div>
                                    
                                    {device.status === "online" ? (
                                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Online</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                                            <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
                                            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Offline</span>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/5">
                                        <Wifi className="h-4 w-4 text-white/30" />
                                        <div className="flex flex-col">
                                            <span className="text-[9px] uppercase tracking-wider text-white/30 font-semibold">IP Address</span>
                                            <span className="text-xs font-bold text-white font-mono">{device.ip}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/5">
                                        <Activity className="h-4 w-4 text-white/30" />
                                        <div className="flex flex-col">
                                            <span className="text-[9px] uppercase tracking-wider text-white/30 font-semibold">Data Used</span>
                                            <span className="text-xs font-bold text-white">{device.data}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/5 col-span-2">
                                        <Globe className="h-4 w-4 text-white/30" />
                                        <div className="flex flex-col">
                                            <span className="text-[9px] uppercase tracking-wider text-white/30 font-semibold">Location & Activity</span>
                                            <span className="text-xs font-medium text-white/80">{device.location} · Last seen: {device.lastActive}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-auto">
                                    {device.status === "online" && (
                                        <button 
                                            onClick={() => handleDisconnect(device.id)}
                                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 text-orange-400 font-bold text-xs transition-colors"
                                        >
                                            <PowerOff className="h-4 w-4" />
                                            Disconnect
                                        </button>
                                    )}
                                    <button className="flex items-center justify-center p-3 rounded-xl bg-white/5 hover:bg-red-500/10 border border-white/5 hover:border-red-500/20 text-white/40 hover:text-red-400 transition-colors">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

            </div>
        </div>
    );
}
