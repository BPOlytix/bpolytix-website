"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { GrainOverlay } from "@/components/GrainOverlay";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";

type AudienceCard = {
  title: string;
  body: string;
};

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const WHO_ITS_FOR: AudienceCard[] = [
  {
    title: "Ops teams drowning in repeat tasks",
    body: "Data entry, follow-ups, routing, checks, and reminders that happen every day by hand.",
  },
  {
    title: "Finance teams that need faster answers",
    body: "Automated reconciliation, exception flags, month-end packs, or reporting without another spreadsheet chase.",
  },
  {
    title: "Customer-facing teams that need 24/7 response",
    body: "A trained agent answers, qualifies, routes, or escalates without adding headcount.",
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

function AgentFlowVisual() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const canAnimate = inView && !reduceMotion;

  return (
    <div ref={ref} className="agent-flow-wrap" aria-label="Your workflow moves through a BPOLytix agent build and runs on autopilot">
      <svg className="agent-flow-svg" viewBox="0 0 760 360" role="img">
        <defs>
          <marker id="agentArrow" markerHeight="10" markerWidth="10" orient="auto" refX="8" refY="5">
            <path d="M0 0 L10 5 L0 10 Z" fill="#00D4AA" stroke="#00D4AA" strokeWidth="1" />
          </marker>
        </defs>

        <rect x="1" y="1" width="758" height="358" rx="8" fill="#111F2E" stroke="#1E2D3D" strokeWidth="1" />
        <path d="M42 66 H718 M42 180 H718 M42 294 H718" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
        <path d="M132 38 V322 M380 38 V322 M628 38 V322" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />

        <motion.path
          d="M218 180 H286"
          fill="none"
          stroke="#00D4AA"
          strokeWidth="3"
          strokeLinecap="round"
          markerEnd="url(#agentArrow)"
          initial={false}
          animate={canAnimate ? { pathLength: [0, 1], opacity: [0, 1] } : { pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE }}
        />
        <motion.path
          d="M474 180 H542"
          fill="none"
          stroke="#00D4AA"
          strokeWidth="3"
          strokeLinecap="round"
          markerEnd="url(#agentArrow)"
          initial={false}
          animate={canAnimate ? { pathLength: [0, 1], opacity: [0, 1] } : { pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: canAnimate ? 0.55 : 0, ease: EASE }}
        />

        <motion.g
          initial={reduceMotion ? false : { opacity: 0, x: -20 }}
          animate={reduceMotion || inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <rect x="64" y="118" width="154" height="124" rx="8" fill="#0D1B2A" stroke="#1E2D3D" strokeWidth="2" />
          <text x="141" y="160" fill="#8892A4" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="700" textAnchor="middle">
            Your workflow
          </text>
          <text x="141" y="194" fill="#F5F7FA" fontFamily="Syne, sans-serif" fontSize="19" fontWeight="700" textAnchor="middle">
            Task queue
          </text>
          <text x="141" y="218" fill="#F5F7FA" fontFamily="DM Sans, sans-serif" fontSize="12" fontWeight="700" textAnchor="middle">
            Rules, data, people
          </text>
        </motion.g>

        <motion.g
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={reduceMotion || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
        >
          <rect x="286" y="80" width="188" height="200" rx="12" fill="#0D1B2A" stroke="#1B77F2" strokeWidth="3" />
          <text x="380" y="114" fill="#F5F7FA" fontFamily="Syne, sans-serif" fontSize="17" fontWeight="700" textAnchor="middle">
            BPOLytix
          </text>
          <text x="380" y="136" fill="#F5F7FA" fontFamily="Syne, sans-serif" fontSize="17" fontWeight="700" textAnchor="middle">
            agent build
          </text>

          {[
            { label: "Data in", y: 168 },
            { label: "Logic", y: 210 },
            { label: "Action out", y: 252 },
          ].map((node, index) => (
            <motion.g
              key={node.label}
              initial={reduceMotion ? false : { opacity: 0, x: -10 }}
              animate={reduceMotion || inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ duration: 0.45, delay: 0.22 + index * 0.1, ease: EASE }}
            >
              <rect x="318" y={node.y - 17} width="124" height="34" rx="999" fill="#111F2E" stroke="#1E2D3D" strokeWidth="1" />
              <circle cx="336" cy={node.y} r="5" fill="#00D4AA" stroke="#00D4AA" strokeWidth="1" />
              <text x="380" y={node.y + 5} fill="#F5F7FA" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="700" textAnchor="middle">
                {node.label}
              </text>
            </motion.g>
          ))}
        </motion.g>

        <motion.g
          initial={reduceMotion ? false : { opacity: 0, x: 20 }}
          animate={reduceMotion || inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.7, delay: 0.26, ease: EASE }}
        >
          <rect x="542" y="118" width="154" height="124" rx="8" fill="rgba(0,212,170,0.08)" stroke="#00D4AA" strokeWidth="2" />
          <text x="619" y="160" fill="#8892A4" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="700" textAnchor="middle">
            Running on
          </text>
          <text x="619" y="194" fill="#00D4AA" fontFamily="Syne, sans-serif" fontSize="22" fontWeight="700" textAnchor="middle">
            autopilot
          </text>
          <text x="619" y="218" fill="#F5F7FA" fontFamily="DM Sans, sans-serif" fontSize="12" fontWeight="700" textAnchor="middle">
            Monitored by us
          </text>
        </motion.g>

        <motion.circle
          r="7"
          fill="#00D4AA"
          stroke="#00D4AA"
          strokeWidth="1"
          initial={false}
          animate={canAnimate ? { cx: [218, 286, 474, 542], cy: [180, 180, 180, 180], opacity: [0, 1, 1, 0] } : { cx: 542, cy: 180, opacity: 1 }}
          transition={{ duration: 4.2, repeat: canAnimate ? Infinity : 0, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

export default function AiAgentBuildPage() {
  return (
    <div className="agent-build-page">
      <ServicePageTemplate
        pillarLabel="AI & Automation"
        serviceName="An AI agent built for your exact workflow. Not a demo."
        hookLine="We scope, build, and deploy a custom AI agent for one specific operation in your business. You own it after 12 months."
        description={[
          "Off-the-shelf AI tools rarely match how real work moves through a business. Your data, approvals, handoffs, and exceptions already have a shape. The agent has to fit that shape.",
          "BPOLytix scopes one operation, builds the agent around it, connects it to the places your team already works, and keeps it running for 12 months.",
          "This is for SA startups and UK SMEs that want AI doing real work, not another demo that sits outside the business.",
        ]}
        deliverables={[
          {
            title: "Workflow audit and agent scoping",
            body: "We map the task, edge cases, data sources, approvals, and human handoffs before anything is built.",
          },
          {
            title: "Custom agent architecture",
            body: "The build can include an LLM, tools, memory, checks, and guardrails where the workflow needs them.",
          },
          {
            title: "Existing stack integration",
            body: "We connect the agent into your CRM, Slack, WhatsApp, spreadsheets, and other internal systems where needed.",
          },
          {
            title: "Handover training and documentation",
            body: "Your team gets plain-English notes, operating rules, and a walkthrough so they know what the agent does.",
          },
          {
            title: "12-month retainer: we maintain, you own",
            body: "We monitor and maintain the agent for 12 months. At month 13, ownership transfers to you.",
          },
        ]}
        animatedVisual={<AgentFlowVisual />}
        pricing={[
          { label: "Build fee, once-off", zar: "R12,000", gbp: "£500" },
          { label: "Monthly retainer, 12 months", zar: "R4,500/month", gbp: "£190/month" },
          { label: "Ownership from month 13", zar: "No ongoing fees", gbp: "No ongoing fees" },
        ]}
        ownershipLine="Client owns the agent at month 13 - no ongoing fees."
      />

      <RevealSection className="agent-pricing-cta">
        <GrainOverlay />
        <div className="agent-wrap">
          <Link className="agent-ghost-btn" href="/contact">
            Talk to us about your agent
          </Link>
        </div>
      </RevealSection>

      <RevealSection className="agent-audience-section">
        <GrainOverlay />
        <div className="agent-wrap">
          <div className="agent-section-heading">
            <p className="agent-section-label">Who it is for</p>
            <h2>Built for one operation that needs to stop living in someone&apos;s head.</h2>
          </div>

          <div className="agent-audience-grid">
            {WHO_ITS_FOR.map((item) => (
              <motion.article
                className="agent-audience-card"
                key={item.title}
                whileHover={{ y: -4, transition: { duration: 0.2, ease: EASE } }}
              >
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="agent-bottom-cta">
        <GrainOverlay />
        <div className="agent-wrap">
          <div className="agent-cta-band">
            <div>
              <p className="agent-section-label">Ready to talk?</p>
              <h2>Tell us the task. We&apos;ll build the agent.</h2>
            </div>
            <div className="agent-cta-actions">
              <Link className="agent-ghost-btn" href="/contact">
                Start the conversation
              </Link>
              <Link className="agent-whatsapp-btn" href="https://wa.me/27781790363">
                <MessageCircle size={18} color="#00D4AA" strokeWidth={2} />
                WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </RevealSection>

      <style jsx global>{`
        .agent-build-page,
        .agent-build-page main,
        .agent-build-page section {
          background-color: #0D1B2A !important;
          color: #F5F7FA;
        }

        .agent-build-page .spt-hero .spt-cta-btn {
          font-size: 0;
        }

        .agent-build-page .spt-hero .spt-cta-btn::after {
          content: "Scope my agent";
          font-size: 15px;
        }

        .agent-build-page .spt-cta-strip {
          display: none;
        }

        .agent-build-page .spt-bento-card,
        .agent-build-page .spt-pricing-row:first-child,
        .agent-audience-card,
        .agent-cta-band {
          border-radius: 8px !important;
        }

        .agent-build-page .spt-visual {
          padding: 72px 24px;
        }

        .agent-flow-wrap {
          width: min(100%, 980px);
          min-height: 420px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          overflow: hidden;
        }

        .agent-flow-svg {
          display: block;
          width: 100%;
          height: 100%;
          min-height: 420px;
        }

        .agent-pricing-cta,
        .agent-audience-section,
        .agent-bottom-cta {
          position: relative;
          overflow: hidden;
          border-top: 1px solid #1E2D3D;
          background-color: #0D1B2A;
        }

        .agent-pricing-cta {
          padding-top: 0;
          padding-bottom: 72px;
        }

        .agent-audience-section,
        .agent-bottom-cta {
          padding-top: 72px;
          padding-bottom: 88px;
        }

        .agent-wrap {
          position: relative;
          z-index: 1;
          max-width: 1440px;
          margin: 0 auto;
          padding-left: 32px;
          padding-right: 32px;
        }

        .agent-section-heading {
          max-width: 860px;
          margin-bottom: 34px;
        }

        .agent-section-label {
          margin: 0 0 14px;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
          line-height: 1.4;
          text-transform: uppercase;
        }

        .agent-section-heading h2,
        .agent-cta-band h2 {
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 48px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1;
        }

        .agent-audience-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
          gap: 18px;
        }

        .agent-audience-card {
          min-width: 0;
          border: 1px solid #1E2D3D;
          background-color: #111F2E;
          padding: 30px;
        }

        .agent-audience-card:first-child {
          min-height: 230px;
          background-color: #1C2A3A;
        }

        .agent-audience-card:last-child {
          grid-column: 1 / -1;
        }

        .agent-audience-card h3 {
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.12;
        }

        .agent-audience-card p {
          margin: 16px 0 0;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 16px;
          letter-spacing: 0;
          line-height: 1.7;
        }

        .agent-cta-band {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          border: 1px solid #1E2D3D;
          background-color: #111F2E;
          padding: 40px;
        }

        .agent-cta-actions {
          display: flex;
          flex: 0 0 auto;
          align-items: center;
          gap: 12px;
        }

        .agent-ghost-btn,
        .agent-whatsapp-btn {
          display: inline-flex;
          min-height: 48px;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border: 0;
          border-radius: 9999px;
          background-color: rgba(255,255,255,0.05);
          color: #F5F7FA;
          font-family: var(--font-dm-sans);
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1;
          padding: 0 22px;
          text-decoration: none;
          transition: transform 0.2s ease;
        }

        .agent-ghost-btn:hover,
        .agent-whatsapp-btn:hover {
          transform: translateY(-2px);
        }

        .agent-build-page .spt-cta-btn:focus-visible,
        .agent-ghost-btn:focus-visible,
        .agent-whatsapp-btn:focus-visible {
          outline: 2px solid #00D4AA;
          outline-offset: 3px;
        }

        @media (max-width: 900px) {
          .agent-build-page .spt-visual {
            padding: 56px 24px;
          }

          .agent-flow-wrap,
          .agent-flow-svg {
            min-height: 360px;
          }

          .agent-audience-section,
          .agent-bottom-cta {
            padding-top: 56px;
            padding-bottom: 64px;
          }

          .agent-audience-grid {
            grid-template-columns: 1fr;
          }

          .agent-audience-card:last-child {
            grid-column: auto;
          }

          .agent-section-heading h2,
          .agent-cta-band h2 {
            font-size: 36px;
          }

          .agent-cta-band,
          .agent-cta-actions {
            align-items: stretch;
            flex-direction: column;
          }

          .agent-cta-band {
            padding: 28px;
          }
        }

        @media (max-width: 560px) {
          .agent-wrap {
            padding-left: 24px;
            padding-right: 24px;
          }

          .agent-flow-wrap,
          .agent-flow-svg {
            min-height: 300px;
          }

          .agent-ghost-btn,
          .agent-whatsapp-btn {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .agent-build-page .spt-cta-btn,
          .agent-ghost-btn,
          .agent-whatsapp-btn,
          .agent-audience-card {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
