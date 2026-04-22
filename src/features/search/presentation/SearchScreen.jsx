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
import Reveal from "../../../shared/presentation/components/Reveal";
import Spinner from "../../../shared/presentation/components/Spinner";
import Icon from "../../../shared/presentation/components/Icon";
import { Colors, FontSize, Radius, Spacing } from "../../../shared/theme/tokens";

const QUICK_SEARCHES = ["Bad Bunny", "Taylor", "Rosalia", "Kendrick"];

export default function SearchScreen({ onArtistPress }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [artists, setArtists] = useState([]);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(null);

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
      setError(null);
      return;
    }

    setLoading(true);
    timerRef.current = setTimeout(async () => {
      try {
        const results = await searchArtists(trimmed);
        setArtists(results);
        setError(null);
      } catch (err) {
        setArtists([]);
        setError(err.message);
      } finally {
        setLoading(false);
        setSearched(true);
      }
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
    setError(null);
    clearTimeout(timerRef.current);
  };

  const handleQuickSearch = (term) => {
    setQuery(term);
    runSearch(term);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Reveal delay={40}>
        <View style={styles.introCard}>
          <View style={styles.introKicker}>
            <Icon name="sparkles" size={13} color={Colors.bg} />
            <Text style={styles.introKickerText}>Modo descubrimiento</Text>
          </View>
          <Text style={styles.heading}>Busca artistas con pulso visual y resultados vivos.</Text>
          <Text style={styles.subtitle}>
            Explora perfiles, top tracks y entradas animadas mientras escribes.
          </Text>
        </View>
      </Reveal>

      <Reveal delay={90}>
        <View style={styles.searchBox}>
          <View style={styles.searchIcon}>
            <Icon name="search" size={18} color={Colors.muted} />
          </View>

          <TextInput
            style={styles.searchInput}
            placeholder="Buscar artistas"
            placeholderTextColor={Colors.muted}
            value={query}
            onChangeText={handleChange}
            onSubmitEditing={() => runSearch(query)}
            returnKeyType="search"
          />

          {query.length > 0 && (
            <Pressable style={styles.clearButton} onPress={handleClear}>
              <Icon name="close" size={16} color={Colors.bg} />
            </Pressable>
          )}
        </View>
      </Reveal>

      {loading && <Spinner padding={20} />}

      {!loading && error && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No pudimos completar la busqueda</Text>
          <Text style={styles.emptySubtitle}>{error}</Text>
        </View>
      )}

      {!loading && !error && searched && artists.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No se encontraron artistas</Text>
          <Text style={styles.emptySubtitle}>Prueba con otro termino</Text>
        </View>
      )}

      {!loading && !searched && (
        <Reveal delay={140}>
          <View style={styles.quickSearchesBlock}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionEyebrow}>Atajos</Text>
                <Text style={styles.sectionTitle}>Prueba con estas vibas</Text>
              </View>
              <View style={styles.sectionMeta}>
                <Icon name="trend" size={14} color={Colors.sun} />
                <Text style={styles.sectionMetaText}>Busqueda instantanea</Text>
              </View>
            </View>
            <View style={styles.quickSearchesRow}>
              {QUICK_SEARCHES.map((term, index) => (
                <Pressable
                  key={term}
                  style={[styles.quickSearchChip, index === 0 && styles.quickSearchChipPrimary]}
                  onPress={() => handleQuickSearch(term)}
                >
                  <Text style={[styles.quickSearchText, index === 0 && styles.quickSearchTextPrimary]}>{term}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </Reveal>
      )}

      {!loading && artists.length > 0 && (
        <View style={styles.resultsBlock}>
          <Reveal delay={140}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionEyebrow}>Resultado</Text>
                <Text style={styles.sectionTitle}>Artistas encontrados</Text>
              </View>
              <View style={styles.resultCount}>
                <Text style={styles.resultCountText}>{artists.length}</Text>
              </View>
            </View>
          </Reveal>
          <View style={styles.resultsList}>
            {artists.map((artist, index) => (
              <ArtistCard key={artist.id} artist={artist} index={index} onPress={() => onArtistPress(artist)} />
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
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  introCard: {
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    backgroundColor: `${Colors.panel}F0`,
    borderWidth: 1,
    borderColor: `${Colors.line}80`,
    marginBottom: Spacing.lg,
  },
  introKicker: {
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
  introKickerText: {
    color: Colors.bg,
    fontSize: FontSize.sm,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  heading: {
    color: Colors.text,
    fontSize: FontSize.xxl,
    fontWeight: "800",
    lineHeight: 36,
  },
  subtitle: {
    marginTop: Spacing.md,
    color: Colors.muted,
    fontSize: FontSize.md,
    lineHeight: 24,
  },
  searchBox: {
    position: "relative",
    marginBottom: Spacing.lg,
    borderRadius: Radius.full,
    backgroundColor: `${Colors.card}EE`,
    borderWidth: 1,
    borderColor: `${Colors.line}80`,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.16,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
  },
  searchIcon: {
    position: "absolute",
    left: 14,
    top: 17,
    zIndex: 1,
  },
  searchInput: {
    width: "100%",
    borderRadius: Radius.full,
    paddingLeft: 40,
    paddingRight: 54,
    paddingVertical: 14,
    color: Colors.text,
    fontSize: FontSize.md,
  },
  clearButton: {
    position: "absolute",
    right: 10,
    top: 10,
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.green,
  },
  quickSearchesBlock: {
    marginTop: Spacing.xs,
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
    color: Colors.text,
    fontSize: FontSize.xl,
    fontWeight: "800",
    marginTop: 4,
  },
  sectionMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: `${Colors.sun}14`,
  },
  sectionMetaText: {
    color: Colors.sun,
    fontSize: FontSize.sm,
    fontWeight: "800",
  },
  quickSearchesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  quickSearchChip: {
    borderColor: `${Colors.line}80`,
    borderWidth: 1,
    borderRadius: Radius.full,
    paddingHorizontal: 16,
    paddingVertical: 11,
    backgroundColor: `${Colors.card}CC`,
  },
  quickSearchChipPrimary: {
    backgroundColor: Colors.green,
    borderColor: Colors.green,
  },
  quickSearchText: {
    color: Colors.text,
    fontSize: FontSize.base,
    fontWeight: "700",
  },
  quickSearchTextPrimary: {
    color: Colors.bg,
    fontWeight: "800",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 36,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.lg,
    backgroundColor: `${Colors.card}D8`,
    borderWidth: 1,
    borderColor: `${Colors.line}66`,
  },
  emptyTitle: {
    color: Colors.text,
    fontSize: FontSize.lg,
    fontWeight: "800",
    marginBottom: 4,
  },
  emptySubtitle: {
    color: Colors.muted,
    fontSize: FontSize.md,
    textAlign: "center",
  },
  resultsBlock: {
    marginTop: Spacing.xs,
  },
  resultCount: {
    minWidth: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.green,
  },
  resultCountText: {
    color: Colors.bg,
    fontSize: FontSize.base,
    fontWeight: "800",
  },
  resultsList: {
    gap: Spacing.sm,
  },
});
