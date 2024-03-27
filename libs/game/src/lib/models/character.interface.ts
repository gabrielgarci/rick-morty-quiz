export type CharacterStatus = 'Alive' | 'Dead';

export interface Character {
  image: string;
  status: CharacterStatus;
  name: string;
  species: string;
  origin: string;
}

export interface CharacterResponse {
  info: {
    count: number;
    next: string;
    pages: number;
    prev: string;
  };
  results: Character[];
}
