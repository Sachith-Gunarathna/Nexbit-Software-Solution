import { AnimationContainer, MaxWidthWrapper } from "@/components";
import MagicBadge from "@/components/ui/magic-badge";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const Contact = () => {
    return (
        <MaxWidthWrapper className="mb-40">
            <AnimationContainer delay={0.1}>
                <div className="flex flex-col items-center justify-center py-10 max-w-lg mx-auto">
                    <MagicBadge title="Contact" />
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold font-heading text-center mt-6 !leading-tight">
                       We&apos;re here to help you
                    </h1>
                    <p className="text-base md:text-lg mt-6 text-center text-muted-foreground">
                        We are ready to provide any technical support your business needs. 
                    Reach out to us and let&apos;s build something great together.
                    </p>
                </div>
            </AnimationContainer>

            <AnimationContainer delay={0.3}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
              
                <div className="flex flex-col justify-center space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold font-heading mb-4">Get in touch</h2>
                        <p className="text-muted-foreground">
                            Have a project in mind or need technical advice? Drop us a message.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <Mail className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Email us</p>
                                <p className="font-medium">info@nexcentauri.com</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <Phone className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Call us</p>
                                <p className="font-medium">+94 71 915 6802</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <MapPin className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Location</p>
                                <p className="font-medium">Kurunegala, Sri Lanka</p>
                            </div>
                        </div>
                    </div>
                </div>
               
                <div className="bg-card/50 backdrop-blur-sm p-8 rounded-3xl border border-border">
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Name</label>
                                <input type="text" placeholder="Your name" className="w-full p-3 rounded-xl bg-background border border-border focus:border-primary outline-none transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email</label>
                                <input type="email" placeholder="Your email" className="w-full p-3 rounded-xl bg-background border border-border focus:border-primary outline-none transition-all" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Subject</label>
                            <input type="text" placeholder="How can we help?" className="w-full p-3 rounded-xl bg-background border border-border focus:border-primary outline-none transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Message</label>
                            <textarea placeholder="Tell us about your project..." rows={4} className="w-full p-3 rounded-xl bg-background border border-border focus:border-primary outline-none transition-all resize-none"></textarea>
                        </div>
                        <button className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all">
                            Send Message <Send className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            </div>
            </AnimationContainer>

        </MaxWidthWrapper>
    );
};

export default Contact;