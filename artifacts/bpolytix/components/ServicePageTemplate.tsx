"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GrainOverlay } from "./GrainOverlay";
import { Reveal } from "./Reveal";

export interface ServicePageTemplateProps {
  pillarLabel: string;
  serviceName: string;
  hookLine: string;
  description: string[];
  deliverables: { title: string; body: string }[];
  animatedVisual: ReactNode;
  pricing: { label: string; zar: string; gbp: string }[];
  ownershipLine?: string;
}

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export function ServicePageTemplate({
  pillarLabel,
  serviceName,
  hookLine,
  description,
  deliverables,
  animatedVisual,
  pricing,
  ownershipLine,
}: ServicePageTemplateProps) {
  return (
    <main style={{ backgroundColor: "#0A0F1A" }}>
      {/* ── 1. Hero ───────────────────────────────────────────────────── */}
      <section className="spt-hero relative overflow-hidden" style={{ backgroundColor: "#0A0F1A" }}>
        <GrainOverlay />
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-8">
          <Reveal>
            <p
              style={{
                color: "#8892A4",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "13px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              {pillarLabel}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1
              className="spt-hero-h1"
              style={{
                fontFamily: "var(--font-syne)",
                color: "#F5F7FA",
                fontWeight: 700,
                letterSpacing: "-0.022em",
                lineHeight: 1.05,
                maxWidth: "820px",
                marginBottom: "20px",
              }}
            >
              {serviceName}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p
              className="spt-hook"
              style={{
                fontFamily: "var(--font-dm-sans)",
                color: "#8892A4",
                lineHeight: 1.7,
                letterSpacing: "-0.011em",
                maxWidth: "600px",
                marginBottom: "40px",
              }}
            >
              {hookLine}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <Link href="/contact" className="spt-cta-btn spt-cta-glow">
              Talk to us
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── 2. What it is ─────────────────────────────────────────────── */}
      <section
        className="spt-section relative overflow-hidden"
        style={{ backgroundColor: "#0A0F1A", borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <GrainOverlay />
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-8">
          <Reveal>
            <p className="spt-section-label">What it is</p>
          </Reveal>
          <div style={{ maxWidth: "760px", display: "flex", flexDirection: "column", gap: "20px", marginTop: "24px" }}>
            {description.map((para, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p
                  className="spt-body"
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    color: "#F5F7FA",
                    lineHeight: 1.7,
                    letterSpacing: "-0.011em",
                  }}
                >
                  {para}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. What you get ───────────────────────────────────────────── */}
      <section
        className="spt-section relative overflow-hidden"
        style={{ backgroundColor: "#0F1622", borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <GrainOverlay />
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-8">
          <Reveal>
            <p className="spt-section-label">What you get</p>
          </Reveal>
          <div className="spt-bento">
            {deliverables.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
                whileHover={{ y: -4, transition: { duration: 0.2, ease: EASE } }}
                className="spt-bento-card"
                style={{
                  backgroundColor: "#1C2A3A",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                }}
              >
                <h3
                  className="spt-deliverable-title"
                  style={{
                    fontFamily: "var(--font-syne)",
                    color: "#F5F7FA",
                    fontWeight: 600,
                    lineHeight: 1.2,
                    marginBottom: "12px",
                  }}
                >
                  {d.title}
                </h3>
                <p
                  className="spt-deliverable-body"
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    color: "#8892A4",
                    lineHeight: 1.65,
                    letterSpacing: "-0.011em",
                  }}
                >
                  {d.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Animated visual ────────────────────────────────────────── */}
      <section
        className="spt-visual relative overflow-hidden"
        style={{ backgroundColor: "#0A0F1A", borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <GrainOverlay />
        <div className="relative z-10 w-full flex items-center justify-center spt-visual-inner">
          {animatedVisual}
        </div>
      </section>

      {/* ── 5. Pricing ────────────────────────────────────────────────── */}
      <section
        className="spt-section relative overflow-hidden"
        style={{ backgroundColor: "#0F1622", borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <GrainOverlay />
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-8">
          <Reveal>
            <p className="spt-section-label">Pricing</p>
            <div
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px",
                overflow: "hidden",
                marginTop: "24px",
              }}
            >
              {/* Header row */}
              <div
                className="spt-pricing-row"
                style={{
                  backgroundColor: "#1C2A3A",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="spt-col-label">
                  <span className="spt-col-head">Service</span>
                </div>
                <div className="spt-col-zar">
                  <span className="spt-col-head">ZAR</span>
                </div>
                <div className="spt-col-gbp">
                  <span className="spt-col-head">GBP</span>
                </div>
              </div>
              {/* Data rows */}
              {pricing.map((tier, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07, ease: EASE }}
                  className="spt-pricing-row"
                  style={{
                    backgroundColor: i % 2 === 0 ? "rgba(28,42,58,0.35)" : "transparent",
                    borderBottom: i < pricing.length - 1 ? "1px solid rgba(255,255,255,0.06)" : undefined,
                  }}
                >
                  <div className="spt-col-label">
                    <span className="spt-tier-label">{tier.label}</span>
                  </div>
                  <div className="spt-col-zar">
                    <span className="spt-tier-price" style={{ color: "#00D4AA" }}>{tier.zar}</span>
                  </div>
                  <div className="spt-col-gbp">
                    <span className="spt-tier-price" style={{ color: "#F5F7FA" }}>{tier.gbp}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            {ownershipLine && (
              <p
                className="spt-ownership"
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  color: "#00D4AA",
                  lineHeight: 1.6,
                  letterSpacing: "-0.011em",
                  marginTop: "16px",
                }}
              >
                {ownershipLine}
              </p>
            )}
          </Reveal>
        </div>
      </section>

      {/* ── 6. CTA strip ──────────────────────────────────────────────── */}
      <section
        className="spt-cta-strip relative overflow-hidden"
        style={{ backgroundColor: "#0F1622", borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <GrainOverlay />
        <div className="relative z-10 mx-auto max-w-[820px] px-6 sm:px-8 flex flex-col items-center text-center">
          <Reveal>
            <h2
              className="spt-cta-h2"
              style={{
                fontFamily: "var(--font-syne)",
                color: "#F5F7FA",
                fontWeight: 700,
                letterSpacing: "-0.022em",
                lineHeight: 1.05,
                marginBottom: "32px",
              }}
            >
              Ready to get started?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/contact" className="spt-cta-btn spt-cta-glow">
              Talk to us
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Styles ────────────────────────────────────────────────────── */}
      <style jsx>{`
        /* ─ Mobile base ─ */
        .spt-hero      { padding-top: 80px; padding-bottom: 80px; }
        .spt-section   { padding-top: 64px; padding-bottom: 72px; }
        .spt-cta-strip { padding-top: 64px; padding-bottom: 64px; }

        .spt-hero-h1   { font-size: 40px; }
        .spt-hook      { font-size: 16px; }
        .spt-body      { font-size: 16px; }
        .spt-cta-h2    { font-size: 28px; }

        .spt-section-label {
          font-family: var(--font-dm-sans);
          font-size: 13px;
          color: #8892A4;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 0;
        }

        /* ─ CTA button ─ */
        .spt-cta-btn {
          display: inline-block;
          padding: 13px 26px;
          font-size: 15px;
          font-family: var(--font-dm-sans);
          font-weight: 500;
          color: #ffffff;
          background-color: #1B77F2;
          border-radius: 9999px;
          text-decoration: none;
        }
        .spt-cta-glow {
          transition: box-shadow 0.2s ease, transform 0.16s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .spt-cta-glow:hover {
          box-shadow: 0 0 24px rgba(27,119,242,0.4);
          transform: translateY(-1px);
        }

        /* ─ Animated visual slot ─ */
        .spt-visual        { min-height: 400px; }
        .spt-visual-inner  { min-height: 400px; }

        /* ─ Bento grid (mobile: single col) ─ */
        .spt-bento {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
          margin-top: 32px;
        }
        .spt-bento-card    { padding: 24px; }
        .spt-deliverable-title { font-size: 16px; }
        .spt-deliverable-body  { font-size: 14px; }

        /* ─ Pricing table ─ */
        .spt-pricing-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          align-items: center;
        }
        .spt-col-label { padding: 14px 20px; }
        .spt-col-zar   {
          padding: 14px 20px;
          border-left: 1px solid rgba(255,255,255,0.08);
        }
        .spt-col-gbp   {
          padding: 14px 20px;
          border-left: 1px solid rgba(255,255,255,0.08);
        }
        .spt-col-head {
          font-family: var(--font-dm-sans);
          font-size: 11px;
          color: #8892A4;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 500;
        }
        .spt-tier-label {
          font-family: var(--font-dm-sans);
          font-size: 14px;
          line-height: 1.5;
        }
        .spt-tier-price {
          font-family: var(--font-syne);
          font-size: 15px;
          font-weight: 600;
        }
        .spt-ownership { font-size: 13px; }

        /* ─ Tablet 640px+ ─ */
        @media (min-width: 640px) {
          .spt-hero-h1 { font-size: 56px; }
          .spt-hook    { font-size: 18px; }
          .spt-body    { font-size: 17px; }
          .spt-cta-h2  { font-size: 36px; }
        }

        /* ─ Desktop 768px+ ─ */
        @media (min-width: 768px) {
          .spt-hero      { padding-top: 96px; padding-bottom: 96px; }
          .spt-section   { padding-top: 80px; padding-bottom: 96px; }
          .spt-cta-strip { padding-top: 80px; padding-bottom: 80px; }

          .spt-hero-h1 { font-size: 72px; }

          /* Asymmetric 2-col bento: left wider (7fr), right narrower (5fr) */
          .spt-bento {
            grid-template-columns: 7fr 5fr;
            gap: 16px;
          }
          .spt-bento-card    { padding: 28px 32px; }
          .spt-deliverable-title { font-size: 18px; }
          .spt-deliverable-body  { font-size: 15px; }

          .spt-tier-label { font-size: 15px; }
          .spt-tier-price { font-size: 16px; }
          .spt-ownership  { font-size: 14px; }
        }

        /* ─ Large desktop 1024px+ ─ */
        @media (min-width: 1024px) {
          .spt-hero      { padding-top: 128px; padding-bottom: 128px; }
          .spt-section   { padding-top: 96px; padding-bottom: 128px; }
          .spt-cta-strip { padding-top: 96px; padding-bottom: 96px; }

          .spt-hero-h1 { font-size: 80px; }
          .spt-cta-h2  { font-size: 48px; }

          .spt-bento { gap: 20px; }
          .spt-bento-card { padding: 32px 36px; }
        }
      `}</style>
    </main>
  );
}
