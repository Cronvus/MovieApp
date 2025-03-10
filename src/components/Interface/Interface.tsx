export interface Movie {
  id: number;
  title: string;
  vote_average: number;
  overview: string;
  release_date: string;
  poster_path: string | null;
  genre_ids: number[];
}

export interface SearchProps {
  onSearch: (query: string) => void;
}

