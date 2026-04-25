"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CalendarClock,
  FileSignature,
  Landmark,
  ReceiptText,
  ShieldCheck,
  WalletCards,
  type LucideIcon,
} from "lucide-react";
import type { ServicePageTemplateProps } from "@/components/ServicePageTemplate";
import { Footer } from "@/components/Footer";
import { GrainOverlay } from "@/components/GrainOverlay";
import { Nav } from "@/components/Nav";

type HandleItem = {
  title: string;
  body: string;
  icon: LucideIcon;
  className: string;
};

type PricingLine = {
  label: string;
  detail?: string;
  value: string;
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
  pillarLabel: "People Office",
  serviceName: "Hiring someone in South Africa from the UK? We make it legal.",
  hookLine:
    "We become the registered employer on your behalf. We handle the contract, the payroll, the tax, and the compliance. You manage the person's work.",
};

const HANDLE_ITEMS: HandleItem[] = [
  {
    title: "Employment contract",
    body: "SA-compliant and BCEA-aligned.",
    icon: FileSignature,
    className: "handle-large",
  },
  {
    title: "Monthly payroll processing",
    body: "Pay run prepared and processed every month.",
    icon: WalletCards,
    className: "handle-tall",
  },
  {
    title: "PAYE registration",
    body: "Registration plus monthly SARS submission.",
    icon: Landmark,
    className: "handle-mid",
  },
  {
    title: "UIF registration",
    body: "Employee registration and contributions handled.",
    icon: ShieldCheck,
    className: "handle-mid",
  },
  {
    title: "IRP5 certificates",
    body: "Annual tax certificates prepared when due.",
    icon: ReceiptText,
    className: "handle-wide",
  },
  {
    title: "BCEA compliance",
    body: "Leave, notice periods, and working hours kept in line.",
    icon: CalendarClock,
    className: "handle-wide",
  },
];

const PAY_LINES: PricingLine[] = [
  {
    label: "Per employee per month",
    detail: "fee varies by salary band — confirmed on first call",
    value: "R4,500–R7,500",
  },
  {
    label: "Setup fee",
    detail: "first employee",
    value: "R2,500 once-off",
  },
];

const WORK_STEPS: WorkStep[] = [
  {
    title: "Discovery call",
    body: "we confirm the role, salary, and start date",
  },
  {
    title: "Contract issued",
    body: "SA-compliant employment contract prepared and signed",
  },
  {
    title: "SARS & UIF registration",
    body: "we register the employee with all required bodies",
  },
  {
    title: "Payroll live",
    body: "monthly processing begins, submissions handled every month",
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

function CorridorMapVisual() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const canAnimate = inView && !reduceMotion;

  const flowDots = [
    {
      cx: [116, 145, 190, 245, 300],
      cy: [160, 112, 98, 104, 160],
      delay: 0,
    },
    {
      cx: [116, 145, 190, 245, 300],
      cy: [160, 208, 222, 216, 160],
      delay: 0.55,
    },
    {
      cx: [484, 455, 410, 355, 300],
      cy: [160, 112, 98, 104, 160],
      delay: 1.1,
    },
    {
      cx: [484, 455, 410, 355, 300],
      cy: [160, 208, 222, 216, 160],
      delay: 1.65,
    },
  ];

  return (
    <div ref={ref} className="corridor-visual" aria-hidden="true">
      <svg className="corridor-svg" viewBox="0 0 600 320" role="presentation">
        <rect x="1" y="1" width="598" height="318" rx="8" fill="#111F2E" stroke="#1E2D3D" />
        <path d="M44 80 H556 M44 160 H556 M44 240 H556" fill="none" stroke="#1E2D3D" strokeWidth="1" />
        <path d="M80 48 V272 M300 48 V272 M520 48 V272" fill="none" stroke="#1E2D3D" strokeWidth="1" />

        <path d="M116 160 Q145 112 190 98 Q245 104 300 160" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" strokeLinecap="round" />
        <path d="M116 160 Q145 208 190 222 Q245 216 300 160" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" strokeLinecap="round" />
        <path d="M484 160 Q455 112 410 98 Q355 104 300 160" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" strokeLinecap="round" />
        <path d="M484 160 Q455 208 410 222 Q355 216 300 160" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" strokeLinecap="round" />

        {flowDots.map((dot, index) => (
          <motion.circle
            key={index}
            r="4"
            fill="#00D4AA"
            stroke="#00D4AA"
            strokeWidth="1"
            initial={false}
            animate={
              canAnimate
                ? {
                    cx: dot.cx,
                    cy: dot.cy,
                    opacity: [0, 1, 1, 1, 0],
                  }
                : { cx: 300, cy: 160, opacity: 1 }
            }
            transition={{
              duration: 4.2,
              delay: dot.delay,
              repeat: canAnimate ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
        ))}

        <g>
          <circle cx="80" cy="160" r="36" fill="#0D1B2A" stroke="#1B77F2" strokeWidth="2" />
          <rect x="57" y="146" width="46" height="28" rx="3" fill="#1B77F2" stroke="#1E2D3D" strokeWidth="1" />
          <path d="M57 146 L103 174 M103 146 L57 174" fill="none" stroke="#F5F7FA" strokeWidth="3" />
          <path d="M80 146 V174 M57 160 H103" fill="none" stroke="#FF4444" strokeWidth="3" />
          <text x="80" y="212" fill="#8892A4" fontFamily="DM Sans, sans-serif" fontSize="12" fontWeight="700" textAnchor="middle">
            UK
          </text>
        </g>

        <g>
          <circle cx="520" cy="160" r="36" fill="#0D1B2A" stroke="#1B77F2" strokeWidth="2" />
          <rect x="497" y="146" width="46" height="28" rx="3" fill="#F5F7FA" stroke="#1E2D3D" strokeWidth="1" />
          <rect x="497" y="146" width="46" height="9" fill="#FF4444" stroke="#FF4444" strokeWidth="1" />
          <rect x="497" y="165" width="46" height="9" fill="#1B77F2" stroke="#1B77F2" strokeWidth="1" />
          <path d="M497 146 L518 160 L497 174 Z" fill="#00D4AA" stroke="#00D4AA" strokeWidth="1" />
          <path d="M497 146 L524 160 L497 174" fill="none" stroke="#0D1B2A" strokeWidth="2" />
          <text x="520" y="212" fill="#8892A4" fontFamily="DM Sans, sans-serif" fontSize="12" fontWeight="700" textAnchor="middle">
            SA
          </text>
        </g>

        <g>
          <rect x="145" y="63" width="90" height="34" rx="8" fill="rgba(0,212,170,0.08)" stroke="#00D4AA" strokeWidth="1" />
          <text x="190" y="84" fill="#F5F7FA" fontFamily="DM Sans, sans-serif" fontSize="12" fontWeight="700" textAnchor="middle">
            Contract
          </text>
        </g>

        <g>
          <rect x="369" y="63" width="82" height="34" rx="8" fill="rgba(0,212,170,0.08)" stroke="#00D4AA" strokeWidth="1" />
          <text x="410" y="84" fill="#F5F7FA" fontFamily="DM Sans, sans-serif" fontSize="12" fontWeight="700" textAnchor="middle">
            Payroll
          </text>
        </g>

        <g>
          <rect x="147" y="223" width="86" height="34" rx="8" fill="rgba(0,212,170,0.08)" stroke="#00D4AA" strokeWidth="1" />
          <text x="190" y="244" fill="#F5F7FA" fontFamily="DM Sans, sans-serif" fontSize="12" fontWeight="700" textAnchor="middle">
            PAYE/UIF
          </text>
        </g>

        <g>
          <rect x="347" y="223" width="126" height="34" rx="8" fill="rgba(0,212,170,0.08)" stroke="#00D4AA" strokeWidth="1" />
          <text x="410" y="244" fill="#F5F7FA" fontFamily="DM Sans, sans-serif" fontSize="12" fontWeight="700" textAnchor="middle">
            BCEA Compliance
          </text>
        </g>

        <g>
          <circle cx="300" cy="160" r="52" fill="rgba(27,119,242,0.12)" stroke="#1B77F2" strokeWidth="2" />
          <text x="300" y="166" fill="#F5F7FA" fontFamily="Syne, sans-serif" fontSize="15" fontWeight="600" textAnchor="middle">
            EOR
          </text>
        </g>
      </svg>

      <div className="corridor-status">
        <span />
        SA↔UK corridor active
      </div>
    </div>
  );
}

function PricingColumn() {
  return (
    <article className="pricing-card">
      <h3>What you pay</h3>
      <div className="pricing-list">
        {PAY_LINES.map((line) => (
          <div className="pricing-row" key={line.label}>
            <div>
              <p className="tier-name">{line.label}</p>
              {line.detail ? <p className="tier-detail">{line.detail}</p> : null}
            </div>
            <p className="tier-price">{line.value}</p>
          </div>
        ))}
      </div>
      <p className="pricing-note">
        No invoice until the employment contract is signed and payroll is running.
      </p>
    </article>
  );
}

function ComparisonColumn() {
  return (
    <article className="pricing-card comparison-card">
      <h3>Market comparison</h3>
      <p>
        Global EOR platforms charge{" "}
        <span className="danger-price">$500–$650 per employee per month.</span>
      </p>
      <p>
        BPOLytix is built for the SA↔UK corridor specifically — at a fraction of the price.
      </p>
    </article>
  );
}

export default function EmployerOfRecordPage() {
  return (
    <main className="eor-page">
      <Nav />

      <RevealSection className="eor-hero">
        <GrainOverlay />
        <div className="page-wrap hero-grid">
          <div className="hero-copy">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>→</span>
              <Link href="/services/people">People</Link>
              <span>→</span>
              <span>Employer of Record SA↔UK</span>
            </nav>
            <p className="section-label">{TEMPLATE_BASE.pillarLabel}</p>
            <h1>{TEMPLATE_BASE.serviceName}</h1>
            <p className="hero-intro">{TEMPLATE_BASE.hookLine}</p>
          </div>

          <CorridorMapVisual />
        </div>
      </RevealSection>

      <RevealSection className="explainer-section">
        <div className="page-wrap">
          <div className="explainer-copy">
            <p className="section-label">Plain English explainer</p>
            <h2>What is an Employer of Record — in plain English.</h2>
            <p>
              If a UK company wants to hire someone in South Africa, they legally need a
              registered SA entity to employ that person on their behalf. Without one, the
              worker has no contract, no UIF, no PAYE registration, and no protection under
              the Basic Conditions of Employment Act.
            </p>
            <p>
              BPOLytix becomes that entity. We employ your South African hire on paper,
              process their payroll every month, handle all SARS submissions, and keep
              everything BCEA-compliant. You pay us a fixed monthly fee. You manage the
              person's day-to-day work.
            </p>
            <p>
              No corporate red tape. No global platform pricing. A straightforward SA↔UK
              corridor service built for businesses that hire across borders.
            </p>
            <div className="explainer-callout">
              Both the employer and the employee are protected. Most UK↔SA arrangements
              currently are not.
            </div>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="handle-section">
        <div className="page-wrap">
          <div className="section-heading">
            <p className="section-label">What we handle</p>
            <h2>Everything on the employer side — handled.</h2>
          </div>

          <div className="handle-bento">
            {HANDLE_ITEMS.map((item) => {
              const Icon = item.icon;

              return (
                <motion.article
                  className={`handle-card ${item.className}`}
                  key={item.title}
                  whileHover={{ y: -4, transition: { duration: 0.2, ease: EASE } }}
                >
                  <span className="handle-icon">
                    <Icon size={19} color="#00D4AA" strokeWidth={1.8} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
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
            <PricingColumn />
            <ComparisonColumn />
          </div>
        </div>
      </RevealSection>

      <RevealSection className="work-section">
        <div className="page-wrap">
          <div className="section-heading">
            <p className="section-label">How it works</p>
            <h2>From handshake to compliant hire — in under two weeks.</h2>
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
              <h2>Hiring across borders shouldn't be this complicated.</h2>
              <p>One call. We tell you exactly what's needed and what it will cost.</p>
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
        .eor-page {
          min-height: 100vh;
          background-color: #0D1B2A;
          color: #F5F7FA;
        }

        .eor-page section {
          position: relative;
          overflow: hidden;
          background-color: #0D1B2A;
          border-top: 1px solid #1E2D3D;
        }

        .eor-page section:first-of-type {
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

        .eor-hero {
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

        .corridor-visual {
          position: relative;
          min-width: 0;
          min-height: 430px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          overflow: hidden;
        }

        .corridor-svg {
          position: absolute;
          inset: 24px;
          width: calc(100% - 48px);
          height: calc(100% - 48px);
        }

        .corridor-status {
          position: absolute;
          right: 24px;
          bottom: 24px;
          display: inline-flex;
          min-height: 38px;
          align-items: center;
          gap: 8px;
          border: 1px solid #1E2D3D;
          border-radius: 9999px;
          background-color: #0D1B2A;
          color: #00D4AA;
          font-family: var(--font-dm-sans);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1;
          padding: 0 12px;
        }

        .corridor-status span {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background-color: #00D4AA;
        }

        .explainer-section,
        .handle-section,
        .pricing-section,
        .work-section,
        .cta-section {
          padding-top: 64px;
          padding-bottom: 76px;
        }

        .explainer-copy {
          max-width: 980px;
        }

        .explainer-copy h2,
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

        .explainer-copy p:not(.section-label) {
          margin: 24px 0 0;
          color: #F5F7FA;
          font-family: var(--font-dm-sans);
          font-size: 18px;
          letter-spacing: 0;
          line-height: 1.7;
        }

        .explainer-callout {
          margin-top: 28px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          color: #00D4AA;
          font-family: var(--font-dm-sans);
          font-size: 17px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.55;
          padding: 20px 22px;
        }

        .section-heading {
          max-width: 820px;
          margin-bottom: 34px;
        }

        .handle-bento {
          display: grid;
          grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
          grid-auto-rows: minmax(170px, auto);
          gap: 18px;
          align-items: stretch;
        }

        .handle-card {
          min-width: 0;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          padding: 26px;
        }

        .handle-card.handle-large {
          min-height: 240px;
        }

        .handle-card.handle-tall {
          grid-row: span 2;
        }

        .handle-card.handle-wide {
          background-color: #1C2A3A;
        }

        .handle-icon {
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

        .handle-card h3,
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

        .handle-card p {
          margin: 12px 0 0;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 16px;
          letter-spacing: 0;
          line-height: 1.65;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 0.88fr);
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
        .tier-detail,
        .tier-price,
        .pricing-note,
        .comparison-card p,
        .step-card p,
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

        .tier-detail {
          margin: 5px 0 0;
          color: #8892A4;
          font-size: 14px;
          line-height: 1.55;
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
          color: #00D4AA;
          font-size: 14px;
          line-height: 1.6;
        }

        .comparison-card {
          background-color: #1C2A3A;
        }

        .comparison-card p {
          margin: 22px 0 0;
          color: #F5F7FA;
          font-size: 18px;
          line-height: 1.7;
        }

        .danger-price {
          color: #FF4444;
          font-weight: 700;
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
          .hero-grid {
            grid-template-columns: 1fr;
          }

          .corridor-visual {
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
          .eor-hero,
          .explainer-section,
          .handle-section,
          .pricing-section,
          .work-section,
          .cta-section {
            padding-top: 48px;
            padding-bottom: 56px;
          }

          .eor-hero {
            padding-top: 112px;
          }

          .page-wrap {
            padding-left: 24px;
            padding-right: 24px;
          }

          .hero-copy h1 {
            font-size: 52px;
          }

          .explainer-copy h2,
          .section-heading h2,
          .cta-band h2 {
            font-size: 36px;
          }

          .handle-bento,
          .pricing-grid {
            grid-template-columns: 1fr;
          }

          .handle-card.handle-tall,
          .handle-card.handle-wide {
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

          .cta-band {
            padding: 28px;
          }
        }

        @media (max-width: 560px) {
          .eor-hero {
            padding-top: 104px;
            padding-bottom: 44px;
          }

          .hero-copy h1 {
            font-size: 44px;
          }

          .hero-intro {
            font-size: 16px;
          }

          .corridor-visual {
            min-height: 360px;
          }

          .corridor-svg {
            inset: 10px;
            width: calc(100% - 20px);
            height: calc(100% - 20px);
          }

          .corridor-status {
            right: 16px;
            bottom: 16px;
          }

          .explainer-copy p:not(.section-label),
          .comparison-card p {
            font-size: 16px;
          }

          .primary-cta,
          .ghost-cta {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .primary-cta,
          .ghost-cta,
          .handle-card {
            transition: none;
          }
        }
      `}</style>
    </main>
  );
}
