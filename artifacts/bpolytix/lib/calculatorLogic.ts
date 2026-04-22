export type Currency = "ZAR" | "GBP";

export const FX_RATE = 22.5;

export function convert(zar: number, currency: Currency): number {
  return currency === "GBP" ? zar / FX_RATE : zar;
}

export function symbol(currency: Currency): string {
  return currency === "GBP" ? "£" : "R";
}

export function fmtMoney(value: number, currency: Currency, decimals = 0): string {
  const sym = symbol(currency);
  const rounded =
    decimals > 0
      ? value.toFixed(decimals)
      : Math.round(value).toLocaleString("en-ZA").replace(/,/g, ",");
  return `${sym}${rounded}`;
}

export type ServiceKind =
  | "bookkeeping"
  | "cfo"
  | "automation"
  | "webapp"
  | "androidapp";

export type MonthlyResult = {
  kind: "monthly";
  service: ServiceKind;
  inHouseMonthly: number;
  bpolytixFee: number;
  savingMonthly: number;
  savingPercent: number;
  savingAnnual: number;
  breakdown: { label: string; value: number }[];
  feeTier?: string;
  feeSubline?: string;
};

export type ProjectResult = {
  kind: "project";
  service: ServiceKind;
  inHouseTotal: number;
  bpolytixFee: number;
  savingTotal: number;
  savingPercent: number;
  breakdown: { label: string; value: number }[];
  buildMonths: number;
  retainerNote?: string;
  feeTier?: string;
  feeSubline?: string;
};

export type AnyResult = MonthlyResult | ProjectResult;

export type BookkeepingInputs = {
  role: "Bookkeeper" | "Accountant" | "Hybrid";
  entities: number;
  monthlyTransactions: number;
  vatReturns: boolean;
  payrollEmployees: number;
  managementAccounts: boolean;
};

export type CFOInputs = {
  currentSalary: number;
  entities: number;
  boardReporting: boolean;
  fundraising: boolean;
};

export type AutomationInputs = {
  manualHours: number;
  workflows: number;
  platforms: number;
  humanReview: boolean;
  reworkHours: number;
};

export type WebAppInputs = {
  projectType: "Brochure site" | "Internal tool" | "Client-facing portal" | "SaaS MVP";
  buildMonths: number;
  seniority: "Junior" | "Mid-level" | "Senior";
  integrations: boolean;
  maintenance: boolean;
};

export type AndroidAppInputs = {
  appType: "MVP / Prototype" | "Business tool" | "Consumer app";
  buildMonths: number;
  integrations: boolean;
  maintenance: boolean;
};

function toMonthlyResult(
  service: ServiceKind,
  inHouseMonthlyZar: number,
  bpolytixFeeZar: number,
  breakdownZar: { label: string; value: number }[],
  currency: Currency,
  feeTier?: string,
  feeSubline?: string,
): MonthlyResult {
  const inHouseMonthly = convert(inHouseMonthlyZar, currency);
  const bpolytixFee = convert(bpolytixFeeZar, currency);
  const savingMonthly = inHouseMonthly - bpolytixFee;
  const savingPercent =
    inHouseMonthly > 0 ? (savingMonthly / inHouseMonthly) * 100 : 0;
  return {
    kind: "monthly",
    service,
    inHouseMonthly,
    bpolytixFee,
    savingMonthly,
    savingPercent,
    savingAnnual: savingMonthly * 12,
    breakdown: breakdownZar.map((b) => ({
      label: b.label,
      value: convert(b.value, currency),
    })),
    feeTier,
    feeSubline,
  };
}

function toProjectResult(
  service: ServiceKind,
  inHouseTotalZar: number,
  bpolytixFeeZar: number,
  breakdownZar: { label: string; value: number }[],
  buildMonths: number,
  currency: Currency,
  retainerNote?: string,
  feeTier?: string,
  feeSubline?: string,
): ProjectResult {
  const inHouseTotal = convert(inHouseTotalZar, currency);
  const bpolytixFee = convert(bpolytixFeeZar, currency);
  const savingTotal = inHouseTotal - bpolytixFee;
  const savingPercent =
    inHouseTotal > 0 ? (savingTotal / inHouseTotal) * 100 : 0;
  return {
    kind: "project",
    service,
    inHouseTotal,
    bpolytixFee,
    savingTotal,
    savingPercent,
    breakdown: breakdownZar.map((b) => ({
      label: b.label,
      value: convert(b.value, currency),
    })),
    buildMonths,
    retainerNote,
    feeTier,
    feeSubline,
  };
}

export function calculateBookkeeping(
  i: BookkeepingInputs,
  currency: Currency,
): MonthlyResult {
  const baseSalary =
    i.role === "Bookkeeper" ? 15698 : i.role === "Accountant" ? 24748 : 20000;

  const uif = baseSalary * 0.01;
  const sdl = baseSalary * 0.01;
  const seat = 4100;
  const software = 1045;
  const device = 800;
  const recruitment = baseSalary * 0.08;
  const management = baseSalary * 0.10;

  const inHouseMonthly =
    baseSalary + uif + sdl + seat + software + device + recruitment + management;

  let bpolytixFee = 0;
  let tier = "";
  let subline = "";
  if (i.monthlyTransactions <= 150 && !i.managementAccounts) {
    bpolytixFee = 8500;
    tier = "Starter";
    subline = "Starter bookkeeping — includes Xero, VAT returns, monthly reconciliation";
  } else if (i.monthlyTransactions <= 500 || i.managementAccounts) {
    bpolytixFee = 14900;
    tier = "Growth";
    subline = "Growth bookkeeping — Xero, VAT, payroll, management accounts";
  } else {
    bpolytixFee = 21500;
    tier = "Full";
    subline = "Full finance function — bookkeeping, payroll, VAT, management accounts";
  }

  if (i.role === "Accountant") bpolytixFee += 3000;
  if (i.vatReturns) bpolytixFee += 1200;
  if (i.payrollEmployees > 10) bpolytixFee += 800;

  const breakdown = [
    { label: "Base salary", value: baseSalary },
    { label: "Employer UIF (1%)", value: uif },
    { label: "Employer SDL (1%)", value: sdl },
    { label: "Workspace / seat", value: seat },
    { label: "Software stack", value: software },
    { label: "Device amortisation", value: device },
    { label: "Recruitment & onboarding", value: recruitment },
    { label: "Management overhead", value: management },
  ];

  return toMonthlyResult(
    "bookkeeping",
    inHouseMonthly,
    bpolytixFee,
    breakdown,
    currency,
    tier,
    subline,
  );
}

export function calculateCFO(i: CFOInputs, currency: Currency): MonthlyResult {
  const baseSalary = i.currentSalary;
  const uif = baseSalary * 0.01;
  const sdl = baseSalary * 0.01;
  const seat = 4100;
  const software = 1500;
  const device = 1500;
  const recruitment = baseSalary * 0.08;
  const management = baseSalary * 0.10;

  const inHouseMonthly =
    baseSalary + uif + sdl + seat + software + device + recruitment + management;

  let bpolytixFee = 18500;
  if (i.boardReporting) bpolytixFee += 3500;
  if (i.fundraising) bpolytixFee += 5000;
  if (i.entities > 3) bpolytixFee += (i.entities - 3) * 2000;

  const breakdown = [
    { label: "Base salary", value: baseSalary },
    { label: "Employer UIF (1%)", value: uif },
    { label: "Employer SDL (1%)", value: sdl },
    { label: "Workspace / seat", value: seat },
    { label: "Software stack", value: software },
    { label: "Device amortisation", value: device },
    { label: "Recruitment & onboarding", value: recruitment },
    { label: "Management overhead", value: management },
  ];

  return toMonthlyResult(
    "cfo",
    inHouseMonthly,
    bpolytixFee,
    breakdown,
    currency,
    "CFO-as-a-Service",
    "Fractional CFO — strategy, reporting, board-ready financials",
  );
}

export function calculateAutomation(
  i: AutomationInputs,
  currency: Currency,
): MonthlyResult {
  const loadedHourlyRate = 105;
  const productiveHours = i.manualHours + i.reworkHours;
  const inHouseMonthly = productiveHours * loadedHourlyRate;

  let bpolytixFee = 0;
  let tier = "";
  if (i.workflows <= 1) {
    bpolytixFee = 8500;
    tier = "Single workflow";
  } else if (i.workflows <= 4) {
    bpolytixFee = 18500;
    tier = "Multi-workflow";
  } else {
    bpolytixFee = 32000;
    tier = "Enterprise automation";
  }
  if (i.humanReview) bpolytixFee += 2500;
  if (i.platforms > 5) bpolytixFee += (i.platforms - 5) * 1000;

  const breakdown = [
    { label: "Manual hours", value: i.manualHours * loadedHourlyRate },
    { label: "Rework / error hours", value: i.reworkHours * loadedHourlyRate },
  ];

  return toMonthlyResult(
    "automation",
    inHouseMonthly,
    bpolytixFee,
    breakdown,
    currency,
    tier,
    "AI browser automation — hands-off workflow execution",
  );
}

export function calculateWebApp(
  i: WebAppInputs,
  currency: Currency,
): ProjectResult {
  const baseSalary =
    i.seniority === "Junior" ? 20841 : i.seniority === "Senior" ? 33389 : 17791;
  const uif = baseSalary * 0.01;
  const sdl = baseSalary * 0.01;
  const seat = 4100;
  const software = 1500;
  const device = 1800;
  const recruitment = baseSalary * 0.10;
  const management = baseSalary * 0.15;

  const loadedMonthly =
    baseSalary + uif + sdl + seat + software + device + recruitment + management;
  const teamMultiplier = 1.25;
  const trueMonthly = loadedMonthly * teamMultiplier;
  const inHouseTotal = trueMonthly * i.buildMonths;

  let bpolytixFee = 0;
  let tier = "";
  if (i.projectType === "Brochure site") {
    bpolytixFee = 26500;
    tier = "Brochure site";
  } else if (i.projectType === "Internal tool") {
    bpolytixFee = 65000;
    tier = "Internal tool";
  } else if (i.projectType === "Client-facing portal") {
    bpolytixFee = 79000;
    tier = "Client-facing portal";
  } else {
    bpolytixFee = 85000;
    tier = "SaaS MVP";
  }
  if (i.integrations) bpolytixFee += 12000;

  const retainerNote = i.maintenance
    ? `+ ${symbol(currency)}${Math.round(convert(8500, currency)).toLocaleString("en-ZA")}/month retainer`
    : undefined;

  const breakdown = [
    { label: "Loaded developer cost / month", value: trueMonthly },
    { label: "Build duration (months)", value: i.buildMonths },
    { label: "True in-house total", value: inHouseTotal },
  ];

  return toProjectResult(
    "webapp",
    inHouseTotal,
    bpolytixFee,
    breakdown,
    i.buildMonths,
    currency,
    retainerNote,
    tier,
    "Once-off project fee — full ownership transfer after 12 months",
  );
}

export function calculateAndroidApp(
  i: AndroidAppInputs,
  currency: Currency,
): ProjectResult {
  const baseSalary = 43946;
  const uif = baseSalary * 0.01;
  const sdl = baseSalary * 0.01;
  const seat = 4100;
  const software = 1800;
  const device = 1800;
  const recruitment = baseSalary * 0.10;
  const management = baseSalary * 0.15;

  const loadedMonthly =
    baseSalary + uif + sdl + seat + software + device + recruitment + management;
  const teamMultiplier = 1.25;
  const trueMonthly = loadedMonthly * teamMultiplier;
  const inHouseTotal = trueMonthly * i.buildMonths;

  let bpolytixFee = 0;
  let tier = "";
  if (i.appType === "MVP / Prototype") {
    bpolytixFee = 55000;
    tier = "MVP / Prototype";
  } else if (i.appType === "Business tool") {
    bpolytixFee = 95000;
    tier = "Business tool";
  } else {
    bpolytixFee = 145000;
    tier = "Consumer app";
  }
  if (i.integrations) bpolytixFee += 18000;

  const retainerNote = i.maintenance
    ? `+ ${symbol(currency)}${Math.round(convert(9500, currency)).toLocaleString("en-ZA")}/month retainer`
    : undefined;

  const breakdown = [
    { label: "Loaded mobile dev cost / month", value: trueMonthly },
    { label: "Build duration (months)", value: i.buildMonths },
    { label: "True in-house total", value: inHouseTotal },
  ];

  return toProjectResult(
    "androidapp",
    inHouseTotal,
    bpolytixFee,
    breakdown,
    i.buildMonths,
    currency,
    retainerNote,
    tier,
    "Once-off project fee — full ownership transfer after 12 months",
  );
}

export type CombinedResults = {
  rows: AnyResult[];
  totalInHouseMonthly: number;
  totalBpolytixMonthly: number;
  totalSavingMonthly: number;
  totalSavingAnnual: number;
  totalProjectInHouse: number;
  totalProjectBpolytix: number;
  totalProjectSaving: number;
  totalSavingPercent: number;
};

export function combineResults(services: AnyResult[]): CombinedResults {
  let totalInHouseMonthly = 0;
  let totalBpolytixMonthly = 0;
  let totalProjectInHouse = 0;
  let totalProjectBpolytix = 0;

  for (const r of services) {
    if (r.kind === "monthly") {
      totalInHouseMonthly += r.inHouseMonthly;
      totalBpolytixMonthly += r.bpolytixFee;
    } else {
      totalProjectInHouse += r.inHouseTotal;
      totalProjectBpolytix += r.bpolytixFee;
    }
  }

  const totalSavingMonthly = totalInHouseMonthly - totalBpolytixMonthly;
  const totalSavingAnnual = totalSavingMonthly * 12;
  const totalProjectSaving = totalProjectInHouse - totalProjectBpolytix;
  const grandIn = totalInHouseMonthly * 12 + totalProjectInHouse;
  const grandSaving = totalSavingAnnual + totalProjectSaving;
  const totalSavingPercent = grandIn > 0 ? (grandSaving / grandIn) * 100 : 0;

  return {
    rows: services,
    totalInHouseMonthly,
    totalBpolytixMonthly,
    totalSavingMonthly,
    totalSavingAnnual,
    totalProjectInHouse,
    totalProjectBpolytix,
    totalProjectSaving,
    totalSavingPercent,
  };
}

export function reinvestmentCopy(annualSavingZar: number): string {
  if (annualSavingZar < 100000)
    return "Enough to fund 6 months of targeted digital marketing.";
  if (annualSavingZar < 300000)
    return "Enough to build a custom internal tool — and still have budget left.";
  if (annualSavingZar < 600000)
    return "Enough to fund a full product sprint and a marketing push.";
  return "Enough to hire a senior developer for a year. Or reinvest into growth.";
}
