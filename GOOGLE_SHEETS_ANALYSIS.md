# 🔍 Phân Tích Google Sheets - 67 Tabs

## 📊 Tình Trạng Hiện Tại

**Tổng số sheets: 67**

## 🔍 Phân Loại Sheets

### ✅ Sheets Cần Giữ (Core Sheets - ~30 sheets)

**System Sheets:**

1. HOME
2. Orders
3. Carriers
4. Locations
5. Transfers
6. Settings
7. Inventory
8. Reports
9. Sales
10. VolumeRules
11. InboundInternational
12. InboundDomestic
13. Users
14. TransportRequests
15. Roles
16. RolePermissions
17. Employees
18. Logs
19. TransportProposals
20. Trips
21. TransferSlips

**Automation Sheets:** 22. Dashboard 23. Automation_Status 24. Automation_Logs 25. Config 26. SLA_Rules 27. User_Verification 28. VerificationTokens 29. User_Sessions 30. Login_Logs 31. MIA_Logistics_Data 32. Dashboard_Summary 33. System_Logs

### ❌ Sheets Cần Xóa (Test/Temporary Sheets - ~37 sheets)

**Verification Sheets (Pattern: `Verification_YYYYMMDD_HHMM`):**

- Verification_20251123_0517
- Verification_20251123_0529
- Verification_20251123_0530
- Verification_20251123_0551
- ... (nhiều sheets với pattern này)

**Results Sheets (Pattern: `Results_YYYYMMDD_HHMM`):**

- Results_20251123_0508
- Results_20251123_0518
- Results_20251123_0530
- Results_20251123_0531
- Results_20251123_0552
- ... (nhiều sheets với pattern này)

**HealthCheck Sheets (Pattern: `HealthCheck_<timestamp>`):**

- HealthCheck_1763954874918
- HealthCheck_1763954874712
- HealthCheck_1763954935189
- HealthCheck_1763955001670
- HealthCheck_1763955481790
- HealthCheck_1763973057430
- HealthCheck_1765937457325
- HealthCheck_1765937532229
- HealthCheck_1766688531166
- HealthCheck_1766688588041
- HealthCheck_1766688699306
- HealthCheck_1766688745229
- HealthCheck_1766688784448
- HealthCheck_1766688793429
- HealthCheck_1766688815303
- HealthCheck_1766688863808
- HealthCheck_1766688880799
- HealthCheck_1766688894611
- HealthCheck_1766688916326
- HealthCheck_1766689014333
- HealthCheck_1766689092574
- HealthCheck_1766689155832
- ... (nhiều HealthCheck sheets)

**Test Sheets:**

- Test Sheet
- Test_Export
- 123

## 🔍 Nguyên Nhân

### 1. Verification Scripts

**File**: `automation/modules/verify_sheets.py`, `automation/automation_new/test_google_sheets_verification.py`

**Vấn đề:**

```python
sheet_name = f'Verification_{datetime.now().strftime("%Y%m%d_%H%M")}'
result = sheets_service.export_data_to_sheets(sample_data, sheet_name)
```

- Mỗi lần chạy verification test, tạo sheet mới với timestamp
- Không xóa sheets cũ
- Tích lũy theo thời gian

### 2. Export Data Function

**File**: `automation/modules/google_sheets_config.py` (line 448-495)

**Vấn đề:**

```python
def export_data_to_sheets(self, data: List[Dict[str, Any]], sheet_name: str = None) -> bool:
    # ...
    worksheet = self.spreadsheet.add_worksheet(
        title=sheet_name, rows=len(data) + 10, cols=20
    )
```

- Function `export_data_to_sheets()` luôn tạo sheet mới
- Không check xem sheet đã tồn tại chưa
- Không có logic để reuse sheet cũ hoặc append data

### 3. Health Check Scripts

**Pattern**: `HealthCheck_<timestamp>`

- Có vẻ như health check scripts tạo sheets mới mỗi lần chạy
- Không cleanup sau khi xong

### 4. Results Sheets

**Pattern**: `Results_YYYYMMDD_HHMM`

- Automation scripts tạo result sheets mới mỗi lần chạy
- Không xóa sheets cũ

## 💡 Giải Pháp

### 1. Ngay Lập Tức: Cleanup Script

Đã tạo script: `automation/scripts/cleanup_sheets.py`

**Usage:**

```bash
# List all sheets
python3 automation/scripts/cleanup_sheets.py --list-only

# Dry run (xem sẽ xóa gì)
python3 automation/scripts/cleanup_sheets.py --dry-run --delete-pattern 'Verification_*'
python3 automation/scripts/cleanup_sheets.py --dry-run --delete-pattern 'Results_*'
python3 automation/scripts/cleanup_sheets.py --dry-run --delete-pattern 'HealthCheck_*'

# Xóa sheets theo pattern (interactive)
python3 automation/scripts/cleanup_sheets.py --delete-pattern 'Verification_*' --interactive
python3 automation/scripts/cleanup_sheets.py --delete-pattern 'Results_*' --interactive
python3 automation/scripts/cleanup_sheets.py --delete-pattern 'HealthCheck_*' --interactive

# Xóa tất cả test sheets (whitelist approach)
python3 automation/scripts/cleanup_sheets.py --interactive
```

### 2. Dài Hạn: Fix Code

#### A. Fix `export_data_to_sheets()` Function

**File**: `automation/modules/google_sheets_config.py`

**Thay đổi:**

- Option 1: Reuse existing sheet nếu cùng tên
- Option 2: Append data vào sheet cũ thay vì tạo mới
- Option 3: Add parameter `reuse_existing=True`
- Option 4: Auto-cleanup sheets cũ sau X ngày

**Ví dụ:**

```python
def export_data_to_sheets(self, data: List[Dict[str, Any]], sheet_name: str = None, reuse_existing: bool = True) -> bool:
    # ...
    if reuse_existing:
        try:
            worksheet = self.spreadsheet.worksheet(sheet_name)
            # Append to existing sheet
        except gspread.WorksheetNotFound:
            # Create new sheet
            worksheet = self.spreadsheet.add_worksheet(...)
    else:
        # Always create new (current behavior)
        worksheet = self.spreadsheet.add_worksheet(...)
```

#### B. Fix Verification Scripts

**Files**:

- `automation/modules/verify_sheets.py`
- `automation/automation_new/test_google_sheets_verification.py`

**Thay đổi:**

- Sử dụng sheet cố định thay vì tạo mới mỗi lần
- Hoặc cleanup sheets cũ trước khi tạo mới
- Hoặc append vào sheet "Verification_Logs" thay vì tạo sheet mới

#### C. Fix Health Check Scripts

- Tìm health check scripts tạo sheets
- Fix để reuse sheet hoặc cleanup

### 3. Best Practices

1. **Reuse Sheets**: Sử dụng sheet cố định thay vì tạo mới
2. **Append Data**: Append data vào sheet cũ thay vì tạo sheet mới
3. **Cleanup Logic**: Auto-cleanup sheets cũ (older than X days)
4. **Naming Convention**:
   - Test sheets: `Test_*` (có thể cleanup)
   - Log sheets: `*_Logs` (append data, không tạo mới)
   - Export sheets: `Export_*` (có thể cleanup sau X ngày)

## 📋 Action Items

1. ✅ **Tạo cleanup script** - Done
2. ⏳ **Chạy cleanup script để xóa test sheets** - Pending
3. ⏳ **Fix `export_data_to_sheets()` function** - Pending
4. ⏳ **Fix verification scripts** - Pending
5. ⏳ **Fix health check scripts** - Pending
6. ⏳ **Thêm cleanup logic vào automation scripts** - Pending

## 🎯 Khuyến Nghị

**Ngay lập tức:**

1. Chạy cleanup script để xóa test sheets (Verification*\*, Results*\_, HealthCheck\_\_)
2. Giảm từ 67 sheets xuống ~30 sheets

**Ngắn hạn:**

1. Fix `export_data_to_sheets()` để reuse sheets
2. Fix verification scripts
3. Fix health check scripts

**Dài hạn:**

1. Implement auto-cleanup logic
2. Document best practices
3. Add monitoring/alerting cho số lượng sheets
