# 🧪 Code Splitting Test Plan

**Date**: January 22, 2026
**Objective**: Verify route-based code splitting and lazy loading work correctly

---

## ✅ Test Checklist

### 1. Initial Load Test

- [ ] Open `http://localhost:3000`
- [ ] Open DevTools → Network tab → Filter by JS
- [ ] Verify only main bundle and core chunks load initially
- [ ] Expected: ~10-15 JS files, NOT all 50+ chunks
- [ ] Check console for no lazy loading errors

**Expected Result**: ✅ Only essential bundles loaded on homepage

---

### 2. Dashboard Route Test

- [ ] Navigate to `/dashboard`
- [ ] Check Network tab for new chunk downloads
- [ ] Verify `dashboard.chunk.js` loads
- [ ] Verify loading spinner shows briefly (Suspense fallback)
- [ ] Check dashboard renders correctly with all components
- [ ] Verify no console errors

**Expected Result**: ✅ Dashboard chunk loads on-demand

---

### 3. Google Sheets Route Test

- [ ] Navigate to `/google-sheets`
- [ ] Check Network tab for `google-sheets.chunk.js`
- [ ] Verify loading state appears
- [ ] Check Google Sheets integration renders
- [ ] Verify API calls work correctly

**Expected Result**: ✅ Google Sheets chunk loads separately

---

### 4. AI Analytics Route Test

- [ ] Navigate to `/ai-analytics`
- [ ] Check for `ai-analytics.chunk.js` in Network tab
- [ ] Verify AI dashboard loads with charts
- [ ] Check Recharts components render

**Expected Result**: ✅ AI Analytics chunk isolated

---

### 5. Multiple Route Navigation Test

- [ ] Navigate: Home → Dashboard → Google Sheets → AI Analytics → Security
- [ ] Verify each route loads its own chunk once
- [ ] Verify no duplicate chunk downloads
- [ ] Check smooth transitions between routes
- [ ] Verify browser back/forward works correctly

**Expected Result**: ✅ Chunks cached after first load

---

### 6. Chunk Size Verification

Open DevTools Network tab and check sizes:

| Chunk                     | Expected Size                   | Status |
| ------------------------- | ------------------------------- | ------ |
| main.js                   | ~500-600KB                      | ⏳     |
| 714.chunk.js (Ant Design) | ~200-250KB (after tree-shaking) | ⏳     |
| dashboard.chunk.js        | ~15-20KB                        | ⏳     |
| google-sheets.chunk.js    | ~15-20KB                        | ⏳     |
| ai-analytics.chunk.js     | ~20-25KB                        | ⏳     |

**Expected Result**: ✅ Chunks load incrementally, not all at once

---

### 7. Error Boundary Test

- [ ] Try navigating to a route that triggers lazy load
- [ ] Check if error boundary handles chunk load failures gracefully
- [ ] Verify retry mechanism works if available

**Expected Result**: ✅ Graceful error handling

---

### 8. Production Build Test

After `npm run build`:

```bash
# Serve production build
npx serve -s build -l 5000

# Open http://localhost:5000
# Repeat tests 1-5 in production mode
```

- [ ] All chunks load correctly in production
- [ ] Minification applied
- [ ] Gzip compression works
- [ ] No source maps exposed

**Expected Result**: ✅ Production build works identically

---

## 🔍 Network Tab Analysis

### What to Look For:

**✅ Good Signs**:

- Initial load: 10-15 JS files (~1-1.5MB total)
- Route navigation: 1-2 new chunks per route
- Chunks have meaningful names (dashboard, google-sheets, etc.)
- 200 status codes for all chunks
- Chunks cached on repeat visits

**❌ Bad Signs**:

- All 50+ JS files load on initial page load
- 404 errors for chunk files
- Chunks downloading every time (no caching)
- Generic chunk names (123.chunk.js)
- Large main bundle (>700KB)

---

## 📊 Performance Metrics

Open DevTools → Lighthouse → Run Audit

### Target Metrics:

- Performance Score: > 90
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Total Bundle Size: < 2MB

---

## 🐛 Common Issues & Solutions

### Issue: All chunks load immediately

**Solution**: Check React.lazy() usage in App.jsx, ensure Suspense wraps routes

### Issue: Chunk 404 errors

**Solution**: Verify build output, check chunk names match, rebuild

### Issue: No loading spinner between routes

**Solution**: Check Suspense fallback prop, ensure Loading component works

### Issue: Console errors on navigation

**Solution**: Check React Router v7 compatibility, verify all imports

---

## 📝 Test Results Log

| Test             | Status | Notes   | Date   |
| ---------------- | ------ | ------- | ------ |
| Initial Load     | ⏳     | Pending | Jan 22 |
| Dashboard Route  | ⏳     | Pending | Jan 22 |
| Google Sheets    | ⏳     | Pending | Jan 22 |
| AI Analytics     | ⏳     | Pending | Jan 22 |
| Navigation Flow  | ⏳     | Pending | Jan 22 |
| Chunk Sizes      | ⏳     | Pending | Jan 22 |
| Production Build | ⏳     | Pending | Jan 22 |

---

**Next Steps After Testing**:

1. Document any issues found
2. Fix bugs if necessary
3. Measure actual bundle size reduction
4. Update OPTIMIZATION_SUGGESTIONS_V2.md with results
5. Proceed to Phase 1.3: Dynamic Chart Imports
