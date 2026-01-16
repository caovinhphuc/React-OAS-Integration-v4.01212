#!/bin/bash

# 🚀 Quick Start - Khởi động nhanh dự án (Frontend + Backend)
# Script đơn giản, dễ sử dụng

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🚀 Quick Start - React OAS Integration${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Check if we're in the right directory
if [ ! -d "src" ] || [ ! -d "backend" ]; then
    echo -e "${RED}❌ Không tìm thấy thư mục src hoặc backend!${NC}"
    echo "   Vui lòng chạy script này từ thư mục gốc của dự án."
    exit 1
fi

# Create logs directory
mkdir -p logs

# Kill existing processes on ports 3000 and 3001
echo -e "${YELLOW}🧹 Dọn dẹp processes cũ...${NC}"
lsof -ti:3000 2>/dev/null | xargs kill -9 2>/dev/null || true
lsof -ti:3001 2>/dev/null | xargs kill -9 2>/dev/null || true
sleep 1

# Start Backend
echo -e "${BLUE}🖥️  Khởi động Backend (port 3001)...${NC}"
cd backend
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Cài đặt dependencies cho Backend...${NC}"
    npm install
fi
npm run dev > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
cd ..
echo -e "${GREEN}✅ Backend đã khởi động (PID: $BACKEND_PID)${NC}"

# Wait a bit for backend to start
sleep 3

# Start Frontend
echo -e "${BLUE}📱 Khởi động Frontend (port 3000)...${NC}"
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Cài đặt dependencies cho Frontend...${NC}"
    npm install
fi
PORT=3000 BROWSER=none npm start > logs/frontend.log 2>&1 &
FRONTEND_PID=$!
echo -e "${GREEN}✅ Frontend đã khởi động (PID: $FRONTEND_PID)${NC}"

# Wait for services to be ready
echo ""
echo -e "${YELLOW}⏳ Đang chờ services khởi động...${NC}"
sleep 5

# Check if services are running
if ps -p $BACKEND_PID > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend đang chạy${NC}"
else
    echo -e "${RED}❌ Backend không khởi động được! Xem logs/backend.log${NC}"
fi

if ps -p $FRONTEND_PID > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Frontend đang chạy${NC}"
else
    echo -e "${RED}❌ Frontend không khởi động được! Xem logs/frontend.log${NC}"
fi

# Display final status
echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🎉 Dự án đã khởi động thành công!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}📱 Frontend:${NC}  http://localhost:3000"
echo -e "${BLUE}🖥️  Backend:${NC}   http://localhost:3001"
echo ""
echo -e "${YELLOW}📝 Logs:${NC}"
echo "   Frontend: tail -f logs/frontend.log"
echo "   Backend:  tail -f logs/backend.log"
echo ""
echo -e "${YELLOW}🛑 Để dừng:${NC} ./stop.sh hoặc kill $FRONTEND_PID $BACKEND_PID"
echo ""

