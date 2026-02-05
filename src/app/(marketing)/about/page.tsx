import React, { use } from 'react';
import { Target, Eye, ShieldCheck, Zap, Globe, Rocket, ArrowRight } from "lucide-react";
import Link from 'next/link';
import MagicBadge from '@/components/ui/magic-badge';
import { AnimationContainer } from '@/components';
import { Button } from '@/components/ui/button';

const AboutPage = () => {
    return (
        <div className="w-full pb-20">
            <AnimationContainer delay={0.1}>
                <section className="flex flex-col items-center justify-center py-20 px-4 max-w-4xl mx-auto text-center">
                    <MagicBadge title="About Nexcentauri" />
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold font-heading mt-6 !leading-tight">
                        Engineering the <span className="text-primary">Next Digital Century</span>
                    </h1>
                    <p className="text-lg md:text-xl mt-8 text-muted-foreground leading-relaxed">
                        Nexcentauri is a global technology company delivering custom software solutions for any business requirement.
                        We help organizations streamline operations, improve efficiency, and scale with confidence.
                    </p>


                    <div className="flex flex-wrap justify-center gap-4 mt-10">
                        {["Custom Systems", "Mobile Apps", "Websites", "Software Solutions"].map((item) => (
                            <span key={item} className="px-4 py-2 rounded-full bg-secondary/50 border border-border text-sm font-medium">
                                {item}
                            </span>
                        ))}
                    </div>
                </section>

            </AnimationContainer>

            <section className="py-16 bg-secondary/20 border-y border-border">
                <div className="max-w-7xl mx-auto px-4 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <AnimationContainer delay={0.2}>
                        <div>

                            <h2 className="text-3xl font-bold font-heading mb-6">Who We Are</h2>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                Nexcentauri partners with businesses to design and develop digital solutions tailored to real operational needs.
                                We focus on building systems that are reliable, scalable, and aligned with long-term business goals.
                            </p>
                            <p className="text-muted-foreground text-lg mt-4 leading-relaxed">
                                By combining strategic planning with strong technical execution, we deliver software that integrates
                                seamlessly into daily operations and supports sustainable growth.
                            </p>
                        </div>
                    </AnimationContainer>
                    <AnimationContainer delay={0.3}>
                        <div className="relative aspect-video rounded-3xl overflow-hidden border border-border bg-card shadow-2xl">

                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
                            <div className="flex items-center justify-center h-full text-primary/40 font-heading italic text-2xl">
                                Next-Gen Development
                            </div>
                        </div>
                    </AnimationContainer>

                </div>
            </section>


            <section className="py-20 px-4 max-w-7xl mx-auto">
                <AnimationContainer delay={0.1}>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading">What We Do</h2>
                    </div>
                </AnimationContainer>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <AnimationContainer delay={0.2}>
                        <div className="p-8 rounded-3xl border border-border bg-card/50 hover:border-primary/50 transition-all">
                            <Zap className="w-10 h-10 text-primary mb-6" />
                            <h3 className="text-2xl font-bold mb-4">Custom Business Systems</h3>
                            <p className="text-muted-foreground">We build fully tailored systems that automate workflows, centralize data, and improve operational visibility, designed specifically around your business processes.</p>
                        </div>
                    </AnimationContainer>
                    <AnimationContainer delay={0.3}>
                        <div className="p-8 rounded-3xl border border-border bg-card/50 hover:border-primary/50 transition-all">
                            <Globe className="w-10 h-10 text-primary mb-6" />
                            <h3 className="text-2xl font-bold mb-4">Mobile Applications</h3>
                            <p className="text-muted-foreground">Secure, scalable mobile applications developed to support internal operations or customer-facing services across platforms.</p>
                        </div>
                    </AnimationContainer>
                    <AnimationContainer delay={0.4}>
                        <div className="p-8 rounded-3xl border border-border bg-card/50 hover:border-primary/50 transition-all">
                            <Target className="w-10 h-10 text-primary mb-6" />
                            <h3 className="text-2xl font-bold mb-4">Websites</h3>
                            <p className="text-muted-foreground">Modern, high-performance websites designed to represent your brand professionally and support business growth.</p>
                        </div>
                    </AnimationContainer>
                    <AnimationContainer delay={0.5}>
                        <div className="p-8 rounded-3xl border border-border bg-card/50 hover:border-primary/50 transition-all">
                            <Rocket className="w-10 h-10 text-primary mb-6" />
                            <h3 className="text-2xl font-bold mb-4">Software Solutions</h3>
                            <p className="text-muted-foreground">End-to-end software development for any requirement, from concept to deployment and ongoing support.</p>
                        </div>
                    </AnimationContainer>
                </div>

            </section>


            <section className="py-20 px-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                <AnimationContainer delay={0.4}>
                    <div className="p-10 rounded-[2.5rem] bg-primary text-primary-foreground">
                        <Target className="w-12 h-12 mb-6" />
                        <h2 className="text-3xl font-bold mb-4 font-heading">Our Mission</h2>
                        <p className="text-primary-foreground/90 text-lg">To deliver reliable, scalable software solutions that help businesses operate efficiently and grow confidently in a digital world.</p>
                    </div>
                </AnimationContainer>
                <AnimationContainer delay={0.5}>
                    <div className="p-10 rounded-[2.5rem] bg-secondary border border-border">
                        <Eye className="w-12 h-12 mb-6 text-primary" />
                        <h2 className="text-3xl font-bold mb-4 font-heading text-foreground">Our Vision</h2>
                        <p className="text-muted-foreground text-lg">To become a trusted global technology partner by building future-ready systems that stand the test of time.</p>
                    </div>
                </AnimationContainer>
            </section>

            <AnimationContainer delay={0.3}>
                <section className="py-20 bg-card/30 border-y border-border">
                    <div className="max-w-7xl mx-auto px-4 md:px-10">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-16">Why Nexcentauri</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { t: "Custom-built", d: "Solutions for any business requirement" },
                                { t: "Professional", d: "Clear communication and project management" },
                                { t: "Scalable", d: "Systems designed for long-term growth" },
                                { t: "Global Standards", d: "Reliability with corporate standards" }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col items-center text-center">
                                    <ShieldCheck className="w-8 h-8 text-primary mb-4" />
                                    <h4 className="font-bold text-lg mb-2">{item.t}</h4>
                                    <p className="text-sm text-muted-foreground">{item.d}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </AnimationContainer>

            <AnimationContainer delay={0.3}>
                <section className="py-20 px-4 text-center">
                    <div className="max-w-4xl mx-auto p-12 rounded-[3rem] bg-gradient-to-b from-card to-background border border-border">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">Let’s Build What Your Business Needs</h2>
                        <p className="text-muted-foreground mb-10 text-lg">Partner with Nexcentauri to design and develop software solutions that move your business forward.</p>

                        <Button size={"lg"} asChild>
                            <Link href="./contact">
                                Contact Us
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                    </div>
                </section>
            </AnimationContainer>
        </div>
    );
};

export default AboutPage;