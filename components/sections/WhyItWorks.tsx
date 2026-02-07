import { Check } from "lucide-react"
import { whyItWorksPoints } from "@/lib/data"
import { TextGenerateEffect } from "@/components/TextGenerateEffect"

export function WhyItWorks() {
  return (
    <section id="why" className="py-12 md:py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <TextGenerateEffect
            as="h2"
            text="Почему это работает?"
            className="text-2xl md:text-3xl lg:text-4xl font-light leading-none tracking-[-0.02em] text-foreground mb-4"
          />
          <p className="text-muted-foreground">
            Записал для вас озвучку — чтобы вы слышали правильное произношение и интонации.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="space-y-4">
            {whyItWorksPoints.map((point, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-background rounded-xl border border-border hover-card"
              >
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-accent" />
                </div>
                <p className="text-foreground">{point}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative croissants */}
        <div className="flex justify-center gap-4 mt-12 text-4xl">
          🥐 🥐 🥐
        </div>
      </div>
    </section>
  )
}
