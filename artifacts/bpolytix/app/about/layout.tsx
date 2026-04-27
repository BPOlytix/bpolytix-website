import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/app/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About BPOLytix — Built for SA Startups. Trusted by UK SMEs.",
  description:
    "BPOLytix delivers outsourced finance, AI automation, HR, and build services. No subscriptions. Clients own everything we build.",
  url: "https://bpolytix.com/about",
});

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children;
}
