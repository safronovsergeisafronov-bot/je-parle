#!/bin/bash
cd "$(dirname "$0")"
echo "🚀 Запуск Je Parle..."
npm run dev &
sleep 3
open http://localhost:3000
