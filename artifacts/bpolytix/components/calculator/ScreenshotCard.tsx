"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  fmtMoney,
  reinvestmentCopy,
  type AnyResult,
  type CombinedResults,
  type Currency,
  FX_RATE,
} from "@/lib/calculatorLogic";

const SYNE = "var(--font-syne)";
const DM = "var(--font-dm-sans)";

const SERVICE_LABEL: Record<string, string> = {
  bookkeeping: "Bookkeeping & Accounting",
  cfo: "CFO-as-a-Service",
  automation: "AI Automation",
  webapp: "Web App Development",
  androidapp: "Android App Development",
};

type Props = {
  results: AnyResult[];
  combined: CombinedResults;
  currency: Currency;
};

export function ScreenshotCard({ results, combined, currency }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const totalAnnual =
    combined.totalSavingAnnual + combined.totalProjectSaving;

  // reinvestment copy thresholds are ZAR-based; convert back if GBP
  const annualZar =
    currency === "GBP" ? totalAnnual * FX_RATE : totalAnnual;
  const reinvest = reinvestmentCopy(annualZar);

  return (
    <div className="mt-8">
      <div
        className="mb-4"
        style={{
          fontFamily: SYNE,
          fontSize: 16,
          color: "#8892A4",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          fontWeight: 600,
        }}
      >
        YOUR RESULTS SUMMARY
      </div>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="rounded-2xl p-5 sm:p-8"
        style={{
          backgroundColor: "#111F2E",
          border: "1px solid #1E2D3D",
        }}
      >
        {/* Top row */}
        <div className="flex items-baseline justify-between gap-4">
          <div className="flex items-baseline gap-3">
            <span
              style={{
                fontFamily: SYNE,
                fontSize: 18,
                fontWeight: 700,
                color: "#F5F7FA",
                letterSpacing: "-0.022em",
              }}
            >
              BPOLytix
            </span>
            <span
              style={{
                fontFamily: DM,
                fontSize: 13,
                color: "#8892A4",
              }}
            >
              Cost Analysis
            </span>
          </div>
          <span
            style={{
              fontFamily: DM,
              fontSize: 13,
              color: "#8892A4",
            }}
          >
            {today}
          </span>
        </div>

        <hr
          style={{
            border: 0,
            borderTop: "1px solid #1E2D3D",
            margin: "20px 0",
          }}
        />

        {/* Per-service rows */}
        <div className="flex flex-col gap-4">
          {results.map((r, i) => {
            const inHouse =
              r.kind === "monthly" ? r.inHouseMonthly : r.inHouseTotal;
            const fee = r.bpolytixFee;
            const saving =
              r.kind === "monthly" ? r.savingMonthly : r.savingTotal;
            const suffix = r.kind === "monthly" ? "/mo" : " project";
            return (
              <div
                key={i}
                className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <span
                  style={{
                    fontFamily: DM,
                    fontSize: 15,
                    color: "#F5F7FA",
                  }}
                >
                  {SERVICE_LABEL[r.service] ?? r.service}
                </span>
                <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                  <span
                    style={{
                      fontFamily: DM,
                      fontSize: 14,
                      color: "#8892A4",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    In-house {fmtMoney(inHouse, currency)}
                    {suffix}
                  </span>
                  <span
                    style={{
                      fontFamily: DM,
                      fontSize: 14,
                      color: "#1B77F2",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    BPOLytix {fmtMoney(fee, currency)}
                    {suffix}
                  </span>
                  <span
                    style={{
                      fontFamily: DM,
                      fontSize: 14,
                      color: "#00D4AA",
                      fontWeight: 700,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    Save {fmtMoney(saving, currency)}
                    {suffix}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <hr
          style={{
            border: 0,
            borderTop: "1px solid #1E2D3D",
            margin: "20px 0",
          }}
        />

        {/* Combined total */}
        <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <span
            style={{
              fontFamily: SYNE,
              fontSize: 16,
              fontWeight: 700,
              color: "#F5F7FA",
            }}
          >
            Total annual saving
          </span>
          <span
            style={{
              fontFamily: SYNE,
              fontSize: 32,
              fontWeight: 700,
              color: "#00D4AA",
              fontVariantNumeric: "tabular-nums",
              lineHeight: 1.05,
            }}
          >
            {fmtMoney(totalAnnual, currency)}
          </span>
        </div>

        <p
          className="mt-4"
          style={{
            fontFamily: DM,
            fontSize: 14,
            color: "#8892A4",
            fontStyle: "italic",
            lineHeight: 1.6,
          }}
        >
          {reinvest}
        </p>

        <hr
          style={{
            border: 0,
            borderTop: "1px solid #1E2D3D",
            margin: "20px 0",
          }}
        />

        {/* Bottom row */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <span
            style={{
              fontFamily: DM,
              fontSize: 12,
              color: "#8892A4",
            }}
          >
            bpolytix.com/calculator
          </span>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-white transition-transform hover:-translate-y-px"
            style={{
              fontFamily: SYNE,
              fontSize: 13,
              fontWeight: 700,
              backgroundColor: "#1B77F2",
            }}
          >
            Get your tailored quote →
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
