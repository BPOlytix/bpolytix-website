"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { GrainOverlay } from "./GrainOverlay";

type CTABannerProps = {
  headline?: string;
  body?: string;
  ctaLabel?: string;
};

export function CTABanner({
  headline = "Ready to put your back office on autopilot?",
  body = "No commitment. No invoice until we deliver. One conversation about what's slowing you down.",
  ctaLabel = "Talk to us",
}: CTABannerProps) {
  return (
    <section
      className="cta-section relative overflow-hidden"
      style={{
        backgroundColor: "#0F1622",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <GrainOverlay />
      <div className="relative z-10 mx-auto flex max-w-[820px] flex-col items-center px-6 text-center sm:px-8">
        <h2
          className="cta-headline mb-5"
          style={{
            fontFamily: "var(--font-syne)",
            color: "#F5F7FA",
            letterSpacing: "-0.022em",
            lineHeight: 1.05,
            fontWeight: 700,
          }}
        >
          {headline}
        </h2>
        <p
          className="cta-sub mb-8 max-w-[560px]"
          style={{
            fontFamily: "var(--font-dm-sans)",
            color: "#8892A4",
            lineHeight: 1.7,
            letterSpacing: "-0.011em",
          }}
        >
          {body}
        </p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
          <Link
            href="/contact"
            className="bpx-cta-glow rounded-full px-7 py-3.5 text-center text-[15px] font-medium text-white transition-transform hover:-translate-y-px"
            style={{
              backgroundColor: "#1B77F2",
              boxShadow:
                "0 8px 2px rgba(0,0,0,0), 0 5px 2px rgba(0,0,0,0.01), 0 3px 2px rgba(0,0,0,0.04), 0 1px 1px rgba(0,0,0,0.07), 0 0 1px rgba(0,0,0,0.08)",
            }}
          >
            {ctaLabel}
          </Link>
        </div>
        <a
          href="https://wa.me/27781790363?text=Hi%2C+I%27d+like+to+find+out+more+about+BPOLytix"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="bpx-wa-pill inline-flex items-center justify-center"
          style={{
            backgroundColor: "#25D366",
            marginTop: "12px",
            width: "56px",
            height: "56px",
            borderRadius: "9999px",
            boxShadow: "0 6px 18px rgba(37,211,102,0.35)",
            transition: "opacity 150ms ease, transform 150ms ease",
          }}
        >
          <MessageCircle size={24} color="#FFFFFF" strokeWidth={2} />
        </a>
      </div>

      <style jsx>{`
        .cta-section { padding-top: 64px; padding-bottom: 64px; }
        .cta-headline { font-size: 32px; }
        .cta-sub { font-size: 16px; }

        @media (min-width: 640px) {
          .cta-headline { font-size: 44px; }
          .cta-sub { font-size: 17px; }
        }

        @media (min-width: 1024px) {
          .cta-section { padding-top: 96px; padding-bottom: 96px; }
          .cta-headline { font-size: 56px; }
          .cta-sub { font-size: 18px; }
        }

        .bpx-cta-glow {
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }
        .bpx-cta-glow:hover {
          box-shadow: 0 0 24px rgba(27, 119, 242, 0.4) !important;
        }

        .bpx-wa-pill:hover {
          opacity: 0.9;
        }
      `}</style>
    </section>
  );
}
