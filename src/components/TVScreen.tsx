import React from "react";
import { FaYoutube, FaCog, FaWifi, FaCloud, FaTv, FaAppStore, FaInfoCircle } from "react-icons/fa";
import { MdSettings, MdApps, MdUpdate, MdInfo, MdNetworkWifi } from "react-icons/md";

const apps = [
  { name: "Почта", icon: <FaCloud color="#ffd600" size={28} /> },
  { name: "Настройки", icon: <MdSettings color="#8bc34a" size={28} /> },
  { name: "Установка", icon: <MdUpdate color="#4caf50" size={28} /> },
  { name: "Media Center", icon: <FaAppStore color="#00bcd4" size={28} /> },
  { name: "YouTube", icon: <FaYoutube color="#e53935" size={28} /> },
  { name: "IPTV", icon: <FaTv color="#2196f3" size={28} /> },
  { name: "Обновление HTTP", icon: <MdUpdate color="#ff9800" size={28} /> },
  { name: "APP", icon: <MdApps color="#9c27b0" size={28} /> },
  { name: "Поиск", icon: <FaInfoCircle color="#fff" size={28} /> },
  { name: "Сеть Wi-Fi", icon: <MdNetworkWifi color="#2196f3" size={28} /> },
  { name: "Оператор", icon: <FaWifi color="#00e676" size={28} /> },
  { name: "Информация", icon: <MdInfo color="#fff" size={28} /> },
];

export default function TVScreen() {
  return (
    <div
      style={{
        width: 320,
        height: 200,
        background: "#111",
        borderRadius: 8,
        border: "6px solid #222",
        boxShadow: "0 8px 32px #000a",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 16,
        padding: 24,
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #2b3a67 0%, #1e2a47 100%)",
        borderRadius: 4,
      }}>
        {apps.map((app, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "#fff" }}>
            {app.icon}
            <span style={{ fontSize: 11, marginTop: 4, textAlign: "center" }}>{app.name}</span>
          </div>
        ))}
      </div>
      {/* Подставка телевизора */}
      <div style={{ position: "absolute", bottom: -18, left: "50%", transform: "translateX(-50%)", width: 80, height: 12, background: "#222", borderRadius: 6, boxShadow: "0 2px 8px #0007" }} />
    </div>
  );
} 