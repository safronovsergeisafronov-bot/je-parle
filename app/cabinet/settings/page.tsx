"use client"

import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-h2 mb-8">Настройки</h1>

      <div className="space-y-6">
        {/* Notifications */}
        <div className="bg-card rounded-[var(--radius)] p-6">
          <h2 className="text-h5 mb-4">Уведомления</h2>
          <div className="space-y-4">
            {[
              { label: "Email-уведомления", description: "Получать письма о новых уроках" },
              { label: "Push-уведомления", description: "Напоминания о практике" },
              { label: "Еженедельный отчёт", description: "Сводка прогресса за неделю" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-body-base font-medium">{item.label}</p>
                  <p className="text-body-sm text-muted-foreground">{item.description}</p>
                </div>
                <input type="checkbox" className="w-5 h-5 accent-primary" defaultChecked={i === 0} />
              </div>
            ))}
          </div>
        </div>

        {/* Learning Preferences */}
        <div className="bg-card rounded-[var(--radius)] p-6">
          <h2 className="text-h5 mb-4">Настройки обучения</h2>
          <div className="space-y-4">
            <div>
              <label className="text-body-sm text-muted-foreground">Цель обучения</label>
              <select className="w-full mt-1 p-3 rounded-lg bg-background border border-border">
                <option>Уровень A2</option>
                <option>Уровень B1</option>
                <option>Уровень B2</option>
                <option>Уровень C1</option>
              </select>
            </div>
            <div>
              <label className="text-body-sm text-muted-foreground">Ежедневная цель</label>
              <select className="w-full mt-1 p-3 rounded-lg bg-background border border-border">
                <option>15 минут</option>
                <option>30 минут</option>
                <option>1 час</option>
                <option>2 часа</option>
              </select>
            </div>
          </div>
        </div>

        {/* Account */}
        <div className="bg-card rounded-[var(--radius)] p-6">
          <h2 className="text-h5 mb-4">Аккаунт</h2>
          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              Изменить пароль
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Экспорт данных
            </Button>
            <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
              Удалить аккаунт
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
