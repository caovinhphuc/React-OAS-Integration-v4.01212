# 📚 SCRIPTS INDEX - React OAS Integration v4.0

> **Quick Reference** cho tất cả scripts trong dự án

---

## 🚀 QUICK START

### Development

```bash
# Setup lần đầu
./setup.sh

# Start all services
./start_dev_servers.sh
# hoặc
./deploy_platform.sh start

# Stop all services
./deploy_platform.sh stop
```

### Deployment

```bash
# Quick deploy
./quick-deploy.sh "Commit message"

# Production deploy
./deploy-production.sh
```

---

## 📖 TÀI LIỆU

| File                                                         | Mô tả                             |
| ------------------------------------------------------------ | --------------------------------- |
| [SCRIPTS_GUIDE.md](./SCRIPTS_GUIDE.md)                       | 📚 Hướng dẫn sử dụng chi tiết     |
| [SCRIPTS_ANALYSIS.md](./SCRIPTS_ANALYSIS.md)                 | 🔍 Phân tích và phân loại scripts |
| [SCRIPTS_RESTRUCTURE_PLAN.md](./SCRIPTS_RESTRUCTURE_PLAN.md) | 📁 Kế hoạch tổ chức lại scripts   |

---

## 🎯 SCRIPTS QUAN TRỌNG NHẤT

### ⭐ Setup

- `./setup.sh` - Setup toàn bộ hệ thống

### ⭐ Start/Stop

- `./start_dev_servers.sh` - Start development servers
- `./deploy_platform.sh start` - Start all services
- `./deploy_platform.sh stop` - Stop all services

### ⭐ Deployment

- `./deploy.sh` - Deploy chính (Netlify + Render)
- `./quick-deploy.sh` - Quick deploy (Vercel + Railway)
- `./deploy-production.sh` - Production deployment

### ⭐ Troubleshooting

- `./scripts/check-ports.sh` - Check ports
- `./scripts/fix-port-conflict.sh` - Fix port conflicts
- `./scripts/check-backend.sh` - Check backend

---

## 📋 PHÂN LOẠI SCRIPTS

### 1. Setup Scripts

Xem: [SCRIPTS_GUIDE.md#1-setup-scripts](./SCRIPTS_GUIDE.md#1-setup-scripts)

### 2. Start/Stop Scripts

Xem: [SCRIPTS_GUIDE.md#2-startstop-scripts](./SCRIPTS_GUIDE.md#2-startstop-scripts)

### 3. Deployment Scripts

Xem: [SCRIPTS_GUIDE.md#3-deployment-scripts](./SCRIPTS_GUIDE.md#3-deployment-scripts)

### 4. Fix/Troubleshooting Scripts

Xem: [SCRIPTS_GUIDE.md#4-fixtroubleshooting-scripts](./SCRIPTS_GUIDE.md#4-fixtroubleshooting-scripts)

### 5. Utility Scripts

Xem: [SCRIPTS_GUIDE.md#5-utility-scripts](./SCRIPTS_GUIDE.md#5-utility-scripts)

### 6. Git Scripts

Xem: [SCRIPTS_GUIDE.md#6-git-scripts](./SCRIPTS_GUIDE.md#6-git-scripts)

### 7. Sub-projects Scripts

Xem: [SCRIPTS_GUIDE.md#7-sub-projects-scripts](./SCRIPTS_GUIDE.md#7-sub-projects-scripts)

---

## ⚠️ LƯU Ý

1. **Hầu hết scripts chạy từ Root directory**
2. **Kiểm tra permissions**: `chmod +x script-name.sh`
3. **Kiểm tra ports**: `./scripts/check-ports.sh`
4. **Kiểm tra env**: `./scripts/check-env.sh`

---

**Last Updated**: 2025-01-27
