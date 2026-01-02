#!/bin/bash

# 🚀 React OAS Integration v4.0 - Deploy Main (Wrapper)
# Wrapper script to run main deployment from root directory

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec "$SCRIPT_DIR/scripts/deploy/deploy-main.sh" "$@"
