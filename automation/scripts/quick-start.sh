#!/bin/bash

# OneAutomationSystem - Quick Start Script
# Setup nhanh Google Sheets Integration

echo "🚀 OneAutomationSystem - Quick Start"
echo "===================================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

# Get script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_DIR"

echo -e "${CYAN}📁 Project directory: $PROJECT_DIR${NC}"
echo ""

# Check if .env exists
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}📝 Creating .env file from template...${NC}"
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo -e "${GREEN}✅ Created .env from .env.example${NC}"
    else
        echo -e "${YELLOW}⚠️  .env.example not found, creating basic .env...${NC}"
        cat > .env << EOF
# Google Sheets Configuration
GOOGLE_SHEET_ID=your_sheet_id_here
GOOGLE_SERVICE_ACCOUNT_FILE=config/service_account.json

# Optional: API Configuration
API_PORT=3001
FRONTEND_PORT=3000
EOF
        echo -e "${GREEN}✅ Created basic .env file${NC}"
    fi
    echo -e "${YELLOW}⚠️  Please edit .env file with your Google Sheets configuration${NC}"
    echo -e "${CYAN}   Required: GOOGLE_SHEET_ID${NC}"
    echo ""
    read -p "Press enter to continue after editing .env file..."
else
    echo -e "${GREEN}✅ .env file already exists${NC}"
fi

# Check credentials
if [ ! -f "config/service_account.json" ]; then
    echo -e "${YELLOW}📁 Creating config directory...${NC}"
    mkdir -p config
    
    echo -e "${YELLOW}⚠️  Please copy your Google Sheets service account JSON file to:${NC}"
    echo -e "${CYAN}   config/service_account.json${NC}"
    echo ""
    echo -e "${CYAN}📋 Steps:${NC}"
    echo "   1. Go to Google Cloud Console"
    echo "   2. Create Service Account"
    echo "   3. Download JSON key"
    echo "   4. Copy to config/service_account.json"
    echo ""
    read -p "Press enter to continue after copying credentials file..."
else
    echo -e "${GREEN}✅ Service account credentials found${NC}"
    # Set correct permissions
    chmod 600 config/service_account.json 2>/dev/null || true
fi

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo -e "${CYAN}🐍 Creating Python virtual environment...${NC}"
    python3 -m venv venv
    echo -e "${GREEN}✅ Virtual environment created${NC}"
fi

# Activate virtual environment
echo -e "${CYAN}🐍 Activating virtual environment...${NC}"
source venv/bin/activate 2>/dev/null || {
    echo -e "${RED}❌ Failed to activate virtual environment${NC}"
    exit 1
}

# Install Python dependencies
if [ -f "requirements.txt" ]; then
    echo -e "${CYAN}📦 Installing Python dependencies...${NC}"
    pip install --upgrade pip >/dev/null 2>&1
    pip install -r requirements.txt
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Python dependencies installed${NC}"
    else
        echo -e "${RED}❌ Failed to install Python dependencies${NC}"
        exit 1
    fi
else
    echo -e "${YELLOW}⚠️  requirements.txt not found${NC}"
fi

# Run connection test
echo ""
echo -e "${CYAN}🧪 Testing Google Sheets connection...${NC}"
if [ -f "test_sheets_connection.py" ]; then
    python3 test_sheets_connection.py
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Connection test passed${NC}"
    else
        echo -e "${YELLOW}⚠️  Connection test failed - please check your configuration${NC}"
    fi
elif [ -f "verify_sheets.py" ]; then
    python3 verify_sheets.py
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Connection test passed${NC}"
    else
        echo -e "${YELLOW}⚠️  Connection test failed - please check your configuration${NC}"
    fi
elif [ -f "modules/verify_sheets.py" ]; then
    python3 modules/verify_sheets.py
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Connection test passed${NC}"
    else
        echo -e "${YELLOW}⚠️  Connection test failed - please check your configuration${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  No connection test script found - skipping connection test${NC}"
fi

# Run health check
echo ""
echo -e "${CYAN}🔍 Running health check...${NC}"
if [ -f "scripts/health-check.sh" ]; then
    bash scripts/health-check.sh
else
    echo -e "${YELLOW}⚠️  health-check.sh not found${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Quick start complete!${NC}"
echo ""
echo -e "${CYAN}📋 Next steps:${NC}"
echo "   1. Verify configuration in .env file"
echo "   2. Share Google Sheet with service account email"
echo "   3. Run: python3 test_sheets_connection.py"
echo "   4. Start automation: python3 automation_enhanced.py"
echo ""
echo -e "${CYAN}📚 Documentation:${NC}"
echo "   - README.md - Full setup guide"
echo "   - docs/Google_Sheets_Integration_Checklist.md - Checklist"
echo ""

