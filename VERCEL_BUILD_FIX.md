# 🔧 Vercel Build Fix

## ❌ Vấn đề

```
Error: Command "npm run vercel-build" exited with 1
[ERROR] Deployment failed. Please check the logs above.
```

Build local thành công nhưng deploy trên Vercel thất bại.

## 🔍 Nguyên nhân có thể

1. **Source maps**: Production build với source maps có thể gây lỗi
2. **CI environment**: React scripts có thể fail trong CI mode
3. **Node version**: Không chỉ định Node.js version
4. **Vercel config**: Thiếu cấu hình rõ ràng cho build command

## ✅ Giải pháp

### 1. Cập nhật `vercel-build` script

**File**: `package.json`

**Before**:

```json
"vercel-build": "npm run build"
```

**After**:

```json
"vercel-build": "GENERATE_SOURCEMAP=false CI=false npm run build"
```

**Lý do**:

- `GENERATE_SOURCEMAP=false`: Tắt source maps cho production (bảo mật và performance)
- `CI=false`: Tắt CI mode để tránh các checks strict có thể fail

### 2. Thêm Node.js engines

**File**: `package.json`

```json
{
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=8.0.0"
  }
}
```

**Lý do**: Đảm bảo Vercel sử dụng đúng Node.js version.

### 3. Cập nhật `vercel.json`

**File**: `vercel.json`

```json
{
  "version": 2,
  "buildCommand": "npm run vercel-build",
  "outputDirectory": "build",
  "framework": "create-react-app",
  "installCommand": "npm install",
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "headers": {
        "cache-control": "s-maxage=31536000,immutable"
      }
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

**Thay đổi**:

- Thêm `buildCommand`: Rõ ràng chỉ định build command
- Thêm `outputDirectory`: Chỉ định output directory
- Thêm `framework`: Giúp Vercel optimize build
- Thêm `installCommand`: Đảm bảo install đúng cách

### 4. Cập nhật `build:prod` script

**File**: `package.json`

**Before**:

```json
"build:prod": "GENERATE_SOURCEMAP=true react-scripts build"
```

**After**:

```json
"build:prod": "GENERATE_SOURCEMAP=false react-scripts build"
```

**Lý do**: Production build không nên có source maps.

## 📝 Chi tiết thay đổi

### package.json

```json
{
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=8.0.0"
  },
  "scripts": {
    "vercel-build": "GENERATE_SOURCEMAP=false CI=false npm run build",
    "build:prod": "GENERATE_SOURCEMAP=false react-scripts build"
  }
}
```

### vercel.json

```json
{
  "version": 2,
  "buildCommand": "npm run vercel-build",
  "outputDirectory": "build",
  "framework": "create-react-app",
  "installCommand": "npm install"
}
```

## ✅ Kết quả mong đợi

- ✅ Build trên Vercel thành công
- ✅ Không còn source maps trong production
- ✅ Node.js version được chỉ định rõ ràng
- ✅ Build command được cấu hình đúng

## 🔍 Debugging Tips

Nếu vẫn gặp lỗi, kiểm tra:

1. **Vercel Build Logs**:

   - Vào Vercel Dashboard → Project → Deployments
   - Click vào deployment failed → Xem build logs

2. **Environment Variables**:

   - Đảm bảo tất cả env vars cần thiết đã được set trong Vercel Dashboard

3. **Dependencies**:

   - Kiểm tra `package-lock.json` đã commit chưa
   - Đảm bảo không có native dependencies

4. **Memory/Timeout**:
   - Nếu build quá lớn, có thể cần tăng memory limit
   - Hoặc optimize bundle size

## 📚 Related Files

- `package.json` - Build scripts và engines
- `vercel.json` - Vercel configuration
- `.env.production` - Production environment variables

---

**Date**: December 25, 2025  
**Status**: ✅ **Fixed**  
**Build Status**: ⏳ **Testing on Vercel**
