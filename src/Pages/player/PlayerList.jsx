import React, { useState, useEffect } from "react";
import PlayerCard from "./PlayerCard";

const PlayersPage = () => {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch players from backend
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await fetch("https://scoreyetu-backend.onrender.com/api/players"); // backend endpoint
        if (!res.ok) throw new Error("Failed to fetch players");
        const data = await res.json();
        setPlayers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  // Filter players by search term
  const filteredPlayers = players.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.school?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sport.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="text-center mt-10">Loading players...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">Error: {error}</p>;

  return (
    <div className="mt-16 px-2">
      {/* Search */}
      <div className="flex gap-3 sm:gap-2 mb-6">
        <input
          type="text"
          placeholder="Search by name, school, sport..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
        />
        <button className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700">
          Search
        </button>
      </div>

      {/* Player list */}
      <div className="space-y-2">
        {filteredPlayers.map((player) => (
          <PlayerCard key={player._id} player={player} />
        ))}
      </div>
    </div>
  );
};

export default PlayersPage;
