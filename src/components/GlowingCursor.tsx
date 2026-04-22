"use client";

import React, { useEffect, useState } from "react";

export default function GlowingCursor() {
  const [position, setPosition] = useState({ x: -1000, y: -1000 }); // මුලින් එළියෙන් තියන්නේ

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
        // Transform එක පාවිච්චි කරලා ගොඩක් smooth විදිහට මවුස් එක පස්සෙන් එන්න හදලා තියෙන්නේ
        transform: `translate(${position.x - 250}px, ${position.y - 250}px)`,
        // රත්තරන් පාට (Gold) Glow එක ටිකක් වැඩි කළා හොඳට පේන්න
        background: "radial-gradient(circle, rgba(255, 215, 0, 0.12) 0%, rgba(255, 215, 0, 0) 60%)",
        transition: "transform 0.05s linear", // පොඩි delay එකක් දුන්නා smooth ගතිය වැඩි වෙන්න
      }}
    />
  );
}