// src/components/common/AlbumCard.jsx
// Tarjeta de álbum usada en el GridView del HomeScreen.

import { commonStyles } from "../../constants/styles";
import { Colors } from "../../constants/theme";

/**
 * @param {{ album: object, onPress: () => void, animationDelay?: number }} props
 */
export default function AlbumCard({ album, onPress, animationDelay = 0 }) {
  return (
    <div
      style={{
        ...commonStyles.card,
        animation: `fadeUp 0.4s ease ${animationDelay}s both`,
      }}
      onClick={onPress}
    >
      <img
        src={album.image}
        alt={album.name}
        style={{ width: "100%", aspectRatio: "1", objectFit: "cover", display: "block" }}
        onError={(e) => { e.target.style.display = "none"; }}
      />
      <div style={{ padding: "10px 12px 12px" }}>
        <p
          style={{
            margin: 0,
            fontSize: 13,
            fontWeight: 700,
            color: Colors.text,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {album.name}
        </p>
        <p
          style={{
            margin: "3px 0 0",
            fontSize: 11,
            color: Colors.muted,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {album.artist}
        </p>
      </div>
    </div>
  );
}
