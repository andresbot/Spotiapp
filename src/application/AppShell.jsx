import { Platform, SafeAreaView, StatusBar as NativeStatusBar, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import AppNavigator from "./AppNavigator";
import AmbientBackdrop from "../shared/presentation/components/AmbientBackdrop";
import { Colors, Radius } from "../shared/theme/tokens";

const isWeb = Platform.OS === "web";

export default function AppShell() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.frame}>
        <AmbientBackdrop />
        <AppNavigator />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg,
    paddingTop: Platform.OS === "android" ? NativeStatusBar.currentHeight || 0 : 0,
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
    borderColor: `${Colors.line}99`,
    shadowColor: Colors.shadow,
    shadowOpacity: isWeb ? 0.35 : 0,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 18 },
    elevation: isWeb ? 8 : 0,
  },
});
