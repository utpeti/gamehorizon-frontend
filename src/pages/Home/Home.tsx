import { useEffect, useState } from "react";
import GamesContainer from "./GamesContainer";
import UpcomingEvents from "./EventsContainer";
import { ProcessedGame } from "../../shared/interfaces/game.interface";
import GamesDetailed from "./GamesDetailed";

function HomePage() {
  const [selectedGame, setSelectedGame] = useState<ProcessedGame | null>(null);
  const [loadingGameDetails, setLoadingGameDetails] = useState(false);
  const [gameDetails, setGameDetails] = useState<any>(null);
  const [userFavorites, setUserFavorites] = useState<ProcessedGame[]>([]);

  useEffect(() => {
    const fetchUserFavorites = async () => {
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
        console.log("User favorites:", data);
        setUserFavorites(data);
      } catch (error) {
        console.error("Error fetching user favorites:", error);
      }
    };
    fetchUserFavorites();
  }, []);

  const fetchGameDetails = async (gameId: number) => {
    setLoadingGameDetails(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API_URL}/igdb/game-details/${gameId}`
      );
      const data = await response.json();
      setGameDetails(data);
    } catch (err) {
      console.error("Error fetching game details:", err);
    } finally {
      setLoadingGameDetails(false);
    }
  };

  const addNewFavorite = async (gameId: number) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API_URL}/users/liked-games`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ gameId: gameId }),
        }
      );
      if (response.status === 201) {
        const data = await response.json();
        console.log("Added to favorites:", data);
      } else {
        console.error("Failed to add to favorites:", response.status);
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const removeFavorite = async (gameId: number) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API_URL}/users/liked-games`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ gameId: gameId }),
        }
      );
      if (response.status === 200) {
        console.log("Removed from favorites");
      } else {
        console.error("Failed to remove from favorites:", response.status);
      }
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  const handleGameClick = (game: ProcessedGame) => {
    setSelectedGame(game);
    fetchGameDetails(game.id);
  };

  const handleGameClickFav = (game: ProcessedGame) => {
    const isFavorite = userFavorites.some((fav) => fav.id === game.id);
    if (isFavorite) {
      setUserFavorites((prev) => prev.filter((fav) => fav.id !== game.id));
      removeFavorite(game.id);
    } else {
      setUserFavorites((prev) => [...prev, game]);
      addNewFavorite(game.id);
    }

    console.log("Game clicked:", game);
  };

  const closeModal = () => {
    setSelectedGame(null);
    setGameDetails(null);
  };

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
      <div className="w-4/5 mx-auto mb-16">
        <GamesContainer
          endpoint="latest"
          title="Latest Releases"
          formatExtraInfo={(game: ProcessedGame) => (
            <p>Release date: {game.release_date}</p>
          )}
          onGameClick={handleGameClick}
          onGameClickFav={handleGameClickFav}
        />
      </div>

      <div className="w-4/5 mx-auto mb-16">
        <GamesContainer
          endpoint="anticipated"
          title="Most Anticipated"
          formatExtraInfo={(game: ProcessedGame) => (
            <p className="text-sm text-gray-400 mt-1">
              Coming on: {game.release_date} <br />
              Hype Score: {game.hypes}
            </p>
          )}
          onGameClick={handleGameClick}
          onGameClickFav={handleGameClickFav}
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

export default HomePage;
