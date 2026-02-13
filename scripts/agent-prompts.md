# Agent Prompts for Je Parle! Project

> **6 самодостаточных промтов** для запуска в отдельных сессиях Claude Code.
> Каждый промт — независимая инструкция для агента, который может создать sub-team.
>
> **Статус:** Все 6 задач были выполнены (февраль 2026). Промты сохранены как шаблоны.
> Можно использовать как образец для аналогичных задач или повторного запуска.

---

## Оглавление

1. [Тесты компонентов](#промт-1-агент-тесты-компонентов) — ВЫПОЛНЕНО (186 тестов, 25 файлов)
2. [SEO + Structured Data](#промт-2-агент-seo--structured-data) — ВЫПОЛНЕНО (5 JSON-LD схем)
3. [Backend API](#промт-3-агент-backend-api) — ВЫПОЛНЕНО (Telegram Bot API)
4. [Секции A (первая половина)](#промт-4-агент-секции-a-первая-половина-лендинга) — ВЫПОЛНЕНО (файлы переименованы, ARIA)
5. [Секции B (вторая половина)](#промт-5-агент-секции-b-вторая-половина-лендинга) — ВЫПОЛНЕНО (Reviews a11y, Footer)
6. [Cabinet / Auth](#промт-6-агент-cabinet--auth) — ВЫПОЛНЕНО (9 файлов восстановлены)

---

## Порядок запуска

Все 6 агентов полностью независимы и могут быть запущены одновременно.

Единственная зависимость между агентами:
- **Агент 4** переименовывает файлы в `public/images/` (french-tech.svg, copy-frog.svg)
- **Агент 5** обновляет ссылки в `Footer.tsx` на эти новые имена

Если Агент 5 закончит раньше Агента 4 — файлы будут на старых именах, но ссылки уже обновлены. После завершения обоих агентов всё будет корректно.

### Проверка после завершения всех агентов

```bash
npm run build    # Должно собраться
npm test         # Все тесты проходят
npm run dev      # Визуальная проверка localhost:3000
```

Дополнительно:
- Все изображения загружаются (нет 404 в Network tab)
- JSON-LD рендерится в source HTML
- `/cabinet` flow работает (login → dashboard → logout)
- Форма обратной связи отправляет в Telegram (если настроен бот)

---

## Промт 1: Агент "Тесты компонентов"

> **ВЫПОЛНЕНО:** 186 тестов в 25 файлах, все проходят.
> Используй как шаблон для добавления новых тестов.

```
# Задание: Покрытие компонентов тестами (React Testing Library + Vitest)

## Контекст проекта
Ты работаешь с Next.js 16 лендингом для книги по изучению французского языка "Je Parle!".
- Стек: Next.js 16, React 19, TypeScript 5, Tailwind CSS 4, Framer Motion 12, Radix UI
- Путь к проекту: /Users/sergejsafronov/Documents/French.Super/je-parle
- В проекте есть файл CLAUDE.md с полным описанием архитектуры — прочитай его

## Твоя задача
Написать компонентные тесты для ВСЕХ секций лендинга и standalone-компонентов. Целевое покрытие: минимум 50 новых тестов.

Ты можешь создавать sub-team из нескольких агентов для параллельного написания тестов (например, один агент — секции, другой — standalone-компоненты, третий — модалы). Каждый sub-agent должен создавать файлы ТОЛЬКО в __tests__/.

## Текущее состояние тестов
В папке `__tests__/` уже есть 3 файла (21 тест):
- `api-contact.test.ts` — 8 тестов валидации Contact API
- `data.test.ts` — 9 тестов целостности данных
- `utils.test.ts` — 4 теста для cn() утилиты

## Конфигурация (НЕ менять)
- `vitest.config.ts`: environment jsdom, setupFiles vitest.setup.ts, alias @/*
- `vitest.setup.ts`: импорт @testing-library/jest-dom/vitest
- Зависимости установлены: @testing-library/react v16, @testing-library/jest-dom, vitest v4, jsdom v28

## Компоненты для тестирования

### 12 секций лендинга (components/sections/):
1. `HeroSection.tsx` (167 строк) — "use client", nav меню, ContactModal, TextGenerateEffect, advantageCards из data.ts
2. `SupportBanner.tsx` (146 строк) — "use client", кастомный Tooltip, darkCards из data.ts, StaggerChildren
3. `AuthorStory.tsx` (108 строк) — "use client", 3 карточки с Image, StaggerChildren
4. `WhatInside.tsx` (65 строк) — серверный компонент, Link на Google Drive
5. `WhyItWorks.tsx` (225 строк) — "use client", scroll-driven анимация (useScroll/useTransform), whyItWorksPoints
6. `Expressions.tsx` (48 строк) — "use client", рендерит 4 FlipCard из expressionCards
7. `TopicSpheres.tsx` (131 строка) — "use client", isDarkColor(), drag анимация, topicSpheres (9 шт)
8. `MiniCourse.tsx` (124 строки) — "use client", LessonProgress (progressbar), YouTubeBadge, miniCourseLessons
9. `Reviews.tsx` (164 строки) — "use client", carousel + popup, reviews (6 шт), ARIA carousel
10. `Pricing.tsx` (255 строк) — "use client", CurrencySelector, CountdownTimer, Tabs, prices/saleEndDate
11. `FAQ.tsx` (55 строк) — серверный компонент, Radix Accordion, faqItems
12. `Footer.tsx` (168 строк) — серверный компонент, footerNavColumns, социальные ссылки

### Standalone-компоненты:
13. `FlipCard.tsx` (190 строк) — flip-анимация, Audio API, play/pause
14. `AnimatedSection.tsx` (115 строк) — AnimatedSection, StaggerChildren, StaggerItem, useReducedMotion
15. `ContactModal.tsx` (163 строки) — Sheet (Radix), форма + fetch POST /api/contact, 4 состояния
16. `HelpModal.tsx` (163 строки) — аналог ContactModal, type="help"
17. `PurchaseModal.tsx` — Sheet, форма оплаты
18. `CountdownTimer.tsx` — setInterval, 2 варианта отображения
19. `CurrencySelector.tsx` — 4 кнопки валют, selected state
20. `TextGenerateEffect.tsx` — IntersectionObserver, слова появляются по одному
21. `AudioButton.tsx` — Audio API, play/pause, useEffect cleanup

## Стратегия тестирования

### Минимум для каждого компонента:
- Рендер без ошибок
- Наличие ключевых заголовков/текстов
- Наличие ARIA-атрибутов

### По типам:
- **Интерактивные** (FlipCard, Reviews, CurrencySelector, модалы): userEvent.click, form submit
- **С данными** (все секции): правильное количество элементов из data.ts
- **С формами** (ContactModal, HelpModal): mock fetch, submit, состояния loading/success/error
- **С таймером** (CountdownTimer): vi.useFakeTimers()
- **С Audio** (FlipCard, AudioButton): мок Audio API
- **С IntersectionObserver** (TextGenerateEffect): мок IntersectionObserver
- **С Framer Motion**: мок framer-motion, проверка рендера children

## Шаблоны мокирования

### Framer Motion:
```typescript
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div data-testid="motion-div" {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
  useTransform: () => ({ get: () => 0 }),
  useMotionTemplate: () => "0%",
  useReducedMotion: () => false,
  useMotionValue: () => ({ get: () => 0, set: () => {} }),
  AnimatePresence: ({ children }: any) => children,
}))
```

### Next.js:
```typescript
vi.mock("next/image", () => ({
  default: (props: any) => <img {...props} />,
}))
vi.mock("next/link", () => ({
  default: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}))
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}))
```

### Audio API:
```typescript
const mockPlay = vi.fn().mockResolvedValue(undefined)
const mockPause = vi.fn()
window.HTMLMediaElement.prototype.play = mockPlay
window.HTMLMediaElement.prototype.pause = mockPause
// или:
global.Audio = vi.fn().mockImplementation(() => ({
  play: mockPlay, pause: mockPause, currentTime: 0,
  addEventListener: vi.fn(), removeEventListener: vi.fn(),
}))
```

### IntersectionObserver:
```typescript
global.IntersectionObserver = vi.fn().mockImplementation((cb) => ({
  observe: vi.fn(() => cb([{ isIntersecting: true }])),
  unobserve: vi.fn(), disconnect: vi.fn(),
}))
```

### Fetch (для модалов):
```typescript
global.fetch = vi.fn().mockResolvedValue({
  ok: true, json: () => Promise.resolve({ success: true }),
})
```

## Именование файлов
Создавай в `__tests__/`:
- `hero-section.test.tsx`, `support-banner.test.tsx`, `author-story.test.tsx`
- `what-inside.test.tsx`, `why-it-works.test.tsx`, `expressions.test.tsx`
- `topic-spheres.test.tsx`, `mini-course.test.tsx`, `reviews.test.tsx`
- `pricing.test.tsx`, `faq.test.tsx`, `footer.test.tsx`
- `flip-card.test.tsx`, `animated-section.test.tsx`
- `contact-modal.test.tsx`, `help-modal.test.tsx`
- `countdown-timer.test.tsx`, `currency-selector.test.tsx`

## СТРОГИЕ ОГРАНИЧЕНИЯ

### НЕЛЬЗЯ трогать:
- Любые файлы в `components/` — ни секции, ни UI, ни standalone
- Любые файлы в `lib/`
- Любые файлы в `app/`
- `globals.css`, `vitest.config.ts`, `vitest.setup.ts`, `package.json`

### МОЖНО:
- ЧИТАТЬ любые файлы (для понимания что тестировать)
- СОЗДАВАТЬ файлы ТОЛЬКО в `__tests__/` с расширением `.test.tsx` или `.test.ts`

## Проверка
1. `npm test` — ВСЕ тесты (21 старых + новые) должны пройти
2. Если тест падает — исправь ТЕСТ, не компонент
3. Цель: 0 ошибок, минимум 50 новых тестов
```

---

## Промт 2: Агент "SEO + Structured Data"

> **ВЫПОЛНЕНО:** 5 JSON-LD схем в `components/JsonLd.tsx`, layout.tsx обновлён.
> Используй как шаблон для добавления новых схем (например, Course, Review).

```
# Задание: SEO и Structured Data (Schema.org JSON-LD)

## Контекст проекта
Ты работаешь с Next.js 16 лендингом "Je Parle!" — книга для изучения французского языка.
- Стек: Next.js 16, React 19, TypeScript 5
- Путь: /Users/sergejsafronov/Documents/French.Super/je-parle
- Основной URL: https://french-super.com/book
- В проекте есть CLAUDE.md — прочитай его

Ты можешь создавать sub-team из агентов если задач много, но обычно для SEO одного агента достаточно.

## Текущее состояние SEO

### Уже есть:
- `app/layout.tsx` (50 строк): metadata с title, description, keywords, authors, openGraph, twitter
- `app/robots.ts`: Allow /, Disallow /api/
- `app/sitemap.ts`: 1 страница (baseUrl), weekly, priority 1
- lang="ru" на html
- Security headers в next.config.ts

### Чего НЕТ:
1. **JSON-LD** — никакого structured data
2. **OG Image** — нет изображения для соцсетей (поле images отсутствует)
3. **Canonical URL** — не указан
4. **metadataBase** — не задан
5. **FAQPage Schema** — 9 FAQ-вопросов идеальны для Rich Snippets
6. **Product Schema** — книга с ценой
7. **Organization Schema** — French Super

## Данные для JSON-LD (читай из lib/data.ts, НЕ редактируй)

FAQ: `faqItems` — 9 объектов { question, answer }
Цены: `prices` — { EUR: { old: 28, new: 20 }, USD: { old: 30, new: 22 }, ... }
Соцсети: Instagram (french_super), Telegram (@frenchsuper), YouTube (@frenchsuper)
Автор: Гаврилов Илья (env: NEXT_PUBLIC_AUTHOR_NAME)
Email: ilya@french-super.com (env: NEXT_PUBLIC_AUTHOR_EMAIL)

## Что нужно сделать

### 1. Создать `components/JsonLd.tsx` (НОВЫЙ файл)

Серверный компонент (без "use client"), рендерит `<script type="application/ld+json">`.

Схемы для включения:

**a) WebSite:**
```json
{ "@type": "WebSite", "name": "French Super", "url": "https://french-super.com" }
```

**b) Organization:**
```json
{
  "@type": "Organization", "name": "French Super",
  "url": "https://french-super.com",
  "logo": "https://french-super.com/book/images/Logo.svg",
  "sameAs": ["https://www.instagram.com/french_super", "https://t.me/frenchsuper", "https://www.youtube.com/@frenchsuper"]
}
```

**c) Product + Offer:**
```json
{
  "@type": "Product", "name": "Je Parle! — Книга живого французского",
  "description": "300+ живых выражений...",
  "offers": { "@type": "Offer", "price": "20.00", "priceCurrency": "EUR", "availability": "https://schema.org/InStock" },
  "author": { "@type": "Person", "name": "Гаврилов Илья" }
}
```

**d) FAQPage** — сгенерируй динамически из `faqItems` (импортируй из @/lib/data)

**e) BreadcrumbList:**
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "position": 1, "name": "French Super", "item": "https://french-super.com" },
    { "position": 2, "name": "Je Parle!", "item": "https://french-super.com/book" }
  ]
}
```

### 2. Обновить `app/layout.tsx`

- Импортируй и рендери `<JsonLd />` в body перед {children}
- Добавь в metadata:
  - `metadataBase: new URL("https://french-super.com/book")`
  - `alternates: { canonical: "/" }`
  - `openGraph.images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Je Parle! — Книга живого французского" }]`
  - `twitter.images: ["/images/og-image.jpg"]`
  - `robots: { index: true, follow: true }`

### 3. (Опционально) Обновить `app/sitemap.ts`

Добавь комментарий TODO для будущих страниц.

## СТРОГИЕ ОГРАНИЧЕНИЯ

### НЕЛЬЗЯ трогать:
- `components/sections/*` — никакие секции
- `lib/data.ts` — ТОЛЬКО ЧТЕНИЕ
- `globals.css`
- `app/page.tsx`
- `next.config.ts`
- `app/robots.ts` — этот файл редактирует другой агент
- Файлы в `__tests__/`, `public/images/`

### МОЖНО:
- СОЗДАТЬ `components/JsonLd.tsx`
- РЕДАКТИРОВАТЬ `app/layout.tsx` (расширение metadata, импорт JsonLd)
- РЕДАКТИРОВАТЬ `app/sitemap.ts` (минимально)
- ЧИТАТЬ все файлы

## Проверка
1. `npm run build` — сборка без ошибок
2. Проверь JSON-LD на валидность (корректный JSON, правильные @type)
3. Проверь что `<script type="application/ld+json">` рендерится в HTML
```

---

## Промт 3: Агент "Backend API"

> **ВЫПОЛНЕНО:** Telegram Bot API реализован в `app/api/contact/route.ts`.
> Используй как шаблон для добавления новых API-эндпоинтов.

```
# Задание: Реализация отправки форм через Telegram Bot API

## Контекст проекта
Next.js 16 лендинг "Je Parle!" — книга для изучения французского.
- Стек: Next.js 16, React 19, TypeScript 5
- Путь: /Users/sergejsafronov/Documents/French.Super/je-parle
- Прочитай CLAUDE.md

Ты можешь создать sub-team если нужно (например, один агент — реализация, другой — тесты), но задача достаточно компактная для одного.

## Текущее состояние

### app/api/contact/route.ts (86 строк):
- POST /api/contact — принимает JSON: name, contactMethod (telegram|whatsapp), contact, message, type (question|help)
- validateBody() — валидация всех полей
- checkRateLimit() — in-memory Map, 5 req/min per IP
- **Строка 72: TODO** — форма логирует в console.log, но НИЧЕГО НЕ ОТПРАВЛЯЕТ. Всегда возвращает { success: true }

### Фронтенд-потребители (НЕ трогать):
- `components/ContactModal.tsx` — POST /api/contact, type: "question"
- `components/HelpModal.tsx` — POST /api/contact, type: "help"
- Ожидают: 200 + `{ success: true }` при успехе, 400/429/500 + `{ error: "..." }` при ошибке

## Что нужно сделать

### 1. Реализовать sendToTelegram()

Замени console.log на отправку через Telegram Bot API (простой fetch, БЕЗ библиотек):

```typescript
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+=|{}.!\\-]/g, "\\$&")
}

async function sendToTelegram(body: ContactBody): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn("Telegram credentials not configured, skipping send")
    return false
  }
  const typeLabel = body.type === "question" ? "Вопрос" : "Нужна помощь"
  const text = `📩 *${escapeMarkdown(typeLabel)}*\n\n👤 *Имя:* ${escapeMarkdown(body.name)}\n📱 *Контакт:* ${escapeMarkdown(body.contact)} \\(${escapeMarkdown(body.contactMethod)}\\)\n\n💬 *Сообщение:*\n${escapeMarkdown(body.message)}`

  const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: "MarkdownV2" }),
  })
  return res.ok
}
```

### 2. Обработка ошибок
- В development без TELEGRAM_BOT_TOKEN: логировать + возвращать success (не блокировать разработку)
- В production при ошибке Telegram: вернуть 500 + `{ error: "Не удалось отправить сообщение. Напишите напрямую в Telegram: @frenchsuper" }`

### 3. Улучшить rate limiting
Добавь периодическую очистку устаревших записей Map (каждые ~100 запросов).

### 4. Добавить переменные окружения
Создай `.env.example` (или обнови если есть):
```
TELEGRAM_BOT_TOKEN=       # Токен от @BotFather
TELEGRAM_CHAT_ID=         # ID чата для получения сообщений
```
НЕ трогай существующие переменные в `.env`!

### 5. Написать тесты
Создай `__tests__/api-telegram.test.ts`:
- Мок global.fetch для Telegram API
- Тест escapeMarkdown() — спецсимволы правильно экранируются
- Тест sendToTelegram() — формирует правильный URL и payload
- Тест при отсутствии TELEGRAM_BOT_TOKEN — возвращает false

## СТРОГИЕ ОГРАНИЧЕНИЯ

### НЕЛЬЗЯ трогать:
- `components/*` — все компоненты
- `lib/data.ts`, `globals.css`
- `app/layout.tsx`, `app/page.tsx`
- `components/sections/*`

### МОЖНО:
- РЕДАКТИРОВАТЬ `app/api/contact/route.ts`
- СОЗДАВАТЬ файлы в `app/api/` (утилиты)
- СОЗДАВАТЬ тесты в `__tests__/`
- СОЗДАТЬ/обновить `.env.example`

## Проверка
1. `npm run build` — без ошибок
2. `npm test` — все тесты проходят
3. curl тест: `curl -X POST http://localhost:3000/api/contact -H "Content-Type: application/json" -d '{"name":"Тест","contactMethod":"telegram","contact":"@test","message":"Тестовое сообщение проверки API","type":"question"}'`

## Контракт с фронтендом (НЕ менять):
- 200 + `{ success: true }` — успех
- 400 + `{ error: "..." }` — ошибка валидации
- 429 + `{ error: "..." }` — rate limit
- 500 + `{ error: "..." }` — ошибка Telegram (НОВОЕ, но фронтенд уже обрабатывает !res.ok)
```

---

## Промт 4: Агент "Секции A" (первая половина лендинга)

> **ВЫПОЛНЕНО:** Файлы переименованы, ARIA добавлены, ссылки обновлены.
> Используй как шаблон для дизайн-полировки других секций.

```
# Задание: Полировка секций лендинга (первая половина)

## Контекст проекта
Next.js 16 лендинг "Je Parle!" — книга для изучения французского.
- Стек: Next.js 16, React 19, TypeScript 5, Tailwind CSS 4, Framer Motion 12
- Путь: /Users/sergejsafronov/Documents/French.Super/je-parle
- Прочитай CLAUDE.md ОБЯЗАТЕЛЬНО — там описан стиль: rounded-full кнопки, rounded-2xl карточки, hover scale(1.05), ARIA на интерактивные элементы

Ты можешь создать sub-team из 2-3 агентов для параллельной работы — например, один занимается переименованием файлов и обновлением путей, другой — ARIA и дизайном. Но следи чтобы sub-agents не редактировали одни и те же файлы.

## Твои файлы (ТОЛЬКО эти редактировать)
1. `components/sections/HeroSection.tsx` (167 строк)
2. `components/sections/SupportBanner.tsx` (146 строк)
3. `components/sections/AuthorStory.tsx` (108 строк)
4. `components/sections/WhatInside.tsx` (65 строк)
5. `components/sections/WhyItWorks.tsx` (225 строк)
6. `components/FlipCard.tsx` (190 строк)
7. `components/AnimatedSection.tsx` (115 строк)
8. `components/BookMockup3D.tsx` (84 строки)
9. Файлы в `public/images/` — ТОЛЬКО переименование (mv)

## Задачи

### КРИТИЧЕСКОЕ: Переименование файлов с кириллицей/пробелами

Кириллица и пробелы в именах файлов могут сломаться на серверах и CDN.

**Переименовать файлы (командой mv):**
```bash
mv "public/images/Начало пути.png" "public/images/nachalo-puti.png"
mv "public/images/Мечта.jpg" "public/images/mechta.jpg"
mv "public/images/Сегодня.svg" "public/images/segodnya.svg"
mv "public/images/French Tech.svg" "public/images/french-tech.svg"
mv "public/images/Copy Frog.svg" "public/images/copy-frog.svg"
mv "public/images/круасан.png" "public/images/croissant.png"
```

**Обновить ссылки в компонентах:**

AuthorStory.tsx:
- `"/images/Начало пути.png"` → `"/images/nachalo-puti.png"`
- `"/images/Мечта.jpg"` → `"/images/mechta.jpg"`
- `"/images/Сегодня.svg"` → `"/images/segodnya.svg"`

SupportBanner.tsx:
- `"/images/French Tech.svg"` → `"/images/french-tech.svg"`
- `"/images/Copy Frog.svg"` → `"/images/copy-frog.svg"`

WhyItWorks.tsx:
- `"/images/круасан.png"` → `"/images/croissant.png"` (2 места)

**ВАЖНО:** Файлы `french-tech.svg` и `copy-frog.svg` также используются в `Footer.tsx` (строки 60, 68), но Footer.tsx НЕ в твоей зоне — его обновляет другой агент. Он уже знает новые имена файлов.

### ДИЗАЙН-УЛУЧШЕНИЯ

**AuthorStory.tsx:**
- Ссылка на строке ~49-55: `href="#"` — placeholder. Замени на `href="https://www.instagram.com/french_super"` с `target="_blank" rel="noopener noreferrer"`

**SupportBanner.tsx:**
- Кастомный Tooltip (строки ~16-47) не имеет ARIA-атрибутов. Добавь:
  - `role="tooltip"` на всплывающий div
  - `aria-describedby` связывающий триггер с tooltip
  - Уникальные id для каждого tooltip

**HeroSection.tsx:**
- Проверь что h3 в advantage cards используют `text-base md:text-lg font-semibold leading-tight` (стандарт из CLAUDE.md)
- Всё остальное в хорошем состоянии, не нужны крупные изменения

**WhatInside.tsx:**
- Серверный компонент — не добавляй "use client"
- Левая часть визуально пустая (должно быть изображение). Добавь TODO-комментарий

**WhyItWorks.tsx:**
- Проверь что мобильная версия (строки ~189-221) корректно показывает все 5 точек
- Magic numbers в checkpoint positions (строки ~29-35) — добавь пояснительные комментарии

**FlipCard.tsx:**
- Audio cleanup в useEffect правильный, не трогай
- Проверь что кнопки имеют aria-label (должны иметь)

**AnimatedSection.tsx:**
- Всё в хорошем состоянии, минимальные изменения

## СТРОГИЕ ОГРАНИЧЕНИЯ

### НЕЛЬЗЯ трогать:
- `lib/data.ts` — ТОЛЬКО ЧТЕНИЕ. Нужны изменения? Запиши TODO
- `globals.css` — ТОЛЬКО ЧТЕНИЕ
- `app/layout.tsx`, `app/page.tsx`
- Секции второй половины: Expressions, TopicSpheres, MiniCourse, Reviews, Pricing, FAQ, Footer
- Модалы: ContactModal, HelpModal, PurchaseModal
- Утилиты: CountdownTimer, CurrencySelector, TextGenerateEffect
- `__tests__/`, `app/api/`

### МОЖНО:
- Редактировать 8 файлов из списка
- Переименовывать файлы в `public/images/` (mv)
- Создавать компоненты если нужна декомпозиция

## Проверка
1. `npm run build` — без ошибок
2. `npm test` — все 21 тест проходят
3. `npm run dev` — все секции первой половины рендерятся, изображения загружаются (нет 404)
4. Проверь что переименованные файлы доступны по новым путям
```

---

## Промт 5: Агент "Секции B" (вторая половина лендинга)

> **ВЫПОЛНЕНО:** Reviews a11y (role=dialog, Escape, фокус, стрелки), Footer (динамический год, ARIA).
> Используй как шаблон для accessibility-улучшений других компонентов.

```
# Задание: Полировка секций лендинга (вторая половина)

## Контекст проекта
Next.js 16 лендинг "Je Parle!" — книга для изучения французского.
- Стек: Next.js 16, React 19, TypeScript 5, Tailwind CSS 4, Framer Motion 12, Radix UI
- Путь: /Users/sergejsafronov/Documents/French.Super/je-parle
- Прочитай CLAUDE.md ОБЯЗАТЕЛЬНО

Ты можешь создать sub-team из 2-3 агентов для параллельной работы (один — Reviews accessibility, другой — остальные секции). Следи чтобы sub-agents не редактировали одни и те же файлы.

## Твои файлы (ТОЛЬКО эти редактировать)
1. `components/sections/Expressions.tsx` (48 строк)
2. `components/sections/TopicSpheres.tsx` (131 строка)
3. `components/sections/MiniCourse.tsx` (124 строки)
4. `components/sections/Reviews.tsx` (164 строки)
5. `components/sections/Pricing.tsx` (255 строк)
6. `components/sections/FAQ.tsx` (55 строк)
7. `components/sections/Footer.tsx` (168 строк)

## Задачи

### КРИТИЧЕСКОЕ: Reviews.tsx — модальное окно (строки ~118-160)

Модальное окно отзыва НЕ accessibility-ready:
- Нет `role="dialog"` и `aria-modal="true"`
- Нет `aria-labelledby`
- Нет закрытия по Escape
- Нет trap focus

Исправления:
1. Добавь `role="dialog"` и `aria-modal="true"` на контейнер
2. Добавь `aria-labelledby` с id заголовка (имя рецензента)
3. Добавь useEffect с keydown listener для Escape → `setOpenReview(null)`
4. Автофокус на кнопке закрытия при открытии (useRef + useEffect)

### Reviews.tsx — клавиатурная навигация carousel

Мобильный carousel (строки ~74-113) имеет отличный ARIA, но нет навигации стрелками. Добавь:
- ArrowLeft → prevSlide()
- ArrowRight → nextSlide()
(Слушай keydown на контейнере carousel, не на document)

### Footer.tsx — обновление ссылок на изображения

Другой агент параллельно переименовывает файлы в public/images/. Обнови ссылки:
- Строка ~60: `"/images/French Tech.svg"` → `"/images/french-tech.svg"`
- Строка ~68: `"/images/Copy Frog.svg"` → `"/images/copy-frog.svg"`

### Footer.tsx — год в copyright
- Строка ~152: `© 2025 FrenchSuper` → сделай динамическим: `© {new Date().getFullYear()} FrenchSuper`

### Footer.tsx — ARIA на социальных ссылках
Добавь aria-label на ссылки Instagram, Telegram, YouTube (строки ~86-118).

### TopicSpheres.tsx — декоративные элементы
- Draggable иконки в CTA-карточке (строки ~106-118): добавь `aria-hidden="true"` на motion.div контейнер иконок (они декоративные)

### MiniCourse.tsx
- В целом хорошее состояние, минимальные изменения
- Добавь TODO-комментарий о том что все кнопки "Смотреть урок" ведут на один плейлист

### Pricing.tsx
- Проверь что TabsContent и TabsTrigger из Radix правильно работают
- Строка ~131: "12 февраля" захардкожена (saleEndDate в data.ts), добавь TODO-комментарий

### FAQ.tsx
- Серверный компонент, Radix Accordion. В целом ОК
- Проверь что id на секции есть для якорной навигации (id="faq")

### Expressions.tsx
- Обёртка для FlipCard, минимальные изменения. Проверь что секция имеет id для навигации

## СТРОГИЕ ОГРАНИЧЕНИЯ

### НЕЛЬЗЯ трогать:
- `lib/data.ts` — ТОЛЬКО ЧТЕНИЕ
- `globals.css` — ТОЛЬКО ЧТЕНИЕ
- `app/layout.tsx`, `app/page.tsx`
- Секции первой половины: HeroSection, SupportBanner, AuthorStory, WhatInside, WhyItWorks
- Standalone: FlipCard, AnimatedSection, BookMockup3D
- Модалы: ContactModal, HelpModal, PurchaseModal
- Утилиты: CountdownTimer, CurrencySelector, TextGenerateEffect
- `__tests__/`, `app/api/`
- `public/images/` — НЕ переименовывай файлы (это делает другой агент)

### МОЖНО:
- Редактировать 7 файлов из списка
- Создавать компоненты если нужна декомпозиция

## Проверка
1. `npm run build` — без ошибок
2. `npm test` — все 21 тест проходят
3. `npm run dev` — все секции рендерятся
4. Keyboard: модал Reviews закрывается по Escape, carousel работает стрелками
```

---

## Промт 6: Агент "Cabinet / Auth"

> **ВЫПОЛНЕНО:** 9 файлов восстановлены из git-истории, middleware работает.
> Используй как шаблон для восстановления удалённых файлов из git.

```
# Задание: Восстановить личный кабинет и аутентификацию

## Контекст проекта
Next.js 16 лендинг "Je Parle!" — книга для изучения французского.
- Стек: Next.js 16, React 19, TypeScript 5, Tailwind CSS 4, Radix UI
- Путь: /Users/sergejsafronov/Documents/French.Super/je-parle
- Прочитай CLAUDE.md ОБЯЗАТЕЛЬНО

Ты можешь создать sub-team — например, один агент восстанавливает auth (middleware + API + login), другой — cabinet pages. Они работают в разных директориях и не конфликтуют.

## Предыстория
В коммите `89246fa` были реализованы личный кабинет и аутентификация. В коммите `148e949` всё удалено с сообщением "not in use yet". Задача — восстановить из git-истории.

## Как получить файлы
```bash
git show 89246fa:middleware.ts
git show 89246fa:app/api/auth/login/route.ts
git show 89246fa:app/api/auth/logout/route.ts
git show 89246fa:app/login/page.tsx
git show 89246fa:app/cabinet/layout.tsx
git show 89246fa:app/cabinet/page.tsx
git show 89246fa:app/cabinet/profile/page.tsx
git show 89246fa:app/cabinet/progress/page.tsx
git show 89246fa:app/cabinet/settings/page.tsx
```

## Файлы для восстановления (9 штук)

### Auth:
1. **middleware.ts** (~27 строк) — перехватывает /cabinet/*, проверяет cookie "auth-token", редирект на /login?from=...
2. **app/api/auth/login/route.ts** (~44 строки) — POST, demo credentials из .env (AUTH_DEMO_EMAIL, AUTH_DEMO_PASSWORD), httpOnly cookie 7 дней
3. **app/api/auth/logout/route.ts** (~15 строк) — POST, очистка cookie

### Login:
4. **app/login/page.tsx** (~131 строка) — "use client", форма email+password, Suspense для useSearchParams, редирект на /cabinet после логина

### Cabinet:
5. **app/cabinet/layout.tsx** (~188 строк) — "use client", sidebar, Avatar, responsive, Logout
6. **app/cabinet/page.tsx** (~121 строка) — dashboard: 4 стат-карточки, recent activity
7. **app/cabinet/profile/page.tsx** (~116 строк)
8. **app/cabinet/progress/page.tsx** (~127 строк)
9. **app/cabinet/settings/page.tsx** (~127 строк)

## Что нужно сделать

### 1. Восстановить все 9 файлов
Получи содержимое через `git show 89246fa:<path>` и создай файлы.

### 2. Проверить совместимость с Next.js 16 / React 19
- `useSearchParams` должен быть в `<Suspense>` (уже было)
- Проверь что импорты UI-компонентов работают: `@/components/ui/avatar`, `@/components/ui/button`, `@/components/ui/badge`, `@/components/ui/progress`

### 3. Удалить мёртвые ссылки
Cabinet layout содержал ссылки на `/blog` и `/lessons` — этих страниц нет. Убери их из sidebar или замени на `#` с TODO-комментарием.

### 4. Обновить app/robots.ts
Добавь в disallow:
```
/cabinet/
/login
```

### 5. Проверить env-переменные
В `.env` должны быть (уже должны быть, проверь):
```
AUTH_DEMO_EMAIL=demo@french-super.com
AUTH_DEMO_PASSWORD=demo2026
```

## СТРОГИЕ ОГРАНИЧЕНИЯ

### НЕЛЬЗЯ трогать:
- `components/sections/*` — все секции лендинга
- Standalone компоненты (FlipCard, AnimatedSection, ContactModal и т.д.)
- `lib/data.ts`, `globals.css`
- `app/page.tsx` (лендинг)
- `app/layout.tsx` (другой агент работает с ним)
- `app/api/contact/route.ts` (другой агент работает с ним)
- `__tests__/`, `public/images/`

### МОЖНО:
- СОЗДАВАТЬ: middleware.ts, app/login/page.tsx, app/cabinet/**, app/api/auth/**
- РЕДАКТИРОВАТЬ: app/robots.ts (добавить disallow)
- ЧИТАТЬ все файлы

## Проверка
1. `npm run build` — без ошибок
2. `npm test` — все 21 тест проходят
3. Ручной тест:
   - `/cabinet` → редирект на `/login?from=/cabinet`
   - Логин: `demo@french-super.com` / `demo2026` → редирект на `/cabinet`
   - Навигация по разделам кабинета
   - Logout → возврат на главную
4. Лендинг (/) не затронут и работает
```
