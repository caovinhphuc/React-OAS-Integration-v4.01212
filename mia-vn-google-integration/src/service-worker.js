/* eslint-disable no-restricted-globals */
/**
 * Service Worker for React OAS Integration v4.0
 * Provides offline support and caching strategies
 */

// This is required by Workbox InjectManifest plugin
// eslint-disable-next-line no-undef
const precacheManifest = self.__WB_MANIFEST || [];

const CACHE_NAME = "react-oas-v4.0.0";
const DATA_CACHE_NAME = "react-oas-data-v4.0.0";

// Files to cache immediately on install
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/static/css/main.css",
  "/static/js/bundle.js",
  "/manifest.json",
  "/favicon.ico",
];

// API endpoints to cache with network-first strategy
const API_URLS = ["/api/", "https://sheets.googleapis.com/", "https://www.googleapis.com/"];

/**
 * Install Event - Cache static assets
 */
self.addEventListener("install", (event) => {
  console.log("[ServiceWorker] Install");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[ServiceWorker] Pre-caching offline page");

      // Precache files from Workbox manifest
      const urlsToPrecache = precacheManifest.map((entry) =>
        typeof entry === "string" ? entry : entry.url
      );

      // Add additional files to cache
      const allFilesToCache = [...urlsToPrecache, ...FILES_TO_CACHE];

      return cache.addAll(allFilesToCache).catch((err) => {
        console.warn("[ServiceWorker] Cache addAll failed:", err);
        // Continue even if some files fail to cache
        return Promise.resolve();
      });
    })
  );
  self.skipWaiting();
});

/**
 * Activate Event - Clean up old caches
 */
self.addEventListener("activate", (event) => {
  console.log("[ServiceWorker] Activate");
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log("[ServiceWorker] Removing old cache", key);
            return caches.delete(key);
          }
          return null;
        })
      );
    })
  );
  self.clients.claim();
});

/**
 * Fetch Event - Implement caching strategies
 */
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== self.location.origin && !isAPIRequest(request)) {
    return;
  }

  // API Requests - Network First with Cache Fallback
  if (isAPIRequest(request)) {
    event.respondWith(networkFirstStrategy(request));
    return;
  }

  // Static Assets - Cache First with Network Fallback
  event.respondWith(cacheFirstStrategy(request));
});

/**
 * Check if request is an API call
 */
function isAPIRequest(request) {
  const url = new URL(request.url);
  return API_URLS.some((apiUrl) => url.href.includes(apiUrl));
}

/**
 * Network First Strategy - For API calls
 * Try network first, fall back to cache if network fails
 */
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);

    // Cache successful responses
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(DATA_CACHE_NAME);
      cache.put(request.url, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.log("[ServiceWorker] Network request failed, using cache:", error);

    // Try to get from cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Return offline response if no cache available
    return new Response(
      JSON.stringify({
        error: "Network error",
        offline: true,
        message: "You are offline. Please check your connection.",
      }),
      {
        status: 503,
        statusText: "Service Unavailable",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      }
    );
  }
}

/**
 * Cache First Strategy - For static assets
 * Serve from cache if available, otherwise fetch from network
 */
async function cacheFirstStrategy(request) {
  try {
    // Try cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Fetch from network if not in cache
    const networkResponse = await fetch(request);

    // Cache the response for future use
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request.url, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.log("[ServiceWorker] Fetch failed:", error);

    // Try to match any cached response as fallback
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Return offline page
    return caches.match("/index.html");
  }
}

/**
 * Message Event - Handle messages from clients
 */
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }

  if (event.data && event.data.type === "CLEAR_CACHE") {
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          return caches.delete(key);
        })
      );
    });
  }
});
