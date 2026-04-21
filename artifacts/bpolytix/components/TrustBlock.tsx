"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Key, Clock, Globe } from "lucide-react";
import { GrainOverlay } from "./GrainOverlay";

const CARDS = [
  {
    icon: ShieldCheck,
    title: "No invoice until you're satisfied.",
    body: "We don't send a bill until you've tested the build and confirmed it works. That's the whole model.",
  },
  {
    icon: Key,
    title: "You own the code after 12 months.",
    body: "No software licences. No SaaS dependency. The IP transfers to you. Full stop.",
  },
  {
    icon: Clock,
    title: "First month is always free.",
    body: "Every engagement starts with a free month. If it's not right, you walk away. No contracts signed yet.",
  },
  {
    icon: Globe,
    title: "Built for SA costs. Scoped for UK standards.",
    body: "South African development rates. UK-grade delivery process. The arbitrage is the point.",
  },
];

export function TrustBlock() {
  return (
    <section
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
          Why it works
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
          The model is the proof.
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="rounded-xl p-8"
                style={{
                  backgroundColor: "#0F1622",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Icon size={28} color="#00D4AA" strokeWidth={1.75} />
                <h3
                  className="mt-6"
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontSize: "22px",
                    color: "#F5F7FA",
                    lineHeight: 1.2,
                    letterSpacing: "-0.022em",
                    fontWeight: 600,
                  }}
                >
                  {card.title}
                </h3>
                <p
                  className="mt-4"
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "16px",
                    color: "#8892A4",
                    lineHeight: 1.7,
                    letterSpacing: "-0.011em",
                  }}
                >
                  {card.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
