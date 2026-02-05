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
        description: "I specialize in managing end-to-end development processes, specifically in Java-based desktop solutions and modern web technologies like Next.js. Beyond coding, I lead project strategy, team coordination, and client relations at Nexbir Software Solution.",
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
        name: "Michael Smith",
        username: "@michaelsmith",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        rating: 5,
        review: "This tool is a lifesaver! Managing and tracking my links has never been easier. A must-have for anyone dealing with numerous links."
    },
    {
        name: "Emily Johnson",
        username: "@emilyjohnson",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        rating: 4,
        review: "Very useful app! It has streamlined my workflow considerably. A few minor bugs, but overall a great experience."
    },
    {
        name: "Daniel Williams",
        username: "@danielwilliams",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        rating: 5,
        review: "I've been using this app daily for months. The insights and analytics it provides are invaluable. Highly recommend it!"
    },
    {
        name: "Sophia Brown",
        username: "@sophiabrown",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        rating: 4,
        review: "This app is fantastic! It offers everything I need to manage my links efficiently."
    },
    {
        name: "James Taylor",
        username: "@jamestaylor",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        rating: 5,
        review: "Absolutely love this app! It's intuitive and feature-rich. Has significantly improved how I manage and track links."
    },
    {
        name: "Olivia Martinez",
        username: "@oliviamartinez",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg",
        rating: 4,
        review: "Great app with a lot of potential. It has already saved me a lot of time. Looking forward to future updates and improvements."
    },
    {
        name: "William Garcia",
        username: "@williamgarcia",
        avatar: "https://randomuser.me/api/portraits/men/4.jpg",
        rating: 5,
        review: "This app is a game-changer for link management. It's easy to use, extremely powerful and highly recommended!"
    },
    {
        name: "Mia Rodriguez",
        username: "@miarodriguez",
        avatar: "https://randomuser.me/api/portraits/women/4.jpg",
        rating: 4,
        review: "I've tried several link management tools, but this one stands out. It's simple, effective."
    },
    {
        name: "Henry Lee",
        username: "@henrylee",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg",
        rating: 5,
        review: "This app has transformed my workflow. Managing and analyzing links is now a breeze. I can't imagine working without it."
    },
] as const;
