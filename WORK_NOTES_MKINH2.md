# Ghi chú làm việc với mkinh2

> Ngày: 2026-01-18

---

## Trạng thái dự án

- React frontend dùng `react-scripts` 5.0.1 (xem [package.json](package.json)).
- Thư mục build chỉ xuất hiện sau khi chạy build production. Trong chế độ dev (`npm start`), CRA phục vụ bundle từ memory, nên không có `build/`.

## Scripts phân tích bundle

- `analyze`: chạy Source Map Explorer cho `main.*.js` sau build.
- `analyze:maps`: build với sourcemaps rồi phân tích `main.*.js`.
- `analyze:maps:only`: build với sourcemaps rồi phân tích tất cả file JS trong `build/static/js/` với `--only-mapped`.
- Các script đã có trong [package.json](package.json).

## Lỗi Source Map "generated column Infinity"

- Hiện tượng: SME báo "generated column Infinity" ở nhiều chunk minify 1–2 dòng.
- Nguyên nhân: mapping đặc biệt ở cuối dòng do minifier/terser; một số công cụ đọc source map không xử lý tốt.
- Cách xử lý thực tế:
  - Ưu tiên phân tích `main.*.js` (`npm run analyze` hoặc `npm run analyze:maps`).
  - Dùng `--only-mapped` để giảm lỗi trên chunk phụ (`npm run analyze:maps:only`).
  - Fallback: dùng `size-limit` (`npm run perf:size`) và `webpack-bundle-analyzer` thay cho SME khi cần cấu trúc gói.

## Lệnh nhanh

```bash
# Build có sourcemap
rm -rf build && GENERATE_SOURCEMAP=true npm run build

# Phân tích main bundle
npm run analyze:maps

# Phân tích tất cả JS (chỉ phần có map)
npm run analyze:maps:only

# Kiểm tra kích thước trong CI
npm run perf:size
```

## Việc đã làm hôm nay

- Thêm script `analyze:maps:only` vào [package.json](package.json).
- Build thành công, `build/` đã tạo.
- Chạy `analyze:maps:only` vẫn gặp lỗi `Infinity` ở một số chunk (đặc thù minifier).
- Đề xuất CI sử dụng `perf:size` làm tiêu chí chính; giữ SME làm công cụ tùy chọn khi điều tra cục bộ.

## Next steps (đề xuất)

- Cấu hình pipeline/CI chạy `perf:size` và báo cáo ngưỡng.
- Tùy chọn: pin phiên bản minifier (terser) ổn định, hoặc nâng công cụ SME nếu có bản sửa mapping.
- Khi cần phân tích chi tiết dependency tree, dùng `webpack-bundle-analyzer` từ `stats`.
