# 🦀 Cargo Integration - Package.json Scripts

## ✅ Đã Thêm

### 1. Scripts Mới trong `package.json`

```json
{
  "scripts": {
    "check:cargo": "cargo --version || echo 'Cargo not found. Install Rust: https://rustup.rs/'",
    "check:tools": "node -e \"const {execSync} = require('child_process'); ['node', 'npm', 'cargo', 'rustc'].forEach(t => { try { execSync(t + ' --version', {stdio: 'ignore'}); console.log('✅', t); } catch(e) { console.log('❌', t, '(not found)'); }});\"",
    "analyze:all": "npm run bundle:stats && npm run perf:bundle && npm run perf:deps"
  }
}
```

### 2. Optional Tools Documentation

```json
{
  "_optionalTools": {
    "cargo": "Rust package manager (optional, for future Rust/WebAssembly integration)",
    "rustc": "Rust compiler (optional, for future Rust/WebAssembly integration)"
  }
}
```

## 🚀 Usage

### Check Cargo Version

```bash
npm run check:cargo
```

**Output**:

```
cargo 1.92.0 (Homebrew)
```

### Check All Tools

```bash
npm run check:tools
```

**Output**:

```
✅ node
✅ npm
✅ cargo
✅ rustc
```

### Run All Analysis

```bash
npm run analyze:all
```

**Runs**:

1. `bundle:stats` - Generate bundle stats
2. `perf:bundle` - Performance bundle analyzer
3. `perf:deps` - Check unused dependencies

## 🔧 Integration với Bundle Stats Script

Script `generate-bundle-stats.js` đã được cập nhật để kiểm tra cargo:

```javascript
// Check optional system tools
log("🔧 Checking optional system tools...", "cyan");
try {
  execSync("cargo --version", { stdio: "ignore" });
  log(`✅ cargo - installed (Rust package manager)`, "green");
} catch (e) {
  log(`⚠️  cargo - not installed (optional, for Rust/WebAssembly)`, "dim");
}
```

## 📋 Future Rust/WebAssembly Integration

Nếu trong tương lai cần tích hợp Rust/WebAssembly, có thể thêm các scripts sau:

```json
{
  "scripts": {
    "build:wasm": "cargo build --target wasm32-unknown-unknown --release",
    "test:rust": "cargo test",
    "check:rust": "cargo check",
    "build:rust": "cargo build --release",
    "analyze:rust": "cargo clippy && cargo audit"
  }
}
```

## 🎯 Use Cases

### 1. Performance Critical Code

- Compile Rust code to WebAssembly
- Integrate with React components
- Use for heavy computations

### 2. Native Modules

- Build native Node.js addons
- Performance-critical backend services
- System-level integrations

### 3. Development Tools

- Rust-based build tools
- Linters and formatters
- Development utilities

## 📚 Resources

- **Rust Installation**: https://rustup.rs/
- **Cargo Book**: https://doc.rust-lang.org/cargo/
- **WebAssembly with Rust**: https://rustwasm.github.io/book/
- **wasm-pack**: https://rustwasm.github.io/wasm-pack/

## ✅ Checklist

- [x] Added `check:cargo` script
- [x] Added `check:tools` script
- [x] Added `analyze:all` script
- [x] Added `_optionalTools` documentation
- [x] Integrated cargo check in bundle stats script
- [ ] Future: Add Rust/WebAssembly build scripts (when needed)
- [ ] Future: Add Rust test scripts (when needed)
- [ ] Future: Add wasm-pack integration (when needed)

---

**Date**: December 25, 2025  
**Status**: ✅ **Integrated**  
**Version**: Cargo 1.92.0
