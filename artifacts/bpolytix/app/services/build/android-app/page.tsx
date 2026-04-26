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
    title: "Field service businesses",
    body: "Staff need to log jobs, upload notes, confirm visits, or capture site data from a phone.",
  },
  {
    title: "Startups with a validated app idea",
    body: "You know the problem, audience, and first version. Now the product needs to be built.",
  },
  {
    title: "Businesses with a web app",
    body: "Your platform works in the browser, but users need a faster mobile companion for the field or customer side.",
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

function PhoneAppVisual() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const canAnimate = inView && !reduceMotion;

  const states = [
    { label: "Book", x: 90, y: 288 },
    { label: "Track", x: 186, y: 288 },
    { label: "Done", x: 282, y: 288 },
  ];

  return (
    <div ref={ref} className="android-visual-wrap" aria-label="Android phone frame showing three app screen states">
      <svg className="android-visual-svg" viewBox="0 0 760 430" role="img">
        <rect x="1" y="1" width="758" height="428" rx="8" fill="#111F2E" stroke="#1E2D3D" strokeWidth="1" />
        <path d="M62 72 H698 M62 215 H698 M62 358 H698" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
        <path d="M190 40 V390 M380 40 V390 M570 40 V390" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />

        <motion.g
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={reduceMotion || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <rect x="250" y="38" width="260" height="354" rx="34" fill="#0D1B2A" stroke="#1B77F2" strokeWidth="3" />
          <rect x="268" y="62" width="224" height="306" rx="22" fill="#111F2E" stroke="#1E2D3D" strokeWidth="1" />
          <rect x="342" y="50" width="76" height="8" rx="999" fill="#1E2D3D" stroke="#1E2D3D" strokeWidth="1" />

          <rect x="292" y="92" width="176" height="42" rx="10" fill="#0D1B2A" stroke="#1E2D3D" strokeWidth="1" />
          <circle cx="316" cy="113" r="8" fill="#00D4AA" stroke="#00D4AA" strokeWidth="1" />
          <text x="336" y="118" fill="#F5F7FA" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="700">
            Mobile job log
          </text>

          <rect x="292" y="154" width="176" height="74" rx="10" fill="#0D1B2A" stroke="#1E2D3D" strokeWidth="1" />
          <motion.path
            d="M314 204 C334 176 356 190 374 170 C394 148 418 164 446 146"
            fill="none"
            stroke="#00D4AA"
            strokeWidth="3"
            strokeLinecap="round"
            initial={false}
            animate={canAnimate ? { pathLength: [0, 1], opacity: [0, 1] } : { pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: EASE }}
          />
          <circle cx="318" cy="206" r="5" fill="#00D4AA" stroke="#00D4AA" strokeWidth="1" />
          <circle cx="446" cy="146" r="5" fill="#00D4AA" stroke="#00D4AA" strokeWidth="1" />

          <rect x="292" y="248" width="176" height="72" rx="10" fill="#0D1B2A" stroke="#1E2D3D" strokeWidth="1" />
          {[0, 1, 2].map((row) => (
            <motion.g
              key={`phone-row-${row}`}
              initial={reduceMotion ? false : { opacity: 0, x: -8 }}
              animate={reduceMotion || inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
              transition={{ duration: 0.45, delay: 0.18 + row * 0.08, ease: EASE }}
            >
              <circle cx="314" cy={row * 18 + 270} r="5" fill="#00D4AA" stroke="#00D4AA" strokeWidth="1" />
              <rect x="328" y={row * 18 + 266} width={row === 1 ? "92" : "116"} height="7" rx="999" fill="#1E2D3D" stroke="#1E2D3D" strokeWidth="1" />
            </motion.g>
          ))}

          <rect x="326" y="336" width="108" height="14" rx="999" fill="#1E2D3D" stroke="#1E2D3D" strokeWidth="1" />
        </motion.g>

        {states.map((state, index) => (
          <motion.g
            key={state.label}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={reduceMotion || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.55, delay: 0.18 + index * 0.1, ease: EASE }}
          >
            <rect x={state.x} y={state.y} width="78" height="58" rx="8" fill="#0D1B2A" stroke={index === 2 ? "#00D4AA" : "#1E2D3D"} strokeWidth="2" />
            <text x={state.x + 39} y={state.y + 34} fill={index === 2 ? "#00D4AA" : "#F5F7FA"} fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="700" textAnchor="middle">
              {state.label}
            </text>
          </motion.g>
        ))}

        <motion.path
          d="M168 317 H186 M264 317 H282 M510 215 C560 215 588 256 622 286"
          fill="none"
          stroke="#00D4AA"
          strokeWidth="3"
          strokeLinecap="round"
          initial={false}
          animate={canAnimate ? { pathLength: [0, 1], opacity: [0, 1] } : { pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay: canAnimate ? 0.3 : 0, ease: EASE }}
        />

        <motion.g
          initial={reduceMotion ? false : { opacity: 0, x: 18 }}
          animate={reduceMotion || inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 18 }}
          transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
        >
          <rect x="592" y="282" width="112" height="64" rx="8" fill="rgba(0,212,170,0.08)" stroke="#00D4AA" strokeWidth="2" />
          <text x="648" y="308" fill="#8892A4" fontFamily="DM Sans, sans-serif" fontSize="12" fontWeight="700" textAnchor="middle">
            Google Play
          </text>
          <text x="648" y="330" fill="#00D4AA" fontFamily="Syne, sans-serif" fontSize="18" fontWeight="700" textAnchor="middle">
            live
          </text>
        </motion.g>
      </svg>
    </div>
  );
}

export default function AndroidApplicationPage() {
  return (
    <div className="android-page">
      <RevealSection className="android-hero">
        <GrainOverlay />
        <div className="android-hero-grid">
          <div className="android-hero-copy">
            <p className="android-section-label">Build</p>
            <h1>Your Android app. Built, tested, and live on Google Play.</h1>
            <p>
              We scope and build custom Android applications: customer-facing apps, field service tools, or mobile
              companions to your web platform.
            </p>
            <Link className="android-primary-btn" href="/contact">
              Scope my app
            </Link>
          </div>

          <PhoneAppVisual />
        </div>
      </RevealSection>

      <ServicePageTemplate
        pillarLabel="Build"
        serviceName="Your Android app. Built, tested, and live on Google Play."
        hookLine="We scope and build custom Android applications: customer-facing apps, field service tools, or mobile companions to your web platform."
        description={[
          "Mobile app agencies can be expensive and slow. If you need a practical Android app for customers, staff, or field teams, the first version has to stay focused.",
          "BPOLytix scopes the user flow, builds the app, connects the backend, tests it, and handles the Google Play submission.",
          "This is for SA and UK businesses that need a mobile-first product or customer-facing app.",
        ]}
        deliverables={[
          {
            title: "Product scoping and user flow design",
            body: "We define what the app must do, who uses it, and what each screen needs to handle.",
          },
          {
            title: "Android development",
            body: "React Native build, ready for a future cross-platform path if that becomes part of the scope.",
          },
          {
            title: "UI design consistent with your brand",
            body: "The app interface follows your colours, content style, and customer experience.",
          },
          {
            title: "Backend integration",
            body: "Supabase or your existing API can power auth, records, uploads, and app data.",
          },
          {
            title: "Google Play submission and setup",
            body: "We prepare the release assets, app listing, and submission steps.",
          },
          {
            title: "12-month retainer option",
            body: "If the ownership model is selected, we maintain the app for 12 months and you own it at month 13.",
          },
          {
            title: "iOS option available",
            body: "Ask for a quote if the app also needs an iOS version.",
          },
        ]}
        animatedVisual={<PhoneAppVisual />}
        pricing={[
          { label: "Pricing", zar: "Custom quote", gbp: "Custom quote" },
          { label: "Typical range", zar: "R35,000-R95,000", gbp: "£1,450-£3,900" },
          { label: "Retainer", zar: "R4,500/month", gbp: "£190/month" },
        ]}
        ownershipLine="Retainer applies if the ownership model is selected."
      />

      <RevealSection className="android-pricing-section">
        <GrainOverlay />
        <div className="android-wrap">
          <div className="android-pricing-card">
            <div>
              <p className="android-section-label">Pricing</p>
              <h2>Custom quote after a scoping call.</h2>
              <p>Typical range: R35,000-R95,000 (ZAR) or £1,450-£3,900 (GBP).</p>
            </div>
            <div className="android-retainer-box">
              <span>Retainer</span>
              <strong>R4,500/month | £190/month</strong>
              <p>If the ownership model is selected.</p>
            </div>
          </div>
          <Link className="android-pricing-btn" href="/contact">
            Book a scoping call
          </Link>
        </div>
      </RevealSection>

      <RevealSection className="android-audience-section">
        <GrainOverlay />
        <div className="android-wrap">
          <div className="android-section-heading">
            <p className="android-section-label">Who it is for</p>
            <h2>For teams that need the work in someone&apos;s hand, not only on a desktop.</h2>
          </div>

          <div className="android-audience-grid">
            {WHO_ITS_FOR.map((item) => (
              <motion.article
                className="android-audience-card"
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

      <RevealSection className="android-bottom-cta">
        <GrainOverlay />
        <div className="android-wrap">
          <div className="android-cta-band">
            <div>
              <p className="android-section-label">Ready to talk?</p>
              <h2>What does your app need to do?</h2>
            </div>
            <div className="android-cta-actions">
              <Link className="android-ghost-btn" href="/contact">
                Tell us
              </Link>
              <Link className="android-whatsapp-btn" href="https://wa.me/27781790363">
                <MessageCircle size={18} color="#00D4AA" strokeWidth={2} />
                WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </RevealSection>

      <style jsx global>{`
        .android-page,
        .android-page main,
        .android-page section {
          background-color: #0D1B2A !important;
          color: #F5F7FA;
        }

        .android-page > main > .spt-hero,
        .android-page > main > .spt-visual,
        .android-page > main > .spt-section:nth-of-type(5),
        .android-page > main > .spt-cta-strip {
          display: none;
        }

        .android-hero {
          position: relative;
          overflow: hidden;
          min-height: 80vh;
          background-color: #0D1B2A;
          padding: 128px 0 96px;
        }

        .android-hero-grid {
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

        .android-hero-copy {
          min-width: 0;
          max-width: 820px;
        }

        .android-hero-copy h1 {
          max-width: 850px;
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 72px;
          font-weight: 700;
          letter-spacing: -0.022em;
          line-height: 1.05;
        }

        .android-hero-copy p:not(.android-section-label) {
          max-width: 640px;
          margin: 24px 0 0;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 18px;
          letter-spacing: -0.011em;
          line-height: 1.7;
        }

        .android-primary-btn {
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

        .android-primary-btn:hover {
          box-shadow: 0 0 24px rgba(27,119,242,0.4);
          transform: translateY(-1px);
        }

        .android-page .spt-bento-card,
        .android-audience-card,
        .android-cta-band {
          border-radius: 8px !important;
        }

        .android-visual-wrap {
          width: 100%;
          min-height: 430px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          overflow: hidden;
        }

        .android-visual-svg {
          display: block;
          width: 100%;
          height: 100%;
          min-height: 430px;
        }

        .android-pricing-section,
        .android-audience-section,
        .android-bottom-cta {
          position: relative;
          overflow: hidden;
          border-top: 1px solid #1E2D3D;
          background-color: #0D1B2A;
          padding-top: 72px;
          padding-bottom: 88px;
        }

        .android-wrap {
          position: relative;
          z-index: 1;
          max-width: 1440px;
          margin: 0 auto;
          padding-left: 32px;
          padding-right: 32px;
        }

        .android-pricing-card {
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

        .android-pricing-card h2 {
          max-width: 900px;
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 48px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1;
        }

        .android-pricing-card p:not(.android-section-label),
        .android-retainer-box p {
          margin: 18px 0 0;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 16px;
          letter-spacing: 0;
          line-height: 1.7;
        }

        .android-retainer-box {
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #1C2A3A;
          padding: 24px;
        }

        .android-retainer-box span {
          display: block;
          margin-bottom: 12px;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .android-retainer-box strong {
          display: block;
          color: #00D4AA;
          font-family: var(--font-syne);
          font-size: 26px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.12;
        }

        .android-pricing-btn {
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

        .android-section-heading {
          max-width: 860px;
          margin-bottom: 34px;
        }

        .android-section-label {
          margin: 0 0 14px;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
          line-height: 1.4;
          text-transform: uppercase;
        }

        .android-section-heading h2,
        .android-cta-band h2 {
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 48px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1;
        }

        .android-audience-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
          gap: 18px;
        }

        .android-audience-card {
          min-width: 0;
          border: 1px solid #1E2D3D;
          background-color: #111F2E;
          padding: 30px;
        }

        .android-audience-card:first-child {
          min-height: 230px;
          background-color: #1C2A3A;
        }

        .android-audience-card:last-child {
          grid-column: 1 / -1;
        }

        .android-audience-card h3 {
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.12;
        }

        .android-audience-card p {
          margin: 16px 0 0;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 16px;
          letter-spacing: 0;
          line-height: 1.7;
        }

        .android-cta-band {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          border: 1px solid #1E2D3D;
          background-color: #111F2E;
          padding: 40px;
        }

        .android-cta-actions {
          display: flex;
          flex: 0 0 auto;
          align-items: center;
          gap: 12px;
        }

        .android-ghost-btn,
        .android-whatsapp-btn {
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

        .android-pricing-btn:hover,
        .android-ghost-btn:hover,
        .android-whatsapp-btn:hover {
          transform: translateY(-2px);
        }

        .android-primary-btn:focus-visible,
        .android-pricing-btn:focus-visible,
        .android-ghost-btn:focus-visible,
        .android-whatsapp-btn:focus-visible {
          outline: 2px solid #00D4AA;
          outline-offset: 3px;
        }

        @media (max-width: 900px) {
          .android-hero {
            min-height: auto;
            padding: 112px 0 56px;
          }

          .android-hero-grid,
          .android-pricing-card {
            grid-template-columns: 1fr;
          }

          .android-hero-grid {
            min-height: 0;
            gap: 40px;
          }

          .android-hero-copy h1 {
            font-size: 52px;
          }

          .android-hero-copy p:not(.android-section-label) {
            font-size: 16px;
          }

          .android-visual-wrap,
          .android-visual-svg {
            min-height: 360px;
          }

          .android-pricing-section,
          .android-audience-section,
          .android-bottom-cta {
            padding-top: 56px;
            padding-bottom: 64px;
          }

          .android-pricing-card h2,
          .android-section-heading h2,
          .android-cta-band h2 {
            font-size: 36px;
          }

          .android-audience-grid {
            grid-template-columns: 1fr;
          }

          .android-audience-card:last-child {
            grid-column: auto;
          }

          .android-cta-band,
          .android-cta-actions {
            align-items: stretch;
            flex-direction: column;
          }

          .android-cta-band {
            padding: 28px;
          }
        }

        @media (max-width: 560px) {
          .android-hero-grid,
          .android-wrap {
            padding-left: 24px;
            padding-right: 24px;
          }

          .android-hero-copy h1 {
            font-size: 44px;
          }

          .android-visual-wrap,
          .android-visual-svg {
            min-height: 300px;
          }

          .android-pricing-card,
          .android-retainer-box {
            padding: 24px;
          }

          .android-pricing-btn,
          .android-ghost-btn,
          .android-whatsapp-btn {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .android-primary-btn,
          .android-pricing-btn,
          .android-ghost-btn,
          .android-whatsapp-btn,
          .android-audience-card {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
