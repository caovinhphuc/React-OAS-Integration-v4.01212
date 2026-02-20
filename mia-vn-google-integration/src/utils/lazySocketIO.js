/**
 * Socket.io Lazy Loader
 * Defers socket.io-client import until real-time connection is actually needed
 * Saves 50-80KB on initial page load
 *
 * Usage:
 * const socket = await lazyLoadSocketIO();
 * socket.on('event', (data) => {...});
 *
 * Or with hook:
 * const socket = useLazySocketIO();
 * if (!socket) return <Spinner />;
 */

/**
 * React Hook for lazy socket.io loading
 * Loads socket.io on component mount, cleans up on unmount
 *
 * Usage:
 * const { socket, loading, error } = useLazySocketIO();
 * if (loading) return <Spinner />;
 * if (error) return <ErrorMessage />;
 * socket?.emit('event', data);
 */
import { useEffect, useRef, useState } from "react";

let socketIOLibrary = null;
let socketInstance = null;

/**
 * Lazy load socket.io-client library
 * @returns {Promise<Object>} Socket.io library module
 */
export async function lazyLoadSocketIO() {
  if (socketIOLibrary) return socketIOLibrary;

  try {
    // Only load socket.io-client when first needed
    socketIOLibrary = await import("socket.io-client");
    console.log("📦 Socket.io library loaded");
    return socketIOLibrary;
  } catch (error) {
    console.error("❌ Failed to load socket.io-client:", error.message);
    throw error;
  }
}

/**
 * Get or create socket connection (singleton)
 * Only initializes on first call
 *
 * @param {string} url - Server URL (default: window.location.origin)
 * @param {Object} options - Socket.io connection options
 * @returns {Promise<SocketIO>} Socket instance
 */
export async function getSocketInstance(url = window.location.origin, options = {}) {
  // Return existing socket if already created
  if (socketInstance) {
    console.log("♻️ Reusing existing socket connection");
    return socketInstance;
  }

  try {
    const { io } = await lazyLoadSocketIO();

    // Create new socket connection
    socketInstance = io(url, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
      ...options,
    });

    // Log connection events
    socketInstance.on("connect", () => {
      console.log("✅ Socket.io connected:", socketInstance.id);
    });

    socketInstance.on("disconnect", (reason) => {
      console.log("❌ Socket.io disconnected:", reason);
    });

    socketInstance.on("error", (error) => {
      console.error("⚠️ Socket.io error:", error);
    });

    return socketInstance;
  } catch (error) {
    console.error("❌ Failed to create socket connection:", error);
    throw error;
  }
}

/**
 * Disconnect socket (cleanup)
 */
export function disconnectSocket() {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
    console.log("🔌 Socket.io disconnected and cleaned up");
  }
}

export function useLazySocketIO(url = window.location.origin, options = {}) {
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const initSocket = async () => {
      try {
        setLoading(true);
        setError(null);

        const socketInstance = await getSocketInstance(url, options);

        if (isMounted) {
          socketRef.current = socketInstance;
          setSocket(socketInstance);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          console.error("Socket.io initialization failed:", err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initSocket();

    // Cleanup on unmount
    return () => {
      isMounted = false;
      // Don't disconnect here - keep connection alive for app lifetime
      // Use disconnectSocket() manually when needed
    };
  }, [url, options]);

  return { socket, loading, error };
}

export default lazyLoadSocketIO;
