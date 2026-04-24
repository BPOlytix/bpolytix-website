"use client";

import { useRef, useState, type ReactNode } from "react";
import {
  BarChart2,
  BookOpen,
  Bot,
  Briefcase,
  Check,
  Code,
  FileText,
  Globe,
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
import { motion, useInView } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { GrainOverlay } from "@/components/GrainOverlay";

type Country = "ZA" | "UK";
type BusinessSize = "startup" | "sme" | "growth";

type Service = {
  id: string;
  pillar: "Finance" | "AI & Automation" | "People" | "Build";
  icon: LucideIcon;
  name: string;
  description: string;
  zar?: string;
  gbp?: string;
  requestOnly?: boolean;
};

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const SERVICES: Service[] = [
  {
    id: "bookkeeping",
    pillar: "Finance",
    icon: BookOpen,
    name: "Bookkeeping",
    description: "Monthly records kept clean and ready",
    zar: "R1,500",
    gbp: "£105",
  },
  {
    id: "fractional-cfo",
    pillar: "Finance",
    icon: TrendingUp,
    name: "Fractional CFO",
    description: "Senior finance help without a full-time salary",
    zar: "R3,900",
    gbp: "£275",
  },
  {
    id: "payroll",
    pillar: "Finance",
    icon: Users,
    name: "Payroll",
    description: "Payslips and employee changes each month",
    zar: "R210 per employee",
    gbp: "£15 per employee",
  },
  {
    id: "xero",
    pillar: "Finance",
    icon: BarChart2,
    name: "Xero",
    description: "Setup, clean-up, reports, and support",
    zar: "R2,100",
    gbp: "£150",
  },
  {
    id: "compliance",
    pillar: "Finance",
    icon: Shield,
    name: "Compliance",
    description: "Admin and filings, done for you",
    zar: "R1,800/mo",
    gbp: "£175/mo",
  },
  {
    id: "ai-workflow-automation",
    pillar: "AI & Automation",
    icon: Zap,
    name: "AI Workflow Automation",
    description: "Repetitive tasks, handled automatically",
    zar: "R15,000",
    gbp: "£950",
  },
  {
    id: "ai-agent-build-deploy",
    pillar: "AI & Automation",
    icon: Bot,
    name: "AI Agent Build & Deploy",
    description: "A custom AI agent, built for your workflow",
    zar: "R150,000",
    gbp: "£8,000",
  },
  {
    id: "ai-operations-service",
    pillar: "AI & Automation",
    icon: Settings,
    name: "AI Operations Service",
    description: "Ongoing care for your AI systems",
    zar: "R3,500/mo",
    gbp: "£220/mo",
  },
  {
    id: "ai-receptionist",
    pillar: "AI & Automation",
    icon: Phone,
    name: "AI Receptionist",
    description: "A phone line that never misses a call",
    zar: "R999/mo",
    gbp: "£80/mo",
  },
  {
    id: "ai-marketing-ops",
    pillar: "AI & Automation",
    icon: Megaphone,
    name: "AI Marketing Ops",
    description: "Your full marketing operation, on autopilot",
    zar: "R8,000/mo",
    gbp: "£500/mo",
  },
  {
    id: "employer-of-record",
    pillar: "People",
    icon: Globe,
    name: "Employer of Record (SA↔UK)",
    description: "Legally hire across the SA–UK corridor",
    zar: "R4,500/employee/mo",
  },
  {
    id: "outsourced-hr",
    pillar: "People",
    icon: UserCheck,
    name: "Outsourced HR",
    description: "HR manager work, at a fraction of the cost",
    zar: "R3,000/mo",
    gbp: "£100/mo",
  },
  {
    id: "onboarding-policy-automation",
    pillar: "People",
    icon: FileText,
    name: "Onboarding & Policy Automation",
    description: "New hires, paperwork handled",
    zar: "R18,000",
    gbp: "£1,250",
  },
  {
    id: "custom-web-app",
    pillar: "Build",
    icon: Code,
    name: "Custom Web App",
    description: "A web app built around how you work",
    zar: "R27,000",
    gbp: "£1,850",
  },
  {
    id: "android-app",
    pillar: "Build",
    icon: Smartphone,
    name: "Android App",
    description: "Native Android app, launch-ready",
    zar: "R27,000",
    gbp: "£1,850",
  },
  {
    id: "website-in-3-days",
    pillar: "Build",
    icon: Globe,
    name: "Website in 3 Days",
    description: "Live site in 72 hours",
    requestOnly: true,
  },
  {
    id: "business-plans-funding",
    pillar: "Build",
    icon: BookOpen,
    name: "Business Plans & Funding",
    description: "Investor-ready documents",
    zar: "R2,700",
    gbp: "£195",
  },
  {
    id: "business-development",
    pillar: "Build",
    icon: Briefcase,
    name: "Business Development",
    description: "Sales support, written by people who've sold",
    requestOnly: true,
  },
];

const COUNTRIES: { id: Country; label: string }[] = [
  { id: "ZA", label: "South Africa" },
  { id: "UK", label: "United Kingdom" },
];

const BUSINESS_SIZES: { id: BusinessSize; label: string }[] = [
  { id: "startup", label: "Startup (1–10)" },
  { id: "sme", label: "SME (11–50)" },
  { id: "growth", label: "Growth (50+)" },
];

const PILLARS = ["Finance", "AI & Automation", "People", "Build"] as const;

function RevealBlock({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.18 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function fromPrice(service: Service, country: Country) {
  if (service.requestOnly) return "Available on request";

  const selectedPrice = country === "UK" ? service.gbp : service.zar;
  const fallbackPrice = service.zar ?? service.gbp;

  return `from ${selectedPrice ?? fallbackPrice}`;
}

function ServiceCard({
  service,
  country,
  selected,
  onToggle,
}: {
  service: Service;
  country: Country;
  selected: boolean;
  onToggle: () => void;
}) {
  const Icon = service.icon;

  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileHover={{ y: -4, borderColor: "#1B77F2" }}
      transition={{ duration: 0.2, ease: EASE }}
      className="service-card"
      style={{
        backgroundColor: "#111F2E",
        borderColor: selected ? "#00D4AA" : "#1E2D3D",
        boxShadow: selected ? "0 0 0 1px #00D4AA" : "none",
      }}
    >
      {selected && (
        <span className="selected-mark" aria-hidden="true">
          <Check size={14} color="#0D1B2A" strokeWidth={2.5} />
        </span>
      )}
      <div className="card-topline">
        <Icon size={22} color="#1B77F2" strokeWidth={1.8} />
        <span>{service.pillar}</span>
      </div>
      <h3>{service.name}</h3>
      <p>{service.description}</p>
      <strong>{fromPrice(service, country)}</strong>
    </motion.button>
  );
}

export default function PricingPage() {
  const [country, setCountry] = useState<Country>("ZA");
  const [businessSize, setBusinessSize] = useState<BusinessSize>("startup");
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);

  function toggleService(id: string) {
    setSelectedServiceIds((current) =>
      current.includes(id) ? current.filter((serviceId) => serviceId !== id) : [...current, id],
    );
  }

  return (
    <main className="pricing-page">
      <Nav />

      <section className="pricing-hero relative overflow-hidden">
        <GrainOverlay />
        <RevealBlock className="pricing-wrap relative z-10">
          <p className="section-label">Pricing</p>
          <h1>One clear place to compare what we do.</h1>
          <p className="hero-copy">
            Choose a pillar, open the service you need, and compare South African Rand and British Pound pricing side by side.
          </p>
        </RevealBlock>
      </section>

      <section className="scenario-section relative overflow-hidden">
        <GrainOverlay />
        <RevealBlock className="pricing-wrap relative z-10">
          <div className="scenario-card">
            <div>
              <p className="section-label">Scenario</p>
              <h2>Set your pricing view.</h2>
            </div>

            <div className="scenario-controls" aria-label="Pricing scenario">
              <div className="control-row" role="group" aria-label="Country">
                {COUNTRIES.map((option) => {
                  const selected = option.id === country;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setCountry(option.id)}
                      className="segment-button"
                      style={{
                        backgroundColor: selected ? "#1B77F2" : "#0D1B2A",
                        borderColor: selected ? "#1B77F2" : "#1E2D3D",
                        color: selected ? "#F5F7FA" : "#8892A4",
                      }}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>

              <div className="control-row" role="group" aria-label="Business size">
                {BUSINESS_SIZES.map((option) => {
                  const selected = option.id === businessSize;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setBusinessSize(option.id)}
                      className="segment-button"
                      style={{
                        backgroundColor: selected ? "#1B77F2" : "#0D1B2A",
                        borderColor: selected ? "#1B77F2" : "#1E2D3D",
                        color: selected ? "#F5F7FA" : "#8892A4",
                      }}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </RevealBlock>
      </section>

      <section className="services-section relative overflow-hidden">
        <GrainOverlay />
        <RevealBlock className="pricing-wrap relative z-10">
          <div className="services-heading">
            <div>
              <p className="section-label">Service picker</p>
              <h2>Choose what you need now.</h2>
            </div>
            <p>{selectedServiceIds.length} selected</p>
          </div>

          <div className="pillar-strip" aria-label="Service pillars">
            {PILLARS.map((pillar) => (
              <span key={pillar}>{pillar}</span>
            ))}
          </div>

          <div className="service-grid">
            {SERVICES.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                country={country}
                selected={selectedServiceIds.includes(service.id)}
                onToggle={() => toggleService(service.id)}
              />
            ))}
          </div>
        </RevealBlock>
      </section>

      <Footer />

      <style jsx>{`
        .pricing-page {
          min-height: 100vh;
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
        .scenario-section,
        .services-section {
          background-color: #0D1B2A;
        }

        .pricing-hero {
          padding-top: 72px;
          padding-bottom: 28px;
        }

        .scenario-section {
          padding-top: 0;
          padding-bottom: 24px;
        }

        .services-section {
          padding-top: 0;
          padding-bottom: 72px;
        }

        .section-label {
          margin: 0 0 12px;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 13px;
          letter-spacing: 0.08em;
          line-height: 1.4;
          text-transform: uppercase;
        }

        h1,
        h2,
        h3 {
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-syne);
          letter-spacing: -0.022em;
        }

        h1 {
          max-width: 900px;
          font-size: 64px;
          font-weight: 700;
          line-height: 1.05;
        }

        h2 {
          font-size: 32px;
          font-weight: 700;
          line-height: 1.05;
        }

        .hero-copy {
          max-width: 680px;
          margin: 18px 0 0;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 16px;
          line-height: 1.7;
        }

        .scenario-card {
          display: grid;
          grid-template-columns: minmax(0, 0.72fr) minmax(0, 1.28fr);
          gap: 24px;
          align-items: start;
          padding: 24px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
        }

        .scenario-controls {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .control-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .segment-button {
          min-height: 42px;
          padding: 0 16px;
          border: 1px solid #1E2D3D;
          border-radius: 9999px;
          cursor: pointer;
          font-family: var(--font-dm-sans);
          font-size: 14px;
          font-weight: 600;
          line-height: 1;
          transition: border-color 0.16s ease, background-color 0.16s ease, color 0.16s ease;
        }

        .services-heading {
          display: flex;
          justify-content: space-between;
          gap: 24px;
          align-items: end;
          margin-bottom: 18px;
        }

        .services-heading > p {
          margin: 0;
          color: #00D4AA;
          font-family: var(--font-dm-sans);
          font-size: 14px;
          font-weight: 700;
          line-height: 1.4;
        }

        .pillar-strip {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 14px;
        }

        .pillar-strip span {
          display: inline-flex;
          align-items: center;
          min-height: 30px;
          padding: 0 12px;
          border: 1px solid #1E2D3D;
          border-radius: 9999px;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 13px;
          line-height: 1;
        }

        .service-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }

        .service-card {
          position: relative;
          display: flex;
          min-height: 196px;
          flex-direction: column;
          align-items: stretch;
          padding: 22px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          cursor: pointer;
          text-align: left;
        }

        .selected-mark {
          position: absolute;
          top: 16px;
          right: 16px;
          display: flex;
          width: 24px;
          height: 24px;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          background-color: #00D4AA;
        }

        .card-topline {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 18px;
          padding-right: 28px;
        }

        .card-topline span {
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          line-height: 1.2;
          text-transform: uppercase;
        }

        .service-card h3 {
          font-size: 18px;
          font-weight: 600;
          line-height: 1.2;
        }

        .service-card p {
          margin: 10px 0 18px;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 14px;
          line-height: 1.6;
        }

        .service-card strong {
          margin-top: auto;
          color: #00D4AA;
          font-family: var(--font-dm-sans);
          font-size: 15px;
          font-weight: 700;
          line-height: 1.4;
        }

        @media (max-width: 1023px) {
          .scenario-card {
            grid-template-columns: 1fr;
          }

          .service-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 767px) {
          .pricing-wrap {
            padding-left: 24px;
            padding-right: 24px;
          }

          .pricing-hero {
            padding-top: 56px;
            padding-bottom: 24px;
          }

          .services-section {
            padding-bottom: 56px;
          }

          h1 {
            font-size: 48px;
          }

          h2 {
            font-size: 28px;
          }

          .scenario-card {
            padding: 20px;
          }

          .services-heading {
            align-items: start;
            flex-direction: column;
            gap: 8px;
          }

          .service-grid {
            grid-template-columns: 1fr;
          }

          .service-card {
            min-height: 176px;
            padding: 20px;
          }
        }
      `}</style>
    </main>
  );
}
