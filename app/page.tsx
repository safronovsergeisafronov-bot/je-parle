import { Header } from "@/components/sections/Header"
import { Hero } from "@/components/sections/Hero"
import { AdvantageCards } from "@/components/sections/AdvantageCards"
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

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AdvantageCards />
        <SupportBanner />
        <AuthorStory />
        <WhatInside />
        <WhyItWorks />
        <Expressions />
        <TopicSpheres />
        <MiniCourse />
        <Reviews />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
