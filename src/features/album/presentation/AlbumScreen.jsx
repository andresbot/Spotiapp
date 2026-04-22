import { useState } from "react";
import { Image, Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import Icon from "../../../shared/presentation/components/Icon";
import Reveal from "../../../shared/presentation/components/Reveal";
import { Colors, FontSize, Radius, Spacing } from "../../../shared/theme/tokens";

export default function AlbumScreen({ album, onBack }) {
  const [heroError, setHeroError] = useState(false);

  const releaseDateLabel = album?.releaseDate
    ? new Date(`${album.releaseDate}T12:00:00`).toLocaleDateString("es-CO", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  const handleOpenAlbum = async () => {
    if (!album?.url) return;
    await Linking.openURL(album.url);
  };

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

        <Reveal delay={80} style={styles.heroMeta}>
          <View style={styles.heroTag}>
            <Icon name="sparkles" size={12} color={Colors.bg} />
            <Text style={styles.heroTagText}>{album?.sourceLabel || "Release"}</Text>
          </View>
          <Text style={styles.albumTitle}>{album?.name}</Text>
          <Text style={styles.albumArtist}>{album?.artist}</Text>
        </Reveal>
      </View>

      <Reveal delay={120} style={styles.contentCard}>
        <View style={styles.metaRow}>
          <View style={styles.metaPill}>
            <Text style={styles.metaPillLabel}>Fecha</Text>
            <Text style={styles.metaPillValue}>{releaseDateLabel || "Reciente"}</Text>
          </View>
          <View style={styles.metaPill}>
            <Text style={styles.metaPillLabel}>Fuente</Text>
            <Text style={styles.metaPillValue}>{album?.sourceLabel || "Catalogo"}</Text>
          </View>
        </View>

        <Text style={styles.description}>
          {album?.sourceLabel
            ? `Un lanzamiento activo dentro de ${album.sourceLabel}, con una portada protagonista y acceso directo al release.`
            : "Un lanzamiento activo dentro del catalogo disponible."}
        </Text>

        <Pressable
          style={[styles.primaryButton, !album?.url && styles.primaryButtonDisabled]}
          onPress={handleOpenAlbum}
          disabled={!album?.url}
        >
          <Text style={styles.primaryButtonText}>
            {album?.sourceLabel ? `Abrir en ${album.sourceLabel}` : "Abrir lanzamiento"}
          </Text>
          <Icon name="forward" size={16} color={Colors.bg} />
        </Pressable>
      </Reveal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: Spacing.xxl,
  },
  hero: {
    position: "relative",
    height: 340,
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
    backgroundColor: "rgba(4, 9, 14, 0.52)",
  },
  backButton: {
    position: "absolute",
    top: 18,
    left: 18,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(7, 19, 28, 0.62)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  heroMeta: {
    zIndex: 1,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  heroTag: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: Radius.full,
    backgroundColor: Colors.sun,
    marginBottom: Spacing.md,
  },
  heroTagText: {
    color: Colors.bg,
    fontSize: FontSize.sm,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  albumTitle: {
    color: Colors.text,
    fontSize: FontSize.hero,
    fontWeight: "800",
    marginBottom: 6,
    lineHeight: 42,
  },
  albumArtist: {
    color: Colors.muted,
    fontSize: FontSize.lg,
  },
  contentCard: {
    marginHorizontal: Spacing.lg,
    marginTop: -24,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    backgroundColor: `${Colors.panel}EE`,
    borderWidth: 1,
    borderColor: `${Colors.line}80`,
  },
  metaRow: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  metaPill: {
    flex: 1,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    backgroundColor: `${Colors.card}D0`,
  },
  metaPillLabel: {
    color: Colors.sun,
    fontSize: FontSize.sm,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  metaPillValue: {
    marginTop: 6,
    color: Colors.text,
    fontSize: FontSize.base,
    fontWeight: "700",
  },
  description: {
    marginTop: Spacing.lg,
    color: Colors.muted,
    fontSize: FontSize.md,
    lineHeight: 24,
  },
  primaryButton: {
    marginTop: Spacing.lg,
    borderRadius: Radius.full,
    backgroundColor: Colors.green,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    paddingVertical: 15,
  },
  primaryButtonText: {
    color: Colors.bg,
    fontSize: FontSize.md,
    fontWeight: "800",
  },
  primaryButtonDisabled: {
    opacity: 0.45,
  },
});
