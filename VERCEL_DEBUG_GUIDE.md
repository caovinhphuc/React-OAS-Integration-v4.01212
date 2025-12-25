# 🔍 Vercel Build Debug Guide

## ❌ Vấn đề

Build local thành công nhưng fail trên Vercel:

```
Error: Command "npm run vercel-build" exited with 1
```

## 🔍 Debugging Steps

### 1. Xem Build Logs Chi Tiết trên Vercel

1. Vào Vercel Dashboard: https://vercel.com
2. Chọn project → Deployments
3. Click vào deployment failed
4. Xem "Build Logs" để tìm lỗi cụ thể

### 2. Test Build Command Locally

```bash
# Test với cùng settings như Vercel
GENERATE_SOURCEMAP=false CI=false npm run vercel-build

# Hoặc test trực tiếp
GENERATE_SOURCEMAP=false CI=false react-scripts build
```

### 3. Common Issues & Solutions

#### Issue 1: ESLint Warnings/Errors

**Symptoms**: Build fails với ESLint errors

**Solution**:

```json
// package.json
"eslintConfig": {
  "extends": "react-app",
  "rules": {
    "no-unused-vars": "warn"
  }
}
```

Hoặc disable ESLint trong build:

```bash
DISABLE_ESLINT_PLUGIN=true npm run vercel-build
```

#### Issue 2: TypeScript Errors

**Symptoms**: Build fails với TypeScript errors

**Solution**:

- Fix TypeScript errors
- Hoặc tạm thời disable: `SKIP_TYPE_CHECK=true`

#### Issue 3: Missing Dependencies

**Symptoms**: Module not found errors

**Solution**:

```bash
# Đảm bảo package-lock.json được commit
git add package-lock.json
git commit -m "Add package-lock.json"
git push
```

#### Issue 4: Memory/Timeout Issues

**Symptoms**: Build timeout hoặc out of memory

**Solution**:

- Optimize bundle size
- Split code better
- Hoặc tăng memory limit trong Vercel settings

#### Issue 5: Environment Variables

**Symptoms**: Build fails vì thiếu env vars

**Solution**:

- Thêm env vars trong Vercel Dashboard
- Settings → Environment Variables
- Add các variables cần thiết

### 4. Alternative Build Configuration

Nếu vẫn fail, thử cách này:

#### Option 1: Direct react-scripts build

```json
{
  "scripts": {
    "vercel-build": "GENERATE_SOURCEMAP=false CI=false react-scripts build"
  }
}
```

#### Option 2: Ignore ESLint

```json
{
  "scripts": {
    "vercel-build": "DISABLE_ESLINT_PLUGIN=true GENERATE_SOURCEMAP=false CI=false react-scripts build"
  }
}
```

#### Option 3: Ignore TypeScript

```json
{
  "scripts": {
    "vercel-build": "SKIP_TYPE_CHECK=true GENERATE_SOURCEMAP=false CI=false react-scripts build"
  }
}
```

#### Option 4: Full Build với warnings

```json
{
  "scripts": {
    "vercel-build": "CI=false GENERATE_SOURCEMAP=false npm run build || exit 0"
  }
}
```

⚠️ **Không nên dùng** Option 4 trừ khi thực sự cần thiết.

### 5. Vercel Configuration

#### Minimal vercel.json

```json
{
  "version": 2,
  "buildCommand": "npm run vercel-build",
  "outputDirectory": "build",
  "installCommand": "npm install"
}
```

#### With Framework Detection

```json
{
  "version": 2,
  "buildCommand": "npm run vercel-build",
  "outputDirectory": "build",
  "framework": "create-react-app",
  "installCommand": "npm install"
}
```

**Lưu ý**: `framework: null` có thể tốt hơn nếu Vercel auto-detection gây vấn đề.

### 6. Check Vercel Build Settings

Trong Vercel Dashboard:

1. **Settings → General**:

   - Build Command: `npm run vercel-build`
   - Output Directory: `build`
   - Install Command: `npm install`
   - Framework Preset: Other

2. **Settings → Environment Variables**:

   - Đảm bảo tất cả env vars cần thiết đã được set
   - Kiểm tra Production, Preview, Development environments

3. **Settings → Build & Development Settings**:
   - Node.js Version: 18.x hoặc 20.x
   - Build Command: `npm run vercel-build`
   - Output Directory: `build`

### 7. Testing Locally với Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Test build locally
vercel build

# Xem logs
vercel logs
```

### 8. Common Error Messages & Solutions

#### "Module not found"

**Fix**:

- Kiểm tra imports
- Đảm bảo dependencies đã install
- Check package.json có đúng dependencies

#### "Cannot find module 'xxx'"

**Fix**:

```bash
npm install --legacy-peer-deps
git add package-lock.json
git commit -m "Update package-lock.json"
```

#### "Process exited with code 1"

**Fix**:

- Xem logs chi tiết
- Thường là ESLint hoặc TypeScript errors
- Thử disable tạm thời để debug

#### "Build timeout"

**Fix**:

- Optimize build process
- Split code better
- Remove unused dependencies
- Increase timeout trong Vercel settings (nếu có)

## 📝 Current Configuration

### package.json

```json
{
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=8.0.0"
  },
  "scripts": {
    "vercel-build": "GENERATE_SOURCEMAP=false CI=false react-scripts build"
  }
}
```

### vercel.json

```json
{
  "version": 2,
  "buildCommand": "npm run vercel-build",
  "outputDirectory": "build",
  "framework": null,
  "installCommand": "npm install"
}
```

## 🔄 Next Steps

1. ✅ Check Vercel build logs để xem lỗi cụ thể
2. ✅ Test build command locally
3. ✅ Verify dependencies và package-lock.json
4. ✅ Check environment variables
5. ✅ Try alternative build configurations nếu cần

---

**Date**: December 25, 2025  
**Status**: 🔍 **Debugging**  
**Action Required**: Check Vercel build logs for specific error
