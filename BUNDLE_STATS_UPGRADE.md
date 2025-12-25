# 🚀 Bundle Stats Script - Nâng Cấp

## ✅ Đã Thực Hiện

### 1. Nâng Cấp Script `generate-bundle-stats.js`

**File**: `scripts/generate-bundle-stats.js`

**Tính năng mới**:

- ✅ **Analyze Build Directory**: Phân tích JS và CSS files
- ✅ **Dependency Analysis**: Kiểm tra dependencies và kích thước
- ✅ **Optimization Recommendations**: Đề xuất cải thiện tự động
- ✅ **Export Stats to JSON**: Export kết quả ra file JSON
- ✅ **Check Dependencies**: Tự động kiểm tra và cài đặt dependencies cần thiết
- ✅ **Color-coded Output**: Hiển thị với màu sắc dễ đọc
- ✅ **Size Formatting**: Format kích thước file (B, KB, MB)
- ✅ **Large File Detection**: Phát hiện files lớn và cảnh báo

### 2. Bổ Sung Dependencies

**File**: `package.json`

```json
{
  "devDependencies": {
    "depcheck": "^1.4.7"
  }
}
```

**Dependencies đã có sẵn**:

- ✅ `source-map-explorer`: ^2.5.3
- ✅ `webpack-bundle-analyzer`: ^5.1.0
- ✅ `size-limit`: ^12.0.0 (via @size-limit packages)
- ✅ `depcheck`: ^1.4.7 (mới thêm)

### 3. Thêm Script Mới

**File**: `package.json`

```json
{
  "scripts": {
    "bundle:stats": "node scripts/generate-bundle-stats.js"
  }
}
```

## 📋 Tính Năng Chi Tiết

### Analyze Build Directory

- Phân tích tất cả JS files trong `build/static/js/`
- Phân tích tất cả CSS files trong `build/static/css/`
- Sắp xếp theo kích thước (lớn nhất trước)
- Hiển thị với màu sắc:
  - 🔴 Red: > 500KB
  - 🟡 Yellow: > 200KB
  - 🟢 Green: < 200KB

### Dependency Analysis

- Kiểm tra các dependencies lớn trong `package.json`
- Hiển thị kích thước ước tính
- Đề xuất alternatives/optimizations

**Known large libraries**:

- `antd`: ~2MB
- `@ant-design/icons`: ~500KB
- `googleapis`: ~500KB
- `recharts`: ~150KB
- etc.

### Optimization Recommendations

Tự động đề xuất cải thiện dựa trên:

- Bundle size lớn (>2MB)
- Chunks lớn (>500KB)
- Dependencies lớn (moment, lodash, etc.)
- Build optimization settings

### Export Stats

- Export stats ra `build-stats/bundle-stats-{timestamp}.json`
- Lưu latest stats vào `build-stats/bundle-stats-latest.json`
- Format: JSON với timestamp, bundle data, dependencies, recommendations

### Check Dependencies

Tự động kiểm tra và cài đặt:

- `source-map-explorer`
- `webpack-bundle-analyzer`
- `depcheck` (optional)
- `size-limit` (optional)

## 🚀 Cách Sử Dụng

### Basic Usage

```bash
# Chạy script
npm run bundle:stats

# Hoặc trực tiếp
node scripts/generate-bundle-stats.js
```

### Full Workflow

```bash
# 1. Build project
npm run build

# 2. Generate bundle stats
npm run bundle:stats

# 3. View exported stats
cat build-stats/bundle-stats-latest.json
```

## 📊 Output Example

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  📊 BUILD DIRECTORY ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 JavaScript Files:
   1. main.c55cda2b.js                                    692.31 KB
   2. 259.b7ee16e1.chunk.js                               354.36 KB
   ...

🎨 CSS Files:
   1. main.c972c33e.css                                    28.48 KB
   ...

📊 Total Bundle Size: 2.35 MB

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  📦 DEPENDENCY ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔍 Installed Large Dependencies:
  📦 antd                           ^5.29.3         ~2MB
     💡 Use tree-shaking, import specific components
  ...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  💡 OPTIMIZATION RECOMMENDATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Bundle Size: Large bundle size: 2.28 MB
   Action: Implement code splitting with React.lazy()
   Impact: High
   ...
```

## 📚 Related Scripts

```bash
npm run bundle:stats        # Generate bundle stats (new)
npm run perf:bundle         # Performance bundle analyzer
npm run analyze             # Visual bundle analyzer (source-map-explorer)
npm run perf:deps           # Check unused dependencies (depcheck)
npm run perf:size           # Size limit check
```

## 🔄 So Sánh với Script Cũ

### Script Cũ (`generate-bundle-stats.js` - trước đây)

- Chỉ hiển thị hướng dẫn
- Không phân tích thực tế
- Không export stats

### Script Mới (`generate-bundle-stats.js` - hiện tại)

- ✅ Phân tích build directory thực tế
- ✅ Phân tích dependencies
- ✅ Đề xuất optimizations
- ✅ Export stats to JSON
- ✅ Auto-check và install dependencies
- ✅ Color-coded output
- ✅ Detailed recommendations

## 📝 Notes

- Script yêu cầu build trước: `npm run build`
- Stats được export vào `build-stats/` directory
- Có thể so sánh stats giữa các builds bằng JSON files
- Dependencies sẽ tự động được cài đặt nếu thiếu (optional deps chỉ cảnh báo)

---

**Date**: December 25, 2025  
**Status**: ✅ **Upgraded**  
**Script**: `scripts/generate-bundle-stats.js`  
**Command**: `npm run bundle:stats`
