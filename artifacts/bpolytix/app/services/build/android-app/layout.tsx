import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/app/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Android Application — Custom Mobile Apps | BPOLytix",
  description:
    "Custom Android apps built for your business. Delivered with full source code and Play Store submission.",
  url: "https://bpolytix.com/services/build/android-app",
});

export default function AndroidAppLayout({ children }: { children: ReactNode }) {
  return children;
}
