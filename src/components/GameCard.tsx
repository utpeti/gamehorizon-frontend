import { ProcessedGame } from "../shared/interfaces/game.interface";

interface GameCardProps {
  game: ProcessedGame;
  extraInfo?: React.ReactNode;
}

export default function GameCard({ game, extraInfo }: GameCardProps) {
  return (
    <div className="inline-block mr-2" style={{ width: "250px" }}>
      <div
        className="bg-[#1e2e33] rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
        style={{ height: "430px" }}
      >
        <div
          className="relative"
          style={{ height: "333px", position: "relative" }}
        >
          <img
            src={game.coverUrl}
            alt={game.name}
            sizes="250px"
            className="object-contain object-center w-full h-full rounded-t-lg"
          />
        </div>
        <div className="p-2">
          <h3 className="text-[#F3E8EE] text-lg font-semibold truncate">
            {game.name}
          </h3>
          <div className="text-sm text-gray-400 mt-1">{extraInfo}</div>
        </div>
      </div>
    </div>
  );
}
