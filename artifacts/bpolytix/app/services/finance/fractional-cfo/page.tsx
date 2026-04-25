"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ServicePageTemplateProps } from "@/components/ServicePageTemplate";
import { Footer } from "@/components/Footer";
import { GrainOverlay } from "@/components/GrainOverlay";
import { Nav } from "@/components/Nav";

type BentoItem = {
  title: string;
};

type StageCard = {
  title: string;
  body: string;
};

type PricingTier = {
  name: string;
  detail?: string;
  price: string;
};

type Step = {
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
  serviceName: "CFO-level thinking — without the CFO salary.",
  hookLine:
    "Cash flow, forecasting, investor reporting, and financial strategy. Available monthly for a fixed fee. No full-time hire needed.",
};

const COVERED_ITEMS: BentoItem[] = [
  { title: "Monthly management accounts" },
  { title: "Cash flow forecasting (13-week rolling)" },
  { title: "Budget vs actuals reporting" },
  { title: "Investor and board reporting packs" },
  { title: "Financial strategy and scenario planning" },
  { title: "KPI dashboard setup and monthly review" },
];

const STAGE_CARDS: StageCard[] = [
  {
    title: "Pre-revenue / early stage",
    body: "You need a financial model, a funding deck, and someone who can answer investor questions. You don't need a full-time CFO yet.",
  },
  {
    title: "Trading but growing fast",
    body: "You have revenue but no visibility. Cash flow surprises you every month. You need forecasts, reporting, and someone in your corner.",
  },
];

const SA_PRICING: PricingTier[] = [
  { name: "Starter", detail: "monthly accounts + cash flow", price: "R8,500/month" },
  { name: "Growth", detail: "+ board pack + KPI dashboard", price: "R15,000/month" },
  { name: "Strategic", detail: "full CFO function", price: "R22,000/month" },
];

const UK_PRICING: PricingTier[] = [
  { name: "Starter", price: "£650/month" },
  { name: "Growth", price: "£1,150/month" },
  { name: "Strategic", price: "£1,700/month" },
];

const WORK_STEPS: Step[] = [
  {
    title: "Discovery call",
    body: "We map your numbers, cash position, reporting needs, and current gaps.",
  },
  {
    title: "Reporting rhythm built",
    body: "Management accounts, forecasts, and board packs are set up for your business.",
  },
  {
    title: "Monthly CFO review",
    body: "We review performance, cash flow, and the decisions coming up next.",
  },
  {
    title: "Scales with your stage",
    body: "The monthly fee adjusts as your reporting needs and business complexity grow.",
  },
];

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    label: "SA monthly cost",
    inHouse: "R80,000–R150,000 all-in",
    bpolytix: "From R8,500/month",
  },
  {
    label: "UK monthly cost",
    inHouse: "£7,000–£12,000 all-in",
    bpolytix: "From £650/month",
  },
  {
    label: "Availability",
    inHouse: "1 person, full-time",
    bpolytix: "Senior-level, on demand",
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
  const inView = useInView(ref, { once: true, amount: 0.22 });
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

function DashboardVisual() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const canAnimate = inView && !reduceMotion;

  return (
    <div ref={ref} className="dashboard-visual" aria-hidden="true">
      <svg className="dashboard-svg" viewBox="0 0 620 500" role="presentation">
        <rect x="1" y="1" width="618" height="498" rx="8" fill="#111F2E" stroke="#1E2D3D" />
        <rect x="30" y="30" width="560" height="440" rx="8" fill="#0D1B2A" stroke="#1E2D3D" />

        <rect x="58" y="62" width="214" height="176" rx="8" fill="#1C2A3A" stroke="#1E2D3D" />
        <text x="78" y="98" fill="#8892A4" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="700">
          Cash position
        </text>
        <rect x="82" y="176" width="24" height="34" rx="4" fill="#1B77F2" stroke="#1B77F2" />
        <rect x="122" y="148" width="24" height="62" rx="4" fill="#1B77F2" stroke="#1B77F2" />
        <rect x="162" y="124" width="24" height="86" rx="4" fill="#1B77F2" stroke="#1B77F2" />
        <rect x="202" y="102" width="24" height="108" rx="4" fill="#1B77F2" stroke="#1B77F2" />
        <path d="M76 210 H238" fill="none" stroke="#8892A4" strokeWidth="2" strokeLinecap="round" />

        <rect x="302" y="86" width="252" height="150" rx="8" fill="#1C2A3A" stroke="#1E2D3D" />
        <text x="322" y="122" fill="#8892A4" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="700">
          Forecast
        </text>
        <path d="M324 190 C354 178 370 150 402 158 C432 166 442 126 476 132 C506 138 514 108 532 104" fill="none" stroke="#00D4AA" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M324 204 H532 M324 168 H532 M324 132 H532" fill="none" stroke="#1E2D3D" strokeWidth="1" />
        <circle cx="532" cy="104" r="6" fill="#00D4AA" stroke="#00D4AA" />

        <rect x="126" y="274" width="366" height="154" rx="8" fill="#1C2A3A" stroke="#1E2D3D" />
        <text x="150" y="310" fill="#8892A4" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="700">
          Board pack
        </text>
        <path d="M150 330 H468 M150 362 H468 M150 394 H468" fill="none" stroke="#1E2D3D" strokeWidth="1" />
        <text x="150" y="352" fill="#F5F7FA" fontFamily="DM Sans, sans-serif" fontSize="15" fontWeight="700">
          Revenue
        </text>
        <text x="420" y="352" fill="#F5F7FA" fontFamily="DM Sans, sans-serif" fontSize="15" fontWeight="700" textAnchor="end">
          000
        </text>
        <text x="150" y="384" fill="#F5F7FA" fontFamily="DM Sans, sans-serif" fontSize="15" fontWeight="700">
          Costs
        </text>
        <text x="420" y="384" fill="#F5F7FA" fontFamily="DM Sans, sans-serif" fontSize="15" fontWeight="700" textAnchor="end">
          000
        </text>
        <text x="150" y="416" fill="#F5F7FA" fontFamily="DM Sans, sans-serif" fontSize="15" fontWeight="700">
          Net
        </text>
        <text x="420" y="416" fill="#F5F7FA" fontFamily="DM Sans, sans-serif" fontSize="15" fontWeight="700" textAnchor="end">
          000
        </text>

        <motion.rect
          x="58"
          y="62"
          width="36"
          height="176"
          rx="8"
          fill="#00D4AA"
          stroke="#00D4AA"
          opacity="0.14"
          animate={canAnimate ? { x: [58, 236, 236] } : { x: 236 }}
          transition={{ duration: 2.1, repeat: canAnimate ? Infinity : 0, repeatDelay: 4.2, ease: "easeInOut" }}
        />
        <motion.rect
          x="302"
          y="86"
          width="36"
          height="150"
          rx="8"
          fill="#00D4AA"
          stroke="#00D4AA"
          opacity="0.14"
          animate={canAnimate ? { x: [302, 518, 518] } : { x: 518 }}
          transition={{ duration: 2.1, delay: 1.4, repeat: canAnimate ? Infinity : 0, repeatDelay: 4.2, ease: "easeInOut" }}
        />
        <motion.rect
          x="126"
          y="274"
          width="40"
          height="154"
          rx="8"
          fill="#00D4AA"
          stroke="#00D4AA"
          opacity="0.14"
          animate={canAnimate ? { x: [126, 452, 452] } : { x: 452 }}
          transition={{ duration: 2.1, delay: 2.8, repeat: canAnimate ? Infinity : 0, repeatDelay: 4.2, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

function PricingCard({
  title,
  tiers,
}: {
  title: string;
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
    </article>
  );
}

export default function FractionalCfoPage() {
  return (
    <main className="fractional-cfo-page">
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
              <span>Fractional CFO</span>
            </nav>
            <p className="section-label">{TEMPLATE_BASE.pillarLabel}</p>
            <h1>{TEMPLATE_BASE.serviceName}</h1>
            <p className="hero-intro">{TEMPLATE_BASE.hookLine}</p>
          </div>

          <DashboardVisual />
        </div>
      </RevealSection>

      <RevealSection className="covered-section">
        <div className="page-wrap">
          <div className="section-heading">
            <h2>The financial function your business needs at this stage.</h2>
          </div>

          <div className="bento-grid">
            {COVERED_ITEMS.map((item, index) => (
              <motion.article
                className={`bento-card card-${index + 1}`}
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: index * 0.06, ease: EASE }}
                whileHover={{ y: -4, transition: { duration: 0.2, ease: EASE } }}
              >
                <h3>{item.title}</h3>
              </motion.article>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="stage-section">
        <div className="page-wrap">
          <div className="section-heading">
            <h2>Built for two stages of business.</h2>
          </div>

          <div className="stage-grid">
            {STAGE_CARDS.map((card) => (
              <motion.article
                className="stage-card"
                key={card.title}
                whileHover={{ y: -4, transition: { duration: 0.2, ease: EASE } }}
              >
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="pricing-section">
        <div className="page-wrap">
          <div className="section-heading">
            <h2>Fixed monthly. Scales with your stage.</h2>
          </div>

          <div className="pricing-grid">
            <PricingCard title="SA" tiers={SA_PRICING} />
            <PricingCard title="UK" tiers={UK_PRICING} />
          </div>

          <p className="delivery-line">
            No invoice until your first management accounts are delivered.
          </p>
        </div>
      </RevealSection>

      <RevealSection className="comparison-section">
        <div className="page-wrap">
          <div className="section-heading">
            <h2>What a full-time CFO costs</h2>
          </div>

          <div className="comparison-table" role="table" aria-label="Full-time CFO cost comparison">
            <div className="comparison-row comparison-head" role="row">
              <div role="columnheader" />
              <div role="columnheader">In-house CFO</div>
              <div role="columnheader">BPOLytix Fractional CFO</div>
            </div>
            {COMPARISON_ROWS.map((row) => (
              <div className="comparison-row" role="row" key={row.label}>
                <div className="row-label" role="cell">{row.label}</div>
                <div className="in-house-cell" role="cell">{row.inHouse}</div>
                <div className="bpolytix-cell" role="cell">{row.bpolytix}</div>
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
              <h2>Financial clarity — starting this month.</h2>
              <p>One call. We review your numbers and tell you exactly what we'd build.</p>
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
        .fractional-cfo-page {
          min-height: 100vh;
          background-color: #0D1B2A;
          color: #F5F7FA;
        }

        .fractional-cfo-page section {
          position: relative;
          overflow: hidden;
          background-color: #0D1B2A;
          border-top: 1px solid #1E2D3D;
        }

        .fractional-cfo-page section:first-of-type {
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

        .dashboard-visual {
          position: relative;
          min-width: 0;
          min-height: 500px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          overflow: hidden;
        }

        .dashboard-svg {
          position: absolute;
          inset: 18px;
          width: calc(100% - 36px);
          height: calc(100% - 36px);
        }

        .covered-section,
        .stage-section,
        .pricing-section,
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

        .bento-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.18fr) minmax(0, 0.82fr) minmax(0, 1fr);
          gap: 18px;
          align-items: stretch;
        }

        .bento-card,
        .stage-card,
        .pricing-card {
          min-width: 0;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          padding: 30px;
        }

        .bento-card {
          min-height: 150px;
          display: flex;
          align-items: flex-end;
        }

        .bento-card.card-1,
        .bento-card.card-4 {
          grid-column: span 2;
        }

        .bento-card.card-6 {
          min-height: 190px;
        }

        .bento-card h3,
        .stage-card h3,
        .pricing-card h3 {
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.15;
        }

        .stage-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 18px;
        }

        .stage-card p {
          margin: 18px 0 0;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 17px;
          letter-spacing: 0;
          line-height: 1.7;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .pricing-list {
          display: grid;
          gap: 0;
          margin-top: 22px;
          border-top: 1px solid #1E2D3D;
        }

        .pricing-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(142px, auto);
          gap: 18px;
          align-items: center;
          border-bottom: 1px solid #1E2D3D;
          padding: 17px 0;
        }

        .pricing-row p {
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-dm-sans);
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.35;
        }

        .pricing-row span {
          display: block;
          margin-top: 4px;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 14px;
          letter-spacing: 0;
          line-height: 1.45;
        }

        .pricing-row strong {
          color: #00D4AA;
          font-family: var(--font-syne);
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.15;
          text-align: right;
        }

        .delivery-line {
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
          font-family: var(--font-dm-sans);
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0;
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

        .cta-band p {
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

          .dashboard-visual {
            min-height: 450px;
          }
        }

        @media (max-width: 860px) {
          .service-hero,
          .covered-section,
          .stage-section,
          .pricing-section,
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

          .bento-grid,
          .stage-grid,
          .pricing-grid {
            grid-template-columns: 1fr;
          }

          .bento-card.card-1,
          .bento-card.card-4 {
            grid-column: auto;
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

          .dashboard-visual {
            min-height: 360px;
          }

          .dashboard-svg {
            inset: 6px;
            width: calc(100% - 12px);
            height: calc(100% - 12px);
          }

          .bento-card,
          .stage-card,
          .pricing-card {
            padding: 24px;
          }

          .pricing-row {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .pricing-row strong {
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
          .bento-card,
          .stage-card {
            transition: none;
          }
        }
      `}</style>
    </main>
  );
}
