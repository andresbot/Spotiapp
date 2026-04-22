// src/screens/SearchScreen.jsx
// Pantalla de búsqueda de artistas con debounce y loading state.
// Corresponde a search_page.dart del taller.

import { useState, useRef } from "react";
import { MOCK_ARTISTS } from "../data/mockArtists";
import ArtistCard from "../components/common/ArtistCard";
import Spinner from "../components/common/Spinner";
import Icon from "../components/common/Icon";
import { commonStyles, btn, searchInput } from "../constants/styles";
import { Colors } from "../constants/theme";

const QUICK_SEARCHES = ["Bad Bunny", "Taylor", "Rosalía", "Kendrick"];

/**
 * @param {{ onArtistPress: (artist: object) => void }} props
 */
export default function SearchScreen({ onArtistPress }) {
  const [query,    setQuery]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [artists,  setArtists]  = useState([]);
  const [searched, setSearched] = useState(false);
  const timerRef = useRef(null);

  // Busca mientras el usuario escribe (debounce 700ms)
  // o al presionar Enter. Simula spotify_service.getArtistas(termino).
  const doSearch = (term) => {
    if (!term.trim()) {
      setArtists([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      const results = MOCK_ARTISTS.filter((a) =>
        a.name.toLowerCase().includes(term.toLowerCase()) ||
        a.genres.some((g) => g.includes(term.toLowerCase()))
      );
      setArtists(results);
      setLoading(false);
      setSearched(true);
    }, 700);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    doSearch(e.target.value);
  };

  const handleClear = () => {
    setQuery("");
    setArtists([]);
    setSearched(false);
  };

  const handleQuickSearch = (term) => {
    setQuery(term);
    doSearch(term);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ ...commonStyles.heading, marginBottom: 18 }}>Buscar</h1>

      {/* TextField de búsqueda */}
      <div style={{ position: "relative", marginBottom: 24 }}>
        <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }}>
          <Icon name="search" size={18} color={Colors.muted} />
        </div>

        <input
          style={searchInput}
          placeholder="Artistas, canciones, podcasts…"
          value={query}
          onChange={handleChange}
          onKeyDown={(e) => e.key === "Enter" && doSearch(query)}
        />

        {query && (
          <button
            onClick={handleClear}
            style={{
              position: "absolute",
              right: 14,
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <Icon name="close" size={16} color={Colors.muted} />
          </button>
        )}
      </div>

      {/* Loading Widget */}
      {loading && <Spinner />}

      {/* Sin resultados */}
      {!loading && searched && artists.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <p style={{ color: Colors.muted, fontSize: 16 }}>No se encontraron artistas</p>
          <p style={{ color: Colors.faint, fontSize: 13 }}>Intenta con otro término</p>
        </div>
      )}

      {/* Estado inicial: búsquedas rápidas */}
      {!loading && !searched && (
        <div>
          <p style={commonStyles.subHeading}>Prueba buscar</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {QUICK_SEARCHES.map((term) => (
              <button key={term} style={btn("outline")} onClick={() => handleQuickSearch(term)}>
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Lista de artistas */}
      {!loading && artists.length > 0 && (
        <div>
          <p style={commonStyles.subHeading}>Artistas</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {artists.map((artist, i) => (
              <ArtistCard
                key={artist.id}
                artist={artist}
                onPress={() => onArtistPress(artist)}
                animationDelay={i * 0.06}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
