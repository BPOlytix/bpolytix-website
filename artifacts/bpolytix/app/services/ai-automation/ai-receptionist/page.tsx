"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ServicePageTemplateProps } from "@/components/ServicePageTemplate";
import { Footer } from "@/components/Footer";
import { GrainOverlay } from "@/components/GrainOverlay";
import { Nav } from "@/components/Nav";

type FeatureCard = {
  title: string;
  body: string;
  className: string;
};

type PricingTier = {
  label: string;
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
  pillarLabel: "AI & Automation Office",
  serviceName: "A phone line that never misses a call.",
  hookLine:
    "Books appointments. Answers questions. Qualifies enquiries. 24 hours a day, 7 days a week — without a receptionist on payroll.",
};

const FEATURES: FeatureCard[] = [
  {
    title: "Never misses a call",
    body: "Every inbound call is answered instantly — no voicemail, no missed enquiries, no calls bouncing to a mobile.",
    className: "feature-large",
  },
  {
    title: "Books appointments directly",
    body: "Callers can book, reschedule, or cancel appointments in real time. Confirmation sent automatically.",
    className: "feature-tall",
  },
  {
    title: "Answers your FAQs",
    body: "We train the agent on your business — services, pricing, location, hours. Common questions get answered without human involvement.",
    className: "feature-mid",
  },
  {
    title: "Qualifies and escalates",
    body: "High-priority enquiries are flagged and transferred to the right person immediately. Everything else is handled.",
    className: "feature-wide",
  },
];

const SA_PRICING: PricingTier[] = [
  { label: "Setup (once-off)", value: "R2,500" },
  { label: "Monthly fee", value: "R999/month" },
];

const UK_PRICING: PricingTier[] = [
  { label: "Setup (once-off)", value: "£150" },
  { label: "Monthly fee", value: "£79/month" },
];

const WORK_STEPS: WorkStep[] = [
  {
    title: "Discovery call",
    body: "we map your call types, FAQs, and booking process",
  },
  {
    title: "Agent trained",
    body: "we build and train the voice agent on your business",
  },
  {
    title: "Test calls",
    body: "you call in and verify before anything goes live",
  },
  {
    title: "Go live",
    body: "your number routes through the agent from day one",
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

function CallFlowVisual() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const canAnimate = inView && !reduceMotion;

  const mainNodes = [
    { x: 72, y: 110, label: "Phone rings" },
    { x: 204, y: 110, label: "AI answers" },
    { x: 336, y: 110, label: "Intent detected" },
  ];

  return (
    <div ref={ref} className="call-visual" aria-hidden="true">
      <svg className="call-svg" viewBox="0 0 560 340" role="presentation">
        <defs>
          <marker
            id="mainArrow"
            markerHeight="8"
            markerWidth="8"
            orient="auto"
            refX="7"
            refY="4"
          >
            <path d="M0 0 L8 4 L0 8 Z" fill="#1B77F2" stroke="#1B77F2" strokeWidth="1" />
          </marker>
          <marker
            id="bookArrow"
            markerHeight="8"
            markerWidth="8"
            orient="auto"
            refX="7"
            refY="4"
          >
            <path d="M0 0 L8 4 L0 8 Z" fill="#00D4AA" stroke="#00D4AA" strokeWidth="1" />
          </marker>
          <marker
            id="queryArrow"
            markerHeight="8"
            markerWidth="8"
            orient="auto"
            refX="7"
            refY="4"
          >
            <path d="M0 0 L8 4 L0 8 Z" fill="#1B77F2" stroke="#1B77F2" strokeWidth="1" />
          </marker>
          <marker
            id="escalateArrow"
            markerHeight="8"
            markerWidth="8"
            orient="auto"
            refX="7"
            refY="4"
          >
            <path d="M0 0 L8 4 L0 8 Z" fill="#8892A4" stroke="#8892A4" strokeWidth="1" />
          </marker>
        </defs>

        <rect x="1" y="1" width="558" height="338" rx="8" fill="#111F2E" stroke="#1E2D3D" />
        <path d="M48 58 H512 M48 170 H512 M48 282 H512" fill="none" stroke="#1E2D3D" strokeWidth="1" />
        <path d="M104 42 V300 M280 42 V300 M456 42 V300" fill="none" stroke="#1E2D3D" strokeWidth="1" />

        <path
          d="M112 110 H164 M244 110 H296"
          fill="none"
          stroke="#1B77F2"
          strokeWidth="4"
          strokeLinecap="round"
          markerEnd="url(#mainArrow)"
        />
        <path
          d="M376 110 C404 110 410 74 424 70"
          fill="none"
          stroke="#00D4AA"
          strokeWidth="4"
          strokeLinecap="round"
          markerEnd="url(#bookArrow)"
        />
        <path
          d="M376 110 C404 110 410 150 424 150"
          fill="none"
          stroke="#1B77F2"
          strokeWidth="4"
          strokeLinecap="round"
          markerEnd="url(#queryArrow)"
        />
        <path
          d="M376 110 C404 110 410 226 424 230"
          fill="none"
          stroke="#8892A4"
          strokeWidth="4"
          strokeLinecap="round"
          markerEnd="url(#escalateArrow)"
        />

        <motion.circle
          r="7"
          fill="#00D4AA"
          stroke="#00D4AA"
          strokeWidth="1"
          initial={false}
          animate={
            canAnimate
              ? {
                  cx: [72, 204, 336, 452, 452, 452],
                  cy: [110, 110, 110, 70, 150, 230],
                  opacity: [0, 1, 1, 1, 0.75, 0],
                }
              : { cx: 452, cy: 70, opacity: 1 }
          }
          transition={{
            duration: 5.8,
            repeat: canAnimate ? Infinity : 0,
            repeatDelay: 1,
            ease: "easeInOut",
          }}
        />

        {mainNodes.map((node, index) => (
          <motion.g
            key={node.label}
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={reduceMotion || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
          >
            <rect x={node.x - 52} y={node.y - 25} width="104" height="50" rx="8" fill="#0D1B2A" stroke="#1B77F2" strokeWidth="2" />
            <circle cx={node.x - 31} cy={node.y} r="5" fill="#00D4AA" stroke="#00D4AA" strokeWidth="1" />
            <text x={node.x - 17} y={node.y + 4} fill="#F5F7FA" fontFamily="DM Sans, sans-serif" fontSize="11" fontWeight="700">
              {node.label}
            </text>
          </motion.g>
        ))}

        <motion.g
          initial={reduceMotion ? false : { opacity: 0, x: 16 }}
          animate={reduceMotion || inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
          transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
        >
          <rect x="389" y="46" width="126" height="48" rx="8" fill="#0D1B2A" stroke="#00D4AA" strokeWidth="2" />
          <circle cx="410" cy="70" r="5" fill="#00D4AA" stroke="#00D4AA" strokeWidth="1" />
          <text x="424" y="74" fill="#F5F7FA" fontFamily="DM Sans, sans-serif" fontSize="11" fontWeight="700">
            Book appointment
          </text>
        </motion.g>

        <motion.g
          initial={reduceMotion ? false : { opacity: 0, x: 16 }}
          animate={reduceMotion || inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
          transition={{ duration: 0.7, delay: 0.26, ease: EASE }}
        >
          <rect x="389" y="126" width="126" height="48" rx="8" fill="#0D1B2A" stroke="#1B77F2" strokeWidth="2" />
          <circle cx="410" cy="150" r="5" fill="#1B77F2" stroke="#1B77F2" strokeWidth="1" />
          <text x="424" y="154" fill="#F5F7FA" fontFamily="DM Sans, sans-serif" fontSize="11" fontWeight="700">
            Answer query
          </text>
        </motion.g>

        <motion.g
          initial={reduceMotion ? false : { opacity: 0, x: 16 }}
          animate={reduceMotion || inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
          transition={{ duration: 0.7, delay: 0.34, ease: EASE }}
        >
          <rect x="389" y="206" width="126" height="48" rx="8" fill="#0D1B2A" stroke="#8892A4" strokeWidth="2" />
          <circle cx="410" cy="230" r="5" fill="#8892A4" stroke="#8892A4" strokeWidth="1" />
          <text x="424" y="234" fill="#F5F7FA" fontFamily="DM Sans, sans-serif" fontSize="11" fontWeight="700">
            Escalate to human
          </text>
        </motion.g>
      </svg>

      <div className="call-status">
        <span />
        Inbound calls handled
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
          <div className="pricing-row" key={`${region}-${tier.label}`}>
            <p className="tier-name">{tier.label}</p>
            <p className="tier-price">{tier.value}</p>
          </div>
        ))}
      </div>
      <p className="pricing-note">
        You own the agent after 12 months. Monthly fee covers hosting and maintenance.
      </p>
    </article>
  );
}

export default function AiReceptionistPage() {
  return (
    <main className="receptionist-page">
      <Nav />

      <RevealSection className="receptionist-hero">
        <GrainOverlay />
        <div className="page-wrap hero-grid">
          <div className="hero-copy">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>→</span>
              <Link href="/services/ai-automation">AI & Automation</Link>
              <span>→</span>
              <span>AI Receptionist</span>
            </nav>
            <p className="section-label">{TEMPLATE_BASE.pillarLabel}</p>
            <h1>{TEMPLATE_BASE.serviceName}</h1>
            <p className="hero-intro">{TEMPLATE_BASE.hookLine}</p>
          </div>

          <CallFlowVisual />
        </div>
      </RevealSection>

      <RevealSection className="features-section">
        <div className="page-wrap">
          <div className="section-heading">
            <p className="section-label">What it does</p>
            <h2>Everything your front desk handles — automated.</h2>
          </div>

          <div className="feature-bento">
            {FEATURES.map((feature) => (
              <motion.article
                className={`feature-card ${feature.className}`}
                key={feature.title}
                whileHover={{ y: -4, transition: { duration: 0.2, ease: EASE } }}
              >
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="pricing-section">
        <div className="page-wrap">
          <div className="section-heading">
            <p className="section-label">Pricing</p>
            <h2>Set up once. Runs forever.</h2>
          </div>

          <div className="pricing-grid">
            <PricingColumn region="SA Pricing" tiers={SA_PRICING} />
            <PricingColumn region="UK Pricing" tiers={UK_PRICING} />
          </div>

          <p className="approval-line">
            No invoice until the agent is live, tested, and handling real calls.
          </p>
          <p className="comparison-note">
            A full-time receptionist in SA costs R18,000–R28,000/month all-in. In the
            UK: £24,000–£32,000/year. The AI Receptionist handles the same front-line
            calls at a fraction of the cost.
          </p>
        </div>
      </RevealSection>

      <RevealSection className="work-section">
        <div className="page-wrap">
          <div className="section-heading">
            <p className="section-label">How it works</p>
            <h2>Live in two weeks.</h2>
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
              <h2>Stop letting calls go to voicemail.</h2>
              <p>
                One call. We show you exactly how the agent would handle your enquiries.
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
        .receptionist-page {
          min-height: 100vh;
          background-color: #0D1B2A;
          color: #F5F7FA;
        }

        .receptionist-page section {
          position: relative;
          overflow: hidden;
          background-color: #0D1B2A;
          border-top: 1px solid #1E2D3D;
        }

        .receptionist-page section:first-of-type {
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

        .receptionist-hero {
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

        .call-visual {
          position: relative;
          min-width: 0;
          min-height: 430px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          overflow: hidden;
        }

        .call-svg {
          position: absolute;
          inset: 24px;
          width: calc(100% - 48px);
          height: calc(100% - 48px);
        }

        .call-status {
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

        .call-status span {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background-color: #00D4AA;
        }

        .features-section,
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

        .feature-bento {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
          grid-auto-rows: minmax(170px, auto);
          gap: 18px;
          align-items: stretch;
        }

        .feature-card {
          min-width: 0;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          padding: 30px;
        }

        .feature-card.feature-large {
          min-height: 250px;
        }

        .feature-card.feature-tall {
          grid-row: span 2;
        }

        .feature-card.feature-wide {
          grid-column: 1 / -1;
          background-color: #1C2A3A;
        }

        .feature-card h3,
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

        .feature-card p {
          margin: 16px 0 0;
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
        .tier-price,
        .pricing-note,
        .approval-line,
        .comparison-note,
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

        .comparison-note {
          max-width: 900px;
          margin: 18px 0 0;
          color: #8892A4;
          font-size: 14px;
          line-height: 1.65;
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

          .call-visual {
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
          .receptionist-hero,
          .features-section,
          .pricing-section,
          .work-section,
          .cta-section {
            padding-top: 48px;
            padding-bottom: 56px;
          }

          .receptionist-hero {
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

          .feature-bento,
          .pricing-grid {
            grid-template-columns: 1fr;
          }

          .feature-card.feature-tall,
          .feature-card.feature-wide {
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
          .receptionist-hero {
            padding-top: 104px;
            padding-bottom: 44px;
          }

          .hero-copy h1 {
            font-size: 44px;
          }

          .hero-intro {
            font-size: 16px;
          }

          .call-visual {
            min-height: 360px;
          }

          .call-svg {
            inset: 8px;
            width: calc(100% - 16px);
            height: calc(100% - 16px);
          }

          .call-status {
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
          .feature-card {
            transition: none;
          }
        }
      `}</style>
    </main>
  );
}
