"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
    OverviewData,
    AnalyticsData,
    SubscriptionPlan,
    ActivitySession,
} from "@/types/dashboard";
import { toast } from "sonner";


export const initialOverviewData: OverviewData = {
    connection: {
        status: "connected",
        server: {
            name: "Singapore Central Node 01",
            country: "Singapore",
            code: "SG",
            flag: "🇸🇬",
            ip: "103.21.58.12",
            ping: 42,
            protocol: "VLESS + Reality + WS",
        },
        uptime: "4h 28m",
    },
    stats: [
        {
            id: "down_speed",
            label: "Download Speed",
            value: "84.2",
            unit: "Mbps",
            change: "+12%",
            up: true,
            data: [30, 55, 42, 70, 65, 80, 84],
            color: "#3b82f6",
        },
        {
            id: "up_speed",
            label: "Upload Speed",
            value: "24.6",
            unit: "Mbps",
            change: "+5%",
            up: true,
            data: [18, 20, 22, 19, 24, 23, 25],
            color: "#a855f7",
        },
        {
            id: "active_sessions",
            label: "Active Sessions",
            value: "2",
            unit: "Devices",
            change: "Normal",
            up: true,
            data: [1, 1, 2, 2, 1, 2, 2],
            color: "#10b981",
        },
        {
            id: "latency",
            label: "Avg Latency",
            value: "42",
            unit: "ms",
            change: "-8ms",
            up: true,
            data: [60, 55, 52, 48, 45, 44, 42],
            color: "#f59e0b",
        },
    ],
    bandwidth: {
        used: 45,
        total: 100,
        unit: "GB",
        downloadGB: 32,
        uploadGB: 13,
        remainingGB: 55,
        percentage: 45,
        resetDate: "Nov 01, 2026",
    },
    subscription: {
        planId: "tiktok",
        planName: "TikTok Unlimited Bypass",
        status: "expiring_soon",
        daysRemaining: 12,
        expiresAt: "Oct 11, 2026",
        price: 4.99,
        billingCycle: "monthly",
        vlessLink:
            "vless://a1b2c3d4-e5f6-7890-abcd-ef1234567890@nextuary.vpn:443?encryption=none&security=tls&sni=nextuary.vpn&type=ws&path=%2Fvless#Nextuary-SG",
        devicesAllowed: 3,
        devicesUsed: 2,
    },
    recentActivity: [
        {
            id: "act-1",
            server: "Singapore",
            flag: "🇸🇬",
            ip: "103.21.58.12",
            device: "Android",
            duration: "2h 14m",
            bytes: "2.1 GB",
            down: "1.8 GB",
            up: "0.3 GB",
            status: "active",
            timestamp: "Just now",
        },
        {
            id: "act-2",
            server: "USA – New York",
            flag: "🇺🇸",
            ip: "198.41.128.99",
            device: "Windows",
            duration: "0h 45m",
            bytes: "512 MB",
            down: "480 MB",
            up: "32 MB",
            status: "closed",
            timestamp: "3h ago",
        },
        {
            id: "act-3",
            server: "Germany – Frankfurt",
            flag: "🇩🇪",
            ip: "46.101.47.33",
            device: "Windows",
            duration: "5h 02m",
            bytes: "4.8 GB",
            down: "4.2 GB",
            up: "0.6 GB",
            status: "closed",
            timestamp: "Yesterday",
        },
        {
            id: "act-4",
            server: "Japan – Tokyo",
            flag: "🇯🇵",
            ip: "140.82.121.4",
            device: "iOS",
            duration: "1h 30m",
            bytes: "1.3 GB",
            down: "1.1 GB",
            up: "0.2 GB",
            status: "closed",
            timestamp: "2d ago",
        },
    ],
};


export const initialAnalyticsData: AnalyticsData = {
    summary: {
        totalDownload: "32.4 GB",
        totalUpload: "8.6 GB",
        avgSpeed: "84 Mbps",
        totalSessions: 47,
        peakSpeed: "112 Mbps",
        downloadChange: "+12%",
        uploadChange: "+5%",
    },
    views: {
        daily: {
            labels: [
                "00h", "02h", "04h", "06h", "08h", "10h", "12h", "14h", "16h", "18h", "20h", "22h"
            ],
            download: [15, 12, 10, 24, 45, 55, 62, 50, 48, 70, 84, 65],
            upload: [5, 4, 3, 8, 16, 20, 24, 18, 19, 28, 34, 22],
        },
        weekly: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            download: [320, 480, 290, 540, 410, 620, 350],
            upload: [120, 180, 110, 200, 155, 240, 130],
        },
        monthly: {
            labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
            download: [1840, 2450, 2100, 2890],
            upload: [620, 890, 710, 940],
        },
    },
    sessionHistory: [
        {
            id: "sess-1",
            server: "🇸🇬 Singapore",
            flag: "🇸🇬",
            ip: "103.21.58.12",
            device: "Android",
            duration: "2h 14m",
            bytes: "2.1 GB",
            down: "1.8 GB",
            up: "0.3 GB",
            status: "active",
            timestamp: "Today, 11:20 AM",
        },
        {
            id: "sess-2",
            server: "🇺🇸 USA – NY",
            flag: "🇺🇸",
            ip: "198.41.128.99",
            device: "Windows PC",
            duration: "0h 45m",
            bytes: "512 MB",
            down: "480 MB",
            up: "32 MB",
            status: "closed",
            timestamp: "Today, 08:15 AM",
        },
        {
            id: "sess-3",
            server: "🇩🇪 Germany",
            flag: "🇩🇪",
            ip: "46.101.47.33",
            device: "Windows PC",
            duration: "5h 02m",
            bytes: "4.8 GB",
            down: "4.2 GB",
            up: "0.6 GB",
            status: "closed",
            timestamp: "Yesterday, 06:40 PM",
        },
        {
            id: "sess-4",
            server: "🇯🇵 Japan",
            flag: "🇯🇵",
            ip: "140.82.121.4",
            device: "iPhone 15",
            duration: "1h 30m",
            bytes: "1.3 GB",
            down: "1.1 GB",
            up: "0.2 GB",
            status: "closed",
            timestamp: "Sep 27, 2026",
        },
        {
            id: "sess-5",
            server: "🇸🇬 Singapore",
            flag: "🇸🇬",
            ip: "103.21.58.14",
            device: "Android Tablet",
            duration: "3h 00m",
            bytes: "2.8 GB",
            down: "2.4 GB",
            up: "0.4 GB",
            status: "closed",
            timestamp: "Sep 26, 2026",
        },
    ],
};


export const initialPlansData: SubscriptionPlan[] = [
    {
        id: "tiktok",
        name: "TikTok Bypass",
        badge: "Current Plan",
        badgeColor: "blue",
        description: "Optimized for social media & streaming bypass",
        iconColor: "#3b82f6",
        monthlyPrice: 4.99,
        yearlyPrice: 3.49,
        bandwidth: "30 GB/month",
        devices: 3,
        servers: "5 Locations",
        features: [
            "TikTok & Instagram unblock",
            "HD video streaming",
            "5 server locations",
            "3 devices max",
            "Basic support",
            "Standard latency route",
        ],
        active: true,
    },
    {
        id: "gaming",
        name: "Gaming Pro",
        badge: "Popular",
        badgeColor: "purple",
        description: "Low latency optimized for competitive online gaming",
        iconColor: "#a855f7",
        monthlyPrice: 8.99,
        yearlyPrice: 6.49,
        bandwidth: "100 GB/month",
        devices: 5,
        servers: "20 Locations",
        features: [
            "Ultra-low latency nodes (<50ms)",
            "Game traffic prioritization",
            "20 server locations",
            "5 devices max",
            "Priority support",
            "DDoS protection",
            "Custom gaming DNS",
        ],
        popular: true,
        active: false,
    },
    {
        id: "full",
        name: "Full Access Ultimate",
        badge: "Best Value",
        badgeColor: "amber",
        description: "Unlimited bandwidth with all global features unlocked",
        iconColor: "#f59e0b",
        monthlyPrice: 14.99,
        yearlyPrice: 9.99,
        bandwidth: "Unlimited",
        devices: 10,
        servers: "50+ Locations",
        features: [
            "Unlimited bandwidth",
            "All streaming platforms unlocked",
            "50+ server locations globally",
            "10 devices max",
            "24/7 dedicated VIP live support",
            "Custom DNS & split tunneling",
            "Dedicated static IP option",
        ],
        active: false,
    },
];


export function useOverviewData(simulateDelay = 800) {
    const [data, setData] = useState<OverviewData>(initialOverviewData);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    
    useEffect(() => {
        let mounted = true;
        const timer = setTimeout(() => {
            if (mounted) {
                setData(initialOverviewData);
                setIsLoading(false);
            }
        }, simulateDelay);

        return () => {
            mounted = false;
            clearTimeout(timer);
        };
    }, [simulateDelay]);

    
    const refetch = useCallback(async () => {
        setIsRefreshing(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 750));
            
            setData((prev) => {
                const randomSpeed = (80 + Math.random() * 15).toFixed(1);
                const randomPing = Math.floor(38 + Math.random() * 8);
                return {
                    ...prev,
                    connection: {
                        ...prev.connection,
                        server: {
                            ...prev.connection.server,
                            ping: randomPing,
                        },
                    },
                    stats: prev.stats.map((s) => {
                        if (s.id === "down_speed") {
                            return { ...s, value: randomSpeed };
                        }
                        if (s.id === "latency") {
                            return { ...s, value: randomPing.toString() };
                        }
                        return s;
                    }),
                };
            });
            toast.success("Dashboard metrics synchronized");
        } catch (err) {
            setError("Failed to refresh metrics");
            toast.error("Failed to refresh dashboard");
        } finally {
            setIsRefreshing(false);
        }
    }, []);

    
    const regenerateToken = useCallback(async () => {
        const randomUUID = crypto.randomUUID?.() || Math.random().toString(36).substring(2, 15);
        const newLink = `vless://${randomUUID}@nextuary.vpn:443?encryption=none&security=tls&sni=nextuary.vpn&type=ws&path=%2Fvless#Nextuary-SG`;
        
        setData((prev) => ({
            ...prev,
            subscription: {
                ...prev.subscription,
                vlessLink: newLink,
            },
        }));

        toast.success("New subscription access token generated!");
        return newLink;
    }, []);

    
    const toggleConnection = useCallback(async () => {
        setData((prev) => {
            const nextStatus =
                prev.connection.status === "connected" ? "disconnected" : "connected";
            toast.info(
                nextStatus === "connected" ? "VPN connected" : "VPN disconnected"
            );
            return {
                ...prev,
                connection: {
                    ...prev.connection,
                    status: nextStatus,
                },
            };
        });
    }, []);

    return {
        data,
        isLoading,
        isRefreshing,
        error,
        refetch,
        regenerateToken,
        toggleConnection,
    };
}


export function useAnalyticsData(simulateDelay = 800) {
    const [data, setData] = useState<AnalyticsData>(initialAnalyticsData);
    const [view, setView] = useState<"daily" | "weekly" | "monthly">("daily");
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        let mounted = true;
        const timer = setTimeout(() => {
            if (mounted) {
                setData(initialAnalyticsData);
                setIsLoading(false);
            }
        }, simulateDelay);

        return () => {
            mounted = false;
            clearTimeout(timer);
        };
    }, [simulateDelay]);

    const refetch = useCallback(async () => {
        setIsRefreshing(true);
        await new Promise((r) => setTimeout(r, 600));
        setIsRefreshing(false);
        toast.success("Analytics data updated");
    }, []);

    
    const filteredHistory = useMemo(() => {
        if (!search.trim()) return data.sessionHistory;
        const q = search.toLowerCase();
        return data.sessionHistory.filter(
            (s) =>
                s.server.toLowerCase().includes(q) ||
                s.ip.toLowerCase().includes(q) ||
                s.device.toLowerCase().includes(q)
        );
    }, [data.sessionHistory, search]);

    return {
        data,
        view,
        setView,
        search,
        setSearch,
        isLoading,
        isRefreshing,
        refetch,
        filteredHistory,
    };
}


export function useSubscriptions() {
    const [plans, setPlans] = useState<SubscriptionPlan[]>(initialPlansData);
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
    const [activePlanId, setActivePlanId] = useState<string>("tiktok");

    const activePlan = useMemo(() => {
        return plans.find((p) => p.id === activePlanId) || plans[0];
    }, [plans, activePlanId]);

    const upgradePlan = useCallback(
        async (newPlanId: string, cycle: "monthly" | "yearly") => {
            setPlans((prev) =>
                prev.map((p) => ({
                    ...p,
                    active: p.id === newPlanId,
                    badge: p.id === newPlanId ? "Current Plan" : p.popular ? "Popular" : p.badge,
                }))
            );
            setActivePlanId(newPlanId);
            setBillingCycle(cycle);
        },
        []
    );

    return {
        plans,
        activePlan,
        billingCycle,
        setBillingCycle,
        upgradePlan,
    };
}
