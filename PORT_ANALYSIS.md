# 🔌 Phân Tích Port Configuration

## 📋 Ports Đang Được Sử Dụng (Từ Code Thực Tế)

### ✅ Ports Chính (Required Services)

| Port     | Service           | File/Source                                    | Status      |
| -------- | ----------------- | ---------------------------------------------- | ----------- |
| **3000** | Frontend (React)  | `start_dev_servers.sh`, `package.json`         | ✅ Required |
| **3001** | Backend (Node.js) | `start_dev_servers.sh`, `package.json`, `.env` | ✅ Required |

### ⚠️ Ports Optional/Legacy

| Port     | Service                             | File/Source                                                                                | Status       | Ghi Chú                                                           |
| -------- | ----------------------------------- | ------------------------------------------------------------------------------------------ | ------------ | ----------------------------------------------------------------- |
| **8000** | AI Service (Python FastAPI)         | `package.json`, `automation/ai_service.py`, `automation/automation_bridge.py`, `README.md` | ⚠️ Optional? | Có trong package.json nhưng không thấy trong start_dev_servers.sh |
| **8001** | Automation Service (Python FastAPI) | `start_dev_servers.sh` (line 216), `automation/automation_dashboard.py`                    | ⚠️ Optional  | Được start trong start_dev_servers.sh                             |
| **3002** | WebSocket/Backend Proxy             | `src/utils/websocket.js`, `src/setupProxy.js`                                              | ❓ Unclear   | Có thể là cấu hình cũ                                             |
| **5000** | API Server (Flask)                  | `automation/api/api_server.py`                                                             | ❓ Legacy?   | Flask app, có thể không dùng nữa                                  |
| **5001** | Auth API Server (Flask)             | `automation/api/auth_api_server.py`                                                        | ❓ Legacy?   | Changed from 5000 to avoid AirPlay conflict                       |

## 🔍 Phân Tích Chi Tiết

### 1. Frontend (Port 3000) ✅

- **File**: `start_dev_servers.sh`, `package.json`
- **Command**: `npm start` (React scripts)
- **Status**: ✅ Required, đang được sử dụng

### 2. Backend (Port 3001) ✅

- **File**: `start_dev_servers.sh`, `package.json`, `.env`
- **Command**: `cd backend && npm start`
- **Status**: ✅ Required, đang được sử dụng

### 3. AI Service (Port 8000) ⚠️

- **Files**:
  - `package.json` (line 26): `"ai-service": "cd ai-service && python -m uvicorn main_simple:app --host 0.0.0.0 --port 8000 --reload"`
  - `automation/ai_service.py` (line 61): `uvicorn.run(app, host="0.0.0.0", port=8000)`
  - `automation/automation_bridge.py` (line 92): `uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")`
  - `README.md`: `AI_SERVICE_PORT=8000`
- **Status**: ⚠️ **Mâu thuẫn**: Có trong package.json và README nhưng **KHÔNG có trong start_dev_servers.sh**
- **Ghi chú**: Có thể là service cũ hoặc được start thủ công

### 4. Automation Service (Port 8001) ⚠️

- **Files**:
  - `start_dev_servers.sh` (line 216): `python -m uvicorn main:app --host 0.0.0.0 --port 8001`
  - `automation/automation_dashboard.py` (line 224): `default=8001`
- **Status**: ⚠️ Optional, được start trong start_dev_servers.sh
- **Ghi chú**: Đây là service được dùng cho Google Sheets integration

### 5. WebSocket/Proxy (Port 3002) ❓

- **Files**:
  - `src/utils/websocket.js`: `ws://localhost:3002/ws`
  - `src/setupProxy.js`: `target: "http://localhost:3002"`
- **Status**: ❓ **Có vẻ không đúng** - Backend chạy trên 3001, không phải 3002
- **Ghi chú**: Có thể là cấu hình cũ cần update

### 6. API Server (Port 5000) ❓

- **File**: `automation/api/api_server.py` (line 234): `app.run(debug=True, port=5000)`
- **Status**: ❓ Legacy Flask app, có thể không được dùng trong start_dev_servers.sh
- **Ghi chú**: Có thể là service cũ

### 7. Auth API Server (Port 5001) ❓

- **File**: `automation/api/auth_api_server.py` (line 290): `port=5001`
- **Status**: ❓ Legacy Flask app, có comment "Changed from 5000 to avoid AirPlay conflict"
- **Ghi chú**: Có thể là service cũ

## 🎯 Kết Luận và Khuyến Nghị

### Ports Nên Giữ (Theo start_dev_servers.sh):

1. ✅ **Port 3000** - Frontend (React)
2. ✅ **Port 3001** - Backend (Node.js)
3. ⚠️ **Port 8001** - Automation Service (FastAPI) - Optional

### Ports Cần Làm Rõ:

1. ❓ **Port 8000** - AI Service:
   - Có trong package.json nhưng không trong start_dev_servers.sh
   - Có trong README.md
   - **Câu hỏi**: Có phải service này vẫn được dùng không? Hay chỉ là legacy?

2. ❓ **Port 3002** - WebSocket/Proxy:
   - Cấu hình trong src/ nhưng backend chạy trên 3001
   - **Cần fix**: Update src/utils/websocket.js và src/setupProxy.js để dùng port 3001

3. ❓ **Port 5000/5001** - Flask APIs:
   - Có vẻ là legacy services
   - **Câu hỏi**: Có còn được dùng không? Nếu không thì nên remove hoặc document

## 📝 Đề Xuất

### Option 1: Theo start_dev_servers.sh (Khuyến nghị)

```
Port 3000 - Frontend (React)              ✅ REQUIRED
Port 3001 - Backend (Node.js)             ✅ REQUIRED
Port 8001 - Automation Service (FastAPI)  ⚠️ OPTIONAL
```

- Remove hoặc comment out AI Service (8000) nếu không dùng
- Fix WebSocket/Proxy config từ 3002 → 3001
- Remove hoặc document legacy Flask services (5000/5001)

### Option 2: Theo package.json

```
Port 3000 - Frontend (React)              ✅ REQUIRED
Port 3001 - Backend (Node.js)             ✅ REQUIRED
Port 8000 - AI Service (FastAPI)          ⚠️ OPTIONAL
Port 8001 - Automation Service (FastAPI)  ⚠️ OPTIONAL
```

- Cần thêm AI Service vào start_dev_servers.sh
- Fix WebSocket/Proxy config từ 3002 → 3001
- Remove hoặc document legacy Flask services (5000/5001)
