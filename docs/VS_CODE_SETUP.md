# Hướng dẫn cài đặt VS Code và terminal cho dự án

Tài liệu này giúp bạn cài đặt VS Code, thiết lập terminal và thư viện cần thiết để làm việc hiệu quả với dự án React/Node/FastAPI/Automation trong repo.

## 1) Cài đặt VS Code (giao diện tiếng Việt)
### Cách cài đặt nhanh (tùy hệ điều hành)
- **Ubuntu/Debian**: 
  ```bash
  wget -O vscode.deb https://code.visualstudio.com/sha/download?build=stable\&os=linux-deb-x64
  sudo apt install ./vscode.deb
  ```
- **macOS**: `brew install --cask visual-studio-code`
- **Windows**: tải file `.exe` tại <https://code.visualstudio.com/> và cài đặt như ứng dụng thông thường.

### Bật giao diện & font tiếng Việt
- Mở VS Code → `Extensions` → cài **Language Pack – Vietnamese**.
- Font gợi ý hỗ trợ tiếng Việt + ligatures: **Fira Code**, **JetBrains Mono** (cài ở OS rồi chọn trong VS Code: `Settings → Font Family`).
- Khuyến nghị bật **Settings Sync** để đồng bộ cấu hình giữa các máy (nếu dùng nhiều môi trường).

## 2) Extension cần có
- **ESLint** và **Prettier** cho JS/TS.
- **Tailwind CSS IntelliSense** (nếu bạn dùng Tailwind trong UI).
- **GitLens** để theo dõi history/ blame.
- **Docker** nếu cần làm việc với các script deploy.
- **Python** (kèm Pylance/Ruff) cho thư mục `ai-service/` và `automation/`.
- **Thunder Client** hoặc **REST Client** để test API nhanh.

**Bước tiếp theo sau khi cài VS Code**: mở `View → Command Palette → Shell Command: Install 'code' command in PATH` để chạy VS Code từ terminal (`code .`).

## 3) Cấu trúc workspace VS Code đề xuất
Tạo file `ai-platform.code-workspace` tại **root** với nội dung mẫu:

```json
{
  "folders": [
    { "path": "." },
    { "path": "backend" },
    { "path": "ai-service" },
    { "path": "automation" }
  ],
  "settings": {}
}
```

- Mở workspace này sẽ giúp IntelliSense và linting áp dụng đúng từng stack.
- Mặc định mở root (`.`) để VS Code nhận ra file `.env`, scripts dùng chung và cho phép chạy `./start_ai_platform.sh` từ terminal tích hợp.
- Mỗi thư mục có thể chọn interpreter riêng: Node 18+ cho JS/TS, `./ai-service/venv` hoặc `./automation/venv` cho Python.

## 4) Thiết lập `.vscode/settings.json`
Tạo/thêm file `.vscode/settings.json` tại root để thống nhất format và code actions:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "files.eol": "\n",
  "[python]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "ms-python.black-formatter"
  }
}
```

- Bạn có thể thêm `"python.analysis.typeCheckingMode": "basic"` nếu muốn bật kiểm tra kiểu nhẹ cho Python.

## 5) Thiết lập terminal & thư viện
- **Node.js**: cài bản **18+** (đồng bộ với `package.json`). Kiểm tra nhanh: `node -v`.
- **Python**: bản **3.9+**. Tạo virtualenv riêng cho từng service:
  - `cd ai-service && python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt`
  - `cd automation && python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt`
- **Quản lý terminal**: mở một terminal cho từng service để log tách biệt.

**Tối ưu đường dẫn**: giữ repo ở đường dẫn ngắn, không dấu cách, ví dụ `/workspace/React-OAS-Integration-v4.0` hoặc `~/Projects/ai-platform` để tránh lỗi khi chạy script shell.

## 6) Lệnh chạy nhanh trong VS Code
- Frontend (root): `npm install && npm start` (cổng 8080).
- Backend: `cd backend && npm install && npm start` (cổng 3001).
- AI Service: `cd ai-service && source venv/bin/activate && uvicorn ai_service:app --host 0.0.0.0 --port 8000 --reload`.
- Automation: `cd automation && source venv/bin/activate && python automation.py`.
- Khởi chạy toàn bộ: từ root chạy `./start_ai_platform.sh`.

### Tasks/launch gợi ý
Thêm vào `.vscode/tasks.json` để chạy nhanh từ VS Code (`Terminal → Run Task`):

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "start:frontend",
      "type": "shell",
      "command": "npm start",
      "options": { "cwd": "${workspaceFolder}" }
    },
    {
      "label": "start:backend",
      "type": "shell",
      "command": "npm start",
      "options": { "cwd": "${workspaceFolder}/backend" }
    },
    {
      "label": "start:ai-service",
      "type": "shell",
      "command": "source venv/bin/activate && uvicorn ai_service:app --host 0.0.0.0 --port 8000 --reload",
      "options": { "cwd": "${workspaceFolder}/ai-service" }
    }
  ]
}
```

- Với `launch.json`, bạn có thể tạo cấu hình attach Node (port 9229) và attach Python (ptvsd/debugpy) nếu cần debug.

**Sau bước này**: chạy `npm install` tại root để VS Code tải dependencies (cần cho ESLint/TypeScript), sau đó `Terminal → Run Task → start:frontend` để kiểm tra VS Code đã nhận workspace đúng chưa.

## 7) Mẹo tối ưu đường dẫn & môi trường
- Lưu `.env` ở root để chia sẻ biến chung; với bí mật, dùng `.env.local` trong từng service.
- Khóa private Google Service Account nên đặt trong `config/service_account.json` (đã được gitignore).
- Đặt cache/node_modules riêng từng service để tránh xung đột: `npm install` tại root chỉ cho frontend, backend cài riêng trong `backend/`.
- Bật `files.exclude` trong VS Code để ẩn `node_modules`, `venv`, và các log lớn giúp Explorer gọn gàng.

## 8) Checklist cài mới (tóm tắt)
1. Cài VS Code theo OS ở bước 1, mở và bật `code` trong PATH.
2. Cài Language Pack – Vietnamese + font Fira Code/JetBrains Mono.
3. Cài extensions: ESLint, Prettier, Python (Pylance/Ruff), GitLens, Docker, Thunder Client, Tailwind CSS IntelliSense.
4. Tạo `ai-platform.code-workspace`, copy `settings.json` ở bước 4 vào `.vscode/settings.json`.
5. Tạo `venv` cho `ai-service` và `automation`, chạy `npm install` ở root và `backend/`.
6. Dùng Tasks (`start:frontend`, `start:backend`, `start:ai-service`) hoặc `./start_ai_platform.sh` để khởi động.
