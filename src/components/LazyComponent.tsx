import { memo, ReactNode } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface LazyComponentProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  className?: string;
}

function LazyComponentComponent({
  children,
  fallback = <div className="h-20 bg-muted animate-pulse rounded" />,
  rootMargin = "100px",
  className = "",
}: LazyComponentProps) {
  const { elementRef, hasBeenVisible } = useIntersectionObserver({
    rootMargin,
    freezeOnceVisible: true,
  });

  return (
    <div ref={elementRef} className={className}>
      {hasBeenVisible ? children : fallback}
    </div>
  );
}

export const LazyComponent = memo(LazyComponentComponent);
