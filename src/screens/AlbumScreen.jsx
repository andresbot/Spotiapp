// src/screens/AlbumScreen.jsx
// Detalle de un álbum nuevo lanzamiento.
// Se accede desde HomeScreen al tocar un AlbumCard.

import Icon from "../components/common/Icon";
import { commonStyles, btn } from "../constants/styles";
import { Colors } from "../constants/theme";

/**
 * @param {{ album: object, onBack: () => void }} props
 */
export default function AlbumScreen({ album, onBack }) {
  return (
    <div style={{ paddingBottom: 24 }}>
      {/* Hero del álbum */}
      <div style={{ position: "relative" }}>
        <img
          src={album.image}
          alt={album.name}
          style={{ width: "100%", height: 280, objectFit: "cover", display: "block" }}
          onError={(e) => { e.target.style.background = Colors.card; e.target.src = ""; }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(10,10,10,1))",
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

        <div style={{ position: "absolute", bottom: 20, left: 20 }}>
          <h1 style={{ ...commonStyles.heading, fontSize: 28, marginBottom: 4 }}>
            {album.name}
          </h1>
          <p style={{ margin: 0, color: Colors.muted, fontSize: 14 }}>{album.artist}</p>
        </div>
      </div>

      {/* Descripción y CTA */}
      <div style={{ padding: "20px" }}>
        <p style={{ color: Colors.muted, fontSize: 14, lineHeight: 1.6 }}>
          Nuevo lanzamiento disponible en Spotify. Escucha el álbum completo y descubre todos sus tracks.
        </p>
        <button style={{ ...btn("primary"), width: "100%", marginTop: 16, padding: "14px" }}>
          Escuchar en Spotify
        </button>
      </div>
    </div>
  );
}
