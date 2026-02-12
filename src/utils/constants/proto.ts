import { Code2, PencilRuler, Rocket, WandSparklesIcon } from "lucide-react";

export const DEFAULT_AVATAR_URL = "https://api.dicebear.com/8.x/initials/svg?backgroundType=gradientLinear&backgroundRotation=0,360&seed=";

export const PAGINATION_LIMIT = 10;

export const COMPANIES = [
    {
        name: "Next.js",
        logo: "/assets/next-js-seeklogo.svg",
    },
    {
        name: "Java",
        logo: "/assets/java.svg",
    },
    {
        name: "React Native",
        logo: "/assets/react-native.svg",
    },
    {
        name: "Type Script",
        logo: "/assets/type-script.svg",
    },
    {
        name: "Tailwind Css",
        logo: "/assets/tailwind-css.svg",
    },
    {
        name: "Netbeans",
        logo: "/assets/netbeans.svg",
    }
] as const;

export const PROCESS = [
    {
        title: "Discovery & Design",
        description: "We analyze your requirements and design stunning prototypes using Figma to visualize the final product.",
        icon: PencilRuler,
    },
    {
        title: "Develop & Test",
        description: "Our full-stack engineers build your system using robust technologies like Java and Next.js, ensuring zero bugs.",
        icon: Code2,
    },
    {
        title: "Deploy & Support",
        description: "We launch your software to the cloud and provide ongoing support to ensure everything runs smoothly.",
        icon: Rocket,
    },
] as const;

export const TEAMMEMBERS = [
    {
        name: "Manisi Prabodani",
        role: "Founder & UI/UX Designer",
        description: "Responsible for planning future growth, guiding development, and leading the team to build user-focused, scalable digital solutions.",
        image: "/team/manisi-prabodini.jpg",
        links: {
            linkedin: "https://www.linkedin.com/in/manisi-prabodani-50b791252?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
            github: "https://github.com/manisiprabodani",
            facebook: "https://www.facebook.com/share/179kLXEHbY/"
        }
    },
    {
        name: "Thisaga Narayana",
        role: "Co-Founder & Project Manager",
        description: "I specialize in managing end-to-end development processes, specifically in Java-based desktop solutions and modern web technologies like Next.js. Beyond coding, I lead project strategy, team coordination, and client relations at Nexcentauri.",
        image: "/team/thisanga-narayana.jpg",
        links: {
            linkedin: "https://www.linkedin.com/in/thisaga-narayana-35a060342?utm_source=share_via&utm_content=profile&utm_medium=member_android",
            github: "https://github.com/nthisaga/nthisaga/compare",
            facebook: "https://web.facebook.com/thisaga.narayana"
        }
    },
    {
        name: "Sachith Gunarathna",
        role: "Lead Software Engineer",
        description: "Lead Software Engineer | Nexcentauri. Full-Stack Developer dedicated to building high-impact software solutions. From Java desktop applications to responsive web platforms, I turn complex requirements into high-performance code.",
        image: "/team/sachith-gunarathna.jpg",
        links: {
            linkedin: "https://www.linkedin.com/in/sachith-ng/",
            github: "https://github.com/Sachith-Gunarathna",
            facebook: "https://web.facebook.com/sachith.niromal.10"
        }
    },
    {
        name: "Akash Amarasinghe",
        role: "Senior Software Engineer",
        description: "Senior Software Engineer, I am responsible for the technical architecture and long-term scalability of the solutions we build at Nexcentauri.",
        image: "/team/akash-amarasinghe.jpg",
        links: {
            linkedin: "https://www.linkedin.com/in/akash-amarasinghe-12b447390/",
            github: "https://github.com/Akash200560",
            facebook: "https://web.facebook.com/akash.amarasinghe.2025"
        }
    },

    {
        name: "Vihanga Manukulasooriya",
        role: "Senior Software Engineer",
        description: "I have a proven track record of developing end-to-end applications, including advanced POS systems and cinematic web experiences using Next.js and React.",
        image: "/team/84dbdd38-ebed-4372-898e-806f70519c6b.jpg",
        links: {
            linkedin: "https://www.linkedin.com/in/vihanga-thathsara-38b174314/",
            github: "https://github.com/VihangaThathsara",
            facebook: "https://www.facebook.com/share/18Ns2CGmnk/"
        }
    },
    {
        name: "Pandula Bandara",
        role: "Senior Software Engineer",
        description: "Proficient in JavaScript, Java, PHP, Python, and C#, with solid experience working with SQL databases and Apache-based environments. Focused on writing clean, reliable code and growing skills in backend architecture and system design.",
        image: "/team/pandula-bandara.jpeg",
        links: {
            linkedin: "#",
            github: "https://github.com/PandulaB",
            facebook: "https://web.facebook.com/pandula.bandara.161"
        }
    },

] as const;

export const REVIEWS = [
    {
        name: "Kasun Perera – Business Owner, Colombo (System)",
        // username: "@michaelsmith",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        rating: 5,
        review: "Nexcentuari built a custom system that perfectly matched our workflow. It reduced manual work and helped our team operate much more efficiently."
    },
    {
        name: "Nimali Jayasinghe – Business Owner, Kandy (System)",
        // username: "@emilyjohnson",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        rating: 4,
        review: "We had many process issues before. After implementing their system, tracking and reporting became simple and accurate. Very professional approach."
    },
    {
        name: "Nimeshi Silva – Business Owner, Galle (System)",
        // username: "@danielwilliams",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        rating: 5,
        review: "What we liked most was that the system was built specifically for us, not a template. It’s easy to use and ready to scale as our business grows."
    },
    {
        name: "Isuru Fernando – IT Coordinator, Colombo (System)",
        // username: "@sophiabrown",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        rating: 4,
        review: "Strong planning, clean UI, and reliable performance. Nexcentuari delivered exactly what was promised and supported us well after launch."
    },
    {
        name: "Sachini Weerasinghe – Marketing Executive, Negombo (Website)",
        // username: "@jamestaylor",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg",
        rating: 5,
        review: "Our website now looks modern, fast, and professional. The UI/UX clearly represents our brand and improved customer engagement."
    },
    {
        name: "Ravindu Karunaratne – Founder, Kurunegala (Website)",
        // username: "@oliviamartinez",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        rating: 4,
        review: "Nexcentuari understood our vision and translated it into a clean, responsive website. The design quality exceeded our expectations."
    },

] as const;

export const Projects = [
    {
        title: "Nexcentuari Corporate Site",
        description: "A high-performance cinematic website built with Next.js and GSAP, focused on engineering excellence and modern animations.",
        tags: ["Next.js", "GSAP", "Tailwind"],
        id: "web-project"
    },
    {
        title: "International School Of Sport Science Web Application",
        description: "A comprehensive educational ecosystem integrating an automated student management system with a secure eCommerce platform for academic resources.",
        tags: ["PHP", "Bootstrap 5", "SQL"],
        id: "web-project"
    },
    {
        title: "RavanaX Corporate Site",
        description: "A modern corporate website showcasing RavanaX's services and achievements, built with a focus on performance and user experience.",
        tags: ["Bootstrap 5"],
        id: "web-project"
    },
    {
        title: "Smart Zone E-Commerce Platform",
        description: "A modern e-commerce platform providing a seamless shopping experience with secure payment integration and responsive design.",
        tags: ["PHP", "Bootstrap 5", "SQL"],
        id: "web-project"
    },
    {
        title: "Dharmasiri Senanayake Central College Web Application",
        description: "A comprehensive web application for Dharmasiri Senanayake Central College, integrating student management, academic resources, and communication tools.",
        tags: ["PHP", "Bootstrap 5", "SQL"],
        id: "web-project"
    },
    {
        title: "POS System",
        description: "A point-of-sale system designed to streamline retail operations, manage inventory, and provide real-time sales analytics.",
        tags: ["Java", "Spring Boot", "MySQL"],
        id: "custom-software-project"
    },
    {
        title: "SPARK Chat Application",
        description: "A chat application designed to provide seamless communication with real-time messaging, multimedia sharing, and secure user authentication.",
        tags: ["Java", "React Native", "MySQL"],
        id: "mobile-application"
    },

] as const;


    

