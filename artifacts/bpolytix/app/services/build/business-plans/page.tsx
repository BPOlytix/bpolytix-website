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
    title: "SA founders applying for funding",
    body: "You need a plan and model shaped for SEDA, IDC, SEFA, or NEF funding conversations.",
  },
  {
    title: "UK SMEs raising money",
    body: "You need a fundable pack for Innovate UK grants or angel investor discussions.",
  },
  {
    title: "Early-stage businesses formalising the model",
    body: "You need the numbers, story, market, and funding ask clear before approaching investors.",
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

function FundingPlanVisual() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const canAnimate = inView && !reduceMotion;

  const sections = ["Executive summary", "Market analysis", "Revenue model", "Operations", "Funding ask"];
  const bars = [
    { x: 502, y: 242, height: 46 },
    { x: 570, y: 206, height: 82 },
    { x: 638, y: 166, height: 122 },
  ];

  return (
    <div ref={ref} className="bp-visual-wrap" aria-label="Business plan document and financial model preview">
      <svg className="bp-visual-svg" viewBox="0 0 760 400" role="img">
        <rect x="1" y="1" width="758" height="398" rx="8" fill="#111F2E" stroke="#1E2D3D" strokeWidth="1" />
        <path d="M48 78 H712 M48 200 H712 M48 322 H712" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
        <path d="M190 42 V358 M380 42 V358 M570 42 V358" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />

        <motion.g
          initial={reduceMotion ? false : { opacity: 0, x: -18 }}
          animate={reduceMotion || inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -18 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <rect x="58" y="52" width="304" height="296" rx="10" fill="#0D1B2A" stroke="#1B77F2" strokeWidth="3" />
          <text x="90" y="94" fill="#F5F7FA" fontFamily="Syne, sans-serif" fontSize="22" fontWeight="700">
            Business plan
          </text>
          <rect x="90" y="116" width="198" height="8" rx="999" fill="#1E2D3D" stroke="#1E2D3D" strokeWidth="1" />
          <rect x="90" y="136" width="238" height="8" rx="999" fill="#1E2D3D" stroke="#1E2D3D" strokeWidth="1" />

          {sections.map((section, index) => (
            <motion.g
              key={section}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={reduceMotion || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.45, delay: 0.14 + index * 0.07, ease: EASE }}
            >
              <rect x="90" y={172 + index * 31} width="238" height="22" rx="6" fill="#111F2E" stroke="#1E2D3D" strokeWidth="1" />
              <circle cx="106" cy={183 + index * 31} r="4" fill="#00D4AA" stroke="#00D4AA" strokeWidth="1" />
              <text x="120" y={188 + index * 31} fill="#F5F7FA" fontFamily="DM Sans, sans-serif" fontSize="12" fontWeight="700">
                {section}
              </text>
            </motion.g>
          ))}
        </motion.g>

        <motion.g
          initial={reduceMotion ? false : { opacity: 0, x: 18 }}
          animate={reduceMotion || inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 18 }}
          transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
        >
          <rect x="400" y="72" width="302" height="256" rx="10" fill="#0D1B2A" stroke="#1E2D3D" strokeWidth="2" />
          <text x="432" y="114" fill="#F5F7FA" fontFamily="Syne, sans-serif" fontSize="22" fontWeight="700">
            Financial model
          </text>
          <text x="432" y="142" fill="#8892A4" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="700">
            3-year view
          </text>
          <path d="M452 288 H674 M452 156 V288" fill="none" stroke="#1E2D3D" strokeWidth="2" strokeLinecap="round" />

          {bars.map((bar, index) => (
            <motion.rect
              key={bar.x}
              x={bar.x}
              y={bar.y}
              width="34"
              height={bar.height}
              rx="6"
              fill={index === 2 ? "#00D4AA" : "#1B77F2"}
              stroke={index === 2 ? "#00D4AA" : "#1B77F2"}
              strokeWidth="1"
              initial={false}
              animate={canAnimate ? { height: [0, bar.height], y: [288, bar.y], opacity: [0, 1] } : { height: bar.height, y: bar.y, opacity: 1 }}
              transition={{ duration: 0.8, delay: canAnimate ? 0.22 + index * 0.14 : 0, ease: EASE }}
            />
          ))}

          <text x="510" y="310" fill="#8892A4" fontFamily="DM Sans, sans-serif" fontSize="12" fontWeight="700" textAnchor="middle">
            Y1
          </text>
          <text x="578" y="310" fill="#8892A4" fontFamily="DM Sans, sans-serif" fontSize="12" fontWeight="700" textAnchor="middle">
            Y2
          </text>
          <text x="646" y="310" fill="#8892A4" fontFamily="DM Sans, sans-serif" fontSize="12" fontWeight="700" textAnchor="middle">
            Y3
          </text>
        </motion.g>

        <motion.path
          d="M362 200 H400"
          fill="none"
          stroke="#00D4AA"
          strokeWidth="3"
          strokeLinecap="round"
          initial={false}
          animate={canAnimate ? { pathLength: [0, 1], opacity: [0, 1] } : { pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: canAnimate ? 0.45 : 0, ease: EASE }}
        />
      </svg>
    </div>
  );
}

export default function BusinessPlansPage() {
  return (
    <div className="bp-page">
      <RevealSection className="bp-hero">
        <GrainOverlay />
        <div className="bp-hero-grid">
          <div className="bp-hero-copy">
            <p className="bp-section-label">Build</p>
            <h1>A business plan that gets read. And funded.</h1>
            <p>
              We write investor-ready business plans with integrated 3-year financial models — built for SA funding
              bodies and UK investors.
            </p>
            <Link className="bp-primary-btn" href="/contact">
              Brief my business plan
            </Link>
          </div>

          <FundingPlanVisual />
        </div>
      </RevealSection>

      <ServicePageTemplate
        pillarLabel="Build"
        serviceName="A business plan that gets read. And funded."
        hookLine="We write investor-ready business plans with integrated 3-year financial models — built for SA funding bodies and UK investors."
        description={[
          "Most founders can explain the idea, but struggle to turn it into a fundable plan with credible numbers.",
          "BPOLytix writes the business plan, builds the 3-year financial model, and shapes the funding ask for the audience you are approaching.",
          "This is for SA startups applying for SEDA, IDC, SEFA, or NEF funding, and UK SMEs seeking angel or grant funding.",
        ]}
        deliverables={[
          {
            title: "Executive summary",
            body: "A clear opening section that explains the business, the opportunity, and the funding need.",
          },
          {
            title: "Market analysis",
            body: "SA or UK context, using real data and a plain-English view of the market.",
          },
          {
            title: "Business model and revenue streams",
            body: "How the business earns money, who pays, and what drives growth.",
          },
          {
            title: "Operations and team section",
            body: "The people, process, capacity, and delivery model behind the plan.",
          },
          {
            title: "3-year financial model",
            body: "P&L, cashflow, and balance sheet shaped around the funding case.",
          },
          {
            title: "Funding ask and use of funds",
            body: "A clear funding amount, allocation, and reason for each major use.",
          },
          {
            title: "Funding format guidance",
            body: "SEDA, IDC, and SEFA application guidance for SA. Innovate UK and angel investor format guidance for the UK.",
          },
          {
            title: "Pitch deck version",
            body: "Optional add-on if you also need the plan converted into a presentation.",
          },
        ]}
        animatedVisual={<FundingPlanVisual />}
        pricing={[
          { label: "SA plan", zar: "R8,500", gbp: "-" },
          { label: "UK plan", zar: "-", gbp: "£350" },
          { label: "SA + UK dual format", zar: "R12,000", gbp: "£500" },
          { label: "Add-on pitch deck", zar: "R3,500", gbp: "£145" },
        ]}
        ownershipLine="Add-on pitch deck available if you need a presentation version."
      />

      <RevealSection className="bp-pricing-section">
        <GrainOverlay />
        <div className="bp-wrap">
          <div className="bp-pricing-card">
            <div className="bp-pricing-row bp-pricing-head">
              <span>Service</span>
              <span>ZAR</span>
              <span>GBP</span>
            </div>
            <div className="bp-pricing-row">
              <span>SA plan</span>
              <strong className="bp-price-zar">R8,500</strong>
              <strong className="bp-price-gbp">-</strong>
            </div>
            <div className="bp-pricing-row">
              <span>UK plan</span>
              <strong className="bp-price-zar">-</strong>
              <strong className="bp-price-gbp">£350</strong>
            </div>
            <div className="bp-pricing-row">
              <span>SA + UK dual format</span>
              <strong className="bp-price-zar">R12,000</strong>
              <strong className="bp-price-gbp">£500</strong>
            </div>
            <div className="bp-pricing-row bp-addon-row">
              <span>Add-on pitch deck</span>
              <strong>R3,500</strong>
              <strong>£145</strong>
            </div>
          </div>
          <Link className="bp-pricing-btn" href="/contact">
            Brief my business plan
          </Link>
        </div>
      </RevealSection>

      <RevealSection className="bp-audience-section">
        <GrainOverlay />
        <div className="bp-wrap">
          <div className="bp-section-heading">
            <p className="bp-section-label">Who it is for</p>
            <h2>For founders who need the plan to survive real funding questions.</h2>
          </div>

          <div className="bp-audience-grid">
            {WHO_ITS_FOR.map((item) => (
              <motion.article
                className="bp-audience-card"
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

      <RevealSection className="bp-bottom-cta">
        <GrainOverlay />
        <div className="bp-wrap">
          <div className="bp-cta-band">
            <div>
              <p className="bp-section-label">Ready to talk?</p>
              <h2>Your idea, made fundable.</h2>
            </div>
            <div className="bp-cta-actions">
              <Link className="bp-ghost-btn" href="/contact">
                Start the brief
              </Link>
              <Link className="bp-whatsapp-btn" href="https://wa.me/27781790363">
                <MessageCircle size={18} color="#00D4AA" strokeWidth={2} />
                WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </RevealSection>

      <style jsx global>{`
        .bp-page,
        .bp-page main,
        .bp-page section {
          background-color: #0D1B2A !important;
          color: #F5F7FA;
        }

        .bp-page > main > .spt-hero,
        .bp-page > main > .spt-visual,
        .bp-page > main > .spt-section:nth-of-type(5),
        .bp-page > main > .spt-cta-strip {
          display: none;
        }

        .bp-hero {
          position: relative;
          overflow: hidden;
          min-height: 80vh;
          background-color: #0D1B2A;
          padding: 128px 0 96px;
        }

        .bp-hero-grid {
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

        .bp-hero-copy {
          min-width: 0;
          max-width: 820px;
        }

        .bp-hero-copy h1 {
          max-width: 820px;
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 72px;
          font-weight: 700;
          letter-spacing: -0.022em;
          line-height: 1.05;
        }

        .bp-hero-copy p:not(.bp-section-label) {
          max-width: 640px;
          margin: 24px 0 0;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 18px;
          letter-spacing: -0.011em;
          line-height: 1.7;
        }

        .bp-primary-btn {
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

        .bp-primary-btn:hover {
          box-shadow: 0 0 24px rgba(27,119,242,0.4);
          transform: translateY(-1px);
        }

        .bp-page .spt-bento-card,
        .bp-audience-card,
        .bp-cta-band {
          border-radius: 8px !important;
        }

        .bp-visual-wrap {
          width: 100%;
          min-height: 400px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          overflow: hidden;
        }

        .bp-visual-svg {
          display: block;
          width: 100%;
          height: 100%;
          min-height: 400px;
        }

        .bp-pricing-section,
        .bp-audience-section,
        .bp-bottom-cta {
          position: relative;
          overflow: hidden;
          border-top: 1px solid #1E2D3D;
          background-color: #0D1B2A;
          padding-top: 72px;
          padding-bottom: 88px;
        }

        .bp-wrap {
          position: relative;
          z-index: 1;
          max-width: 1440px;
          margin: 0 auto;
          padding-left: 32px;
          padding-right: 32px;
        }

        .bp-pricing-card {
          width: 100%;
          border: 1px solid #1E2D3D;
          border-radius: 12px;
          background-color: #111F2E;
          padding: 32px;
        }

        .bp-pricing-row {
          display: grid;
          grid-template-columns: minmax(0, 1.25fr) minmax(160px, 0.55fr) minmax(160px, 0.55fr);
          gap: 24px;
          align-items: center;
          border-bottom: 1px solid #1E2D3D;
          padding: 18px 0;
        }

        .bp-pricing-row:first-child {
          padding-top: 0;
        }

        .bp-pricing-head span,
        .bp-section-label {
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
          line-height: 1.4;
          text-transform: uppercase;
        }

        .bp-section-label {
          margin: 0 0 14px;
        }

        .bp-pricing-row span,
        .bp-pricing-row strong {
          font-family: var(--font-dm-sans);
          letter-spacing: 0;
        }

        .bp-pricing-row span {
          color: #F5F7FA;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.4;
        }

        .bp-pricing-row strong {
          color: #F5F7FA;
          font-size: 17px;
          font-weight: 700;
          line-height: 1.35;
        }

        .bp-price-zar {
          color: #00D4AA !important;
        }

        .bp-price-gbp {
          color: #8892A4 !important;
        }

        .bp-addon-row span,
        .bp-addon-row strong {
          color: #F5F7FA;
        }

        .bp-pricing-btn {
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

        .bp-section-heading {
          max-width: 860px;
          margin-bottom: 34px;
        }

        .bp-section-heading h2,
        .bp-cta-band h2 {
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 48px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1;
        }

        .bp-audience-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
          gap: 18px;
        }

        .bp-audience-card {
          min-width: 0;
          border: 1px solid #1E2D3D;
          background-color: #111F2E;
          padding: 30px;
        }

        .bp-audience-card:first-child {
          min-height: 230px;
          background-color: #1C2A3A;
        }

        .bp-audience-card:last-child {
          grid-column: 1 / -1;
        }

        .bp-audience-card h3 {
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.12;
        }

        .bp-audience-card p {
          margin: 16px 0 0;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 16px;
          letter-spacing: 0;
          line-height: 1.7;
        }

        .bp-cta-band {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          border: 1px solid #1E2D3D;
          background-color: #111F2E;
          padding: 40px;
        }

        .bp-cta-actions {
          display: flex;
          flex: 0 0 auto;
          align-items: center;
          gap: 12px;
        }

        .bp-ghost-btn,
        .bp-whatsapp-btn {
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

        .bp-pricing-btn:hover,
        .bp-ghost-btn:hover,
        .bp-whatsapp-btn:hover {
          transform: translateY(-2px);
        }

        .bp-primary-btn:focus-visible,
        .bp-pricing-btn:focus-visible,
        .bp-ghost-btn:focus-visible,
        .bp-whatsapp-btn:focus-visible {
          outline: 2px solid #00D4AA;
          outline-offset: 3px;
        }

        @media (max-width: 900px) {
          .bp-hero {
            min-height: auto;
            padding: 112px 0 56px;
          }

          .bp-hero-grid {
            grid-template-columns: 1fr;
            min-height: 0;
            gap: 40px;
          }

          .bp-hero-copy h1 {
            font-size: 52px;
          }

          .bp-hero-copy p:not(.bp-section-label) {
            font-size: 16px;
          }

          .bp-visual-wrap,
          .bp-visual-svg {
            min-height: 360px;
          }

          .bp-pricing-section,
          .bp-audience-section,
          .bp-bottom-cta {
            padding-top: 56px;
            padding-bottom: 64px;
          }

          .bp-audience-grid {
            grid-template-columns: 1fr;
          }

          .bp-audience-card:last-child {
            grid-column: auto;
          }

          .bp-section-heading h2,
          .bp-cta-band h2 {
            font-size: 36px;
          }

          .bp-pricing-row {
            grid-template-columns: minmax(0, 1fr) minmax(120px, 0.55fr) minmax(120px, 0.55fr);
            gap: 16px;
          }

          .bp-cta-band,
          .bp-cta-actions {
            align-items: stretch;
            flex-direction: column;
          }

          .bp-cta-band {
            padding: 28px;
          }
        }

        @media (max-width: 560px) {
          .bp-hero-grid,
          .bp-wrap {
            padding-left: 24px;
            padding-right: 24px;
          }

          .bp-hero-copy h1 {
            font-size: 44px;
          }

          .bp-visual-wrap,
          .bp-visual-svg {
            min-height: 300px;
          }

          .bp-pricing-card {
            padding: 24px;
          }

          .bp-pricing-row {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .bp-pricing-head {
            display: none;
          }

          .bp-pricing-btn,
          .bp-ghost-btn,
          .bp-whatsapp-btn {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .bp-primary-btn,
          .bp-pricing-btn,
          .bp-ghost-btn,
          .bp-whatsapp-btn,
          .bp-audience-card {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
