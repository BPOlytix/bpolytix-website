"use client";

import Link from "next/link";

export function Nav() {
  return (
    <nav
      className="sticky top-0 z-50 w-full"
      style={{
        backgroundColor: "rgba(20, 30, 46, 0.9)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-8 py-4">
        <Link
          href="/"
          className="text-[20px] font-bold tracking-tight"
          style={{ fontFamily: "var(--font-syne)", color: "#F5F7FA", letterSpacing: "-0.022em" }}
        >
          BPOLytix
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/services"
            className="text-[14px] transition-colors hover:text-[#F5F7FA]"
            style={{ color: "#8892A4" }}
          >
            Services
          </Link>
          <Link
            href="/pricing"
            className="text-[14px] transition-colors hover:text-[#F5F7FA]"
            style={{ color: "#8892A4" }}
          >
            Pricing
          </Link>
          <Link
            href="/contact"
            className="text-[14px] transition-colors hover:text-[#F5F7FA]"
            style={{ color: "#8892A4" }}
          >
            Contact
          </Link>
        </div>

        <Link
          href="/contact"
          className="rounded-full px-5 py-2 text-[14px] font-medium text-white transition-transform hover:-translate-y-px"
          style={{
            backgroundColor: "#1B77F2",
            boxShadow:
              "0 8px 2px rgba(0,0,0,0), 0 5px 2px rgba(0,0,0,0.01), 0 3px 2px rgba(0,0,0,0.04), 0 1px 1px rgba(0,0,0,0.07), 0 0 1px rgba(0,0,0,0.08)",
          }}
        >
          Book a call
        </Link>
      </div>
    </nav>
  );
}
