// src/navigation/AppNavigator.jsx
// Maneja la navegación entre pantallas.
// En React Native se reemplaza por @react-navigation/native.

import { useState, useRef } from "react";
import HomeScreen   from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import ArtistScreen from "../screens/ArtistScreen";
import AlbumScreen  from "../screens/AlbumScreen";
import BottomNav    from "../components/layout/BottomNav";

/**
 * Stack de navegación simple:
 *  - detail === null  → muestra la tab activa (Home o Search)
 *  - detail.type === 'artist' → ArtistScreen
 *  - detail.type === 'album'  → AlbumScreen
 *
 * @param {{ screenRef: React.RefObject }} props
 */
export default function AppNavigator({ screenRef }) {
  const [activeTab, setActiveTab] = useState("home");
  const [detail,    setDetail]    = useState(null); // { type, data }

  const navigate = (type, data) => {
    setDetail({ type, data });
    if (screenRef?.current) screenRef.current.scrollTop = 0;
  };

  const goBack = () => setDetail(null);

  return (
    <>
      {/* ── Contenido de la pantalla activa ── */}
      {detail?.type === "artist" && (
        <ArtistScreen artist={detail.data} onBack={goBack} />
      )}

      {detail?.type === "album" && (
        <AlbumScreen album={detail.data} onBack={goBack} />
      )}

      {!detail && activeTab === "home" && (
        <HomeScreen onAlbumPress={(album) => navigate("album", album)} />
      )}

      {!detail && activeTab === "search" && (
        <SearchScreen onArtistPress={(artist) => navigate("artist", artist)} />
      )}

      {/* ── Tab bar (oculta en pantallas de detalle) ── */}
      {!detail && (
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      )}
    </>
  );
}
