import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { darkCards } from "@/lib/data"

export function SupportBanner() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Main Banner */}
        <div className="bg-secondary rounded-2xl p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex gap-4">
              {/* French Tech Logo Placeholder */}
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">🐿️</span>
              </div>
              {/* CopyFrog Logo Placeholder */}
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">🦊</span>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-semibold text-foreground mb-2">
                При поддержке French Tech & CopyFrog
              </h3>
              <p className="text-sm text-muted-foreground">
                Французская инновационная экосистема и AI-платформа, которая помогает нам развивать наш проект и делать его доступным для всех людей
              </p>
            </div>
            <div className="flex gap-4 text-sm">
              <Link
                href="https://copyfrog.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                copyfrog.ai
              </Link>
              <Link
                href="https://lafrenchtech.gouv.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                lafrenchtech.gouv.fr
              </Link>
            </div>
          </div>
        </div>

        {/* Dark Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {darkCards.map((card) => (
            <Card key={card.id} className="bg-foreground text-background border-0 hover-card">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">{card.title}</h4>
                <p className="text-sm opacity-80">{card.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
