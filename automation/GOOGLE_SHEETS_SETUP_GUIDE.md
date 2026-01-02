# 🚀 Google Sheets Integration - Setup Guide

Hướng dẫn triển khai Google Sheets Integration dựa trên checklist.

## 📋 Quick Start

### Option 1: Automated Setup (Recommended)

```bash
# Run quick start script
bash scripts/quick-start.sh
```

### Option 2: Manual Setup

Follow các bước dưới đây.

## 🔐 Step 1: Google Sheets API Setup

### 1.1 Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project hoặc select existing project
3. Note project ID

### 1.2 Enable APIs

1. Go to **APIs & Services** → **Library**
2. Enable:
   - ✅ **Google Sheets API**
   - ✅ **Google Drive API** (optional, for file access)

### 1.3 Create Service Account

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **Service Account**
3. Fill in:
   - Name: `one-automation-service`
   - Description: `Service account for OneAutomationSystem`
4. Click **Create and Continue**
5. Skip role assignment (optional)
6. Click **Done**

### 1.4 Create Service Account Key

1. Click on service account name
2. Go to **Keys** tab
3. Click **Add Key** → **Create new key**
4. Select **JSON** format
5. Download JSON file
6. Save as `config/service_account.json`

### 1.5 Share Google Sheet

1. Open your Google Sheet
2. Click **Share** button
3. Add service account email (from JSON file: `client_email` field)
4. Give **Editor** permission
5. Click **Done**

### 1.6 Get Sheet ID

From Google Sheet URL:

```
https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
```

Copy `SHEET_ID_HERE` part.

## 📁 Step 2: Project Structure

### 2.1 Create Directories

```bash
mkdir -p config
mkdir -p scripts
mkdir -p logs
mkdir -p services
mkdir -p modules
```

### 2.2 Setup Credentials

```bash
# Copy service account JSON to config/
cp ~/Downloads/your-service-account.json config/service_account.json

# Set correct permissions
chmod 600 config/service_account.json
```

### 2.3 Create .env File

```bash
# Copy template
cp .env.example .env

# Edit .env
nano .env
```

Fill in:

```env
GOOGLE_SHEET_ID=your_sheet_id_here
GOOGLE_SERVICE_ACCOUNT_FILE=config/service_account.json
```

## 🐍 Step 3: Python Setup

### 3.1 Create Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3.2 Install Dependencies

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

Required packages:

- `gspread`
- `google-auth`
- `google-api-python-client`
- `pandas`
- `python-dotenv`

## 🧪 Step 4: Testing

### 4.1 Test Connection

```bash
# Run connection test
python3 test_sheets_connection.py
```

Expected output:

```
✅ All required modules are installed
✅ GOOGLE_SHEET_ID: found
✅ Valid credentials file
✅ Successfully connected to Google Sheets!
```

### 4.2 Health Check

```bash
# Run comprehensive health check
bash scripts/health-check.sh
```

Expected output:

```
🎉 All checks passed! (X/X)
✨ System is ready for use!
```

### 4.3 Verify Sheets Integration

```bash
# Run verification script
python3 verify_sheets.py
```

## 📊 Step 5: Prepare Google Sheet

### 5.1 Create Data Sheet

1. Open Google Sheet
2. Create sheet named **"Data"** (or use existing)
3. Add headers in row 1:
   - Date, Product, Sales, Revenue, Region, Status
4. Add 2-3 sample rows

### 5.2 Verify Structure

```bash
# Test reading data
python3 -c "
from services.google_sheets_service import GoogleSheetsService
import os
from dotenv import load_dotenv

load_dotenv()
gs = GoogleSheetsService(
    service_account_file=os.getenv('GOOGLE_SERVICE_ACCOUNT_FILE'),
    sheet_id=os.getenv('GOOGLE_SHEET_ID')
)
data = gs.read_data('Data!A1:Z10')
print(f'Read {len(data)} rows')
print(data[:3])
"
```

## ✅ Step 6: Verification Checklist

Run through checklist:

```bash
# 1. Files exist
ls -la config/service_account.json
ls -la .env

# 2. Environment variables
source .env
echo $GOOGLE_SHEET_ID
echo $GOOGLE_SERVICE_ACCOUNT_FILE

# 3. Python dependencies
python3 -c "import gspread; print('✅ gspread')"
python3 -c "import google.auth; print('✅ google.auth')"

# 4. Connection test
python3 test_sheets_connection.py

# 5. Health check
bash scripts/health-check.sh
```

## 🚨 Common Issues

### Issue 1: Authentication Failed

**Symptoms:**

- `Permission denied` errors
- HTTP 403 errors

**Solutions:**

```bash
# Check service account email
python3 -c "import json; print(json.load(open('config/service_account.json'))['client_email'])"

# Verify sheet sharing
# Go to Google Sheet → Share → Check service account email is listed
```

### Issue 2: Module Not Found

**Symptoms:**

- `ModuleNotFoundError: No module named 'gspread'`

**Solutions:**

```bash
# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Issue 3: Invalid Credentials

**Symptoms:**

- `Invalid credentials` errors
- JSON decode errors

**Solutions:**

```bash
# Validate JSON
python3 -c "import json; json.load(open('config/service_account.json'))"

# Re-download credentials from Google Cloud Console
```

## 📚 Next Steps

1. **Read Documentation:**
   - `docs/Google_Sheets_Integration_Checklist.md` - Full checklist
   - `docs/README.md` - Integration guide

2. **Test Integration:**
   - Run `python3 verify_sheets.py`
   - Test reading/writing data

3. **Start Automation:**
   - Use `automation_enhanced.py` with Google Sheets logging
   - Monitor in Google Sheets dashboard

## 🔗 Related Files

- `scripts/health-check.sh` - Health check script
- `scripts/quick-start.sh` - Quick setup script
- `test_sheets_connection.py` - Connection test
- `services/google_sheets_service.py` - Google Sheets service
- `modules/google_sheets_config.py` - Configuration service

## 📞 Support

Nếu gặp vấn đề:

1. Check `docs/Google_Sheets_Integration_Checklist.md` troubleshooting section
2. Run `bash scripts/health-check.sh` để diagnose
3. Check logs trong `logs/` directory
