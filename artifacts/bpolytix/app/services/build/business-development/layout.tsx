import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/app/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Business Development Services | BPOLytix",
  description:
    "Outreach strategy, pipeline setup, and partnership development for growing SA and UK businesses.",
  url: "https://bpolytix.com/services/build/business-development",
});

export default function BusinessDevelopmentLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
