import {
    Code2Icon,
    GlobeIcon,
    HelpCircleIcon,
    NewspaperIcon,
    PaletteIcon,
    Smartphone,
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
                title: "Mobile Applications",
                tagline: "Intuitive, cross-platform mobile apps built with React Native.",
                href: "/services/mobile-applications",
                icon: Smartphone,
            },
            {
                title: "Custom Software",
                tagline: "Scalable enterprise applications tailored to your business.",
                href: "/services/custom-software",
                icon: Code2Icon,
            },
            {
                title: "Graphics Design",
                tagline: "Create stunning graphics that capture attention.",
                href: "/services/grapics-design",
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