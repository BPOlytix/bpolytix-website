import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/app/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Fractional CFO — Part-Time Finance Leadership | BPOLytix",
  description:
    "Board-ready CFO output without the full-time salary. Budgets, forecasts, investor decks, cash flow management.",
  url: "https://bpolytix.com/services/finance/fractional-cfo",
});

export default function FractionalCfoLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
