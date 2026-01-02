#!/bin/bash

# OneAutomationSystem - Health Check Script
# Kiểm tra tất cả components của Google Sheets Integration

echo "🔍 OneAutomationSystem Health Check"
echo "=================================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

success=0
total=0

check_file() {
    total=$((total + 1))
    if [ -f "$1" ]; then
        echo -e "${GREEN}✅${NC} File exists: $1"
        success=$((success + 1))
    else
        echo -e "${RED}❌${NC} Missing file: $1"
    fi
}

check_dir() {
    total=$((total + 1))
    if [ -d "$1" ]; then
        echo -e "${GREEN}✅${NC} Directory exists: $1"
        success=$((success + 1))
    else
        echo -e "${RED}❌${NC} Missing directory: $1"
    fi
}

check_env_var() {
    total=$((total + 1))
    if [ -n "${!1}" ]; then
        echo -e "${GREEN}✅${NC} Environment variable: $1 = ${!1}"
        success=$((success + 1))
    else
        echo -e "${RED}❌${NC} Missing env var: $1"
    fi
}

check_port() {
    total=$((total + 1))
    if command -v nc >/dev/null 2>&1; then
        if nc -z localhost $1 2>/dev/null; then
            echo -e "${GREEN}✅${NC} Port $1 is open and responding"
            success=$((success + 1))
        else
            echo -e "${YELLOW}⚠️${NC} Port $1 is not responding (may be normal if service not running)"
        fi
    else
        echo -e "${YELLOW}⚠️${NC} Cannot check port $1 (nc not installed)"
    fi
}

check_python_module() {
    total=$((total + 1))
    if python3 -c "import $1" 2>/dev/null; then
        echo -e "${GREEN}✅${NC} Python module installed: $1"
        success=$((success + 1))
    else
        echo -e "${RED}❌${NC} Python module missing: $1"
    fi
}

check_json_valid() {
    total=$((total + 1))
    if [ -f "$1" ]; then
        if python3 -c "import json; json.load(open('$1'))" 2>/dev/null; then
            echo -e "${GREEN}✅${NC} Valid JSON file: $1"
            success=$((success + 1))
        else
            echo -e "${RED}❌${NC} Invalid JSON file: $1"
        fi
    else
        echo -e "${RED}❌${NC} File not found: $1"
    fi
}

echo ""
echo -e "${CYAN}📁 Checking files...${NC}"
check_file ".env"
check_file "config/config.json"
check_file "config/service_account.json"
check_file "services/google_sheets_service.py"
check_file "modules/google_sheets_config.py"
check_file "requirements.txt"

echo ""
echo -e "${CYAN}📂 Checking directories...${NC}"
check_dir "config"
check_dir "services"
check_dir "modules"
check_dir "scripts"
check_dir "logs"

echo ""
echo -e "${CYAN}🔧 Checking environment variables...${NC}"
if [ -f ".env" ]; then
    source .env 2>/dev/null || echo "Warning: Could not load .env file"
    check_env_var "GOOGLE_SHEET_ID"
    check_env_var "GOOGLE_SERVICE_ACCOUNT_FILE"
else
    echo -e "${YELLOW}⚠️${NC} .env file not found - skipping env var checks"
fi

echo ""
echo -e "${CYAN}🐍 Checking Python dependencies...${NC}"
check_python_module "gspread"
check_python_module "google.auth"
check_python_module "googleapiclient"
check_python_module "pandas"

echo ""
echo -e "${CYAN}📄 Checking JSON files...${NC}"
if [ -f "config/service_account.json" ]; then
    check_json_valid "config/service_account.json"
fi
if [ -f "config/config.json" ]; then
    check_json_valid "config/config.json"
fi

echo ""
echo -e "${CYAN}🌐 Checking ports (optional - services may not be running)...${NC}"
check_port 3001 # API
check_port 3000 # Frontend

echo ""
echo -e "${CYAN}🔍 Testing Google Sheets connection...${NC}"
total=$((total + 1))

# Try test_sheets_connection.py first (new comprehensive test)
if [ -f "test_sheets_connection.py" ]; then
    if python3 test_sheets_connection.py 2>/dev/null | grep -q "✅ All tests passed\|All tests passed"; then
        echo -e "${GREEN}✅${NC} Google Sheets connection test passed (test_sheets_connection.py)"
        success=$((success + 1))
    else
        echo -e "${YELLOW}⚠️${NC} Google Sheets connection test - run manually: python3 test_sheets_connection.py"
    fi
# Fallback to verify_sheets.py if exists
elif [ -f "verify_sheets.py" ]; then
    if python3 verify_sheets.py 2>/dev/null | grep -q "✅\|Success"; then
        echo -e "${GREEN}✅${NC} Google Sheets connection test passed (verify_sheets.py)"
        success=$((success + 1))
    else
        echo -e "${YELLOW}⚠️${NC} Google Sheets connection test - run manually: python3 verify_sheets.py"
    fi
# Check in modules directory
elif [ -f "modules/verify_sheets.py" ]; then
    if python3 modules/verify_sheets.py 2>/dev/null | grep -q "✅\|Success"; then
        echo -e "${GREEN}✅${NC} Google Sheets connection test passed (modules/verify_sheets.py)"
        success=$((success + 1))
    else
        echo -e "${YELLOW}⚠️${NC} Google Sheets connection test - run manually: python3 modules/verify_sheets.py"
    fi
else
    echo -e "${YELLOW}⚠️${NC} No connection test script found (test_sheets_connection.py or verify_sheets.py)"
fi

echo ""
echo "=================================="
echo -e "${CYAN}📊 Health Check Summary${NC}"
echo "=================================="

if [ $total -gt 0 ]; then
    percentage=$((success * 100 / total))
    
    if [ $percentage -eq 100 ]; then
        echo -e "${GREEN}🎉 All checks passed! ($success/$total)${NC}"
        echo -e "${GREEN}✨ System is ready for use!${NC}"
        exit 0
    elif [ $percentage -ge 80 ]; then
        echo -e "${YELLOW}⚠️  Most checks passed ($success/$total) - ${percentage}%${NC}"
        echo -e "${YELLOW}🔧 Please fix remaining issues${NC}"
        exit 1
    else
        echo -e "${RED}❌ Many checks failed ($success/$total) - ${percentage}%${NC}"
        echo -e "${RED}🚨 Please review configuration${NC}"
        exit 2
    fi
else
    echo -e "${YELLOW}⚠️  No checks performed${NC}"
    exit 1
fi

