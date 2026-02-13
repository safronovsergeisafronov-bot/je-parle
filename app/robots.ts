import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/cabinet/", "/login"],
      },
    ],
    sitemap: "https://french-super.com/book/sitemap.xml",
  }
}
