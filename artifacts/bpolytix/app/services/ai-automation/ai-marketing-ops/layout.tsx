import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/app/seo";

export const metadata: Metadata = createPageMetadata({
  title: "AI Marketing Ops — Automated Content & Campaigns | BPOLytix",
  description:
    "AI-powered social content, ad campaigns, and email sequences. Built for your brand, delivered monthly.",
  url: "https://bpolytix.com/services/ai-automation/ai-marketing-ops",
});

export default function AiMarketingOpsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
