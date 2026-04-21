"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { GrainOverlay } from "./GrainOverlay";

type Stat = {
  display: (current: number) => string;
  target: number;
  raw?: string;
  label: string;
};

const STATS: Stat[] = [
  { target: 70, display: (n) => `${Math.round(n)}%`,       label: "average cost saving vs in-house"     },
  { target: 0,  display: () => "R0", raw: "R0",            label: "to start your build"                 },
  { target: 12, display: (n) => `${Math.round(n)} months`, label: "until you own the software outright" },
  { target: 30, display: (n) => `${Math.round(n)} days`,   label: "average delivery for Phase 1"        },
];

function CountUp({ stat, inView }: { stat: Stat; inView: boolean }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (stat.raw) { setValue(stat.target); return; }
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
      className="stat-number"
      style={{
        fontFamily: "var(--font-syne)",
        color: "#00D4AA",
        letterSpacing: "-0.022em",
        lineHeight: 1.0,
        fontWeight: 600,
        fontFeatureSettings: '"zero" 1',
        fontVariantNumeric: "slashed-zero",
      }}
    >
      {stat.raw ? stat.raw : stat.display(value)}
    </span>
  );
}

export function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: "#0F1622",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <GrainOverlay />
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-8">
        {/* 2-col on mobile, 4-col on desktop */}
        <div className="stats-grid">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={`stat-cell stat-cell--${i} flex flex-col gap-2`}
            >
              <CountUp stat={stat} inView={inView} />
              <span
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "13px",
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

      <style jsx>{`
        /* Mobile: 2×2 grid */
        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 40px 0;
          gap: 0;
        }
        .stat-number { font-size: 40px; }
        .stat-cell {
          padding: 20px 20px;
        }
        /* Right-column cells get a left border */
        .stat-cell--1,
        .stat-cell--3 {
          border-left: 1px solid rgba(255,255,255,0.08);
        }
        /* Second row gets a top border */
        .stat-cell--2,
        .stat-cell--3 {
          border-top: 1px solid rgba(255,255,255,0.08);
        }

        /* Desktop: single row of 4 */
        @media (min-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(4, 1fr);
            padding: 48px 0;
          }
          .stat-number { font-size: 48px; }
          .stat-cell {
            padding: 16px 28px;
          }
          .stat-cell--0 { border-left: none; border-top: none; }
          .stat-cell--1 { border-left: 1px solid rgba(255,255,255,0.08); border-top: none; }
          .stat-cell--2 { border-left: 1px solid rgba(255,255,255,0.08); border-top: none; }
          .stat-cell--3 { border-left: 1px solid rgba(255,255,255,0.08); border-top: none; }
        }
      `}</style>
    </section>
  );
}
