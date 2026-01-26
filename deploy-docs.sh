#!/bin/bash

# =============================================================================
# 📚 Markdown Documentation Deployment Script
# =============================================================================
# Deploys all markdown documentation to various platforms
# Supports: GitHub Pages, Vercel, Netlify, Static hosting
# =============================================================================

set -euo pipefail

# Colors for output
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly RED='\033[0;31m'
readonly CYAN='\033[0;36m'
readonly MAGENTA='\033[0;35m'
readonly NC='\033[0m'

# Configuration
readonly PROJECT_NAME="react-oas-integration"
readonly VERSION="4.0"
readonly TIMESTAMP=$(date +%Y%m%d_%H%M%S)
readonly DOCS_DIR="docs"
readonly MARKDOWN_DIR="."
readonly BUILD_DIR="build-docs"
readonly OUTPUT_DIR="dist-docs"

# Logging functions
log_header() {
    echo -e "${CYAN}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║${NC} $1"
    echo -e "${CYAN}╚════════════════════════════════════════════════════════════╝${NC}"
}

log_info() {
    echo -e "${GREEN}✓${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}⚠${NC} $1"
}

log_error() {
    echo -e "${RED}✗${NC} $1"
}

log_step() {
    echo -e "\n${BLUE}▶${NC} $1"
}

log_success() {
    echo -e "${GREEN}════════════════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}✓ SUCCESS: $1${NC}"
    echo -e "${GREEN}════════════════════════════════════════════════════════════${NC}"
}

# Print banner
show_banner() {
    echo -e "${MAGENTA}"
    echo "╔════════════════════════════════════════════════════════════╗"
    echo "║          📚 Markdown Documentation Deployment              ║"
    echo "║                 React OAS Integration v${VERSION}              ║"
    echo "╚════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

# Check prerequisites
check_prerequisites() {
    log_step "Checking prerequisites..."

    local missing_tools=()

    # Check Node.js
    if ! command -v node &> /dev/null; then
        missing_tools+=("node")
    else
        log_info "Node.js: $(node --version)"
    fi

    # Check npm
    if ! command -v npm &> /dev/null; then
        missing_tools+=("npm")
    else
        log_info "npm: $(npm --version)"
    fi

    # Check git
    if ! command -v git &> /dev/null; then
        missing_tools+=("git")
    else
        log_info "git: $(git --version | head -1)"
    fi

    if [ ${#missing_tools[@]} -ne 0 ]; then
        log_error "Missing required tools: ${missing_tools[*]}"
        exit 1
    fi

    log_info "All prerequisites met"
}

# Create documentation structure
create_docs_structure() {
    log_step "Creating documentation structure..."

    # Create directories
    mkdir -p "$BUILD_DIR"
    mkdir -p "$OUTPUT_DIR"
    mkdir -p "$OUTPUT_DIR/guides"
    mkdir -p "$OUTPUT_DIR/api"
    mkdir -p "$OUTPUT_DIR/tutorials"

    log_info "Created directories: $BUILD_DIR, $OUTPUT_DIR"
}

# Copy and organize markdown files
organize_markdown_files() {
    log_step "Organizing markdown files..."

    # Copy root-level markdown files
    cp -v ARCHITECTURE_GUIDE.md "$OUTPUT_DIR/" 2>/dev/null || log_warn "ARCHITECTURE_GUIDE.md not found"
    cp -v ARCHITECTURE.md "$OUTPUT_DIR/" 2>/dev/null || log_warn "ARCHITECTURE.md not found"
    cp -v README.md "$OUTPUT_DIR/" 2>/dev/null || log_warn "README.md not found"
    cp -v DEPLOYMENT_GUIDE.md "$OUTPUT_DIR/" 2>/dev/null || log_warn "DEPLOYMENT_GUIDE.md not found"

    # Copy guide files
    cp -v DEVELOPMENT_TOOLS_SETUP.md "$OUTPUT_DIR/guides/" 2>/dev/null || true
    cp -v BUNDLE_OPTIMIZATION_GUIDE.md "$OUTPUT_DIR/guides/" 2>/dev/null || true
    cp -v GITHUB_SETUP_GUIDE.md "$OUTPUT_DIR/guides/" 2>/dev/null || true
    cp -v GOOGLE_SHEETS_SETUP_GUIDE.md "$OUTPUT_DIR/guides/" 2>/dev/null || true

    # Copy docs folder content
    if [ -d "$DOCS_DIR" ]; then
        cp -rv "$DOCS_DIR"/* "$OUTPUT_DIR/" 2>/dev/null || true
    fi

    log_info "Markdown files organized in $OUTPUT_DIR"
}

# Generate table of contents
generate_table_of_contents() {
    log_step "Generating table of contents..."

    local toc_file="$OUTPUT_DIR/INDEX.md"

    cat > "$toc_file" << 'EOF'
# 📚 Documentation Index

> React OAS Integration v4.0 - Complete Documentation

**Last Updated**: January 26, 2026

---

## 🏗️ Architecture & Design

- [ARCHITECTURE_GUIDE.md](./ARCHITECTURE_GUIDE.md) - Complete system architecture and component responsibilities
- [ARCHITECTURE.md](./ARCHITECTURE.md) - High-level architecture overview
- [ARCHITECTURE_GUIDE_COMPARISON.md](./ARCHITECTURE_GUIDE_COMPARISON.md) - Architecture comparison and evolution

---

## 🚀 Getting Started

- [README.md](./README.md) - Project overview and quick start guide
- [QUICK_START_GITHUB.md](./QUICK_START_GITHUB.md) - GitHub quick start guide
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Deployment instructions

---

## 🛠️ Development & Tools

### Setup & Configuration
- [guides/DEVELOPMENT_TOOLS_SETUP.md](./guides/DEVELOPMENT_TOOLS_SETUP.md) - Development tools setup
- [guides/GITHUB_SETUP_GUIDE.md](./guides/GITHUB_SETUP_GUIDE.md) - GitHub configuration guide

### Bundle & Performance
- [guides/BUNDLE_OPTIMIZATION_GUIDE.md](./guides/BUNDLE_OPTIMIZATION_GUIDE.md) - Bundle optimization strategies
- [BUNDLE_OPTIMIZATION_ROADMAP.md](./BUNDLE_OPTIMIZATION_ROADMAP.md) - Optimization roadmap
- [BUNDLE_STATS_AUTO_FIX.md](./BUNDLE_STATS_AUTO_FIX.md) - Bundle statistics fixes

### Integration & API
- [guides/GOOGLE_SHEETS_SETUP_GUIDE.md](./guides/GOOGLE_SHEETS_SETUP_GUIDE.md) - Google Sheets integration
- [GOOGLE_SHEETS_IMPROVEMENTS.md](./GOOGLE_SHEETS_IMPROVEMENTS.md) - Sheets improvements
- [GOOGLE_DRIVE_IMPLEMENTATION_COMPLETE.md](./GOOGLE_DRIVE_IMPLEMENTATION_COMPLETE.md) - Google Drive setup

---

## 📊 Analysis & Reports

### Backend Analysis
- [BACKEND_ANALYSIS.md](./BACKEND_ANALYSIS.md) - Backend architecture analysis
- [BACKEND_VS_AUTOMATION_ANALYSIS.md](./BACKEND_VS_AUTOMATION_ANALYSIS.md) - Backend vs Automation comparison
- [FRONTEND_BACKEND_CONNECTION_ANALYSIS.md](./FRONTEND_BACKEND_CONNECTION_ANALYSIS.md) - Frontend-Backend connection

### Services Analysis
- [COMPREHENSIVE_SERVICES_ANALYSIS.md](./COMPREHENSIVE_SERVICES_ANALYSIS.md) - Complete services analysis
- [GOOGLE_SHEETS_BACKEND_FRONTEND_CONNECTION.md](./GOOGLE_SHEETS_BACKEND_FRONTEND_CONNECTION.md) - Google Sheets integration

---

## ✅ Completion & Status

### Session Updates & Summaries
- [COMPLETE_WORK_SUMMARY.md](./COMPLETE_WORK_SUMMARY.md) - Complete work summary
- [FINAL_INTEGRATION_ROADMAP.md](./FINAL_INTEGRATION_ROADMAP.md) - Final integration roadmap
- [FINAL_SETUP_SUMMARY.md](./FINAL_SETUP_SUMMARY.md) - Final setup summary
- [CLEANUP_SUMMARY.md](./CLEANUP_SUMMARY.md) - Cleanup summary

### Recent Fixes & Updates
- [FIXES_COMPLETED.md](./FIXES_COMPLETED.md) - Completed fixes
- [FIX_CHUNK_ERRORS.md](./FIX_CHUNK_ERRORS.md) - Chunk error fixes
- [ESLINT_FIXES_SUMMARY.md](./ESLINT_FIXES_SUMMARY.md) - ESLint fixes summary

---

## 🔧 CI/CD & DevOps

- [CICD.md](./CICD.md) - CI/CD pipeline documentation
- [CONFIG_UPGRADE_SUMMARY.md](./CONFIG_UPGRADE_SUMMARY.md) - Configuration upgrades
- [DEPLOY_PREPARATION.md](./DEPLOY_PREPARATION.md) - Deployment preparation

---

## 🎓 Guides & Tutorials

### Optimization
- [BUNDLE_OPTIMIZATION_SESSION_UPDATE.md](./BUNDLE_OPTIMIZATION_SESSION_UPDATE.md) - Session update
- [OPTIMIZATION_GUIDE.md](./OPTIMIZATION_GUIDE.md) - Optimization techniques

### Integration Guides
- [GOOGLE_API_FIX.md](./GOOGLE_API_FIX.md) - Google API fixes
- [GOOGLE_DRIVE_CONNECTION_ANALYSIS.md](./GOOGLE_DRIVE_CONNECTION_ANALYSIS.md) - Google Drive connection

---

## 📈 Metrics & Performance

- [HEALTH_CHECK_GUIDE.md](./HEALTH_CHECK_GUIDE.md) - Health check procedures
- [DEVELOPMENT_TOOLS_SUMMARY.md](./DEVELOPMENT_TOOLS_SUMMARY.md) - Tools summary

---

## 📋 Project Management

- [DOCUMENTATION_CHECKLIST.md](./DOCUMENTATION_CHECKLIST.md) - Documentation checklist
- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - Implementation summary

---

## 🌍 External Resources

- [Google Sheets Sample Data](./google_sheets_sample_data.json) - Sample data for Google Sheets
- [Google Drive Folder ID](./GOOGLE_DRIVE_FOLDER_ID.md) - Google Drive setup

---

## 📞 Support & Contact

For issues or questions, please refer to:
- Main Documentation: [ARCHITECTURE_GUIDE.md](./ARCHITECTURE_GUIDE.md)
- Deployment Guide: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- GitHub Issues: See repository issues tab

---

**Version**: 4.0
**Last Updated**: January 26, 2026
**Status**: ✅ 100% Complete
EOF

    log_info "Table of contents generated: $toc_file"
}

# Create GitHub Pages configuration
create_github_pages_config() {
    log_step "Creating GitHub Pages configuration..."

    local pages_config="$OUTPUT_DIR/_config.yml"

    cat > "$pages_config" << 'EOF'
# GitHub Pages Configuration
title: React OAS Integration Documentation
description: Complete documentation for React OAS Integration v4.0
author: Development Team
url: https://phuccao.github.io/React-OAS-Integration-v4.01212
baseurl: /React-OAS-Integration-v4.01212

# Theme
theme: jekyll-theme-slate
markdown: kramdown

# Navigation
navigation:
  - title: Home
    url: /
  - title: Architecture
    url: /ARCHITECTURE_GUIDE.md
  - title: Deployment
    url: /DEPLOYMENT_GUIDE.md
  - title: Guides
    url: /guides

# Build settings
exclude:
  - .gitignore
  - .github
  - node_modules
  - Gemfile
  - Gemfile.lock

# Plugins
plugins:
  - jekyll-feed
  - jekyll-sitemap
EOF

    log_info "GitHub Pages configuration created: $pages_config"
}

# Create deployment index HTML
create_html_index() {
    log_step "Creating HTML index for documentation..."

    local html_file="$OUTPUT_DIR/index.html"

    cat > "$html_file" << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React OAS Integration v4.0 - Documentation</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            padding: 40px;
        }
        header {
            text-align: center;
            margin-bottom: 40px;
            border-bottom: 3px solid #667eea;
            padding-bottom: 20px;
        }
        h1 {
            color: #667eea;
            font-size: 2.5em;
            margin-bottom: 10px;
        }
        .subtitle {
            color: #666;
            font-size: 1.1em;
        }
        .status {
            display: inline-block;
            background: #4CAF50;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            margin-top: 10px;
            font-weight: bold;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        .card {
            background: #f8f9fa;
            border: 2px solid #e9ecef;
            border-radius: 8px;
            padding: 20px;
            transition: all 0.3s ease;
        }
        .card:hover {
            border-color: #667eea;
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2);
        }
        .card h3 {
            color: #667eea;
            margin-bottom: 10px;
        }
        .card ul {
            list-style: none;
        }
        .card li {
            padding: 8px 0;
            border-bottom: 1px solid #e9ecef;
        }
        .card li:last-child {
            border-bottom: none;
        }
        .card a {
            color: #667eea;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s ease;
        }
        .card a:hover {
            color: #764ba2;
            text-decoration: underline;
        }
        footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
            color: #666;
        }
        .quick-links {
            display: flex;
            justify-content: center;
            gap: 15px;
            flex-wrap: wrap;
            margin: 20px 0;
        }
        .btn {
            display: inline-block;
            padding: 10px 20px;
            background: #667eea;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            transition: background 0.3s ease;
        }
        .btn:hover {
            background: #764ba2;
        }
        .timestamp {
            color: #999;
            font-size: 0.9em;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>📚 React OAS Integration v4.0</h1>
            <p class="subtitle">Complete System Documentation & Guides</p>
            <div class="status">✅ 100% Complete</div>
            <p class="timestamp">Last Updated: January 26, 2026</p>
        </header>

        <div class="quick-links">
            <a href="ARCHITECTURE_GUIDE.md" class="btn">🏗️ Architecture</a>
            <a href="DEPLOYMENT_GUIDE.md" class="btn">🚀 Deployment</a>
            <a href="INDEX.md" class="btn">📖 Full Index</a>
            <a href="README.md" class="btn">📋 README</a>
        </div>

        <div class="grid">
            <div class="card">
                <h3>🏗️ Architecture & Design</h3>
                <ul>
                    <li><a href="ARCHITECTURE_GUIDE.md">System Architecture Guide</a></li>
                    <li><a href="ARCHITECTURE.md">High-level Architecture</a></li>
                    <li><a href="FRONTEND_BACKEND_CONNECTION_ANALYSIS.md">Frontend-Backend Connection</a></li>
                </ul>
            </div>

            <div class="card">
                <h3>🚀 Deployment & DevOps</h3>
                <ul>
                    <li><a href="DEPLOYMENT_GUIDE.md">Deployment Instructions</a></li>
                    <li><a href="DEPLOY_PREPARATION.md">Deployment Preparation</a></li>
                    <li><a href="CICD.md">CI/CD Pipeline</a></li>
                </ul>
            </div>

            <div class="card">
                <h3>🛠️ Development Tools</h3>
                <ul>
                    <li><a href="guides/DEVELOPMENT_TOOLS_SETUP.md">Tools Setup Guide</a></li>
                    <li><a href="guides/BUNDLE_OPTIMIZATION_GUIDE.md">Bundle Optimization</a></li>
                    <li><a href="guides/GITHUB_SETUP_GUIDE.md">GitHub Setup</a></li>
                </ul>
            </div>

            <div class="card">
                <h3>🔧 Integration Guides</h3>
                <ul>
                    <li><a href="guides/GOOGLE_SHEETS_SETUP_GUIDE.md">Google Sheets Integration</a></li>
                    <li><a href="GOOGLE_DRIVE_IMPLEMENTATION_COMPLETE.md">Google Drive Setup</a></li>
                    <li><a href="GOOGLE_API_FIX.md">Google API Configuration</a></li>
                </ul>
            </div>

            <div class="card">
                <h3>📊 Analysis & Reports</h3>
                <ul>
                    <li><a href="BACKEND_ANALYSIS.md">Backend Analysis</a></li>
                    <li><a href="COMPREHENSIVE_SERVICES_ANALYSIS.md">Services Analysis</a></li>
                    <li><a href="BUNDLE_OPTIMIZATION_ROADMAP.md">Optimization Roadmap</a></li>
                </ul>
            </div>

            <div class="card">
                <h3>✅ Completion & Status</h3>
                <ul>
                    <li><a href="COMPLETE_WORK_SUMMARY.md">Work Summary</a></li>
                    <li><a href="FINAL_SETUP_SUMMARY.md">Setup Summary</a></li>
                    <li><a href="FIXES_COMPLETED.md">Completed Fixes</a></li>
                </ul>
            </div>
        </div>

        <footer>
            <p><strong>React OAS Integration v4.0</strong> | Development Documentation</p>
            <p>Generated: January 26, 2026 | Status: ✅ 100% Complete</p>
            <p>For issues or questions, refer to <a href="README.md">README.md</a> or <a href="ARCHITECTURE_GUIDE.md">ARCHITECTURE_GUIDE.md</a></p>
        </footer>
    </div>
</body>
</html>
EOF

    log_info "HTML index created: $html_file"
}

# Validate markdown files
validate_markdown_files() {
    log_step "Validating markdown files..."

    local md_count=$(find "$OUTPUT_DIR" -name "*.md" -type f | wc -l)
    local html_count=$(find "$OUTPUT_DIR" -name "*.html" -type f | wc -l)

    log_info "Found $md_count markdown files"
    log_info "Found $html_count HTML files"

    if [ $md_count -eq 0 ]; then
        log_warn "No markdown files found in $OUTPUT_DIR"
    else
        log_success "Markdown validation complete"
    fi
}

# Generate deployment report
generate_deployment_report() {
    log_step "Generating deployment report..."

    local report_file="$OUTPUT_DIR/DEPLOYMENT_REPORT.md"

    cat > "$report_file" << EOF
# 📋 Documentation Deployment Report

**Generated**: $(date '+%Y-%m-%d %H:%M:%S')
**Version**: 4.0
**Status**: ✅ Complete

---

## 📊 Statistics

- **Total Markdown Files**: $(find "$OUTPUT_DIR" -name "*.md" -type f | wc -l)
- **Total HTML Files**: $(find "$OUTPUT_DIR" -name "*.html" -type f | wc -l)
- **Output Directory**: $OUTPUT_DIR
- **Build Directory**: $BUILD_DIR

---

## 📁 Directory Structure

\`\`\`
$OUTPUT_DIR/
├── ARCHITECTURE_GUIDE.md
├── DEPLOYMENT_GUIDE.md
├── README.md
├── INDEX.md
├── index.html
├── _config.yml
├── guides/
│   ├── DEVELOPMENT_TOOLS_SETUP.md
│   ├── BUNDLE_OPTIMIZATION_GUIDE.md
│   └── GITHUB_SETUP_GUIDE.md
└── [other documentation files...]
\`\`\`

---

## 🚀 Deployment Options

### 1. GitHub Pages
\`\`\`bash
git add -A
git commit -m "Deploy documentation"
git push origin gh-pages
\`\`\`

### 2. Vercel
\`\`\`bash
vercel --prod
\`\`\`

### 3. Netlify
\`\`\`bash
netlify deploy --prod --dir=$OUTPUT_DIR
\`\`\`

### 4. Static Server
Copy \`$OUTPUT_DIR\` to your web server root directory.

---

## ✅ Completed Tasks

- ✅ Created documentation structure
- ✅ Organized markdown files
- ✅ Generated table of contents
- ✅ Created GitHub Pages configuration
- ✅ Generated HTML index
- ✅ Validated markdown files
- ✅ Generated deployment report

---

## 📞 Next Steps

1. Review the documentation in \`$OUTPUT_DIR\`
2. Choose a deployment platform (GitHub Pages, Vercel, or Netlify)
3. Run the appropriate deployment command
4. Verify the documentation is accessible online

---

**Documentation Version**: 4.0
**Project**: React OAS Integration
**Date**: January 26, 2026
EOF

    log_info "Deployment report generated: $report_file"
}

# Git operations
git_operations() {
    log_step "Preparing for git operations..."

    if [ ! -d ".git" ]; then
        log_warn "Git repository not initialized"
        return
    fi

    # Ensure docs are tracked
    if [ -d "$OUTPUT_DIR" ]; then
        log_info "Git is ready for documentation deployment"
    fi
}

# Main deployment
deploy_documentation() {
    log_step "Preparing for deployment..."

    local deploy_choice=${1:-interactive}

    log_info "Documentation is ready in: $OUTPUT_DIR"
    echo ""
    echo -e "${CYAN}Deployment Options:${NC}"
    echo "1. GitHub Pages (gh-pages branch)"
    echo "2. Vercel (automatic)"
    echo "3. Netlify (CLI required)"
    echo "4. Serve locally (for testing)"
    echo "5. Manual (copy files yourself)"
    echo ""

    if [ "$deploy_choice" = "interactive" ]; then
        read -p "Select deployment option (1-5): " option
    else
        option=$deploy_choice
    fi

    case $option in
        1)
            log_info "To deploy to GitHub Pages, run:"
            echo "  git checkout --orphan gh-pages"
            echo "  git rm -rf ."
            echo "  cp -r $OUTPUT_DIR/* ."
            echo "  git add -A"
            echo "  git commit -m 'Deploy documentation'"
            echo "  git push origin gh-pages"
            ;;
        2)
            log_info "To deploy to Vercel, run: vercel --prod --scope=phuccao"
            ;;
        3)
            log_info "To deploy to Netlify, run: netlify deploy --prod --dir=$OUTPUT_DIR"
            ;;
        4)
            log_info "Serving documentation locally..."
            if command -v python3 &> /dev/null; then
                cd "$OUTPUT_DIR"
                log_info "Starting server at http://localhost:8000"
                python3 -m http.server 8000
            else
                log_warn "Python3 not found for local serving"
            fi
            ;;
        5)
            log_info "Documentation is ready in: $OUTPUT_DIR"
            log_info "Copy the contents to your web server"
            ;;
        *)
            log_error "Invalid option"
            exit 1
            ;;
    esac
}

# Cleanup
cleanup() {
    log_step "Cleaning up temporary files..."
    rm -rf "$BUILD_DIR"
    log_info "Cleanup complete"
}

# Main execution
main() {
    show_banner
    check_prerequisites
    create_docs_structure
    organize_markdown_files
    generate_table_of_contents
    create_github_pages_config
    create_html_index
    validate_markdown_files
    generate_deployment_report
    git_operations
    cleanup

    log_success "Documentation deployment preparation complete!"
    echo ""
    echo -e "${CYAN}Documentation Location: ${OUTPUT_DIR}${NC}"
    echo -e "${CYAN}Documentation Index: ${OUTPUT_DIR}/index.html${NC}"
    echo ""

    deploy_documentation "${1:-interactive}"
}

# Run main
main "$@"
