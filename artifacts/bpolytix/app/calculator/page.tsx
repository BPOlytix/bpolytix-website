"use client";

import {
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  TrendingUp,
  Bot,
  Monitor,
  Smartphone,
  Check,
  Plus,
  ArrowRight,
  MessageCircle,
  Mail,
} from "lucide-react";
import { Stepper } from "@/components/calculator/Stepper";
import { ToggleSwitch } from "@/components/calculator/ToggleSwitch";
import { PillSelect } from "@/components/calculator/PillSelect";
import { MetricTile } from "@/components/calculator/MetricTile";
import { CostBreakdown } from "@/components/calculator/CostBreakdown";
import { DotGrid } from "@/components/calculator/DotGrid";
import { ResultsCharts } from "@/components/calculator/ResultsCharts";
import { DrillDownPanel } from "@/components/calculator/DrillDownPanel";
import { InclusionsPanel } from "@/components/calculator/InclusionsPanel";
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
  type ServiceKind,
  type BookkeepingInputs,
  type CFOInputs,
  type AutomationInputs,
  type WebAppInputs,
  type AndroidAppInputs,
} from "@/lib/calculatorLogic";
import { generateQuoteRef } from "@/lib/quoteRef";
import {
  INDUSTRIES,
  INDUSTRY_COPY,
  type Industry,
} from "@/lib/industryCopy";

const SYNE = "var(--font-syne)";
const DM = "var(--font-dm-sans)";

const SERVICES: {
  key: ServiceKind;
  label: string;
  short: string;
  icon: typeof BookOpen;
}[] = [
  {
    key: "bookkeeping",
    label: "Bookkeeping & Accounting",
    short: "Bookkeeping",
    icon: BookOpen,
  },
  {
    key: "cfo",
    label: "CFO-as-a-Service",
    short: "CFO",
    icon: TrendingUp,
  },
  {
    key: "automation",
    label: "AI Automation",
    short: "Automation",
    icon: Bot,
  },
  {
    key: "webapp",
    label: "Web App Development",
    short: "Web App",
    icon: Monitor,
  },
  {
    key: "androidapp",
    label: "Android App Development",
    short: "Android",
    icon: Smartphone,
  },
];

const SERVICE_LABEL: Record<ServiceKind, string> = {
  bookkeeping: "Bookkeeping & Accounting",
  cfo: "CFO-as-a-Service",
  automation: "AI Automation",
  webapp: "Web App Development",
  androidapp: "Android App Development",
};

const DEFAULTS = {
  bookkeeping: {
    role: "Bookkeeper",
    entities: 1,
    monthlyTransactions: 100,
    vatReturns: true,
    payrollEmployees: 5,
    managementAccounts: false,
  } as BookkeepingInputs,
  cfo: {
    currentSalary: 45000,
    entities: 1,
    boardReporting: false,
    fundraising: false,
  } as CFOInputs,
  automation: {
    manualHours: 100,
    workflows: 2,
    platforms: 3,
    humanReview: true,
    reworkHours: 10,
  } as AutomationInputs,
  webapp: {
    projectType: "Internal tool",
    buildMonths: 3,
    seniority: "Mid-level",
    integrations: false,
    maintenance: false,
  } as WebAppInputs,
  androidapp: {
    appType: "MVP / Prototype",
    buildMonths: 4,
    integrations: false,
    maintenance: false,
  } as AndroidAppInputs,
};

const WHATSAPP_NUMBER = "27781790363";

type ServiceRow = {
  key: ServiceKind;
  label: string;
  result: AnyResult;
};

type SavedInputs = {
  bookkeeping?: BookkeepingInputs;
  cfo?: CFOInputs;
  automation?: AutomationInputs;
  webapp?: WebAppInputs;
  androidapp?: AndroidAppInputs;
};

function computeFor(
  service: ServiceKind,
  inputs: SavedInputs,
  currency: Currency,
): AnyResult | null {
  switch (service) {
    case "bookkeeping":
      return inputs.bookkeeping
        ? calculateBookkeeping(inputs.bookkeeping, currency)
        : null;
    case "cfo":
      return inputs.cfo ? calculateCFO(inputs.cfo, currency) : null;
    case "automation":
      return inputs.automation
        ? calculateAutomation(inputs.automation, currency)
        : null;
    case "webapp":
      return inputs.webapp ? calculateWebApp(inputs.webapp, currency) : null;
    case "androidapp":
      return inputs.androidapp
        ? calculateAndroidApp(inputs.androidapp, currency)
        : null;
  }
}

function annualSavingOf(r: AnyResult): number {
  return r.kind === "monthly" ? r.savingAnnual : r.savingTotal;
}

function inHouseOf(r: AnyResult): number {
  return r.kind === "monthly" ? r.inHouseMonthly : r.inHouseTotal;
}

function savingOf(r: AnyResult): number {
  return r.kind === "monthly" ? r.savingMonthly : r.savingTotal;
}

export default function CalculatorPage() {
  /* ---------- core state ---------- */
  const [currency, setCurrency] = useState<Currency>("ZAR");
  const [activeService, setActiveService] =
    useState<ServiceKind>("bookkeeping");
  const [industry, setIndustry] = useState<Industry>("Professional Services");
  const [completedInputs, setCompletedInputs] = useState<SavedInputs>({});
  const [quoteRef, setQuoteRef] = useState<string>("");
  const [showQuote, setShowQuote] = useState(false);

  const [bk, setBk] = useState<BookkeepingInputs>(DEFAULTS.bookkeeping);
  const [cfo, setCfo] = useState<CFOInputs>(DEFAULTS.cfo);
  const [auto, setAuto] = useState<AutomationInputs>(DEFAULTS.automation);
  const [web, setWeb] = useState<WebAppInputs>(DEFAULTS.webapp);
  const [android, setAndroid] = useState<AndroidAppInputs>(
    DEFAULTS.androidapp,
  );

  useEffect(() => {
    setQuoteRef(generateQuoteRef());
  }, []);

  /* ---------- live result for active service ---------- */
  const liveResult: AnyResult = useMemo(() => {
    if (activeService === "bookkeeping")
      return calculateBookkeeping(bk, currency);
    if (activeService === "cfo") return calculateCFO(cfo, currency);
    if (activeService === "automation")
      return calculateAutomation(auto, currency);
    if (activeService === "webapp") return calculateWebApp(web, currency);
    return calculateAndroidApp(android, currency);
  }, [activeService, bk, cfo, auto, web, android, currency]);

  // Render gating: any service with positive in-house cost is "valid" — show
  // its charts/metrics/prompt bar even when current BPOLytix fee exceeds it.
  const isLiveValid =
    (liveResult.kind === "monthly"
      ? liveResult.inHouseMonthly
      : liveResult.inHouseTotal) > 0;

  /* ---------- effective rows for the quote (completed merged with live) ---------- */
  const completedKeys: ServiceKind[] = useMemo(() => {
    const out: ServiceKind[] = [];
    for (const s of SERVICES) {
      if (completedInputs[s.key]) out.push(s.key);
    }
    return out;
  }, [completedInputs]);

  const effectiveRows: ServiceRow[] = useMemo(() => {
    const order: ServiceKind[] = SERVICES.map((s) => s.key);
    const map = new Map<ServiceKind, AnyResult>();
    for (const k of order) {
      if (completedInputs[k]) {
        const r = computeFor(k, completedInputs, currency);
        if (r) map.set(k, r);
      }
    }
    if (isLiveValid && !map.has(activeService)) {
      map.set(activeService, liveResult);
    }
    return order
      .filter((k) => map.has(k))
      .map((k) => ({
        key: k,
        label: SERVICE_LABEL[k],
        result: map.get(k)!,
      }));
  }, [completedInputs, currency, activeService, liveResult, isLiveValid]);

  const combined = useMemo(() => {
    if (effectiveRows.length === 0) return null;
    return combineResults(effectiveRows.map((r) => r.result));
  }, [effectiveRows]);

  const totalAnnualSaving = useMemo(() => {
    return effectiveRows.reduce((acc, r) => acc + annualSavingOf(r.result), 0);
  }, [effectiveRows]);

  const sym = symbol(currency);

  /* ---------- prompt-bar / quote actions ---------- */
  const quoteCardRef = useRef<HTMLDivElement>(null);

  const currentInputsForActive = (): SavedInputs[ServiceKind] | undefined => {
    switch (activeService) {
      case "bookkeeping":
        return bk;
      case "cfo":
        return cfo;
      case "automation":
        return auto;
      case "webapp":
        return web;
      case "androidapp":
        return android;
    }
  };

  const saveActiveResult = () => {
    if (!isLiveValid) return;
    const snap = currentInputsForActive();
    if (!snap) return;
    setCompletedInputs((prev) => ({ ...prev, [activeService]: snap }));
  };

  const addAnotherService = () => {
    saveActiveResult();
    const done = new Set<ServiceKind>([
      ...completedKeys,
      ...(isLiveValid ? [activeService] : []),
    ]);
    const next = SERVICES.find((s) => !done.has(s.key));
    if (next) setActiveService(next.key);
  };

  const buildMyQuote = () => {
    saveActiveResult();
    setShowQuote(true);
    requestAnimationFrame(() => {
      quoteCardRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  /* ---------- email form ---------- */
  const [emailFormOpen, setEmailFormOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formCompany, setFormCompany] = useState("");
  const [submitState, setSubmitState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [submitError, setSubmitError] = useState<string>("");
  const [sentEmail, setSentEmail] = useState<string>("");

  const submitEmail = async (e: FormEvent) => {
    e.preventDefault();
    if (submitState === "submitting") return;
    setSubmitState("submitting");
    setSubmitError("");
    try {
      const payload = {
        name: formName.trim(),
        email: formEmail.trim(),
        company: formCompany.trim(),
        industry,
        quoteRef,
        date: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        currency,
        totalAnnualSaving,
        services: effectiveRows.map((r) => ({
          label: r.label,
          inHouse: inHouseOf(r.result),
          bpolytixFee: r.result.bpolytixFee,
          saving: savingOf(r.result),
          savingPercent: r.result.savingPercent,
          kind: r.result.kind,
        })),
      };
      const res = await fetch("/api/quote-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as {
        error?: string;
      };
      if (!res.ok) {
        setSubmitError(json.error || "Could not send your quote.");
        setSubmitState("error");
        return;
      }
      setSentEmail(formEmail.trim());
      setSubmitState("success");
    } catch {
      setSubmitError("Network error — please try again.");
      setSubmitState("error");
    }
  };

  const whatsappHref = useMemo(() => {
    const msg =
      `Hi BPOLytix, my quote ref is ${quoteRef || "BPQ-?"}. ` +
      `My estimated annual saving is ${fmtMoney(totalAnnualSaving, currency)}. ` +
      `Industry: ${industry}. I'd like to discuss further.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }, [quoteRef, totalAnnualSaving, currency, industry]);

  const todayStr = useMemo(
    () =>
      new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    [],
  );

  /* ---------- render ---------- */
  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "#0D1B2A", minHeight: "100vh" }}
    >
      <MinimalHero />

      <section
        className="px-4 pb-24 sm:px-6 lg:px-8"
        style={{ paddingTop: 24 }}
      >
        <div className="mx-auto" style={{ maxWidth: 1440 }}>
          {/* ========== CONFIGURATOR CARD ========== */}
          <div
            className="rounded-2xl"
            style={{
              backgroundColor: "#111F2E",
              border: "1px solid #1E2D3D",
              padding: "16px",
            }}
          >
            <div className="flex flex-col gap-5 sm:p-2 lg:p-2">
              {/* Step 01 — service pills */}
              <div className="flex flex-col gap-3">
                <div
                  style={{
                    fontFamily: DM,
                    fontSize: 12,
                    color: "#8892A4",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  01 — Select a service
                </div>
                <div
                  className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
                  style={{ scrollbarWidth: "none" }}
                >
                  {SERVICES.map((s) => {
                    const isActive = s.key === activeService;
                    const isCompleted = !!completedInputs[s.key];
                    const Icon = s.icon;
                    let bg = "#1C2A3A";
                    let color = "#8892A4";
                    let border = "1px solid #1E2D3D";
                    if (isCompleted) {
                      bg = "rgba(0,212,170,0.15)";
                      color = "#00D4AA";
                      border = "1px solid rgba(0,212,170,0.3)";
                    }
                    if (isActive) {
                      bg = "#1B77F2";
                      color = "#F5F7FA";
                      border = "1px solid transparent";
                    }
                    return (
                      <button
                        key={s.key}
                        type="button"
                        onClick={() => setActiveService(s.key)}
                        className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full transition-colors"
                        style={{
                          padding: "8px 16px",
                          fontFamily: DM,
                          fontSize: 13,
                          backgroundColor: bg,
                          color,
                          border,
                          fontWeight: isActive ? 500 : 400,
                        }}
                      >
                        {isCompleted && !isActive && (
                          <Check size={12} color="#00D4AA" strokeWidth={2.5} />
                        )}
                        <Icon size={14} color={color} />
                        <span>{s.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 02 — industry + currency */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex flex-col gap-2 sm:flex-1">
                  <div
                    style={{
                      fontFamily: DM,
                      fontSize: 12,
                      color: "#8892A4",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    02 — Your industry
                  </div>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value as Industry)}
                    className="w-full sm:max-w-[360px]"
                    style={{
                      backgroundColor: "#1C2A3A",
                      border: "1px solid #1E2D3D",
                      color: "#F5F7FA",
                      borderRadius: 8,
                      fontFamily: DM,
                      fontSize: 13,
                      padding: "10px 14px",
                      outline: "none",
                    }}
                  >
                    {INDUSTRIES.map((i) => (
                      <option
                        key={i}
                        value={i}
                        style={{ backgroundColor: "#1C2A3A", color: "#F5F7FA" }}
                      >
                        {i}
                      </option>
                    ))}
                  </select>
                </div>
                <CurrencyToggle value={currency} onChange={setCurrency} />
              </div>
            </div>
          </div>

          {/* ========== THREE-COLUMN LAYOUT ========== */}
          <div
            className="mt-6 grid gap-5"
            style={{
              gridTemplateColumns: "1fr",
            }}
          >
            <div
              className="grid gap-5"
              style={{
                gridTemplateColumns: "1fr",
              }}
            >
              <div className="lg:grid lg:grid-cols-[260px_1fr_260px] lg:gap-5">
                {/* LEFT PANEL */}
                <div className="hidden lg:block">
                  <div className="sticky" style={{ top: 24 }}>
                    <DrillDownPanel
                      result={liveResult}
                      currency={currency}
                      service={activeService}
                    />
                  </div>
                </div>

                {/* CENTRE COLUMN */}
                <div className="flex flex-col gap-6">
                  {showQuote && effectiveRows.length > 0 && (
                    <QuoteSummaryCard
                      ref={quoteCardRef}
                      rows={effectiveRows}
                      currency={currency}
                      industry={industry}
                      quoteRef={quoteRef}
                      todayStr={todayStr}
                      totalAnnualSaving={totalAnnualSaving}
                      onEmailClick={() => {
                        setEmailFormOpen(true);
                        setSubmitState("idle");
                        setSubmitError("");
                      }}
                      whatsappHref={whatsappHref}
                    />
                  )}

                  {/* INLINE EMAIL FORM */}
                  <AnimatePresence initial={false}>
                    {emailFormOpen && effectiveRows.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: 8, height: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: "hidden" }}
                      >
                        <EmailQuoteForm
                          state={submitState}
                          error={submitError}
                          name={formName}
                          email={formEmail}
                          company={formCompany}
                          quoteRef={quoteRef}
                          sentEmail={sentEmail}
                          onName={setFormName}
                          onEmail={setFormEmail}
                          onCompany={setFormCompany}
                          onSubmit={submitEmail}
                          onClose={() => setEmailFormOpen(false)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* ACTIVE CALCULATOR INPUTS + BREAKDOWN */}
                  <ActiveServicePanel
                    activeService={activeService}
                    bk={bk}
                    setBk={setBk}
                    cfo={cfo}
                    setCfo={setCfo}
                    auto={auto}
                    setAuto={setAuto}
                    web={web}
                    setWeb={setWeb}
                    android={android}
                    setAndroid={setAndroid}
                    result={liveResult}
                    currency={currency}
                    sym={sym}
                  />

                  {/* PROMPT BAR */}
                  <AnimatePresence initial={false}>
                    {isLiveValid && (
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col items-stretch gap-3 rounded-xl sm:flex-row sm:items-center sm:justify-between"
                        style={{
                          backgroundColor: "rgba(0,212,170,0.08)",
                          border: "1px solid rgba(0,212,170,0.2)",
                          padding: "12px 16px",
                        }}
                      >
                        <div
                          style={{
                            fontFamily: DM,
                            fontSize: 13,
                            color: "#00D4AA",
                            fontWeight: 500,
                          }}
                        >
                          {SERVICE_LABEL[activeService]} calculated. Add another
                          service or build your quote.
                        </div>
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                          <button
                            type="button"
                            onClick={addAnotherService}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-full transition-colors sm:w-auto"
                            style={{
                              fontFamily: DM,
                              fontSize: 13,
                              padding: "8px 16px",
                              minWidth: 160,
                              whiteSpace: "nowrap",
                              border: "1px solid #1E2D3D",
                              color: "#8892A4",
                              backgroundColor: "transparent",
                            }}
                          >
                            <Plus size={14} color="#8892A4" />
                            Add another service
                          </button>
                          <button
                            type="button"
                            onClick={buildMyQuote}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-full transition-transform hover:-translate-y-px sm:w-auto"
                            style={{
                              fontFamily: SYNE,
                              fontSize: 13,
                              fontWeight: 700,
                              padding: "9px 18px",
                              minWidth: 160,
                              whiteSpace: "nowrap",
                              backgroundColor: "#1B77F2",
                              color: "#F5F7FA",
                            }}
                          >
                            Build my full quote
                            <ArrowRight size={14} color="#F5F7FA" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* METRIC TILES */}
                  {combined && (
                    <MetricTilesRow
                      combined={combined}
                      liveResult={liveResult}
                      currency={currency}
                      sym={sym}
                    />
                  )}

                  {/* CHARTS */}
                  {combined && effectiveRows.length > 0 && (
                    <ResultsCharts
                      results={effectiveRows.map((r) => r.result)}
                      combined={combined}
                      currency={currency}
                      coreSalaryDiff={(() => {
                        const baseItem = liveResult.breakdown.find(
                          (b) => b.label === "Base salary",
                        );
                        const base = baseItem?.value || 0;
                        const basis =
                          base > 0
                            ? base
                            : liveResult.kind === "monthly"
                              ? liveResult.inHouseMonthly
                              : liveResult.inHouseTotal;
                        return basis > 0
                          ? Math.round(
                              ((basis - liveResult.bpolytixFee) / basis) * 100,
                            )
                          : 0;
                      })()}
                    />
                  )}
                </div>

                {/* RIGHT PANEL */}
                <div className="hidden lg:block">
                  <div className="sticky" style={{ top: 24 }}>
                    <InclusionsPanel
                      service={activeService}
                      bpolytixFee={liveResult.bpolytixFee}
                      currency={currency}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DISCLAIMER */}
          <p
            className="mx-auto mt-8 max-w-[760px] text-center"
            style={{
              fontFamily: DM,
              fontSize: 12,
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

// MINIMAL HERO
function MinimalHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#0D1B2A",
        minHeight: 160,
        maxHeight: 220,
        height: "clamp(160px, 24vw, 220px)",
      }}
    >
      <DotGrid />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative mx-auto flex h-full max-w-[1200px] flex-col items-center justify-center px-6 text-center"
        style={{ zIndex: 1 }}
      >
        <p
          style={{
            fontFamily: DM,
            fontSize: 12,
            color: "#8892A4",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            margin: 0,
          }}
        >
          COST CALCULATOR
        </p>
        <h1
          className="mt-2"
          style={{
            fontFamily: SYNE,
            fontSize: "clamp(28px, 4.4vw, 42px)",
            fontWeight: 700,
            color: "#F5F7FA",
            lineHeight: 1.05,
            letterSpacing: "-0.022em",
            margin: 0,
          }}
        >
          Calculate your true in-house cost.
        </h1>
      </motion.div>
    </section>
  );
}

// CURRENCY TOGGLE
function CurrencyToggle({
  value,
  onChange,
}: {
  value: Currency;
  onChange: (c: Currency) => void;
}) {
  return (
    <div
      className="inline-flex items-center gap-1 self-start rounded-full p-1 sm:self-auto"
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
            className="rounded-full transition-colors"
            style={{
              fontFamily: DM,
              fontSize: 13,
              padding: "6px 14px",
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

// ACTIVE SERVICE PANEL — inputs + breakdown + fee
function ActiveServicePanel({
  activeService,
  bk,
  setBk,
  cfo,
  setCfo,
  auto,
  setAuto,
  web,
  setWeb,
  android,
  setAndroid,
  result,
  currency,
  sym,
}: {
  activeService: ServiceKind;
  bk: BookkeepingInputs;
  setBk: (v: BookkeepingInputs) => void;
  cfo: CFOInputs;
  setCfo: (v: CFOInputs) => void;
  auto: AutomationInputs;
  setAuto: (v: AutomationInputs) => void;
  web: WebAppInputs;
  setWeb: (v: WebAppInputs) => void;
  android: AndroidAppInputs;
  setAndroid: (v: AndroidAppInputs) => void;
  result: AnyResult;
  currency: Currency;
  sym: string;
}) {
  const label = SERVICE_LABEL[activeService];
  return (
    <div
      className="rounded-2xl p-5 sm:p-6"
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
        {label}
      </div>

      <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="flex flex-col gap-5">
          {activeService === "bookkeeping" && (
            <BookkeepingInputsPanel value={bk} onChange={setBk} />
          )}
          {activeService === "cfo" && (
            <CFOInputsPanel value={cfo} onChange={setCfo} sym={sym} />
          )}
          {activeService === "automation" && (
            <AutomationInputsPanel value={auto} onChange={setAuto} />
          )}
          {activeService === "webapp" && (
            <WebAppInputsPanel value={web} onChange={setWeb} />
          )}
          {activeService === "androidapp" && (
            <AndroidInputsPanel value={android} onChange={setAndroid} />
          )}
        </div>

        <div className="flex flex-col gap-4">
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
            signature={`${activeService}-${result.kind}`}
          />

          <div
            className="rounded-xl p-5"
            style={{
              backgroundColor: "#111F2E",
              border: "1px solid #1E2D3D",
            }}
          >
            <div
              style={{
                fontFamily: SYNE,
                fontSize: 20,
                fontWeight: 700,
                color: "#1B77F2",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              BPOLytix equivalent: {fmtMoney(result.bpolytixFee, currency)}
              {result.kind === "monthly" ? "/month" : " once-off"}
            </div>
            {(result.feeTier || result.feeSubline) && (
              <div
                className="mt-2"
                style={{
                  fontFamily: DM,
                  fontSize: 13,
                  color: "#8892A4",
                  lineHeight: 1.5,
                }}
              >
                {result.feeTier && (
                  <span style={{ color: "#F5F7FA" }}>{result.feeTier}</span>
                )}
                {result.feeTier && result.feeSubline ? " — " : ""}
                {result.feeSubline}
              </div>
            )}
            {result.kind === "project" && result.retainerNote && (
              <div
                className="mt-2"
                style={{
                  fontFamily: DM,
                  fontSize: 12,
                  color: "#8892A4",
                }}
              >
                {result.retainerNote}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// METRIC TILES ROW
function MetricTilesRow({
  combined,
  liveResult,
  currency,
  sym,
}: {
  combined: NonNullable<ReturnType<typeof combineResults>>;
  liveResult: AnyResult;
  currency: Currency;
  sym: string;
}) {
  const monthlySaving =
    liveResult.kind === "monthly" ? liveResult.savingMonthly : 0;
  const annualSaving =
    combined.totalSavingAnnual + combined.totalProjectSaving;
  const baseSalaryItem = liveResult.breakdown.find(
    (b) => b.label === "Base salary",
  );
  const baseSalary = baseSalaryItem?.value || 0;
  // Spec: always render the X% value. When a Base salary line exists (monthly
  // services) use the salary-only differential; otherwise fall back to the
  // overall in-house vs BPOLytix differential so the sentence stays complete.
  const inHouseBasis =
    baseSalary > 0
      ? baseSalary
      : liveResult.kind === "monthly"
        ? liveResult.inHouseMonthly
        : liveResult.inHouseTotal;
  const corePct =
    inHouseBasis > 0
      ? Math.round(
          ((inHouseBasis - liveResult.bpolytixFee) / inHouseBasis) * 100,
        )
      : 0;

  return (
    <div className="flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-3">
        <MetricTile
          label="Monthly saving (active)"
          value={monthlySaving}
          prefix={sym}
        />
        <MetricTile
          label="Annual saving (combined)"
          value={annualSaving}
          prefix={sym}
        />
        <MetricTile
          label="Saving %"
          value={combined.totalSavingPercent}
          suffix="%"
          decimals={1}
        />
      </div>
      <div
        className="text-center"
        style={{
          fontFamily: DM,
          fontSize: 12,
          color: "#8892A4",
          fontStyle: "italic",
        }}
      >
        Full loaded cost basis. Core salary differential alone: {corePct}%.
      </div>
    </div>
  );
}

// QUOTE SUMMARY CARD
type QuoteSummaryProps = {
  rows: ServiceRow[];
  currency: Currency;
  industry: Industry;
  quoteRef: string;
  todayStr: string;
  totalAnnualSaving: number;
  onEmailClick: () => void;
  whatsappHref: string;
};

const QuoteSummaryCard = forwardRef<HTMLDivElement, QuoteSummaryProps>(
  function QuoteSummaryCard(
    {
      rows,
      currency,
      industry,
      quoteRef,
      todayStr,
      totalAnnualSaving,
      onEmailClick,
      whatsappHref,
    },
    ref,
  ) {
    const copy = INDUSTRY_COPY[industry];
    const roiVal = totalAnnualSaving * copy.roiMultiplier;

    // animated count-up for the headline number (animates from 0 on first appearance)
    const [displayed, setDisplayed] = useState(0);
    const fromRef = useRef(0);
    useEffect(() => {
      const from = fromRef.current;
      const to = totalAnnualSaving;
      if (from === to) return;
      const start = performance.now();
      const dur = 1200;
      let raf = 0;
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplayed(from + (to - from) * eased);
        if (t < 1) raf = requestAnimationFrame(step);
        else fromRef.current = to;
      };
      raf = requestAnimationFrame(step);
      return () => cancelAnimationFrame(raf);
    }, [totalAnnualSaving]);

    return (
      <div
        ref={ref}
        id="quote-summary"
        className="scroll-mt-24 rounded-2xl"
        style={{
          backgroundColor: "#111F2E",
          border: "1px solid #1E2D3D",
          padding: 24,
        }}
      >
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-baseline gap-3">
            <span
              style={{
                fontFamily: SYNE,
                fontSize: 16,
                fontWeight: 700,
                color: "#F5F7FA",
              }}
            >
              BPOLytix
            </span>
            <span
              style={{
                fontFamily: DM,
                fontSize: 12,
                color: "#8892A4",
              }}
            >
              Cost Analysis &amp; Quote
            </span>
          </div>
          <div className="flex flex-col items-start gap-0.5 sm:items-end">
            <span
              style={{
                fontFamily: DM,
                fontSize: 11,
                color: "#8892A4",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {quoteRef || "BPQ-…"} · {todayStr}
            </span>
            <span style={{ fontFamily: DM, fontSize: 11, color: "#1B77F2" }}>
              {industry}
            </span>
          </div>
        </div>

        {/* Per-service rows */}
        <div className="mt-5 flex flex-col">
          {rows.map((r, i) => {
            const sfx = r.result.kind === "monthly" ? "/mo" : " project";
            const inHouse = inHouseOf(r.result);
            const fee = r.result.bpolytixFee;
            const saving = savingOf(r.result);
            return (
              <div
                key={r.key}
                className="flex flex-col gap-2 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
                style={{
                  borderBottom:
                    i < rows.length - 1 ? "1px solid #1E2D3D" : "none",
                }}
              >
                <div className="flex flex-col gap-1">
                  <span
                    style={{
                      fontFamily: DM,
                      fontSize: 14,
                      fontWeight: 500,
                      color: "#F5F7FA",
                    }}
                  >
                    {r.label}
                  </span>
                  <span
                    style={{
                      fontFamily: DM,
                      fontSize: 12,
                      color: "#8892A4",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    In-house: {fmtMoney(inHouse, currency)}
                    {sfx} | BPOLytix: {fmtMoney(fee, currency)}
                    {sfx}
                  </span>
                </div>
                <div className="flex flex-col items-start gap-0.5 sm:items-end">
                  <span
                    style={{
                      fontFamily: SYNE,
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#00D4AA",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {fmtMoney(saving, currency)}
                    {sfx}
                  </span>
                  <span
                    style={{
                      fontFamily: DM,
                      fontSize: 11,
                      color: "#8892A4",
                    }}
                  >
                    {r.result.savingPercent.toFixed(0)}% saved
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Total */}
        <div
          className="mt-5 flex flex-col items-start gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
          style={{ borderTop: "1px solid #1E2D3D", paddingTop: 16 }}
        >
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
            {fmtMoney(displayed, currency)}
          </span>
        </div>

        {/* Reinvestment box */}
        <div
          className="mt-5 rounded-[10px]"
          style={{
            backgroundColor: "rgba(27,119,242,0.1)",
            border: "1px solid rgba(27,119,242,0.2)",
            padding: 12,
          }}
        >
          <div
            style={{ fontFamily: DM, fontSize: 13, color: "#8892A4" }}
          >
            {copy.reinvestLine}
          </div>
          <div
            className="mt-1"
            style={{
              fontFamily: DM,
              fontSize: 14,
              color: "#1B77F2",
              fontWeight: 500,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {fmtMoney(totalAnnualSaving, currency)} → potential{" "}
            {fmtMoney(roiVal, currency)} revenue impact in Year 1
          </div>
          <div
            className="mt-2"
            style={{
              fontFamily: DM,
              fontSize: 11,
              color: "#8892A4",
              fontStyle: "italic",
              lineHeight: 1.5,
            }}
          >
            {copy.sectorNote}
          </div>
        </div>

        {/* Compounding note */}
        <div
          className="mt-3 text-center"
          style={{
            fontFamily: DM,
            fontSize: 12,
            color: "#8892A4",
            fontStyle: "italic",
            border: "1px dashed #1E2D3D",
            borderRadius: 8,
            padding: 6,
            margin: "10px 0",
          }}
        >
          Compounding advantage: save → reinvest → grow → repeat
        </div>

        {/* Motto row */}
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <span style={{ fontFamily: DM, fontSize: 12, color: "#8892A4" }}>
            No invoice until you&apos;re satisfied.
          </span>
          <span style={{ fontFamily: DM, fontSize: 12, color: "#8892A4" }}>
            You own it after 12 months.
          </span>
        </div>

        {/* CTA row */}
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={onEmailClick}
            className="inline-flex items-center justify-center gap-2 rounded-full transition-transform hover:-translate-y-px"
            style={{
              fontFamily: SYNE,
              fontSize: 13,
              fontWeight: 700,
              padding: "10px 20px",
              backgroundColor: "#1B77F2",
              color: "#F5F7FA",
            }}
          >
            <Mail size={14} color="#F5F7FA" />
            Email me this quote
            <ArrowRight size={14} color="#F5F7FA" />
          </button>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full transition-colors"
            style={{
              fontFamily: SYNE,
              fontSize: 13,
              fontWeight: 700,
              padding: "10px 20px",
              backgroundColor: "transparent",
              border: "1px solid #1E2D3D",
              color: "#8892A4",
            }}
          >
            <MessageCircle size={14} color="#8892A4" />
            WhatsApp this result
            <ArrowRight size={14} color="#8892A4" />
          </a>
        </div>
      </div>
    );
  },
);

// EMAIL QUOTE FORM (inline)
function EmailQuoteForm({
  state,
  error,
  name,
  email,
  company,
  quoteRef,
  sentEmail,
  onName,
  onEmail,
  onCompany,
  onSubmit,
  onClose,
}: {
  state: "idle" | "submitting" | "success" | "error";
  error: string;
  name: string;
  email: string;
  company: string;
  quoteRef: string;
  sentEmail: string;
  onName: (v: string) => void;
  onEmail: (v: string) => void;
  onCompany: (v: string) => void;
  onSubmit: (e: FormEvent) => void;
  onClose: () => void;
}) {
  if (state === "success") {
    return (
      <div
        className="rounded-2xl"
        style={{
          backgroundColor: "#111F2E",
          border: "1px solid #1E2D3D",
          padding: 20,
        }}
      >
        <div
          style={{
            fontFamily: DM,
            fontSize: 14,
            color: "#00D4AA",
            lineHeight: 1.6,
          }}
        >
          Your quote has been sent to {sentEmail}. Quote ref: {quoteRef}. We&apos;ll
          be in touch within 1 business day.
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl"
      style={{
        backgroundColor: "#111F2E",
        border: "1px solid #1E2D3D",
        padding: 20,
      }}
    >
      <div className="flex items-center justify-between">
        <div
          style={{
            fontFamily: SYNE,
            fontSize: 14,
            color: "#8892A4",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            fontWeight: 600,
          }}
        >
          Email me this quote
        </div>
        <button
          type="button"
          onClick={onClose}
          style={{
            fontFamily: DM,
            fontSize: 12,
            color: "#8892A4",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <FormField
          label="First name"
          value={name}
          onChange={onName}
          required
          autoComplete="given-name"
        />
        <FormField
          label="Email address"
          type="email"
          value={email}
          onChange={onEmail}
          required
          autoComplete="email"
        />
        <FormField
          label="Company (optional)"
          value={company}
          onChange={onCompany}
          autoComplete="organization"
        />
      </div>

      {state === "error" && error && (
        <div
          className="mt-3"
          style={{
            fontFamily: DM,
            fontSize: 13,
            color: "#FF4444",
          }}
        >
          {error}
        </div>
      )}

      <div className="mt-4 flex items-center gap-3">
        <button
          type="submit"
          disabled={state === "submitting"}
          className="inline-flex items-center gap-2 rounded-full transition-transform hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
          style={{
            fontFamily: SYNE,
            fontSize: 13,
            fontWeight: 700,
            padding: "10px 20px",
            backgroundColor: "#1B77F2",
            color: "#F5F7FA",
          }}
        >
          {state === "submitting" ? "Sending…" : "Send my quote"}
          {state !== "submitting" && (
            <ArrowRight size={14} color="#F5F7FA" />
          )}
        </button>
        <span style={{ fontFamily: DM, fontSize: 12, color: "#8892A4" }}>
          Quote ref: {quoteRef || "BPQ-…"}
        </span>
      </div>
    </form>
  );
}

function FormField({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span style={{ fontFamily: DM, fontSize: 12, color: "#8892A4" }}>
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        autoComplete={autoComplete}
        style={{
          backgroundColor: "#1C2A3A",
          border: "1px solid #1E2D3D",
          color: "#F5F7FA",
          borderRadius: 8,
          fontFamily: DM,
          fontSize: 13,
          padding: "10px 12px",
          outline: "none",
        }}
      />
    </label>
  );
}

// PER-TAB INPUT PANELS
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
        options={["MVP / Prototype", "Business tool", "Consumer app"] as const}
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
