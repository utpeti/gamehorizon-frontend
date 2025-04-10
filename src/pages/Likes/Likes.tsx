import { useEffect, useState } from "react";
import { ProcessedGame } from "../../shared/interfaces/game.interface";
import GamesDetailed from "../Home/GamesDetailed";

function Likes() {
  const [selectedGame, setSelectedGame] = useState<ProcessedGame | null>(null);
  const [loadingGameDetails, setLoadingGameDetails] = useState(false);
  const [gameDetails, setGameDetails] = useState<any>(null);
  const [userFavorites, setUserFavorites] = useState<number[]>([]);

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

  async function addNewFavorite(gameId: number, game: ProcessedGame) {
    try {
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

      if (response.status === 201) {
        setUserFavorites((prev) =>
          prev.some((fav) => fav === game.id) ? prev : [...prev, game.id]
        );
      } else if (response.status === 400) {
        setUserFavorites((prev) => prev.filter((fav) => fav !== game.id));
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  }

  const closeModal = () => {
    setSelectedGame(null);
    setGameDetails(null);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-indigo-900 via-stone-700 to-stone-900">
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

export default Likes;
