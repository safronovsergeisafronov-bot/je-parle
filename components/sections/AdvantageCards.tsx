import { Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { advantageCards } from "@/lib/data"
import { TextGenerateEffect } from "@/components/TextGenerateEffect"

export function AdvantageCards() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {advantageCards.map((card) => (
            <Card key={card.id} className="hover-card border-border">
              <CardContent className="p-6">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <Plus className="w-5 h-5 text-accent" />
                </div>
                <TextGenerateEffect
                  as="h3"
                  text={card.title}
                  className="font-semibold text-foreground mb-2"
                />
                <p className="text-sm text-muted-foreground">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
