import HorizontalScrollContainer from "../../components/HorizontalScrollContainer";
import MediaCard from "../../components/MediaCard";
import {
  ProcessedGame,
  DetailedGame,
} from "../../shared/interfaces/game.interface";
import { useState, useEffect } from "react";
import DetailBlob from "./DetailBlob";

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
    }, 400);
  };

  console.log("Game Details:", gameDetails);

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center bg-black/60 backdrop-blur-lg transition-opacity duration-400 ${
        isOpen && !isClosing ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-linear-to-t from-stone-700 to-indigo-900 p-8 w-[75%] max-h-[90%] overflow-y-auto relative rounded-lg transition-transform duration-400 transform ${
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
            <div className="flex flex-col md:flex-row mt-4">
              <div className="text-base text-gray-300 w-2xl">
                {gameDetails.genres && gameDetails.genres.length > 0 && (
                  <DetailBlob>
                    <p>
                      <strong>Genres:</strong>{" "}
                      {gameDetails.genres.map((genre) => genre.name).join(", ")}
                    </p>
                  </DetailBlob>
                )}
                {gameDetails.platforms && gameDetails.platforms.length > 0 && (
                  <DetailBlob>
                    <p>
                      <strong>Platforms:</strong>{" "}
                      {gameDetails.platforms
                        .map((platform) => platform.name)
                        .join(", ")}
                    </p>
                  </DetailBlob>
                )}
                <DetailBlob>
                  <p>
                    <strong>Release Date:</strong> {gameDetails.release_date}
                  </p>
                </DetailBlob>
                {gameDetails.summary && (
                  <DetailBlob>
                    <p>
                      <strong>Description:</strong> {gameDetails.summary}
                    </p>
                  </DetailBlob>
                )}
                {gameDetails.storyline && (
                  <DetailBlob>
                    <p>
                      <strong>Storyline:</strong> {gameDetails.storyline}
                    </p>
                  </DetailBlob>
                )}
              </div>
              <div className="ml-4 mr-4 text-base text-gray-300 w-2xl">
                <DetailBlob>
                  <h1>Ratings</h1>
                  {gameDetails.aggregated_rating ? (
                    <>
                      <p>
                        <strong>
                          {Math.round(gameDetails.aggregated_rating)}/100
                        </strong>
                      </p>
                      <p>
                        <strong>
                          {gameDetails.aggregated_rating_count} ratings
                        </strong>
                      </p>
                    </>
                  ) : (
                    <p>No ratings yet</p>
                  )}
                </DetailBlob>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
