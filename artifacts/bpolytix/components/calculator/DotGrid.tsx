"use client";

import { motion } from "framer-motion";

export function DotGrid() {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundColor: "#0D1B2A",
        pointerEvents: "none",
      }}
      aria-hidden
    >
      <motion.svg
        width="100%"
        height="100%"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          display: "block",
          maskImage:
            "linear-gradient(to bottom, black 60%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 60%, transparent 100%)",
        }}
      >
        <defs>
          <pattern
            id="dot-grid"
            x="0"
            y="0"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="12" cy="12" r="1.5" fill="#1B77F2" opacity="0.05" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid)" />
      </motion.svg>
    </div>
  );
}
