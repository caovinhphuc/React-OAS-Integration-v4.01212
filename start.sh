#!/bin/bash

# 🚀 React OAS Integration v4.0 - Start All Services (Wrapper)
# Wrapper script to start all services from root directory

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec "$SCRIPT_DIR/scripts/start-stop/start-all.sh" "$@"

