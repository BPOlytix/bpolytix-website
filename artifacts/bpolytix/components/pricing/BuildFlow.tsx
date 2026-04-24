"use client";

import {
  BadgeCheck,
  BarChart3,
  Bell,
  Calculator,
  CalendarDays,
  Clock3,
  Database,
  FileCheck,
  GraduationCap,
  Landmark,
  LayoutDashboard,
  LifeBuoy,
  LineChart,
  PhoneCall,
  Presentation,
  ReceiptText,
  RefreshCw,
  SearchCheck,
  Send,
  Settings,
  Tags,
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
};

type FinanceFlow = {
  serviceName: string;
  badge?: string;
  kind: "monthly" | "weekly" | "payroll" | "phase" | "calendar";
  loopLabel?: string;
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
        .generic-service-flow {
          display: flex;
          align-items: center;
          width: 100%;
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

        .node-badge {
          min-height: 24px;
          padding: 0 9px;
          font-size: 12px;
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

        .payroll-ribbon,
        .phase-ribbon {
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

        .payroll-ribbon span,
        .phase-ribbon span {
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

        @media (max-width: 1023px) {
          .service-flow-section {
            padding-bottom: 24px;
          }

          .finance-flow-track,
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
          .phase-ribbon {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
