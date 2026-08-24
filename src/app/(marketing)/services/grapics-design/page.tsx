import { AnimationContainer, MaxWidthWrapper } from "@/components";
import MagicBadge from "@/components/ui/magic-badge";
import { ExternalLink, Globe, Layers, PenTool, Palette, Terminal } from "lucide-react";
import Image from "next/image";

const graphicsImages = [
    { src: "/graphicsDesign/post 1.jpeg", alt: "Graphics Design Post 1" },
    { src: "/graphicsDesign/post 2.jpeg", alt: "Graphics Design Post 2" },
    { src: "/graphicsDesign/post 3.jpeg", alt: "Graphics Design Post 3" },
    { src: "/graphicsDesign/post 4.jpeg", alt: "Graphics Design Post 4" },
    { src: "/graphicsDesign/post 5.jpeg", alt: "Graphics Design Post 5" },
    { src: "/graphicsDesign/post 6.jpeg", alt: "Graphics Design Post 6" },
];

const GraphicsDesignPage = () => {
    return (
        <MaxWidthWrapper className="mb-40">

            {/* Hero Section */}
            <AnimationContainer delay={0.1}>
                <div className="flex flex-col items-center justify-center py-10 max-w-lg mx-auto">
                    <MagicBadge title="Graphics Design" />
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold font-heading text-center mt-6 !leading-tight">
                        Bring your brand to life with stunning visuals
                    </h1>
                    <p className="text-base md:text-lg mt-6 text-center text-muted-foreground">
                        Professional graphic design services for logos, social media posts, marketing materials, UI assets, and more — crafted to capture attention and communicate your brand story.
                    </p>
                </div>
            </AnimationContainer>

            {/* Portfolio Grid */}
            <AnimationContainer delay={0.2}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                    {graphicsImages.map((img, index) => (
                        <div
                            key={index}
                            className="group relative rounded-3xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 flex flex-col h-full shadow-sm hover:shadow-xl overflow-hidden"
                        >
                            <div className="flex justify-between items-start p-6 pb-3">
                                <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                                    <Palette className="w-6 h-6" />
                                </div>
                                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-secondary rounded-full">
                                    <ExternalLink className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="px-6 pb-6">
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    width={400}
                                    height={300}
                                    className="rounded-xl object-cover w-full"
                                    priority
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </AnimationContainer>

            {/* Tech/Expertise Section */}
            <AnimationContainer delay={0.3}>
                <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center border-t border-border/50 pt-20">
                    <div>
                        <h2 className="text-3xl font-bold font-heading mb-6">Our Design Expertise</h2>
                        <p className="text-muted-foreground leading-relaxed mb-8">
                            At Nexcentauri, we bring creativity and precision together to craft visuals that resonate.
                            From brand identities to social media graphics, every design is tailored to tell your story.
                        </p>
                        <div className="space-y-4">
                            {[
                                { title: "Brand Identity", desc: "Logos, color palettes, and typography systems that define your brand." },
                                { title: "Social Media Design", desc: "Eye-catching posts and banners for all major platforms." },
                                { title: "Marketing Materials", desc: "Brochures, flyers, and digital ads designed for impact." },
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
                        <h3 className="text-2xl font-bold mb-4 italic">&quot;Design is the silent ambassador of your brand.&quot;</h3>
                        <p className="text-muted-foreground italic">
                            We don&lsquo;t just create graphics; we engineer visual identities that empower businesses to stand out and grow.
                        </p>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 blur-[80px] rounded-full group-hover:bg-primary/30 transition-all"></div>
                    </div>
                </div>
            </AnimationContainer>

        </MaxWidthWrapper>
    );
};

export default GraphicsDesignPage;
