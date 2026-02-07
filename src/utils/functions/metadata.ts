import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";

export const generateMetadata = ({
    title = "Nexcentauri",
    description = "Nexcentauri is a global technology company delivering custom software solutions, mobile applications, and high-performance websites for businesses worldwide.",
    image = "https://www.nexcentauri.com/thumbnail.jpg",
    icons = [
        {
            rel: "apple-touch-icon",
            sizes: "32x32",
            url: "https://www.nexcentauri.com/apple-touch-icon.png"
        },
        {
            rel: "icon",
            sizes: "32x32",
            url: "https://www.nexcentauri.com/favicon-32x32.png"
        },
        {
            rel: "icon",
            sizes: "16x16",
            url: "https://www.nexcentauri.com/favicon-16x16.png"
        },
    ],
    noIndex = false
}: {
    title?: string;
    description?: string;
    image?: string | null;
    icons?: Metadata["icons"];
    noIndex?: boolean;
} = {}): Metadata => ({
    title:{
        default: title,
        template: `%s | ${title}`,
    },
    description,
    icons,
    keywords: [
        "Nexcentauri", 
        "Software Engineering Sri Lanka", 
        "Custom Software Solutions", 
        "Mobile App Development", 
        "Web Development", 
        "POS Systems Sri Lanka",
        "Next Digital Century"
    ],
    metadataBase: new URL("https://nexcentauri.com"), 
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title,
        description,
        url: "https://nexcentauri.com",
        siteName: "Nexcentauri",
        images: image ? [{ url: image, width: 1200, height: 630 }] : [],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title,
        description,
        creator: "@nexcentauri",
        images: image ? [image] : [],
    },
    robots: {
        index: !noIndex,
        follow: !noIndex,
        googleBot: {
            index: !noIndex,
            follow: !noIndex,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
});