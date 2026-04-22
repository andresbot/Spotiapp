// App.jsx
// Punto de entrada de la aplicación.
// En React Native esto sería App.tsx registrado con AppRegistry.

import "./src/styles/global.css";
import PhoneShell from "./src/components/layout/PhoneShell";

export default function App() {
  return (
    <div
      style={{
        fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        background: "#060606",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <PhoneShell />
    </div>
  );
}
