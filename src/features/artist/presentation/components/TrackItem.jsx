import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import Icon from "../../../../shared/presentation/components/Icon";
import Reveal from "../../../../shared/presentation/components/Reveal";
import { formatDuration } from "../../../../shared/domain/formatters";
import { Colors, FontSize, Radius, Spacing } from "../../../../shared/theme/tokens";

export default function TrackItem({ track, index, isPlaying, onTogglePlay, isLast }) {
  return (
    <Reveal delay={110 + index * 45}>
      <View style={[styles.row, !isLast && styles.rowSpacing]}>
        <View style={[styles.indexBox, isPlaying && styles.indexBoxActive]}>
          {isPlaying ? (
            <Icon name="pulse" size={14} color={Colors.bg} />
          ) : (
            <Text style={styles.indexText}>{index + 1}</Text>
          )}
        </View>

        {track.albumImage ? (
          <Image source={{ uri: track.albumImage }} style={styles.cover} />
        ) : (
          <View style={styles.coverFallback}>
            <Icon name="music" size={16} color={Colors.muted} />
          </View>
        )}

        <View style={styles.trackInfo}>
          <Text style={[styles.trackName, isPlaying && styles.trackNamePlaying]} numberOfLines={1}>
            {track.name}
          </Text>
          <View style={styles.trackMetaRow}>
            <Text style={styles.duration}>{formatDuration(track.duration)}</Text>
            {track.artist ? <Text style={styles.dot}>|</Text> : null}
            {track.artist ? (
              <Text style={styles.artistLabel} numberOfLines={1}>
                {track.artist}
              </Text>
            ) : null}
          </View>
        </View>

        {track.preview ? (
          <Pressable
            onPress={onTogglePlay}
            style={[styles.playButton, isPlaying ? styles.playButtonActive : styles.playButtonIdle]}
          >
            <Icon
              name={isPlaying ? "pause" : "play"}
              size={14}
              color={isPlaying ? Colors.bg : Colors.text}
            />
          </Pressable>
        ) : (
          <View style={styles.previewBadge}>
            <Text style={styles.previewBadgeText}>Sin preview</Text>
          </View>
        )}
      </View>
    </Reveal>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    paddingVertical: 12,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.lg,
    backgroundColor: `${Colors.card}EC`,
    borderWidth: 1,
    borderColor: `${Colors.line}66`,
  },
  rowSpacing: {
    marginBottom: Spacing.sm,
  },
  indexBox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `${Colors.cyan}14`,
  },
  indexBoxActive: {
    backgroundColor: Colors.green,
  },
  indexText: {
    color: Colors.cyan,
    fontSize: FontSize.sm,
    fontWeight: "800",
  },
  cover: {
    width: 52,
    height: 52,
    borderRadius: Radius.md,
  },
  coverFallback: {
    width: 52,
    height: 52,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surface,
  },
  trackInfo: {
    flex: 1,
  },
  trackName: {
    color: Colors.text,
    fontSize: FontSize.md,
    fontWeight: "700",
  },
  trackNamePlaying: {
    color: Colors.green,
  },
  trackMetaRow: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  duration: {
    color: Colors.muted,
    fontSize: FontSize.sm,
  },
  dot: {
    color: Colors.faint,
    fontSize: FontSize.base,
  },
  artistLabel: {
    flex: 1,
    color: Colors.sun,
    fontSize: FontSize.sm,
  },
  playButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  playButtonIdle: {
    backgroundColor: `${Colors.cyan}18`,
  },
  playButtonActive: {
    backgroundColor: Colors.green,
  },
  previewBadge: {
    borderRadius: Radius.full,
    backgroundColor: `${Colors.line}55`,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  previewBadgeText: {
    color: Colors.muted,
    fontSize: FontSize.sm,
    fontWeight: "700",
  },
});
