# 📋 PHÂN TÍCH VÀ PHÂN LOẠI SCRIPTS - React OAS Integration v4.0

> **Ngày phân tích**: 2025-01-27  
> **Tổng số scripts**: 82 files  
> **Mục đích**: Phân loại và tổ chức lại các script cho khoa học

---

## 📊 THỐNG KÊ

| Loại                    | Số lượng | Mô tả                       |
| ----------------------- | -------- | --------------------------- |
| **Setup**               | ~15      | Cài đặt và cấu hình ban đầu |
| **Start/Stop**          | ~10      | Khởi động/dừng services     |
| **Deployment**          | ~12      | Deploy lên các platform     |
| **Fix/Troubleshooting** | ~8       | Sửa lỗi và xử lý sự cố      |
| **Utility**             | ~15      | Tiện ích và helper scripts  |
| **Test**                | ~5       | Testing scripts             |
| **Git**                 | ~5       | Git operations              |
| **Sub-projects**        | ~12      | Scripts trong sub-projects  |

---

## 🔍 PHÂN LOẠI CHI TIẾT

### 1️⃣ SETUP SCRIPTS (Cài đặt ban đầu)

#### Root Level:

- `setup.sh` - Setup chính của dự án
- `setup_ide.sh` - Setup IDE
- `setup-https.sh` - Setup HTTPS certificates

#### scripts/:

- `scripts/setup.sh` - Setup script trong scripts folder
- `scripts/install.sh` - Install dependencies
- `scripts/verify-setup.sh` - Verify setup

#### Sub-projects:

- `automation/setup.sh` - Setup automation
- `automation/automation_new/setup.sh` - Setup automation_new
- `ai-service/setup_venv.sh` - Setup Python venv
- `one_automation_system/setup.sh` - Setup one_automation_system
- `google-sheets-project/` - Có thể có setup scripts

**Vấn đề**: Nhiều setup scripts trùng lặp, không rõ script nào là chính

---

### 2️⃣ START/STOP SCRIPTS (Khởi động/Dừng)

#### Root Level:

- `start_ai_platform.sh` - Start AI platform (v3.0 - cần cập nhật)
- `start_dev_servers.sh` - Start development servers
- `start_data_flow.sh` - Start data flow
- `deploy_platform.sh` - Deploy platform (start/stop/restart)

#### scripts/:

- `scripts/start_all.sh` - Start all services
- `scripts/start_backend.sh` - Start backend
- `scripts/start-backend.sh` - Start backend (duplicate?)
- `scripts/stop_all.sh` - Stop all services
- `scripts/run_all.sh` - Run all

#### Sub-projects:

- `automation/start.sh` - Start automation
- `automation/automation_new/start.sh` - Start automation_new
- `automation/automation_new/start_dashboard.sh` - Start dashboard
- `one_automation_system/start_all.sh` - Start all
- `one_automation_system/start_backend.sh` - Start backend
- `one_automation_system/stop_all.sh` - Stop all
- `mia-logistics-manager/start-mia.sh` - Start MIA
- `google-sheets-project/start.sh` - Start Google Sheets project

**Vấn đề**:

- Nhiều scripts trùng lặp chức năng
- Không rõ script nào chạy từ đâu
- Một số scripts cũ (v3.0)

---

### 3️⃣ DEPLOYMENT SCRIPTS (Deploy)

#### Root Level:

- `deploy.sh` - Deploy chính (Netlify + Render)
- `deploy-production.sh` - Production deployment
- `deploy-vercel.sh` - Deploy Vercel
- `deployVercel.sh` - Deploy Vercel (duplicate?)
- `deployNetlify.sh` - Deploy Netlify
- `deployGCP.sh` - Deploy Google Cloud Platform
- `deploy-github-vercel.sh` - Deploy GitHub + Vercel
- `quick-deploy.sh` - Quick deploy
- `quick_deploy.sh` - Quick deploy (duplicate?)
- `production_deploy.sh` - Production deploy
- `serve-build.sh` - Serve production build

#### scripts/:

- `scripts/deployVercel.sh` - Deploy Vercel
- `scripts/deployNetlify.sh` - Deploy Netlify
- `scripts/setup/deployVercel.sh` - Setup deploy Vercel
- `scripts/setup/deployNetlify.sh` - Setup deploy Netlify
- `scripts/update_vercel_env.sh` - Update Vercel env
- `scripts/update.sh` - Update script

#### Sub-projects:

- `one_automation_system/update_vercel_env.sh` - Update Vercel env
- `one_automation_system/update.sh` - Update
- `google-sheets-project/deploy.sh` - Deploy Google Sheets project

**Vấn đề**:

- Nhiều scripts deploy trùng lặp
- Không rõ script nào là chính
- Một số scripts có thể đã lỗi thời

---

### 4️⃣ FIX/TROUBLESHOOTING SCRIPTS (Sửa lỗi)

#### Root Level:

- `fix-branch-sync.sh` - Fix branch sync
- `fix-chunk-error.sh` - Fix chunk error
- `fix-missing-files.sh` - Fix missing files
- `verify_port_config.sh` - Verify port config

#### scripts/:

- `scripts/fix-port-conflict.sh` - Fix port conflict
- `scripts/fix-chunk-errors.sh` - Fix chunk errors
- `scripts/fix-automation-path.sh` - Fix automation path
- `scripts/fix-api-connection.sh` - Fix API connection
- `scripts/cleanup-duplicates.sh` - Cleanup duplicates

**Vấn đề**: Một số scripts có thể đã không còn cần thiết

---

### 5️⃣ UTILITY SCRIPTS (Tiện ích)

#### Root Level:

- `securityAudit.sh` - Security audit
- `test_workflow.sh` - Test workflow
- `sync-to-main.sh` - Sync to main branch
- `create-repo-and-push.sh` - Create repo and push
- `verify_port_config.sh` - Verify port config

#### scripts/:

- `scripts/check-backend.sh` - Check backend
- `scripts/check-ports.sh` - Check ports
- `scripts/check-env.sh` - Check environment
- `scripts/check-env copy.sh` - Check env (duplicate?)
- `scripts/kill-port.sh` - Kill port
- `scripts/verify-setup.sh` - Verify setup
- `scripts/prepare_github_repo.sh` - Prepare GitHub repo
- `scripts/push_to_github.sh` - Push to GitHub
- `scripts/create_package.sh` - Create package
- `scripts/upgrade-phase1.sh` - Upgrade phase 1

#### Sub-projects:

- `one_automation_system/tests/test-api-key.sh` - Test API key
- `one_automation_system/create_package.sh` - Create package
- `one_automation_system/install.sh` - Install
- `google-sheets-project/check_auth.sh` - Check auth
- `google-sheets-project/monitor_auth.sh` - Monitor auth

**Vấn đề**: Một số scripts có thể trùng lặp

---

### 6️⃣ TEST SCRIPTS (Testing)

#### scripts/:

- `scripts/test-api-key.sh` - Test API key
- `scripts/test-all.js` - Test all (JS, không phải .sh)

#### Sub-projects:

- `automation/automation_new/test_menu_quick.sh` - Test menu
- `automation/automation_new/quick_run.sh` - Quick run
- `automation/automation_new/quick_config.sh` - Quick config

---

### 7️⃣ GIT SCRIPTS (Git operations)

#### Root Level:

- `sync-to-main.sh` - Sync to main
- `create-repo-and-push.sh` - Create repo and push

#### scripts/:

- `scripts/prepare_github_repo.sh` - Prepare GitHub repo
- `scripts/push_to_github.sh` - Push to GitHub
- `scripts/setup-github.sh` - Setup GitHub
- `scripts/setup-github copy.sh` - Setup GitHub (duplicate?)

---

### 8️⃣ SUB-PROJECTS SCRIPTS

#### automation/:

- `automation/start.sh`
- `automation/setup.sh`
- `automation/automation_new/start.sh`
- `automation/automation_new/setup.sh`
- `automation/automation_new/start_dashboard.sh`
- `automation/automation_new/test_menu_quick.sh`
- `automation/automation_new/quick_run.sh`
- `automation/automation_new/quick_config.sh`

#### one_automation_system/:

- `one_automation_system/start_all.sh`
- `one_automation_system/start_backend.sh`
- `one_automation_system/stop_all.sh`
- `one_automation_system/setup.sh`
- `one_automation_system/install.sh`
- `one_automation_system/create_package.sh`
- `one_automation_system/update.sh`
- `one_automation_system/update_vercel_env.sh`
- `one_automation_system/tests/test-api-key.sh`
- `one_automation_system/scripts/setup.sh`

#### google-sheets-project/:

- `google-sheets-project/start.sh`
- `google-sheets-project/deploy.sh`
- `google-sheets-project/check_auth.sh`
- `google-sheets-project/monitor_auth.sh`

#### mia-logistics-manager/:

- `mia-logistics-manager/start-mia.sh`

---

## ⚠️ VẤN ĐỀ PHÁT HIỆN

### 1. Trùng lặp

- `deploy-vercel.sh` vs `deployVercel.sh`
- `quick-deploy.sh` vs `quick_deploy.sh`
- `scripts/start_backend.sh` vs `scripts/start-backend.sh`
- `scripts/check-env.sh` vs `scripts/check-env copy.sh`
- `scripts/setup-github.sh` vs `scripts/setup-github copy.sh`

### 2. Không rõ nguồn gốc

- Một số scripts không có comment mô tả
- Không rõ script nào chạy từ thư mục nào
- Một số scripts có thể đã lỗi thời

### 3. Cấu trúc lộn xộn

- Scripts ở root level và trong scripts/
- Scripts trong sub-projects
- Không có cấu trúc rõ ràng

### 4. Version cũ

- `start_ai_platform.sh` vẫn nói v3.0
- Một số scripts có thể không còn phù hợp với v4.0

---

## 📁 ĐỀ XUẤT CẤU TRÚC MỚI

```
scripts/
├── setup/                    # Setup scripts
│   ├── main-setup.sh        # Setup chính (từ root)
│   ├── ide-setup.sh         # Setup IDE
│   ├── https-setup.sh       # Setup HTTPS
│   └── verify-setup.sh      # Verify setup
│
├── start-stop/              # Start/Stop scripts
│   ├── start-all.sh         # Start all services
│   ├── stop-all.sh          # Stop all services
│   ├── start-backend.sh     # Start backend
│   └── start-frontend.sh    # Start frontend
│
├── deploy/                   # Deployment scripts
│   ├── deploy-production.sh # Production deploy
│   ├── deploy-vercel.sh     # Deploy Vercel
│   ├── deploy-netlify.sh    # Deploy Netlify
│   ├── deploy-gcp.sh        # Deploy GCP
│   └── quick-deploy.sh      # Quick deploy
│
├── fix/                      # Fix/Troubleshooting
│   ├── fix-port-conflict.sh
│   ├── fix-chunk-errors.sh
│   └── fix-api-connection.sh
│
├── utils/                    # Utility scripts
│   ├── check-ports.sh
│   ├── check-env.sh
│   ├── kill-port.sh
│   └── security-audit.sh
│
├── git/                      # Git operations
│   ├── sync-to-main.sh
│   └── push-to-github.sh
│
└── serve/                    # Serve scripts
    └── serve-build.sh
```

---

## 🎯 NEXT STEPS

1. ✅ Phân tích xong - Đã tạo file này
2. ⏳ Tạo cấu trúc thư mục mới
3. ⏳ Di chuyển scripts vào đúng vị trí
4. ⏳ Cập nhật scripts với paths mới
5. ⏳ Tạo file hướng dẫn sử dụng
6. ⏳ Xóa scripts trùng lặp/lỗi thời

---

**Last Updated**: 2025-01-27
