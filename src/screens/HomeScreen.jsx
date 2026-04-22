// src/screens/HomeScreen.jsx
// Pantalla principal: muestra los nuevos lanzamientos en un GridView.
// Corresponde a home_page.dart del taller.

import { useState, useEffect } from "react";
import { MOCK_RELEASES } from "../data/mockReleases";
import AlbumCard from "../components/common/AlbumCard";
import Spinner from "../components/common/Spinner";
import { commonStyles } from "../constants/styles";
import { Colors } from "../constants/theme";
import { getGreeting } from "../helpers/formatters";

/**
 * @param {{ onAlbumPress: (album: object) => void }} props
 */
export default function HomeScreen({ onAlbumPress }) {
  const [loading, setLoading]   = useState(true);
  const [releases, setReleases] = useState([]);

  useEffect(() => {
    // Simula la llamada a spotify_service.getNewReleases()
    const timeout = setTimeout(() => {
      setReleases(MOCK_RELEASES);
      setLoading(false);
    }, 900);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div style={{ padding: "20px 20px 0" }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ color: Colors.muted, margin: "0 0 4px", fontSize: 13 }}>
          {getGreeting()} 👋
        </p>
        <h1 style={commonStyles.heading}>Nuevos Lanzamientos</h1>
      </div>

      {/* Contenido */}
      {loading ? (
        <Spinner />
      ) : (
        // GridView: 2 columnas
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            paddingBottom: 20,
          }}
        >
          {releases.map((album, i) => (
            <AlbumCard
              key={album.id}
              album={album}
              onPress={() => onAlbumPress(album)}
              animationDelay={i * 0.06}
            />
          ))}
        </div>
      )}
    </div>
  );
}
