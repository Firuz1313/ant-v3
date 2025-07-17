import { useState, useEffect, useRef, useCallback } from "react";

interface SmartRenderOptions {
  enabled?: boolean;
  threshold?: number;
  rootMargin?: string;
  fallbackDelay?: number;
}

// Hook для умного рендеринга компонентов только в зоне видимости
export function useSmartRender(options: SmartRenderOptions = {}) {
  const {
    enabled = true,
    threshold = 0.1,
    rootMargin = "50px",
    fallbackDelay = 100,
  } = options;

  const [isVisible, setIsVisible] = useState(!enabled);
  const [shouldRender, setShouldRender] = useState(!enabled);
  const elementRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!enabled || !elementRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsVisible(visible);

        if (visible) {
          // Рендерим сразу когда элемент виден
          setShouldRender(true);
        } else {
          // Задержка перед размонтированием для плавности
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          timeoutRef.current = setTimeout(() => {
            setShouldRender(false);
          }, fallbackDelay);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [enabled, threshold, rootMargin, fallbackDelay]);

  return {
    ref: elementRef,
    isVisible,
    shouldRender,
  };
}

// Hook для виртуализации больших списков
export function useVirtualList<T>(
  items: T[],
  containerHeight: number,
  itemHeight: number,
  overscan: number = 5,
) {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleStart = Math.max(
    0,
    Math.floor(scrollTop / itemHeight) - overscan,
  );
  const visibleEnd = Math.min(
    items.length - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan,
  );

  const visibleItems = items.slice(visibleStart, visibleEnd + 1);
  const totalHeight = items.length * itemHeight;
  const offsetY = visibleStart * itemHeight;

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return {
    visibleItems,
    totalHeight,
    offsetY,
    visibleStart,
    visibleEnd,
    handleScroll,
  };
}

// Компонент для умного рендеринга дочерних элементов
interface SmartRenderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  enabled?: boolean;
  threshold?: number;
  rootMargin?: string;
  className?: string;
}

export function SmartRender({
  children,
  fallback = null,
  enabled = true,
  threshold = 0.1,
  rootMargin = "50px",
  className,
}: SmartRenderProps) {
  const { ref, shouldRender } = useSmartRender({
    enabled,
    threshold,
    rootMargin,
  });

  return (
    <div ref={ref} className={className}>
      {shouldRender ? children : fallback}
    </div>
  );
}

// Hook для проверки производительности устройства
export function useDevicePerformance() {
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    // Проверяем характеристики устройства
    const checkPerformance = () => {
      let lowPerf = false;

      // Проверка памяти
      if ("memory" in performance) {
        // @ts-ignore
        const memory = performance.memory;
        if (memory.usedJSHeapSize > 100 * 1024 * 1024) {
          lowPerf = true; // Больше 100MB
        }
      }

      // Проверка количества ядер
      if ("hardwareConcurrency" in navigator) {
        if (navigator.hardwareConcurrency <= 2) {
          lowPerf = true; // 2 ядра или меньше
        }
      }

      // Проверка connection
      if ("connection" in navigator) {
        // @ts-ignore
        const connection = navigator.connection;
        if (
          connection.effectiveType === "slow-2g" ||
          connection.effectiveType === "2g"
        ) {
          lowPerf = true; // Медленный интернет
        }
      }

      // Проверка через измерение FPS
      let fps = 0;
      let lastTime = performance.now();
      let frameCount = 0;

      const measureFPS = () => {
        frameCount++;
        const currentTime = performance.now();

        if (currentTime >= lastTime + 1000) {
          fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
          if (fps < 30) {
            lowPerf = true; // Низкий FPS
          }
          setIsLowPerformance(lowPerf);
          return;
        }

        if (frameCount < 60) {
          // Измеряем только первые 60 кадров
          requestAnimationFrame(measureFPS);
        }
      };

      requestAnimationFrame(measureFPS);
    };

    checkPerformance();
  }, []);

  return { isLowPerformance };
}

// Hook для debounce
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Hook для throttle
export function useThrottle<T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): T {
  const inThrottle = useRef(false);

  return useCallback(
    ((...args: any[]) => {
      if (!inThrottle.current) {
        func.apply(null, args);
        inThrottle.current = true;
        setTimeout(() => (inThrottle.current = false), limit);
      }
    }) as T,
    [func, limit],
  );
}
