import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { getNewReleases } from "../domain/getNewReleases";
import AlbumCard from "./components/AlbumCard";
import Icon from "../../../shared/presentation/components/Icon";
import Reveal from "../../../shared/presentation/components/Reveal";
import Spinner from "../../../shared/presentation/components/Spinner";
import { getGreeting } from "../../../shared/domain/formatters";
import { Colors, FontSize, Radius, Spacing } from "../../../shared/theme/tokens";

export default function HomeScreen({ onAlbumPress }) {
  const [loading, setLoading] = useState(true);
  const [releases, setReleases] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        console.log("Loading new releases...");
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Tiempo de espera agotado")), 15000),
        );
        const data = await Promise.race([getNewReleases(), timeoutPromise]);
        console.log("Releases loaded:", data.length);

        if (!isMounted) return;
        setReleases(data);
      } catch (err) {
        console.error("Error loading releases:", err);
        if (!isMounted) return;
        setError(err.message);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const featuredAlbum = releases[0];
  const gridAlbums = releases.slice(1);

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Reveal delay={40}>
        <View style={styles.heroIntro}>
          <View style={styles.heroCopy}>
            <View style={styles.kicker}>
              <Icon name="sparkles" size={14} color={Colors.bg} />
              <Text style={styles.kickerText}>Radar sonoro</Text>
            </View>
            <Text style={styles.greeting}>{getGreeting()}</Text>
            <Text style={styles.heading}>Ponle color al descubrimiento de hoy.</Text>
            <Text style={styles.subheading}>
              Una vitrina con lanzamientos frescos, ritmo visual y acceso rapido a cada detalle.
            </Text>
          </View>
          <View style={styles.pulseBadge}>
            <Icon name="pulse" size={18} color={Colors.sun} />
          </View>
        </View>
      </Reveal>

      {loading ? (
        <Spinner />
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>No pudimos encender el radar</Text>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <>
          {featuredAlbum && (
            <Reveal delay={120}>
              <Pressable
                style={({ pressed }) => [styles.featuredCard, pressed && styles.featuredCardPressed]}
                onPress={() => onAlbumPress(featuredAlbum)}
              >
                <View style={styles.featuredCopy}>
                  <Text style={styles.featuredLabel}>Edicion protagonista</Text>
                  <Text style={styles.featuredTitle}>{featuredAlbum.name}</Text>
                  <Text style={styles.featuredArtist}>{featuredAlbum.artist}</Text>

                  <View style={styles.featuredMetaRow}>
                    <View style={styles.featuredTag}>
                      <Text style={styles.featuredTagText}>{featuredAlbum.sourceLabel || "Live"}</Text>
                    </View>
                    <View style={styles.featuredAction}>
                      <Text style={styles.featuredActionText}>Abrir</Text>
                      <Icon name="forward" size={14} color={Colors.bg} />
                    </View>
                  </View>
                </View>

                <View style={styles.featuredArtworkWrap}>
                  <View style={styles.artGlow} />
                  <Image source={{ uri: featuredAlbum.image }} style={styles.featuredArtwork} />
                </View>
              </Pressable>
            </Reveal>
          )}

          <Reveal delay={180}>
            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{releases.length}</Text>
                <Text style={styles.statLabel}>Drops curados</Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statValue}>Live</Text>
                <Text style={styles.statLabel}>Cards con entrada dinamica</Text>
              </View>
            </View>
          </Reveal>

          <Reveal delay={220}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionEyebrow}>Coleccion</Text>
                <Text style={styles.sectionTitle}>Lanzamientos en movimiento</Text>
              </View>
              <View style={styles.sectionBadge}>
                <Icon name="trend" size={14} color={Colors.green} />
                <Text style={styles.sectionBadgeText}>Fresh set</Text>
              </View>
            </View>
          </Reveal>

          <View style={styles.grid}>
            {gridAlbums.map((album, index) => (
              <AlbumCard key={album.id} album={album} index={index} onPress={() => onAlbumPress(album)} />
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  heroIntro: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Spacing.xl,
    gap: Spacing.md,
  },
  heroCopy: {
    flex: 1,
  },
  kicker: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: Radius.full,
    backgroundColor: Colors.green,
    marginBottom: Spacing.md,
  },
  kickerText: {
    color: Colors.bg,
    fontSize: FontSize.sm,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  greeting: {
    color: Colors.sun,
    fontSize: FontSize.base,
    marginBottom: 6,
    fontWeight: "700",
  },
  heading: {
    color: Colors.text,
    fontSize: FontSize.hero,
    fontWeight: "800",
    lineHeight: 44,
    maxWidth: 260,
  },
  subheading: {
    marginTop: Spacing.md,
    color: Colors.muted,
    fontSize: FontSize.md,
    lineHeight: 24,
    maxWidth: 300,
  },
  pulseBadge: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `${Colors.sun}16`,
    borderWidth: 1,
    borderColor: `${Colors.sun}4D`,
  },
  featuredCard: {
    flexDirection: "row",
    minHeight: 220,
    backgroundColor: `${Colors.panel}F0`,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: `${Colors.line}80`,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.24,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
  },
  featuredCardPressed: {
    transform: [{ scale: 0.985 }],
  },
  featuredCopy: {
    flex: 1,
    justifyContent: "space-between",
    paddingRight: Spacing.md,
  },
  featuredLabel: {
    color: Colors.cyan,
    fontSize: FontSize.sm,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.7,
  },
  featuredTitle: {
    marginTop: Spacing.md,
    color: Colors.text,
    fontSize: FontSize.xxl,
    fontWeight: "800",
    lineHeight: 34,
  },
  featuredArtist: {
    marginTop: 6,
    color: Colors.muted,
    fontSize: FontSize.md,
  },
  featuredMetaRow: {
    marginTop: Spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.sm,
  },
  featuredTag: {
    alignSelf: "flex-start",
    borderRadius: Radius.full,
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: `${Colors.rose}18`,
  },
  featuredTagText: {
    color: Colors.rose,
    fontSize: FontSize.sm,
    fontWeight: "800",
  },
  featuredAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: Radius.full,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: Colors.green,
  },
  featuredActionText: {
    color: Colors.bg,
    fontSize: FontSize.base,
    fontWeight: "800",
  },
  featuredArtworkWrap: {
    width: 132,
    justifyContent: "center",
    alignItems: "center",
  },
  artGlow: {
    position: "absolute",
    width: 126,
    height: 126,
    borderRadius: 63,
    backgroundColor: `${Colors.sun}20`,
  },
  featuredArtwork: {
    width: 122,
    height: 162,
    borderRadius: Radius.lg,
    transform: [{ rotate: "7deg" }],
  },
  statsRow: {
    flexDirection: "row",
    gap: Spacing.md,
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  statCard: {
    flex: 1,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    backgroundColor: `${Colors.card}CC`,
    borderWidth: 1,
    borderColor: `${Colors.line}66`,
  },
  statValue: {
    color: Colors.text,
    fontSize: FontSize.xl,
    fontWeight: "800",
  },
  statLabel: {
    marginTop: 6,
    color: Colors.muted,
    fontSize: FontSize.base,
    lineHeight: 18,
  },
  sectionHeader: {
    marginBottom: Spacing.md,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: Spacing.sm,
  },
  sectionEyebrow: {
    color: Colors.sun,
    fontSize: FontSize.sm,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.7,
  },
  sectionTitle: {
    marginTop: 4,
    color: Colors.text,
    fontSize: FontSize.xl,
    fontWeight: "800",
  },
  sectionBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 8,
    borderRadius: Radius.full,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: `${Colors.green}14`,
  },
  sectionBadgeText: {
    color: Colors.green,
    fontSize: FontSize.sm,
    fontWeight: "800",
  },
  grid: {
    gap: Spacing.md,
  },
  errorContainer: {
    padding: Spacing.xl,
    alignItems: "center",
    borderRadius: Radius.lg,
    backgroundColor: `${Colors.card}E0`,
    borderWidth: 1,
    borderColor: `${Colors.line}66`,
  },
  errorTitle: {
    color: Colors.text,
    fontSize: FontSize.lg,
    fontWeight: "800",
    marginBottom: 6,
  },
  errorText: {
    color: Colors.muted,
    fontSize: FontSize.md,
    textAlign: "center",
  },
});
