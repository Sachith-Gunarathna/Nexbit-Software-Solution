"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface PosStats {
  totalActive: number;
  totalPending: number;
  totalAll: number;
  editionCounts: { basic: number; premium: number; deluxe: number };
  categories: Record<string, number>;
  last7Days: { date: string; activations: number }[];
  fetchedAt: string;
}

const REFRESH_INTERVAL_MS = 30_000;

function formatRelativeTime(isoString: string): string {
  const diff = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
  if (diff < 5) return "just now";
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

// Custom tooltip for the chart
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0f0f1a]/90 border border-[#3ecf8e]/30 rounded-lg px-3 py-2 text-xs">
        <p className="text-[#3ecf8e] font-semibold">{label}</p>
        <p className="text-white/80 mt-0.5">
          {payload[0].value} activation{payload[0].value !== 1 ? "s" : ""}
        </p>
      </div>
    );
  }
  return null;
};

// Animated counter
function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (value === 0) { setDisplay(0); return; }
    let start = 0;
    const step = Math.ceil(value / 20);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setDisplay(value); clearInterval(timer); }
      else setDisplay(start);
    }, 40);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{display}</span>;
}

export default function PosLiveStatus() {
  const [stats, setStats] = useState<PosStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [tick, setTick] = useState(0);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/pos-stats", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch");
      const data: PosStats = await res.json();
      setStats(data);
      setLastUpdated(data.fetchedAt);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [fetchStats]);

  // Tick for relative time update
  useEffect(() => {
    const timer = setInterval(() => setTick(t => t + 1), 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Section header */}
      <div className="flex flex-col items-center mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3ecf8e] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#3ecf8e]" />
          </span>
          <span className="text-[#3ecf8e] text-xs font-bold uppercase tracking-widest">
            Live System Status
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center">
          POS Systems — Active Right Now
        </h2>
        <p className="text-white/40 text-sm mt-1 text-center">
          Real-time data from Nexcentauri POS activations
        </p>
      </div>

      {/* Main card */}
      <div
        className="relative rounded-2xl overflow-hidden border border-white/10"
        style={{
          background:
            "linear-gradient(135deg, rgba(15,15,30,0.9) 0%, rgba(20,15,40,0.85) 100%)",
          backdropFilter: "blur(20px)",
          boxShadow:
            "0 0 60px rgba(62,207,142,0.08), 0 4px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        {/* Glow orb */}
        <div
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(62,207,142,0.12) 0%, transparent 70%)",
          }}
        />

        <div className="relative p-6 md:p-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <div className="w-8 h-8 border-2 border-[#3ecf8e]/30 border-t-[#3ecf8e] rounded-full animate-spin" />
              <span className="text-white/40 text-sm">Fetching live data…</span>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="text-4xl">⚠️</div>
              <p className="text-white/50 text-sm">Could not load live stats</p>
              <button
                onClick={fetchStats}
                className="text-[#3ecf8e] text-xs border border-[#3ecf8e]/30 rounded-lg px-3 py-1.5 hover:bg-[#3ecf8e]/10 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : stats ? (
            <>
              {/* Top stats row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {/* Total active */}
                <div className="col-span-2 md:col-span-1 flex flex-col items-center justify-center bg-[#3ecf8e]/8 border border-[#3ecf8e]/20 rounded-xl p-4">
                  <div
                    className="text-5xl md:text-6xl font-black"
                    style={{
                      background: "linear-gradient(135deg, #3ecf8e, #2dd4bf)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    <AnimatedNumber value={stats.totalActive} />
                  </div>
                  <div className="text-white/50 text-xs mt-1 uppercase tracking-wider">
                    Active Systems
                  </div>
                </div>

                {/* Basic */}
                <div className="flex flex-col items-center justify-center bg-white/4 border border-white/8 rounded-xl p-4">
                  <div className="text-2xl font-bold text-[#86efac]">
                    <AnimatedNumber value={stats.editionCounts.basic} />
                  </div>
                  <div className="text-white/40 text-xs mt-1">🟢 Basic</div>
                </div>

                {/* Premium */}
                <div className="flex flex-col items-center justify-center bg-white/4 border border-white/8 rounded-xl p-4">
                  <div className="text-2xl font-bold text-[#93c5fd]">
                    <AnimatedNumber value={stats.editionCounts.premium} />
                  </div>
                  <div className="text-white/40 text-xs mt-1">🔵 Premium</div>
                </div>

                {/* Deluxe */}
                <div className="flex flex-col items-center justify-center bg-white/4 border border-white/8 rounded-xl p-4">
                  <div className="text-2xl font-bold text-[#fde68a]">
                    <AnimatedNumber value={stats.editionCounts.deluxe} />
                  </div>
                  <div className="text-white/40 text-xs mt-1">👑 Deluxe</div>
                </div>
              </div>

              {/* Chart */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/70 text-sm font-medium">
                    New Activations — Last 7 Days
                  </span>
                  <span className="text-white/30 text-xs">
                    {stats.last7Days.reduce((s, d) => s + d.activations, 0)} total
                  </span>
                </div>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={stats.last7Days}
                      margin={{ top: 5, right: 5, left: -30, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="posGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3ecf8e" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#3ecf8e" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(255,255,255,0.05)"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="date"
                        tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        allowDecimals={false}
                        tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="activations"
                        stroke="#3ecf8e"
                        strokeWidth={2.5}
                        fill="url(#posGradient)"
                        dot={{ r: 3, fill: "#3ecf8e", strokeWidth: 0 }}
                        activeDot={{ r: 5, fill: "#3ecf8e", strokeWidth: 0 }}
                        animationDuration={1200}
                        animationEasing="ease-out"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Footer row */}
              <div className="flex items-center justify-between pt-4 border-t border-white/8">
                <div className="flex items-center gap-4 text-xs text-white/30">
                  <span>
                    <span className="text-white/50 font-medium">{stats.totalAll}</span> total licenses
                  </span>
                  {stats.totalPending > 0 && (
                    <span className="text-amber-400/60">
                      {stats.totalPending} pending activation
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-white/30">
                  <svg className="w-3 h-3 animate-spin" style={{ animationDuration: "3s" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 11-6.219-8.56" />
                  </svg>
                  <span>
                    Updated{" "}
                    <span className="text-white/50">
                      {lastUpdated ? formatRelativeTime(lastUpdated) : "—"}
                    </span>
                  </span>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
