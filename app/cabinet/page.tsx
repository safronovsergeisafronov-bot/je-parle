import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export const metadata = {
  title: "Личный кабинет | Je Parle! — French Super",
  description: "Ваш прогресс в изучении французского языка",
}

const stats = [
  { label: "Уроков пройдено", value: "12", total: "24", icon: "📚" },
  { label: "Слов изучено", value: "156", total: "300", icon: "📝" },
  { label: "Часов практики", value: "8.5", total: "20", icon: "⏱️" },
  { label: "Дней подряд", value: "7", total: null, icon: "🔥" },
]

const recentActivity = [
  { lesson: "Числа и время", date: "Сегодня", progress: 30 },
  { lesson: "Приветствия и знакомство", date: "Вчера", progress: 75 },
  { lesson: "Алфавит и фонетика", date: "2 дня назад", progress: 100 },
]

export default function CabinetPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl md:text-4xl font-light mb-2">
          Добро пожаловать! 👋
        </h1>
        <p className="text-lg text-muted-foreground">
          Продолжайте изучение французского языка
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{stat.icon}</span>
              {stat.total && (
                <Badge variant="ghost" size="sm">
                  {stat.value}/{stat.total}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-1">
              {stat.label}
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-light">{stat.value}</span>
              {stat.total && (
                <span className="text-sm text-muted-foreground">
                  / {stat.total}
                </span>
              )}
            </div>
            {stat.total && (
              <Progress
                value={parseFloat(stat.value)}
                max={parseFloat(stat.total)}
                size="sm"
                className="mt-4"
              />
            )}
          </div>
        ))}
      </div>

      {/* Current Level */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium">Текущий уровень</h2>
          <Badge variant="success" size="lg">A2</Badge>
        </div>
        <Progress value={65} variant="success" size="lg" />
        <div className="flex justify-between mt-3">
          <p className="text-sm text-muted-foreground">
            65% до уровня B1
          </p>
          <p className="text-sm font-medium text-green-600">
            +5% за неделю
          </p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <h2 className="text-xl font-medium mb-6">Последняя активность</h2>
        <div className="space-y-4">
          {recentActivity.map((activity, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-4 border-b border-border last:border-0"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  📖
                </div>
                <div>
                  <p className="font-medium">{activity.lesson}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.date}
                  </p>
                </div>
              </div>
              <Badge
                variant={activity.progress === 100 ? "success" : "secondary"}
              >
                {activity.progress}%
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
