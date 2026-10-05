"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    CreditCard,
    Building2,
    QrCode,
    Coins,
    ShieldCheck,
    Lock,
    Check,
    Copy,
    Sparkles,
    Calendar,
    ArrowRight,
    Clock,
    AlertCircle,
    CheckCircle2,
    Wallet,
    Tag,
    RefreshCw,
    Zap,
} from "lucide-react";
import { SubscriptionPlan } from "@/types/dashboard";
import { toast } from "sonner";
import { useClerk } from "@clerk/nextjs";

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    plan: SubscriptionPlan | null;
    billingCycle: "monthly" | "yearly";
    onSuccess: (planId: string, billingCycle: "monthly" | "yearly") => void;
}

type PaymentTab = "card" | "local" | "crypto";
type LocalSubMethod = "bank" | "qr" | "wallet";

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
    isOpen,
    onClose,
    plan,
    billingCycle,
    onSuccess,
}) => {
    const { user } = useClerk();

    
    const [tab, setTab] = useState<PaymentTab>("card");
    const [localMethod, setLocalMethod] = useState<LocalSubMethod>("bank");

    
    const [cardNumber, setCardNumber] = useState("");
    const [cardHolder, setCardHolder] = useState(
        user ? `${user.firstName || ""} ${user.lastName || ""}`.trim() : "Alex Morgan"
    );
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");
    const [saveCard, setSaveCard] = useState(true);

    
    const [bankTxRef, setBankTxRef] = useState("");
    const [copiedItem, setCopiedItem] = useState<string | null>(null);

    
    const [cryptoNetwork, setCryptoNetwork] = useState<"USDT-TRC20" | "USDT-BEP20" | "BTC">("USDT-TRC20");

    
    const [promoCode, setPromoCode] = useState("");
    const [promoApplied, setPromoApplied] = useState(false);
    const [promoDiscount, setPromoDiscount] = useState(0);

    
    const [isProcessing, setIsProcessing] = useState(false);
    const [processStep, setProcessStep] = useState(0);
    const [isSuccess, setIsSuccess] = useState(false);

    
    useEffect(() => {
        if (isOpen) {
            setIsProcessing(false);
            setIsSuccess(false);
            setProcessStep(0);
            setPromoCode("");
            setPromoApplied(false);
            setPromoDiscount(0);
        }
    }, [isOpen, plan]);

    if (!isOpen || !plan) return null;

    
    const basePrice = billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice * 12;
    const discountAmount = promoApplied ? (basePrice * promoDiscount) : 0;
    const finalPrice = Math.max(0, basePrice - discountAmount).toFixed(2);
    const displayRate = billingCycle === "monthly"
        ? `$${plan.monthlyPrice.toFixed(2)}/mo`
        : `$${plan.yearlyPrice.toFixed(2)}/mo ($${(plan.yearlyPrice * 12).toFixed(2)}/yr)`;

    
    const getCardBrand = (num: string) => {
        const clean = num.replace(/\s+/g, "");
        if (clean.startsWith("4")) return "VISA";
        if (/^5[1-5]/.test(clean)) return "MASTERCARD";
        if (/^3[47]/.test(clean)) return "AMEX";
        return "CARD";
    };

    
    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value.replace(/\D/g, "").slice(0, 16);
        const formatted = v.replace(/(.{4})/g, "$1 ").trim();
        setCardNumber(formatted);
    };

    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let v = e.target.value.replace(/\D/g, "").slice(0, 4);
        if (v.length > 2) {
            v = `${v.slice(0, 2)}/${v.slice(2)}`;
        }
        setExpiry(v);
    };

    const handleCopy = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopiedItem(label);
        toast.success(`Copied ${label} to clipboard`);
        setTimeout(() => setCopiedItem(null), 2000);
    };

    const handleApplyPromo = () => {
        const cleaned = promoCode.trim().toUpperCase();
        if (cleaned === "NEXTUARY20" || cleaned === "NEXT20") {
            setPromoDiscount(0.20);
            setPromoApplied(true);
            toast.success("Promo code applied! 20% discount added.");
        } else if (cleaned === "WELCOME10") {
            setPromoDiscount(0.10);
            setPromoApplied(true);
            toast.success("Promo code applied! 10% discount added.");
        } else {
            toast.error("Invalid coupon code. Try 'NEXTUARY20'");
        }
    };

    const handleSubmitPayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        setProcessStep(1);

        
        await new Promise((r) => setTimeout(r, 700));
        setProcessStep(2);

        
        await new Promise((r) => setTimeout(r, 800));
        setProcessStep(3);

        
        await new Promise((r) => setTimeout(r, 700));

        setIsProcessing(false);
        setIsSuccess(true);
        toast.success(`Upgraded to ${plan.name}!`);
    };

    const handleFinishSuccess = () => {
        onSuccess(plan.id, billingCycle);
        onClose();
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
                
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={!isProcessing ? onClose : undefined}
                    className="fixed inset-0 bg-black/80 backdrop-blur-md"
                />

                
                <motion.div
                    initial={{ opacity: 0, scale: 0.94, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: 15 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0a0d1a] shadow-2xl shadow-blue-900/20 overflow-hidden z-10 my-6"
                >
                    
                    <div className="absolute top-0 right-1/4 w-96 h-48 bg-gradient-to-br from-blue-600/15 via-purple-600/10 to-transparent blur-3xl pointer-events-none" />

                    
                    <div className="relative flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/2">
                        <div className="flex items-center gap-2.5">
                            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                                <Zap className="h-4 w-4 text-white" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-white flex items-center gap-2">
                                    Upgrade Subscription
                                    <span className="text-[10px] font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full">
                                        Secure Checkout
                                    </span>
                                </h3>
                                <p className="text-xs text-white/40">
                                    Instant activation on high-speed VLESS nodes
                                </p>
                            </div>
                        </div>

                        {!isProcessing && !isSuccess && (
                            <button
                                onClick={onClose}
                                className="h-8 w-8 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 hover:text-white flex items-center justify-center transition-all border border-white/5"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>

                    
                    {isSuccess ? (
                        <div className="p-8 text-center flex flex-col items-center">
                            <div className="relative mb-5">
                                <div className="h-20 w-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shadow-2xl shadow-emerald-500/20">
                                    <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                                </div>
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="absolute inset-0 rounded-3xl border border-emerald-400/40"
                                />
                            </div>

                            <h2 className="text-2xl font-bold text-white mb-1.5">
                                Payment Successful!
                            </h2>
                            <p className="text-sm text-white/50 max-w-md mb-6">
                                Your account has been upgraded to{" "}
                                <span className="font-semibold text-white">{plan.name}</span>.
                                High-bandwidth nodes and premium servers are now unlocked.
                            </p>

                            
                            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0d1224] p-4 text-left space-y-2.5 mb-6">
                                <div className="flex justify-between text-xs">
                                    <span className="text-white/40">Plan</span>
                                    <span className="text-white font-medium">{plan.name}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-white/40">Billing Cadence</span>
                                    <span className="text-white font-medium capitalize">{billingCycle}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-white/40">Total Paid</span>
                                    <span className="text-emerald-400 font-bold">${finalPrice}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-white/40">Order Ref</span>
                                    <span className="text-white/60 font-mono">NX-{Math.floor(100000 + Math.random() * 900000)}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-white/40">Next Renewal</span>
                                    <span className="text-white/60">
                                        {billingCycle === "monthly" ? "Oct 29, 2026" : "Sep 29, 2027"}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={handleFinishSuccess}
                                className="w-full max-w-md py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                            >
                                Continue to Dashboard
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    ) : (
                        
                        <form onSubmit={handleSubmitPayment} className="p-5 sm:p-6 space-y-6">
                            
                            <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-600/10 via-purple-600/5 to-transparent p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="text-sm font-bold text-white">{plan.name}</h4>
                                        <span className="text-[10px] font-semibold bg-blue-500/20 text-blue-400 rounded-full px-2 py-0.5">
                                            {plan.bandwidth}
                                        </span>
                                        {billingCycle === "yearly" && (
                                            <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 rounded-full px-2 py-0.5">
                                                Save 35%
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-white/40">{plan.description}</p>
                                </div>
                                <div className="text-left sm:text-right">
                                    <div className="text-lg font-bold text-white">
                                        ${finalPrice}
                                    </div>
                                    <div className="text-[11px] text-white/40">
                                        {displayRate}
                                    </div>
                                </div>
                            </div>

                            
                            <div className="space-y-3">
                                <label className="text-xs font-semibold text-white/70 uppercase tracking-wider block">
                                    Select Payment Method
                                </label>
                                <div className="grid grid-cols-3 gap-2.5">
                                    <button
                                        type="button"
                                        onClick={() => setTab("card")}
                                        className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border text-center transition-all ${
                                            tab === "card"
                                                ? "border-blue-500 bg-blue-500/10 text-white shadow-md shadow-blue-500/10"
                                                : "border-white/5 bg-white/2 text-white/40 hover:text-white/70 hover:border-white/10"
                                        }`}
                                    >
                                        <CreditCard className="h-5 w-5 text-blue-400" />
                                        <span className="text-xs font-semibold">Credit Card</span>
                                        <span className="text-[9px] text-white/30 hidden sm:inline">Visa / Master / Amex</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setTab("local")}
                                        className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border text-center transition-all ${
                                            tab === "local"
                                                ? "border-purple-500 bg-purple-500/10 text-white shadow-md shadow-purple-500/10"
                                                : "border-white/5 bg-white/2 text-white/40 hover:text-white/70 hover:border-white/10"
                                        }`}
                                    >
                                        <Building2 className="h-5 w-5 text-purple-400" />
                                        <span className="text-xs font-semibold">Local Methods</span>
                                        <span className="text-[9px] text-white/30 hidden sm:inline">Bank / QR / Wallets</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setTab("crypto")}
                                        className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border text-center transition-all ${
                                            tab === "crypto"
                                                ? "border-amber-500 bg-amber-500/10 text-white shadow-md shadow-amber-500/10"
                                                : "border-white/5 bg-white/2 text-white/40 hover:text-white/70 hover:border-white/10"
                                        }`}
                                    >
                                        <Coins className="h-5 w-5 text-amber-400" />
                                        <span className="text-xs font-semibold">Crypto Pay</span>
                                        <span className="text-[9px] text-white/30 hidden sm:inline">USDT / BTC</span>
                                    </button>
                                </div>
                            </div>

                            
                            {tab === "card" && (
                                <div className="space-y-4">
                                    
                                    <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-[#121a36] via-[#0d1224] to-[#1c1836] p-5 shadow-xl shadow-black/40 overflow-hidden">
                                        <div className="absolute top-0 right-0 w-44 h-44 bg-blue-500/10 rounded-full blur-2xl" />
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="flex items-center gap-2">
                                                
                                                <div className="h-7 w-9 rounded-md bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 shadow-inner flex items-center justify-center">
                                                    <div className="w-5 h-4 border border-black/20 rounded-sm" />
                                                </div>
                                                <span className="text-[10px] text-white/30 font-mono tracking-widest">
                                                    NEXTUARY PRIVACY
                                                </span>
                                            </div>
                                            <span className="text-xs font-black tracking-wider text-white/80">
                                                {getCardBrand(cardNumber)}
                                            </span>
                                        </div>

                                        
                                        <div className="font-mono text-base sm:text-lg tracking-widest text-white font-semibold mb-4">
                                            {cardNumber || "•••• •••• •••• 4242"}
                                        </div>

                                        <div className="flex items-end justify-between text-xs">
                                            <div>
                                                <div className="text-[9px] text-white/30 uppercase">Card Holder</div>
                                                <div className="font-semibold text-white/80 uppercase tracking-wide truncate max-w-[180px]">
                                                    {cardHolder || "Alex Morgan"}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-[9px] text-white/30 uppercase">Expires</div>
                                                <div className="font-mono font-semibold text-white/80">
                                                    {expiry || "MM/YY"}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div className="sm:col-span-2">
                                            <label className="text-xs text-white/60 mb-1 block">Card Number</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={cardNumber}
                                                    onChange={handleCardNumberChange}
                                                    placeholder="4532 8920 1823 4242"
                                                    maxLength={19}
                                                    required
                                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-all font-mono"
                                                />
                                                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-xs text-white/60 mb-1 block">Cardholder Name</label>
                                            <input
                                                type="text"
                                                value={cardHolder}
                                                onChange={(e) => setCardHolder(e.target.value)}
                                                placeholder="Name on card"
                                                required
                                                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-all"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <label className="text-xs text-white/60 mb-1 block">Expiry</label>
                                                <input
                                                    type="text"
                                                    value={expiry}
                                                    onChange={handleExpiryChange}
                                                    placeholder="MM/YY"
                                                    maxLength={5}
                                                    required
                                                    className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-all font-mono text-center"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs text-white/60 mb-1 block">CVC / CVV</label>
                                                <div className="relative">
                                                    <input
                                                        type="password"
                                                        value={cvc}
                                                        onChange={(e) => setCvc(e.target.value.slice(0, 4))}
                                                        placeholder="•••"
                                                        maxLength={4}
                                                        required
                                                        className="w-full pl-3 pr-7 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-all font-mono text-center"
                                                    />
                                                    <Lock className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    
                                    <label className="flex items-center gap-2 cursor-pointer pt-1">
                                        <input
                                            type="checkbox"
                                            checked={saveCard}
                                            onChange={(e) => setSaveCard(e.target.checked)}
                                            className="h-4 w-4 rounded bg-white/5 border-white/20 text-blue-600 focus:ring-0"
                                        />
                                        <span className="text-xs text-white/50">
                                            Save card securely for uninterrupted auto-renewal (cancel anytime)
                                        </span>
                                    </label>
                                </div>
                            )}

                            
                            {tab === "local" && (
                                <div className="space-y-4">
                                    
                                    <div className="flex gap-2 p-1 rounded-xl bg-white/5 border border-white/5">
                                        <button
                                            type="button"
                                            onClick={() => setLocalMethod("bank")}
                                            className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                                localMethod === "bank"
                                                    ? "bg-purple-600 text-white shadow"
                                                    : "text-white/40 hover:text-white"
                                            }`}
                                        >
                                            Direct Bank Transfer
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setLocalMethod("qr")}
                                            className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                                localMethod === "qr"
                                                    ? "bg-purple-600 text-white shadow"
                                                    : "text-white/40 hover:text-white"
                                            }`}
                                        >
                                            Mobile QR & Wallets
                                        </button>
                                    </div>

                                    {localMethod === "bank" && (
                                        <div className="space-y-3 rounded-2xl border border-white/10 bg-[#0d1224] p-4">
                                            <div className="flex items-center justify-between text-xs pb-2 border-b border-white/5">
                                                <span className="text-white/50">Supported Gateways:</span>
                                                <span className="text-white/80 font-medium">
                                                    CEFT · LankaPay · FastPay · PromptPay
                                                </span>
                                            </div>

                                            <div className="space-y-2 text-xs">
                                                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/3 border border-white/5">
                                                    <div>
                                                        <span className="text-[10px] text-white/30 block uppercase">Bank Name</span>
                                                        <span className="text-white font-medium">Commercial Bank of Ceylon / Standard Chartered</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/3 border border-white/5">
                                                    <div>
                                                        <span className="text-[10px] text-white/30 block uppercase">Account Number</span>
                                                        <span className="text-white font-mono font-semibold">8029 4810 5920</span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleCopy("802948105920", "Account Number")}
                                                        className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white flex items-center gap-1 text-[11px]"
                                                    >
                                                        <Copy className="h-3 w-3" />
                                                        {copiedItem === "Account Number" ? "Copied" : "Copy"}
                                                    </button>
                                                </div>

                                                <div className="flex items-center justify-between p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20">
                                                    <div>
                                                        <span className="text-[10px] text-purple-300 block uppercase font-bold">
                                                            Payment Reference (Required in Remark)
                                                        </span>
                                                        <span className="text-purple-300 font-mono font-bold text-sm">
                                                            NX-94821
                                                        </span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleCopy("NX-94821", "Reference Code")}
                                                        className="px-2.5 py-1 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 flex items-center gap-1 text-[11px]"
                                                    >
                                                        <Copy className="h-3 w-3" />
                                                        {copiedItem === "Reference Code" ? "Copied" : "Copy Code"}
                                                    </button>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="text-[11px] text-white/50 mb-1 block">
                                                    Enter Bank Transfer Slip / Reference ID
                                                </label>
                                                <input
                                                    type="text"
                                                    value={bankTxRef}
                                                    onChange={(e) => setBankTxRef(e.target.value)}
                                                    placeholder="e.g. TXN-89240182 or upload receipt"
                                                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 font-mono"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {localMethod === "qr" && (
                                        <div className="flex flex-col sm:flex-row items-center gap-4 rounded-2xl border border-white/10 bg-[#0d1224] p-4">
                                            
                                            <div className="h-36 w-36 bg-white p-2.5 rounded-2xl flex flex-col items-center justify-center flex-shrink-0 shadow-lg">
                                                <QrCode className="h-28 w-28 text-black" />
                                                <span className="text-[8px] text-black/60 font-mono uppercase font-bold">
                                                    Scan & Pay
                                                </span>
                                            </div>
                                            <div className="space-y-2 text-xs">
                                                <div className="flex items-center gap-2">
                                                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                                                    <span className="font-semibold text-white">Instant QR Checkout</span>
                                                </div>
                                                <p className="text-white/40 leading-relaxed">
                                                    Scan this QR with any local banking app (iPay, Genie, FriMi, GrabPay, PromptPay, or GCash).
                                                </p>
                                                <div className="flex items-center gap-2 text-[11px] text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-lg w-fit">
                                                    <Clock className="h-3 w-3" />
                                                    <span>QR valid for 14:48 min</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            
                            {tab === "crypto" && (
                                <div className="space-y-4">
                                    <div className="flex gap-2">
                                        {(["USDT-TRC20", "USDT-BEP20", "BTC"] as const).map((net) => (
                                            <button
                                                key={net}
                                                type="button"
                                                onClick={() => setCryptoNetwork(net)}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                                                    cryptoNetwork === net
                                                        ? "bg-amber-500/20 border-amber-500/50 text-amber-400"
                                                        : "bg-white/5 border-white/5 text-white/40 hover:text-white"
                                                }`}
                                            >
                                                {net}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="rounded-2xl border border-white/10 bg-[#0d1224] p-4 space-y-3">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-white/40">Amount to Send</span>
                                            <span className="text-white font-mono font-bold text-sm">
                                                {finalPrice} USDT
                                            </span>
                                        </div>
                                        <div className="p-3 rounded-xl bg-white/3 border border-white/5 space-y-1">
                                            <span className="text-[10px] text-white/30 uppercase block">
                                                Deposit Address ({cryptoNetwork})
                                            </span>
                                            <div className="flex items-center justify-between gap-2">
                                                <code className="text-xs text-amber-400 font-mono break-all">
                                                    {cryptoNetwork === "BTC"
                                                        ? "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
                                                        : "TJ8a92KLm289pPq10284xN928Lq801bA9c"}
                                                </code>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleCopy(
                                                            cryptoNetwork === "BTC"
                                                                ? "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
                                                                : "TJ8a92KLm289pPq10284xN928Lq801bA9c",
                                                            "Wallet Address"
                                                        )
                                                    }
                                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white flex-shrink-0"
                                                >
                                                    <Copy className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            
                            <div className="pt-1">
                                <div className="flex items-center gap-2">
                                    <div className="relative flex-1">
                                        <input
                                            type="text"
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value)}
                                            placeholder="Promo code (e.g. NEXTUARY20)"
                                            disabled={promoApplied}
                                            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white uppercase placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 font-mono"
                                        />
                                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleApplyPromo}
                                        disabled={promoApplied || !promoCode.trim()}
                                        className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold disabled:opacity-40 transition-all border border-white/5"
                                    >
                                        {promoApplied ? "Applied" : "Apply"}
                                    </button>
                                </div>
                                {promoApplied && (
                                    <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                                        <Check className="h-3 w-3" /> 20% discount code active!
                                    </p>
                                )}
                            </div>

                            
                            <div className="rounded-2xl border border-white/5 bg-white/2 p-4 space-y-2">
                                <div className="flex justify-between text-xs text-white/40">
                                    <span>Plan ({billingCycle})</span>
                                    <span className="text-white/80">${basePrice.toFixed(2)}</span>
                                </div>
                                {promoApplied && (
                                    <div className="flex justify-between text-xs text-emerald-400">
                                        <span>Discount (Promo)</span>
                                        <span>-${discountAmount.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-xs text-white/40">
                                    <span>Taxes / VAT</span>
                                    <span className="text-white/80">$0.00 (Included)</span>
                                </div>
                                <div className="pt-2 border-t border-white/5 flex justify-between items-baseline">
                                    <span className="text-sm font-semibold text-white">Total Due Today</span>
                                    <div className="text-right">
                                        <span className="text-xl font-bold text-white">${finalPrice}</span>
                                        <span className="text-[10px] text-white/30 block">USD</span>
                                    </div>
                                </div>
                            </div>

                            
                            <div className="flex items-center justify-between text-[11px] text-white/30 px-1">
                                <div className="flex items-center gap-1.5">
                                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                                    <span>256-Bit SSL Secured</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Lock className="h-3.5 w-3.5 text-blue-400" />
                                    <span>30-Day Money-Back</span>
                                </div>
                            </div>

                            
                            <button
                                type="submit"
                                disabled={isProcessing}
                                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-sm hover:opacity-95 transition-all shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isProcessing ? (
                                    <>
                                        <RefreshCw className="h-4 w-4 animate-spin" />
                                        <span>
                                            {processStep === 1 && "Connecting to Secure Gateway..."}
                                            {processStep === 2 && "Verifying Credentials..."}
                                            {processStep === 3 && "Activating VPN Nodes..."}
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <Lock className="h-4 w-4" />
                                        <span>Pay ${finalPrice} & Activate {plan.name}</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default CheckoutModal;
