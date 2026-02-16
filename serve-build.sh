#!/bin/bash

set -euo pipefail

PORT=${1:-3000}
CUSTOM_DIR=${2:-}
DEFAULT_DEPLOY_DIR="$HOME/Sites/mia-vn-integration"
DEFAULT_BUILD_DIR="build"

if [[ -n "$CUSTOM_DIR" ]]; then
	TARGET_DIR="$CUSTOM_DIR"
elif [[ -d "$DEFAULT_DEPLOY_DIR" ]]; then
	TARGET_DIR="$DEFAULT_DEPLOY_DIR"
else
	TARGET_DIR="$DEFAULT_BUILD_DIR"
fi

if [[ ! -d "$TARGET_DIR" ]]; then
	echo "❌ Build directory not found: $TARGET_DIR"
	echo "💡 Usage: ./serve-build.sh [port] [build_dir]"
	exit 1
fi

echo "🚀 Serving: $TARGET_DIR"
echo "🌐 URL: http://localhost:$PORT"

if command -v npx >/dev/null 2>&1; then
	exec npx serve -s "$TARGET_DIR" -l "$PORT"
fi

if command -v python3 >/dev/null 2>&1; then
	echo "⚠️ npx not found, falling back to python3 http.server (SPA fallback disabled)"
	cd "$TARGET_DIR"
	exec python3 -m http.server "$PORT"
fi

echo "❌ No supported static server found (need npx or python3)"
exit 1
