"use client";

import { AnimatePresence, motion } from "framer-motion";

export type FlowService = {
  id: string;
  name: string;
};

type ServiceFlowDiagramProps = {
  selectedServices: FlowService[];
};

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const OUTCOMES: Record<string, string> = {
  "bookkeeping": "Books clean and filed",
  "fractional-cfo": "CFO-level reporting",
  "payroll": "Team paid on time",
  "xero": "Accounts reconciled",
  "compliance": "Filings up to date",
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

function ParticleLine({ index }: { index: number }) {
  return (
    <span className="flow-line" aria-hidden="true">
      {[0, 1, 2].map((particle) => (
        <motion.span
          key={particle}
          className="flow-particle"
          initial={{ x: "0%", opacity: 0 }}
          animate={{ x: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 2.4,
            delay: index * 0.18 + particle * 0.72,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </span>
  );
}

function MobileFlow({ selectedServices }: { selectedServices: FlowService[] }) {
  return (
    <div className="flow-mobile" aria-label="Selected service outcomes">
      <div className="mobile-node">Your business</div>
      <ParticleLine index={0} />
      <div className="mobile-node accent-node">BPOLytix</div>
      <div className="mobile-service-list">
        <AnimatePresence initial={false}>
          {selectedServices.map((service, index) => (
            <motion.div
              key={service.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.24, delay: index * 0.03, ease: EASE }}
              className="mobile-outcome"
            >
              <span>{service.name}</span>
              <strong>{OUTCOMES[service.id]}</strong>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function ServiceFlowDiagram({ selectedServices }: ServiceFlowDiagramProps) {
  const hasSelection = selectedServices.length > 0;

  return (
    <section className="service-flow-section" aria-label="Selected service flow">
      <div className="flow-wrap">
        <div className="flow-heading">
          <p>Build flow</p>
          <h2>How your build turns into outcomes.</h2>
        </div>

        <div className="flow-card">
          <AnimatePresence mode="wait">
            {!hasSelection ? (
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
            ) : (
              <motion.div
                key="active-flow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.24, ease: EASE }}
              >
                <div className="flow-desktop">
                  <div className="flow-node business-node">Your business</div>

                  <div className="flow-center">
                    <div className="flow-node bpolytix-node">BPOLytix</div>
                    <div className="orbit-pills" aria-label="Selected service">
                      <AnimatePresence initial={false}>
                        {selectedServices.map((service, index) => (
                          <motion.span
                            key={service.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1, y: [0, -4, 0] }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{
                              opacity: { duration: 0.2 },
                              scale: { duration: 0.2 },
                              y: { duration: 2.6, repeat: Infinity, delay: index * 0.13, ease: EASE },
                            }}
                          >
                            {service.name}
                          </motion.span>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="outcome-column">
                    <AnimatePresence initial={false}>
                      {selectedServices.map((service, index) => (
                        <motion.div
                          key={service.id}
                          layout
                          initial={{ opacity: 0, x: 18 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -18 }}
                          transition={{ duration: 0.26, delay: index * 0.04, ease: EASE }}
                          className="outcome-node"
                        >
                          {OUTCOMES[service.id]}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  <div className="left-connector">
                    <ParticleLine index={0} />
                  </div>

                  <div className="right-connectors">
                    <AnimatePresence initial={false}>
                      {selectedServices.map((service, index) => (
                        <motion.div
                          key={service.id}
                          layout
                          initial={{ opacity: 0, scaleX: 0.8 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          exit={{ opacity: 0, scaleX: 0.8 }}
                          transition={{ duration: 0.24, ease: EASE }}
                          className="right-connector-row"
                        >
                          <ParticleLine index={index + 1} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                <MobileFlow selectedServices={selectedServices} />
              </motion.div>
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
          letter-spacing: -0.022em;
          line-height: 1.05;
        }

        .flow-card {
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

        .flow-desktop {
          position: relative;
          display: grid;
          min-height: 264px;
          grid-template-columns: minmax(0, 0.78fr) minmax(260px, 1fr) minmax(280px, 0.9fr);
          gap: 56px;
          align-items: center;
        }

        .flow-node {
          display: flex;
          min-height: 74px;
          align-items: center;
          justify-content: center;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #0D1B2A;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 18px;
          font-weight: 700;
          line-height: 1.2;
          text-align: center;
        }

        .business-node {
          width: min(240px, 100%);
        }

        .flow-center {
          position: relative;
          display: flex;
          min-height: 234px;
          align-items: center;
          justify-content: center;
        }

        .bpolytix-node {
          width: 180px;
          min-height: 84px;
          border-color: #1B77F2;
        }

        .orbit-pills {
          position: absolute;
          inset: 0;
          display: flex;
          flex-wrap: wrap;
          align-content: space-between;
          justify-content: center;
          gap: 8px;
          pointer-events: none;
        }

        .orbit-pills span {
          display: inline-flex;
          max-width: 150px;
          align-items: center;
          min-height: 28px;
          padding: 0 10px;
          border: 1px solid #1E2D3D;
          border-radius: 9999px;
          background-color: #111F2E;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 12px;
          font-weight: 700;
          line-height: 1.2;
          text-align: center;
        }

        .outcome-column {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .outcome-node {
          display: flex;
          min-height: 42px;
          align-items: center;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #0D1B2A;
          color: #F5F7FA;
          font-family: var(--font-dm-sans);
          font-size: 14px;
          font-weight: 700;
          line-height: 1.35;
          padding: 10px 14px;
        }

        .left-connector {
          position: absolute;
          top: 50%;
          left: calc((100% - 112px) * 0.26);
          width: 112px;
          transform: translateY(-50%);
        }

        .right-connectors {
          position: absolute;
          top: 0;
          bottom: 0;
          left: calc(66.666% - 72px);
          display: flex;
          width: 112px;
          flex-direction: column;
          justify-content: center;
          gap: 10px;
          pointer-events: none;
        }

        .right-connector-row {
          display: flex;
          min-height: 42px;
          align-items: center;
          transform-origin: left center;
        }

        .flow-line {
          position: relative;
          display: block;
          width: 100%;
          height: 1px;
          background-color: #1E2D3D;
          overflow: hidden;
        }

        .flow-particle {
          position: absolute;
          top: -3px;
          left: 0;
          width: 7px;
          height: 7px;
          border-radius: 9999px;
          background-color: #00D4AA;
        }

        .flow-mobile {
          display: none;
        }

        @media (max-width: 1023px) {
          .service-flow-section {
            padding-bottom: 24px;
          }

          .flow-desktop {
            display: none;
          }

          .flow-mobile {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          .mobile-node {
            display: flex;
            min-height: 58px;
            align-items: center;
            justify-content: center;
            border: 1px solid #1E2D3D;
            border-radius: 8px;
            background-color: #0D1B2A;
            color: #F5F7FA;
            font-family: var(--font-syne);
            font-size: 17px;
            font-weight: 700;
            line-height: 1.2;
          }

          .accent-node {
            border-color: #1B77F2;
          }

          .mobile-service-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .mobile-outcome {
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            gap: 12px;
            align-items: center;
            padding: 12px;
            border: 1px solid #1E2D3D;
            border-radius: 8px;
            background-color: #0D1B2A;
          }

          .mobile-outcome span {
            color: #8892A4;
            font-family: var(--font-dm-sans);
            font-size: 13px;
            font-weight: 700;
            line-height: 1.35;
          }

          .mobile-outcome strong {
            color: #F5F7FA;
            font-family: var(--font-dm-sans);
            font-size: 14px;
            font-weight: 700;
            line-height: 1.35;
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

          .mobile-outcome {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
