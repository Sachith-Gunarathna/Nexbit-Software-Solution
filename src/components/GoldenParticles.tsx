"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function GoldenParticles() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      
      className="absolute inset-0 -z-10 pointer-events-none" 
      options={{
        background: {
          color: { value: "transparent" },
        },
        fpsLimit: 60,
        particles: {
          color: { value: "#FFD700" }, 
          move: {
            direction: "none",
            enable: true,
            outModes: { default: "bounce" }, 
            random: true,
            speed: 0.5, 
            straight: false,
          },
          number: {
            density: { enable: true, width: 800, height: 800 },
            value: 40, 
          },
          opacity: {
            value: { min: 0.1, max: 0.5 },
            animation: { enable: true, speed: 1, sync: false }, 
          },
          shape: { type: "circle" },
          size: {
            value: { min: 1, max: 3 }, 
          },
        },
        detectRetina: true,
      }}
    />
  );
}