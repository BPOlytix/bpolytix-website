"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Zap, Users, Layers, ArrowRight } from "lucide-react";
import { GrainOverlay } from "./GrainOverlay";

type Pillar = {
  icon: typeof BookOpen;
  name: string;
  tagline: string;
  desc: string;
  href: string;
};

const PILLARS: Pillar[] = [
  {
    icon: BookOpen,
    name: "Finance Office",
    tagline: "Your books, your payroll, your compliance — handled.",
    desc: "Bookkeeping, fractional CFO, payroll, Xero, and compliance-as-a-service. Dual-region UK and South Africa.",
    href: "/services/finance",
  },
  {
    icon: Zap,
    name: "AI & Automation Office",
    tagline: "Stop doing the same thing twice.",
    desc: "Workflow automation, AI agents, AI receptionist, and AI marketing operations. Fixed price. You own it after 12 months.",
    href: "/services/ai-automation",
  },
  {
    icon: Users,
    name: "People Office",
    tagline: "Hire right, stay compliant, grow your team.",
    desc: "Outsourced HR, onboarding, and Employer of Record on the SA↔UK corridor. The cross-border hiring others can't do cleanly.",
    href: "/services/people",
  },
  {
    icon: Layers,
    name: "Build Office",
    tagline: "We build it. You own it.",
    desc: "Custom web apps, Android apps, websites in three days, business plans, and growth pipeline work. Fixed-price, no lock-in.",
    href: "/services/build",
  },
];

export function ServicesBento() {
  return (
    <section
      className="bento-section relative overflow-hidden"
      style={{ backgroundColor: "#0A0F1A" }}
    >
      <GrainOverlay />
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-8">
        <p
          className="mb-4 text-[13px]"
          style={{ color: "#8892A4", fontFamily: "var(--font-dm-sans)" }}
        >
          Services
        </p>
        <h2
          className="bento-h2 max-w-[820px]"
          style={{
            fontFamily: "var(--font-syne)",
            color: "#F5F7FA",
            letterSpacing: "-0.022em",
            lineHeight: 1.0,
            fontWeight: 700,
          }}
        >
          Four offices. One partner.
        </h2>
        <p
          className="bento-sub max-w-[640px]"
          style={{
            fontFamily: "var(--font-dm-sans)",
            color: "#8892A4",
            lineHeight: 1.7,
            letterSpacing: "-0.011em",
          }}
        >
          Each office runs independently. Together they replace the back-office
          overhead you&apos;d otherwise hire, license, or piece together yourself.
        </p>

        <div className="pillars-grid">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.07,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="pillar-card"
                style={{
                  backgroundColor: "#0F1622",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                }}
              >
                <Link
                  href={p.href}
                  className="pillar-link flex h-full flex-col"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <div className="flex-1">
                    <Icon size={28} color="#1B77F2" strokeWidth={1.75} />
                    <h3
                      className="mt-5"
                      style={{
                        fontFamily: "var(--font-syne)",
                        fontSize: "22px",
                        color: "#F5F7FA",
                        lineHeight: 1.15,
                        letterSpacing: "-0.022em",
                        fontWeight: 600,
                      }}
                    >
                      {p.name}
                    </h3>
                    <p
                      className="mt-2"
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "14px",
                        color: "#00D4AA",
                        lineHeight: 1.5,
                        letterSpacing: "-0.011em",
                        fontWeight: 500,
                      }}
                    >
                      {p.tagline}
                    </p>
                    <p
                      className="mt-4"
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "15px",
                        color: "#8892A4",
                        lineHeight: 1.65,
                        letterSpacing: "-0.011em",
                      }}
                    >
                      {p.desc}
                    </p>
                  </div>
                  <div
                    className="view-office mt-6 inline-flex items-center gap-2"
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "14px",
                      color: "#1B77F2",
                      fontWeight: 500,
                    }}
                  >
                    View office
                    <ArrowRight size={14} strokeWidth={2} />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        /* Mobile — single column */
        .bento-section { padding-top: 64px; padding-bottom: 72px; }
        .bento-h2 { font-size: 32px; margin-bottom: 16px; }
        .bento-sub { font-size: 16px; margin-bottom: 40px; }
        .pillars-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
        }
        .pillar-card { padding: 28px 24px; }

        /* Tablet+ — 2×2 grid */
        @media (min-width: 640px) {
          .bento-h2 { font-size: 40px; }
          .bento-sub { font-size: 17px; margin-bottom: 48px; }
          .pillars-grid { grid-template-columns: 1fr 1fr; }
          .pillar-card { padding: 32px 28px; }
        }

        /* Desktop */
        @media (min-width: 1024px) {
          .bento-section { padding-top: 96px; padding-bottom: 128px; }
          .bento-h2 { font-size: 48px; margin-bottom: 20px; }
          .bento-sub { font-size: 18px; margin-bottom: 64px; }
          .pillar-card { padding: 40px 36px; }
        }

        .pillar-card {
          transition: transform 200ms ease, border-color 200ms ease;
        }
        .pillar-card:hover {
          transform: translateY(-4px);
          border-color: rgba(27, 119, 242, 0.3) !important;
        }
        .view-office {
          transition: color 200ms ease;
        }
        .pillar-card:hover .view-office {
          color: #00D4AA;
        }
      `}</style>
    </section>
  );
}
