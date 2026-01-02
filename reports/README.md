# 📊 Reports Directory

> **Quản lý tất cả các reports và test results**

---

## 📁 Cấu trúc

```
reports/
├── email/          # Email test reports
├── telegram/       # Telegram test reports
├── health/         # Health check reports
├── build/          # Build reports (bundle, setup, etc.)
├── performance/    # Performance reports
└── lighthouse/     # Lighthouse audit reports
```

---

## 📋 Loại Reports

### Email Reports

- `email-test-report-YYYY-MM-DD.json` - Kết quả test email service

### Telegram Reports

- `telegram-test-report-YYYY-MM-DD.json` - Kết quả test Telegram bot

### Health Reports

- `health-report-YYYY-MM-DD.json` - Health check results từ các services

### Build Reports

- `build-report.json` - Build summary
- `bundle-report.json` - Bundle analysis
- `setup-report.json` - Setup process results

### Performance Reports

- `performance-budget-report.json` - Performance budget analysis

### Lighthouse Reports

- `lighthouse-YYYY-MM-DDTHH-MM-SS-sssZ.report.json` - Lighthouse audit results

---

## 🧹 Cleanup

### Tự động cleanup reports cũ

```bash
# Cleanup reports cũ hơn 30 ngày (dry run)
./scripts/utils/cleanup-old-reports.sh 30 true

# Cleanup reports cũ hơn 30 ngày (thực sự xóa)
./scripts/utils/cleanup-old-reports.sh 30 false

# Cleanup reports cũ hơn 7 ngày
./scripts/utils/cleanup-old-reports.sh 7 false
```

### Tổ chức lại reports

```bash
# Tự động tổ chức tất cả reports vào đúng thư mục
./scripts/utils/organize-reports.sh
```

---

## ⚙️ Tự động tổ chức

Scripts tự động sẽ:

- ✅ Di chuyển reports vào đúng thư mục
- ✅ Tổ chức theo loại và ngày tháng
- ✅ Giữ lại cấu trúc thư mục

---

## 📝 Lưu ý

- Reports được ignore trong `.gitignore` để tránh commit vào repo
- Chỉ giữ lại structure (`.gitkeep` files)
- Reports cũ sẽ được cleanup tự động
- Có thể xem reports trong local để debug

---

**Last Updated**: 2025-01-27
