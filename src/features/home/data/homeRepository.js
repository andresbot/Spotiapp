import { MOCK_RELEASES } from "../../../shared/data/mocks/releases";

const NETWORK_DELAY_MS = 700;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const homeRepository = {
  async getNewReleases() {
    await wait(NETWORK_DELAY_MS);
    return MOCK_RELEASES;
  },
};
