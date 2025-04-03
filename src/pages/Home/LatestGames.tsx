import { useState, useEffect } from "react";
import { ProcessedGame } from "../../shared/interfaces/game.interface";
import GameCard from "../../components/GameCard";
import HorizontalScrollContainer from "../../components/HorizontalScrollContainer";
import LoadingState from "../../components/LoadingState";

export default function LatestGames() {
  const [games, setGames] = useState<ProcessedGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getGamesFetch = async () => {
      setLoading(true);
      try {
        const data = await fetch(
          `${import.meta.env.SERVER_API_URL}/igdb/latest`
        );
        const resData = await data.json();
        // setGames(resData);
        console.log(resData);
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

    getGamesFetch();
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
        <HorizontalScrollContainer>
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
        </HorizontalScrollContainer>
      )}
    </div>
  );
}
