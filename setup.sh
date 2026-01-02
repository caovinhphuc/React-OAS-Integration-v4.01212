#!/bin/bash

# 🚀 React OAS Integration v4.0 - Setup (Wrapper)
# Wrapper script to run setup from root directory

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Check if scripts/setup/main-setup.sh exists, otherwise use old setup.sh logic
if [ -f "$SCRIPT_DIR/scripts/setup/main-setup.sh" ]; then
    exec "$SCRIPT_DIR/scripts/setup/main-setup.sh" "$@"
else
    # Fallback to old setup.sh if exists
    if [ -f "$SCRIPT_DIR/setup.sh.old" ]; then
        exec "$SCRIPT_DIR/setup.sh.old" "$@"
    else
        echo "❌ Setup script not found!"
        exit 1
    fi
fi
