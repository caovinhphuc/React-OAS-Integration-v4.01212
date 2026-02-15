[36m
📊 PHÂN TÍCH BUNDLE SIZE[0m
[36m============================================================[0m

[34m📦 Kích Thước Bundle:[0m

[31m❌ JAVASCRIPT:    2.37 MB /     250 KB (969.9%)[0m
[31m❌ CSS       :   92.76 KB /      50 KB (185.5%)[0m
[32m✅ IMAGES    :    0 Bytes /     500 KB (0.0%)[0m
[32m✅ FONTS     :    0 Bytes /     100 KB (0.0%)[0m
[31m❌ TOTAL     :    2.46 MB /       1 MB (245.9%)[0m

[34m📁 Top Files Lớn Nhất:[0m

[36m   1. bundle-stats.json                                   124.69 MB[0m
[36m   2. static/js/main.19784491.js                          694.85 KB[0m
[36m   3. static/js/980.f1b67e0a.chunk.js                     330.49 KB[0m
[36m   4. static/js/996.1a7ca4ef.chunk.js                     165.12 KB[0m
[36m   5. static/js/741.34548f57.chunk.js                     120.17 KB[0m
[36m   6. static/js/504.23365113.chunk.js                     117.83 KB[0m
[36m   7. static/js/998.39ea5fb7.chunk.js                     100.46 KB[0m
[36m   8. static/js/753.0f0d0ed7.chunk.js                      95.85 KB[0m
[36m   9. static/js/253.a90b8a2e.chunk.js                      85.96 KB[0m
[36m  10. static/js/451.580a8b12.chunk.js                      50.01 KB[0m
[36m  11. static/js/934.aa0b2140.chunk.js                      42.81 KB[0m
[36m  12. static/css/main.8268259e.css                         40.73 KB[0m
[36m  13. static/js/456.8c812cd6.chunk.js                      40.39 KB[0m
[36m  14. static/js/396.bacb4df1.chunk.js                      38.35 KB[0m
[36m  15. static/js/google-drive.63494505.chunk.js             35.13 KB[0m

[33m💡 Đề Xuất Tối Ưu Hóa:[0m

[31m
1. JavaScript bundle quá lớn[0m
[36m   ✅ Đã có lazy loading trong App.jsx - cần cải thiện thêm[0m
[36m   🔍 Kiểm tra dependencies lớn: antd, recharts, socket.io-client[0m
[36m   📦 Sử dụng dynamic imports cho các components không cần thiết ngay[0m
[36m   🗑️  Xóa unused imports và dependencies[0m
[36m   ⚡ Sử dụng tree-shaking để loại bỏ code không dùng[0m
[36m   📚 Code splitting theo routes thay vì chỉ components[0m
[33m
2. CSS bundle quá lớn[0m
[36m   🎨 Import chỉ các component Ant Design cần thiết[0m
[36m   📝 Sử dụng CSS modules thay vì global CSS[0m
[36m   🗑️  Xóa unused CSS classes[0m
[36m   🔧 Sử dụng PurgeCSS để loại bỏ CSS không dùng[0m
[31m
3. Tổng bundle size vượt quá budget[0m
[36m   📊 Sử dụng source-map-explorer để phân tích chi tiết[0m
[36m   🔍 Chạy: npm run analyze:bundle[0m
[36m   ⚡ Tối ưu hóa images (WebP, compression)[0m
[36m   📦 Chỉ load libraries khi cần (lazy loading)[0m
[36m   🗜️  Enable gzip/brotli compression trên server[0m

[34m🚀 Scripts Để Phân Tích:[0m

[32m   1. npm run analyze:bundle    - Phân tích bundle với source-map-explorer[0m
[32m   2. npm run build:stats       - Build với webpack stats[0m
[32m   3. npm run perf:check        - Kiểm tra performance[0m

[33m📚 Dependencies Có Thể Tối Ưu:[0m

[36m   • antd                      → Import từng component: import Button from 'antd/es/button'[0m
[36m   • recharts                  → Lazy load chart components[0m
[36m   • socket.io-client          → Chỉ load khi cần WebSocket connection[0m
[36m   • react-grid-layout         → Lazy load chỉ khi cần dashboard customization[0m
[36m   • @ant-design/icons         → Import từng icon: import { Icon } from '@ant-design/icons'[0m

[32m📄 Report đã được tạo: /Users/phuccao/Workspace/mia-vn/React-OAS-Integration-v4.01212/BUNDLE_OPTIMIZATION_REPORT.md[0m
[32m
✅ Phân tích hoàn tất![0m
[36m💡 Xem chi tiết trong: BUNDLE_OPTIMIZATION_REPORT.md[0m
