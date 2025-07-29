import { HeroSection } from "./components/HeroSection";
import { WhatIsSontineSection } from "./components/WhatIsSontineSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { BenefitsSection } from "./components/BenefitsSection";
import { SolanaEcosystemSection } from "./components/SolanaEcosystemSection";
import { SocialProofSection } from "./components/SocialProofSection";
import { PricingSection } from "./components/PricingSection";
import { FAQSection } from "./components/FAQSection";
import { DownloadSection } from "./components/DownloadSection";
import { FontDemo } from "./components/FontDemo";
import { Footer } from "./components/Footer";

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <WhatIsSontineSection />
      <FeaturesSection />
      <HowItWorksSection />
      <BenefitsSection />
      <SolanaEcosystemSection />
      <SocialProofSection />
      <PricingSection />
      <FAQSection />
      <DownloadSection />
      <FontDemo />
      <Footer />
    </main>
  );
}
