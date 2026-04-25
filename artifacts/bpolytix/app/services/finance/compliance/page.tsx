"use client";

import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import type { ServicePageTemplateProps } from "@/components/ServicePageTemplate";
import { Footer } from "@/components/Footer";
import { GrainOverlay } from "@/components/GrainOverlay";
import { Nav } from "@/components/Nav";
import { TabSwitcher, type Tab } from "@/components/ui/TabSwitcher";

type PricingRow = {
  service: string;
  fee: string;
};

type AudienceCard = {
  label: string;
  body: string;
};

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const TEMPLATE_BASE: Pick<
  ServicePageTemplateProps,
  "pillarLabel" | "serviceName" | "hookLine"
> = {
  pillarLabel: "Finance Office",
  serviceName: "Stay registered. Stay compliant. Never miss a filing again.",
  hookLine:
    "Starting a business or keeping one running means paperwork, registrations, and deadlines that never stop. We handle all of it.",
};

const SA_ITEMS = [
  "Company registration (CIPC — Pty Ltd, NPC, and other structures)",
  "Registered address service",
  "SARS registrations — Income Tax, VAT, PAYE, UIF",
  "B-BBEE affidavit (businesses under R10M turnover)",
  "CIPC annual returns",
  "Beneficial ownership filings",
  "POPIA compliance setup — Information Officer registration, PAIA manual, privacy policy",
  "Basic company secretarial",
];

const UK_ITEMS = [
  "Companies House incorporation",
  "HMRC registrations — Corporation Tax, VAT, PAYE",
  "Registered office address service",
  "Confirmation statement filing (annual)",
  "GDPR basic setup — privacy policy, data processing register, cookie compliance",
  "Basic company secretarial",
];

const SA_PRICING: PricingRow[] = [
  { service: "Company registration (CIPC)", fee: "R850 fixed" },
  { service: "CIPC annual return", fee: "R350 fixed" },
  { service: "POPIA setup package", fee: "R3,500 fixed" },
  { service: "Registered address", fee: "R350/month" },
  { service: "Full compliance retainer", fee: "R1,800/month" },
];

const UK_PRICING: PricingRow[] = [
  { service: "Company incorporation (Companies House)", fee: "£150 fixed" },
  { service: "Confirmation statement filing", fee: "£95 fixed" },
  { service: "GDPR basic setup", fee: "£650 fixed" },
  { service: "Registered office address", fee: "£29/month" },
  { service: "Full compliance retainer", fee: "£175/month" },
];

const AUDIENCE_CARDS: AudienceCard[] = [
  {
    label: "Starting out",
    body: "You're registering a new business in SA or the UK and need everything set up correctly from day one — company, tax, compliance, and address.",
  },
  {
    label: "Already trading",
    body: "You're already running but have missed filings, let registrations lapse, or aren't sure if you're POPIA or GDPR compliant. We audit and fix.",
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

function ComplianceTimelineVisual() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const canAnimate = inView && !reduceMotion;

  const nodes = [
    { x: 70, label: "CIPC Registration" },
    { x: 174, label: "SARS Registration" },
    { x: 278, label: "PAYE/UIF" },
    { x: 382, label: "Annual Return" },
    { x: 486, label: "POPIA Setup" },
  ];

  return (
    <div ref={ref} className="timeline-visual" aria-hidden="true">
      <svg className="timeline-svg" viewBox="0 0 560 340" role="presentation">
        <rect x="1" y="1" width="558" height="338" rx="8" fill="#111F2E" stroke="#1E2D3D" />
        <rect x="38" y="54" width="484" height="232" rx="8" fill="#0D1B2A" stroke="#1E2D3D" />
        <path d="M58 114 H502 M58 174 H502 M58 234 H502" fill="none" stroke="#1E2D3D" strokeWidth="1" />
        <path d="M70 170 H486" fill="none" stroke="#8892A4" strokeWidth="3" strokeLinecap="round" />

        <motion.path
          d="M70 170 H486"
          fill="none"
          stroke="#1B77F2"
          strokeWidth="4"
          strokeLinecap="round"
          initial={false}
          animate={canAnimate ? { pathLength: [0, 1] } : { pathLength: 1 }}
          transition={{ duration: 4.8, repeat: canAnimate ? Infinity : 0, repeatDelay: 1.4, ease: "easeInOut" }}
        />

        {nodes.map((node, index) => (
          <motion.g key={node.label}>
            <motion.circle
              cx={node.x}
              cy="170"
              r="17"
              fill="#0D1B2A"
              stroke="#8892A4"
              strokeWidth="3"
              animate={
                canAnimate
                  ? {
                      stroke: ["#8892A4", "#1B77F2", "#1B77F2", "#8892A4"],
                    }
                  : { stroke: "#1B77F2" }
              }
              transition={{
                duration: 4.8,
                delay: index * 0.42,
                repeat: canAnimate ? Infinity : 0,
                repeatDelay: 1.4,
                ease: "easeInOut",
              }}
            />
            <motion.path
              d={`M${node.x - 7} 169 L${node.x - 2} 174 L${node.x + 8} 163`}
              fill="none"
              stroke="#00D4AA"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={
                canAnimate
                  ? { opacity: [0, 0, 1, 1, 0] }
                  : { opacity: 1 }
              }
              transition={{
                duration: 4.8,
                delay: index * 0.42,
                repeat: canAnimate ? Infinity : 0,
                repeatDelay: 1.4,
                ease: "easeInOut",
              }}
            />
            <text
              x={node.x}
              y={index % 2 === 0 ? "128" : "222"}
              fill="#F5F7FA"
              fontFamily="DM Sans, sans-serif"
              fontSize="11"
              fontWeight="700"
              textAnchor="middle"
            >
              {node.label}
            </text>
            <path
              d={index % 2 === 0 ? `M${node.x} 148 V137` : `M${node.x} 192 V204`}
              fill="none"
              stroke="#1E2D3D"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </motion.g>
        ))}
      </svg>

      <div className="timeline-status">
        <span />
        Filing calendar active
      </div>
    </div>
  );
}

function MarketPanel({
  heading,
  items,
}: {
  heading: string;
  items: string[];
}) {
  return (
    <div className="market-panel">
      <h3>{heading}</h3>
      <div className="market-list">
        {items.map((item) => (
          <div className="market-item" key={item}>
            <CheckCircle size={18} color="#00D4AA" strokeWidth={1.8} />
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PricingTable({
  title,
  rows,
}: {
  title: string;
  rows: PricingRow[];
}) {
  return (
    <article className="pricing-card">
      <h3>{title}</h3>
      <div className="pricing-table" role="table" aria-label={`${title} pricing`}>
        <div className="pricing-row pricing-head" role="row">
          <div role="columnheader">Service</div>
          <div role="columnheader">BPOLytix Fee</div>
        </div>
        {rows.map((row) => (
          <div className="pricing-row" role="row" key={row.service}>
            <div role="cell">{row.service}</div>
            <div className="fee-cell" role="cell">{row.fee}</div>
          </div>
        ))}
      </div>
    </article>
  );
}

export default function CompliancePage() {
  const [activeMarket, setActiveMarket] = useState("sa");

  const tabs: Tab[] = [
    {
      id: "sa",
      label: "South Africa",
      content: (
        <MarketPanel
          heading="Everything your SA business needs to stay compliant."
          items={SA_ITEMS}
        />
      ),
    },
    {
      id: "uk",
      label: "United Kingdom",
      content: (
        <MarketPanel
          heading="Everything your UK business needs to stay compliant."
          items={UK_ITEMS}
        />
      ),
    },
  ];

  return (
    <main className="compliance-page">
      <Nav />

      <RevealSection className="compliance-hero">
        <GrainOverlay />
        <div className="page-wrap hero-grid">
          <div className="hero-copy">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>→</span>
              <Link href="/services/finance">Finance</Link>
              <span>→</span>
              <span>Compliance-as-a-Service</span>
            </nav>
            <p className="section-label">{TEMPLATE_BASE.pillarLabel}</p>
            <h1>{TEMPLATE_BASE.serviceName}</h1>
            <p className="hero-intro">{TEMPLATE_BASE.hookLine}</p>
          </div>

          <ComplianceTimelineVisual />
        </div>
      </RevealSection>

      <RevealSection className="markets-section">
        <div className="page-wrap">
          <div className="section-heading">
            <p className="section-label">Two markets</p>
            <h2>SA and UK compliance admin, kept in one place.</h2>
          </div>

          <div className="tabs-shell">
            <TabSwitcher
              tabs={tabs}
              activeId={activeMarket}
              onChange={setActiveMarket}
              className="market-tabs"
            />
            <p className="market-note">
              This is not accounting, tax advice, or auditing. It is administrative filing
              and compliance management — no accounting board registration required.
            </p>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="pricing-section">
        <div className="page-wrap">
          <div className="section-heading">
            <p className="section-label">Pricing</p>
            <h2>Fixed fees. No hourly billing. No surprises.</h2>
          </div>

          <div className="pricing-grid">
            <PricingTable title="SA Pricing" rows={SA_PRICING} />
            <PricingTable title="UK Pricing" rows={UK_PRICING} />
          </div>

          <p className="approval-line">
            No invoice until your registration is confirmed or your filing is submitted.
          </p>
          <p className="market-comparison">
            SA company registration: market rate R1,500–R5,000. POPIA setup: R8,000–R25,000.
            UK incorporation: £200–£800. GDPR setup: £1,500–£5,000.
          </p>
        </div>
      </RevealSection>

      <RevealSection className="audience-section">
        <div className="page-wrap">
          <div className="section-heading">
            <p className="section-label">Who this is for</p>
            <h2>Built for two types of business.</h2>
          </div>

          <div className="audience-grid">
            {AUDIENCE_CARDS.map((card) => (
              <motion.article
                className="audience-card"
                key={card.label}
                whileHover={{ y: -4, transition: { duration: 0.2, ease: EASE } }}
              >
                <p>{card.label}</p>
                <h3>{card.body}</h3>
              </motion.article>
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
              <h2>Registration, filings, compliance — all off your plate.</h2>
              <p>One call. We tell you exactly what you need and what it will cost.</p>
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
        .compliance-page {
          min-height: 100vh;
          background-color: #0D1B2A;
          color: #F5F7FA;
        }

        .compliance-page section {
          position: relative;
          overflow: hidden;
          background-color: #0D1B2A;
          border-top: 1px solid #1E2D3D;
        }

        .compliance-page section:first-of-type {
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

        .compliance-hero {
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

        .timeline-visual {
          position: relative;
          min-width: 0;
          min-height: 430px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          overflow: hidden;
        }

        .timeline-svg {
          position: absolute;
          inset: 24px;
          width: calc(100% - 48px);
          height: calc(100% - 48px);
        }

        .timeline-status {
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

        .timeline-status span {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background-color: #00D4AA;
        }

        .markets-section,
        .pricing-section,
        .audience-section,
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

        .tabs-shell {
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          overflow: hidden;
        }

        .market-tabs {
          min-width: 0;
        }

        .market-panel {
          padding: 30px;
        }

        .market-panel h3,
        .pricing-card h3,
        .audience-card h3 {
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.12;
        }

        .market-list {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 14px 24px;
          margin-top: 24px;
        }

        .market-item {
          display: flex;
          min-width: 0;
          align-items: flex-start;
          gap: 10px;
        }

        .market-item svg {
          flex: 0 0 auto;
          margin-top: 3px;
        }

        .market-item p {
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-dm-sans);
          font-size: 16px;
          letter-spacing: 0;
          line-height: 1.55;
        }

        .market-note {
          margin: 0;
          border-top: 1px solid #1E2D3D;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 14px;
          letter-spacing: 0;
          line-height: 1.65;
          padding: 18px 30px;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .pricing-card {
          min-width: 0;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          padding: 30px;
        }

        .pricing-table {
          margin-top: 22px;
          border-top: 1px solid #1E2D3D;
        }

        .pricing-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(128px, 0.42fr);
          gap: 20px;
          border-bottom: 1px solid #1E2D3D;
        }

        .pricing-row > div {
          min-width: 0;
          color: #F5F7FA;
          font-family: var(--font-dm-sans);
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.45;
          padding: 15px 0;
        }

        .pricing-head > div {
          color: #8892A4;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .fee-cell {
          color: #00D4AA !important;
          text-align: right;
        }

        .approval-line {
          margin: 22px 0 0;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #1C2A3A;
          color: #F5F7FA;
          font-family: var(--font-dm-sans);
          font-size: 17px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.45;
          padding: 18px 20px;
          text-align: center;
        }

        .market-comparison {
          max-width: 900px;
          margin: 18px 0 0;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 14px;
          letter-spacing: 0;
          line-height: 1.65;
        }

        .audience-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
          gap: 18px;
        }

        .audience-card {
          min-width: 0;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          padding: 30px;
        }

        .audience-card p {
          margin: 0 0 18px;
          color: #00D4AA;
          font-family: var(--font-dm-sans);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
          line-height: 1.4;
          text-transform: uppercase;
        }

        .audience-card h3 {
          color: #F5F7FA;
          font-size: 24px;
          line-height: 1.25;
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
          font-family: var(--font-dm-sans);
          font-size: 17px;
          letter-spacing: 0;
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

          .timeline-visual {
            min-height: 410px;
          }
        }

        @media (max-width: 860px) {
          .compliance-hero,
          .markets-section,
          .pricing-section,
          .audience-section,
          .cta-section {
            padding-top: 48px;
            padding-bottom: 56px;
          }

          .compliance-hero {
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

          .market-list,
          .pricing-grid,
          .audience-grid {
            grid-template-columns: 1fr;
          }

          .cta-band,
          .cta-actions {
            align-items: stretch;
            flex-direction: column;
          }

          .cta-band {
            padding: 28px;
          }
        }

        @media (max-width: 560px) {
          .compliance-hero {
            padding-top: 104px;
            padding-bottom: 44px;
          }

          .hero-copy h1 {
            font-size: 44px;
          }

          .hero-intro {
            font-size: 16px;
          }

          .timeline-visual {
            min-height: 360px;
          }

          .timeline-svg {
            inset: 8px;
            width: calc(100% - 16px);
            height: calc(100% - 16px);
          }

          .timeline-status {
            right: 16px;
            bottom: 16px;
          }

          .market-panel,
          .pricing-card,
          .audience-card {
            padding: 24px;
          }

          .market-note {
            padding: 16px 24px;
          }

          .pricing-row {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .pricing-row > div:first-child {
            padding-bottom: 2px;
          }

          .pricing-row > div:last-child {
            padding-top: 2px;
          }

          .fee-cell {
            text-align: left;
          }

          .primary-cta,
          .ghost-cta {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .primary-cta,
          .ghost-cta,
          .audience-card {
            transition: none;
          }
        }
      `}</style>
    </main>
  );
}
