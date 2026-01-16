#!/bin/bash

# Clean and Restart Script
# Kill all ports, clear cache, and restart services

echo "🧹 Clean and Restart Script"
echo "============================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

# Ports to kill (theo phân tích PORT_ANALYSIS.md)
# Required: 3000 (Frontend), 3001 (Backend)
# Optional: 8001 (Automation Service)
# Legacy/Optional: 8000 (AI Service - có trong package.json nhưng không trong start_dev_servers.sh)
PORTS=(3000 3001 8000 8001)

echo -e "${CYAN}📋 Step 1: Killing processes on ports...${NC}"
echo ""

killed_count=0
for port in "${PORTS[@]}"; do
    # Find processes using the port
    if command -v lsof >/dev/null 2>&1; then
        # macOS/Linux
        pids=$(lsof -ti:$port 2>/dev/null)
        if [ -n "$pids" ]; then
            echo -e "${YELLOW}⚠️  Killing processes on port $port...${NC}"
            echo "$pids" | xargs kill -9 2>/dev/null
            killed_count=$((killed_count + 1))
            sleep 0.5
        fi
    elif command -v netstat >/dev/null 2>&1; then
        # Alternative method
        pids=$(netstat -tlnp 2>/dev/null | grep ":$port " | awk '{print $7}' | cut -d'/' -f1 | sort -u)
        if [ -n "$pids" ]; then
            echo -e "${YELLOW}⚠️  Killing processes on port $port...${NC}"
            echo "$pids" | xargs kill -9 2>/dev/null
            killed_count=$((killed_count + 1))
            sleep 0.5
        fi
    fi
done

if [ $killed_count -eq 0 ]; then
    echo -e "${GREEN}✅ No processes found on ports${NC}"
else
    echo -e "${GREEN}✅ Killed processes on $killed_count port(s)${NC}"
fi

echo ""
echo -e "${CYAN}📋 Step 2: Clearing cache and build files...${NC}"
echo ""

# Clear Node.js cache
if [ -d "node_modules/.cache" ]; then
    echo -e "${YELLOW}🗑️  Removing node_modules/.cache...${NC}"
    rm -rf node_modules/.cache
    echo -e "${GREEN}✅ Cleared node_modules cache${NC}"
fi

# Clear build directory
if [ -d "build" ]; then
    echo -e "${YELLOW}🗑️  Removing build directory...${NC}"
    rm -rf build
    echo -e "${GREEN}✅ Cleared build directory${NC}"
fi

# Clear Python cache
echo -e "${YELLOW}🗑️  Removing Python cache files...${NC}"
find . -type d -name "__pycache__" -exec rm -r {} + 2>/dev/null || true
find . -type f -name "*.pyc" -delete 2>/dev/null || true
find . -type f -name "*.pyo" -delete 2>/dev/null || true
echo -e "${GREEN}✅ Cleared Python cache${NC}"

# Clear .pytest_cache
if [ -d ".pytest_cache" ]; then
    rm -rf .pytest_cache
    echo -e "${GREEN}✅ Cleared pytest cache${NC}"
fi

# Clear coverage
if [ -d "coverage" ]; then
    rm -rf coverage
    echo -e "${GREEN}✅ Cleared coverage directory${NC}"
fi

# Clear npm cache (optional)
read -p "$(echo -e ${CYAN}Clear npm cache? [y/N]: ${NC})" -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}🗑️  Clearing npm cache...${NC}"
    npm cache clean --force 2>/dev/null || true
    echo -e "${GREEN}✅ Cleared npm cache${NC}"
fi

# Clear yarn cache (optional)
if command -v yarn >/dev/null 2>&1; then
    read -p "$(echo -e ${CYAN}Clear yarn cache? [y/N]: ${NC})" -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}🗑️  Clearing yarn cache...${NC}"
        yarn cache clean 2>/dev/null || true
        echo -e "${GREEN}✅ Cleared yarn cache${NC}"
    fi
fi

echo ""
echo -e "${CYAN}📋 Step 3: Wait for processes to fully terminate...${NC}"
sleep 2

echo ""
echo -e "${CYAN}📋 Step 4: Verify ports are free...${NC}"
echo ""

all_free=true
for port in "${PORTS[@]}"; do
    if command -v lsof >/dev/null 2>&1; then
        if lsof -ti:$port >/dev/null 2>&1; then
            echo -e "${RED}❌ Port $port is still in use${NC}"
            all_free=false
        else
            echo -e "${GREEN}✅ Port $port is free${NC}"
        fi
    else
        echo -e "${YELLOW}⚠️  Cannot verify port $port (lsof not available)${NC}"
    fi
done

echo ""
if [ "$all_free" = true ]; then
    echo -e "${GREEN}✅ All ports are free!${NC}"
else
    echo -e "${YELLOW}⚠️  Some ports may still be in use${NC}"
fi

echo ""
echo -e "${CYAN}📋 Step 5: Restart services?${NC}"
echo ""
echo "Options:"
echo "  1. Start development servers (Frontend + Backend + AI Service)"
echo "  2. Start Frontend only"
echo "  3. Start Backend only"
echo "  4. Start AI Service only"
echo "  5. Skip (manual start)"
echo ""

read -p "$(echo -e ${CYAN}Choose option [1-5]: ${NC})" -n 1 -r
echo
echo ""

case $REPLY in
    1)
        echo -e "${CYAN}🚀 Starting all development servers...${NC}"
        if [ -f "start_dev_servers.sh" ]; then
            bash start_dev_servers.sh
        elif [ -f "package.json" ]; then
            npm run dev &
        else
            echo -e "${RED}❌ start_dev_servers.sh not found${NC}"
        fi
        ;;
    2)
        echo -e "${CYAN}🚀 Starting Frontend...${NC}"
        if [ -f "package.json" ]; then
            npm start &
        else
            echo -e "${RED}❌ package.json not found${NC}"
        fi
        ;;
    3)
        echo -e "${CYAN}🚀 Starting Backend...${NC}"
        if [ -d "backend" ] && [ -f "backend/package.json" ]; then
            cd backend && npm start &
        elif [ -f "package.json" ] && grep -q "\"backend\"" package.json; then
            npm run backend &
        else
            echo -e "${RED}❌ Backend not found${NC}"
        fi
        ;;
    4)
        echo -e "${CYAN}🚀 Starting AI Service...${NC}"
        if [ -d "ai-service" ] && [ -f "ai-service/main_simple.py" ]; then
            cd ai-service && python3 -m uvicorn main_simple:app --host 0.0.0.0 --port 8000 --reload &
        elif [ -f "package.json" ] && grep -q "\"ai-service\"" package.json; then
            npm run ai-service &
        else
            echo -e "${RED}❌ AI Service not found${NC}"
        fi
        ;;
    5)
        echo -e "${YELLOW}⏭️  Skipping auto-start${NC}"
        echo "You can start services manually:"
        echo "  - Frontend: npm start"
        echo "  - Backend: cd backend && npm start"
        echo "  - AI Service: cd ai-service && python3 -m uvicorn main_simple:app --host 0.0.0.0 --port 8000"
        ;;
    *)
        echo -e "${YELLOW}⏭️  Invalid option, skipping auto-start${NC}"
        ;;
esac

echo ""
echo -e "${GREEN}🎉 Clean and restart complete!${NC}"
echo ""
echo -e "${CYAN}📋 Summary:${NC}"
echo "  ✅ Killed processes on ports"
echo "  ✅ Cleared cache and build files"
echo "  ✅ Verified ports are free"
if [ "$REPLY" != "5" ] && [[ ! "$REPLY" =~ ^[^1-5]$ ]]; then
    echo "  ✅ Started services"
fi
echo ""

