"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
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
      className="rounded-2xl p-6"
      style={{
        backgroundColor: "#111F2E",
        border: "1px solid #1E2D3D",
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

/* ---------- Panel 1: Gauge ---------- */
function GaugePanel({ combined }: { combined: CombinedResults }) {
  const pct = Math.max(0, Math.min(100, combined.totalSavingPercent));
  const data = [{ name: "saving", value: pct, fill: "#00D4AA" }];
  return (
    <CardShell heading="SAVING OVERVIEW">
      <div className="relative mx-auto" style={{ width: 280, height: 160 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="100%"
            innerRadius="120%"
            outerRadius="180%"
            startAngle={180}
            endAngle={0}
            data={data}
            barSize={28}
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
              cornerRadius={14}
              fill="#00D4AA"
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end pb-1"
          style={{ textAlign: "center" }}
        >
          <div
            style={{
              fontFamily: SYNE,
              fontSize: 48,
              fontWeight: 700,
              color: "#00D4AA",
              lineHeight: 1,
            }}
          >
            {pct.toFixed(0)}%
          </div>
          <div
            className="mt-1"
            style={{
              fontFamily: DM,
              fontSize: 13,
              color: "#8892A4",
            }}
          >
            overall saving
          </div>
        </div>
      </div>
    </CardShell>
  );
}

/* ---------- Panel 2: Bar Chart ---------- */
function BarPanel({
  results,
  currency,
}: {
  results: AnyResult[];
  currency: Currency;
}) {
  const data = results.map((r, idx) => {
    const name = SERVICE_LABEL[r.service] ?? `Service ${idx + 1}`;
    const inHouse =
      r.kind === "monthly" ? r.inHouseMonthly * 12 : r.inHouseTotal;
    const bp = r.kind === "monthly" ? r.bpolytixFee * 12 : r.bpolytixFee;
    return {
      name,
      InHouse: Math.round(inHouse),
      BPOLytix: Math.round(bp),
      Saving: Math.round(inHouse - bp),
    };
  });

  const sym = symbol(currency);
  const height = Math.max(160, data.length * 80 + 60);

  return (
    <CardShell heading="COST COMPARISON" delay={0.1}>
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 4, right: 16, left: 8, bottom: 4 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1E2D3D" />
            <XAxis
              type="number"
              tickFormatter={(v: number) =>
                `${sym}${Math.round(v).toLocaleString("en-ZA")}`
              }
              tick={{ fontFamily: DM, fontSize: 12, fill: "#8892A4" }}
              stroke="#1E2D3D"
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontFamily: DM, fontSize: 13, fill: "#8892A4" }}
              stroke="#1E2D3D"
              width={130}
            />
            <Tooltip
              {...tooltipStyle()}
              formatter={(value: number, name: string) => [
                `${sym}${Math.round(value).toLocaleString("en-ZA")}`,
                name === "InHouse"
                  ? "In-house true cost"
                  : name === "BPOLytix"
                  ? "BPOLytix fee"
                  : "Saving",
              ]}
            />
            <Legend
              wrapperStyle={{
                fontFamily: DM,
                fontSize: 13,
                color: "#8892A4",
                paddingTop: 8,
              }}
              formatter={(value: string) => (
                <span style={{ color: "#8892A4" }}>
                  {value === "InHouse"
                    ? "In-house true cost"
                    : "BPOLytix fee"}
                </span>
              )}
            />
            <Bar
              dataKey="InHouse"
              fill="#8892A4"
              radius={[4, 4, 4, 4]}
              barSize={18}
            />
            <Bar
              dataKey="BPOLytix"
              fill="#1B77F2"
              radius={[4, 4, 4, 4]}
              barSize={18}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardShell>
  );
}

/* ---------- Panel 3: Donut ---------- */
function getBreakdownValue(
  r: AnyResult,
  labels: string[],
): number {
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
  const core = Math.max(0, totalAnnual - salary - seat);

  const slices = [
    { name: "Salary burden", value: Math.max(0, salary), color: "#1B77F2" },
    {
      name: "Seat & infrastructure",
      value: Math.max(0, seat),
      color: "#00D4AA",
    },
    { name: "Core rate differential", value: core, color: "#8892A4" },
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
                paddingAngle={1}
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

export function ResultsCharts({ results, combined, currency }: Props) {
  return (
    <div
      className="grid gap-4 lg:gap-5"
      style={{ gridTemplateColumns: "1fr" }}
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_2fr_1fr] lg:gap-5">
        <GaugePanel combined={combined} />
        <BarPanel results={results} currency={currency} />
        <DonutPanel
          results={results}
          combined={combined}
          currency={currency}
        />
      </div>
    </div>
  );
}
