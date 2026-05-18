"use client";

import { useEffect, useState } from "react";
import { PERSON } from "@/lib/data/person";

export function RotatingRoles() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % PERSON.rotatingRoles.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="inline-block min-w-[14ch]">
      <span
        key={idx}
        className="bg-gradient-to-r from-saffron via-neon-magenta to-neon-cyan bg-clip-text text-transparent text-glow"
      >
        {PERSON.rotatingRoles[idx]}
      </span>
    </span>
  );
}
