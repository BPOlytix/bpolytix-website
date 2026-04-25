"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Layers,
  TrendingUp,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { GrainOverlay } from "./GrainOverlay";

type PillarVisualProps = {
  canAnimate: boolean;
};

type PillarNode = {
  label: string;
  stat: string;
  icon: LucideIcon;
  className: string;
  x: number;
  y: number;
  dotDelay: number;
};

const HUB = { x: 260, y: 150 };

const PILLARS: PillarNode[] = [
  { label: "Finance", stat: "From R1,500 / £105 a month", icon: TrendingUp, className: "finance", x: 96, y: 48, dotDelay: 0 },
  { label: "AI & Automation", stat: "Yours after 12 months", icon: Workflow, className: "automation", x: 424, y: 48, dotDelay: 1 },
  { label: "People", stat: "Cheaper than Deel on SA hires", icon: Users, className: "people", x: 96, y: 332, dotDelay: 2 },
  { label: "Build", stat: "Fixed price. No lock-in.", icon: Layers, className: "build", x: 424, y: 332, dotDelay: 3 },
];

function PulseDot({ canAnimate, delay = 0 }: PillarVisualProps & { delay?: number }) {
  return (
    <span className="live-pulse-dot" aria-hidden="true">
      <span className="live-pulse-core" />
      {canAnimate ? (
        <motion.span
          className="live-pulse-ring"
          animate={{ scale: [1, 3.2], opacity: [0.62, 0] }}
          transition={{ duration: 3, delay, repeat: Infinity, ease: [0.66, 0, 0, 1] }}
        />
      ) : null}
    </span>
  );
}

function FlowConnector({
  pillar,
  canAnimate,
}: {
  pillar: PillarNode;
  canAnimate: boolean;
}) {
  return (
    <g>
      <path
        d={`M${HUB.x} ${HUB.y} L${pillar.x} ${pillar.y}`}
        fill="none"
        stroke="#1B77F2"
        strokeOpacity="0.3"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {canAnimate ? (
        <>
          <motion.line
            x1={HUB.x}
            y1={HUB.y}
            x2={HUB.x}
            y2={HUB.y}
            fill="none"
            stroke="#00D4AA"
            strokeOpacity="0.28"
            strokeWidth="3"
            strokeLinecap="round"
            animate={{
              x1: [HUB.x, HUB.x, pillar.x],
              y1: [HUB.y, HUB.y, pillar.y],
              x2: [HUB.x, pillar.x, pillar.x],
              y2: [HUB.y, pillar.y, pillar.y],
              opacity: [0, 0.34, 0],
            }}
            transition={{
              duration: 4,
              delay: pillar.dotDelay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.circle
            cx={HUB.x}
            cy={HUB.y}
            r="4"
            fill="#00D4AA"
            stroke="#00D4AA"
            strokeWidth="1"
            animate={{ cx: [HUB.x, pillar.x], cy: [HUB.y, pillar.y], opacity: [0, 1, 0.9, 0] }}
            transition={{
              duration: 4,
              delay: pillar.dotDelay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      ) : null}
    </g>
  );
}

function SatelliteNode({
  pillar,
  canAnimate,
  mobile = false,
}: {
  pillar: PillarNode;
  canAnimate: boolean;
  mobile?: boolean;
}) {
  const Icon = pillar.icon;

  return (
    <div className={`satellite-node ${mobile ? "mobile" : pillar.className}`}>
      <span className="satellite-corner-dot">
        <PulseDot canAnimate={canAnimate} delay={pillar.dotDelay * 0.3} />
      </span>
      <Icon size={16} color="#00D4AA" strokeWidth={1.8} />
      <span className="satellite-copy">
        <span className="satellite-label">{pillar.label}</span>
        <span className="satellite-stat">{pillar.stat}</span>
      </span>
    </div>
  );
}

function HubAndSpokeVisual() {
  const reduceMotion = useReducedMotion();
  const canAnimate = !reduceMotion;

  return (
    <div className="hub-panel" aria-label="Four offices connected to BPOLytix">
      <div className="hub-diagram" aria-hidden="true">
        <svg className="connector-map" viewBox="0 0 520 380" role="presentation">
          {PILLARS.map((pillar) => (
            <FlowConnector pillar={pillar} canAnimate={canAnimate} key={pillar.label} />
          ))}
          <circle cx={HUB.x} cy={HUB.y} r="39" fill="#0D1B2A" stroke="#00D4AA" strokeWidth="2" />
        </svg>

        <div className="hub-node">
          BPOLytix
        </div>

        {PILLARS.map((pillar) => (
          <SatelliteNode pillar={pillar} canAnimate={canAnimate} key={pillar.label} />
        ))}
      </div>

      <div className="hub-mobile-stack">
        <div className="hub-node mobile">
          BPOLytix
        </div>
        <div className="mobile-node-list">
          {PILLARS.map((pillar) => (
            <SatelliteNode pillar={pillar} canAnimate={canAnimate} mobile key={pillar.label} />
          ))}
        </div>
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
          <HubAndSpokeVisual />
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

        :global(.hub-panel) {
          position: relative;
          width: 100%;
          min-height: 376px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          box-shadow: inset 0 0 0 1px #1E2D3D;
          overflow: hidden;
          padding: 16px;
        }

        :global(.hub-diagram) {
          display: none;
        }

        :global(.connector-map) {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        :global(.hub-node) {
          display: flex;
          width: 78px;
          height: 78px;
          align-items: center;
          justify-content: center;
          border: 2px solid #00D4AA;
          border-radius: 9999px;
          background-color: #0D1B2A;
          box-shadow: 0 0 18px #00D4AA;
          color: #F5F7FA;
          font-family: var(--font-dm-sans);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0;
          line-height: 1;
          text-align: center;
        }

        :global(.hub-diagram > .hub-node) {
          position: absolute;
          left: 50%;
          top: 39.5%;
          transform: translate(-50%, -50%);
          z-index: 3;
        }

        :global(.satellite-node) {
          position: absolute;
          z-index: 4;
          display: flex;
          width: 188px;
          height: 88px;
          align-items: center;
          gap: 7px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #0D1B2A;
          color: #F5F7FA;
          font-family: var(--font-dm-sans);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0;
          line-height: 1;
          padding: 0 10px 0 14px;
          transform: translate(-50%, -50%);
        }

        :global(.satellite-node svg) {
          flex: 0 0 auto;
        }

        :global(.satellite-copy) {
          display: grid;
          min-width: 0;
          gap: 7px;
          text-align: left;
        }

        :global(.satellite-label) {
          display: block;
          overflow: visible;
          text-overflow: clip;
          white-space: nowrap;
          color: #F5F7FA;
          font-family: var(--font-dm-sans);
          font-size: 16px;
          font-weight: 500;
          letter-spacing: 0;
          line-height: 1.1;
        }

        :global(.satellite-stat) {
          display: block;
          overflow: visible;
          text-overflow: clip;
          white-space: normal;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0;
          line-height: 1.15;
        }

        :global(.satellite-node.finance) {
          left: 18.5%;
          top: 12.6%;
        }

        :global(.satellite-node.automation) {
          left: 81.5%;
          top: 12.6%;
        }

        :global(.satellite-node.people) {
          left: 18.5%;
          top: 87.4%;
        }

        :global(.satellite-node.build) {
          left: 81.5%;
          top: 87.4%;
        }

        :global(.satellite-corner-dot) {
          position: absolute;
          left: 8px;
          top: 8px;
        }

        :global(.live-pulse-dot) {
          position: relative;
          display: inline-flex;
          width: 6px;
          height: 6px;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
        }

        :global(.live-pulse-core) {
          position: relative;
          z-index: 2;
          display: block;
          width: 5px;
          height: 5px;
          border-radius: 9999px;
          background-color: #00D4AA;
        }

        :global(.live-pulse-ring) {
          position: absolute;
          inset: 0;
          z-index: 1;
          border: 1px solid #00D4AA;
          border-radius: 9999px;
        }

        :global(.hub-mobile-stack) {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;
          min-height: 344px;
          justify-content: center;
        }

        :global(.hub-node.mobile) {
          position: relative;
          z-index: 2;
        }

        :global(.mobile-node-list) {
          display: grid;
          width: min(100%, 280px);
          gap: 10px;
        }

        :global(.satellite-node.mobile) {
          position: relative;
          width: 100%;
          height: 64px;
          transform: none;
        }

        @media (min-width: 768px) {
          :global(.hub-panel) {
            min-height: 392px;
          }

          :global(.hub-diagram) {
            position: relative;
            display: block;
            min-height: 360px;
          }

          :global(.hub-mobile-stack) {
            display: none;
          }
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

          :global(.hub-panel) {
            min-height: 420px;
            padding: 18px;
          }

          :global(.hub-diagram) {
            min-height: 384px;
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
