// src/components/layout/StatusBar.jsx
// Barra de estado del dispositivo (hora, señal, batería).
// En React Native se usa react-native-status-bar.

import { useState, useEffect } from "react";
import { Colors } from "../../constants/theme";

export default function StatusBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 30_000);
    return () => clearInterval(interval);
  }, []);

  const h = time.getHours().toString().padStart(2, "0");
  const m = time.getMinutes().toString().padStart(2, "0");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 24px 0",
        fontSize: 12,
        fontWeight: 600,
        color: Colors.text,
        flexShrink: 0,
      }}
    >
      <span>{h}:{m}</span>

      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        {/* Señal celular */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
          <rect x="0"    y="4" width="3"   height="8" rx="1" />
          <rect x="4.5"  y="2" width="3"   height="10" rx="1" />
          <rect x="9"    y="0" width="3"   height="12" rx="1" />
          <rect x="13.5" y="0" width="2.5" height="12" rx="1" opacity="0.3" />
        </svg>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
          <path d="M8 2.4C5.6 2.4 3.4 3.4 1.8 5L0 3.2C2.1 1.2 4.9 0 8 0s5.9 1.2 8 3.2L14.2 5C12.6 3.4 10.4 2.4 8 2.4z" opacity="0.3"/>
          <path d="M8 6.4c-1.4 0-2.7.6-3.6 1.5L2.7 6.2C4 4.9 5.9 4 8 4s4 .9 5.3 2.2L11.6 7.9C10.7 7 9.4 6.4 8 6.4z"/>
          <circle cx="8" cy="12" r="1.8"/>
        </svg>
        {/* Batería */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="white" strokeOpacity="0.35"/>
          <rect x="1" y="1" width="16" height="10" rx="3" fill="white"/>
          <path d="M23 4v4a2 2 0 0 0 0-4z" fill="white" fillOpacity="0.4"/>
        </svg>
      </div>
    </div>
  );
}
