import React, { useState } from "react";
import {
  FaPowerOff,
  FaChevronUp,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaSquare,
  FaCircle,
} from "react-icons/fa";
import { useTVControl } from "../context/TVControlContext";

export default function OpenboxRemoteControl({
  onButtonClick,
  highlight,
}: {
  onButtonClick?: (key: string) => void;
  highlight?: { key?: string };
}) {
  const [pressed, setPressed] = useState<string | null>(null);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const { sendCommand } = useTVControl();

  const handlePress = (key: string) => {
    setPressed(key);
    if (onButtonClick) onButtonClick(key);

    // Управление ТВ с пульта
    switch (key) {
      case "power":
        sendCommand("power");
        break;
      case "ok":
        sendCommand("ok");
        break;
      case "exit":
        sendCommand("exit");
        break;
      case "up":
        sendCommand("up");
        break;
      case "down":
        sendCommand("down");
        break;
      case "left":
        sendCommand("left");
        break;
      case "right":
        sendCommand("right");
        break;
      case "menu":
        sendCommand("menu");
        break;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
        sendCommand(key as "1" | "2" | "3" | "4" | "5");
        break;
      default:
        break;
    }

    setTimeout(() => setPressed(null), 150);
  };

  // Стили для разных типов кнопок
  const getButtonStyle = (
    type: string,
    color?: string,
    isPressed?: boolean,
    isHovered?: boolean,
  ) => {
    const baseStyle = {
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold" as const,
      fontSize: "11px",
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "relative" as const,
      outline: "none",
      transform: isPressed
        ? "scale(0.9)"
        : isHovered
          ? "scale(1.05)"
          : "scale(1)",
    };

    switch (type) {
      case "power":
        return {
          ...baseStyle,
          width: "45px",
          height: "20px",
          background: isPressed
            ? "linear-gradient(145deg, #c62828, #e53935)"
            : isHovered
              ? "linear-gradient(145deg, #f44336, #e53935)"
              : "linear-gradient(145deg, #e53935, #d32f2f)",
          color: "#fff",
          borderRadius: "10px",
          boxShadow: isPressed
            ? "inset 0 3px 6px rgba(0,0,0,0.4), 0 0 15px rgba(229,57,53,0.4)"
            : isHovered
              ? "0 4px 12px rgba(0,0,0,0.4), 0 0 20px rgba(229,57,53,0.5)"
              : "0 2px 6px rgba(0,0,0,0.3), 0 0 10px rgba(229,57,53,0.2)",
        };

      case "number":
        return {
          ...baseStyle,
          width: "28px",
          height: "28px",
          background: isPressed
            ? "linear-gradient(145deg, #0d0d0d, #1a1a1a)"
            : isHovered
              ? "linear-gradient(145deg, #404040, #2d2d2d)"
              : "linear-gradient(145deg, #2d2d2d, #1a1a1a)",
          color: "#fff",
          borderRadius: "50%",
          boxShadow: isPressed
            ? "inset 0 3px 6px rgba(0,0,0,0.6)"
            : isHovered
              ? "0 4px 12px rgba(0,0,0,0.5), 0 0 15px rgba(255,255,255,0.1)"
              : "0 2px 6px rgba(0,0,0,0.4)",
          fontSize: "12px",
        };

      case "colored":
        return {
          ...baseStyle,
          width: "24px",
          height: "18px",
          background: isPressed
            ? `linear-gradient(145deg, ${color}99, ${color}cc)`
            : isHovered
              ? `linear-gradient(145deg, ${color}ee, ${color})`
              : `linear-gradient(145deg, ${color}, ${color}dd)`,
          color: "#fff",
          borderRadius: "6px",
          boxShadow: isPressed
            ? `inset 0 2px 4px rgba(0,0,0,0.4)`
            : isHovered
              ? `0 4px 12px rgba(0,0,0,0.4), 0 0 15px ${color}66`
              : "0 2px 4px rgba(0,0,0,0.3)",
          fontSize: "8px",
        };

      case "navigation":
        return {
          ...baseStyle,
          width: "32px",
          height: "32px",
          background: isPressed
            ? "linear-gradient(145deg, #0d0d0d, #1a1a1a)"
            : isHovered
              ? "linear-gradient(145deg, #404040, #2d2d2d)"
              : "linear-gradient(145deg, #2d2d2d, #1a1a1a)",
          color: "#fff",
          borderRadius: "50%",
          boxShadow: isPressed
            ? "inset 0 3px 6px rgba(0,0,0,0.6)"
            : isHovered
              ? "0 4px 12px rgba(0,0,0,0.5), 0 0 15px rgba(0,234,255,0.3)"
              : "0 2px 6px rgba(0,0,0,0.4)",
        };

      case "ok":
        return {
          ...baseStyle,
          width: "48px",
          height: "48px",
          background: isPressed
            ? "linear-gradient(145deg, #0d0d0d, #1a1a1a)"
            : isHovered
              ? "linear-gradient(145deg, #404040, #2d2d2d)"
              : "linear-gradient(145deg, #2d2d2d, #1a1a1a)",
          color: "#fff",
          borderRadius: "50%",
          boxShadow: isPressed
            ? "inset 0 4px 8px rgba(0,0,0,0.6)"
            : isHovered
              ? "0 6px 20px rgba(0,0,0,0.5), 0 0 25px rgba(0,234,255,0.4)"
              : "0 3px 8px rgba(0,0,0,0.4)",
          fontSize: "14px",
          fontWeight: "bold" as const,
        };

      case "media":
        return {
          ...baseStyle,
          width: "22px",
          height: "22px",
          background: isPressed
            ? "linear-gradient(145deg, #0d0d0d, #1a1a1a)"
            : isHovered
              ? "linear-gradient(145deg, #404040, #2d2d2d)"
              : "linear-gradient(145deg, #2d2d2d, #1a1a1a)",
          color: "#fff",
          borderRadius: "4px",
          boxShadow: isPressed
            ? "inset 0 2px 4px rgba(0,0,0,0.6)"
            : isHovered
              ? "0 3px 8px rgba(0,0,0,0.5), 0 0 10px rgba(255,255,255,0.1)"
              : "0 2px 4px rgba(0,0,0,0.4)",
          fontSize: "10px",
        };

      default:
        return {
          ...baseStyle,
          width: "35px",
          height: "20px",
          background: isPressed
            ? "linear-gradient(145deg, #0d0d0d, #1a1a1a)"
            : isHovered
              ? "linear-gradient(145deg, #404040, #2d2d2d)"
              : "linear-gradient(145deg, #2d2d2d, #1a1a1a)",
          color: "#fff",
          borderRadius: "8px",
          boxShadow: isPressed
            ? "inset 0 2px 4px rgba(0,0,0,0.6)"
            : isHovered
              ? "0 3px 8px rgba(0,0,0,0.5), 0 0 10px rgba(255,255,255,0.1)"
              : "0 2px 4px rgba(0,0,0,0.4)",
          fontSize: "9px",
        };
    }
  };

  const Button = ({
    children,
    onClick,
    type,
    color,
    keyName,
  }: {
    children: React.ReactNode;
    onClick: () => void;
    type: string;
    color?: string;
    keyName: string;
  }) => (
    <button
      onClick={onClick}
      onMouseEnter={() => setHoveredButton(keyName)}
      onMouseLeave={() => setHoveredButton(null)}
      style={getButtonStyle(
        type,
        color,
        pressed === keyName,
        hoveredButton === keyName,
      )}
    >
      {children}
    </button>
  );

  return (
    <div
      style={{
        width: "180px",
        height: "580px",
        background:
          "linear-gradient(145deg, #2d2d2d 0%, #1a1a1a 50%, #000000 100%)",
        borderRadius: "32px",
        padding: "24px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        boxShadow:
          "0 12px 40px rgba(0,0,0,0.7), 0 6px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
        border: "2px solid #404040",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Эффект подсветки по краям */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: "32px",
          background:
            "linear-gradient(45deg, transparent 30%, rgba(0,234,255,0.03) 50%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Кнопка питания */}
      <Button onClick={() => handlePress("power")} type="power" keyName="power">
        <FaPowerOff size={12} />
      </Button>

      <div style={{ height: "4px" }} />

      {/* Цифровые кнопки 1-3 */}
      <div style={{ display: "flex", gap: "12px" }}>
        {["1", "2", "3"].map((num) => (
          <Button
            key={num}
            onClick={() => handlePress(num)}
            type="number"
            keyName={num}
          >
            {num}
          </Button>
        ))}
      </div>

      {/* Цифровые кнопки 4-6 */}
      <div style={{ display: "flex", gap: "12px" }}>
        {["4", "5", "6"].map((num) => (
          <Button
            key={num}
            onClick={() => handlePress(num)}
            type="number"
            keyName={num}
          >
            {num}
          </Button>
        ))}
      </div>

      {/* Цифровые кнопки 7-9 */}
      <div style={{ display: "flex", gap: "12px" }}>
        {["7", "8", "9"].map((num) => (
          <Button
            key={num}
            onClick={() => handlePress(num)}
            type="number"
            keyName={num}
          >
            {num}
          </Button>
        ))}
      </div>

      {/* LANG, 0, LIST */}
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <Button
          onClick={() => handlePress("lang")}
          type="default"
          keyName="lang"
        >
          LANG
        </Button>
        <Button onClick={() => handlePress("0")} type="number" keyName="0">
          0
        </Button>
        <Button
          onClick={() => handlePress("list")}
          type="default"
          keyName="list"
        >
          LIST
        </Button>
      </div>

      <div style={{ height: "8px" }} />

      {/* MENU, BACK, INFO */}
      <div style={{ display: "flex", gap: "10px" }}>
        <Button
          onClick={() => handlePress("menu")}
          type="default"
          keyName="menu"
        >
          MENU
        </Button>
        <Button
          onClick={() => handlePress("back")}
          type="default"
          keyName="back"
        >
          BACK
        </Button>
        <Button
          onClick={() => handlePress("info")}
          type="default"
          keyName="info"
        >
          INFO
        </Button>
      </div>

      {/* EXIT */}
      <Button onClick={() => handlePress("exit")} type="default" keyName="exit">
        EXIT
      </Button>

      <div style={{ height: "12px" }} />

      {/* Навигационный блок */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
        }}
      >
        {/* Верхняя стрелка */}
        <Button
          onClick={() => handlePress("up")}
          type="navigation"
          keyName="up"
        >
          <FaChevronUp size={14} />
        </Button>

        {/* Средний ряд: Left, OK, Right */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Button
            onClick={() => handlePress("left")}
            type="navigation"
            keyName="left"
          >
            <FaChevronLeft size={14} />
          </Button>

          <Button onClick={() => handlePress("ok")} type="ok" keyName="ok">
            OK
          </Button>

          <Button
            onClick={() => handlePress("right")}
            type="navigation"
            keyName="right"
          >
            <FaChevronRight size={14} />
          </Button>
        </div>

        {/* Нижняя стрелка */}
        <Button
          onClick={() => handlePress("down")}
          type="navigation"
          keyName="down"
        >
          <FaChevronDown size={14} />
        </Button>
      </div>

      <div style={{ height: "12px" }} />

      {/* Цветные кнопки */}
      <div style={{ display: "flex", gap: "8px" }}>
        <Button
          onClick={() => handlePress("red")}
          type="colored"
          color="#e53935"
          keyName="red"
        />
        <Button
          onClick={() => handlePress("green")}
          type="colored"
          color="#43a047"
          keyName="green"
        />
        <Button
          onClick={() => handlePress("yellow")}
          type="colored"
          color="#fbc02d"
          keyName="yellow"
        />
        <Button
          onClick={() => handlePress("blue")}
          type="colored"
          color="#1e88e5"
          keyName="blue"
        />
      </div>

      <div style={{ height: "8px" }} />

      {/* Медиа кнопки - верхний ряд */}
      <div style={{ display: "flex", gap: "8px" }}>
        <Button onClick={() => handlePress("prev")} type="media" keyName="prev">
          <FaStepBackward size={8} />
        </Button>
        <Button onClick={() => handlePress("play")} type="media" keyName="play">
          <FaPlay size={8} />
        </Button>
        <Button
          onClick={() => handlePress("pause")}
          type="media"
          keyName="pause"
        >
          <FaPause size={8} />
        </Button>
        <Button onClick={() => handlePress("next")} type="media" keyName="next">
          <FaStepForward size={8} />
        </Button>
      </div>

      {/* Медиа кнопки - нижний ряд */}
      <div style={{ display: "flex", gap: "8px" }}>
        <Button onClick={() => handlePress("ff")} type="media" keyName="ff">
          &gt;&gt;
        </Button>
        <Button onClick={() => handlePress("rec")} type="media" keyName="rec">
          <FaCircle size={8} color="#e53935" />
        </Button>
        <Button onClick={() => handlePress("stop")} type="media" keyName="stop">
          <FaSquare size={8} />
        </Button>
        <Button onClick={() => handlePress("rw")} type="media" keyName="rw">
          &lt;&lt;
        </Button>
      </div>

      <div style={{ flex: 1 }} />

      {/* Логотип OPENBOX с эффектом свечения */}
      <div
        style={{
          color: "#fff",
          fontWeight: "900",
          fontSize: "12px",
          letterSpacing: "1.5px",
          textAlign: "center",
          textShadow:
            "0 2px 4px rgba(0,0,0,0.8), 0 0 10px rgba(255,255,255,0.3)",
          marginTop: "auto",
          background:
            "linear-gradient(145deg, rgba(0,0,0,0.3) 0%, rgba(255,255,255,0.05) 100%)",
          padding: "8px 16px",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        OPENBOX
      </div>
    </div>
  );
}
