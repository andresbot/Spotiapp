import { spotifyService } from '../../../services/spotifyService';
import { MOCK_TRACKS } from '../../../shared/data/mocks/tracks';

export const artistRepository = {
  async getTopTracks(artistId) {
    try {
      return await spotifyService.getTopTracks(artistId);
    } catch (error) {
      console.warn('Usando tracks mock por error de red:', error.message);
      return MOCK_TRACKS.map((track) => ({
        ...track,
        preview: typeof track.preview === 'string' ? track.preview : null,
      }));
    }
  },
};
