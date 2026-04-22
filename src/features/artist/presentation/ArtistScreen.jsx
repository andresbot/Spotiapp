import { useEffect, useRef, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Audio } from "expo-av";

import { getTopTracks } from "../domain/getTopTracks";
import TrackItem from "./components/TrackItem";
import ArtistImage from "../../../shared/presentation/components/ArtistImage";
import Reveal from "../../../shared/presentation/components/Reveal";
import Spinner from "../../../shared/presentation/components/Spinner";
import Icon from "../../../shared/presentation/components/Icon";
import { formatFollowers } from "../../../shared/domain/formatters";
import { Colors, FontSize, Radius, Spacing } from "../../../shared/theme/tokens";

export default function ArtistScreen({ artist, onBack }) {
  const [loading, setLoading] = useState(true);
  const [tracks, setTracks] = useState([]);
  const [playing, setPlaying] = useState(null);
  const [heroError, setHeroError] = useState(false);
  const [error, setError] = useState(null);
  const soundRef = useRef(null);

  const stopPlayback = async () => {
    if (!soundRef.current) return;

    try {
      await soundRef.current.stopAsync();
    } catch (err) {
      console.log("Error stopping preview:", err);
    }

    try {
      await soundRef.current.unloadAsync();
    } catch (err) {
      console.log("Error unloading preview:", err);
    }

    soundRef.current = null;
  };

  useEffect(() => {
    return () => {
      stopPlayback();
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadTracks = async () => {
      try {
        setLoading(true);
        setError(null);
        await stopPlayback();
        const data = await getTopTracks(artist?.id);

        if (!isMounted) return;

        setTracks(data);
        setPlaying(null);
        setHeroError(false);
      } catch (err) {
        if (!isMounted) return;

        setTracks([]);
        setPlaying(null);
        setError(err.message);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadTracks();

    return () => {
      isMounted = false;
    };
  }, [artist?.id]);

  const handleTrackToggle = async (track) => {
    if (!track?.preview) return;

    try {
      if (playing === track.id) {
        await stopPlayback();
        setPlaying(null);
        return;
      }

      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
      });

      await stopPlayback();

      const { sound } = await Audio.Sound.createAsync(
        { uri: track.preview },
        {
          shouldPlay: true,
          positionMillis: 0,
          progressUpdateIntervalMillis: 250,
        },
      );

      await sound.setPositionAsync(0);
      await sound.playAsync();

      soundRef.current = sound;
      setPlaying(track.id);

      sound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isLoaded) return;

        if (status.didJustFinish) {
          sound.unloadAsync().catch(() => {});

          if (soundRef.current === sound) {
            soundRef.current = null;
          }

          setPlaying((current) => (current === track.id ? null : current));
        }
      });
    } catch (err) {
      console.log("Error reproducing preview:", err);
      setPlaying(null);
    }
  };

  const handleMainPlay = async () => {
    if (playing) {
      await stopPlayback();
      setPlaying(null);
      return;
    }

    const firstPlayableTrack = tracks.find((track) => track.preview);
    if (!firstPlayableTrack) return;

    await handleTrackToggle(firstPlayableTrack);
  };

  const hasPlayableTracks = tracks.some((track) => track.preview);

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

        <Reveal delay={80} style={styles.heroMeta}>
          <View style={styles.artistBadge}>
            <Icon name="sparkles" size={12} color={Colors.bg} />
            <Text style={styles.artistBadgeText}>Artist mode</Text>
          </View>
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
        </Reveal>
      </View>

      <Reveal delay={120} style={styles.actionsRow}>
        <Pressable style={styles.iconButton}>
          <Icon name="heart" size={24} color={Colors.rose} />
        </Pressable>

        <Pressable
          style={[
            styles.mainPlayButton,
            !hasPlayableTracks && styles.mainPlayButtonDisabled,
          ]}
          onPress={handleMainPlay}
          disabled={!hasPlayableTracks}
        >
          <Icon name={playing ? "pause" : "play"} size={24} color={Colors.bg} />
        </Pressable>

        <Pressable style={styles.iconButton}>
          <Icon name="more" size={22} color={Colors.cyan} />
        </Pressable>
      </Reveal>

      <View style={styles.tracksSection}>
        <Reveal delay={150}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionEyebrow}>Top set</Text>
              <Text style={styles.sectionTitle}>Las 10 que mueven la escena</Text>
            </View>
            <View style={styles.sectionChip}>
              <Text style={styles.sectionChipText}>{tracks.length || 10}</Text>
            </View>
          </View>
        </Reveal>

        {loading ? (
          <Spinner />
        ) : error ? (
          <View style={styles.errorState}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <View>
            {tracks.map((track, index) => (
              <TrackItem
                key={track.id}
                track={track}
                index={index}
                isPlaying={playing === track.id}
                onTogglePlay={() => handleTrackToggle(track)}
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
    paddingBottom: Spacing.xxl,
  },
  hero: {
    position: "relative",
    height: 330,
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
    backgroundColor: "rgba(4, 9, 14, 0.48)",
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
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    zIndex: 1,
  },
  artistBadge: {
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
  artistBadgeText: {
    color: Colors.bg,
    fontSize: FontSize.sm,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  artistName: {
    color: Colors.text,
    fontSize: FontSize.hero,
    fontWeight: "800",
    marginBottom: Spacing.sm,
    lineHeight: 42,
  },
  pillsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  followersPill: {
    borderRadius: Radius.full,
    backgroundColor: `${Colors.green}1F`,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  followersPillText: {
    color: Colors.green,
    fontSize: FontSize.sm,
    fontWeight: "800",
  },
  genrePill: {
    borderRadius: Radius.full,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  genrePillText: {
    color: Colors.text,
    fontSize: FontSize.sm,
    fontWeight: "700",
    textTransform: "capitalize",
  },
  actionsRow: {
    marginHorizontal: Spacing.lg,
    marginTop: -26,
    marginBottom: Spacing.lg,
    padding: 10,
    borderRadius: Radius.full,
    backgroundColor: `${Colors.panel}E8`,
    borderWidth: 1,
    borderColor: `${Colors.line}80`,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `${Colors.card}E8`,
  },
  mainPlayButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.green,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.24,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
  },
  mainPlayButtonDisabled: {
    opacity: 0.45,
  },
  tracksSection: {
    paddingHorizontal: Spacing.lg,
  },
  sectionHeader: {
    marginBottom: Spacing.md,
    flexDirection: "row",
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
  sectionChip: {
    minWidth: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `${Colors.sun}1D`,
  },
  sectionChipText: {
    color: Colors.sun,
    fontSize: FontSize.base,
    fontWeight: "800",
  },
  errorState: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.lg,
    backgroundColor: `${Colors.card}D8`,
    borderWidth: 1,
    borderColor: `${Colors.line}66`,
  },
  errorText: {
    color: Colors.muted,
    fontSize: FontSize.base,
    lineHeight: 22,
  },
});
