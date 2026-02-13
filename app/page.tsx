import { HeroSection } from "@/components/sections/HeroSection"
import { SupportBanner } from "@/components/sections/SupportBanner"
import { AuthorStory } from "@/components/sections/AuthorStory"
import { WhatInside } from "@/components/sections/WhatInside"
import { WhyItWorks } from "@/components/sections/WhyItWorks"
import { Expressions } from "@/components/sections/Expressions"
import { TopicSpheres } from "@/components/sections/TopicSpheres"
import { MiniCourse } from "@/components/sections/MiniCourse"
import { Reviews } from "@/components/sections/Reviews"
import { Pricing } from "@/components/sections/Pricing"
import { FAQ } from "@/components/sections/FAQ"
import { Footer } from "@/components/sections/Footer"
import { AnimatedSection } from "@/components/AnimatedSection"

export default function Home() {
  return (
    <>
      <HeroSection />
      <main>
        <AnimatedSection>
          <SupportBanner />
        </AnimatedSection>
        <AnimatedSection>
          <AuthorStory />
        </AnimatedSection>
        <AnimatedSection>
          <WhatInside />
        </AnimatedSection>
        <WhyItWorks />
        <AnimatedSection>
          <Expressions />
        </AnimatedSection>
        <AnimatedSection>
          <TopicSpheres />
        </AnimatedSection>
        <AnimatedSection>
          <MiniCourse />
        </AnimatedSection>
        <AnimatedSection>
          <Reviews />
        </AnimatedSection>
        <AnimatedSection>
          <Pricing />
        </AnimatedSection>
        <AnimatedSection>
          <FAQ />
        </AnimatedSection>
      </main>
      <AnimatedSection>
        <Footer />
      </AnimatedSection>
    </>
  )
}
