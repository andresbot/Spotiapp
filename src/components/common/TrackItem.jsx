// src/components/common/TrackItem.jsx
// Fila de canción en el ListView de TopTracks (ArtistScreen).
// Incluye botón de preview (30s) si la pista tiene preview_url.

import Icon from "./Icon";
import { Colors } from "../../constants/theme";
import { formatDuration } from "../../helpers/formatters";

/**
 * @param {{
 *   track: object,
 *   index: number,
 *   isPlaying: boolean,
 *   onTogglePlay: () => void,
 *   isLast: boolean,
 *   animationDelay?: number
 * }} props
 */
export default function TrackItem({ track, index, isPlaying, onTogglePlay, isLast, animationDelay = 0 }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "10px 0",
        borderBottom: !isLast ? `1px solid ${Colors.faint}` : "none",
        animation: `fadeUp 0.35s ease ${animationDelay}s both`,
      }}
    >
      {/* Número / ícono de música si está reproduciendo */}
      <span style={{ width: 20, textAlign: "center", color: isPlaying ? Colors.green : Colors.muted, fontSize: 13, fontWeight: 600 }}>
        {isPlaying
          ? <Icon name="music" size={14} color={Colors.green} />
          : index + 1
        }
      </span>

      {/* Nombre y duración */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            margin: 0,
            fontSize: 14,
            fontWeight: 600,
            color: isPlaying ? Colors.green : Colors.text,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {track.name}
        </p>
        <p style={{ margin: "2px 0 0", fontSize: 11, color: Colors.muted }}>
          {formatDuration(track.duration)}
        </p>
      </div>

      {/* Botón de preview (solo si tiene preview_url) */}
      {track.preview && (
        <button
          onClick={onTogglePlay}
          style={{
            background: isPlaying ? Colors.green : Colors.faint,
            border: "none",
            borderRadius: "50%",
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
        >
          <Icon
            name={isPlaying ? "pause" : "play"}
            size={14}
            color={isPlaying ? "#000" : Colors.text}
          />
        </button>
      )}
    </div>
  );
}
