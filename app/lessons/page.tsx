import { Header } from "@/components/sections/Header"
import { Footer } from "@/components/sections/Footer"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export const metadata = {
  title: "Уроки | Je Parle! — French Super",
  description: "Каталог уроков французского языка",
}

const lessons = [
  { id: 1, title: "Алфавит и фонетика", level: "A1", duration: "15 мин", progress: 100 },
  { id: 2, title: "Приветствия и знакомство", level: "A1", duration: "20 мин", progress: 75 },
  { id: 3, title: "Числа и время", level: "A1", duration: "25 мин", progress: 30 },
  { id: 4, title: "В кафе и ресторане", level: "A2", duration: "30 мин", progress: 0 },
  { id: 5, title: "Путешествия", level: "A2", duration: "35 мин", progress: 0 },
  { id: 6, title: "Работа и профессии", level: "B1", duration: "40 мин", progress: 0 },
]

export default function LessonsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-light mb-4">Уроки</h1>
              <p className="text-lg text-muted-foreground">
                Изучайте французский язык шаг за шагом
              </p>
            </div>

            <div className="grid gap-4">
              {lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="group bg-card rounded-2xl p-6 border border-border hover:shadow-xl transition-all duration-300 hover:scale-[1.01] cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-xl font-light">
                        {lesson.id}
                      </div>
                      <div>
                        <h2 className="text-lg font-medium group-hover:text-accent transition-colors">
                          {lesson.title}
                        </h2>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant={
                              lesson.progress === 100
                                ? "success"
                                : lesson.progress > 0
                                  ? "default"
                                  : "secondary"
                            }
                            size="sm"
                          >
                            {lesson.level}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {lesson.duration}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      {lesson.progress === 100 ? (
                        <Badge variant="success">Завершено ✓</Badge>
                      ) : lesson.progress > 0 ? (
                        <Badge variant="ghost">{lesson.progress}%</Badge>
                      ) : (
                        <Badge variant="outline">Начать</Badge>
                      )}
                    </div>
                  </div>

                  <Progress
                    value={lesson.progress}
                    variant={lesson.progress === 100 ? "success" : "default"}
                    size="sm"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
