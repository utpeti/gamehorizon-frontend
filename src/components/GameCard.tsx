import { ProcessedGame } from "../shared/interfaces/game.interface";

interface GameCardProps {
  game: ProcessedGame;
  extraInfo?: React.ReactNode;
  onClick?: () => void;
  onClickFav?: () => void;
  isFavorite?: boolean;
  showFavorite: boolean;
  showRemove?: boolean;
  onClickRemove?: () => void;
}

export default function GameCard({
  game,
  extraInfo,
  onClick,
  onClickFav,
  isFavorite,
  showFavorite,
  showRemove,
  onClickRemove,
}: GameCardProps) {
  return (
    <div className="inline-block mr-2" style={{ width: "250px" }}>
      <div
        className="bg-gradient-to-b from-indigo-950 via-stone-700 to-stone-950 rounded-lg shadow-xl hover:shadow-xl transition-all duration-200 hover:rounded-xl hover:scale-103 cursor-pointer hover:bg-[#1e2e33]/80"
        style={{ height: "430px" }}
        onClick={onClick}
      >
        <div
          className="relative"
          style={{ height: "333px", position: "relative" }}
        >
          {showFavorite && (
            <div className="absolute top-2 right-2">
              <button
                className="bg-transparent border-none cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onClickFav) {
                    onClickFav();
                  }
                }}
              >
                <svg
                  className="h-8 w-8 text-red-500"
                  fill={isFavorite ? "red" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          )}
          <img
            src={game.coverUrl}
            alt={game.name}
            sizes="250px"
            className="object-fill object-center w-full h-full rounded-t-lg"
          />
        </div>
        <div className="relative p-2">
          <h3 className="text-[#F3E8EE] text-lg font-semibold truncate">
            {game.name}
          </h3>
          <div className="text-sm text-gray-400 mt-1">
            {extraInfo}
            {showRemove && (
              <div className="absolute top-16 right-2">
                <button
                  className="border-none cursor-pointer hover:bg-indigo-900 p-1 rounded-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onClickRemove) {
                      onClickRemove();
                    }
                  }}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
