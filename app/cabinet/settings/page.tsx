"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle2 } from "lucide-react"

const notificationOptions = [
  { id: "email", label: "Email-уведомления", description: "Получать письма о новых уроках", defaultChecked: true },
  { id: "push", label: "Push-уведомления", description: "Напоминания о практике", defaultChecked: false },
  { id: "weekly", label: "Еженедельный отчёт", description: "Сводка прогресса за неделю", defaultChecked: false },
]

const levelOptions = ["Уровень A1", "Уровень A2", "Уровень B1", "Уровень B2", "Уровень C1"]
const dailyGoalOptions = ["15 минут", "30 минут", "1 час", "2 часа"]

export default function SettingsPage() {
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle")
  const [notifications, setNotifications] = useState(
    Object.fromEntries(notificationOptions.map(o => [o.id, o.defaultChecked]))
  )
  const [level, setLevel] = useState("Уровень A2")
  const [dailyGoal, setDailyGoal] = useState("30 минут")

  const handleSave = async () => {
    setStatus("saving")
    // TODO: Save to API when backend is ready
    await new Promise(resolve => setTimeout(resolve, 500))
    setStatus("saved")
    setTimeout(() => setStatus("idle"), 2000)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-light">Настройки</h1>
        <Button onClick={handleSave} disabled={status === "saving"}>
          {status === "saving" ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Сохранение...
            </>
          ) : status === "saved" ? (
            <>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Сохранено
            </>
          ) : (
            "Сохранить"
          )}
        </Button>
      </div>

      {/* Notifications */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <h2 className="text-lg font-medium mb-6">Уведомления</h2>
        <div className="space-y-4">
          {notificationOptions.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <Label htmlFor={`notif-${item.id}`} className="flex-1 cursor-pointer">
                <p className="font-medium">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </Label>
              <input
                type="checkbox"
                id={`notif-${item.id}`}
                checked={notifications[item.id]}
                onChange={(e) => setNotifications(prev => ({ ...prev, [item.id]: e.target.checked }))}
                className="w-5 h-5 accent-accent rounded"
                aria-label={item.label}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Learning Preferences */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <h2 className="text-lg font-medium mb-6">Настройки обучения</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="level" className="text-sm text-muted-foreground">Цель обучения</Label>
            <select
              id="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full mt-1 p-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {levelOptions.map(opt => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="daily-goal" className="text-sm text-muted-foreground">Ежедневная цель</Label>
            <select
              id="daily-goal"
              value={dailyGoal}
              onChange={(e) => setDailyGoal(e.target.value)}
              className="w-full mt-1 p-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {dailyGoalOptions.map(opt => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Account */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <h2 className="text-lg font-medium mb-6">Аккаунт</h2>
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start rounded-xl">
            Изменить пароль
          </Button>
          <Button variant="outline" className="w-full justify-start rounded-xl">
            Экспорт данных
          </Button>
          <Button variant="outline" className="w-full justify-start rounded-xl text-red-600 hover:text-red-600 hover:bg-red-50">
            Удалить аккаунт
          </Button>
        </div>
      </div>
    </div>
  )
}
