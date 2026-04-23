"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Info } from "lucide-react";
import {
  fmtMoney,
  type AnyResult,
  type Currency,
  type ServiceKind,
} from "@/lib/calculatorLogic";

const DM = "var(--font-dm-sans)";
const SYNE = "var(--font-syne)";

type DrillDownPanelProps = {
  result: AnyResult;
  currency: Currency;
  service: ServiceKind;
};

type Item = { label: string; value: number; tooltip?: string };

function tooltipFor(label: string, service: ServiceKind): string {
  if (label === "Base salary") {
    switch (service) {
      case "bookkeeping":
        return "Indeed SA benchmark — R15,698/mo (Apr 2025)";
      case "cfo":
        return "User-entered current FM/CFO salary";
      case "automation":
        return "VA benchmark — R7,525/mo loaded to R105/hr";
      case "webapp":
        return "Indeed SA mid developer — R17,791/mo (Apr 2025)";
      case "androidapp":
        return "Indeed SA mobile dev — R43,946/mo (Apr 2025)";
    }
  }
  if (label === "Employer UIF (1%)")
    return "SARS mandatory — 1% employer contribution";
  if (label === "Employer SDL (1%)")
    return "SARS mandatory — 1% if annual payroll exceeds R500,000";
  if (label === "Workspace / seat")
    return "Cape Town coworking benchmark — Regus/WeWork 2025";
  if (label === "Software stack")
    return "Xero Standard R795 + Microsoft 365 Basic R112/mo";
  if (label === "Device amortisation")
    return "Laptop amortised over 36 months";
  if (label === "Recruitment & onboarding")
    return "SARA benchmark — 8% of annual salary (admin/finance)";
  if (label === "Management overhead")
    return "Industry standard — 10% of monthly salary cost";
  if (label === "Manual hours")
    return "Productive hours × loaded VA rate (R105/hr)";
  if (label === "Rework / error hours")
    return "Hours lost to rework or error correction, billed at the same loaded rate";
  if (label === "Loaded developer cost / month")
    return "Salary + employer UIF/SDL + workspace + software + device + recruitment + management, multiplied by 1.25 for team overhead";
  if (label === "Build duration (months)")
    return "Estimated months to deliver the build at the selected scope";
  if (label === "True in-house total")
    return "Loaded monthly cost × build duration — the full in-house cost of building this internally";
  return "Loaded cost component";
}

const STAFF_LABELS = new Set([
  "Base salary",
  "Employer UIF (1%)",
  "Employer SDL (1%)",
]);
const INFRA_LABELS = new Set([
  "Workspace / seat",
  "Software stack",
  "Device amortisation",
]);
const HIDDEN_LABELS = new Set([
  "Recruitment & onboarding",
  "Management overhead",
]);

function categorize(
  breakdown: { label: string; value: number }[],
  service: ServiceKind,
): { staff: Item[]; infra: Item[]; hidden: Item[] } {
  const staff: Item[] = [];
  const infra: Item[] = [];
  const hidden: Item[] = [];
  for (const b of breakdown) {
    const item: Item = {
      label: b.label,
      value: b.value,
      tooltip: tooltipFor(b.label, service),
    };
    if (STAFF_LABELS.has(b.label)) staff.push(item);
    else if (INFRA_LABELS.has(b.label)) infra.push(item);
    else if (HIDDEN_LABELS.has(b.label)) hidden.push(item);
    else staff.push(item);
  }
  return { staff, infra, hidden };
}

const EMPTY_HINT: Record<"staff" | "infra" | "hidden", string> = {
  staff: "Not applicable for this service.",
  infra: "Bundled into the BPOLytix fee — nothing for you to provision.",
  hidden: "No recruitment or management overhead with BPOLytix.",
};

function Tooltip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span
      className="relative ml-1 inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Info size={12} color="#8892A4" aria-hidden />
      <AnimatePresence>
        {open && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            role="tooltip"
            className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-1.5 -translate-x-1/2 whitespace-normal rounded-lg px-2.5 py-2"
            style={{
              backgroundColor: "#1C2A3A",
              border: "1px solid #1E2D3D",
              fontFamily: DM,
              fontSize: 11,
              color: "#8892A4",
              maxWidth: 200,
              minWidth: 140,
              lineHeight: 1.4,
            }}
          >
            {text}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

function LineRow({ item, currency }: { item: Item; currency: Currency }) {
  return (
    <div
      className="flex items-baseline justify-between gap-2"
      style={{
        padding: "5px 0",
        borderBottom: "0.5px solid #1E2D3D",
        fontFamily: DM,
        fontSize: 12,
      }}
    >
      <span className="flex items-center" style={{ color: "#8892A4" }}>
        {item.label}
        {item.tooltip && <Tooltip text={item.tooltip} />}
      </span>
      <span style={{ color: "#F5F7FA", fontWeight: 500, fontVariantNumeric: "tabular-nums" }}>
        {fmtMoney(item.value, currency)}
      </span>
    </div>
  );
}

function Subtotal({
  items,
  currency,
}: {
  items: Item[];
  currency: Currency;
}) {
  const total = items.reduce((acc, it) => acc + it.value, 0);
  return (
    <div
      className="mt-1 flex items-baseline justify-between gap-2"
      style={{
        padding: "6px 0 2px",
        fontFamily: DM,
        fontSize: 12,
        color: "#F5F7FA",
        fontWeight: 600,
      }}
    >
      <span>Subtotal</span>
      <span style={{ fontVariantNumeric: "tabular-nums" }}>
        {fmtMoney(total, currency)}
      </span>
    </div>
  );
}

function EmptyHint({ text }: { text: string }) {
  return (
    <div
      style={{
        fontFamily: DM,
        fontSize: 12,
        color: "#8892A4",
        fontStyle: "italic",
        padding: "4px 0",
        lineHeight: 1.5,
      }}
    >
      {text}
    </div>
  );
}

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
              style={{
                backgroundColor: "#111F2E",
                padding: "10px 12px",
              }}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function DrillDownPanel({
  result,
  currency,
  service,
}: DrillDownPanelProps) {
  const { staff, infra, hidden } = categorize(result.breakdown, service);
  const total =
    result.kind === "monthly" ? result.inHouseMonthly : result.inHouseTotal;
  const totalLabel =
    result.kind === "monthly"
      ? "Total true monthly cost"
      : "Total true project cost";

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
        YOUR TRUE IN-HOUSE COST
      </div>

      <div className="flex flex-col gap-2">
        <Accordion title="Staff cost">
          {staff.length > 0 ? (
            <>
              {staff.map((it) => (
                <LineRow key={it.label} item={it} currency={currency} />
              ))}
              <Subtotal items={staff} currency={currency} />
            </>
          ) : (
            <EmptyHint text={EMPTY_HINT.staff} />
          )}
        </Accordion>
        <Accordion title="Infrastructure">
          {infra.length > 0 ? (
            <>
              {infra.map((it) => (
                <LineRow key={it.label} item={it} currency={currency} />
              ))}
              <Subtotal items={infra} currency={currency} />
            </>
          ) : (
            <EmptyHint text={EMPTY_HINT.infra} />
          )}
        </Accordion>
        <Accordion title="Hidden costs">
          {hidden.length > 0 ? (
            <>
              {hidden.map((it) => (
                <LineRow key={it.label} item={it} currency={currency} />
              ))}
              <Subtotal items={hidden} currency={currency} />
            </>
          ) : (
            <EmptyHint text={EMPTY_HINT.hidden} />
          )}
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
        <span
          style={{
            fontFamily: DM,
            fontSize: 12,
            color: "#8892A4",
          }}
        >
          {totalLabel}
        </span>
        <span
          style={{
            fontFamily: SYNE,
            fontSize: 20,
            fontWeight: 700,
            color: "#FF4444",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {fmtMoney(total, currency)}
        </span>
      </div>
    </aside>
  );
}
