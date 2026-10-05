"use client";

import React, { useState } from "react";
import { Bell, Search, ChevronDown, Shield, LogOut, User, Settings, Zap } from "lucide-react";
import { useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const DashboardNavbar = () => {
    const { user, signOut } = useClerk();
    const [profileOpen, setProfileOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);

    const notifications = [
        { id: 1, title: "Subscription expires in 12 days", time: "2h ago", type: "warning", read: false },
        { id: 2, title: "New server node: Tokyo, Japan", time: "5h ago", type: "info", read: false },
        { id: 3, title: "Security alert: New device login", time: "1d ago", type: "alert", read: true },
        { id: 4, title: "Your data limit is 80% used", time: "2d ago", type: "warning", read: true },
    ];

    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
        <header className="sticky top-0 z-40 flex items-center h-20 gap-4 border-b border-white/5 bg-[#03040b]/80 backdrop-blur-2xl px-4 lg:px-8">
            {/* Mobile logo */}
            <div className="flex items-center gap-2 md:hidden">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                    <Shield className="h-4 w-4 text-white" />
                </div>
            </div>

            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-lg">
                <div className="relative w-full group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 group-focus-within:text-blue-400 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search for nodes, settings, or devices..."
                        className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/5 text-sm text-white focus:outline-none focus:border-white/10 focus:bg-white/10 transition-all font-medium placeholder:text-white/30 shadow-inner"
                    />
                </div>
            </div>

            <div className="flex items-center gap-3 ml-auto">
                {/* Status pill */}
                <div className="hidden sm:flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Network Online</span>
                </div>

                {/* Notifications */}
                <div className="relative">
                    <button
                        onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
                        className={`relative h-10 w-10 rounded-xl flex items-center justify-center transition-all border ${
                            notifOpen ? "bg-white/10 border-white/20 text-white" : "bg-white/5 border-transparent text-white/40 hover:text-white hover:bg-white/10"
                        }`}
                        aria-label="Notifications"
                    >
                        <Bell className="h-4 w-4" />
                        {unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-blue-500 text-white text-[9px] font-bold flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.6)]">
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    <AnimatePresence>
                        {notifOpen && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 top-14 w-80 rounded-[24px] border border-white/10 bg-[#0a0d14]/90 backdrop-blur-2xl shadow-2xl overflow-hidden"
                            >
                                <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-white/5">
                                    <h3 className="text-sm font-bold text-white">Notifications</h3>
                                    <span className="text-[10px] font-bold text-blue-400 cursor-pointer hover:text-blue-300 uppercase tracking-widest">Mark read</span>
                                </div>
                                <div className="max-h-80 overflow-y-auto divide-y divide-white/5">
                                    {notifications.map((notif) => (
                                        <div key={notif.id} className={`px-5 py-4 hover:bg-white/5 transition-colors cursor-pointer flex gap-3 ${!notif.read ? "bg-blue-500/5" : ""}`}>
                                            <div className={`mt-0.5 h-2 w-2 rounded-full flex-shrink-0 ${notif.type === "warning" ? "bg-amber-400" : notif.type === "alert" ? "bg-rose-400" : "bg-blue-400"} ${!notif.read ? "shadow-[0_0_8px_currentColor]" : "opacity-30"}`} />
                                            <div>
                                                <p className={`text-xs font-semibold ${notif.read ? "text-white/40" : "text-white/90"}`}>{notif.title}</p>
                                                <p className="text-[10px] font-medium text-white/30 mt-1">{notif.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Upgrade quick link */}
                <Link
                    href="/dashboard/subscriptions"
                    className="hidden lg:flex items-center gap-2 rounded-xl bg-white text-black px-4 py-2.5 text-xs font-bold hover:bg-gray-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.2)] active:scale-95"
                >
                    <Zap className="h-3.5 w-3.5" />
                    Upgrade
                </Link>

                {/* Profile */}
                <div className="relative ml-2">
                    <button
                        onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
                        className="flex items-center gap-3 rounded-full pl-1 pr-3 py-1 hover:bg-white/5 border border-transparent hover:border-white/10 transition-all group"
                    >
                        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 p-[2px]">
                            <div className="h-full w-full rounded-full bg-[#0a0d14] flex items-center justify-center text-white text-xs font-bold">
                                {user?.firstName?.[0]?.toUpperCase() || "S"}
                            </div>
                        </div>
                        <div className="hidden lg:block text-left">
                            <p className="text-xs font-bold text-white leading-none mb-1">{user?.firstName || "Sachith"}</p>
                            <p className="text-[9px] font-semibold text-blue-400 uppercase tracking-widest leading-none">Pro Member</p>
                        </div>
                        <ChevronDown className={`hidden lg:block h-3 w-3 text-white/30 transition-transform ${profileOpen ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence>
                        {profileOpen && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 top-14 w-56 rounded-[24px] border border-white/10 bg-[#0a0d14]/90 backdrop-blur-2xl shadow-2xl overflow-hidden"
                            >
                                <div className="px-5 py-4 border-b border-white/5 bg-white/5">
                                    <p className="text-sm font-bold text-white mb-0.5">{user?.firstName || "Sachith"} {user?.lastName || "Gunarathna"}</p>
                                    <p className="text-[10px] font-medium text-white/40 truncate">{user?.emailAddresses?.[0]?.emailAddress || "hello@nexbit.io"}</p>
                                </div>
                                <div className="p-2">
                                    {[
                                        { label: "Account Profile", icon: User, href: "/dashboard/settings" },
                                        { label: "Preferences", icon: Settings, href: "/dashboard/settings" },
                                    ].map((item) => (
                                        <Link key={item.label} href={item.href} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                                            <item.icon className="h-4 w-4" />
                                            {item.label}
                                        </Link>
                                    ))}
                                    <div className="border-t border-white/5 mt-2 pt-2">
                                        <button
                                            onClick={() => signOut()}
                                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-400/70 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
};

export default DashboardNavbar;
