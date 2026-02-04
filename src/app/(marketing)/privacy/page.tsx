import { AnimationContainer, MaxWidthWrapper } from "@/components";
import React from 'react';

const Privacy = () => {
    return (
        <MaxWidthWrapper className="max-w-3xl mx-auto px-8 mb-40">
            <AnimationContainer delay={0.1} className="w-full">
                <h1 className="text-4xl md:text-6xl font-heading font-bold my-12 text-center w-full">
                    Privacy Policy
                </h1>
                <p className="text-sm mb-2 italic mt-20">
                    Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <p className="mt-4">
                    At <strong>NEXCENTAURI</strong>, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
                </p>

                <h2 className="text-xl font-medium mt-8">
                    Information We Collect
                </h2>

                <h3 className="text-lg mt-4 font-medium">
                    Personal Information
                </h3>
                <p className="mt-8 text-muted-foreground">
                    When you register for an account or use our services, we may collect personal information that can identify you, such as your name, email address, and payment information.
                </p>

                <h3 className="text-lg font-medium mt-12">
                    Non-Personal Information
                </h3>
                <p className="mt-8 text-muted-foreground">
                    We may also collect non-personal information about your use of the service, such as IP addresses, browser types, referring URLs, and other technical data.
                </p>

                <h3 className="text-lg font-medium mt-8">
                    Cookies and Tracking Technologies
                </h3>
                <p className="mt-8">
                    We use cookies and similar tracking technologies to collect and store information about your interactions with our website. You can manage your cookie preferences through your browser settings.
                </p>

                <h2 className="text-xl font-medium mt-12">
                    How We Use Your Information
                </h2>

                <h3 className="text-lg mt-8 font-medium">
                    Provide and Improve Services
                </h3>
                <div className="mt-8">
                    We use the information we collect to:
                    <ul className="list-disc ml-8 text-muted-foreground">
                        <li>Provide, operate, and maintain our services.</li>
                        <li>Improve and personalize your experience.</li>
                        <li>Process transactions and manage your account.</li>
                    </ul>
                </div>

                <h3 className="text-xl font-medium mt-12">
                    Communication
                </h3>
                <div className="mt-8">
                    We may use your information to:
                    <ul className="list-disc text-muted-foreground ml-8">
                        <li>Send you updates, promotional materials, and other information related to our services.</li>
                        <li>Respond to your inquiries and provide customer support.</li>
                    </ul>
                </div>

                <h2 className="text-xl font-medium mt-12">
                    How We Share Your Information
                </h2>

                <h3 className="text-lg mt-8 font-medium">
                    Service Providers
                </h3>
                <p className="mt-8 text-muted-foreground">
                    We may share your information with third-party service providers who assist us in operating our services, such as payment processors, email services, and hosting providers.
                </p>

                <h3 className="text-lg mt-8 font-medium">
                    Legal Requirements
                </h3>
                <p className="mt-8 text-muted-foreground">
                    We may disclose your information if required to do so by law or in response to valid requests by public authorities.
                </p>

                <h2 className="text-xl font-medium mt-12">
                    Data Security
                </h2>
                <p className="mt-8 text-muted-foreground">
                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, loss, or alteration. However, no method of transmission over the internet is 100% secure.
                </p>

                <h2 className="text-xl font-medium mt-12">
                    Your Rights and Choices
                </h2>

                <h3 className="text-lg mt-8 font-medium">
                    Data Deletion
                </h3>
                <p className="mt-8 text-muted-foreground">
                    You have the right to request the deletion of your personal information. Please contact us at support@nexcentauri.io to make this request.
                </p>

                <h2 className="text-xl font-medium mt-12">
                    Changes to This Privacy Policy
                </h2>
                <p className="mt-8 text-muted-foreground">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our website and updating the &quot;Last updated&quot; date at the top of this page.
                </p>

                <h2 className="text-xl font-medium mt-12">
                    Contact Us
                </h2>
                <p className="mt-8 text-muted-foreground">
                    If you have any questions or concerns about this Privacy Policy, please contact us at <strong>support@nextcentauri.io</strong>.
                </p>

                <p className="mt-8 font-medium">
                    By using NEXCENTAURI, you acknowledge that you have read, understood, and agree to the terms of this Privacy Policy.
                </p>
            </AnimationContainer>
        </MaxWidthWrapper>
    );
};

export default Privacy;
