import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/app/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Build Office — Websites, Apps & Business Development | BPOLytix",
  description:
    "Custom Website, custom web apps, Android apps, business plans, and business development services.",
  url: "https://bpolytix.com/services/build",
});

export default function BuildLayout({ children }: { children: ReactNode }) {
  return children;
}
