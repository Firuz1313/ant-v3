import { useEffect, useState, useRef } from "react";

interface CursorPosition {
  x: number;
  y: number;
}

export function TechCursor() {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState<CursorPosition[]>([]);
  const trailRef = useRef<CursorPosition[]>([]);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setPosition(newPosition);

      // Update trail
      trailRef.current = [newPosition, ...trailRef.current.slice(0, 8)].map(
        (pos, index) => ({
          x: pos.x,
          y: pos.y,
        }),
      );
      setTrail([...trailRef.current]);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target;
      // Check if target is an HTMLElement before calling methods
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
      // Check if target is an HTMLElement before calling methods
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

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Trail effect */}
      {trail.map((pos, index) => (
        <div
          key={index}
          className="tech-cursor-trail"
          style={{
            left: pos.x,
            top: pos.y,
            opacity: ((trail.length - index) / trail.length) * 0.3,
            transform: `translate(-50%, -50%) scale(${
              (trail.length - index) / trail.length
            })`,
          }}
        />
      ))}

      {/* Main cursor */}
      <div
        className={`tech-cursor-main ${isHovering ? "hovering" : ""} ${
          isClicking ? "clicking" : ""
        }`}
        style={{
          left: position.x,
          top: position.y,
        }}
      >
        {/* Core cursor */}
        <div className="tech-cursor-core" />

        {/* Ring effect */}
        <div className="tech-cursor-ring" />

        {/* Outer glow */}
        <div className="tech-cursor-glow" />

        {/* Click ripple */}
        {isClicking && <div className="tech-cursor-ripple" />}
      </div>
    </>
  );
}
