import type { Metadata } from "next";
import Link from "next/link";
import {
  Bot, Globe2, Smartphone, Calculator,
  LineChart, Briefcase, FileText, Database,
  Check, ArrowRight,
} from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { GrainOverlay } from "@/components/GrainOverlay";
import { CTABanner } from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Services — BPOLytix",
  description: "Eight capabilities that replace your overhead — tech builds, finance, and business development from South Africa for UK SMEs.",
};

const SERVICES = [
  {
    icon: Bot,
    practice: "Technology",
    title: "AI Business Automation",
    tagline: "Replace repetitive work with workflows that run themselves.",
    desc: "We map your current manual processes and build automated pipelines that handle them end-to-end — no human intervention required. Whether it's document processing, CRM updates, or multi-step approval chains, we handle the complexity so your team doesn't have to.",
    includes: [
      "Custom n8n, Make, or bespoke automation builds",
      "CRM and email automation sequences",
      "Document generation and data extraction",
      "Third-party API and webhook integrations",
      "Chatbot and AI assistant development",
      "Monitoring, alerting, and maintenance",
    ],
    forYou: "You're spending more than 10 hours a week on tasks that follow the same pattern.",
    accent: "#1B77F2",
  },
  {
    icon: Globe2,
    practice: "Technology",
    title: "Custom Web Applications",
    tagline: "Software built to your spec. Owned by you after 12 months.",
    desc: "We design and build full-stack web applications tailored to your business — not generic SaaS tools you're forced to fit into. The codebase is hosted in your repository from day one, and ownership transfers fully after 12 months. No licence fees. Ever.",
    includes: [
      "Full-stack SaaS builds (Next.js / React / Node.js)",
      "Database design and REST or GraphQL API development",
      "User authentication and role-based access control",
      "Payment integration (Stripe, PayFast, etc.)",
      "Third-party integrations (HubSpot, Xero, etc.)",
      "Deployment, hosting, and handover documentation",
    ],
    forYou: "You need software that does exactly what your business does — not what a vendor decided it should do.",
    accent: "#1B77F2",
  },
  {
    icon: Smartphone,
    practice: "Technology",
    title: "Android App Development",
    tagline: "Native Android apps built, submitted, and handed over.",
    desc: "From wireframe to Play Store, we build Android applications that work for your business processes — field teams, customer-facing tools, or internal dashboards. The same no-upfront, ownership-after-12-months model applies.",
    includes: [
      "Native Kotlin or React Native builds",
      "UI/UX wireframing and user flow design",
      "Push notifications and offline capability",
      "Backend API integration and data sync",
      "Google Play Store submission and management",
      "Source code handover and documentation",
    ],
    forYou: "Your team works on Android devices and needs a tool that doesn't exist in any app store.",
    accent: "#1B77F2",
  },
  {
    icon: Calculator,
    practice: "Finance",
    title: "Bookkeeping & Accounting",
    tagline: "A remote bookkeeper without the employment headache.",
    desc: "We place a dedicated, UK-aware bookkeeper with your business. They handle your day-to-day accounts, reconciliations, and submissions — at South African salary rates. Cancel anytime. No employment contracts to unwind.",
    includes: [
      "Monthly bank and credit card reconciliation",
      "Accounts payable and receivable management",
      "VAT returns and HMRC submissions",
      "Monthly management accounts",
      "Xero or QuickBooks management",
      "Expense categorisation and approvals",
    ],
    forYou: "You're doing your own books or paying a local bookkeeper more than the work justifies.",
    accent: "#00D4AA",
  },
  {
    icon: LineChart,
    practice: "Finance",
    title: "CFO-as-a-Service",
    tagline: "Senior financial oversight at a fraction of a full-time salary.",
    desc: "A fractional CFO embedded in your business — joining your weekly or monthly reviews, building your financial models, and helping you make decisions with real numbers behind them. No equity. No six-figure package.",
    includes: [
      "Weekly or monthly financial review calls",
      "Cash flow forecasting and runway modelling",
      "KPI dashboard design and board reporting",
      "Budget setting and variance analysis",
      "M&A, fundraising, and investor support",
      "Finance team oversight and mentoring",
    ],
    forYou: "You're growing fast enough to need a finance leader but not yet ready to hire one full-time.",
    accent: "#00D4AA",
  },
  {
    icon: Briefcase,
    practice: "Strategy",
    title: "Business Development",
    tagline: "A pipeline that fills itself while you run the business.",
    desc: "We build and work your sales pipeline — defining your ICP, building targeted lead lists, writing outreach sequences, and managing the early stages of your funnel. Warm leads handed to you when they're ready to talk.",
    includes: [
      "Ideal Customer Profile (ICP) definition",
      "Targeted lead list research and build",
      "Cold outreach sequence creation and management",
      "Proposal and pitch deck writing",
      "Partnership sourcing and introductions",
      "CRM setup, hygiene, and pipeline reporting",
    ],
    forYou: "Your pipeline relies entirely on referrals or your own network and you want to change that.",
    accent: "#00D4AA",
  },
  {
    icon: FileText,
    practice: "Strategy",
    title: "Business Plans & Funding",
    tagline: "Plans that investors and grant committees actually read.",
    desc: "We write investor-ready business plans and funding applications with proper market research, realistic financial projections, and a narrative that gets to the point. We know what UK investors expect and what grant bodies want to see.",
    includes: [
      "Executive summary and company overview",
      "Market sizing, research, and competitor analysis",
      "Three-year financial projections with scenarios",
      "Investor-ready deck (10–15 slides)",
      "UK Innovate / SEIS / EIS application support",
      "Revision rounds until submission-ready",
    ],
    forYou: "You're raising a round, applying for a grant, or need a plan that holds up to scrutiny.",
    accent: "#00D4AA",
  },
  {
    icon: Database,
    practice: "Finance",
    title: "Xero Implementation",
    tagline: "Xero set up properly — once — with reports you'll actually use.",
    desc: "We set up Xero from scratch or migrate you from another platform, connecting your bank feeds, building your chart of accounts, and creating the custom reports your business needs. Then we hand it over with your team trained and confident.",
    includes: [
      "Chart of accounts design for your business model",
      "Bank feed connections and transaction rules",
      "Custom financial report and dashboard templates",
      "Third-party integrations (Shopify, Stripe, Gusto, etc.)",
      "Historical data migration and reconciliation",
      "Team training and ongoing support",
    ],
    forYou: "You're setting up Xero for the first time or your current setup is a mess you've inherited.",
    accent: "#00D4AA",
  },
];

const PRACTICE_COLOURS: Record<string, string> = {
  Technology: "#1B77F2",
  Finance: "#00D4AA",
  Strategy: "#9B8FFF",
};

export default function ServicesPage() {
  return (
    <main style={{ backgroundColor: "#0A0F1A" }}>
      <Nav />

      <PageHero
        eyebrow="Services"
        headline="Eight capabilities. One team. Zero overhead."
        sub="We replace headcount with outcomes. Every service runs on the same model — no invoice until you're satisfied, no upfront cost, cancel anytime."
      />

      <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.08)" }} />

      {/* Service blocks */}
      {SERVICES.map((svc, i) => {
        const Icon = svc.icon;
        const isEven = i % 2 === 0;
        return (
          <section
            key={svc.title}
            className="relative overflow-hidden py-14 lg:py-20"
            style={{ backgroundColor: isEven ? "#0A0F1A" : "#0F1622" }}
          >
            <GrainOverlay />
            <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-8">
              {/* Responsive layout: stack on mobile, 2-col on desktop */}
              <div
                className="flex flex-col gap-8 lg:items-start lg:gap-16"
                style={{ display: "flex" }}
              >
                {/* Use a wrapping div that becomes a grid on lg */}
                <div className="svc-inner-grid w-full" style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "32px",
                }}>
                  {/* Left */}
                  <div>
                    <div
                      className="mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-widest"
                      style={{
                        backgroundColor: `${PRACTICE_COLOURS[svc.practice]}15`,
                        color: PRACTICE_COLOURS[svc.practice],
                        border: `1px solid ${PRACTICE_COLOURS[svc.practice]}30`,
                        fontFamily: "var(--font-dm-sans)",
                      }}
                    >
                      <Icon size={13} strokeWidth={2} />
                      {svc.practice}
                    </div>
                    <h2
                      style={{
                        fontFamily: "var(--font-syne)",
                        fontSize: "clamp(26px, 3.5vw, 40px)",
                        color: "#F5F7FA",
                        letterSpacing: "-0.022em",
                        lineHeight: 1.05,
                        fontWeight: 700,
                      }}
                    >
                      {svc.title}
                    </h2>
                    <p
                      className="mb-6 mt-3"
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "17px",
                        color: svc.accent,
                        lineHeight: 1.4,
                        letterSpacing: "-0.011em",
                        fontWeight: 500,
                      }}
                    >
                      {svc.tagline}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "16px",
                        color: "#8892A4",
                        lineHeight: 1.75,
                        letterSpacing: "-0.011em",
                      }}
                    >
                      {svc.desc}
                    </p>

                    <div
                      className="mt-6 rounded-xl p-5"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      <p
                        className="mb-1 text-[11px] uppercase tracking-widest"
                        style={{ color: "#8892A4", fontFamily: "var(--font-dm-sans)" }}
                      >
                        Right for you if
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-dm-sans)",
                          fontSize: "15px",
                          color: "#F5F7FA",
                          lineHeight: 1.6,
                        }}
                      >
                        {svc.forYou}
                      </p>
                    </div>
                  </div>

                  {/* Right — includes card */}
                  <div
                    className="rounded-2xl"
                    style={{
                      backgroundColor: "#0F1622",
                      border: "1px solid rgba(255,255,255,0.08)",
                      padding: "32px",
                      alignSelf: "start",
                    }}
                  >
                    <p
                      className="mb-5 text-[11px] uppercase tracking-widest"
                      style={{ color: "#8892A4", fontFamily: "var(--font-dm-sans)" }}
                    >
                      What&apos;s included
                    </p>
                    <ul className="flex flex-col gap-4">
                      {svc.includes.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span
                            className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full"
                            style={{
                              backgroundColor: `${svc.accent}18`,
                              border: `1px solid ${svc.accent}40`,
                            }}
                          >
                            <Check size={11} color={svc.accent} strokeWidth={2.5} />
                          </span>
                          <span
                            style={{
                              fontFamily: "var(--font-dm-sans)",
                              fontSize: "15px",
                              color: "#C8D0DC",
                              lineHeight: 1.5,
                            }}
                          >
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div
                      className="mt-8 pt-6"
                      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <Link
                        href="/contact"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full py-3 text-[14px] font-medium text-white transition-transform hover:-translate-y-px"
                        style={{
                          backgroundColor: "#1B77F2",
                          boxShadow: "0 4px 16px rgba(27,119,242,0.25)",
                        }}
                      >
                        Enquire about this service
                        <ArrowRight size={15} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <CTABanner />
      <Footer />

      {/* Responsive grid styles for service sections */}
      <style>{`
        @media (min-width: 1024px) {
          .svc-inner-grid {
            grid-template-columns: 1fr 480px !important;
            gap: 64px !important;
          }
        }
      `}</style>
    </main>
  );
}
