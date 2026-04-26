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
    title: "Founders doing all their own BD",
    body: "You know the work matters, but delivery, admin, and client work keep pushing it off the calendar.",
  },
  {
    title: "Businesses entering a new market",
    body: "SA to UK, or UK to SA, needs a fresh target list, new conversations, and consistent follow-up.",
  },
  {
    title: "SMEs that tried cold email",
    body: "You sent campaigns before, but the list, copy, timing, or follow-up did not turn into traction.",
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

function PipelineFunnelVisual() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const canAnimate = inView && !reduceMotion;

  const rows = [
    { label: "Target list", y: 62, width: 560, progress: 430 },
    { label: "Outreach sent", y: 124, width: 470, progress: 336 },
    { label: "Calls booked", y: 186, width: 380, progress: 246 },
    { label: "Proposals sent", y: 248, width: 290, progress: 178 },
    { label: "Deals closed", y: 310, width: 200, progress: 124 },
  ];

  return (
    <div ref={ref} className="bd-visual-wrap" aria-label="Business development funnel from target list to deals closed">
      <svg className="bd-visual-svg" viewBox="0 0 760 410" role="img">
        <rect x="1" y="1" width="758" height="408" rx="8" fill="#111F2E" stroke="#1E2D3D" strokeWidth="1" />
        <path d="M58 70 H702 M58 190 H702 M58 310 H702" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
        <path d="M190 42 V368 M380 42 V368 M570 42 V368" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />

        {rows.map((row, index) => {
          const x = 380 - row.width / 2;
          const progressX = 380 - row.progress / 2;

          return (
            <motion.g
              key={row.label}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={reduceMotion || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
            >
              <path
                d={`M${x} ${row.y} H${x + row.width} L${x + row.width - 34} ${row.y + 42} H${x + 34} Z`}
                fill={index === rows.length - 1 ? "rgba(0,212,170,0.08)" : "#0D1B2A"}
                stroke={index === rows.length - 1 ? "#00D4AA" : "#1E2D3D"}
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <motion.rect
                x={progressX}
                y={row.y + 28}
                width={row.progress}
                height="6"
                rx="999"
                fill="#00D4AA"
                initial={false}
                animate={canAnimate ? { scaleX: [0.2, 1], opacity: [0, 1] } : { scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.75, delay: canAnimate ? 0.18 + index * 0.1 : 0, ease: EASE }}
                style={{ transformBox: "fill-box", transformOrigin: "left center" }}
              />
              <text x="380" y={row.y + 21} fill={index === rows.length - 1 ? "#00D4AA" : "#F5F7FA"} fontFamily="DM Sans, sans-serif" fontSize="14" fontWeight="700" textAnchor="middle">
                {row.label}
              </text>
            </motion.g>
          );
        })}

        <motion.path
          d="M380 104 V124 M380 166 V186 M380 228 V248 M380 290 V310"
          fill="none"
          stroke="#00D4AA"
          strokeWidth="3"
          strokeLinecap="round"
          initial={false}
          animate={canAnimate ? { pathLength: [0, 1], opacity: [0, 1] } : { pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: canAnimate ? 0.35 : 0, ease: EASE }}
        />

        <motion.circle
          r="7"
          fill="#00D4AA"
          stroke="#00D4AA"
          strokeWidth="1"
          initial={false}
          animate={canAnimate ? { cx: [380, 380, 380, 380, 380], cy: [84, 146, 208, 270, 332], opacity: [0, 1, 1, 1, 0] } : { cx: 380, cy: 332, opacity: 1 }}
          transition={{ duration: 4.2, repeat: canAnimate ? Infinity : 0, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

export default function BusinessDevelopmentPage() {
  return (
    <div className="bd-page">
      <RevealSection className="bd-hero">
        <GrainOverlay />
        <div className="bd-hero-grid">
          <div className="bd-hero-copy">
            <p className="bd-section-label">Build</p>
            <h1>Pipeline built. Conversations started. Deals moved.</h1>
            <p>
              We run your business development function — outreach, follow-up, and partnership targeting — so your
              founders can focus on delivery.
            </p>
            <Link className="bd-primary-btn" href="/contact">
              Scope my BD retainer
            </Link>
          </div>

          <PipelineFunnelVisual />
        </div>
      </RevealSection>

      <ServicePageTemplate
        pillarLabel="Build"
        serviceName="Pipeline built. Conversations started. Deals moved."
        hookLine="We run your business development function — outreach, follow-up, and partnership targeting — so your founders can focus on delivery."
        description={[
          "Founders often do business development in bursts, then stop when delivery gets busy. Pipeline needs a weekly operating rhythm.",
          "BPOLytix runs the outbound work: target list, copy, agreed outreach volume, follow-up, meeting booking, and monthly reporting.",
          "This is for SA startups and UK SMEs that need sales traction but cannot hire a BD person yet.",
        ]}
        deliverables={[
          {
            title: "ICP definition",
            body: "We define the best-fit customer profile, buying triggers, filters, and target segments.",
          },
          {
            title: "Target list build",
            body: "We build the list from LinkedIn, Crunchbase, public directories, and agreed market sources.",
          },
          {
            title: "Outreach copy and sequencing",
            body: "Email and LinkedIn messages are written around the offer, the audience, and the follow-up cadence.",
          },
          {
            title: "Weekly outreach execution",
            body: "We run the agreed weekly outreach volume and keep the activity moving.",
          },
          {
            title: "Meeting booking and CRM logging",
            body: "Interested leads are logged, followed up, and moved into the right next step.",
          },
          {
            title: "Monthly pipeline report",
            body: "You get a clear report covering outreach sent, replies, calls, proposals, and next actions.",
          },
        ]}
        animatedVisual={<PipelineFunnelVisual />}
        pricing={[
          { label: "Monthly retainer", zar: "R6,500/month", gbp: "£270/month" },
          { label: "Minimum term", zar: "3 months", gbp: "3 months" },
          { label: "Enterprise BD programmes", zar: "Custom quote", gbp: "Custom quote" },
        ]}
        ownershipLine="Pricing varies by outreach volume. Custom quotes available for enterprise BD programmes."
      />

      <RevealSection className="bd-pricing-section">
        <GrainOverlay />
        <div className="bd-wrap">
          <div className="bd-pricing-card">
            <div className="bd-pricing-row bd-pricing-head">
              <span>Service</span>
              <span>ZAR</span>
              <span>GBP</span>
            </div>
            <div className="bd-pricing-row">
              <span>Monthly retainer</span>
              <strong className="bd-price-zar">R6,500/month</strong>
              <strong className="bd-price-gbp">£270/month</strong>
            </div>
            <div className="bd-pricing-row">
              <span>Minimum term</span>
              <strong>3 months</strong>
              <strong>3 months</strong>
            </div>
            <p className="bd-pricing-note">
              Pricing varies by outreach volume. Custom quotes available for enterprise BD programmes.
            </p>
          </div>
          <Link className="bd-pricing-btn" href="/contact">
            Talk about your pipeline
          </Link>
        </div>
      </RevealSection>

      <RevealSection className="bd-audience-section">
        <GrainOverlay />
        <div className="bd-wrap">
          <div className="bd-section-heading">
            <p className="bd-section-label">Who it is for</p>
            <h2>For businesses that need outbound work done every week.</h2>
          </div>

          <div className="bd-audience-grid">
            {WHO_ITS_FOR.map((item) => (
              <motion.article
                className="bd-audience-card"
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

      <RevealSection className="bd-bottom-cta">
        <GrainOverlay />
        <div className="bd-wrap">
          <div className="bd-cta-band">
            <div>
              <p className="bd-section-label">Ready to talk?</p>
              <h2>Stop waiting for inbound. Build the pipeline.</h2>
            </div>
            <div className="bd-cta-actions">
              <Link className="bd-ghost-btn" href="/contact">
                Let&apos;s talk
              </Link>
              <Link className="bd-whatsapp-btn" href="https://wa.me/27781790363">
                <MessageCircle size={18} color="#00D4AA" strokeWidth={2} />
                WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </RevealSection>

      <style jsx global>{`
        .bd-page,
        .bd-page main,
        .bd-page section {
          background-color: #0D1B2A !important;
          color: #F5F7FA;
        }

        .bd-page > main > .spt-hero,
        .bd-page > main > .spt-visual,
        .bd-page > main > .spt-section:nth-of-type(5),
        .bd-page > main > .spt-cta-strip {
          display: none;
        }

        .bd-hero {
          position: relative;
          overflow: hidden;
          min-height: 80vh;
          background-color: #0D1B2A;
          padding: 128px 0 96px;
        }

        .bd-hero-grid {
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

        .bd-hero-copy {
          min-width: 0;
          max-width: 820px;
        }

        .bd-hero-copy h1 {
          max-width: 820px;
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 72px;
          font-weight: 700;
          letter-spacing: -0.022em;
          line-height: 1.05;
        }

        .bd-hero-copy p:not(.bd-section-label) {
          max-width: 640px;
          margin: 24px 0 0;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 18px;
          letter-spacing: -0.011em;
          line-height: 1.7;
        }

        .bd-primary-btn {
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

        .bd-primary-btn:hover {
          box-shadow: 0 0 24px rgba(27,119,242,0.4);
          transform: translateY(-1px);
        }

        .bd-page .spt-bento-card,
        .bd-audience-card,
        .bd-cta-band {
          border-radius: 8px !important;
        }

        .bd-visual-wrap {
          width: 100%;
          min-height: 410px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          overflow: hidden;
        }

        .bd-visual-svg {
          display: block;
          width: 100%;
          height: 100%;
          min-height: 410px;
        }

        .bd-pricing-section,
        .bd-audience-section,
        .bd-bottom-cta {
          position: relative;
          overflow: hidden;
          border-top: 1px solid #1E2D3D;
          background-color: #0D1B2A;
          padding-top: 72px;
          padding-bottom: 88px;
        }

        .bd-wrap {
          position: relative;
          z-index: 1;
          max-width: 1440px;
          margin: 0 auto;
          padding-left: 32px;
          padding-right: 32px;
        }

        .bd-pricing-card {
          width: 100%;
          border: 1px solid #1E2D3D;
          border-radius: 12px;
          background-color: #111F2E;
          padding: 32px;
        }

        .bd-pricing-row {
          display: grid;
          grid-template-columns: minmax(0, 1.25fr) minmax(160px, 0.55fr) minmax(160px, 0.55fr);
          gap: 24px;
          align-items: center;
          border-bottom: 1px solid #1E2D3D;
          padding: 18px 0;
        }

        .bd-pricing-row:first-child {
          padding-top: 0;
        }

        .bd-pricing-head span,
        .bd-section-label {
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
          line-height: 1.4;
          text-transform: uppercase;
        }

        .bd-section-label {
          margin: 0 0 14px;
        }

        .bd-pricing-row span,
        .bd-pricing-row strong,
        .bd-pricing-note {
          font-family: var(--font-dm-sans);
          letter-spacing: 0;
        }

        .bd-pricing-row span {
          color: #F5F7FA;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.4;
        }

        .bd-pricing-row strong {
          color: #F5F7FA;
          font-size: 17px;
          font-weight: 700;
          line-height: 1.35;
        }

        .bd-price-zar {
          color: #00D4AA !important;
        }

        .bd-price-gbp {
          color: #8892A4 !important;
        }

        .bd-pricing-note {
          margin: 16px 0 0;
          color: #8892A4;
          font-size: 14px;
          line-height: 1.6;
        }

        .bd-pricing-btn {
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

        .bd-section-heading {
          max-width: 860px;
          margin-bottom: 34px;
        }

        .bd-section-heading h2,
        .bd-cta-band h2 {
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 48px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1;
        }

        .bd-audience-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
          gap: 18px;
        }

        .bd-audience-card {
          min-width: 0;
          border: 1px solid #1E2D3D;
          background-color: #111F2E;
          padding: 30px;
        }

        .bd-audience-card:first-child {
          min-height: 230px;
          background-color: #1C2A3A;
        }

        .bd-audience-card:last-child {
          grid-column: 1 / -1;
        }

        .bd-audience-card h3 {
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.12;
        }

        .bd-audience-card p {
          margin: 16px 0 0;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 16px;
          letter-spacing: 0;
          line-height: 1.7;
        }

        .bd-cta-band {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          border: 1px solid #1E2D3D;
          background-color: #111F2E;
          padding: 40px;
        }

        .bd-cta-actions {
          display: flex;
          flex: 0 0 auto;
          align-items: center;
          gap: 12px;
        }

        .bd-ghost-btn,
        .bd-whatsapp-btn {
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

        .bd-pricing-btn:hover,
        .bd-ghost-btn:hover,
        .bd-whatsapp-btn:hover {
          transform: translateY(-2px);
        }

        .bd-primary-btn:focus-visible,
        .bd-pricing-btn:focus-visible,
        .bd-ghost-btn:focus-visible,
        .bd-whatsapp-btn:focus-visible {
          outline: 2px solid #00D4AA;
          outline-offset: 3px;
        }

        @media (max-width: 900px) {
          .bd-hero {
            min-height: auto;
            padding: 112px 0 56px;
          }

          .bd-hero-grid {
            grid-template-columns: 1fr;
            min-height: 0;
            gap: 40px;
          }

          .bd-hero-copy h1 {
            font-size: 52px;
          }

          .bd-hero-copy p:not(.bd-section-label) {
            font-size: 16px;
          }

          .bd-visual-wrap,
          .bd-visual-svg {
            min-height: 360px;
          }

          .bd-pricing-section,
          .bd-audience-section,
          .bd-bottom-cta {
            padding-top: 56px;
            padding-bottom: 64px;
          }

          .bd-audience-grid {
            grid-template-columns: 1fr;
          }

          .bd-audience-card:last-child {
            grid-column: auto;
          }

          .bd-section-heading h2,
          .bd-cta-band h2 {
            font-size: 36px;
          }

          .bd-pricing-row {
            grid-template-columns: minmax(0, 1fr) minmax(120px, 0.55fr) minmax(120px, 0.55fr);
            gap: 16px;
          }

          .bd-cta-band,
          .bd-cta-actions {
            align-items: stretch;
            flex-direction: column;
          }

          .bd-cta-band {
            padding: 28px;
          }
        }

        @media (max-width: 560px) {
          .bd-hero-grid,
          .bd-wrap {
            padding-left: 24px;
            padding-right: 24px;
          }

          .bd-hero-copy h1 {
            font-size: 44px;
          }

          .bd-visual-wrap,
          .bd-visual-svg {
            min-height: 300px;
          }

          .bd-pricing-card {
            padding: 24px;
          }

          .bd-pricing-row {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .bd-pricing-head {
            display: none;
          }

          .bd-pricing-btn,
          .bd-ghost-btn,
          .bd-whatsapp-btn {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .bd-primary-btn,
          .bd-pricing-btn,
          .bd-ghost-btn,
          .bd-whatsapp-btn,
          .bd-audience-card {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
