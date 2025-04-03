import AnticipatedGames from "./AnticipatedGames";
import LatestGames from "./LatestGames";
import UpcomingEvents from "./UpcomingEvents";

function HomePage() {
  return (
    <div
      className="uk-container uk-background-muted uk-height-viewport uk-width-1-1 uk-"
      style={{
        background:
          "linear-gradient(135deg,rgb(14, 17, 20),rgb(36, 46, 51),rgb(49, 56, 56))",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="uk-margin-large-bottom uk-width-4-5 uk-margin-auto">
        <LatestGames />
      </div>

      <div className="uk-margin-large-bottom uk-width-4-5 uk-margin-auto">
        <AnticipatedGames />
      </div>

      <div className="uk-margin-large-bottom uk-width-4-5 uk-margin-auto">
        <UpcomingEvents />
      </div>
    </div>
  );
}
export default HomePage;
