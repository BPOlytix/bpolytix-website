"use client";

import { useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart2,
  BookOpen,
  Bot,
  Briefcase,
  ChevronDown,
  Code,
  FileText,
  Globe,
  Lock,
  Megaphone,
  Phone,
  Settings,
  Shield,
  Smartphone,
  TrendingUp,
  UserCheck,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { GrainOverlay } from "@/components/GrainOverlay";

type PriceLine = {
  label: string;
  zar: string;
  gbp: string;
};

type Service = {
  id: string;
  name: string;
  description: string;
  prices: PriceLine[];
  ownedAfterTwelveMonths?: boolean;
};

type Pillar = {
  id: string;
  label: string;
  intro: string;
  services: Service[];
};

const EASE = [0.25, 0.46, 0.45, 0.94] as const;
const NOT_QUOTED = "Not quoted";

const SERVICE_ICONS: Record<string, LucideIcon> = {
  "bookkeeping": BookOpen,
  "fractional-cfo": TrendingUp,
  "payroll": Users,
  "xero": BarChart2,
  "compliance-sa": Shield,
  "compliance-uk": Shield,
  "ai-workflow-automation": Zap,
  "ai-agent-build-deploy": Bot,
  "ai-operations-service": Settings,
  "ai-receptionist": Phone,
  "ai-marketing-ops": Megaphone,
  "employer-of-record": Globe,
  "outsourced-hr": UserCheck,
  "onboarding-policy-automation": FileText,
  "custom-web-app": Code,
  "android-app": Smartphone,
  "website-in-3-days": Globe,
  "business-plans": BookOpen,
  "business-development": Briefcase,
};

const PILLARS: Pillar[] = [
  {
    id: "finance",
    label: "Finance",
    intro: "Clear monthly finance help, from records to board-level planning.",
    services: [
      {
        id: "bookkeeping",
        name: "Bookkeeping",
        description: "Monthly records kept clean, checked, and ready to use.",
        prices: [
          { label: "Starter", zar: "R1,500/month", gbp: "£105/month" },
          { label: "Growth", zar: "R2,700/month", gbp: "£190/month" },
          { label: "Full", zar: "R4,500/month", gbp: "£310/month" },
        ],
      },
      {
        id: "fractional-cfo",
        name: "Fractional CFO",
        description: "Senior finance help for planning, cash, and big calls.",
        prices: [
          { label: "Advisory", zar: "R3,900/month", gbp: "£275/month" },
          { label: "Strategic", zar: "R7,500/month", gbp: "£520/month" },
          { label: "Full", zar: "R13,200/month", gbp: "£930/month" },
        ],
      },
      {
        id: "payroll",
        name: "Payroll",
        description: "Payslips, payroll checks, and employee changes handled each month.",
        prices: [
          { label: "Per employee", zar: "R210 per employee/month", gbp: "£15 per employee/month" },
          { label: "Minimum", zar: "R720 minimum", gbp: "£50 minimum" },
          { label: "Setup", zar: "R510 setup once-off", gbp: "£40 setup once-off" },
        ],
      },
      {
        id: "xero",
        name: "Xero",
        description: "Setup, clean-up, reports, and support for your Xero accounts.",
        prices: [
          { label: "Basic", zar: "R2,100", gbp: "£150" },
          { label: "Full", zar: "R4,500", gbp: "£330" },
          { label: "Custom", zar: "R9,000+", gbp: "£660+" },
          { label: "Retainer", zar: "R1,080/month", gbp: "£75/month" },
        ],
      },
      {
        id: "compliance-sa",
        name: "Compliance SA",
        description: "Company admin and required filings for South African businesses.",
        prices: [
          { label: "Retainer", zar: "R1,800/month retainer", gbp: NOT_QUOTED },
          { label: "Company registration", zar: "R850 company registration", gbp: NOT_QUOTED },
          { label: "CIPC annual return", zar: "R350 CIPC annual return", gbp: NOT_QUOTED },
          { label: "POPIA setup", zar: "R3,500 POPIA setup", gbp: NOT_QUOTED },
          { label: "Registered address", zar: "R350/month registered address", gbp: NOT_QUOTED },
        ],
      },
      {
        id: "compliance-uk",
        name: "Compliance UK",
        description: "Company admin and required filings for UK businesses.",
        prices: [
          { label: "Retainer", zar: NOT_QUOTED, gbp: "£175/month retainer" },
          { label: "Incorporation", zar: NOT_QUOTED, gbp: "£150 incorporation" },
          { label: "Registered office", zar: NOT_QUOTED, gbp: "£29/month registered office" },
          { label: "GDPR setup", zar: NOT_QUOTED, gbp: "£650 GDPR setup" },
        ],
      },
    ],
  },
  {
    id: "ai-automation",
    label: "AI & Automation",
    intro: "AI builds and monthly care for work your team repeats often.",
    services: [
      {
        id: "ai-workflow-automation",
        name: "AI Workflow Automation",
        description: "Repeat work moved into a clear flow your team can use.",
        ownedAfterTwelveMonths: true,
        prices: [
          { label: "Starter", zar: "R15,000", gbp: "£950" },
          { label: "Standard fixed build", zar: "R35,000 fixed build", gbp: "£2,200 fixed build" },
          { label: "Maintenance", zar: "R3,500/month maintenance", gbp: "£220/month maintenance" },
        ],
      },
      {
        id: "ai-agent-build-deploy",
        name: "AI Agent Build & Deploy",
        description: "A custom AI helper built around the tasks you choose.",
        ownedAfterTwelveMonths: true,
        prices: [{ label: "Fixed build", zar: "R150,000+ fixed build", gbp: "£8,000+ fixed build" }],
      },
      {
        id: "ai-operations-service",
        name: "AI Operations Service",
        description: "Monthly care for AI checks, fixes, and small changes.",
        ownedAfterTwelveMonths: true,
        prices: [{ label: "Retainer", zar: "R3,500–R8,500/month retainer", gbp: "£220–£520/month retainer" }],
      },
      {
        id: "ai-receptionist",
        name: "AI Receptionist",
        description: "Calls and messages answered, logged, and sent to the right person.",
        ownedAfterTwelveMonths: true,
        prices: [
          { label: "Setup", zar: "R4,000 setup", gbp: "£200 setup" },
          { label: "Monthly", zar: "R999/month", gbp: "£80/month" },
        ],
      },
      {
        id: "ai-marketing-ops",
        name: "AI Marketing Ops",
        description: "Campaign admin, content drafts, and follow-up tasks kept moving.",
        ownedAfterTwelveMonths: true,
        prices: [
          { label: "Starter", zar: "R8,000/month", gbp: "£500/month" },
          { label: "Growth", zar: "R13,000/month", gbp: "£800/month" },
          { label: "Full Ops", zar: "R18,000/month", gbp: "£1,100/month" },
        ],
      },
    ],
  },
  {
    id: "people",
    label: "People",
    intro: "People support for hiring, payroll movement, and basic HR care.",
    services: [
      {
        id: "employer-of-record",
        name: "Employer of Record SA↔UK",
        description: "Employment admin for teams working between South Africa and the UK.",
        prices: [{ label: "Per employee", zar: "R4,500–R7,500 per employee/month", gbp: NOT_QUOTED }],
      },
      {
        id: "outsourced-hr",
        name: "Outsourced HR",
        description: "Practical HR help for questions, changes, and employee records.",
        prices: [{ label: "Monthly", zar: "R3,000–R8,000/month", gbp: "£100–£500/month" }],
      },
      {
        id: "onboarding-policy-automation",
        name: "Onboarding & Policy Automation",
        description: "New-starter steps and policy tasks set up in one clear process.",
        prices: [
          { label: "Build", zar: "R18,000 build", gbp: "£1,250 build" },
          { label: "Retainer", zar: "R1,800/month retainer", gbp: "£125/month retainer" },
        ],
      },
    ],
  },
  {
    id: "build",
    label: "Build",
    intro: "Web, app, and business build work with ownership after 12 months.",
    services: [
      {
        id: "custom-web-app",
        name: "Custom Web App",
        description: "A web app built around how your business works.",
        ownedAfterTwelveMonths: true,
        prices: [
          { label: "MVP", zar: "R27,000–R51,000", gbp: "£1,850–£3,500" },
          { label: "SaaS", zar: "R90,000–R210,000", gbp: "£6,500–£15,290" },
        ],
      },
      {
        id: "android-app",
        name: "Android App",
        description: "An Android app built from first screen to launch-ready build.",
        ownedAfterTwelveMonths: true,
        prices: [
          { label: "Basic", zar: "R27,000–R45,000", gbp: "£1,850–£3,100" },
          { label: "Full", zar: "R75,000–R150,000", gbp: "£5,200–£10,350" },
        ],
      },
      {
        id: "website-in-3-days",
        name: "Website in 3 Days",
        description: "A focused website built quickly once your content is ready.",
        ownedAfterTwelveMonths: true,
        prices: [{ label: "Pricing", zar: "Available on request", gbp: "Available on request" }],
      },
      {
        id: "business-plans",
        name: "Business Plans",
        description: "Clear plans, packs, and funding documents for your next step.",
        ownedAfterTwelveMonths: true,
        prices: [
          { label: "Plan", zar: "R2,700", gbp: "£195" },
          { label: "Startup Pack", zar: "R5,700", gbp: "£415" },
          { label: "Funding Application", zar: "R2,100", gbp: "£160" },
          { label: "Full Bundle", zar: "R6,900", gbp: "£500" },
        ],
      },
      {
        id: "business-development",
        name: "Business Development",
        description: "Sales support for finding leads, writing offers, and following up.",
        ownedAfterTwelveMonths: true,
        prices: [{ label: "Pricing", zar: "Available on request", gbp: "Available on request" }],
      },
    ],
  },
];

function RevealBlock({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.18 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function PriceTable({ prices }: { prices: PriceLine[] }) {
  return (
    <div aria-label="Service prices" style={{ display: "flex", flexDirection: "column" }}>
      {prices.map((price) => (
        <div
          key={`${price.label}-${price.zar}-${price.gbp}`}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            padding: "8px 0",
            borderBottom: "1px solid #1E2D3D",
            fontFamily: "var(--font-dm-sans)",
            fontSize: "14px",
            lineHeight: 1.45,
          }}
        >
          <span style={{ flex: "1 1 38%", minWidth: 0, color: "#8892A4" }}>{price.label}</span>
          <span style={{ flex: "1 1 32%", minWidth: 0, color: "#F5F7FA", fontWeight: 500 }}>{price.zar}</span>
          <span style={{ flex: "1 1 30%", minWidth: 0, color: "#00D4AA", fontWeight: 500, textAlign: "right" }}>
            {price.gbp}
          </span>
        </div>
      ))}
    </div>
  );
}

function ServiceContent({ service }: { service: Service }) {
  return (
    <div style={{ paddingTop: "12px", fontFamily: "var(--font-dm-sans)" }}>
      <p
        style={{
          margin: "0 0 12px",
          color: "#8892A4",
          fontFamily: "var(--font-dm-sans)",
          fontSize: "14px",
          lineHeight: 1.6,
        }}
      >
        {service.description}
      </p>
      <PriceTable prices={service.prices} />
      {service.ownedAfterTwelveMonths && (
        <p
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            margin: "12px 0 0",
            color: "#00D4AA",
            fontFamily: "var(--font-dm-sans)",
            fontSize: "14px",
            lineHeight: 1.5,
          }}
        >
          <Lock size={14} color="#00D4AA" strokeWidth={2} />
          Yours after 12 months
        </p>
      )}
    </div>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const [open, setOpen] = useState(false);
  const Icon = SERVICE_ICONS[service.id] ?? Briefcase;

  return (
    <motion.div
      style={{
        backgroundColor: "#111F2E",
        border: "1px solid #1E2D3D",
        borderRadius: "8px",
        padding: "20px 24px",
      }}
      whileHover={{ y: -4, borderColor: "#1B77F2" }}
      transition={{ duration: 0.2, ease: EASE }}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          gap: "14px",
          padding: 0,
          backgroundColor: "#111F2E",
          border: 0,
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <Icon size={20} color="#1B77F2" strokeWidth={1.8} style={{ flex: "0 0 auto" }} />
        <span
          style={{
            flex: 1,
            minWidth: 0,
            color: "#F5F7FA",
            fontFamily: "var(--font-syne)",
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: 1.3,
          }}
        >
          {service.name}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          style={{ display: "flex", flex: "0 0 auto", alignItems: "center" }}
        >
          <ChevronDown size={18} color="#8892A4" strokeWidth={2} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <ServiceContent service={service} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function PillarPanel({ pillar }: { pillar: Pillar }) {
  return (
    <div style={{ paddingTop: "18px" }}>
      <p
        style={{
          maxWidth: "720px",
          margin: "0 0 16px",
          color: "#8892A4",
          fontFamily: "var(--font-dm-sans)",
          fontSize: "16px",
          lineHeight: 1.7,
        }}
      >
        {pillar.intro}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {pillar.services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState(PILLARS[0].id);
  const activePillar = PILLARS.find((pillar) => pillar.id === activeTab) ?? PILLARS[0];

  return (
    <main className="pricing-page">
      <Nav />

      <section className="pricing-hero relative overflow-hidden">
        <GrainOverlay />
        <div className="pricing-wrap relative z-10">
          <RevealBlock>
            <p className="pricing-label">Pricing</p>
            <h1>One clear place to compare what we do.</h1>
            <p className="hero-copy">
              Choose a pillar, open the service you need, and compare South African Rand and British Pound pricing side by side.
            </p>
          </RevealBlock>
        </div>
      </section>

      <section className="pricing-tabs-section relative overflow-hidden">
        <GrainOverlay />
        <RevealBlock className="pricing-wrap relative z-10">
          <div className="tab-shell">
            <div className="tab-list" role="tablist" aria-label="Pricing pillars">
              {PILLARS.map((pillar) => {
                const isActive = pillar.id === activeTab;

                return (
                  <button
                    key={pillar.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${pillar.id}`}
                    id={`tab-${pillar.id}`}
                    onClick={() => setActiveTab(pillar.id)}
                    className="pricing-tab"
                    style={{
                      color: isActive ? "#F5F7FA" : "#8892A4",
                      borderBottomColor: isActive ? "#1B77F2" : "#1E2D3D",
                    }}
                  >
                    {pillar.label}
                  </button>
                );
              })}
            </div>
            <div role="tabpanel" id={`panel-${activePillar.id}`} aria-labelledby={`tab-${activePillar.id}`}>
              <PillarPanel pillar={activePillar} />
            </div>
          </div>
        </RevealBlock>
      </section>

      <section className="anti-section relative overflow-hidden">
        <GrainOverlay />
        <RevealBlock className="pricing-wrap relative z-10">
          <div className="anti-copy">
            <p className="pricing-label">Ownership</p>
            <h2>You pay once. Then you own it.</h2>
            <p>
              Every other provider charges a monthly subscription forever. Prices go up.
              You own nothing. BPOLytix builds and deploys your solution, you pay a fixed monthly
              fee for 12 months, and then it's yours. Fully built for your business. Future
              upgrades are add-ons — not price hikes on a platform you'll never own.
            </p>
          </div>
        </RevealBlock>
      </section>

      <section className="final-cta relative overflow-hidden">
        <GrainOverlay />
        <RevealBlock className="pricing-wrap relative z-10">
          <div className="cta-inner">
            <div>
              <p className="pricing-label">Packaged offerings</p>
              <h2>Need more than one service?</h2>
            </div>
            <Link href="/contact" className="pricing-cta">
              Speak to us about packaged offerings
              <ArrowRight size={17} strokeWidth={2.2} />
            </Link>
          </div>
        </RevealBlock>
      </section>

      <Footer />

      <style jsx>{`
        .pricing-page {
          background-color: #0D1B2A;
          color: #F5F7FA;
        }

        .pricing-wrap {
          max-width: 1440px;
          margin: 0 auto;
          padding-left: 32px;
          padding-right: 32px;
        }

        .pricing-hero,
        .pricing-tabs-section,
        .anti-section,
        .final-cta {
          background-color: #0D1B2A;
        }

        .pricing-hero {
          padding-top: 72px;
          padding-bottom: 28px;
        }

        .pricing-tabs-section {
          padding-top: 0;
          padding-bottom: 24px;
        }

        .anti-section {
          padding-top: 0;
          padding-bottom: 16px;
        }

        .final-cta {
          padding-top: 0;
          padding-bottom: 64px;
        }

        .pricing-label {
          margin: 0 0 16px;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 13px;
          letter-spacing: 0.08em;
          line-height: 1.4;
          text-transform: uppercase;
        }

        h1,
        h2 {
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-weight: 700;
          letter-spacing: -0.022em;
        }

        h1 {
          max-width: 900px;
          font-size: 64px;
          line-height: 1.05;
        }

        h2 {
          font-size: 28px;
          line-height: 1;
        }

        .hero-copy {
          max-width: 660px;
          margin: 24px 0 0;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 16px;
          line-height: 1.7;
        }

        .tab-shell {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .tab-list {
          display: flex;
          gap: 24px;
          overflow-x: auto;
          border-bottom: 1px solid #1E2D3D;
        }

        .pricing-tab {
          min-height: 44px;
          padding: 0 0 12px;
          background-color: #0D1B2A;
          border: 0;
          border-bottom: 2px solid #1E2D3D;
          cursor: pointer;
          font-family: var(--font-dm-sans);
          font-size: 14px;
          font-weight: 500;
          white-space: nowrap;
        }

        .anti-copy {
          width: 100%;
          padding: 40px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
        }

        .anti-copy p:last-child {
          margin: 16px 0 0;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 16px;
          line-height: 1.7;
        }

        .cta-inner {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          align-items: center;
          gap: 24px;
          padding: 24px 0 0;
        }

        .pricing-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-height: 48px;
          padding: 0 24px;
          border-radius: 9999px;
          background-color: #1B77F2;
          color: #F5F7FA;
          font-family: var(--font-dm-sans);
          font-size: 15px;
          font-weight: 700;
          line-height: 1.2;
          text-decoration: none;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }

        .pricing-cta:hover {
          transform: translateY(-1px);
        }

        @media (max-width: 767px) {
          .pricing-wrap {
            padding-left: 24px;
            padding-right: 24px;
          }

          h1 {
            font-size: 48px;
          }

          h2 {
            font-size: 28px;
          }

          .anti-copy {
            padding: 24px;
          }

          .cta-inner {
            grid-template-columns: 1fr;
            align-items: start;
          }

          .pricing-cta {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}
