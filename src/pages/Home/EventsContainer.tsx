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
        const data = await fetch(
          `${import.meta.env.VITE_SERVER_API_URL}/igdb/events`
        );
        const resData = await data.json();
        console.log(resData);
        setEvents(resData);
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
      <div className="container mx-auto mt-4">
        <div className="bg-red-500 text-white p-4 rounded-lg">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-[#F3E8EE]">Upcoming Events</h2>

      {events.length === 0 ? (
        <p className="text-gray-500">No upcoming events found.</p>
      ) : (
        <HorizontalScrollContainer>
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              extraInfo={
                <p className="text-sm text-gray-400 mt-1">
                  Starting on: {event.start_date} <br />
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
