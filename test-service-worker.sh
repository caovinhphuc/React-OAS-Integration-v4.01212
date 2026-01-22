#!/bin/bash

# =============================================================================
# 🧪 Service Worker Testing Script
# =============================================================================
# Tests PWA and Service Worker functionality
# =============================================================================

set -e

echo "=================================================="
echo "🧪 SERVICE WORKER TESTING"
echo "=================================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if build exists
if [ ! -d "build" ]; then
    echo -e "${RED}❌ Build folder not found!${NC}"
    echo "Run: npm run build"
    exit 1
fi

echo -e "${GREEN}✅ Build folder found${NC}"
echo ""

# Check service worker file
if [ ! -f "build/service-worker.js" ]; then
    echo -e "${RED}❌ Service worker not found!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Service worker file exists${NC}"
echo ""

# Display service worker size
SW_SIZE=$(wc -c < build/service-worker.js)
echo -e "${BLUE}📊 Service Worker Size: ${SW_SIZE} bytes${NC}"
echo ""

# Check manifest.json
if [ ! -f "build/manifest.json" ]; then
    echo -e "${RED}❌ manifest.json not found!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ manifest.json exists${NC}"
echo ""

# Serve the build
echo -e "${YELLOW}🚀 Starting production server...${NC}"
echo ""

PORT=3002

# Check if port is in use
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Port $PORT is in use${NC}"
    # Find available port
    PORT=$(node -e "require('http').createServer().listen(0, () => { console.log(process.env.npm_package_scripts_test ? 3003 : 3004); process.exit(); })")
fi

# Start server in background
echo -e "${BLUE}Starting server on port $PORT...${NC}"
npx serve -s build -l $PORT > /dev/null 2>&1 &
SERVER_PID=$!

# Wait for server to start
sleep 2

# Check if server is running
if ! kill -0 $SERVER_PID 2>/dev/null; then
    echo -e "${RED}❌ Failed to start server${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Server started successfully${NC}"
echo ""

# Display URLs
echo "=================================================="
echo -e "${GREEN}🎯 Test URLs:${NC}"
echo "=================================================="
echo ""
echo -e "${BLUE}Local:${NC}    http://localhost:$PORT"
echo -e "${BLUE}Network:${NC}  http://$(ipconfig getifaddr en0):$PORT"
echo ""

echo "=================================================="
echo -e "${YELLOW}📋 Testing Checklist:${NC}"
echo "=================================================="
echo ""
echo "1. ✅ Open Chrome DevTools (F12)"
echo "2. ✅ Go to Application → Service Workers"
echo "3. ✅ Verify Service Worker is 'Activated'"
echo "4. ✅ Check 'Offline' checkbox"
echo "5. ✅ Refresh page - should work offline!"
echo "6. ✅ Go to Cache Storage"
echo "7. ✅ Verify caches exist:"
echo "   - react-oas-v4.0.0 (static)"
echo "   - react-oas-data-v4.0.0 (API)"
echo ""

echo "=================================================="
echo -e "${GREEN}🎨 PWA Testing:${NC}"
echo "=================================================="
echo ""
echo "1. ✅ Click install button (may appear in address bar)"
echo "2. ✅ Add to home screen"
echo "3. ✅ Test standalone mode"
echo "4. ✅ Check splash screen"
echo ""

echo "=================================================="
echo -e "${BLUE}📊 Performance Testing:${NC}"
echo "=================================================="
echo ""
echo "1. ✅ Run Lighthouse audit:"
echo "   - Performance score"
echo "   - PWA score"
echo "   - Best practices"
echo "2. ✅ Test cache hit rates"
echo "3. ✅ Compare load times"
echo ""

echo "=================================================="
echo -e "${YELLOW}🌐 Open Browser:${NC}"
echo "=================================================="
echo ""

# Try to open browser
if command -v open &> /dev/null; then
    echo "Opening browser..."
    open "http://localhost:$PORT"
elif command -v xdg-open &> /dev/null; then
    echo "Opening browser..."
    xdg-open "http://localhost:$PORT"
else
    echo -e "${YELLOW}Please manually open: http://localhost:$PORT${NC}"
fi

echo ""
echo "=================================================="
echo -e "${GREEN}✅ Server running on PID: $SERVER_PID${NC}"
echo "=================================================="
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop the server${NC}"
echo ""

# Keep script running
trap "echo ''; echo 'Stopping server...'; kill $SERVER_PID 2>/dev/null; echo 'Done!'; exit 0" INT TERM

# Wait for user to stop
wait $SERVER_PID 2>/dev/null
