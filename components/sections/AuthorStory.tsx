import { Card, CardContent } from "@/components/ui/card"
import { authorStoryBlocks } from "@/lib/data"
import { TextGenerateEffect } from "@/components/TextGenerateEffect"

export function AuthorStory() {
  return (
    <section id="story" className="py-12 md:py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <TextGenerateEffect
          as="h2"
          text="Как я пришёл к этой книге?"
          className="text-2xl md:text-3xl lg:text-4xl font-light text-center text-foreground mb-12"
        />

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {authorStoryBlocks.map((block, index) => (
            <Card key={block.id} className="hover-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <TextGenerateEffect as="h3" text={block.title} className="font-semibold text-foreground" />
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {block.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Audio Player Placeholder */}
        <div className="mt-12 max-w-2xl mx-auto">
          <Card className="border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <button className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center hover:bg-accent/90 transition-colors">
                  <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
                <div className="flex-1">
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full w-1/4 bg-accent rounded-full" />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>00:44</span>
                    <span>1:00:00</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4 italic">
                &quot;Chers amis, pendant plus de sept ans, j&apos;ai patiemment réuni des expressions et des notes...&quot;
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
