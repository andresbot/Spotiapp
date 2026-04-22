import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import Icon from "../../../../shared/presentation/components/Icon";
import { Colors, FontSize, Radius, Spacing } from "../../../../shared/theme/tokens";

export default function AlbumCard({ album, onPress }) {
  const [hasError, setHasError] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      {!hasError && album.image ? (
        <Image
          source={{ uri: album.image }}
          style={styles.image}
          onError={() => setHasError(true)}
        />
      ) : (
        <View style={styles.imageFallback}>
          <Icon name="music" size={30} color={Colors.muted} />
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {album.name}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {album.artist}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: Colors.card,
    borderRadius: Radius.md,
    overflow: "hidden",
    marginBottom: Spacing.md,
  },
  cardPressed: {
    opacity: 0.85,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  imageFallback: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.sm,
  },
  title: {
    fontSize: FontSize.base,
    fontWeight: "700",
    color: Colors.text,
  },
  subtitle: {
    marginTop: 2,
    fontSize: FontSize.sm,
    color: Colors.muted,
  },
});
