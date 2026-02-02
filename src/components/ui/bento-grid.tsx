import { buttonVariants } from "@/components/ui/button";
import { Command } from "@/components/ui/command";
import { cn } from "@/utils";
import { ArrowRightIcon, CodeIcon, SearchIcon, ShoppingCartIcon, WaypointsIcon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./card";
import { Input } from "./input";
import { Integrations } from "./integrations";


export const CARDS = [
    {
        Icon: CodeIcon,
        name: "Engineering Excellence",
        description: "We don't just write code; we engineer solutions. Using Next.js, Java, and modern cloud tech to build scalable, secure applications for your business.",
        href: "#",
        cta: "Learn more",
        className: "col-span-3 lg:col-span-1",
        background: (
            <Card className="absolute top-10 left-10 origin-top rounded-none rounded-tl-md transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_0%,#000_100%)] group-hover:scale-105 border border-border border-r-0 bg-slate-950/50 backdrop-blur-sm">
                <CardHeader className="p-4">
                    <div className="flex gap-2 mb-2">
                        <div className="h-2 w-2 rounded-full bg-red-500" />
                        <div className="h-2 w-2 rounded-full bg-yellow-500" />
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                    </div>
                    <CardTitle className="text-sm font-mono text-cyan-400">
                        NexbitEngine.java
                    </CardTitle>
                    <CardDescription className="text-xs font-mono text-slate-400">
                        {`public class Nexbir {
                        public static void main(String[] args) {
                            System.out.println("Building scalable solutions...");
                        }
                        }`}
                    </CardDescription>
                </CardHeader>
            </Card>
        ),
    },
    {
        Icon: ShoppingCartIcon,
        name: "Enterprise POS Systems",
        description: "Streamline your operations with our custom-built, high-speed Point of Sale solutions.",
        href: "#",
        cta: "Learn more",
        className: "col-span-3 lg:col-span-2",
        background: (
            <Command className="absolute right-10 top-10 w-[70%] origin-top translate-x-0 border border-border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:-translate-x-10 p-2 bg-slate-950">
                <Input placeholder="Search inventory..." className="border-slate-800" />
                <div className="mt-1 cursor-pointer">

                    <div className="flex justify-between px-4 py-2 hover:bg-muted rounded-md text-sm">
                        <span>Wireless Mouse - Logitech</span>
                        <span className="text-emerald-500 font-mono">LKR 3,500.00</span>
                    </div>
                    <div className="flex justify-between px-4 py-2 hover:bg-muted rounded-md text-sm">
                        <span>Mechanical Keyboard RGB</span>
                        <span className="text-emerald-500 font-mono">LKR 9,000.00</span>
                    </div>
                    <div className="flex justify-between px-4 py-2 hover:bg-muted rounded-md text-sm">
                        <span>Gaming Monitor 24&quot; 144Hz</span>
                        <span className="text-emerald-500 font-mono">LKR 30,000.00</span>
                    </div>
                    <div className="flex justify-between px-4 py-2 hover:bg-muted rounded-md text-sm">
                        <span>USB-C Hub Multiport</span>
                        <span className="text-emerald-500 font-mono">LKR 350.00</span>
                    </div>
                    <div className="flex justify-between px-4 py-2 hover:bg-muted rounded-md text-sm">
                        <span>External SSD 1TB</span>
                        <span className="text-emerald-500 font-mono">LKR 20,000.00</span>
                    </div>
                </div>
            </Command>
        ),
    },
    {
        Icon: WaypointsIcon,
        name: "Data-Driven Insights",
        description: "Real-time dashboards and reporting tools to keep track of your business growth.",
        href: "#",
        cta: "Learn more",
        className: "col-span-3 lg:col-span-2 max-w-full overflow-hidden",
        background: (
            <Integrations className="absolute right-2 pl-28 md:pl-0 top-4 h-[300px] w-[600px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
        ),
    }

];

const BentoGrid = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
                className,
            )}
        >
            {children}
        </div>
    );
};

const BentoCard = ({
    name,
    className,
    background,
    Icon,
    description,
    href,
    cta,
}: {
    name: string;
    className: string;
    background: ReactNode;
    Icon: any;
    description: string;
    href: string;
    cta: string;
}) => (
    <div
        key={name}
        className={cn(
            "group relative col-span-3 flex flex-col justify-between border border-border/60 overflow-hidden rounded-xl",
            "bg-black [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
            className,
        )}
    >
        <div>{background}</div>
        <div className="pointer-events-none z-10 flex flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
            <Icon className="h-12 w-12 origin-left text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75" />
            <h3 className="text-xl font-semibold text-neutral-300">
                {name}
            </h3>
            <p className="max-w-lg text-neutral-400">{description}</p>
        </div>

        <div
            className={cn(
                "absolute bottom-0 flex w-full translate-y-10 flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
            )}
        >
            <Link href={href} className={buttonVariants({ size: "sm", variant: "ghost", className: "cursor-pointer" })}>
                {cta}
                <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
        </div>
        <div className="pointer-events-none absolute inset-0 transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
    </div>
);

export { BentoCard, BentoGrid };
