"use client"

import { FlipCard } from "@/components/FlipCard"
import { expressionCards } from "@/lib/data"

export function Expressions() {
  return (
    <section className="py-10 md:py-15 lg:py-0">
      <div className="w-full px-3 lg:px-4">
        <div className="lg:bg-card lg:rounded-b-3xl lg:px-10 lg:pt-6 lg:pb-16">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* Left: Title & subtitle */}
            <div className="lg:w-[30%] lg:flex-shrink-0">
              <h2 className="text-3xl md:text-4xl font-medium leading-[1.15] tracking-[-0.03em] text-foreground mb-6">
                Поймёшь ли&nbsp;ты,
                <br />
                что сказали&nbsp;бы
                <br />
                французы?
              </h2>
              <p className="text-base text-muted-foreground">
                Сейчас ты услышишь французскую речь в&nbsp;реальном темпе. Если
                ничего не&nbsp;понятно&nbsp;&mdash; нормально. Мы&nbsp;будем
                разбирать каждое слово медленно и&nbsp;чётко.
              </p>
            </div>

            {/* Right: 2x2 grid of expression cards */}
            <div className="lg:w-[70%] grid sm:grid-cols-2 gap-5">
              {expressionCards.map((card) => (
                <FlipCard
                  key={card.id}
                  theme={card.theme}
                  themeRu={card.themeRu}
                  topic={card.topic}
                  topicRu={card.topicRu}
                  audioSrc={card.audioSrc}
                  iconSrc={card.iconSrc}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
