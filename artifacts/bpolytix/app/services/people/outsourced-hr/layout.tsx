import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/app/seo";

export const metadata: Metadata = createPageMetadata({
  title:
    "Outsourced HR Retainer — Part-Time HR Without the Headcount | BPOLytix",
  description:
    "HR policies, contracts, disciplinary processes, and compliance. Retained monthly, no full-time hire needed.",
  url: "https://bpolytix.com/services/people/outsourced-hr",
});

export default function OutsourcedHrLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
