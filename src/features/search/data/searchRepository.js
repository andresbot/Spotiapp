import { MOCK_ARTISTS } from "../../../shared/data/mocks/artists";

const NETWORK_DELAY_MS = 550;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const searchRepository = {
  async searchArtists(term) {
    await wait(NETWORK_DELAY_MS);

    const normalized = term.trim().toLowerCase();
    if (!normalized) return [];

    return MOCK_ARTISTS.filter((artist) => {
      const matchesName = artist.name.toLowerCase().includes(normalized);
      const matchesGenre = artist.genres.some((genre) =>
        genre.toLowerCase().includes(normalized)
      );

      return matchesName || matchesGenre;
    });
  },
};
