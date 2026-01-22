[36m
📊 PHÂN TÍCH BUNDLE SIZE[0m
[36m============================================================[0m

[34m📦 Kích Thước Bundle:[0m

[31m❌ JAVASCRIPT:    2.34 MB /     250 KB (957.2%)[0m
[31m❌ CSS       :    92.7 KB /      50 KB (185.4%)[0m
[32m✅ IMAGES    :    0 Bytes /     500 KB (0.0%)[0m
[32m✅ FONTS     :    0 Bytes /     100 KB (0.0%)[0m
[31m❌ TOTAL     :    2.43 MB /       1 MB (242.7%)[0m

[34m📁 Top Files Lớn Nhất:[0m

[36m   1. static/js/main.28e2c468.js                          694.14 KB[0m
[36m   2. static/js/440.b4f9bdd7.chunk.js                      359.7 KB[0m
[36m   3. static/js/872.3a1e871f.chunk.js                     165.46 KB[0m
[36m   4. static/js/395.895eeca7.chunk.js                     118.93 KB[0m
[36m   5. static/js/756.72d7582f.chunk.js                     116.84 KB[0m
[36m   6. static/js/488.4df62caa.chunk.js                      99.69 KB[0m
[36m   7. static/js/975.e097e5d1.chunk.js                      96.34 KB[0m
[36m   8. static/js/96.3759d42f.chunk.js                       86.09 KB[0m
[36m   9. static/js/403.1679420e.chunk.js                      50.09 KB[0m
[36m  10. static/css/main.8268259e.css                         40.67 KB[0m
[36m  11. static/js/776.778f2b93.chunk.js                      39.77 KB[0m
[36m  12. static/js/287.94941bef.chunk.js                      38.72 KB[0m
[36m  13. static/js/google-drive.fdb29443.chunk.js                34 KB[0m
[36m  14. static/js/security.ffafa47f.chunk.js                 33.42 KB[0m
[36m  15. static/js/9.c6bba87b.chunk.js                        32.92 KB[0m

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

[32m📄 Report đã được tạo: /Users/phuccao/Projects/__ACTIVE__/React-OAS-Integration-v4.0/BUNDLE_OPTIMIZATION_REPORT.md[0m
[32m
✅ Phân tích hoàn tất![0m
[36m💡 Xem chi tiết trong: BUNDLE_OPTIMIZATION_REPORT.md[0m
