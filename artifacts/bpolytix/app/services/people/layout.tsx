import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/app/seo";

export const metadata: Metadata = createPageMetadata({
  title: "People Office — Outsourced HR & EOR | BPOLytix",
  description:
    "Employer of Record SA↔UK, outsourced HR retainer, and onboarding & policy automation.",
  url: "https://bpolytix.com/services/people",
});

export default function PeopleLayout({ children }: { children: ReactNode }) {
  return children;
}
