import React, { useMemo } from "react";

export default function StarryBackground({ count = 100 }) {
  // Generate stars once
  const stars = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * 2 + 1;          // 1–3px
      const top = Math.random() * 100;             // %
      const left = Math.random() * 100;            // %
      const duration = Math.random() * 5 + 3;      // 3–8s
      const delay = Math.random() * 3;             // 0–3s
      return { id: i, size, top, left, duration, delay };
    });
  }, [count]);

  return (
    <div className="starry-background">
      {stars.map(s => (
        <div
          key={s.id}
          className="star"
          style={{
            width: s.size,
            height: s.size,
            top: `${s.top}%`,
            left: `${s.left}%`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
