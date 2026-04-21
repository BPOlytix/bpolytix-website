"use client";

import { GrainOverlay } from "./GrainOverlay";

interface PageHeroProps {
  eyebrow: string;
  headline: string;
  sub?: string;
}

export function PageHero({ eyebrow, headline, sub }: PageHeroProps) {
  return (
    <section
      className="page-hero relative overflow-hidden"
      style={{ backgroundColor: "#0A0F1A" }}
    >
      <GrainOverlay />
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-8">
        <p
          className="mb-4 text-[13px]"
          style={{ color: "#8892A4", fontFamily: "var(--font-dm-sans)" }}
        >
          {eyebrow}
        </p>
        <h1
          className="page-hero-h1 max-w-[820px]"
          style={{
            fontFamily: "var(--font-syne)",
            color: "#F5F7FA",
            letterSpacing: "-0.022em",
            lineHeight: 1.0,
            fontWeight: 700,
          }}
        >
          {headline}
        </h1>
        {sub && (
          <p
            className="page-hero-sub mt-6 max-w-[600px]"
            style={{
              fontFamily: "var(--font-dm-sans)",
              color: "#8892A4",
              lineHeight: 1.7,
              letterSpacing: "-0.011em",
            }}
          >
            {sub}
          </p>
        )}
      </div>

      <style jsx>{`
        .page-hero { padding-top: 64px; padding-bottom: 56px; }
        .page-hero-h1 { font-size: 36px; }
        .page-hero-sub { font-size: 16px; }

        @media (min-width: 640px) {
          .page-hero { padding-top: 72px; padding-bottom: 64px; }
          .page-hero-h1 { font-size: 48px; }
          .page-hero-sub { font-size: 17px; }
        }

        @media (min-width: 1024px) {
          .page-hero { padding-top: 96px; padding-bottom: 80px; }
          .page-hero-h1 { font-size: 64px; }
          .page-hero-sub { font-size: 18px; }
        }
      `}</style>
    </section>
  );
}
