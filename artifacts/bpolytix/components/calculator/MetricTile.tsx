"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type MetricTileProps = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

export function MetricTile({
  label,
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}: MetricTileProps) {
  const [displayed, setDisplayed] = useState(value);
  const fromRef = useRef(value);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const from = fromRef.current;
    const to = value;
    if (from === to) return;
    const start = performance.now();
    const duration = 1200;

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = from + (to - from) * eased;
      setDisplayed(current);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        fromRef.current = to;
        rafRef.current = null;
      }
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      fromRef.current = displayed;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const formatted =
    decimals > 0
      ? displayed.toFixed(decimals)
      : Math.round(displayed).toLocaleString("en-ZA");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col gap-2 rounded-xl p-5"
      style={{
        backgroundColor: "#111F2E",
        border: "1px solid #1E2D3D",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: 13,
          color: "#8892A4",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "var(--font-syne)",
          fontSize: 28,
          fontWeight: 700,
          color: "#00D4AA",
          lineHeight: 1.1,
        }}
      >
        {prefix}
        {formatted}
        {suffix}
      </div>
    </motion.div>
  );
}
