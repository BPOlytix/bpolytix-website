import { Nav } from "@/components/Nav";
import { HeroSection } from "@/components/HeroSection";
import { StatsBar } from "@/components/StatsBar";
import { HowItWorks } from "@/components/HowItWorks";
import { ServicesBento } from "@/components/ServicesBento";
import { TrustBlock } from "@/components/TrustBlock";
import { CTABanner } from "@/components/CTABanner";
import { Footer } from "@/components/Footer";

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
