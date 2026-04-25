"use client";

import Link from "next/link";
import { Fragment, useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BookCheck,
  Calculator,
  CalendarCheck,
  ChartNoAxesCombined,
  ClipboardList,
  FileCheck2,
  KeyRound,
  LineChart,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { GrainOverlay } from "@/components/GrainOverlay";
import { Nav } from "@/components/Nav";
import { ExpandableCard } from "@/components/ui/ExpandableCard";

type FinanceService = {
  name: string;
  summary: string;
  whatItIs: string;
  whatYouGet: string[];
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

type ComparisonRow = {
  dimension: string;
  inHouse: string;
  traditional: string;
  bpolytix: string;
};

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const SERVICES: FinanceService[] = [
  {
    name: "Outsourced Bookkeeping",
    summary: "Monthly books, closed on time, reconciled and reviewed.",
    href: "/services/finance/bookkeeping",
    whatItIs:
      "A steady monthly finance rhythm for your day-to-day books. We keep records clean, close each month, and give you numbers you can trust.",
    whatYouGet: [
      "Bank and card reconciliations",
      "Monthly close and review",
      "Reports that show what changed",
    ],
  },
  {
    name: "Fractional CFO",
    summary: "One remote CFO with AI-powered dashboards. Real numbers, every week.",
    href: "/services/finance/fractional-cfo",
    whatItIs:
      "Senior finance help without a full-time hire. You get a weekly view of cash, costs, and decisions coming up.",
    whatYouGet: [
      "Weekly finance review",
      "Cash position and forecast",
      "Board-ready reporting pack",
    ],
  },
  {
    name: "Payroll (UK & SA)",
    summary: "Monthly payroll run, payslips out, HMRC/SARS filings handled.",
    href: "/services/finance/payroll",
    whatItIs:
      "Payroll handled across the UK and South Africa, with the monthly run, payslips, and filings kept on schedule.",
    whatYouGet: [
      "Monthly payroll run",
      "Payslips prepared and sent",
      "HMRC and SARS filings tracked",
    ],
  },
  {
    name: "Xero Implementation",
    summary: "Xero set up properly from day one. Custom apps where you need them.",
    href: "/services/finance/xero",
    whatItIs:
      "A clean Xero setup for the way your business works. We set up the accounts, rules, reports, and handover.",
    whatYouGet: [
      "Chart of accounts setup",
      "Bank feeds and rules",
      "Reports your team can use",
    ],
  },
  {
    name: "Compliance-as-a-Service",
    summary: "Company registration, annual returns, POPIA/GDPR - handled monthly.",
    href: "/services/finance/compliance",
    whatItIs:
      "A monthly compliance desk for the filings and checks that keep your business in good standing.",
    whatYouGet: [
      "Company registration support",
      "Annual returns and reminders",
      "POPIA and GDPR checks",
    ],
  },
];

const WORK_STEPS: WorkStep[] = [
  {
    title: "Scope",
    text: "We map your books, payroll dates, filing duties, and reporting needs.",
    icon: ClipboardList,
  },
  {
    title: "Build",
    text: "We set the rhythm, clean the records, and put the finance view in place.",
    icon: Calculator,
  },
  {
    title: "Own",
    text: "You get clear numbers each month, with the records and reports kept in your hands.",
    icon: BadgeCheck,
  },
];

const OFFICE_CLAIMS: ClaimItem[] = [
  {
    text: "Books closed by day 5.",
    icon: BookCheck,
  },
  {
    text: "Payroll filed on time, every month.",
    icon: CalendarCheck,
  },
  {
    text: "Compliance deadlines never missed.",
    icon: FileCheck2,
  },
  {
    text: "Live cashflow you can actually read.",
    icon: ChartNoAxesCombined,
  },
];

const PROOF_LINES: ClaimItem[] = [
  {
    text: "Dual-region UK + SA.",
    icon: MapPin,
  },
  {
    text: "AI dashboards included.",
    icon: LineChart,
  },
  {
    text: "You own the system after 12 months.",
    icon: KeyRound,
  },
];

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    dimension: "Cost",
    inHouse: "£60k+ per year",
    traditional: "Hourly + retainer",
    bpolytix: "Fixed monthly",
  },
  {
    dimension: "Speed",
    inHouse: "Slow",
    traditional: "Monthly cycles",
    bpolytix: "Real-time",
  },
  {
    dimension: "Errors",
    inHouse: "Human-paced",
    traditional: "Caught at month-end",
    bpolytix: "Caught early",
  },
  {
    dimension: "Reporting",
    inHouse: "Delayed",
    traditional: "Static reports",
    bpolytix: "Live dashboard",
  },
  {
    dimension: "Hiring & onboarding",
    inHouse: "You handle it",
    traditional: "Not their job",
    bpolytix: "Built in",
  },
  {
    dimension: "Compliance",
    inHouse: "On you",
    traditional: "On their schedule",
    bpolytix: "Built in",
  },
  {
    dimension: "Ownership",
    inHouse: "You hire, you keep",
    traditional: "They keep, forever",
    bpolytix: "Yours after 12 months",
  },
];

const COMPARISON_PROVIDERS = [
  { name: "In-House Team", valueKey: "inHouse", elevated: false },
  { name: "Traditional BPO", valueKey: "traditional", elevated: false },
  { name: "BPOLytix", valueKey: "bpolytix", elevated: true },
] as const;

function serviceDescription(service: FinanceService) {
  return `What it is\n${service.whatItIs}\n\nWhat you get\n- ${service.whatYouGet.join("\n- ")}`;
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

function FinancePulseVisual() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: false, amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const canAnimate = inView && !reduceMotion;

  return (
    <div ref={ref} className="finance-visual" aria-hidden="true">
      <div className="ledger-panel">
        <div className="ledger-header">
          <span />
          <span />
          <span />
        </div>
        <div className="ledger-rows">
          {[0, 1, 2, 3].map((row) => (
            <motion.span
              key={row}
              animate={
                canAnimate
                  ? { opacity: [0.45, 1, 0.55], x: [0, 8, 0] }
                  : { opacity: 0.6, x: 0 }
              }
              transition={{
                duration: 3.2,
                delay: row * 0.35,
                repeat: canAnimate ? Infinity : 0,
                ease: "easeInOut",
              }}
            >
              <i />
              <b />
            </motion.span>
          ))}
        </div>
      </div>

      <svg className="cashflow-line" viewBox="0 0 420 220" role="presentation">
        <path className="cashflow-grid" d="M20 170 H400 M20 120 H400 M20 70 H400" />
        <motion.path
          className="cashflow-path"
          d="M24 158 C78 142 94 96 142 112 C192 130 200 58 254 76 C308 94 322 42 394 54"
          initial={{ pathLength: 0, opacity: 0.4 }}
          animate={
            canAnimate
              ? { pathLength: [0, 1, 1], opacity: [0.45, 1, 0.7] }
              : { pathLength: 1, opacity: 0.7 }
          }
          transition={{
            duration: 4.8,
            repeat: canAnimate ? Infinity : 0,
            repeatDelay: 1.2,
            ease: "easeInOut",
          }}
        />
        {[58, 150, 256, 360].map((cx, index) => (
          <motion.circle
            key={cx}
            cx={cx}
            cy={[150, 112, 76, 60][index]}
            r="5"
            className="cashflow-dot"
            animate={canAnimate ? { scale: [1, 1.45, 1] } : { scale: 1 }}
            transition={{
              duration: 2.6,
              delay: index * 0.4,
              repeat: canAnimate ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      <motion.div
        className="number-pulse"
        animate={canAnimate ? { opacity: [0.7, 1, 0.7] } : { opacity: 0.75 }}
        transition={{ duration: 3.4, repeat: canAnimate ? Infinity : 0, ease: "easeInOut" }}
      >
        <LineChart size={18} color="#00D4AA" strokeWidth={1.8} />
        <span>Cash position live</span>
      </motion.div>

      <div className="reconcile-panel">
        {["Close day 5", "Payroll filed", "Cash readout"].map((item, index) => (
          <motion.div
            className="reconcile-row"
            key={item}
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
            <BadgeCheck size={16} color="#00D4AA" strokeWidth={1.8} />
            <span>{item}</span>
            <i />
          </motion.div>
        ))}
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

export default function FinanceOfficePage() {
  return (
    <main className="finance-page">
      <Nav />

      <RevealSection className="finance-hero">
        <GrainOverlay />
        <div className="page-wrap hero-grid">
          <div className="hero-copy">
            <p className="section-label">Finance Office</p>
            <h1>Your books, your payroll, your compliance — handled.</h1>
            <p className="pillar-tagline">A finance office that keeps the numbers moving.</p>
            <p className="hero-intro">
              One finance team behind your business. We run the numbers, keep you compliant,
              and give you a live view of your cash position — so you stop guessing and start
              deciding. Dual-region: UK and South Africa.
            </p>
            <Link className="primary-cta" href="/contact">
              Talk to us
              <ArrowRight size={18} strokeWidth={2} />
            </Link>
          </div>

          <FinancePulseVisual />
        </div>
      </RevealSection>

      <RevealSection className="office-strip-section">
        <GrainOverlay />
        <div className="page-wrap office-strip">
          <div className="strip-heading">
            <p className="section-label">What a Finance Office actually does for you</p>
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
            <p className="section-label">Finance services</p>
            <h2>Pick the finance support your business needs.</h2>
          </div>

          <div className="services-grid">
            {SERVICES.map((service, index) => (
              <ExpandableCard
                key={service.name}
                className={`finance-service-card card-${index + 1}`}
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

      <RevealSection className="comparison-section">
        <GrainOverlay />
        <div className="page-wrap">
          <div className="section-heading comparison-heading">
            <h2>How BPOLytix compares.</h2>
          </div>

          <div className="comparison-desktop" aria-label="Finance office comparison">
            <div className="comparison-cell comparison-label-cell comparison-header-cell" />
            <div className="comparison-cell comparison-provider-cell comparison-header-cell">
              In-House Team
            </div>
            <div className="comparison-cell comparison-provider-cell comparison-header-cell">
              Traditional BPO
            </div>
            <div className="comparison-cell comparison-provider-cell comparison-header-cell comparison-bpolytix comparison-bpolytix-top">
              BPOLytix
            </div>

            {COMPARISON_ROWS.map((row) => (
              <Fragment key={row.dimension}>
                <div className="comparison-cell comparison-label-cell">
                  {row.dimension}
                </div>
                <div className="comparison-cell comparison-provider-cell">
                  {row.inHouse}
                </div>
                <div className="comparison-cell comparison-provider-cell">
                  {row.traditional}
                </div>
                <div className="comparison-cell comparison-provider-cell comparison-bpolytix">
                  {row.bpolytix}
                </div>
              </Fragment>
            ))}
          </div>

          <div className="comparison-mobile" aria-label="Finance office comparison">
            {COMPARISON_PROVIDERS.map((provider) => (
              <div
                className={`comparison-card${provider.elevated ? " comparison-card-elevated" : ""}`}
                key={provider.name}
              >
                <h3>{provider.name}</h3>
                <div className="comparison-card-rows">
                  {COMPARISON_ROWS.map((row) => (
                    <div className="comparison-card-row" key={`${provider.name}-${row.dimension}`}>
                      <span>{row.dimension}</span>
                      <b>{row[provider.valueKey]}</b>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="proof-strip-section">
        <GrainOverlay />
        <div className="page-wrap proof-strip">
          <div className="strip-heading">
            <p className="section-label">Why businesses move their finance office to us</p>
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
              <h2>Talk to us about your Finance Office.</h2>
            </div>
            <Link className="primary-cta" href="/contact">
              Talk to us about your Finance Office
              <ArrowRight size={18} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </RevealSection>

      <Footer />

      <style jsx global>{`
        .finance-page {
          min-height: 100vh;
          background-color: #0D1B2A;
          color: #F5F7FA;
        }

        .finance-page section {
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

        .finance-hero {
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

        .pillar-tagline {
          margin: 24px 0 0;
          color: #00D4AA;
          font-family: var(--font-dm-sans);
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.45;
        }

        .hero-intro {
          max-width: 680px;
          margin: 18px 0 0;
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
        .finance-service-card button:focus-visible {
          outline: 2px solid #00D4AA;
          outline-offset: 3px;
        }

        .finance-visual {
          position: relative;
          min-height: 560px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          overflow: hidden;
        }

        .ledger-panel {
          position: absolute;
          top: 42px;
          left: 38px;
          width: 58%;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #1C2A3A;
          padding: 18px;
        }

        .ledger-header {
          display: grid;
          grid-template-columns: 0.9fr 0.58fr 0.4fr;
          gap: 10px;
          margin-bottom: 18px;
        }

        .ledger-header span,
        .ledger-rows i,
        .ledger-rows b {
          display: block;
          height: 8px;
          border-radius: 9999px;
          background-color: #1E2D3D;
        }

        .ledger-rows {
          display: grid;
          gap: 14px;
        }

        .ledger-rows span {
          display: grid;
          grid-template-columns: 1fr 0.34fr;
          gap: 14px;
          align-items: center;
        }

        .ledger-rows span:nth-child(2) b,
        .ledger-rows span:nth-child(4) b {
          background-color: #00D4AA;
        }

        .cashflow-line {
          position: absolute;
          right: -10px;
          bottom: 120px;
          width: 82%;
          height: auto;
        }

        .cashflow-grid {
          fill: none;
          stroke: #1E2D3D;
          stroke-width: 1;
        }

        .cashflow-path {
          fill: none;
          stroke: #00D4AA;
          stroke-linecap: round;
          stroke-width: 4;
        }

        .cashflow-dot {
          fill: #1B77F2;
          transform-box: fill-box;
          transform-origin: center;
        }

        .number-pulse {
          position: absolute;
          right: 28px;
          top: 34px;
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

        .reconcile-panel {
          position: absolute;
          right: 28px;
          bottom: 28px;
          left: 28px;
          display: grid;
          gap: 10px;
        }

        .reconcile-row {
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

        .reconcile-row i {
          display: block;
          height: 7px;
          border-radius: 9999px;
          background-color: #1E2D3D;
        }

        .services-section,
        .office-strip-section,
        .proof-strip-section,
        .comparison-section,
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

        .comparison-heading {
          margin-bottom: 28px;
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

        .comparison-desktop {
          display: grid;
          grid-template-columns: minmax(132px, 0.58fr) repeat(3, minmax(0, 1fr));
          align-items: stretch;
          overflow: hidden;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
        }

        .comparison-mobile {
          display: none;
        }

        .comparison-cell {
          display: flex;
          min-height: 62px;
          align-items: center;
          border-bottom: 1px solid rgba(30, 45, 61, 0.4);
          font-family: var(--font-dm-sans);
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.35;
          padding: 16px 18px;
        }

        .comparison-cell:nth-last-child(-n + 4) {
          border-bottom: 0;
        }

        .comparison-header-cell {
          min-height: 68px;
        }

        .comparison-label-cell {
          justify-content: flex-start;
          color: #8892A4;
        }

        .comparison-provider-cell {
          position: relative;
          justify-content: center;
          background-color: #111F2E;
          color: #8892A4;
          text-align: center;
        }

        .comparison-header-cell.comparison-provider-cell {
          color: #8892A4;
        }

        .comparison-bpolytix {
          color: #F5F7FA;
        }

        .comparison-bpolytix-top {
          overflow: hidden;
          color: #F5F7FA;
          font-weight: 800;
        }

        .comparison-bpolytix-top::before {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          height: 64px;
          background: linear-gradient(
            180deg,
            rgba(0, 212, 170, 0.18) 0%,
            rgba(0, 212, 170, 0) 100%
          );
          pointer-events: none;
        }

        .comparison-bpolytix-top::after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          height: 2px;
          background-color: #00D4AA;
          pointer-events: none;
        }

        .services-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
          gap: 18px;
          align-items: start;
        }

        .finance-service-card {
          min-width: 0;
        }

        .finance-service-card.card-5 {
          grid-column: 1 / -1;
          max-width: 720px;
        }

        .finance-service-card p {
          letter-spacing: 0 !important;
        }

        .finance-service-card button p:last-child {
          white-space: normal !important;
        }

        .finance-service-card div[style*="padding-top: 20px"] > p:first-child {
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

          .finance-visual {
            min-height: 430px;
          }

          .work-steps {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 860px) {
          .finance-hero,
          .office-strip-section,
          .services-section,
          .proof-strip-section,
          .comparison-section,
          .work-section,
          .final-cta-section {
            padding-top: 48px;
            padding-bottom: 56px;
          }

          .finance-hero {
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

          .finance-service-card.card-5 {
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

        @media (max-width: 767px) {
          .comparison-desktop {
            display: none;
          }

          .comparison-mobile {
            display: grid;
            gap: 16px;
          }

          .comparison-card {
            position: relative;
            overflow: hidden;
            border: 1px solid #1E2D3D;
            border-radius: 8px;
            background-color: #111F2E;
            padding: 22px;
          }

          .comparison-card h3 {
            margin: 0 0 18px;
            color: #8892A4;
            font-family: var(--font-syne);
            font-size: 22px;
            font-weight: 700;
            letter-spacing: 0;
            line-height: 1.1;
          }

          .comparison-card-elevated {
            border-color: #1E2D3D;
          }

          .comparison-card-elevated::before {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            height: 72px;
            background: linear-gradient(
              180deg,
              rgba(0, 212, 170, 0.18) 0%,
              rgba(0, 212, 170, 0) 100%
            );
            pointer-events: none;
          }

          .comparison-card-elevated::after {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            height: 2px;
            background-color: #00D4AA;
            pointer-events: none;
          }

          .comparison-card-elevated h3 {
            color: #F5F7FA;
            font-weight: 800;
          }

          .comparison-card-rows {
            display: grid;
          }

          .comparison-card-row {
            display: grid;
            grid-template-columns: minmax(0, 0.9fr) minmax(0, 1fr);
            min-height: 48px;
            align-items: center;
            gap: 16px;
            border-top: 1px solid rgba(30, 45, 61, 0.4);
            font-family: var(--font-dm-sans);
            font-size: 15px;
            letter-spacing: 0;
            line-height: 1.35;
          }

          .comparison-card-row span {
            color: #8892A4;
            font-weight: 700;
          }

          .comparison-card-row b {
            color: #F5F7FA;
            font-weight: 700;
            text-align: right;
          }
        }

        @media (max-width: 560px) {
          .finance-hero {
            padding-top: 104px;
            padding-bottom: 44px;
          }

          .hero-copy h1 {
            font-size: 44px;
          }

          .hero-intro {
            font-size: 16px;
          }

          .finance-visual {
            min-height: 380px;
          }

          .ledger-panel {
            top: 24px;
            left: 18px;
            width: 70%;
            padding: 14px;
          }

          .cashflow-line {
            right: -50px;
            bottom: 92px;
            width: 112%;
          }

          .number-pulse {
            right: 16px;
            top: 18px;
          }

          .reconcile-panel {
            right: 16px;
            bottom: 16px;
            left: 16px;
          }

          .reconcile-row {
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
          .finance-service-card,
          .work-step {
            transition: none;
          }
        }
      `}</style>
    </main>
  );
}
