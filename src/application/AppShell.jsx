import { Platform, SafeAreaView, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import AppNavigator from "./AppNavigator";
import { Colors, Radius } from "../shared/theme/tokens";

const isWeb = Platform.OS === "web";

export default function AppShell() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.frame}>
        <AppNavigator />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  frame: {
    flex: 1,
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    backgroundColor: Colors.bg,
    borderRadius: isWeb ? Radius.lg : 0,
    overflow: "hidden",
    borderWidth: isWeb ? 1 : 0,
    borderColor: Colors.faint,
  },
});
