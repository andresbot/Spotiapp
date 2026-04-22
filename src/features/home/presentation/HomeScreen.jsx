import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { getNewReleases } from "../domain/getNewReleases";
import AlbumCard from "./components/AlbumCard";
import Spinner from "../../../shared/presentation/components/Spinner";
import { getGreeting } from "../../../shared/domain/formatters";
import { Colors, FontSize, Spacing } from "../../../shared/theme/tokens";

export default function HomeScreen({ onAlbumPress }) {
  const [loading, setLoading] = useState(true);
  const [releases, setReleases] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      const data = await getNewReleases();
      if (!isMounted) return;

      setReleases(data);
      setLoading(false);
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.greeting}>{getGreeting()} 👋</Text>
        <Text style={styles.heading}>Nuevos Lanzamientos</Text>
      </View>

      {loading ? (
        <Spinner />
      ) : (
        <View style={styles.grid}>
          {releases.map((album) => (
            <AlbumCard key={album.id} album={album} onPress={() => onAlbumPress(album)} />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  header: {
    marginBottom: Spacing.md,
  },
  greeting: {
    color: Colors.muted,
    fontSize: FontSize.base,
    marginBottom: 4,
  },
  heading: {
    color: Colors.text,
    fontSize: FontSize.xxl,
    fontWeight: "800",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
