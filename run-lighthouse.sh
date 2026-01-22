#!/bin/bash

# =============================================================================
# 🔍 Lighthouse Audit Script
# =============================================================================
# Chạy Lighthouse audit cho app và generate report
# =============================================================================

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "=================================================="
echo "🔍 LIGHTHOUSE AUDIT"
echo "=================================================="
echo ""

# Default URL
URL="${1:-http://localhost:54804}"
OUTPUT_FILE="lighthouse-report-$(date +%Y%m%d-%H%M%S).html"

echo -e "${BLUE}Testing URL:${NC} $URL"
echo -e "${BLUE}Output:${NC} $OUTPUT_FILE"
echo ""

# Check if URL is accessible
echo -e "${YELLOW}Checking if URL is accessible...${NC}"
if ! curl -s -o /dev/null -w "%{http_code}" "$URL" | grep -q "200\|301\|302"; then
    echo -e "${RED}❌ URL is not accessible!${NC}"
    echo ""
    echo "Make sure your app is running:"
    echo "  npm start (development)"
    echo "  npx serve -s build -l 3000 (production)"
    exit 1
fi

echo -e "${GREEN}✅ URL is accessible${NC}"
echo ""

# Run Lighthouse
echo -e "${YELLOW}Running Lighthouse audit...${NC}"
echo ""

npx lighthouse "$URL" \
    --output=html \
    --output-path="./$OUTPUT_FILE" \
    --chrome-flags="--headless" \
    --quiet

echo ""
echo "=================================================="
echo -e "${GREEN}✅ Audit Complete!${NC}"
echo "=================================================="
echo ""

# Display file size
FILE_SIZE=$(du -h "$OUTPUT_FILE" | cut -f1)
echo -e "${BLUE}Report saved:${NC} $OUTPUT_FILE ($FILE_SIZE)"
echo ""

# Open report
echo -e "${YELLOW}Opening report in browser...${NC}"
open "$OUTPUT_FILE"

echo ""
echo "=================================================="
echo -e "${BLUE}📊 What to Check:${NC}"
echo "=================================================="
echo ""
echo "1. ⚡ Performance Score (target: 90+)"
echo "2. 📱 PWA Score (target: 100)"
echo "3. 🎯 Best Practices (target: 90+)"
echo "4. ♿ Accessibility (target: 90+)"
echo "5. 🔍 SEO Score (target: 90+)"
echo ""
echo "=================================================="
echo -e "${GREEN}💡 Tips:${NC}"
echo "=================================================="
echo ""
echo "• Test production build for accurate results"
echo "• Check 'Opportunities' for performance improvements"
echo "• Review 'Diagnostics' for issues"
echo "• Look at 'Passed Audits' to see what's good"
echo ""
