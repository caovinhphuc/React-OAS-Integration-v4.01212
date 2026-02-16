#!/bin/bash

# 🚀 QUICK DEPLOY - Commit & Deploy Nhanh
# Tự động commit và deploy lên Vercel + Railway

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

print() {
    echo -e "${CYAN}🚀${NC} $1"
}

print_success() {
    echo -e "${GREEN}✅${NC} $1"
}

print_error() {
    echo -e "${RED}❌${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠️${NC} $1"
}

# Get commit message from argument or use default
COMMIT_MSG="${1:-🔧 Update: Auto commit and deploy}"
VERCEL_PROJECT_NAME="${VERCEL_PROJECT_NAME:-mia-vn-google-integration}"

BUILD_OK=false
VERCEL_OK=false
RAILWAY_OK=false
VERCEL_URL=""
RAILWAY_URL=""

print "Bắt đầu quy trình commit và deploy..."

# Get script directory and change to project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
cd "$PROJECT_ROOT"

# Step 0: Check environment variables (optional)
if [ -f "scripts/utils/check-env.sh" ]; then
    print "Kiểm tra environment variables..."
    if ./scripts/utils/check-env.sh 2>&1 | tail -5; then
        print_success "Environment variables OK"
    else
        print_warning "Một số environment variables có thể thiếu"
        print_warning "Xem DEPLOY_ENV_CHECKLIST.md để biết chi tiết"
        read -p "Tiếp tục deploy? (y/n) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_error "Deploy bị hủy"
            exit 1
        fi
    fi
    echo ""
fi

# Step 1: Check git status
print "Kiểm tra git status..."
if ! git diff --quiet HEAD 2>/dev/null || ! git diff --cached --quiet 2>/dev/null; then
    print "Có thay đổi chưa commit"

    # Add all changes
    print "Đang add tất cả thay đổi..."
    git add -A

    # Commit
    print "Đang commit với message: $COMMIT_MSG"
    git commit -m "$COMMIT_MSG" || {
        print_error "Commit thất bại"
        exit 1
    }
    print_success "Đã commit thành công"
else
    print "Không có thay đổi để commit"
fi

# Step 2: Get current branch
CURRENT_BRANCH=$(git branch --show-current)
print "Branch hiện tại: $CURRENT_BRANCH"

# Step 3: Pull latest changes before pushing
print "Đang pull latest changes từ remote..."
if git fetch origin "$CURRENT_BRANCH" 2>/dev/null; then
    LOCAL=$(git rev-parse @)
    REMOTE=$(git rev-parse @{u} 2>/dev/null || echo "")

    if [ -n "$REMOTE" ] && [ "$LOCAL" != "$REMOTE" ]; then
        print_warning "Local branch đang behind remote. Đang merge..."

        # Try to merge
        if git pull --no-rebase origin "$CURRENT_BRANCH" 2>&1 | tee /tmp/git-pull.log; then
            print_success "Đã merge remote changes thành công"
        else
            if grep -q "CONFLICT" /tmp/git-pull.log; then
                print_error "Có merge conflict!"
                print "Vui lòng resolve conflicts thủ công:"
                echo "  git add ."
                echo "  git commit -m 'Resolve merge conflicts'"
                echo "  git push origin $CURRENT_BRANCH"
                rm -f /tmp/git-pull.log
                exit 1
            else
                print_warning "Pull thất bại, nhưng tiếp tục..."
            fi
        fi
        rm -f /tmp/git-pull.log
    else
        print_success "Local branch đã up to date"
    fi
else
    print_warning "Không thể fetch từ remote, tiếp tục..."
fi

# Step 4: Push to GitHub (skip if secret scanning blocks)
print "Đang push lên GitHub..."
SKIP_PUSH=false
if git push origin "$CURRENT_BRANCH" 2>&1 | tee /tmp/git-push.log | grep -q "GH013"; then
    print_warning "GitHub đang chặn push do secret scanning"
    print_warning "Bỏ qua push, deploy trực tiếp từ local"
    SKIP_PUSH=true
elif grep -q "non-fast-forward\|rejected" /tmp/git-push.log; then
    print_error "Push bị reject: Branch đang behind remote"
    print "Vui lòng pull và merge thủ công:"
    echo "  git pull origin $CURRENT_BRANCH"
    echo "  git push origin $CURRENT_BRANCH"
    rm -f /tmp/git-push.log
    exit 1
elif ! grep -q "Everything up-to-date\|To https" /tmp/git-push.log; then
    print_warning "Push có thể thất bại, kiểm tra logs trên"
    SKIP_PUSH=true
else
    print_success "Đã push lên GitHub"
fi
rm -f /tmp/git-push.log

# Step 4: Build Frontend
print "Build frontend..."
if [ ! -x "node_modules/.bin/react-scripts" ]; then
    print_warning "Thiếu dependencies (react-scripts). Đang chạy npm install..."
    if npm install; then
        print_success "Đã cài dependencies"
    else
        print_warning "npm install thất bại, thử lại với cache local để tránh lỗi quyền ~/.npm"
        LOCAL_NPM_CACHE="$PROJECT_ROOT/.npm-cache"
        mkdir -p "$LOCAL_NPM_CACHE"
        if npm install --cache "$LOCAL_NPM_CACHE" --prefer-offline; then
            print_success "Đã cài dependencies với cache local: $LOCAL_NPM_CACHE"
        else
            print_error "Không thể cài dependencies"
            print "Nếu vẫn lỗi EACCES, chạy 1 lần: sudo chown -R $(id -u):$(id -g) ~/.npm"
            exit 1
        fi
    fi
fi

if npm run build > /tmp/quick-deploy-build.log 2>&1; then
    tail -20 /tmp/quick-deploy-build.log
    print_success "Frontend đã build thành công"
    BUILD_OK=true
else
    tail -20 /tmp/quick-deploy-build.log || true
    print_error "Build frontend thất bại"
    rm -f /tmp/quick-deploy-build.log
    exit 1
fi
rm -f /tmp/quick-deploy-build.log

# Step 5: Deploy Frontend to Vercel
print "Deploy frontend lên Vercel..."
if command -v vercel &> /dev/null; then
    if vercel --prod --yes --name "$VERCEL_PROJECT_NAME" > /tmp/quick-deploy-vercel.log 2>&1; then
        tail -10 /tmp/quick-deploy-vercel.log
        VERCEL_URL=$(grep -Eo 'https://[^ ]+\.vercel\.app' /tmp/quick-deploy-vercel.log | tail -1 || true)
        print_success "Frontend đã deploy lên Vercel"
        VERCEL_OK=true
    else
        tail -20 /tmp/quick-deploy-vercel.log || true
        print_error "Vercel deploy thất bại"
        print_warning "Kiểm tra project name/link. Gợi ý: vercel link --project $VERCEL_PROJECT_NAME"
    fi
    rm -f /tmp/quick-deploy-vercel.log
else
    print_warning "Vercel CLI chưa cài đặt. Cài đặt: npm i -g vercel"
    print "Hoặc deploy qua Vercel Dashboard: https://vercel.com/dashboard"
fi

# Step 6: Deploy Backend to Railway (optional)
print "Deploy backend lên Railway..."
if command -v railway &> /dev/null; then
    # Deploy từ thư mục backend
    cd backend || {
        print_error "Không tìm thấy thư mục backend"
        exit 1
    }
    if railway status > /tmp/quick-deploy-railway-status.log 2>&1; then
        if railway up > /tmp/quick-deploy-railway-up.log 2>&1; then
            tail -10 /tmp/quick-deploy-railway-up.log
            RAILWAY_URL=$(grep -Eo 'https://[^ ]+railway\.app[^ ]*' /tmp/quick-deploy-railway-up.log | head -1 || true)
            print_success "Backend đã deploy lên Railway"
            RAILWAY_OK=true
        else
            tail -20 /tmp/quick-deploy-railway-up.log || true
            print_error "Railway deploy thất bại"
            print "Lưu ý: Nếu có nhiều services, chỉ định: railway up --service backend"
        fi
    else
        tail -10 /tmp/quick-deploy-railway-status.log || true
        print_error "Railway chưa link project"
        print "Chạy: railway login && railway link"
    fi
    rm -f /tmp/quick-deploy-railway-status.log /tmp/quick-deploy-railway-up.log
    cd ..
else
    print_warning "Railway CLI chưa cài đặt. Cài đặt: npm i -g @railway/cli"
    print "Hoặc deploy qua Railway Dashboard: https://railway.com"
fi

# Summary
echo ""
print_success "🎉 Hoàn tất!"
echo ""
echo "📋 Tóm tắt:"
echo "   ✅ Đã commit: $COMMIT_MSG"
if [ "$SKIP_PUSH" != "true" ]; then
    echo "   ✅ Đã push lên GitHub"
else
    echo "   ⚠️  Bỏ qua push (secret scanning)"
fi

if [ "$BUILD_OK" = true ]; then
    echo "   ✅ Frontend build thành công"
else
    echo "   ❌ Frontend build thất bại"
fi

if [ "$VERCEL_OK" = true ]; then
    echo "   ✅ Đã deploy frontend (Vercel)"
else
    echo "   ❌ Deploy frontend (Vercel) thất bại"
fi

if [ "$RAILWAY_OK" = true ]; then
    echo "   ✅ Đã deploy backend (Railway)"
else
    echo "   ❌ Deploy backend (Railway) thất bại"
fi
echo ""
echo "🌐 Kiểm tra:"
if [ -n "$VERCEL_URL" ]; then
    echo "   Frontend: $VERCEL_URL"
else
    echo "   Frontend: (không lấy được URL, xem log Vercel)"
fi

if [ -n "$RAILWAY_URL" ]; then
    echo "   Backend:  $RAILWAY_URL"
else
    echo "   Backend:  (không lấy được URL, xem log Railway)"
fi
echo ""

