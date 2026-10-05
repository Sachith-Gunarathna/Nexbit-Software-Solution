"use client";

import React, { useState } from "react";
import { User, Lock, Key, Shield, Trash2, Camera, LogOut, CheckCircle2, Copy, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useClerk } from "@clerk/nextjs";

export default function SettingsPage() {
    const { signOut } = useClerk();
    const [activeTab, setActiveTab] = useState<"profile" | "security">("profile");

    
    const [showPassword, setShowPassword] = useState(false);
    const [copied, setCopied] = useState(false);
    const vpnUUID = "a2b9f34-1290-4c3d-b450-482930f30c3";

    const handleCopy = () => {
        navigator.clipboard.writeText(vpnUUID);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative flex flex-col w-full min-h-screen bg-[#06080d] overflow-hidden p-4 md:p-8">
            
            
            <div className="absolute top-0 inset-x-0 h-[500px] pointer-events-none opacity-40 mix-blend-screen transition-colors duration-1000">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col">
                
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
                            Account <span className="text-purple-400">Settings</span>
                        </h1>
                        <p className="text-white/40 text-sm">
                            Manage your personal information, security preferences, and VPN credentials.
                        </p>
                    </div>

                    <button 
                        onClick={() => signOut()}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 text-white/60 hover:text-red-400 font-semibold text-sm transition-all shadow-lg backdrop-blur-md self-start md:self-auto"
                    >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </button>
                </motion.div>

                
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0a0d14]/80 backdrop-blur-xl p-8 shadow-2xl flex flex-col md:flex-row items-center gap-8 mb-8"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-transparent pointer-events-none" />
                    
                    <div className="relative z-10">
                        <div className="p-1.5 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                            <div className="relative h-24 w-24 rounded-full bg-[#0a0d14] flex items-center justify-center overflow-hidden group cursor-pointer border-4 border-[#0a0d14]">
                                <User className="h-10 w-10 text-white/20" />
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Camera className="h-6 w-6 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 text-center md:text-left flex-1">
                        <h2 className="text-2xl font-bold text-white mb-1">Sachith Gunarathna</h2>
                        <p className="text-white/40 font-medium mb-4">hello@nexbit.io</p>
                        <div className="flex items-center justify-center md:justify-start gap-3">
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                                <Shield className="h-3 w-3" /> Premium Member
                            </div>
                        </div>
                    </div>
                </motion.div>

                
                <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md mb-8 w-max">
                    <button
                        onClick={() => setActiveTab("profile")}
                        className={`relative px-6 py-2.5 rounded-xl text-sm font-bold transition-all z-10 flex items-center gap-2 ${
                            activeTab === "profile" ? "text-white" : "text-white/40 hover:text-white/80"
                        }`}
                    >
                        {activeTab === "profile" && (
                            <motion.div
                                layoutId="settingsTab"
                                className="absolute inset-0 bg-white/10 border border-white/20 rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                            />
                        )}
                        <User className="h-4 w-4 relative z-20" />
                        <span className="relative z-20">Profile Details</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("security")}
                        className={`relative px-6 py-2.5 rounded-xl text-sm font-bold transition-all z-10 flex items-center gap-2 ${
                            activeTab === "security" ? "text-white" : "text-white/40 hover:text-white/80"
                        }`}
                    >
                        {activeTab === "security" && (
                            <motion.div
                                layoutId="settingsTab"
                                className="absolute inset-0 bg-white/10 border border-white/20 rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                            />
                        )}
                        <Lock className="h-4 w-4 relative z-20" />
                        <span className="relative z-20">Security & VPN</span>
                    </button>
                </div>

                
                <div className="relative">
                    <AnimatePresence mode="wait">
                        {activeTab === "profile" && (
                            <motion.div
                                key="profile"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="flex flex-col gap-6"
                            >
                                <div className="rounded-[24px] border border-white/10 bg-[#0a0d14]/80 backdrop-blur-xl p-8 shadow-2xl">
                                    <h3 className="text-lg font-bold text-white mb-6">Personal Information</h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[10px] uppercase tracking-widest font-semibold text-white/40 px-1">First Name</label>
                                            <input 
                                                type="text" 
                                                defaultValue="Sachith"
                                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all shadow-inner font-medium"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[10px] uppercase tracking-widest font-semibold text-white/40 px-1">Last Name</label>
                                            <input 
                                                type="text" 
                                                defaultValue="Gunarathna"
                                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all shadow-inner font-medium"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2 md:col-span-2">
                                            <label className="text-[10px] uppercase tracking-widest font-semibold text-white/40 px-1">Email Address</label>
                                            <input 
                                                type="email" 
                                                defaultValue="hello@nexbit.io"
                                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 focus:outline-none cursor-not-allowed font-medium"
                                                disabled
                                            />
                                            <p className="text-[10px] text-white/30 px-1">Email cannot be changed directly. Contact support if needed.</p>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex justify-end">
                                        <button className="px-6 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-gray-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)] active:scale-95">
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "security" && (
                            <motion.div
                                key="security"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="flex flex-col gap-6"
                            >
                                
                                <div className="rounded-[24px] border border-white/10 bg-[#0a0d14]/80 backdrop-blur-xl p-8 shadow-2xl">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                            <Key className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white">VPN Credentials</h3>
                                            <p className="text-xs text-white/40">Your unique identifier for 3x-ui servers</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] uppercase tracking-widest font-semibold text-white/40 px-1">Client UUID</label>
                                        <div className="relative">
                                            <input 
                                                type={showPassword ? "text" : "password"}
                                                value={vpnUUID}
                                                readOnly
                                                className="w-full px-4 py-3 pr-24 rounded-xl bg-black/40 border border-white/10 text-white font-mono text-sm tracking-widest shadow-inner outline-none"
                                            />
                                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                                <button 
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                                                >
                                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </button>
                                                <button 
                                                    onClick={handleCopy}
                                                    className={`p-1.5 rounded-lg transition-colors ${copied ? "text-emerald-400 bg-emerald-500/10" : "text-white/40 hover:text-white hover:bg-white/10"}`}
                                                >
                                                    {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-[10px] text-amber-400/80 px-1 mt-1 flex items-center gap-1">
                                            <Shield className="h-3 w-3" /> Never share your UUID with anyone else.
                                        </p>
                                    </div>
                                </div>

                                
                                <div className="rounded-[24px] border border-red-500/20 bg-red-500/5 backdrop-blur-xl p-8 shadow-2xl mt-4">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
                                            <Trash2 className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-red-400">Danger Zone</h3>
                                        </div>
                                    </div>
                                    <p className="text-sm text-white/50 mb-6">
                                        Permanently delete your account and all associated data. This action cannot be undone and you will lose access to all active VPN packages immediately.
                                    </p>
                                    <button className="px-6 py-3 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 font-bold text-sm hover:bg-red-500 hover:text-white transition-all shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                                        Delete Account
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
}
