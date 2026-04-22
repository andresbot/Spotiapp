import { artistRepository } from "../data/artistRepository";

export const getTopTracks = (artistId) => {
  return artistRepository.getTopTracks(artistId);
};
