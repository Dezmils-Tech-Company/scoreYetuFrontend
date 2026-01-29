import React, { useEffect, useState } from "react";

const AdminMatchesPanel = () => {
  const [matches, setMatches] = useState([]);
  const [schools, setSchools] = useState([]);
  const [games, setGames] = useState([]);
  const [formData, setFormData] = useState({
    homeSchool: "",
    awaySchool: "",
    game: "",
    homeScore: 0,
    awayScore: 0,
    date: "",
    status: "Upcoming",
  });
  const [editingMatch, setEditingMatch] = useState(null);

  // Fetch schools, games, and matches
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [schoolsRes, gamesRes, matchesRes] = await Promise.all([
          fetch("https://scoreyetu-backend.onrender.com/api/schools"),
          fetch("https://scoreyetu-backend.onrender.com/api/games"),
          fetch("https://scoreyetu-backend.onrender.com/api/matches"),
        ]);
        setSchools(await schoolsRes.json());
        setGames(await gamesRes.json());
        setMatches(await matchesRes.json());
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create new match
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://scoreyetu-backend.onrender.com/api/matches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const newMatch = await res.json();
      setMatches([...matches, newMatch]);
      setFormData({
        homeSchool: "",
        awaySchool: "",
        game: "",
        homeScore: 0,
        awayScore: 0,
        date: "",
        status: "Upcoming",
      });
    } catch (err) {
      console.error("Error creating match:", err);
    }
  };

  // Update match
  const handleUpdate = async (id) => {
    try {
      const res = await fetch("https://scoreyetu-backend.onrender.com/api/matches/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matchId: id, ...formData }),
      });
      const updated = await res.json();
      setMatches(matches.map((m) => (m._id === id ? updated.match : m)));
      setEditingMatch(null);
    } catch (err) {
      console.error("Error updating match:", err);
    }
  };

  // Delete match
  const handleDelete = async (id) => {
    try {
      await fetch(`https://scoreyetu-backend.onrender.com/api/matches/${id}`, { method: "DELETE" });
      setMatches(matches.filter((m) => m._id !== id));
    } catch (err) {
      console.error("Error deleting match:", err);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Admin Panel: Manage Matches</h2>

      {/* Create / Edit Form */}
      <form
        onSubmit={editingMatch ? () => handleUpdate(editingMatch._id) : handleCreate}
        className="space-y-4 mb-6"
      >
        {/* Home School Dropdown */}
        <select
          name="homeSchool"
          value={formData.homeSchool}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="">Select Home School</option>
          {schools.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>

        {/* Away School Dropdown */}
        <select
          name="awaySchool"
          value={formData.awaySchool}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="">Select Away School</option>
          {schools.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>

        {/* Game Dropdown */}
        <select
          name="game"
          value={formData.game}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="">Select Game</option>
          {games.map((g) => (
            <option key={g._id} value={g._id}>
              {g.name}
            </option>
          ))}
        </select>

        {/* Scores */}
        <input
          name="homeScore"
          type="number"
          placeholder="Home Score"
          value={formData.homeScore}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="awayScore"
          type="number"
          placeholder="Away Score"
          value={formData.awayScore}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        {/* Date */}
        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        {/* Status */}
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option>Upcoming</option>
          <option>Ongoing</option>
          <option>Completed</option>
        </select>

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          {editingMatch ? "Update Match" : "Create Match"}
        </button>
      </form>

      {/* Matches Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Home</th>
            <th>Away</th>
            <th>Game</th>
            <th>Score</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((m) => (
            <tr key={m._id} className="border-t">
              <td>{m.homeSchool?.name}</td>
              <td>{m.awaySchool?.name}</td>
              <td>{m.game?.name}</td>
              <td>{m.homeScore} : {m.awayScore}</td>
              <td>{m.status}</td>
              <td>{new Date(m.date).toLocaleDateString()}</td>
              <td className="space-x-2">
                <button
                  onClick={() => {
                    setEditingMatch(m);
                    setFormData({
                      homeSchool: m.homeSchool?._id || m.homeSchool,
                      awaySchool: m.awaySchool?._id || m.awaySchool,
                      game: m.game?._id || m.game,
                      homeScore: m.homeScore,
                      awayScore: m.awayScore,
                      date: m.date.split("T")[0],
                      status: m.status,
                    });
                  }}
                  className="bg-blue-600 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(m._id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminMatchesPanel;
