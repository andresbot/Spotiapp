import { useEffect, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { searchArtists } from "../domain/searchArtists";
import ArtistCard from "./components/ArtistCard";
import Spinner from "../../../shared/presentation/components/Spinner";
import Icon from "../../../shared/presentation/components/Icon";
import { Colors, FontSize, Radius, Spacing } from "../../../shared/theme/tokens";

const QUICK_SEARCHES = ["Bad Bunny", "Taylor", "Rosalia", "Kendrick"];

export default function SearchScreen({ onArtistPress }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [artists, setArtists] = useState([]);
  const [searched, setSearched] = useState(false);

  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  const runSearch = (term) => {
    clearTimeout(timerRef.current);

    const trimmed = term.trim();
    if (!trimmed) {
      setArtists([]);
      setSearched(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    timerRef.current = setTimeout(async () => {
      const results = await searchArtists(trimmed);
      setArtists(results);
      setLoading(false);
      setSearched(true);
    }, 300);
  };

  const handleChange = (value) => {
    setQuery(value);
    runSearch(value);
  };

  const handleClear = () => {
    setQuery("");
    setArtists([]);
    setSearched(false);
    setLoading(false);
    clearTimeout(timerRef.current);
  };

  const handleQuickSearch = (term) => {
    setQuery(term);
    runSearch(term);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>Buscar</Text>

      <View style={styles.searchBox}>
        <View style={styles.searchIcon}>
          <Icon name="search" size={18} color={Colors.muted} />
        </View>

        <TextInput
          style={styles.searchInput}
          placeholder="Artistas, canciones, podcasts..."
          placeholderTextColor={Colors.muted}
          value={query}
          onChangeText={handleChange}
          onSubmitEditing={() => runSearch(query)}
          returnKeyType="search"
        />

        {query.length > 0 && (
          <Pressable style={styles.clearButton} onPress={handleClear}>
            <Icon name="close" size={16} color={Colors.muted} />
          </Pressable>
        )}
      </View>

      {loading && <Spinner padding={20} />}

      {!loading && searched && artists.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No se encontraron artistas</Text>
          <Text style={styles.emptySubtitle}>Prueba con otro termino</Text>
        </View>
      )}

      {!loading && !searched && (
        <View style={styles.quickSearchesBlock}>
          <Text style={styles.sectionTitle}>Prueba buscar</Text>
          <View style={styles.quickSearchesRow}>
            {QUICK_SEARCHES.map((term) => (
              <Pressable key={term} style={styles.quickSearchChip} onPress={() => handleQuickSearch(term)}>
                <Text style={styles.quickSearchText}>{term}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      {!loading && artists.length > 0 && (
        <View style={styles.resultsBlock}>
          <Text style={styles.sectionTitle}>Artistas</Text>
          <View style={styles.resultsList}>
            {artists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} onPress={() => onArtistPress(artist)} />
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  heading: {
    color: Colors.text,
    fontSize: FontSize.xxl,
    fontWeight: "800",
    marginBottom: Spacing.md,
  },
  searchBox: {
    position: "relative",
    marginBottom: Spacing.lg,
  },
  searchIcon: {
    position: "absolute",
    left: 14,
    top: 14,
    zIndex: 1,
  },
  searchInput: {
    width: "100%",
    backgroundColor: "#2A2A2A",
    borderRadius: Radius.full,
    paddingLeft: 40,
    paddingRight: 38,
    paddingVertical: 11,
    color: Colors.text,
    fontSize: FontSize.md,
  },
  clearButton: {
    position: "absolute",
    right: 14,
    top: 14,
  },
  quickSearchesBlock: {
    marginTop: Spacing.xs,
  },
  sectionTitle: {
    color: Colors.text,
    fontSize: FontSize.md,
    fontWeight: "700",
    marginBottom: Spacing.sm,
  },
  quickSearchesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  quickSearchChip: {
    borderColor: Colors.green,
    borderWidth: 1.5,
    borderRadius: Radius.full,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  quickSearchText: {
    color: Colors.green,
    fontSize: FontSize.base,
    fontWeight: "700",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 36,
  },
  emptyTitle: {
    color: Colors.muted,
    fontSize: FontSize.lg,
    marginBottom: 4,
  },
  emptySubtitle: {
    color: Colors.faint,
    fontSize: FontSize.base,
  },
  resultsBlock: {
    marginTop: Spacing.xs,
  },
  resultsList: {
    gap: Spacing.sm,
  },
});
