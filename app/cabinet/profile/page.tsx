import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export const metadata = {
  title: "Профиль | Je Parle! — French Super",
  description: "Ваш профиль в Je Parle!",
}

const achievements = [
  { icon: "🎯", label: "Первый урок", variant: "default" as const },
  { icon: "📚", label: "10 уроков", variant: "secondary" as const },
  { icon: "🔥", label: "7 дней подряд", variant: "success" as const },
  { icon: "⭐", label: "100 слов", variant: "warning" as const },
]

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl md:text-4xl font-light">Профиль</h1>

      {/* Profile Card */}
      <div className="bg-card rounded-2xl p-8 border border-border">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <Avatar size="2xl">
            <AvatarFallback>ИГ</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-3 mb-3">
              <h2 className="text-2xl font-medium">Илья Гаврилов</h2>
              <Badge variant="success">Премиум</Badge>
            </div>
            <p className="text-muted-foreground mb-4">
              ilya@french-super.com
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline">Редактировать профиль</Button>
              <Button variant="ghost">Изменить пароль</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Info & Stats */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h3 className="text-lg font-medium mb-6">Информация</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground">Уровень</span>
              <Badge variant="default">A2</Badge>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground">Дата регистрации</span>
              <span className="font-medium">01.01.2025</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground">Уроков пройдено</span>
              <span className="font-medium">12 из 24</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-muted-foreground">Цель</span>
              <span className="font-medium">Уровень B2</span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-6 border border-border">
          <h3 className="text-lg font-medium mb-6">Прогресс к цели</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">До уровня B1</span>
                <span className="text-sm font-medium">65%</span>
              </div>
              <Progress value={65} variant="accent" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Слов изучено</span>
                <span className="text-sm font-medium">156 / 300</span>
              </div>
              <Progress value={156} max={300} variant="success" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Часов практики</span>
                <span className="text-sm font-medium">8.5 / 20</span>
              </div>
              <Progress value={8.5} max={20} variant="warning" />
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <h3 className="text-lg font-medium mb-6">Достижения</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievements.map((achievement, i) => (
            <div
              key={i}
              className="flex flex-col items-center p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <span className="text-3xl mb-2">{achievement.icon}</span>
              <Badge variant={achievement.variant} size="sm">
                {achievement.label}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
