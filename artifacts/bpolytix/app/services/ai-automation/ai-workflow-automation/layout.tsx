import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/app/seo";

export const metadata: Metadata = createPageMetadata({
  title: "AI Workflow Automation — Automate Your Back Office | BPOLytix",
  description:
    "Replace manual processes with AI-driven workflows. Quotes, onboarding, reporting, and more automated.",
  url: "https://bpolytix.com/services/ai-automation/ai-workflow-automation",
});

export default function AiWorkflowAutomationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
