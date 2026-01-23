import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const PlayerProfile = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const res = await fetch(`https://scoreyetu-backend.onrender.com/api/players/${id}`);
        if (!res.ok) throw new Error("Failed to fetch player");
        const data = await res.json();
        setPlayer(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayer();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading player profile...</p>;
  if (error) return <p className="text-red-600 mt-10">Error: {error}</p>;
  if (!player) return <p className="text-red-600 mt-10">Player not found</p>;

  return (
    <div className="mt-16 px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto bg-white shadow-md rounded-md p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-4">{player.name}</h2>
      <img
        src={player.photo || "https://placehold.co/150x150?text=No+Photo"}
        alt={player.name}
        className="w-32 h-32 rounded-full object-cover border border-green-400 mb-4"
      />

      <p className="text-gray-700"><strong>School:</strong> {player.school?.name || "Unknown School"}</p>
      <p className="text-gray-700"><strong>Games:</strong> {player.games?.map(g => g.name).join(", ")}</p>
      <p className="text-gray-700"><strong>Position:</strong> {player.position}</p>

      <h3 className="text-lg font-semibold mt-4">Achievements</h3>
      <ul className="list-disc list-inside text-gray-600">
        {player.achievements?.map((ach, i) => (
          <li key={i}>{ach}</li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold mt-4">Stats</h3>
      <ul className="list-disc list-inside text-gray-600">
        <li>Matches Played: {player.stats?.matchesPlayed}</li>
        <li>Goals Scored: {player.stats?.goalsScored}</li>
        <li>Assists: {player.stats?.assists}</li>
      </ul>

      <Link
        to="/players"
        className="inline-block mt-6 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Back to Directory
      </Link>
    </div>
  );
};

export default PlayerProfile;
