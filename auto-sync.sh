#!/bin/bash

# ===========================================
# Auto-Sync: Автоматическая синхронизация с GitHub
# ===========================================
# При любом изменении файла — автоматический commit + push
# Использование: ./auto-sync.sh или npm run sync
# ===========================================

# Цвета для вывода
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Настройки
DEBOUNCE_SECONDS=5
BRANCH="main"

# Папки для отслеживания
WATCH_DIRS="app components lib public styles"

# Функция для синхронизации
sync_to_github() {
    # Проверяем, есть ли изменения
    if [[ -z $(git status --porcelain) ]]; then
        return 0
    fi

    TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")

    echo -e "${BLUE}[Auto-Sync]${NC} Обнаружены изменения..."

    # Добавляем все изменения
    git add .

    # Создаём коммит
    git commit -m "Auto-sync: $TIMESTAMP"

    # Пушим на GitHub
    if git push origin $BRANCH 2>/dev/null; then
        echo -e "${GREEN}[Auto-Sync]${NC} Успешно отправлено на GitHub ($TIMESTAMP)"
    else
        echo -e "${YELLOW}[Auto-Sync]${NC} Не удалось отправить (возможно, нет интернета)"
    fi
}

# Проверяем, установлен ли fswatch
if ! command -v fswatch &> /dev/null; then
    echo -e "${YELLOW}[Auto-Sync]${NC} Устанавливаю fswatch..."
    brew install fswatch
fi

echo -e "${GREEN}================================================${NC}"
echo -e "${GREEN}  Auto-Sync запущен!${NC}"
echo -e "${GREEN}================================================${NC}"
echo -e "Отслеживаемые папки: ${BLUE}$WATCH_DIRS${NC}"
echo -e "Debounce: ${BLUE}${DEBOUNCE_SECONDS} сек${NC}"
echo -e "Ветка: ${BLUE}$BRANCH${NC}"
echo -e ""
echo -e "Нажмите ${YELLOW}Ctrl+C${NC} для остановки"
echo -e "${GREEN}================================================${NC}"
echo ""

# Переменная для debounce
LAST_SYNC=0

# Запускаем fswatch
fswatch -0 -r \
    --exclude '.git' \
    --exclude 'node_modules' \
    --exclude '.next' \
    --exclude '.backups' \
    --exclude '.DS_Store' \
    $WATCH_DIRS 2>/dev/null | while read -d "" event; do

    CURRENT_TIME=$(date +%s)
    TIME_DIFF=$((CURRENT_TIME - LAST_SYNC))

    # Debounce: ждём DEBOUNCE_SECONDS секунд между синхронизациями
    if [[ $TIME_DIFF -ge $DEBOUNCE_SECONDS ]]; then
        sleep $DEBOUNCE_SECONDS
        sync_to_github
        LAST_SYNC=$(date +%s)
    fi
done
