// src/components/common/Spinner.jsx
// Indicador de carga (CircularProgressIndicator en Flutter/RN).

import { Colors } from "../../constants/theme";

export default function Spinner({ size = 36 }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
      <div
        style={{
          width: size,
          height: size,
          border: `3px solid ${Colors.faint}`,
          borderTop: `3px solid ${Colors.green}`,
          borderRadius: "50%",
          animation: "spin 0.7s linear infinite",
        }}
      />
    </div>
  );
}
