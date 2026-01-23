import React from "react";
import { Link } from "react-router-dom";

const PlayerCard = ({ player }) => (
  <div className="flex items-center justify-between bg-white shadow-md p-3 mb-3 border border-green-300/50 rounded-md hover:bg-gray-50 transition">
    {/* Image */}
    <div className="flex-shrink-0">
      <img
        src={player.photo || "https://placehold.co/100x100?text=No+Photo"}
        alt={player.name}
        className="w-14 h-14 rounded-full object-cover border border-green-400"
      />
    </div>

    {/* Details */}
    <div className="flex flex-col sm:flex-row sm:gap-8 flex-1 px-4">
      <div className="flex flex-col">
        <span className="text-xs text-gray-500 hidden sm:block">Name:</span>
        <span className="text-lg font-extrabold text-green-700">{player.name}</span>
      </div>

      <div className="flex flex-col">
        <span className="text-xs text-gray-500 hidden sm:block">School:</span>
        <span className=" font-semibold text-green-900">
          {player.school?.name || "Unknown School"}
        </span>
      </div>

      <div className="flex flex-col">
        <span className="text-xs text-gray-500 hidden sm:block">Games:</span>
        <span className="  text-green-800">
          {player.games?.map((game) => game.name).join(", ") || player.sport}
        </span>
      </div>
    </div>

    {/* Action Button */}
    <div className="flex-shrink-0">
      <Link
        to={`/players/${player._id}`}
        className="px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        View
      </Link>
    </div>
  </div>
);

export default PlayerCard;
 