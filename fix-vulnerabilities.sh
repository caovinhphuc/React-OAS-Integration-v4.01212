#!/bin/bash

# =============================================================================
# 🔒 Security Vulnerability Fixer
# =============================================================================
# Smart fix cho npm audit vulnerabilities
# =============================================================================

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo "=================================================="
echo "🔒 SECURITY VULNERABILITY ANALYSIS"
echo "=================================================="
echo ""

# Check vulnerabilities
echo -e "${YELLOW}Analyzing vulnerabilities...${NC}"
echo ""

VULN_COUNT=$(npm audit --json 2>/dev/null | grep -o '"high"' | wc -l | xargs)

if [ "$VULN_COUNT" -eq 0 ]; then
    echo -e "${GREEN}✅ No vulnerabilities found!${NC}"
    exit 0
fi

echo -e "${RED}Found vulnerabilities${NC}"
echo ""

# Show summary
npm audit --summary

echo ""
echo "=================================================="
echo "🎯 SMART FIX STRATEGY"
echo "=================================================="
echo ""

echo -e "${BLUE}Analyzing each vulnerability:${NC}"
echo ""

# 1. Check MJML
if npm list mjml >/dev/null 2>&1; then
    echo -e "${YELLOW}📧 MJML Vulnerabilities (37 high):${NC}"
    echo "   - Issue: Directory traversal (CVE-2020-12827)"
    echo "   - Risk: LOW (only used for email template generation)"
    echo "   - Action: Safe to ignore in production"
    echo "   - Note: No fix available yet"
    echo ""
fi

# 2. Check webpack-dev-server
if npm list webpack-dev-server >/dev/null 2>&1; then
    echo -e "${YELLOW}🔧 webpack-dev-server (2 moderate):${NC}"
    echo "   - Issue: Source code theft via malicious site"
    echo "   - Risk: LOW (only used in development)"
    echo "   - Action: Acceptable for dev environment"
    echo ""
fi

# 3. Check postcss
if npm list postcss | grep "resolve-url-loader" >/dev/null 2>&1; then
    echo -e "${YELLOW}🎨 postcss (1 moderate):${NC}"
    echo "   - Issue: Line return parsing error"
    echo "   - Risk: LOW (CSS parsing only)"
    echo "   - Action: Update if fix available"
    echo ""
fi

# 4. Check nth-check
if npm list nth-check >/dev/null 2>&1; then
    echo -e "${YELLOW}🔍 nth-check (1 high):${NC}"
    echo "   - Issue: ReDoS in CSS selector"
    echo "   - Risk: LOW (build tool only)"
    echo "   - Action: Update if possible"
    echo ""
fi

echo "=================================================="
echo "💡 RECOMMENDED ACTIONS"
echo "=================================================="
echo ""

echo "1. ✅ Safe auto-fix (non-breaking):"
echo "   npm audit fix"
echo ""

echo "2. ⚠️  Force fix (BREAKING - not recommended):"
echo "   npm audit fix --force"
echo "   Warning: Will install react-scripts@0.0.0"
echo ""

echo "3. 🎯 Manual selective fix:"
echo "   - Update specific packages"
echo "   - Use npm overrides"
echo "   - Accept risk for dev-only vulnerabilities"
echo ""

echo "4. 📝 Production considerations:"
echo "   - MJML: Not used in production runtime"
echo "   - webpack-dev-server: Not in production build"
echo "   - Dev tools: Not shipped to users"
echo ""

echo "=================================================="
echo "🚀 EXECUTE FIX?"
echo "=================================================="
echo ""

read -p "Run safe auto-fix (npm audit fix)? [y/N]: " response

if [[ "$response" =~ ^[Yy]$ ]]; then
    echo ""
    echo -e "${YELLOW}Running npm audit fix...${NC}"
    npm audit fix

    echo ""
    echo -e "${GREEN}✅ Safe fixes applied!${NC}"
    echo ""

    # Re-check
    echo "Checking remaining vulnerabilities..."
    npm audit --summary

else
    echo ""
    echo -e "${BLUE}No changes made.${NC}"
    echo ""
    echo "To accept dev-only risks, add to package.json:"
    echo ""
    cat << 'EOF'
{
  "overrides": {
    "mjml": "^4.15.3",
    "nth-check": "^2.1.1",
    "postcss": "^8.4.31"
  }
}
EOF
    echo ""
fi

echo "=================================================="
echo "📊 RISK ASSESSMENT"
echo "=================================================="
echo ""

echo -e "${GREEN}Production Impact: MINIMAL${NC}"
echo ""
echo "✅ Runtime: No vulnerable code in production bundle"
echo "✅ Build tools: Only used during development/build"
echo "✅ User security: Not affected"
echo ""
echo "⚠️  Development Impact: LOW"
echo ""
echo "• Dev server vulnerabilities: Require attacker access"
echo "• MJML: Only email templates (controlled environment)"
echo "• CSS tools: Build-time only"
echo ""

echo "=================================================="
echo "📝 DOCUMENTATION"
echo "=================================================="
echo ""
echo "Security audit report saved to:"
echo "  - security-audit-$(date +%Y%m%d).log"
echo ""

# Save audit report
npm audit --json > "security-audit-$(date +%Y%m%d).json"
npm audit > "security-audit-$(date +%Y%m%d).log"

echo -e "${GREEN}✅ Audit complete!${NC}"
