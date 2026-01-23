import React from "react";
import { motion } from "framer-motion";

const EventStandingsTable = ({ event }) => (
  <motion.div
    key={event._id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="relative"
  >
    <div className="bg-blue-50 rounded-xl overflow-hidden border border-blue-200 shadow-xl">
      <div className="bg-blue-100 px-6 sm:px-8 py-5 border-b border-blue-200">
        <h3 className="text-2xl sm:text-3xl font-bold text-[#0a1737]">
          {event.sport} <span className="text-red-600">Standings</span>
        </h3>
        <p className="text-[#0a1737] text-sm mt-1 opacity-70">{event.title}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-100 border-b border-blue-200">
              <th>Rank</th><th>School</th><th className="hidden sm:table-cell">W</th>
              <th className="hidden sm:table-cell">D</th><th className="hidden sm:table-cell">L</th>
              <th className="hidden lg:table-cell">GF</th><th className="hidden lg:table-cell">GA</th><th>Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-100">
            {event.results?.map((result, idx) => (
              <tr key={idx} className="hover:bg-blue-100">
                <td className="text-center font-bold">{idx + 1}</td>
                <td>
                  <p className="font-semibold">{result.school?.name || "Unknown School"}</p>
                  <p className="text-xs opacity-60">{result.wins + result.draws + result.losses} matches</p>
                </td>
                <td className="text-center hidden sm:table-cell">{result.wins}</td>
                <td className="text-center hidden sm:table-cell">{result.draws}</td>
                <td className="text-center hidden sm:table-cell">{result.losses}</td>
                <td className="text-center hidden lg:table-cell">{result.gf}</td>
                <td className="text-center hidden lg:table-cell">{result.ga}</td>
                <td className="text-center font-bold text-red-600">{result.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-blue-100 px-6 sm:px-8 py-4 border-t border-blue-200 text-xs opacity-70">
        <span className="mr-4">W - Wins</span>
        <span className="mr-4">D - Draws</span>
        <span className="mr-4">L - Losses</span>
        <span className="hidden sm:inline">GF - Goals For</span>
      </div>
    </div>
  </motion.div>
);

export default EventStandingsTable;
