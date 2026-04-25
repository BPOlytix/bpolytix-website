"use client";

import { motion } from "framer-motion";
import { BadgeCheck, KeyRound, Network, Scale } from "lucide-react";
import { GrainOverlay } from "./GrainOverlay";

const CARDS = [
  {
    icon: BadgeCheck,
    title: "No invoice until we deliver.",
    body: "We don't send a bill until you've reviewed the work and confirmed it works. That applies whether we built you software, closed your books, or onboarded a hire.",
  },
  {
    icon: KeyRound,
    title: "You own what we build.",
    body: "Every automation, every application, every website — yours fully after 12 months. No software licences. No platform fees. No subscription that creeps up forever.",
  },
  {
    icon: Network,
    title: "Four offices, one contract.",
    body: "Finance, AI, People, and Build. One partner manages all of it. One invoice, not five. One conversation when something needs to change.",
  },
  {
    icon: Scale,
    title: "SA rates. UK standards.",
    body: "South African operating costs. UK delivery process and professional standards. The arbitrage is real and it's the point.",
  },
];

export function TrustBlock() {
  return (
    <section
      className="trust-section relative overflow-hidden"
      style={{ backgroundColor: "#0A0F1A" }}
    >
      <GrainOverlay />
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-8">
        <p
          className="mb-4 text-[13px]"
          style={{ color: "#8892A4", fontFamily: "var(--font-dm-sans)" }}
        >
          Why it works
        </p>
        <h2
          className="trust-h2 max-w-[820px]"
          style={{
            fontFamily: "var(--font-syne)",
            color: "#F5F7FA",
            letterSpacing: "-0.022em",
            lineHeight: 1.0,
            fontWeight: 700,
          }}
        >
          The model is the proof.
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          {CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="trust-card glow-border rounded-xl"
                style={{
                  backgroundColor: "#0F1622",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Icon size={26} color="#00D4AA" strokeWidth={1.75} />
                <h3
                  className="mt-5"
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontSize: "20px",
                    color: "#F5F7FA",
                    lineHeight: 1.2,
                    letterSpacing: "-0.022em",
                    fontWeight: 600,
                  }}
                >
                  {card.title}
                </h3>
                <p
                  className="mt-3"
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "15px",
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

      <style jsx>{`
        .trust-section { padding-top: 64px; padding-bottom: 72px; }
        .trust-h2 { font-size: 32px; margin-bottom: 40px; }
        .trust-card { padding: 24px; }

        @media (min-width: 640px) {
          .trust-h2 { font-size: 40px; margin-bottom: 48px; }
          .trust-card { padding: 28px; }
        }

        @media (min-width: 1024px) {
          .trust-section { padding-top: 96px; padding-bottom: 128px; }
          .trust-h2 { font-size: 48px; margin-bottom: 64px; }
          .trust-card { padding: 32px; }
        }
      `}</style>
    </section>
  );
}
