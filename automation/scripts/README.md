# 📚 Automation Scripts Documentation

Thư mục này chứa các helper scripts để setup, test và quản lý Google Sheets Integration.

## 📋 Available Scripts

### 1. `health-check.sh` 🔍

Script kiểm tra toàn diện tất cả components của hệ thống.

**Usage:**

```bash
bash scripts/health-check.sh
```

**Checks:**

- ✅ Files và directories tồn tại
- ✅ Environment variables được cấu hình
- ✅ Python dependencies đã cài đặt
- ✅ JSON files hợp lệ
- ✅ Google Sheets connection
- ✅ Ports và services

**Exit Codes:**

- `0` - All checks passed (100%)
- `1` - Most checks passed (≥80%)
- `2` - Many checks failed (<80%)

### 2. `quick-start.sh` 🚀

Script setup nhanh cho Google Sheets Integration.

**Usage:**

```bash
bash scripts/quick-start.sh
```

**Features:**

- Tạo `.env` file từ template
- Tạo virtual environment
- Cài đặt Python dependencies
- Test Google Sheets connection
- Chạy health check

**Requirements:**

- Python 3.8+
- Google Sheets service account JSON file

### 3. `test_sheets_connection.py` 🧪

Python script test kết nối Google Sheets API.

**Usage:**

```bash
python3 test_sheets_connection.py
```

**Tests:**

1. Python imports (gspread, google.auth, etc.)
2. Environment variables
3. Credentials file validation
4. Google Sheets API connection
5. Data reading capability

**Output:**

- ✅ Success: All tests passed
- ❌ Failure: Detailed error messages with troubleshooting tips

## 🔧 Setup Instructions

### Step 1: Environment Configuration

1. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Edit `.env` với thông tin của bạn:
   ```bash
   # Required
   GOOGLE_SHEET_ID=your_sheet_id_here
   GOOGLE_SERVICE_ACCOUNT_FILE=config/service_account.json
   ```

### Step 2: Google Sheets Setup

1. Tạo Google Cloud Project
2. Enable Google Sheets API và Google Drive API
3. Tạo Service Account
4. Download JSON credentials
5. Copy credentials vào `config/service_account.json`
6. Share Google Sheet với service account email

### Step 3: Run Quick Start

```bash
bash scripts/quick-start.sh
```

### Step 4: Verify Installation

```bash
# Health check
bash scripts/health-check.sh

# Connection test
python3 test_sheets_connection.py
```

## 📊 Checklist Implementation

Các scripts này implement các checklist items từ `docs/Google_Sheets_Integration_Checklist.md`:

### ✅ Pre-deployment Checklist

- [x] Google Sheets API Setup verification
- [x] Project Structure validation
- [x] Environment variables check
- [x] Credentials file validation

### ✅ Testing Checklist

- [x] Environment Test (health-check.sh)
- [x] Python Service Test (test_sheets_connection.py)
- [x] Connection verification

### ✅ Common Issues & Solutions

- [x] Authentication Failed detection
- [x] API Connection Failed detection
- [x] Configuration validation

## 🚨 Troubleshooting

### Issue: Health Check Fails

```bash
# Check specific component
bash scripts/health-check.sh | grep "❌"

# Fix missing dependencies
pip install -r requirements.txt

# Fix missing files
# Follow quick-start.sh instructions
```

### Issue: Connection Test Fails

```bash
# Run detailed test
python3 test_sheets_connection.py

# Check credentials
python3 -c "import json; print(json.load(open('config/service_account.json'))['client_email'])"

# Verify sheet sharing
# Go to Google Sheet → Share → Add service account email
```

### Issue: Environment Variables Not Found

```bash
# Check .env file exists
ls -la .env

# Load and check variables
source .env
echo $GOOGLE_SHEET_ID
echo $GOOGLE_SERVICE_ACCOUNT_FILE
```

## 📝 Script Development

### Adding New Checks

Edit `health-check.sh`:

```bash
check_new_feature() {
    total=$((total + 1))
    if [ condition ]; then
        echo -e "${GREEN}✅${NC} Feature OK"
        success=$((success + 1))
    else
        echo -e "${RED}❌${NC} Feature failed"
    fi
}
```

### Adding New Tests

Edit `test_sheets_connection.py`:

```python
def test_new_feature():
    """Test new feature"""
    print("\n🔍 Testing new feature...")
    try:
        # Test code here
        print("✅ New feature works")
        return True
    except Exception as e:
        print(f"❌ New feature failed: {e}")
        return False
```

## 🔗 Related Files

- `docs/Google_Sheets_Integration_Checklist.md` - Full checklist
- `services/google_sheets_service.py` - Google Sheets service
- `modules/google_sheets_config.py` - Configuration service
- `verify_sheets.py` - Alternative verification script

## 📞 Support

Nếu gặp vấn đề:

1. Chạy `health-check.sh` để xác định vấn đề
2. Xem `docs/Google_Sheets_Integration_Checklist.md` cho troubleshooting
3. Check logs trong `logs/` directory
