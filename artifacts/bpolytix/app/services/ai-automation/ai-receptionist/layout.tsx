import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/app/seo";

export const metadata: Metadata = createPageMetadata({
  title: "AI Receptionist — 24/7 Customer Intake | BPOLytix",
  description:
    "An AI receptionist that qualifies leads, books calls, and answers questions around the clock.",
  url: "https://bpolytix.com/services/ai-automation/ai-receptionist",
});

export default function AiReceptionistLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
