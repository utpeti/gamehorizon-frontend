import { useState, useEffect } from "react";

interface FilterWindowProps {
  setFilterWindow: (value: boolean) => void;
}

export default function FilterWindow({ setFilterWindow }: FilterWindowProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [genres, setGenres] = useState<any[]>([]);
  const [platforms, setPlatforms] = useState<any[]>([]);
  const [releaseFrom, setReleaseFrom] = useState<number | undefined>();
  const [releaseTo, setReleaseTo] = useState<number | undefined>();
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_API_URL}/igdb/genres`
        );
        const data = await response.json();
        setGenres(data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    }

    async function fetchPlatforms() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_API_URL}/igdb/platforms`
        );
        const data = await response.json();
        setPlatforms(data);
      } catch (error) {
        console.error("Error fetching platforms:", error);
      }
    }

    fetchGenres();
    fetchPlatforms();
  });

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setFilterWindow(false);
      document.body.style.overflow = "auto";
    }, 400);
  };

  async function handleSubmitFilters() {
    const payload = {
      releaseFrom,
      releaseTo,
      genres: selectedGenres,
      platforms: selectedPlatforms,
    };

    try {
      await fetch(`${import.meta.env.VITE_SERVER_API_URL}/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error("Error sending filters:", error);
    }
  }

  const currentYear = new Date().getFullYear();

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center bg-black/60 backdrop-blur-lg transition-opacity duration-400 ${
        isOpen && !isClosing ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-linear-to-t from-stone-700 to-indigo-900 p-8 w-[30%] max-h-[60%] overflow-y-auto relative rounded-lg transition-transform duration-400 transform ${
          isOpen && !isClosing ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-[#F3E8EE]">Filter Options</h2>
        <h3 className="text-sm text-[#F3E8EE] mt-4">Release date</h3>
        <label className="text-sm text-[#F3E8EE] pr-2">From:</label>
        <input
          type="number"
          min={1950}
          max={releaseTo || currentYear + 10}
          value={releaseFrom ?? ""}
          onChange={(e) => setReleaseFrom(Number(e.target.value))}
          className="w-1/3 p-0.5 mt-2 mb-4 bg-gray-200 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
        />
        <label className="text-sm text-[#F3E8EE] pl-4 pr-2">To:</label>
        <input
          type="number"
          min={releaseFrom || 1950}
          max={currentYear + 10}
          value={releaseTo ?? ""}
          onChange={(e) => setReleaseTo(Number(e.target.value))}
          className="w-1/3 p-0.5 mt-2 mb-4 bg-gray-200 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
        />
        <h3 className="text-sm text-[#F3E8EE]">Platforms</h3>
        <select
          multiple
          value={selectedPlatforms}
          onChange={(e) =>
            setSelectedPlatforms(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
          className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {genres.map((genre) => (
            <option key={genre.id} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>
        <h3 className="text-sm text-[#F3E8EE] mt-4">Genres</h3>
        <select
          multiple
          value={selectedGenres}
          onChange={(e) =>
            setSelectedGenres(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
          className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {platforms.map((platform) => (
            <option key={platform.id} value={platform.name}>
              {platform.name}
            </option>
          ))}
        </select>
        <button
          onClick={async () => {
            await handleSubmitFilters();
            setFilterWindow(false);
          }}
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2 mt-4"
        >
          Done
        </button>
      </div>
    </div>
  );
}
