import { spotifyService } from '../../../services/spotifyService';
import { MOCK_RELEASES } from '../../../shared/data/mocks/releases';

export const homeRepository = {
  async getNewReleases() {
    try {
      return await spotifyService.getNewReleases();
    } catch (error) {
      console.warn('Usando releases mock por error de red:', error.message);
      return MOCK_RELEASES;
    }
  },
};
