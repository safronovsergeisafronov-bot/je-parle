import { Header } from "@/components/sections/Header"
import { Footer } from "@/components/sections/Footer"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Блог | Je Parle! — French Super",
  description: "Статьи о французском языке, культуре и методах обучения",
}

const articles = [
  {
    id: 1,
    title: "10 фраз для знакомства на французском",
    category: "Разговорник",
    description: "Простые и эффективные фразы, которые помогут начать разговор с носителем языка...",
    date: "5 февраля 2026",
    readTime: "5 мин",
  },
  {
    id: 2,
    title: "Как правильно произносить французское R",
    category: "Произношение",
    description: "Пошаговое руководство по освоению самого сложного звука французского языка...",
    date: "3 февраля 2026",
    readTime: "8 мин",
  },
  {
    id: 3,
    title: "Субжонктив: когда и зачем использовать",
    category: "Грамматика",
    description: "Разбираемся в одном из самых запутанных наклонений французского языка...",
    date: "1 февраля 2026",
    readTime: "12 мин",
  },
]

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-light mb-4">Блог</h1>
              <p className="text-lg text-muted-foreground">
                Статьи о французском языке, культуре и методах обучения
              </p>
            </div>

            <div className="grid gap-6">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="group bg-card rounded-2xl p-6 border border-border hover:shadow-xl transition-all duration-300 hover:scale-[1.01] cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Thumbnail */}
                    <div className="w-full md:w-48 h-32 bg-secondary rounded-xl shrink-0 flex items-center justify-center">
                      <span className="text-4xl opacity-50">📝</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge variant="ghost" size="sm">
                          {article.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {article.date}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          • {article.readTime}
                        </span>
                      </div>

                      <h2 className="text-xl font-medium mb-2 group-hover:text-accent transition-colors">
                        {article.title}
                      </h2>

                      <p className="text-muted-foreground line-clamp-2">
                        {article.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
