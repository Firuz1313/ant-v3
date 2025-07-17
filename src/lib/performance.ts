// Performance monitoring utilities for React application

interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
}

class PerformanceMonitor {
  private frameCount = 0;
  private lastTime = performance.now();
  private fps = 0;
  private isMonitoring = false;

  // Start FPS monitoring
  startFPSMonitoring(): void {
    if (this.isMonitoring) return;
    this.isMonitoring = true;
    this.monitorFrame();
  }

  // Stop FPS monitoring
  stopFPSMonitoring(): void {
    this.isMonitoring = false;
  }

  private monitorFrame(): void {
    if (!this.isMonitoring) return;

    this.frameCount++;
    const currentTime = performance.now();

    if (currentTime >= this.lastTime + 1000) {
      this.fps = Math.round(
        (this.frameCount * 1000) / (currentTime - this.lastTime),
      );
      this.frameCount = 0;
      this.lastTime = currentTime;
    }

    requestAnimationFrame(() => this.monitorFrame());
  }

  // Get current performance metrics
  getMetrics(): PerformanceMetrics {
    const navigation = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType("paint");

    let memoryUsage = 0;
    if ("memory" in performance) {
      // @ts-ignore - memory is non-standard but available in Chrome
      memoryUsage = performance.memory.usedJSHeapSize / 1024 / 1024; // MB
    }

    let firstContentfulPaint = 0;
    let largestContentfulPaint = 0;

    // Get FCP
    const fcpEntry = paint.find(
      (entry) => entry.name === "first-contentful-paint",
    );
    if (fcpEntry) {
      firstContentfulPaint = fcpEntry.startTime;
    }

    // Get LCP (if available)
    const lcpEntries = performance.getEntriesByType("largest-contentful-paint");
    if (lcpEntries.length > 0) {
      largestContentfulPaint = lcpEntries[lcpEntries.length - 1].startTime;
    }

    return {
      fps: this.fps,
      memoryUsage,
      loadTime: navigation?.loadEventEnd - navigation?.navigationStart || 0,
      firstContentfulPaint,
      largestContentfulPaint,
    };
  }

  // Log performance issues
  checkPerformanceIssues(): string[] {
    const metrics = this.getMetrics();
    const issues: string[] = [];

    if (metrics.fps < 30) {
      issues.push(`Low FPS detected: ${metrics.fps} fps`);
    }

    if (metrics.memoryUsage > 100) {
      issues.push(`High memory usage: ${metrics.memoryUsage.toFixed(2)} MB`);
    }

    if (metrics.loadTime > 3000) {
      issues.push(
        `Slow load time: ${(metrics.loadTime / 1000).toFixed(2)} seconds`,
      );
    }

    if (metrics.firstContentfulPaint > 2000) {
      issues.push(
        `Slow FCP: ${(metrics.firstContentfulPaint / 1000).toFixed(2)} seconds`,
      );
    }

    if (metrics.largestContentfulPaint > 4000) {
      issues.push(
        `Slow LCP: ${(metrics.largestContentfulPaint / 1000).toFixed(2)} seconds`,
      );
    }

    return issues;
  }
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();

// React hook for performance monitoring
export function usePerformanceMonitor(enabled = true) {
  const [metrics, setMetrics] = React.useState<PerformanceMetrics | null>(null);
  const [issues, setIssues] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (!enabled) return;

    performanceMonitor.startFPSMonitoring();

    const interval = setInterval(() => {
      const currentMetrics = performanceMonitor.getMetrics();
      const currentIssues = performanceMonitor.checkPerformanceIssues();

      setMetrics(currentMetrics);
      setIssues(currentIssues);
    }, 1000);

    return () => {
      clearInterval(interval);
      performanceMonitor.stopFPSMonitoring();
    };
  }, [enabled]);

  return { metrics, issues };
}

// Performance optimization helpers
export const optimizePerformance = {
  // Debounce function for expensive operations
  debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
    let timeout: NodeJS.Timeout;
    return ((...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    }) as T;
  },

  // Throttle function for frequent operations
  throttle<T extends (...args: any[]) => any>(func: T, limit: number): T {
    let inThrottle: boolean;
    return ((...args: any[]) => {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    }) as T;
  },

  // Preload critical resources
  preloadResource(url: string, type: "image" | "script" | "style" | "font") {
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = url;
    link.as = type;
    if (type === "font") {
      link.crossOrigin = "anonymous";
    }
    document.head.appendChild(link);
  },

  // Optimize images
  createOptimizedImage(
    src: string,
    width?: number,
    height?: number,
  ): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;

      // Add responsive sizing
      if (width) img.width = width;
      if (height) img.height = height;

      img.loading = "lazy";
      img.decoding = "async";
      img.src = src;
    });
  },

  // Virtual scrolling helper
  calculateVisibleItems(
    containerHeight: number,
    itemHeight: number,
    scrollTop: number,
    totalItems: number,
    overscan = 5,
  ) {
    const startIndex = Math.max(
      0,
      Math.floor(scrollTop / itemHeight) - overscan,
    );
    const endIndex = Math.min(
      totalItems - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan,
    );

    return {
      startIndex,
      endIndex,
      visibleItems: endIndex - startIndex + 1,
    };
  },
};

// React import is needed for the hook
import React from "react";
