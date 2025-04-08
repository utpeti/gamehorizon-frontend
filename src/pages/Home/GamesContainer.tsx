import { useState, useEffect, JSX } from "react";
import { ProcessedGame } from "../../shared/interfaces/game.interface";
import GameCard from "../../components/GameCard";
import HorizontalScrollContainer from "../../components/HorizontalScrollContainer";
import LoadingState from "../../components/LoadingState";

interface GamesContainerProps {
  endpoint: string;
  title: string;
  onGameClick: (game: ProcessedGame) => void;
  onGameClickFav: (game: ProcessedGame) => void;
  formatExtraInfo: (game: ProcessedGame) => JSX.Element;
}

export default function GamesContainer({
  endpoint,
  title,
  formatExtraInfo,
  onGameClick,
  onGameClickFav,
}: GamesContainerProps) {
  const [games, setGames] = useState<ProcessedGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_API_URL}/igdb/${endpoint}`
        );
        const resData = await response.json();
        setGames(resData);
      } catch (err) {
        console.error(`Error fetching ${title}:`, err);
        setError(
          err instanceof Error ? err.message : `Failed to fetch ${title}`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [endpoint, title]);

  if (loading) {
    return <LoadingState message={`Loading ${title.toLowerCase()}...`} />;
  }

  if (error) {
    return (
      <div className="container mx-auto mt-4">
        <div className="bg-red-500 text-white p-4 rounded-lg">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-[#F3E8EE] mb-3 mt-3">{title}</h2>

      {games.length === 0 ? (
        <p className="text-gray-500">No {title.toLowerCase()} found.</p>
      ) : (
        <HorizontalScrollContainer scrollDistance={250}>
          {games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              extraInfo={formatExtraInfo(game)}
              onClick={() => onGameClick(game)}
              onClickFav={() => onGameClickFav(game)}
            />
          ))}
        </HorizontalScrollContainer>
      )}
    </div>
  );
}
