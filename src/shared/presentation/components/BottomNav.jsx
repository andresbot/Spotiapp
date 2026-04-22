import { Pressable, StyleSheet, Text, View } from "react-native";

import Icon from "./Icon";
import { Colors, FontSize, Spacing } from "../../theme/tokens";

const TABS = [
  { id: "home", label: "Inicio", icon: "home" },
  { id: "search", label: "Buscar", icon: "search" },
];

export default function BottomNav({ activeTab, onTabChange }) {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        const tint = isActive ? Colors.green : Colors.muted;

        return (
          <Pressable
            key={tab.id}
            onPress={() => onTabChange(tab.id)}
            style={styles.tabButton}
          >
            <Icon name={tab.icon} size={22} color={tint} />
            <Text style={[styles.tabText, { color: tint, fontWeight: isActive ? "700" : "500" }]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: Colors.faint,
    backgroundColor: Colors.bg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.lg,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.xs,
  },
  tabText: {
    fontSize: FontSize.xs,
  },
});
