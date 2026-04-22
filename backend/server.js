const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const DEEZER_API_BASE_URL = 'https://api.deezer.com';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const normalizePopularity = (rawValue = 0) => {
  if (!rawValue) return 0;

  const scaled = Math.round((Math.log10(rawValue + 1) / 7.5) * 100);
  return clamp(scaled, 1, 100);
};

const getBestImage = (...candidates) => candidates.find(Boolean) || null;

const mapAlbum = (album) => ({
  id: String(album.id),
  name: album.title,
  artist: album.artist?.name || 'Artista desconocido',
  image: getBestImage(album.cover_xl, album.cover_big, album.cover_medium, album.cover),
  releaseDate: album.release_date || null,
  url: album.link || album.share || (album.id ? `https://www.deezer.com/album/${album.id}` : null),
  source: 'deezer',
  sourceLabel: 'Deezer',
});

const mapArtist = (artist) => ({
  id: String(artist.id),
  name: artist.name,
  genres: ['artista'],
  followers: artist.nb_fan || 0,
  image: getBestImage(
    artist.picture_xl,
    artist.picture_big,
    artist.picture_medium,
    artist.picture,
    artist.picture_small,
  ),
  popularity: normalizePopularity(artist.nb_fan || artist.rank || 0),
  url: artist.link || artist.share || (artist.id ? `https://www.deezer.com/artist/${artist.id}` : null),
  source: 'deezer',
  sourceLabel: 'Deezer',
});

const mapTrack = (track, index) => ({
  id: String(track.id),
  name: track.title,
  duration: Math.floor(track.duration || 0),
  preview: track.preview || null,
  popularity: normalizePopularity(track.rank || 0),
  albumImage: getBestImage(
    track.album?.cover_xl,
    track.album?.cover_big,
    track.album?.cover_medium,
    track.album?.cover,
  ),
  artist: track.artist?.name || null,
  url: track.link || track.share || (track.id ? `https://www.deezer.com/track/${track.id}` : null),
  position: index + 1,
  source: 'deezer',
  sourceLabel: 'Deezer',
});

const fetchDeezer = async (path, params = {}) => {
  const response = await axios.get(`${DEEZER_API_BASE_URL}${path}`, {
    params,
    timeout: 15000,
    validateStatus: () => true,
  });

  if (response.status >= 400) {
    const error = new Error(`Deezer respondio con estado ${response.status}`);
    error.status = response.status;
    error.raw = response.data;
    throw error;
  }

  if (response.data?.error) {
    const error = new Error(response.data.error.message || 'Error inesperado de Deezer');
    error.status = 502;
    error.raw = response.data.error;
    throw error;
  }

  return response.data;
};

const sendApiError = (res, error, fallbackMessage) => {
  const status = error.status || 502;
  const message = error.message || fallbackMessage;

  console.error(fallbackMessage, error.raw || error.message);
  res.status(status).json({
    error: message,
    raw: error.raw,
  });
};

app.get('/api/new-releases', async (req, res) => {
  try {
    const data = await fetchDeezer('/editorial/0/releases', { limit: 20 });
    const albums = Array.isArray(data.data) ? data.data.map(mapAlbum) : [];
    res.json(albums);
  } catch (error) {
    sendApiError(res, error, 'No fue posible cargar nuevos lanzamientos.');
  }
});

app.get('/api/search/:term', async (req, res) => {
  try {
    const data = await fetchDeezer('/search/artist', {
      q: req.params.term,
      limit: 20,
    });

    const artists = Array.isArray(data.data) ? data.data.map(mapArtist) : [];
    res.json(artists);
  } catch (error) {
    sendApiError(res, error, 'No fue posible buscar artistas.');
  }
});

app.get('/api/artist/:id', async (req, res) => {
  try {
    const data = await fetchDeezer(`/artist/${req.params.id}`);
    res.json(mapArtist(data));
  } catch (error) {
    sendApiError(res, error, 'No fue posible cargar el artista.');
  }
});

app.get('/api/artist/:id/top-tracks', async (req, res) => {
  try {
    const data = await fetchDeezer(`/artist/${req.params.id}/top`, { limit: 10 });
    const tracks = Array.isArray(data.data)
      ? data.data.slice(0, 10).map((track, index) => mapTrack(track, index))
      : [];

    res.json(tracks);
  } catch (error) {
    sendApiError(res, error, 'No fue posible cargar las canciones del artista.');
  }
});

app.get('/api/album/:id', async (req, res) => {
  try {
    const data = await fetchDeezer(`/album/${req.params.id}`);

    res.json({
      ...mapAlbum(data),
      genres: data.genres?.data?.map((genre) => genre.name) || [],
      tracks:
        data.tracks?.data?.slice(0, 10).map((track, index) =>
          mapTrack(
            {
              ...track,
              album: {
                cover: data.cover,
                cover_medium: data.cover_medium,
                cover_big: data.cover_big,
                cover_xl: data.cover_xl,
              },
              artist: data.artist,
            },
            index,
          ),
        ) || [],
    });
  } catch (error) {
    sendApiError(res, error, 'No fue posible cargar el album.');
  }
});

// Endpoint simple para verificar que el servicio esta vivo (Render health-check / debugging).
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    service: 'spotiapp-backend',
    provider: 'deezer',
    timestamp: new Date().toISOString(),
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
