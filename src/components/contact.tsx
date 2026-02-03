"use client";

import React from 'react';
import { FileText, HelpCircle, Mail, MessageSquare } from "lucide-react";

const ContactForm = () => {
    const supportOptions = [
        {
            title: "Help Center",
            description: "Read articles on how to use our services.",
            icon: <HelpCircle className="w-6 h-6 text-primary" />,
            btnText: "Browse Articles"
        },
        {
            title: "Live Chat",
            description: "Connect with us live for any technical issues.",
            icon: <MessageSquare className="w-6 h-6 text-primary" />,
            btnText: "Chat Now"
        },
        {
            title: "Email Support",
            description: "Describe your issue and send us a message.",
            icon: <Mail className="w-6 h-6 text-primary" />,
            btnText: "Send Ticket"
        },
        {
            title: "Documentation",
            description: "View developer guides and API details here.",
            icon: <FileText className="w-6 h-6 text-primary" />,
            btnText: "View Docs"
        }
    ];

    return (
        <section className="w-full py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-10 max-w-7xl mx-auto mt-8">
                {supportOptions.map((option, index) => (
                    <div 
                        key={index} 
                        className="flex flex-col p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 group"
                    >
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                            {option.icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
                        <p className="text-sm text-muted-foreground mb-6">
                            {option.description}
                        </p>
                        <button className="mt-auto text-sm font-medium text-primary flex items-center gap-2 hover:gap-3 transition-all">
                            {option.btnText} <span>→</span>
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ContactForm;