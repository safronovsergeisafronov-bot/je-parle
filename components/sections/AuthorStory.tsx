"use client"

import Image from "next/image"
import { StaggerChildren, StaggerItem } from "@/components/AnimatedSection"


export function AuthorStory() {
  return (
    <section id="story" className="py-3 md:py-4 bg-background">
      <div className="w-full px-3 lg:px-4">
        <StaggerChildren
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
          staggerDelay={0.12}
        >
          {/* ── Column 1: Title ── */}
          <StaggerItem>
            <div className="flex flex-col justify-start items-start h-full py-4 md:py-0 px-1">
              <h2 className="text-3xl md:text-4xl font-medium leading-[1.15] tracking-[-0.03em] text-foreground">
                Как&nbsp;я&nbsp;пришёл к&nbsp;этой книге?
              </h2>
            </div>
          </StaggerItem>

          {/* ── Card 1: Начало пути ── */}
          <StaggerItem>
            <div className="bg-card rounded-2xl p-5 md:p-6 flex flex-col gap-3.5 h-full">
              <h3 className="text-lg md:text-xl font-semibold leading-tight text-foreground">
                Начало пути
              </h3>

              <p className="text-sm text-muted-foreground leading-normal">
                В&nbsp;10&nbsp;лет переехал во&nbsp;Францию. Прошёл путь от&nbsp;чемпиона мира по&nbsp;хоккею и&nbsp;учёбы на&nbsp;священника до&nbsp;преподавания французского.
              </p>

              <div className="relative rounded-xl overflow-hidden">
                <Image
                  src="/images/nachalo-puti.png"
                  alt="Начало пути — Гаврилов Илья"
                  width={600}
                  height={450}
                  className="w-full h-auto"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>

              {/* Link */}
              <a
                href="https://www.instagram.com/french_super"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground underline underline-offset-4 decoration-border hover:text-foreground hover:decoration-foreground/40 transition-colors mt-auto text-center w-full block"
                aria-label="Читать историю автора в Instagram актуальном"
              >
                Читать мою историю в&nbsp;актуальном
              </a>
            </div>
          </StaggerItem>

          {/* ── Card 2: Мечта ── */}
          <StaggerItem>
            <div className="rounded-2xl p-5 md:p-6 flex flex-col gap-3.5 h-full min-h-[280px] md:min-h-0 relative overflow-hidden">
              <Image
                src="/images/mechta.jpg"
                alt="Мечта — материалы Гаврилова Ильи"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <h3 className="text-lg md:text-xl font-semibold leading-tight text-white relative z-10">
                Мечта
              </h3>

              <p className="text-sm text-white/80 leading-normal relative z-10">
                С&nbsp;детства хотел написать книгу. За&nbsp;7&nbsp;лет
                преподавания накопил много заметок и&nbsp;материалов, которые
                нельзя было держать в&nbsp;столе.
              </p>
            </div>
          </StaggerItem>

          {/* ── Card 3: Сегодня ── */}
          <StaggerItem>
            <div className="bg-secondary rounded-2xl p-5 md:p-6 flex flex-col gap-3.5 h-full">
              <h3 className="text-lg md:text-xl font-semibold leading-tight text-foreground">
                Сегодня
              </h3>

              <p className="text-sm text-muted-foreground leading-normal">
                Я&nbsp;собрал лучшее, добавил примеры и&nbsp;озвучку.
                В&nbsp;итоге появилась книга &laquo;Je&nbsp;parle!&raquo;&nbsp;&mdash;
                концентрат живого французского, которым пользуются каждый день.
              </p>

              <div className="relative mt-auto -mx-5 md:-mx-6 -mb-5 md:-mb-6 overflow-hidden rounded-b-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/segodnya.svg"
                  alt="Аудиоплеер"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </StaggerItem>
        </StaggerChildren>
      </div>
    </section>
  )
}
