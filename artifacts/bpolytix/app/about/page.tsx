"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { GrainOverlay } from "@/components/GrainOverlay";
import { Reveal } from "@/components/Reveal";

const SECTION_PAD = "py-20 lg:py-28";

const TEXT = "#F5F7FA";
const MUTED = "#8892A4";
const BG = "#0D1B2A";
const SURFACE = "#111F2E";
const ACCENT = "#1B77F2";
const HIGHLIGHT = "#00D4AA";
const BORDER = "#1E2D3D";

const SYNE = "var(--font-syne)";
const DM = "var(--font-dm-sans)";

const EYEBROW: React.CSSProperties = {
  fontFamily: DM,
  fontSize: 13,
  color: MUTED,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};

const H2: React.CSSProperties = {
  fontFamily: SYNE,
  color: TEXT,
  fontWeight: 700,
  letterSpacing: "-0.022em",
  lineHeight: 1.05,
  fontSize: "clamp(28px, 4vw, 44px)",
};

const BODY: React.CSSProperties = {
  fontFamily: DM,
  fontSize: 17,
  color: MUTED,
  lineHeight: 1.7,
  letterSpacing: "-0.011em",
};

/* ---------------- HERO BACKGROUND (pulsing SVG nodes) ---------------- */

const HERO_NODES = [
  { x: 80, y: 60 }, { x: 200, y: 110 }, { x: 320, y: 70 }, { x: 440, y: 130 },
  { x: 560, y: 80 }, { x: 680, y: 140 }, { x: 800, y: 90 }, { x: 920, y: 150 },
  { x: 140, y: 200 }, { x: 260, y: 250 }, { x: 380, y: 210 }, { x: 500, y: 270 },
  { x: 620, y: 220 }, { x: 740, y: 280 }, { x: 860, y: 230 }, { x: 60, y: 320 },
  { x: 180, y: 360 }, { x: 300, y: 320 }, { x: 420, y: 380 }, { x: 540, y: 330 },
  { x: 660, y: 390 }, { x: 780, y: 340 }, { x: 900, y: 400 },
];
const HERO_LINES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7],
  [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14],
  [15, 16], [16, 17], [17, 18], [18, 19], [19, 20], [20, 21], [21, 22],
  [0, 8], [2, 10], [4, 12], [6, 14], [8, 15], [10, 17], [12, 19], [14, 21],
];

function HeroBackground() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1000 460"
      preserveAspectRatio="xMidYMid slice"
      style={{ zIndex: 0 }}
    >
      {HERO_LINES.map(([a, b], i) => (
        <line
          key={i}
          x1={HERO_NODES[a].x} y1={HERO_NODES[a].y}
          x2={HERO_NODES[b].x} y2={HERO_NODES[b].y}
          stroke={BORDER} strokeWidth={1}
        />
      ))}
      {HERO_NODES.map((n, i) => (
        <circle
          key={i}
          cx={n.x} cy={n.y} r={3}
          fill={ACCENT}
          style={{
            opacity: 0.3,
            transformOrigin: `${n.x}px ${n.y}px`,
            animation: `bpx-node-pulse 3s ease-in-out ${(i % 7) * 0.4}s infinite`,
          }}
        />
      ))}
    </svg>
  );
}

/* ---------------- SECTION 1 — HERO ---------------- */

function HeroSection() {
  return (
    <section className={`relative overflow-hidden ${SECTION_PAD}`} style={{ backgroundColor: BG }}>
      <GrainOverlay />
      <HeroBackground />
      <div className="relative z-10 mx-auto max-w-[1440px] px-8 text-center">
        <Reveal>
          <p style={{ ...EYEBROW, marginBottom: 16 }}>Our story</p>
          <h1
            style={{
              fontFamily: SYNE,
              color: TEXT,
              fontWeight: 700,
              letterSpacing: "-0.022em",
              lineHeight: 1.05,
              fontSize: "clamp(36px, 6.5vw, 72px)",
              maxWidth: 880,
              margin: "0 auto",
            }}
          >
            Built by business owners. For business owners.
          </h1>
          <p
            style={{
              fontFamily: DM,
              fontSize: 20,
              color: MUTED,
              lineHeight: 1.6,
              maxWidth: 640,
              margin: "24px auto 0",
            }}
          >
            We&apos;ve worked in the trenches — across industries, across continents. We know what
            breaks a growing business, and we built BPOLytix to fix it.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- SECTION 2 — WHY (with bridge SVG) ---------------- */

function BridgeDiagram() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.4 });
  const [labelRevealed, setLabelRevealed] = useState(false);
  const bridgeLen = 200;

  useEffect(() => {
    if (inView && !labelRevealed) setLabelRevealed(true);
  }, [inView, labelRevealed]);

  return (
    <svg
      ref={ref}
      viewBox="0 0 360 320"
      className="w-full max-w-[420px]"
      aria-hidden
    >
      {/* Left side label */}
      <text x="60" y="24" fill={MUTED} fontSize="11" fontFamily="var(--font-dm-sans)" letterSpacing="2">
        ENTERPRISE
      </text>
      {/* Right side label */}
      <text x="240" y="24" fill={MUTED} fontSize="11" fontFamily="var(--font-dm-sans)" letterSpacing="2">
        STARTUPS
      </text>

      {/* Left column: 3 connected nodes flowing down */}
      {[80, 160, 240].map((y, i, arr) => (
        <g key={`L${i}`}>
          {i < arr.length - 1 && (
            <line x1="80" y1={y + 8} x2="80" y2={arr[i + 1] - 8} stroke={ACCENT} strokeWidth="1.5" />
          )}
          <circle cx="80" cy={y} r="8" fill={ACCENT} opacity={0.85} />
        </g>
      ))}

      {/* Right column: 3 disconnected/broken nodes */}
      {[80, 160, 240].map((y, i) => (
        <g key={`R${i}`} opacity={0.6}>
          <circle cx="280" cy={y} r="7" fill="none" stroke={MUTED} strokeWidth="1.5" strokeDasharray="3 3" />
        </g>
      ))}

      {/* Bridge — animates on scroll via stroke-dashoffset */}
      <motion.path
        d="M 88 160 Q 180 110 272 160"
        fill="none"
        stroke={HIGHLIGHT}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={bridgeLen}
        initial={{ strokeDashoffset: bridgeLen }}
        animate={inView ? { strokeDashoffset: 0 } : { strokeDashoffset: bridgeLen }}
        transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
      />
      {/* Bridge label */}
      <motion.text
        x="180" y="100" textAnchor="middle"
        fill={HIGHLIGHT} fontSize="13" fontFamily="var(--font-dm-sans)" fontWeight="500"
        initial={{ opacity: 0 }}
        animate={labelRevealed ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: labelRevealed && !inView ? 0 : 1.4 }}
      >
        BPOLytix
      </motion.text>
    </svg>
  );
}

function WhySection() {
  return (
    <section className={`relative overflow-hidden ${SECTION_PAD}`} style={{ backgroundColor: BG }}>
      <GrainOverlay />
      <Reveal delay={0.1} className="relative z-10 mx-auto max-w-[1440px] px-8">
        <div className="why-grid">
          <div>
            <p style={{ ...EYEBROW, marginBottom: 16 }}>AI era</p>
            <h2 style={H2}>Why we built this.</h2>
            <div className="mt-7 flex flex-col gap-5">
              <p style={BODY}>
                Every major shift in how the world works has created the same problem: businesses
                that kept doing things the old way fell behind. The ones that adapted early —
                hired the right people, used the right tools, and cut the work that no longer
                needed a human — pulled ahead.
              </p>
              <p style={BODY}>
                We&apos;re in that shift right now. AI is changing what back office work looks
                like. The businesses that figure this out in the next two years will run leaner,
                move faster, and spend less than their competitors.
              </p>
              <p style={BODY}>
                BPOLytix was built for that moment. We handle the finance, the compliance, the
                people operations, and the technology — so our clients can focus on the work that
                actually grows their business.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <BridgeDiagram />
          </div>
        </div>
      </Reveal>
      <style jsx>{`
        .why-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .why-grid {
            grid-template-columns: 55% 45%;
            gap: 64px;
          }
        }
      `}</style>
    </section>
  );
}

/* ---------------- SECTION 3 — WHAT MAKES US DIFFERENT ---------------- */

const PLATFORMS = [
  "Finance Office", "Bookkeeping", "Payroll", "CFO", "Xero", "Compliance",
  "AI & Automation Office", "Workflow automation", "AI agents", "AI receptionist", "AI marketing ops",
  "People Office", "Employer of record", "Outsourced HR", "Onboarding",
  "Build Office", "Web apps", "Mobile apps", "Websites", "Business plans", "Business development",
];

function DifferentSection() {
  return (
    <section className={`relative overflow-hidden ${SECTION_PAD}`} style={{ backgroundColor: BG }}>
      <GrainOverlay />
      <Reveal delay={0.1} className="relative z-10 mx-auto max-w-[1440px] px-8">
        <div
          className="rounded-2xl"
          style={{
            backgroundColor: SURFACE,
            border: `1px solid ${BORDER}`,
            padding: "clamp(32px, 5vw, 64px)",
          }}
        >
          <p style={{ ...EYEBROW, marginBottom: 16 }}>Our approach</p>
          <h2 style={{ ...H2, maxWidth: 820 }}>
            Four offices. One back office partner.
          </h2>
          <div className="mt-7 flex flex-col gap-5" style={{ maxWidth: 820 }}>
            <p style={BODY}>
              Finance Office covers bookkeeping, payroll, CFO support, Xero, and compliance. AI
              &amp; Automation Office covers workflow automation, AI agents, AI receptionist, and AI
              marketing ops.
            </p>
            <p style={BODY}>
              People Office covers employer of record, outsourced HR, and onboarding. Build Office
              covers web apps, mobile apps, websites, business plans, and business development.
            </p>
          </div>

          <div className="mt-10">
            <p
              style={{
                fontFamily: DM,
                fontSize: 11,
                color: MUTED,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom: 12,
              }}
            >
              Offices under one roof
            </p>
            <div className="ticker-wrap" aria-hidden>
              <div className="ticker-track">
                {[...PLATFORMS, ...PLATFORMS].map((p, i) => (
                  <span key={i} className="ticker-item">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <style jsx>{`
        .ticker-wrap {
          overflow: hidden;
          mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
        }
        .ticker-track {
          display: flex;
          width: max-content;
          gap: 48px;
          animation: bpx-ticker 30s linear infinite;
        }
        .ticker-item {
          font-family: ${DM};
          font-size: 13px;
          color: ${MUTED};
          white-space: nowrap;
          flex: none;
        }
      `}</style>
    </section>
  );
}

/* ---------------- SECTION 4 — WHO WE SERVE ---------------- */

function WhoSection() {
  return (
    <section className={`relative overflow-hidden ${SECTION_PAD}`} style={{ backgroundColor: BG }}>
      <GrainOverlay />
      <Reveal delay={0.1} className="relative z-10 mx-auto max-w-[1440px] px-8">
        <div className="who-grid">
          {/* Left: location cards */}
          <div className="flex flex-col gap-4">
            {[
              { flag: "🇿🇦", label: "South Africa", sub: "Cape Town · Johannesburg · Remote" },
              { flag: "🇬🇧", label: "United Kingdom", sub: "London · Manchester · Remote" },
            ].map((loc) => (
              <div
                key={loc.label}
                tabIndex={0}
                className="glow-border card-hover"
                style={{
                  backgroundColor: SURFACE,
                  borderRadius: 12,
                  padding: 24,
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <span style={{ fontSize: 36, lineHeight: 1 }}>{loc.flag}</span>
                <div>
                  <div style={{ fontFamily: SYNE, fontSize: 20, color: TEXT, fontWeight: 700, letterSpacing: "-0.022em" }}>
                    {loc.label}
                  </div>
                  <div style={{ fontFamily: DM, fontSize: 14, color: MUTED, marginTop: 4 }}>
                    {loc.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: text */}
          <div>
            <p style={{ ...EYEBROW, marginBottom: 16 }}>Built for SA startups. Trusted by UK SMEs.</p>
            <h2 style={H2}>
              South African startups. UK SMEs. Businesses that can&apos;t afford to wait.
            </h2>
            <div className="mt-7 flex flex-col gap-5">
              <p style={BODY}>
                Founders don&apos;t have time to raise capital just to pay for a developer, a
                marketer, and a bookkeeper. They need a trusted partner who understands business —
                not just technology.
              </p>
              <p style={BODY}>
                We&apos;ve worked across industries, managed complex financial operations, and
                served clients who needed results, not roadmaps. That experience is what we bring to
                every engagement. We understand workflows, we know where the bottlenecks are, and we
                know how to fix them without burning your runway.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
      <style jsx>{`
        .who-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .who-grid {
            grid-template-columns: 1fr 1fr;
            gap: 64px;
          }
        }
      `}</style>
    </section>
  );
}

/* ---------------- SECTION 5 — STATS ---------------- */

type AboutStat = { value: string; label: string; numericTarget?: number; suffix?: string };
const ABOUT_STATS: AboutStat[] = [
  { value: "12+", label: "Years combined business experience", numericTarget: 12, suffix: "+" },
  { value: "4", label: "Offices under one roof", numericTarget: 4 },
  { value: "R0", label: "To get started" },
  { value: "12", label: "Months to full ownership", numericTarget: 12 },
];

function CountStat({ stat, inView }: { stat: AboutStat; inView: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView || stat.numericTarget == null) return;
    const dur = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(eased * stat.numericTarget!);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, stat]);

  const display = stat.numericTarget == null ? stat.value : `${Math.round(n)}${stat.suffix ?? ""}`;
  return (
    <span
      style={{
        fontFamily: SYNE,
        fontSize: "clamp(40px, 6vw, 56px)",
        color: HIGHLIGHT,
        fontWeight: 700,
        letterSpacing: "-0.022em",
        lineHeight: 1,
      }}
    >
      {display}
    </span>
  );
}

function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: SURFACE,
        borderTop: `1px solid ${BORDER}`,
        borderBottom: `1px solid ${BORDER}`,
        padding: "64px 0",
      }}
    >
      <GrainOverlay />
      <div className="relative z-10 mx-auto max-w-[1440px] px-8">
        <div
          className="grid gap-10 md:gap-6"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}
        >
          {ABOUT_STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="flex flex-col gap-3">
                <CountStat stat={s} inView={inView} />
                <span style={{ fontFamily: DM, fontSize: 14, color: MUTED, lineHeight: 1.5 }}>
                  {s.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECTION 6 — PERSONAL EDGE ---------------- */

function PersonalEdgeSection() {
  return (
    <section className={`relative overflow-hidden ${SECTION_PAD}`} style={{ backgroundColor: BG }}>
      <GrainOverlay />
      <Reveal delay={0.1} className="relative z-10 mx-auto max-w-[720px] px-8">
        <p style={{ ...EYEBROW, marginBottom: 16 }}>Our promise</p>
        <h2 style={H2}>No invoice until you&apos;re satisfied. No lock-in after year one.</h2>
        <div className="mt-7 flex flex-col gap-5">
          <p style={BODY}>
            We put our work in front of you before we ask for a cent. If it doesn&apos;t meet the
            brief, we fix it. If it does, you pay — and after 12 months, you own it outright.
          </p>
          <p style={BODY}>
            That&apos;s not a marketing line. It&apos;s how we operate, because we&apos;ve been on
            the other side of that table. We know what it feels like to pay for something that
            doesn&apos;t deliver.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------- SECTION 7 — CTA ---------------- */

function CTASection() {
  return (
    <section className={`relative overflow-hidden ${SECTION_PAD}`} style={{ backgroundColor: BG }}>
      <GrainOverlay />
      <Reveal delay={0.1} className="relative z-10 mx-auto max-w-[720px] px-8 text-center">
        <h2 style={H2}>Ready to talk?</h2>
        <p style={{ ...BODY, marginTop: 16, marginLeft: "auto", marginRight: "auto", maxWidth: 520 }}>
          No commitment. No invoice. Just a conversation.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            href="/contact"
            className="cta-glow glow-border-blue inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-medium"
            style={{
              backgroundColor: ACCENT,
              color: TEXT,
              fontFamily: DM,
              boxShadow: "0 4px 16px rgba(27,119,242,0.3)",
            }}
          >
            Get in touch
            <ArrowRight size={16} />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------- PAGE ---------------- */

export default function AboutPage() {
  return (
    <main style={{ backgroundColor: BG }}>
      <Nav />
      <HeroSection />
      <WhySection />
      <DifferentSection />
      <WhoSection />
      <StatsSection />
      <PersonalEdgeSection />
      <CTASection />
      <Footer />

      <style jsx global>{`
        @keyframes bpx-node-pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50%      { transform: scale(1.4); opacity: 0.7; }
        }
        @keyframes bpx-ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </main>
  );
}
