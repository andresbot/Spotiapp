// src/components/common/ArtistCard.jsx
// Tarjeta de artista usada en los resultados de búsqueda.

import { Colors, Radius } from "../../constants/theme";
import { pill } from "../../constants/styles";
import ArtistImage from "./ArtistImage";

/**
 * @param {{ artist: object, onPress: () => void, animationDelay?: number }} props
 */
export default function ArtistCard({ artist, onPress, animationDelay = 0 }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        cursor: "pointer",
        padding: "8px 12px",
        borderRadius: Radius.md,
        background: Colors.card,
        animation: `fadeUp 0.3s ease ${animationDelay}s both`,
      }}
      onClick={onPress}
    >
      <ArtistImage src={artist.image} size={58} />

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: Colors.text }}>
          {artist.name}
        </p>
        <p style={{ margin: "3px 0 0", fontSize: 12, color: Colors.muted, textTransform: "capitalize" }}>
          {artist.genres[0]}
        </p>
      </div>

      <span style={pill()}>{artist.popularity}%</span>
    </div>
  );
}
