import { authorStoryBlocks } from "@/lib/data"

export function AuthorStory() {
  const nachalo = authorStoryBlocks[0]
  const mechta = authorStoryBlocks[1]
  const segodnya = authorStoryBlocks[2]

  return (
    <section id="story" className="py-12 md:py-20 bg-background">
      <div className="w-full px-3 lg:px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

          {/* Col 1: Title */}
          <div className="flex flex-col justify-center items-start">
            <h2 className="text-3xl lg:text-4xl font-medium leading-[1.15] tracking-[-0.03em] text-foreground">
              Как я&nbsp;пришёл к&nbsp;этой книге?
            </h2>
          </div>

          {/* Col 2: Начало пути */}
          <div className="bg-card rounded-2xl p-6 flex flex-col gap-4">
            <h3 className="text-lg font-semibold leading-tight text-foreground">
              {nachalo.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {nachalo.description}
            </p>

            {/* Story link */}
            <a
              href="#"
              className="text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors mt-auto text-center"
            >
              Читать мою историю в актуальном
            </a>
          </div>

          {/* Col 3: Мечта */}
          <div className="rounded-2xl overflow-hidden flex flex-col bg-card">
            {/* Title + Description */}
            <div className="p-6 flex flex-col gap-4">
              <h3 className="text-lg font-semibold leading-tight text-foreground">
                {mechta.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {mechta.description}
              </p>
            </div>
          </div>

          {/* Col 4: Сегодня */}
          <div className="bg-card rounded-2xl p-6 flex flex-col gap-4">
            <h3 className="text-lg font-semibold leading-tight text-foreground">
              {segodnya.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {segodnya.description}
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
