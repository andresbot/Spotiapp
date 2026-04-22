import { homeRepository } from "../data/homeRepository";

export const getNewReleases = () => {
  return homeRepository.getNewReleases();
};
