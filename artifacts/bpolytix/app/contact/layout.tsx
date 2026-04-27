import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/app/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact BPOLytix — Talk to Us",
  description: "Start a conversation. No commitment. No invoice until we deliver.",
  url: "https://bpolytix.com/contact",
});

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
