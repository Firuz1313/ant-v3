// Simple in-memory cache with TTL (Time To Live)
interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

class SimpleCache {
  private cache = new Map<string, CacheItem<any>>();
  private maxSize = 100; // Maximum number of items to cache

  set<T>(key: string, data: T, ttl: number = 5 * 60 * 1000): void {
    // Default TTL: 5 minutes
    if (this.cache.size >= this.maxSize) {
      // Remove oldest entries if cache is full
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    const now = Date.now();
    if (now - item.timestamp > item.ttl) {
      // Item has expired
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  // Get cache statistics
  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      keys: Array.from(this.cache.keys()),
    };
  }

  // Cleanup expired entries
  cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.cache.delete(key);
      }
    }
  }
}

// Create a global cache instance
export const apiCache = new SimpleCache();

// Cleanup expired entries every 5 minutes
setInterval(
  () => {
    apiCache.cleanup();
  },
  5 * 60 * 1000,
);

// Enhanced fetch with caching
export async function cachedFetch<T>(
  url: string,
  options: RequestInit = {},
  ttl: number = 5 * 60 * 1000,
): Promise<T> {
  const cacheKey = `${url}:${JSON.stringify(options)}`;

  // Try to get from cache first
  const cached = apiCache.get<T>(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(url, {
      ...options,
      // Add cache headers for better browser caching
      headers: {
        "Cache-Control": "public, max-age=300", // 5 minutes browser cache
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Store in cache
    apiCache.set(cacheKey, data, ttl);

    return data;
  } catch (error) {
    console.error("Cached fetch error:", error);
    throw error;
  }
}

// Utility function to invalidate cache for a pattern
export function invalidateCache(pattern: string): void {
  const keys = Array.from(apiCache.getStats().keys);
  keys.forEach((key) => {
    if (key.includes(pattern)) {
      apiCache.delete(key);
    }
  });
}

// Preload function for critical data
export async function preloadData(urls: string[]): Promise<void> {
  const promises = urls.map((url) =>
    cachedFetch(url).catch((error) => {
      console.warn(`Failed to preload ${url}:`, error);
      return null;
    }),
  );

  await Promise.allSettled(promises);
}
