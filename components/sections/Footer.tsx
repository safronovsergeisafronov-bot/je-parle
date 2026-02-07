import Link from "next/link"
import { Instagram, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { footerNavColumns, socialLinks } from "@/lib/data"

// Telegram icon component
function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="py-12 md:py-16 bg-foreground text-background">
      <div className="container mx-auto px-4">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="text-2xl">⚜️</span>
          <span className="text-xl font-medium">French.Super</span>
        </div>

        {/* Contact Section */}
        <div className="text-center mb-12">
          <h3 className="text-lg font-medium mb-4">
            Держи способы, чтобы написать мне
          </h3>
          <p className="text-background/70 text-sm mb-6">
            Сразу после оплаты на ваш e-mail приходят логин и пароль для входа в личный кабинет.
          </p>
          <Button
            variant="secondary"
            className="bg-white text-foreground hover:bg-white/90"
            asChild
          >
            <Link href="#buy">Оплатить</Link>
          </Button>
        </div>

        {/* Social Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href="https://www.instagram.com/french_super"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            <Instagram className="w-5 h-5" />
            <span>Личный блог</span>
          </Link>
          <Link
            href="https://t.me/frenchsuper"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            <TelegramIcon className="w-5 h-5" />
            <span>Польза</span>
          </Link>
          <Link
            href="https://www.youtube.com/@frenchsuper"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            <Youtube className="w-5 h-5" />
            <span>Учись со мной</span>
          </Link>
        </div>

        {/* Navigation Columns */}
        <div className="grid sm:grid-cols-3 gap-8 mb-12 text-center sm:text-left">
          {footerNavColumns.map((column, colIndex) => (
            <div key={colIndex}>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/70 hover:text-background transition-colors"
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Support Banner */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 py-4 border-t border-b border-white/20">
          <span className="text-sm text-background/70">При поддержке French Tech & CopyFrog</span>
          <div className="flex gap-2">
            <span className="text-xl">🐿️</span>
            <span className="text-xl">🦊</span>
          </div>
          <div className="flex gap-4 text-sm">
            <Link
              href="https://copyfrog.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/70 hover:text-background"
            >
              copyfrog.ai
            </Link>
            <Link
              href="https://lafrenchtech.gouv.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/70 hover:text-background"
            >
              lafrenchtech.gouv.fr
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-background/70 mb-2">
            © 2025 FrenchSuper / Гаврилов Илья
          </p>
          <p className="text-xs text-background/50">
            Все материалы сайта защищены авторским правом. Любое использование без письменного согласия правообладателя запрещено.
          </p>
        </div>
      </div>
    </footer>
  )
}
