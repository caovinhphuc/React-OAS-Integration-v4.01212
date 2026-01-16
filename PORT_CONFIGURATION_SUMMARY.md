# 🔌 Tóm Tắt Port Configuration

## ✅ Ports Được Xác Nhận (Theo Code Thực Tế)

| Port     | Service                       | File/Config                                     | Status                                             |
| -------- | ----------------------------- | ----------------------------------------------- | -------------------------------------------------- |
| **3000** | Frontend (React)              | `start_dev_servers.sh`, `package.json`          | ✅ **REQUIRED**                                    |
| **3001** | Backend (Node.js + WebSocket) | `backend/src/server.js`, `start_dev_servers.sh` | ✅ **REQUIRED**                                    |
| **8001** | Automation Service (FastAPI)  | `start_dev_servers.sh` (line 216)               | ⚠️ **OPTIONAL**                                    |
| **8000** | AI Service (FastAPI)          | `package.json` (line 26)                        | ⚠️ **OPTIONAL** (Không trong start_dev_servers.sh) |

## ❌ Ports Đã Loại Bỏ (Legacy/Không Dùng)

| Port     | Service                     | Lý Do                                            |
| -------- | --------------------------- | ------------------------------------------------ |
| **5000** | Flask API Server            | Legacy service, không trong start_dev_servers.sh |
| **5001** | Flask Auth API Server       | Legacy service, không trong start_dev_servers.sh |
| **3002** | Standalone WebSocket Server | WebSocket đã tích hợp trong Backend (3001)       |
| **3003** | Không xác định              | Không tìm thấy trong code                        |

## 📋 Chi Tiết

### 1. Frontend - Port 3000 ✅

```bash
# Start command
npm start  # hoặc react-scripts start
```

- **File**: `start_dev_servers.sh`, `package.json`
- **Status**: Required, chạy trong start_dev_servers.sh

### 2. Backend - Port 3001 ✅

```bash
# Start command
cd backend && npm start
```

- **File**: `backend/src/server.js` (line 18: `PORT = process.env.PORT || 3001`)
- **WebSocket**: Tích hợp trong backend (socket.io), không cần port riêng
- **Status**: Required, chạy trong start_dev_servers.sh

### 3. Automation Service - Port 8001 ⚠️

```bash
# Start command (trong start_dev_servers.sh)
cd one_automation_system && python -m uvicorn main:app --host 0.0.0.0 --port 8001
```

- **File**: `start_dev_servers.sh` (line 216)
- **Status**: Optional, cho Google Sheets integration

### 4. AI Service - Port 8000 ⚠️

```bash
# Start command (trong package.json nhưng không trong start_dev_servers.sh)
cd ai-service && python -m uvicorn main_simple:app --host 0.0.0.0 --port 8000 --reload
```

- **File**: `package.json` (line 26)
- **Status**: Optional, có trong package.json nhưng **KHÔNG** trong start_dev_servers.sh
- **Ghi chú**: Có thể là service cũ hoặc được start thủ công

## 🔧 Script Đã Cập Nhật

### `clean-restart.sh`

- ✅ Đã cập nhật để chỉ kill các ports: **3000, 3001, 8000, 8001**
- ❌ Đã loại bỏ: 5000, 5001, 3002, 3003

## 📝 Khuyến Nghị

### Để Thống Nhất Port Configuration:

1. **Xác nhận AI Service (8000)**:
   - Nếu vẫn dùng: Thêm vào `start_dev_servers.sh`
   - Nếu không dùng: Remove khỏi `package.json` hoặc comment out

2. **Fix WebSocket Config** (nếu cần):
   - `src/utils/websocket.js`: Đang dùng port 3002 → nên đổi về 3001
   - `src/setupProxy.js`: Đang dùng port 3002 → nên đổi về 3001
   - `backend/ws-server.js`: File legacy, có thể remove nếu không dùng

3. **Cleanup Legacy Services**:
   - `automation/api/api_server.py` (port 5000): Document hoặc remove
   - `automation/api/auth_api_server.py` (port 5001): Document hoặc remove

## 🚀 Sử Dụng clean-restart.sh

```bash
# Kill ports và clear cache
bash clean-restart.sh

# Chọn option để restart services:
# 1. Start all (Frontend + Backend + Automation)
# 2. Frontend only
# 3. Backend only
# 4. AI Service only (nếu cần)
# 5. Skip (manual start)
```

## 📄 Tài Liệu Tham Khảo

- `PORT_ANALYSIS.md` - Phân tích chi tiết tất cả ports
- `PORT_CLARIFICATION.md` - Clarification về port configuration
- `start_dev_servers.sh` - Script start services chính
