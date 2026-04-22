// src/components/layout/BottomNav.jsx
// Barra de navegación inferior (Tab Navigator).
// En React Native se usa @react-navigation/bottom-tabs.

import Icon from "../common/Icon";
import { Colors } from "../../constants/theme";

const TABS = [
  { id: "home",   label: "Inicio", icon: "home"   },
  { id: "search", label: "Buscar", icon: "search" },
];

/**
 * @param {{ activeTab: string, onTabChange: (id: string) => void }} props
 */
export default function BottomNav({ activeTab, onTabChange }) {
  return (
    <nav
      style={{
        display: "flex",
        borderTop: `1px solid ${Colors.faint}`,
        background: Colors.bg,
        padding: "12px 0 24px",
        flexShrink: 0,
      }}
    >
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              cursor: "pointer",
              color: isActive ? Colors.green : Colors.muted,
              fontSize: 10,
              fontWeight: isActive ? 700 : 400,
              transition: "color 0.2s",
              border: "none",
              background: "none",
              padding: 0,
            }}
          >
            <Icon name={tab.icon} size={22} color={isActive ? Colors.green : Colors.muted} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
