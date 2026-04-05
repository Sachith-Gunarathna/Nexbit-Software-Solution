import { MaxWidthWrapper, AnimationContainer } from "@/components";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle, MonitorSmartphone, Zap, ShieldCheck } from "lucide-react";
import { Projects } from "@/utils/constants/proto";

export default async function ProjectDetails({ params }:any) {
   
    const project = Projects.find((p) => p.id === params.id);

    if (!project) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-2xl font-bold">Project not found</h1>
            </div>
        );
    }

    return (
        <MaxWidthWrapper className="py-20 mb-20">
            <AnimationContainer delay={0.1}>
            
                <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-10 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Projects
                </Link>

              
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="flex gap-2 mb-6">
                            {project.tags?.map((tag) => (
                                <span key={tag} className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase rounded-full">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 !leading-tight">
                            {project.title}
                        </h1>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                            {project.description}
                        </p>
                        
                       
                        <div className="space-y-4 mb-10">
                            {[
                                "Custom Built for Your Business",
                                "Fast & Scalable Architecture",
                                "Secure & Reliable Cloud Sync"
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-primary" />
                                    <span className="text-muted-foreground font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <button className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95">
                            Request a Demo
                        </button>
                    </div>

                  
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative rounded-3xl border border-border bg-card/50 backdrop-blur-sm p-4 shadow-2xl">
                            <Image
                                src={`/projects/${project.title}.png`}
                                alt={project.title}
                                width={800}
                                height={600}
                                className="rounded-2xl object-cover w-full"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </AnimationContainer>

            
            <AnimationContainer delay={0.2}>
                <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: <MonitorSmartphone className="w-8 h-8"/>, title: "Modern UI/UX", desc: "Designed with an intuitive and beautiful interface to enhance user experience." },
                        { icon: <Zap className="w-8 h-8"/>, title: "High Performance", desc: "Optimized code ensures lightning-fast load times and smooth operation." },
                        { icon: <ShieldCheck className="w-8 h-8"/>, title: "Bank-Grade Security", desc: "Advanced encryption and secure licensing protect your valuable data." }
                    ].map((item, i) => (
                        <div key={i} className="p-8 rounded-3xl border border-border bg-card/30 hover:bg-card/80 transition-colors flex flex-col items-center text-center">
                            <div className="p-4 rounded-2xl bg-primary/10 text-primary mb-6">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </AnimationContainer>
        </MaxWidthWrapper>
    );
}