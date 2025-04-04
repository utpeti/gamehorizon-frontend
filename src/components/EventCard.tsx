import { ProcessedEvent } from "../shared/interfaces/event.interface";
import { Tooltip } from "react-tooltip";
import { useId } from "react";

interface EventCardProps {
  event: ProcessedEvent;
  extraInfo?: React.ReactNode;
}

export default function EventCard({ event, extraInfo }: EventCardProps) {
  const tooltipId = useId();

  const handleCardClick = () => {
    if (event.live_stream_url) {
      window.open(event.live_stream_url, "_blank", "noopener,noreferrer");
    }
  };

  const tooltipStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    color: "white",
    border: "1px solid #444",
    borderRadius: "4px",
    padding: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
    zIndex: 9999,
    maxWidth: "250px",
  };

  return (
    <div className="inline-block mr-2" style={{ width: "333px" }}>
      <div
        className={`bg-[#1e2e33] rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 ${
          event.live_stream_url ? "cursor-pointer" : "cursor-default"
        }`}
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        aria-label={`View ${event.name}`}
        style={{ height: "430px", position: "relative" }}
        data-tooltip-id={event.live_stream_url ? tooltipId : undefined}
      >
        <div className="relative" style={{ height: "333px" }}>
          <img
            src={event.logoUrl}
            alt={event.name}
            width={333}
            height={333}
            sizes="250px"
            className="w-full h-full object-cover rounded-t-lg"
          />
        </div>
        <div className="p-2">
          <h3 className="text-[#F3E8EE] text-lg font-semibold truncate">
            {event.name}
          </h3>
          {extraInfo}
        </div>
      </div>

      {event.live_stream_url && (
        <Tooltip
          id={tooltipId}
          place="top"
          style={tooltipStyle}
          className="event-tooltip"
        >
          <div>
            <p className="m-0 text-pink-500 font-bold">Click to watch</p>
          </div>
        </Tooltip>
      )}
    </div>
  );
}
