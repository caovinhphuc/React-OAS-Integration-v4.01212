[36m
📊 PHÂN TÍCH BUNDLE SIZE[0m
[36m============================================================[0m

[34m📦 Kích Thước Bundle:[0m

[31m❌ JAVASCRIPT:    2.34 MB /     250 KB (959.1%)[0m
[31m❌ CSS       :   80.51 KB /      50 KB (161.0%)[0m
[32m✅ IMAGES    :    0 Bytes /     500 KB (0.0%)[0m
[32m✅ FONTS     :    0 Bytes /     100 KB (0.0%)[0m
[31m❌ TOTAL     :    2.42 MB /       1 MB (242.0%)[0m

[34m📁 Top Files Lớn Nhất:[0m

[36m   1. bundle-stats.json                                   123.51 MB[0m
[36m   2. static/js/main.92a25138.js                          694.58 KB[0m
[36m   3. static/js/714.d25ea931.chunk.js                     359.75 KB[0m
[36m   4. static/js/849.762801d3.chunk.js                     165.46 KB[0m
[36m   5. static/js/856.089d1f99.chunk.js                     118.94 KB[0m
[36m   6. static/js/255.ba2dfe53.chunk.js                     116.84 KB[0m
[36m   7. static/js/200.638002f1.chunk.js                      99.69 KB[0m
[36m   8. static/js/589.9ed18ca6.chunk.js                      96.34 KB[0m
[36m   9. static/js/253.4a8c41d6.chunk.js                      86.09 KB[0m
[36m  10. static/js/719.95940084.chunk.js                       50.1 KB[0m
[36m  11. static/js/701.b1f1f83a.chunk.js                      39.78 KB[0m
[36m  12. static/js/396.37f96171.chunk.js                      38.71 KB[0m
[36m  13. static/js/302.179e70f8.chunk.js                      35.23 KB[0m
[36m  14. static/js/218.5550effc.chunk.js                      33.46 KB[0m
[36m  15. static/js/581.bef538dd.chunk.js                      32.93 KB[0m

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
