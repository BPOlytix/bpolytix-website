"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
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
  X,
  UserCheck,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { GrainOverlay } from "@/components/GrainOverlay";
import { CashflowChart } from "@/components/pricing/CashflowChart";
import { ServiceFlowDiagram } from "@/components/pricing/ServiceFlowDiagram";

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
  bpolytixMonthlyZar?: number;
  bpolytixMonthlyGbp?: number;
  inHouseMonthlyZar?: number;
  inHouseMonthlyGbp?: number;
  handoverValueZar?: number;
  handoverValueGbp?: number;
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
    bpolytixMonthlyZar: 1500,
    bpolytixMonthlyGbp: 105,
    inHouseMonthlyZar: 8000,
    inHouseMonthlyGbp: 650,
  },
  {
    id: "fractional-cfo",
    pillar: "Finance",
    icon: TrendingUp,
    name: "Fractional CFO",
    description: "Senior finance help without a full-time salary",
    zar: "R3,900",
    gbp: "£275",
    bpolytixMonthlyZar: 3900,
    bpolytixMonthlyGbp: 275,
    inHouseMonthlyZar: 50000,
    inHouseMonthlyGbp: 5800,
  },
  {
    id: "payroll",
    pillar: "Finance",
    icon: Users,
    name: "Payroll",
    description: "Payslips and employee changes each month",
    zar: "R210 per employee",
    gbp: "£15 per employee",
    bpolytixMonthlyZar: 210,
    bpolytixMonthlyGbp: 15,
    inHouseMonthlyZar: 3500,
    inHouseMonthlyGbp: 280,
  },
  {
    id: "xero",
    pillar: "Finance",
    icon: BarChart2,
    name: "Xero",
    description: "Setup, clean-up, reports, and support",
    zar: "R2,100",
    gbp: "£150",
    bpolytixMonthlyZar: 175,
    bpolytixMonthlyGbp: 12.5,
    inHouseMonthlyZar: 6000,
    inHouseMonthlyGbp: 450,
  },
  {
    id: "compliance",
    pillar: "Finance",
    icon: Shield,
    name: "Compliance",
    description: "Admin and filings, done for you",
    zar: "R1,800/mo",
    gbp: "£175/mo",
    bpolytixMonthlyZar: 1800,
    bpolytixMonthlyGbp: 175,
    inHouseMonthlyZar: 6500,
    inHouseMonthlyGbp: 550,
  },
  {
    id: "ai-workflow-automation",
    pillar: "AI & Automation",
    icon: Zap,
    name: "AI Workflow Automation",
    description: "Repetitive tasks, handled automatically",
    zar: "R15,000",
    gbp: "£950",
    bpolytixMonthlyZar: 1250,
    bpolytixMonthlyGbp: 79.17,
    inHouseMonthlyZar: 12000,
    inHouseMonthlyGbp: 900,
    handoverValueZar: 15000,
    handoverValueGbp: 950,
  },
  {
    id: "ai-agent-build-deploy",
    pillar: "AI & Automation",
    icon: Bot,
    name: "AI Agent Build & Deploy",
    description: "A custom AI agent, built for your workflow",
    zar: "R150,000",
    gbp: "£8,000",
    bpolytixMonthlyZar: 12500,
    bpolytixMonthlyGbp: 666.67,
    inHouseMonthlyZar: 40000,
    inHouseMonthlyGbp: 3200,
    handoverValueZar: 150000,
    handoverValueGbp: 8000,
  },
  {
    id: "ai-operations-service",
    pillar: "AI & Automation",
    icon: Settings,
    name: "AI Operations Service",
    description: "Ongoing care for your AI systems",
    zar: "R3,500/mo",
    gbp: "£220/mo",
    bpolytixMonthlyZar: 3500,
    bpolytixMonthlyGbp: 220,
    inHouseMonthlyZar: 18000,
    inHouseMonthlyGbp: 1400,
    handoverValueZar: 42000,
    handoverValueGbp: 2640,
  },
  {
    id: "ai-receptionist",
    pillar: "AI & Automation",
    icon: Phone,
    name: "AI Receptionist",
    description: "A phone line that never misses a call",
    zar: "R999/mo",
    gbp: "£80/mo",
    bpolytixMonthlyZar: 999,
    bpolytixMonthlyGbp: 80,
    inHouseMonthlyZar: 12000,
    inHouseMonthlyGbp: 950,
    handoverValueZar: 11988,
    handoverValueGbp: 960,
  },
  {
    id: "ai-marketing-ops",
    pillar: "AI & Automation",
    icon: Megaphone,
    name: "AI Marketing Ops",
    description: "Your full marketing operation, on autopilot",
    zar: "R8,000/mo",
    gbp: "£500/mo",
    bpolytixMonthlyZar: 8000,
    bpolytixMonthlyGbp: 500,
    inHouseMonthlyZar: 35000,
    inHouseMonthlyGbp: 2800,
    handoverValueZar: 96000,
    handoverValueGbp: 6000,
  },
  {
    id: "employer-of-record",
    pillar: "People",
    icon: Globe,
    name: "Employer of Record (SA↔UK)",
    description: "Legally hire across the SA–UK corridor",
    zar: "R4,500/employee/mo",
    bpolytixMonthlyZar: 4500,
    inHouseMonthlyZar: 15000,
  },
  {
    id: "outsourced-hr",
    pillar: "People",
    icon: UserCheck,
    name: "Outsourced HR",
    description: "HR manager work, at a fraction of the cost",
    zar: "R3,000/mo",
    gbp: "£100/mo",
    bpolytixMonthlyZar: 3000,
    bpolytixMonthlyGbp: 100,
    inHouseMonthlyZar: 45000,
    inHouseMonthlyGbp: 4500,
  },
  {
    id: "onboarding-policy-automation",
    pillar: "People",
    icon: FileText,
    name: "Onboarding & Policy Automation",
    description: "New hires, paperwork handled",
    zar: "R18,000",
    gbp: "£1,250",
    bpolytixMonthlyZar: 1500,
    bpolytixMonthlyGbp: 104.17,
    inHouseMonthlyZar: 6000,
    inHouseMonthlyGbp: 500,
  },
  {
    id: "custom-web-app",
    pillar: "Build",
    icon: Code,
    name: "Custom Web App",
    description: "A web app built around how you work",
    zar: "R27,000",
    gbp: "£1,850",
    bpolytixMonthlyZar: 2250,
    bpolytixMonthlyGbp: 154.17,
    inHouseMonthlyZar: 25000,
    inHouseMonthlyGbp: 2200,
    handoverValueZar: 27000,
    handoverValueGbp: 1850,
  },
  {
    id: "android-app",
    pillar: "Build",
    icon: Smartphone,
    name: "Android App",
    description: "Native Android app, launch-ready",
    zar: "R27,000",
    gbp: "£1,850",
    bpolytixMonthlyZar: 2250,
    bpolytixMonthlyGbp: 154.17,
    inHouseMonthlyZar: 20000,
    inHouseMonthlyGbp: 1800,
    handoverValueZar: 27000,
    handoverValueGbp: 1850,
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
    handoverValueZar: 2700,
    handoverValueGbp: 195,
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

function amountFor(service: Service, country: Country, kind: "bpolytix" | "inHouse" | "handover") {
  if (kind === "bpolytix") {
    return country === "UK" ? service.bpolytixMonthlyGbp ?? 0 : service.bpolytixMonthlyZar ?? 0;
  }

  if (kind === "inHouse") {
    return country === "UK" ? service.inHouseMonthlyGbp ?? 0 : service.inHouseMonthlyZar ?? 0;
  }

  return country === "UK" ? service.handoverValueGbp ?? 0 : service.handoverValueZar ?? 0;
}

function formatCurrency(value: number, country: Country) {
  const symbol = country === "UK" ? "£" : "R";
  const rounded = Math.round(value);

  return `${symbol}${rounded.toLocaleString("en-GB")}`;
}

function selectedLabel(count: number) {
  return count === 1 ? "1 selected" : `${count} selected`;
}

function CountedCurrency({ value, country, className }: { value: number; country: Country; className?: string }) {
  const motionValue = useMotionValue(value);
  const displayValue = useTransform(motionValue, (latest) => formatCurrency(latest, country));

  useEffect(() => {
    const controls = animate(motionValue, value, { duration: 0.6, ease: EASE });

    return () => controls.stop();
  }, [motionValue, value]);

  return <motion.span className={className}>{displayValue}</motion.span>;
}

function SavingsPanel({
  country,
  businessSize,
  selectedServices,
  monthlyBpolytix,
  monthlyInHouse,
  monthlySavings,
  twelveMonthSavings,
  handoverValue,
  hasOwnedService,
  mobileExpanded,
  onToggleMobile,
  onRemove,
}: {
  country: Country;
  businessSize: BusinessSize;
  selectedServices: Service[];
  monthlyBpolytix: number;
  monthlyInHouse: number;
  monthlySavings: number;
  twelveMonthSavings: number;
  handoverValue: number;
  hasOwnedService: boolean;
  mobileExpanded: boolean;
  onToggleMobile: () => void;
  onRemove: (id: string) => void;
}) {
  const serviceParam = selectedServices.map((service) => service.id).join(",");
  const contactHref = `/contact?services=${encodeURIComponent(serviceParam)}&country=${country}&size=${businessSize}`;

  return (
    <aside className="savings-panel" aria-label="Your build savings panel">
      <button type="button" className="panel-toggle" onClick={onToggleMobile} aria-expanded={mobileExpanded}>
        <span>Your build</span>
        <strong>{selectedLabel(selectedServices.length)}</strong>
      </button>

      <div className={`panel-content ${mobileExpanded ? "panel-content-open" : ""}`}>
        <div className="selected-list" aria-label="Selected services">
          <AnimatePresence initial={false}>
            {selectedServices.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="empty-state"
              >
                Select services to see your live estimate.
              </motion.p>
            ) : (
              selectedServices.map((service) => (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.24, ease: EASE }}
                  className="selected-item"
                >
                  <span>{service.name}</span>
                  <button type="button" onClick={() => onRemove(service.id)} aria-label={`Remove ${service.name}`}>
                    <X size={14} color="#8892A4" strokeWidth={2} />
                  </button>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        <div className="panel-divider" />

        <div className="metric-row">
          <span>Monthly cost with BPOLytix</span>
          <strong>{formatCurrency(monthlyBpolytix, country)}</strong>
        </div>
        <div className="metric-row">
          <span>Equivalent in-house cost</span>
          <strong>{formatCurrency(monthlyInHouse, country)}</strong>
        </div>
        <p className="estimate-note">Estimated in-house equivalent. Based on market salary and software averages.</p>

        <div className="saving-block">
          <span>You save</span>
          <CountedCurrency value={monthlySavings} country={country} className="saving-number" />
        </div>

        <div className="metric-row secondary">
          <span>Over 12 months</span>
          <strong>{formatCurrency(twelveMonthSavings, country)}</strong>
        </div>

        <div className="panel-divider" />

        {hasOwnedService && (
          <div className="ownership-pill">
            <span>You own it from month 13</span>
            <strong>{formatCurrency(handoverValue, country)} handover value</strong>
          </div>
        )}

        <a href={contactHref} className="scope-cta">
          Scope my build
          <ArrowRight size={16} color="#F5F7FA" strokeWidth={2} />
        </a>
      </div>
    </aside>
  );
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
  const [mobilePanelExpanded, setMobilePanelExpanded] = useState(false);

  const selectedServices = useMemo(
    () => SERVICES.filter((service) => selectedServiceIds.includes(service.id)),
    [selectedServiceIds],
  );

  const monthlyBpolytix = selectedServices.reduce(
    (total, service) => total + amountFor(service, country, "bpolytix"),
    0,
  );
  const monthlyInHouse = selectedServices.reduce(
    (total, service) => total + amountFor(service, country, "inHouse"),
    0,
  );
  const monthlySavings = Math.max(0, monthlyInHouse - monthlyBpolytix);
  const twelveMonthSavings = monthlySavings * 12;
  const handoverValue = selectedServices.reduce((total, service) => total + amountFor(service, country, "handover"), 0);
  const hasOwnedService = selectedServices.some((service) => service.pillar === "AI & Automation" || service.pillar === "Build");

  function toggleService(id: string) {
    setSelectedServiceIds((current) =>
      current.includes(id) ? current.filter((serviceId) => serviceId !== id) : [...current, id],
    );
  }

  function removeService(id: string) {
    setSelectedServiceIds((current) => current.filter((serviceId) => serviceId !== id));
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
                        backgroundColor: selected ? "#1B77F2" : "transparent",
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
                        backgroundColor: selected ? "#1B77F2" : "transparent",
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
          <div className="pricing-builder-layout">
            <div>
              <div className="services-heading">
                <div>
                  <p className="section-label">Service picker</p>
                  <h2>Choose what you need now.</h2>
                </div>
                <p>{selectedLabel(selectedServiceIds.length)}</p>
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
            </div>

            <div className="savings-column">
              <SavingsPanel
                country={country}
                businessSize={businessSize}
                selectedServices={selectedServices}
                monthlyBpolytix={monthlyBpolytix}
                monthlyInHouse={monthlyInHouse}
                monthlySavings={monthlySavings}
                twelveMonthSavings={twelveMonthSavings}
                handoverValue={handoverValue}
                hasOwnedService={hasOwnedService}
                mobileExpanded={mobilePanelExpanded}
                onToggleMobile={() => setMobilePanelExpanded((open) => !open)}
                onRemove={removeService}
              />
            </div>
          </div>
        </RevealBlock>
      </section>

      <ServiceFlowDiagram selectedServices={selectedServices} />

      <section className="cashflow-section relative overflow-hidden">
        <GrainOverlay />
        <RevealBlock className="pricing-wrap relative z-10">
          <CashflowChart country={country} monthlyBpolytix={monthlyBpolytix} monthlyInHouse={monthlyInHouse} />
        </RevealBlock>
      </section>

      <section className="anti-sub-section relative overflow-hidden">
        <GrainOverlay />
        <RevealBlock className="pricing-wrap relative z-10">
          <div className="anti-sub-card">
            <h2>You pay once. Then you own it.</h2>
            <p>
              Every other provider charges a monthly subscription forever.
              Prices go up. You own nothing. BPOLytix builds and deploys your
              solution, you pay a fixed monthly fee for 12 months, and then it's
              yours. Fully built for your business. Future upgrades are add-ons —
              not price hikes on a platform you'll never own.
            </p>
          </div>
        </RevealBlock>
      </section>

      <section className="final-pricing-cta relative overflow-hidden">
        <GrainOverlay />
        <RevealBlock className="pricing-wrap relative z-10">
          <div className="final-cta-card">
            <div>
              <h2>Need something bespoke?</h2>
              <p>
                Every business is different. We'll cost your exact stack and
                send a written scope within one business day.
              </p>
            </div>
            <div className="final-cta-actions">
              <a href="/contact" className="primary-final-cta">
                Scope my build
              </a>
              <a href="https://wa.me/27781790363" className="secondary-final-cta">
                Talk to us on WhatsApp
              </a>
            </div>
          </div>
        </RevealBlock>
      </section>

      <Footer />

      <style jsx global>{`
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

        .cashflow-section,
        .anti-sub-section,
        .final-pricing-cta {
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
          padding-bottom: 32px;
        }

        .cashflow-section {
          padding-top: 0;
          padding-bottom: 24px;
        }

        .anti-sub-section {
          padding-top: 0;
          padding-bottom: 16px;
        }

        .final-pricing-cta {
          padding-top: 0;
          padding-bottom: 72px;
        }

        .anti-sub-card,
        .final-cta-card {
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          padding: 32px;
        }

        .anti-sub-card h2,
        .final-cta-card h2 {
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 32px;
          font-weight: 700;
          letter-spacing: -0.022em;
          line-height: 1.05;
        }

        .anti-sub-card p,
        .final-cta-card p {
          max-width: 780px;
          margin: 16px 0 0;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 16px;
          line-height: 1.7;
        }

        .final-cta-card {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 24px;
          align-items: center;
        }

        .final-cta-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: flex-end;
        }

        .primary-final-cta,
        .secondary-final-cta {
          display: inline-flex;
          min-height: 46px;
          align-items: center;
          justify-content: center;
          padding: 0 20px;
          border-radius: 9999px;
          font-family: var(--font-dm-sans);
          font-size: 15px;
          font-weight: 700;
          line-height: 1;
          text-decoration: none;
        }

        .primary-final-cta {
          background-color: #1B77F2;
          color: #F5F7FA;
        }

        .secondary-final-cta {
          border: 1px solid #1E2D3D;
          color: #F5F7FA;
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

        .pricing-builder-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 360px;
          gap: 20px;
          align-items: start;
        }

        .savings-column {
          position: sticky;
          top: 88px;
        }

        .savings-panel {
          overflow: hidden;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
        }

        .panel-toggle {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 20px;
          border: 0;
          border-bottom: 1px solid #1E2D3D;
          background-color: #111F2E;
          cursor: default;
          text-align: left;
        }

        .panel-toggle span {
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 20px;
          font-weight: 700;
          line-height: 1.1;
        }

        .panel-toggle strong {
          color: #00D4AA;
          font-family: var(--font-dm-sans);
          font-size: 13px;
          font-weight: 700;
          line-height: 1.2;
        }

        .panel-content {
          display: block;
          padding: 18px 20px 20px;
        }

        .selected-list {
          display: flex;
          max-height: 188px;
          flex-direction: column;
          gap: 8px;
          overflow-y: auto;
        }

        .empty-state {
          margin: 0;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 14px;
          line-height: 1.6;
        }

        .selected-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 8px 0;
          border-bottom: 1px solid #1E2D3D;
        }

        .selected-item span {
          color: #F5F7FA;
          font-family: var(--font-dm-sans);
          font-size: 14px;
          line-height: 1.4;
        }

        .selected-item button {
          display: flex;
          width: 28px;
          height: 28px;
          flex: 0 0 auto;
          align-items: center;
          justify-content: center;
          border: 1px solid #1E2D3D;
          border-radius: 9999px;
          background-color: #111F2E;
          cursor: pointer;
        }

        .panel-divider {
          height: 1px;
          margin: 16px 0;
          background-color: #1E2D3D;
        }

        .metric-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 10px;
        }

        .metric-row span {
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 14px;
          line-height: 1.4;
        }

        .metric-row strong {
          color: #F5F7FA;
          font-family: var(--font-dm-sans);
          font-size: 15px;
          font-weight: 700;
          line-height: 1.4;
          text-align: right;
        }

        .metric-row.secondary {
          margin-top: 12px;
          margin-bottom: 0;
        }

        .estimate-note {
          margin: 0;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 12px;
          line-height: 1.5;
        }

        .saving-block {
          margin-top: 18px;
        }

        .saving-block > span {
          display: block;
          margin-bottom: 4px;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 14px;
          line-height: 1.4;
        }

        .saving-number {
          display: block;
          color: #00D4AA;
          font-family: var(--font-syne);
          font-size: 34px;
          font-weight: 700;
          letter-spacing: -0.022em;
          line-height: 1;
        }

        .ownership-pill {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 12px 14px;
          border: 1px solid #00D4AA;
          border-radius: 9999px;
          color: #00D4AA;
        }

        .ownership-pill span,
        .ownership-pill strong {
          color: #00D4AA;
          font-family: var(--font-dm-sans);
          font-size: 13px;
          line-height: 1.3;
        }

        .ownership-pill strong {
          font-weight: 700;
        }

        .scope-cta {
          display: flex;
          min-height: 46px;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 16px;
          border-radius: 9999px;
          background-color: #1B77F2;
          color: #F5F7FA;
          font-family: var(--font-dm-sans);
          font-size: 15px;
          font-weight: 700;
          line-height: 1;
          text-decoration: none;
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
          grid-template-columns: repeat(2, minmax(0, 1fr));
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

          .pricing-builder-layout {
            display: block;
          }

          .savings-column {
            position: static;
          }

          .savings-panel {
            position: fixed;
            right: 16px;
            bottom: 16px;
            left: 16px;
            z-index: 60;
          }

          .panel-toggle {
            cursor: pointer;
          }

          .panel-content {
            display: none;
            max-height: 68vh;
            overflow-y: auto;
          }

          .panel-content.panel-content-open {
            display: block;
          }

          .service-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .services-section {
            padding-bottom: 148px;
          }

          .final-cta-card {
            grid-template-columns: 1fr;
            align-items: start;
          }

          .final-cta-actions {
            justify-content: flex-start;
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
            padding-bottom: 148px;
          }

          .cashflow-section,
          .anti-sub-section {
            padding-bottom: 16px;
          }

          .final-pricing-cta {
            padding-bottom: 148px;
          }

          .anti-sub-card,
          .final-cta-card {
            padding: 20px;
          }

          .anti-sub-card h2,
          .final-cta-card h2 {
            font-size: 28px;
          }

          .final-cta-actions {
            flex-direction: column;
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
