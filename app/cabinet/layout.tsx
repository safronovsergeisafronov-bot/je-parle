"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  LayoutDashboard,
  User,
  TrendingUp,
  Settings,
  LogOut,
  Menu,
  X,
  BookOpen,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const menuItems = [
  { href: "/cabinet", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/cabinet/profile", icon: User, label: "Профиль" },
  { href: "/cabinet/progress", icon: TrendingUp, label: "Прогресс" },
  { href: "/cabinet/settings", icon: Settings, label: "Настройки" },
]

const learningItems = [
  { href: "/lessons", icon: BookOpen, label: "Уроки" },
  { href: "/blog", icon: FileText, label: "Блог" },
]

export default function CabinetLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky top-0 inset-y-0 left-0 z-50
          w-72 h-screen bg-card border-r border-border
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-border">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <span className="text-2xl">⚜️</span>
              <span className="font-semibold text-lg">Je Parle!</span>
            </Link>
            <button
              className="md:hidden p-2 hover:bg-secondary rounded-full transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
            {/* Main Menu */}
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 px-3 font-medium">
                Меню
              </p>
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                      ${pathname === item.href
                        ? "bg-accent text-accent-foreground shadow-md"
                        : "hover:bg-secondary text-foreground hover:scale-[1.02]"
                      }
                    `}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-border" />

            {/* Learning */}
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 px-3 font-medium">
                Обучение
              </p>
              <div className="space-y-1">
                {learningItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary transition-all duration-200 hover:scale-[1.02]"
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Footer - User Profile */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
              <Avatar size="default">
                <AvatarFallback>ИГ</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Илья Гаврилов</p>
                <p className="text-xs text-muted-foreground truncate">
                  ilya@french-super.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-16 border-b border-border bg-card/80 backdrop-blur-md px-4 md:px-6 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="hidden md:block">
            <h1 className="text-lg font-medium text-muted-foreground">
              Личный кабинет
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <LogOut className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
