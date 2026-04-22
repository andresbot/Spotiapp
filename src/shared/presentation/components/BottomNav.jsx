import { Pressable, StyleSheet, Text, View } from "react-native";

import Icon from "./Icon";
import { Colors, FontSize, Radius, Spacing } from "../../theme/tokens";

const TABS = [
  { id: "home", label: "Inicio", icon: "home" },
  { id: "search", label: "Buscar", icon: "search" },
];

export default function BottomNav({ activeTab, onTabChange }) {
  return (
    <View style={styles.shell}>
      <View style={styles.container}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const tint = isActive ? Colors.text : Colors.muted;

          return (
            <Pressable
              key={tab.id}
              onPress={() => onTabChange(tab.id)}
              style={({ pressed }) => [
                styles.tabButton,
                isActive && styles.tabButtonActive,
                pressed && styles.tabButtonPressed,
              ]}
            >
              <View style={[styles.iconWrap, isActive && styles.iconWrapActive]}>
                <Icon name={tab.icon} size={20} color={isActive ? Colors.bg : Colors.cyan} />
              </View>
              <Text style={[styles.tabText, { color: tint, fontWeight: isActive ? "800" : "600" }]}>
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.lg,
    backgroundColor: "transparent",
  },
  container: {
    flexDirection: "row",
    backgroundColor: "rgba(13, 28, 39, 0.92)",
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: `${Colors.line}A0`,
    padding: 6,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  tabButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    minHeight: 54,
    borderRadius: Radius.full,
  },
  tabButtonActive: {
    backgroundColor: `${Colors.panel}E8`,
  },
  tabButtonPressed: {
    transform: [{ scale: 0.98 }],
  },
  iconWrap: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `${Colors.cyan}14`,
  },
  iconWrapActive: {
    backgroundColor: Colors.green,
  },
  tabText: {
    fontSize: FontSize.base,
    letterSpacing: 0.2,
  },
});
