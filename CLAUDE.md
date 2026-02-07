# Je Parle! - Project Guidelines

## Текущий статус

### Готово
- Главный лендинг (14 секций)
- Личный кабинет (dashboard, profile, progress, settings)
- Блог и Уроки
- Система бэкапов (backup.sh)
- UI компоненты (badge, progress, avatar, button)

### В процессе
- [обновляется по мере работы]

### Нужно сделать
- Загрузить изображения (book-cover.jpg, author-avatar.jpg)
- Загрузить аудио для flip-карточек
- Добавить логотипы партнёров (French Tech, CopyFrog)

---

## История версий

| Дата | Версия | Изменения |
|------|--------|-----------|
| 2026-02-07 | v1.0 | Восстановлен дизайн, добавлены badge/progress/avatar, система бэкапов |

---

## Правила для Claude

1. **ВСЕГДА создавать бэкап** перед изменением дизайна: `./backup.sh`
2. **НЕ удалять файлы** без явного запроса пользователя
3. **Сохранять стиль**: rounded-full кнопки, hover scale(1.05)
4. **Спрашивать** если что-то неясно
5. **Git commit** после каждого значимого изменения

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

## Цветовая палитра

| Переменная | Значение | Использование |
|------------|----------|---------------|
| `--accent` | `#801C1E` | Бордовый — кнопки, акценты |
| `--background` | `#fdfbf4` | Кремовый — фон страницы |
| `--secondary` | `#eee8d5` | Бежевый — карточки, секции |
| `--card` | `#f2eddd` | Светло-бежевый — карточки |
| `--border` | `#d4c9b0` | Серо-бежевый — границы |
| `--foreground` | `#111111` | Чёрный — текст |
| `--muted-foreground` | `#666666` | Серый — приглушённый текст |

---

## Шрифты

- **Inter** — основной шрифт (заголовки thin/medium)
- **Onest** — акцентный шрифт

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
9. TopicSpheres — 9 тематических сфер
10. MiniCourse — 6 уроков YouTube
11. Reviews — 6 отзывов (слайдер)
12. Pricing — цены + таймер + валюты
13. FAQ — 9 вопросов (accordion)
14. Footer — контакты + соцсети

---

## Дополнительные страницы

- `/cabinet` — личный кабинет (dashboard, profile, progress, settings)
- `/blog` — список статей
- `/lessons` — каталог уроков

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
npm run dev      # Локальный сервер (localhost:3000)
npm run build    # Сборка проекта
./backup.sh      # Создать бэкап
```

---

## Оригинальный сайт

https://french-super.com/book
