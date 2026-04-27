import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/app/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Finance Office — Outsourced Finance Services | BPOLytix",
  description:
    "Fractional CFO, bookkeeping, payroll, Xero implementation, and compliance. Fixed monthly pricing. No contracts.",
  url: "https://bpolytix.com/services/finance",
});

export default function FinanceLayout({ children }: { children: ReactNode }) {
  return children;
}
