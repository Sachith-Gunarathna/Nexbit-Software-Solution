"use client";

import React from "react";

export const AnalyticsSkeleton = () => {
    return (
        <div className="flex flex-col gap-6 p-4 md:p-6 max-w-7xl mx-auto w-full animate-pulse">
            {/* Header Skeleton */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-2">
                    <div className="h-7 w-48 bg-white/15 rounded-lg" />
                    <div className="h-4 w-72 bg-white/5 rounded-full" />
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-9 w-28 bg-white/5 rounded-xl border border-white/5" />
                    <div className="h-9 w-9 bg-white/5 rounded-xl border border-white/5" />
                </div>
            </div>

            {/* Summary Cards Skeleton */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="rounded-2xl border border-white/5 bg-[#0d1121] p-4 space-y-3"
                    >
                        <div className="flex items-center justify-between">
                            <div className="h-8 w-8 rounded-lg bg-white/10" />
                            <div className="h-4 w-12 rounded-full bg-white/5" />
                        </div>
                        <div className="space-y-1">
                            <div className="h-6 w-20 bg-white/15 rounded" />
                            <div className="h-3 w-24 bg-white/5 rounded" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Bandwidth Chart Skeleton */}
            <div className="rounded-2xl border border-white/5 bg-[#0d1121] p-5 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                        <div className="h-4 w-44 bg-white/10 rounded" />
                        <div className="h-3 w-32 bg-white/5 rounded" />
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-3">
                            <div className="h-3 w-16 bg-white/5 rounded-full" />
                            <div className="h-3 w-16 bg-white/5 rounded-full" />
                        </div>
                        <div className="h-8 w-44 bg-white/5 rounded-lg border border-white/5" />
                    </div>
                </div>

                {/* Shimmer Chart Silhouette */}
                <div className="relative h-44 w-full rounded-xl bg-white/2 border border-white/5 overflow-hidden flex flex-col justify-between p-4">
                    <div className="space-y-6">
                        <div className="h-[1px] w-full bg-white/5" />
                        <div className="h-[1px] w-full bg-white/5" />
                        <div className="h-[1px] w-full bg-white/5" />
                        <div className="h-[1px] w-full bg-white/5" />
                    </div>
                    <div className="flex items-end justify-between gap-2 h-24 pt-4">
                        {[...Array(12)].map((_, i) => (
                            <div
                                key={i}
                                className="flex-1 bg-gradient-to-t from-white/10 to-transparent rounded-t-sm"
                                style={{
                                    height: `${30 + ((i * 17) % 65)}%`,
                                }}
                            />
                        ))}
                    </div>
                    <div className="flex justify-between pt-2">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-2 w-8 bg-white/5 rounded" />
                        ))}
                    </div>
                </div>
            </div>

            {/* History Table Skeleton */}
            <div className="rounded-2xl border border-white/5 bg-[#0d1121] overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-white/5">
                    <div className="h-4 w-36 bg-white/10 rounded" />
                    <div className="h-8 w-52 bg-white/5 rounded-lg border border-white/5" />
                </div>
                <div className="p-4 space-y-3">
                    <div className="grid grid-cols-7 gap-2 pb-2 border-b border-white/5">
                        {[...Array(7)].map((_, i) => (
                            <div key={i} className="h-3 w-14 bg-white/5 rounded" />
                        ))}
                    </div>
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="grid grid-cols-7 gap-2 py-2 border-b border-white/5 last:border-0 items-center"
                        >
                            <div className="h-4 w-24 bg-white/10 rounded" />
                            <div className="h-4 w-20 bg-white/5 rounded" />
                            <div className="h-4 w-16 bg-white/5 rounded" />
                            <div className="h-4 w-12 bg-white/5 rounded" />
                            <div className="h-4 w-14 bg-blue-500/10 rounded" />
                            <div className="h-4 w-14 bg-purple-500/10 rounded" />
                            <div className="h-5 w-16 bg-emerald-500/10 rounded-full" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AnalyticsSkeleton;
