import { Game, ProcessedGame } from "../shared/interfaces/game.interface";
import { Event, ProcessedEvent } from "../shared/interfaces/event.interface";

export async function fetchLatestGames(): Promise<ProcessedGame[]> {
  const now = Math.floor(Date.now() / 1000);
  const threeMonthsAgo = now - 90 * 24 * 60 * 60;

  const query = `fields name, first_release_date, cover.image_id;
                where first_release_date >= ${threeMonthsAgo} & first_release_date <= ${now};
                sort first_release_date desc;
                limit 100;`;

  return fetchGames(query);
}

export async function fetchAnticipatedGames(): Promise<ProcessedGame[]> {
  const now = Math.floor(Date.now() / 1000);

  const query = `fields name, first_release_date, hypes, cover.image_id, url;
                where first_release_date > ${now} & hypes > 0;
                sort hypes desc;
                limit 100;`;

  return fetchGames(query);
}

async function fetchGames(query: string): Promise<ProcessedGame[]> {
  try {
    const res = await fetch("/api/igdb-route", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        endpoint: "games",
        method: "POST",
        body: query,
      }),
    });

    if (!res.ok) {
      throw new Error(`API returned status ${res.status}`);
    }

    const data: Game[] = await res.json();

    return processGameData(data);
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
}

function processGameData(data: Game[]): ProcessedGame[] {
  return data
    .map((game) => {
      if (!game.first_release_date) {
        return null;
      }

      const releaseDate = new Date(game.first_release_date * 1000)
        .toISOString()
        .split("T")[0];

      const coverUrl = game.cover?.image_id
        ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`
        : "/placeholder-game-cover.png";

      return {
        ...game,
        release_date: releaseDate,
        coverUrl: coverUrl,
      };
    })
    .filter((game): game is ProcessedGame => game !== null);
}

export async function fetchEvents(): Promise<ProcessedEvent[]> {
  const now = Math.floor(Date.now() / 1000);

  const query = `fields name, description, event_logo.image_id, live_stream_url, start_time, end_time, time_zone;
                where start_time > ${now};
                sort start_time asc;
                limit 20;`;

  try {
    const res = await fetch("/api/igdb-route", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        endpoint: "events",
        method: "POST",
        body: query,
      }),
    });

    if (!res.ok) {
      throw new Error(`API returned status ${res.status}`);
    }

    const data: Event[] = await res.json();

    return processEventData(data);
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}

function processEventData(data: Event[]): ProcessedEvent[] {
  console.log(data);
  return data.map((event) => {
    const logoUrl = event.event_logo?.image_id
      ? `https://images.igdb.com/igdb/image/upload/t_logo_med/${event.event_logo.image_id}.jpg`
      : "/placeholder-game-cover.png";

    const start = new Date(event.start_time * 1000).toISOString().split("T")[0];

    const end = new Date(event.end_time * 1000).toISOString().split("T")[0];

    return {
      ...event,
      logoUrl: logoUrl,
      start_date: start,
      end_date: end,
    };
  });
}
