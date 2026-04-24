"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface TooltipProps {
  content: string;
  children: ReactNode;
  /** Visual style of the trigger. Default: "underline" */
  triggerStyle?: "underline" | "none";
}

const EASE = [0.25, 0.46, 0.45, 0.94] as const;
const OFFSET = 8; // px gap between trigger and tooltip

type Side = "top" | "bottom";
type Align = "left" | "center" | "right";

interface Position {
  side: Side;
  align: Align;
  top: number;
  left: number;
}

function computePosition(
  trigger: DOMRect,
  tooltip: DOMRect,
  vw: number,
  _vh: number
): Position {
  const gap = OFFSET;
  // Prefer top, fall back to bottom
  const fitsTop = trigger.top - tooltip.height - gap > 8;
  const side: Side = fitsTop ? "top" : "bottom";

  // Viewport-relative coords (for position: fixed)
  const top =
    side === "top"
      ? trigger.top - tooltip.height - gap
      : trigger.bottom + gap;

  // Horizontal: prefer centred on trigger, clamp to viewport
  const idealLeft = trigger.left + trigger.width / 2 - tooltip.width / 2;
  const clampedLeft = Math.max(8, Math.min(idealLeft, vw - tooltip.width - 8));

  const align: Align =
    clampedLeft <= trigger.left ? "left"
    : clampedLeft + tooltip.width >= trigger.right ? "right"
    : "center";

  return { side, align, top, left: clampedLeft };
}

export function Tooltip({ content, children, triggerStyle = "underline" }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState<Position | null>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHide = () => { if (hideTimer.current) clearTimeout(hideTimer.current); };

  const reposition = useCallback(() => {
    if (!triggerRef.current || !tipRef.current) return;
    const tr = triggerRef.current.getBoundingClientRect();
    const tp = tipRef.current.getBoundingClientRect();
    setPos(computePosition(tr, tp, window.innerWidth, window.innerHeight));
  }, []);

  const show = useCallback(() => {
    clearHide();
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    hideTimer.current = setTimeout(() => setVisible(false), 120);
  }, []);

  // Reposition when tooltip mounts or content changes
  useEffect(() => {
    if (visible) requestAnimationFrame(reposition);
  }, [visible, reposition]);

  // Close on outside click (mobile tap-away)
  useEffect(() => {
    if (!visible) return;
    function handle(e: MouseEvent | TouchEvent) {
      if (
        triggerRef.current?.contains(e.target as Node) ||
        tipRef.current?.contains(e.target as Node)
      ) return;
      setVisible(false);
    }
    document.addEventListener("mousedown", handle);
    document.addEventListener("touchstart", handle);
    return () => {
      document.removeEventListener("mousedown", handle);
      document.removeEventListener("touchstart", handle);
    };
  }, [visible]);

  return (
    <>
      {/* Trigger */}
      <span
        ref={triggerRef}
        role="button"
        tabIndex={0}
        aria-describedby={visible ? "tooltip-bubble" : undefined}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        onClick={(e) => { e.stopPropagation(); visible ? setVisible(false) : show(); }}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); visible ? setVisible(false) : show(); } }}
        style={{
          display: "inline",
          cursor: "help",
          minHeight: "44px",
          minWidth: "44px",
          borderBottom: triggerStyle === "underline"
            ? "1px dashed rgba(136,146,164,0.6)"
            : undefined,
          lineHeight: "inherit",
        }}
      >
        {children}
      </span>

      {/* Tooltip bubble — rendered in document flow, absolutely positioned */}
      <AnimatePresence>
        {visible && (
          <motion.div
            key="tooltip"
            id="tooltip-bubble"
            role="tooltip"
            ref={tipRef}
            initial={{ opacity: 0, y: pos?.side === "top" ? 4 : -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16, ease: EASE }}
            onMouseEnter={clearHide}
            onMouseLeave={hide}
            style={{
              position: "fixed",
              zIndex: 9999,
              top: pos?.top ?? -9999,
              left: pos?.left ?? -9999,
              maxWidth: "260px",
              padding: "10px 14px",
              backgroundColor: "#1C2A3A",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "8px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
              fontFamily: "var(--font-dm-sans)",
              fontSize: "13px",
              color: "#C8D0DC",
              lineHeight: 1.6,
              letterSpacing: "-0.011em",
              pointerEvents: "auto",
            }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
