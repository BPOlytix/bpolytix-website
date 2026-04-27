import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/app/seo";

export const metadata: Metadata = createPageMetadata({
  title: "AI Operations Service — Ongoing AI Management | BPOLytix",
  description:
    "Ongoing management of your AI tools, models, and workflows. Keeps your AI stack running and improving.",
  url: "https://bpolytix.com/services/ai-automation/ai-operations",
});

export default function AiOperationsLayout({ children }: { children: ReactNode }) {
  return children;
}
