import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { getTopTracks } from "../domain/getTopTracks";
import TrackItem from "./components/TrackItem";
import ArtistImage from "../../../shared/presentation/components/ArtistImage";
import Spinner from "../../../shared/presentation/components/Spinner";
import Icon from "../../../shared/presentation/components/Icon";
import { formatFollowers } from "../../../shared/domain/formatters";
import { Colors, FontSize, Radius, Spacing } from "../../../shared/theme/tokens";

export default function ArtistScreen({ artist, onBack }) {
  const [loading, setLoading] = useState(true);
  const [tracks, setTracks] = useState([]);
  const [playing, setPlaying] = useState(null);
  const [heroError, setHeroError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadTracks = async () => {
      setLoading(true);
      const data = await getTopTracks(artist?.id);

      if (!isMounted) return;

      setTracks(data);
      setPlaying(null);
      setHeroError(false);
      setLoading(false);
    };

    loadTracks();

    return () => {
      isMounted = false;
    };
  }, [artist?.id]);

  const togglePlay = (trackId) => {
    setPlaying((prev) => (prev === trackId ? null : trackId));
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        {!heroError && artist?.image ? (
          <Image
            source={{ uri: artist.image }}
            style={styles.heroImage}
            onError={() => setHeroError(true)}
          />
        ) : (
          <View style={styles.heroFallback}>
            <ArtistImage src={null} size={120} />
          </View>
        )}

        <View style={styles.heroOverlay} />

        <Pressable style={styles.backButton} onPress={onBack}>
          <Icon name="back" size={18} color={Colors.text} />
        </Pressable>

        <View style={styles.heroMeta}>
          <Text style={styles.artistName}>{artist?.name}</Text>
          <View style={styles.pillsRow}>
            <View style={styles.followersPill}>
              <Text style={styles.followersPillText}>
                {formatFollowers(artist?.followers ?? 0)} seguidores
              </Text>
            </View>
            <View style={styles.genrePill}>
              <Text style={styles.genrePillText}>{artist?.genres?.[0] ?? "artist"}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.actionsRow}>
        <Pressable style={styles.iconButton}>
          <Icon name="heart" size={28} color={Colors.muted} />
        </Pressable>

        <Pressable style={styles.mainPlayButton} onPress={() => togglePlay("all") }>
          <Icon name={playing === "all" ? "pause" : "play"} size={24} color="#000000" />
        </Pressable>

        <Pressable style={styles.iconButton}>
          <Icon name="more" size={26} color={Colors.muted} />
        </Pressable>
      </View>

      <View style={styles.tracksSection}>
        <Text style={styles.sectionTitle}>Top 10 Canciones</Text>

        {loading ? (
          <Spinner />
        ) : (
          <View>
            {tracks.map((track, index) => (
              <TrackItem
                key={track.id}
                track={track}
                index={index}
                isPlaying={playing === track.id}
                onTogglePlay={() => togglePlay(track.id)}
                isLast={index === tracks.length - 1}
              />
            ))}
          </View>
        )}
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
    height: 260,
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
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    zIndex: 1,
  },
  artistName: {
    color: Colors.text,
    fontSize: FontSize.hero,
    fontWeight: "800",
    marginBottom: Spacing.xs,
  },
  pillsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  followersPill: {
    borderRadius: Radius.full,
    backgroundColor: "#1DB95422",
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  followersPillText: {
    color: Colors.green,
    fontSize: FontSize.sm,
    fontWeight: "700",
  },
  genrePill: {
    borderRadius: Radius.full,
    backgroundColor: "#FFFFFF1F",
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  genrePillText: {
    color: Colors.text,
    fontSize: FontSize.sm,
    textTransform: "capitalize",
  },
  actionsRow: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  mainPlayButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.green,
  },
  tracksSection: {
    paddingHorizontal: Spacing.lg,
  },
  sectionTitle: {
    color: Colors.text,
    fontSize: FontSize.md,
    fontWeight: "700",
    marginBottom: Spacing.sm,
  },
});
