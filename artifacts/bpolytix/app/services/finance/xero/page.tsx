"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BanknoteArrowUp,
  BookOpenCheck,
  FileCog,
  FileSpreadsheet,
  GraduationCap,
  Landmark,
  ReceiptText,
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
  label: string;
  price: string;
};

type WorkStep = {
  title: string;
  body: string;
};

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const TEMPLATE_BASE: Pick<
  ServicePageTemplateProps,
  "pillarLabel" | "serviceName" | "hookLine"
> = {
  pillarLabel: "Finance Office",
  serviceName: "Xero set up correctly — the first time.",
  hookLine:
    "Chart of accounts, bank feeds, tax codes, and integrations. Done properly so your bookkeeper, accountant, and SARS/HMRC submissions all work from day one.",
};

const CHECKLIST_ITEMS = [
  "Chart of accounts",
  "Bank feeds connected",
  "Tax codes configured",
  "Opening balances entered",
  "First reconciliation complete",
];

const COVERED_ITEMS: CoveredItem[] = [
  {
    title: "Chart of accounts tailored to your business",
    icon: FileSpreadsheet,
    className: "covered-large",
  },
  {
    title: "Bank feed connections (all accounts)",
    icon: Landmark,
    className: "covered-tall",
  },
  {
    title: "Tax code configuration (SA: VAT / UK: VAT + MTD)",
    icon: FileCog,
    className: "covered-mid",
  },
  {
    title: "Opening balance entry",
    icon: BanknoteArrowUp,
    className: "covered-mid",
  },
  {
    title: "Accounts payable and receivable setup",
    icon: ReceiptText,
    className: "covered-wide",
  },
  {
    title: "Staff training — 1-hour walkthrough included",
    icon: GraduationCap,
    className: "covered-wide",
  },
];

const SA_TIERS: PricingTier[] = [
  { label: "Standard setup (new business)", price: "R4,500 fixed" },
  { label: "Migration (from another system)", price: "R7,500 fixed" },
  { label: "Setup + first month bookkeeping", price: "R6,500 fixed" },
];

const UK_TIERS: PricingTier[] = [
  { label: "Standard setup (new business)", price: "£350 fixed" },
  { label: "Migration (from another system)", price: "£600 fixed" },
  { label: "Setup + first month bookkeeping", price: "£500 fixed" },
];

const WORK_STEPS: WorkStep[] = [
  {
    title: "Discovery call",
    body: "we map your business structure and existing data",
  },
  {
    title: "Setup",
    body: "chart of accounts, bank feeds, tax codes configured",
  },
  {
    title: "Data entry",
    body: "opening balances and historical transactions entered",
  },
  {
    title: "Handover",
    body: "walkthrough with your team, first reconciliation done",
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

function XeroChecklistVisual() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const canAnimate = inView && !reduceMotion;

  return (
    <div ref={ref} className="xero-visual" aria-hidden="true">
      <svg className="xero-svg" viewBox="0 0 600 430" role="presentation">
        <rect x="1" y="1" width="598" height="428" rx="8" fill="#111F2E" stroke="#1E2D3D" strokeWidth="1" />
        <rect x="34" y="34" width="532" height="362" rx="8" fill="#0D1B2A" stroke="#1E2D3D" strokeWidth="1" />
        <rect x="64" y="62" width="472" height="52" rx="8" fill="#111F2E" stroke="#1E2D3D" strokeWidth="1" />
        <circle cx="91" cy="88" r="10" fill="#1B77F2" stroke="#1B77F2" strokeWidth="1" />
        <text x="116" y="94" fill="#F5F7FA" fontFamily="Syne, sans-serif" fontSize="19" fontWeight="700">
          Xero setup checklist
        </text>

        {CHECKLIST_ITEMS.map((item, index) => {
          const y = 148 + index * 48;
          const delay = index * 0.6;

          return (
            <g key={item}>
              <rect x="72" y={y - 20} width="456" height="38" rx="8" fill="#111F2E" stroke="#1E2D3D" strokeWidth="1" />
              <motion.rect
                x="91"
                y={y - 11}
                width="20"
                height="20"
                rx="5"
                fill="#0D1B2A"
                stroke="#1B77F2"
                strokeWidth="2"
                initial={false}
                animate={
                  canAnimate
                    ? {
                        fill: ["#0D1B2A", "#0D1B2A", "#00D4AA"],
                        stroke: ["#1B77F2", "#1B77F2", "#00D4AA"],
                      }
                    : { fill: "#00D4AA", stroke: "#00D4AA" }
                }
                transition={{
                  duration: 0.42,
                  delay,
                  ease: EASE,
                }}
              />
              <motion.path
                d={`M${96} ${y - 1} L${100} ${y + 4} L${107} ${y - 6}`}
                fill="#0D1B2A"
                fillOpacity="0"
                stroke="#0D1B2A"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={false}
                animate={canAnimate ? { opacity: [0, 0, 1], pathLength: [0, 0, 1] } : { opacity: 1, pathLength: 1 }}
                transition={{
                  duration: 0.38,
                  delay: delay + 0.18,
                  ease: EASE,
                }}
              />
              <motion.text
                x="130"
                y={y + 4}
                fill="#F5F7FA"
                fontFamily="DM Sans, sans-serif"
                fontSize="15"
                fontWeight="700"
                initial={false}
                animate={canAnimate ? { opacity: [0.54, 1] } : { opacity: 1 }}
                transition={{ duration: 0.42, delay, ease: EASE }}
              >
                {item}
              </motion.text>
              <motion.rect
                x="416"
                y={y - 5}
                width="82"
                height="8"
                rx="4"
                fill="#1E2D3D"
                stroke="#1E2D3D"
                strokeWidth="1"
                initial={false}
                animate={canAnimate ? { opacity: [0.55, 0.16] } : { opacity: 0.16 }}
                transition={{ duration: 0.42, delay, ease: EASE }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function PricingCard({
  title,
  tiers,
}: {
  title: "SA" | "UK";
  tiers: PricingTier[];
}) {
  return (
    <article className="pricing-card">
      <h3>{title}</h3>
      <div className="pricing-list">
        {tiers.map((tier) => (
          <div className="pricing-row" key={`${title}-${tier.label}`}>
            <p>{tier.label}</p>
            <strong>{tier.price}</strong>
          </div>
        ))}
      </div>
      <p className="pricing-note">Includes 1-hour staff training session.</p>
    </article>
  );
}

export default function XeroImplementationPage() {
  return (
    <main className="xero-page">
      <Nav />

      <RevealSection className="service-hero">
        <GrainOverlay />
        <div className="page-wrap hero-grid">
          <div className="hero-copy">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>→</span>
              <Link href="/services/finance">Finance</Link>
              <span>→</span>
              <span>Xero Implementation</span>
            </nav>
            <p className="section-label">{TEMPLATE_BASE.pillarLabel}</p>
            <h1>{TEMPLATE_BASE.serviceName}</h1>
            <p className="hero-intro">{TEMPLATE_BASE.hookLine}</p>
          </div>

          <XeroChecklistVisual />
        </div>
      </RevealSection>

      <RevealSection className="covered-section">
        <div className="page-wrap">
          <div className="section-heading">
            <p className="section-label">What is covered</p>
            <h2>A Xero setup that actually works.</h2>
          </div>

          <div className="covered-bento">
            {COVERED_ITEMS.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  className={`covered-card ${item.className}`}
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: index * 0.06, ease: EASE }}
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

      <RevealSection className="migration-section">
        <div className="page-wrap">
          <article className="migration-card">
            <BookOpenCheck size={22} color="#00D4AA" strokeWidth={1.8} />
            <div>
              <h2>Already on another system?</h2>
              <p>
                We handle migrations from spreadsheets, Sage, QuickBooks, and other
                accounting systems. Your history comes across clean.
              </p>
            </div>
          </article>
        </div>
      </RevealSection>

      <RevealSection className="pricing-section">
        <div className="page-wrap">
          <div className="section-heading">
            <p className="section-label">Pricing</p>
            <h2>Fixed implementation fee. No hourly billing.</h2>
          </div>

          <div className="pricing-grid">
            <PricingCard title="SA" tiers={SA_TIERS} />
            <PricingCard title="UK" tiers={UK_TIERS} />
          </div>

          <p className="delivery-line">No invoice until your Xero account is live and reconciled.</p>
        </div>
      </RevealSection>

      <RevealSection className="work-section">
        <div className="page-wrap">
          <div className="section-heading">
            <p className="section-label">How it works</p>
            <h2>Live in five days.</h2>
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

      <RevealSection className="cta-section">
        <GrainOverlay />
        <div className="page-wrap">
          <div className="cta-band">
            <div>
              <p className="section-label">Ready to talk?</p>
              <h2>Xero done right — from day one.</h2>
              <p>One call. We scope your setup and tell you exactly what's needed.</p>
            </div>
            <div className="cta-actions">
              <Link className="primary-cta" href="/contact">
                Talk to us
                <ArrowRight size={18} color="#F5F7FA" strokeWidth={2} />
              </Link>
              <Link className="ghost-cta" href="/services/finance">
                See all Finance services
              </Link>
            </div>
          </div>
        </div>
      </RevealSection>

      <Footer />

      <style jsx global>{`
        .xero-page {
          min-height: 100vh;
          background-color: #0D1B2A;
          color: #F5F7FA;
        }

        .xero-page section {
          position: relative;
          overflow: hidden;
          background-color: #0D1B2A;
          border-top: 1px solid #1E2D3D;
        }

        .xero-page section:first-of-type {
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

        .service-hero {
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
          max-width: 840px;
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

        .xero-visual {
          position: relative;
          min-width: 0;
          min-height: 430px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          overflow: hidden;
        }

        .xero-svg {
          position: absolute;
          inset: 18px;
          width: calc(100% - 36px);
          height: calc(100% - 36px);
        }

        .covered-section,
        .migration-section,
        .pricing-section,
        .work-section,
        .cta-section {
          padding-top: 64px;
          padding-bottom: 76px;
        }

        .section-heading {
          max-width: 820px;
          margin-bottom: 34px;
        }

        .section-heading h2,
        .migration-card h2,
        .cta-band h2 {
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 48px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1;
        }

        .migration-card h2 {
          font-size: 36px;
        }

        .covered-bento {
          display: grid;
          grid-template-columns: minmax(0, 1.12fr) minmax(0, 0.88fr);
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
          min-height: 238px;
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

        .migration-card {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr);
          gap: 18px;
          align-items: start;
          border: 1px solid #1E2D3D;
          border-left: 4px solid #1B77F2;
          border-radius: 8px;
          background-color: #111F2E;
          padding: 30px;
        }

        .migration-card p {
          max-width: 850px;
          margin: 16px 0 0;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 16px;
          letter-spacing: 0;
          line-height: 1.7;
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
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(132px, auto);
          gap: 18px;
          align-items: center;
          border-bottom: 1px solid #1E2D3D;
          padding: 17px 0;
        }

        .pricing-row p,
        .pricing-row strong,
        .pricing-note,
        .delivery-line,
        .step-card p,
        .cta-band p {
          font-family: var(--font-dm-sans);
          letter-spacing: 0;
        }

        .pricing-row p {
          margin: 0;
          color: #F5F7FA;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.35;
        }

        .pricing-row strong {
          color: #00D4AA;
          font-size: 18px;
          font-weight: 700;
          line-height: 1.15;
          text-align: right;
        }

        .pricing-note {
          margin: 18px 0 0;
          color: #8892A4;
          font-size: 14px;
          line-height: 1.6;
        }

        .delivery-line {
          margin: 22px 0 0;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #1C2A3A;
          color: #F5F7FA;
          font-size: 17px;
          font-weight: 700;
          line-height: 1.45;
          padding: 18px 20px;
          text-align: center;
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

          .xero-visual {
            min-height: 410px;
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
          .service-hero,
          .covered-section,
          .migration-section,
          .pricing-section,
          .work-section,
          .cta-section {
            padding-top: 48px;
            padding-bottom: 56px;
          }

          .service-hero {
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

          .migration-card h2 {
            font-size: 30px;
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
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .pricing-row strong {
            text-align: left;
          }

          .migration-card {
            grid-template-columns: 1fr;
          }

          .cta-band {
            padding: 28px;
          }
        }

        @media (max-width: 560px) {
          .service-hero {
            padding-top: 104px;
            padding-bottom: 44px;
          }

          .hero-copy h1 {
            font-size: 44px;
          }

          .hero-intro {
            font-size: 16px;
          }

          .xero-visual {
            min-height: 360px;
          }

          .xero-svg {
            inset: 6px;
            width: calc(100% - 12px);
            height: calc(100% - 12px);
          }

          .covered-card,
          .pricing-card,
          .migration-card {
            padding: 24px;
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
