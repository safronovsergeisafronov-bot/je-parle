import Link from "next/link"
import Image from "next/image"
import { Instagram, Youtube } from "lucide-react"
import { TelegramIcon } from "@/components/icons/TelegramIcon"
import { footerNavColumns } from "@/lib/data"

export function Footer() {
  const leftNavLinks = [
    ...footerNavColumns[0].links,
    ...footerNavColumns[1].links,
  ]
  const rightNavLinks = footerNavColumns[2].links

  return (
    <footer id="contact" className="py-12 md:py-16">
      <div className="w-full px-3 lg:px-4">
        <div className="bg-white rounded-3xl p-8 md:p-12">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Left column */}
          <div className="lg:w-[35%] lg:flex-shrink-0">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-8">
              <span className="text-2xl">⚜️</span>
              <span className="text-xl font-semibold text-foreground">
                French.Super
              </span>
            </div>

            {/* Title */}
            <h3 className="text-3xl md:text-4xl font-medium leading-[1.15] tracking-[-0.03em] text-foreground mb-4">
              Держи способы,
              <br />
              чтобы написать мне
            </h3>

            {/* Subtitle */}
            <p className="text-sm text-muted-foreground mb-8 max-w-[300px]">
              Сразу после оплаты на&nbsp;ваш e-mail приходят логин
              и&nbsp;пароль для входа в&nbsp;личный кабинет.
            </p>

            {/* CTA Button */}
            <Link
              href="#buy"
              className="inline-flex items-center justify-center px-16 py-5 bg-accent text-white rounded-full text-lg font-medium hover:scale-105 transition-transform"
            >
              Оплатить
            </Link>
          </div>

          {/* Right column */}
          <div className="lg:w-[65%]">
            {/* Partners */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/French Tech.svg"
                  alt="French Tech"
                  width={28}
                  height={28}
                  className="w-7 h-7"
                />
                <Image
                  src="/images/Copy Frog.svg"
                  alt="CopyFrog"
                  width={28}
                  height={28}
                  className="w-7 h-7"
                />
              </div>
              <span className="text-sm text-foreground font-medium leading-tight">
                При поддержке
                <br />
                French Tech &amp; CopyFrog
              </span>
            </div>

            {/* Social buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Link
                href="https://www.instagram.com/french_super"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-5 py-2.5 border border-border rounded-full hover:bg-secondary/50 transition-colors shadow-none"
              >
                <Instagram className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium text-foreground">
                  Личный блог
                </span>
              </Link>
              <Link
                href="https://t.me/frenchsuper"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-5 py-2.5 border border-border rounded-full hover:bg-secondary/50 transition-colors shadow-none"
              >
                <TelegramIcon className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium text-foreground">
                  Польза
                </span>
              </Link>
              <Link
                href="https://www.youtube.com/@frenchsuper"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-5 py-2.5 border border-border rounded-full hover:bg-secondary/50 transition-colors shadow-none"
              >
                <Youtube className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium text-foreground">
                  Учись со мной
                </span>
              </Link>
            </div>

            {/* Navigation + Copyright */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Left nav */}
              <ul className="space-y-3">
                {leftNavLinks.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Right nav + copyright */}
              <div className="space-y-3">
                {rightNavLinks.map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className="block text-sm text-foreground/70 hover:text-foreground transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </Link>
                ))}
                <p className="text-sm text-foreground/70 pt-2">
                  © 2025 FrenchSuper / Гаврилов Илья
                </p>
                <p className="text-xs text-muted-foreground">
                  Все материалы сайта защищены авторским правом. Любое
                  использование без письменного согласия правообладателя
                  запрещено.
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </footer>
  )
}
