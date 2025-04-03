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
    <div
      className="uk-inline-block uk-margin-small-right"
      style={{ width: "333px" }}
    >
      <div
        className="uk-card uk-card-default uk-card-hover event-card"
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        aria-label={`View ${event.name}`}
        style={{
          cursor: event.live_stream_url ? "pointer" : "default",
          height: "430px",
          backgroundColor: "#1e2e33",
          position: "relative",
        }}
        data-tooltip-id={event.live_stream_url ? tooltipId : undefined}
      >
        <div
          className="uk-card-media-top"
          style={{ height: "333px", position: "relative" }}
        >
          <img
            src={event.logoUrl}
            alt={event.name}
            width={333}
            height={333}
            sizes="250px"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className="uk-card-body uk-padding-small">
          <h3
            className="uk-card-title uk-margin-remove-bottom uk-text-truncate"
            style={{ fontSize: "1.2rem", color: "#F3E8EE" }}
          >
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
            <p style={{ margin: 0, color: "#ff4081", fontWeight: "bold" }}>
              Click to watch
            </p>
          </div>
        </Tooltip>
      )}
    </div>
  );
}
