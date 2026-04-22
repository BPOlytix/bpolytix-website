"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  TrendingUp,
  Bot,
  Monitor,
  Smartphone,
  Plus,
  X,
} from "lucide-react";
import { Stepper } from "@/components/calculator/Stepper";
import { ToggleSwitch } from "@/components/calculator/ToggleSwitch";
import { PillSelect } from "@/components/calculator/PillSelect";
import { MetricTile } from "@/components/calculator/MetricTile";
import { CostBreakdown } from "@/components/calculator/CostBreakdown";
import { DotGrid } from "@/components/calculator/DotGrid";
import { ResultsCharts } from "@/components/calculator/ResultsCharts";
import { ScreenshotCard } from "@/components/calculator/ScreenshotCard";
import {
  calculateBookkeeping,
  calculateCFO,
  calculateAutomation,
  calculateWebApp,
  calculateAndroidApp,
  combineResults,
  fmtMoney,
  symbol,
  type Currency,
  type AnyResult,
  type BookkeepingInputs,
  type CFOInputs,
  type AutomationInputs,
  type WebAppInputs,
  type AndroidAppInputs,
} from "@/lib/calculatorLogic";

const SYNE = "var(--font-syne)";
const DM = "var(--font-dm-sans)";

type TabKey = "bookkeeping" | "cfo" | "automation" | "webapp" | "androidapp";

const TABS: { key: TabKey; label: string; icon: typeof BookOpen }[] = [
  { key: "bookkeeping", label: "Bookkeeping & Accounting", icon: BookOpen },
  { key: "cfo", label: "CFO-as-a-Service", icon: TrendingUp },
  { key: "automation", label: "AI Automation", icon: Bot },
  { key: "webapp", label: "Web App Dev", icon: Monitor },
  { key: "androidapp", label: "Android App Dev", icon: Smartphone },
];

const DEFAULTS: {
  bookkeeping: BookkeepingInputs;
  cfo: CFOInputs;
  automation: AutomationInputs;
  webapp: WebAppInputs;
  androidapp: AndroidAppInputs;
} = {
  bookkeeping: {
    role: "Bookkeeper",
    entities: 1,
    monthlyTransactions: 100,
    vatReturns: true,
    payrollEmployees: 5,
    managementAccounts: false,
  },
  cfo: {
    currentSalary: 45000,
    entities: 1,
    boardReporting: false,
    fundraising: false,
  },
  automation: {
    manualHours: 100,
    workflows: 2,
    platforms: 3,
    humanReview: true,
    reworkHours: 10,
  },
  webapp: {
    projectType: "Internal tool",
    buildMonths: 3,
    seniority: "Mid-level",
    integrations: false,
    maintenance: false,
  },
  androidapp: {
    appType: "MVP / Prototype",
    buildMonths: 4,
    integrations: false,
    maintenance: false,
  },
};

export default function CalculatorPage() {
  const [currency, setCurrency] = useState<Currency>("ZAR");
  const [activeTab, setActiveTab] = useState<TabKey>("bookkeeping");

  const [bk, setBk] = useState<BookkeepingInputs>(DEFAULTS.bookkeeping);
  const [cfo, setCfo] = useState<CFOInputs>(DEFAULTS.cfo);
  const [auto, setAuto] = useState<AutomationInputs>(DEFAULTS.automation);
  const [web, setWeb] = useState<WebAppInputs>(DEFAULTS.webapp);
  const [android, setAndroid] = useState<AndroidAppInputs>(DEFAULTS.androidapp);

  const [savedServices, setSavedServices] = useState<
    { id: string; tab: TabKey; result: AnyResult; label: string }[]
  >([]);

  const result: AnyResult = useMemo(() => {
    if (activeTab === "bookkeeping") return calculateBookkeeping(bk, currency);
    if (activeTab === "cfo") return calculateCFO(cfo, currency);
    if (activeTab === "automation") return calculateAutomation(auto, currency);
    if (activeTab === "webapp") return calculateWebApp(web, currency);
    return calculateAndroidApp(android, currency);
  }, [activeTab, bk, cfo, auto, web, android, currency]);

  const tabLabel = TABS.find((t) => t.key === activeTab)!.label;

  const addCurrentService = () => {
    if (savedServices.length >= 3) return;
    setSavedServices((prev) => [
      ...prev,
      {
        id: `${activeTab}-${Date.now()}`,
        tab: activeTab,
        result,
        label: tabLabel,
      },
    ]);
  };

  const removeService = (id: string) => {
    setSavedServices((prev) => prev.filter((s) => s.id !== id));
  };

  const combined = useMemo(() => {
    if (savedServices.length === 0) return null;
    return combineResults(savedServices.map((s) => s.result));
  }, [savedServices]);

  const sym = symbol(currency);

  return (
    <main style={{ background: "#0D1B2A", minHeight: "100vh" }}>
      <Hero />

      <section className="px-6 pb-24 sm:px-8" style={{ paddingTop: 24 }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-6 flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-between">
            <div
              style={{
                fontFamily: DM,
                fontSize: 13,
                color: "#8892A4",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Configure your scenario
            </div>
            <CurrencyToggle value={currency} onChange={setCurrency} />
          </div>

          {savedServices.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {savedServices.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center gap-2 rounded-full px-3 py-1.5"
                  style={{
                    backgroundColor: "#111F2E",
                    border: "1px solid #1B77F2",
                  }}
                >
                  <span
                    style={{
                      fontFamily: DM,
                      fontSize: 13,
                      color: "#F5F7FA",
                    }}
                  >
                    {s.label}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeService(s.id)}
                    aria-label={`Remove ${s.label}`}
                    className="flex h-5 w-5 items-center justify-center rounded-full transition-colors hover:bg-[#1E2D3D]"
                  >
                    <X size={12} color="#8892A4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <TabRow active={activeTab} onChange={setActiveTab} />

          <div
            className="mt-4 rounded-2xl p-5 sm:p-8"
            style={{
              backgroundColor: "#1C2A3A",
              border: "1px solid #1E2D3D",
            }}
          >
            <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
              <div className="flex flex-col gap-6">
                <div
                  style={{
                    fontFamily: SYNE,
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#F5F7FA",
                  }}
                >
                  {tabLabel}
                </div>
                {activeTab === "bookkeeping" && (
                  <BookkeepingInputsPanel value={bk} onChange={setBk} />
                )}
                {activeTab === "cfo" && (
                  <CFOInputsPanel value={cfo} onChange={setCfo} sym={sym} />
                )}
                {activeTab === "automation" && (
                  <AutomationInputsPanel value={auto} onChange={setAuto} />
                )}
                {activeTab === "webapp" && (
                  <WebAppInputsPanel value={web} onChange={setWeb} />
                )}
                {activeTab === "androidapp" && (
                  <AndroidInputsPanel value={android} onChange={setAndroid} />
                )}
              </div>

              <div className="flex flex-col gap-5">
                <CostBreakdown
                  items={result.breakdown}
                  total={
                    result.kind === "monthly"
                      ? result.inHouseMonthly
                      : result.inHouseTotal
                  }
                  totalLabel={
                    result.kind === "monthly"
                      ? "TOTAL TRUE MONTHLY COST"
                      : "TOTAL TRUE PROJECT COST"
                  }
                  currency={currency}
                  signature={`${activeTab}-${result.kind}`}
                />

                <FeeDisplay
                  amount={result.bpolytixFee}
                  currency={currency}
                  isMonthly={result.kind === "monthly"}
                  tier={result.feeTier}
                  subline={result.feeSubline}
                />
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {result.kind === "monthly" ? (
                <>
                  <MetricTile
                    label="Monthly saving"
                    value={result.savingMonthly}
                    prefix={sym}
                  />
                  <MetricTile
                    label="Annual saving"
                    value={result.savingAnnual}
                    prefix={sym}
                  />
                  <MetricTile
                    label="Saving %"
                    value={result.savingPercent}
                    suffix="%"
                    decimals={1}
                  />
                </>
              ) : (
                <>
                  <MetricTile
                    label="Project saving"
                    value={result.savingTotal}
                    prefix={sym}
                  />
                  <MetricTile
                    label="Build duration"
                    value={result.buildMonths}
                    suffix=" mo"
                  />
                  <MetricTile
                    label="Saving %"
                    value={result.savingPercent}
                    suffix="%"
                    decimals={1}
                  />
                </>
              )}
            </div>

            {result.kind === "project" && result.retainerNote && (
              <div
                className="mt-3 text-center"
                style={{ fontFamily: DM, fontSize: 13, color: "#8892A4" }}
              >
                {result.retainerNote}
              </div>
            )}

            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={addCurrentService}
                disabled={savedServices.length >= 3}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                style={{
                  fontFamily: DM,
                  fontSize: 14,
                  color: "#F5F7FA",
                  backgroundColor: "transparent",
                  border: "1px solid #1B77F2",
                }}
              >
                <Plus size={14} color="#1B77F2" />
                {savedServices.length >= 3
                  ? "Maximum 3 services combined"
                  : "Add another service"}
              </button>
            </div>
          </div>

          {combined && (
            <CombinedPanel
              combined={combined}
              services={savedServices}
              currency={currency}
            />
          )}

          {savedServices.length > 0 && combined && (
            <div id="results-charts" className="mt-8 flex flex-col gap-6">
              <ResultsCharts
                results={savedServices.map((s) => s.result)}
                combined={combined}
                currency={currency}
              />
              <ScreenshotCard
                results={savedServices.map((s) => s.result)}
                combined={combined}
                currency={currency}
              />
            </div>
          )}

          <p
            className="mx-auto mt-10 max-w-[760px] text-center"
            style={{
              fontFamily: DM,
              fontSize: 13,
              color: "#8892A4",
              lineHeight: 1.6,
            }}
          >
            Estimates based on published SA salary benchmarks (Indeed/PayScale
            2025), SARS statutory rates, and BPOLytix standard pricing. Actual
            costs vary by scope. Contact us for a tailored quote.
          </p>
        </div>
      </section>
    </main>
  );
}

function Hero() {
  return (
    <section
      className="relative overflow-hidden px-6 pt-20 pb-12 sm:px-8 sm:pt-28 sm:pb-16"
      style={{
        background: "#0D1B2A",
        minHeight: undefined,
      }}
    >
      <DotGrid />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative mx-auto max-w-[840px] text-center"
        style={{ zIndex: 1 }}
      >
        <p
          style={{
            fontFamily: DM,
            fontSize: 13,
            color: "#8892A4",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Cost Calculator
        </p>
        <h1
          style={{
            fontFamily: SYNE,
            fontWeight: 700,
            color: "#F5F7FA",
            lineHeight: 1.05,
            fontSize: "clamp(36px, 5.5vw, 52px)",
            marginTop: 16,
          }}
        >
          Calculate your true in-house cost.
        </h1>
        <p
          className="mx-auto mt-5 max-w-[640px]"
          style={{
            fontFamily: DM,
            fontSize: 18,
            color: "#8892A4",
            lineHeight: 1.6,
          }}
        >
          Most businesses underestimate what a role actually costs them. This
          calculator shows the full picture — then shows you what BPOLytix costs
          instead.
        </p>
      </motion.div>
    </section>
  );
}

function CurrencyToggle({
  value,
  onChange,
}: {
  value: Currency;
  onChange: (v: Currency) => void;
}) {
  return (
    <div
      className="inline-flex items-center gap-1 rounded-full p-1"
      style={{
        backgroundColor: "#111F2E",
        border: "1px solid #1E2D3D",
      }}
    >
      {(["ZAR", "GBP"] as const).map((c) => {
        const active = c === value;
        return (
          <button
            key={c}
            type="button"
            onClick={() => onChange(c)}
            className="rounded-full px-4 py-1.5 text-[13px] transition-colors"
            style={{
              fontFamily: DM,
              backgroundColor: active ? "#1B77F2" : "transparent",
              color: active ? "#FFFFFF" : "#8892A4",
              fontWeight: active ? 500 : 400,
            }}
          >
            {c === "ZAR" ? "ZAR (R)" : "GBP (£)"}
          </button>
        );
      })}
    </div>
  );
}

function TabRow({
  active,
  onChange,
}: {
  active: TabKey;
  onChange: (k: TabKey) => void;
}) {
  return (
    <div
      className="-mx-1 flex gap-1 overflow-x-auto rounded-xl p-1"
      style={{
        backgroundColor: "#111F2E",
        border: "1px solid #1E2D3D",
        scrollbarWidth: "none",
      }}
    >
      {TABS.map((t) => {
        const isActive = t.key === active;
        const Icon = t.icon;
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => onChange(t.key)}
            className="relative flex shrink-0 items-center gap-2 whitespace-nowrap px-4 py-3 transition-colors"
            style={{
              fontFamily: DM,
              fontSize: 13,
              color: isActive ? "#F5F7FA" : "#8892A4",
              borderBottom: isActive
                ? "2px solid #1B77F2"
                : "2px solid transparent",
            }}
          >
            <Icon size={16} color={isActive ? "#1B77F2" : "#8892A4"} />
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

function FeeDisplay({
  amount,
  currency,
  isMonthly,
  tier,
  subline,
}: {
  amount: number;
  currency: Currency;
  isMonthly: boolean;
  tier?: string;
  subline?: string;
}) {
  return (
    <div
      className="rounded-xl p-6"
      style={{
        backgroundColor: "#111F2E",
        border: "1px solid #1E2D3D",
      }}
    >
      <div
        style={{
          fontFamily: SYNE,
          fontSize: 22,
          fontWeight: 700,
          color: "#1B77F2",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        BPOLytix equivalent: {fmtMoney(amount, currency)}
        {isMonthly ? "/month" : " once-off"}
      </div>
      {(tier || subline) && (
        <div
          className="mt-2"
          style={{
            fontFamily: DM,
            fontSize: 14,
            color: "#8892A4",
            lineHeight: 1.5,
          }}
        >
          {tier && <span style={{ color: "#F5F7FA" }}>{tier}</span>}
          {tier && subline ? " — " : ""}
          {subline}
        </div>
      )}
    </div>
  );
}

function CombinedPanel({
  combined,
  services,
  currency,
}: {
  combined: ReturnType<typeof combineResults>;
  services: { id: string; label: string; result: AnyResult }[];
  currency: Currency;
}) {
  const sym = symbol(currency);
  return (
    <div
      className="mt-8 rounded-2xl p-6 sm:p-8"
      style={{
        backgroundColor: "#1C2A3A",
        border: "1px solid #1E2D3D",
      }}
    >
      <div
        style={{
          fontFamily: SYNE,
          fontSize: 20,
          fontWeight: 700,
          color: "#F5F7FA",
        }}
      >
        Combined scenario
      </div>
      <div
        className="mt-1"
        style={{ fontFamily: DM, fontSize: 14, color: "#8892A4" }}
      >
        {services.length} service{services.length === 1 ? "" : "s"} stacked
      </div>

      <div className="mt-5 flex flex-col divide-y" style={{ borderColor: "#1E2D3D" }}>
        {services.map((s) => (
          <div
            key={s.id}
            className="flex items-baseline justify-between gap-3 py-3"
            style={{ borderTopColor: "#1E2D3D" }}
          >
            <span
              style={{
                fontFamily: DM,
                fontSize: 14,
                color: "#F5F7FA",
              }}
            >
              {s.label}
            </span>
            <span
              style={{
                fontFamily: SYNE,
                fontSize: 16,
                fontWeight: 700,
                color: "#00D4AA",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {s.result.kind === "monthly"
                ? `${fmtMoney(s.result.savingMonthly, currency)}/mo`
                : `${fmtMoney(s.result.savingTotal, currency)} project`}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <MetricTile
          label="Combined monthly saving"
          value={combined.totalSavingMonthly}
          prefix={sym}
        />
        <MetricTile
          label="Combined annual saving"
          value={combined.totalSavingAnnual + combined.totalProjectSaving}
          prefix={sym}
        />
        <MetricTile
          label="Blended saving %"
          value={combined.totalSavingPercent}
          suffix="%"
          decimals={1}
        />
      </div>
    </div>
  );
}

/* ---------- Per-tab input panels ---------- */

function BookkeepingInputsPanel({
  value,
  onChange,
}: {
  value: BookkeepingInputs;
  onChange: (v: BookkeepingInputs) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <PillSelect
        label="Role type"
        value={value.role}
        options={["Bookkeeper", "Accountant", "Hybrid"] as const}
        onChange={(role) => onChange({ ...value, role })}
      />
      <Stepper
        label="Number of entities"
        value={value.entities}
        min={1}
        max={10}
        onChange={(entities) => onChange({ ...value, entities })}
      />
      <Stepper
        label="Monthly transactions"
        value={value.monthlyTransactions}
        min={50}
        max={2000}
        step={50}
        onChange={(monthlyTransactions) =>
          onChange({ ...value, monthlyTransactions })
        }
      />
      <ToggleSwitch
        label="VAT returns required"
        value={value.vatReturns}
        onChange={(vatReturns) => onChange({ ...value, vatReturns })}
      />
      <Stepper
        label="Payroll employees"
        value={value.payrollEmployees}
        min={0}
        max={200}
        onChange={(payrollEmployees) =>
          onChange({ ...value, payrollEmployees })
        }
      />
      <ToggleSwitch
        label="Management accounts required"
        value={value.managementAccounts}
        onChange={(managementAccounts) =>
          onChange({ ...value, managementAccounts })
        }
      />
    </div>
  );
}

function CFOInputsPanel({
  value,
  onChange,
  sym,
}: {
  value: CFOInputs;
  onChange: (v: CFOInputs) => void;
  sym: string;
}) {
  return (
    <div className="flex flex-col gap-5">
      <Stepper
        label="Current monthly CFO/FM salary (ZAR)"
        value={value.currentSalary}
        min={20000}
        max={150000}
        step={2500}
        format={(v) => `${sym}${v.toLocaleString("en-ZA")}`}
        onChange={(currentSalary) => onChange({ ...value, currentSalary })}
      />
      <Stepper
        label="Number of entities"
        value={value.entities}
        min={1}
        max={10}
        onChange={(entities) => onChange({ ...value, entities })}
      />
      <ToggleSwitch
        label="Board reporting required"
        value={value.boardReporting}
        onChange={(boardReporting) => onChange({ ...value, boardReporting })}
      />
      <ToggleSwitch
        label="Fundraising / investor support"
        value={value.fundraising}
        onChange={(fundraising) => onChange({ ...value, fundraising })}
      />
    </div>
  );
}

function AutomationInputsPanel({
  value,
  onChange,
}: {
  value: AutomationInputs;
  onChange: (v: AutomationInputs) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <Stepper
        label="Manual hours per month"
        value={value.manualHours}
        min={20}
        max={500}
        step={10}
        onChange={(manualHours) => onChange({ ...value, manualHours })}
      />
      <Stepper
        label="Number of workflows"
        value={value.workflows}
        min={1}
        max={20}
        onChange={(workflows) => onChange({ ...value, workflows })}
      />
      <Stepper
        label="Platforms / websites touched"
        value={value.platforms}
        min={1}
        max={15}
        onChange={(platforms) => onChange({ ...value, platforms })}
      />
      <ToggleSwitch
        label="Human review required"
        value={value.humanReview}
        onChange={(humanReview) => onChange({ ...value, humanReview })}
      />
      <Stepper
        label="Rework / error hours per month"
        value={value.reworkHours}
        min={0}
        max={100}
        step={5}
        onChange={(reworkHours) => onChange({ ...value, reworkHours })}
      />
    </div>
  );
}

function WebAppInputsPanel({
  value,
  onChange,
}: {
  value: WebAppInputs;
  onChange: (v: WebAppInputs) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <PillSelect
        label="Project type"
        value={value.projectType}
        options={
          [
            "Brochure site",
            "Internal tool",
            "Client-facing portal",
            "SaaS MVP",
          ] as const
        }
        onChange={(projectType) => onChange({ ...value, projectType })}
      />
      <Stepper
        label="Build duration (months)"
        value={value.buildMonths}
        min={1}
        max={12}
        onChange={(buildMonths) => onChange({ ...value, buildMonths })}
      />
      <PillSelect
        label="Developer seniority"
        value={value.seniority}
        options={["Junior", "Mid-level", "Senior"] as const}
        onChange={(seniority) => onChange({ ...value, seniority })}
      />
      <ToggleSwitch
        label="Integrations required"
        value={value.integrations}
        onChange={(integrations) => onChange({ ...value, integrations })}
      />
      <ToggleSwitch
        label="Ongoing maintenance after build"
        value={value.maintenance}
        onChange={(maintenance) => onChange({ ...value, maintenance })}
      />
    </div>
  );
}

function AndroidInputsPanel({
  value,
  onChange,
}: {
  value: AndroidAppInputs;
  onChange: (v: AndroidAppInputs) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <PillSelect
        label="App type"
        value={value.appType}
        options={
          ["MVP / Prototype", "Business tool", "Consumer app"] as const
        }
        onChange={(appType) => onChange({ ...value, appType })}
      />
      <Stepper
        label="Build duration (months)"
        value={value.buildMonths}
        min={2}
        max={18}
        onChange={(buildMonths) => onChange({ ...value, buildMonths })}
      />
      <ToggleSwitch
        label="Backend / API integrations"
        value={value.integrations}
        onChange={(integrations) => onChange({ ...value, integrations })}
      />
      <ToggleSwitch
        label="Ongoing maintenance after build"
        value={value.maintenance}
        onChange={(maintenance) => onChange({ ...value, maintenance })}
      />
    </div>
  );
}
