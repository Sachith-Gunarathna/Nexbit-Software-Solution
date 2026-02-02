"use client";

import { cn } from "@/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import {
    Database,
    ShieldCheck,
    SearchCode,
    Cpu,
    Sparkles,
    BarChart3,
    LayoutDashboard
} from "lucide-react";
import React, { forwardRef, useRef } from "react";

const Circle = forwardRef<HTMLDivElement, { className?: string; children?: React.ReactNode }>(
    function Circle({ className, children }, ref) {
        return (
            <div
                ref={ref}
                className={cn(
                    "z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-slate-950 p-3 shadow-[0_0_15px_rgba(0,210,255,0.3)] border-slate-800",
                    className,
                )}
            >
                {children}
            </div>
        );
    }
);

export function Integrations({
    className,
}: {
    className?: string;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const div1Ref = useRef<HTMLDivElement>(null);
    const div2Ref = useRef<HTMLDivElement>(null);
    const div3Ref = useRef<HTMLDivElement>(null);
    const div4Ref = useRef<HTMLDivElement>(null);
    const div5Ref = useRef<HTMLDivElement>(null);
    const div6Ref = useRef<HTMLDivElement>(null);
    const div7Ref = useRef<HTMLDivElement>(null);

    return (
        <div
            className={cn(
                "relative flex w-full max-w-[500px] items-center justify-center overflow-hidden rounded-lg border bg-background p-10 md:shadow-xl",
                className,
            )}
            ref={containerRef}
        >
            <div className="flex h-full w-full flex-row items-stretch justify-between gap-10">

                <div className="flex flex-col justify-center">
                    <Circle ref={div7Ref} className="border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                        <BarChart3 className="text-cyan-400" />
                    </Circle>
                </div>


                <div className="flex flex-col justify-center">
                    <Circle ref={div6Ref} className="h-16 w-16 border-purple-500 shadow-[0_0_25px_rgba(168,85,247,0.6)]">
                        <Sparkles className="h-8 w-8 text-purple-400" />
                    </Circle>
                </div>


                <div className="flex flex-col justify-center gap-2">
                    <Circle ref={div1Ref}>
                        <Database className="h-6 w-6 text-blue-400" />
                    </Circle>
                    <Circle ref={div2Ref}>
                        <ShieldCheck className="h-6 w-6 text-emerald-400" />
                    </Circle>
                    <Circle ref={div3Ref}>
                        <Cpu className="h-6 w-6 text-orange-400" />
                    </Circle>
                    <Circle ref={div4Ref}>
                        <SearchCode className="h-6 w-6 text-pink-400" />
                    </Circle>
                    <Circle ref={div5Ref}>
                        <LayoutDashboard className="h-6 w-6 text-yellow-400" />
                    </Circle>
                </div>
            </div>


            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div1Ref}
                toRef={div6Ref}
                duration={3}
                gradientStartColor="#60a5fa"
                gradientStopColor="#a855f7"
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div2Ref}
                toRef={div6Ref}
                duration={3}
                gradientStartColor="#34d399"
                gradientStopColor="#a855f7"
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div3Ref}
                toRef={div6Ref}
                duration={3}
                gradientStartColor="#fb923c"
                gradientStopColor="#a855f7"
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div4Ref}
                toRef={div6Ref}
                duration={3}
                gradientStartColor="#f472b6"
                gradientStopColor="#a855f7"
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div5Ref}
                toRef={div6Ref}
                duration={3}
                gradientStartColor="#facc15"
                gradientStopColor="#a855f7"
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div6Ref}
                toRef={div7Ref}
                duration={3}
                gradientStartColor="#a855f7"
                gradientStopColor="#22d3ee"
            />
        </div>
    );
}