"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, X } from "lucide-react";
import { fmtMoney, type Currency, type ServiceKind } from "@/lib/calculatorLogic";

const DM = "var(--font-dm-sans)";
const SYNE = "var(--font-syne)";

type InclusionsPanelProps = {
  service: ServiceKind;
  bpolytixFee: number;
  currency: Currency;
};

const WHAT_YOU_GET: Record<ServiceKind, string[]> = {
  bookkeeping: [
    "Dedicated finance specialist",
    "Xero licence included",
    "VAT returns",
    "Monthly reconciliation",
    "SARS compliance support",
    "Management accounts (if selected)",
  ],
  cfo: [
    "Fractional CFO / Financial Manager",
    "Monthly management accounts",
    "Board reporting (if selected)",
    "Cash flow forecasting",
    "SARS and regulatory compliance",
    "Investor/fundraising support (if selected)",
  ],
  automation: [
    "Custom workflow design",
    "Browser automation build",
    "Multi-platform integration",
    "Human review layer (if selected)",
    "Monthly maintenance",
    "Error monitoring and alerts",
  ],
  webapp: [
    "Full-stack development team",
    "UI/UX design included",
    "QA and testing",
    "Deployment and hosting setup",
    "30-day post-launch support",
    "Integration development (if selected)",
  ],
  androidapp: [
    "Android development team",
    "UI/UX design included",
    "Google Play submission",
    "QA and device testing",
    "30-day post-launch support",
    "Backend/API integration (if selected)",
  ],
};

const DONT_PAY_FOR = [
  "UIF / SDL contributions",
  "Office / desk cost",
  "Software licences",
  "Recruitment fees",
  "Leave cover",
  "Device / equipment",
  "Management overhead",
];

function Accordion({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between rounded-lg"
        style={{
          padding: "10px 12px",
          backgroundColor: "#1C2A3A",
          fontFamily: DM,
          fontSize: 13,
          color: "#F5F7FA",
          fontWeight: 500,
          textAlign: "left",
        }}
        aria-expanded={open}
      >
        <span>{title}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="inline-flex"
        >
          <ChevronDown size={16} color="#8892A4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div
              className="rounded-b-lg"
              style={{ backgroundColor: "#111F2E", padding: "10px 12px" }}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Bullet({
  type,
  children,
}: {
  type: "yes" | "no";
  children: ReactNode;
}) {
  const Icon = type === "yes" ? Check : X;
  const color = type === "yes" ? "#00D4AA" : "#FF4444";
  return (
    <div
      className="flex items-start gap-2"
      style={{
        padding: "5px 0",
        borderBottom: "0.5px solid #1E2D3D",
        fontFamily: DM,
        fontSize: 12,
        color: "#8892A4",
        lineHeight: 1.5,
      }}
    >
      <Icon size={12} color={color} className="mt-1 shrink-0" />
      <span>{children}</span>
    </div>
  );
}

export function InclusionsPanel({
  service,
  bpolytixFee,
  currency,
}: InclusionsPanelProps) {
  const isProject = service === "webapp" || service === "androidapp";
  const feeLabel = isProject ? "BPOLytix project fee" : "BPOLytix monthly fee";
  const items = WHAT_YOU_GET[service];

  return (
    <aside
      className="flex flex-col gap-3"
      style={{
        backgroundColor: "#111F2E",
        border: "1px solid #1E2D3D",
        borderRadius: 16,
        padding: 20,
      }}
    >
      <div
        style={{
          fontFamily: DM,
          fontSize: 12,
          color: "#8892A4",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: 4,
        }}
      >
        WHAT BPOLYTIX INCLUDES
      </div>

      <div className="flex flex-col gap-2">
        <Accordion title="What you get">
          {items.map((it) => (
            <Bullet key={it} type="yes">
              {it}
            </Bullet>
          ))}
        </Accordion>
        <Accordion title="What you don't pay for">
          {DONT_PAY_FOR.map((it) => (
            <Bullet key={it} type="no">
              {it}
            </Bullet>
          ))}
        </Accordion>
      </div>

      <div
        className="mt-2 flex items-baseline justify-between gap-2"
        style={{
          backgroundColor: "#1C2A3A",
          border: "1px solid #1E2D3D",
          borderRadius: 10,
          padding: 12,
        }}
      >
        <span style={{ fontFamily: DM, fontSize: 12, color: "#8892A4" }}>
          {feeLabel}
        </span>
        <span
          style={{
            fontFamily: SYNE,
            fontSize: 20,
            fontWeight: 700,
            color: "#1B77F2",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {fmtMoney(bpolytixFee, currency)}
          {!isProject && (
            <span
              style={{
                fontFamily: DM,
                fontSize: 12,
                color: "#8892A4",
                fontWeight: 400,
                marginLeft: 4,
              }}
            >
              /mo
            </span>
          )}
        </span>
      </div>

      <div
        style={{
          backgroundColor: "rgba(0,212,170,0.08)",
          borderRadius: 10,
          padding: 10,
          marginTop: 4,
        }}
      >
        <div
          style={{
            fontFamily: DM,
            fontSize: 12,
            color: "#00D4AA",
            fontWeight: 500,
          }}
        >
          No invoice until you're satisfied.
        </div>
        <div
          style={{
            fontFamily: DM,
            fontSize: 12,
            color: "#00D4AA",
            marginTop: 2,
          }}
        >
          You own it after 12 months.
        </div>
      </div>
    </aside>
  );
}
