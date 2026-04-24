"use client";

import {
  Activity,
  BadgeCheck,
  BarChart3,
  Bell,
  Bot,
  Brain,
  BriefcaseBusiness,
  Building2,
  Calculator,
  CalendarDays,
  Clock3,
  ClipboardList,
  Code,
  Database,
  FileCheck,
  GitBranch,
  GraduationCap,
  Landmark,
  LayoutDashboard,
  LifeBuoy,
  LineChart,
  Lock,
  Megaphone,
  MessageSquareText,
  Network,
  NotebookTabs,
  PhoneCall,
  PhoneIncoming,
  Plug,
  Presentation,
  ReceiptText,
  RefreshCw,
  Rocket,
  SearchCheck,
  Send,
  Settings,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Split,
  Tags,
  UserCheck,
  UserRound,
  Wrench,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type BuildFlowProps = {
  selectedServiceId: string | null;
  selectedServiceName?: string;
};

type FlowNode = {
  label: string;
  icon: LucideIcon;
  badge?: string;
  motif?: "document" | "play-store";
  ownership?: boolean;
};

type FinanceFlow = {
  serviceName: string;
  badge?: string;
  kind: "monthly" | "weekly" | "payroll" | "phase" | "calendar";
  loopLabel?: string;
  nodes: FlowNode[];
};

type AiFlow = {
  serviceName: string;
  kind: "build-own" | "agent" | "ops-loop" | "call" | "timeline";
  badge?: string;
  loopLabel?: string;
  nodes: FlowNode[];
};

type PeopleFlow = {
  serviceName: string;
  kind: "corridor" | "hr-cycle" | "onboarding";
  loopLabel?: string;
  nodes?: FlowNode[];
};

type BuildPillarFlow = {
  serviceName: string;
  kind: "ownership" | "countdown" | "document" | "funnel";
  nodes: FlowNode[];
};

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const FINANCE_FLOWS: Record<string, FinanceFlow> = {
  bookkeeping: {
    serviceName: "Bookkeeping",
    kind: "monthly",
    loopLabel: "Monthly cycle",
    nodes: [
      { label: "Receipts & invoices in", icon: ReceiptText },
      { label: "Categorised daily", icon: Tags },
      { label: "Reconciled weekly", icon: SearchCheck },
      { label: "Month-end close", icon: FileCheck },
      { label: "Reports to you", icon: BarChart3 },
    ],
  },
  "fractional-cfo": {
    serviceName: "Fractional CFO",
    badge: "Weekly",
    kind: "weekly",
    nodes: [
      { label: "Your numbers", icon: BarChart3 },
      { label: "Forecast model", icon: LineChart },
      { label: "Variance analysis", icon: SearchCheck },
      { label: "CFO review call", icon: PhoneCall },
      { label: "Board-ready pack", icon: Presentation },
    ],
  },
  payroll: {
    serviceName: "Payroll",
    kind: "payroll",
    loopLabel: "Monthly pay cycle",
    nodes: [
      { label: "Timesheets & changes", icon: Clock3 },
      { label: "Gross-to-net calc", icon: Calculator },
      { label: "Statutory filings (PAYE/UIF)", icon: Landmark },
      { label: "Payslips issued", icon: Send },
      { label: "Team paid", icon: BadgeCheck },
    ],
  },
  xero: {
    serviceName: "Xero",
    kind: "phase",
    nodes: [
      { label: "Scoping call", icon: PhoneCall },
      { label: "Chart of accounts built", icon: Settings },
      { label: "Data migrated", icon: Database },
      { label: "Team trained", icon: GraduationCap },
      { label: "Live & supported", icon: LifeBuoy, badge: "Live" },
    ],
  },
  compliance: {
    serviceName: "Compliance",
    kind: "calendar",
    loopLabel: "Rolling calendar",
    nodes: [
      { label: "Registrations", icon: FileCheck },
      { label: "Filings tracked", icon: CalendarDays },
      { label: "Deadlines flagged", icon: Bell },
      { label: "Submitted on time", icon: Send },
      { label: "Status dashboard", icon: LayoutDashboard },
    ],
  },
};

const AI_FLOWS: Record<string, AiFlow> = {
  "ai-workflow-automation": {
    serviceName: "AI Workflow Automation",
    kind: "build-own",
    nodes: [
      { label: "Map your workflows", icon: Workflow },
      { label: "Build automations", icon: Wrench },
      { label: "Connect your tools", icon: Plug },
      { label: "Deploy live", icon: Rocket },
      { label: "12 months support", icon: LifeBuoy },
      { label: "You own it", icon: Lock, ownership: true },
    ],
  },
  "ai-agent-build-deploy": {
    serviceName: "AI Agent Build & Deploy",
    kind: "agent",
    nodes: [
      { label: "Scope the agent", icon: ClipboardList },
      { label: "Design prompts & tools", icon: Brain },
      { label: "Train & test", icon: Bot, badge: "Custom-built" },
      { label: "Deploy to production", icon: Rocket },
      { label: "Monitor & tune", icon: Activity },
      { label: "Handover", icon: Lock, ownership: true },
    ],
  },
  "ai-operations-service": {
    serviceName: "AI Operations Service",
    kind: "ops-loop",
    loopLabel: "Continuous monitoring",
    nodes: [
      { label: "Monitor", icon: Activity },
      { label: "Detect drift", icon: SearchCheck },
      { label: "Tune prompts", icon: Settings },
      { label: "Fix integrations", icon: Wrench },
      { label: "Monthly report", icon: BarChart3 },
    ],
  },
  "ai-receptionist": {
    serviceName: "AI Receptionist",
    kind: "call",
    nodes: [
      { label: "Caller dials", icon: PhoneIncoming },
      { label: "AI answers", icon: MessageSquareText },
      { label: "Intent detected", icon: Split },
      { label: "Action taken", icon: GitBranch },
      { label: "Summary to you", icon: Lock, ownership: true },
    ],
  },
  "ai-marketing-ops": {
    serviceName: "AI Marketing Ops",
    kind: "timeline",
    nodes: [
      { label: "Brand voice trained", icon: Sparkles },
      { label: "Content pipeline live", icon: Megaphone },
      { label: "Distribution automated", icon: Network },
      { label: "Analytics dashboard", icon: LayoutDashboard },
      { label: "Month 13: yours", icon: Lock, ownership: true },
    ],
  },
};

const PEOPLE_FLOWS: Record<string, PeopleFlow> = {
  "employer-of-record": {
    serviceName: "Employer of Record (SA-UK)",
    kind: "corridor",
  },
  "outsourced-hr": {
    serviceName: "Outsourced HR",
    kind: "hr-cycle",
    loopLabel: "Monthly HR cycle",
    nodes: [
      { label: "Employee queries in", icon: MessageSquareText },
      { label: "Policy applied", icon: NotebookTabs },
      { label: "Actions taken", icon: UserCheck },
      { label: "Record updated", icon: FileCheck },
      { label: "Management report", icon: BarChart3 },
    ],
  },
  "onboarding-policy-automation": {
    serviceName: "Onboarding & Policy Automation",
    kind: "onboarding",
    nodes: [
      { label: "Offer accepted", icon: BadgeCheck },
      { label: "Documents sent automatically", icon: Send },
      { label: "Signed & returned", icon: FileCheck },
      { label: "Policies acknowledged", icon: ShieldCheck },
      { label: "Day one ready", icon: UserRound, badge: "Day 1" },
    ],
  },
};

const BUILD_PILLAR_FLOWS: Record<string, BuildPillarFlow> = {
  "custom-web-app": {
    serviceName: "Custom Web App",
    kind: "ownership",
    nodes: [
      { label: "Scope & wireframes", icon: ClipboardList },
      { label: "Design approved", icon: LayoutDashboard },
      { label: "Build sprint", icon: Code },
      { label: "Client review", icon: UserCheck },
      { label: "Deploy", icon: Rocket },
      { label: "You own it", icon: Lock, ownership: true },
    ],
  },
  "android-app": {
    serviceName: "Android App",
    kind: "ownership",
    nodes: [
      { label: "Scope", icon: ClipboardList },
      { label: "Design screens", icon: Smartphone },
      { label: "Build & test", icon: Wrench },
      { label: "Play Store submission", icon: Send, badge: "Play Store", motif: "play-store" },
      { label: "Live on Play Store", icon: BadgeCheck },
      { label: "You own it", icon: Lock, ownership: true },
    ],
  },
  "website-in-3-days": {
    serviceName: "Website in 3 Days",
    kind: "countdown",
    nodes: [
      { label: "Day 0: brief in", icon: ClipboardList, badge: "Day 0" },
      { label: "Day 1: build", icon: Code, badge: "Day 1" },
      { label: "Day 2: review", icon: SearchCheck, badge: "Day 2" },
      { label: "Day 3: live", icon: Rocket, badge: "Day 3" },
    ],
  },
  "business-plans-funding": {
    serviceName: "Business Plans & Funding",
    kind: "document",
    nodes: [
      { label: "Discovery call", icon: PhoneCall },
      { label: "Financial model built", icon: Calculator, motif: "document" },
      { label: "Plan drafted", icon: FileCheck, motif: "document" },
      { label: "Pitch-ready pack", icon: Presentation, motif: "document" },
      { label: "Submitted", icon: Send },
    ],
  },
  "business-development": {
    serviceName: "Business Development",
    kind: "funnel",
    nodes: [
      { label: "Target list built", icon: SearchCheck },
      { label: "Outreach live", icon: Send },
      { label: "Meetings booked", icon: CalendarDays },
      { label: "Proposals sent", icon: Presentation },
      { label: "Deals closed", icon: BadgeCheck },
    ],
  },
};

const GENERIC_OUTCOMES: Record<string, string> = {
  "ai-workflow-automation": "Tasks done automatically",
  "ai-agent-build-deploy": "Custom agent running",
  "ai-operations-service": "AI systems maintained",
  "ai-receptionist": "Calls answered 24/7",
  "ai-marketing-ops": "Content shipping daily",
  "employer-of-record": "Cross-border hires, legal",
  "outsourced-hr": "HR handled",
  "onboarding-policy-automation": "New hires, ready day one",
  "custom-web-app": "Your app, live",
  "android-app": "Your app, in the store",
  "website-in-3-days": "Your site, live",
  "business-plans-funding": "Funding-ready plan",
  "business-development": "Pipeline flowing",
};

function Connector({ index }: { index: number }) {
  return (
    <span className="build-flow-connector" aria-hidden="true">
      {[0, 1, 2].map((particle) => (
        <motion.span
          key={particle}
          className="build-flow-particle"
          initial={{ x: "0%", opacity: 0 }}
          animate={{ x: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 2.2,
            delay: index * 0.16 + particle * 0.68,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </span>
  );
}

function FinanceServiceFlow({ flow }: { flow: FinanceFlow }) {
  return (
    <motion.div
      key={flow.serviceName}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24, ease: EASE }}
      className={`finance-service-flow ${flow.kind}-flow`}
    >
      <div className="build-flow-meta">
        <span>{flow.serviceName}</span>
        {flow.badge && <strong>{flow.badge}</strong>}
      </div>

      {flow.kind === "calendar" && (
        <div className="calendar-motif" aria-hidden="true">
          <CalendarDays size={18} color="#00D4AA" strokeWidth={1.8} />
        </div>
      )}

      <div className="finance-flow-track">
        {flow.nodes.map((node, index) => {
          const Icon = node.icon;

          return (
            <div className="finance-flow-segment" key={node.label}>
              <motion.div
                className="finance-flow-node"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.32, delay: index * 0.1, ease: EASE }}
              >
                <Icon size={20} color="#1B77F2" strokeWidth={1.8} />
                <span>{node.label}</span>
                {node.badge && <strong className="node-badge">{node.badge}</strong>}
              </motion.div>
              {index < flow.nodes.length - 1 && <Connector index={index} />}
            </div>
          );
        })}
      </div>

      {flow.kind === "phase" && (
        <div className="phase-ribbon" aria-hidden="true">
          {flow.nodes.map((node, index) => (
            <span key={node.label}>Phase {index + 1}</span>
          ))}
        </div>
      )}

      {flow.kind === "payroll" && (
        <div className="payroll-ribbon" aria-label="Monthly payroll dates">
          <span>This month</span>
          <span>Changes</span>
          <span>Filings</span>
          <span>Pay day</span>
        </div>
      )}

      {flow.loopLabel && (
        <div className="loop-indicator" aria-label={flow.loopLabel}>
          <RefreshCw size={16} color="#00D4AA" strokeWidth={1.8} />
          <span>{flow.loopLabel}</span>
        </div>
      )}
    </motion.div>
  );
}

function AiServiceFlow({ flow }: { flow: AiFlow }) {
  const isLoop = flow.kind === "ops-loop";

  return (
    <motion.div
      key={flow.serviceName}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24, ease: EASE }}
      className={`ai-service-flow ${flow.kind}-flow`}
    >
      <div className="build-flow-meta">
        <span>{flow.serviceName}</span>
        {flow.badge && <strong>{flow.badge}</strong>}
      </div>

      {flow.kind === "call" && (
        <div className="phone-motif" aria-hidden="true">
          <PhoneCall size={18} color="#00D4AA" strokeWidth={1.8} />
        </div>
      )}

      <div className={isLoop ? "ai-loop-track" : "ai-flow-track"}>
        {flow.nodes.map((node, index) => {
          const Icon = node.icon;

          return (
            <div className="finance-flow-segment" key={node.label}>
              <motion.div
                className={`finance-flow-node ai-flow-node ${node.ownership ? "ownership-node" : ""}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.32, delay: index * 0.1, ease: EASE }}
              >
                <Icon size={20} color={node.ownership ? "#00D4AA" : "#1B77F2"} strokeWidth={1.8} />
                <span>{node.label}</span>
                {node.badge && <strong className="node-badge">{node.badge}</strong>}
                {node.ownership && <strong className="ownership-badge">Yours after 12 months</strong>}
              </motion.div>
              {index < flow.nodes.length - 1 && <Connector index={index} />}
            </div>
          );
        })}
      </div>

      {flow.kind === "ops-loop" && (
        <div className="ai-loop-return" aria-label={flow.loopLabel}>
          <Connector index={flow.nodes.length} />
          <RefreshCw size={16} color="#00D4AA" strokeWidth={1.8} />
          <span>{flow.loopLabel}</span>
        </div>
      )}

      {flow.kind === "call" && (
        <div className="call-outcomes" aria-label="Possible call actions">
          <span>Book</span>
          <span>Qualify</span>
          <span>Route</span>
        </div>
      )}

      {flow.kind === "timeline" && (
        <div className="ownership-timeline" aria-label="12 month ownership timeline">
          {["Month 1", "Month 3", "Month 6", "Month 9", "Month 13"].map((marker) => (
            <span key={marker}>{marker}</span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function CorridorConnector({ side }: { side: "left" | "right" }) {
  return (
    <div className={`corridor-connector ${side}-corridor`} aria-hidden="true">
      <span className="corridor-line" />
      {["Contracts", "Pay", "Compliance"].map((label, index) => (
        <motion.span
          key={`${side}-${label}`}
          className="corridor-particle"
          initial={{ left: side === "left" ? "0%" : "100%", opacity: 0 }}
          animate={{
            left: side === "left" ? ["0%", "100%", "0%"] : ["100%", "0%", "100%"],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 3.8,
            delay: index * 0.55,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {label}
        </motion.span>
      ))}
    </div>
  );
}

function PeopleServiceFlow({ flow }: { flow: PeopleFlow }) {
  if (flow.kind === "corridor") {
    return (
      <motion.div
        key={flow.serviceName}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.24, ease: EASE }}
        className="people-service-flow corridor-flow"
      >
        <div className="build-flow-meta">
          <span>{flow.serviceName}</span>
        </div>

        <div className="corridor-layout">
          <motion.div
            className="corridor-node"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, ease: EASE }}
          >
            <span className="flag-motif">GB</span>
            <BriefcaseBusiness size={22} color="#1B77F2" strokeWidth={1.8} />
            <strong>UK company</strong>
          </motion.div>

          <CorridorConnector side="left" />

          <motion.div
            className="corridor-node corridor-hub"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, delay: 0.1, ease: EASE }}
          >
            <Building2 size={22} color="#00D4AA" strokeWidth={1.8} />
            <strong>BPOLytix entity</strong>
          </motion.div>

          <CorridorConnector side="right" />

          <motion.div
            className="corridor-node"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, delay: 0.2, ease: EASE }}
          >
            <span className="flag-motif">ZA</span>
            <UserRound size={22} color="#1B77F2" strokeWidth={1.8} />
            <strong>SA employee</strong>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      key={flow.serviceName}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24, ease: EASE }}
      className={`people-service-flow ${flow.kind}-flow`}
    >
      <div className="build-flow-meta">
        <span>{flow.serviceName}</span>
      </div>

      <div className="people-flow-track">
        {flow.nodes?.map((node, index) => {
          const Icon = node.icon;

          return (
            <div className="finance-flow-segment" key={node.label}>
              <motion.div
                className="finance-flow-node people-flow-node"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.32, delay: index * 0.1, ease: EASE }}
              >
                <Icon size={20} color="#1B77F2" strokeWidth={1.8} />
                <span>{node.label}</span>
                {node.badge && <strong className="node-badge">{node.badge}</strong>}
              </motion.div>
              {index < (flow.nodes?.length ?? 0) - 1 && <Connector index={index} />}
            </div>
          );
        })}
      </div>

      {flow.loopLabel && (
        <div className="loop-indicator" aria-label={flow.loopLabel}>
          <RefreshCw size={16} color="#00D4AA" strokeWidth={1.8} />
          <span>{flow.loopLabel}</span>
        </div>
      )}
    </motion.div>
  );
}

function BuildPillarServiceFlow({ flow }: { flow: BuildPillarFlow }) {
  return (
    <motion.div
      key={flow.serviceName}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24, ease: EASE }}
      className={`build-pillar-service-flow ${flow.kind}-flow`}
    >
      <div className="build-flow-meta">
        <span>{flow.serviceName}</span>
      </div>

      <div className={`build-pillar-flow-track ${flow.kind === "funnel" ? "funnel-track" : ""}`}>
        {flow.nodes.map((node, index) => {
          const Icon = node.icon;
          const funnelWidth = `${100 - index * 9}%`;
          const isCountdown = flow.kind === "countdown";

          return (
            <div className="finance-flow-segment" key={node.label}>
              <motion.div
                className={`finance-flow-node build-pillar-node ${node.ownership ? "ownership-node" : ""}`}
                style={flow.kind === "funnel" ? { width: funnelWidth } : undefined}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.32, delay: index * 0.1, ease: EASE }}
              >
                {node.motif === "play-store" && (
                  <span className="play-store-motif" aria-hidden="true">
                    <span />
                  </span>
                )}
                {node.motif === "document" && (
                  <span className="document-node-motif" aria-hidden="true">
                    <span />
                    <span />
                  </span>
                )}
                <Icon size={20} color={node.ownership ? "#00D4AA" : "#1B77F2"} strokeWidth={1.8} />
                <span>{node.label}</span>
                {node.badge &&
                  (isCountdown ? (
                    <motion.strong
                      className="day-badge"
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{
                        duration: 1.6,
                        delay: index * 0.18,
                        repeat: Infinity,
                        repeatDelay: 0.8,
                        ease: EASE,
                      }}
                    >
                      {node.badge}
                    </motion.strong>
                  ) : (
                    <strong className="node-badge">{node.badge}</strong>
                  ))}
                {node.ownership && <strong className="ownership-badge">Yours after 12 months</strong>}
              </motion.div>
              {index < flow.nodes.length - 1 && <Connector index={index} />}
            </div>
          );
        })}
      </div>

      {flow.kind === "countdown" && (
        <div className="countdown-ribbon" aria-label="Three day countdown">
          {flow.nodes.map((node) => (
            <span key={node.label}>{node.badge}</span>
          ))}
        </div>
      )}

      {flow.kind === "document" && (
        <div className="document-ribbon" aria-label="Document build stages">
          <span>Model</span>
          <span>Plan</span>
          <span>Pack</span>
        </div>
      )}
    </motion.div>
  );
}

function GenericServiceFlow({
  selectedServiceId,
  selectedServiceName,
}: {
  selectedServiceId: string;
  selectedServiceName?: string;
}) {
  const outcome = GENERIC_OUTCOMES[selectedServiceId] ?? "Output delivered";
  const label = selectedServiceName ?? "Selected service";

  return (
    <motion.div
      key={selectedServiceId}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24, ease: EASE }}
      className="generic-service-flow"
    >
      {[
        { label: "Your business", icon: LayoutDashboard },
        { label, icon: Settings },
        { label: outcome, icon: BadgeCheck },
      ].map((node, index, nodes) => {
        const Icon = node.icon;

        return (
          <div className="finance-flow-segment" key={node.label}>
            <motion.div
              className="finance-flow-node"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, delay: index * 0.1, ease: EASE }}
            >
              <Icon size={20} color="#1B77F2" strokeWidth={1.8} />
              <span>{node.label}</span>
            </motion.div>
            {index < nodes.length - 1 && <Connector index={index} />}
          </div>
        );
      })}
    </motion.div>
  );
}

export function BuildFlow({ selectedServiceId, selectedServiceName }: BuildFlowProps) {
  const financeFlow = selectedServiceId === null ? null : FINANCE_FLOWS[selectedServiceId];
  const aiFlow = selectedServiceId === null ? null : AI_FLOWS[selectedServiceId];
  const peopleFlow = selectedServiceId === null ? null : PEOPLE_FLOWS[selectedServiceId];
  const buildPillarFlow = selectedServiceId === null ? null : BUILD_PILLAR_FLOWS[selectedServiceId];

  return (
    <section className="service-flow-section" aria-label="Selected service flow">
      <div className="flow-wrap">
        <div className="flow-heading">
          <p>Build flow</p>
          <h2>How your build turns into outcomes.</h2>
        </div>

        <div className="flow-card">
          <AnimatePresence mode="wait">
            {selectedServiceId === null ? (
              <motion.div
                key="empty-flow"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.24, ease: EASE }}
                className="flow-empty"
              >
                Pick a service to see your build
              </motion.div>
            ) : financeFlow ? (
              <FinanceServiceFlow key={selectedServiceId} flow={financeFlow} />
            ) : aiFlow ? (
              <AiServiceFlow key={selectedServiceId} flow={aiFlow} />
            ) : peopleFlow ? (
              <PeopleServiceFlow key={selectedServiceId} flow={peopleFlow} />
            ) : buildPillarFlow ? (
              <BuildPillarServiceFlow key={selectedServiceId} flow={buildPillarFlow} />
            ) : (
              <GenericServiceFlow
                key={selectedServiceId}
                selectedServiceId={selectedServiceId}
                selectedServiceName={selectedServiceName}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      <style jsx global>{`
        .service-flow-section {
          position: relative;
          overflow: hidden;
          padding-top: 0;
          padding-bottom: 24px;
          background-color: #0D1B2A;
        }

        .flow-wrap {
          max-width: 1440px;
          margin: 0 auto;
          padding-left: 32px;
          padding-right: 32px;
        }

        .flow-heading {
          margin-bottom: 18px;
        }

        .flow-heading p {
          margin: 0 0 12px;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 13px;
          letter-spacing: 0.08em;
          line-height: 1.4;
          text-transform: uppercase;
        }

        .flow-heading h2 {
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 32px;
          font-weight: 700;
          line-height: 1.05;
        }

        .flow-card {
          position: relative;
          min-height: 320px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          padding: 28px;
        }

        .flow-empty {
          display: flex;
          min-height: 264px;
          align-items: center;
          justify-content: center;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 16px;
          line-height: 1.7;
          text-align: center;
        }

        .finance-service-flow,
        .ai-service-flow,
        .people-service-flow,
        .build-pillar-service-flow,
        .generic-service-flow {
          position: relative;
          min-height: 264px;
        }

        .generic-service-flow {
          display: flex;
          align-items: center;
        }

        .build-flow-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 26px;
        }

        .build-flow-meta span,
        .build-flow-meta strong {
          font-family: var(--font-dm-sans);
          font-size: 13px;
          font-weight: 700;
          line-height: 1;
        }

        .build-flow-meta span {
          color: #8892A4;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .build-flow-meta strong,
        .node-badge {
          display: inline-flex;
          min-height: 26px;
          align-items: center;
          border: 1px solid #00D4AA;
          border-radius: 9999px;
          color: #00D4AA;
        }

        .build-flow-meta strong {
          padding: 0 10px;
        }

        .finance-flow-track,
        .ai-flow-track,
        .ai-loop-track,
        .people-flow-track,
        .build-pillar-flow-track,
        .generic-service-flow {
          display: flex;
          align-items: center;
          width: 100%;
        }

        .ai-flow-track,
        .ai-loop-track,
        .people-flow-track,
        .build-pillar-flow-track {
          margin-top: 4px;
        }

        .finance-flow-segment {
          display: flex;
          min-width: 0;
          flex: 1 1 0;
          align-items: center;
        }

        .finance-flow-segment:last-child {
          flex: 0.82 1 0;
        }

        .finance-flow-node {
          position: relative;
          display: flex;
          min-height: 116px;
          min-width: 0;
          width: 100%;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 10px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          padding: 16px;
        }

        .finance-flow-node span {
          color: #F5F7FA;
          font-family: var(--font-dm-sans);
          font-size: 14px;
          font-weight: 700;
          line-height: 1.35;
        }

        .ai-flow-node.ownership-node,
        .build-pillar-node.ownership-node {
          border-color: #00D4AA;
          box-shadow: 0 0 0 1px #00D4AA, 0 0 24px #00D4AA;
        }

        .build-pillar-node.ownership-node {
          animation: build-ownership-glow 2.4s ease-in-out infinite;
        }

        .ai-flow-node.ownership-node span,
        .build-pillar-node.ownership-node span {
          color: #00D4AA;
        }

        .node-badge,
        .day-badge {
          min-height: 24px;
          padding: 0 9px;
          font-size: 12px;
        }

        .day-badge {
          display: inline-flex;
          align-items: center;
          border: 1px solid #00D4AA;
          border-radius: 9999px;
          color: #00D4AA;
          font-family: var(--font-dm-sans);
          font-weight: 700;
          line-height: 1;
        }

        .ownership-badge {
          display: inline-flex;
          min-height: 24px;
          align-items: center;
          padding: 0 9px;
          border: 1px solid #00D4AA;
          border-radius: 9999px;
          color: #00D4AA;
          font-family: var(--font-dm-sans);
          font-size: 12px;
          font-weight: 700;
          line-height: 1;
        }

        .build-flow-connector {
          position: relative;
          display: block;
          width: 48px;
          height: 1px;
          flex: 0 0 48px;
          background-color: #1E2D3D;
          overflow: hidden;
        }

        .build-flow-particle {
          position: absolute;
          top: -3px;
          left: 0;
          width: 7px;
          height: 7px;
          border-radius: 9999px;
          background-color: #00D4AA;
        }

        .loop-indicator {
          position: absolute;
          right: 0;
          bottom: 0;
          display: inline-flex;
          min-height: 34px;
          align-items: center;
          gap: 8px;
          padding: 0 12px;
          border: 1px solid #1E2D3D;
          border-radius: 9999px;
          background-color: #0D1B2A;
          color: #00D4AA;
          font-family: var(--font-dm-sans);
          font-size: 13px;
          font-weight: 700;
          line-height: 1;
        }

        .loop-indicator svg {
          animation: loop-spin 5s linear infinite;
        }

        .ai-loop-track {
          padding-bottom: 54px;
        }

        .ai-loop-return {
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
          color: #00D4AA;
          font-family: var(--font-dm-sans);
          font-size: 13px;
          font-weight: 700;
          line-height: 1;
        }

        .ai-loop-return .build-flow-connector {
          width: min(420px, 44%);
          flex-basis: min(420px, 44%);
        }

        .ai-loop-return svg {
          animation: loop-spin 5s linear infinite;
        }

        .call-outcomes,
        .ownership-timeline {
          display: grid;
          gap: 8px;
          margin-top: 22px;
        }

        .call-outcomes {
          grid-template-columns: repeat(3, minmax(0, 1fr));
          max-width: 520px;
          margin-left: auto;
        }

        .ownership-timeline {
          grid-template-columns: repeat(5, minmax(0, 1fr));
        }

        .call-outcomes span,
        .ownership-timeline span {
          display: flex;
          min-height: 30px;
          align-items: center;
          justify-content: center;
          border: 1px solid #1E2D3D;
          border-radius: 9999px;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 12px;
          font-weight: 700;
          line-height: 1;
          text-align: center;
        }

        .phone-motif {
          position: absolute;
          top: 2px;
          right: 0;
          display: flex;
          width: 36px;
          height: 36px;
          align-items: center;
          justify-content: center;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #0D1B2A;
        }

        .countdown-flow .build-pillar-node {
          min-height: 128px;
          border-color: #1B77F2;
          justify-content: space-between;
        }

        .play-store-motif,
        .document-node-motif {
          position: absolute;
          top: 12px;
          right: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #0D1B2A;
        }

        .play-store-motif {
          width: 30px;
          height: 30px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
        }

        .play-store-motif span {
          width: 0;
          height: 0;
          border-top: 7px solid #1B77F2;
          border-bottom: 7px solid #00D4AA;
          border-left: 12px solid #F5F7FA;
        }

        .document-node-motif {
          width: 34px;
          height: 30px;
        }

        .document-node-motif span {
          position: absolute;
          width: 18px;
          height: 22px;
          border: 1px solid #1E2D3D;
          border-radius: 3px;
          background-color: #0D1B2A;
        }

        .document-node-motif span:first-child {
          top: 1px;
          left: 4px;
        }

        .document-node-motif span:last-child {
          top: 6px;
          left: 12px;
          border-color: #00D4AA;
        }

        .document-node-motif span:last-child::before,
        .document-node-motif span:last-child::after {
          position: absolute;
          right: 3px;
          left: 3px;
          height: 1px;
          background-color: #00D4AA;
          content: "";
        }

        .document-node-motif span:last-child::before {
          top: 7px;
        }

        .document-node-motif span:last-child::after {
          top: 12px;
        }

        .funnel-track .finance-flow-segment {
          align-items: center;
        }

        .funnel-track .build-pillar-node {
          align-items: center;
          text-align: center;
        }

        .corridor-layout {
          display: grid;
          min-height: 208px;
          grid-template-columns: minmax(170px, 0.85fr) minmax(92px, 0.42fr) minmax(190px, 1fr) minmax(92px, 0.42fr) minmax(170px, 0.85fr);
          gap: 12px;
          align-items: center;
        }

        .corridor-node {
          position: relative;
          display: flex;
          min-height: 138px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          padding: 18px;
          text-align: center;
        }

        .corridor-node strong {
          color: #F5F7FA;
          font-family: var(--font-dm-sans);
          font-size: 15px;
          font-weight: 700;
          line-height: 1.35;
        }

        .corridor-hub {
          border-color: #00D4AA;
          box-shadow: 0 0 0 1px #00D4AA;
        }

        .flag-motif {
          position: absolute;
          top: 12px;
          right: 12px;
          display: inline-flex;
          min-height: 24px;
          align-items: center;
          padding: 0 8px;
          border: 1px solid #1E2D3D;
          border-radius: 9999px;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 11px;
          font-weight: 700;
          line-height: 1;
        }

        .corridor-connector {
          position: relative;
          min-height: 72px;
          overflow: hidden;
        }

        .corridor-line {
          position: absolute;
          top: 50%;
          right: 0;
          left: 0;
          height: 1px;
          background-color: #1E2D3D;
        }

        .corridor-line::before,
        .corridor-line::after {
          position: absolute;
          top: -4px;
          width: 8px;
          height: 8px;
          border-top: 1px solid #1E2D3D;
          border-right: 1px solid #1E2D3D;
          content: "";
        }

        .corridor-line::before {
          left: 1px;
          transform: rotate(-135deg);
        }

        .corridor-line::after {
          right: 1px;
          transform: rotate(45deg);
        }

        .corridor-particle {
          position: absolute;
          top: calc(50% - 13px);
          left: 0;
          display: inline-flex;
          min-height: 26px;
          align-items: center;
          padding: 0 8px;
          border: 1px solid #00D4AA;
          border-radius: 9999px;
          background-color: #0D1B2A;
          color: #00D4AA;
          font-family: var(--font-dm-sans);
          font-size: 11px;
          font-weight: 700;
          line-height: 1;
          white-space: nowrap;
        }

        .payroll-ribbon,
        .phase-ribbon,
        .countdown-ribbon,
        .document-ribbon {
          display: grid;
          gap: 8px;
          margin-top: 22px;
        }

        .payroll-ribbon {
          grid-template-columns: repeat(4, minmax(0, 1fr));
          padding: 10px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #0D1B2A;
        }

        .phase-ribbon {
          grid-template-columns: repeat(5, minmax(0, 1fr));
        }

        .countdown-ribbon {
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }

        .document-ribbon {
          grid-template-columns: repeat(3, minmax(0, 1fr));
          max-width: 520px;
          margin-left: auto;
        }

        .payroll-ribbon span,
        .phase-ribbon span,
        .countdown-ribbon span,
        .document-ribbon span {
          display: flex;
          min-height: 30px;
          align-items: center;
          justify-content: center;
          border: 1px solid #1E2D3D;
          border-radius: 9999px;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 12px;
          font-weight: 700;
          line-height: 1;
          text-align: center;
        }

        .countdown-ribbon span {
          border-color: #00D4AA;
          color: #00D4AA;
        }

        .calendar-motif {
          position: absolute;
          top: 2px;
          right: 0;
          display: flex;
          width: 36px;
          height: 36px;
          align-items: center;
          justify-content: center;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #0D1B2A;
        }

        @keyframes loop-spin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes build-ownership-glow {
          0%,
          100% {
            box-shadow: 0 0 0 1px #00D4AA, 0 0 18px #00D4AA;
          }

          50% {
            box-shadow: 0 0 0 1px #00D4AA, 0 0 30px #00D4AA;
          }
        }

        @media (max-width: 1023px) {
          .service-flow-section {
            padding-bottom: 24px;
          }

          .finance-flow-track,
          .ai-flow-track,
          .ai-loop-track,
          .people-flow-track,
          .build-pillar-flow-track,
          .generic-service-flow {
            flex-direction: column;
            align-items: stretch;
          }

          .finance-flow-segment,
          .finance-flow-segment:last-child {
            flex: 1 1 auto;
            flex-direction: column;
            align-items: stretch;
          }

          .finance-flow-node {
            min-height: 82px;
          }

          .build-flow-connector {
            width: 48px;
            height: 1px;
            flex: 0 0 28px;
            align-self: center;
          }

          .build-flow-particle {
            top: -3px;
            left: 0;
          }

          .payroll-ribbon,
          .phase-ribbon {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .loop-indicator {
            position: static;
            margin-top: 18px;
          }

          .ai-loop-track {
            padding-bottom: 0;
          }

          .ai-loop-return {
            position: static;
            margin-top: 18px;
          }

          .ai-loop-return .build-flow-connector {
            width: 48px;
            flex-basis: 28px;
          }

          .call-outcomes,
          .ownership-timeline,
          .countdown-ribbon,
          .document-ribbon {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .document-ribbon {
            max-width: none;
            margin-left: 0;
          }

          .funnel-track .build-pillar-node {
            width: 100% !important;
          }

          .corridor-layout {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .corridor-node {
            min-height: 92px;
          }

          .corridor-connector {
            min-height: 38px;
            width: 48px;
            justify-self: center;
          }
        }

        @media (max-width: 767px) {
          .flow-wrap {
            padding-left: 24px;
            padding-right: 24px;
          }

          .flow-card {
            padding: 20px;
          }

          .flow-heading h2 {
            font-size: 28px;
          }

          .build-flow-meta {
            align-items: flex-start;
            flex-direction: column;
            gap: 10px;
          }

          .payroll-ribbon,
          .phase-ribbon,
          .call-outcomes,
          .ownership-timeline,
          .countdown-ribbon,
          .document-ribbon {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
