"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export interface AccordionItem {
  id: string;
  trigger: string;
  content: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** Allow multiple panels open simultaneously. Default: false (single open) */
  allowMultiple?: boolean;
  className?: string;
}

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export function Accordion({ items, allowMultiple = false, className }: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div
      className={className}
      style={{
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      {items.map((item, i) => {
        const isOpen = openIds.has(item.id);
        const isLast = i === items.length - 1;

        return (
          <div
            key={item.id}
            style={{
              borderBottom: isLast ? undefined : "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              className="accordion-trigger"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                padding: "18px 20px",
                minHeight: "44px",
                backgroundColor: isOpen ? "rgba(27,119,242,0.06)" : "transparent",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                transition: "background-color 0.16s ease",
                gap: "16px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "15px",
                  color: isOpen ? "#F5F7FA" : "#C8D0DC",
                  fontWeight: isOpen ? 500 : 400,
                  lineHeight: 1.4,
                  transition: "color 0.16s ease",
                }}
              >
                {item.trigger}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25, ease: EASE }}
                style={{ flexShrink: 0, display: "flex", alignItems: "center" }}
              >
                <ChevronDown
                  size={18}
                  color={isOpen ? "#1B77F2" : "#8892A4"}
                  strokeWidth={2}
                />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  style={{ overflow: "hidden" }}
                >
                  <div
                    style={{
                      padding: "4px 20px 20px",
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "15px",
                      color: "#8892A4",
                      lineHeight: 1.7,
                      letterSpacing: "-0.011em",
                    }}
                  >
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
