// System for preloading critical resources and adaptive performance

interface PreloadOptions {
  priority?: "high" | "low";
  crossOrigin?: "anonymous" | "use-credentials";
  media?: string;
}

class ResourcePreloader {
  private preloadedResources = new Set<string>();
  private isLowPerformanceDevice = false;

  constructor() {
    this.detectPerformance();
  }

  // Detect device performance capabilities
  private detectPerformance() {
    // Check hardware concurrency
    const cores = navigator.hardwareConcurrency || 2;

    // Check memory (if available)
    let memoryLimit = Infinity;
    if ("memory" in performance) {
      // @ts-ignore
      memoryLimit = performance.memory.jsHeapSizeLimit / (1024 * 1024); // MB
    }

    // Check connection speed
    let connectionSpeed = "fast";
    if ("connection" in navigator) {
      // @ts-ignore
      const connection = navigator.connection;
      if (
        connection.effectiveType === "slow-2g" ||
        connection.effectiveType === "2g"
      ) {
        connectionSpeed = "slow";
      }
    }

    // Determine if this is a low performance device
    this.isLowPerformanceDevice =
      cores <= 2 || memoryLimit < 512 || connectionSpeed === "slow";

    console.log("Device performance detection:", {
      cores,
      memoryLimit,
      connectionSpeed,
      isLowPerformance: this.isLowPerformanceDevice,
    });
  }

  // Preload a resource
  preload(
    href: string,
    as: "script" | "style" | "image" | "font" | "fetch",
    options: PreloadOptions = {},
  ): void {
    // Skip preloading on low performance devices for non-critical resources
    if (this.isLowPerformanceDevice && options.priority !== "high") {
      return;
    }

    if (this.preloadedResources.has(href)) {
      return; // Already preloaded
    }

    const link = document.createElement("link");
    link.rel = "preload";
    link.href = href;
    link.as = as;

    if (options.crossOrigin) {
      link.crossOrigin = options.crossOrigin;
    }

    if (options.media) {
      link.media = options.media;
    }

    if (options.priority === "high") {
      link.setAttribute("importance", "high");
    }

    document.head.appendChild(link);
    this.preloadedResources.add(href);
  }

  // Preload critical CSS
  preloadCSS(href: string, options: PreloadOptions = {}): void {
    this.preload(href, "style", options);
  }

  // Preload critical JavaScript
  preloadJS(href: string, options: PreloadOptions = {}): void {
    this.preload(href, "script", options);
  }

  // Preload images
  preloadImage(src: string, options: PreloadOptions = {}): void {
    this.preload(src, "image", options);
  }

  // Preload fonts
  preloadFont(href: string, options: PreloadOptions = {}): void {
    this.preload(href, "font", { ...options, crossOrigin: "anonymous" });
  }

  // Preload API data
  preloadData(url: string, options: PreloadOptions = {}): void {
    this.preload(url, "fetch", options);
  }

  // Get performance mode
  getPerformanceMode(): "high" | "low" {
    return this.isLowPerformanceDevice ? "low" : "high";
  }

  // Preload critical app resources
  preloadCriticalResources(): void {
    // Preload critical fonts
    this.preloadFont("/fonts/Inter-var.woff2", { priority: "high" });
    this.preloadFont("/fonts/JetBrainsMono-var.woff2", { priority: "high" });

    // Preload critical images (only on high performance devices)
    if (!this.isLowPerformanceDevice) {
      this.preloadImage("/placeholder.svg", { priority: "high" });
    }

    // Preload critical API endpoints
    this.preloadData("/api/devices", { priority: "high" });

    // Preload device-specific resources based on common usage patterns
    const commonDevices = ["openbox", "openbox-gold", "uclan"];
    commonDevices.forEach((deviceId) => {
      this.preloadData(`/api/device/${deviceId}`, { priority: "low" });
    });
  }
}

// Global preloader instance
export const resourcePreloader = new ResourcePreloader();

// Adaptive performance configuration
export class AdaptivePerformance {
  private static instance: AdaptivePerformance;
  private performanceMode: "high" | "low";

  private constructor() {
    this.performanceMode = resourcePreloader.getPerformanceMode();
  }

  static getInstance(): AdaptivePerformance {
    if (!AdaptivePerformance.instance) {
      AdaptivePerformance.instance = new AdaptivePerformance();
    }
    return AdaptivePerformance.instance;
  }

  // Get animation configuration based on performance
  getAnimationConfig() {
    return {
      reducedMotion: this.performanceMode === "low",
      duration: this.performanceMode === "low" ? 150 : 300,
      easing:
        this.performanceMode === "low"
          ? "ease"
          : "cubic-bezier(0.4, 0, 0.2, 1)",
      disableParticles: this.performanceMode === "low",
      disableBlur: this.performanceMode === "low",
      maxConcurrentAnimations: this.performanceMode === "low" ? 2 : 5,
    };
  }

  // Get rendering configuration
  getRenderConfig() {
    return {
      virtualScrolling: this.performanceMode === "low",
      lazyLoadingThreshold: this.performanceMode === "low" ? 0.5 : 0.1,
      maxConcurrentRequests: this.performanceMode === "low" ? 2 : 6,
      imageQuality: this.performanceMode === "low" ? "low" : "high",
      enableIntersectionObserver: true,
      batchUpdates: this.performanceMode === "low",
    };
  }

  // Get feature flags based on performance
  getFeatureFlags() {
    return {
      enableCursor: this.performanceMode === "high",
      enableParticles: this.performanceMode === "high",
      enableShadows: this.performanceMode === "high",
      enableBlur: this.performanceMode === "high",
      enableGradients: true, // Always enable for visual consistency
      enableTransitions: true, // Always enable for UX
    };
  }

  // Apply adaptive CSS
  applyAdaptiveCSS() {
    const root = document.documentElement;
    const features = this.getFeatureFlags();
    const animations = this.getAnimationConfig();

    // Set CSS custom properties based on performance
    root.style.setProperty("--animation-duration", `${animations.duration}ms`);
    root.style.setProperty("--animation-easing", animations.easing);

    // Add performance class to body
    document.body.classList.toggle(
      "low-performance",
      this.performanceMode === "low",
    );
    document.body.classList.toggle(
      "high-performance",
      this.performanceMode === "high",
    );

    // Disable expensive effects on low performance devices
    if (this.performanceMode === "low") {
      root.style.setProperty("--blur-amount", "0px");
      root.style.setProperty("--shadow-intensity", "0");
    }
  }

  isLowPerformance(): boolean {
    return this.performanceMode === "low";
  }
}

// React hook for adaptive performance
import { useState, useEffect } from "react";

export function useAdaptivePerformance() {
  const [adaptivePerf] = useState(() => AdaptivePerformance.getInstance());
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    setIsLowPerformance(adaptivePerf.isLowPerformance());
    adaptivePerf.applyAdaptiveCSS();
  }, [adaptivePerf]);

  return {
    isLowPerformance,
    animationConfig: adaptivePerf.getAnimationConfig(),
    renderConfig: adaptivePerf.getRenderConfig(),
    featureFlags: adaptivePerf.getFeatureFlags(),
  };
}

// Utility functions for performance optimization
export const performanceUtils = {
  // Debounce function
  debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number,
    immediate = false,
  ): T {
    let timeout: NodeJS.Timeout | null = null;

    return ((...args: any[]) => {
      const later = () => {
        timeout = null;
        if (!immediate) func.apply(null, args);
      };

      const callNow = immediate && !timeout;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(null, args);
    }) as T;
  },

  // Throttle function
  throttle<T extends (...args: any[]) => any>(func: T, limit: number): T {
    let inThrottle: boolean;

    return ((...args: any[]) => {
      if (!inThrottle) {
        func.apply(null, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    }) as T;
  },

  // Batch DOM updates
  batchDOMUpdates(updates: (() => void)[]): void {
    requestAnimationFrame(() => {
      updates.forEach((update) => update());
    });
  },

  // Measure performance
  measurePerformance<T>(name: string, fn: () => T): T {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`Performance [${name}]: ${(end - start).toFixed(2)}ms`);
    return result;
  },
};

// Initialize preloader on module load
if (typeof window !== "undefined") {
  // Wait for DOM to be ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      resourcePreloader.preloadCriticalResources();
    });
  } else {
    resourcePreloader.preloadCriticalResources();
  }
}
