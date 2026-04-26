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
    title: "Teams that adopted AI tools in 2024-2025",
    body: "The tools are in place, but output quality and usage are not consistent month to month.",
  },
  {
    title: "Businesses with 3+ AI tools across departments",
    body: "Sales, finance, service, and operations all use AI differently, and no one has a full view of what is working.",
  },
  {
    title: "Founders who cannot manage AI themselves",
    body: "You need the stack watched, tuned, and reported on without adding another internal role.",
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

function AiOpsDashboardVisual() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const canAnimate = inView && !reduceMotion;

  const panels = [
    {
      label: "Uptime",
      value: "99.4%",
      x: 42,
      y: 72,
      path: "M72 188 C110 168 128 176 152 148 C176 120 198 130 232 98",
    },
    {
      label: "Accuracy",
      value: "91%",
      x: 286,
      y: 72,
      path: "M316 172 C348 152 374 160 398 138 C424 114 446 124 476 104",
    },
    {
      label: "Output volume",
      value: "4,820",
      x: 530,
      y: 72,
      path: "M560 178 C588 150 614 164 640 134 C668 102 690 118 720 90",
    },
  ];

  return (
    <div ref={ref} className="ops-dashboard-wrap" aria-label="AI operations dashboard showing uptime, accuracy, and output volume">
      <svg className="ops-dashboard-svg" viewBox="0 0 820 360" role="img">
        <rect x="1" y="1" width="818" height="358" rx="8" fill="#111F2E" stroke="#1E2D3D" strokeWidth="1" />
        <rect x="28" y="30" width="764" height="300" rx="8" fill="#0D1B2A" stroke="#1E2D3D" strokeWidth="1" />
        <path d="M62 258 H758 M62 112 H758" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />

        {panels.map((panel, index) => (
          <motion.g
            key={panel.label}
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={reduceMotion || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
          >
            <rect x={panel.x} y={panel.y} width="208" height="172" rx="8" fill="#111F2E" stroke="#1E2D3D" strokeWidth="1" />
            <text x={panel.x + 24} y={panel.y + 36} fill="#8892A4" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="700">
              {panel.label}
            </text>
            <text x={panel.x + 24} y={panel.y + 72} fill="#F5F7FA" fontFamily="Syne, sans-serif" fontSize="28" fontWeight="700">
              {panel.value}
            </text>
            <path d={`M${panel.x + 24} ${panel.y + 128} H${panel.x + 184}`} fill="none" stroke="#1E2D3D" strokeWidth="1" />
            <motion.path
              d={panel.path}
              fill="none"
              stroke="#00D4AA"
              strokeWidth="3"
              strokeLinecap="round"
              initial={false}
              animate={canAnimate ? { pathLength: [0, 1], opacity: [0, 1] } : { pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.1, delay: canAnimate ? 0.18 + index * 0.16 : 0, ease: EASE }}
            />
            <motion.circle
              r="5"
              fill="#00D4AA"
              stroke="#00D4AA"
              strokeWidth="1"
              initial={false}
              animate={
                canAnimate
                  ? { opacity: [0.3, 1, 0.3], scale: [0.9, 1.18, 0.9] }
                  : { opacity: 1, scale: 1 }
              }
              transition={{ duration: 2.2, delay: index * 0.2, repeat: canAnimate ? Infinity : 0, ease: "easeInOut" }}
              cx={panel.x + 180}
              cy={panel.y + 28}
            />
          </motion.g>
        ))}

        <motion.g
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={reduceMotion || inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.42, ease: EASE }}
        >
          <rect x="62" y="272" width="696" height="34" rx="999" fill="#111F2E" stroke="#1E2D3D" strokeWidth="1" />
          <circle cx="86" cy="289" r="5" fill="#00D4AA" stroke="#00D4AA" strokeWidth="1" />
          <text x="104" y="294" fill="#F5F7FA" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="700">
            Monthly AI ops review active
          </text>
        </motion.g>
      </svg>
    </div>
  );
}

export default function AiOperationsPage() {
  return (
    <div className="ai-ops-page">
      <RevealSection className="ops-hero">
        <GrainOverlay />
        <div className="ops-hero-grid">
          <div className="ops-hero-copy">
            <p className="ops-section-label">AI & Automation</p>
            <h1>Your AI stack, actively managed. Every month.</h1>
            <p>
              AI tools don&apos;t run themselves. We monitor, tune, and improve your AI operations so they keep
              delivering results.
            </p>
            <Link className="ops-primary-btn" href="/contact">
              Talk to us about AI Ops
            </Link>
          </div>

          <AiOpsDashboardVisual />
        </div>
      </RevealSection>

      <ServicePageTemplate
        pillarLabel="AI & Automation"
        serviceName="Your AI stack, actively managed. Every month."
        hookLine="AI tools don't run themselves. We monitor, tune, and improve your AI operations so they keep delivering results."
        description={[
          "AI tools drift when no one watches them. Prompts stop matching the work, outputs get weaker, and teams slowly stop using what was meant to save time.",
          "BPOLytix runs your AI stack month by month. We monitor active tools, tune prompts and workflows, resolve errors, and report what changed.",
          "This is for businesses that already have AI tools in place, but no one accountable for keeping them useful.",
        ]}
        deliverables={[
          {
            title: "Monthly performance review of all active AI tools",
            body: "We check usage, failure points, output quality, and whether each tool is still doing the job it was meant to do.",
          },
          {
            title: "Prompt engineering and workflow updates",
            body: "We adjust prompts and workflow rules as your team, data, and operating needs change.",
          },
          {
            title: "Error monitoring and resolution",
            body: "We track recurring issues, find the cause, and fix the parts that are slowing people down.",
          },
          {
            title: "New tool evaluation and connection recommendations",
            body: "We review new tools when they matter and advise where they should connect to your current AI stack.",
          },
          {
            title: "Monthly report: what ran, what improved, what is next",
            body: "You get a plain-English monthly report covering usage, fixes, gains, and the next set of actions.",
          },
        ]}
        animatedVisual={<AiOpsDashboardVisual />}
        pricing={[
          { label: "Monthly AI ops retainer", zar: "R3,500/month", gbp: "£145/month" },
          { label: "Once-off build fee", zar: "No build fee", gbp: "No build fee" },
          { label: "Start month", zar: "Month 1", gbp: "Month 1" },
        ]}
        ownershipLine="No once-off build fee - ops starts from month 1."
      />

      <RevealSection className="ops-pricing-section">
        <GrainOverlay />
        <div className="ops-wrap">
          <div className="ops-pricing-card">
            <div className="ops-pricing-row ops-pricing-head">
              <span>Service</span>
              <span>ZAR</span>
              <span>GBP</span>
            </div>
            <div className="ops-pricing-row">
              <span>Monthly AI ops retainer</span>
              <strong className="ops-price-zar">R3,500/month</strong>
              <strong className="ops-price-gbp">£145/month</strong>
            </div>
            <div className="ops-pricing-row ops-note-row">
              <span>No once-off build fee</span>
              <strong>Ops starts from month 1</strong>
              <strong>Ops starts from month 1</strong>
            </div>
          </div>
          <Link className="ops-pricing-btn" href="/contact">
            Scope my AI Ops retainer
          </Link>
        </div>
      </RevealSection>

      <RevealSection className="ops-audience-section">
        <GrainOverlay />
        <div className="ops-wrap">
          <div className="ops-section-heading">
            <p className="ops-section-label">Who it is for</p>
            <h2>For teams with AI in the business, but no one running it.</h2>
          </div>

          <div className="ops-audience-grid">
            {WHO_ITS_FOR.map((item) => (
              <motion.article
                className="ops-audience-card"
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

      <RevealSection className="ops-bottom-cta">
        <GrainOverlay />
        <div className="ops-wrap">
          <div className="ops-cta-band">
            <div>
              <p className="ops-section-label">Ready to talk?</p>
              <h2>AI that actually keeps working.</h2>
            </div>
            <div className="ops-cta-actions">
              <Link className="ops-ghost-btn" href="/contact">
                Let&apos;s talk
              </Link>
              <Link className="ops-whatsapp-btn" href="https://wa.me/27781790363">
                <MessageCircle size={18} color="#00D4AA" strokeWidth={2} />
                WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </RevealSection>

      <style jsx global>{`
        .ai-ops-page,
        .ai-ops-page main,
        .ai-ops-page section {
          background-color: #0D1B2A !important;
          color: #F5F7FA;
        }

        .ai-ops-page > main > .spt-hero,
        .ai-ops-page > main > .spt-visual,
        .ai-ops-page > main > .spt-section:nth-of-type(5),
        .ai-ops-page > main > .spt-cta-strip {
          display: none;
        }

        .ops-hero {
          position: relative;
          overflow: hidden;
          min-height: 80vh;
          background-color: #0D1B2A;
          padding: 128px 0 96px;
        }

        .ops-hero-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: minmax(0, 0.55fr) minmax(0, 0.45fr);
          gap: 56px;
          align-items: center;
          max-width: 1440px;
          min-height: calc(80vh - 224px);
          margin: 0 auto;
          padding-left: 32px;
          padding-right: 32px;
        }

        .ops-hero-copy {
          min-width: 0;
          max-width: 820px;
        }

        .ops-hero-copy h1 {
          max-width: 820px;
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 72px;
          font-weight: 700;
          letter-spacing: -0.022em;
          line-height: 1.05;
        }

        .ops-hero-copy p:not(.ops-section-label) {
          max-width: 620px;
          margin: 24px 0 0;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 18px;
          letter-spacing: -0.011em;
          line-height: 1.7;
        }

        .ops-primary-btn {
          display: inline-flex;
          min-height: 48px;
          align-items: center;
          justify-content: center;
          margin-top: 34px;
          border-radius: 9999px;
          background-color: #1B77F2;
          color: #F5F7FA;
          font-family: var(--font-dm-sans);
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1;
          padding: 0 24px;
          text-decoration: none;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }

        .ops-primary-btn:hover {
          box-shadow: 0 0 24px rgba(27,119,242,0.4);
          transform: translateY(-1px);
        }

        .ai-ops-page .spt-bento-card,
        .ops-audience-card,
        .ops-cta-band {
          border-radius: 8px !important;
        }

        .ops-dashboard-wrap {
          width: 100%;
          min-height: 360px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          overflow: hidden;
        }

        .ops-dashboard-svg {
          display: block;
          width: 100%;
          height: 100%;
          min-height: 360px;
        }

        .ops-pricing-section,
        .ops-audience-section,
        .ops-bottom-cta {
          position: relative;
          overflow: hidden;
          border-top: 1px solid #1E2D3D;
          background-color: #0D1B2A;
        }

        .ops-pricing-section,
        .ops-audience-section,
        .ops-bottom-cta {
          padding-top: 72px;
          padding-bottom: 88px;
        }

        .ops-wrap {
          position: relative;
          z-index: 1;
          max-width: 1440px;
          margin: 0 auto;
          padding-left: 32px;
          padding-right: 32px;
        }

        .ops-pricing-card {
          width: 100%;
          border: 1px solid #1E2D3D;
          border-radius: 12px;
          background-color: #111F2E;
          padding: 32px;
        }

        .ops-pricing-row {
          display: grid;
          grid-template-columns: minmax(0, 1.25fr) minmax(160px, 0.55fr) minmax(160px, 0.55fr);
          gap: 24px;
          align-items: center;
          border-bottom: 1px solid #1E2D3D;
          padding: 18px 0;
        }

        .ops-pricing-row:first-child {
          padding-top: 0;
        }

        .ops-pricing-head span,
        .ops-section-label {
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
          line-height: 1.4;
          text-transform: uppercase;
        }

        .ops-section-label {
          margin: 0 0 14px;
        }

        .ops-pricing-row span,
        .ops-pricing-row strong {
          font-family: var(--font-dm-sans);
          letter-spacing: 0;
        }

        .ops-pricing-row span {
          color: #F5F7FA;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.4;
        }

        .ops-pricing-row strong {
          color: #F5F7FA;
          font-size: 17px;
          font-weight: 700;
          line-height: 1.35;
        }

        .ops-price-zar {
          color: #00D4AA !important;
        }

        .ops-price-gbp {
          color: #8892A4 !important;
        }

        .ops-note-row span,
        .ops-note-row strong {
          color: #F5F7FA;
        }

        .ops-pricing-btn {
          display: inline-flex;
          min-height: 48px;
          align-items: center;
          justify-content: center;
          margin-top: 22px;
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

        .ops-section-heading {
          max-width: 860px;
          margin-bottom: 34px;
        }

        .ops-section-heading h2,
        .ops-cta-band h2 {
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 48px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1;
        }

        .ops-audience-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
          gap: 18px;
        }

        .ops-audience-card {
          min-width: 0;
          border: 1px solid #1E2D3D;
          background-color: #111F2E;
          padding: 30px;
        }

        .ops-audience-card:first-child {
          min-height: 230px;
          background-color: #1C2A3A;
        }

        .ops-audience-card:last-child {
          grid-column: 1 / -1;
        }

        .ops-audience-card h3 {
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.12;
        }

        .ops-audience-card p {
          margin: 16px 0 0;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 16px;
          letter-spacing: 0;
          line-height: 1.7;
        }

        .ops-cta-band {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          border: 1px solid #1E2D3D;
          background-color: #111F2E;
          padding: 40px;
        }

        .ops-cta-actions {
          display: flex;
          flex: 0 0 auto;
          align-items: center;
          gap: 12px;
        }

        .ops-ghost-btn,
        .ops-whatsapp-btn {
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

        .ops-pricing-btn:hover,
        .ops-ghost-btn:hover,
        .ops-whatsapp-btn:hover {
          transform: translateY(-2px);
        }

        .ops-primary-btn:focus-visible,
        .ops-pricing-btn:focus-visible,
        .ops-ghost-btn:focus-visible,
        .ops-whatsapp-btn:focus-visible {
          outline: 2px solid #00D4AA;
          outline-offset: 3px;
        }

        @media (max-width: 900px) {
          .ops-hero {
            min-height: auto;
            padding: 112px 0 56px;
          }

          .ops-hero-grid {
            grid-template-columns: 1fr;
            min-height: 0;
            gap: 40px;
          }

          .ops-hero-copy h1 {
            font-size: 52px;
          }

          .ops-hero-copy p:not(.ops-section-label) {
            font-size: 16px;
          }

          .ops-dashboard-wrap,
          .ops-dashboard-svg {
            min-height: 360px;
          }

          .ops-pricing-section,
          .ops-audience-section,
          .ops-bottom-cta {
            padding-top: 56px;
            padding-bottom: 64px;
          }

          .ops-audience-grid {
            grid-template-columns: 1fr;
          }

          .ops-audience-card:last-child {
            grid-column: auto;
          }

          .ops-section-heading h2,
          .ops-cta-band h2 {
            font-size: 36px;
          }

          .ops-pricing-row {
            grid-template-columns: minmax(0, 1fr) minmax(120px, 0.55fr) minmax(120px, 0.55fr);
            gap: 16px;
          }

          .ops-cta-band,
          .ops-cta-actions {
            align-items: stretch;
            flex-direction: column;
          }

          .ops-cta-band {
            padding: 28px;
          }
        }

        @media (max-width: 560px) {
          .ops-hero-grid,
          .ops-wrap {
            padding-left: 24px;
            padding-right: 24px;
          }

          .ops-hero-copy h1 {
            font-size: 44px;
          }

          .ops-dashboard-wrap,
          .ops-dashboard-svg {
            min-height: 300px;
          }

          .ops-pricing-card {
            padding: 24px;
          }

          .ops-pricing-row {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .ops-pricing-head {
            display: none;
          }

          .ops-pricing-btn,
          .ops-ghost-btn,
          .ops-whatsapp-btn {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ops-primary-btn,
          .ops-pricing-btn,
          .ops-ghost-btn,
          .ops-whatsapp-btn,
          .ops-audience-card {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
