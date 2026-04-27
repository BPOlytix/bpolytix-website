import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { HeroSection } from "@/components/HeroSection";
import { StatsBar } from "@/components/StatsBar";
import { HowItWorks } from "@/components/HowItWorks";
import { ServicesBento } from "@/components/ServicesBento";
import { TrustBlock } from "@/components/TrustBlock";
import { CTABanner } from "@/components/CTABanner";
import { Footer } from "@/components/Footer";
import { createPageMetadata } from "@/app/seo";

export const metadata: Metadata = createPageMetadata({
  title: "BPOLytix — Business Process Outsourcing Solutions",
  description:
    "Finance, AI & Automation, People, and Build services for SA startups and UK SMEs. We build it. You own it.",
  url: "https://bpolytix.com",
});

export default function HomePage() {
  return (
    <main style={{ backgroundColor: "#0A0F1A" }}>
      <Nav />
      <HeroSection />
      <StatsBar />
      <HowItWorks />
      <ServicesBento />
      <TrustBlock />
      <CTABanner />
      <Footer />
    </main>
  );
}
