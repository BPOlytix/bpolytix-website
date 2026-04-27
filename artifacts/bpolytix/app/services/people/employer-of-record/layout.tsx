import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/app/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Employer of Record SA↔UK — Compliant Cross-Border Hiring | BPOLytix",
  description:
    "Hire across SA and UK without setting up a local entity. BPOLytix acts as the employer on record.",
  url: "https://bpolytix.com/services/people/employer-of-record",
});

export default function EmployerOfRecordLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
