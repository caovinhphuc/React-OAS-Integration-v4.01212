# 🧪 Complete Test Guide - React OAS Integration v4.0

> **Hướng dẫn testing đầy đủ và chi tiết**  
> **Ngày cập nhật**: 2025-01-27

---

## 📋 TỔNG QUAN

Guide này cung cấp hướng dẫn đầy đủ về testing cho React OAS Integration v4.0, bao gồm:

- ✅ Frontend Tests (Jest + React Testing Library)
- ✅ Backend Tests (Python unittest)
- ✅ Integration Tests (API, Services)
- ✅ End-to-End Tests
- ✅ Health Checks
- ✅ Test Scripts Organization

---

## 🎯 QUICK START

### Run All Tests

```bash
# Complete test suite
npm run test:complete

# Hoặc từng loại
npm run test:frontend    # Frontend tests
npm run test:api        # API tests
npm run test:integration # Integration tests
```

### Health Check First

```bash
# Check system health before testing
npm run health:full
```

---

## 📁 TEST STRUCTURE

### Frontend Tests

```
src/
├── App.test.js          # Component tests
└── setupTests.js        # Jest configuration
```

### Integration Tests (scripts/tests/)

```
scripts/tests/
├── complete_system_test.js      # Complete system test
├── end_to_end_test.js           # E2E test
├── integration_test.js          # Integration test
├── advanced_integration_test.js # Advanced integration
├── frontend_connection_test.js  # Frontend connection
├── test_google_sheets.js        # Google Sheets test
└── ws-test.js                   # WebSocket test
```

### Service Tests (scripts/)

```
scripts/
├── test-all.js                  # Test runner
├── test-api-endpoints.js        # API endpoints
├── test-automation-system.js    # Automation system
├── test-websocket.js            # WebSocket
├── testGoogleSheets.js          # Google Sheets
├── testEmailService.js          # Email service
└── testTelegramConnection.js    # Telegram bot
```

### Backend Tests (Python)

```
automation/one_automation_system/
├── run_tests.py                 # Test runner
├── quick_test.py                # Quick test
├── test_webdriver.py            # WebDriver test
└── test_*.py                    # Other tests
```

---

## 🚀 TEST COMMANDS

### Frontend Tests

```bash
# Interactive watch mode
npm test

# With coverage
npm run test:coverage

# CI mode (non-interactive)
npm run test:ci

# Specific test file
npm test -- App.test.js
```

### Integration Tests

```bash
# Complete system test
node scripts/tests/complete_system_test.js

# End-to-end test
node scripts/tests/end_to_end_test.js

# Integration test
node scripts/tests/integration_test.js

# Advanced integration
node scripts/tests/advanced_integration_test.js

# Frontend connection
node scripts/tests/frontend_connection_test.js

# Google Sheets
node scripts/tests/test_google_sheets.js

# WebSocket
node scripts/tests/ws-test.js
```

### Service Tests

```bash
# All services
npm run test:complete

# Individual services
npm run test:api            # API endpoints
npm run test:automation     # Automation system
npm run test:google-sheets  # Google Sheets
npm run test:websocket      # WebSocket
```

### Backend Tests (Python)

```bash
# Run all tests
cd automation/one_automation_system
python run_tests.py

# Quick test
python quick_test.py

# Specific tests
python test_webdriver.py
python test_auth_system.py
```

### Health Checks

```bash
# Quick check
npm run health:quick

# Full check
npm run health-check

# Comprehensive check
npm run health:full
```

---

## 📊 TEST COVERAGE

### Frontend Coverage

```bash
# Generate coverage report
npm run test:coverage

# View HTML report
open coverage/lcov-report/index.html
```

### Coverage Thresholds

Current settings (relaxed for initial setup):

- Statements: 0%
- Branches: 0%
- Functions: 0%
- Lines: 0%

---

## 🔍 TEST DETAILS

### 1. Frontend Tests

**Framework:** Jest + React Testing Library

**Test Files:**

- `src/App.test.js` - Main component tests

**Running:**

```bash
npm test
```

### 2. Integration Tests

**Location:** `scripts/tests/`

**Test Suites:**

- `complete_system_test.js` - Runs all test suites
- `end_to_end_test.js` - End-to-end user workflows
- `integration_test.js` - Service integration
- `advanced_integration_test.js` - Advanced API tests
- `frontend_connection_test.js` - Frontend connectivity
- `test_google_sheets.js` - Google Sheets integration
- `ws-test.js` - WebSocket connection

**Running:**

```bash
# All tests
node scripts/tests/complete_system_test.js

# Individual
node scripts/tests/end_to_end_test.js
```

### 3. API Tests

**Script:** `scripts/test-api-endpoints.js`

**Endpoints Tested:**

- Backend: `/health`, `/api/status`, `/api/orders`, `/api/analytics`
- AI Service: `/health`, `/api/predictions`, `/api/analytics`

**Running:**

```bash
npm run test:api
```

### 4. Service Tests

**Scripts:**

- `testGoogleSheets.js` - Google Sheets API
- `testEmailService.js` - Email service
- `testTelegramConnection.js` - Telegram bot
- `test-automation-system.js` - Automation system

**Running:**

```bash
npm run test:google-sheets
npm run test:automation
```

---

## ⚙️ REQUIREMENTS

### Before Running Tests

1. **Services Running:**
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:3001`
   - AI Service: `http://localhost:8000`

2. **Dependencies:**
   - Node.js 18+
   - npm 8+
   - Python 3.9+

3. **Environment:**
   - `.env` file configured
   - Google Sheets credentials
   - API keys (if needed)

---

## 📝 TEST REPORTS

### Report Locations

- **Frontend Coverage:** `coverage/lcov-report/index.html`
- **Integration Reports:** `reports/` directory
- **Health Reports:** `reports/health/health-report-*.json`

### Report Formats

- **JSON:** Machine-readable test results
- **HTML:** Human-readable coverage reports
- **Console:** Real-time test output

---

## 🎯 TEST WORKFLOW

### Recommended Workflow

```bash
# 1. Health check
npm run health:full

# 2. Start services
./start.sh

# 3. Run frontend tests
npm test

# 4. Run integration tests
npm run test:complete

# 5. Check coverage
npm run test:coverage
```

---

## 🔧 TROUBLESHOOTING

### Tests Not Running

```bash
# Clear cache
rm -rf node_modules/.cache
npm test -- --clearCache

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Services Not Available

```bash
# Check services
npm run health:full

# Start services
./start.sh
```

### Port Conflicts

```bash
# Check ports
npm run check:ports

# Kill processes
npm run kill:port
```

---

## 📚 RELATED DOCUMENTATION

- `GUIDE/TESTING.md` - Detailed testing guide
- `TEST_SCRIPTS_GUIDE.md` - Test scripts reference
- `HEALTH_CHECK_GUIDE.md` - Health check guide
- `scripts/tests/README.md` - Test files guide

---

## ✅ CHECKLIST

- [x] Frontend tests configured
- [x] Integration tests organized
- [x] Test scripts documented
- [x] Health checks implemented
- [x] Test commands verified
- [x] Coverage reports configured

---

**Status**: ✅ Complete  
**Last Updated**: 2025-01-27
