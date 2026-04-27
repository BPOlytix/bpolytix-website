import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/app/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Xero Implementation & Training | BPOLytix",
  description:
    "Full Xero setup, chart of accounts, integrations, and team training. You own the account.",
  url: "https://bpolytix.com/services/finance/xero",
});

export default function XeroLayout({ children }: { children: ReactNode }) {
  return children;
}
