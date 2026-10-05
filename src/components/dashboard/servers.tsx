"use client";

import React, { useState } from "react";
import { Search, RefreshCw, Star, Zap, Check, Filter } from "lucide-react";
import { ServerNode } from "@/types/dashboard";
import { toast } from "sonner";

const initialServers: ServerNode[] = [
    { id: "sg-1", country: "Singapore", code: "SG", flag: "🇸🇬", ip: "103.21.58.12", ping: 42, load: 35, premium: false, online: true, protocol: "VLESS" },
    { id: "us-1", country: "USA – New York", code: "US", flag: "🇺🇸", ip: "198.41.128.99", ping: 185, load: 72, premium: false, online: true, protocol: "VLESS" },
    { id: "de-1", country: "Germany – Frankfurt", code: "DE", flag: "🇩🇪", ip: "46.101.47.33", ping: 145, load: 58, premium: false, online: true, protocol: "Reality" },
    { id: "jp-1", country: "Japan – Tokyo", code: "JP", flag: "🇯🇵", ip: "140.82.121.4", ping: 68, load: 45, premium: true, online: true, protocol: "VLESS" },
    { id: "uk-1", country: "UK – London", code: "GB", flag: "🇬🇧", ip: "185.199.108.5", ping: 160, load: 63, premium: false, online: true, protocol: "Reality" },
    { id: "au-1", country: "Australia – Sydney", code: "AU", flag: "🇦🇺", ip: "1.1.1.1", ping: 220, load: 40, premium: true, online: true, protocol: "VLESS" },
    { id: "fr-1", country: "France – Paris", code: "FR", flag: "🇫🇷", ip: "104.21.31.27", ping: 155, load: 51, premium: false, online: true, protocol: "Reality" },
    { id: "nl-1", country: "Netherlands – Amsterdam", code: "NL", flag: "🇳🇱", ip: "188.114.96.0", ping: 148, load: 38, premium: false, online: true, protocol: "VLESS" },
    { id: "ca-1", country: "Canada – Toronto", code: "CA", flag: "🇨🇦", ip: "162.159.192.1", ping: 195, load: 29, premium: false, online: false, protocol: "VLESS" },
    { id: "in-1", country: "India – Mumbai", code: "IN", flag: "🇮🇳", ip: "103.25.24.1", ping: 28, load: 82, premium: false, online: true, protocol: "Reality" },
    { id: "kr-1", country: "South Korea – Seoul", code: "KR", flag: "🇰🇷", ip: "121.78.100.1", ping: 78, load: 44, premium: true, online: true, protocol: "VLESS" },
    { id: "br-1", country: "Brazil – São Paulo", code: "BR", flag: "🇧🇷", ip: "177.11.40.1", ping: 240, load: 31, premium: false, online: false, protocol: "VLESS" },
];

const getPingColor = (ping: number) => {
    if (ping < 80) return { text: "text-emerald-400", bg: "bg-emerald-400", glow: "shadow-emerald-400" };
    if (ping < 150) return { text: "text-amber-400", bg: "bg-amber-400", glow: "shadow-amber-400" };
    return { text: "text-rose-400", bg: "bg-rose-400", glow: "shadow-rose-400" };
};

const getLoadColor = (load: number) => {
    if (load < 50) return "bg-emerald-500";
    if (load < 75) return "bg-amber-500";
    return "bg-rose-500";
};

const ServersPage = () => {
    
    const [serverList, setServerList] = useState<ServerNode[]>(initialServers);
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState("Singapore");
    const [pinging, setPinging] = useState(false);
    const [filterTier, setFilterTier] = useState<"all" | "standard" | "premium">("all");

    const filtered = serverList.filter((s) => {
        const matchesSearch =
            s.country.toLowerCase().includes(search.toLowerCase()) ||
            s.code.toLowerCase().includes(search.toLowerCase());
        const matchesTier =
            filterTier === "all" ||
            (filterTier === "premium" ? s.premium : !s.premium);
        return matchesSearch && matchesTier;
    });

    const handleRefreshPing = () => {
        setPinging(true);
        setTimeout(() => {
            setServerList((prev) =>
                prev.map((s) => {
                    if (!s.online) return s;
                    const delta = Math.floor(Math.random() * 9) - 4;
                    const newPing = Math.max(15, s.ping + delta);
                    return { ...s, ping: newPing };
                })
            );
            setPinging(false);
            toast.success("Server node latencies updated");
        }, 1200);
    };

    const handleSelectServer = (server: ServerNode) => {
        if (!server.online) return;
        setSelected(server.country);
        toast.info(`Routed connection to ${server.country}`, {
            description: `IP: ${server.ip} · Protocol: ${server.protocol}`,
        });
    };

    return (
        <div className="flex flex-col gap-6 p-4 md:p-6 max-w-7xl mx-auto w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Server Locations</h2>
                    <p className="text-sm text-white/40">
                        {serverList.filter((s) => s.online).length} of {serverList.length} global nodes online
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    
                    <div className="relative flex-1 sm:w-56">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search location or code..."
                            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/5 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-blue-500/30 transition-all"
                        />
                    </div>

                    
                    <div className="flex rounded-xl bg-white/5 border border-white/5 p-0.5">
                        {(["all", "premium"] as const).map((t) => (
                            <button
                                key={t}
                                onClick={() => setFilterTier(t)}
                                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                                    filterTier === t
                                        ? "bg-blue-600 text-white"
                                        : "text-white/40 hover:text-white"
                                }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleRefreshPing}
                        disabled={pinging}
                        title="Re-ping all nodes"
                        className="h-9 w-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:text-white/80 hover:border-white/10 transition-all disabled:opacity-50"
                    >
                        <RefreshCw className={`h-4 w-4 ${pinging ? "animate-spin text-blue-400" : ""}`} />
                    </button>
                </div>
            </div>

            
            <div className="flex flex-wrap gap-4 text-xs text-white/30">
                <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Low (&lt;80ms)
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-amber-400" />
                    Medium (80–150ms)
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-rose-400" />
                    High (&gt;150ms)
                </div>
                <div className="flex items-center gap-1.5">
                    <Star className="h-3 w-3 text-amber-400" />
                    Premium VIP Node
                </div>
            </div>

            
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {filtered.map((server) => {
                    const pc = getPingColor(server.ping);
                    const isSelected = selected === server.country;
                    return (
                        <button
                            key={server.id}
                            onClick={() => handleSelectServer(server)}
                            disabled={!server.online}
                            className={`group relative rounded-2xl border p-4 text-left transition-all duration-200 ${
                                isSelected
                                    ? "border-blue-500/50 bg-blue-500/10 shadow-lg shadow-blue-500/10"
                                    : server.online
                                    ? "border-white/5 bg-[#0d1121] hover:border-white/15 hover:bg-white/3"
                                    : "border-white/3 bg-[#0a0d18] opacity-50 cursor-not-allowed"
                            }`}
                        >
                            {server.premium && (
                                <span className="absolute top-3 right-3 flex items-center gap-0.5 text-[9px] text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-full px-1.5 py-0.5">
                                    <Star className="h-2.5 w-2.5 fill-current" />
                                    VIP
                                </span>
                            )}

                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-2xl">{server.flag}</span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-white truncate">{server.country}</p>
                                    <code className="text-[10px] text-white/30 font-mono">{server.ip}</code>
                                </div>
                                {!server.online ? (
                                    <span className="text-[10px] text-white/30 bg-white/5 rounded-full px-2 py-0.5">
                                        Offline
                                    </span>
                                ) : (
                                    <div className={`flex items-center gap-1 ${pc.text}`}>
                                        <span className={`h-1.5 w-1.5 rounded-full ${pc.bg} shadow-sm ${pc.glow}`} />
                                        <span className="text-xs font-semibold font-mono">{server.ping}ms</span>
                                    </div>
                                )}
                            </div>

                            
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-[9px] text-white/30 uppercase tracking-wider">
                                        Node Load
                                    </span>
                                    <span className="text-[9px] text-white/40">{server.load}%</span>
                                </div>
                                <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${getLoadColor(server.load)} transition-all`}
                                        style={{ width: `${server.load}%` }}
                                    />
                                </div>
                            </div>

                            {isSelected && server.online && (
                                <div className="mt-3 flex items-center gap-1.5 text-[11px] text-blue-400 font-medium">
                                    <Zap className="h-3 w-3 fill-current" />
                                    Currently Connected Server
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default ServersPage;
