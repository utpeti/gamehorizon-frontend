import { useState } from "react";
import FilterWindow from "./FilterWindow";

interface SearchFieldProps {
  searchGames: () => void;
  userInputRef: React.RefObject<HTMLInputElement | null>;
}

export default function SearchField({
  searchGames,
  userInputRef,
}: SearchFieldProps) {
  const [firstSearch, setFirstSearch] = useState(true);
  const [filterWindow, setFilterWindow] = useState(false);

  function handleSearchButtonClick() {
    if (firstSearch) {
      setFirstSearch(false);
    }
    searchGames();
  }

  function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleSearchButtonClick();
    }
  }

  function handleFilterButtonClick() {
    setFilterWindow(true);
  }

  return (
    <>
      {filterWindow && <FilterWindow setFilterWindow={setFilterWindow} />}
      {firstSearch && (
        <img
          src="/logo.png"
          alt="Logo"
          width={250}
          height={250}
          className="mx-auto pt-50"
        />
      )}
      <div
        className={`flex items-center justify-center transition-all duration-800 ease-linear ${
          firstSearch ? "mt-4" : "pt-20 pb-10"
        }`}
      >
        <div className="flex px-4 py-3 rounded-xl border-2 border-gray-600 bg-gray-200 w-4/5 transition-all duration-500 ease-linear">
          <input
            type="text"
            className={`w-full outline-none bg-transparent text-gray-600 transition-all duration-800 ease-linear ${
              firstSearch ? "text-2xl p-2" : "text-lg p-1"
            }`}
            onKeyUp={handleKeyUp}
            ref={userInputRef}
          />
          <button className="cursor-pointer" onClick={handleFilterButtonClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="none"
              width="28px"
              className="text-gray-600 mr-4"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"
              />
            </svg>
          </button>
          <button className="cursor-pointer" onClick={handleSearchButtonClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192.904 192.904"
              width="28px"
              className="fill-gray-600"
            >
              <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
