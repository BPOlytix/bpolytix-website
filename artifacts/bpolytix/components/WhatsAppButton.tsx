"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/27781790363?text=Hi%2C+I%27d+like+to+find+out+more+about+BPOLytix";

export function WhatsAppButton() {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="bpx-whatsapp-fab"
      style={{
        position: "fixed",
        bottom: "24px",
        left: "24px",
        right: "auto",
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "8px",
      }}
    >
      <span
        role="tooltip"
        style={{
          opacity: hover ? 1 : 0,
          transform: hover ? "translateY(0)" : "translateY(4px)",
          transition: "opacity 150ms ease, transform 150ms ease",
          pointerEvents: "none",
          backgroundColor: "#0F1622",
          color: "#F5F7FA",
          fontFamily: "var(--font-dm-sans)",
          fontSize: "12px",
          fontWeight: 500,
          padding: "6px 10px",
          borderRadius: "9999px",
          border: "1px solid rgba(255,255,255,0.08)",
          whiteSpace: "nowrap",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}
      >
        Chat on WhatsApp
      </span>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "56px",
          height: "56px",
          borderRadius: "9999px",
          backgroundColor: "#25D366",
          boxShadow: "0 6px 18px rgba(37,211,102,0.35)",
          transform: hover ? "scale(1.05)" : "scale(1)",
          transition: "transform 150ms ease",
        }}
      >
        <MessageCircle size={24} color="#FFFFFF" strokeWidth={2} />
      </a>
      <style jsx>{`
        @media (max-width: 767px) {
          .bpx-whatsapp-fab {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
