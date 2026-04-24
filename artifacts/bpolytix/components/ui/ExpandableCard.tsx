"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";

export interface ExpandableCardProps {
  serviceName: string;
  tagline: string;
  description: string;
  pricingSummary?: string;
  serviceHref?: string;
  className?: string;
}

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export function ExpandableCard({
  serviceName,
  tagline,
  description,
  pricingSummary,
  serviceHref,
  className,
}: ExpandableCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={className}
      style={{
        backgroundColor: "#1C2A3A",
        border: `1px solid ${isOpen ? "rgba(27,119,242,0.35)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: "12px",
        overflow: "hidden",
        transition: "border-color 0.2s ease",
      }}
    >
      {/* Collapsed header — always visible */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "20px 24px",
          minHeight: "44px",
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: "16px",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "17px",
              fontWeight: 600,
              color: "#F5F7FA",
              lineHeight: 1.2,
              marginBottom: "4px",
            }}
          >
            {serviceName}
          </p>
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "14px",
              color: "#8892A4",
              lineHeight: 1.4,
              letterSpacing: "-0.011em",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {tagline}
          </p>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          style={{ flexShrink: 0, display: "flex", alignItems: "center" }}
        >
          <ChevronDown
            size={20}
            color={isOpen ? "#1B77F2" : "#8892A4"}
            strokeWidth={2}
          />
        </motion.span>
      </button>

      {/* Expanded detail */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                padding: "0 24px 24px",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                paddingTop: "20px",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "15px",
                  color: "#C8D0DC",
                  lineHeight: 1.7,
                  letterSpacing: "-0.011em",
                  marginBottom: pricingSummary || serviceHref ? "16px" : 0,
                }}
              >
                {description}
              </p>

              {pricingSummary && (
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "13px",
                    color: "#00D4AA",
                    lineHeight: 1.5,
                    marginBottom: serviceHref ? "16px" : 0,
                  }}
                >
                  {pricingSummary}
                </p>
              )}

              {serviceHref && (
                <Link
                  href={serviceHref}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#1B77F2",
                    textDecoration: "none",
                  }}
                >
                  View full details
                  <ArrowRight size={14} strokeWidth={2} />
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
