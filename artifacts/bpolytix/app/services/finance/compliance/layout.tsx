import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/app/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Compliance-as-a-Service — SA & UK Business Compliance | BPOLytix",
  description:
    "Ongoing regulatory compliance for SA and UK businesses. CIPC, SARS, Companies House, HMRC filing handled for you.",
  url: "https://bpolytix.com/services/finance/compliance",
});

export default function ComplianceLayout({ children }: { children: ReactNode }) {
  return children;
}
