"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play, Heart } from "lucide-react"
import { miniCourseLessons } from "@/lib/data"
import { StaggerChildren, StaggerItem } from "@/components/AnimatedSection"
import { VideoPlayerModal } from "@/components/VideoPlayerModal"

function LessonProgress({ step }: { step: number }) {
  return (
    <div
      className="flex items-center gap-1 pl-1 pr-2 py-1.5 bg-background rounded-full w-fit"
      role="progressbar"
      aria-valuenow={step}
      aria-valuemin={1}
      aria-valuemax={6}
      aria-label={`Урок ${step} из 6`}
    >
      {Array.from({ length: 6 }, (_, i) => (
        <Image
          key={i}
          src={i < step ? "/images/book-blank1.svg" : "/images/book-blank2.svg"}
          alt=""
          width={11}
          height={12}
          className="w-3.5 h-3.5"
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

function YouTubeBadge() {
  return (
    <div className="group relative inline-flex items-center gap-2 px-5 py-2.5 bg-background border border-transparent rounded-full hover:bg-accent transition-all duration-250 cursor-default">
      {/* YouTube icon */}
      <svg width="24" height="18" viewBox="0 0 24 18" fill="none" aria-hidden="true" className="transition-colors duration-250">
        <path
          d="M23.5 2.8C23.2 1.7 22.3 0.8 21.2 0.5 19.3 0 12 0 12 0S4.7 0 2.8 0.5C1.7 0.8 0.8 1.7 0.5 2.8 0 4.7 0 9 0 9s0 4.3 0.5 6.2c0.3 1.1 1.2 2 2.3 2.3C4.7 18 12 18 12 18s7.3 0 9.2-0.5c1.1-0.3 2-1.2 2.3-2.3C24 13.3 24 9 24 9s0-4.3-0.5-6.2z"
          fill="#FF0000"
          className="group-hover:fill-white transition-colors duration-250"
        />
        <path d="M9.6 12.8L15.8 9 9.6 5.2v7.6z" fill="white" className="group-hover:fill-accent transition-colors duration-250" />
      </svg>
      <span className="text-sm font-medium text-foreground group-hover:text-white transition-colors duration-250">youtube</span>
    </div>
  )
}

export function MiniCourse() {
  return (
    <section id="mini-course" className="py-10 md:py-15 section-subtle-gradient">
      <div className="w-full px-3 lg:px-4">
        {/* 3-column header */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8 mb-12">
          {/* Left — title */}
          <div className="lg:flex-1">
            <h2 className="text-3xl md:text-4xl font-medium leading-[1.15] tracking-[-0.03em] text-foreground">
              Хочешь читать без&nbsp;запинок?<Heart className="w-7 h-7 text-accent inline-block ml-2 align-middle relative -top-0.5" fill="currentColor" aria-hidden="true" />
            </h2>
          </div>

          {/* Center — YouTube badge */}
          <div className="lg:flex-1 flex lg:justify-center">
            <YouTubeBadge />
          </div>

          {/* Right — description */}
          <div className="lg:flex-1">
            <p className="text-base md:text-lg text-muted-foreground">
              Если чтение кажется головоломкой. Не&nbsp;переживай. Я&nbsp;записал для тебя бесплатный мини-курс по&nbsp;правилам чтения и&nbsp;произношения. 25&nbsp;минут — и&nbsp;ты&nbsp;знаешь правила.
            </p>
          </div>
        </div>

        {/* Lesson cards grid */}
        <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6" staggerDelay={0.1}>
          {miniCourseLessons.map((lesson) => (
            <StaggerItem key={lesson.id}>
              <div className="flex flex-col gap-3 h-full">
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
                <div className="flex-1">
                  <h3 className="text-base md:text-lg font-semibold leading-tight text-foreground">
                    {lesson.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{lesson.duration}</p>
                </div>

                {/* Watch button */}
                <VideoPlayerModal videoId={lesson.youtubeId} title={lesson.title}>
                  <Button
                    variant="secondary"
                    className="w-full rounded-full shadow-none hover:scale-100 hover:bg-secondary/60 hover:shadow-none"
                    aria-label={`Смотреть ${lesson.title}`}
                  >
                    <Play className="w-4 h-4 mr-2" fill="currentColor" />
                    Смотреть урок
                  </Button>
                </VideoPlayerModal>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}
