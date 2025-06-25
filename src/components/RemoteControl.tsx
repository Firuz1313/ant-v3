import React, { useState } from "react";
import { FaPowerOff, FaVolumeUp, FaVolumeDown, FaChevronUp, FaChevronDown, FaChevronLeft, FaChevronRight, FaRegCircle, FaPlay, FaPause, FaStop, FaYoutube, FaArrowLeft, FaArrowRight, FaArrowUp, FaArrowDown, FaMicrophone, FaTv, FaTh, FaListUl, FaRegSquare, FaRegDotCircle } from "react-icons/fa";
import { MdMenu, MdSubtitles, MdTextFields, MdSettingsVoice } from "react-icons/md";
import { IoMdReturnLeft } from "react-icons/io";

const buttonMap = [
  // Верхний ряд
  [
    { label: "Power", icon: <FaPowerOff color="#e53935" />, key: "power" },
    { label: "Mute", icon: <FaRegCircle />, key: "mute" },
  ],
  // Цветные кнопки
  [
    { label: "ZOOM", color: "#e53935", key: "zoom" },
    { label: "GOTO", color: "#43a047", key: "goto" },
    { label: "PAUSE", color: "#fbc02d", key: "pause" },
    { label: "TV/Radio", color: "#1e88e5", key: "tv_radio" },
  ],
  // Кнопки управления
  [
    { label: "YouTube", icon: <FaYoutube color="#e53935" />, key: "youtube" },
    { label: "IPTV", color: "#1e88e5", key: "iptv" },
    { label: "FAV", key: "fav" },
    { label: "EPG", key: "epg" },
  ],
  // Стрелки и OK
  [
    { label: "Menu", icon: <MdMenu />, key: "menu" },
    { label: "Up", icon: <FaChevronUp />, key: "up" },
    { label: "Exit", key: "exit" },
  ],
  [
    { label: "Left", icon: <FaChevronLeft />, key: "left" },
    { label: "OK", icon: <FaRegCircle />, key: "ok", big: true },
    { label: "Right", icon: <FaChevronRight />, key: "right" },
  ],
  [
    { label: "Audio", key: "audio" },
    { label: "Down", icon: <FaChevronDown />, key: "down" },
    { label: "SAT", key: "sat" },
  ],
  // Громкость и каналы
  [
    { label: "VOL-", icon: <FaVolumeDown />, key: "vol_down" },
    { label: "Recall", key: "recall" },
    { label: "CH-", key: "ch_down" },
  ],
  [
    { label: "VOL+", icon: <FaVolumeUp />, key: "vol_up" },
    { label: "CH+", key: "ch_up" },
  ],
  // Цифровой блок
  [
    { label: "1", key: "1" },
    { label: "2", key: "2" },
    { label: "3", key: "3" },
  ],
  [
    { label: "4", key: "4" },
    { label: "5", key: "5" },
    { label: "6", key: "6" },
  ],
  [
    { label: "7", key: "7" },
    { label: "8", key: "8" },
    { label: "9", key: "9" },
  ],
  [
    { label: "SUBTL", icon: <MdSubtitles />, key: "subtl" },
    { label: "0", key: "0" },
    { label: "TXT", icon: <MdTextFields />, key: "txt" },
  ],
];

export default function RemoteControl({ onButtonClick }: { onButtonClick?: (key: string) => void }) {
  const [pressed, setPressed] = useState<string | null>(null);

  const handlePress = (key: string) => {
    setPressed(key);
    if (onButtonClick) onButtonClick(key);
    setTimeout(() => setPressed(null), 150);
  };

  return (
    <div
      style={{
        width: 120,
        background: "#222",
        borderRadius: 18,
        boxShadow: "0 8px 32px #0008",
        padding: 16,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        border: "2px solid #444",
      }}
    >
      {buttonMap.map((row, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "center", gap: 6 }}>
          {row.map((btn) => (
            <button
              key={btn.key}
              onClick={() => handlePress(btn.key)}
              style={{
                width: btn.big ? 38 : 28,
                height: btn.big ? 38 : 28,
                margin: 2,
                borderRadius: btn.big ? 19 : 8,
                background: pressed === btn.key ? "#555" : btn.color || "#333",
                color: btn.color ? "#fff" : "#eee",
                border: btn.big ? "2px solid #fff" : "1px solid #666",
                fontWeight: btn.big ? 700 : 500,
                fontSize: btn.big ? 18 : 13,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: pressed === btn.key ? "0 0 0 2px #2196f3" : undefined,
                transition: "all 0.1s",
                outline: "none",
                cursor: "pointer",
              }}
            >
              {btn.icon || btn.label}
            </button>
          ))}
        </div>
      ))}
      <div style={{ marginTop: 10, color: "#f44336", fontWeight: 700, fontSize: 13, letterSpacing: 1 }}>
        OPENBOX GOLD
      </div>
    </div>
  );
} 