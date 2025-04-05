import HorizontalScrollContainer from "../../components/HorizontalScrollContainer";
import MediaCard from "../../components/MediaCard";
import {
  ProcessedGame,
  DetailedGame,
} from "../../shared/interfaces/game.interface";
import { useState, useEffect } from "react";

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
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      closeModal();
    }, 600);
  };

  console.log("Game Details:", gameDetails);

  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 bg-opacity-80 z-50 flex justify-center items-center backdrop-blur-md transition-opacity duration-600 ${
        isOpen && !isClosing ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-blue-950 p-8 w-[75%] max-h-[90%] overflow-y-auto relative rounded-lg transition-transform duration-600 transform ${
          isOpen && !isClosing ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {loadingGameDetails ? (
          <div className="text-center text-white">Loading game details...</div>
        ) : (
          <div>
            <button
              onClick={handleClose}
              className="text-gray-500 p-2 text-xl absolute top-2 right-2"
            >
              X
            </button>
            <h2 className="text-3xl font-bold text-[#F3E8EE]">
              {selectedGame?.name || "Unknown Game"}
            </h2>
            <div className="mt-4">
              <HorizontalScrollContainer>
                {gameDetails?.media.screenshots.map((screenshot) => (
                  <MediaCard
                    key={screenshot.id}
                    media={{
                      id: screenshot.id,
                      media_id: screenshot.image_id,
                      url: screenshot.url,
                    }}
                    type="image"
                  />
                ))}
                {gameDetails?.media.videos.map((video) => (
                  <MediaCard
                    key={video.id}
                    media={{
                      id: video.id,
                      media_id: video.video_id,
                      url: video.url,
                    }}
                    type="video"
                  />
                ))}
              </HorizontalScrollContainer>
            </div>
            <div className="text-sm text-gray-600">
              <p>
                <strong>Description:</strong> {gameDetails?.summary}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
