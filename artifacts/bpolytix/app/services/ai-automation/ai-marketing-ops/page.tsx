"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ServicePageTemplateProps } from "@/components/ServicePageTemplate";
import { Footer } from "@/components/Footer";
import { GrainOverlay } from "@/components/GrainOverlay";
import { Nav } from "@/components/Nav";

type BentoCard = {
  title: string;
  body: string;
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

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const TEMPLATE_BASE: Pick<
  ServicePageTemplateProps,
  "pillarLabel" | "serviceName" | "hookLine"
> = {
  pillarLabel: "AI & Automation Office",
  serviceName: "Your marketing, running 24/7 — without a full-time team.",
  hookLine:
    "We build and manage your AI-powered content engine. Posts go out. Leads come in. You stay focused on the work.",
};

const COVERAGE_CARDS: BentoCard[] = [
  {
    title: "Posts, captions, and copy — written and scheduled.",
    body: "We produce social content for your business every week. Written in your voice, scheduled to the right platforms, and built around what your customers actually search for. No brief needed from you once we know your business.",
    className: "card-large",
  },
  {
    title: "The right content, on the right platform, at the right time.",
    body: "Every piece of content goes to where your audience is. We handle the scheduling, the timing, and the platform differences — so you don't have to think about it.",
    className: "card-tall",
  },
  {
    title: "You see the numbers. We act on them.",
    body: "Monthly reporting shows you exactly what worked, what didn't, and what we're changing. No vanity metrics — just reach, enquiries, and cost per lead.",
    className: "card-wide",
  },
];

const SA_PRICING: PricingTier[] = [
  {
    name: "Starter",
    detail: "3 platforms, 12 posts/month",
    price: "R8,000/month",
  },
  {
    name: "Growth",
    detail: "5 platforms, 20 posts/month + paid ad management",
    price: "R13,000/month",
  },
  {
    name: "Full Ops",
    detail: "unlimited platforms, daily posts + analytics dashboard",
    price: "R18,000/month",
  },
];

const UK_PRICING: PricingTier[] = [
  {
    name: "Starter",
    price: "\u00a3500/month",
  },
  {
    name: "Growth",
    price: "\u00a3800/month",
  },
  {
    name: "Full Ops",
    price: "\u00a31,100/month",
  },
];

const WORK_STEPS: WorkStep[] = [
  {
    title: "Discovery call",
    body: "we learn your business, audience, and tone",
  },
  {
    title: "Content strategy",
    body: "we map platforms, post types, and posting schedule",
  },
  {
    title: "First batch delivered",
    body: "you review and approve before anything goes live",
  },
  {
    title: "We schedule and publish",
    body: "automated, consistent, on-brand",
  },
  {
    title: "Monthly review",
    body: "we report, adjust, and improve",
  },
];

const COMPARISON_ROWS = [
  {
    label: "SA monthly cost",
    inHouse: "R45,000\u2013R80,000 (content manager + designer + tools)",
    bpolytix: "From R8,000/month",
  },
  {
    label: "UK monthly cost",
    inHouse: "\u00a33,500\u2013\u00a36,000 (content manager + designer + tools)",
    bpolytix: "From \u00a3500/month",
  },
  {
    label: "Ownership",
    inHouse: "You pay forever",
    bpolytix: "You own it after 12 months",
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

function ContentPipelineVisual() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const canAnimate = inView && !reduceMotion;

  const nodes = [
    { x: 78, y: 92, label: "Content Brief" },
    { x: 222, y: 92, label: "AI Draft" },
    { x: 366, y: 92, label: "Scheduled Post" },
    { x: 366, y: 238, label: "Analytics" },
    { x: 78, y: 238, label: "Repeat" },
  ];

  return (
    <div ref={ref} className="pipeline-visual" aria-hidden="true">
      <svg className="pipeline-svg" viewBox="0 0 520 340" role="presentation">
        <rect x="1" y="1" width="518" height="338" rx="8" fill="#111F2E" stroke="#1E2D3D" />
        <path d="M46 46 H474 M46 170 H474 M46 294 H474" fill="none" stroke="#1E2D3D" strokeWidth="1" />
        <path d="M46 46 V294 M260 46 V294 M474 46 V294" fill="none" stroke="#1E2D3D" strokeWidth="1" />

        <path
          id="pipelineRoute"
          d="M122 92 H178 C198 92 202 92 222 92 H322 C346 92 342 92 366 92 V190 C366 214 366 214 366 238 H122 C96 238 78 220 78 194 V136 C78 112 78 92 78 92"
          fill="none"
          stroke="#1B77F2"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.72"
        />

        <motion.circle
          r="7"
          fill="#00D4AA"
          initial={false}
          animate={
            canAnimate
              ? {
                  offsetDistance: ["0%", "100%"],
                  opacity: [1, 1, 1],
                }
              : {
                  offsetDistance: "100%",
                  opacity: 1,
                }
          }
          transition={{
            duration: 7,
            repeat: canAnimate ? Infinity : 0,
            ease: "linear",
          }}
          style={{
            offsetPath:
              "path('M122 92 H178 C198 92 202 92 222 92 H322 C346 92 342 92 366 92 V190 C366 214 366 214 366 238 H122 C96 238 78 220 78 194 V136 C78 112 78 92 78 92')",
          }}
        />

        {nodes.map((node, index) => (
          <motion.g
            key={node.label}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={reduceMotion || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
          >
            <rect
              x={node.x - 54}
              y={node.y - 28}
              width="108"
              height="56"
              rx="8"
              fill="#0D1B2A"
              stroke="#1B77F2"
              strokeWidth="2"
            />
            <circle cx={node.x - 34} cy={node.y} r="5" fill="#00D4AA" stroke="#00D4AA" strokeWidth="1" />
            <text
              x={node.x - 20}
              y={node.y + 4}
              fill="#F5F7FA"
              fontFamily="DM Sans, sans-serif"
              fontSize="11"
              fontWeight="700"
            >
              {node.label}
            </text>
          </motion.g>
        ))}
      </svg>

      <div className="pipeline-status">
        <span />
        Content engine live
      </div>
    </div>
  );
}

function PricingColumn({
  region,
  tiers,
}: {
  region: string;
  tiers: PricingTier[];
}) {
  return (
    <article className="pricing-card">
      <h3>{region}</h3>
      <div className="pricing-list">
        {tiers.map((tier) => (
          <div className="pricing-row" key={`${region}-${tier.name}`}>
            <div>
              <p className="tier-name">{tier.name}</p>
              {tier.detail ? <p className="tier-detail">{tier.detail}</p> : null}
            </div>
            <p className="tier-price">{tier.price}</p>
          </div>
        ))}
      </div>
      <p className="pricing-note">
        You own your content library and analytics dashboard after 12 months.
      </p>
    </article>
  );
}

export default function AiMarketingOpsPage() {
  return (
    <main className="marketing-page">
      <Nav />

      <RevealSection className="marketing-hero">
        <GrainOverlay />
        <div className="page-wrap hero-grid">
          <div className="hero-copy">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>→</span>
              <Link href="/services/ai-automation">AI & Automation</Link>
              <span>→</span>
              <span>AI Marketing Ops</span>
            </nav>
            <p className="section-label">{TEMPLATE_BASE.pillarLabel}</p>
            <h1>{TEMPLATE_BASE.serviceName}</h1>
            <p className="hero-intro">{TEMPLATE_BASE.hookLine}</p>
          </div>

          <ContentPipelineVisual />
        </div>
      </RevealSection>

      <RevealSection className="coverage-section">
        <div className="page-wrap">
          <div className="section-heading">
            <p className="section-label">What it covers</p>
            <h2>Three parts of your marketing handled.</h2>
          </div>

          <div className="coverage-bento">
            {COVERAGE_CARDS.map((card) => (
              <motion.article
                className={`coverage-card ${card.className}`}
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
            <p className="section-label">Pricing</p>
            <h2>Fixed monthly fee. No retainer traps.</h2>
          </div>

          <div className="pricing-grid">
            <PricingColumn region="SA Pricing" tiers={SA_PRICING} />
            <PricingColumn region="UK Pricing" tiers={UK_PRICING} />
          </div>

          <p className="approval-line">
            No invoice until your first content batch is delivered and approved.
          </p>
        </div>
      </RevealSection>

      <RevealSection className="work-section">
        <div className="page-wrap">
          <div className="section-heading">
            <p className="section-label">How it works</p>
            <h2>From zero to a marketing engine in two weeks.</h2>
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
            <p className="section-label">Comparison</p>
            <h2>What you'd pay to build this team in-house</h2>
          </div>

          <div className="comparison-table" role="table" aria-label="In-house costs compared with BPOLytix AI Marketing Ops">
            <div className="comparison-row header-row" role="row">
              <div role="columnheader" />
              <div role="columnheader">In-house</div>
              <div role="columnheader">BPOLytix AI Marketing Ops</div>
            </div>
            {COMPARISON_ROWS.map((row) => (
              <div className="comparison-row" role="row" key={row.label}>
                <div className="row-label" role="cell">{row.label}</div>
                <div className="danger-cell" role="cell">{row.inHouse}</div>
                <div className="highlight-cell" role="cell">{row.bpolytix}</div>
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
              <h2>Ready to take marketing off your plate?</h2>
              <p>
                One call. We map your content strategy and show you exactly what we'll build.
              </p>
            </div>
            <div className="cta-actions">
              <Link className="primary-cta" href="/contact">
                Talk to us
                <ArrowRight size={18} color="#F5F7FA" strokeWidth={2} />
              </Link>
              <Link className="ghost-cta" href="/services/ai-automation">
                See all AI services
              </Link>
            </div>
          </div>
        </div>
      </RevealSection>

      <Footer />

      <style jsx global>{`
        .marketing-page {
          min-height: 100vh;
          background-color: #0D1B2A;
          color: #F5F7FA;
        }

        .marketing-page section {
          position: relative;
          overflow: hidden;
          background-color: #0D1B2A;
          border-top: 1px solid #1E2D3D;
        }

        .marketing-page section:first-of-type {
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

        .marketing-hero {
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

        .pipeline-visual {
          position: relative;
          min-width: 0;
          min-height: 430px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          overflow: hidden;
        }

        .pipeline-svg {
          position: absolute;
          inset: 24px;
          width: calc(100% - 48px);
          height: calc(100% - 48px);
        }

        .pipeline-status {
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

        .pipeline-status span {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background-color: #00D4AA;
        }

        .coverage-section,
        .pricing-section,
        .work-section,
        .comparison-section,
        .cta-section {
          padding-top: 64px;
          padding-bottom: 76px;
        }

        .section-heading {
          max-width: 780px;
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

        .coverage-bento {
          display: grid;
          grid-template-columns: minmax(0, 1.12fr) minmax(0, 0.88fr);
          grid-auto-rows: minmax(210px, auto);
          gap: 18px;
          align-items: stretch;
        }

        .coverage-card {
          min-width: 0;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          padding: 30px;
        }

        .coverage-card.card-large {
          min-height: 300px;
        }

        .coverage-card.card-tall {
          grid-row: span 2;
        }

        .coverage-card.card-wide {
          background-color: #1C2A3A;
        }

        .coverage-card h3,
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

        .coverage-card p {
          margin: 18px 0 0;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 16px;
          letter-spacing: 0;
          line-height: 1.7;
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
        .approval-line,
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

        .approval-line {
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
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 0;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          overflow: hidden;
        }

        .step-card {
          position: relative;
          min-height: 230px;
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
          grid-template-columns: minmax(170px, 0.7fr) minmax(0, 1.15fr) minmax(0, 1fr);
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

        .header-row {
          background-color: #1C2A3A;
        }

        .header-row > div {
          color: #8892A4;
          font-size: 13px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .row-label {
          color: #F5F7FA;
        }

        .danger-cell {
          color: #FF4444 !important;
        }

        .highlight-cell {
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
          .hero-grid {
            grid-template-columns: 1fr;
          }

          .pipeline-visual {
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
          .marketing-hero,
          .coverage-section,
          .pricing-section,
          .work-section,
          .comparison-section,
          .cta-section {
            padding-top: 48px;
            padding-bottom: 56px;
          }

          .marketing-hero {
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

          .coverage-bento,
          .pricing-grid {
            grid-template-columns: 1fr;
          }

          .coverage-card.card-tall {
            grid-row: auto;
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
            display: grid;
            gap: 12px;
            border: 0;
            background-color: transparent;
          }

          .comparison-row {
            display: grid;
            grid-template-columns: 1fr;
            border: 1px solid #1E2D3D;
            border-radius: 8px;
            background-color: #111F2E;
            overflow: hidden;
          }

          .comparison-row:not(:last-child) {
            border-bottom: 1px solid #1E2D3D;
          }

          .comparison-row > div:not(:last-child) {
            border-right: 0;
            border-bottom: 1px solid #1E2D3D;
          }

          .header-row {
            display: none;
          }

          .cta-band {
            padding: 28px;
          }
        }

        @media (max-width: 560px) {
          .marketing-hero {
            padding-top: 104px;
            padding-bottom: 44px;
          }

          .hero-copy h1 {
            font-size: 44px;
          }

          .hero-intro {
            font-size: 16px;
          }

          .pipeline-visual {
            min-height: 360px;
          }

          .pipeline-svg {
            inset: 12px;
            width: calc(100% - 24px);
            height: calc(100% - 24px);
          }

          .pipeline-status {
            right: 16px;
            bottom: 16px;
          }

          .primary-cta,
          .ghost-cta {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .primary-cta,
          .ghost-cta,
          .coverage-card {
            transition: none;
          }
        }
      `}</style>
    </main>
  );
}
