import { Metadata } from "next";

export const generateMetadata = ({
  
    title = "Nexcentauri Software Solution | Enterprise POS & Cinematic Web Design",
    
  
    description = "Nexcentauri Software Solution specializes in high-performance Java POS systems and immersive Next.js websites. We engineer scalable solutions for your business growth.",
    
    image = "/thumbnail.png",
    icons = [
        {
            rel: "apple-touch-icon",
            sizes: "32x32",
            url: "/apple-touch-icon.png"
        },
        {
            rel: "icon",
            sizes: "32x32",
            url: "/favicon-32x32.png"
        },
        {
            rel: "icon",
            sizes: "16x16",
            url: "/favicon-16x16.png"
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
    title,
    description,
    icons,
    openGraph: {
        title,
        description,
        ...(image && { images: [{ url: image }] }),
    },
    twitter: {
        title,
        description,
        ...(image && { card: "summary_large_image", images: [image] }),
        creator: "@nexcentauri", 
    },
    ...(noIndex && { robots: { index: false, follow: false } }),
});