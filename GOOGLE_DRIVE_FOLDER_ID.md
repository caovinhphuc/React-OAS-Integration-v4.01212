# 📁 Google Drive Folder ID Configuration

## ✅ Folder ID Đã Xác Nhận

**Folder URL**: https://drive.google.com/drive/folders/1OpCHA1Qnf3AHYZqzRjzeiMxODoAeV4_V

**Folder ID**: `1OpCHA1Qnf3AHYZqzRjzeiMxODoAeV4_V`

✅ Đây là folder ID hợp lệ từ Google Drive

## 📋 Cấu Hình

### Option 1: Set trong `.env` file (Recommended)

Thêm vào file `.env`:

```env
GOOGLE_DRIVE_FOLDER_ID=1OpCHA1Qnf3AHYZqzRjzeiMxODoAeV4_V
```

Hoặc:

```env
REACT_APP_GOOGLE_DRIVE_FOLDER_ID=1OpCHA1Qnf3AHYZqzRjzeiMxODoAeV4_V
```

### Option 2: Dùng query parameter

```bash
GET /api/drive/files?folderId=1OpCHA1Qnf3AHYZqzRjzeiMxODoAeV4_V
```

## 🔄 Logic Sử Dụng Folder ID

Backend sẽ sử dụng folder ID theo thứ tự ưu tiên:

1. **Query parameter** (`?folderId=xxx`) - Ưu tiên cao nhất
2. **Environment variable** (`GOOGLE_DRIVE_FOLDER_ID` hoặc `REACT_APP_GOOGLE_DRIVE_FOLDER_ID`)
3. **Fallback về Google Sheets ID** (nếu có)
4. **Root folder** (nếu không có gì)

## ✅ Sau Khi Cấu Hình

1. Restart backend server
2. Check logs: `✅ Google Drive API initialized`
3. Test endpoint:

```bash
# List files trong folder
curl http://localhost:3001/api/drive/files?folderId=1OpCHA1Qnf3AHYZqzRjzeiMxODoAeV4_V

# Hoặc nếu đã set trong .env (sẽ dùng default)
curl http://localhost:3001/api/drive/files
```

## 📝 Ghi Chú

- Folder ID này sẽ được sử dụng làm default folder khi list files
- Nếu không set, backend sẽ list files từ root folder
- Cần đảm bảo Service Account có quyền truy cập folder này
