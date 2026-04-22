import { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import Icon from "../../../shared/presentation/components/Icon";
import { Colors, FontSize, Radius, Spacing } from "../../../shared/theme/tokens";

export default function AlbumScreen({ album, onBack }) {
  const [heroError, setHeroError] = useState(false);

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        {!heroError && album?.image ? (
          <Image
            source={{ uri: album.image }}
            style={styles.heroImage}
            onError={() => setHeroError(true)}
          />
        ) : (
          <View style={styles.heroFallback}>
            <Icon name="music" size={48} color={Colors.muted} />
          </View>
        )}

        <View style={styles.heroOverlay} />

        <Pressable style={styles.backButton} onPress={onBack}>
          <Icon name="back" size={18} color={Colors.text} />
        </Pressable>

        <View style={styles.heroMeta}>
          <Text style={styles.albumTitle}>{album?.name}</Text>
          <Text style={styles.albumArtist}>{album?.artist}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Nuevo lanzamiento disponible en Spotify. Escucha el album completo y descubre todos sus tracks.
        </Text>

        <Pressable style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Escuchar en Spotify</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: Spacing.lg,
  },
  hero: {
    position: "relative",
    height: 280,
    justifyContent: "flex-end",
    backgroundColor: Colors.surface,
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
  },
  heroFallback: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surface,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.55)",
  },
  heroMeta: {
    zIndex: 1,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  albumTitle: {
    color: Colors.text,
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 4,
  },
  albumArtist: {
    color: Colors.muted,
    fontSize: FontSize.md,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  description: {
    color: Colors.muted,
    fontSize: FontSize.base,
    lineHeight: 22,
  },
  primaryButton: {
    marginTop: Spacing.md,
    borderRadius: Radius.full,
    backgroundColor: Colors.green,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
  },
  primaryButtonText: {
    color: "#000000",
    fontSize: FontSize.md,
    fontWeight: "800",
  },
});
