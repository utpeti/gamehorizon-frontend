import { useState, useEffect } from "react";
import { ProcessedGame } from "../../shared/interfaces/game.interface";
import GameCard from "../../components/GameCard";
import HorizontalScroller from "../../components/HorizontalScrollContainer";
import LoadingState from "../../components/LoadingState";

export default function LatestGames() {
  const [games, setGames] = useState<ProcessedGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getGames = async () => {
      setLoading(true);
      try {
        //const data = await fetchLatestGames();
        //setGames(data);
        console.log("Fetching latest games...");
      } catch (error) {
        console.error("Error fetching latest games:", error);
        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch latest games"
        );
      } finally {
        setLoading(false);
      }
    };

    getGames();
  }, []);

  if (loading) {
    return <LoadingState message="Loading latest games..." />;
  }

  if (error) {
    return (
      <div className="uk-container uk-margin-top">
        <div className="uk-alert uk-alert-danger">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="uk-heading-small" style={{ color: "#F3E8EE" }}>
        Latest Releases
      </h2>

      {games.length === 0 ? (
        <p className="uk-text-muted">No recently released games found.</p>
      ) : (
        <HorizontalScroller>
          {games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              extraInfo={
                <p className="uk-text-meta uk-margin-remove-top">
                  Release date: {game.release_date}
                </p>
              }
            />
          ))}
        </HorizontalScroller>
      )}
    </div>
  );
}
