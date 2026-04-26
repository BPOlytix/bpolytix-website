"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BanknoteArrowUp,
  ChartNoAxesCombined,
  CreditCard,
  FileSpreadsheet,
  Landmark,
  ReceiptText,
  Scale,
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
  detail?: string;
  price: string;
};

type WorkStep = {
  title: string;
  body: string;
};

type ComparisonRow = {
  label: string;
  inHouse: string;
  bpolytix: string;
};

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const TEMPLATE_BASE: Pick<
  ServicePageTemplateProps,
  "pillarLabel" | "serviceName" | "hookLine"
> = {
  pillarLabel: "Finance Office",
  serviceName: "Your books done every month — without lifting a finger.",
  hookLine:
    "Categorised transactions, reconciled accounts, and clean monthly reports. Ready before you need them.",
};

const COVERED_ITEMS: CoveredItem[] = [
  {
    title: "Transaction categorisation (bank and credit card)",
    icon: CreditCard,
    className: "covered-large",
  },
  {
    title: "Monthly bank reconciliation",
    icon: Landmark,
    className: "covered-tall",
  },
  {
    title: "Accounts payable and receivable tracking",
    icon: BanknoteArrowUp,
    className: "covered-mid",
  },
  {
    title: "Monthly profit & loss statement",
    icon: ChartNoAxesCombined,
    className: "covered-mid",
  },
  {
    title: "Balance sheet",
    icon: Scale,
    className: "covered-wide",
  },
  {
    title: "VAT return preparation (SA: SARS | UK: HMRC)",
    icon: ReceiptText,
    className: "covered-wide",
  },
];

const SA_TIERS: PricingTier[] = [
  {
    name: "Starter",
    detail: "up to 100 transactions/month",
    price: "R3,500/month",
  },
  {
    name: "Growth",
    detail: "101–300 transactions",
    price: "R6,500/month",
  },
  {
    name: "Scale",
    detail: "301–600 transactions",
    price: "R10,500/month",
  },
];

const UK_TIERS: PricingTier[] = [
  {
    name: "Starter",
    price: "£275/month",
  },
  {
    name: "Growth",
    price: "£500/month",
  },
  {
    name: "Scale",
    price: "£800/month",
  },
];

const WORK_STEPS: WorkStep[] = [
  {
    title: "We connect to your accounts",
    body: "read-only access to your bank and accounting data",
  },
  {
    title: "We categorise and reconcile",
    body: "every transaction sorted and matched",
  },
  {
    title: "Monthly report delivered",
    body: "P&L, balance sheet, and any flags",
  },
  {
    title: "You review in 10 minutes",
    body: "we handle the follow-up questions",
  },
];

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    label: "SA monthly cost",
    inHouse: "R18,000–R28,000 all-in",
    bpolytix: "From R3,500/month",
  },
  {
    label: "UK monthly cost",
    inHouse: "£2,000–£3,500 all-in",
    bpolytix: "From £275/month",
  },
  {
    label: "Commitment",
    inHouse: "Full-time salary",
    bpolytix: "Monthly — scales with volume",
  },
];

const MONTH_COLUMNS = [
  {
    label: "Month 1",
    x: 54,
    delay: 0,
    widths: [104, 82, 116, 92, 108],
  },
  {
    label: "Month 2",
    x: 224,
    delay: 0.55,
    widths: [112, 94, 104, 78, 118],
  },
  {
    label: "Month 3",
    x: 394,
    delay: 1.1,
    widths: [98, 118, 86, 106, 92],
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

function TransactionFlowVisual() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const canAnimate = inView && !reduceMotion;

  return (
    <div ref={ref} className="transaction-visual" aria-hidden="true">
      <svg className="transaction-svg" viewBox="0 0 580 430" role="presentation">
        <rect x="1" y="1" width="578" height="428" rx="8" fill="#111F2E" stroke="#1E2D3D" strokeWidth="1" />
        <rect x="28" y="28" width="524" height="374" rx="8" fill="#0D1B2A" stroke="#1E2D3D" strokeWidth="1" />
        <path d="M198 56 V374 M368 56 V374" fill="#111F2E" fillOpacity="0" stroke="#1E2D3D" strokeWidth="1" />
        <path d="M54 110 H526 M54 278 H526" fill="#111F2E" fillOpacity="0" stroke="#1E2D3D" strokeWidth="1" opacity="0.72" />

        {MONTH_COLUMNS.map((month) => (
          <g key={month.label}>
            <text x={month.x + 66} y="82" fill="#8892A4" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="700" textAnchor="middle">
              {month.label}
            </text>
            <rect x={month.x} y="116" width="132" height="184" rx="8" fill="#111F2E" stroke="#1E2D3D" strokeWidth="1" />
            {month.widths.map((width, index) => {
              const targetY = 136 + index * 28;

              return (
                <motion.rect
                  key={`${month.label}-${index}`}
                  x={month.x + 14}
                  y={targetY}
                  width={width}
                  height="11"
                  rx="5"
                  fill="#1B77F2"
                  stroke="#1B77F2"
                  strokeWidth="1"
                  initial={false}
                  animate={
                    canAnimate
                      ? {
                          y: [96, targetY],
                          opacity: [0, 1],
                        }
                      : { y: targetY, opacity: 1 }
                  }
                  transition={{
                    duration: 0.55,
                    delay: month.delay + index * 0.12,
                    repeat: canAnimate ? Infinity : 0,
                    repeatDelay: 4.2,
                    ease: EASE,
                  }}
                />
              );
            })}
            <motion.circle
              cx={month.x + 66}
              cy="340"
              r="25"
              fill="#0D1B2A"
              stroke="#00D4AA"
              strokeWidth="2"
              initial={false}
              animate={
                canAnimate
                  ? { opacity: [0, 0, 1, 1, 0], scale: [0.92, 0.92, 1, 1, 0.96] }
                  : { opacity: 1, scale: 1 }
              }
              transition={{
                duration: 4.2,
                delay: month.delay + 0.7,
                repeat: canAnimate ? Infinity : 0,
                repeatDelay: 0.55,
                ease: "easeInOut",
              }}
            />
            <motion.path
              d={`M${month.x + 55} 339 L${month.x + 63} 347 L${month.x + 78} 330`}
              fill="#0D1B2A"
              fillOpacity="0"
              stroke="#00D4AA"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={false}
              animate={
                canAnimate
                  ? { opacity: [0, 0, 1, 1, 0], pathLength: [0, 0, 1, 1, 1] }
                  : { opacity: 1, pathLength: 1 }
              }
              transition={{
                duration: 4.2,
                delay: month.delay + 0.74,
                repeat: canAnimate ? Infinity : 0,
                repeatDelay: 0.55,
                ease: "easeInOut",
              }}
            />
          </g>
        ))}
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
          <div className="pricing-row" key={`${title}-${tier.name}`}>
            <div>
              <p>{tier.name}</p>
              {tier.detail ? <span>{tier.detail}</span> : null}
            </div>
            <strong>{tier.price}</strong>
          </div>
        ))}
      </div>
      <p className="pricing-note">Includes VAT return preparation.</p>
    </article>
  );
}

export default function OutsourcedBookkeepingPage() {
  return (
    <main className="bookkeeping-page">
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
              <span>Outsourced Bookkeeping</span>
            </nav>
            <p className="section-label">{TEMPLATE_BASE.pillarLabel}</p>
            <h1>{TEMPLATE_BASE.serviceName}</h1>
            <p className="hero-intro">{TEMPLATE_BASE.hookLine}</p>
          </div>

          <TransactionFlowVisual />
        </div>
      </RevealSection>

      <RevealSection className="covered-section">
        <div className="page-wrap">
          <div className="section-heading">
            <p className="section-label">What is covered</p>
            <h2>Everything your books need, every month.</h2>
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

      <RevealSection className="pricing-section">
        <div className="page-wrap">
          <div className="section-heading">
            <p className="section-label">Pricing</p>
            <h2>Fixed monthly. Based on transaction volume.</h2>
          </div>

          <div className="pricing-grid">
            <PricingCard title="SA" tiers={SA_TIERS} />
            <PricingCard title="UK" tiers={UK_TIERS} />
          </div>

          <p className="delivery-line">
            No invoice until your first month of books is delivered and reviewed.
          </p>
        </div>
      </RevealSection>

      <RevealSection className="work-section">
        <div className="page-wrap">
          <div className="section-heading">
            <p className="section-label">How it works</p>
            <h2>Clean books — delivered every month without chasing.</h2>
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
            <h2>What a bookkeeper costs to hire</h2>
          </div>

          <div className="comparison-table" role="table" aria-label="Bookkeeper cost comparison">
            <div className="comparison-row comparison-head" role="row">
              <div role="columnheader" aria-label="Comparison item" />
              <div role="columnheader">In-house bookkeeper</div>
              <div role="columnheader">BPOLytix Bookkeeping</div>
            </div>
            {COMPARISON_ROWS.map((row) => (
              <div className="comparison-row" role="row" key={row.label}>
                <div className="row-label" role="cell">
                  {row.label}
                </div>
                <div className="in-house-cell" role="cell">
                  {row.inHouse}
                </div>
                <div className="bpolytix-cell" role="cell">
                  {row.bpolytix}
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
              <h2>Clean books. Every month. No chasing.</h2>
              <p>One call. We review your current setup and tell you exactly what we'd fix.</p>
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
        .bookkeeping-page {
          min-height: 100vh;
          background-color: #0D1B2A;
          color: #F5F7FA;
        }

        .bookkeeping-page section {
          position: relative;
          overflow: hidden;
          background-color: #0D1B2A;
          border-top: 1px solid #1E2D3D;
        }

        .bookkeeping-page section:first-of-type {
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

        .transaction-visual {
          position: relative;
          min-width: 0;
          min-height: 430px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          overflow: hidden;
        }

        .transaction-svg {
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
        .pricing-row span,
        .pricing-row strong,
        .pricing-note,
        .delivery-line,
        .step-card p,
        .comparison-table,
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

        .pricing-row span {
          display: block;
          margin-top: 4px;
          color: #8892A4;
          font-size: 14px;
          line-height: 1.45;
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

        .comparison-table {
          overflow: hidden;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
        }

        .comparison-row {
          display: grid;
          grid-template-columns: minmax(180px, 0.62fr) minmax(0, 1fr) minmax(0, 1fr);
          border-bottom: 1px solid #1E2D3D;
        }

        .comparison-row:last-child {
          border-bottom: 0;
        }

        .comparison-row > div {
          min-width: 0;
          border-right: 1px solid #1E2D3D;
          color: #F5F7FA;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.45;
          padding: 18px 20px;
        }

        .comparison-row > div:last-child {
          border-right: 0;
        }

        .comparison-head > div {
          color: #8892A4;
          font-size: 13px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .row-label {
          color: #8892A4 !important;
        }

        .in-house-cell {
          color: #FF4444 !important;
        }

        .bpolytix-cell {
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

          .transaction-visual {
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
          .pricing-section,
          .work-section,
          .comparison-section,
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

          .comparison-row {
            grid-template-columns: 1fr;
          }

          .comparison-row > div {
            border-right: 0;
            border-bottom: 1px solid #1E2D3D;
          }

          .comparison-row > div:last-child {
            border-bottom: 0;
          }

          .comparison-head {
            display: none;
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

          .transaction-visual {
            min-height: 360px;
          }

          .transaction-svg {
            inset: 6px;
            width: calc(100% - 12px);
            height: calc(100% - 12px);
          }

          .covered-card,
          .pricing-card {
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
