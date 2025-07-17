import { useState, useEffect } from "react";
import { performanceMonitor } from "@/lib/performance";
import { cn } from "@/lib/utils";

interface PerformanceDisplayProps {
  enabled?: boolean;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

export function PerformanceDisplay({
  enabled = process.env.NODE_ENV === "development",
  position = "bottom-right",
}: PerformanceDisplayProps) {
  const [metrics, setMetrics] = useState({
    fps: 0,
    memoryUsage: 0,
    loadTime: 0,
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    performanceMonitor.startFPSMonitoring();

    const interval = setInterval(() => {
      const currentMetrics = performanceMonitor.getMetrics();
      setMetrics({
        fps: currentMetrics.fps,
        memoryUsage: currentMetrics.memoryUsage,
        loadTime: currentMetrics.loadTime,
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      performanceMonitor.stopFPSMonitoring();
    };
  }, [enabled]);

  if (!enabled) return null;

  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
  };

  const getFPSColor = (fps: number) => {
    if (fps >= 50) return "text-green-400";
    if (fps >= 30) return "text-yellow-400";
    return "text-red-400";
  };

  const getMemoryColor = (memory: number) => {
    if (memory < 50) return "text-green-400";
    if (memory < 100) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className={cn(
          "fixed z-[9999] w-8 h-8 rounded-full bg-black/80 text-white text-xs font-mono flex items-center justify-center hover:bg-black/90 transition-colors",
          positionClasses[position],
        )}
        title="Toggle Performance Monitor"
      >
        📊
      </button>

      {/* Performance panel */}
      {isVisible && (
        <div
          className={cn(
            "fixed z-[9998] bg-black/90 backdrop-blur-sm text-white text-xs font-mono p-3 rounded-lg border border-white/20 min-w-[160px]",
            position.includes("right") ? "right-4" : "left-4",
            position.includes("top") ? "top-14" : "bottom-14",
          )}
        >
          <div className="space-y-1">
            <div className="text-gray-300 font-semibold mb-2">Performance</div>

            <div className="flex justify-between items-center">
              <span>FPS:</span>
              <span className={getFPSColor(metrics.fps)}>{metrics.fps}</span>
            </div>

            <div className="flex justify-between items-center">
              <span>Memory:</span>
              <span className={getMemoryColor(metrics.memoryUsage)}>
                {metrics.memoryUsage.toFixed(1)}MB
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span>Load:</span>
              <span className="text-blue-400">
                {(metrics.loadTime / 1000).toFixed(2)}s
              </span>
            </div>

            {/* Performance indicators */}
            <div className="mt-2 pt-2 border-t border-white/20">
              <div className="flex space-x-1">
                <div
                  className={cn(
                    "w-2 h-2 rounded-full",
                    metrics.fps >= 50
                      ? "bg-green-400"
                      : metrics.fps >= 30
                        ? "bg-yellow-400"
                        : "bg-red-400",
                  )}
                  title="FPS Health"
                />
                <div
                  className={cn(
                    "w-2 h-2 rounded-full",
                    metrics.memoryUsage < 50
                      ? "bg-green-400"
                      : metrics.memoryUsage < 100
                        ? "bg-yellow-400"
                        : "bg-red-400",
                  )}
                  title="Memory Health"
                />
                <div
                  className={cn(
                    "w-2 h-2 rounded-full",
                    metrics.loadTime < 2000
                      ? "bg-green-400"
                      : metrics.loadTime < 4000
                        ? "bg-yellow-400"
                        : "bg-red-400",
                  )}
                  title="Load Time Health"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Simple performance tips component
export function PerformanceTips() {
  const [showTips, setShowTips] = useState(false);

  if (process.env.NODE_ENV !== "development") return null;

  return (
    <>
      <button
        onClick={() => setShowTips(!showTips)}
        className="fixed bottom-4 left-4 z-[9999] bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
      >
        💡 Tips
      </button>

      {showTips && (
        <div className="fixed bottom-12 left-4 z-[9998] bg-black/90 backdrop-blur-sm text-white text-xs p-4 rounded-lg border border-white/20 max-w-xs">
          <h3 className="font-semibold mb-2">Performance Tips</h3>
          <ul className="space-y-1 text-gray-300">
            <li>• Use transform instead of changing position</li>
            <li>• Minimize backdrop-blur usage</li>
            <li>• Use will-change sparingly</li>
            <li>• Optimize images with lazy loading</li>
            <li>• Debounce expensive operations</li>
          </ul>
        </div>
      )}
    </>
  );
}
