import { useEffect, useRef, ReactNode } from "react";

interface HorizontalScrollContainerProps {
  children: ReactNode;
}

export default function HorizontalScrollContainer({
  children,
}: HorizontalScrollContainerProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (scrollContainerRef.current) {
        e.preventDefault();
        scrollContainerRef.current.scrollLeft += e.deltaY;
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("wheel", handleWheel, {
        passive: false,
      });

      return () => {
        scrollContainer.removeEventListener("wheel", handleWheel);
      };
    }
  }, []);

  return (
    <div className="uk-position-relative uk-margin-medium-bottom">
      <div
        ref={scrollContainerRef}
        className="uk-overflow-auto"
        style={{
          scrollbarWidth: "thin",
          msOverflowStyle: "none",
          scrollbarColor: "rgba(0,0,0,0.3) transparent",
          whiteSpace: "nowrap",
          paddingBottom: "10px",
        }}
      >
        {children}
      </div>

      <div className="uk-text-center uk-text-muted uk-margin-small-top">
        <span uk-icon="icon: arrow-left"></span>
        Scroll horizontally to see more games
        <span uk-icon="icon: arrow-right"></span>
      </div>
    </div>
  );
}
