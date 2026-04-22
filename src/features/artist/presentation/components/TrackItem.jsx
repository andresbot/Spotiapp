import { Pressable, StyleSheet, Text, View } from "react-native";

import Icon from "../../../../shared/presentation/components/Icon";
import { formatDuration } from "../../../../shared/domain/formatters";
import { Colors, FontSize, Spacing } from "../../../../shared/theme/tokens";

export default function TrackItem({ track, index, isPlaying, onTogglePlay, isLast }) {
  return (
    <View style={[styles.row, !isLast && styles.rowDivider]}>
      <View style={styles.indexBox}>
        {isPlaying ? (
          <Icon name="music" size={14} color={Colors.green} />
        ) : (
          <Text style={styles.indexText}>{index + 1}</Text>
        )}
      </View>

      <View style={styles.trackInfo}>
        <Text style={[styles.trackName, isPlaying && styles.trackNamePlaying]} numberOfLines={1}>
          {track.name}
        </Text>
        <Text style={styles.duration}>{formatDuration(track.duration)}</Text>
      </View>

      {track.preview && (
        <Pressable
          onPress={onTogglePlay}
          style={[styles.playButton, isPlaying ? styles.playButtonActive : styles.playButtonIdle]}
        >
          <Icon
            name={isPlaying ? "pause" : "play"}
            size={14}
            color={isPlaying ? "#000000" : Colors.text}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    paddingVertical: 10,
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.faint,
  },
  indexBox: {
    width: 20,
    alignItems: "center",
  },
  indexText: {
    color: Colors.muted,
    fontSize: FontSize.base,
    fontWeight: "700",
  },
  trackInfo: {
    flex: 1,
  },
  trackName: {
    color: Colors.text,
    fontSize: FontSize.md,
    fontWeight: "600",
  },
  trackNamePlaying: {
    color: Colors.green,
  },
  duration: {
    marginTop: 2,
    color: Colors.muted,
    fontSize: FontSize.sm,
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  playButtonIdle: {
    backgroundColor: Colors.faint,
  },
  playButtonActive: {
    backgroundColor: Colors.green,
  },
});
