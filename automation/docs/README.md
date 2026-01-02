# 🏢 MIA Enterprise Resource Planning (ERP) System

## 📋 Tổng quan dự án

Hệ thống ERP hoàn chỉnh được phát triển bằng Node.js/Express và Python automation, quản lý toàn diện các hoạt động kinh doanh bao gồm:

- ✅ Quản lý đơn hàng (Orders Management)
- ✅ Quản lý tồn kho (Inventory Management)
- ✅ Quản lý nhập hàng (Imports Management)
- ✅ Quản lý nhân sự (Staff Management)
- ✅ Quản lý chuyển kho (Transfers Management)
- ✅ Hệ thống báo cáo và phân tích (Reports & Analytics)
- ✅ Tự động hóa quy trình (Python Automation)

## 🚀 Tính năng chính

### 🔐 Bảo mật và Xác thực

- JWT Authentication với refresh token
- Role-based access control (RBAC)
- API rate limiting và CORS protection
- Mã hóa mật khẩu với bcrypt

### 📊 Quản lý Dữ liệu

- RESTful API design với đầy đủ CRUD operations
- Validation và sanitization input
- Error handling và logging system
- Database optimization với indexing

### 🤖 Tự động hóa

- Python automation cho các quy trình kinh doanh
- Scheduled tasks và background jobs
- Data synchronization và backup
- Report generation tự động

### 📈 Báo cáo và Phân tích

- Dashboard tổng quan kinh doanh
- Báo cáo chi tiết theo từng module
- Export dữ liệu (Excel, PDF, CSV)
- Data visualization với charts

## 🛠️ Công nghệ sử dụng

### Backend (Node.js)

- **Express.js** - Web framework
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **helmet** - Security middleware
- **cors** - Cross-origin resource sharing
- **express-validator** - Input validation
- **morgan** - HTTP request logger

### Automation (Python)

- **requests** - HTTP client
- **pandas** - Data manipulation
- **schedule** - Task scheduling
- **openpyxl** - Excel processing
- **smtplib** - Email automation
- **logging** - System logging

### Database

- **JSON Files** - Data storage (có thể mở rộng với MongoDB/PostgreSQL)
- **File System** - Document storage

## 📦 Cài đặt và Thiết lập

### Yêu cầu hệ thống

- Node.js 16+
- Python 3.8+
- npm hoặc yarn
- pip (Python package manager)

### 1. Clone dự án

```bash
# Clone repository
git clone <your-repo-url>
cd mia-erp-system

# Hoặc giải nén file ONE-Project-Setup.zip
unzip ONE-Project-Setup.zip
cd mia-erp-system
```

### 2. Cài đặt tự động (Khuyến nghị)

```bash
# Chạy script setup tự động
chmod +x setup.sh
./setup.sh
```

### 3. Cài đặt thủ công

#### Backend Setup

```bash
# Cài đặt Node.js dependencies
npm install

# Hoặc sử dụng yarn
yarn install
```

#### Python Automation Setup

```bash
# Cài đặt Python dependencies
pip install -r requirements.txt

# Hoặc sử dụng virtual environment (khuyến nghị)
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate   # Windows
pip install -r requirements.txt
```

### 4. Cấu hình môi trường

```bash
# Copy file .env template
cp .env.template .env

# Chỉnh sửa file .env với thông tin của bạn
nano .env
```

## ⚙️ Cấu hình

### File .env

```env
# Server Configuration
PORT=3000
NODE_ENV=development
API_VERSION=v1

# Security
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d
BCRYPT_ROUNDS=12

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mia_erp
DB_USER=admin
DB_PASSWORD=password

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=MIA ERP System <noreply@mia.vn>

# File Upload
UPLOAD_MAX_SIZE=10MB
UPLOAD_ALLOWED_TYPES=jpg,jpeg,png,pdf,xlsx,docx

# External APIs
GOOGLE_SHEETS_API_KEY=your-google-sheets-api-key
GOOGLE_DRIVE_API_KEY=your-google-drive-api-key

# Automation Settings
PYTHON_AUTOMATION_ENABLED=true
AUTO_BACKUP_ENABLED=true
BACKUP_INTERVAL=24h
REPORT_SCHEDULE=0 9 * * *
```

## 🚀 Chạy ứng dụng

### 1. Khởi động Backend

```bash
# Development mode
npm run dev

# Production mode
npm start

# Với PM2 (production)
npm install -g pm2
pm2 start ecosystem.config.js
```

### 2. Khởi động Python Automation

```bash
# Chạy automation system
cd python-automation
python main.py

# Hoặc chạy background
nohup python main.py &
```

### 3. Kiểm tra hệ thống

```bash
# Health check
curl http://localhost:3000/api/v1/health

# API documentation
curl http://localhost:3000/api/v1/docs
```

## 📚 API Documentation

### Base URL

```
http://localhost:3000/api/v1
```

### Authentication

```http
POST /auth/login
POST /auth/register
POST /auth/refresh
DELETE /auth/logout
```

### Modules API

#### 📦 Orders (Đơn hàng)

```http
GET    /orders           # Lấy danh sách đơn hàng
POST   /orders           # Tạo đơn hàng mới
GET    /orders/:id       # Lấy chi tiết đơn hàng
PUT    /orders/:id       # Cập nhật đơn hàng
DELETE /orders/:id       # Xóa đơn hàng
PUT    /orders/:id/status # Cập nhật trạng thái
```

#### 📋 Inventory (Tồn kho)

```http
GET    /inventory        # Lấy danh sách tồn kho
POST   /inventory        # Thêm sản phẩm mới
GET    /inventory/:id    # Chi tiết sản phẩm
PUT    /inventory/:id    # Cập nhật sản phẩm
DELETE /inventory/:id    # Xóa sản phẩm
PUT    /inventory/:id/stock # Cập nhật số lượng
```

#### 📥 Imports (Nhập hàng)

```http
GET    /imports          # Danh sách phiếu nhập
POST   /imports          # Tạo phiếu nhập mới
GET    /imports/:id      # Chi tiết phiếu nhập
PUT    /imports/:id      # Cập nhật phiếu nhập
DELETE /imports/:id      # Xóa phiếu nhập
```

#### 👥 Staff (Nhân sự)

```http
GET    /staff            # Danh sách nhân viên
POST   /staff            # Thêm nhân viên mới
GET    /staff/:id        # Thông tin nhân viên
PUT    /staff/:id        # Cập nhật nhân viên
DELETE /staff/:id        # Xóa nhân viên
```

#### 🔄 Transfers (Chuyển kho)

```http
GET    /transfers        # Danh sách chuyển kho
POST   /transfers        # Tạo phiếu chuyển kho
GET    /transfers/:id    # Chi tiết chuyển kho
PUT    /transfers/:id    # Cập nhật chuyển kho
DELETE /transfers/:id    # Xóa chuyển kho
```

#### 📊 Reports (Báo cáo)

```http
GET    /reports/dashboard    # Dashboard tổng quan
GET    /reports/sales       # Báo cáo bán hàng
GET    /reports/inventory   # Báo cáo tồn kho
GET    /reports/financial   # Báo cáo tài chính
POST   /reports/custom      # Báo cáo tùy chỉnh
```

## 🤖 Python Automation

### Chức năng tự động hóa

#### 1. Data Synchronization

```python
# Đồng bộ dữ liệu từ API
python automation/sync_data.py

# Đồng bộ với Google Sheets
python automation/sync_sheets.py
```

#### 2. Report Generation

```python
# Tạo báo cáo hàng ngày
python automation/daily_reports.py

# Tạo báo cáo tùy chỉnh
python automation/custom_reports.py
```

#### 3. Data Backup

```python
# Backup dữ liệu
python automation/backup_data.py

# Khôi phục dữ liệu
python automation/restore_data.py
```

#### 4. Email Notifications

```python
# Gửi thông báo tự động
python automation/email_notifications.py

# Gửi báo cáo qua email
python automation/email_reports.py
```

### Lập lịch tự động

```python
# File: automation/scheduler.py
import schedule
import time

# Chạy báo cáo hàng ngày lúc 9:00 AM
schedule.every().day.at("09:00").do(daily_reports)

# Backup dữ liệu mỗi 6 tiếng
schedule.every(6).hours.do(backup_data)

# Đồng bộ dữ liệu mỗi 30 phút
schedule.every(30).minutes.do(sync_data)
```

## 📊 Database Schema

### Orders Table

```json
{
  "id": "string",
  "orderNumber": "string",
  "customerName": "string",
  "customerEmail": "string",
  "items": [
    {
      "productId": "string",
      "productName": "string",
      "quantity": "number",
      "price": "number"
    }
  ],
  "totalAmount": "number",
  "status": "pending|processing|shipped|delivered|cancelled",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### Inventory Table

```json
{
  "id": "string",
  "productName": "string",
  "productCode": "string",
  "category": "string",
  "supplier": "string",
  "costPrice": "number",
  "sellPrice": "number",
  "stock": "number",
  "minStock": "number",
  "location": "string",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

## 🔧 Troubleshooting

### Lỗi thường gặp

#### 1. Port đã được sử dụng

```bash
# Kiểm tra port đang sử dụng
lsof -i :3000

# Kill process
kill -9 <PID>

# Hoặc thay đổi port trong .env
PORT=3001
```

#### 2. Python dependencies

```bash
# Cài đặt lại dependencies
pip install --upgrade -r requirements.txt

# Sử dụng virtual environment
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

#### 3. Permission denied

```bash
# Cấp quyền cho script
chmod +x setup.sh
chmod +x start.sh

# Chạy với sudo nếu cần
sudo ./setup.sh
```

#### 4. Database connection

```bash
# Kiểm tra database connection
node -e "console.log('Database connection test')"

# Reset database
rm -rf data/
mkdir data
```

## 🚀 Deployment

### 1. Production Setup

```bash
# Build cho production
npm run build

# Cài đặt PM2
npm install -g pm2

# Start với PM2
pm2 start ecosystem.config.js

# Monitor
pm2 monit
```

### 2. Docker Deployment

```bash
# Build Docker image
docker build -t mia-erp .

# Run container
docker run -d -p 3000:3000 --name mia-erp-container mia-erp

# Docker Compose
docker-compose up -d
```

### 3. Environment Variables

```bash
# Production environment
export NODE_ENV=production
export PORT=3000
export JWT_SECRET=your-production-secret
```

## 📈 Performance Optimization

### 1. Caching

- Redis cache cho session và frequently accessed data
- Memory cache cho static data
- CDN cho static assets

### 2. Database Optimization

- Index optimization
- Query optimization
- Connection pooling
- Data pagination

### 3. API Optimization

- Rate limiting
- Response compression
- API versioning
- Load balancing

## 🔒 Security Checklist

- [x] JWT Authentication
- [x] Password hashing (bcrypt)
- [x] Input validation
- [x] SQL injection prevention
- [x] XSS protection
- [x] CORS protection
- [x] Rate limiting
- [x] Helmet.js security headers

## 📞 Support & Contact

Để được hỗ trợ, vui lòng:

- Tạo issue trên GitHub repository
- Liên hệ qua email: support@mia.vn
- Xem documentation tại: `/docs` folder

---

**Version:** 1.0.0  
**Last Updated:** 2025-01-03
