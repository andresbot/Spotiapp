import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";

import Icon from "./Icon";
import { Colors } from "../../theme/tokens";

export default function ArtistImage({ src, size = 80, style }) {
  const [hasError, setHasError] = useState(false);
  const showFallback = hasError || !src;

  if (showFallback) {
    return (
      <View
        style={[
          styles.fallback,
          { width: size, height: size, borderRadius: size / 2 },
          style,
        ]}
      >
        <Icon name="user" size={size * 0.4} color={Colors.muted} />
      </View>
    );
  }

  return (
    <Image
      source={{ uri: src }}
      onError={() => setHasError(true)}
      style={[
        styles.image,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  fallback: {
    backgroundColor: Colors.card,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    backgroundColor: Colors.card,
  },
});
