import { AnimationContainer, MaxWidthWrapper } from "@/components";
import Link from "next/link";

const TermsPage = () => {
    return (
        <MaxWidthWrapper className="max-w-3xl mx-auto px-8 mb-40">
            <AnimationContainer delay={0.1} className="w-full">
                <h1 className="text-4xl md:text-6xl font-heading font-bold my-12 text-center w-full">
                    Terms and Conditions
                </h1>
                <p className="text-sm mb-2 italic mt-20">
                    Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <p className="mt-4">
                    Welcome to <strong>NEXCENTAURI</strong>. These terms and conditions outline the rules and regulations for the use of NEXCENTAURI&apos;s website and services.
                </p>

                <h2 className="text-xl font-medium mt-12 text-primary">
                    1. Promotional Service Period
                </h2>
                <p className="mt-8 text-muted-foreground">
                    NEXCENTAURI is currently offering its services with <strong>zero service charges for a period of one (1) year</strong> from the date of engagement. Please note that after the completion of this one-year promotional period, standard service charges and subscription fees will apply as per our updated pricing model.
                </p>

                <h2 className="text-xl font-medium mt-12">
                    2. Project Scope and Add-ons
                </h2>
                <p className="mt-8 text-muted-foreground">
                    Each project is initiated based on a predefined scope of work agreed upon by both the client and NEXCENTAURI. If a client requests additional features, functionalities, or modifications that fall outside the initial agreement, these will be treated as <strong>&quot;Add-ons.&quot;</strong> Additional charges will be applicable for all Add-ons based on the complexity and development time required.
                </p>
 
                <h2 className="text-xl font-medium mt-12">
                    3. Cancellation and Refund Policy
                </h2>
                <p className="mt-8 text-muted-foreground">
                    Clients may request to halt or terminate a project at any stage. However, NEXCENTAURI operates a <strong>strict no-refund policy</strong> for such instances. Any advance payments, deposits, or milestone payments already made will not be refunded under any circumstances, as these funds are utilized for initial resource allocation and development costs.
                </p>

                <h2 className="text-xl font-medium mt-12 text-destructive">
                    4. Payment Terms and Legal Compliance
                </h2>
                <p className="mt-8 text-muted-foreground">
                    Payments must be settled within the agreed timeframe specified in the invoice or project contract. In the event of a payment default or failure to comply with the agreed payment schedule, NEXCENTAURI reserves the full right to <strong>initiate necessary legal proceedings</strong> to recover the outstanding balance and any associated legal costs.
                </p>

                <h2 className="text-xl font-medium mt-12">
                    5. User Content & Ownership
                </h2>
                <p className="mt-8 text-muted-foreground">
                    You retain ownership of the content you provide. However, upon full payment, the final software/product ownership will be transferred as per the individual project contract. NEXCENTAURI reserves the right to showcase completed projects in our portfolio unless a Non-Disclosure Agreement (NDA) is in place.
                </p>

                <h2 className="text-xl font-medium mt-12">
                    6. Limitation of Liability
                </h2>
                <p className="mt-8 text-muted-foreground">
                    <strong>NEXCENTAURI</strong> provides services on an &quot;as is&quot; basis. We are not liable for any indirect or consequential losses, data loss, or business interruptions arising from the use of our software or services once handed over to the client.
                </p>

                <h2 className="text-xl font-medium mt-12">
                    7. Governing Law
                </h2>
                <p className="mt-8 text-muted-foreground">
                    These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which NEXCENTAURI operates. Any disputes will be subject to the exclusive jurisdiction of the local courts.
                </p>

                <h2 className="text-xl font-medium mt-12">
                    8. Contact Us
                </h2>
                <p className="mt-8 text-muted-foreground">
                    If you have any questions or concerns about these Terms, please contact our legal team at <strong>legal@nexcentauri.io</strong> or <strong>support@nexcentauri.io</strong>.
                </p>

                <p className="mt-8 font-medium">
                    By engaging with NEXCENTAURI, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                </p>
            </AnimationContainer>
        </MaxWidthWrapper>
    );
};

export default TermsPage;
