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

  const scale = Math.min(width / 180, height / 480);

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        width={180 * scale}
        height={480 * scale}
        viewBox="0 0 180 480"
        style={{
          filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.4))",
        }}
      >
        <defs>
          {/* Градиенты для корпуса */}
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4a5568" />
            <stop offset="30%" stopColor="#2d3748" />
            <stop offset="70%" stopColor="#1a202c" />
            <stop offset="100%" stopColor="#0a0f15" />
          </linearGradient>

          {/* Градиент для кнопок */}
          <linearGradient
            id="buttonGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#4a5568" />
            <stop offset="50%" stopColor="#2d3748" />
            <stop offset="100%" stopColor="#1a202c" />
          </linearGradient>

          {/* Градиент для нажатых кнопок */}
          <linearGradient
            id="pressedGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#1a202c" />
            <stop offset="50%" stopColor="#2d3748" />
            <stop offset="100%" stopColor="#4a5568" />
          </linearGradient>

          {/* Градиент для красной кнопки питания */}
          <radialGradient id="powerGradient" cx="50%" cy="30%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="70%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#991b1b" />
          </radialGradient>

          {/* Цветные градиенты */}
          <radialGradient id="redGradient" cx="50%" cy="30%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#991b1b" />
          </radialGradient>

          <radialGradient id="greenGradient" cx="50%" cy="30%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#15803d" />
          </radialGradient>

          <radialGradient id="yellowGradient" cx="50%" cy="30%">
            <stop offset="0%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#a16207" />
          </radialGradient>

          <radialGradient id="blueGradient" cx="50%" cy="30%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </radialGradient>

          {/* Фильтр для внутренней тени */}
          <filter id="innerShadow">
            <feOffset dx="0" dy="2" />
            <feGaussianBlur stdDeviation="2" result="offset-blur" />
            <feFlood floodColor="#000000" floodOpacity="0.3" />
            <feComposite in2="offset-blur" operator="in" />
          </filter>
        </defs>

        {/* Изогнутый корпус пульта */}
        <path
          d="M 30 20 
             C 30 10, 40 0, 50 0
             L 130 0
             C 140 0, 150 10, 150 20
             L 150 440
             C 150 460, 140 470, 130 470
             L 125 470
             C 115 475, 105 480, 90 480
             C 75 480, 65 475, 55 470
             L 50 470
             C 40 470, 30 460, 30 440
             Z"
          fill="url(#bodyGradient)"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
        />

        {/* Кнопка питания */}
        <g>
          <circle
            cx="50"
            cy="35"
            r="12"
            fill={
              pressed === "power"
                ? "url(#pressedGradient)"
                : "url(#powerGradient)"
            }
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1"
            style={{ cursor: "pointer" }}
            onMouseDown={() => handlePress("power")}
            transform={pressed === "power" ? "scale(0.95)" : "scale(1)"}
            style={{ transformOrigin: "50 35" }}
          />
          <text
            x="50"
            y="40"
            textAnchor="middle"
            fill="white"
            fontSize="10"
            fontWeight="bold"
          >
            ⏻
          </text>
        </g>

        {/* TV/RADIO и Звук кнопки */}
        <g>
          <rect
            x="75"
            y="25"
            width="25"
            height="12"
            rx="6"
            fill={
              pressed === "tvradio"
                ? "url(#pressedGradient)"
                : "url(#buttonGradient)"
            }
            stroke="rgba(255,255,255,0.1)"
            style={{ cursor: "pointer" }}
            onMouseDown={() => handlePress("tvradio")}
          />
          <text
            x="87.5"
            y="33"
            textAnchor="middle"
            fill="white"
            fontSize="6"
            fontWeight="bold"
          >
            TV/RADIO
          </text>

          <circle
            cx="130"
            cy="35"
            r="12"
            fill={
              pressed === "mute"
                ? "url(#pressedGradient)"
                : "url(#buttonGradient)"
            }
            stroke="rgba(255,255,255,0.1)"
            style={{ cursor: "pointer" }}
            onMouseDown={() => handlePress("mute")}
            transform={pressed === "mute" ? "scale(0.95)" : "scale(1)"}
            style={{ transformOrigin: "130 35" }}
          />
          <text x="130" y="40" textAnchor="middle" fill="white" fontSize="12">
            🔇
          </text>
        </g>

        {/* Цифровые кнопки 1-9 */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num, index) => {
          const row = Math.floor(index / 3);
          const col = index % 3;
          const x = 50 + col * 30;
          const y = 70 + row * 25;

          return (
            <g key={num}>
              <ellipse
                cx={x}
                cy={y}
                rx="12"
                ry="10"
                fill={
                  pressed === num.toString()
                    ? "url(#pressedGradient)"
                    : "url(#buttonGradient)"
                }
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
                style={{ cursor: "pointer" }}
                onMouseDown={() => handlePress(num.toString())}
                transform={
                  pressed === num.toString() ? "scale(0.95)" : "scale(1)"
                }
                style={{ transformOrigin: `${x} ${y}` }}
              />
              <text
                x={x}
                y={y + 3}
                textAnchor="middle"
                fill="white"
                fontSize="12"
                fontWeight="bold"
              >
                {num}
              </text>
            </g>
          );
        })}

        {/* LANG, 0, LIST */}
        <g>
          <rect
            x="38"
            y="145"
            width="20"
            height="12"
            rx="6"
            fill={
              pressed === "lang"
                ? "url(#pressedGradient)"
                : "url(#buttonGradient)"
            }
            stroke="rgba(255,255,255,0.1)"
            style={{ cursor: "pointer" }}
            onMouseDown={() => handlePress("lang")}
          />
          <text
            x="48"
            y="153"
            textAnchor="middle"
            fill="white"
            fontSize="6"
            fontWeight="bold"
          >
            LANG
          </text>

          <ellipse
            cx="80"
            cy="151"
            rx="12"
            ry="10"
            fill={
              pressed === "0" ? "url(#pressedGradient)" : "url(#buttonGradient)"
            }
            stroke="rgba(255,255,255,0.1)"
            style={{ cursor: "pointer" }}
            onMouseDown={() => handlePress("0")}
            transform={pressed === "0" ? "scale(0.95)" : "scale(1)"}
            style={{ transformOrigin: "80 151" }}
          />
          <text
            x="80"
            y="155"
            textAnchor="middle"
            fill="white"
            fontSize="12"
            fontWeight="bold"
          >
            0
          </text>

          <rect
            x="122"
            y="145"
            width="20"
            height="12"
            rx="6"
            fill={
              pressed === "list"
                ? "url(#pressedGradient)"
                : "url(#buttonGradient)"
            }
            stroke="rgba(255,255,255,0.1)"
            style={{ cursor: "pointer" }}
            onMouseDown={() => handlePress("list")}
          />
          <text
            x="132"
            y="153"
            textAnchor="middle"
            fill="white"
            fontSize="6"
            fontWeight="bold"
          >
            LIST
          </text>
        </g>

        {/* BACK, INFO */}
        <g>
          <rect
            x="48"
            y="170"
            width="20"
            height="12"
            rx="6"
            fill={
              pressed === "back"
                ? "url(#pressedGradient)"
                : "url(#buttonGradient)"
            }
            stroke="rgba(255,255,255,0.1)"
            style={{ cursor: "pointer" }}
            onMouseDown={() => handlePress("back")}
          />
          <text
            x="58"
            y="178"
            textAnchor="middle"
            fill="white"
            fontSize="6"
            fontWeight="bold"
          >
            BACK
          </text>

          <rect
            x="112"
            y="170"
            width="20"
            height="12"
            rx="6"
            fill={
              pressed === "info"
                ? "url(#pressedGradient)"
                : "url(#buttonGradient)"
            }
            stroke="rgba(255,255,255,0.1)"
            style={{ cursor: "pointer" }}
            onMouseDown={() => handlePress("info")}
          />
          <text
            x="122"
            y="178"
            textAnchor="middle"
            fill="white"
            fontSize="6"
            fontWeight="bold"
          >
            INFO
          </text>
        </g>

        {/* MENU, EXIT */}
        <g>
          <circle
            cx="48"
            cy="200"
            r="15"
            fill={
              pressed === "menu"
                ? "url(#pressedGradient)"
                : "url(#buttonGradient)"
            }
            stroke="rgba(255,255,255,0.1)"
            style={{ cursor: "pointer" }}
            onMouseDown={() => handlePress("menu")}
            transform={pressed === "menu" ? "scale(0.95)" : "scale(1)"}
            style={{ transformOrigin: "48 200" }}
          />
          <text
            x="48"
            y="205"
            textAnchor="middle"
            fill="white"
            fontSize="7"
            fontWeight="bold"
          >
            MENU
          </text>

          <circle
            cx="132"
            cy="200"
            r="15"
            fill={
              pressed === "exit"
                ? "url(#pressedGradient)"
                : "url(#buttonGradient)"
            }
            stroke="rgba(255,255,255,0.1)"
            style={{ cursor: "pointer" }}
            onMouseDown={() => handlePress("exit")}
            transform={pressed === "exit" ? "scale(0.95)" : "scale(1)"}
            style={{ transformOrigin: "132 200" }}
          />
          <text
            x="132"
            y="205"
            textAnchor="middle"
            fill="white"
            fontSize="7"
            fontWeight="bold"
          >
            EXIT
          </text>
        </g>

        {/* Навигационный круг с OK */}
        <g>
          {/* Внешний навигационный круг */}
          <circle
            cx="90"
            cy="240"
            r="35"
            fill="url(#buttonGradient)"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
          />

          {/* Стрелка ВВЕРХ */}
          <path
            d="M 85 210 L 90 205 L 95 210 L 90 215 Z"
            fill={
              pressed === "up"
                ? "url(#pressedGradient)"
                : "url(#buttonGradient)"
            }
            stroke="rgba(255,255,255,0.2)"
            style={{ cursor: "pointer" }}
            onMouseDown={() => handlePress("up")}
            transform={pressed === "up" ? "scale(0.9)" : "scale(1)"}
            style={{ transformOrigin: "90 210" }}
          />
          <text x="90" y="218" textAnchor="middle" fill="white" fontSize="8">
            ▲
          </text>

          {/* Стрелка ВНИЗ */}
          <path
            d="M 85 270 L 90 275 L 95 270 L 90 265 Z"
            fill={
              pressed === "down"
                ? "url(#pressedGradient)"
                : "url(#buttonGradient)"
            }
            stroke="rgba(255,255,255,0.2)"
            style={{ cursor: "pointer" }}
            onMouseDown={() => handlePress("down")}
            transform={pressed === "down" ? "scale(0.9)" : "scale(1)"}
            style={{ transformOrigin: "90 270" }}
          />
          <text x="90" y="268" textAnchor="middle" fill="white" fontSize="8">
            ▼
          </text>

          {/* Стрелка ВЛЕВО */}
          <path
            d="M 60 235 L 55 240 L 60 245 L 65 240 Z"
            fill={
              pressed === "left"
                ? "url(#pressedGradient)"
                : "url(#buttonGradient)"
            }
            stroke="rgba(255,255,255,0.2)"
            style={{ cursor: "pointer" }}
            onMouseDown={() => handlePress("left")}
            transform={pressed === "left" ? "scale(0.9)" : "scale(1)"}
            style={{ transformOrigin: "60 240" }}
          />
          <text x="68" y="244" textAnchor="middle" fill="white" fontSize="8">
            ◀
          </text>

          {/* Стрелка ВПРАВО */}
          <path
            d="M 120 235 L 125 240 L 120 245 L 115 240 Z"
            fill={
              pressed === "right"
                ? "url(#pressedGradient)"
                : "url(#buttonGradient)"
            }
            stroke="rgba(255,255,255,0.2)"
            style={{ cursor: "pointer" }}
            onMouseDown={() => handlePress("right")}
            transform={pressed === "right" ? "scale(0.9)" : "scale(1)"}
            style={{ transformOrigin: "120 240" }}
          />
          <text x="112" y="244" textAnchor="middle" fill="white" fontSize="8">
            ▶
          </text>

          {/* Центральная кнопка OK */}
          <circle
            cx="90"
            cy="240"
            r="18"
            fill={
              pressed === "ok"
                ? "url(#pressedGradient)"
                : "url(#buttonGradient)"
            }
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="2"
            style={{ cursor: "pointer" }}
            onMouseDown={() => handlePress("ok")}
            transform={pressed === "ok" ? "scale(0.95)" : "scale(1)"}
            style={{ transformOrigin: "90 240" }}
          />
          <text
            x="90"
            y="245"
            textAnchor="middle"
            fill="white"
            fontSize="10"
            fontWeight="bold"
          >
            OK
          </text>
        </g>

        {/* VOL и PAGE кнопки */}
        <g>
          <text x="30" y="295" fill="white" fontSize="6">
            • • VOL • • •
          </text>
          <text x="120" y="295" fill="white" fontSize="6">
            • • • PAGE • •
          </text>
        </g>

        {/* Цветные кнопки */}
        <g>
          {/* Красная */}
          <circle
            cx="50"
            cy="320"
            r="12"
            fill={
              pressed === "aspect"
                ? "url(#pressedGradient)"
                : "url(#redGradient)"
            }
            stroke="rgba(255,255,255,0.2)"
            style={{ cursor: "pointer" }}
            onMouseDown={() => handlePress("aspect")}
            transform={pressed === "aspect" ? "scale(0.95)" : "scale(1)"}
            style={{ transformOrigin: "50 320" }}
          />
          <text x="50" y="338" textAnchor="middle" fill="white" fontSize="6">
            ASPECT
          </text>

          {/* Зеленая */}
          <circle
            cx="75"
            cy="320"
            r="12"
            fill={
              pressed === "epg"
                ? "url(#pressedGradient)"
                : "url(#greenGradient)"
            }
            stroke="rgba(255,255,255,0.2)"
            style={{ cursor: "pointer" }}
            onMouseDown={() => handlePress("epg")}
            transform={pressed === "epg" ? "scale(0.95)" : "scale(1)"}
            style={{ transformOrigin: "75 320" }}
          />
          <text x="75" y="338" textAnchor="middle" fill="white" fontSize="6">
            EPG
          </text>

          {/* Желтая */}
          <circle
            cx="105"
            cy="320"
            r="12"
            fill={
              pressed === "option"
                ? "url(#pressedGradient)"
                : "url(#yellowGradient)"
            }
            stroke="rgba(255,255,255,0.2)"
            style={{ cursor: "pointer" }}
            onMouseDown={() => handlePress("option")}
            transform={pressed === "option" ? "scale(0.95)" : "scale(1)"}
            style={{ transformOrigin: "105 320" }}
          />
          <text x="105" y="338" textAnchor="middle" fill="white" fontSize="6">
            OPTION
          </text>

          {/* Синяя */}
          <circle
            cx="130"
            cy="320"
            r="12"
            fill={
              pressed === "sleep"
                ? "url(#pressedGradient)"
                : "url(#blueGradient)"
            }
            stroke="rgba(255,255,255,0.2)"
            style={{ cursor: "pointer" }}
            onMouseDown={() => handlePress("sleep")}
            transform={pressed === "sleep" ? "scale(0.95)" : "scale(1)"}
            style={{ transformOrigin: "130 320" }}
          />
          <text x="130" y="338" textAnchor="middle" fill="white" fontSize="6">
            SLEEP
          </text>
        </g>

        {/* Медиа кнопки - первая строка */}
        <g>
          {[
            { key: "rewind", x: 45, icon: "⏪" },
            { key: "pause", x: 70, icon: "⏸" },
            { key: "play", x: 95, icon: "▶" },
            { key: "forward", x: 120, icon: "⏩" },
          ].map(({ key, x, icon }) => (
            <g key={key}>
              <rect
                x={x - 8}
                y="355"
                width="16"
                height="12"
                rx="6"
                fill={
                  pressed === key
                    ? "url(#pressedGradient)"
                    : "url(#buttonGradient)"
                }
                stroke="rgba(255,255,255,0.1)"
                style={{ cursor: "pointer" }}
                onMouseDown={() => handlePress(key)}
                transform={pressed === key ? "scale(0.95)" : "scale(1)"}
                style={{ transformOrigin: `${x} 361` }}
              />
              <text x={x} y="363" textAnchor="middle" fill="white" fontSize="8">
                {icon}
              </text>
            </g>
          ))}
        </g>

        {/* Медиа кнопки - вторая строка */}
        <g>
          {[
            { key: "prev", x: 45, icon: "⏮" },
            { key: "rec", x: 70, icon: "⏺" },
            { key: "stop", x: 95, icon: "⏹" },
            { key: "next", x: 120, icon: "⏭" },
          ].map(({ key, x, icon }) => (
            <g key={key}>
              <rect
                x={x - 8}
                y="375"
                width="16"
                height="12"
                rx="6"
                fill={
                  pressed === key
                    ? "url(#pressedGradient)"
                    : "url(#buttonGradient)"
                }
                stroke="rgba(255,255,255,0.1)"
                style={{ cursor: "pointer" }}
                onMouseDown={() => handlePress(key)}
                transform={pressed === key ? "scale(0.95)" : "scale(1)"}
                style={{ transformOrigin: `${x} 381` }}
              />
              <text x={x} y="383" textAnchor="middle" fill="white" fontSize="8">
                {icon}
              </text>
            </g>
          ))}
        </g>

        {/* Логотип AHT-MINI */}
        <text
          x="90"
          y="410"
          textAnchor="middle"
          fill="#888888"
          fontSize="8"
          fontWeight="bold"
        >
          AHT-MINI
        </text>

        {/* Логотип OPENBOX */}
        <text
          x="90"
          y="425"
          textAnchor="middle"
          fill="#888888"
          fontSize="12"
          fontWeight="bold"
        >
          OPENBOX®
        </text>

        {/* SUHROB JON */}
        <text x="90" y="440" textAnchor="middle" fill="#666666" fontSize="6">
          SUHROB JON
        </text>
      </svg>
    </div>
  );
}
