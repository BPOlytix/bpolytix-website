"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  FileSignature,
  Gavel,
  MessageCircleQuestion,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import type { ServicePageTemplateProps } from "@/components/ServicePageTemplate";
import { Footer } from "@/components/Footer";
import { GrainOverlay } from "@/components/GrainOverlay";
import { Nav } from "@/components/Nav";

type CoveredItem = {
  title: string;
  icon: LucideIcon;
  className: string;
};

type PricingTier = {
  name: string;
  employees: string;
  price: string;
};

type WorkStep = {
  title: string;
  body: string;
};

type ComparisonRow = {
  label: string;
  inHouse: string;
  retainer: string;
  danger?: boolean;
};

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const TEMPLATE_BASE: Pick<
  ServicePageTemplateProps,
  "pillarLabel" | "serviceName" | "hookLine"
> = {
  pillarLabel: "People Office",
  serviceName: "A full HR function — without the full-time hire.",
  hookLine:
    "Contracts, policies, disputes, compliance, and people advice. All handled monthly for a fixed fee. No HR director salary required.",
};

const COVERED_ITEMS: CoveredItem[] = [
  {
    title: "Employment contracts (SA and UK compliant)",
    icon: FileSignature,
    className: "covered-large",
  },
  {
    title: "HR policies and employee handbook",
    icon: BookOpenCheck,
    className: "covered-tall",
  },
  {
    title: "Disciplinary and grievance support",
    icon: Gavel,
    className: "covered-mid",
  },
  {
    title: "BCEA / Employment Rights Act compliance (SA + UK)",
    icon: ShieldCheck,
    className: "covered-mid",
  },
  {
    title: "Monthly people advice — hiring, performance, exits",
    icon: MessageCircleQuestion,
    className: "covered-wide",
  },
  {
    title: "Leave and absence management",
    icon: CalendarDays,
    className: "covered-wide",
  },
];

const SA_TIERS: PricingTier[] = [
  {
    name: "Starter",
    employees: "up to 5 employees",
    price: "R4,500/month",
  },
  {
    name: "Growth",
    employees: "6–20 employees",
    price: "R8,500/month",
  },
  {
    name: "Scale",
    employees: "21–50 employees",
    price: "R14,000/month",
  },
];

const UK_TIERS: PricingTier[] = [
  {
    name: "Starter",
    employees: "up to 5 employees",
    price: "£350/month",
  },
  {
    name: "Growth",
    employees: "6–20 employees",
    price: "£650/month",
  },
  {
    name: "Scale",
    employees: "21–50 employees",
    price: "£1,100/month",
  },
];

const WORK_STEPS: WorkStep[] = [
  {
    title: "Discovery call",
    body: "we map your team size, structure, and current gaps",
  },
  {
    title: "Contracts and policies issued",
    body: "tailored to your business and jurisdiction",
  },
  {
    title: "Monthly retainer begins",
    body: "advice, compliance, and updates on call",
  },
  {
    title: "Scales with you",
    body: "fee adjusts as your headcount grows",
  },
];

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    label: "SA monthly cost",
    inHouse: "R35,000–R60,000 (HR manager + tools)",
    retainer: "From R4,500/month",
    danger: true,
  },
  {
    label: "UK monthly cost",
    inHouse: "£3,000–£5,000 (HR manager + tools)",
    retainer: "From £350/month",
    danger: true,
  },
  {
    label: "Commitment",
    inHouse: "Full-time salary",
    retainer: "Monthly — cancel anytime",
  },
];

const HUB_SPOKES = [
  {
    label: "Contracts",
    x: 124,
    y: 88,
    path: "M300 220 L124 88",
    cx: [300, 256, 212, 168, 124],
    cy: [220, 187, 154, 121, 88],
    delay: 0,
  },
  {
    label: "Policies",
    x: 476,
    y: 88,
    path: "M300 220 L476 88",
    cx: [300, 344, 388, 432, 476],
    cy: [220, 187, 154, 121, 88],
    delay: 0.35,
  },
  {
    label: "Disputes",
    x: 90,
    y: 266,
    path: "M300 220 L90 266",
    cx: [300, 248, 195, 142, 90],
    cy: [220, 232, 243, 255, 266],
    delay: 0.7,
  },
  {
    label: "Compliance",
    x: 510,
    y: 266,
    path: "M300 220 L510 266",
    cx: [300, 352, 405, 458, 510],
    cy: [220, 232, 243, 255, 266],
    delay: 1.05,
  },
  {
    label: "People Advice",
    x: 300,
    y: 378,
    path: "M300 220 L300 378",
    cx: [300, 300, 300, 300, 300],
    cy: [220, 260, 299, 339, 378],
    delay: 1.4,
  },
];

function RevealSection({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      ref={ref}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 40 }}
      animate={reduceMotion || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {children}
    </motion.section>
  );
}

function HrHubVisual() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const canAnimate = inView && !reduceMotion;

  return (
    <div ref={ref} className="hr-hub-visual" aria-hidden="true">
      <svg className="hr-hub-svg" viewBox="0 0 600 460" role="presentation">
        <rect x="1" y="1" width="598" height="458" rx="8" fill="#111F2E" stroke="#1E2D3D" strokeWidth="1" />
        <path d="M50 80 H550 M50 160 H550 M50 240 H550 M50 320 H550 M50 400 H550" fill="#111F2E" fillOpacity="0" stroke="#1E2D3D" strokeWidth="1" opacity="0.62" />
        <path d="M100 38 V422 M200 38 V422 M300 38 V422 M400 38 V422 M500 38 V422" fill="#111F2E" fillOpacity="0" stroke="#1E2D3D" strokeWidth="1" opacity="0.62" />

        {HUB_SPOKES.map((spoke) => (
          <g key={spoke.label}>
            <path d={spoke.path} fill="#111F2E" fillOpacity="0" stroke="#1E2D3D" strokeWidth="2" strokeLinecap="round" />
            <motion.circle
              r="5"
              fill="#00D4AA"
              stroke="#00D4AA"
              strokeWidth="1"
              initial={false}
              animate={
                canAnimate
                  ? {
                      cx: spoke.cx,
                      cy: spoke.cy,
                      opacity: [0, 1, 1, 1, 0],
                    }
                  : { cx: spoke.x, cy: spoke.y, opacity: 1 }
              }
              transition={{
                duration: 2.9,
                delay: spoke.delay,
                repeat: canAnimate ? Infinity : 0,
                repeatDelay: 0.7,
                ease: "easeInOut",
              }}
            />
            <circle cx={spoke.x} cy={spoke.y} r="42" fill="#0D1B2A" stroke="#1E2D3D" strokeWidth="1" />
            <circle cx={spoke.x} cy={spoke.y} r="31" fill="#111F2E" stroke="#00D4AA" strokeWidth="1" opacity="0.55" />
            <text
              x={spoke.x}
              y={spoke.y + 5}
              fill="#F5F7FA"
              fontFamily="DM Sans, sans-serif"
              fontSize={spoke.label === "People Advice" ? "12" : "13"}
              fontWeight="700"
              textAnchor="middle"
            >
              {spoke.label}
            </text>
          </g>
        ))}

        <g>
          <circle cx="300" cy="220" r="74" fill="#0D1B2A" stroke="#1B77F2" strokeWidth="3" />
          <circle cx="300" cy="220" r="54" fill="#111F2E" stroke="#1E2D3D" strokeWidth="1" />
          <text x="300" y="215" fill="#F5F7FA" fontFamily="Syne, sans-serif" fontSize="17" fontWeight="700" textAnchor="middle">
            HR
          </text>
          <text x="300" y="236" fill="#F5F7FA" fontFamily="Syne, sans-serif" fontSize="17" fontWeight="700" textAnchor="middle">
            Retainer
          </text>
        </g>
      </svg>
    </div>
  );
}

function PricingColumn({
  market,
  tiers,
}: {
  market: "SA" | "UK";
  tiers: PricingTier[];
}) {
  return (
    <article className="pricing-card">
      <h3>{market}</h3>
      <div className="pricing-list">
        {tiers.map((tier) => (
          <div className="pricing-row" key={`${market}-${tier.name}`}>
            <div>
              <p className="tier-name">
                {tier.name} <span>({tier.employees})</span>
              </p>
            </div>
            <p className="tier-price">{tier.price}</p>
          </div>
        ))}
      </div>
      <p className="pricing-note">Includes all contracts, policies, and monthly HR advice.</p>
    </article>
  );
}

export default function OutsourcedHrRetainerPage() {
  return (
    <main className="hr-page">
      <Nav />

      <RevealSection className="hr-hero">
        <GrainOverlay />
        <div className="page-wrap hero-grid">
          <div className="hero-copy">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>→</span>
              <Link href="/services/people">People</Link>
              <span>→</span>
              <span>Outsourced HR Retainer</span>
            </nav>
            <p className="section-label">{TEMPLATE_BASE.pillarLabel}</p>
            <h1>{TEMPLATE_BASE.serviceName}</h1>
            <p className="hero-intro">{TEMPLATE_BASE.hookLine}</p>
          </div>

          <HrHubVisual />
        </div>
      </RevealSection>

      <RevealSection className="covered-section">
        <div className="page-wrap">
          <div className="section-heading">
            <p className="section-label">What is covered</p>
            <h2>Everything your HR function needs to run.</h2>
          </div>

          <div className="covered-bento">
            {COVERED_ITEMS.map((item) => {
              const Icon = item.icon;

              return (
                <motion.article
                  className={`covered-card ${item.className}`}
                  key={item.title}
                  whileHover={{ y: -4, transition: { duration: 0.2, ease: EASE } }}
                >
                  <span className="covered-icon">
                    <Icon size={19} color="#00D4AA" strokeWidth={1.8} />
                  </span>
                  <h3>{item.title}</h3>
                </motion.article>
              );
            })}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="pricing-section">
        <div className="page-wrap">
          <div className="section-heading">
            <p className="section-label">Pricing</p>
            <h2>One monthly fee. No retainer traps.</h2>
          </div>

          <div className="pricing-grid">
            <PricingColumn market="SA" tiers={SA_TIERS} />
            <PricingColumn market="UK" tiers={UK_TIERS} />
          </div>
          <p className="shared-pricing-note">
            No invoice until your first contract or policy is delivered.
          </p>
        </div>
      </RevealSection>

      <RevealSection className="work-section">
        <div className="page-wrap">
          <div className="section-heading">
            <p className="section-label">How it works</p>
            <h2>From no HR function to a fully covered one — in a week.</h2>
          </div>

          <div className="step-flow">
            {WORK_STEPS.map((step, index) => (
              <article className="step-card" key={step.title}>
                <span>{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="comparison-section">
        <div className="page-wrap">
          <div className="section-heading">
            <p className="section-label">Cost comparison</p>
            <h2>What an in-house HR hire costs</h2>
          </div>

          <div className="comparison-table" role="table" aria-label="What an in-house HR hire costs">
            <div className="comparison-row comparison-head" role="row">
              <div role="columnheader" aria-label="Comparison item" />
              <div role="columnheader">In-house</div>
              <div role="columnheader">BPOLytix HR Retainer</div>
            </div>
            {COMPARISON_ROWS.map((row) => (
              <div className="comparison-row" role="row" key={row.label}>
                <div className="comparison-label" role="cell">
                  {row.label}
                </div>
                <div className={row.danger ? "comparison-danger" : ""} role="cell">
                  {row.inHouse}
                </div>
                <div className="comparison-good" role="cell">
                  {row.retainer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="cta-section">
        <GrainOverlay />
        <div className="page-wrap">
          <div className="cta-band">
            <div>
              <p className="section-label">Ready to talk?</p>
              <h2>Your people sorted. Your focus back on the business.</h2>
              <p>One call. We map your HR gaps and tell you exactly what we'd cover.</p>
            </div>
            <div className="cta-actions">
              <Link className="primary-cta" href="/contact">
                Talk to us
                <ArrowRight size={18} color="#F5F7FA" strokeWidth={2} />
              </Link>
              <Link className="ghost-cta" href="/services/people">
                See all People services
              </Link>
            </div>
          </div>
        </div>
      </RevealSection>

      <Footer />

      <style jsx global>{`
        .hr-page {
          min-height: 100vh;
          background-color: #0D1B2A;
          color: #F5F7FA;
        }

        .hr-page section {
          position: relative;
          overflow: hidden;
          background-color: #0D1B2A;
          border-top: 1px solid #1E2D3D;
        }

        .hr-page section:first-of-type {
          border-top: 0;
        }

        .page-wrap {
          position: relative;
          z-index: 1;
          max-width: 1440px;
          margin: 0 auto;
          padding-left: 32px;
          padding-right: 32px;
        }

        .hr-hero {
          padding-top: 128px;
          padding-bottom: 72px;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.92fr) minmax(420px, 0.78fr);
          gap: 72px;
          align-items: center;
        }

        .hero-copy {
          min-width: 0;
          max-width: 820px;
        }

        .breadcrumb {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 9px;
          margin-bottom: 18px;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.4;
        }

        .breadcrumb a {
          color: #8892A4;
          text-decoration: none;
        }

        .breadcrumb a:hover {
          color: #00D4AA;
        }

        .section-label {
          margin: 0 0 14px;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
          line-height: 1.4;
          text-transform: uppercase;
        }

        .hero-copy h1 {
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 72px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.05;
        }

        .hero-intro {
          max-width: 680px;
          margin: 24px 0 0;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 18px;
          letter-spacing: 0;
          line-height: 1.7;
        }

        .hr-hub-visual {
          position: relative;
          min-width: 0;
          min-height: 460px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          overflow: hidden;
        }

        .hr-hub-svg {
          position: absolute;
          inset: 18px;
          width: calc(100% - 36px);
          height: calc(100% - 36px);
        }

        .covered-section,
        .pricing-section,
        .work-section,
        .comparison-section,
        .cta-section {
          padding-top: 64px;
          padding-bottom: 76px;
        }

        .section-heading {
          max-width: 820px;
          margin-bottom: 34px;
        }

        .section-heading h2,
        .cta-band h2 {
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 48px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1;
        }

        .covered-bento {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
          grid-auto-rows: minmax(160px, auto);
          gap: 18px;
          align-items: stretch;
        }

        .covered-card {
          min-width: 0;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          padding: 26px;
        }

        .covered-card.covered-large {
          min-height: 240px;
        }

        .covered-card.covered-tall {
          grid-row: span 2;
        }

        .covered-card.covered-wide {
          background-color: #111F2E;
        }

        .covered-icon {
          display: inline-flex;
          width: 38px;
          height: 38px;
          align-items: center;
          justify-content: center;
          margin-bottom: 22px;
          border: 1px solid #1E2D3D;
          border-radius: 9999px;
          background-color: #0D1B2A;
        }

        .covered-card h3,
        .pricing-card h3,
        .step-card h3 {
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.12;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 18px;
        }

        .pricing-card {
          min-width: 0;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          padding: 30px;
        }

        .pricing-list {
          display: grid;
          gap: 0;
          margin-top: 22px;
          border-top: 1px solid #1E2D3D;
        }

        .pricing-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          border-bottom: 1px solid #1E2D3D;
          padding: 18px 0;
        }

        .tier-name,
        .tier-price,
        .pricing-note,
        .shared-pricing-note,
        .step-card p,
        .comparison-table,
        .cta-band p {
          font-family: var(--font-dm-sans);
          letter-spacing: 0;
        }

        .tier-name {
          margin: 0;
          color: #F5F7FA;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.35;
        }

        .tier-name span {
          color: #8892A4;
          font-weight: 600;
        }

        .tier-price {
          flex: 0 0 auto;
          margin: 0;
          color: #00D4AA;
          font-size: 17px;
          font-weight: 700;
          line-height: 1.35;
          text-align: right;
        }

        .pricing-note {
          margin: 18px 0 0;
          color: #8892A4;
          font-size: 14px;
          line-height: 1.6;
        }

        .shared-pricing-note {
          margin: 20px 0 0;
          color: #00D4AA;
          font-size: 15px;
          font-weight: 700;
          line-height: 1.6;
        }

        .step-flow {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 0;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          overflow: hidden;
        }

        .step-card {
          position: relative;
          min-height: 220px;
          padding: 24px 20px;
        }

        .step-card:not(:last-child) {
          border-right: 1px solid #1E2D3D;
        }

        .step-card span {
          display: inline-flex;
          width: 34px;
          height: 34px;
          align-items: center;
          justify-content: center;
          margin-bottom: 26px;
          border: 1px solid #00D4AA;
          border-radius: 9999px;
          color: #00D4AA;
          font-family: var(--font-dm-sans);
          font-size: 13px;
          font-weight: 700;
          line-height: 1;
        }

        .step-card h3 {
          font-size: 20px;
        }

        .step-card p {
          margin: 12px 0 0;
          color: #8892A4;
          font-size: 15px;
          line-height: 1.65;
        }

        .comparison-table {
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          overflow: hidden;
        }

        .comparison-row {
          display: grid;
          grid-template-columns: minmax(180px, 0.78fr) minmax(0, 1fr) minmax(0, 1fr);
        }

        .comparison-row:not(:last-child) {
          border-bottom: 1px solid #1E2D3D;
        }

        .comparison-row > div {
          min-width: 0;
          padding: 18px 20px;
          color: #F5F7FA;
          font-size: 15px;
          font-weight: 700;
          line-height: 1.45;
        }

        .comparison-row > div:not(:last-child) {
          border-right: 1px solid #1E2D3D;
        }

        .comparison-head {
          background-color: #111F2E;
        }

        .comparison-head > div {
          color: #8892A4;
          font-size: 13px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .comparison-label {
          color: #8892A4 !important;
        }

        .comparison-danger {
          color: #FF4444 !important;
        }

        .comparison-good {
          color: #00D4AA !important;
        }

        .cta-band {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          padding: 40px;
        }

        .cta-band p:not(.section-label) {
          max-width: 620px;
          margin: 18px 0 0;
          color: #8892A4;
          font-size: 17px;
          line-height: 1.7;
        }

        .cta-actions {
          display: flex;
          flex: 0 0 auto;
          align-items: center;
          gap: 12px;
        }

        .primary-cta,
        .ghost-cta {
          display: inline-flex;
          min-height: 48px;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border-radius: 9999px;
          color: #F5F7FA;
          font-family: var(--font-dm-sans);
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1;
          padding: 0 22px;
          text-decoration: none;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }

        .primary-cta {
          border: 1px solid #1B77F2;
          background-color: #1B77F2;
        }

        .ghost-cta {
          border: 0;
          background-color: rgba(255,255,255,0.05);
        }

        .primary-cta:hover {
          box-shadow: 0 0 24px #1B77F2;
          transform: translateY(-2px);
        }

        .ghost-cta:hover {
          transform: translateY(-2px);
        }

        .primary-cta:focus-visible,
        .ghost-cta:focus-visible,
        .breadcrumb a:focus-visible {
          outline: 2px solid #00D4AA;
          outline-offset: 3px;
        }

        @media (max-width: 1120px) {
          .hero-grid,
          .pricing-grid {
            grid-template-columns: 1fr;
          }

          .hr-hub-visual {
            min-height: 430px;
          }

          .step-flow {
            grid-template-columns: 1fr;
          }

          .step-card {
            min-height: auto;
          }

          .step-card:not(:last-child) {
            border-right: 0;
            border-bottom: 1px solid #1E2D3D;
          }
        }

        @media (max-width: 860px) {
          .hr-hero,
          .covered-section,
          .pricing-section,
          .work-section,
          .comparison-section,
          .cta-section {
            padding-top: 48px;
            padding-bottom: 56px;
          }

          .hr-hero {
            padding-top: 112px;
          }

          .page-wrap {
            padding-left: 24px;
            padding-right: 24px;
          }

          .hero-copy h1 {
            font-size: 52px;
          }

          .section-heading h2,
          .cta-band h2 {
            font-size: 36px;
          }

          .covered-bento {
            grid-template-columns: 1fr;
          }

          .covered-card.covered-tall,
          .covered-card.covered-wide {
            grid-row: auto;
            grid-column: auto;
          }

          .pricing-row,
          .cta-band,
          .cta-actions {
            align-items: stretch;
            flex-direction: column;
          }

          .pricing-row {
            gap: 8px;
          }

          .tier-price {
            text-align: left;
          }

          .comparison-table {
            border-radius: 8px;
          }

          .comparison-row {
            grid-template-columns: 1fr;
          }

          .comparison-row > div:not(:last-child) {
            border-right: 0;
            border-bottom: 1px solid #1E2D3D;
          }

          .comparison-head {
            display: none;
          }

          .comparison-label {
            background-color: #0D1B2A;
          }

          .cta-band {
            padding: 28px;
          }
        }

        @media (max-width: 560px) {
          .hr-hero {
            padding-top: 104px;
            padding-bottom: 44px;
          }

          .hero-copy h1 {
            font-size: 44px;
          }

          .hero-intro {
            font-size: 16px;
          }

          .hr-hub-visual {
            min-height: 360px;
          }

          .hr-hub-svg {
            inset: 4px;
            width: calc(100% - 8px);
            height: calc(100% - 8px);
          }

          .primary-cta,
          .ghost-cta {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .primary-cta,
          .ghost-cta,
          .covered-card {
            transition: none;
          }
        }
      `}</style>
    </main>
  );
}
