import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Bot, WifiOff, Cloud, ShieldCheck, LayoutDashboard, Cpu, Database, Code } from "lucide-react";
import { Projects } from "@/utils/constants/proto";

type Props = {
    params: { id: string };
};

export default function ProjectDetails({ params }: Props) {
    
    const project = Projects.find((p) => p.id === params.id);

    if (!project) return (
        <div className="min-h-screen bg-black flex items-center justify-center text-white">
            <div className="animate-pulse text-xl font-light tracking-widest">PROJECT NOT FOUND...</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 flex flex-col items-center">
            
            <div className="max-w-4xl w-full">
                
                
                <Link 
                    href="/services/custom-software" 
                    className="group inline-flex items-center text-gray-500 hover:text-blue-400 mb-8 transition-colors duration-300"
                >
                    <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span> 
                    Back to projects
                </Link>

               
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent text-center md:text-left">
                    {project.title}
                </h1>
                
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_-10px_rgba(59,130,246,0.2)] mb-16 group">
                    <Image 
                        src={`/projects/${project.title}.png`}
                        alt={project.title} 
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                </div>

                
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl mb-12">
                    <p className="text-gray-300 text-lg md:text-xl leading-loose whitespace-pre-line mb-10">
                        {project.description || "The Nextuary Advanced POS System is a cutting-edge desktop application designed to revolutionize retail management. Combining modern web technologies with powerful local and cloud databases, it ensures your business runs smoothly, efficiently, and securely."}
                    </p>

                    <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">Core System Features</h3>
                    
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                        {[
                            { icon: <Bot className="w-6 h-6 text-blue-400" />, title: "AI Smart Inventory", desc: "Predictive reordering alerts based on 14-day daily sales velocity analysis." },
                            { icon: <WifiOff className="w-6 h-6 text-green-400" />, title: "Offline-First Architecture", desc: "Keep billing seamlessly without internet using robust local SQLite databases." },
                            { icon: <Cloud className="w-6 h-6 text-cyan-400" />, title: "Real-time Cloud Sync", desc: "Automatic data backups to Firebase whenever an internet connection is available." },
                            { icon: <ShieldCheck className="w-6 h-6 text-red-400" />, title: "Hardware-Bound Security", desc: "Advanced node-machine-id licensing prevents unauthorized duplication." },
                            { icon: <LayoutDashboard className="w-6 h-6 text-purple-400" />, title: "Comprehensive Dashboard", desc: "Track daily revenue, customer credit ledgers, and expiring items instantly." },
                            { icon: <CheckCircle className="w-6 h-6 text-orange-400" />, title: "Multi-Payment Support", desc: "Split payments easily across Cash, Card, and Credit accounts." }
                        ].map((feature, i) => (
                            <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                <div className="mt-1">{feature.icon}</div>
                                <div>
                                    <h4 className="text-white font-bold text-lg mb-1">{feature.title}</h4>
                                    <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Technologies Engineered</h3>
                    
                    
                    <div className="flex flex-wrap gap-3">
                        {[
                            { name: "React.js", icon: <Code className="w-4 h-4"/> },
                            { name: "Electron.js", icon: <Cpu className="w-4 h-4"/> },
                            { name: "Node.js", icon: <Code className="w-4 h-4"/> },
                            { name: "SQLite", icon: <Database className="w-4 h-4"/> },
                            { name: "Firebase / Firestore", icon: <Cloud className="w-4 h-4"/> },
                            { name: "Tailwind CSS", icon: <Code className="w-4 h-4"/> }
                        ].map((tech, i) => (
                            <span key={i} className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-full text-sm font-semibold tracking-wide">
                                {tech.icon}
                                {tech.name}
                            </span>
                        ))}
                    </div>
                </div>

                
                <div className="mt-16 text-center space-y-6">
                    <h3 className="text-3xl font-bold text-white">Ready to transform your business?</h3>
                    <p className="text-gray-400 text-lg">Join Nextuary and step into the future of retail management.</p>
                    
                    
                    <a href="https://wa.me/94763145020" target="_blank" rel="noopener noreferrer" className="inline-block bg-white hover:bg-gray-200 text-black text-lg font-medium px-10 py-4 rounded-full transition-all hover:shadow-[0_0_30px_-5px_rgba(37,99,235,0.5)] mt-4">
                        Request a Free Demo
                    </a>
                </div>
                
            </div>
        </div>
    );
}