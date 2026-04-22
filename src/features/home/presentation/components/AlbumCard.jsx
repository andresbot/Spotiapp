import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import Icon from "../../../../shared/presentation/components/Icon";
import Reveal from "../../../../shared/presentation/components/Reveal";
import { Colors, FontSize, Radius, Spacing } from "../../../../shared/theme/tokens";

export default function AlbumCard({ album, onPress, index = 0 }) {
  const [hasError, setHasError] = useState(false);
  const metaLabel = album.releaseDate ? album.releaseDate.slice(5) : album.sourceLabel || "Nuevo";

  return (
    <Reveal delay={120 + index * 70}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      >
        <View style={styles.imageWrap}>
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

          <View style={styles.topBadge}>
            <Text style={styles.topBadgeText}>{album.sourceLabel || "Set"}</Text>
          </View>
        </View>

        <View style={styles.info}>
          <Text style={styles.eyebrow}>Coleccion destacada</Text>
          <Text style={styles.title} numberOfLines={2}>
            {album.name}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {album.artist}
          </Text>

          <View style={styles.footer}>
            <Text style={styles.metaLabel}>{metaLabel}</Text>
            <View style={styles.arrowBubble}>
              <Icon name="forward" size={14} color={Colors.bg} />
            </View>
          </View>
        </View>
      </Pressable>
    </Reveal>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    height: 194,
    minHeight: 176,
    backgroundColor: `${Colors.card}F5`,
    borderRadius: Radius.lg,
    overflow: "hidden",
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: `${Colors.line}66`,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.2,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
  },
  cardPressed: {
    transform: [{ translateY: -4 }, { scale: 0.985 }],
  },
  imageWrap: {
    position: "relative",
    width: 126,
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageFallback: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  topBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "rgba(7, 19, 28, 0.78)",
  },
  topBadgeText: {
    color: Colors.sun,
    fontSize: FontSize.xs,
    fontWeight: "800",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  info: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
    justifyContent: "space-between",
  },
  eyebrow: {
    color: Colors.sun,
    fontSize: FontSize.sm,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  title: {
    fontSize: FontSize.base,
    fontWeight: "800",
    color: Colors.text,
    lineHeight: 18,
    marginTop: 6,
  },
  subtitle: {
    marginTop: 4,
    fontSize: FontSize.base,
    color: Colors.muted,
  },
  footer: {
    marginTop: Spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  metaLabel: {
    color: Colors.cyan,
    fontSize: FontSize.sm,
    fontWeight: "700",
  },
  arrowBubble: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.green,
  },
});
