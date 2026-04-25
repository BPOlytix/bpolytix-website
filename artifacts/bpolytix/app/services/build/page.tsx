"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Blocks,
  BriefcaseBusiness,
  ClipboardList,
  Code2,
  FileCheck2,
  Handshake,
  KeyRound,
  LayoutTemplate,
  Rocket,
  ShieldOff,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { GrainOverlay } from "@/components/GrainOverlay";
import { Nav } from "@/components/Nav";
import { ExpandableCard } from "@/components/ui/ExpandableCard";

type BuildService = {
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

const SERVICES: BuildService[] = [
  {
    name: "Custom Web Application",
    summary: "Internal tools, client portals, or full SaaS products — built and owned.",
    href: "/services/build/custom-web-app",
    whatItIs:
      "A custom web app built around the way your business works. We plan the screens, build the code, and leave you with something you own.",
    whatYouGet: [
      "Product scope and user flows",
      "Build, launch, and handover",
      "Code and records ready for your team",
    ],
  },
  {
    name: "Android Application",
    summary: "Native Android apps, scoped, built, deployed, and handed over.",
    href: "/services/build/android-app",
    whatItIs:
      "An Android app built for a clear business use. We keep the scope tight, ship the app, and hand over the account and code.",
    whatYouGet: [
      "App scope and screen plan",
      "Native Android build",
      "Release support and handover",
    ],
  },
  {
    name: "Website in 3 Days",
    summary: "A proper website, live in 3 working days. Fixed price, yours to keep.",
    href: "/services/build/website-in-3-days",
    whatItIs:
      "A focused website build for businesses that need to go live quickly without renting their own front door.",
    whatYouGet: [
      "Page structure and copy fit",
      "Live website in 3 working days",
      "Handover after launch",
    ],
  },
  {
    name: "Business Plans & Funding",
    summary: "Investor-ready plans, financial models, and funding application packs.",
    href: "/services/build/business-plans",
    whatItIs:
      "A clear business plan and funding pack for owners who need the numbers, story, and documents in one place.",
    whatYouGet: [
      "Business plan and pitch pack",
      "Financial model",
      "Funding application documents",
    ],
  },
  {
    name: "Business Development",
    summary: "Pipeline, partnerships, proposals — the growth work owners don't have time for.",
    href: "/services/build/business-development",
    whatItIs:
      "Hands-on growth support for owners who need leads, partner talks, and proposals moving while they run the business.",
    whatYouGet: [
      "Lead list and outreach plan",
      "Partner and proposal support",
      "Weekly progress review",
    ],
  },
];

const WORK_STEPS: WorkStep[] = [
  {
    title: "Scope",
    text: "We map what you actually need, what exists already, and what success looks like.",
    icon: ClipboardList,
  },
  {
    title: "Build",
    text: "We design, build, and deploy on your stack, not ours.",
    icon: Code2,
  },
  {
    title: "Own",
    text: "You pay a fixed monthly fee for 12 months. Then the build is yours.",
    icon: BadgeCheck,
  },
];

const OFFICE_CLAIMS: ClaimItem[] = [
  {
    text: "Fixed-price builds.",
    icon: FileCheck2,
  },
  {
    text: "No platform fees, no lock-in.",
    icon: ShieldOff,
  },
  {
    text: "Real code, real ownership.",
    icon: Code2,
  },
  {
    text: "Yours after 12 months.",
    icon: KeyRound,
  },
];

const PROOF_LINES: ClaimItem[] = [
  {
    text: "No subscription traps.",
    icon: ShieldOff,
  },
  {
    text: "No vendor lock-in.",
    icon: KeyRound,
  },
  {
    text: "You own it after 12 months.",
    icon: BadgeCheck,
  },
];

const STAGES = [
  { title: "Wireframe", icon: LayoutTemplate },
  { title: "Build", icon: Blocks },
  { title: "Deploy", icon: Rocket },
];

function serviceDescription(service: BuildService) {
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

function BuildStageVisual() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: false, amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const canAnimate = inView && !reduceMotion;

  return (
    <div ref={ref} className="build-visual" aria-hidden="true">
      <div className="stage-frames">
        {STAGES.map((stage, index) => {
          const Icon = stage.icon;

          return (
            <motion.div
              className={`stage-frame frame-${index + 1}`}
              key={stage.title}
              animate={
                canAnimate
                  ? {
                      opacity: [0.58, 1, 0.7],
                      y: [0, -8, 0],
                      borderColor: ["#1E2D3D", "#00D4AA", "#1E2D3D"],
                    }
                  : { opacity: 0.78, y: 0, borderColor: "#1E2D3D" }
              }
              transition={{
                duration: 5.4,
                delay: index * 1.1,
                repeat: canAnimate ? Infinity : 0,
                ease: "easeInOut",
              }}
            >
              <div className="stage-topline">
                <Icon size={18} color="#00D4AA" strokeWidth={1.8} />
                <span>{stage.title}</span>
              </div>
              <div className="stage-lines">
                <i />
                <i />
                <i />
              </div>
            </motion.div>
          );
        })}
      </div>

      <svg className="stage-path" viewBox="0 0 520 210" role="presentation">
        <path className="stage-guide" d="M50 98 H470" />
        <motion.path
          className="stage-progress"
          d="M50 98 H470"
          initial={{ pathLength: 0, opacity: 0.45 }}
          animate={
            canAnimate
              ? { pathLength: [0, 0.35, 0.68, 1, 1], opacity: [0.45, 1, 1, 1, 0.65] }
              : { pathLength: 1, opacity: 0.7 }
          }
          transition={{
            duration: 6.4,
            repeat: canAnimate ? Infinity : 0,
            repeatDelay: 1.2,
            ease: "easeInOut",
          }}
        />
        {[50, 260, 470].map((cx, index) => (
          <motion.circle
            className="stage-node"
            key={cx}
            cx={cx}
            cy="98"
            r="7"
            animate={canAnimate ? { scale: [1, 1.4, 1] } : { scale: 1 }}
            transition={{
              duration: 2.8,
              delay: index * 1.1,
              repeat: canAnimate ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      <motion.div
        className="handover-marker"
        animate={
          canAnimate
            ? { opacity: [0.55, 1, 0.75], x: [0, 8, 0] }
            : { opacity: 0.76, x: 0 }
        }
        transition={{ duration: 4.2, delay: 3.2, repeat: canAnimate ? Infinity : 0, ease: "easeInOut" }}
      >
        <Handshake size={18} color="#00D4AA" strokeWidth={1.8} />
        <span>Handover ready</span>
      </motion.div>

      <div className="ownership-panel">
        {["Scope signed", "Build live", "Keys handed over"].map((item, index) => (
          <motion.div
            className="ownership-row"
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

export default function BuildOfficePage() {
  return (
    <main className="build-page">
      <Nav />

      <RevealSection className="build-hero">
        <GrainOverlay />
        <div className="page-wrap hero-grid">
          <div className="hero-copy">
            <p className="section-label">Build Office</p>
            <h1>We build it. You own it.</h1>
            <p className="hero-intro">
              Every other agency rents you a platform and charges you forever. We build what
              your business actually needs — the website, the app, the internal tool, the plan
              — and hand you the keys. No lock-in. No escalating subscription. Yours to keep,
              yours to evolve.
            </p>
            <Link className="primary-cta" href="/contact">
              Talk to us
              <ArrowRight size={18} strokeWidth={2} />
            </Link>
          </div>

          <BuildStageVisual />
        </div>
      </RevealSection>

      <RevealSection className="office-strip-section">
        <GrainOverlay />
        <div className="page-wrap office-strip">
          <div className="strip-heading">
            <p className="section-label">What a Build Office actually does for you</p>
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
            <p className="section-label">Build services</p>
            <h2>Pick the build support your business needs.</h2>
          </div>

          <div className="services-grid">
            {SERVICES.map((service, index) => (
              <ExpandableCard
                key={service.name}
                className={`build-service-card card-${index + 1}`}
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
            <p className="section-label">Why businesses move their Build Office to us</p>
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
              <h2>Talk to us about your Build Office.</h2>
            </div>
            <Link className="primary-cta" href="/contact">
              Talk to us about your Build Office
              <ArrowRight size={18} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </RevealSection>

      <Footer />

      <style jsx global>{`
        .build-page {
          min-height: 100vh;
          background-color: #0D1B2A;
          color: #F5F7FA;
        }

        .build-page section {
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

        .build-hero {
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
        .build-service-card button:focus-visible {
          outline: 2px solid #00D4AA;
          outline-offset: 3px;
        }

        .build-visual {
          position: relative;
          min-height: 560px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #111F2E;
          overflow: hidden;
        }

        .stage-frames {
          position: absolute;
          inset: 44px 32px 180px;
        }

        .stage-frame {
          position: absolute;
          width: 58%;
          min-height: 132px;
          border: 1px solid #1E2D3D;
          border-radius: 8px;
          background-color: #1C2A3A;
          padding: 18px;
        }

        .frame-1 {
          top: 0;
          left: 0;
        }

        .frame-2 {
          top: 72px;
          right: 0;
        }

        .frame-3 {
          right: 40px;
          bottom: 0;
        }

        .stage-topline {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #F5F7FA;
          font-family: var(--font-dm-sans);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1;
          margin-bottom: 18px;
        }

        .stage-lines {
          display: grid;
          gap: 12px;
        }

        .stage-lines i {
          display: block;
          height: 8px;
          border-radius: 9999px;
          background-color: #1E2D3D;
        }

        .stage-lines i:nth-child(1) {
          width: 88%;
        }

        .stage-lines i:nth-child(2) {
          width: 64%;
          background-color: #00D4AA;
        }

        .stage-lines i:nth-child(3) {
          width: 74%;
        }

        .stage-path {
          position: absolute;
          right: 20px;
          bottom: 120px;
          left: 20px;
          width: calc(100% - 40px);
          height: 180px;
        }

        .stage-guide,
        .stage-progress {
          fill: none;
          stroke-linecap: round;
        }

        .stage-guide {
          stroke: #1E2D3D;
          stroke-width: 6;
        }

        .stage-progress {
          stroke: #00D4AA;
          stroke-width: 4;
        }

        .stage-node {
          fill: #1B77F2;
          transform-box: fill-box;
          transform-origin: center;
        }

        .handover-marker {
          position: absolute;
          right: 28px;
          top: 34px;
          display: inline-flex;
          min-height: 38px;
          align-items: center;
          gap: 8px;
          border: 1px solid #1E2D3D;
          border-radius: 9999px;
          background-color: #0D1B2A;
          color: #00D4AA;
          font-family: var(--font-dm-sans);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1;
          padding: 0 12px;
        }

        .ownership-panel {
          position: absolute;
          right: 28px;
          bottom: 28px;
          left: 28px;
          display: grid;
          gap: 10px;
        }

        .ownership-row {
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

        .ownership-row i {
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
          grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
          gap: 18px;
          align-items: start;
        }

        .build-service-card {
          min-width: 0;
        }

        .build-service-card.card-5 {
          grid-column: 1 / -1;
          max-width: 720px;
        }

        .build-service-card p {
          letter-spacing: 0 !important;
        }

        .build-service-card button p:last-child {
          white-space: normal !important;
        }

        .build-service-card div[style*="padding-top: 20px"] > p:first-child {
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

          .build-visual {
            min-height: 430px;
          }

          .stage-frames {
            inset: 30px 24px 150px;
          }

          .stage-frame {
            min-height: 110px;
          }

          .work-steps {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 860px) {
          .build-hero,
          .office-strip-section,
          .services-section,
          .proof-strip-section,
          .work-section,
          .final-cta-section {
            padding-top: 48px;
            padding-bottom: 56px;
          }

          .build-hero {
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

          .build-service-card.card-5 {
            max-width: none;
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
          .build-hero {
            padding-top: 104px;
            padding-bottom: 44px;
          }

          .hero-copy h1 {
            font-size: 44px;
          }

          .hero-intro {
            font-size: 16px;
          }

          .build-visual {
            min-height: 380px;
          }

          .stage-frames {
            inset: 24px 16px 134px;
          }

          .stage-frame {
            width: 68%;
            min-height: 88px;
            padding: 14px;
          }

          .frame-2 {
            top: 60px;
          }

          .frame-3 {
            right: 18px;
          }

          .stage-path {
            right: 0;
            bottom: 92px;
            left: 0;
            width: 100%;
          }

          .handover-marker {
            right: 16px;
            top: 18px;
          }

          .ownership-panel {
            right: 16px;
            bottom: 16px;
            left: 16px;
          }

          .ownership-row {
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
          .build-service-card,
          .work-step {
            transition: none;
          }
        }
      `}</style>
    </main>
  );
}
