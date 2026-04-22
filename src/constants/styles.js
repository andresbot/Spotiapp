// src/constants/styles.js
// Estilos reutilizables (equivalente a StyleSheet.create en React Native).

import { Colors, Radius, FontSize } from "./theme";

export const commonStyles = {
  heading: {
    fontSize: FontSize.xxl,
    fontWeight: 800,
    color: Colors.text,
    margin: 0,
    letterSpacing: -0.5,
  },

  subHeading: {
    fontSize: FontSize.md,
    fontWeight: 700,
    color: Colors.text,
    margin: "0 0 14px",
  },

  card: {
    background: Colors.card,
    borderRadius: Radius.md,
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform 0.15s, background 0.2s",
  },

  screenPadding: {
    padding: "20px 20px 0",
  },
};

export const pill = (color = Colors.green) => ({
  background: color + "22",
  color,
  borderRadius: Radius.full,
  padding: "3px 10px",
  fontSize: FontSize.sm,
  fontWeight: 600,
  display: "inline-block",
});

export const btn = (variant = "primary") => ({
  background: variant === "primary" ? Colors.green : "transparent",
  color: variant === "primary" ? "#000" : Colors.green,
  border: variant === "primary" ? "none" : `1.5px solid ${Colors.green}`,
  borderRadius: Radius.full,
  padding: "10px 22px",
  fontWeight: 700,
  fontSize: FontSize.base,
  cursor: "pointer",
  transition: "opacity 0.15s",
});

export const searchInput = {
  width: "100%",
  background: "#2a2a2a",
  border: "none",
  borderRadius: Radius.full,
  padding: "12px 20px 12px 44px",
  color: Colors.text,
  fontSize: FontSize.md,
  outline: "none",
  boxSizing: "border-box",
  caretColor: Colors.green,
};
