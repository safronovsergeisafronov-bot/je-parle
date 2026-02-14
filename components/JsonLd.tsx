import { faqItems, prices } from "@/lib/data"

export function JsonLd() {
  const baseUrl = "https://french-super.com"
  const bookUrl = `${baseUrl}/book`

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "name": "French Super",
        "url": baseUrl,
      },
      {
        "@type": "Organization",
        "name": "French Super",
        "url": baseUrl,
        "logo": `${bookUrl}/images/Logo.svg`,
        "sameAs": [
          "https://www.instagram.com/french_super",
          "https://t.me/frenchsuper",
          "https://www.youtube.com/@frenchsuper",
        ],
      },
      {
        "@type": "Product",
        "name": "Je Parle! — Книга живого французского",
        "description":
          "300+ живых выражений, которые используют французы каждый день. Озвучка, грамматика, примеры.",
        "image": `${bookUrl}/images/og-image.jpg`,
        "offers": {
          "@type": "Offer",
          "price": prices.EUR.price.toFixed(2),
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock",
          "url": bookUrl,
        },
        "author": {
          "@type": "Person",
          "name": "Гаврилов Илья",
        },
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqItems.map((item) => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "French Super",
            "item": baseUrl,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Je Parle!",
            "item": bookUrl,
          },
        ],
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
