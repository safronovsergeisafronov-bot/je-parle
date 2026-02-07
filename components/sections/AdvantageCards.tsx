import { Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { advantageCards } from "@/lib/data"

export function AdvantageCards() {
  return (
    <section className="pt-1 md:pt-2 pb-6 md:pb-8">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {advantageCards.map((card) => (
            <Card key={card.id} className="border-0 shadow-none">
              <CardContent className="p-6">
                <div className="w-7 h-7 rounded-full bg-foreground flex items-center justify-center mb-4">
                  <Plus className="w-3.5 h-3.5 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {card.title}
                </h3>
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
