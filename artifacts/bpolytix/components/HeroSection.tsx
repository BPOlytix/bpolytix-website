"use client";

import Link from "next/link";
import { GrainOverlay } from "./GrainOverlay";

export function HeroSection() {
  const handleScrollToHowItWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero-section relative overflow-hidden" style={{ backgroundColor: "#0A0F1A" }}>
      <GrainOverlay />
      <div className="relative z-10 mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-6 sm:px-8 lg:grid-cols-[60%_40%] lg:gap-8">

        {/* Left — always visible */}
        <div className="flex flex-col justify-center">
          <p
            className="mb-5 text-[13px]"
            style={{ color: "#8892A4", fontFamily: "var(--font-dm-sans)" }}
          >
            Built for SA startups. Trusted by UK SMEs.
          </p>

          <h1
            className="hero-headline mb-6 font-bold"
            style={{
              fontFamily: "var(--font-syne)",
              lineHeight: 1.0,
              letterSpacing: "-0.022em",
              color: "#F5F7FA",
              fontWeight: 700,
            }}
          >
            We build it.
            <br />
            You own it
            <br />
            after 12 months.
          </h1>

          <p
            className="hero-sub mb-8 max-w-[540px]"
            style={{
              color: "#8892A4",
              fontFamily: "var(--font-dm-sans)",
              lineHeight: 1.7,
              letterSpacing: "-0.011em",
            }}
          >
            No upfront cost. No invoice until you&apos;re satisfied. Your software, your asset —
            delivered in 30 days or less.
          </p>

          {/* Buttons — stacked on mobile, side-by-side from sm */}
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <a
              href="#how-it-works"
              onClick={handleScrollToHowItWorks}
              className="btn-primary glow-border-blue rounded-full px-6 py-3.5 text-center text-[15px] font-medium text-white transition-transform hover:-translate-y-px sm:py-3"
              style={{
                backgroundColor: "#1B77F2",
                boxShadow:
                  "0 8px 2px rgba(0,0,0,0), 0 5px 2px rgba(0,0,0,0.01), 0 3px 2px rgba(0,0,0,0.04), 0 1px 1px rgba(0,0,0,0.07), 0 0 1px rgba(0,0,0,0.08)",
              }}
            >
              See how it works
            </a>
            <Link
              href="/services"
              className="rounded-full px-6 py-3.5 text-center text-[15px] font-medium transition-colors hover:bg-white/10 sm:py-3"
              style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "#F5F7FA" }}
            >
              View our services
            </Link>
          </div>

          {/* Mobile-only code card — shown below buttons on small screens */}
          <div className="hero-card-mobile mt-8 rounded-xl p-5" style={{
            backgroundColor: "#0F1622",
            border: "1px solid rgba(255,255,255,0.08)",
            fontFamily: "var(--font-jetbrains)",
            fontSize: "13px",
            lineHeight: 1.9,
          }}>
            <div className="mb-3 flex items-center gap-2 border-b border-white/[0.06] pb-3">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#FF5F57" }} />
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#FEBC2E" }} />
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#28C840" }} />
              <span className="ml-2 text-[11px]" style={{ color: "#8892A4" }}>build.status</span>
            </div>
            <div><span style={{ color: "#8892A4" }}>status:</span> <span style={{ color: "#00D4AA" }}>active</span></div>
            <div><span style={{ color: "#8892A4" }}>build:</span> <span style={{ color: "#F5F7FA" }}>in progress</span></div>
            <div><span style={{ color: "#8892A4" }}>delivery:</span> <span style={{ color: "#F5F7FA" }}>28 days</span></div>
            <div><span style={{ color: "#8892A4" }}>invoice:</span> <span style={{ color: "#00D4AA" }}>$0.00</span></div>
          </div>
        </div>

        {/* Right — desktop only */}
        <div className="hero-right relative hidden flex-col items-center justify-center lg:flex">
          {/* Radial glow */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(50% 50% at 50% 40%, rgba(27,119,242,0.18) 0%, rgba(27,119,242,0) 70%)",
            }}
          />

          {/* Pulse dot */}
          <div className="relative flex h-[280px] w-full items-center justify-center">
            <div className="relative">
              <span
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ width: 16, height: 16, backgroundColor: "#1B77F2", boxShadow: "0 0 20px rgba(27,119,242,0.6)" }}
              />
              <span
                className="bpx-pulse-ring absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ width: 16, height: 16, border: "2px solid #1B77F2", animationDelay: "0s" }}
              />
              <span
                className="bpx-pulse-ring absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ width: 16, height: 16, border: "2px solid #1B77F2", animationDelay: "0.875s" }}
              />
            </div>
          </div>

          {/* Desktop code card */}
          <div
            className="relative mt-6 w-full max-w-[380px] rounded-xl p-5"
            style={{
              backgroundColor: "#0F1622",
              border: "1px solid rgba(255,255,255,0.08)",
              fontFamily: "var(--font-jetbrains)",
              fontSize: "13px",
              lineHeight: 1.9,
            }}
          >
            <div className="mb-3 flex items-center gap-2 border-b border-white/[0.06] pb-3">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#FF5F57" }} />
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#FEBC2E" }} />
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#28C840" }} />
              <span className="ml-2 text-[11px]" style={{ color: "#8892A4" }}>build.status</span>
            </div>
            <div><span style={{ color: "#8892A4" }}>status:</span> <span style={{ color: "#00D4AA" }}>active</span></div>
            <div><span style={{ color: "#8892A4" }}>build:</span> <span style={{ color: "#F5F7FA" }}>in progress</span></div>
            <div><span style={{ color: "#8892A4" }}>delivery:</span> <span style={{ color: "#F5F7FA" }}>28 days</span></div>
            <div><span style={{ color: "#8892A4" }}>invoice:</span> <span style={{ color: "#00D4AA" }}>$0.00</span></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Mobile */
        .hero-section { padding-top: 64px; padding-bottom: 72px; }
        .hero-headline { font-size: 44px; }
        .hero-sub { font-size: 16px; }
        .hero-card-mobile { display: block; }

        /* Tablet */
        @media (min-width: 640px) {
          .hero-headline { font-size: 56px; }
          .hero-sub { font-size: 17px; }
        }

        /* Desktop */
        @media (min-width: 1024px) {
          .hero-section { padding-top: 96px; padding-bottom: 128px; }
          .hero-headline { font-size: 80px; }
          .hero-sub { font-size: 18px; }
          .hero-card-mobile { display: none; }
        }

        .bpx-pulse-ring {
          animation: bpxPulse 1.75s cubic-bezier(0.66, 0, 0, 1) infinite;
        }
        @keyframes bpxPulse {
          0%   { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
          100% { transform: translate(-50%, -50%) scale(8); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
