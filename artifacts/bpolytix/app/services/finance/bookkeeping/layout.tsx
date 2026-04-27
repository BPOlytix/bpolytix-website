import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/app/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Outsourced Bookkeeping — SA & UK | BPOLytix",
  description:
    "Monthly bookkeeping, bank reconciliation, VAT returns. Fixed price. Delivered on time.",
  url: "https://bpolytix.com/services/finance/bookkeeping",
});

export default function BookkeepingLayout({ children }: { children: ReactNode }) {
  return children;
}
