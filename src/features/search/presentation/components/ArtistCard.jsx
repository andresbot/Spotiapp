import { Pressable, StyleSheet, Text, View } from "react-native";

import ArtistImage from "../../../../shared/presentation/components/ArtistImage";
import { Colors, FontSize, Radius, Spacing } from "../../../../shared/theme/tokens";

export default function ArtistCard({ artist, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
      <ArtistImage src={artist.image} size={58} />

      <View style={styles.info}>
        <Text style={styles.name}>{artist.name}</Text>
        <Text style={styles.genre}>{artist.genres[0]}</Text>
      </View>

      <View style={styles.popularityPill}>
        <Text style={styles.popularityText}>{artist.popularity}%</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    borderRadius: Radius.md,
    backgroundColor: Colors.card,
  },
  cardPressed: {
    opacity: 0.9,
  },
  info: {
    flex: 1,
  },
  name: {
    color: Colors.text,
    fontWeight: "700",
    fontSize: FontSize.md,
  },
  genre: {
    marginTop: 2,
    color: Colors.muted,
    fontSize: FontSize.sm,
    textTransform: "capitalize",
  },
  popularityPill: {
    backgroundColor: "#1DB95422",
    borderRadius: Radius.full,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  popularityText: {
    color: Colors.green,
    fontSize: FontSize.sm,
    fontWeight: "700",
  },
});
