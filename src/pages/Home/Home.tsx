import { useEffect, useState } from "react";
import GamesContainer from "./GamesContainer";
import UpcomingEvents from "./EventsContainer";
import { ProcessedGame } from "../../shared/interfaces/game.interface";
import GamesDetailed from "./GamesDetailed";

export default function HomePage() {
  const [selectedGame, setSelectedGame] = useState<ProcessedGame | null>(null);
  const [loadingGameDetails, setLoadingGameDetails] = useState(false);
  const [gameDetails, setGameDetails] = useState<any>(null);
  const [userFavorites, setUserFavorites] = useState<number[]>([]);

  useEffect(() => {
    async function fetchUserFavorites() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_API_URL}/users/liked-games`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setUserFavorites(data.games);
      } catch (error) {
        console.error("Error fetching user favorites:", error);
      }
    }
    fetchUserFavorites();
  }, []);

  async function fetchGameDetails(gameId: number) {
    setLoadingGameDetails(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API_URL}/igdb/game-details/${gameId}`
      );
      const data = await response.json();
      setGameDetails(data);
    } catch (error) {
      console.error("Error fetching game details:", error);
    } finally {
      setLoadingGameDetails(false);
    }
  }

  async function addNewFavorite(gameId: number) {
    const isLiked = userFavorites.includes(gameId);

    try {
      if (isLiked) {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_API_URL}/users/liked-games/${gameId}`,
          {
            method: "DELETE",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          setUserFavorites((prev) => prev.filter((fav) => fav !== gameId));
        } else {
          const errorMessage = await response.text();
          console.error("Failed to remove favorite:", errorMessage);
        }
      } else {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_API_URL}/users/liked-games`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ gameId }),
          }
        );

        if (response.ok) {
          const updated = await fetch(
            `${import.meta.env.VITE_SERVER_API_URL}/users/liked-games`,
            {
              method: "GET",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const data = await updated.json();
          setUserFavorites(data.games);
        }
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  }

  function handleGameClick(game: ProcessedGame) {
    setSelectedGame(game);
    fetchGameDetails(game.id);
  }

  function handleGameClickFav(game: ProcessedGame) {
    addNewFavorite(game.id);
  }

  function closeModal() {
    setSelectedGame(null);
    setGameDetails(null);
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-indigo-900 via-stone-700 to-stone-900">
      <div>
        <h1 className="text-4xl font-bold text-[#F3E8EE] text-center mb-8 pt-8">
          Welcome to GameHorizon
        </h1>
        <p className="text-lg text-[#F3E8EE] text-center mb-16">
          All that's gaming in one place
        </p>
      </div>
      {userFavorites.length !== 0 ? (
        <div className="w-4/5 mx-auto mb-16">
          <GamesContainer
            endpoint="knnserver/recommend"
            title="Recommended"
            formatExtraInfo={(game: ProcessedGame) => (
              <p className="text-sm text-gray-400 mt-1">
                Released on: {game.release_date} <br />
              </p>
            )}
            onGameClick={handleGameClick}
            onGameClickFav={handleGameClickFav}
            favs={userFavorites}
          />
        </div>
      ) : (
        <div>
          <h2 className="text-3xl font-bold text-[#F3E8EE] mb-3 mt-3 w-4/5 mx-auto">
            No recommendations available
          </h2>
          <p className="text-gray-500 w-4/5 mx-auto">
            Please add some games to your favorites to get personalized
            recommendations.
          </p>
        </div>
      )}

      <div className="w-4/5 mx-auto mb-16">
        <GamesContainer
          endpoint="igdb/popular"
          title="Most Popular"
          formatExtraInfo={(game: ProcessedGame) => (
            <p className="text-sm text-gray-400 mt-1">
              Released on: {game.release_date} <br />
            </p>
          )}
          onGameClick={handleGameClick}
          onGameClickFav={handleGameClickFav}
          favs={userFavorites}
        />
      </div>

      <div className="w-4/5 mx-auto mb-16">
        <GamesContainer
          endpoint="igdb/latest"
          title="Latest Releases"
          formatExtraInfo={(game: ProcessedGame) => (
            <p>Release date: {game.release_date}</p>
          )}
          onGameClick={handleGameClick}
          onGameClickFav={handleGameClickFav}
          favs={userFavorites}
        />
      </div>

      <div className="w-4/5 mx-auto mb-16">
        <GamesContainer
          endpoint="igdb/anticipated"
          title="Most Anticipated"
          formatExtraInfo={(game: ProcessedGame) => (
            <p className="text-sm text-gray-400 mt-1">
              Coming on: {game.release_date} <br />
              Hype Score: {game.hypes}
            </p>
          )}
          onGameClick={handleGameClick}
          onGameClickFav={handleGameClickFav}
          favs={userFavorites}
        />
      </div>

      <div className="w-4/5 mx-auto mb-16">
        <UpcomingEvents />
      </div>

      {selectedGame && (
        <GamesDetailed
          loadingGameDetails={loadingGameDetails}
          selectedGame={selectedGame}
          gameDetails={gameDetails}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}
