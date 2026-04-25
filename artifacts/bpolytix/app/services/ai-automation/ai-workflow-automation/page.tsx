"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ServicePageTemplateProps } from "@/components/ServicePageTemplate";
import { Footer } from "@/components/Footer";
import { GrainOverlay } from "@/components/GrainOverlay";
import { Nav } from "@/components/Nav";

type AutomationExample = {
  trigger: string;
  result: string;
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
  serviceName: "Stop doing the same thing twice.",
  hookLine:
    "We map the repetitive tasks your team does by hand, then build systems that handle them automatically. You never touch them again.",
};

const EXAMPLES: AutomationExample[] = [
  {
    trigger: "New enquiry received",
    result: "Logged → Email sent → Follow-up scheduled → Owner notified",
    className: "example-large",
  },
  {
    trigger: "Invoice received",
    result: "Data extracted → Entered into accounting → Approval request sent",
    className: "example-tall",
  },
  {
    trigger: "Client books a call",
    result: "Confirmation sent → Reminder sent → Follow-up queued automatically",
    className: "example-mid",
  },
  {
    trigger: "Monday morning",
    result: "Report pulled from 3 systems → Formatted → Delivered to your inbox",
    className: "example-wide",
  },
];

const SA_PRICING: PricingTier[] = [
  {
    name: "Starter Pack",
    detail: "3 automations built",
    price: "R15,000 fixed",
  },
  {
    name: "Standard Pack",
    detail: "up to 8 automations",
    price: "R35,000 fixed",
  },
  {
    name: "Monthly maintenance retainer",
    price: "R3,500/month",
  },
];

const UK_PRICING: PricingTier[] = [
  {
    name: "Starter Pack",
    detail: "3 automations built",
    price: "£950 fixed",
  },
  {
    name: "Standard Pack",
    detail: "up to 8 automations",
    price: "£2,200 fixed",
  },
  {
    name: "Monthly maintenance retainer",
    price: "£220/month",
  },
];

const WORK_STEPS: WorkStep[] = [
  {
    title: "Process audit",
    body: "we map every task you want to automate",
  },
  {
    title: "Build brief",
    body: "we specify what each automation does and what triggers it",
  },
  {
    title: "Build",
    body: "we build and test each automation before you see it",
  },
  {
    title: "Handover",
    body: "we walk you through what was built and how to monitor it",
  },
  {
    title: "Maintain",
    body: "monthly check to keep everything running and up to date",
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

function BeforeAfterVisual() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const canAnimate = inView && !reduceMotion;

  const steps = [
    "Email received",
    "Manually logged",
    "Reply typed",
    "Spreadsheet updated",
  ];

  return (
    <div ref={ref} className="automation-visual" aria-hidden="true">
      <svg className="automation-svg" viewBox="0 0 560 380" role="presentation">
        <defs>
          <marker
            id="workflowArrow"
            markerHeight="8"
            markerWidth="8"
            orient="auto"
            refX="7"
            refY="4"
          >
            <path d="M0 0 L8 4 L0 8 Z" fill="#00D4AA" stroke="#00D4AA" strokeWidth="1" />
          </marker>
        </defs>

        <rect x="1" y="1" width="558" height="378" rx="8" fill="#111F2E" stroke="#1E2D3D" />
        <path d="M280 34 V346" fill="none" stroke="#1E2D3D" strokeWidth="1" />
        <text x="52" y="48" fill="#8892A4" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="700">
          Before
        </text>
        <text x="320" y="48" fill="#00D4AA" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="700">
          After
        </text>

        {steps.map((step, index) => {
          const y = 88 + index * 70;

          return (
            <motion.g
              key={`manual-${step}`}
              initial={reduceMotion ? false : { opacity: 0, x: -12 }}
              animate={reduceMotion || inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
            >
              <rect x="38" y={y - 23} width="188" height="46" rx="8" fill="#0D1B2A" stroke="#8892A4" strokeWidth="2" />
              <circle cx="62" cy={y} r="5" fill="#8892A4" stroke="#8892A4" strokeWidth="1" />
              <text x="78" y={y + 4} fill="#8892A4" fontFamily="DM Sans, sans-serif" fontSize="12" fontWeight="700">
                {step}
              </text>
              {index < steps.length - 1 ? (
                <path d={`M132 ${y + 26} V${y + 47}`} fill="none" stroke="#8892A4" strokeWidth="2" strokeLinecap="round" />
              ) : null}
            </motion.g>
          );
        })}

        <path
          d="M360 88 C430 88 430 158 360 158 C316 158 316 228 386 228 C456 228 456 298 386 298"
          fill="none"
          stroke="#00D4AA"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          markerEnd="url(#workflowArrow)"
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
                  cx: [360, 430, 360, 316, 386, 456, 386],
                  cy: [88, 88, 158, 158, 228, 228, 298],
                  opacity: [0, 1, 1, 1, 1, 1, 0],
                }
              : { cx: 386, cy: 298, opacity: 1 }
          }
          transition={{
            duration: 5.8,
            repeat: canAnimate ? Infinity : 0,
            ease: "easeInOut",
          }}
        />

        {steps.map((step, index) => {
          const y = 88 + index * 70;

          return (
            <motion.g
              key={`auto-${step}`}
              initial={reduceMotion ? false : { opacity: 0, x: 12 }}
              animate={reduceMotion || inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
              transition={{ duration: 0.7, delay: index * 0.08 + 0.12, ease: EASE }}
            >
              <rect x="320" y={y - 23} width="194" height="46" rx="8" fill="#0D1B2A" stroke="#00D4AA" strokeWidth="2" />
              <circle cx="344" cy={y} r="5" fill="#00D4AA" stroke="#00D4AA" strokeWidth="1" />
              <text x="360" y={y + 4} fill="#F5F7FA" fontFamily="DM Sans, sans-serif" fontSize="12" fontWeight="700">
                {step}
              </text>
            </motion.g>
          );
        })}
      </svg>

      <div className="automation-status">
        <span />
        Manual work removed
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
        You own your automations after 12 months. No recurring licence fees.
      </p>
    </article>
  );
}

export default function AiWorkflowAutomationPage() {
  return (
    <main className="workflow-page">
      <Nav />

      <RevealSection className="workflow-hero">
        <GrainOverlay />
        <div className="page-wrap hero-grid">
          <div className="hero-copy">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>→</span>
              <Link href="/services/ai-automation">AI & Automation</Link>
              <span>→</span>
              <span>AI Workflow Automation</span>
            </nav>
            <p className="section-label">{TEMPLATE_BASE.pillarLabel}</p>
            <h1>{TEMPLATE_BASE.serviceName}</h1>
            <p className="hero-intro">{TEMPLATE_BASE.hookLine}</p>
          </div>

          <BeforeAfterVisual />
        </div>
      </RevealSection>

      <RevealSection className="examples-section">
        <div className="page-wrap">
          <div className="section-heading">
            <p className="section-label">Examples</p>
            <h2>The work that eats your day — automated.</h2>
          </div>

          <div className="terminal-bento">
            {EXAMPLES.map((example) => (
              <motion.article
                className={`terminal-card ${example.className}`}
                key={example.trigger}
                whileHover={{ y: -4, transition: { duration: 0.2, ease: EASE } }}
              >
                <p>
                  <span>Trigger:</span> {example.trigger}
                </p>
                <p>
                  <span className="result-label">Result:</span> {example.result}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="pricing-section">
        <div className="page-wrap">
          <div className="section-heading">
            <p className="section-label">Pricing</p>
            <h2>Fixed price. No monthly surprises.</h2>
          </div>

          <div className="pricing-grid">
            <PricingColumn region="SA Pricing" tiers={SA_PRICING} />
            <PricingColumn region="UK Pricing" tiers={UK_PRICING} />
          </div>

          <p className="approval-line">
            No invoice until your first automation is built, tested, and running.
          </p>
        </div>
      </RevealSection>

      <RevealSection className="work-section">
        <div className="page-wrap">
          <div className="section-heading">
            <p className="section-label">How it works</p>
            <h2>From your current process to fully automated — in weeks, not months.</h2>
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

      <RevealSection className="counter-section">
        <div className="page-wrap">
          <div className="counter-grid">
            <div className="counter-claim">
              <p className="section-label">AI hype counter</p>
              <h2>Everyone says you can build this yourself.</h2>
            </div>
            <div className="counter-copy">
              <p>
                The promise: drag-and-drop tools, no coding needed. The reality: you end up
                paying for AI credits, API connection fees, broken workflows, and fixes that
                cost more than the original build.
              </p>
              <p>
                BPOLytix gives you a fixed price, a real build, and a team that handles
                everything. No platform subscriptions. No vendor lock-in. No surprises.
              </p>
            </div>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="cta-section">
        <GrainOverlay />
        <div className="page-wrap">
          <div className="cta-band">
            <div>
              <p className="section-label">Ready to talk?</p>
              <h2>Show us one process. We'll show you how to automate it.</h2>
              <p>
                One call. We map what's slowing you down and tell you exactly what we'd build.
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
        .workflow-page {
          min-height: 100vh;
          background-color: #0D1B2A;
          color: #F5F7FA;
        }

        .workflow-page section {
          position: relative;
          overflow: hidden;
          background-color: #0D1B2A;
          border-top: 1px solid #1E2D3D;
        }

        .workflow-page section:first-of-type {
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

        .workflow-hero {
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

        .automation-visual {
          position: relative;
          min-width: 0;
          min-height: 430px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          overflow: hidden;
        }

        .automation-svg {
          position: absolute;
          inset: 24px;
          width: calc(100% - 48px);
          height: calc(100% - 48px);
        }

        .automation-status {
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

        .automation-status span {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background-color: #00D4AA;
        }

        .examples-section,
        .pricing-section,
        .work-section,
        .counter-section,
        .cta-section {
          padding-top: 64px;
          padding-bottom: 76px;
        }

        .section-heading {
          max-width: 820px;
          margin-bottom: 34px;
        }

        .section-heading h2,
        .counter-claim h2,
        .cta-band h2 {
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 48px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1;
        }

        .terminal-bento {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
          grid-auto-rows: minmax(168px, auto);
          gap: 18px;
          align-items: stretch;
        }

        .terminal-card {
          min-width: 0;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          padding: 26px;
        }

        .terminal-card.example-large {
          min-height: 240px;
        }

        .terminal-card.example-tall {
          grid-row: span 2;
        }

        .terminal-card.example-wide {
          grid-column: 1 / -1;
          background-color: #1C2A3A;
        }

        .terminal-card p {
          margin: 0;
          color: #F5F7FA;
          font-family: "JetBrains Mono", monospace;
          font-size: 14px;
          letter-spacing: 0;
          line-height: 1.7;
        }

        .terminal-card p + p {
          margin-top: 18px;
        }

        .terminal-card span {
          color: #8892A4;
        }

        .terminal-card .result-label {
          color: #00D4AA;
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
        .counter-copy p,
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

        .counter-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
          gap: 52px;
          align-items: start;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          padding: 42px;
        }

        .counter-claim h2 {
          color: #8892A4;
        }

        .counter-copy {
          display: grid;
          gap: 18px;
        }

        .counter-copy p {
          margin: 0;
          color: #F5F7FA;
          font-size: 17px;
          line-height: 1.7;
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
          .counter-grid {
            grid-template-columns: 1fr;
          }

          .automation-visual {
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
          .workflow-hero,
          .examples-section,
          .pricing-section,
          .work-section,
          .counter-section,
          .cta-section {
            padding-top: 48px;
            padding-bottom: 56px;
          }

          .workflow-hero {
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
          .counter-claim h2,
          .cta-band h2 {
            font-size: 36px;
          }

          .terminal-bento,
          .pricing-grid {
            grid-template-columns: 1fr;
          }

          .terminal-card.example-tall,
          .terminal-card.example-wide {
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

          .counter-grid,
          .cta-band {
            padding: 28px;
          }
        }

        @media (max-width: 560px) {
          .workflow-hero {
            padding-top: 104px;
            padding-bottom: 44px;
          }

          .hero-copy h1 {
            font-size: 44px;
          }

          .hero-intro {
            font-size: 16px;
          }

          .automation-visual {
            min-height: 360px;
          }

          .automation-svg {
            inset: 8px;
            width: calc(100% - 16px);
            height: calc(100% - 16px);
          }

          .automation-status {
            right: 16px;
            bottom: 16px;
          }

          .terminal-card p {
            font-size: 13px;
          }

          .primary-cta,
          .ghost-cta {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .primary-cta,
          .ghost-cta,
          .terminal-card {
            transition: none;
          }
        }
      `}</style>
    </main>
  );
}
