import React, { useState, useEffect } from "react";
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
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";
import { useTVControl } from "../context/TVControlContext";

interface RemoteProps {
  onButtonClick?: (key: string) => void;
  highlight?: { key?: string };
  width?: number;
  height?: number;
}

export default function OpenboxRemoteControl({
  onButtonClick,
  highlight,
  width = 320,
  height = 650,
}: RemoteProps) {
  const [pressed, setPressed] = useState<string | null>(null);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const { sendCommand } = useTVControl();

  const handlePress = (key: string) => {
    setPressed(key);
    if (onButtonClick) onButtonClick(key);

    // Отправляем событие для синхронизации с ТВ интерфейсом
    window.dispatchEvent(
      new CustomEvent("remote-command", {
        detail: { type: "button-press", key },
      }),
    );

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
      default:
        break;
    }

    setTimeout(() => setPressed(null), 150);
  };

  // Стили кнопок точно по референсу
  const getButtonStyle = (
    type: "power" | "number" | "nav" | "color" | "media" | "text",
    isPressed: boolean = false,
    color?: string,
  ) => {
    const baseStyle = {
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontFamily: "Arial, sans-serif",
      fontWeight: "600",
      fontSize: "12px",
      transition: "all 0.1s ease",
      boxShadow: isPressed
        ? "inset 0 2px 4px rgba(0,0,0,0.3)"
        : "0 2px 4px rgba(0,0,0,0.3)",
      transform: isPressed ? "translateY(1px)" : "translateY(0)",
    };

    switch (type) {
      case "power":
        return {
          ...baseStyle,
          background: "#DC143C",
          color: "white",
          width: "40px",
          height: "25px",
          fontSize: "14px",
        };
      case "number":
        return {
          ...baseStyle,
          background: "#2C2C2C",
          color: "white",
          width: "35px",
          height: "35px",
          fontSize: "14px",
        };
      case "nav":
        return {
          ...baseStyle,
          background: "#2C2C2C",
          color: "white",
          width: "30px",
          height: "30px",
        };
      case "color":
        return {
          ...baseStyle,
          background: color || "#2C2C2C",
          width: "25px",
          height: "25px",
        };
      case "media":
        return {
          ...baseStyle,
          background: "#2C2C2C",
          color: "white",
          width: "30px",
          height: "25px",
        };
      case "text":
        return {
          ...baseStyle,
          background: "#2C2C2C",
          color: "white",
          fontSize: "9px",
          padding: "4px 8px",
          height: "22px",
        };
    }
  };

  return (
    <div
      className="openbox-remote"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        background: "linear-gradient(145deg, #1a1a1a 0%, #000000 100%)",
        borderRadius: "25px",
        padding: "20px 15px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px",
        position: "relative",
        userSelect: "none",
      }}
    >
      {/* Кнопка питания */}
      <button
        style={getButtonStyle("power", pressed === "power")}
        onMouseDown={() => handlePress("power")}
        onMouseEnter={() => setHoveredButton("power")}
        onMouseLeave={() => setHoveredButton(null)}
      >
        <FaPowerOff size={12} />
      </button>

      <div style={{ fontSize: "10px", color: "#888", marginTop: "-10px" }}>
        MUTE
      </div>

      {/* Цифровые кнопки 1-9 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "8px",
          width: "130px",
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            style={getButtonStyle("number", pressed === num.toString())}
            onMouseDown={() => handlePress(num.toString())}
          >
            {num}
          </button>
        ))}
      </div>

      {/* Кнопки LANG, 0, LIST */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          width: "130px",
          justifyContent: "space-between",
        }}
      >
        <button
          style={getButtonStyle("text", pressed === "lang")}
          onMouseDown={() => handlePress("lang")}
        >
          LANG
        </button>
        <button
          style={getButtonStyle("number", pressed === "0")}
          onMouseDown={() => handlePress("0")}
        >
          0
        </button>
        <button
          style={getButtonStyle("text", pressed === "list")}
          onMouseDown={() => handlePress("list")}
        >
          LIST
        </button>
      </div>

      {/* Кнопки MUTE, INFO, BACK */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          width: "130px",
          justifyContent: "space-between",
        }}
      >
        <button
          style={getButtonStyle("text", pressed === "mute")}
          onMouseDown={() => handlePress("mute")}
        >
          MUTE
        </button>
        <button
          style={getButtonStyle("text", pressed === "info")}
          onMouseDown={() => handlePress("info")}
        >
          INFO
        </button>
        <button
          style={getButtonStyle("text", pressed === "back")}
          onMouseDown={() => handlePress("back")}
        >
          BACK
        </button>
      </div>

      {/* Кнопки MENU, EPG, EXIT */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          width: "130px",
          justifyContent: "space-between",
        }}
      >
        <button
          style={getButtonStyle("text", pressed === "menu")}
          onMouseDown={() => handlePress("menu")}
        >
          MENU
        </button>
        <button
          style={getButtonStyle("text", pressed === "epg")}
          onMouseDown={() => handlePress("epg")}
        >
          EPG
        </button>
        <button
          style={getButtonStyle("text", pressed === "exit")}
          onMouseDown={() => handlePress("exit")}
        >
          EXIT
        </button>
      </div>

      {/* Навигационный круг с OK */}
      <div
        style={{
          position: "relative",
          width: "120px",
          height: "120px",
          margin: "10px 0",
        }}
      >
        {/* Центральная кнопка OK */}
        <button
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: "#2C2C2C",
            color: "white",
            border: "none",
            fontSize: "12px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow:
              pressed === "ok"
                ? "inset 0 2px 4px rgba(0,0,0,0.5)"
                : "0 2px 6px rgba(0,0,0,0.3)",
            transform: `translate(-50%, -50%) ${pressed === "ok" ? "scale(0.95)" : "scale(1)"}`,
            transition: "all 0.1s ease",
          }}
          onMouseDown={() => handlePress("ok")}
        >
          OK
        </button>

        {/* Стрелки навигации */}
        <button
          style={{
            position: "absolute",
            top: "0",
            left: "50%",
            transform: "translateX(-50%)",
            ...getButtonStyle("nav", pressed === "up"),
          }}
          onMouseDown={() => handlePress("up")}
        >
          <FaChevronUp size={14} />
        </button>

        <button
          style={{
            position: "absolute",
            bottom: "0",
            left: "50%",
            transform: "translateX(-50%)",
            ...getButtonStyle("nav", pressed === "down"),
          }}
          onMouseDown={() => handlePress("down")}
        >
          <FaChevronDown size={14} />
        </button>

        <button
          style={{
            position: "absolute",
            left: "0",
            top: "50%",
            transform: "translateY(-50%)",
            ...getButtonStyle("nav", pressed === "left"),
          }}
          onMouseDown={() => handlePress("left")}
        >
          <FaChevronLeft size={14} />
        </button>

        <button
          style={{
            position: "absolute",
            right: "0",
            top: "50%",
            transform: "translateY(-50%)",
            ...getButtonStyle("nav", pressed === "right"),
          }}
          onMouseDown={() => handlePress("right")}
        >
          <FaChevronRight size={14} />
        </button>
      </div>

      {/* Цветные кнопки */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          margin: "10px 0",
        }}
      >
        <button
          style={getButtonStyle("color", pressed === "red", "#DC143C")}
          onMouseDown={() => handlePress("red")}
        />
        <button
          style={getButtonStyle("color", pressed === "green", "#228B22")}
          onMouseDown={() => handlePress("green")}
        />
        <button
          style={getButtonStyle("color", pressed === "yellow", "#FFD700")}
          onMouseDown={() => handlePress("yellow")}
        />
        <button
          style={getButtonStyle("color", pressed === "blue", "#1E90FF")}
          onMouseDown={() => handlePress("blue")}
        />
      </div>

      {/* Кнопки управления воспроизведением */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "8px",
          width: "140px",
          marginTop: "10px",
        }}
      >
        <button
          style={getButtonStyle("media", pressed === "prev")}
          onMouseDown={() => handlePress("prev")}
        >
          <FaStepBackward size={10} />
        </button>
        <button
          style={getButtonStyle("media", pressed === "pause")}
          onMouseDown={() => handlePress("pause")}
        >
          <FaPause size={10} />
        </button>
        <button
          style={getButtonStyle("media", pressed === "play")}
          onMouseDown={() => handlePress("play")}
        >
          <FaPlay size={10} />
        </button>
        <button
          style={getButtonStyle("media", pressed === "next")}
          onMouseDown={() => handlePress("next")}
        >
          <FaStepForward size={10} />
        </button>
      </div>

      {/* Вторая строка медиа кнопок */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "8px",
          width: "140px",
          marginTop: "-5px",
        }}
      >
        <button
          style={getButtonStyle("media", pressed === "rec")}
          onMouseDown={() => handlePress("rec")}
        >
          <FaCircle size={8} style={{ color: "#DC143C" }} />
        </button>
        <button
          style={getButtonStyle("media", pressed === "stop")}
          onMouseDown={() => handlePress("stop")}
        >
          <FaSquare size={10} />
        </button>
        <button
          style={getButtonStyle("media", pressed === "replay")}
          onMouseDown={() => handlePress("replay")}
        >
          ↺
        </button>
        <button
          style={getButtonStyle("media", pressed === "skip")}
          onMouseDown={() => handlePress("skip")}
        >
          ↻
        </button>
      </div>

      {/* Лого OPENBOX */}
      <div
        style={{
          marginTop: "15px",
          fontSize: "14px",
          fontWeight: "bold",
          color: "#888",
          letterSpacing: "1px",
        }}
      >
        OPENBOX
      </div>
    </div>
  );
}
