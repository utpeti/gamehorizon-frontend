import { useState, useEffect } from "react";
import { ProcessedEvent } from "../../shared/interfaces/event.interface";
import EventCard from "../../components/EventCard";
import HorizontalScrollContainer from "../../components/HorizontalScrollContainer";
import LoadingState from "../../components/LoadingState";

export default function UpcomingEvents() {
  const [events, setEvents] = useState<ProcessedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getEventsFetch = async () => {
      setLoading(true);
      try {
        // const data = await fetch(
        //   `${import.meta.env.SERVER_API_URL}/igdb/events`
        // );
        // const resData = await data.json();
        // setEvents(resData);
        // console.log(resData);
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch upcoming events"
        );
      } finally {
        setLoading(false);
      }
    };

    getEventsFetch();
  }, []);

  if (loading) {
    return <LoadingState message="Loading upcoming events..." />;
  }

  if (error) {
    return (
      <div className="uk-container uk-margin-top">
        <div className="uk-alert uk-alert-danger">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="uk-heading-small" style={{ color: "#F3E8EE" }}>
        Upcoming Events
      </h2>

      {events.length === 0 ? (
        <p className="uk-text-muted">No upcoming events found.</p>
      ) : (
        <HorizontalScrollContainer>
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              extraInfo={
                <p className="uk-text-meta uk-margin-remove-top">
                  Starting on: {event.start_date}
                  <br></br>
                  Ends on: {event.end_date}
                </p>
              }
            />
          ))}
        </HorizontalScrollContainer>
      )}
    </div>
  );
}
