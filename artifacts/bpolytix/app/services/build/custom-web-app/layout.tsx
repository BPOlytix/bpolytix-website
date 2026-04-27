import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/app/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Custom Web Application — Built and Handed Over | BPOLytix",
  description:
    "Bespoke web applications scoped, built, and delivered. Source code included. No ongoing licence.",
  url: "https://bpolytix.com/services/build/custom-web-app",
});

export default function CustomWebAppLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
