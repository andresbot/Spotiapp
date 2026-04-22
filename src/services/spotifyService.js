// Para dispositivo real / APK, define EXPO_PUBLIC_API_URL (por ejemplo el dominio de Render).
// Fallback seguro para desarrollo local (web/emulador con backend en la misma maquina).
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

const fetchLocal = async (endpoint) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  const contentType = response.headers.get('content-type') || '';

  if (!response.ok) {
    if (contentType.includes('application/json')) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || `Error: ${response.status}`);
    }

    const errorText = await response.text().catch(() => '');
    throw new Error(errorText || `Error: ${response.status}`);
  }

  if (!contentType.includes('application/json')) {
    const rawResponse = await response.text().catch(() => '');
    throw new Error(`Expected JSON but received ${contentType || 'unknown content type'}: ${rawResponse.slice(0, 120)}`);
  }

  return response.json();
};

export const spotifyService = {
  async getNewReleases() {
    return await fetchLocal('/new-releases');
  },

  async searchArtists(term) {
    const encodedTerm = encodeURIComponent(term);
    return await fetchLocal(`/search/${encodedTerm}`);
  },

  async getArtist(artistId) {
    return await fetchLocal(`/artist/${artistId}`);
  },

  async getTopTracks(artistId) {
    return await fetchLocal(`/artist/${artistId}/top-tracks`);
  },

  async getAlbum(albumId) {
    return await fetchLocal(`/album/${albumId}`);
  },
};
