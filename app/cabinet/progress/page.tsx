import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export const metadata = {
  title: "Прогресс | Je Parle! — French Super",
  description: "Ваш прогресс в изучении французского языка",
}

const levels = [
  { level: "A1", name: "Начальный", progress: 100, lessons: 8, total: 8 },
  { level: "A2", name: "Элементарный", progress: 50, lessons: 4, total: 8 },
  { level: "B1", name: "Средний", progress: 0, lessons: 0, total: 8 },
  { level: "B2", name: "Выше среднего", progress: 0, lessons: 0, total: 8 },
]

const weeklyProgress = [
  { day: "Пн", hours: 1.5 },
  { day: "Вт", hours: 2 },
  { day: "Ср", hours: 1 },
  { day: "Чт", hours: 0.5 },
  { day: "Пт", hours: 2 },
  { day: "Сб", hours: 1.5 },
  { day: "Вс", hours: 0 },
]

const stats = [
  { label: "Всего часов", value: "45", icon: "⏱️" },
  { label: "Слов изучено", value: "156", icon: "📝" },
  { label: "Текущая серия", value: "7 дней", icon: "🔥" },
  { label: "Лучшая серия", value: "14 дней", icon: "🏆" },
]

export default function ProgressPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <h1 className="text-3xl md:text-4xl font-light">Прогресс обучения</h1>

      {/* Overall Progress */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <h2 className="text-xl font-medium mb-6">Общий прогресс по уровням</h2>
        <div className="space-y-6">
          {levels.map((lvl) => (
            <div key={lvl.level} className="group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Badge
                    variant={
                      lvl.progress === 100
                        ? "success"
                        : lvl.progress > 0
                          ? "default"
                          : "secondary"
                    }
                    size="lg"
                  >
                    {lvl.level}
                  </Badge>
                  <span className="font-medium">{lvl.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {lvl.lessons} / {lvl.total} уроков
                </span>
              </div>
              <Progress
                value={lvl.progress}
                variant={lvl.progress === 100 ? "success" : "default"}
                size="default"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Activity */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium">Активность за неделю</h2>
          <Badge variant="ghost">8.5 / 10 часов</Badge>
        </div>
        <div className="flex items-end justify-between h-48 gap-3 mb-4">
          {weeklyProgress.map((day) => (
            <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex flex-col justify-end h-40">
                <div
                  className="w-full bg-accent rounded-t-lg transition-all duration-300 hover:bg-accent/80"
                  style={{
                    height: `${(day.hours / 2) * 100}%`,
                    minHeight: day.hours > 0 ? "12px" : "4px",
                  }}
                />
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                {day.day}
              </span>
              <span className="text-xs text-muted-foreground">
                {day.hours}ч
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <span className="text-sm text-muted-foreground">Часы практики</span>
          </div>
          <span className="text-sm font-medium">
            Цель: 10 часов в неделю
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-card rounded-2xl p-6 border border-border text-center hover:shadow-lg transition-shadow"
          >
            <span className="text-3xl mb-3 block">{stat.icon}</span>
            <p className="text-2xl font-light mb-1">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
