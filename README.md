# Компания «Станислав» 💌
React + TS + Vite + Tailwind + Framer Motion + Supabase. Хостинг — GitHub Pages.

## 2. Supabase
1. Создайте проект на supabase.com. SQL Editor → выполните `supabase/migrations/001_invitations.sql`.
2. Authentication → Users → Add user (ваш email+пароль). Затем выполните SQL из последней строки миграции (раскомментировав) — это делает вас админом. Включите Settings → Auth → отключите публичные регистрации (Disable signups).
3. Settings → API: скопируйте Project URL и **anon** key (service_role НЕ использовать).

## 3. Локально
`cp .env.example .env` → впишите значения → `npm install && npm run dev`. Проверка: `npm run build`.

## 4. Деплой
Репозиторий → Settings → Pages → Source: **GitHub Actions**. Settings → Secrets and variables → Actions → добавьте `VITE_SUPABASE_URL` и `VITE_SUPABASE_ANON_KEY`. Push в `main` запускает сборку и публикацию.
Админка: `https://<user>.github.io/<repo>/#/admin` (hash-роутинг, т.к. Pages — статика).

## Безопасность
RLS: аноним только INSERT (с CHECK-ограничениями в БД), SELECT — лишь пользователи из `admins`. anon-ключ публичен по дизайну.
Сбой сети: заявка лежит в localStorage и дошлётся при следующем открытии; повторная отправка идемпотентна (UUID).
