import { spotifyService } from '../../../services/spotifyService';
import { MOCK_ARTISTS } from '../../../shared/data/mocks/artists';

export const searchRepository = {
  async searchArtists(term) {
    if (!term.trim()) return [];

    try {
      return await spotifyService.searchArtists(term);
    } catch (error) {
      console.warn('Usando artistas mock por error de red:', error.message);

      const normalizedTerm = term.trim().toLowerCase();
      return MOCK_ARTISTS.filter((artist) =>
        artist.name.toLowerCase().includes(normalizedTerm),
      );
    }
  },
};
