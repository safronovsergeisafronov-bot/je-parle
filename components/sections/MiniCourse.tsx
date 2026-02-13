import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Eye, Heart, BookOpen } from "lucide-react"
import { miniCourseLessons } from "@/lib/data"
import { TextGenerateEffect } from "@/components/TextGenerateEffect"

function LessonProgress({ step }: { step: number }) {
  return (
    <div
      className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-background rounded-full"
      role="progressbar"
      aria-valuenow={step}
      aria-valuemin={1}
      aria-valuemax={6}
      aria-label={`Урок ${step} из 6`}
    >
      {Array.from({ length: 6 }, (_, i) => (
        <BookOpen
          key={i}
          className={`w-3.5 h-3.5 ${
            i < step ? "text-accent" : "text-secondary"
          }`}
          fill="currentColor"
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

function YouTubeBadge() {
  return (
    <div className="relative inline-flex items-center gap-2 px-5 py-2.5 bg-background border border-border rounded-full">
      {/* YouTube icon */}
      <svg width="24" height="18" viewBox="0 0 24 18" fill="none" aria-hidden="true">
        <path
          d="M23.5 2.8C23.2 1.7 22.3 0.8 21.2 0.5 19.3 0 12 0 12 0S4.7 0 2.8 0.5C1.7 0.8 0.8 1.7 0.5 2.8 0 4.7 0 9 0 9s0 4.3 0.5 6.2c0.3 1.1 1.2 2 2.3 2.3C4.7 18 12 18 12 18s7.3 0 9.2-0.5c1.1-0.3 2-1.2 2.3-2.3C24 13.3 24 9 24 9s0-4.3-0.5-6.2z"
          fill="#FF0000"
        />
        <path d="M9.6 12.8L15.8 9 9.6 5.2v7.6z" fill="white" />
      </svg>
      <span className="text-sm font-medium text-foreground">youtube</span>
      {/* YouTube badge only */}
    </div>
  )
}

export function MiniCourse() {
  return (
    <section id="mini-course" className="py-12 md:py-20">
      <div className="w-full px-3 lg:px-4">
        {/* 3-column header */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8 mb-12">
          {/* Left — title */}
          <div className="lg:flex-1">
            <div className="flex items-center gap-3">
              <TextGenerateEffect
                as="h2"
                text="Хочешь читать без запинок?"
                className="text-3xl md:text-4xl font-medium leading-[1.15] tracking-[-0.03em] text-foreground"
              />
              <Heart className="w-7 h-7 text-accent flex-shrink-0" fill="currentColor" aria-hidden="true" />
            </div>
          </div>

          {/* Center — YouTube badge */}
          <div className="lg:flex-1 flex lg:justify-center">
            <YouTubeBadge />
          </div>

          {/* Right — description */}
          <div className="lg:flex-1">
            <p className="text-muted-foreground text-sm md:text-base">
              Если чтение кажется головоломкой. Не&nbsp;переживай. Я&nbsp;записал для тебя бесплатный мини-курс по&nbsp;правилам чтения и&nbsp;произношения. 25&nbsp;минут — и&nbsp;ты&nbsp;знаешь правила.
            </p>
          </div>
        </div>

        {/* Lesson cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {miniCourseLessons.map((lesson) => (
            <div key={lesson.id} className="flex flex-col gap-3">
              {/* Video preview */}
              <div className="aspect-[16/10] rounded-2xl overflow-hidden relative">
                <Image
                  src={`/images/Video_${lesson.id}.jpg`}
                  alt={lesson.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Progress indicator */}
              <LessonProgress step={lesson.id} />

              {/* Title & duration */}
              <div>
                <h3 className="text-base md:text-lg font-semibold leading-tight text-foreground">
                  {lesson.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{lesson.duration}</p>
              </div>

              {/* Watch button */}
              <Button variant="secondary" className="w-full rounded-full shadow-none hover:scale-100 hover:bg-secondary/60 hover:shadow-none" asChild>
                <Link
                  href="https://www.youtube.com/playlist?list=PLBMzAU1DpCQeOR1rISH452WNYgIrX4Sgi"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Смотреть ${lesson.title}`}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Смотреть урок
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
