#!/bin/bash

# 🛑 React OAS Integration v4.0 - Stop All Services (Wrapper)
# Wrapper script to stop all services from root directory

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec "$SCRIPT_DIR/scripts/start-stop/stop-all.sh" "$@"

