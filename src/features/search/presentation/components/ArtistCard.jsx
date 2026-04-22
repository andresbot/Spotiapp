import { Pressable, StyleSheet, Text, View } from "react-native";

import ArtistImage from "../../../../shared/presentation/components/ArtistImage";
import Icon from "../../../../shared/presentation/components/Icon";
import Reveal from "../../../../shared/presentation/components/Reveal";
import { formatFollowers } from "../../../../shared/domain/formatters";
import { Colors, FontSize, Radius, Spacing } from "../../../../shared/theme/tokens";

export default function ArtistCard({ artist, onPress, index = 0 }) {
  return (
    <Reveal delay={120 + index * 55}>
      <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
        <View style={styles.avatarWrap}>
          <ArtistImage src={artist.image} size={64} />
        </View>

        <View style={styles.info}>
          <Text style={styles.name}>{artist.name}</Text>
          <Text style={styles.genre}>{artist.genres[0] || "artista"}</Text>
          <Text style={styles.followers}>{formatFollowers(artist.followers || 0)} fans</Text>
        </View>

        <View style={styles.side}>
          <View style={styles.popularityPill}>
            <Icon name="trend" size={12} color={Colors.green} />
            <Text style={styles.popularityText}>{artist.popularity}%</Text>
          </View>
          <View style={styles.chevron}>
            <Icon name="forward" size={14} color={Colors.bg} />
          </View>
        </View>
      </Pressable>
    </Reveal>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.lg,
    backgroundColor: `${Colors.card}F0`,
    borderWidth: 1,
    borderColor: `${Colors.line}66`,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
  },
  cardPressed: {
    transform: [{ translateY: -3 }, { scale: 0.99 }],
  },
  avatarWrap: {
    padding: 3,
    borderRadius: Radius.full,
    backgroundColor: `${Colors.sun}1A`,
  },
  info: {
    flex: 1,
  },
  name: {
    color: Colors.text,
    fontWeight: "800",
    fontSize: FontSize.lg,
  },
  genre: {
    marginTop: 3,
    color: Colors.sun,
    fontSize: FontSize.sm,
    textTransform: "capitalize",
  },
  followers: {
    marginTop: 4,
    color: Colors.muted,
    fontSize: FontSize.base,
  },
  side: {
    alignItems: "flex-end",
    gap: Spacing.sm,
  },
  popularityPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: `${Colors.green}18`,
    borderRadius: Radius.full,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  popularityText: {
    color: Colors.green,
    fontSize: FontSize.sm,
    fontWeight: "800",
  },
  chevron: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.cyan,
  },
});
