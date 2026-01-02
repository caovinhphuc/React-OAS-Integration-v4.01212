# 🧪 Test Scripts

> **Test files cho React OAS Integration v4.0**

---

## 📁 Files

### Integration Tests

- `end_to_end_test.js` - End-to-end testing suite
- `integration_test.js` - Integration tests
- `advanced_integration_test.js` - Advanced integration tests
- `complete_system_test.js` - Complete system tests
- `frontend_connection_test.js` - Frontend connection tests

### Specific Tests

- `test_google_sheets.js` - Google Sheets integration tests
- `ws-test.js` - WebSocket tests

---

## 🚀 Cách chạy

### Chạy tất cả tests

```bash
node scripts/tests/complete_system_test.js
```

### Chạy từng test

```bash
# End-to-end test
node scripts/tests/end_to_end_test.js

# Integration test
node scripts/tests/integration_test.js

# Google Sheets test
node scripts/tests/test_google_sheets.js

# WebSocket test
node scripts/tests/ws-test.js
```

---

## ⚙️ Requirements

- Node.js 18+
- Services running:
  - Frontend: http://localhost:3000
  - Backend: http://localhost:3001
  - AI Service: http://localhost:8000

---

**Last Updated**: 2025-01-27
