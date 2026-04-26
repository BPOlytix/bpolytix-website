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
    title: "Startups with a validated idea",
    body: "You know what needs to exist. Now you need the product scoped, built, launched, and handed over.",
  },
  {
    title: "Operations teams stuck in spreadsheets",
    body: "The work has outgrown tabs, manual checks, and copied data. You need one tool built around the process.",
  },
  {
    title: "Businesses that want a client portal",
    body: "Your clients need a clear place to log in, view progress, send information, and get updates.",
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

function AppBentoVisual() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const canAnimate = inView && !reduceMotion;

  return (
    <div ref={ref} className="cwa-visual-wrap" aria-label="Three custom web app wireframe panels">
      <svg className="cwa-visual-svg" viewBox="0 0 760 420" role="img">
        <rect x="1" y="1" width="758" height="418" rx="8" fill="#111F2E" stroke="#1E2D3D" strokeWidth="1" />
        <path d="M48 82 H712 M48 210 H712 M48 338 H712" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
        <path d="M190 42 V378 M380 42 V378 M570 42 V378" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />

        <motion.g
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={reduceMotion || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <rect x="54" y="62" width="300" height="292" rx="10" fill="#0D1B2A" stroke="#1B77F2" strokeWidth="3" />
          <rect x="78" y="92" width="252" height="38" rx="8" fill="#111F2E" stroke="#1E2D3D" strokeWidth="1" />
          <circle cx="101" cy="111" r="7" fill="#00D4AA" stroke="#00D4AA" strokeWidth="1" />
          <text x="122" y="116" fill="#F5F7FA" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="700">
            Client portal
          </text>
          <rect x="78" y="156" width="112" height="70" rx="8" fill="#111F2E" stroke="#1E2D3D" strokeWidth="1" />
          <rect x="206" y="156" width="124" height="70" rx="8" fill="#111F2E" stroke="#1E2D3D" strokeWidth="1" />
          <rect x="78" y="246" width="252" height="78" rx="8" fill="#111F2E" stroke="#1E2D3D" strokeWidth="1" />
          {[0, 1, 2].map((line) => (
            <motion.rect
              key={`portal-line-${line}`}
              x="98"
              y={268 + line * 16}
              width={line === 1 ? "154" : "190"}
              height="6"
              rx="999"
              fill="#1E2D3D"
              initial={false}
              animate={canAnimate ? { opacity: [0.45, 1, 0.45] } : { opacity: 0.8 }}
              transition={{ duration: 2.2, delay: line * 0.15, repeat: canAnimate ? Infinity : 0, ease: "easeInOut" }}
            />
          ))}
        </motion.g>

        <motion.g
          initial={reduceMotion ? false : { opacity: 0, x: 18 }}
          animate={reduceMotion || inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 18 }}
          transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
        >
          <rect x="386" y="62" width="320" height="146" rx="10" fill="#0D1B2A" stroke="#1E2D3D" strokeWidth="2" />
          <text x="414" y="96" fill="#F5F7FA" fontFamily="Syne, sans-serif" fontSize="18" fontWeight="700">
            Internal dashboard
          </text>
          <rect x="414" y="118" width="72" height="54" rx="8" fill="#111F2E" stroke="#1E2D3D" strokeWidth="1" />
          <rect x="506" y="118" width="72" height="54" rx="8" fill="#111F2E" stroke="#1E2D3D" strokeWidth="1" />
          <rect x="598" y="118" width="72" height="54" rx="8" fill="#111F2E" stroke="#1E2D3D" strokeWidth="1" />
          <motion.path
            d="M426 160 C446 136 463 151 478 130 M518 158 C538 122 554 150 570 128 M610 158 C630 140 648 146 662 124"
            fill="none"
            stroke="#00D4AA"
            strokeWidth="3"
            strokeLinecap="round"
            initial={false}
            animate={canAnimate ? { pathLength: [0, 1], opacity: [0, 1] } : { pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.1, delay: canAnimate ? 0.25 : 0, ease: EASE }}
          />
        </motion.g>

        <motion.g
          initial={reduceMotion ? false : { opacity: 0, x: 18 }}
          animate={reduceMotion || inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 18 }}
          transition={{ duration: 0.7, delay: 0.22, ease: EASE }}
        >
          <rect x="386" y="228" width="320" height="126" rx="10" fill="rgba(0,212,170,0.08)" stroke="#00D4AA" strokeWidth="2" />
          <text x="414" y="262" fill="#F5F7FA" fontFamily="Syne, sans-serif" fontSize="18" fontWeight="700">
            SaaS product
          </text>
          <rect x="414" y="282" width="108" height="44" rx="8" fill="#111F2E" stroke="#1E2D3D" strokeWidth="1" />
          <rect x="540" y="282" width="138" height="44" rx="8" fill="#111F2E" stroke="#1E2D3D" strokeWidth="1" />
          <circle cx="438" cy="304" r="7" fill="#00D4AA" stroke="#00D4AA" strokeWidth="1" />
          <path d="M558 304 H648" fill="none" stroke="#00D4AA" strokeWidth="3" strokeLinecap="round" />
          <motion.circle
            r="6"
            fill="#00D4AA"
            stroke="#00D4AA"
            strokeWidth="1"
            initial={false}
            animate={canAnimate ? { cx: [558, 648], cy: [304, 304], opacity: [0, 1, 0] } : { cx: 648, cy: 304, opacity: 1 }}
            transition={{ duration: 2.4, repeat: canAnimate ? Infinity : 0, ease: "easeInOut" }}
          />
        </motion.g>
      </svg>
    </div>
  );
}

export default function CustomWebApplicationPage() {
  return (
    <div className="cwa-page">
      <RevealSection className="cwa-hero">
        <GrainOverlay />
        <div className="cwa-hero-grid">
          <div className="cwa-hero-copy">
            <p className="cwa-section-label">Build</p>
            <h1>The tool your business needs — built to spec.</h1>
            <p>
              We scope, design, and build custom web applications: client portals, internal dashboards, SaaS products,
              and workflow tools.
            </p>
            <Link className="cwa-primary-btn" href="/contact">
              Scope my app
            </Link>
          </div>

          <AppBentoVisual />
        </div>
      </RevealSection>

      <ServicePageTemplate
        pillarLabel="Build"
        serviceName="The tool your business needs — built to spec."
        hookLine="We scope, design, and build custom web applications: client portals, internal dashboards, SaaS products, and workflow tools."
        description={[
          "Off-the-shelf SaaS rarely matches the way your business actually works. You end up changing the process to fit the tool, then paying every month for the compromise.",
          "BPOLytix scopes, designs, builds, deploys, and hands over the web application your business needs.",
          "This is for businesses that need software built, not bought.",
        ]}
        deliverables={[
          {
            title: "Discovery: requirements scoping and architecture plan",
            body: "We define users, screens, data, access rules, integrations, and the build plan before development starts.",
          },
          {
            title: "UI/UX: wireframes and design",
            body: "We create the product flow and interface in Figma or directly in code, depending on the scope.",
          },
          {
            title: "Frontend: Next.js 15 + Tailwind",
            body: "The app interface is built with a modern frontend stack that your team can own and extend.",
          },
          {
            title: "Backend: Supabase or your existing stack",
            body: "Auth, database, and file storage are set up around your data model and access needs.",
          },
          {
            title: "Integrations as scoped",
            body: "Stripe, Resend, and third-party APIs can be connected where the workflow needs them.",
          },
          {
            title: "Deployment and handover",
            body: "We deploy to Vercel or your preferred host, then document what was built.",
          },
          {
            title: "12-month retainer option",
            body: "If the ownership model is selected, we maintain the app for 12 months and you own it at month 13.",
          },
        ]}
        animatedVisual={<AppBentoVisual />}
        pricing={[
          { label: "Pricing", zar: "Custom quote", gbp: "Custom quote" },
          { label: "Typical range", zar: "R25,000-R85,000", gbp: "£1,050-£3,500" },
          { label: "Retainer", zar: "R4,500/month", gbp: "£190/month" },
        ]}
        ownershipLine="12-month minimum if the ownership model is selected."
      />

      <RevealSection className="cwa-pricing-section">
        <GrainOverlay />
        <div className="cwa-wrap">
          <div className="cwa-pricing-card">
            <div>
              <p className="cwa-section-label">Pricing</p>
              <h2>Custom quote after a scoping call.</h2>
              <p>
                Typical range: R25,000-R85,000 (ZAR) or £1,050-£3,500 (GBP), depending on complexity.
              </p>
            </div>
            <div className="cwa-retainer-box">
              <span>Retainer</span>
              <strong>R4,500/month | £190/month</strong>
              <p>12-month minimum if the ownership model is selected.</p>
            </div>
          </div>
          <Link className="cwa-pricing-btn" href="/contact">
            Book a scoping call
          </Link>
        </div>
      </RevealSection>

      <RevealSection className="cwa-audience-section">
        <GrainOverlay />
        <div className="cwa-wrap">
          <div className="cwa-section-heading">
            <p className="cwa-section-label">Who it is for</p>
            <h2>For businesses that need the tool to match the work.</h2>
          </div>

          <div className="cwa-audience-grid">
            {WHO_ITS_FOR.map((item) => (
              <motion.article
                className="cwa-audience-card"
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

      <RevealSection className="cwa-bottom-cta">
        <GrainOverlay />
        <div className="cwa-wrap">
          <div className="cwa-cta-band">
            <div>
              <p className="cwa-section-label">Ready to talk?</p>
              <h2>Describe your tool. We&apos;ll build the plan.</h2>
            </div>
            <div className="cwa-cta-actions">
              <Link className="cwa-ghost-btn" href="/contact">
                Book a scoping call
              </Link>
              <Link className="cwa-whatsapp-btn" href="https://wa.me/27781790363">
                <MessageCircle size={18} color="#00D4AA" strokeWidth={2} />
                WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </RevealSection>

      <style jsx global>{`
        .cwa-page,
        .cwa-page main,
        .cwa-page section {
          background-color: #0D1B2A !important;
          color: #F5F7FA;
        }

        .cwa-page > main > .spt-hero,
        .cwa-page > main > .spt-visual,
        .cwa-page > main > .spt-section:nth-of-type(5),
        .cwa-page > main > .spt-cta-strip {
          display: none;
        }

        .cwa-hero {
          position: relative;
          overflow: hidden;
          min-height: 80vh;
          background-color: #0D1B2A;
          padding: 128px 0 96px;
        }

        .cwa-hero-grid {
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

        .cwa-hero-copy {
          min-width: 0;
          max-width: 820px;
        }

        .cwa-hero-copy h1 {
          max-width: 820px;
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 72px;
          font-weight: 700;
          letter-spacing: -0.022em;
          line-height: 1.05;
        }

        .cwa-hero-copy p:not(.cwa-section-label) {
          max-width: 640px;
          margin: 24px 0 0;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 18px;
          letter-spacing: -0.011em;
          line-height: 1.7;
        }

        .cwa-primary-btn {
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

        .cwa-primary-btn:hover {
          box-shadow: 0 0 24px rgba(27,119,242,0.4);
          transform: translateY(-1px);
        }

        .cwa-page .spt-bento-card,
        .cwa-audience-card,
        .cwa-cta-band {
          border-radius: 8px !important;
        }

        .cwa-visual-wrap {
          width: 100%;
          min-height: 420px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          overflow: hidden;
        }

        .cwa-visual-svg {
          display: block;
          width: 100%;
          height: 100%;
          min-height: 420px;
        }

        .cwa-pricing-section,
        .cwa-audience-section,
        .cwa-bottom-cta {
          position: relative;
          overflow: hidden;
          border-top: 1px solid #1E2D3D;
          background-color: #0D1B2A;
          padding-top: 72px;
          padding-bottom: 88px;
        }

        .cwa-wrap {
          position: relative;
          z-index: 1;
          max-width: 1440px;
          margin: 0 auto;
          padding-left: 32px;
          padding-right: 32px;
        }

        .cwa-pricing-card {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.55fr);
          gap: 32px;
          align-items: start;
          width: 100%;
          border: 1px solid #1E2D3D;
          border-radius: 12px;
          background-color: #111F2E;
          padding: 32px;
        }

        .cwa-pricing-card h2 {
          max-width: 900px;
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 48px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1;
        }

        .cwa-pricing-card p:not(.cwa-section-label),
        .cwa-retainer-box p {
          margin: 18px 0 0;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 16px;
          letter-spacing: 0;
          line-height: 1.7;
        }

        .cwa-retainer-box {
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #1C2A3A;
          padding: 24px;
        }

        .cwa-retainer-box span {
          display: block;
          margin-bottom: 12px;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .cwa-retainer-box strong {
          display: block;
          color: #00D4AA;
          font-family: var(--font-syne);
          font-size: 26px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.12;
        }

        .cwa-pricing-btn {
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

        .cwa-section-heading {
          max-width: 860px;
          margin-bottom: 34px;
        }

        .cwa-section-label {
          margin: 0 0 14px;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
          line-height: 1.4;
          text-transform: uppercase;
        }

        .cwa-section-heading h2,
        .cwa-cta-band h2 {
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 48px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1;
        }

        .cwa-audience-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
          gap: 18px;
        }

        .cwa-audience-card {
          min-width: 0;
          border: 1px solid #1E2D3D;
          background-color: #111F2E;
          padding: 30px;
        }

        .cwa-audience-card:first-child {
          min-height: 230px;
          background-color: #1C2A3A;
        }

        .cwa-audience-card:last-child {
          grid-column: 1 / -1;
        }

        .cwa-audience-card h3 {
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.12;
        }

        .cwa-audience-card p {
          margin: 16px 0 0;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 16px;
          letter-spacing: 0;
          line-height: 1.7;
        }

        .cwa-cta-band {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          border: 1px solid #1E2D3D;
          background-color: #111F2E;
          padding: 40px;
        }

        .cwa-cta-actions {
          display: flex;
          flex: 0 0 auto;
          align-items: center;
          gap: 12px;
        }

        .cwa-ghost-btn,
        .cwa-whatsapp-btn {
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

        .cwa-pricing-btn:hover,
        .cwa-ghost-btn:hover,
        .cwa-whatsapp-btn:hover {
          transform: translateY(-2px);
        }

        .cwa-primary-btn:focus-visible,
        .cwa-pricing-btn:focus-visible,
        .cwa-ghost-btn:focus-visible,
        .cwa-whatsapp-btn:focus-visible {
          outline: 2px solid #00D4AA;
          outline-offset: 3px;
        }

        @media (max-width: 900px) {
          .cwa-hero {
            min-height: auto;
            padding: 112px 0 56px;
          }

          .cwa-hero-grid,
          .cwa-pricing-card {
            grid-template-columns: 1fr;
          }

          .cwa-hero-grid {
            min-height: 0;
            gap: 40px;
          }

          .cwa-hero-copy h1 {
            font-size: 52px;
          }

          .cwa-hero-copy p:not(.cwa-section-label) {
            font-size: 16px;
          }

          .cwa-visual-wrap,
          .cwa-visual-svg {
            min-height: 360px;
          }

          .cwa-pricing-section,
          .cwa-audience-section,
          .cwa-bottom-cta {
            padding-top: 56px;
            padding-bottom: 64px;
          }

          .cwa-pricing-card h2,
          .cwa-section-heading h2,
          .cwa-cta-band h2 {
            font-size: 36px;
          }

          .cwa-audience-grid {
            grid-template-columns: 1fr;
          }

          .cwa-audience-card:last-child {
            grid-column: auto;
          }

          .cwa-cta-band,
          .cwa-cta-actions {
            align-items: stretch;
            flex-direction: column;
          }

          .cwa-cta-band {
            padding: 28px;
          }
        }

        @media (max-width: 560px) {
          .cwa-hero-grid,
          .cwa-wrap {
            padding-left: 24px;
            padding-right: 24px;
          }

          .cwa-hero-copy h1 {
            font-size: 44px;
          }

          .cwa-visual-wrap,
          .cwa-visual-svg {
            min-height: 300px;
          }

          .cwa-pricing-card,
          .cwa-retainer-box {
            padding: 24px;
          }

          .cwa-pricing-btn,
          .cwa-ghost-btn,
          .cwa-whatsapp-btn {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cwa-primary-btn,
          .cwa-pricing-btn,
          .cwa-ghost-btn,
          .cwa-whatsapp-btn,
          .cwa-audience-card {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
