"use client";

import { useRef, type ReactNode } from "react";
import { motion } from "framer-motion";

export interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabSwitcherProps {
  tabs: Tab[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export function TabSwitcher({ tabs, activeId, onChange, className }: TabSwitcherProps) {
  const listRef = useRef<HTMLDivElement>(null);

  function scrollTabIntoView(el: HTMLButtonElement) {
    el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
  }

  return (
    <div className={className}>
      {/* Tab row */}
      <div
        style={{
          position: "relative",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          marginBottom: "0",
        }}
      >
        <div
          ref={listRef}
          role="tablist"
          style={{
            display: "flex",
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            gap: "0",
            position: "relative",
          }}
        >
          {tabs.map((tab) => {
            const isActive = tab.id === activeId;
            return (
              <button
                key={tab.id}
                role="tab"
                type="button"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                onClick={(e) => {
                  onChange(tab.id);
                  scrollTabIntoView(e.currentTarget as HTMLButtonElement);
                }}
                style={{
                  position: "relative",
                  flexShrink: 0,
                  padding: "14px 20px",
                  minHeight: "44px",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "14px",
                  fontWeight: isActive ? 500 : 400,
                  color: isActive ? "#F5F7FA" : "#8892A4",
                  transition: "color 0.16s ease",
                  whiteSpace: "nowrap",
                  zIndex: 1,
                }}
              >
                {tab.label}

                {/* Sliding underline indicator */}
                {isActive && (
                  <motion.span
                    layoutId="tab-indicator"
                    transition={{ duration: 0.25, ease: EASE }}
                    style={{
                      position: "absolute",
                      bottom: "-1px",
                      left: 0,
                      right: 0,
                      height: "2px",
                      backgroundColor: "#1B77F2",
                      borderRadius: "9999px 9999px 0 0",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Hide scrollbar for WebKit */}
        <style jsx>{`
          div[role="tablist"]::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>

      {/* Tab panels */}
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <div
            key={tab.id}
            role="tabpanel"
            id={`panel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
            hidden={!isActive}
          >
            {isActive && (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: EASE }}
              >
                {tab.content}
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
}
