import { HeroSection } from "@/components/hero-section"
import { ImpactNumbers } from "@/components/impact-numbers"
import { HowItWorks } from "@/components/how-it-works"
import { Testimonials } from "@/components/testimonials"
import { DualCTA } from "@/components/dual-cta"
import { Transparency } from "@/components/transparency"
import { FAQ } from "@/components/faq"
import { FinalCTA } from "@/components/final-cta"
import { Footer } from "@/components/footer"
import { FloatingChatButton } from "@/components/floating-chat-button"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ImpactNumbers />
      <HowItWorks />
      <Testimonials />
      <DualCTA />
      <Transparency />
      <FAQ />
      <FinalCTA />
      <Footer />
      <FloatingChatButton />
    </main>
  )
}
