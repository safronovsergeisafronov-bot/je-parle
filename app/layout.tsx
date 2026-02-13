import type { Metadata } from "next"
import { Inter, Onest } from "next/font/google"
import { Analytics } from "@/components/Analytics"
import { JsonLd } from "@/components/JsonLd"
import "./globals.css"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
})

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  variable: "--font-onest",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://french-super.com/book"),
  title: "Je Parle! — Книга живого французского | Гаврилов Илья",
  description: "Книга, собранная за 7 лет преподавания французского. 300+ живых выражений, которые используют французы каждый день. Озвучка, грамматика, примеры.",
  keywords: ["французский язык", "изучение французского", "Je Parle", "Гаврилов Илья", "French Super", "живой французский"],
  authors: [{ name: "Гаврилов Илья" }],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Je Parle! — Книга живого французского",
    description: "300+ живых выражений, которые используют французы каждый день",
    url: "https://french-super.com/book",
    siteName: "French Super",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Je Parle! — Книга живого французского",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Je Parle! — Книга живого французского",
    description: "300+ живых выражений, которые используют французы каждый день",
    images: ["/images/og-image.jpg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${onest.variable}`}>
      <body className="antialiased">
        <JsonLd />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
