// src/screens/ArtistScreen.jsx
// Detalle de artista con Top 10 canciones y botón de preview de 30s.
// Corresponde a artist_page.dart del taller (Fase 5).

import { useState, useEffect } from "react";
import { MOCK_TRACKS } from "../data/mockTracks";
import TrackItem from "../components/common/TrackItem";
import ArtistImage from "../components/common/ArtistImage";
import Spinner from "../components/common/Spinner";
import Icon from "../components/common/Icon";
import { commonStyles, pill } from "../constants/styles";
import { Colors } from "../constants/theme";
import { formatFollowers } from "../helpers/formatters";

/**
 * @param {{ artist: object, onBack: () => void }} props
 */
export default function ArtistScreen({ artist, onBack }) {
  const [loading, setLoading] = useState(true);
  const [tracks,  setTracks]  = useState([]);
  const [playing, setPlaying] = useState(null); // id del track en reproducción

  useEffect(() => {
    // Simula spotify_service.getTopTracks(artist.id)
    const timeout = setTimeout(() => {
      setTracks(MOCK_TRACKS);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timeout);
  }, [artist]);

  const togglePlay = (trackId) =>
    setPlaying((prev) => (prev === trackId ? null : trackId));

  return (
    <div style={{ paddingBottom: 24 }}>
      {/* Hero con imagen del artista */}
      <div style={{ position: "relative" }}>
        <img
          src={artist.image}
          alt={artist.name}
          style={{ width: "100%", height: 260, objectFit: "cover", display: "block" }}
          onError={(e) => { e.target.style.display = "none"; }}
        />

        {/* Gradiente para legibilidad del texto */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(10,10,10,0.98) 100%)",
          }}
        />

        {/* Botón volver */}
        <button
          onClick={onBack}
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            background: "rgba(0,0,0,0.5)",
            border: "none",
            borderRadius: "50%",
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <Icon name="back" size={18} color={Colors.text} />
        </button>

        {/* Nombre y metadata */}
        <div style={{ position: "absolute", bottom: 16, left: 20, right: 20 }}>
          <h1 style={{ ...commonStyles.heading, fontSize: 32, marginBottom: 6 }}>
            {artist.name}
          </h1>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={pill()}>{formatFollowers(artist.followers)} seguidores</span>
            <span style={pill("#e0e0e0")}>{artist.genres[0]}</span>
          </div>
        </div>
      </div>

      {/* Fila de acciones: like, play global, más opciones */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px" }}>
        <button style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <Icon name="heart" size={28} color={Colors.muted} />
        </button>

        <button
          style={{
            background: Colors.green,
            border: "none",
            borderRadius: "50%",
            width: 52,
            height: 52,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: `0 4px 20px ${Colors.green}55`,
          }}
          onClick={() => togglePlay("all")}
        >
          <Icon name={playing === "all" ? "pause" : "play"} size={24} color="#000" />
        </button>

        <button style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <Icon name="more" size={28} color={Colors.muted} />
        </button>
      </div>

      {/* ListView de Top 10 Tracks */}
      <div style={{ padding: "0 20px" }}>
        <p style={commonStyles.subHeading}>Top 10 Canciones</p>

        {loading ? (
          <Spinner />
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {tracks.map((track, i) => (
              <TrackItem
                key={track.id}
                track={track}
                index={i}
                isPlaying={playing === track.id}
                onTogglePlay={() => togglePlay(track.id)}
                isLast={i === tracks.length - 1}
                animationDelay={i * 0.05}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
