import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/app/seo";

export const metadata: Metadata = createPageMetadata({
  title: "AI & Automation Office — AI Services for Business | BPOLytix",
  description:
    "AI marketing ops, workflow automation, AI receptionist, agent builds, and AI operations. Built and handed over.",
  url: "https://bpolytix.com/services/ai-automation",
});

export default function AiAutomationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
