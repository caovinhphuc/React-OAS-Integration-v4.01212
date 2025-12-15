# 🚀 Hướng dẫn Cài đặt Cấu trúc Dự án và IDE

## 📁 Cấu trúc Thư mục Dự án

Dự án `React-OAS-Integration-v4.0` đã được cấu hình với cấu trúc tối ưu cho Mac:

```
React-OAS-Integration-v4.0/
├── .vscode/              # Cấu hình VS Code
│   ├── settings.json
│   └── extensions.json
├── .cursor/              # Cấu hình Cursor
│   ├── settings.json
│   └── extensions.json
├── .editorconfig        # Cấu hình editor chung
├── automation/          # Python automation scripts
├── ai-service/          # AI service
├── backend/            # Backend Node.js
├── frontend/           # React frontend
└── one_automation_system/  # Automation system
```

## 🛠️ Cài đặt VS Code

### 1. Mở Workspace

```bash
# Mở workspace file
code React-OAS-Integration-v4.0.code-workspace

# Hoặc mở trực tiếp thư mục
code React-OAS-Integration-v4.0
```

### 2. Cài đặt Extensions

VS Code sẽ tự động đề xuất các extensions cần thiết. Hoặc cài thủ công:

```bash
# Cài tất cả extensions được đề xuất
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
code --install-extension eamodio.gitlens
code --install-extension ms-python.python
# ... và các extensions khác
```

### 3. Cấu hình Terminal (Mac)

Terminal đã được cấu hình để sử dụng `zsh` mặc định trên Mac.

## 🎯 Cài đặt Cursor

### 1. Mở Dự án trong Cursor

```bash
# Mở workspace
cursor React-OAS-Integration-v4.0.code-workspace

# Hoặc mở trực tiếp
cursor React-OAS-Integration-v4.0
```

### 2. Cấu hình AI Features

Cursor sẽ tự động sử dụng các cấu hình từ `.cursor/settings.json`.

## ⚙️ Cấu hình Đã Thiết lập

### Editor Settings

- ✅ Format on Save
- ✅ Auto-fix ESLint errors
- ✅ Organize imports automatically
- ✅ Tab size: 2 spaces (JS/TS), 4 spaces (Python)
- ✅ Font: SF Mono (Mac optimized)

### File Exclusions

Các thư mục sau đã được loại trừ khỏi file explorer:

- `node_modules/`
- `__pycache__/`
- `.venv/`, `venv/`
- `dist/`, `build/`
- `.vercel/`
- `lighthouse-reports/`

### Search Exclusions

Tìm kiếm sẽ bỏ qua các thư mục không cần thiết để tăng tốc độ.

### Python Settings

- Interpreter: `python3`
- Formatter: `black`
- Linter: `flake8`
- Extra paths: `automation/`, `ai-service/`, `one_automation_system/`

## 🔧 Keyboard Shortcuts (Mac)

| Phím tắt           | Chức năng             |
| ------------------ | --------------------- |
| `Cmd + P`          | Quick Open File       |
| `Cmd + Shift + P`  | Command Palette       |
| `Cmd + B`          | Toggle Sidebar        |
| `Cmd + J`          | Toggle Panel          |
| `Cmd + \``         | Toggle Terminal       |
| `Cmd + K, Cmd + W` | Close All Editors     |
| `Alt + Cmd + ←/→`  | Navigate Back/Forward |

## 📝 Code Formatting

### Prettier

- Single quotes
- No semicolons
- Trailing commas
- Print width: 100
- Line endings: LF

### ESLint

- React hooks rules
- Import ordering
- TypeScript support

### EditorConfig

- UTF-8 encoding
- LF line endings
- 2 spaces (JS/TS/JSON)
- 4 spaces (Python)

## 🚀 Sử dụng Workspace File

File `React-OAS-Integration-v4.0.code-workspace` cho phép mở nhiều thư mục cùng lúc:

1. **React-OAS-Integration-v4.0** - Dự án chính
2. **Frontend Projects** - Các dự án frontend
3. **Fullstack Projects** - Các dự án fullstack

Mở workspace:

```bash
code React-OAS-Integration-v4.0.code-workspace
# hoặc
cursor React-OAS-Integration-v4.0.code-workspace
```

## ✅ Kiểm tra Cài đặt

1. Mở VS Code/Cursor
2. Kiểm tra extensions đã cài đặt
3. Mở một file và thử format (Shift + Option + F)
4. Kiểm tra terminal sử dụng zsh

## 🐛 Troubleshooting

### Terminal không dùng zsh

```bash
# Kiểm tra shell hiện tại
echo $SHELL

# Đổi sang zsh (nếu cần)
chsh -s /bin/zsh
```

### Extensions không tự động cài

Mở Command Palette (`Cmd + Shift + P`) và chọn:

- "Extensions: Show Recommended Extensions"
- Cài đặt thủ công các extensions được đề xuất

### Python không nhận diện

```bash
# Kiểm tra Python path
which python3

# Cài đặt Python extension
code --install-extension ms-python.python
```

## 📚 Tài liệu Tham khảo

- [VS Code Settings](https://code.visualstudio.com/docs/getstarted/settings)
- [Cursor Documentation](https://cursor.sh/docs)
- [EditorConfig](https://editorconfig.org/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)

---

✨ **Cấu hình hoàn tất!** Bạn có thể bắt đầu làm việc với dự án.
