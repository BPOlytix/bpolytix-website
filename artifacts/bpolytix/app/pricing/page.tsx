import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { GrainOverlay } from "@/components/GrainOverlay";

export const metadata: Metadata = {
  title: "Pricing — BPOLytix",
  description: "Transparent pricing for tech builds, finance, and strategy. No upfront cost. No invoice until you're satisfied.",
};

const TECH_PLANS = [
  {
    name: "AI Automation",
    from: "£950",
    period: "/month",
    desc: "Workflow automation that runs without your team.",
    features: ["Process scoping and mapping", "Custom automation build", "Testing and go-live", "Ongoing monitoring and fixes"],
    highlight: false,
  },
  {
    name: "Web Application",
    from: "£1,800",
    period: "/month",
    desc: "Full-stack SaaS built to your spec. IP transfers after 12 months.",
    features: ["Full-stack design and build", "Hosting and deployment", "Monthly iterations", "Codebase handover after Month 12"],
    highlight: true,
  },
  {
    name: "Android App",
    from: "£1,500",
    period: "/month",
    desc: "Native Android builds from wireframe to Play Store.",
    features: ["UI/UX wireframing", "Native development", "Play Store submission", "Source code handover after Month 12"],
    highlight: false,
  },
];

const FINANCE_PLANS = [
  {
    name: "Bookkeeping",
    from: "£550",
    period: "/month",
    desc: "Dedicated bookkeeper. UK-aware. Cancel anytime.",
    features: ["Monthly reconciliation", "Accounts payable/receivable", "VAT and HMRC submissions", "Monthly management accounts"],
    highlight: false,
  },
  {
    name: "CFO-as-a-Service",
    from: "£1,600",
    period: "/month",
    desc: "Senior financial oversight without the full-time salary.",
    features: ["Monthly review calls", "Cash flow forecasting", "Board reporting", "Fundraising and M&A support"],
    highlight: true,
  },
  {
    name: "Xero Implementation",
    from: "£750",
    period: " one-time",
    desc: "Proper setup, bank feeds, custom reports, and training.",
    features: ["Chart of accounts setup", "Bank feed connections", "Custom report templates", "Team training session"],
    highlight: false,
  },
];

const STRATEGY_PLANS = [
  {
    name: "Business Development",
    from: "£1,200",
    period: "/month",
    desc: "Your pipeline filled and worked while you run the business.",
    features: ["ICP and lead list build", "Outreach sequences", "Proposal writing", "CRM setup and management"],
    highlight: false,
  },
  {
    name: "Business Plan",
    from: "£1,800",
    period: " per plan",
    desc: "Investor-ready plans and grant applications.",
    features: ["Market research", "3-year financial projections", "Investor-ready deck", "Revision rounds until submission-ready"],
    highlight: true,
  },
];

const FAQS = [
  {
    q: "When do I get invoiced?",
    a: "Never before you're satisfied. We build Phase 1, you test it, and you sign off that it works. Only then do we send a first invoice. If something isn't right, we fix it — no charge — until it is.",
  },
  {
    q: "What does 'ownership after 12 months' mean exactly?",
    a: "For software builds, the IP and codebase transfer to you after 12 months of retainer payments. You receive full source code, documentation, and all deployment credentials. There are no ongoing licence fees — the software is yours, permanently.",
  },
  {
    q: "Is there a minimum contract length?",
    a: "No. Every engagement is month-to-month. The 12-month ownership milestone applies to software builds — the retainer funds the build, and ownership is the outcome. For finance and strategy services, cancel with one month's notice.",
  },
  {
    q: "Why are your rates so much lower than UK alternatives?",
    a: "We operate out of South Africa with a local salary base. Senior talent costs a fraction of the UK equivalent — and we pass that saving to you. The arbitrage is the entire point of the model.",
  },
  {
    q: "Do you work with UK businesses only?",
    a: "No. We work with South African startups and UK SMEs. Our finance services are HMRC-aware for UK clients and SARS-compliant for SA clients. If you're building something and need a team that understands both markets, we're built for that.",
  },
  {
    q: "What happens if I want to pause or stop mid-build?",
    a: "You can pause or stop at any time. If you stop before Month 12, you keep all work completed to that point — code, documents, and assets. You just won't receive the formal IP transfer until the 12-month milestone is reached.",
  },
];

type Plan = { name: string; from: string; period: string; desc: string; features: string[]; highlight: boolean };

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div
      className="flex flex-col rounded-2xl"
      style={{
        backgroundColor: plan.highlight ? "#132040" : "#0F1622",
        border: plan.highlight ? "1px solid rgba(27,119,242,0.35)" : "1px solid rgba(255,255,255,0.08)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {plan.highlight && (
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, #1B77F2, transparent)" }}
        />
      )}
      <div className="flex-1 p-7">
        {plan.highlight && (
          <span
            className="mb-4 inline-block rounded-full px-3 py-0.5 text-[11px] font-medium uppercase tracking-widest"
            style={{ backgroundColor: "rgba(27,119,242,0.18)", color: "#1B77F2", fontFamily: "var(--font-dm-sans)" }}
          >
            Most popular
          </span>
        )}
        <p
          className="mb-1"
          style={{ fontFamily: "var(--font-syne)", fontSize: "18px", color: "#F5F7FA", fontWeight: 600, letterSpacing: "-0.022em" }}
        >
          {plan.name}
        </p>
        <p
          className="mb-5"
          style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", color: "#8892A4", lineHeight: 1.5 }}
        >
          {plan.desc}
        </p>
        <div className="mb-6 flex items-baseline gap-1">
          <span
            style={{ fontFamily: "var(--font-syne)", fontSize: "36px", color: "#F5F7FA", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1 }}
          >
            {plan.from}
          </span>
          <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", color: "#8892A4" }}>
            {plan.period}
          </span>
        </div>
        <ul className="flex flex-col gap-3">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-3">
              <span
                className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full"
                style={{ backgroundColor: "rgba(27,119,242,0.12)", border: "1px solid rgba(27,119,242,0.3)" }}
              >
                <Check size={11} color="#1B77F2" strokeWidth={2.5} />
              </span>
              <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", color: "#C8D0DC", lineHeight: 1.5 }}>
                {f}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-7 pt-0">
        <Link
          href="/contact"
          className="flex items-center justify-center gap-2 rounded-full py-3 text-[14px] font-medium text-white transition-transform hover:-translate-y-px"
          style={{
            backgroundColor: plan.highlight ? "#1B77F2" : "rgba(255,255,255,0.07)",
            boxShadow: plan.highlight ? "0 4px 16px rgba(27,119,242,0.3)" : "none",
          }}
        >
          Get a quote
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

function PracticeSection({ label, title, plans }: { label: string; title: string; plans: Plan[] }) {
  const colClass = plans.length === 2
    ? "grid-cols-1 sm:grid-cols-2"
    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="relative overflow-hidden py-16 lg:py-20" style={{ backgroundColor: "#0A0F1A" }}>
      <GrainOverlay />
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-8">
        <p className="mb-3 text-[12px] uppercase tracking-widest" style={{ color: "#8892A4", fontFamily: "var(--font-dm-sans)" }}>
          {label}
        </p>
        <h2
          className="mb-10 sm:mb-14"
          style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(26px, 3.5vw, 36px)", color: "#F5F7FA", letterSpacing: "-0.022em", lineHeight: 1.0, fontWeight: 700 }}
        >
          {title}
        </h2>
        <div className={`grid gap-4 ${colClass}`}>
          {plans.map((p) => (
            <PlanCard key={p.name} plan={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function PricingPage() {
  return (
    <main style={{ backgroundColor: "#0A0F1A" }}>
      <Nav />

      <PageHero
        eyebrow="Pricing"
        headline="Transparent pricing. No surprises."
        sub="All prices are indicative starting points. Every engagement is scoped before a number is confirmed — we don't guess and neither should you."
      />

      <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.08)" }} />

      {/* Disclaimer banner */}
      <div style={{ backgroundColor: "#0F1622", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 py-4">
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", color: "#8892A4", lineHeight: 1.6 }}>
            <span style={{ color: "#00D4AA", fontWeight: 500 }}>Remember:</span>{" "}
            No invoice is sent until you confirm Phase 1 works. No upfront payment. No contract to sign to get started.
          </p>
        </div>
      </div>

      {/* Website in 3 Days */}
      <section className="relative overflow-hidden py-16 lg:py-20" style={{ backgroundColor: "#0A0F1A" }}>
        <GrainOverlay />
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-8">
          <p className="mb-3 text-[12px] uppercase tracking-widest" style={{ color: "#8892A4", fontFamily: "var(--font-dm-sans)" }}>
            Web Design
          </p>
          <h2
            className="mb-10 sm:mb-14"
            style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(26px, 3.5vw, 36px)", color: "#F5F7FA", letterSpacing: "-0.022em", lineHeight: 1.0, fontWeight: 700 }}
          >
            Your business online in 72 hours.
          </h2>
          <div className="mx-auto max-w-[520px]">
            <div
              className="flex flex-col rounded-2xl"
              style={{
                backgroundColor: "#132040",
                border: "1px solid rgba(27,119,242,0.35)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, #1B77F2, transparent)" }}
              />
              <div className="flex-1 p-7">
                <p
                  className="mb-1"
                  style={{ fontFamily: "var(--font-syne)", fontSize: "18px", color: "#F5F7FA", fontWeight: 600, letterSpacing: "-0.022em" }}
                >
                  Website in 3 Days
                </p>
                <p
                  className="mb-5"
                  style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", color: "#8892A4", lineHeight: 1.5 }}
                >
                  Brief us on Monday. Review your site on Thursday. Pay only when you&apos;re satisfied.
                </p>

                <div className="mb-4 flex items-baseline gap-1">
                  <span style={{ fontFamily: "var(--font-syne)", fontSize: "36px", color: "#F5F7FA", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1 }}>
                    R850 / £40
                  </span>
                </div>
                <p className="mb-6" style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", color: "#8892A4" }}>
                  Once-off setup
                </p>

                <div className="mb-4 flex items-baseline gap-1">
                  <span style={{ fontFamily: "var(--font-syne)", fontSize: "32px", color: "#1B77F2", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1 }}>
                    R299 / £15
                  </span>
                  <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", color: "#8892A4" }}>
                    /month
                  </span>
                </div>
                <p className="mb-6" style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", color: "#8892A4" }}>
                  Monthly for 12 months
                </p>

                <ul className="flex flex-col gap-3">
                  {[
                    "See it first — pay only when you're satisfied",
                    "Unlimited pages",
                    "Live chat included",
                    "Mobile friendly",
                    "Free changes for 12 months",
                    "Yours after 12 months — only pay domain renewal",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full"
                        style={{ backgroundColor: "rgba(27,119,242,0.12)", border: "1px solid rgba(27,119,242,0.3)" }}
                      >
                        <Check size={11} color="#1B77F2" strokeWidth={2.5} />
                      </span>
                      <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", color: "#C8D0DC", lineHeight: 1.5 }}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-7 pt-0">
                <Link
                  href="/website-in-3-days"
                  className="flex items-center justify-center gap-2 rounded-full py-3 text-[14px] font-medium text-white transition-transform hover:-translate-y-px"
                  style={{
                    backgroundColor: "#1B77F2",
                    boxShadow: "0 4px 16px rgba(27,119,242,0.3)",
                  }}
                >
                  Start my 3-day build
                  <ArrowRight size={14} />
                </Link>
                <p
                  className="mt-3 text-center"
                  style={{ fontFamily: "var(--font-dm-sans)", fontSize: "12px", color: "#8892A4", lineHeight: 1.5 }}
                >
                  No contract. Cancel anytime in the first 30 days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.08)" }} />

      <PracticeSection label="Technology" title="Software that becomes yours." plans={TECH_PLANS} />

      <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.08)" }} />

      <PracticeSection label="Finance" title="Senior finance without the headcount." plans={FINANCE_PLANS} />

      <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.08)" }} />

      <PracticeSection label="Strategy" title="Growth support that actually ships." plans={STRATEGY_PLANS} />

      <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.08)" }} />

      {/* FAQ */}
      <section className="relative overflow-hidden py-16 lg:py-20" style={{ backgroundColor: "#0F1622" }}>
        <GrainOverlay />
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-8">
          <p className="mb-3 text-[12px] uppercase tracking-widest" style={{ color: "#8892A4", fontFamily: "var(--font-dm-sans)" }}>
            FAQs
          </p>
          <h2
            className="mb-12"
            style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(26px, 3.5vw, 36px)", color: "#F5F7FA", letterSpacing: "-0.022em", lineHeight: 1.0, fontWeight: 700 }}
          >
            Questions we always get asked.
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {FAQS.map((faq) => (
              <div
                key={faq.q}
                className="rounded-xl p-6"
                style={{ backgroundColor: "#0A0F1A", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <h3
                  className="mb-3"
                  style={{ fontFamily: "var(--font-syne)", fontSize: "17px", color: "#F5F7FA", lineHeight: 1.3, fontWeight: 600, letterSpacing: "-0.015em" }}
                >
                  {faq.q}
                </h3>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "15px", color: "#8892A4", lineHeight: 1.7, letterSpacing: "-0.011em" }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.08)" }} />

      {/* Bottom CTA */}
      <section className="relative overflow-hidden py-16 lg:py-24" style={{ backgroundColor: "#0A0F1A" }}>
        <GrainOverlay />
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-8 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-[540px]">
            <h2
              style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(26px, 3.5vw, 36px)", color: "#F5F7FA", letterSpacing: "-0.022em", lineHeight: 1.05, fontWeight: 700 }}
            >
              Not sure which service fits?
            </h2>
            <p className="mt-3" style={{ fontFamily: "var(--font-dm-sans)", fontSize: "16px", color: "#8892A4", lineHeight: 1.7, letterSpacing: "-0.011em" }}>
              Book a free 30-minute scoping call. We&apos;ll tell you exactly what we&apos;d recommend and what it would cost — no commitment required.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-[15px] font-medium text-white transition-transform hover:-translate-y-px"
              style={{ backgroundColor: "#1B77F2", boxShadow: "0 4px 16px rgba(27,119,242,0.25)", whiteSpace: "nowrap" }}
            >
              Book a scoping call
              <ArrowRight size={15} />
            </Link>
            <a
              href="https://wa.me/27781790363?text=Hi%2C+I%27d+like+to+find+out+more+about+BPOLytix+pricing"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-[15px] font-medium transition-colors hover:bg-white/10"
              style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "#F5F7FA", whiteSpace: "nowrap" }}
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
