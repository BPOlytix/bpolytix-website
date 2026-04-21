"use client";

import Link from "next/link";
import { GrainOverlay } from "./GrainOverlay";

export function CTABanner() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#0F1622",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        paddingTop: "96px",
        paddingBottom: "96px",
      }}
    >
      <GrainOverlay />
      <div className="relative z-10 mx-auto flex max-w-[820px] flex-col items-center px-8 text-center">
        <h2
          className="mb-6"
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(32px, 5vw, 56px)",
            color: "#F5F7FA",
            letterSpacing: "-0.022em",
            lineHeight: 1.05,
            fontWeight: 700,
          }}
        >
          Ready to build something you&apos;ll own?
        </h2>
        <p
          className="mb-10 max-w-[560px]"
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "18px",
            color: "#8892A4",
            lineHeight: 1.7,
            letterSpacing: "-0.011em",
          }}
        >
          No commitment. No invoice. Just a conversation about what you need.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="bpx-cta-glow rounded-full px-7 py-3.5 text-[15px] font-medium text-white transition-transform hover:-translate-y-px"
            style={{
              backgroundColor: "#1B77F2",
              boxShadow:
                "0 8px 2px rgba(0,0,0,0), 0 5px 2px rgba(0,0,0,0.01), 0 3px 2px rgba(0,0,0,0.04), 0 1px 1px rgba(0,0,0,0.07), 0 0 1px rgba(0,0,0,0.08)",
            }}
          >
            Get in touch
          </Link>
          <a
            href="https://wa.me/27781790363?text=Hi%2C+I%27d+like+to+find+out+more+about+BPOLytix"
            target="_blank"
            rel="noreferrer"
            className="rounded-full px-7 py-3.5 text-[15px] font-medium transition-colors hover:bg-white/10"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              color: "#F5F7FA",
            }}
          >
            WhatsApp us
          </a>
        </div>
      </div>

      <style jsx>{`
        .bpx-cta-glow {
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }
        .bpx-cta-glow:hover {
          box-shadow: 0 0 24px rgba(27, 119, 242, 0.4) !important;
        }
      `}</style>
    </section>
  );
}
