"use client";

import { useMemo } from "react";

export function Particles({ count = 15 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 1 + Math.random() * 2,
        duration: 15 + Math.random() * 25,
        delay: Math.random() * 20,
        opacity: 0.15 + Math.random() * 0.25,
      })),
    [count]
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            bottom: "-10px",
            width: p.size,
            height: p.size,
            background: "var(--accent-gold)",
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            boxShadow: `0 0 ${p.size * 3}px rgba(201,168,76,0.3)`,
          }}
        />
      ))}
    </div>
  );
}
