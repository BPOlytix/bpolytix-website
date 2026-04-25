"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ChartNoAxesCombined,
  Layers3,
  UsersRound,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { GrainOverlay } from "./GrainOverlay";

type PillarVisualProps = {
  canAnimate: boolean;
};

const PILLARS: { label: string; icon: LucideIcon }[] = [
  { label: "Finance", icon: ChartNoAxesCombined },
  { label: "AI & Automation", icon: Workflow },
  { label: "People", icon: UsersRound },
  { label: "Build", icon: Layers3 },
];

function PulseDot({ canAnimate }: PillarVisualProps) {
  return (
    <span className="live-pulse-dot" aria-hidden="true">
      <span className="live-pulse-core" />
      {canAnimate ? (
        <motion.span
          className="live-pulse-ring"
          animate={{ scale: [1, 3.2], opacity: [0.62, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: [0.66, 0, 0, 1] }}
        />
      ) : null}
    </span>
  );
}

function FinanceVisual({ canAnimate }: PillarVisualProps) {
  return (
    <svg className="pillar-mini finance-mini" viewBox="0 0 160 72" role="presentation">
      <path
        className="mini-grid"
        d="M8 58 H152 M8 38 H152 M8 18 H152"
        fill="none"
        stroke="#1E2D3D"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <motion.path
        className="finance-line"
        d="M12 54 C34 50 38 36 56 40 C76 45 84 26 102 30 C122 34 130 18 148 16"
        fill="none"
        stroke="#00D4AA"
        strokeWidth="3"
        strokeLinecap="round"
        initial={canAnimate ? { pathLength: 0.4, opacity: 0.55 } : false}
        animate={
          canAnimate
            ? { pathLength: [0.4, 1, 1], opacity: [0.55, 1, 0.72] }
            : { pathLength: 1, opacity: 0.78 }
        }
        transition={{
          duration: 5.8,
          repeat: canAnimate ? Infinity : 0,
          repeatDelay: 1.2,
          ease: "easeInOut",
        }}
      />
      <motion.circle
        className="finance-marker"
        cx="148"
        cy="16"
        r="4"
        fill="#00D4AA"
        stroke="#00D4AA"
        strokeWidth="1"
        animate={canAnimate ? { scale: [1, 1.45, 1], opacity: [0.7, 1, 0.78] } : { scale: 1, opacity: 0.9 }}
        transition={{ duration: 2.8, repeat: canAnimate ? Infinity : 0, ease: "easeInOut" }}
      />
    </svg>
  );
}

function AutomationVisual({ canAnimate }: PillarVisualProps) {
  const nodes = [
    { cx: 30, cy: 38 },
    { cx: 72, cy: 24 },
    { cx: 112, cy: 42 },
    { cx: 136, cy: 22 },
  ];

  return (
    <svg className="pillar-mini automation-mini" viewBox="0 0 160 72" role="presentation">
      <path
        className="node-line"
        d="M30 38 L72 24 L112 42 L136 22"
        fill="none"
        stroke="#1B77F2"
        strokeOpacity="0.6"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {nodes.map((node, index) => (
        <motion.circle
          key={`${node.cx}-${node.cy}`}
          className="node-dot"
          cx={node.cx}
          cy={node.cy}
          r="5"
          fill="#00D4AA"
          stroke="#00D4AA"
          strokeWidth="1"
          animate={
            canAnimate
              ? { scale: [1, 1.55, 1], opacity: [0.58, 1, 0.7] }
              : { scale: 1, opacity: 0.82 }
          }
          transition={{
            duration: 2.4,
            delay: index * 0.42,
            repeat: canAnimate ? Infinity : 0,
            repeatDelay: canAnimate ? 1.2 : 0,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}

function PeopleVisual({ canAnimate }: PillarVisualProps) {
  return (
    <svg className="pillar-mini people-mini" viewBox="0 0 160 72" role="presentation">
      <path
        className="people-rail"
        d="M32 36 H128"
        fill="none"
        stroke="#1B77F2"
        strokeOpacity="0.6"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle className="people-anchor" cx="32" cy="36" r="7" fill="#111F2E" stroke="#00D4AA" strokeWidth="2" />
      <circle className="people-anchor" cx="128" cy="36" r="7" fill="#111F2E" stroke="#00D4AA" strokeWidth="2" />
      <motion.circle
        className="people-transfer"
        cx="32"
        cy="36"
        r="4"
        fill="#00D4AA"
        stroke="#00D4AA"
        strokeWidth="1"
        animate={canAnimate ? { cx: [32, 128, 32], opacity: [0.72, 1, 0.72] } : { cx: 128, opacity: 0.86 }}
        transition={{ duration: 5.4, repeat: canAnimate ? Infinity : 0, ease: "easeInOut" }}
      />
    </svg>
  );
}

function BuildVisual({ canAnimate }: PillarVisualProps) {
  return (
    <div className="pillar-mini build-mini" aria-hidden="true">
      {[0, 1, 2].map((frame) => (
        <motion.span
          key={frame}
          className={`build-frame build-frame-${frame + 1}`}
          animate={
            canAnimate
              ? {
                  opacity: [0.46, 0.88, 0.68],
                  x: [10 - frame * 5, 0, 0],
                  y: [8 - frame * 3, 0, 0],
                  borderColor: ["#1E2D3D", "#00D4AA", "#1E2D3D"],
                }
              : { opacity: 0.78, x: 0, y: 0, borderColor: "#1E2D3D" }
          }
          transition={{
            duration: 4.8,
            delay: frame * 0.38,
            repeat: canAnimate ? Infinity : 0,
            repeatDelay: canAnimate ? 1.1 : 0,
            ease: "easeInOut",
          }}
        >
          <i />
          <b />
        </motion.span>
      ))}
    </div>
  );
}

function FourPillarVisual() {
  const reduceMotion = useReducedMotion();
  const canAnimate = !reduceMotion;

  return (
    <div className="pillar-panel" aria-label="Four BPOLytix pillars">
      <div className="pillar-panel-topline">
        <PulseDot canAnimate={canAnimate} />
        <span>Full circle back office</span>
      </div>

      <div className="pillar-grid">
        {PILLARS.map((pillar) => {
          const Icon = pillar.icon;

          return (
            <div className="pillar-quadrant" key={pillar.label}>
              <div className="pillar-label">
                <PulseDot canAnimate={canAnimate} />
                <span>{pillar.label}</span>
                <Icon size={17} color="#00D4AA" strokeWidth={1.8} />
              </div>

              {pillar.label === "Finance" && <FinanceVisual canAnimate={canAnimate} />}
              {pillar.label === "AI & Automation" && <AutomationVisual canAnimate={canAnimate} />}
              {pillar.label === "People" && <PeopleVisual canAnimate={canAnimate} />}
              {pillar.label === "Build" && <BuildVisual canAnimate={canAnimate} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function HeroSection() {
  const handleScrollToHowItWorks = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero-section relative overflow-hidden">
      <GrainOverlay />
      <div className="relative z-10 mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-6 sm:px-8 lg:grid-cols-[58%_42%] lg:items-center lg:gap-12">
        <div className="hero-copy flex flex-col justify-center">
          <p className="hero-eyebrow">
            Built for SA startups. Trusted by UK SMEs.
          </p>

          <h1 className="hero-headline">
            We build it.
            <br />
            You own it.
          </h1>

          <p className="hero-sub">
            We manage your full circle back office operations. One partner. No upfront cost — whilst you focus on income generating operations and scaling your business.
          </p>

          <div className="hero-actions">
            <a
              href="#how-it-works"
              onClick={handleScrollToHowItWorks}
              className="hero-cta primary"
            >
              See how it works
            </a>
            <Link href="/services/finance" className="hero-cta secondary">
              View our services
            </Link>
          </div>
        </div>

        <div className="hero-visual-wrap">
          <FourPillarVisual />
        </div>
      </div>

      <style jsx>{`
        .hero-section {
          padding-top: 64px;
          padding-bottom: 72px;
          background-color: #0D1B2A;
        }

        .hero-copy {
          min-width: 0;
        }

        .hero-eyebrow {
          margin: 0 0 20px;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
          line-height: 1.4;
          text-transform: uppercase;
        }

        .hero-headline {
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 44px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.05;
        }

        .hero-sub {
          max-width: 660px;
          margin: 24px 0 0;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 16px;
          letter-spacing: 0;
          line-height: 1.7;
        }

        .hero-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 32px;
        }

        .hero-cta {
          display: inline-flex;
          min-height: 48px;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          color: #F5F7FA;
          font-family: var(--font-dm-sans);
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1;
          padding: 0 22px;
          text-align: center;
          text-decoration: none;
          transition: box-shadow 0.2s ease, transform 0.2s ease, background-color 0.2s ease;
        }

        .hero-cta.primary {
          border: 1px solid #1B77F2;
          background-color: #1B77F2;
        }

        .hero-cta.secondary {
          border: 1px solid #1E2D3D;
          background-color: #111F2E;
        }

        .hero-cta:hover {
          transform: translateY(-2px);
        }

        .hero-cta.primary:hover {
          box-shadow: 0 0 24px #1B77F2;
        }

        .hero-cta.secondary:hover {
          background-color: #1C2A3A;
        }

        .hero-cta:focus-visible {
          outline: 2px solid #00D4AA;
          outline-offset: 3px;
        }

        .hero-visual-wrap {
          min-width: 0;
        }

        :global(.pillar-panel) {
          position: relative;
          min-height: 392px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          overflow: hidden;
          padding: 16px;
        }

        :global(.pillar-panel-topline) {
          display: flex;
          min-height: 30px;
          align-items: center;
          gap: 10px;
          border-bottom: 1px solid #1E2D3D;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          line-height: 1;
          text-transform: uppercase;
        }

        :global(.live-pulse-dot) {
          position: relative;
          display: inline-flex;
          width: 9px;
          height: 9px;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
        }

        :global(.live-pulse-core) {
          position: relative;
          z-index: 2;
          display: block;
          width: 7px;
          height: 7px;
          border-radius: 9999px;
          background-color: #00D4AA;
        }

        :global(.live-pulse-ring) {
          position: absolute;
          inset: 1px;
          z-index: 1;
          border: 1px solid #00D4AA;
          border-radius: 9999px;
        }

        :global(.pillar-grid) {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
          padding-top: 14px;
        }

        :global(.pillar-quadrant) {
          position: relative;
          min-height: 128px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #1C2A3A;
          overflow: hidden;
          padding: 14px;
        }

        :global(.pillar-label) {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 9px;
          color: #F5F7FA;
          font-family: var(--font-dm-sans);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1;
        }

        :global(.pillar-label svg) {
          margin-left: auto;
          flex: 0 0 auto;
        }

        :global(.pillar-mini) {
          position: absolute;
          right: 12px;
          bottom: 10px;
          left: 12px;
          height: 58px;
        }

        :global(.mini-grid),
        :global(.node-line),
        :global(.people-rail) {
          fill: none;
          stroke-linecap: round;
        }

        :global(.mini-grid) {
          stroke: #1E2D3D;
          stroke-width: 1;
        }

        :global(.finance-line) {
          fill: none;
          stroke: #00D4AA;
          stroke-linecap: round;
          stroke-width: 3;
        }

        :global(.finance-marker),
        :global(.node-dot),
        :global(.people-transfer) {
          fill: #00D4AA;
          stroke: #00D4AA;
          transform-box: fill-box;
          transform-origin: center;
        }

        :global(.node-line),
        :global(.people-rail) {
          stroke: #1B77F2;
          stroke-opacity: 0.6;
        }

        :global(.node-line) {
          stroke-width: 2;
        }

        :global(.people-rail) {
          stroke-width: 3;
        }

        :global(.people-anchor) {
          fill: #111F2E;
          stroke: #00D4AA;
          stroke-width: 2;
        }

        :global(.build-mini) {
          display: block;
        }

        :global(.build-frame) {
          position: absolute;
          display: block;
          width: 58%;
          height: 38px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          padding: 9px;
        }

        :global(.build-frame-1) {
          left: 6%;
          top: 18px;
        }

        :global(.build-frame-2) {
          left: 22%;
          top: 9px;
        }

        :global(.build-frame-3) {
          left: 38%;
          top: 2px;
        }

        :global(.build-frame i),
        :global(.build-frame b) {
          display: block;
          height: 6px;
          border-radius: 9999px;
        }

        :global(.build-frame i) {
          width: 72%;
          background-color: #1B77F2;
          opacity: 0.6;
        }

        :global(.build-frame b) {
          width: 42%;
          margin-top: 8px;
          background-color: #00D4AA;
        }

        @media (min-width: 640px) {
          .hero-headline {
            font-size: 56px;
          }

          .hero-sub {
            font-size: 17px;
          }

          .hero-actions {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 16px;
          }

          :global(.pillar-grid) {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (min-width: 1024px) {
          .hero-section {
            padding-top: 96px;
            padding-bottom: 128px;
          }

          .hero-headline {
            font-size: 80px;
          }

          .hero-sub {
            font-size: 18px;
          }

          :global(.pillar-panel) {
            min-height: 420px;
            padding: 18px;
          }

          :global(.pillar-grid) {
            gap: 12px;
            padding-top: 14px;
          }

          :global(.pillar-quadrant) {
            min-height: 162px;
            padding: 14px;
          }

          :global(.pillar-mini) {
            bottom: 14px;
            left: 14px;
            right: 14px;
            height: 64px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-cta {
            transition: none;
          }

          :global(.live-pulse-ring) {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
