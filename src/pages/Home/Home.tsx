import { useState } from "react";
import GamesContainer from "./GamesContainer";
import UpcomingEvents from "./EventsContainer";
import { ProcessedGame } from "../../shared/interfaces/game.interface";
import GamesDetailed from "./GamesDetailed";

function HomePage() {
  const [selectedGame, setSelectedGame] = useState<ProcessedGame | null>(null);
  const [loadingGameDetails, setLoadingGameDetails] = useState(false);
  const [gameDetails, setGameDetails] = useState<any>(null);

  const fetchGameDetails = async (gameId: number) => {
    setLoadingGameDetails(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API_URL}/igdb/game-details/${gameId}`
      );
      const data = await response.json();
      console.log("Game Details:", data);
      setGameDetails(data);
    } catch (err) {
      console.error("Error fetching game details:", err);
    } finally {
      setLoadingGameDetails(false);
    }
  };

  const handleGameClick = (game: ProcessedGame) => {
    setSelectedGame(game);
    fetchGameDetails(game.id);
  };

  const closeModal = () => {
    setSelectedGame(null);
    setGameDetails(null);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-indigo-900 via-stone-700 to-stone-900">
      <div>
        <h1 className="text-4xl font-bold text-[#F3E8EE] text-center mb-8">
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
