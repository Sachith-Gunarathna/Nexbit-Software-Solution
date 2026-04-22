"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function GoldenParticles() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // loadSlim පාවිච්චි කරන්නේ සයිට් එක slow වෙන්නේ නැති වෙන්න අවශ්‍යම දේවල් ටික විතරක් ගන්නයි
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      // සයිට් එකේ පිටිපස්සෙන් පේන්න සහ Button click කරන්න බාධා නොවන විදිහට -z-10 සහ pointer-events-none දුන්නා
      className="absolute inset-0 -z-10 pointer-events-none" 
      options={{
        background: {
          color: { value: "transparent" },
        },
        fpsLimit: 60,
        particles: {
          color: { value: "#FFD700" }, // රත්තරන් පාට
          move: {
            direction: "none",
            enable: true,
            outModes: { default: "bounce" }, // කෙළවරට ගියාම ආයෙත් හැරිලා එනවා
            random: true,
            speed: 0.5, // ගොඩක් හෙමින් පාවෙන්නේ cinematic look එකට
            straight: false,
          },
          number: {
            density: { enable: true, width: 800, height: 800 },
            value: 40, // අංශු 40ක් විතරයි තියෙන්නේ (ගොඩක් පිරෙව්වොත් කැත වෙනවා)
          },
          opacity: {
            value: { min: 0.1, max: 0.5 },
            animation: { enable: true, speed: 1, sync: false }, // තරු වගේ නිවී නිවී පත්තු වෙනවා
          },
          shape: { type: "circle" },
          size: {
            value: { min: 1, max: 3 }, // අංශු වල ප්‍රමාණය
          },
        },
        detectRetina: true,
      }}
    />
  );
}