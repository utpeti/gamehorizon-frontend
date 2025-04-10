import { useEffect, useState } from "react";
import {
  DetailedGame,
  ProcessedGame,
} from "../../shared/interfaces/game.interface";
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

  const [favoriteGames, setFavoriteGames] = useState<DetailedGame[]>([]);

  useEffect(() => {
    const fetchUserFavorites = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_API_URL}/igdb/liked-games`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setFavoriteGames(data);
      } catch (error) {
        console.error("Error fetching user favorites:", error);
      }
    };
    fetchUserFavorites();
  }, []);

  const closeModal = () => {
    setSelectedGame(null);
    setGameDetails(null);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-indigo-900 via-stone-700 to-stone-900">
      {favoriteGames.map((game) => (
        <div>{game.name}</div>
      ))}

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
