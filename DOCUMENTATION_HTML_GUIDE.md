# 📚 HTML Documentation Guide

> **React OAS Integration v4.0**  
> **Ngày cập nhật**: 2025-01-27

---

## ✅ ĐÃ HOÀN THÀNH

### 1. Tạo HTML Documentation ✅

- ✅ File `docs.html` - Complete documentation HTML
- ✅ Tự động generate từ markdown files
- ✅ Dark mode support
- ✅ Responsive design
- ✅ Sidebar navigation

### 2. Scripts tự động ✅

- ✅ `scripts/utils/generate-complete-docs.js` - Generate HTML từ markdown
- ✅ `scripts/utils/auto-update-docs.sh` - Auto update script

### 3. NPM Scripts ✅

- ✅ `npm run docs:generate` - Generate docs.html
- ✅ `npm run docs:watch` - Watch mode (auto-update)

---

## 🚀 CÁCH SỬ DỤNG

### Generate Documentation

```bash
# Generate một lần
npm run docs:generate
# hoặc
node scripts/utils/generate-complete-docs.js

# Watch mode (tự động cập nhật khi có thay đổi)
npm run docs:watch
# hoặc
./scripts/utils/auto-update-docs.sh true
```

### Xem Documentation

```bash
# Mở trong browser
open docs.html
# hoặc
xdg-open docs.html  # Linux
start docs.html     # Windows
```

---

## 📁 CẤU TRÚC

### File HTML

- `docs.html` - Complete documentation HTML (auto-generated)

### Scripts

- `scripts/utils/generate-complete-docs.js` - Generator script
- `scripts/utils/auto-update-docs.sh` - Auto-update script

### Source Files (Markdown)

Documentation được generate từ các file markdown:

- `README.md` - Overview
- `ARCHITECTURE.md` - Architecture
- `DEPLOYMENT_GUIDE.md` - Setup & Deployment
- `SCRIPTS_GUIDE.md` - Scripts Guide
- `PYTHON_FILES_GUIDE.md` - Python Files
- `JAVASCRIPT_FILES_GUIDE.md` - JavaScript Files
- `REPORTS_BACKUPS_GUIDE.md` - Reports & Backups
- `GOOGLE_SHEETS_SETUP_GUIDE.md` - Google Sheets
- `WEBSOCKET_SETUP_GUIDE.md` - WebSocket
- `UI_COMPONENTS_GUIDE.md` - UI Components

---

## 🎨 TÍNH NĂNG

### 1. Dark Mode ✅

- Toggle dark/light mode
- Lưu preference trong localStorage
- Auto-detect system preference

### 2. Responsive Design ✅

- Mobile-friendly
- Sidebar navigation
- Touch-friendly controls

### 3. Navigation ✅

- Sidebar với tất cả sections
- Active link highlighting
- Smooth scrolling

### 4. Auto-Update ✅

- Tự động generate từ markdown
- Watch mode để auto-update
- Timestamp hiển thị last updated

---

## 📋 SECTIONS

Documentation bao gồm các sections:

1. **📋 Tổng Quan** - Overview từ README.md
2. **🏗️ Kiến Trúc** - Architecture từ ARCHITECTURE.md
3. **⚙️ Setup & Deployment** - Setup guide
4. **🔧 Scripts Guide** - Scripts documentation
5. **🐍 Python Files** - Python files organization
6. **📦 JavaScript Files** - JavaScript files organization
7. **📊 Reports & Backups** - Reports management
8. **📊 Google Sheets** - Google Sheets setup
9. **🔌 WebSocket** - WebSocket setup
10. **🎨 UI Components** - UI Components guide

---

## 🔄 AUTO-UPDATE

### Watch Mode

```bash
npm run docs:watch
```

Script sẽ:

- ✅ Watch tất cả file .md
- ✅ Tự động regenerate khi có thay đổi
- ✅ Hiển thị notification khi update

### Manual Update

```bash
npm run docs:generate
```

---

## 📝 LƯU Ý

### Markdown Files

- Documentation được generate từ markdown files
- Nếu markdown file không tồn tại, section sẽ hiển thị "Content đang được cập nhật..."
- Mỗi section giới hạn ~10KB để tránh file quá lớn

### Customization

Để thêm/sửa sections, edit `scripts/utils/generate-complete-docs.js`:

```javascript
const SECTIONS = [
  {
    id: "new-section",
    title: "📝 New Section",
    icon: "📝",
    file: "NEW_GUIDE.md",
    description: "Description",
  },
  // ...
];
```

---

## ✅ CHECKLIST

- [x] Tạo HTML template
- [x] Tạo generator script
- [x] Tạo auto-update script
- [x] Thêm NPM scripts
- [x] Test generation
- [x] Test dark mode
- [x] Test responsive
- [x] Documentation

---

## 📊 KẾT QUẢ

- **File generated**: `docs.html`
- **Sections**: 10 sections
- **Source files**: 10 markdown files
- **Features**: Dark mode, Responsive, Auto-update

---

**Status**: ✅ Complete  
**Last Updated**: 2025-01-27
