"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { GrainOverlay } from "@/components/GrainOverlay";
import { Accordion, TabSwitcher, type AccordionItem, type Tab } from "@/components/ui";

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
    <div className="price-table" aria-label="Service prices">
      <div className="price-row price-head">
        <span>Item</span>
        <span>ZAR</span>
        <span>GBP</span>
      </div>
      {prices.map((price) => (
        <div className="price-row" key={`${price.label}-${price.zar}-${price.gbp}`}>
          <span className="price-label">{price.label}</span>
          <span className={price.zar === NOT_QUOTED ? "price-muted" : "price-zar"}>{price.zar}</span>
          <span className={price.gbp === NOT_QUOTED ? "price-muted" : "price-gbp"}>{price.gbp}</span>
        </div>
      ))}
    </div>
  );
}

function ServiceContent({ service }: { service: Service }) {
  return (
    <div className="service-content">
      <p className="service-description">{service.description}</p>
      <PriceTable prices={service.prices} />
      {service.ownedAfterTwelveMonths && <p className="ownership-line">Yours after 12 months</p>}
    </div>
  );
}

function PillarPanel({ pillar }: { pillar: Pillar }) {
  const items: AccordionItem[] = pillar.services.map((service) => ({
    id: service.id,
    trigger: service.name,
    content: <ServiceContent service={service} />,
  }));

  return (
    <div className="pillar-panel">
      <p className="pillar-intro">{pillar.intro}</p>
      <Accordion items={items} allowMultiple className="pricing-accordion" />
    </div>
  );
}

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState(PILLARS[0].id);
  const tabs = useMemo<Tab[]>(
    () =>
      PILLARS.map((pillar) => ({
        id: pillar.id,
        label: pillar.label,
        content: <PillarPanel pillar={pillar} />,
      })),
    [],
  );

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
          <TabSwitcher tabs={tabs} activeId={activeTab} onChange={setActiveTab} className="pricing-tabs" />
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
          border-bottom: 1px solid #1E2D3D;
        }

        .pricing-hero {
          padding-top: 96px;
          padding-bottom: 96px;
        }

        .pricing-tabs-section,
        .anti-section {
          padding-top: 96px;
          padding-bottom: 128px;
        }

        .final-cta {
          padding-top: 96px;
          padding-bottom: 96px;
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
          font-size: 72px;
          line-height: 1.05;
        }

        h2 {
          font-size: 48px;
          line-height: 1;
        }

        .hero-copy {
          max-width: 660px;
          margin: 24px 0 0;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 18px;
          line-height: 1.7;
        }

        .pricing-tabs {
          overflow: hidden;
          border: 1px solid #1E2D3D;
          border-radius: 12px;
          background-color: #111F2E;
        }

        .pillar-panel {
          padding: 28px;
          background-color: #111F2E;
        }

        .pillar-intro {
          max-width: 720px;
          margin: 0 0 24px;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 16px;
          line-height: 1.7;
        }

        .service-content {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .service-description {
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-dm-sans);
          font-size: 15px;
          line-height: 1.7;
        }

        .price-table {
          overflow: hidden;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #0D1B2A;
        }

        .price-row {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr;
          min-height: 52px;
          border-top: 1px solid #1E2D3D;
        }

        .price-row:first-child {
          border-top: 0;
        }

        .price-row > span {
          display: flex;
          align-items: center;
          padding: 13px 16px;
          border-left: 1px solid #1E2D3D;
          color: #F5F7FA;
          font-family: var(--font-dm-sans);
          font-size: 14px;
          line-height: 1.45;
        }

        .price-row > span:first-child {
          border-left: 0;
        }

        .price-head {
          background-color: #1C2A3A;
        }

        .price-head > span {
          color: #8892A4;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .price-label {
          color: #8892A4;
        }

        .price-zar {
          color: #00D4AA;
          font-weight: 700;
        }

        .price-gbp {
          color: #F5F7FA;
          font-weight: 700;
        }

        .price-muted {
          color: #8892A4;
        }

        .ownership-line {
          width: fit-content;
          margin: 0;
          padding: 8px 12px;
          border: 1px solid #1E2D3D;
          border-radius: 9999px;
          background-color: #1C2A3A;
          color: #00D4AA;
          font-family: var(--font-dm-sans);
          font-size: 13px;
          font-weight: 700;
          line-height: 1.4;
        }

        .anti-copy {
          max-width: 840px;
          padding: 36px;
          border: 1px solid #1E2D3D;
          border-radius: 12px;
          background-color: #111F2E;
        }

        .anti-copy p:last-child {
          margin: 24px 0 0;
          color: #F5F7FA;
          font-family: var(--font-dm-sans);
          font-size: 18px;
          line-height: 1.7;
        }

        .cta-inner {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          align-items: center;
          gap: 32px;
          padding: 36px;
          border: 1px solid #1E2D3D;
          border-radius: 12px;
          background-color: #111F2E;
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
          box-shadow: 0 0 24px #1B77F2;
          transform: translateY(-1px);
        }

        @media (max-width: 767px) {
          .pricing-wrap {
            padding-left: 24px;
            padding-right: 24px;
          }

          .pricing-hero {
            padding-top: 72px;
            padding-bottom: 72px;
          }

          .pricing-tabs-section,
          .anti-section {
            padding-top: 64px;
            padding-bottom: 72px;
          }

          .final-cta {
            padding-top: 64px;
            padding-bottom: 64px;
          }

          h1 {
            font-size: 42px;
          }

          h2 {
            font-size: 32px;
          }

          .hero-copy,
          .anti-copy p:last-child {
            font-size: 16px;
          }

          .pillar-panel {
            padding: 20px;
          }

          .price-row {
            grid-template-columns: 1fr;
          }

          .price-row > span {
            min-height: 44px;
            border-left: 0;
            border-top: 1px solid #1E2D3D;
          }

          .price-row > span:first-child {
            border-top: 0;
          }

          .price-head {
            display: none;
          }

          .price-zar::before,
          .price-gbp::before,
          .price-muted::before {
            display: inline-block;
            width: 48px;
            flex: 0 0 auto;
            color: #8892A4;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.08em;
          }

          .price-zar::before {
            content: "ZAR";
          }

          .price-gbp::before {
            content: "GBP";
          }

          .price-muted:nth-child(2)::before {
            content: "ZAR";
          }

          .price-muted:nth-child(3)::before {
            content: "GBP";
          }

          .anti-copy,
          .cta-inner {
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
