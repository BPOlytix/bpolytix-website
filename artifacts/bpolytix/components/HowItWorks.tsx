"use client";

import { motion } from "framer-motion";
import { GrainOverlay } from "./GrainOverlay";

const STEPS = [
  { num: "1.0", name: "Engage",  desc: "We scope your problem and confirm fit. No sales pressure." },
  { num: "2.0", name: "Map",     desc: "We map your workflow and define the build spec together." },
  { num: "3.0", name: "Build",   desc: "We build Phase 1 in Replit or VS Code. You watch progress." },
  { num: "4.0", name: "Refine",  desc: "You test it. We fix everything until you're satisfied." },
  { num: "5.0", name: "Satisfy", desc: "You confirm it works. Only then do we send an invoice." },
  { num: "6.0", name: "Own",     desc: "After 12 months, full ownership transfers. No licence fees ever." },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="hiw-section relative overflow-hidden"
      style={{ backgroundColor: "#0A0F1A" }}
    >
      <GrainOverlay />
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-8">
        <p
          className="mb-4 text-[13px]"
          style={{ color: "#8892A4", fontFamily: "var(--font-dm-sans)" }}
        >
          Process
        </p>
        <h2
          className="hiw-h2 max-w-[820px]"
          style={{
            fontFamily: "var(--font-syne)",
            color: "#F5F7FA",
            letterSpacing: "-0.022em",
            lineHeight: 1.0,
            fontWeight: 700,
          }}
        >
          From first call to software you own.
        </h2>

        {/* Timeline */}
        <div className="hiw-timeline relative">
          {/* Vertical spine — always visible, positioned relative to node dots */}
          <div
            className="absolute top-0 bottom-0 w-px"
            style={{
              left: "15px",
              backgroundColor: "rgba(255,255,255,0.08)",
            }}
          />

          <div className="flex flex-col">
            {STEPS.map((step, i) => {
              const isLast = i === STEPS.length - 1;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.4, delay: i * 0.09, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="hiw-step relative flex items-start"
                  style={{ paddingBottom: isLast ? 0 : undefined }}
                >
                  {/* Node */}
                  <div
                    className="relative z-10 hiw-node flex flex-none items-center justify-center rounded-full"
                    style={{
                      backgroundColor: "#0A0F1A",
                      border: "1px solid rgba(255,255,255,0.15)",
                    }}
                  >
                    <div className="hiw-dot rounded-full" style={{ backgroundColor: "#1B77F2" }} />
                  </div>

                  {/* Card */}
                  <div
                    className="hiw-card flex-1 rounded-xl"
                    style={{
                      backgroundColor: "#0F1622",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div
                      className="mb-2"
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "12px",
                        color: "#1B77F2",
                        letterSpacing: "0.06em",
                        fontWeight: 500,
                      }}
                    >
                      {step.num}&nbsp;&nbsp;{step.name.toUpperCase()}
                    </div>
                    <p
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "16px",
                        color: "#F5F7FA",
                        lineHeight: 1.6,
                        letterSpacing: "-0.011em",
                      }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Mobile */
        .hiw-section { padding-top: 64px; padding-bottom: 72px; }
        .hiw-h2 { font-size: 32px; margin-bottom: 48px; }
        .hiw-timeline { padding-left: 0; }
        .hiw-step { gap: 16px; padding-bottom: 20px; }
        .hiw-node { width: 32px; height: 32px; margin-top: 2px; flex-shrink: 0; }
        .hiw-dot { width: 8px; height: 8px; }
        .hiw-card { padding: 20px 20px; max-width: 100%; }

        /* Tablet+ */
        @media (min-width: 640px) {
          .hiw-h2 { font-size: 40px; margin-bottom: 56px; }
          .hiw-step { gap: 24px; padding-bottom: 28px; }
          .hiw-node { width: 36px; height: 36px; }
          .hiw-card { padding: 24px 28px; }
        }

        /* Desktop */
        @media (min-width: 1024px) {
          .hiw-section { padding-top: 96px; padding-bottom: 128px; }
          .hiw-h2 { font-size: 48px; margin-bottom: 80px; }
          .hiw-step { gap: 40px; padding-bottom: 40px; }
          .hiw-node { width: 40px; height: 40px; }
          .hiw-dot { width: 9px; height: 9px; }
          .hiw-card { padding: 28px 36px; max-width: 720px; }
        }
      `}</style>
    </section>
  );
}
