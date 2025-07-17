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
  ) => {
    const baseStyle = {
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold" as const,
      fontSize: "11px",
      transition: "all 0.15s ease",
      position: "relative" as const,
      outline: "none",
    };

    switch (type) {
      case "power":
        return {
          ...baseStyle,
          width: "45px",
          height: "20px",
          background: isPressed
            ? "linear-gradient(145deg, #c62828, #e53935)"
            : "linear-gradient(145deg, #e53935, #d32f2f)",
          color: "#fff",
          borderRadius: "10px",
          boxShadow: isPressed
            ? "inset 0 2px 4px rgba(0,0,0,0.3)"
            : "0 2px 4px rgba(0,0,0,0.3)",
        };

      case "number":
        return {
          ...baseStyle,
          width: "28px",
          height: "28px",
          background: isPressed
            ? "linear-gradient(145deg, #1a1a1a, #2d2d2d)"
            : "linear-gradient(145deg, #2d2d2d, #1a1a1a)",
          color: "#fff",
          borderRadius: "50%",
          boxShadow: isPressed
            ? "inset 0 2px 4px rgba(0,0,0,0.5)"
            : "0 2px 6px rgba(0,0,0,0.4)",
          fontSize: "12px",
        };

      case "colored":
        return {
          ...baseStyle,
          width: "24px",
          height: "18px",
          background: isPressed
            ? `linear-gradient(145deg, ${color}cc, ${color})`
            : `linear-gradient(145deg, ${color}, ${color}dd)`,
          color: "#fff",
          borderRadius: "6px",
          boxShadow: isPressed
            ? "inset 0 2px 4px rgba(0,0,0,0.3)"
            : "0 2px 4px rgba(0,0,0,0.3)",
          fontSize: "8px",
        };

      case "navigation":
        return {
          ...baseStyle,
          width: "32px",
          height: "32px",
          background: isPressed
            ? "linear-gradient(145deg, #1a1a1a, #2d2d2d)"
            : "linear-gradient(145deg, #2d2d2d, #1a1a1a)",
          color: "#fff",
          borderRadius: "50%",
          boxShadow: isPressed
            ? "inset 0 2px 4px rgba(0,0,0,0.5)"
            : "0 2px 6px rgba(0,0,0,0.4)",
        };

      case "ok":
        return {
          ...baseStyle,
          width: "48px",
          height: "48px",
          background: isPressed
            ? "linear-gradient(145deg, #1a1a1a, #2d2d2d)"
            : "linear-gradient(145deg, #2d2d2d, #1a1a1a)",
          color: "#fff",
          borderRadius: "50%",
          boxShadow: isPressed
            ? "inset 0 3px 6px rgba(0,0,0,0.5)"
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
            ? "linear-gradient(145deg, #1a1a1a, #2d2d2d)"
            : "linear-gradient(145deg, #2d2d2d, #1a1a1a)",
          color: "#fff",
          borderRadius: "4px",
          boxShadow: isPressed
            ? "inset 0 2px 4px rgba(0,0,0,0.5)"
            : "0 2px 4px rgba(0,0,0,0.4)",
          fontSize: "10px",
        };

      default:
        return {
          ...baseStyle,
          width: "35px",
          height: "20px",
          background: isPressed
            ? "linear-gradient(145deg, #1a1a1a, #2d2d2d)"
            : "linear-gradient(145deg, #2d2d2d, #1a1a1a)",
          color: "#fff",
          borderRadius: "8px",
          boxShadow: isPressed
            ? "inset 0 2px 4px rgba(0,0,0,0.5)"
            : "0 2px 4px rgba(0,0,0,0.4)",
          fontSize: "9px",
        };
    }
  };

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
        boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.4)",
        border: "2px solid #404040",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Кнопка питания */}
      <button
        onClick={() => handlePress("power")}
        style={getButtonStyle("power", undefined, pressed === "power")}
      >
        <FaPowerOff size={12} />
      </button>

      <div style={{ height: "4px" }} />

      {/* Цифровые кнопки 1-3 */}
      <div style={{ display: "flex", gap: "12px" }}>
        {["1", "2", "3"].map((num) => (
          <button
            key={num}
            onClick={() => handlePress(num)}
            style={getButtonStyle("number", undefined, pressed === num)}
          >
            {num}
          </button>
        ))}
      </div>

      {/* Цифровые кнопки 4-6 */}
      <div style={{ display: "flex", gap: "12px" }}>
        {["4", "5", "6"].map((num) => (
          <button
            key={num}
            onClick={() => handlePress(num)}
            style={getButtonStyle("number", undefined, pressed === num)}
          >
            {num}
          </button>
        ))}
      </div>

      {/* Цифровые кнопки 7-9 */}
      <div style={{ display: "flex", gap: "12px" }}>
        {["7", "8", "9"].map((num) => (
          <button
            key={num}
            onClick={() => handlePress(num)}
            style={getButtonStyle("number", undefined, pressed === num)}
          >
            {num}
          </button>
        ))}
      </div>

      {/* LANG, 0, LIST */}
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <button
          onClick={() => handlePress("lang")}
          style={getButtonStyle("default", undefined, pressed === "lang")}
        >
          LANG
        </button>
        <button
          onClick={() => handlePress("0")}
          style={getButtonStyle("number", undefined, pressed === "0")}
        >
          0
        </button>
        <button
          onClick={() => handlePress("list")}
          style={getButtonStyle("default", undefined, pressed === "list")}
        >
          LIST
        </button>
      </div>

      <div style={{ height: "8px" }} />

      {/* MENU, BACK, INFO */}
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={() => handlePress("menu")}
          style={getButtonStyle("default", undefined, pressed === "menu")}
        >
          MENU
        </button>
        <button
          onClick={() => handlePress("back")}
          style={getButtonStyle("default", undefined, pressed === "back")}
        >
          BACK
        </button>
        <button
          onClick={() => handlePress("info")}
          style={getButtonStyle("default", undefined, pressed === "info")}
        >
          INFO
        </button>
      </div>

      {/* EXIT */}
      <button
        onClick={() => handlePress("exit")}
        style={getButtonStyle("default", undefined, pressed === "exit")}
      >
        EXIT
      </button>

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
        <button
          onClick={() => handlePress("up")}
          style={getButtonStyle("navigation", undefined, pressed === "up")}
        >
          <FaChevronUp size={14} />
        </button>

        {/* Средний ряд: Left, OK, Right */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <button
            onClick={() => handlePress("left")}
            style={getButtonStyle("navigation", undefined, pressed === "left")}
          >
            <FaChevronLeft size={14} />
          </button>

          <button
            onClick={() => handlePress("ok")}
            style={getButtonStyle("ok", undefined, pressed === "ok")}
          >
            OK
          </button>

          <button
            onClick={() => handlePress("right")}
            style={getButtonStyle("navigation", undefined, pressed === "right")}
          >
            <FaChevronRight size={14} />
          </button>
        </div>

        {/* Нижняя стрелка */}
        <button
          onClick={() => handlePress("down")}
          style={getButtonStyle("navigation", undefined, pressed === "down")}
        >
          <FaChevronDown size={14} />
        </button>
      </div>

      <div style={{ height: "12px" }} />

      {/* Цветные кнопки */}
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={() => handlePress("red")}
          style={getButtonStyle("colored", "#e53935", pressed === "red")}
        ></button>
        <button
          onClick={() => handlePress("green")}
          style={getButtonStyle("colored", "#43a047", pressed === "green")}
        ></button>
        <button
          onClick={() => handlePress("yellow")}
          style={getButtonStyle("colored", "#fbc02d", pressed === "yellow")}
        ></button>
        <button
          onClick={() => handlePress("blue")}
          style={getButtonStyle("colored", "#1e88e5", pressed === "blue")}
        ></button>
      </div>

      <div style={{ height: "8px" }} />

      {/* Медиа кнопки - верхний ряд */}
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={() => handlePress("prev")}
          style={getButtonStyle("media", undefined, pressed === "prev")}
        >
          <FaStepBackward size={8} />
        </button>
        <button
          onClick={() => handlePress("play")}
          style={getButtonStyle("media", undefined, pressed === "play")}
        >
          <FaPlay size={8} />
        </button>
        <button
          onClick={() => handlePress("pause")}
          style={getButtonStyle("media", undefined, pressed === "pause")}
        >
          <FaPause size={8} />
        </button>
        <button
          onClick={() => handlePress("next")}
          style={getButtonStyle("media", undefined, pressed === "next")}
        >
          <FaStepForward size={8} />
        </button>
      </div>

      {/* Медиа кнопки - нижний ряд */}
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={() => handlePress("ff")}
          style={getButtonStyle("media", undefined, pressed === "ff")}
        >
          &gt;&gt;
        </button>
        <button
          onClick={() => handlePress("rec")}
          style={getButtonStyle("media", undefined, pressed === "rec")}
        >
          <FaCircle size={8} color="#e53935" />
        </button>
        <button
          onClick={() => handlePress("stop")}
          style={getButtonStyle("media", undefined, pressed === "stop")}
        >
          <FaSquare size={8} />
        </button>
        <button
          onClick={() => handlePress("rw")}
          style={getButtonStyle("media", undefined, pressed === "rw")}
        >
          &lt;&lt;
        </button>
      </div>

      <div style={{ flex: 1 }} />

      {/* Логотип OPENBOX */}
      <div
        style={{
          color: "#fff",
          fontWeight: "900",
          fontSize: "12px",
          letterSpacing: "1.5px",
          textAlign: "center",
          textShadow: "0 2px 4px rgba(0,0,0,0.8)",
          marginTop: "auto",
        }}
      >
        OPENBOX
      </div>
    </div>
  );
}
