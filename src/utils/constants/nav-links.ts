import { 
    Code2Icon, 
    GlobeIcon, 
    HelpCircleIcon, 
    NewspaperIcon, 
    PaletteIcon, 
    StoreIcon 
} from "lucide-react";

export const NAV_LINKS = [
    {
        title: "Services", 
        href: "/services",
        menu: [
            {
                title: "Web Development",
                tagline: "Cinematic, high-performance websites using Next.js & GSAP.",
                href: "/services/web-development",
                icon: GlobeIcon,
            },
            {
                title: "POS Systems",
                tagline: "Custom Java-based POS solutions for retail & inventory.",
                href: "/services/pos-systems",
                icon: StoreIcon,
            },
            {
                title: "Custom Software",
                tagline: "Scalable enterprise applications tailored to your business.",
                href: "/services/custom-software",
                icon: Code2Icon,
            },
            {
                title: "UI/UX Design",
                tagline: "Modern, user-centric interfaces designed in Figma.",
                href: "/services/design",
                icon: PaletteIcon,
            },
        ],
    },
    {
        title: "About Us", 
        href: "/about",
    },
    {
        title: "Resources",
        href: "/resources",
        menu: [
            {
                title: "Tech Blog",
                tagline: "Latest updates on Next.js, Java, and Tech trends.",
                href: "/resources/blog",
                icon: NewspaperIcon,
            },
            {
                title: "Support", 
                tagline: "Get technical support for your systems.",
                href: "/support",
                icon: HelpCircleIcon,
            },
        ]
    },
    {
        title: "Contact", 
        href: "/contact",
    },
];