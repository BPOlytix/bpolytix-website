import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/app/seo";

export const metadata: Metadata = createPageMetadata({
  title: "AI Agent Build & Deploy — Custom AI Agents | BPOLytix",
  description:
    "Custom AI agents designed, built, and deployed for your business. You own the agent.",
  url: "https://bpolytix.com/services/ai-automation/ai-agent-build",
});

export default function AiAgentBuildLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
