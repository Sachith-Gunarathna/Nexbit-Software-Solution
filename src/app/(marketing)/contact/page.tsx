"use client";

import React, { useState } from 'react';
import { useUser } from "@clerk/nextjs"; 
import { Send, Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimationContainer, MaxWidthWrapper } from '@/components';
import MagicBadge from '@/components/ui/magic-badge';

const Contact = () => {
    const { user } = useUser();
    const [result, setResult] = useState("");
    const [status, setStatus] = useState("idle"); 

    const onSubmit = async (event) => {
        event.preventDefault();
        setStatus("sending");
       

        const formData = new FormData(event.target);
        formData.append("access_key", "aae10b3f-019a-4026-a9a5-5a34ffa5e5fe");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setStatus("success");
                setResult("Message Sent Successfully! ✅");
                event.target.reset();
            } else {
                setStatus("idle");
                setResult(data.message);
            }
        } catch (error) {
            setStatus("idle");
            setResult("Something went wrong. Please try again.");
        }
    };

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
                    
                    
                    <div className="bg-card/50 backdrop-blur-sm p-8 rounded-3xl border border-border relative overflow-hidden min-h-[500px] flex items-center">
                        <AnimatePresence mode="wait">
                            {status === "success" ? (
                               
                                <motion.div 
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="w-full text-center space-y-4 py-10"
                                >
                                    <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
                                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                                    </div>
                                    <h3 className="text-2xl font-bold">Message Sent!</h3>
                                    <p className="text-muted-foreground">
                                        Thank you {user?.firstName || "there"}, we&apos;ll get back to you shortly.
                                    </p>
                                    <button 
                                        onClick={() => setStatus("idle")}
                                        className="text-primary text-sm font-semibold hover:underline"
                                    >
                                        Send another message
                                    </button>
                                </motion.div>
                            ) : (
                         
                                <motion.form 
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="space-y-4 w-full relative z-10" 
                                    onSubmit={onSubmit}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Name</label>
                                            <input 
                                                type="text" 
                                                name="name"
                                                defaultValue={user?.fullName || ""}
                                                placeholder="Your name" 
                                                className="w-full p-3 rounded-xl bg-background border border-border focus:border-primary outline-none transition-all" 
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Email</label>
                                            <input 
                                                type="email" 
                                                name="email"
                                                defaultValue={user?.primaryEmailAddress?.emailAddress || ""}
                                                placeholder="Your email" 
                                                className="w-full p-3 rounded-xl bg-background border border-border focus:border-primary outline-none transition-all" 
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Subject</label>
                                        <input 
                                            type="text" 
                                            name="subject"
                                            placeholder="How can we help?" 
                                            className="w-full p-3 rounded-xl bg-background border border-border focus:border-primary outline-none transition-all" 
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Message</label>
                                        <textarea 
                                            name="message"
                                            placeholder="Tell us about your project..." 
                                            rows={4} 
                                            className="w-full p-3 rounded-xl bg-background border border-border focus:border-primary outline-none transition-all resize-none" 
                                            required
                                        ></textarea>
                                    </div>
                                    <button 
                                        type="submit" 
                                        disabled={status === "sending"}
                                        className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-50"
                                    >
                                        {status === "sending" ? "Sending..." : "Send Message"} <Send className="w-4 h-4" />
                                    </button>
                                    
                                    {result && status !== "success" && (
                                        <p className="text-center text-sm mt-2 text-muted-foreground animate-pulse">
                                            {result}
                                        </p>
                                    )}
                                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -z-10"></div>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </AnimationContainer>
        </MaxWidthWrapper>
    );
};

export default Contact;