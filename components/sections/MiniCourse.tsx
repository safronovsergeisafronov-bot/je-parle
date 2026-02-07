import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, ExternalLink } from "lucide-react"
import { miniCourseLessons } from "@/lib/data"
import { TextGenerateEffect } from "@/components/TextGenerateEffect"

export function MiniCourse() {
  return (
    <section id="mini-course" className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <TextGenerateEffect
            as="h2"
            text="Хочешь читать без запинок? ❤️"
            className="text-2xl md:text-3xl lg:text-4xl font-light leading-none tracking-[-0.02em] text-foreground mb-4"
          />
          <p className="text-muted-foreground mb-4">
            Если чтение кажется головоломкой. Не переживай. Я записал для тебя бесплатный мини-курс по правилам чтения и произношения. 25 минут — и ты знаешь правила.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-full">
            <span className="font-semibold">4000+</span>
            <span>просмотров на YouTube</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {miniCourseLessons.map((lesson) => (
            <Card key={lesson.id} className="hover-card border-border">
              <CardContent className="p-0">
                {/* Video Preview Placeholder */}
                <div className="aspect-video bg-secondary relative rounded-t-2xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-accent/90 text-white flex items-center justify-center">
                      <Play className="w-6 h-6 ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-foreground mb-1">{lesson.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{lesson.duration}</p>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link
                      href="https://www.youtube.com/playlist?list=PLBMzAU1DpCQeOR1rISH452WNYgIrX4Sgi"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Смотреть урок
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
