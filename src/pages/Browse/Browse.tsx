import { useEffect, useRef, useState } from "react";
import SearchField from "./SearchField";
import GameCard from "../../components/GameCard";
import {
  DetailedGame,
  ProcessedGame,
} from "../../shared/interfaces/game.interface";
import GamesDetailed from "../Home/GamesDetailed";

function Browse() {
  const userInputRef = useRef<HTMLInputElement>(null);
  const [searchedGames, setSearchedGames] = useState<DetailedGame[]>([]);
  const [selectedGame, setSelectedGame] = useState<ProcessedGame | null>(null);
  const [gameDetails, setGameDetails] = useState<any>(null);
  const [loadingGameDetails, setLoadingGameDetails] = useState(false);
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

  async function searchGames() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API_URL}/igdb/search/${
          userInputRef.current?.value
        }`
      );
      setSearchedGames(await response.json());
    } catch (err) {
      console.error("Error fetching game details:", err);
    }
  }

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

  const handleGameClick = (game: ProcessedGame) => {
    setSelectedGame(game);
    fetchGameDetails(game.id);
  };

  const handleGameClickFav = (game: ProcessedGame) => {
    addNewFavorite(game.id, game);
  };

  const closeModal = () => {
    setSelectedGame(null);
    setGameDetails(null);
  };

  return (
    <div className="fixed inset-0 overflow-y-auto bg-gradient-to-b from-indigo-900 via-stone-700 to-stone-900">
      <SearchField searchGames={searchGames} userInputRef={userInputRef} />
      <div className="flex flex-wrap justify-center items-center p-4 mx-auto">
        {searchedGames.map((game) => (
          <div key={game.id} className="mb-4">
            <GameCard
              game={game}
              showFavorite={true}
              isFavorite={userFavorites.some((fav) => fav === game.id)}
              onClick={() => handleGameClick(game)}
              onClickFav={() => handleGameClickFav(game)}
            />
          </div>
        ))}
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

export default Browse;
