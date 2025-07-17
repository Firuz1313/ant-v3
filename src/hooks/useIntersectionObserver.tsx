import { useEffect, useRef, useState, useCallback } from "react";

interface IntersectionOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
  enabled?: boolean;
  onEnter?: (entry: IntersectionObserverEntry) => void;
  onLeave?: (entry: IntersectionObserverEntry) => void;
}

// Продвинутый Intersection Observer hook
export function useAdvancedIntersectionObserver(
  options: IntersectionOptions = {},
) {
  const {
    threshold = 0.1,
    rootMargin = "0px",
    triggerOnce = false,
    enabled = true,
    onEnter,
    onLeave,
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const targetRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!enabled || !targetRef.current) return;
    if (triggerOnce && hasTriggered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        setIsIntersecting(isVisible);

        if (isVisible) {
          onEnter?.(entry);
          if (triggerOnce) {
            setHasTriggered(true);
          }
        } else {
          onLeave?.(entry);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(targetRef.current);

    return () => {
      observer.disconnect();
    };
  }, [
    enabled,
    threshold,
    rootMargin,
    triggerOnce,
    hasTriggered,
    onEnter,
    onLeave,
  ]);

  return {
    ref: targetRef,
    isIntersecting,
    hasTriggered,
  };
}

// Hook для lazy loading анимаций
export function useLazyAnimation(
  animationClass: string,
  options: IntersectionOptions = {},
) {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const { ref, isIntersecting } = useAdvancedIntersectionObserver({
    ...options,
    onEnter: () => setShouldAnimate(true),
  });

  return {
    ref,
    className: shouldAnimate ? animationClass : "",
    isAnimating: shouldAnimate,
  };
}

// Hook для условной загрузки ресурсов
export function useLazyResource<T>(
  loadResource: () => Promise<T>,
  options: IntersectionOptions = {},
) {
  const [resource, setResource] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { ref, isIntersecting } = useAdvancedIntersectionObserver(options);

  useEffect(() => {
    if (isIntersecting && !resource && !loading) {
      setLoading(true);
      loadResource()
        .then(setResource)
        .catch(setError)
        .finally(() => setLoading(false));
    }
  }, [isIntersecting, resource, loading, loadResource]);

  return {
    ref,
    resource,
    loading,
    error,
    isVisible: isIntersecting,
  };
}

// Компонент для lazy loading компонентов с Intersection Observer
interface LazyComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  className?: string;
}

export function LazyComponent({
  children,
  fallback = null,
  threshold = 0.1,
  rootMargin = "50px",
  triggerOnce = true,
  className,
}: LazyComponentProps) {
  const { ref, isIntersecting, hasTriggered } = useAdvancedIntersectionObserver(
    {
      threshold,
      rootMargin,
      triggerOnce,
    },
  );

  const shouldRender = isIntersecting || (triggerOnce && hasTriggered);

  return (
    <div ref={ref} className={className}>
      {shouldRender ? children : fallback}
    </div>
  );
}

// Hook для прогрессивной загрузки изображений
export function useProgressiveImage(src: string, placeholderSrc?: string) {
  const [currentSrc, setCurrentSrc] = useState(placeholderSrc || "");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { ref, isIntersecting } = useAdvancedIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (!isIntersecting) return;

    const img = new Image();
    img.onload = () => {
      setCurrentSrc(src);
      setLoading(false);
    };
    img.onerror = () => {
      setError(true);
      setLoading(false);
    };
    img.src = src;
  }, [isIntersecting, src]);

  return {
    ref,
    src: currentSrc,
    loading,
    error,
  };
}

// Hook для батчинга множественных Intersection Observer
export function useBatchedIntersectionObserver() {
  const observers = useRef(new Map<Element, IntersectionObserverEntry>());
  const callbacks = useRef(
    new Map<Element, (entry: IntersectionObserverEntry) => void>(),
  );
  const observerInstance = useRef<IntersectionObserver | null>(null);

  const observe = useCallback(
    (
      element: Element,
      callback: (entry: IntersectionObserverEntry) => void,
    ) => {
      if (!observerInstance.current) {
        observerInstance.current = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              observers.current.set(entry.target, entry);
              const callback = callbacks.current.get(entry.target);
              callback?.(entry);
            });
          },
          { threshold: 0.1, rootMargin: "50px" },
        );
      }

      callbacks.current.set(element, callback);
      observerInstance.current.observe(element);
    },
    [],
  );

  const unobserve = useCallback((element: Element) => {
    observerInstance.current?.unobserve(element);
    observers.current.delete(element);
    callbacks.current.delete(element);
  }, []);

  useEffect(() => {
    return () => {
      observerInstance.current?.disconnect();
    };
  }, []);

  return { observe, unobserve };
}

// Оптимизированный компонент для больших списков
interface VirtualizedListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  overscan?: number;
  className?: string;
}

export function VirtualizedList<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  overscan = 5,
  className,
}: VirtualizedListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const scrollElementRef = useRef<HTMLDivElement>(null);

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan,
  );

  const visibleItems = items.slice(startIndex, endIndex + 1);
  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return (
    <div
      ref={scrollElementRef}
      className={className}
      style={{ height: containerHeight, overflow: "auto" }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, index) => (
            <div key={startIndex + index} style={{ height: itemHeight }}>
              {renderItem(item, startIndex + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
