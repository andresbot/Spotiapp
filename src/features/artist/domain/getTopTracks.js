import { artistRepository } from "../data/artistRepository";

export const getTopTracks = () => {
  return artistRepository.getTopTracks();
};
