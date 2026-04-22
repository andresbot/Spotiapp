import { searchRepository } from "../data/searchRepository";

export const searchArtists = (term) => {
  return searchRepository.searchArtists(term);
};
