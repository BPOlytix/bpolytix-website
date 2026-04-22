"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bot, Globe2, Smartphone, Calculator,
  LineChart, Briefcase, FileText, Database, Globe, ArrowRight,
} from "lucide-react";
import { GrainOverlay } from "./GrainOverlay";

type ServiceItem = {
  icon: typeof Bot;
  title: string;
  desc: string;
  area: string;
  href?: string;
  badge?: string;
};

const SERVICES: ServiceItem[] = [
  { icon: Bot,        title: "AI Business Automation",   desc: "Custom workflows that replace repetitive manual processes.",        area: "ai"      },
  { icon: Globe2,     title: "Custom Web Applications",  desc: "SaaS tools built to your spec. You own them after Year 1.",        area: "web"     },
  { icon: Smartphone, title: "Android App Development",  desc: "Native Android apps scoped, built, and handed over.",              area: "android" },
  { icon: Calculator, title: "Bookkeeping & Accounting", desc: "Remote bookkeepers. No employment contracts. Cancel anytime.",      area: "books"   },
  { icon: LineChart,  title: "CFO-as-a-Service",         desc: "Senior financial oversight without a full-time salary.",           area: "cfo"     },
  { icon: Briefcase,  title: "Business Development",     desc: "Pipeline building, proposal writing, and market entry support.",   area: "biz"     },
  { icon: FileText,   title: "Business Plans & Funding", desc: "Investor-ready plans and funding applications that get read.",     area: "plans"   },
  { icon: Database,   title: "Xero Implementation",      desc: "Xero setup, custom reports, and bespoke Xero integrations.",      area: "xero"    },
  { icon: Globe,      title: "Website in 3 Days",        desc: "Brief us on Monday. Review your site on Thursday. Pay only when you're satisfied.", area: "site", href: "/website-in-3-days", badge: "New" },
];

const BASE_CARD = {
  backgroundColor: "#0F1622",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "12px",
};

export function ServicesBento() {
  return (
    <section
      className="bento-section relative overflow-hidden"
      style={{ backgroundColor: "#0A0F1A" }}
    >
      <GrainOverlay />
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-8">
        <p className="mb-4 text-[13px]" style={{ color: "#8892A4", fontFamily: "var(--font-dm-sans)" }}>
          Services
        </p>
        <h2
          className="bento-h2 max-w-[820px]"
          style={{
            fontFamily: "var(--font-syne)",
            color: "#F5F7FA",
            letterSpacing: "-0.022em",
            lineHeight: 1.0,
            fontWeight: 700,
          }}
        >
          Eight ways we replace your overhead.
        </h2>

        {/* Desktop bento with grid-template-areas */}
        <div className="bento-desktop">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            const inner = (
              <>
                {s.badge && (
                  <span
                    className="bento-badge"
                    style={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      backgroundColor: "rgba(0,212,170,0.15)",
                      color: "#00D4AA",
                      border: "1px solid rgba(0,212,170,0.35)",
                      borderRadius: "9999px",
                      padding: "3px 10px",
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                    }}
                  >
                    {s.badge}
                  </span>
                )}
                <div>
                  <Icon size={24} color="#1B77F2" strokeWidth={1.75} />
                  <h3 className="mt-6" style={{ fontFamily: "var(--font-syne)", fontSize: "20px", color: "#F5F7FA", lineHeight: 1.2, letterSpacing: "-0.022em", fontWeight: 600 }}>
                    {s.title}
                  </h3>
                </div>
                <p className="mt-4" style={{ fontFamily: "var(--font-dm-sans)", fontSize: "15px", color: "#8892A4", lineHeight: 1.6, letterSpacing: "-0.011em" }}>
                  {s.desc}
                </p>
              </>
            );
            const cardStyle: React.CSSProperties = {
              ...BASE_CARD,
              gridArea: s.area,
              padding: "32px",
              position: "relative",
            };
            return (
              <motion.div
                key={s.area}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="bento-card"
                style={cardStyle}
              >
                {s.href ? (
                  <Link href={s.href} className="flex h-full flex-col justify-between" style={{ color: "inherit", textDecoration: "none" }}>
                    {inner}
                  </Link>
                ) : (
                  <div className="flex h-full flex-col justify-between">{inner}</div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Mobile: stacked cards */}
        <div className="bento-mobile flex flex-col gap-3">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            const inner = (
              <>
                <div className="flex-none pt-0.5">
                  <Icon size={20} color="#1B77F2" strokeWidth={1.75} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 style={{ fontFamily: "var(--font-syne)", fontSize: "17px", color: "#F5F7FA", lineHeight: 1.2, letterSpacing: "-0.022em", fontWeight: 600 }}>
                      {s.title}
                    </h3>
                    {s.badge && (
                      <span
                        style={{
                          backgroundColor: "rgba(0,212,170,0.15)",
                          color: "#00D4AA",
                          border: "1px solid rgba(0,212,170,0.35)",
                          borderRadius: "9999px",
                          padding: "2px 8px",
                          fontFamily: "var(--font-dm-sans)",
                          fontSize: "10px",
                          fontWeight: 600,
                          letterSpacing: "0.04em",
                          textTransform: "uppercase",
                          flexShrink: 0,
                        }}
                      >
                        {s.badge}
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5" style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", color: "#8892A4", lineHeight: 1.6, letterSpacing: "-0.011em" }}>
                    {s.desc}
                  </p>
                </div>
              </>
            );
            return (
              <motion.div
                key={`m-${s.area}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: 0, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="bento-card"
                style={{ ...BASE_CARD, padding: "20px" }}
              >
                {s.href ? (
                  <Link href={s.href} className="flex items-start gap-4" style={{ color: "inherit", textDecoration: "none" }}>
                    {inner}
                  </Link>
                ) : (
                  <div className="flex items-start gap-4">{inner}</div>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 sm:mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-medium transition-colors hover:bg-white/10 sm:text-[15px]"
            style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "#F5F7FA" }}
          >
            See full service details
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <style jsx>{`
        /* Mobile */
        .bento-section { padding-top: 64px; padding-bottom: 72px; }
        .bento-h2 { font-size: 32px; margin-bottom: 40px; }
        .bento-desktop { display: none; }
        .bento-mobile  { display: flex; }

        /* Tablet */
        @media (min-width: 640px) {
          .bento-h2 { font-size: 40px; margin-bottom: 48px; }
        }

        /* Desktop bento with explicit grid-template-areas */
        @media (min-width: 1024px) {
          .bento-section { padding-top: 96px; padding-bottom: 128px; }
          .bento-h2 { font-size: 48px; margin-bottom: 64px; }
          .bento-desktop {
            display: grid;
            gap: 14px;
            grid-template-columns: repeat(12, 1fr);
            grid-template-rows: 280px 240px 260px 220px;
            grid-template-areas:
              "ai    ai    ai    ai    ai    web   web   web   web   android android android"
              "books books books books cfo   cfo   cfo   biz   biz   biz     biz     biz"
              "plans plans plans plans plans plans xero  xero  xero  xero    xero    xero"
              "site  site  site  site  site  site  site  site  site  site    site    site";
          }
          .bento-mobile { display: none; }
        }

        .bento-card {
          transition: transform 200ms ease, border-color 200ms ease;
        }
        .bento-card:hover {
          transform: translateY(-4px);
          border-color: rgba(27, 119, 242, 0.3) !important;
        }
      `}</style>
    </section>
  );
}
