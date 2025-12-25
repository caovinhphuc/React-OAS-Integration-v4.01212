# 🔧 WebSocket Subscribe Fix - LiveDashboard

## ❌ Vấn đề

```
ERROR
subscribe is not a function
TypeError: subscribe is not a function
    at http://localhost:3002/static/js/src_components_Dashboard_LiveDashboard_jsx.chunk.js:251:32
```

**File bị lỗi**: `src/components/Dashboard/LiveDashboard.jsx`

## 🔍 Nguyên nhân

Hook `useWebSocket` không trả về `subscribe` và `unsubscribe` functions, nhưng `LiveDashboard` component đang cố gắng sử dụng chúng:

```javascript
// LiveDashboard.jsx - Line 22
const { connected, subscribe, unsubscribe } = useWebSocket(null, true);

// Line 38 - subscribe được sử dụng nhưng không tồn tại
const unsubscribeMetrics = subscribe("metrics-update", (data) => {
  setMetrics((prev) => ({
    ...prev,
    ...data,
  }));
  setLoading(false);
});
```

**Root cause**: `useWebSocket` hook chỉ trả về:
- `client`
- `connected`
- `lastMessage`
- `error`
- `send`, `joinRoom`, `leaveRoom`, `broadcastToRoom`

Nhưng **KHÔNG có** `subscribe` và `unsubscribe`.

## ✅ Giải pháp

Thêm `subscribe` và `unsubscribe` methods vào return object của `useWebSocket` hook.

### File: `src/hooks/useWebSocket.js`

**Before**:
```javascript
return {
  client,
  connected,
  lastMessage,
  error,
  send: (type, data) => client.send(type, data),
  joinRoom: (roomId) => { ... },
  leaveRoom: (roomId) => { ... },
  broadcastToRoom: (roomId, data) => client.broadcastToRoom(roomId, data),
};
```

**After**:
```javascript
return {
  client,
  connected,
  lastMessage,
  error,
  send: (type, data) => client.send(type, data),
  joinRoom: (roomId) => { ... },
  leaveRoom: (roomId) => { ... },
  broadcastToRoom: (roomId, data) => client.broadcastToRoom(roomId, data),
  // Subscribe to event - returns unsubscribe function
  subscribe: (event, callback) => {
    client.on(event, callback);
    // Return unsubscribe function
    return () => {
      client.off(event, callback);
    };
  },
  // Unsubscribe from event (alias for clarity)
  unsubscribe: (event, callback) => {
    client.off(event, callback);
  },
};
```

## 📝 Chi tiết Implementation

### `subscribe` Function

- **Input**: `event` (string), `callback` (function)
- **Output**: Unsubscribe function
- **Usage**:
  ```javascript
  const unsubscribe = subscribe("metrics-update", (data) => {
    console.log("Metrics updated:", data);
  });
  
  // Later, to unsubscribe:
  unsubscribe();
  ```

### `unsubscribe` Function

- **Input**: `event` (string), `callback` (function)
- **Output**: None
- **Usage**:
  ```javascript
  const handler = (data) => { ... };
  subscribe("metrics-update", handler);
  
  // Later, to unsubscribe:
  unsubscribe("metrics-update", handler);
  ```

## 🔄 Cách hoạt động

1. `subscribe(event, callback)` gọi `client.on(event, callback)` để đăng ký listener
2. Trả về một function để unsubscribe
3. Unsubscribe function gọi `client.off(event, callback)` để hủy đăng ký

## ✅ Kết quả

- ✅ **Runtime error fixed**: `subscribe is not a function` đã được fix
- ✅ **API consistency**: Hook bây giờ có đầy đủ subscribe/unsubscribe methods
- ✅ **Backward compatible**: Các components khác sử dụng `client.on()` vẫn hoạt động bình thường

## 📚 Usage Example

```javascript
const LiveDashboard = () => {
  const { connected, subscribe } = useWebSocket(null, true);
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    if (!connected) return;

    // Subscribe to metrics updates
    const unsubscribeMetrics = subscribe("metrics-update", (data) => {
      setMetrics((prev) => ({ ...prev, ...data }));
    });

    // Cleanup
    return () => {
      unsubscribeMetrics();
    };
  }, [connected, subscribe]);

  return <div>...</div>;
};
```

## 🔗 Related Files

- `src/hooks/useWebSocket.js` - Hook implementation
- `src/components/Dashboard/LiveDashboard.jsx` - Component sử dụng hook
- `src/utils/websocket.js` - WebSocket client implementation

---

**Date**: December 25, 2025  
**Status**: ✅ **Fixed**  
**Error**: `subscribe is not a function` - **RESOLVED**

