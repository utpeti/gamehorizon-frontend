import AnticipatedGames from "./AnticipatedGames";
import LatestGames from "./LatestGames";
import UpcomingEvents from "./UpcomingEvents";

function HomePage() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 bg-cover bg-no-repeat">
      <div className="w-4/5 mx-auto mb-16">
        <LatestGames />
      </div>

      <div className="w-4/5 mx-auto mb-16">
        <AnticipatedGames />
      </div>

      <div className="w-4/5 mx-auto mb-16">
        <UpcomingEvents />
      </div>
    </div>
  );
}
export default HomePage;
