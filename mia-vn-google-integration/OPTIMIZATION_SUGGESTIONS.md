[36m
📊 PHÂN TÍCH BUNDLE SIZE[0m
[36m============================================================[0m

[34m📦 Kích Thước Bundle:[0m

[31m❌ JAVASCRIPT:   517.8 KB /     250 KB (207.1%)[0m
[32m✅ CSS       :   12.27 KB /      50 KB (24.5%)[0m
[32m✅ IMAGES    :    0 Bytes /     500 KB (0.0%)[0m
[32m✅ FONTS     :    0 Bytes /     100 KB (0.0%)[0m
[32m✅ TOTAL     :  530.07 KB /       1 MB (51.8%)[0m

[34m📁 Top Files Lớn Nhất:[0m

[36m   1. static/js/main.ef9d03cd.js                          492.78 KB[0m
[36m   2. static/css/main.ca646634.css                         12.27 KB[0m
[36m   3. logo512.png                                           9.44 KB[0m
[36m   4. static/js/main.ef9d03cd.js.LICENSE.txt                6.47 KB[0m
[36m   5. logo192.png                                           5.22 KB[0m
[36m   6. static/js/539.9a0d4603.chunk.js                       2.65 KB[0m
[36m   7. static/js/retail.a57f131a.chunk.js                    2.37 KB[0m
[36m   8. favicon.ico                                           1.46 KB[0m
[36m   9. static/js/google-apps-script.4c97c3d8.chunk.js        1.26 KB[0m
[36m  10. static/js/smart-automation.7737245a.chunk.js          1.26 KB[0m
[36m  11. static/js/telegram.93b0f9d1.chunk.js                  1.26 KB[0m
[36m  12. static/js/advanced-analytics.ddce27dd.chunk.js        1.25 KB[0m
[36m  13. static/js/automation.ad69b736.chunk.js                1.25 KB[0m
[36m  14. static/js/google-sheets.2aefeb76.chunk.js             1.24 KB[0m
[36m  15. static/js/google-drive.9e5b8ee9.chunk.js              1.24 KB[0m

[33m💡 Đề Xuất Tối Ưu Hóa:[0m

[31m
1. JavaScript bundle quá lớn[0m
[36m   ✅ Đã có lazy loading trong App.jsx - cần cải thiện thêm[0m
[36m   🔍 Kiểm tra dependencies lớn: antd, recharts, socket.io-client[0m
[36m   📦 Sử dụng dynamic imports cho các components không cần thiết ngay[0m
[36m   🗑️  Xóa unused imports và dependencies[0m
[36m   ⚡ Sử dụng tree-shaking để loại bỏ code không dùng[0m
[36m   📚 Code splitting theo routes thay vì chỉ components[0m

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

[32m📄 Report đã được tạo: /Users/phuccao/Projects/fullstack/React-OAS-Integration-v4.01212/mia-vn-google-integration/BUNDLE_OPTIMIZATION_REPORT.md[0m
[32m
✅ Phân tích hoàn tất![0m
[36m💡 Xem chi tiết trong: BUNDLE_OPTIMIZATION_REPORT.md[0m
