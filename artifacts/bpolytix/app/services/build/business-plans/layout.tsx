import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/app/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Business Plans & Funding Packs | BPOLytix",
  description:
    "Investor-ready business plans, financial models, and funding packs for SA and UK businesses.",
  url: "https://bpolytix.com/services/build/business-plans",
});

export default function BusinessPlansLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
