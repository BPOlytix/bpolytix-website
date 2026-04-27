import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/app/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Onboarding & Policy Automation — Systemise Your HR | BPOLytix",
  description:
    "Automated onboarding flows, policy document generation, and digital signature workflows.",
  url: "https://bpolytix.com/services/people/onboarding",
});

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return children;
}
