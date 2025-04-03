import { useState, useEffect } from "react";
import { ProcessedGame } from "../../shared/interfaces/game.interface";
import GameCard from "../../components/GameCard";
import HorizontalScroller from "../../components/HorizontalScrollContainer";
import LoadingState from "../../components/LoadingState";

export default function AnticipatedGames() {
  const [games, setGames] = useState<ProcessedGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getGames = async () => {
      setLoading(true);
      try {
        //const data = await fetchAnticipatedGames();
        //setGames(data);
        console.log("Fetching anticipated games...");
      } catch (error) {
        console.error("Error fetching anticipated games:", error);
        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch anticipated games"
        );
      } finally {
        setLoading(false);
      }
    };

    getGames();
  }, []);

  if (loading) {
    return <LoadingState message="Loading most anticipated games..." />;
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
        Most Anticipated
      </h2>

      {games.length === 0 ? (
        <p className="uk-text-muted">No anticipated games found.</p>
      ) : (
        <HorizontalScroller>
          {games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              extraInfo={
                <p className="uk-text-meta uk-margin-remove-top">
                  Coming on: {game.release_date} <br></br>
                  Hype Score: {game.hypes}
                </p>
              }
            />
          ))}
        </HorizontalScroller>
      )}
    </div>
  );
}
