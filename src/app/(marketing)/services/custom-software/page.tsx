import { AnimationContainer, MaxWidthWrapper } from "@/components";
import MagicBadge from "@/components/ui/magic-badge";
import {  Projects } from "@/utils/constants/proto";
import { Cpu, ExternalLink, Layers, Link, Terminal } from "lucide-react";
import Image from "next/image";

const CustomerSoftware = () => {
    return (

        <MaxWidthWrapper className="mb-40">
            <AnimationContainer delay={0.1}>
                <div className="flex flex-col items-center justify-center py-10 max-w-lg mx-auto">
                    <MagicBadge title="Web Development" />
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold font-heading text-center mt-6 !leading-tight">
                        Smart Software Solutions Engineered for Your Business Success
                    </h1>
                    <p className="text-base md:text-lg mt-6 text-center text-muted-foreground">
                        At Nexcentuari, we specialize in crafting bespoke software, from high-performance web applications to AI-powered, offline-first Desktop POS systems. We deliver scalable solutions that solve real operational challenges and drive growth.
                    </p>
                </div>
            </AnimationContainer>

            <AnimationContainer delay={0.2}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                    {Projects.map((project) => (
                        ["custom-software-project"].includes(project.id) && (
                        <div
                            key={project.id}
                            className="group relative p-8 rounded-3xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 flex flex-col h-full shadow-sm hover:shadow-xl"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                                    {<Cpu className="w-6 h-6" />}

                                </div>
                                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-secondary rounded-full">
                                    <ExternalLink className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex gap-2 mb-4">
                                {project.tags.map(tag => (
                                    <span key={tag} className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground/80">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <Image
                                src={`/projects/${project.title}.png`}
                                alt={project.title}
                                width={400}
                                height={300}
                                className="rounded-lg object-cover mb-6"
                                priority
                            />

                            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                                {project.title}
                            </h3>

                            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                                {project.description}
                            </p>

                           <Link 
                                href={`projects/${project.id}`} 
                                className="mt-auto flex items-center text-sm font-medium text-primary cursor-pointer group/link"
                            >
                                View Details
                                <span className="ml-2 group-hover/link:translate-x-1 transition-transform">→</span>
                            </Link>
                        </div>
                        )
                    ))}
                </div>
            </AnimationContainer>

            <AnimationContainer delay={0.3}>
                <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center border-t border-border/50 pt-20">
                    <div>
                        <h2 className="text-3xl font-bold font-heading mb-6">Our Tech Stack & Expertise</h2>
                        <p className="text-muted-foreground leading-relaxed mb-8">
                            At Nexcentuari, we leverage the latest modern technologies to build fast, secure, and smart systems.
                        </p>
                        <div className="space-y-4">
                            {[
                                { title: "React & Electron.js", desc: "Building beautiful web interfaces and powerful cross-platform desktop applications (like modern POS systems)." },
                                { title: "Node.js & Local DBs", desc: "Creating fast, offline-first backend systems and robust local databases for seamless performance." },
                                { title: "Cloud & Firebase Sync", desc: "Ensuring real-time data synchronization, cloud backups, and secure hardware licensing." },
                                { title: "AI & Smart Automations", desc: "Implementing intelligent features like AI-driven inventory prediction and data analytics." },
                            ].map((detail, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="mt-1"><Layers className="w-5 h-5 text-primary" /></div>
                                    <div>
                                        <h4 className="font-bold">{detail.title}</h4>
                                        <p className="text-sm text-muted-foreground">{detail.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-primary/5 rounded-[2.5rem] p-10 border border-primary/10 relative overflow-hidden group">
                        <Terminal className="w-12 h-12 text-primary mb-6" />
                        <h3 className="text-2xl font-bold mb-4 italic">
                            &quot;Precision engineering for a complex digital age.&quot;
                        </h3>
                        <p className="text-muted-foreground italic">
                            We don&apos;t just deliver software; we architect scalable custom solutions that solve real-world operational challenges and drive sustainable business growth.
                        </p>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 blur-[80px] rounded-full group-hover:bg-primary/30 transition-all"></div>
                    </div>
                </div>
            </AnimationContainer>
        </MaxWidthWrapper>

    )

};

export default CustomerSoftware;