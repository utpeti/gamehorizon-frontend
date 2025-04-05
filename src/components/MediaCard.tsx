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
    <div className="inline-block mr-2" style={{ width: "250px" }}>
      <div
        className="relative"
        style={{ height: "333px", position: "relative" }}
      >
        <img
          src={media.url}
          alt={media.media_id}
          sizes="250px"
          className="object-contain object-center w-full h-full rounded-t-lg"
        />
      </div>
    </div>
  );
}
