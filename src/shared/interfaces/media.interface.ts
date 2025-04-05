export interface Media {
  id: number;
  game_id: number;
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
