import React from 'react';
import { Layout, Database, Server, Smartphone, Monitor, Globe } from "lucide-react";
import { AnimationContainer, MaxWidthWrapper } from '@/components';
import MagicBadge from '@/components/ui/magic-badge';
import { Projects } from '@/utils/constants/proto';
import Image from 'next/image';

const ViewOurWork = () => {

    return (
        <div className="w-full py-20">

            <MaxWidthWrapper className="mb-24">
                <AnimationContainer delay={0.1}>
                    <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
                        <MagicBadge title="Our Portfolio" />
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold font-heading mt-6 !leading-tight">
                            Engineering Digital Solutions for the Nexcentauri
                        </h1>
                        <p className="text-base md:text-lg mt-6 text-muted-foreground leading-relaxed">
                            Explore our latest projects, from custom enterprise systems to high-performance mobile and web applications.
                        </p>
                    </div>
                </AnimationContainer>
            </MaxWidthWrapper>


            <MaxWidthWrapper className="mb-32">
                <AnimationContainer delay={0.2}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-t border-border/50 pt-16">
                        <div className="space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                <Layout className="w-6 h-6 text-primary" />
                            </div>
                            <h4 className="text-xl font-bold font-heading">Frontend Excellence</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                We build high-performance, responsive user interfaces using Next.js, React, and Tailwind CSS. By leveraging GSAP, we ensure smooth transitions and a polished professional finish.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                <Database className="w-6 h-6 text-primary" />
                            </div>
                            <h4 className="text-xl font-bold font-heading">Robust Backends</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Our backend systems are engineered for stability and security using Java and Hibernate. We focus on powerful server-side logic and efficient data management.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                <Server className="w-6 h-6 text-primary" />
                            </div>
                            <h4 className="text-xl font-bold font-heading">Scalable Infrastructure</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                We design future-ready digital architectures that grow alongside your business, ensuring they can handle increasing user loads and evolving requirements.
                            </p>
                        </div>
                    </div>
                </AnimationContainer>
            </MaxWidthWrapper>


            <MaxWidthWrapper>
                <AnimationContainer delay={0.3}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {Projects.map((project) => (
                            ["web-project","custom-software-project"].includes(project.id) && (
                            <div
                                key={project.id}
                                className="group p-8 rounded-[2.5rem] border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300"
                                >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-4 rounded-2xl bg-primary/5 text-primary group-hover:bg-primary/10 transition-colors">
                                        {project.id === "custom-software-project" ? <Monitor className="w-6 h-6" /> : <Globe className="w-6 h-6" />}
                                    </div>
                                    <div className="flex gap-2">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded bg-secondary text-secondary-foreground">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <Image
                                    src={`/projects/${project.title}.png`}
                                    alt={project.title}
                                    width={576}
                                    height={300}
                                    className="rounded-lg object-cover mb-6"
                                    priority
                                />
                                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                                    {project.description}
                                </p>
                                <button className="text-sm font-bold text-primary flex items-center gap-2 group/btn">
                                    View Project Detail <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                                </button>
                            </div>
                            )
                        ))}
                    </div>
                </AnimationContainer>
            </MaxWidthWrapper>


            <MaxWidthWrapper className="mt-32">
                <AnimationContainer delay={0.4}>
                    <div className="p-10 md:p-16 rounded-[3rem] bg-primary text-primary-foreground relative overflow-hidden group">
                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                            <div>
                                <MagicBadge title="Mobile Development" />
                                <h2 className="text-3xl md:text-4xl font-bold font-heading mt-6">
                                    Cross-Platform Performance
                                </h2>
                                <p className="text-primary-foreground/80 mt-6 leading-relaxed">
                                    We develop secure and scalable mobile applications using React Native and Java, delivering high-quality native-level experiences for both Android and iOS.
                                </p>
                                <button className="mt-8 px-8 py-4 bg-black text-white rounded-xl font-bold hover:scale-105 transition-transform">
                                    Start Your Mobile Project
                                </button>
                            </div>
                            <div className="flex justify-center">
                                <Image
                                    src={`/projects/SPARK Chat Application (mobile).png`}
                                    alt={"SPARK Chat Application"}
                                    width={400}
                                    height={400}
                                    className="rounded-lg object-cover mb-6"
                                    priority
                                />
                            </div>
                        </div>

                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full"></div>
                    </div>
                </AnimationContainer>
            </MaxWidthWrapper>
        </div>
    );
};

export default ViewOurWork;