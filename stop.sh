#!/bin/bash

# 🛑 Stop - Dừng tất cả services

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🛑 Dừng tất cả services...${NC}"
echo ""

# Kill processes on ports
for PORT in 3000 3001 8000 8001; do
    PIDS=$(lsof -ti:$PORT 2>/dev/null)
    if [ ! -z "$PIDS" ]; then
        echo -e "${YELLOW}Dừng process trên port $PORT...${NC}"
        kill -9 $PIDS 2>/dev/null || true
    fi
done

# Kill by process name
pkill -f "react-scripts start" 2>/dev/null || true
pkill -f "nodemon.*server.js" 2>/dev/null || true
pkill -f "node.*server.js" 2>/dev/null || true

sleep 1

echo -e "${GREEN}✅ Đã dừng tất cả services${NC}"
