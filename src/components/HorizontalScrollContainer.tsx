import { useEffect, useRef, ReactNode, useState } from "react";

interface HorizontalScrollContainerProps {
  children: ReactNode;
  scrollDistance?: number;
}

export default function HorizontalScrollContainer({
  children,
  scrollDistance = 100,
}: HorizontalScrollContainerProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (scrollContainerRef.current) {
        e.preventDefault();
        scrollContainerRef.current.scrollLeft += e.deltaY;
      }
    };

    function handleScroll() {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          scrollContainerRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
      }
    }

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("wheel", handleWheel, {
        passive: false,
      });
      scrollContainer.addEventListener("scroll", handleScroll);

      handleScroll();

      return () => {
        scrollContainer.removeEventListener("wheel", handleWheel);
        scrollContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  function scrollLeft() {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -scrollDistance,
        behavior: "smooth",
      });
    }
  }

  function scrollRight() {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollDistance,
        behavior: "smooth",
      });
    }
  }

  return (
    <div className="relative mb-2">
      {showLeftArrow && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-indigo-500 hover:bg-indigo-800 text-white opacity-80 rounded-r-lg p-2 z-10"
          aria-label="Scroll left"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

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

      {showRightArrow && (
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-indigo-500 hover:bg-indigo-800 text-white opacity-80 rounded-l-lg p-2 z-10"
          aria-label="Scroll right"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
