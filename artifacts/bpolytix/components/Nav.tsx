"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/pricing",  label: "Pricing"  },
  { href: "/about",    label: "About"    },
  { href: "/contact",  label: "Contact"  },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 w-full"
      style={{
        backgroundColor: "rgba(20, 30, 46, 0.9)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-8 py-4">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="text-[20px] font-bold tracking-tight"
          style={{ fontFamily: "var(--font-syne)", color: "#F5F7FA", letterSpacing: "-0.022em" }}
        >
          BPOLytix
        </Link>

        {/* Desktop nav links — hidden below md */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[14px] transition-colors hover:text-[#F5F7FA]"
              style={{ color: "#8892A4" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA — hidden below md */}
        <Link
          href="/contact"
          className="hidden rounded-full px-5 py-2 text-[14px] font-medium text-white transition-transform hover:-translate-y-px md:inline-flex"
          style={{
            backgroundColor: "#1B77F2",
            boxShadow:
              "0 8px 2px rgba(0,0,0,0), 0 5px 2px rgba(0,0,0,0.01), 0 3px 2px rgba(0,0,0,0.04), 0 1px 1px rgba(0,0,0,0.07), 0 0 1px rgba(0,0,0,0.08)",
          }}
        >
          Book a call
        </Link>

        {/* Mobile hamburger / close — visible below md only */}
        <button
          className="flex items-center justify-center md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open
            ? <X    size={22} color="#F5F7FA" strokeWidth={2} />
            : <Menu size={22} color="#F5F7FA" strokeWidth={2} />
          }
        </button>
      </div>

      {/* Mobile dropdown — full-width, below nav bar */}
      {open && (
        <div
          className="absolute inset-x-0 top-full md:hidden"
          style={{
            backgroundColor: "#141E2E",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center px-8 py-4 text-[16px] transition-colors hover:text-[#F5F7FA]"
              style={{
                color: "#8892A4",
                fontFamily: "var(--font-dm-sans)",
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
