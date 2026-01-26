# 📊 Optimization Guide - React Scripts + Webpack

> **Updated**: January 26, 2026
> **Status**: v4.0 Production Ready
> **Stack**: React 18 + Webpack 5 + Ant Design 5

---

## 🎯 Current Bundle Status

| Metric               | Current  | Target   | Status    |
| -------------------- | -------- | -------- | --------- |
| **Total JS**         | 2.29 MB  | < 1.0 MB | 🔴 High   |
| **Total CSS**        | 92.70 KB | < 80 KB  | 🟡 Medium |
| **Main Chunk**       | 695 KB   | < 300 KB | 🔴 High   |
| **Largest 5 Chunks** | 1.3 MB   | < 500 KB | 🔴 High   |

---

## 1️⃣ Code Splitting Strategies (React Scripts)

### Route-Based Code Splitting

```javascript
// src/routes/index.jsx
import { lazy, Suspense } from "react";
import { Spin } from "antd";

// Import heavy route components with lazy()
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Reports = lazy(() => import("../pages/Reports"));
const Analytics = lazy(() => import("../pages/Analytics"));
const AdminPanel = lazy(() => import("../pages/AdminPanel"));
const Settings = lazy(() => import("../pages/Settings"));

// Loading fallback component
const LoadingFallback = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    <Spin size="large" tip="Loading..." />
  </div>
);

// Router configuration
export const routes = [
  {
    path: "/dashboard",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Dashboard />
      </Suspense>
    ),
  },
  {
    path: "/reports",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Reports />
      </Suspense>
    ),
  },
  {
    path: "/analytics",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Analytics />
      </Suspense>
    ),
  },
  {
    path: "/admin",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AdminPanel />
      </Suspense>
    ),
  },
  {
    path: "/settings",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Settings />
      </Suspense>
    ),
  },
];
```

### Component-Level Code Splitting

```javascript
// src/hooks/useLazyComponent.js
import { lazy, Suspense } from "react";

/**
 * Hook to lazy load heavy components on demand
 * Prevents initial bundle bloat
 */
export const useLazyComponent = (componentPath) => {
  const LazyComponent = lazy(() => import(componentPath));

  return ({ fallback = null, ...props }) => (
    <Suspense fallback={fallback || <div>Loading component...</div>}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

// Usage
const HeavyChart = useLazyComponent("../components/charts/HeavyChart");
const AdvancedTable = useLazyComponent("../components/tables/AdvancedTable");
const RichEditor = useLazyComponent("../components/editors/RichEditor");
```

### Feature Module Code Splitting

```javascript
// src/hooks/useFeatureModule.js
import { lazy, Suspense, useState, useEffect } from "react";

export const useFeatureModule = (modulePath, isEnabled = true) => {
  const [Module, setModule] = useState(null);
  const [loading, setLoading] = useState(isEnabled);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isEnabled) return;

    // Load module dynamically only when enabled
    import(modulePath)
      .then((mod) => setModule(mod.default))
      .catch((err) => {
        console.error(`Failed to load module ${modulePath}:`, err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [modulePath, isEnabled]);

  return { Module, loading, error };
};

// Usage: Load Google Drive integration only if user has permission
const { Module: GoogleDriveUI } = useFeatureModule(
  "../features/google-drive",
  userHasGoogleDriveAccess
);
```

---

## 2️⃣ Ant Design Optimization

### Selective Component Imports

```javascript
// ❌ WRONG - Imports entire antd bundle
import { Button, Form, Table, Select, Modal } from "antd";

// ✅ RIGHT - Import only what you need
import Button from "antd/es/button";
import Form from "antd/es/form";
import Table from "antd/es/table";
import Select from "antd/es/select";
import Modal from "antd/es/modal";

// Even better with tree-shaking
import Button from "antd/lib/button";
```

### Icon Import Optimization

```javascript
// ❌ WRONG - Imports ALL icons (500KB+)
import * as Icons from "@ant-design/icons";
// Then use: <Icons.UserOutlined />

// ✅ RIGHT - Import specific icons only
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  DashboardOutlined,
} from "@ant-design/icons";

// Usage
export const IconMap = {
  user: <UserOutlined />,
  settings: <SettingOutlined />,
  logout: <LogoutOutlined />,
  dashboard: <DashboardOutlined />,
};
```

### Dynamic Icon Loading

```javascript
// src/utils/iconLoader.js
const iconMap = {};

export const loadIcon = async (iconName) => {
  if (iconMap[iconName]) return iconMap[iconName];

  try {
    const { default: Icon } = await import(`@ant-design/icons/lib/${iconName}`);
    iconMap[iconName] = Icon;
    return Icon;
  } catch (err) {
    console.warn(`Icon ${iconName} not found`);
    return null;
  }
};

// Usage with React.lazy
const DynamicIcon = lazy(() => loadIcon("UserOutlined").then((Icon) => ({ default: Icon })));
```

---

## 3️⃣ Webpack Configuration Optimization

### Built-in React Scripts Optimization

```javascript
// .env (Environment variables)
GENERATE_SOURCEMAP=false  # Reduces build size
SKIP_PREFLIGHT_CHECK=true # Speed up build
BROWSER=none              # Don't auto-open browser in dev
```

### Manual webpack.config.js Enhancements

```javascript
// webpack.config.js (already configured in project)
// Key optimizations already in place:

// 1. Code splitting with SplitChunks
optimization: {
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      react: { // React + React-DOM in separate chunk
        test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
        name: 'vendor-react',
        priority: 20,
      },
      antd: { // Ant Design in separate chunk
        test: /[\\/]node_modules[\\/](antd|@ant-design)[\\/]/,
        name: 'vendor-antd',
        priority: 15,
      },
      google: { // Google APIs in separate chunk
        test: /[\\/]node_modules[\\/](googleapis|google-auth-library)[\\/]/,
        name: 'vendor-google',
        priority: 10,
      },
      charts: { // Charts library in separate chunk
        test: /[\\/]node_modules[\\/](recharts|chart\.js)[\\/]/,
        name: 'vendor-charts',
        priority: 10,
      },
      vendor: { // Other vendors
        test: /[\\/]node_modules[\\/]/,
        name: 'vendor',
        priority: 5,
      },
      common: { // Common code between chunks
        minChunks: 2,
        priority: 1,
      },
    },
  },
  minimizer: [new TerserPlugin(...)], // JS minification
  runtimeChunk: 'single', // Runtime in separate file
}

// 2. Compression
new CompressionPlugin({
  algorithm: 'gzip',
  test: /\.(js|css|html|svg)$/,
  threshold: 8192,
})

// 3. Source maps disabled in production
devtool: isProduction ? false : 'eval-source-map'
```

---

## 4️⃣ Library-Specific Optimizations

### Recharts (Charts Library)

```javascript
// ❌ Load entire recharts on every page
import { LineChart, BarChart, PieChart } from "recharts";

// ✅ Lazy load only when needed
const LineChart = lazy(() => import("recharts").then((mod) => ({ default: mod.LineChart })));
const BarChart = lazy(() => import("recharts").then((mod) => ({ default: mod.BarChart })));

// Usage
const DashboardChart = () => (
  <Suspense fallback={<div>Loading chart...</div>}>
    <LineChart data={data} />
  </Suspense>
);
```

### Socket.io Client Optimization

```javascript
// ❌ Import at top level
import io from "socket.io-client";

// ✅ Lazy initialize only when needed
let socket = null;

export const getSocketConnection = async () => {
  if (socket) return socket;

  const { default: io } = await import("socket.io-client");
  socket = io(process.env.REACT_APP_API_URL, {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
  });

  return socket;
};

// Usage
useEffect(() => {
  getSocketConnection().then((socket) => {
    socket.on("update", handleUpdate);
    return () => socket.off("update");
  });
}, []);
```

### Google APIs Optimization

```javascript
// ❌ Load entire googleapis library (500KB)
import { google } from "googleapis";

// ✅ Use backend proxy for Google APIs
// Keep google-auth-library for auth only, move data fetching to backend

// Frontend: Only handle authentication
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// src/services/googleSheetsService.js
export const fetchGoogleSheets = async (spreadsheetId, range) => {
  // Call your backend API instead
  const response = await api.get("/api/google-sheets", {
    params: { spreadsheetId, range },
  });
  return response.data;
};

// This reduces bundle size by 300-400KB!
```

---

## 5️⃣ Performance Monitoring

### npm Scripts for Monitoring

```json
{
  "scripts": {
    "perf:deps": "npx depcheck",
    "perf:bundle": "node scripts/perf-bundle-analyzer.js",
    "perf:size": "npx size-limit",
    "analyze:all": "npm run bundle:stats && npm run perf:bundle && npm run perf:deps",
    "build:analyze": "GENERATE_SOURCEMAP=true react-scripts build && npm run analyze"
  }
}
```

### Bundle Size Monitoring

```bash
# Generate bundle analysis
npm run perf:bundle

# Check bundle size
npm run perf:size

# Run full analysis
npm run analyze:all

# Check for unused dependencies
npm run perf:deps
```

---

## 6️⃣ Immediate Action Items

### Phase 1: Quick Wins (1-2 hours)

- [ ] Add `GENERATE_SOURCEMAP=false` to `.env`
- [ ] Update Ant Design imports in top components
- [ ] Lazy load Reports, Analytics, Admin pages
- [ ] Test: `npm run build:prod && npm run perf:bundle`

### Phase 2: Medium Effort (4-8 hours)

- [ ] Implement selective icon imports
- [ ] Add lazy loading for Recharts
- [ ] Move Google API calls to backend
- [ ] Test with: `npm run analyze:all`

### Phase 3: Advanced (1-2 days)

- [ ] Implement dynamic component loading system
- [ ] Add service worker for caching
- [ ] Setup performance monitoring
- [ ] Implement route prefetching

---

## 7️⃣ Webpack Config Customization

### Using CRACO (if needed)

If you need to customize webpack without ejecting:

```bash
npm install @craco/craco
```

```javascript
// craco.config.js
module.exports = {
  webpack: {
    configure: (config) => {
      // Custom webpack optimizations
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          // Your custom cache groups
        },
      };
      return config;
    },
  },
};
```

---

## 8️⃣ Metrics & Targets

### Current → Target

| Metric           | Current     | Target         | Diff               | Priority     |
| ---------------- | ----------- | -------------- | ------------------ | ------------ |
| Main Chunk       | 695 KB      | 250 KB         | -445 KB            | HIGH         |
| Vendor React     | ~250 KB     | ~200 KB        | -50 KB             | MED          |
| Vendor Antd      | ~200 KB     | ~150 KB        | -50 KB             | MED          |
| Vendor Google    | ~500 KB     | 100 KB (proxy) | -400 KB            | HIGH         |
| Total JS         | 2.29 MB     | ~1.0 MB        | -1.29 MB           | HIGH         |
| Total CSS        | 92.70 KB    | 60 KB          | -32 KB             | LOW          |
| **Total Bundle** | **2.38 MB** | **~1.06 MB**   | **-1.32 MB (55%)** | **CRITICAL** |

---

## 9️⃣ Testing Build Performance

```bash
# Development build with analysis
npm run build:analyze

# Production build (optimized)
npm run build:prod

# Analyze bundle
npm run analyze:all

# Check for issues
npm run perf:bundle
npm run perf:deps

# Size limit check
npm run perf:size
```

---

## 🔟 CI/CD Integration

### GitHub Actions Check

```yaml
# .github/workflows/performance.yml
name: Performance Check

on:
  push:
    branches: [main]
  pull_request:

jobs:
  bundle-analysis:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm ci

      - name: Build production
        run: npm run build:prod

      - name: Analyze bundle
        run: npm run perf:bundle

      - name: Check dependencies
        run: npm run perf:deps
```

---

## 📝 Summary

**Key Optimizations:**

1. ✅ Route-based code splitting (5 main chunks → 8+ smaller chunks)
2. ✅ Selective Ant Design imports (saves 30-50%)
3. ✅ Icon lazy loading (saves 300-400KB)
4. ✅ Backend proxy for Google APIs (saves 300-400KB)
5. ✅ Webpack code splitting configuration (already in place)

**Expected Impact:**

- Bundle size: 2.38 MB → ~1.0 MB (58% reduction)
- Initial load: 3-5s → 1-2s
- Core Web Vitals: Improved LCP, FCP

**Next Steps:**

1. Implement Phase 1 quick wins today
2. Run bundle analysis: `npm run analyze:all`
3. Monitor CI/CD pipeline with performance checks
4. Schedule Phase 2 improvements for this week

---

**Generated**: January 26, 2026
**Last Updated**: 2026-01-26
**Status**: Ready for Implementation
