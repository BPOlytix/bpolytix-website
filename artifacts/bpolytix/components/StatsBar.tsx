"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { GrainOverlay } from "./GrainOverlay";

type Stat = {
  display: (current: number) => string;
  target: number;
  prefix?: string;
  suffix?: string;
  raw?: string;
  label: string;
};

const STATS: Stat[] = [
  {
    target: 70,
    display: (n) => `${Math.round(n)}%`,
    label: "average cost saving vs in-house",
  },
  {
    target: 0,
    display: () => "R0",
    raw: "R0",
    label: "to start your build",
  },
  {
    target: 12,
    display: (n) => `${Math.round(n)} months`,
    label: "until you own the software outright",
  },
  {
    target: 30,
    display: (n) => `${Math.round(n)} days`,
    label: "average delivery for Phase 1",
  },
];

function CountUp({ stat, inView }: { stat: Stat; inView: boolean }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (stat.raw) {
      setValue(stat.target);
      return;
    }
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const progress = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * stat.target);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, stat]);

  return (
    <span
      style={{
        fontFamily: "var(--font-syne)",
        fontSize: "48px",
        color: "#00D4AA",
        letterSpacing: "-0.022em",
        lineHeight: 1.0,
        fontWeight: 600,
      }}
    >
      {stat.raw ? stat.raw : stat.display(value)}
    </span>
  );
}

export function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: "#0F1622",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        paddingTop: "48px",
        paddingBottom: "48px",
      }}
    >
      <GrainOverlay />
      <div className="relative z-10 mx-auto max-w-[1440px] px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col items-start gap-3 px-6 py-4"
              style={{
                borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.08)" : "none",
              }}
            >
              <CountUp stat={stat} inView={inView} />
              <span
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "14px",
                  color: "#8892A4",
                  lineHeight: 1.5,
                }}
              >
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
