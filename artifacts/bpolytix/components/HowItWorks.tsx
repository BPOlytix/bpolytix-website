"use client";

import { motion } from "framer-motion";
import { GrainOverlay } from "./GrainOverlay";

const STEPS = [
  { num: "1.0", name: "Engage", desc: "We scope your problem and confirm fit. No sales pressure." },
  { num: "2.0", name: "Map", desc: "We map your workflow and define the build spec together." },
  { num: "3.0", name: "Build", desc: "We build Phase 1 in Replit or VS Code. You watch progress." },
  { num: "4.0", name: "Refine", desc: "You test it. We fix everything until you're satisfied." },
  { num: "5.0", name: "Satisfy", desc: "You confirm it works. Only then do we send an invoice." },
  { num: "6.0", name: "Own", desc: "After 12 months, full ownership transfers. No licence fees ever." },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#0A0F1A",
        paddingTop: "96px",
        paddingBottom: "128px",
      }}
    >
      <GrainOverlay />
      <div className="relative z-10 mx-auto max-w-[1440px] px-8">
        <p
          className="mb-4 text-[13px]"
          style={{ color: "#8892A4", fontFamily: "var(--font-dm-sans)" }}
        >
          Process
        </p>
        <h2
          className="mb-16 max-w-[820px]"
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(32px, 5vw, 48px)",
            color: "#F5F7FA",
            letterSpacing: "-0.022em",
            lineHeight: 1.0,
            fontWeight: 700,
          }}
        >
          From first call to software you own.
        </h2>

        <div className="grid grid-cols-1 gap-px md:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="relative p-8"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.08)",
                borderRight:
                  (i + 1) % 3 === 0 ? "none" : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div
                className="mb-4"
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "13px",
                  color: "#8892A4",
                  letterSpacing: "0.02em",
                }}
              >
                {step.num} {step.name}
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
