import { DrillDownPanel } from "../../../../bpolytix/components/calculator/DrillDownPanel";
import { InclusionsPanel } from "../../../../bpolytix/components/calculator/InclusionsPanel";
import type {
  AnyResult,
  Currency,
} from "../../../../bpolytix/lib/calculatorLogic";

const currency: Currency = "ZAR";

const bookkeepingResult: AnyResult = {
  kind: "monthly",
  service: "bookkeeping",
  inHouseMonthly: 33500,
  bpolytixFee: 14900,
  savingMonthly: 18600,
  savingPercent: 55.5,
  savingAnnual: 223200,
  feeTier: "Growth",
  feeSubline: "Growth bookkeeping — Xero, VAT, payroll, management accounts",
  breakdown: [
    { label: "Base salary", value: 15698 },
    { label: "Employer UIF (1%)", value: 156.98 },
    { label: "Employer SDL (1%)", value: 156.98 },
    { label: "Workspace / seat", value: 4100 },
    { label: "Software stack", value: 1045 },
    { label: "Device amortisation", value: 800 },
    { label: "Recruitment & onboarding", value: 1255.84 },
    { label: "Management overhead", value: 1569.8 },
  ],
};

const webappResult: AnyResult = {
  kind: "project",
  service: "webapp",
  inHouseTotal: 620000,
  bpolytixFee: 97000,
  savingTotal: 523000,
  savingPercent: 84.4,
  buildMonths: 4,
  retainerNote: "+ R8,500/month retainer",
  feeTier: "SaaS MVP",
  feeSubline: "Once-off project fee — full ownership transfer after 12 months",
  breakdown: [
    { label: "Loaded developer cost / month", value: 39000 },
    { label: "Build duration (months)", value: 4 },
    { label: "True in-house total", value: 156000 },
  ],
};

export default function CalculatorPanelsPreview() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0D1B2A",
        padding: "24px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          maxWidth: 880,
          margin: "0 auto",
        }}
      >
        <div>
          <div
            style={{
              color: "#8892A4",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 8,
            }}
          >
            Drill-down · Bookkeeping
          </div>
          <DrillDownPanel
            result={bookkeepingResult}
            currency={currency}
            service="bookkeeping"
          />
        </div>
        <div>
          <div
            style={{
              color: "#8892A4",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 8,
            }}
          >
            Inclusions · Bookkeeping
          </div>
          <InclusionsPanel
            service="bookkeeping"
            bpolytixFee={14900}
            currency={currency}
          />
        </div>
        <div>
          <div
            style={{
              color: "#8892A4",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 8,
            }}
          >
            Drill-down · Web App (project)
          </div>
          <DrillDownPanel
            result={webappResult}
            currency={currency}
            service="webapp"
          />
        </div>
        <div>
          <div
            style={{
              color: "#8892A4",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 8,
            }}
          >
            Inclusions · Web App
          </div>
          <InclusionsPanel
            service="webapp"
            bpolytixFee={97000}
            currency={currency}
          />
        </div>
      </div>
    </div>
  );
}
