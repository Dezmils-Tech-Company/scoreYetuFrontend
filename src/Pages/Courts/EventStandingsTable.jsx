import React from "react";
import { motion } from "framer-motion";

const EventStandingsTable = ({ gameName, standings }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="relative"
  >
    <div className="bg-blue-50 rounded-xl overflow-hidden border border-blue-200 shadow-xl">
      {/* Header */}
      <div className="bg-blue-100 px-6 sm:px-8 py-5 border-b border-blue-200">
        <h3 className="text-2xl sm:text-3xl font-bold text-[#0a1737]">
          {gameName} <span className="text-red-600">Standings</span>
        </h3>
        <p className="text-[#0a1737] text-sm mt-1 opacity-70">
          Current rankings for {gameName}
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-100 border-b border-blue-200">
              <th>Rank</th>
              <th>School</th>
              <th className="hidden sm:table-cell">W</th>
              <th className="hidden sm:table-cell">D</th>
              <th className="hidden sm:table-cell">L</th>
              <th className="hidden lg:table-cell">GF</th>
              <th className="hidden lg:table-cell">GA</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-100">
            {standings?.map((row, idx) => (
              <tr key={row._id} className="hover:bg-blue-100">
                <td className="text-center font-bold">{idx + 1}</td>
                <td>
                  <p className="font-semibold">{row.school?.name || "Unknown School"}</p>
                  <p className="text-xs opacity-60">
                    {row.wins + row.draws + row.losses} matches
                  </p>
                </td>
                <td className="text-center hidden sm:table-cell">{row.wins}</td>
                <td className="text-center hidden sm:table-cell">{row.draws}</td>
                <td className="text-center hidden sm:table-cell">{row.losses}</td>
                <td className="text-center hidden lg:table-cell">{row.gf}</td>
                <td className="text-center hidden lg:table-cell">{row.ga}</td>
                <td className="text-center font-bold text-red-600">{row.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="bg-blue-100 px-6 sm:px-8 py-4 border-t border-blue-200 text-xs opacity-70">
        <span className="mr-4">W - Wins</span>
        <span className="mr-4">D - Draws</span>
        <span className="mr-4">L - Losses</span>
        <span className="hidden sm:inline">GF - Goals For</span>
        <span className="hidden sm:inline ml-4">GA - Goals Against</span>
      </div>
    </div>
  </motion.div>
);

export default EventStandingsTable;
