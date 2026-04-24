"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BadgePoundSterling,
  Blocks,
  Bot,
  ClipboardList,
  Clock3,
  KeyRound,
  PhoneCall,
  Repeat2,
  Settings2,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { GrainOverlay } from "@/components/GrainOverlay";
import { Nav } from "@/components/Nav";
import { ExpandableCard } from "@/components/ui/ExpandableCard";

type AutomationService = {
  name: string;
  summary: string;
  href: string;
};

type WorkStep = {
  title: string;
  text: string;
  icon: LucideIcon;
};

type ClaimItem = {
  text: string;
  icon: LucideIcon;
};

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const SERVICES: AutomationService[] = [
  {
    name: "AI Workflow Automation",
    summary: "The repetitive tasks your team does every day, running themselves.",
    href: "/services/ai-automation/ai-workflow-automation",
  },
  {
    name: "AI Agent Build & Deploy",
    summary: "A custom AI agent built for your workflow. Scoped, built, deployed.",
    href: "/services/ai-automation/ai-agent-build",
  },
  {
    name: "AI Operations Service",
    summary: "Monthly retainer to keep your AI systems tuned, monitored, and improving.",
    href: "/services/ai-automation/ai-operations",
  },
  {
    name: "AI Receptionist",
    summary: "A phone line that never misses a call. Books, answers, qualifies — 24/7.",
    href: "/services/ai-automation/ai-receptionist",
  },
  {
    name: "AI Marketing Ops",
    summary:
      "Content, distribution, analytics. Your entire AI marketing operation, from £500 a month.",
    href: "/services/ai-automation/ai-marketing-ops",
  },
];

const WORK_STEPS: WorkStep[] = [
  {
    title: "Scope",
    text: 'We map the repetitive work, the systems, and what "done" looks like.',
    icon: ClipboardList,
  },
  {
    title: "Build",
    text: "We design, build, and deploy the automation on your stack.",
    icon: Settings2,
  },
  {
    title: "Own",
    text: "You get a fixed monthly fee for 12 months, then the whole system is yours.",
    icon: BadgeCheck,
  },
];

const OFFICE_CLAIMS: ClaimItem[] = [
  {
    text: "Tasks run themselves, around the clock.",
    icon: Clock3,
  },
  {
    text: "Fixed price. No AI credit surprises.",
    icon: BadgePoundSterling,
  },
  {
    text: "Built for your business, not rented from a platform.",
    icon: Blocks,
  },
  {
    text: "Yours after 12 months.",
    icon: KeyRound,
  },
];

const PROOF_LINES: ClaimItem[] = [
  {
    text: "No escalating subscription fees.",
    icon: BadgePoundSterling,
  },
  {
    text: "Fully built for your business.",
    icon: Blocks,
  },
  {
    text: "You own it after 12 months.",
    icon: KeyRound,
  },
];

function serviceDescription(service: AutomationService) {
  return service.summary;
}

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

function AutomationFlowVisual() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: false, amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const canAnimate = inView && !reduceMotion;

  return (
    <div ref={ref} className="ai-visual" aria-hidden="true">
      <div className="flow-status">
        <Workflow size={18} color="#00D4AA" strokeWidth={1.8} />
        <span>Automation flow live</span>
      </div>

      <svg className="flow-canvas" viewBox="0 0 520 360" role="presentation">
        <defs>
          <marker
            id="flowArrow"
            markerHeight="8"
            markerWidth="8"
            orient="auto"
            refX="7"
            refY="4"
          >
            <path d="M0 0 L8 4 L0 8 Z" fill="#1E2D3D" />
          </marker>
          <marker
            id="flowArrowActive"
            markerHeight="8"
            markerWidth="8"
            orient="auto"
            refX="7"
            refY="4"
          >
            <path d="M0 0 L8 4 L0 8 Z" fill="#00D4AA" />
          </marker>
        </defs>
        <path className="flow-grid" d="M40 92 H480 M40 180 H480 M40 268 H480" />
        <path className="flow-link" markerEnd="url(#flowArrow)" d="M48 178 C116 178 120 96 188 96" />
        <path className="flow-link" markerEnd="url(#flowArrow)" d="M188 96 C258 96 258 184 328 184" />
        <path className="flow-link" markerEnd="url(#flowArrow)" d="M188 264 C258 264 258 184 328 184" />
        <path className="flow-link" markerEnd="url(#flowArrow)" d="M328 184 C396 184 404 102 476 102" />
        <path className="flow-link" markerEnd="url(#flowArrow)" d="M328 184 C396 184 404 260 476 260" />

        <motion.path
          className="flow-path"
          markerEnd="url(#flowArrowActive)"
          d="M48 178 C116 178 120 96 188 96 C258 96 258 184 328 184 C396 184 404 102 476 102"
          initial={{ pathLength: 0, opacity: 0.45 }}
          animate={
            canAnimate
              ? { pathLength: [0, 1, 1], opacity: [0.45, 1, 0.7] }
              : { pathLength: 1, opacity: 0.72 }
          }
          transition={{
            duration: 5.4,
            repeat: canAnimate ? Infinity : 0,
            repeatDelay: 1.1,
            ease: "easeInOut",
          }}
        />

        {[
          { x: 48, y: 178, label: "Task in" },
          { x: 188, y: 96, label: "Check" },
          { x: 188, y: 264, label: "Route" },
          { x: 328, y: 184, label: "Run" },
          { x: 476, y: 102, label: "Done" },
          { x: 476, y: 260, label: "Sent" },
        ].map((node, index) => (
          <g key={node.label}>
            <circle
              className={index === 0 || index > 3 ? "flow-node accent" : "flow-node"}
              cx={node.x}
              cy={node.y}
              r="22"
            />
            <text className="flow-label" x={node.x} y={node.y + 46} textAnchor="middle">
              {node.label}
            </text>
          </g>
        ))}

        {[0, 1, 2].map((dot) => (
          <motion.circle
            key={dot}
            className="flow-dot"
            r="6"
            animate={
              canAnimate
                ? {
                    cx: [48, 188, 328, 476],
                    cy: [178, dot === 1 ? 264 : 96, 184, dot === 2 ? 260 : 102],
                    opacity: [0, 1, 1, 0],
                  }
                : { cx: 328, cy: 184, opacity: 0.78 }
            }
            transition={{
              duration: 5.4,
              delay: dot * 1.05,
              repeat: canAnimate ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      <div className="automation-panel">
        {[
          { label: "Task captured", icon: Repeat2 },
          { label: "Rules checked", icon: Bot },
          { label: "Answer sent", icon: PhoneCall },
        ].map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              className="automation-row"
              key={item.label}
              animate={
                canAnimate
                  ? { opacity: [0.55, 1, 0.7], x: [0, 6, 0] }
                  : { opacity: 0.76, x: 0 }
              }
              transition={{
                duration: 3.6,
                delay: index * 0.45,
                repeat: canAnimate ? Infinity : 0,
                ease: "easeInOut",
              }}
            >
              <Icon size={16} color="#00D4AA" strokeWidth={1.8} />
              <span>{item.label}</span>
              <i />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function AnimatedClaimIcon({
  icon: Icon,
  index,
}: {
  icon: LucideIcon;
  index: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      className="claim-icon"
      initial={reduceMotion ? false : { opacity: 0, y: 10, scale: 0.96 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
    >
      <Icon size={18} color="#00D4AA" strokeWidth={1.8} />
    </motion.span>
  );
}

export default function AutomationOfficePage() {
  return (
    <main className="ai-page">
      <Nav />

      <RevealSection className="ai-hero">
        <GrainOverlay />
        <div className="page-wrap hero-grid">
          <div className="hero-copy">
            <p className="section-label">AI & Automation Office</p>
            <h1>Stop doing the same thing twice.</h1>
            <p className="hero-intro">
              Every business has tasks it repeats every single day — by hand, every time. We
              build systems that do them automatically. You show us the repetitive parts. We
              hand you the machine that runs them. After 12 months, you own the whole thing.
            </p>
            <Link className="primary-cta" href="/contact">
              Talk to us
              <ArrowRight size={18} strokeWidth={2} />
            </Link>
          </div>

          <AutomationFlowVisual />
        </div>
      </RevealSection>

      <RevealSection className="office-strip-section">
        <GrainOverlay />
        <div className="page-wrap office-strip">
          <div className="strip-heading">
            <p className="section-label">What an AI & Automation Office does for you</p>
          </div>

          <div className="office-claims">
            {OFFICE_CLAIMS.map((claim, index) => (
              <div className="office-claim" key={claim.text}>
                <AnimatedClaimIcon icon={claim.icon} index={index} />
                <p>{claim.text}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="services-section">
        <GrainOverlay />
        <div className="page-wrap">
          <div className="section-heading">
            <p className="section-label">AI & Automation services</p>
            <h2>Pick the automation support your business needs.</h2>
          </div>

          <div className="services-grid">
            {SERVICES.map((service, index) => (
              <ExpandableCard
                key={service.name}
                className={`ai-service-card card-${index + 1}`}
                serviceName={service.name}
                tagline={service.summary}
                description={serviceDescription(service)}
                serviceHref={service.href}
              />
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="work-section">
        <GrainOverlay />
        <div className="page-wrap">
          <div className="work-band">
            <div className="section-heading compact">
              <p className="section-label">How we work</p>
              <h2>Scope, build, then keep it owned by you.</h2>
            </div>

            <div className="work-steps">
              {WORK_STEPS.map((step, index) => {
                const Icon = step.icon;

                return (
                  <motion.article
                    className="work-step"
                    key={step.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.7, delay: index * 0.12, ease: EASE }}
                  >
                    <div className="step-topline">
                      <span>{index + 1}</span>
                      <Icon size={20} color="#00D4AA" strokeWidth={1.8} />
                    </div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="proof-strip-section">
        <GrainOverlay />
        <div className="page-wrap proof-strip">
          <div className="strip-heading">
            <p className="section-label">Why businesses move their AI & Automation Office to us</p>
          </div>

          <div className="proof-lines">
            {PROOF_LINES.map((proof, index) => (
              <div className="proof-line" key={proof.text}>
                <AnimatedClaimIcon icon={proof.icon} index={index} />
                <p>{proof.text}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="final-cta-section">
        <GrainOverlay />
        <div className="page-wrap">
          <div className="final-cta">
            <div>
              <p className="section-label">Ready to talk?</p>
              <h2>Talk to us about your AI & Automation Office.</h2>
            </div>
            <Link className="primary-cta" href="/contact">
              Talk to us about your AI & Automation Office
              <ArrowRight size={18} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </RevealSection>

      <Footer />

      <style jsx global>{`
        .ai-page {
          min-height: 100vh;
          background-color: #0D1B2A;
          color: #F5F7FA;
        }

        .ai-page section {
          position: relative;
          overflow: hidden;
          background-color: #0D1B2A;
        }

        .page-wrap {
          position: relative;
          z-index: 1;
          max-width: 1440px;
          margin: 0 auto;
          padding-left: 32px;
          padding-right: 32px;
        }

        .ai-hero {
          padding-top: 128px;
          padding-bottom: 72px;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.92fr) minmax(420px, 0.78fr);
          gap: 72px;
          align-items: stretch;
        }

        .hero-copy {
          max-width: 780px;
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

        .primary-cta {
          display: inline-flex;
          min-height: 48px;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 34px;
          border: 1px solid #1B77F2;
          border-radius: 9999px;
          background-color: #1B77F2;
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

        .primary-cta:hover {
          box-shadow: 0 0 24px #1B77F2;
          transform: translateY(-2px);
        }

        .primary-cta:focus-visible,
        .ai-service-card button:focus-visible {
          outline: 2px solid #00D4AA;
          outline-offset: 3px;
        }

        .ai-visual {
          position: relative;
          min-height: 560px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          overflow: hidden;
        }

        .flow-status {
          position: absolute;
          right: 28px;
          top: 34px;
          z-index: 2;
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

        .flow-canvas {
          position: absolute;
          right: -10px;
          bottom: 112px;
          left: -16px;
          width: calc(100% + 26px);
          height: auto;
        }

        .flow-grid,
        .flow-link {
          fill: none;
          stroke: #1E2D3D;
          stroke-width: 1;
        }

        .flow-link {
          stroke-width: 2;
        }

        .flow-path {
          fill: none;
          stroke: #00D4AA;
          stroke-linecap: round;
          stroke-width: 4;
        }

        .flow-node {
          fill: #1C2A3A;
          stroke: #00D4AA;
          stroke-width: 2;
        }

        .flow-node.accent {
          stroke: #1B77F2;
        }

        .flow-dot {
          fill: #1B77F2;
        }

        .flow-label {
          fill: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0;
        }

        .automation-panel {
          position: absolute;
          right: 28px;
          bottom: 28px;
          left: 28px;
          display: grid;
          gap: 10px;
        }

        .automation-row {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) 76px;
          min-height: 42px;
          align-items: center;
          gap: 10px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #1C2A3A;
          color: #F5F7FA;
          font-family: var(--font-dm-sans);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.25;
          padding: 0 14px;
        }

        .automation-row i {
          display: block;
          height: 7px;
          border-radius: 9999px;
          background-color: #1E2D3D;
        }

        .services-section,
        .office-strip-section,
        .proof-strip-section,
        .work-section,
        .final-cta-section {
          padding-top: 64px;
          padding-bottom: 76px;
        }

        .office-strip,
        .proof-strip {
          display: grid;
          gap: 24px;
        }

        .strip-heading .section-label {
          margin-bottom: 0;
        }

        .office-claims {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
          border-top: 1px solid #1E2D3D;
          border-bottom: 1px solid #1E2D3D;
          padding: 22px 0;
        }

        .office-claim,
        .proof-line {
          display: flex;
          min-width: 0;
          align-items: center;
          gap: 12px;
        }

        .claim-icon {
          display: inline-flex;
          width: 34px;
          height: 34px;
          flex: 0 0 auto;
          align-items: center;
          justify-content: center;
          border: 1px solid #1E2D3D;
          border-radius: 9999px;
          background-color: #111F2E;
        }

        .office-claim p,
        .proof-line p {
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-dm-sans);
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.35;
        }

        .proof-lines {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          padding: 24px;
        }

        .section-heading {
          max-width: 760px;
          margin-bottom: 34px;
        }

        .section-heading.compact {
          margin-bottom: 0;
        }

        .section-heading h2,
        .final-cta h2 {
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 48px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1;
        }

        .services-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
          gap: 18px;
          align-items: start;
        }

        .ai-service-card {
          min-width: 0;
        }

        .ai-service-card.card-5 {
          grid-column: 1 / -1;
          max-width: 720px;
        }

        .ai-service-card p {
          letter-spacing: 0 !important;
        }

        .ai-service-card button p:last-child {
          white-space: normal !important;
        }

        .ai-service-card div[style*="padding-top: 20px"] > p:first-child {
          white-space: pre-line;
        }

        .work-band {
          display: grid;
          grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
          gap: 52px;
          align-items: start;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          padding: 42px;
        }

        .work-steps {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 0.9fr) minmax(0, 0.82fr);
          gap: 14px;
        }

        .work-step {
          min-height: 190px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #1C2A3A;
          padding: 22px;
        }

        .step-topline {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 26px;
        }

        .step-topline span {
          display: inline-flex;
          width: 34px;
          height: 34px;
          align-items: center;
          justify-content: center;
          border: 1px solid #00D4AA;
          border-radius: 9999px;
          color: #00D4AA;
          font-family: var(--font-dm-sans);
          font-size: 13px;
          font-weight: 700;
          line-height: 1;
        }

        .work-step h3 {
          margin: 0 0 10px;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 22px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.1;
        }

        .work-step p {
          margin: 0;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 15px;
          letter-spacing: 0;
          line-height: 1.65;
        }

        .final-cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          padding: 40px;
        }

        .final-cta .primary-cta {
          flex: 0 0 auto;
          margin-top: 0;
        }

        @media (max-width: 1023px) {
          .hero-grid,
          .work-band {
            grid-template-columns: 1fr;
          }

          .ai-visual {
            min-height: 430px;
          }

          .work-steps {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 860px) {
          .ai-hero,
          .office-strip-section,
          .services-section,
          .proof-strip-section,
          .work-section,
          .final-cta-section {
            padding-top: 48px;
            padding-bottom: 56px;
          }

          .ai-hero {
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
          .final-cta h2 {
            font-size: 36px;
          }

          .services-grid,
          .work-steps {
            grid-template-columns: 1fr;
          }

          .office-claims {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .proof-lines {
            grid-template-columns: 1fr;
          }

          .ai-service-card.card-5 {
            max-width: none;
          }

          .work-band,
          .final-cta {
            padding: 28px;
          }

          .final-cta {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        @media (max-width: 560px) {
          .ai-hero {
            padding-top: 104px;
            padding-bottom: 44px;
          }

          .hero-copy h1 {
            font-size: 44px;
          }

          .hero-intro {
            font-size: 16px;
          }

          .ai-visual {
            min-height: 380px;
          }

          .flow-status {
            right: 16px;
            top: 18px;
          }

          .flow-canvas {
            right: -90px;
            bottom: 92px;
            left: -82px;
            width: calc(100% + 172px);
          }

          .automation-panel {
            right: 16px;
            bottom: 16px;
            left: 16px;
          }

          .automation-row {
            grid-template-columns: auto minmax(0, 1fr) 42px;
            padding: 0 12px;
          }

          .office-claims {
            gap: 16px;
          }

          .office-claim,
          .proof-line {
            align-items: flex-start;
          }

          .primary-cta {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .primary-cta,
          .ai-service-card,
          .work-step {
            transition: none;
          }
        }
      `}</style>
    </main>
  );
}
