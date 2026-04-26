"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  FileCheck2,
  FileText,
  ReceiptText,
  ShieldCheck,
  UsersRound,
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
  serviceName: "Payroll runs on time. Every time.",
  hookLine:
    "Your staff paid correctly, your PAYE and UIF submitted on time, and your payslips out without you touching a spreadsheet.",
};

const COVERED_ITEMS: CoveredItem[] = [
  {
    title: "Monthly payroll processing (employees and contractors)",
    icon: UsersRound,
    className: "covered-large",
  },
  {
    title: "Payslip generation and distribution",
    icon: ReceiptText,
    className: "covered-tall",
  },
  {
    title: "PAYE calculation and SARS submission (SA) / HMRC RTI (UK)",
    icon: FileCheck2,
    className: "covered-mid",
  },
  {
    title: "UIF contributions (SA) / National Insurance (UK)",
    icon: ShieldCheck,
    className: "covered-mid",
  },
  {
    title: "IRP5 certificates (SA) / P60s (UK)",
    icon: FileText,
    className: "covered-wide",
  },
  {
    title: "Leave balance tracking",
    icon: CalendarDays,
    className: "covered-wide",
  },
];

const SA_TIERS: PricingTier[] = [
  { label: "Up to 5 employees", price: "R1,800/month" },
  { label: "6–15 employees", price: "R2,800/month" },
  { label: "16–30 employees", price: "R4,500/month" },
  { label: "Setup fee (once-off)", price: "R950" },
];

const UK_TIERS: PricingTier[] = [
  { label: "Up to 5 employees", price: "£150/month" },
  { label: "6–15 employees", price: "£240/month" },
  { label: "16–30 employees", price: "£380/month" },
  { label: "Setup fee (once-off)", price: "£95" },
];

const WORK_STEPS: WorkStep[] = [
  {
    title: "Setup call",
    body: "we capture employee details, pay rates, and leave balances",
  },
  {
    title: "First payroll run",
    body: "we process, you verify before anything is paid out",
  },
  {
    title: "Monthly cycle",
    body: "we process on your payroll date, every month",
  },
  {
    title: "Submissions handled",
    body: "SARS/HMRC filed, employees notified",
  },
];

const PAYROLL_NODES = [
  {
    label: "Capture hours",
    x: 300,
    y: 70,
  },
  {
    label: "Calculate pay",
    x: 492,
    y: 214,
  },
  {
    label: "Submit to SARS/HMRC",
    x: 300,
    y: 358,
  },
  {
    label: "Pay staff",
    x: 108,
    y: 214,
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

function PayrollCycleVisual() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const canAnimate = inView && !reduceMotion;

  return (
    <div ref={ref} className="payroll-visual" aria-hidden="true">
      <svg className="payroll-svg" viewBox="0 0 600 430" role="presentation">
        <rect x="1" y="1" width="598" height="428" rx="8" fill="#111F2E" stroke="#1E2D3D" strokeWidth="1" />
        <rect x="32" y="32" width="536" height="366" rx="8" fill="#0D1B2A" stroke="#1E2D3D" strokeWidth="1" />
        <path d="M300 70 C408 70 492 122 492 214 C492 306 408 358 300 358 C192 358 108 306 108 214 C108 122 192 70 300 70" fill="#111F2E" fillOpacity="0" stroke="#1E2D3D" strokeWidth="3" strokeLinecap="round" />
        <path d="M441 113 L458 119 L454 137" fill="#111F2E" fillOpacity="0" stroke="#1E2D3D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M441 315 L454 291 L468 315" fill="#111F2E" fillOpacity="0" stroke="#1E2D3D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M159 315 L146 291 L132 315" fill="#111F2E" fillOpacity="0" stroke="#1E2D3D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M159 113 L142 119 L146 137" fill="#111F2E" fillOpacity="0" stroke="#1E2D3D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

        <motion.circle
          r="7"
          fill="#00D4AA"
          stroke="#00D4AA"
          strokeWidth="1"
          initial={false}
          animate={
            canAnimate
              ? {
                  cx: [300, 396, 492, 396, 300, 204, 108, 204, 300],
                  cy: [70, 70, 214, 358, 358, 358, 214, 70, 70],
                  opacity: [1, 1, 1, 1, 1, 1, 1, 1, 1],
                }
              : { cx: 300, cy: 70, opacity: 1 }
          }
          transition={{
            duration: 7.2,
            repeat: canAnimate ? Infinity : 0,
            ease: "linear",
          }}
        />

        <circle cx="300" cy="214" r="72" fill="#111F2E" stroke="#1E2D3D" strokeWidth="1" />
        <text x="300" y="194" fill="#8892A4" fontFamily="DM Sans, sans-serif" fontSize="12" fontWeight="700" textAnchor="middle">
          Payroll month
        </text>
        <text x="300" y="232" fill="#F5F7FA" fontFamily="Syne, sans-serif" fontSize="32" fontWeight="700" textAnchor="middle" className="month-text month-jan">
          Jan
        </text>
        <text x="300" y="232" fill="#F5F7FA" fontFamily="Syne, sans-serif" fontSize="32" fontWeight="700" textAnchor="middle" className="month-text month-feb">
          Feb
        </text>
        <text x="300" y="232" fill="#F5F7FA" fontFamily="Syne, sans-serif" fontSize="32" fontWeight="700" textAnchor="middle" className="month-text month-mar">
          Mar
        </text>

        {PAYROLL_NODES.map((node) => (
          <g key={node.label}>
            <circle cx={node.x} cy={node.y} r="49" fill="#0D1B2A" stroke="#1B77F2" strokeWidth="2" />
            <circle cx={node.x} cy={node.y} r="35" fill="#111F2E" stroke="#1E2D3D" strokeWidth="1" />
            <text
              x={node.x}
              y={node.label === "Submit to SARS/HMRC" ? node.y - 4 : node.y + 5}
              fill="#F5F7FA"
              fontFamily="DM Sans, sans-serif"
              fontSize={node.label === "Submit to SARS/HMRC" ? "11" : "12"}
              fontWeight="700"
              textAnchor="middle"
            >
              {node.label === "Submit to SARS/HMRC" ? (
                <>
                  <tspan x={node.x} dy="0">Submit to</tspan>
                  <tspan x={node.x} dy="14">SARS/HMRC</tspan>
                </>
              ) : (
                node.label
              )}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function PricingCard({
  title,
  tiers,
  note,
}: {
  title: "SA" | "UK";
  tiers: PricingTier[];
  note: string;
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
      <p className="pricing-note">{note}</p>
    </article>
  );
}

export default function PayrollServicePage() {
  return (
    <main className="payroll-page">
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
              <span>Payroll</span>
            </nav>
            <p className="section-label">{TEMPLATE_BASE.pillarLabel}</p>
            <h1>{TEMPLATE_BASE.serviceName}</h1>
            <p className="hero-intro">{TEMPLATE_BASE.hookLine}</p>
          </div>

          <PayrollCycleVisual />
        </div>
      </RevealSection>

      <RevealSection className="covered-section">
        <div className="page-wrap">
          <div className="section-heading">
            <p className="section-label">What is covered</p>
            <h2>End-to-end payroll — nothing left for you to do.</h2>
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
            <h2>Per employee. Per month. Fixed.</h2>
          </div>

          <div className="pricing-grid">
            <PricingCard
              title="SA"
              tiers={SA_TIERS}
              note="Includes PAYE, UIF, and IRP5 certificates."
            />
            <PricingCard
              title="UK"
              tiers={UK_TIERS}
              note="Includes RTI submissions, NI, and P60s."
            />
          </div>

          <p className="delivery-line">
            No invoice until your first payroll run is complete and staff are paid.
          </p>
        </div>
      </RevealSection>

      <RevealSection className="work-section">
        <div className="page-wrap">
          <div className="section-heading">
            <p className="section-label">How it works</p>
            <h2>Set up once. Runs every month.</h2>
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
              <h2>Payroll off your plate — permanently.</h2>
              <p>One call. We confirm your setup and run your first payroll.</p>
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
        .payroll-page {
          min-height: 100vh;
          background-color: #0D1B2A;
          color: #F5F7FA;
        }

        .payroll-page section {
          position: relative;
          overflow: hidden;
          background-color: #0D1B2A;
          border-top: 1px solid #1E2D3D;
        }

        .payroll-page section:first-of-type {
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

        .payroll-visual {
          position: relative;
          min-width: 0;
          min-height: 430px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          overflow: hidden;
        }

        .payroll-svg {
          position: absolute;
          inset: 18px;
          width: calc(100% - 36px);
          height: calc(100% - 36px);
        }

        .month-text {
          opacity: 0;
          animation-duration: 6s;
          animation-iteration-count: infinite;
          animation-timing-function: steps(1, end);
        }

        .month-jan {
          animation-name: monthJan;
        }

        .month-feb {
          animation-name: monthFeb;
        }

        .month-mar {
          animation-name: monthMar;
        }

        @keyframes monthJan {
          0%, 33.333% { opacity: 1; }
          33.334%, 100% { opacity: 0; }
        }

        @keyframes monthFeb {
          0%, 33.333% { opacity: 0; }
          33.334%, 66.666% { opacity: 1; }
          66.667%, 100% { opacity: 0; }
        }

        @keyframes monthMar {
          0%, 66.666% { opacity: 0; }
          66.667%, 100% { opacity: 1; }
        }

        .covered-section,
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

          .payroll-visual {
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

          .payroll-visual {
            min-height: 360px;
          }

          .payroll-svg {
            inset: 4px;
            width: calc(100% - 8px);
            height: calc(100% - 8px);
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
          .covered-card,
          .month-text {
            animation: none;
            transition: none;
          }

          .month-jan {
            opacity: 1;
          }
        }
      `}</style>
    </main>
  );
}
