#!/bin/bash
cd "$(dirname "$0")"

echo "🚀 Запуск Je Parle + Auto-Sync..."
echo ""

# Запускаем auto-sync в фоне
./auto-sync.sh &
SYNC_PID=$!

# Запускаем dev-сервер
npm run dev &
DEV_PID=$!

# Ждём 3 секунды и открываем браузер
sleep 3
open http://localhost:3000

echo ""
echo "✅ Всё запущено!"
echo "   Dev-сервер: http://localhost:3000"
echo "   Auto-sync: работает в фоне"
echo ""
echo "Нажми Ctrl+C чтобы остановить всё"

# Ждём завершения
wait $DEV_PID
kill $SYNC_PID 2>/dev/null
