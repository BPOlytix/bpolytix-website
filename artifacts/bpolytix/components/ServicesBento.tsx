"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bot,
  Globe2,
  Smartphone,
  Calculator,
  LineChart,
  Briefcase,
  FileText,
  Database,
  ArrowRight,
} from "lucide-react";
import { GrainOverlay } from "./GrainOverlay";

const SERVICES = [
  {
    icon: Bot,
    title: "AI Business Automation",
    desc: "Custom workflows that replace repetitive manual processes.",
    area: "a",
  },
  {
    icon: Globe2,
    title: "Custom Web Applications",
    desc: "SaaS tools built to your spec. You own them after Year 1.",
    area: "b",
  },
  {
    icon: Smartphone,
    title: "Android App Development",
    desc: "Native Android apps scoped, built, and handed over.",
    area: "c",
  },
  {
    icon: Calculator,
    title: "Bookkeeping & Accounting",
    desc: "Remote bookkeepers. No employment contracts. Cancel anytime.",
    area: "d",
  },
  {
    icon: LineChart,
    title: "CFO-as-a-Service",
    desc: "Senior financial oversight without a full-time salary.",
    area: "e",
  },
  {
    icon: Briefcase,
    title: "Business Development",
    desc: "Pipeline building, proposal writing, and market entry support.",
    area: "f",
  },
  {
    icon: FileText,
    title: "Business Plans & Funding",
    desc: "Investor-ready plans and funding applications that get read.",
    area: "g",
  },
  {
    icon: Database,
    title: "Xero Implementation",
    desc: "Xero setup, custom reports, and bespoke Xero integrations.",
    area: "h",
  },
];

export function ServicesBento() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#0A0F1A",
        paddingTop: "96px",
        paddingBottom: "128px",
      }}
    >
      <GrainOverlay />
      <div className="relative z-10 mx-auto max-w-[1440px] px-8">
        <p
          className="mb-4 text-[13px]"
          style={{ color: "#8892A4", fontFamily: "var(--font-dm-sans)" }}
        >
          Services
        </p>
        <h2
          className="mb-16 max-w-[820px]"
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(32px, 5vw, 48px)",
            color: "#F5F7FA",
            letterSpacing: "-0.022em",
            lineHeight: 1.0,
            fontWeight: 700,
          }}
        >
          Eight ways we replace your overhead.
        </h2>

        <div
          className="bento-grid"
          style={{
            display: "grid",
            gap: "16px",
            gridTemplateColumns: "repeat(6, 1fr)",
          }}
        >
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: (i % 4) * 0.06,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className={`bento-card bento-card--${service.area} group flex flex-col justify-between rounded-xl p-8 transition-all duration-200 hover:-translate-y-1`}
                style={{
                  backgroundColor: "#0F1622",
                  border: "1px solid rgba(255,255,255,0.08)",
                  minHeight: "200px",
                }}
              >
                <div>
                  <Icon size={24} color="#1B77F2" strokeWidth={1.75} />
                  <h3
                    className="mt-6"
                    style={{
                      fontFamily: "var(--font-syne)",
                      fontSize: "20px",
                      color: "#F5F7FA",
                      lineHeight: 1.2,
                      letterSpacing: "-0.022em",
                      fontWeight: 600,
                    }}
                  >
                    {service.title}
                  </h3>
                </div>
                <p
                  className="mt-4"
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "15px",
                    color: "#8892A4",
                    lineHeight: 1.6,
                    letterSpacing: "-0.011em",
                  }}
                >
                  {service.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[15px] font-medium transition-colors hover:bg-white/10"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              color: "#F5F7FA",
            }}
          >
            See full service details
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <style jsx>{`
        .bento-card {
          grid-column: span 6;
        }
        @media (min-width: 768px) {
          .bento-card {
            grid-column: span 3;
          }
          .bento-card--a {
            grid-column: span 4;
          }
          .bento-card--b {
            grid-column: span 2;
          }
          .bento-card--c {
            grid-column: span 2;
          }
          .bento-card--d {
            grid-column: span 4;
          }
          .bento-card--e {
            grid-column: span 3;
          }
          .bento-card--f {
            grid-column: span 3;
          }
          .bento-card--g {
            grid-column: span 4;
          }
          .bento-card--h {
            grid-column: span 2;
          }
        }
        .bento-card:hover {
          border-color: rgba(27, 119, 242, 0.3) !important;
        }
      `}</style>
    </section>
  );
}
