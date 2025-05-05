import { useState, useEffect } from "react";

interface FilterWindowProps {
  setFilterWindow: (value: boolean) => void;
}

export default function FilterWindow({ setFilterWindow }: FilterWindowProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

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
      document.body.style.overflow = "auto";
    }, 400);
  };

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
          className="w-1/3 p-0.5 mt-2 mb-4 bg-gray-200 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
        />
        <label className="text-sm text-[#F3E8EE] pl-4 pr-2">To:</label>
        <input
          type="number"
          className="w-1/3 p-0.5 mt-2 mb-4 bg-gray-200 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
        />
        <h3 className="text-sm text-[#F3E8EE]">Platforms</h3>
        <select
          multiple
          className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="something">something</option>
        </select>
        <button
          onClick={() => setFilterWindow(false)}
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2 mt-4"
        >
          Done
        </button>
      </div>
    </div>
  );
}
