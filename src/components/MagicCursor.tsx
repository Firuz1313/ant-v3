import { useEffect, useState } from "react";

export function MagicCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = "none";

    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.role === "button" ||
        target.classList.contains("interactive-element") ||
        target.classList.contains("cursor-pointer") ||
        target.style.cursor === "pointer";

      setIsHovering(isInteractive);
    };

    document.addEventListener("mousemove", updateCursor);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.body.style.cursor = "auto";
      document.removeEventListener("mousemove", updateCursor);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        className="fixed pointer-events-none z-[10000] transition-all duration-150 ease-out"
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : isHovering ? 1.5 : 1})`,
        }}
      >
        {/* Core */}
        <div
          className={`w-2 h-2 rounded-full transition-all duration-150 ${
            isClicking
              ? "bg-purple-400 shadow-purple-400"
              : isHovering
                ? "bg-cyan-400 shadow-cyan-400"
                : "bg-blue-400 shadow-blue-400"
          }`}
          style={{
            boxShadow: `0 0 20px currentColor, 0 0 40px currentColor`,
          }}
        />
      </div>

      {/* Trail */}
      <div
        className="fixed pointer-events-none z-[9999] transition-all duration-300 ease-out opacity-30"
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isHovering ? 2 : 1.5})`,
        }}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 blur-sm" />
      </div>
    </>
  );
}

// Component for button hover effects
interface MagicButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "neon";
}

export function MagicButton({
  children,
  onClick,
  className = "",
  variant = "primary",
}: MagicButtonProps) {
  const [ripples, setRipples] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    onClick?.();
  };

  const variantClasses = {
    primary: "premium-button",
    secondary: "bg-gray-600 hover:bg-gray-500",
    neon: "neon-glow bg-transparent border-2 border-cyan-400 text-cyan-400",
  };

  return (
    <button
      className={`
        relative overflow-hidden magic-hover cursor-pointer
        ${variantClasses[variant]}
        ${className}
      `}
      onClick={handleClick}
    >
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white opacity-30 animate-ping"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
        />
      ))}

      {children}
    </button>
  );
}

// Enhanced card with hover effects
interface MagicCardProps {
  children: React.ReactNode;
  className?: string;
}

export function MagicCard({ children, className = "" }: MagicCardProps) {
  return (
    <div
      className={`
        premium-glass magic-hover breathing
        rounded-2xl p-6 transition-all duration-500
        hover:shadow-2xl hover:shadow-blue-500/20
        ${className}
      `}
    >
      {children}
    </div>
  );
}
