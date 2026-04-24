"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type CashflowChartProps = {
  country: "ZA" | "UK";
  monthlyBpolytix: number;
  monthlyInHouse: number;
  hasSelection: boolean;
};

type ChartPoint = {
  month: number;
  inHouse: number;
  bpolytix: number;
  savings: number;
};

function formatCurrency(value: number, country: "ZA" | "UK") {
  const symbol = country === "UK" ? "£" : "R";
  return `${symbol}${Math.round(value).toLocaleString("en-GB")}`;
}

function makeChartData(monthlyBpolytix: number, monthlyInHouse: number): ChartPoint[] {
  const maintenance = monthlyBpolytix > 0 ? monthlyBpolytix * 0.15 : 0;

  return Array.from({ length: 24 }, (_, index) => {
    const month = index + 1;
    const bpolytix = month <= 12 ? monthlyBpolytix : maintenance;
    const savings = Math.max(0, monthlyInHouse - bpolytix);

    return {
      month,
      inHouse: monthlyInHouse,
      bpolytix,
      savings,
    };
  });
}

function ChartTooltip({
  active,
  payload,
  label,
  country,
}: {
  active?: boolean;
  payload?: Array<{ dataKey?: string; value?: number }>;
  label?: number;
  country: "ZA" | "UK";
}) {
  if (!active || !payload?.length) return null;

  const inHouse = payload.find((entry) => entry.dataKey === "inHouse")?.value ?? 0;
  const bpolytix = payload.find((entry) => entry.dataKey === "bpolytix")?.value ?? 0;

  return (
    <div className="cashflow-tooltip">
      <strong>Month {label}</strong>
      <span>In-house: {formatCurrency(inHouse, country)}</span>
      <span>BPOLytix: {formatCurrency(bpolytix, country)}</span>
    </div>
  );
}

export function CashflowChart({ country, monthlyBpolytix, monthlyInHouse, hasSelection }: CashflowChartProps) {
  const data = makeChartData(monthlyBpolytix, monthlyInHouse);

  return (
    <div className="cashflow-card">
      <div className="cashflow-heading">
        <div>
          <p>Cashflow</p>
          <h2>Your cost curve</h2>
        </div>
        <span>Month 13: You own it</span>
      </div>
      <p className="cashflow-subtitle">What you spend with us vs what you'd spend in-house over 24 months</p>

      {hasSelection ? (
        <>
          <div className="chart-shell">
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={data} margin={{ top: 18, right: 18, left: 0, bottom: 6 }}>
                <CartesianGrid stroke="#1E2D3D" vertical={false} />
                <XAxis
                  dataKey="month"
                  stroke="#8892A4"
                  tickLine={false}
                  axisLine={{ stroke: "#1E2D3D" }}
                  tick={{ fill: "#8892A4", fontSize: 12 }}
                  tickFormatter={(month) => `M${month}`}
                />
                <YAxis
                  stroke="#8892A4"
                  tickLine={false}
                  axisLine={{ stroke: "#1E2D3D" }}
                  tick={{ fill: "#8892A4", fontSize: 12 }}
                  tickFormatter={(value) => formatCurrency(Number(value), country)}
                  width={72}
                />
                <Tooltip content={<ChartTooltip country={country} />} cursor={{ stroke: "#1E2D3D" }} />
                <Area type="monotone" dataKey="bpolytix" stackId="cost" stroke="none" fill="#0D1B2A" fillOpacity={0} />
                <Area type="monotone" dataKey="savings" stackId="cost" stroke="none" fill="#00D4AA" fillOpacity={0.15} />
                <Line
                  type="monotone"
                  dataKey="inHouse"
                  name="In-house cost"
                  stroke="#F5F7FA"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive
                />
                <Line
                  type="monotone"
                  dataKey="bpolytix"
                  name="BPOLytix cost"
                  stroke="#00D4AA"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive
                />
                <ReferenceLine
                  x={13}
                  stroke="#1E2D3D"
                  strokeDasharray="5 5"
                  label={{ value: "You own it", fill: "#00D4AA", position: "insideTopRight", fontSize: 12 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-legend">
            <span>
              <i className="legend-inhouse" />
              In-house cost
            </span>
            <span>
              <i className="legend-bpolytix" />
              BPOLytix cost
            </span>
            <span>
              <i className="legend-savings" />
              Savings area
            </span>
          </div>
        </>
      ) : (
        <div className="chart-empty">Pick a service to see your build</div>
      )}

      <style jsx global>{`
        .cashflow-card {
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          padding: 28px;
        }

        .cashflow-heading {
          display: flex;
          align-items: start;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 8px;
        }

        .cashflow-heading p {
          margin: 0 0 10px;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 13px;
          letter-spacing: 0.08em;
          line-height: 1.4;
          text-transform: uppercase;
        }

        .cashflow-heading h2 {
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 32px;
          font-weight: 700;
          letter-spacing: -0.022em;
          line-height: 1.05;
        }

        .cashflow-heading > span {
          display: inline-flex;
          min-height: 32px;
          align-items: center;
          padding: 0 12px;
          border: 1px solid #00D4AA;
          border-radius: 9999px;
          color: #00D4AA;
          font-family: var(--font-dm-sans);
          font-size: 13px;
          font-weight: 700;
          line-height: 1;
          white-space: nowrap;
        }

        .cashflow-subtitle {
          margin: 0 0 18px;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 16px;
          line-height: 1.7;
        }

        .chart-shell {
          height: 320px;
        }

        .chart-empty {
          display: flex;
          min-height: 320px;
          align-items: center;
          justify-content: center;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 16px;
          line-height: 1.7;
          text-align: center;
        }

        .cashflow-tooltip {
          display: flex;
          flex-direction: column;
          gap: 4px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          padding: 10px 12px;
          font-family: var(--font-dm-sans);
        }

        .cashflow-tooltip strong {
          color: #F5F7FA;
          font-size: 13px;
          line-height: 1.3;
        }

        .cashflow-tooltip span {
          color: #8892A4;
          font-size: 13px;
          line-height: 1.3;
        }

        .chart-legend {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 14px;
        }

        .chart-legend span {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 13px;
          line-height: 1.3;
        }

        .chart-legend i {
          display: inline-block;
          width: 22px;
          height: 2px;
          border-radius: 9999px;
        }

        .legend-inhouse {
          background-color: #F5F7FA;
        }

        .legend-bpolytix,
        .legend-savings {
          background-color: #00D4AA;
        }

        @media (max-width: 767px) {
          .cashflow-card {
            padding: 20px;
          }

          .cashflow-heading {
            flex-direction: column;
            gap: 12px;
          }

          .cashflow-heading h2 {
            font-size: 28px;
          }

          .chart-shell {
            height: 280px;
          }
        }
      `}</style>
    </div>
  );
}
