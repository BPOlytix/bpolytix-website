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
          className="mb-20 max-w-[820px]"
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

        {/* Vertical timeline */}
        <div className="relative">
          {/* Vertical spine */}
          <div
            className="absolute left-[19px] top-0 bottom-0 hidden w-px md:block"
            style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
          />

          <div className="flex flex-col gap-0">
            {STEPS.map((step, i) => {
              const isLast = i === STEPS.length - 1;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.45,
                    delay: i * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="relative flex gap-8 md:gap-12"
                  style={{
                    paddingBottom: isLast ? 0 : "48px",
                  }}
                >
                  {/* Node + connector */}
                  <div className="relative hidden flex-none md:flex" style={{ width: "40px" }}>
                    {/* Dot */}
                    <div
                      className="relative z-10 mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full"
                      style={{
                        backgroundColor: "#0F1622",
                        border: "1px solid rgba(255,255,255,0.12)",
                      }}
                    >
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: "#1B77F2" }}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className="flex-1 rounded-xl p-8"
                    style={{
                      backgroundColor: "#0F1622",
                      border: "1px solid rgba(255,255,255,0.08)",
                      maxWidth: "760px",
                    }}
                  >
                    <div
                      className="mb-3"
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "13px",
                        color: "#1B77F2",
                        letterSpacing: "0.04em",
                        fontWeight: 500,
                      }}
                    >
                      {step.num}&nbsp;&nbsp;{step.name.toUpperCase()}
                    </div>
                    <p
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "17px",
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
    </section>
  );
}
