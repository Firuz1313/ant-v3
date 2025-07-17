// Service Worker for ANT-V3 PWA Optimization
const CACHE_NAME = "ant-v3-cache-v1";
const STATIC_CACHE = "ant-v3-static-v1";
const DYNAMIC_CACHE = "ant-v3-dynamic-v1";
const API_CACHE = "ant-v3-api-v1";

// Critical resources to cache immediately
const STATIC_ASSETS = [
  "/",
  "/manifest.json",
  "/placeholder.svg",
  "/robots.txt",
];

// API endpoints to cache
const API_ENDPOINTS = ["/api/devices", "/api/channels", "/api/errors"];

// Cache strategies
const CACHE_STRATEGIES = {
  CACHE_FIRST: "cache-first",
  NETWORK_FIRST: "network-first",
  CACHE_ONLY: "cache-only",
  NETWORK_ONLY: "network-only",
  STALE_WHILE_REVALIDATE: "stale-while-revalidate",
};

// Install event - cache critical resources
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing");

  event.waitUntil(
    (async () => {
      // Cache static assets
      const staticCache = await caches.open(STATIC_CACHE);
      await staticCache.addAll(STATIC_ASSETS);

      // Skip waiting to activate immediately
      self.skipWaiting();
    })(),
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating");

  event.waitUntil(
    (async () => {
      // Clean up old caches
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map((cacheName) => {
          if (
            cacheName !== STATIC_CACHE &&
            cacheName !== DYNAMIC_CACHE &&
            cacheName !== API_CACHE
          ) {
            console.log("Service Worker: Deleting old cache", cacheName);
            return caches.delete(cacheName);
          }
        }),
      );

      // Take control of all clients
      self.clients.claim();
    })(),
  );
});

// Fetch event - handle requests with appropriate caching strategy
self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Skip non-HTTP requests
  if (!request.url.startsWith("http")) {
    return;
  }

  // Handle different types of requests
  if (request.method === "GET") {
    // API requests - Network first with fallback to cache
    if (url.pathname.startsWith("/api/")) {
      event.respondWith(handleAPIRequest(request));
    }
    // Static assets - Cache first
    else if (
      request.destination === "image" ||
      request.destination === "style" ||
      request.destination === "script" ||
      request.destination === "font"
    ) {
      event.respondWith(handleStaticAsset(request));
    }
    // HTML pages - Stale while revalidate
    else if (
      request.destination === "document" ||
      request.headers.get("accept")?.includes("text/html")
    ) {
      event.respondWith(handleHTMLRequest(request));
    }
    // Other requests - Network first
    else {
      event.respondWith(handleDynamicRequest(request));
    }
  }
});

// Handle API requests with network-first strategy
async function handleAPIRequest(request) {
  const apiCache = await caches.open(API_CACHE);

  try {
    // Try network first
    const networkResponse = await fetch(request);

    // Cache successful responses
    if (networkResponse.ok) {
      apiCache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.log("Service Worker: Network failed, trying cache", error);

    // Fallback to cache
    const cachedResponse = await apiCache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Return error response if no cache available
    return new Response(
      JSON.stringify({
        error: "Network unavailable and no cached data",
        offline: true,
      }),
      {
        status: 503,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

// Handle static assets with cache-first strategy
async function handleStaticAsset(request) {
  const staticCache = await caches.open(STATIC_CACHE);

  // Try cache first
  const cachedResponse = await staticCache.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    // Fallback to network
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      staticCache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log("Service Worker: Failed to fetch static asset", error);
    return new Response("Asset not available offline", { status: 503 });
  }
}

// Handle HTML requests with stale-while-revalidate
async function handleHTMLRequest(request) {
  const dynamicCache = await caches.open(DYNAMIC_CACHE);

  // Get cached version immediately
  const cachedResponse = await dynamicCache.match(request);

  // Start network request in background
  const networkResponsePromise = fetch(request).then((response) => {
    if (response.ok) {
      dynamicCache.put(request, response.clone());
    }
    return response;
  });

  // Return cached version if available, otherwise wait for network
  return cachedResponse || networkResponsePromise;
}

// Handle dynamic requests with network-first strategy
async function handleDynamicRequest(request) {
  const dynamicCache = await caches.open(DYNAMIC_CACHE);

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      dynamicCache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await dynamicCache.match(request);
    return (
      cachedResponse ||
      new Response("Content not available offline", { status: 503 })
    );
  }
}

// Background sync for offline actions
self.addEventListener("sync", (event) => {
  console.log("Service Worker: Background sync", event.tag);

  if (event.tag === "background-sync") {
    event.waitUntil(handleBackgroundSync());
  }
});

async function handleBackgroundSync() {
  // Handle any queued actions when back online
  console.log("Service Worker: Handling background sync");
}

// Push notifications (if needed)
self.addEventListener("push", (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: "/icon-192x192.png",
      badge: "/icon-192x192.png",
      vibrate: [100, 50, 100],
      data: data.data,
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

// Notification click handler
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        if (clientList.length > 0) {
          return clientList[0].focus();
        }
        return clients.openWindow("/");
      }),
  );
});

// Performance monitoring
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "PERFORMANCE_METRICS") {
    console.log("Service Worker: Performance metrics", event.data.metrics);
    // Could send to analytics service
  }
});

// Utility function to clear all caches (for development)
async function clearAllCaches() {
  const cacheNames = await caches.keys();
  await Promise.all(cacheNames.map((name) => caches.delete(name)));
  console.log("Service Worker: All caches cleared");
}

// Expose functions for debugging
self.clearAllCaches = clearAllCaches;
