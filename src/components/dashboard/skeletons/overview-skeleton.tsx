"use client";

import React from "react";

export const OverviewSkeleton = () => {
    return (
        <div className="flex flex-col gap-6 p-4 md:p-6 max-w-7xl mx-auto w-full animate-pulse">
            {/* Welcome Banner Skeleton */}
            <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#0d1121] p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-2">
                        <div className="h-3 w-28 bg-white/10 rounded-full" />
                        <div className="h-7 w-64 bg-white/15 rounded-lg" />
                        <div className="h-3.5 w-80 max-w-full bg-white/5 rounded-full" />
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <div className="h-10 w-32 bg-white/10 rounded-xl" />
                        <div className="h-10 w-36 bg-white/10 rounded-xl" />
                    </div>
                </div>
            </div>

            {/* Stats Row Skeleton */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="rounded-2xl border border-white/5 bg-[#0d1121] p-4 space-y-3"
                    >
                        <div className="flex items-start justify-between">
                            <div className="h-8 w-8 rounded-lg bg-white/10" />
                            <div className="h-6 w-20 rounded bg-white/5" />
                        </div>
                        <div className="space-y-1.5 pt-1">
                            <div className="h-7 w-24 bg-white/15 rounded-md" />
                            <div className="flex items-center justify-between">
                                <div className="h-3 w-20 bg-white/5 rounded-full" />
                                <div className="h-3 w-10 bg-white/10 rounded-full" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Middle Row (3 columns) Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Data Usage Skeleton */}
                <div className="rounded-2xl border border-white/5 bg-[#0d1121] p-5">
                    <div className="flex items-center justify-between mb-4">
                        <div className="h-4 w-24 bg-white/10 rounded" />
                        <div className="h-3 w-16 bg-white/5 rounded-full" />
                    </div>
                    <div className="flex items-center justify-center gap-6 mb-4">
                        <div className="h-24 w-24 rounded-full border-8 border-white/10 flex items-center justify-center">
                            <div className="h-4 w-8 bg-white/10 rounded" />
                        </div>
                        <div className="space-y-3.5 flex-1 max-w-[140px]">
                            {[...Array(3)].map((_, idx) => (
                                <div key={idx} className="space-y-1.5">
                                    <div className="flex justify-between">
                                        <div className="h-2.5 w-12 bg-white/5 rounded" />
                                        <div className="h-2.5 w-8 bg-white/10 rounded" />
                                    </div>
                                    <div className="h-1.5 w-full rounded-full bg-white/5" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="h-3 w-40 bg-white/5 rounded mx-auto" />
                </div>

                {/* Expiry Countdown Skeleton */}
                <div className="rounded-2xl border border-white/5 bg-[#0d1121] p-5 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-4">
                        <div className="h-4 w-24 bg-white/10 rounded" />
                        <div className="h-4 w-20 bg-white/5 rounded-full" />
                    </div>
                    <div className="flex flex-col items-center justify-center gap-3 my-auto py-2">
                        <div className="h-14 w-14 rounded-2xl bg-white/10" />
                        <div className="h-8 w-16 bg-white/15 rounded" />
                        <div className="h-3 w-28 bg-white/5 rounded-full" />
                        <div className="w-full bg-white/5 rounded-full h-1.5" />
                    </div>
                    <div className="h-10 w-full rounded-xl bg-white/10 mt-4" />
                </div>

                {/* Quick Connect Skeleton */}
                <div className="rounded-2xl border border-white/5 bg-[#0d1121] p-5 flex flex-col gap-3">
                    <div className="flex items-center justify-between mb-1">
                        <div className="h-4 w-28 bg-white/10 rounded" />
                        <div className="h-3 w-16 bg-white/5 rounded-full" />
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-white/20" />
                        <div className="h-3 w-36 bg-white/5 rounded-full" />
                    </div>
                    <div className="h-16 rounded-xl bg-white/5 border border-white/5" />
                    <div className="grid grid-cols-2 gap-2">
                        <div className="h-9 rounded-xl bg-white/5" />
                        <div className="h-9 rounded-xl bg-white/5" />
                    </div>
                    <div className="h-9 rounded-xl bg-white/5" />
                </div>
            </div>

            {/* Recent Activity Table Skeleton */}
            <div className="rounded-2xl border border-white/5 bg-[#0d1121] overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                    <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded bg-white/10" />
                        <div className="h-4 w-32 bg-white/10 rounded" />
                    </div>
                    <div className="h-3 w-16 bg-white/5 rounded" />
                </div>
                <div className="p-4 space-y-3">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                        >
                            <div className="flex items-center gap-3">
                                <div className="h-5 w-6 rounded bg-white/10" />
                                <div className="h-4 w-28 bg-white/10 rounded" />
                            </div>
                            <div className="h-4 w-28 bg-white/5 rounded hidden sm:block" />
                            <div className="h-4 w-16 bg-white/5 rounded hidden md:block" />
                            <div className="h-4 w-14 bg-white/5 rounded hidden md:block" />
                            <div className="h-5 w-16 bg-white/10 rounded-full" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Alert Banner Skeleton */}
            <div className="rounded-2xl border border-white/5 bg-white/3 p-4 flex items-center gap-3">
                <div className="h-5 w-5 rounded-full bg-white/10 flex-shrink-0" />
                <div className="space-y-1.5 flex-1">
                    <div className="h-3.5 w-44 bg-white/10 rounded" />
                    <div className="h-3 w-full max-w-md bg-white/5 rounded" />
                </div>
            </div>
        </div>
    );
};

export default OverviewSkeleton;
