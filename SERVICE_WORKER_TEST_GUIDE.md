# 🎯 Quick Start - Service Worker Testing

## ⚡ Fast Test (Automated)

```bash
# Run automated test script
./test-service-worker.sh
```

Script sẽ tự động:

- ✅ Build production
- ✅ Start server
- ✅ Open browser
- ✅ Show testing checklist

---

## 🧪 Manual Testing Steps

### 1. Build Production

```bash
npm run build
```

### 2. Serve Build

```bash
npx serve -s build -l 3002
```

### 3. Open Browser

```
http://localhost:3002
```

### 4. Test Service Worker

#### Chrome DevTools:

1. Press **F12** to open DevTools
2. Go to **Application** tab
3. Click **Service Workers** in left sidebar

✅ **Verify**: Service worker is "Activated"

#### Test Offline Mode:

1. In Service Workers panel, check **Offline** checkbox
2. **Refresh page** (Ctrl+R)
3. App should still work! 🎉

#### Check Cache:

1. In Application tab, expand **Cache Storage**
2. You should see:
   - `react-oas-v4.0.0` (static assets)
   - `react-oas-data-v4.0.0` (API cache)

---

## 📱 Test PWA Features

### Add to Home Screen:

1. Look for **install button** in Chrome address bar
2. Click to install
3. App appears on desktop/home screen
4. Opens like native app

### Lighthouse Audit:

1. Open DevTools
2. Go to **Lighthouse** tab
3. Select:
   - ✅ Performance
   - ✅ Progressive Web App
   - ✅ Best Practices
4. Click **Generate report**

**Target Scores**:

- Performance: 90+
- PWA: 100
- Best Practices: 90+

---

## 🐛 Troubleshooting

### Service Worker Not Showing?

```bash
# Clear cache and rebuild
rm -rf build node_modules/.cache
npm run build
npx serve -s build -l 3002
```

### Old Cache Persisting?

In DevTools Application tab:

1. Click **Clear storage**
2. Check all boxes
3. Click **Clear site data**
4. Refresh page

### Update Not Working?

```bash
# Force rebuild
npm run build
```

Then in browser:

1. DevTools → Application → Service Workers
2. Click **Update** button
3. Check **Update on reload**
4. Refresh page

---

## ✅ Success Checklist

- [x] Build completes without errors
- [x] Service worker file exists: `build/service-worker.js`
- [x] Server starts successfully
- [x] Service worker registers and activates
- [x] Offline mode works
- [x] Cache contains files
- [ ] PWA install prompt appears
- [ ] App works standalone
- [ ] Mobile testing complete

---

## 🚀 Next Steps

1. **Deploy to production** (HTTPS required for service worker)
2. **Test on real devices** (iOS, Android)
3. **Monitor cache hit rates**
4. **Optimize caching strategy** as needed

---

**Current Version**: v4.0.0
**Status**: ✅ Ready for Testing
**Updated**: January 22, 2026
