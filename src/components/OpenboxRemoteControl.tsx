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
  const [tvResponse, setTvResponse] = useState<any>(null);
  const { sendCommand } = useTVControl();

  // Слушаем ответы от ТВ интерфейса для создания обратной связи
  useEffect(() => {
    const handleTvResponse = (event: CustomEvent) => {
      setTvResponse(event.detail);
    };

    window.addEventListener("tv-response", handleTvResponse as EventListener);

    return () => {
      window.removeEventListener(
        "tv-response",
        handleTvResponse as EventListener,
      );
    };
  }, []);

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

  // Стили для разных типов кнопок - строго по референсу
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
      fontSize: "10px",
      transition: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "relative" as const,
      outline: "none",
      transform: isPressed
        ? "scale(0.92)"
        : isHovered
          ? "scale(1.02)"
          : "scale(1)",
    };

    switch (type) {
      case "power":
        return {
          ...baseStyle,
          width: "32px",
          height: "16px",
          background: isPressed
            ? "linear-gradient(145deg, #c62828, #e53935)"
            : "#d32f2f",
          color: "#fff",
          borderRadius: "8px",
          boxShadow: isPressed
            ? "inset 0 2px 4px rgba(0,0,0,0.4)"
            : "0 1px 3px rgba(0,0,0,0.3)",
          fontSize: "8px",
        };

      case "number":
        return {
          ...baseStyle,
          width: "24px",
          height: "24px",
          background: isPressed
            ? "linear-gradient(145deg, #1a1a1a, #2d2d2d)"
            : "linear-gradient(145deg, #2d2d2d, #1a1a1a)",
          color: "#fff",
          borderRadius: "50%",
          boxShadow: isPressed
            ? "inset 0 2px 4px rgba(0,0,0,0.5)"
            : "0 1px 4px rgba(0,0,0,0.4)",
          fontSize: "11px",
          fontWeight: "600" as const,
        };

      case "colored":
        return {
          ...baseStyle,
          width: "18px",
          height: "14px",
          background: color,
          color: "#fff",
          borderRadius: "3px",
          boxShadow: isPressed
            ? `inset 0 1px 3px rgba(0,0,0,0.4)`
            : "0 1px 2px rgba(0,0,0,0.3)",
          fontSize: "6px",
        };

      case "navigation":
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
            : "0 1px 4px rgba(0,0,0,0.4)",
        };

      case "ok":
        return {
          ...baseStyle,
          width: "40px",
          height: "40px",
          background: isPressed
            ? "linear-gradient(145deg, #1a1a1a, #2d2d2d)"
            : "linear-gradient(145deg, #2d2d2d, #1a1a1a)",
          color: "#fff",
          borderRadius: "50%",
          boxShadow: isPressed
            ? "inset 0 3px 6px rgba(0,0,0,0.5)"
            : "0 2px 6px rgba(0,0,0,0.4)",
          fontSize: "11px",
          fontWeight: "bold" as const,
        };

      case "media":
        return {
          ...baseStyle,
          width: "18px",
          height: "18px",
          background: isPressed
            ? "linear-gradient(145deg, #1a1a1a, #2d2d2d)"
            : "linear-gradient(145deg, #2d2d2d, #1a1a1a)",
          color: "#fff",
          borderRadius: "3px",
          boxShadow: isPressed
            ? "inset 0 1px 3px rgba(0,0,0,0.5)"
            : "0 1px 3px rgba(0,0,0,0.4)",
          fontSize: "8px",
        };

      default:
        return {
          ...baseStyle,
          width: "28px",
          height: "16px",
          background: isPressed
            ? "linear-gradient(145deg, #1a1a1a, #2d2d2d)"
            : "linear-gradient(145deg, #2d2d2d, #1a1a1a)",
          color: "#fff",
          borderRadius: "6px",
          boxShadow: isPressed
            ? "inset 0 1px 3px rgba(0,0,0,0.5)"
            : "0 1px 3px rgba(0,0,0,0.4)",
          fontSize: "7px",
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
        width: "160px",
        height: "520px",
        background:
          "linear-gradient(145deg, #2d2d2d 0%, #1a1a1a 50%, #000000 100%)",
        borderRadius: "28px",
        padding: "16px 12px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "6px",
        boxShadow:
          "0 8px 24px rgba(0,0,0,0.6), 0 4px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
        border: "1px solid #404040",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Кнопка питания */}
      <Button onClick={() => handlePress("power")} type="power" keyName="power">
        <FaPowerOff size={8} />
      </Button>

      <div style={{ height: "2px" }} />

      {/* Кнопка MUTE */}
      <Button onClick={() => handlePress("mute")} type="default" keyName="mute">
        MUTE
      </Button>

      <div style={{ height: "4px" }} />

      {/* Цифровые кнопки 1-3 */}
      <div style={{ display: "flex", gap: "8px" }}>
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
      <div style={{ display: "flex", gap: "8px" }}>
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
      <div style={{ display: "flex", gap: "8px" }}>
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
      <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
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
      <div style={{ display: "flex", gap: "6px" }}>
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

      <div style={{ height: "8px" }} />

      {/* Навигационный блок */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
        }}
      >
        {/* Верхняя стрелка */}
        <Button
          onClick={() => handlePress("up")}
          type="navigation"
          keyName="up"
        >
          <FaChevronUp size={10} />
        </Button>

        {/* Средний ряд: Left, OK, Right */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <Button
            onClick={() => handlePress("left")}
            type="navigation"
            keyName="left"
          >
            <FaChevronLeft size={10} />
          </Button>

          <Button onClick={() => handlePress("ok")} type="ok" keyName="ok">
            OK
          </Button>

          <Button
            onClick={() => handlePress("right")}
            type="navigation"
            keyName="right"
          >
            <FaChevronRight size={10} />
          </Button>
        </div>

        {/* Нижняя стрелка */}
        <Button
          onClick={() => handlePress("down")}
          type="navigation"
          keyName="down"
        >
          <FaChevronDown size={10} />
        </Button>
      </div>

      <div style={{ height: "8px" }} />

      {/* Цветные кнопки строго по референсу */}
      <div style={{ display: "flex", gap: "6px" }}>
        <Button
          onClick={() => handlePress("red")}
          type="colored"
          color="#e53935"
          keyName="red"
        >
          <></>
        </Button>
        <Button
          onClick={() => handlePress("green")}
          type="colored"
          color="#43a047"
          keyName="green"
        >
          <></>
        </Button>
        <Button
          onClick={() => handlePress("yellow")}
          type="colored"
          color="#fbc02d"
          keyName="yellow"
        >
          <></>
        </Button>
        <Button
          onClick={() => handlePress("blue")}
          type="colored"
          color="#1e88e5"
          keyName="blue"
        >
          <></>
        </Button>
      </div>

      <div style={{ height: "6px" }} />

      {/* Медиа кнопки - верхний ряд */}
      <div style={{ display: "flex", gap: "6px" }}>
        <Button onClick={() => handlePress("prev")} type="media" keyName="prev">
          <FaStepBackward size={6} />
        </Button>
        <Button onClick={() => handlePress("play")} type="media" keyName="play">
          <FaPlay size={6} />
        </Button>
        <Button
          onClick={() => handlePress("pause")}
          type="media"
          keyName="pause"
        >
          <FaPause size={6} />
        </Button>
        <Button onClick={() => handlePress("next")} type="media" keyName="next">
          <FaStepForward size={6} />
        </Button>
      </div>

      {/* Медиа кнопки - нижний ряд */}
      <div style={{ display: "flex", gap: "6px" }}>
        <Button onClick={() => handlePress("ff")} type="media" keyName="ff">
          ▶▶
        </Button>
        <Button onClick={() => handlePress("rec")} type="media" keyName="rec">
          <FaCircle size={6} color="#e53935" />
        </Button>
        <Button onClick={() => handlePress("stop")} type="media" keyName="stop">
          <FaSquare size={6} />
        </Button>
        <Button onClick={() => handlePress("rw")} type="media" keyName="rw">
          ◀◀
        </Button>
      </div>

      <div style={{ flex: 1 }} />

      {/* Логотип OPENBOX строго по референсу */}
      <div
        style={{
          color: "#fff",
          fontWeight: "900",
          fontSize: "9px",
          letterSpacing: "1px",
          textAlign: "center",
          textShadow: "0 1px 2px rgba(0,0,0,0.8)",
          marginTop: "auto",
          background: "rgba(0,0,0,0.2)",
          padding: "4px 8px",
          borderRadius: "8px",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        OPENBOX
      </div>
    </div>
  );
}
