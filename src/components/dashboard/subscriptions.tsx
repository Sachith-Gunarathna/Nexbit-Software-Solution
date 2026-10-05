"use client";

import React, { useState } from "react";
import { Check, Zap, Server, Globe, Shield, ArrowRight, Star, X, AlertTriangle, Clock, ChevronDown, Monitor } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ISP = "SLT" | "Airtel" | "Dialog" | "Hutch" | "Mobitel";

interface VpnPackage {
    id: string;
    isp: ISP;
    name: string;
    server: string;
    validity: string;
    p2p: string;
    features: string[];
    price: number; 
    badge?: string;
    isActive?: boolean;
}

const ISP_THEMES: Record<ISP, { glow: string; text: string; bg: string; mesh: string }> = {
    SLT: { 
        glow: "shadow-cyan-500/20", text: "text-cyan-400", bg: "bg-cyan-500/10",
        mesh: "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/40 via-transparent to-transparent" 
    },
    Airtel: { 
        glow: "shadow-rose-500/20", text: "text-rose-500", bg: "bg-rose-500/10",
        mesh: "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-900/40 via-transparent to-transparent" 
    },
    Dialog: { 
        glow: "shadow-orange-500/20", text: "text-orange-500", bg: "bg-orange-500/10",
        mesh: "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-900/40 via-transparent to-transparent" 
    },
    Hutch: { 
        glow: "shadow-amber-500/20", text: "text-amber-500", bg: "bg-amber-500/10",
        mesh: "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-900/40 via-transparent to-transparent" 
    },
    Mobitel: { 
        glow: "shadow-emerald-500/20", text: "text-emerald-400", bg: "bg-emerald-500/10",
        mesh: "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/40 via-transparent to-transparent" 
    },
};

const ISP_LOGOS: Record<ISP, string> = {
    SLT: "/simProviders/sltFiber.png",
    Airtel: "/simProviders/airtel.png",
    Dialog: "/simProviders/Dialog_Logo.png",
    Hutch: "/simProviders/Hutch.png",
    Mobitel: "/simProviders/sltMobitel.png",
};

const MOCK_PACKAGES: VpnPackage[] = [
    
    {
        id: "slt-1", isp: "SLT", name: "SLT ZOOM", server: "SG SERVER", validity: "1 Month", p2p: "No Torrent",
        features: ["No Speed Limit", "GB limit", "Works with Meet Lite/Max", "Unlimited Device Login"], price: 200, isActive: true
    },
    {
        id: "slt-4", isp: "SLT", name: "SLT ZOOM (LK IP)", server: "LK SERVER", validity: "1 Month", p2p: "No Torrent", badge: "LK IP",
        features: ["Best for live streamers", "GB limit", "Works with Meet Lite/Max", "Unlimited Device Login"], price: 500
    },

    
    {
        id: "air-1", isp: "Airtel", name: "AIRTEL TIKTOK", server: "SG SERVER", validity: "1 Month", p2p: "No Torrent", badge: "Popular",
        features: ["No Speed Limit", "Renewable", "Unlimited Device Login"], price: 200
    },
    {
        id: "air-3", isp: "Airtel", name: "AIRTEL ZOOM 215", server: "SG SERVER", validity: "1 Month", p2p: "No Torrent", badge: "Best Value",
        features: ["No Speed Limit", "Renewable", "Unlimited Device Login"], price: 200
    },

    
    {
        id: "dlg-1", isp: "Dialog", name: "DIALOG SIM VIDEO CONF", server: "SG SERVER", validity: "1 Month", p2p: "No Torrent", badge: "New",
        features: ["No Speed Limit (Test first)", "Sim Package", "Unlimited Device Login"], price: 200
    },
    {
        id: "dlg-2", isp: "Dialog", name: "DIALOG ZOOM (ROUTER)", server: "SG SERVER", validity: "1 Month", p2p: "No Torrent", badge: "Popular",
        features: ["Router Package", "Dialog router - No Speed Limit", "Unlimited Device Login"], price: 200
    },

    
    {
        id: "htc-1", isp: "Hutch", name: "HUTCH ZOOM", server: "SG SERVER", validity: "1 Month", p2p: "No Torrent", badge: "Popular",
        features: ["No Speed Limit", "Renewable", "Unlimited Device Login"], price: 200
    },

    
    {
        id: "mob-1", isp: "Mobitel", name: "MOBITEL ZOOM(Android Only, IP Hunt Needed)", server: "SG SERVER", validity: "1 Month", p2p: "No Torrent", badge: "Popular",
        features: ["No Speed Limit", "GB limit", "Need to IP Hunt", "Unlimited Device Login"], price: 200
    }
];

const DATA_OPTIONS = [
    { label: "100 GB", price: 200 },
    { label: "150 GB", price: 250 },
    { label: "200 GB", price: 300 },
    { label: "250 GB", price: 350 },
    { label: "300 GB", price: 400 },
    { label: "400 GB", price: 500 },
    { label: "500 GB", price: 600 },
    { label: "UNLIMITED GB", price: 800 },
    { label: "Custom GB Amount", price: 0, isCustom: true },
];

export default function SubscriptionsPage() {
    const [activeTab, setActiveTab] = useState<ISP>("Mobitel");
    const isps: ISP[] = ["SLT", "Airtel", "Dialog", "Hutch", "Mobitel"];

    const [selectedPackage, setSelectedPackage] = useState<VpnPackage | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<{ label: string, price: number, isCustom?: boolean } | null>(null);
    const [customGB, setCustomGB] = useState(10);

    const filteredPackages = MOCK_PACKAGES.filter((p) => p.isp === activeTab);
    const theme = ISP_THEMES[activeTab];

    const openModal = (pkg: VpnPackage) => {
        setSelectedPackage(pkg);
        setSelectedData(null); 
        setDropdownOpen(false);
    };

    const closeModal = () => {
        setSelectedPackage(null);
    };

    return (
        <div className="relative flex flex-col items-center w-full min-h-screen bg-[#03040b] overflow-hidden">
            
            
            <div className="absolute top-0 inset-x-0 h-[500px] pointer-events-none opacity-50 mix-blend-screen transition-colors duration-1000">
                <div className={`absolute inset-0 ${theme.mesh}`} />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20 flex flex-col items-center">
                
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <span className={`inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-widest uppercase mb-4 ${theme.text}`}>
                        Premium Network Access
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                        Choose Your <span className={theme.text}>Provider</span>
                    </h1>
                    <p className="text-white/40 text-sm md:text-base max-w-2xl mx-auto">
                        Experience ultra-low latency and unlimited bandwidth tailored for your specific mobile or broadband network.
                    </p>
                </motion.div>

                
                <div className="flex items-center justify-center w-full mb-16">
                    <div className="flex flex-wrap justify-center items-center p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl gap-1">
                        {isps.map((isp) => {
                            const isActive = activeTab === isp;
                            return (
                                <button
                                    key={isp}
                                    onClick={() => setActiveTab(isp)}
                                    className={`relative px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 z-10 ${
                                        isActive ? "text-white" : "text-white/40 hover:text-white/80"
                                    }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTabIndicator"
                                            className="absolute inset-0 bg-white/10 border border-white/20 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-20">{isp}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                
                <motion.div 
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredPackages.map((pkg, index) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                key={pkg.id}
                                className={`relative group rounded-[32px] overflow-hidden ${
                                    pkg.isActive 
                                        ? `bg-[#0a0d14] border border-${theme.text.split('-')[1]}-500/30 ${theme.glow} shadow-2xl`
                                        : "bg-[#0a0d14]/60 border border-white/5 hover:border-white/20 hover:bg-[#0a0d14] shadow-xl backdrop-blur-md"
                                } transition-all duration-500 flex flex-col`}
                            >
                                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                
                                <div className="p-8 pb-0">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 overflow-hidden p-2`}>
                                            <img src={ISP_LOGOS[pkg.isp]} alt={pkg.isp} className="w-full h-full object-contain" />
                                        </div>
                                        <div className="flex flex-col gap-2 items-end">
                                            {pkg.isActive && (
                                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Active</span>
                                                </div>
                                            )}
                                            {pkg.badge && !pkg.isActive && (
                                                <div className="px-3 py-1 rounded-full border backdrop-blur-md bg-white/10 border-white/20 text-white">
                                                    <span className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                                                        <Star className="h-2.5 w-2.5 fill-current" />
                                                        {pkg.badge}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{pkg.name}</h3>
                                    
                                    <div className="space-y-4 mb-8 mt-6">
                                        <div className="flex items-center gap-4 text-white/60">
                                            <Server className="h-5 w-5 text-white/20" />
                                            <span className="text-sm font-medium text-white/90">{pkg.server}</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-white/60">
                                            <Globe className="h-5 w-5 text-white/20" />
                                            <span className="text-sm font-medium text-amber-400">{pkg.p2p}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-8">
                                        {pkg.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-start gap-3">
                                                <div className="mt-0.5 h-4 w-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                                                    <Check className="h-2.5 w-2.5 text-white/70" />
                                                </div>
                                                <span className="text-sm font-medium text-white/60 leading-snug">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                
                                <div className="p-8 pt-6 mt-auto border-t border-white/5 bg-gradient-to-b from-transparent to-black/40">
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1 block">From</span>
                                            <div className="flex items-baseline gap-1.5">
                                                <span className="text-sm font-bold text-white/50">LKR</span>
                                                <span className="text-4xl font-black text-white tracking-tighter">{pkg.price}</span>
                                            </div>
                                        </div>
                                        
                                        <button 
                                            onClick={() => !pkg.isActive && openModal(pkg)}
                                            className={`h-14 px-6 rounded-2xl flex items-center gap-2 font-bold text-sm transition-all active:scale-95 ${
                                            pkg.isActive 
                                                ? "bg-white/5 text-white/40 cursor-default" 
                                                : `bg-white text-black hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.15)]`
                                        }`}>
                                            {pkg.isActive ? "Current" : "Select"}
                                            {!pkg.isActive && <ArrowRight className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            
            <AnimatePresence>
                {selectedPackage && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={closeModal}
                        />
                        
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-md bg-[#111318] border border-white/10 rounded-[24px] shadow-2xl overflow-hidden flex flex-col"
                        >
                            
                            <div className="flex items-center justify-between p-6 border-b border-white/5">
                                <h2 className="text-xl font-bold text-white">Select Package</h2>
                                <button onClick={closeModal} className="text-white/40 hover:text-white transition-colors">
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            
                            <div className="p-6 flex flex-col gap-6">
                                
                                <div className="flex items-start gap-4">
                                    <div className="h-16 w-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 p-2 overflow-hidden shadow-inner">
                                        <img src={ISP_LOGOS[selectedPackage.isp]} alt={selectedPackage.isp} className="w-full h-full object-contain drop-shadow-md" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white leading-tight mb-1">{selectedPackage.name}</h3>
                                        <p className="text-sm font-medium text-white/50">{selectedPackage.isp}</p>
                                    </div>
                                </div>

                                
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-3 text-white/70">
                                        <Server className="h-4 w-4" />
                                        <span className="text-sm font-medium">{selectedPackage.server}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-white/70">
                                        <Clock className="h-4 w-4" />
                                        <span className="text-sm font-medium">{selectedPackage.validity}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-white/70">
                                        <AlertTriangle className="h-4 w-4" />
                                        <span className="text-sm font-bold">{selectedPackage.p2p}</span>
                                    </div>
                                </div>

                                
                                <ul className="pl-5 space-y-2 text-sm text-white/50 list-disc marker:text-white/30 font-medium">
                                    {selectedPackage.features.map((feature, idx) => (
                                        <li key={idx}>{feature}</li>
                                    ))}
                                </ul>

                                
                                <div className="h-px w-full bg-white/5" />

                                
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Data Package</label>
                                    
                                    <div className="relative">
                                        <button 
                                            onClick={() => setDropdownOpen(!dropdownOpen)}
                                            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl border transition-all ${
                                                dropdownOpen ? "bg-white/10 border-white/20 text-white" : "bg-[#0a0c10] border-white/5 text-white/60 hover:border-white/10"
                                            }`}
                                        >
                                            <span className="text-sm font-semibold">
                                                {selectedData ? (selectedData.isCustom ? `Custom: ${customGB} GB` : selectedData.label) : "Choose a GB amount"}
                                            </span>
                                            <ChevronDown className={`h-4 w-4 transition-transform ${dropdownOpen ? "rotate-180 text-white" : "text-white/40"}`} />
                                        </button>

                                        <AnimatePresence>
                                            {dropdownOpen && (
                                                <motion.div 
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="absolute bottom-[calc(100%+8px)] left-0 w-full bg-[#0a0c10] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-20 flex flex-col max-h-60 overflow-y-auto"
                                                >
                                                    {DATA_OPTIONS.map((opt) => (
                                                        <button
                                                            key={opt.label}
                                                            onClick={() => {
                                                                setSelectedData(opt);
                                                                setDropdownOpen(false);
                                                            }}
                                                            className="flex items-center justify-between w-full px-4 py-3 text-sm text-left hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                                                        >
                                                            <span className="font-semibold text-white/80">{opt.label}</span>
                                                            <span className="text-xs font-medium text-white/40 font-mono">
                                                                {opt.isCustom ? "" : `LKR ${opt.price}`}
                                                            </span>
                                                        </button>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    
                                    <AnimatePresence>
                                        {selectedData?.isCustom && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="mt-2 p-5 rounded-xl border border-white/10 bg-white/5 flex flex-col gap-4 overflow-hidden"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs font-bold text-white/70">Adjust Amount</span>
                                                    <div className="px-3 py-1 bg-white/10 rounded-lg text-white font-mono text-xs font-bold border border-white/10 shadow-inner">
                                                        {customGB} GB
                                                    </div>
                                                </div>
                                                <input 
                                                    type="range" 
                                                    min={10} 
                                                    max={50} 
                                                    step={1}
                                                    value={customGB} 
                                                    onChange={(e) => setCustomGB(parseInt(e.target.value))}
                                                    className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-white/30"
                                                    style={{
                                                        background: `linear-gradient(to right, #ffffff ${((customGB - 10) / 40) * 100}%, rgba(255,255,255,0.1) ${((customGB - 10) / 40) * 100}%)`
                                                    }}
                                                />
                                                <style jsx>{`
                                                    input[type=range]::-webkit-slider-thumb {
                                                        -webkit-appearance: none;
                                                        appearance: none;
                                                        width: 16px;
                                                        height: 16px;
                                                        border-radius: 50%;
                                                        background: white;
                                                        cursor: pointer;
                                                        box-shadow: 0 0 10px rgba(255,255,255,0.5);
                                                    }
                                                `}</style>
                                                <div className="flex justify-between text-[9px] text-white/30 font-bold uppercase tracking-wider mt-1">
                                                    <span>10 GB</span>
                                                    <span>50 GB</span>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            
                            <div className="p-6 pt-0 mt-auto">
                                <button 
                                    disabled={!selectedData}
                                    className={`w-full py-4 rounded-xl font-bold text-sm transition-all ${
                                        selectedData 
                                            ? "bg-white text-black hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95" 
                                            : "bg-white/10 text-white/30 cursor-not-allowed"
                                    }`}
                                >
                                    Proceed to Payment {selectedData && `- LKR ${selectedData.isCustom ? customGB * 10 : selectedData.price}`}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
