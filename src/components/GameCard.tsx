import { ProcessedGame } from "../shared/interfaces/game.interface";

interface GameCardProps {
  game: ProcessedGame;
  extraInfo?: React.ReactNode;
}

export default function GameCard({ game, extraInfo }: GameCardProps) {
  return (
    <div
      className="uk-inline-block uk-margin-small-right"
      style={{ width: "250px" }}
    >
      <div
        className="uk-card uk-card-default uk-card-hover"
        style={{ height: "430px", backgroundColor: "#1e2e33" }}
      >
        <div
          className="uk-card-media-top"
          style={{ height: "333px", position: "relative" }}
        >
          <img
            src={game.coverUrl}
            alt={game.name}
            sizes="250px"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
        <div className="uk-card-body uk-padding-small">
          <h3
            className="uk-card-title uk-margin-remove-bottom uk-text-truncate"
            style={{ fontSize: "1.2rem", color: "#F3E8EE" }}
          >
            {game.name}
          </h3>
          {extraInfo}
        </div>
      </div>
    </div>
  );
}
