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
}

export interface ProcessedGame extends Game {
  release_date: string;
  coverUrl: string;
}

export interface DetailedGame extends Game {
  summary: string;
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
