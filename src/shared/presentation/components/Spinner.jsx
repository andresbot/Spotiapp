import { ActivityIndicator, StyleSheet, View } from "react-native";

import { Colors } from "../../theme/tokens";

export default function Spinner({ size = "large", padding = 40 }) {
  return (
    <View style={[styles.container, { paddingVertical: padding }]}>
      <ActivityIndicator size={size} color={Colors.green} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
