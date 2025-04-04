export interface Event {
  id: number;
  name: string;
  description: string;
  event_logo: {
    id: number;
    image_id: string;
    url: string;
  };
  live_stream_url: string;
  start_time: number;
  end_time: number;
  timezone: string;
}

export interface ProcessedEvent extends Event {
  logoUrl: string;
  start_date: string;
  end_date: string;
}
