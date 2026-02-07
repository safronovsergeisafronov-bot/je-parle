import Link from "next/link"
import { Instagram, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TelegramIcon } from "@/components/icons/TelegramIcon"
import { footerNavColumns, socialLinks } from "@/lib/data"

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
          <p className="text-background/80 text-sm mb-6">
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
                      className="text-sm text-background/80 hover:text-background transition-colors"
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
          <span className="text-sm text-background/80">При поддержке French Tech & CopyFrog</span>
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
          <p className="text-sm text-background/80 mb-2">
            © 2025 FrenchSuper / Гаврилов Илья
          </p>
          <p className="text-xs text-background/70">
            Все материалы сайта защищены авторским правом. Любое использование без письменного согласия правообладателя запрещено.
          </p>
        </div>
      </div>
    </footer>
  )
}
