import GamesContainer from "./GamesContainer";
import UpcomingEvents from "./UpcomingEvents";
import { ProcessedGame } from "../../shared/interfaces/game.interface";

function HomePage() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 bg-cover bg-no-repeat">
      <div className="w-4/5 mx-auto mb-16">
        <GamesContainer
          endpoint="latest"
          title="Latest Releases"
          formatExtraInfo={(game: ProcessedGame) => (
            <p>Release date: {game.release_date}</p>
          )}
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
        />
      </div>

      <div className="w-4/5 mx-auto mb-16">
        <UpcomingEvents />
      </div>
    </div>
  );
}

export default HomePage;
