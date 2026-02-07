# Je Parle! - Project Guidelines

## Текущий статус

### Готово
- Главный лендинг (14 секций)
- Личный кабинет (dashboard, profile, progress, settings)
- Блог и Уроки
- Система бэкапов (backup.sh)
- UI компоненты (badge, progress, avatar, button)
- API route для контактных форм (`POST /api/contact`)
- Аутентификация (middleware + login page + cookie-based sessions)
- Error Boundaries (error.tsx, not-found.tsx)
- SEO (robots.txt, sitemap.xml, OpenGraph, Twitter Card)
- Тесты (Vitest + Testing Library, 21 тест)
- Security headers (CSP, X-Frame-Options, Referrer-Policy)
- Analytics-обёртка (GA4, включается через .env)
- Accessibility (ARIA labels, prefers-reduced-motion)

### В процессе
- [обновляется по мере работы]

### Нужно сделать
- Загрузить изображения (book-cover.jpg, author-avatar.jpg)
- Загрузить аудио для flip-карточек
- Добавить логотипы партнёров (French Tech, CopyFrog)
- Заменить demo-аутентификацию на реальную (NextAuth / Clerk)
- Подключить реальный backend для форм (email / Telegram bot)
- Добавить Structured Data (Schema.org)
- Добавить компонентные тесты (React Testing Library)

---

## История версий

| Дата | Версия | Изменения |
|------|--------|-----------|
| 2026-02-07 | v1.0 | Восстановлен дизайн, добавлены badge/progress/avatar, система бэкапов |
| 2026-02-07 | v2.0 | Аудит безопасности, UX, архитектуры. Исправлены PII, добавлены auth, API, тесты, SEO, a11y |

---

## Правила для Claude

1. **ВСЕГДА создавать бэкап** перед изменением дизайна: `./backup.sh`
2. **НЕ удалять файлы** без явного запроса пользователя
3. **Сохранять стиль**: rounded-full кнопки, hover scale(1.05), rounded-2xl карточки
4. **Спрашивать** если что-то неясно
5. **Git commit** после каждого значимого изменения
6. **НЕ хардкодить** email, пароли, API ключи — использовать `.env`
7. **ARIA labels** на все интерактивные элементы без текста (иконки, кнопки)
8. **Запускать тесты** (`npm test`) после изменений в логике

---

## BACKUP SYSTEM

**ВАЖНО:** Перед любыми изменениями стилей или дизайна:

1. Создать бэкап: `./backup.sh`
2. Git commit: `git add . && git commit -m "Backup: [описание]"`

Бэкапы хранятся в `.backups/` (не в git).

Для восстановления:
```bash
cp -r .backups/backup_ДАТА/app .
cp -r .backups/backup_ДАТА/components .
cp -r .backups/backup_ДАТА/lib .
```

---

## Архитектура

### Стек
- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **TypeScript 5** (strict mode)
- **Tailwind CSS 4** (PostCSS plugin)
- **Radix UI** (Accordion, Dialog, Label, RadioGroup, Slot)
- **Framer Motion** (FlipCard анимации)
- **Vitest** + **Testing Library** (тесты)

### Структура
```
app/
├── api/
│   ├── auth/login/route.ts    # POST — cookie-based login
│   ├── auth/logout/route.ts   # POST — очистка cookie
│   └── contact/route.ts       # POST — формы обратной связи
├── cabinet/                   # Защищён middleware (требует auth)
│   ├── layout.tsx
│   ├── page.tsx               # Dashboard
│   ├── profile/page.tsx
│   ├── progress/page.tsx
│   └── settings/page.tsx
├── login/page.tsx             # Страница входа
├── blog/page.tsx
├── lessons/page.tsx
├── error.tsx                  # Global Error Boundary
├── not-found.tsx              # Custom 404
├── robots.ts                  # SEO: robots.txt
├── sitemap.ts                 # SEO: sitemap.xml
├── layout.tsx                 # Root layout + Analytics
├── globals.css                # CSS переменные + Tailwind + a11y
└── page.tsx                   # Лендинг (14 секций)

components/
├── icons/TelegramIcon.tsx     # Shared SVG icon
├── sections/                  # 14 секций лендинга
├── ui/                        # shadcn/ui (button, badge, card, etc.)
├── Analytics.tsx              # GA4 wrapper (env-controlled)
├── AudioButton.tsx            # Воспроизведение аудио (useEffect cleanup)
├── ContactModal.tsx           # Sheet + форма + fetch + validation
├── HelpModal.tsx              # Sheet + форма + fetch + validation
├── FlipCard.tsx               # 3D flip-карточка (Framer Motion)
├── CountdownTimer.tsx
├── CurrencySelector.tsx
└── PurchaseModal.tsx

middleware.ts                  # Auth guard для /cabinet/*
lib/data.ts                    # Все статические данные
lib/utils.ts                   # cn() — clsx + tailwind-merge
__tests__/                     # Vitest тесты (21 тест)
```

### Аутентификация

- **Middleware** (`middleware.ts`) перехватывает `/cabinet/*`
- Без cookie `auth-token` → редирект на `/login?from=...`
- Login API ставит `httpOnly`, `secure`, `sameSite: lax` cookie (7 дней)
- **Demo credentials** в `.env` (заменить на реальную систему перед продакшеном)

### API Routes

| Endpoint | Method | Описание |
|----------|--------|----------|
| `/api/contact` | POST | Формы вопросов/помощи (rate limit 5/min, валидация) |
| `/api/auth/login` | POST | Вход, установка cookie |
| `/api/auth/logout` | POST | Выход, очистка cookie |

---

## Переменные окружения (.env)

```bash
# Публичные (видны в клиентском коде)
NEXT_PUBLIC_AUTHOR_EMAIL=ilya@french-super.com
NEXT_PUBLIC_AUTHOR_NAME=Илья Гаврилов
NEXT_PUBLIC_GA_MEASUREMENT_ID=         # GA4 ID (пусто = отключено)

# Серверные (только backend)
AUTH_DEMO_EMAIL=demo@french-super.com  # Заменить на реальную auth
AUTH_DEMO_PASSWORD=demo2026            # Заменить на реальную auth
```

---

## Цветовая палитра

| Переменная | Значение | Использование |
|------------|----------|---------------|
| `--accent` | `#56051B` | Тёмно-бордовый — кнопки, акценты |
| `--background` | `#fdfbf4` | Кремовый — фон страницы |
| `--secondary` | `#eee8d5` | Бежевый — карточки, секции |
| `--card` | `#f2eddd` | Светло-бежевый — карточки |
| `--border` | `#d4c9b0` | Серо-бежевый — границы |
| `--foreground` | `#111111` | Чёрный — текст |
| `--muted-foreground` | `#666666` | Серый — приглушённый текст |

---

## Шрифты

- **Inter** — основной шрифт (заголовки thin/medium)
- **Onest** — акцентный шрифт (подключён, `--font-accent`)

---

## Стиль кнопок

```css
border-radius: 1000px;  /* rounded-full */
transition: all 0.2s ease-in-out;
```

---

## Hover эффекты

```css
.hover-card:hover {
  transform: scale(1.05);
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
}
```

Отключаются при `prefers-reduced-motion: reduce`.

---

## Структура лендинга (14 секций)

1. Header — навигация + аватар автора
2. Hero — заголовок + изображение книги + CTA
3. AdvantageCards — 4 карточки преимуществ
4. SupportBanner — French Tech & CopyFrog
5. AuthorStory — история автора (3 блока)
6. WhatInside — фрагмент книги
7. WhyItWorks — 5 причин
8. Expressions — 4 flip-карточки с аудио
9. TopicSpheres — 9 тематических сфер (isDarkColor luminance)
10. MiniCourse — 6 уроков YouTube
11. Reviews — 6 отзывов (carousel на мобиле с ARIA)
12. Pricing — цены + таймер + валюты
13. FAQ — 9 вопросов (accordion)
14. Footer — контакты + соцсети

---

## Дополнительные страницы

- `/login` — вход в кабинет
- `/cabinet` — личный кабинет (dashboard, profile, progress, settings)
- `/blog` — список статей
- `/lessons` — каталог уроков

---

## Безопасность

- **Security Headers** в `next.config.ts`: CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- **Source maps** отключены в production
- **Rate limiting** на API contact (5 req/min per IP)
- **httpOnly cookies** для auth
- **auto-sync.sh** использует белый список директорий (не `git add .`)
- **robots.txt** закрывает `/cabinet/`, `/api/`, `/login`

---

## Медиа-файлы

### Изображения (public/images/)

| Файл | Назначение | Статус |
|------|------------|--------|
| book-cover.jpg | Обложка книги (Hero) | Нужно |
| author-avatar.jpg | Аватар автора | Нужно |
| french-tech-logo.png | Логотип French Tech | Нужно |
| copyfrog-logo.png | Логотип CopyFrog | Нужно |

### Аудио (public/audio/)

| Файл | Назначение | Статус |
|------|------------|--------|
| expression1.mp3 | Flip-карточка 1 | Нужно |
| expression2.mp3 | Flip-карточка 2 | Нужно |
| expression3.mp3 | Flip-карточка 3 | Нужно |
| expression4.mp3 | Flip-карточка 4 | Нужно |

---

## Команды

```bash
npm run dev        # Локальный сервер (localhost:3000)
npm run build      # Сборка проекта
npm test           # Запуск тестов (vitest run)
npm run test:watch # Тесты в watch-режиме
npm run lint       # ESLint
./backup.sh        # Создать бэкап
```

---

## Оригинальный сайт

https://french-super.com/book
