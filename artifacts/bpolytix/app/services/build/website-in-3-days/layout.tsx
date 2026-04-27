import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/app/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Website in 3 Days — Fast Professional Websites | BPOLytix",
  description:
    "A professional, mobile-first website live in 72 hours. Fixed price. You own it from day one.",
  url: "https://bpolytix.com/services/build/website-in-3-days",
});

export default function WebsiteInThreeDaysLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
