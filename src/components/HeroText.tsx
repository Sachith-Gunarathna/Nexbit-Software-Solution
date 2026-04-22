"use client";

import { motion } from "framer-motion";

export default function HeroText() {
  // Animation එකේ වේගය සහ රටාව (Settings)
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // එක වචනයකට පස්සේ ඊළඟ වචනය එන්න තියෙන පරතරය
        delayChildren: 0.2,   // සයිට් එක ලෝඩ් වෙලා තත්පර 0.2කින් animation එක පටන් ගන්නවා
      },
    },
  };

  const wordAnimation = {
    hidden: { opacity: 0, y: 30 }, // මුලින් පේන්නේ නෑ, ටිකක් පහළින් තියෙන්නේ
    visible: {
      opacity: 1,
      y: 0, // උඩට එනවා
      transition: { duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] }, // මාරම Smooth විදිහට උඩට එන්න
    },
  };

  const firstPart = "Turn Your Vision into a".split(" ");
  const gradientPart = "Digital Reality";

  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="visible"
      className="text-foreground text-center py-6 text-5xl font-medium tracking-normal text-balance sm:text-6xl md:text-7xl lg:text-8xl !leading-[1.15] w-full font-heading flex flex-wrap justify-center"
    >
      {firstPart.map((word, index) => (
        <motion.span key={index} variants={wordAnimation} className="inline-block mr-3 md:mr-4">
          {word}
        </motion.span>
      ))}
      
      {/* රෝස/දම් පාටින් තියෙන කොටස */}
      <motion.span variants={wordAnimation} className="inline-block">
        <span className="text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text">
          {gradientPart}
        </span>
      </motion.span>
    </motion.h1>
  );
}