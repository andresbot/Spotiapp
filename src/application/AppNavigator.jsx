import { useState } from "react";
import { StyleSheet, View } from "react-native";

import HomeScreen from "../features/home/presentation/HomeScreen";
import SearchScreen from "../features/search/presentation/SearchScreen";
import ArtistScreen from "../features/artist/presentation/ArtistScreen";
import AlbumScreen from "../features/album/presentation/AlbumScreen";
import BottomNav from "../shared/presentation/components/BottomNav";

const DETAIL_TYPES = {
  artist: "artist",
  album: "album",
};

export default function AppNavigator() {
  const [activeTab, setActiveTab] = useState("home");
  const [detail, setDetail] = useState(null);

  const navigateTo = (type, data) => {
    setDetail({ type, data });
  };

  const goBack = () => {
    setDetail(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {detail?.type === DETAIL_TYPES.artist && (
          <ArtistScreen artist={detail.data} onBack={goBack} />
        )}

        {detail?.type === DETAIL_TYPES.album && (
          <AlbumScreen album={detail.data} onBack={goBack} />
        )}

        {!detail && activeTab === "home" && (
          <HomeScreen onAlbumPress={(album) => navigateTo(DETAIL_TYPES.album, album)} />
        )}

        {!detail && activeTab === "search" && (
          <SearchScreen onArtistPress={(artist) => navigateTo(DETAIL_TYPES.artist, artist)} />
        )}
      </View>

      {!detail && <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
