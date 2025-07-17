import { useEffect, useState } from "react";

interface CursorPosition {
  x: number;
  y: number;
}

export function SimpleCursor() {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target;
      if (!target || !(target instanceof HTMLElement)) return;

      if (
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.classList.contains("interactive-element") ||
        target.closest(".interactive-element") ||
        target.tagName === "A" ||
        target.closest("a")
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target;
      if (!target || !(target instanceof HTMLElement)) return;

      if (
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.classList.contains("interactive-element") ||
        target.closest(".interactive-element") ||
        target.tagName === "A" ||
        target.closest("a")
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
    };
  }, []);

  return (
    <div
      className={`simple-cursor ${isHovering ? "hovering" : ""}`}
      style={{
        left: position.x,
        top: position.y,
      }}
    />
  );
}
