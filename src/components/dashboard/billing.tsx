"use client";

import React, { useState } from "react";
import { CreditCard, Download, ExternalLink, Calendar, CheckCircle2, ChevronRight, AlertCircle, History, Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function BillingPage() {
    return (
        <div className="relative flex flex-col w-full min-h-screen bg-[#06080d] overflow-hidden p-4 md:p-8">
            
            {/* Ambient Background Glow */}
            <div className="absolute top-0 inset-x-0 h-[600px] pointer-events-none opacity-40 mix-blend-screen transition-colors duration-1000">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col">
                
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6"
                >
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
                            Billing & <span className="text-blue-400">Payments</span>
                        </h1>
                        <p className="text-white/40 text-sm">
                            Manage your active subscriptions, payment methods, and billing history.
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md shadow-xl w-max">
                        <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                            <span className="text-emerald-400 text-lg font-bold">₨</span>
                        </div>
                        <div>
                            <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-0.5">Total Spent</p>
                            <p className="text-xl font-black text-white tracking-tight">LKR 2,500</p>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Column: Current Plan & Payment Method */}
                    <div className="lg:col-span-1 flex flex-col gap-8">
                        
                        {/* Current Active Plan Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#0a0d14]/80 backdrop-blur-xl p-6 shadow-2xl"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/5 pointer-events-none" />
                            
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest">Active Plan</h3>
                                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                        <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">Active</span>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h2 className="text-2xl font-bold text-white mb-1">SLT ZOOM</h2>
                                    <p className="text-xs text-white/40">Premium Dedicated IP</p>
                                </div>

                                <div className="flex items-baseline gap-1 mb-6">
                                    <span className="text-3xl font-black text-white">LKR 500</span>
                                    <span className="text-xs text-white/30">/ month</span>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-white/40">Next Billing Date</span>
                                        <span className="text-white font-semibold">Oct 28, 2026</span>
                                    </div>
                                    <div className="w-full bg-white/5 rounded-full h-1.5">
                                        <div className="bg-blue-500 h-1.5 rounded-full w-[25%] shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                    </div>
                                </div>

                                <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold transition-all">
                                    Manage Subscription
                                </button>
                            </div>
                        </motion.div>

                        {/* Payment Method Card (Glassmorphic Credit Card style) */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#0a0d14]/80 backdrop-blur-xl p-6 shadow-2xl"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/5 pointer-events-none" />
                            
                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest">Payment Method</h3>
                                    <CreditCard className="h-5 w-5 text-white/30" />
                                </div>

                                <div className="p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-md mb-6 relative overflow-hidden group hover:border-white/20 transition-all">
                                    {/* Card Chip Simulation */}
                                    <div className="w-8 h-6 rounded bg-gradient-to-br from-amber-200/40 to-amber-400/20 mb-4 border border-white/10" />
                                    
                                    <div className="flex items-center gap-4 text-lg font-mono text-white/80 mb-2 tracking-widest">
                                        <span>****</span>
                                        <span>****</span>
                                        <span>****</span>
                                        <span className="text-white font-bold">4242</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] text-white/40 uppercase tracking-wider">
                                        <span>Expires 12/28</span>
                                        <span className="font-bold text-white/70 italic">VISA</span>
                                    </div>
                                </div>

                                <button className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold transition-all">
                                    Update Payment Info
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Billing History */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-2 relative overflow-hidden rounded-[24px] border border-white/10 bg-[#0a0d14]/80 backdrop-blur-xl shadow-2xl flex flex-col"
                    >
                        <div className="p-6 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <History className="h-5 w-5 text-white/40" />
                                <h3 className="text-lg font-bold text-white">Billing History</h3>
                            </div>
                            <button className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                                <Download className="h-3.5 w-3.5" /> Download All
                            </button>
                        </div>

                        <div className="flex-1 overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/5 bg-white/5">
                                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/30 font-semibold">Invoice Date</th>
                                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/30 font-semibold">Description</th>
                                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/30 font-semibold">Status</th>
                                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/30 font-semibold">Amount</th>
                                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/30 font-semibold text-right">Invoice</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {[
                                        { id: "INV-2026-09", date: "Sep 28, 2026", desc: "SLT ZOOM (LK IP)", status: "Paid", amount: "LKR 500" },
                                        { id: "INV-2026-08", date: "Aug 28, 2026", desc: "SLT ZOOM (LK IP)", status: "Paid", amount: "LKR 500" },
                                        { id: "INV-2026-07", date: "Jul 28, 2026", desc: "SLT ZOOM (LK IP)", status: "Paid", amount: "LKR 500" },
                                        { id: "INV-2026-06", date: "Jun 28, 2026", desc: "SLT ZOOM (LK IP)", status: "Paid", amount: "LKR 500" },
                                        { id: "INV-2026-05", date: "May 28, 2026", desc: "SLT ZOOM (LK IP)", status: "Paid", amount: "LKR 500" },
                                    ].map((inv, idx) => (
                                        <tr key={inv.id} className="hover:bg-white/5 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                                                        <Calendar className="h-3.5 w-3.5 text-white/50" />
                                                    </div>
                                                    <span className="text-sm font-medium text-white/70">{inv.date}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-semibold text-white/90">{inv.desc}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-max">
                                                    <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                                                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">{inv.status}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-bold text-white">{inv.amount}</span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-colors">
                                                    <Download className="h-4 w-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer Security Badge */}
                        <div className="p-4 border-t border-white/5 bg-black/20 flex items-center justify-center gap-2 text-xs text-white/30">
                            <Shield className="h-3.5 w-3.5" />
                            <span>Payments are secure and encrypted via Stripe</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
