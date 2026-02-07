import { Card, CardContent } from "@/components/ui/card"
import { topicSpheres } from "@/lib/data"
import { TextGenerateEffect } from "@/components/TextGenerateEffect"

function isDarkColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance < 0.5
}

export function TopicSpheres() {
  return (
    <section className="py-12 md:py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <TextGenerateEffect
            as="h2"
            text="И вот в этот момент в голове тишина..."
            className="text-2xl md:text-3xl lg:text-4xl font-light leading-none tracking-[-0.02em] text-foreground mb-4"
          />
          <p className="text-muted-foreground">
            Для всех уровней. Даже если уже что-то знаешь, книга помогает звучать естественно и «своим» для французов.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
          {topicSpheres.map((sphere) => {
            const dark = isDarkColor(sphere.color)
            return (
              <Card
                key={sphere.id}
                className="hover-card border-0 overflow-hidden"
                style={{ backgroundColor: sphere.color }}
              >
                <CardContent className="p-6">
                  <h3
                    className="font-semibold text-lg mb-3"
                    style={{ color: dark ? "#ffffff" : "var(--foreground)" }}
                  >
                    {sphere.title}
                  </h3>
                  <ul className="space-y-1">
                    {sphere.items.map((item, index) => (
                      <li
                        key={index}
                        className="text-sm"
                        style={{
                          color: dark ? "rgba(255,255,255,0.85)" : "rgba(17,17,17,0.7)"
                        }}
                      >
                        • {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Statistics */}
        <div className="flex flex-col sm:flex-row justify-center gap-8 md:gap-16">
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold text-accent mb-2">300+</p>
            <p className="text-muted-foreground">фраз и выражений</p>
            <p className="text-sm text-muted-foreground">Чтобы понять и ответить</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold text-accent mb-2">9</p>
            <p className="text-muted-foreground">сфер повседневности</p>
            <p className="text-sm text-muted-foreground">Которые встречаются в жизни</p>
          </div>
        </div>

        {/* Bottom banner */}
        <div className="mt-12 bg-foreground text-background rounded-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-center md:text-left">
              Это твой быстрый доступ к живому французскому, который реально работает в жизни.
            </p>
            <div className="flex gap-4 text-2xl">
              ☕ 🤝 💼 🍳 ✈️
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
