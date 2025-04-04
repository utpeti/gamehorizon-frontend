import {
  ProcessedGame,
  DetailedGame,
} from "../../shared/interfaces/game.interface";

interface GameDetailedProps {
  loadingGameDetails: boolean;
  selectedGame: ProcessedGame | null;
  gameDetails: DetailedGame | null;
  closeModal: () => void;
}

export default function GamesDetailed({
  loadingGameDetails,
  selectedGame,
  closeModal,
  gameDetails,
}: GameDetailedProps) {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-80 z-50 flex justify-center items-center">
      <div className="bg-white p-8 w-full h-full overflow-y-auto">
        {loadingGameDetails ? (
          <div className="text-center text-white">Loading game details...</div>
        ) : (
          <div>
            <button
              onClick={closeModal}
              className="text-gray-500 p-2 text-xl absolute top-0 right-0"
            >
              X
            </button>
            <h2 className="text-3xl font-bold text-[#F3E8EE]">
              {selectedGame?.name || "Unknown Game"}
            </h2>
            <div className="my-4">
              <img
                src={selectedGame?.coverUrl}
                alt={selectedGame?.name}
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="text-sm text-gray-600">
              <p>
                <strong>Description:</strong> Game description goes here.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
