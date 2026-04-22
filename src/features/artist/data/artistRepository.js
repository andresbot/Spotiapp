import { MOCK_TRACKS } from "../../../shared/data/mocks/tracks";

const NETWORK_DELAY_MS = 650;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const artistRepository = {
  async getTopTracks() {
    await wait(NETWORK_DELAY_MS);
    return MOCK_TRACKS;
  },
};
