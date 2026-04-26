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
    title: "Founders launching a new business",
    body: "You need a credible site this week, not a six-week project plan before anyone sees a page.",
  },
  {
    title: "SMEs whose current site is costing trust",
    body: "Clients are checking you before they speak to you. The site needs to look like the business you run now.",
  },
  {
    title: "Businesses entering a new market",
    body: "You need a local web presence fast, with clear pages, a contact path, and the right message for that market.",
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

function ThreeDayTimelineVisual() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const canAnimate = inView && !reduceMotion;

  const days = [
    {
      day: "Day 1",
      title: "Design brief + wireframe",
      x: 72,
      y: 92,
    },
    {
      day: "Day 2",
      title: "Build + content",
      x: 304,
      y: 176,
    },
    {
      day: "Day 3",
      title: "QA + go live",
      x: 536,
      y: 92,
    },
  ];

  return (
    <div ref={ref} className="w3ds-timeline-wrap" aria-label="Three business day website timeline">
      <svg className="w3ds-timeline-svg" viewBox="0 0 760 360" role="img">
        <defs>
          <marker id="timelineArrow" markerHeight="10" markerWidth="10" orient="auto" refX="8" refY="5">
            <path d="M0 0 L10 5 L0 10 Z" fill="#00D4AA" stroke="#00D4AA" strokeWidth="1" />
          </marker>
        </defs>

        <rect x="1" y="1" width="758" height="358" rx="8" fill="#111F2E" stroke="#1E2D3D" strokeWidth="1" />
        <path d="M48 70 H712 M48 180 H712 M48 290 H712" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
        <path d="M160 38 V322 M380 38 V322 M600 38 V322" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />

        <motion.path
          d="M188 160 C254 124 314 128 372 190 C428 250 492 240 554 160"
          fill="none"
          stroke="#00D4AA"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          markerEnd="url(#timelineArrow)"
          initial={false}
          animate={canAnimate ? { pathLength: [0, 1], opacity: [0, 1] } : { pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: EASE }}
        />

        {days.map((item, index) => (
          <motion.g
            key={item.day}
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={reduceMotion || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.7, delay: index * 0.12, ease: EASE }}
          >
            <rect x={item.x} y={item.y} width="152" height="128" rx="8" fill="#0D1B2A" stroke="#1E2D3D" strokeWidth="2" />
            <circle cx={item.x + 32} cy={item.y + 34} r="16" fill="rgba(0,212,170,0.10)" stroke="#00D4AA" strokeWidth="2" />
            <text x={item.x + 32} y={item.y + 39} fill="#00D4AA" fontFamily="DM Sans, sans-serif" fontSize="12" fontWeight="700" textAnchor="middle">
              {index + 1}
            </text>
            <text x={item.x + 76} y={item.y + 40} fill="#8892A4" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="700" textAnchor="middle">
              {item.day}
            </text>
            <text x={item.x + 76} y={item.y + 76} fill="#F5F7FA" fontFamily="Syne, sans-serif" fontSize="17" fontWeight="700" textAnchor="middle">
              {item.title.includes("+") ? (
                <>
                  <tspan x={item.x + 76} dy="0">{item.title.split(" + ")[0]} +</tspan>
                  <tspan x={item.x + 76} dy="21">{item.title.split(" + ")[1]}</tspan>
                </>
              ) : (
                item.title
              )}
            </text>
          </motion.g>
        ))}

        <motion.g
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={reduceMotion || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.7, delay: 0.42, ease: EASE }}
        >
          <rect x="244" y="284" width="272" height="42" rx="999" fill="#0D1B2A" stroke="#1E2D3D" strokeWidth="1" />
          <circle cx="272" cy="305" r="6" fill="#00D4AA" stroke="#00D4AA" strokeWidth="1" />
          <text x="292" y="310" fill="#F5F7FA" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="700">
            Production-ready and live
          </text>
        </motion.g>

        <motion.circle
          r="7"
          fill="#00D4AA"
          stroke="#00D4AA"
          strokeWidth="1"
          initial={false}
          animate={canAnimate ? { cx: [188, 304, 380, 536, 554], cy: [160, 134, 196, 176, 160], opacity: [0, 1, 1, 1, 0] } : { cx: 554, cy: 160, opacity: 1 }}
          transition={{ duration: 4.8, repeat: canAnimate ? Infinity : 0, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

export default function WebsiteInThreeDaysServicePage() {
  return (
    <div className="w3ds-page">
      <RevealSection className="w3ds-hero">
        <GrainOverlay />
        <div className="w3ds-hero-grid">
          <div className="w3ds-hero-copy">
            <p className="w3ds-section-label">Build</p>
            <h1>A production-ready website. Live in 3 business days.</h1>
            <p>
              Not a template. Not a Wix site. A Next.js marketing website, custom-designed and deployed - built by
              BPOLytix.
            </p>
            <Link className="w3ds-primary-btn" href="/contact">
              Brief my website
            </Link>
          </div>

          <ThreeDayTimelineVisual />
        </div>
      </RevealSection>

      <ServicePageTemplate
        pillarLabel="Build"
        serviceName="A production-ready website. Live in 3 business days."
        hookLine="Not a template. Not a Wix site. A Next.js marketing website, custom-designed and deployed - built by BPOLytix."
        description={[
          "Web agencies can take 6-12 weeks before anything useful goes live. No-code builders often look generic and still leave you doing the hard parts yourself.",
          "BPOLytix builds a custom marketing website, deploys it, connects the contact form, and helps with the domain setup in 3 business days.",
          "This is for SA startups and UK SMEs that need a professional web presence immediately.",
        ]}
        deliverables={[
          {
            title: "Discovery call and written brief",
            body: "Day 1 AM starts with a focused call and a written brief so the build has a clear direction.",
          },
          {
            title: "Custom design",
            body: "Your brand colours, fonts, logo, and business positioning shape the page design.",
          },
          {
            title: "Up to 6 pages",
            body: "Home, About, Services, Pricing, Contact, and one custom page.",
          },
          {
            title: "Contact form with email integration",
            body: "Enquiries are sent to your inbox so the website can start working from day one.",
          },
          {
            title: "Mobile-responsive build",
            body: "The site is built to work properly across mobile, tablet, and desktop screens.",
          },
          {
            title: "Deployment and domain setup assistance",
            body: "We deploy to Vercel or your hosting provider and help connect the domain.",
          },
          {
            title: "30-day post-launch support",
            body: "After launch, we handle reasonable fixes and small adjustments for 30 days.",
          },
        ]}
        animatedVisual={<ThreeDayTimelineVisual />}
        pricing={[
          { label: "Pricing", zar: "Custom quote", gbp: "Custom quote" },
          { label: "Quote timing", zar: "Within 24 hours", gbp: "Within 24 hours" },
          { label: "Typical range", zar: "R8,000-R15,000", gbp: "£340-£620" },
        ]}
        ownershipLine="Pricing varies by scope. Brief first, price within 24 hours."
      />

      <RevealSection className="w3ds-pricing-section">
        <GrainOverlay />
        <div className="w3ds-wrap">
          <div className="w3ds-pricing-card">
            <p className="w3ds-section-label">Pricing</p>
            <h2>Custom quote - brief first, price within 24 hours.</h2>
            <p>
              Pricing varies by scope. Most 3-day builds land between R8,000-R15,000 (ZAR) or £340-£620 (GBP).
            </p>
          </div>
          <Link className="w3ds-pricing-btn" href="/contact">
            Submit your brief
          </Link>
        </div>
      </RevealSection>

      <RevealSection className="w3ds-audience-section">
        <GrainOverlay />
        <div className="w3ds-wrap">
          <div className="w3ds-section-heading">
            <p className="w3ds-section-label">Who it is for</p>
            <h2>For businesses that cannot wait weeks to look credible online.</h2>
          </div>

          <div className="w3ds-audience-grid">
            {WHO_ITS_FOR.map((item) => (
              <motion.article
                className="w3ds-audience-card"
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

      <RevealSection className="w3ds-bottom-cta">
        <GrainOverlay />
        <div className="w3ds-wrap">
          <div className="w3ds-cta-band">
            <div>
              <p className="w3ds-section-label">Ready to talk?</p>
              <h2>Your site could be live by Friday.</h2>
            </div>
            <div className="w3ds-cta-actions">
              <Link className="w3ds-ghost-btn" href="/contact">
                Submit your brief
              </Link>
              <Link className="w3ds-whatsapp-btn" href="https://wa.me/27781790363">
                <MessageCircle size={18} color="#00D4AA" strokeWidth={2} />
                WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </RevealSection>

      <style jsx global>{`
        .w3ds-page,
        .w3ds-page main,
        .w3ds-page section {
          background-color: #0D1B2A !important;
          color: #F5F7FA;
        }

        .w3ds-page > main > .spt-hero,
        .w3ds-page > main > .spt-visual,
        .w3ds-page > main > .spt-section:nth-of-type(5),
        .w3ds-page > main > .spt-cta-strip {
          display: none;
        }

        .w3ds-hero {
          position: relative;
          overflow: hidden;
          min-height: 80vh;
          background-color: #0D1B2A;
          padding: 128px 0 96px;
        }

        .w3ds-hero-grid {
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

        .w3ds-hero-copy {
          min-width: 0;
          max-width: 820px;
        }

        .w3ds-hero-copy h1 {
          max-width: 840px;
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 72px;
          font-weight: 700;
          letter-spacing: -0.022em;
          line-height: 1.05;
        }

        .w3ds-hero-copy p:not(.w3ds-section-label) {
          max-width: 640px;
          margin: 24px 0 0;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 18px;
          letter-spacing: -0.011em;
          line-height: 1.7;
        }

        .w3ds-primary-btn {
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

        .w3ds-primary-btn:hover {
          box-shadow: 0 0 24px rgba(27,119,242,0.4);
          transform: translateY(-1px);
        }

        .w3ds-page .spt-bento-card,
        .w3ds-audience-card,
        .w3ds-cta-band {
          border-radius: 8px !important;
        }

        .w3ds-timeline-wrap {
          width: 100%;
          min-height: 360px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          overflow: hidden;
        }

        .w3ds-timeline-svg {
          display: block;
          width: 100%;
          height: 100%;
          min-height: 360px;
        }

        .w3ds-pricing-section,
        .w3ds-audience-section,
        .w3ds-bottom-cta {
          position: relative;
          overflow: hidden;
          border-top: 1px solid #1E2D3D;
          background-color: #0D1B2A;
          padding-top: 72px;
          padding-bottom: 88px;
        }

        .w3ds-wrap {
          position: relative;
          z-index: 1;
          max-width: 1440px;
          margin: 0 auto;
          padding-left: 32px;
          padding-right: 32px;
        }

        .w3ds-pricing-card {
          width: 100%;
          border: 1px solid #1E2D3D;
          border-radius: 12px;
          background-color: #111F2E;
          padding: 32px;
        }

        .w3ds-pricing-card h2 {
          max-width: 900px;
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 48px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1;
        }

        .w3ds-pricing-card p:not(.w3ds-section-label) {
          max-width: 840px;
          margin: 18px 0 0;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 17px;
          letter-spacing: 0;
          line-height: 1.7;
        }

        .w3ds-pricing-btn {
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

        .w3ds-section-heading {
          max-width: 860px;
          margin-bottom: 34px;
        }

        .w3ds-section-label {
          margin: 0 0 14px;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
          line-height: 1.4;
          text-transform: uppercase;
        }

        .w3ds-section-heading h2,
        .w3ds-cta-band h2 {
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 48px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1;
        }

        .w3ds-audience-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
          gap: 18px;
        }

        .w3ds-audience-card {
          min-width: 0;
          border: 1px solid #1E2D3D;
          background-color: #111F2E;
          padding: 30px;
        }

        .w3ds-audience-card:first-child {
          min-height: 230px;
          background-color: #1C2A3A;
        }

        .w3ds-audience-card:last-child {
          grid-column: 1 / -1;
        }

        .w3ds-audience-card h3 {
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.12;
        }

        .w3ds-audience-card p {
          margin: 16px 0 0;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 16px;
          letter-spacing: 0;
          line-height: 1.7;
        }

        .w3ds-cta-band {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          border: 1px solid #1E2D3D;
          background-color: #111F2E;
          padding: 40px;
        }

        .w3ds-cta-actions {
          display: flex;
          flex: 0 0 auto;
          align-items: center;
          gap: 12px;
        }

        .w3ds-ghost-btn,
        .w3ds-whatsapp-btn {
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

        .w3ds-pricing-btn:hover,
        .w3ds-ghost-btn:hover,
        .w3ds-whatsapp-btn:hover {
          transform: translateY(-2px);
        }

        .w3ds-primary-btn:focus-visible,
        .w3ds-pricing-btn:focus-visible,
        .w3ds-ghost-btn:focus-visible,
        .w3ds-whatsapp-btn:focus-visible {
          outline: 2px solid #00D4AA;
          outline-offset: 3px;
        }

        @media (max-width: 900px) {
          .w3ds-hero {
            min-height: auto;
            padding: 112px 0 56px;
          }

          .w3ds-hero-grid {
            grid-template-columns: 1fr;
            min-height: 0;
            gap: 40px;
          }

          .w3ds-hero-copy h1 {
            font-size: 52px;
          }

          .w3ds-hero-copy p:not(.w3ds-section-label) {
            font-size: 16px;
          }

          .w3ds-timeline-wrap,
          .w3ds-timeline-svg {
            min-height: 360px;
          }

          .w3ds-pricing-section,
          .w3ds-audience-section,
          .w3ds-bottom-cta {
            padding-top: 56px;
            padding-bottom: 64px;
          }

          .w3ds-pricing-card h2,
          .w3ds-section-heading h2,
          .w3ds-cta-band h2 {
            font-size: 36px;
          }

          .w3ds-audience-grid {
            grid-template-columns: 1fr;
          }

          .w3ds-audience-card:last-child {
            grid-column: auto;
          }

          .w3ds-cta-band,
          .w3ds-cta-actions {
            align-items: stretch;
            flex-direction: column;
          }

          .w3ds-cta-band {
            padding: 28px;
          }
        }

        @media (max-width: 560px) {
          .w3ds-hero-grid,
          .w3ds-wrap {
            padding-left: 24px;
            padding-right: 24px;
          }

          .w3ds-hero-copy h1 {
            font-size: 44px;
          }

          .w3ds-timeline-wrap,
          .w3ds-timeline-svg {
            min-height: 300px;
          }

          .w3ds-pricing-card {
            padding: 24px;
          }

          .w3ds-pricing-btn,
          .w3ds-ghost-btn,
          .w3ds-whatsapp-btn {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .w3ds-primary-btn,
          .w3ds-pricing-btn,
          .w3ds-ghost-btn,
          .w3ds-whatsapp-btn,
          .w3ds-audience-card {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
