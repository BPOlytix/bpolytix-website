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
    title: "Startups making their first hire",
    body: "You need proper HR foundations before contracts, personal data, and staff questions start piling up.",
  },
  {
    title: "SMEs expanding from SA to UK",
    body: "You need one hiring process that respects both regions without making the team chase documents manually.",
  },
  {
    title: "Founders who have been winging staff setup",
    body: "You need the process formalised so every new hire gets the same start and the right documents.",
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

function OnboardingFlowVisual() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const canAnimate = inView && !reduceMotion;

  const steps = [
    { label: "Contract sent", x: 258, y: 82 },
    { label: "Documents collected", x: 258, y: 136 },
    { label: "System access granted", x: 258, y: 190 },
    { label: "Policy pack delivered", x: 258, y: 244 },
    { label: "First-day brief", x: 258, y: 298 },
  ];

  return (
    <div ref={ref} className="onboard-flow-wrap" aria-label="Offer accepted moves through automated steps until the employee is ready">
      <svg className="onboard-flow-svg" viewBox="0 0 760 380" role="img">
        <defs>
          <marker id="onboardArrow" markerHeight="10" markerWidth="10" orient="auto" refX="8" refY="5">
            <path d="M0 0 L10 5 L0 10 Z" fill="#00D4AA" stroke="#00D4AA" strokeWidth="1" />
          </marker>
        </defs>

        <rect x="1" y="1" width="758" height="378" rx="8" fill="#111F2E" stroke="#1E2D3D" strokeWidth="1" />
        <path d="M40 70 H720 M40 190 H720 M40 310 H720" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
        <path d="M154 40 V340 M380 40 V340 M606 40 V340" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />

        <motion.g
          initial={reduceMotion ? false : { opacity: 0, x: -20 }}
          animate={reduceMotion || inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <rect x="54" y="142" width="150" height="96" rx="8" fill="#0D1B2A" stroke="#1E2D3D" strokeWidth="2" />
          <circle cx="88" cy="190" r="15" fill="rgba(0,212,170,0.10)" stroke="#00D4AA" strokeWidth="2" />
          <path d="M81 190 L86 195 L96 184" fill="none" stroke="#00D4AA" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <text x="129" y="184" fill="#8892A4" fontFamily="DM Sans, sans-serif" fontSize="12" fontWeight="700" textAnchor="middle">
            Offer
          </text>
          <text x="129" y="205" fill="#F5F7FA" fontFamily="Syne, sans-serif" fontSize="18" fontWeight="700" textAnchor="middle">
            accepted
          </text>
        </motion.g>

        <motion.path
          d="M204 190 H248"
          fill="none"
          stroke="#00D4AA"
          strokeWidth="3"
          strokeLinecap="round"
          markerEnd="url(#onboardArrow)"
          initial={false}
          animate={canAnimate ? { pathLength: [0, 1], opacity: [0, 1] } : { pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
        />

        <motion.g
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={reduceMotion || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        >
          <rect x="248" y="50" width="264" height="280" rx="12" fill="#0D1B2A" stroke="#1B77F2" strokeWidth="3" />
          <text x="380" y="34" fill="#8892A4" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="700" textAnchor="middle">
            Automated steps
          </text>
          {steps.map((step, index) => (
            <motion.g
              key={step.label}
              initial={reduceMotion ? false : { opacity: 0, x: -10 }}
              animate={reduceMotion || inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ duration: 0.45, delay: 0.18 + index * 0.08, ease: EASE }}
            >
              <rect x={step.x} y={step.y - 19} width="244" height="38" rx="8" fill="#111F2E" stroke="#1E2D3D" strokeWidth="1" />
              <circle cx={step.x + 20} cy={step.y} r="10" fill="rgba(0,212,170,0.08)" stroke="#00D4AA" strokeWidth="2" />
              <path d={`M${step.x + 15} ${step.y} L${step.x + 19} ${step.y + 4} L${step.x + 26} ${step.y - 5}`} fill="none" stroke="#00D4AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <text x={step.x + 48} y={step.y + 5} fill="#F5F7FA" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="700">
                {step.label}
              </text>
            </motion.g>
          ))}
        </motion.g>

        <motion.path
          d="M512 190 H556"
          fill="none"
          stroke="#00D4AA"
          strokeWidth="3"
          strokeLinecap="round"
          markerEnd="url(#onboardArrow)"
          initial={false}
          animate={canAnimate ? { pathLength: [0, 1], opacity: [0, 1] } : { pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: canAnimate ? 0.55 : 0, ease: EASE }}
        />

        <motion.g
          initial={reduceMotion ? false : { opacity: 0, x: 20 }}
          animate={reduceMotion || inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.7, delay: 0.22, ease: EASE }}
        >
          <rect x="556" y="142" width="150" height="96" rx="8" fill="rgba(0,212,170,0.08)" stroke="#00D4AA" strokeWidth="2" />
          <text x="631" y="184" fill="#8892A4" fontFamily="DM Sans, sans-serif" fontSize="12" fontWeight="700" textAnchor="middle">
            Employee
          </text>
          <text x="631" y="207" fill="#00D4AA" fontFamily="Syne, sans-serif" fontSize="22" fontWeight="700" textAnchor="middle">
            ready
          </text>
        </motion.g>

        <motion.circle
          r="6"
          fill="#00D4AA"
          stroke="#00D4AA"
          strokeWidth="1"
          initial={false}
          animate={canAnimate ? { cx: [204, 248, 380, 512, 556], cy: [190, 190, 190, 190, 190], opacity: [0, 1, 1, 1, 0] } : { cx: 556, cy: 190, opacity: 1 }}
          transition={{ duration: 4.4, repeat: canAnimate ? Infinity : 0, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <div className="onboard-page">
      <RevealSection className="onboard-hero">
        <GrainOverlay />
        <div className="onboard-hero-grid">
          <div className="onboard-hero-copy">
            <p className="onboard-section-label">People</p>
            <h1>New hire. Day one sorted. No paperwork chase.</h1>
            <p>
              We automate your onboarding workflow and generate the HR policy documents your business legally needs -
              for SA, UK, or both.
            </p>
            <Link className="onboard-primary-btn" href="/contact">
              Scope my onboarding build
            </Link>
          </div>

          <OnboardingFlowVisual />
        </div>
      </RevealSection>

      <ServicePageTemplate
        pillarLabel="People"
        serviceName="New hire. Day one sorted. No paperwork chase."
        hookLine="We automate your onboarding workflow and generate the HR policy documents your business legally needs - for SA, UK, or both."
        description={[
          "Manual onboarding is slow, uneven, and easy to miss when the team is busy. A new hire should not have to wait for documents, policy links, access requests, or first-day instructions.",
          "BPOLytix builds an automated onboarding flow for your business and pairs it with the policy documents you need for SA, UK, or both.",
          "This is for SA startups and UK SMEs hiring staff for the first time, expanding across regions, or trying to make hiring repeatable.",
        ]}
        deliverables={[
          {
            title: "Onboarding workflow design and automation build",
            body: "We map your hiring steps and build the flow that sends, collects, routes, and tracks each item.",
          },
          {
            title: "Contract and offer letter templates",
            body: "SA, UK, or dual-region templates set up for the way your business hires staff.",
          },
          {
            title: "HR policy document pack",
            body: "Employment contract, leave policy, IT and data policy, and disciplinary code.",
          },
          {
            title: "POPIA/GDPR data handling policy",
            body: "Plain-English rules for how staff data is collected, stored, accessed, and retained.",
          },
          {
            title: "Staff handbook",
            body: "A lightweight handbook your team can actually read, with the basics covered in plain English.",
          },
          {
            title: "Handover and training",
            body: "We show you how to run the flow yourself and keep the process consistent for every new hire.",
          },
        ]}
        animatedVisual={<OnboardingFlowVisual />}
        pricing={[
          { label: "SA pack", zar: "R6,500 once-off", gbp: "-" },
          { label: "UK pack", zar: "-", gbp: "£280 once-off" },
          { label: "SA + UK dual pack", zar: "R9,500", gbp: "£420" },
          { label: "Annual policy review", zar: "R1,200/year", gbp: "£50/year" },
        ]}
        ownershipLine="Optional annual policy review available after the build."
      />

      <RevealSection className="onboard-pricing-section">
        <GrainOverlay />
        <div className="onboard-wrap">
          <div className="onboard-pricing-card">
            <div className="onboard-pricing-row onboard-pricing-head">
              <span>Service</span>
              <span>ZAR</span>
              <span>GBP</span>
            </div>
            <div className="onboard-pricing-row">
              <span>SA pack</span>
              <strong className="onboard-price-zar">R6,500 once-off</strong>
              <strong className="onboard-price-gbp">-</strong>
            </div>
            <div className="onboard-pricing-row">
              <span>UK pack</span>
              <strong className="onboard-price-zar">-</strong>
              <strong className="onboard-price-gbp">£280 once-off</strong>
            </div>
            <div className="onboard-pricing-row">
              <span>SA + UK dual pack</span>
              <strong className="onboard-price-zar">R9,500</strong>
              <strong className="onboard-price-gbp">£420</strong>
            </div>
            <div className="onboard-pricing-row onboard-review-row">
              <span>Optional annual policy review</span>
              <strong>R1,200/year</strong>
              <strong>£50/year</strong>
            </div>
          </div>
          <Link className="onboard-pricing-btn" href="/contact">
            Get your onboarding built
          </Link>
        </div>
      </RevealSection>

      <RevealSection className="onboard-audience-section">
        <GrainOverlay />
        <div className="onboard-wrap">
          <div className="onboard-section-heading">
            <p className="onboard-section-label">Who it is for</p>
            <h2>For businesses that need every new hire handled properly.</h2>
          </div>

          <div className="onboard-audience-grid">
            {WHO_ITS_FOR.map((item) => (
              <motion.article
                className="onboard-audience-card"
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

      <RevealSection className="onboard-bottom-cta">
        <GrainOverlay />
        <div className="onboard-wrap">
          <div className="onboard-cta-band">
            <div>
              <p className="onboard-section-label">Ready to talk?</p>
              <h2>Every new hire deserves a proper start.</h2>
            </div>
            <div className="onboard-cta-actions">
              <Link className="onboard-ghost-btn" href="/contact">
                Talk to us
              </Link>
              <Link className="onboard-whatsapp-btn" href="https://wa.me/27781790363">
                <MessageCircle size={18} color="#00D4AA" strokeWidth={2} />
                WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </RevealSection>

      <style jsx global>{`
        .onboard-page,
        .onboard-page main,
        .onboard-page section {
          background-color: #0D1B2A !important;
          color: #F5F7FA;
        }

        .onboard-page > main > .spt-hero,
        .onboard-page > main > .spt-visual,
        .onboard-page > main > .spt-section:nth-of-type(5),
        .onboard-page > main > .spt-cta-strip {
          display: none;
        }

        .onboard-hero {
          position: relative;
          overflow: hidden;
          min-height: 80vh;
          background-color: #0D1B2A;
          padding: 128px 0 96px;
        }

        .onboard-hero-grid {
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

        .onboard-hero-copy {
          min-width: 0;
          max-width: 820px;
        }

        .onboard-hero-copy h1 {
          max-width: 820px;
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 72px;
          font-weight: 700;
          letter-spacing: -0.022em;
          line-height: 1.05;
        }

        .onboard-hero-copy p:not(.onboard-section-label) {
          max-width: 620px;
          margin: 24px 0 0;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 18px;
          letter-spacing: -0.011em;
          line-height: 1.7;
        }

        .onboard-primary-btn {
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

        .onboard-primary-btn:hover {
          box-shadow: 0 0 24px rgba(27,119,242,0.4);
          transform: translateY(-1px);
        }

        .onboard-page .spt-bento-card,
        .onboard-audience-card,
        .onboard-cta-band {
          border-radius: 8px !important;
        }

        .onboard-flow-wrap {
          width: 100%;
          min-height: 380px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          overflow: hidden;
        }

        .onboard-flow-svg {
          display: block;
          width: 100%;
          height: 100%;
          min-height: 380px;
        }

        .onboard-pricing-section,
        .onboard-audience-section,
        .onboard-bottom-cta {
          position: relative;
          overflow: hidden;
          border-top: 1px solid #1E2D3D;
          background-color: #0D1B2A;
          padding-top: 72px;
          padding-bottom: 88px;
        }

        .onboard-wrap {
          position: relative;
          z-index: 1;
          max-width: 1440px;
          margin: 0 auto;
          padding-left: 32px;
          padding-right: 32px;
        }

        .onboard-pricing-card {
          width: 100%;
          border: 1px solid #1E2D3D;
          border-radius: 12px;
          background-color: #111F2E;
          padding: 32px;
        }

        .onboard-pricing-row {
          display: grid;
          grid-template-columns: minmax(0, 1.25fr) minmax(160px, 0.55fr) minmax(160px, 0.55fr);
          gap: 24px;
          align-items: center;
          border-bottom: 1px solid #1E2D3D;
          padding: 18px 0;
        }

        .onboard-pricing-row:first-child {
          padding-top: 0;
        }

        .onboard-pricing-head span,
        .onboard-section-label {
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
          line-height: 1.4;
          text-transform: uppercase;
        }

        .onboard-section-label {
          margin: 0 0 14px;
        }

        .onboard-pricing-row span,
        .onboard-pricing-row strong {
          font-family: var(--font-dm-sans);
          letter-spacing: 0;
        }

        .onboard-pricing-row span {
          color: #F5F7FA;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.4;
        }

        .onboard-pricing-row strong {
          color: #F5F7FA;
          font-size: 17px;
          font-weight: 700;
          line-height: 1.35;
        }

        .onboard-price-zar {
          color: #00D4AA !important;
        }

        .onboard-price-gbp {
          color: #8892A4 !important;
        }

        .onboard-review-row span,
        .onboard-review-row strong {
          color: #F5F7FA;
        }

        .onboard-pricing-btn {
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

        .onboard-section-heading {
          max-width: 860px;
          margin-bottom: 34px;
        }

        .onboard-section-heading h2,
        .onboard-cta-band h2 {
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 48px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1;
        }

        .onboard-audience-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
          gap: 18px;
        }

        .onboard-audience-card {
          min-width: 0;
          border: 1px solid #1E2D3D;
          background-color: #111F2E;
          padding: 30px;
        }

        .onboard-audience-card:first-child {
          min-height: 230px;
          background-color: #1C2A3A;
        }

        .onboard-audience-card:last-child {
          grid-column: 1 / -1;
        }

        .onboard-audience-card h3 {
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.12;
        }

        .onboard-audience-card p {
          margin: 16px 0 0;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 16px;
          letter-spacing: 0;
          line-height: 1.7;
        }

        .onboard-cta-band {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          border: 1px solid #1E2D3D;
          background-color: #111F2E;
          padding: 40px;
        }

        .onboard-cta-actions {
          display: flex;
          flex: 0 0 auto;
          align-items: center;
          gap: 12px;
        }

        .onboard-ghost-btn,
        .onboard-whatsapp-btn {
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

        .onboard-pricing-btn:hover,
        .onboard-ghost-btn:hover,
        .onboard-whatsapp-btn:hover {
          transform: translateY(-2px);
        }

        .onboard-primary-btn:focus-visible,
        .onboard-pricing-btn:focus-visible,
        .onboard-ghost-btn:focus-visible,
        .onboard-whatsapp-btn:focus-visible {
          outline: 2px solid #00D4AA;
          outline-offset: 3px;
        }

        @media (max-width: 900px) {
          .onboard-hero {
            min-height: auto;
            padding: 112px 0 56px;
          }

          .onboard-hero-grid {
            grid-template-columns: 1fr;
            min-height: 0;
            gap: 40px;
          }

          .onboard-hero-copy h1 {
            font-size: 52px;
          }

          .onboard-hero-copy p:not(.onboard-section-label) {
            font-size: 16px;
          }

          .onboard-flow-wrap,
          .onboard-flow-svg {
            min-height: 360px;
          }

          .onboard-pricing-section,
          .onboard-audience-section,
          .onboard-bottom-cta {
            padding-top: 56px;
            padding-bottom: 64px;
          }

          .onboard-audience-grid {
            grid-template-columns: 1fr;
          }

          .onboard-audience-card:last-child {
            grid-column: auto;
          }

          .onboard-section-heading h2,
          .onboard-cta-band h2 {
            font-size: 36px;
          }

          .onboard-pricing-row {
            grid-template-columns: minmax(0, 1fr) minmax(120px, 0.55fr) minmax(120px, 0.55fr);
            gap: 16px;
          }

          .onboard-cta-band,
          .onboard-cta-actions {
            align-items: stretch;
            flex-direction: column;
          }

          .onboard-cta-band {
            padding: 28px;
          }
        }

        @media (max-width: 560px) {
          .onboard-hero-grid,
          .onboard-wrap {
            padding-left: 24px;
            padding-right: 24px;
          }

          .onboard-hero-copy h1 {
            font-size: 44px;
          }

          .onboard-flow-wrap,
          .onboard-flow-svg {
            min-height: 300px;
          }

          .onboard-pricing-card {
            padding: 24px;
          }

          .onboard-pricing-row {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .onboard-pricing-head {
            display: none;
          }

          .onboard-pricing-btn,
          .onboard-ghost-btn,
          .onboard-whatsapp-btn {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .onboard-primary-btn,
          .onboard-pricing-btn,
          .onboard-ghost-btn,
          .onboard-whatsapp-btn,
          .onboard-audience-card {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
