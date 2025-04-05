import HorizontalScrollContainer from "../../components/HorizontalScrollContainer";
import MediaCard from "../../components/MediaCard";
import {
  ProcessedGame,
  DetailedGame,
} from "../../shared/interfaces/game.interface";
import { useState, useEffect } from "react";

interface GameDetailedProps {
  loadingGameDetails: boolean;
  selectedGame: ProcessedGame;
  gameDetails: DetailedGame;
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
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      document.body.style.overflow = "auto";
      closeModal();
    }, 600);
  };

  console.log("Game Details:", gameDetails);

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center bg-black/60 backdrop-blur-lg transition-opacity duration-600 ${
        isOpen && !isClosing ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-linear-to-t from-stone-700 to-indigo-900 p-8 w-[75%] max-h-[90%] overflow-y-auto relative rounded-lg transition-transform duration-600 transform ${
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
              {selectedGame.name || "Unknown Game"}
            </h2>
            <div className="mt-4">
              {(gameDetails.screenshots ?? []).length > 0 ||
              (gameDetails.videos ?? []).length > 0 ? (
                <HorizontalScrollContainer scrollDistance={700}>
                  {gameDetails.videos.map((video) => (
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
                  {gameDetails.screenshots.map((screenshot) => (
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
                </HorizontalScrollContainer>
              ) : (
                <p className="text-gray-500">No media available.</p>
              )}
            </div>
            <div className="text-sm text-gray-300">
              {gameDetails.genres && gameDetails.genres.length > 0 && (
                <p>
                  <strong>Genres:</strong>{" "}
                  {gameDetails.genres.map((genre) => genre.name).join(", ")}
                </p>
              )}
              {gameDetails.platforms && gameDetails.platforms.length > 0 && (
                <p>
                  <strong>Platforms:</strong>{" "}
                  {gameDetails.platforms
                    .map((platform) => platform.name)
                    .join(", ")}
                </p>
              )}
              <p>
                <strong>Release Date:</strong> {gameDetails.release_date}
              </p>
              {gameDetails.summary && (
                <p>
                  <strong>Description:</strong> {gameDetails.summary}
                </p>
              )}
              {gameDetails.storyline && (
                <p>
                  <strong>Storyline:</strong> {gameDetails.storyline}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
