"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Instagram, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ContactModal } from "@/components/ContactModal"
import { TelegramIcon } from "@/components/icons/TelegramIcon"
import { navLinks, mobileNavLinks, socialLinks } from "@/lib/data"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo / Author */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-secondary overflow-hidden">
              <Image
                src="/images/author-avatar.jpg"
                alt="Гаврилов Илья"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-medium text-foreground">Гаврилов Илья</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <ContactModal>
              <Button variant="outline" size="sm">
                Связаться
              </Button>
            </ContactModal>
          </nav>

          {/* Social Links (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="https://www.instagram.com/french_super"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" aria-hidden="true" />
            </Link>
            <Link
              href="https://t.me/frenchsuper"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
              aria-label="Telegram"
            >
              <TelegramIcon className="w-5 h-5" />
            </Link>
            <Link
              href="https://www.youtube.com/@frenchsuper"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-2">
              {mobileNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
              <Link
                href="https://www.instagram.com/french_super"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link
                href="https://t.me/frenchsuper"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="Telegram"
              >
                <TelegramIcon className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.youtube.com/@frenchsuper"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" aria-hidden="true" />
              </Link>
            </div>
            <Button className="w-full mt-4" asChild>
              <Link href="#buy">Приобрести книгу</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
