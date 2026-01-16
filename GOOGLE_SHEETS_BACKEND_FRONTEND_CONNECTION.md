# 🔗 Kết Nối Backend-Frontend Google Sheets

## ✅ Có, Backend Node.js kết nối Google Sheets với Frontend

## 📊 Kiến Trúc

```
Frontend (React)
    ↓ (HTTP API calls)
Backend Node.js (Express)
    ↓ (Google Sheets API)
Google Sheets API
```

## 🔌 Backend Endpoints

**File**: `backend/src/server.js`

### 1. GET `/api/sheets/metadata/:sheetId?`

- Lấy metadata của spreadsheet (danh sách sheets, properties)
- Sử dụng Google Sheets API để lấy thông tin thật
- Fallback về mock data nếu API không khả dụng

### 2. GET `/api/sheets/read`

- Đọc dữ liệu từ sheet
- Parameters: `range`, `sheetId`
- Sử dụng Google Sheets API để đọc data thật
- Fallback về mock data nếu API không khả dụng

### 3. POST `/api/sheets/add-sheet`

- Tạo sheet mới (hiện tại là mock)

### 4. POST `/api/sheets/write`

- Ghi dữ liệu vào sheet (hiện tại là mock)

### 5. DELETE `/api/sheets/clear`

- Xóa dữ liệu trong sheet (hiện tại là mock)

## 🎨 Frontend Service

**File**: `src/services/googleSheetsApi.js`

Service wrapper gọi các backend endpoints:

```javascript
class GoogleSheetsApiService {
  async getSheetMetadata(sheetId) {
    // GET /api/sheets/metadata/:sheetId?
  }

  async readSheet(range, sheetId) {
    // GET /api/sheets/read?range=...&sheetId=...
  }

  async addSheet(sheetName, sheetId) {
    // POST /api/sheets/add-sheet
  }

  async writeSheet(data, range, sheetId) {
    // POST /api/sheets/write
  }
}
```

## 🖼️ Frontend Component

**File**: `src/components/google/GoogleSheetsIntegration.jsx`

Component sử dụng `googleSheetsApiService` để:

- Lấy danh sách sheets (`getSheetMetadata()`)
- Đọc dữ liệu từ sheet (`readSheet()`)
- Hiển thị data trong bảng

## ⚙️ Backend Google Sheets Setup

**File**: `backend/src/server.js`

### Authentication

- Sử dụng `googleapis` library
- Service Account credentials từ file JSON
- Lazy initialization với `initGoogleSheets()`

### Credentials Paths (tự động tìm):

1. `GOOGLE_APPLICATION_CREDENTIALS` (env var)
2. `GOOGLE_SERVICE_ACCOUNT_KEY_PATH` (env var)
3. `mia-logistics-469406-eec521c603c0.json` (root)
4. `config/service_account.json`
5. `automation/config/service_account.json`

### Default Spreadsheet ID

- `GOOGLE_SHEETS_SPREADSHEET_ID` (env var)
- `REACT_APP_GOOGLE_SHEETS_SPREADSHEET_ID` (env var)
- Default: `18B1PIhCDmBWyHZytvOcfj_1QbYBwczLf1x1Qbu0E5As`

## 📋 Flow Hoạt Động

1. **Frontend** → Gọi `googleSheetsApiService.getSheetMetadata()`
2. **Service** → HTTP GET `/api/sheets/metadata`
3. **Backend** → Gọi `initGoogleSheets()` (lazy load)
4. **Backend** → Gọi Google Sheets API `sheets.spreadsheets.get()`
5. **Backend** → Trả về JSON response
6. **Frontend** → Hiển thị danh sách sheets

## ✅ Trạng Thái Hiện Tại

### Hoạt Động:

- ✅ Backend có endpoints Google Sheets
- ✅ Backend tích hợp Google Sheets API
- ✅ Frontend có service wrapper
- ✅ Frontend component sử dụng service
- ✅ Kết nối Backend ↔ Frontend

### Đã Cải Thiện:

- ✅ Backend sử dụng real Google Sheets API (thay vì mock)
- ✅ Fallback về mock data nếu API không khả dụng
- ✅ Lazy initialization để tối ưu performance

## 🔧 Configuration

### Backend (.env hoặc environment variables):

```bash
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service_account.json
GOOGLE_SHEETS_SPREADSHEET_ID=18B1PIhCDmBWyHZytvOcfj_1QbYBwczLf1x1Qbu0E5As
```

### Frontend (optional, nếu cần):

```bash
REACT_APP_GOOGLE_SHEETS_SPREADSHEET_ID=18B1PIhCDmBWyHZytvOcfj_1QbYBwczLf1x1Qbu0E5As
```

## 💡 Lưu Ý

1. **Backend phải có credentials file** để kết nối Google Sheets API
2. **Nếu không có credentials**, backend sẽ fallback về mock data
3. **Frontend chỉ gọi backend**, không trực tiếp gọi Google Sheets API
4. **Backend là proxy** giữa Frontend và Google Sheets API

## 📝 Kết Luận

**Có, Backend Node.js đã kết nối Google Sheets với Frontend thông qua REST API.**

- Frontend → Backend (HTTP API)
- Backend → Google Sheets API (googleapis)
- Data flow: Frontend → Backend → Google Sheets → Backend → Frontend
