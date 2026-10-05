"use client";

import React, { useEffect, useState } from "react";

export default function GlowingCursor() {
  const [position, setPosition] = useState({ x: -1000, y: -1000 }); 

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updatePosition);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 w-[500px] h-[500px] z-[9999] rounded-full"
      style={{
        
        transform: `translate(${position.x - 250}px, ${position.y - 250}px)`,
        
        background: "radial-gradient(circle, rgba(255, 215, 0, 0.12) 0%, rgba(255, 215, 0, 0) 60%)",
        transition: "transform 0.05s linear", 
      }}
    />
  );
}