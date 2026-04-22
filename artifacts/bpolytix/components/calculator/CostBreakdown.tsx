"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Currency } from "@/lib/calculatorLogic";
import { fmtMoney } from "@/lib/calculatorLogic";

type CostBreakdownProps = {
  title?: string;
  items: { label: string; value: number }[];
  total: number;
  totalLabel: string;
  currency: Currency;
  signature: string;
};

export function CostBreakdown({
  title = "YOUR TRUE IN-HOUSE COST",
  items,
  total,
  totalLabel,
  currency,
  signature,
}: CostBreakdownProps) {
  return (
    <div
      className="flex flex-col gap-3 rounded-xl p-6"
      style={{
        backgroundColor: "#111F2E",
        border: "1px solid #1E2D3D",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-syne)",
          fontSize: 16,
          color: "#8892A4",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          fontWeight: 600,
        }}
      >
        {title}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={signature}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-1"
        >
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.35,
                delay: i * 0.05,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="flex items-baseline justify-between gap-3 py-1.5"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: 15,
                color: "#F5F7FA",
              }}
            >
              <span style={{ color: "#8892A4" }}>{item.label}</span>
              <span style={{ fontVariantNumeric: "tabular-nums" }}>
                {fmtMoney(item.value, currency)}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      <div
        className="mt-2 flex items-baseline justify-between gap-3 pt-3"
        style={{ borderTop: "1px solid #1E2D3D" }}
      >
        <span
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: 14,
            color: "#8892A4",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            fontWeight: 600,
          }}
        >
          {totalLabel}
        </span>
        <span
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: 18,
            fontWeight: 700,
            color: "#F5F7FA",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {fmtMoney(total, currency)}
        </span>
      </div>
    </div>
  );
}
