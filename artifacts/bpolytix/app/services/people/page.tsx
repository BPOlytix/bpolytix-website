"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  ClipboardCheck,
  ClipboardList,
  FileCheck2,
  Landmark,
  MapPinned,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { GrainOverlay } from "@/components/GrainOverlay";
import { Nav } from "@/components/Nav";
import { ExpandableCard } from "@/components/ui/ExpandableCard";

type PeopleService = {
  name: string;
  summary: string;
  whatItIs: string;
  whatYouGet: string[];
  href: string;
};

type WorkStep = {
  title: string;
  text: string;
  icon: LucideIcon;
};

type ClaimItem = {
  text: string;
  icon: LucideIcon;
};

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const SERVICES: PeopleService[] = [
  {
    name: "Employer of Record (SA↔UK)",
    summary: "UK company hiring in South Africa? We become the legal SA employer.",
    href: "/services/people/employer-of-record",
    whatItIs:
      "A legal employment home for South African hires working with a UK company. We hold the local employment record and keep the paperwork in order.",
    whatYouGet: [
      "Employment contract and local records",
      "Monthly payroll and statutory filings",
      "Clear worker setup for your UK team",
    ],
  },
  {
    name: "Outsourced HR Retainer",
    summary: "Your HR function, run by us. Contracts, policies, advice — monthly.",
    href: "/services/people/outsourced-hr",
    whatItIs:
      "Monthly HR support for teams that need clean contracts, plain advice, and a steady person to keep the people admin moving.",
    whatYouGet: [
      "Contracts, letters, and policy upkeep",
      "HR advice when people questions come up",
      "Monthly checks on gaps and deadlines",
    ],
  },
  {
    name: "Onboarding & Policy Automation",
    summary: "New hires onboarded cleanly. Policies signed, systems set up, day one ready.",
    href: "/services/people/onboarding",
    whatItIs:
      "A clean first-day setup for each hire. We handle the documents, signatures, and handoffs so no step is missed.",
    whatYouGet: [
      "Signed contracts and policies",
      "New starter records and checklists",
      "Day-one handoff for managers",
    ],
  },
];

const WORK_STEPS: WorkStep[] = [
  {
    title: "Scope",
    text: "We map your team, your contracts, and the compliance gaps.",
    icon: ClipboardList,
  },
  {
    title: "Build",
    text: "We set up the employment structure, documents, and policies.",
    icon: Building2,
  },
  {
    title: "Own",
    text: "You run the team. We run the paperwork.",
    icon: BadgeCheck,
  },
];

const OFFICE_CLAIMS: ClaimItem[] = [
  {
    text: "UK companies hiring SA talent, legally.",
    icon: Landmark,
  },
  {
    text: "Contracts, payroll, and compliance handled end to end.",
    icon: FileCheck2,
  },
  {
    text: "HR support at a fraction of an in-house salary.",
    icon: BriefcaseBusiness,
  },
  {
    text: "Onboarding that doesn't miss a step.",
    icon: ClipboardCheck,
  },
];

const PROOF_LINES: ClaimItem[] = [
  {
    text: "SA↔UK corridor specialists.",
    icon: MapPinned,
  },
  {
    text: "Cheaper than global hiring platforms on SA hires.",
    icon: BriefcaseBusiness,
  },
  {
    text: "Fully compliant — UIF, PAYE, BCEA, HMRC.",
    icon: ShieldCheck,
  },
];

function serviceDescription(service: PeopleService) {
  return `What it is\n${service.whatItIs}\n\nWhat you get\n- ${service.whatYouGet.join("\n- ")}`;
}

function RevealSection({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.22 });
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      ref={ref}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 40 }}
      animate={reduceMotion || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {children}
    </motion.section>
  );
}

function CorridorVisual() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: false, amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const canAnimate = inView && !reduceMotion;

  return (
    <div ref={ref} className="corridor-visual" aria-hidden="true">
      <div className="region-anchor anchor-sa">
        <span>SA</span>
        <i />
      </div>
      <div className="region-anchor anchor-uk">
        <span>UK</span>
        <i />
      </div>

      <svg className="corridor-map" viewBox="0 0 560 420" overflow="visible" role="presentation">
        <path
          className="corridor-shadow"
          d="M94 286 C170 180 250 160 330 142 C390 128 426 96 414 58"
        />
        <motion.path
          className="corridor-path"
          d="M94 286 C170 180 250 160 330 142 C390 128 426 96 414 58"
          initial={{ pathLength: 0, opacity: 0.55 }}
          animate={
            canAnimate
              ? { pathLength: [0, 1, 1], opacity: [0.55, 1, 0.75] }
              : { pathLength: 1, opacity: 0.75 }
          }
          transition={{
            duration: 5.2,
            repeat: canAnimate ? Infinity : 0,
            repeatDelay: 1.1,
            ease: "easeInOut",
          }}
        />
        {[0, 1, 2].map((marker) => (
          <motion.circle
            key={marker}
            r="6"
            className="corridor-marker"
            initial={{ cx: 94, cy: 286, opacity: 0 }}
            animate={
              canAnimate
                ? {
                    cx: [94, 170, 250, 330, 390, 414],
                    cy: [286, 180, 160, 142, 128, 58],
                    opacity: [0, 1, 1, 1, 0.75, 0],
                  }
                : { cx: 250 + marker * 42, cy: 160 - marker * 34, opacity: 0.8 }
            }
            transition={{
              duration: 4.6,
              delay: marker * 1.05,
              repeat: canAnimate ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      <div className="corridor-panels">
        {["Contracts checked", "Payroll ready", "Onboarding tracked"].map((item, index) => (
          <motion.div
            className="corridor-row"
            key={item}
            animate={
              canAnimate
                ? { opacity: [0.55, 1, 0.7], x: [0, 6, 0] }
                : { opacity: 0.76, x: 0 }
            }
            transition={{
              duration: 3.6,
              delay: index * 0.45,
              repeat: canAnimate ? Infinity : 0,
              ease: "easeInOut",
            }}
          >
            <BadgeCheck size={16} color="#00D4AA" strokeWidth={1.8} />
            <span>{item}</span>
            <i />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AnimatedClaimIcon({
  icon: Icon,
  index,
}: {
  icon: LucideIcon;
  index: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      className="claim-icon"
      initial={reduceMotion ? false : { opacity: 0, y: 10, scale: 0.96 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
    >
      <Icon size={18} color="#00D4AA" strokeWidth={1.8} />
    </motion.span>
  );
}

export default function PeopleOfficePage() {
  return (
    <main className="people-page">
      <Nav />

      <RevealSection className="people-hero">
        <GrainOverlay />
        <div className="page-wrap hero-grid">
          <div className="hero-copy">
            <p className="section-label">People Office</p>
            <h1>Hire right, stay compliant, grow your team — without the overhead.</h1>
            <p className="hero-intro">
              A UK HR manager costs £45,000 to £70,000 a year. A South African HR lead
              costs the same in Rand terms. We do the same job for a fraction of that — the
              contracts, the compliance, the onboarding, and the cross-border hiring —
              without a desk or a notice period.
            </p>
            <Link className="primary-cta" href="/contact">
              Talk to us
              <ArrowRight size={18} strokeWidth={2} />
            </Link>
          </div>

          <CorridorVisual />
        </div>
      </RevealSection>

      <RevealSection className="office-strip-section">
        <GrainOverlay />
        <div className="page-wrap office-strip">
          <div className="strip-heading">
            <p className="section-label">What a People Office actually does for you</p>
          </div>

          <div className="office-claims">
            {OFFICE_CLAIMS.map((claim, index) => (
              <div className="office-claim" key={claim.text}>
                <AnimatedClaimIcon icon={claim.icon} index={index} />
                <p>{claim.text}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="services-section">
        <GrainOverlay />
        <div className="page-wrap">
          <div className="section-heading">
            <p className="section-label">People services</p>
            <h2>Pick the people support your business needs.</h2>
          </div>

          <div className="services-grid">
            {SERVICES.map((service, index) => (
              <ExpandableCard
                key={service.name}
                className={`people-service-card card-${index + 1}`}
                serviceName={service.name}
                tagline={service.summary}
                description={serviceDescription(service)}
                serviceHref={service.href}
              />
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="work-section">
        <GrainOverlay />
        <div className="page-wrap">
          <div className="work-band">
            <div className="section-heading compact">
              <p className="section-label">How we work</p>
              <h2>Scope, build, then keep it owned by you.</h2>
            </div>

            <div className="work-steps">
              {WORK_STEPS.map((step, index) => {
                const Icon = step.icon;

                return (
                  <motion.article
                    className="work-step"
                    key={step.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.7, delay: index * 0.12, ease: EASE }}
                  >
                    <div className="step-topline">
                      <span>{index + 1}</span>
                      <Icon size={20} color="#00D4AA" strokeWidth={1.8} />
                    </div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="proof-strip-section">
        <GrainOverlay />
        <div className="page-wrap proof-strip">
          <div className="strip-heading">
            <p className="section-label">Why businesses move their People Office to us</p>
          </div>

          <div className="proof-lines">
            {PROOF_LINES.map((proof, index) => (
              <div className="proof-line" key={proof.text}>
                <AnimatedClaimIcon icon={proof.icon} index={index} />
                <p>{proof.text}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="final-cta-section">
        <GrainOverlay />
        <div className="page-wrap">
          <div className="final-cta">
            <div>
              <p className="section-label">Ready to talk?</p>
              <h2>Talk to us about your People Office.</h2>
            </div>
            <Link className="primary-cta" href="/contact">
              Talk to us about your People Office
              <ArrowRight size={18} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </RevealSection>

      <Footer />

      <style jsx global>{`
        .people-page {
          min-height: 100vh;
          background-color: #0D1B2A;
          color: #F5F7FA;
        }

        .people-page section {
          position: relative;
          overflow: hidden;
          background-color: #0D1B2A;
        }

        .page-wrap {
          position: relative;
          z-index: 1;
          max-width: 1440px;
          margin: 0 auto;
          padding-left: 32px;
          padding-right: 32px;
        }

        .people-hero {
          padding-top: 128px;
          padding-bottom: 72px;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.92fr) minmax(420px, 0.78fr);
          gap: 72px;
          align-items: stretch;
        }

        .hero-copy {
          min-width: 0;
          max-width: 780px;
        }

        .section-label {
          margin: 0 0 14px;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
          line-height: 1.4;
          text-transform: uppercase;
        }

        .hero-copy h1 {
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 72px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.05;
        }

        .hero-intro {
          max-width: 680px;
          margin: 24px 0 0;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 18px;
          letter-spacing: 0;
          line-height: 1.7;
        }

        .primary-cta {
          display: inline-flex;
          min-height: 48px;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 34px;
          border: 1px solid #1B77F2;
          border-radius: 9999px;
          background-color: #1B77F2;
          color: #F5F7FA;
          font-family: var(--font-dm-sans);
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1;
          padding: 0 22px;
          text-decoration: none;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }

        .primary-cta:hover {
          box-shadow: 0 0 24px #1B77F2;
          transform: translateY(-2px);
        }

        .primary-cta:focus-visible,
        .people-service-card button:focus-visible {
          outline: 2px solid #00D4AA;
          outline-offset: 3px;
        }

        .corridor-visual {
          position: relative;
          width: 100%;
          min-width: 0;
          min-height: 560px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          overflow: hidden;
        }

        .corridor-map {
          position: absolute;
          inset: 30px 20px 190px;
          width: calc(100% - 40px);
          height: calc(100% - 220px);
        }

        .corridor-shadow,
        .corridor-path {
          fill: none;
          stroke-linecap: round;
        }

        .corridor-shadow {
          stroke: #1E2D3D;
          stroke-width: 18;
        }

        .corridor-path {
          stroke: #00D4AA;
          stroke-width: 4;
        }

        .corridor-marker {
          fill: #1B77F2;
        }

        .region-anchor {
          position: absolute;
          display: grid;
          width: 88px;
          height: 88px;
          place-items: center;
          border: 1px solid #1E2D3D;
          border-radius: 9999px;
          background-color: #1C2A3A;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 22px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1;
        }

        .region-anchor i {
          position: absolute;
          inset: 10px;
          border: 1px solid #00D4AA;
          border-radius: 9999px;
        }

        .anchor-sa {
          left: 42px;
          bottom: 198px;
        }

        .anchor-uk {
          right: 42px;
          top: 38px;
        }

        .corridor-panels {
          position: absolute;
          right: 28px;
          bottom: 28px;
          left: 28px;
          display: grid;
          gap: 10px;
        }

        .corridor-row {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) 76px;
          min-height: 42px;
          align-items: center;
          gap: 10px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #1C2A3A;
          color: #F5F7FA;
          font-family: var(--font-dm-sans);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.25;
          padding: 0 14px;
        }

        .corridor-row i {
          display: block;
          height: 7px;
          border-radius: 9999px;
          background-color: #1E2D3D;
        }

        .services-section,
        .office-strip-section,
        .proof-strip-section,
        .work-section,
        .final-cta-section {
          padding-top: 64px;
          padding-bottom: 76px;
        }

        .office-strip,
        .proof-strip {
          display: grid;
          gap: 24px;
        }

        .strip-heading .section-label {
          margin-bottom: 0;
        }

        .office-claims {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
          border-top: 1px solid #1E2D3D;
          border-bottom: 1px solid #1E2D3D;
          padding: 22px 0;
        }

        .office-claim,
        .proof-line {
          display: flex;
          min-width: 0;
          align-items: center;
          gap: 12px;
        }

        .claim-icon {
          display: inline-flex;
          width: 34px;
          height: 34px;
          flex: 0 0 auto;
          align-items: center;
          justify-content: center;
          border: 1px solid #1E2D3D;
          border-radius: 9999px;
          background-color: #111F2E;
        }

        .office-claim p,
        .proof-line p {
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-dm-sans);
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.35;
        }

        .proof-lines {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 0.96fr) minmax(0, 0.92fr);
          gap: 18px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          padding: 24px;
        }

        .section-heading {
          max-width: 760px;
          margin-bottom: 34px;
        }

        .section-heading.compact {
          margin-bottom: 0;
        }

        .section-heading h2,
        .final-cta h2 {
          margin: 0;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 48px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1;
        }

        .services-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.02fr) minmax(0, 1fr) minmax(0, 0.98fr);
          gap: 18px;
          align-items: start;
        }

        .people-service-card {
          min-width: 0;
        }

        .people-service-card p {
          letter-spacing: 0 !important;
        }

        .people-service-card button p:last-child {
          white-space: normal !important;
        }

        .people-service-card div[style*="padding-top: 20px"] > p:first-child {
          white-space: pre-line;
        }

        .work-band {
          display: grid;
          grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
          gap: 52px;
          align-items: start;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          padding: 42px;
        }

        .work-steps {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 0.9fr) minmax(0, 0.82fr);
          gap: 14px;
        }

        .work-step {
          min-height: 190px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #1C2A3A;
          padding: 22px;
        }

        .step-topline {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 26px;
        }

        .step-topline span {
          display: inline-flex;
          width: 34px;
          height: 34px;
          align-items: center;
          justify-content: center;
          border: 1px solid #00D4AA;
          border-radius: 9999px;
          color: #00D4AA;
          font-family: var(--font-dm-sans);
          font-size: 13px;
          font-weight: 700;
          line-height: 1;
        }

        .work-step h3 {
          margin: 0 0 10px;
          color: #F5F7FA;
          font-family: var(--font-syne);
          font-size: 22px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.1;
        }

        .work-step p {
          margin: 0;
          color: #8892A4;
          font-family: var(--font-dm-sans);
          font-size: 15px;
          letter-spacing: 0;
          line-height: 1.65;
        }

        .final-cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          padding: 40px;
        }

        .final-cta .primary-cta {
          flex: 0 0 auto;
          margin-top: 0;
        }

        @media (max-width: 1023px) {
          .hero-grid,
          .work-band {
            grid-template-columns: 1fr;
          }

          .corridor-visual {
            min-height: 470px;
          }

          .corridor-map {
            inset: 28px 20px 204px;
            width: calc(100% - 40px);
            height: calc(100% - 232px);
          }

          .anchor-sa {
            bottom: 190px;
          }

          .work-steps {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 860px) {
          .people-hero,
          .office-strip-section,
          .services-section,
          .proof-strip-section,
          .work-section,
          .final-cta-section {
            padding-top: 48px;
            padding-bottom: 56px;
          }

          .people-hero {
            padding-top: 112px;
          }

          .page-wrap {
            padding-left: 24px;
            padding-right: 24px;
          }

          .hero-copy h1 {
            font-size: 52px;
          }

          .section-heading h2,
          .final-cta h2 {
            font-size: 36px;
          }

          .services-grid,
          .work-steps {
            grid-template-columns: 1fr;
          }

          .office-claims {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .proof-lines {
            grid-template-columns: 1fr;
          }

          .work-band,
          .final-cta {
            padding: 28px;
          }

          .final-cta {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        @media (max-width: 560px) {
          .people-hero {
            padding-top: 104px;
            padding-bottom: 44px;
          }

          .hero-copy h1 {
            font-size: 44px;
          }

          .hero-intro {
            font-size: 16px;
          }

          .corridor-visual {
            min-height: 440px;
          }

          .corridor-map {
            inset: 28px -26px 188px;
            width: calc(100% + 52px);
            height: calc(100% - 216px);
          }

          .region-anchor {
            width: 68px;
            height: 68px;
            font-size: 18px;
          }

          .anchor-sa {
            left: 22px;
            bottom: 188px;
          }

          .anchor-uk {
            right: auto;
            left: 260px;
            top: 26px;
          }

          .corridor-panels {
            right: 16px;
            bottom: 16px;
            left: 16px;
          }

          .corridor-row {
            grid-template-columns: auto minmax(0, 1fr) 42px;
            padding: 0 12px;
          }

          .office-claims {
            gap: 16px;
          }

          .office-claim,
          .proof-line {
            align-items: flex-start;
          }

          .primary-cta {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .primary-cta,
          .people-service-card,
          .work-step {
            transition: none;
          }
        }
      `}</style>
    </main>
  );
}
