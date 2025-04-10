interface MediaCardProps {
  media: {
    id: number;
    media_id: string;
    url: string;
  };
  type: string;
}

export default function MediaCard({ media, type }: MediaCardProps) {
  return (
    <div className="inline-block mr-2" style={{ width: "700px" }}>
      <div
        className="relative"
        style={{ height: "400px", position: "relative" }}
      >
        {type === "image" && (
          <img
            src={media.url}
            alt={media.media_id}
            className="object-contain object-center w-full h-full rounded-t-lg"
            loading="lazy"
          />
        )}
        {type === "video" && (
          <iframe
            src={media.url}
            allow="autoplay; encrypted-media"
            allowFullScreen
            title={media.media_id}
            className="object-contain object-center w-full h-full rounded-t-lg will-change-transform"
            loading="lazy"
          />
        )}
      </div>
    </div>
  );
}
