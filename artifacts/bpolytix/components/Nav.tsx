"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";

const PILLARS = [
  { label: "Finance Office",         href: "/services/finance"       },
  { label: "AI & Automation Office", href: "/services/ai-automation" },
  { label: "People Office",          href: "/services/people"        },
  { label: "Build Office",           href: "/services/build"         },
] as const;

const TOP_LINKS = [
  { href: "/pricing", label: "Pricing" },
  { href: "/about",   label: "About"   },
  { href: "/contact", label: "Contact" },
] as const;

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

/* ── Brand mark (pure visual, no Link) ───────────────────────────── */
function BrandMark() {
  return (
    <div style={{ lineHeight: 1 }}>
      <p
        style={{
          fontFamily: "var(--font-syne)",
          fontWeight: 700,
          fontSize: "19px",
          color: "#F5F7FA",
          letterSpacing: "-0.022em",
          lineHeight: 1.1,
          margin: 0,
        }}
      >
        BPOLytix
      </p>
      <p
        className="text-[9.5px] md:text-[12px]"
        style={{
          fontFamily: "var(--font-dm-sans)",
          color: "#8892A4",
          letterSpacing: "0.02em",
          lineHeight: 1.3,
          marginTop: "2px",
          whiteSpace: "nowrap",
          margin: 0,
        }}
      >
        <span style={{ color: "#1B77F2" }}>B</span>usiness{" "}
        <span style={{ color: "#1B77F2" }}>P</span>rocess{" "}
        <span style={{ color: "#1B77F2" }}>O</span>utsourcing Solutions
      </p>
    </div>
  );
}

/* ── Desktop dropdown item — whileHover only, no useState ─────────── */
function DropdownItem({
  href,
  label,
  isActive,
  onClick,
}: {
  href: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      whileHover={
        isActive
          ? { backgroundColor: "rgba(27,119,242,0.06)" }
          : { backgroundColor: "rgba(27,119,242,0.08)", color: "#F5F7FA" }
      }
      transition={{ duration: 0.12, ease: EASE }}
      style={{ color: isActive ? "#1B77F2" : "#C8D0DC" }}
    >
      <Link
        href={href}
        role="menuitem"
        onClick={onClick}
        style={{
          display: "block",
          padding: "11px 16px",
          fontFamily: "var(--font-dm-sans)",
          fontSize: "14px",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        {label}
      </Link>
    </motion.div>
  );
}

/* ── Main Nav ─────────────────────────────────────────────────────── */
export function Nav() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [drawerOpen, setDrawerOpen]     = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isServicesActive = pathname.startsWith("/services");

  function openDropdown() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  }
  function scheduleClose() {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 140);
  }
  function closeMobileNav() {
    setDrawerOpen(false);
    setServicesOpen(false);
  }

  return (
    <>
      {/* ── Sticky nav bar ────────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-50 w-full"
        style={{ backgroundColor: "#0D1B2A", borderBottom: "1px solid #1E2D3D" }}
      >
        <div
          className="mx-auto flex max-w-[1440px] items-center justify-between px-6 sm:px-8"
          style={{ height: "64px" }}
        >
          {/* Brand */}
          <Link href="/" style={{ textDecoration: "none" }} aria-label="BPOLytix home">
            <BrandMark />
          </Link>

          {/* ── Desktop links (hidden < md) ─────────────────────── */}
          <div className="hidden items-center gap-5 md:flex">

            {/* Services dropdown trigger */}
            <div
              className="relative"
              onMouseEnter={openDropdown}
              onMouseLeave={scheduleClose}
            >
              <motion.button
                type="button"
                aria-haspopup="menu"
                aria-expanded={dropdownOpen}
                whileHover={!isServicesActive ? { color: "#F5F7FA" } : undefined}
                transition={{ duration: 0.16, ease: EASE }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  height: "44px",
                  padding: "0 4px",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "14px",
                  fontWeight: 400,
                  color: isServicesActive ? "#1B77F2" : "#8892A4",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Services
                <motion.span
                  animate={{ rotate: dropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <ChevronDown size={13} strokeWidth={2.2} />
                </motion.span>
              </motion.button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    key="dd"
                    role="menu"
                    aria-label="Services"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.16, ease: EASE }}
                    onMouseEnter={openDropdown}
                    onMouseLeave={scheduleClose}
                    style={{
                      position: "absolute",
                      top: "calc(100% + 6px)",
                      left: 0,
                      width: "228px",
                      backgroundColor: "#111F2E",
                      border: "1px solid #1E2D3D",
                      borderRadius: "12px",
                      boxShadow: "0 20px 48px rgba(0,0,0,0.55)",
                      overflow: "hidden",
                      zIndex: 60,
                    }}
                  >
                    {PILLARS.map((p, i) => (
                      <div
                        key={p.href}
                        style={{
                          borderBottom:
                            i < PILLARS.length - 1
                              ? "1px solid rgba(255,255,255,0.05)"
                              : undefined,
                        }}
                      >
                        <DropdownItem
                          href={p.href}
                          label={p.label}
                          isActive={pathname === p.href}
                          onClick={() => setDropdownOpen(false)}
                        />
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other top-level nav links */}
            {TOP_LINKS.map((l) => (
              <motion.div
                key={l.href}
                whileHover={pathname !== l.href ? { color: "#F5F7FA" } : undefined}
                transition={{ duration: 0.16, ease: EASE }}
                style={{ color: pathname === l.href ? "#1B77F2" : "#8892A4" }}
              >
                <Link
                  href={l.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "44px",
                    padding: "0 4px",
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "14px",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop CTA — whileHover for glow + lift, no style tag */}
          <motion.div
            className="hidden md:inline-flex"
            style={{ borderRadius: "9999px" }}
            whileHover={{
              boxShadow: "0 0 20px rgba(27,119,242,0.4)",
              y: -1,
            }}
            transition={{ duration: 0.2, ease: EASE }}
          >
            <Link
              href="/contact"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "40px",
                padding: "0 20px",
                backgroundColor: "#1B77F2",
                color: "#FFFFFF",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "14px",
                fontWeight: 500,
                borderRadius: "9999px",
                textDecoration: "none",
                boxShadow: "0 3px 8px rgba(0,0,0,0.25), 0 1px 2px rgba(0,0,0,0.15)",
              }}
            >
              Talk to us
            </Link>
          </motion.div>

          {/* Mobile hamburger (hidden ≥ md) */}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation menu"
            className="md:hidden"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "44px",
              height: "44px",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <Menu size={22} color="#F5F7FA" strokeWidth={2} />
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: EASE }}
              onClick={closeMobileNav}
              aria-hidden="true"
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 60,
                backgroundColor: "rgba(0,0,0,0.62)",
              }}
            />

            {/* Drawer — slides in from the right */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: EASE }}
              aria-label="Navigation menu"
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                width: "min(320px, 88vw)",
                zIndex: 61,
                backgroundColor: "#0D1B2A",
                borderLeft: "1px solid #1E2D3D",
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
              }}
            >
              {/* Drawer header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: "64px",
                  padding: "0 20px",
                  borderBottom: "1px solid #1E2D3D",
                  flexShrink: 0,
                }}
              >
                <Link href="/" onClick={closeMobileNav} style={{ textDecoration: "none" }}>
                  <BrandMark />
                </Link>
                <button
                  type="button"
                  onClick={closeMobileNav}
                  aria-label="Close navigation menu"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "44px",
                    height: "44px",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  <X size={20} color="#F5F7FA" strokeWidth={2} />
                </button>
              </div>

              {/* Links */}
              <div style={{ flex: 1 }}>

                {/* Services accordion trigger */}
                <button
                  type="button"
                  onClick={() => setServicesOpen((v) => !v)}
                  aria-expanded={servicesOpen}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    minHeight: "52px",
                    padding: "0 24px",
                    backgroundColor: "transparent",
                    border: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    cursor: "pointer",
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "16px",
                    color: isServicesActive ? "#1B77F2" : "#F5F7FA",
                    fontWeight: isServicesActive ? 500 : 400,
                  }}
                >
                  Services
                  <motion.span
                    animate={{ rotate: servicesOpen ? 180 : 0 }}
                    transition={{ duration: 0.22, ease: EASE }}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <ChevronDown size={18} color="#8892A4" strokeWidth={2} />
                  </motion.span>
                </button>

                {/* Services accordion body */}
                <AnimatePresence initial={false}>
                  {servicesOpen && (
                    <motion.div
                      key="services-list"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: EASE }}
                      style={{
                        overflow: "hidden",
                        backgroundColor: "rgba(255,255,255,0.02)",
                      }}
                    >
                      {PILLARS.map((p) => (
                        <Link
                          key={p.href}
                          href={p.href}
                          onClick={closeMobileNav}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            minHeight: "48px",
                            padding: "0 24px 0 40px",
                            fontFamily: "var(--font-dm-sans)",
                            fontSize: "15px",
                            color: pathname === p.href ? "#1B77F2" : "#8892A4",
                            textDecoration: "none",
                            borderBottom: "1px solid rgba(255,255,255,0.04)",
                          }}
                        >
                          {p.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Other links */}
                {TOP_LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={closeMobileNav}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      minHeight: "52px",
                      padding: "0 24px",
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "16px",
                      color: pathname === l.href ? "#1B77F2" : "#F5F7FA",
                      fontWeight: pathname === l.href ? 500 : 400,
                      textDecoration: "none",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>

              {/* Drawer CTA */}
              <div
                style={{
                  padding: "20px 24px",
                  borderTop: "1px solid #1E2D3D",
                  flexShrink: 0,
                }}
              >
                <Link
                  href="/contact"
                  onClick={closeMobileNav}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "48px",
                    backgroundColor: "#1B77F2",
                    color: "#FFFFFF",
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "15px",
                    fontWeight: 500,
                    borderRadius: "9999px",
                    textDecoration: "none",
                  }}
                >
                  Talk to us
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
