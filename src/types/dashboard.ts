import { LucideIcon } from "lucide-react";

export type ConnectionStatus = "connected" | "connecting" | "disconnected";

export interface ActiveServer {
    name: string;
    country: string;
    code: string;
    flag: string;
    ip: string;
    ping: number;
    protocol: string;
}

export interface MetricStat {
    id: string;
    label: string;
    value: string;
    unit: string;
    change: string;
    up: boolean;
    data: number[];
    color: string;
}

export interface BandwidthUsage {
    used: number;
    total: number;
    unit: string;
    downloadGB: number;
    uploadGB: number;
    remainingGB: number;
    percentage: number;
    resetDate: string;
}

export interface SubscriptionInfo {
    planId: string;
    planName: string;
    status: "active" | "expiring_soon" | "expired";
    daysRemaining: number;
    expiresAt: string;
    price: number;
    billingCycle: "monthly" | "yearly";
    vlessLink: string;
    devicesAllowed: number;
    devicesUsed: number;
}

export interface ActivitySession {
    id: string;
    server: string;
    flag: string;
    ip: string;
    device: string;
    duration: string;
    bytes: string;
    down: string;
    up: string;
    status: "active" | "closed";
    timestamp: string;
}

export interface OverviewData {
    connection: {
        status: ConnectionStatus;
        server: ActiveServer;
        uptime: string;
    };
    stats: MetricStat[];
    bandwidth: BandwidthUsage;
    subscription: SubscriptionInfo;
    recentActivity: ActivitySession[];
}

export interface AnalyticsBandwidthSeries {
    labels: string[];
    download: number[];
    upload: number[];
}

export interface AnalyticsSummary {
    totalDownload: string;
    totalUpload: string;
    avgSpeed: string;
    totalSessions: number;
    peakSpeed: string;
    downloadChange: string;
    uploadChange: string;
}

export interface AnalyticsData {
    summary: AnalyticsSummary;
    views: {
        daily: AnalyticsBandwidthSeries;
        weekly: AnalyticsBandwidthSeries;
        monthly: AnalyticsBandwidthSeries;
    };
    sessionHistory: ActivitySession[];
}

export interface SubscriptionPlan {
    id: string;
    name: string;
    badge: string;
    badgeColor: "blue" | "purple" | "amber" | "emerald";
    description: string;
    iconColor: string;
    monthlyPrice: number;
    yearlyPrice: number;
    bandwidth: string;
    devices: number;
    servers: string;
    features: string[];
    popular?: boolean;
    active?: boolean;
}

export interface ServerNode {
    id: string;
    country: string;
    code: string;
    flag: string;
    ip: string;
    ping: number;
    load: number;
    premium: boolean;
    online: boolean;
    protocol: string;
}

export interface ConnectedDevice {
    id: string;
    name: string;
    type: "Android" | "Windows" | "macOS" | "iOS" | "Linux";
    ip: string;
    lastSeen: string;
    active: boolean;
    location?: string;
}
