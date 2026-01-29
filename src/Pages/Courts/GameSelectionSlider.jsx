import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const GameSelectionSlider = ({ games, currentIndex, setCurrentIndex }) => (
  <div className="flex items-center gap-4 mb-6 flex-wrap">
    {/* Prev Button */}
    <button
      onClick={() => setCurrentIndex((prev) => (prev - 1 + games.length) % games.length)}
      className="hidden sm:flex px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition items-center gap-2"
    >
      <FaArrowLeft className="w-4 h-4" />
      <span className="hidden sm:inline">Prev</span>
    </button>

    {/* Slider Buttons */}
    <div className="flex gap-2 overflow-x-auto pb-2 flex-1">
      {games.map((game, idx) => (
        <button
          key={game._id}
          onClick={() => setCurrentIndex(idx)}
          className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all flex-shrink-0 flex items-center gap-2 ${
            currentIndex === idx
              ? " bg-red-600 text-white shadow-lg"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          {game.name} {/* ✅ use name from backend */}
        </button>
      ))}
    </div>

    {/* Next Button */}
    <button
      onClick={() => setCurrentIndex((prev) => (prev + 1) % games.length)}
      className="hidden sm:flex px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition items-center gap-2"
    >
      <span className="hidden sm:inline">Next</span>
      <FaArrowRight className="w-4 h-4" />
    </button>
  </div>
);

export default GameSelectionSlider;
