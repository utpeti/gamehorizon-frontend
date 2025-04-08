export interface Game {
  id: number;
  name: string;
  first_release_date?: number;
  hypes?: number;
  url?: string;
  cover?: {
    id: number;
    image_id: string;
    url: string;
  };
  isFavorite: boolean;
}

export interface ProcessedGame extends Game {
  release_date: string;
  coverUrl: string;
}

export interface DetailedGame extends Game, ProcessedGame {
  summary: string;
  aggregated_rating?: number;
  aggregated_rating_count?: number;
  genres?: {
    id: number;
    name: string;
  }[];
  storyline?: string;
  url?: string;
  platforms?: {
    id: number;
    name: string;
  }[];
  screenshots: {
    id: number;
    image_id: string;
    url: string;
  }[];
  videos: {
    id: number;
    video_id: string;
    url: string;
  }[];
}
