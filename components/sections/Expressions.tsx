"use client"

import { FlipCard } from "@/components/FlipCard"
import { expressionCards } from "@/lib/data"
import { TextGenerateEffect } from "@/components/TextGenerateEffect"

export function Expressions() {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <TextGenerateEffect
            as="h2"
            text="Поймёшь ли ты, что сказали бы французы?"
            className="text-2xl md:text-3xl lg:text-4xl font-light text-foreground mb-4"
          />
          <p className="text-muted-foreground">
            Сейчас ты услышишь французскую речь в реальном темпе. Если ничего не понятно — нормально. Мы будем разбирать каждое слово медленно и чётко.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {expressionCards.map((card) => (
            <FlipCard
              key={card.id}
              theme={card.theme}
              themeRu={card.themeRu}
              topic={card.topic}
              topicRu={card.topicRu}
              audioSrc={card.audioSrc}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
