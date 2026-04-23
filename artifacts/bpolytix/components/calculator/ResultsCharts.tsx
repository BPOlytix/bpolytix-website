"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import {
  fmtMoney,
  symbol,
  type AnyResult,
  type Currency,
  type CombinedResults,
} from "@/lib/calculatorLogic";

const SYNE = "var(--font-syne)";
const DM = "var(--font-dm-sans)";

const SERVICE_LABEL: Record<string, string> = {
  bookkeeping: "Bookkeeping",
  cfo: "CFO-as-a-Service",
  automation: "AI Automation",
  webapp: "Web App",
  androidapp: "Android App",
};

type Props = {
  results: AnyResult[];
  combined: CombinedResults;
  currency: Currency;
  coreSalaryDiff: number;
};

function CardShell({
  heading,
  children,
  delay = 0,
}: {
  heading: string;
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className="rounded-2xl"
      style={{
        backgroundColor: "#111F2E",
        border: "1px solid #1E2D3D",
        padding: "16px 20px",
      }}
    >
      <div
        className="mb-4"
        style={{
          fontFamily: SYNE,
          fontSize: 14,
          color: "#8892A4",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          fontWeight: 600,
        }}
      >
        {heading}
      </div>
      {children}
    </motion.div>
  );
}

function tooltipStyle() {
  return {
    contentStyle: {
      backgroundColor: "#1C2A3A",
      border: "1px solid #1E2D3D",
      borderRadius: 8,
      fontFamily: DM,
      fontSize: 13,
      color: "#F5F7FA",
    },
    labelStyle: { color: "#F5F7FA", fontFamily: DM, fontSize: 13 },
    itemStyle: { color: "#F5F7FA", fontFamily: DM, fontSize: 13 },
    cursor: { fill: "rgba(27,119,242,0.06)" },
  } as const;
}

// Panel 1: Gauge with centred % and info row beneath the arc.
function GaugePanel({
  combined,
  coreSalaryDiff,
}: {
  combined: CombinedResults;
  coreSalaryDiff: number;
}) {
  const pct = Math.max(0, Math.min(100, combined.totalSavingPercent));
  const data = [{ name: "saving", value: pct, fill: "#00D4AA" }];
  return (
    <CardShell heading="SAVING OVERVIEW">
      <div
        className="relative mx-auto"
        style={{ width: "100%", maxWidth: 280, height: 140 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="95%"
            innerRadius="140%"
            outerRadius="180%"
            startAngle={180}
            endAngle={0}
            data={data}
            barSize={22}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              background={{ fill: "#1E2D3D" }}
              dataKey="value"
              cornerRadius={12}
              fill="#00D4AA"
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div
          className="pointer-events-none absolute"
          style={{
            top: "60%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: SYNE,
              fontSize: 38,
              fontWeight: 700,
              color: "#00D4AA",
              lineHeight: 1,
            }}
          >
            {pct.toFixed(0)}%
          </div>
          <div
            style={{
              fontFamily: DM,
              fontSize: 11,
              color: "#8892A4",
              marginTop: 2,
            }}
          >
            overall saving
          </div>
        </div>
      </div>
      <div
        style={{
          height: 1,
          backgroundColor: "#1E2D3D",
          marginTop: 12,
        }}
      />
      <div
        style={{
          fontFamily: DM,
          fontSize: 12,
          color: "#8892A4",
          fontStyle: "italic",
          textAlign: "center",
          marginTop: 10,
        }}
      >
        Full loaded cost basis
      </div>
      <div
        style={{
          fontFamily: DM,
          fontSize: 11,
          color: "#8892A4",
          textAlign: "center",
          marginTop: 4,
        }}
      >
        Core salary differential: {coreSalaryDiff}%
      </div>
    </CardShell>
  );
}

// Panel 2: Custom animated horizontal bars (replaces Recharts BarChart).
function AnimatedBarsPanel({
  results,
  currency,
}: {
  results: AnyResult[];
  currency: Currency;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const sym = symbol(currency);

  const rows = results.map((r) => {
    const isMonthly = r.kind === "monthly";
    const inHouseCost = isMonthly ? r.inHouseMonthly : r.inHouseTotal;
    const bpolytixFee = r.bpolytixFee;
    const pct =
      inHouseCost > 0
        ? Math.min(100, (bpolytixFee / inHouseCost) * 100)
        : 0;
    const suffix = isMonthly ? "/mo" : " once-off";
    return {
      name: SERVICE_LABEL[r.service] ?? r.service,
      inHouseCost,
      bpolytixFee,
      pct,
      suffix,
    };
  });

  return (
    <CardShell heading="COST COMPARISON" delay={0.1}>
      <div ref={ref} className="flex flex-col" style={{ gap: 16 }}>
        {rows.map((row) => (
          <div key={row.name} className="flex flex-col">
            <div
              style={{
                fontFamily: DM,
                fontSize: 12,
                color: "#8892A4",
                marginBottom: 8,
              }}
            >
              {row.name}
            </div>
            <div className="flex items-center" style={{ marginBottom: 6 }}>
              <div
                style={{
                  fontFamily: DM,
                  fontSize: 11,
                  color: "#8892A4",
                  width: 70,
                  flexShrink: 0,
                }}
              >
                In-house
              </div>
              <div
                className="flex-1 overflow-hidden"
                style={{
                  height: 10,
                  backgroundColor: "#1E2D3D",
                  borderRadius: 5,
                }}
              >
                <motion.div
                  initial={{ width: "0%" }}
                  animate={inView ? { width: "100%" } : { width: "0%" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  style={{
                    height: "100%",
                    backgroundColor: "#8892A4",
                    borderRadius: 5,
                  }}
                />
              </div>
              <div
                style={{
                  fontFamily: DM,
                  fontSize: 11,
                  color: "#F5F7FA",
                  marginLeft: 8,
                  whiteSpace: "nowrap",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {sym}
                {Math.round(row.inHouseCost).toLocaleString("en-ZA")}
                {row.suffix}
              </div>
            </div>
            <div className="flex items-center">
              <div
                style={{
                  fontFamily: DM,
                  fontSize: 11,
                  color: "#1B77F2",
                  width: 70,
                  flexShrink: 0,
                }}
              >
                BPOLytix
              </div>
              <div
                className="flex-1 overflow-hidden"
                style={{
                  height: 10,
                  backgroundColor: "#1E2D3D",
                  borderRadius: 5,
                }}
              >
                <motion.div
                  initial={{ width: "0%" }}
                  animate={
                    inView ? { width: `${row.pct}%` } : { width: "0%" }
                  }
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  style={{
                    height: "100%",
                    background:
                      "linear-gradient(90deg, #1B77F2, #00D4AA)",
                    borderRadius: 5,
                  }}
                />
              </div>
              <div
                style={{
                  fontFamily: DM,
                  fontSize: 11,
                  color: "#1B77F2",
                  marginLeft: 8,
                  whiteSpace: "nowrap",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {sym}
                {Math.round(row.bpolytixFee).toLocaleString("en-ZA")}
                {row.suffix}
              </div>
            </div>
          </div>
        ))}

        <div
          className="flex items-center justify-center"
          style={{
            gap: 16,
            marginTop: 4,
            paddingTop: 12,
            borderTop: "1px solid #1E2D3D",
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: "#8892A4" }}
            />
            <span
              style={{ fontFamily: DM, fontSize: 11, color: "#8892A4" }}
            >
              In-house true cost
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: "#1B77F2" }}
            />
            <span
              style={{ fontFamily: DM, fontSize: 11, color: "#8892A4" }}
            >
              BPOLytix fee
            </span>
          </div>
        </div>
      </div>
    </CardShell>
  );
}

// Panel 3: Donut. Collapses to a single "Total project saving" slice when
// salary burden and seat/infrastructure breakdowns are absent (project
// services like Web App / Android App).
function getBreakdownValue(r: AnyResult, labels: string[]): number {
  let total = 0;
  for (const item of r.breakdown) {
    if (labels.some((l) => item.label.toLowerCase().includes(l))) {
      total += item.value;
    }
  }
  return total;
}

function DonutPanel({
  results,
  combined,
  currency,
}: {
  results: AnyResult[];
  combined: CombinedResults;
  currency: Currency;
}) {
  let salary = 0;
  let seat = 0;

  for (const r of results) {
    const annualMul = r.kind === "monthly" ? 12 : 1;
    salary +=
      getBreakdownValue(r, ["uif", "sdl", "recruitment", "management"]) *
      annualMul;
    seat +=
      getBreakdownValue(r, ["workspace", "software", "device"]) * annualMul;
  }

  const totalAnnual =
    combined.totalSavingAnnual + combined.totalProjectSaving;

  const allProject = salary <= 0 && seat <= 0;

  const slices = allProject
    ? [
        {
          name: "Total project saving",
          value: Math.max(0, totalAnnual),
          color: "#00D4AA",
        },
      ]
    : [
        { name: "Salary burden", value: Math.max(0, salary), color: "#1B77F2" },
        {
          name: "Seat & infrastructure",
          value: Math.max(0, seat),
          color: "#00D4AA",
        },
        {
          name: "Core rate differential",
          value: Math.max(0, totalAnnual - salary - seat),
          color: "#8892A4",
        },
      ].filter((s) => s.value > 0);

  return (
    <CardShell heading="WHERE THE SAVING COMES FROM" delay={0.2}>
      <div className="flex flex-col items-center">
        <div className="relative" style={{ width: 260, height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={slices}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                stroke="none"
                paddingAngle={slices.length > 1 ? 1 : 0}
                isAnimationActive
              >
                {slices.map((s) => (
                  <Cell key={s.name} fill={s.color} />
                ))}
              </Pie>
              <Tooltip
                {...tooltipStyle()}
                formatter={(value: number, name: string) => [
                  fmtMoney(value, currency),
                  name,
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <div
              style={{
                fontFamily: SYNE,
                fontSize: 22,
                fontWeight: 700,
                color: "#00D4AA",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {fmtMoney(totalAnnual, currency)}
            </div>
            <div
              className="mt-1"
              style={{ fontFamily: DM, fontSize: 12, color: "#8892A4" }}
            >
              annual saving
            </div>
          </div>
        </div>

        <div className="mt-4 flex w-full max-w-[260px] flex-col gap-2">
          {slices.map((s) => (
            <div
              key={s.name}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: s.color }}
                />
                <span
                  style={{
                    fontFamily: DM,
                    fontSize: 13,
                    color: "#8892A4",
                  }}
                >
                  {s.name}
                </span>
              </div>
              <span
                style={{
                  fontFamily: DM,
                  fontSize: 13,
                  color: "#F5F7FA",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {fmtMoney(s.value, currency)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </CardShell>
  );
}

export function ResultsCharts({
  results,
  combined,
  currency,
  coreSalaryDiff,
}: Props) {
  return (
    <div
      className="grid gap-4 lg:gap-5"
      style={{ gridTemplateColumns: "1fr" }}
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_2fr_1fr] lg:gap-5">
        <GaugePanel combined={combined} coreSalaryDiff={coreSalaryDiff} />
        <AnimatedBarsPanel results={results} currency={currency} />
        <DonutPanel
          results={results}
          combined={combined}
          currency={currency}
        />
      </div>
    </div>
  );
}
