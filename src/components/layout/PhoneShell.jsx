// src/components/layout/PhoneShell.jsx
// Contenedor visual que simula el marco de un iPhone.
// Agrupa StatusBar + pantalla scrolleable + navegación.

import { useRef } from "react";
import StatusBar    from "./StatusBar";
import AppNavigator from "../../navigation/AppNavigator";
import { Colors }   from "../../constants/theme";

export default function PhoneShell() {
  const screenRef = useRef(null);

  return (
    <div
      style={{
        width: 390,
        height: 844,
        background: Colors.bg,
        borderRadius: 44,
        overflow: "hidden",
        position: "relative",
        border: "10px solid #1a1a1a",
        boxShadow: "0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px #2a2a2a",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <StatusBar />

      {/* Área scrolleable (el "screen" del dispositivo) */}
      <div
        ref={screenRef}
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <AppNavigator screenRef={screenRef} />
      </div>
    </div>
  );
}
