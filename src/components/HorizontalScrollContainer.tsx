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
    <div className="position: relative; mb-2">
      <div
        ref={scrollContainerRef}
        className="overflow-auto"
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

      <div className="text-center text-muted mt-2">
        Scroll horizontally to see more games
      </div>
    </div>
  );
}
