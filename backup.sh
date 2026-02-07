#!/bin/bash

# Je Parle! Backup Script
# Создаёт копию app/, components/, lib/ с временной меткой

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR=".backups/backup_$DATE"

echo "Creating backup..."
mkdir -p "$BACKUP_DIR"

cp -r app "$BACKUP_DIR/"
cp -r components "$BACKUP_DIR/"
cp -r lib "$BACKUP_DIR/"
cp CLAUDE.md "$BACKUP_DIR/" 2>/dev/null
cp package.json "$BACKUP_DIR/"

echo "Backup created: $BACKUP_DIR"
echo ""
echo "Contents:"
ls -la "$BACKUP_DIR/"
echo ""
echo "To restore, copy files back:"
echo "  cp -r $BACKUP_DIR/app ."
echo "  cp -r $BACKUP_DIR/components ."
echo "  cp -r $BACKUP_DIR/lib ."
