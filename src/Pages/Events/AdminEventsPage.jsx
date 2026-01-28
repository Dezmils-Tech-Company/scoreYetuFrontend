import React, { useEffect, useState } from "react";

const AdminEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [schools, setSchools] = useState([]);
  const [games, setGames] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    sport: "",
    date: "",
    status: "Upcoming",
    schools: ["", ""],   // two schools per match
    games: [""],         // one game reference
    results: [
      { school: "", goals: 0 },
      { school: "", goals: 0 }
    ]
  });

  // ✅ Fetch events, schools, and games from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, schoolsRes, gamesRes] = await Promise.all([
          fetch("https://scoreyetu-backend.onrender.com/api/events"),
          fetch("https://scoreyetu-backend.onrender.com/api/schools"),
          fetch("https://scoreyetu-backend.onrender.com/api/games")
        ]);

        const eventsData = await eventsRes.json();
        const schoolsData = await schoolsRes.json();
        const gamesData = await gamesRes.json();

        setEvents(eventsData);
        setSchools(schoolsData);
        setGames(gamesData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  // ✅ Handle form input
  const handleChange = (e, index = null, type = null) => {
    const { name, value } = e.target;

    if (type === "school") {
      const updatedSchools = [...formData.schools];
      updatedSchools[index] = value;
      const updatedResults = [...formData.results];
      updatedResults[index].school = value; // sync results with school
      setFormData({ ...formData, schools: updatedSchools, results: updatedResults });
    } else if (type === "game") {
      setFormData({ ...formData, games: [value] });
    } else if (name.startsWith("result")) {
      const field = name.split(".")[1];
      const updatedResults = [...formData.results];
      updatedResults[index][field] = value;
      setFormData({ ...formData, results: updatedResults });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Submit event
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://scoreyetu-backend.onrender.com/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error("Failed to create event");

      const data = await res.json();
      alert("Event created successfully!");
      setEvents([...events, data]);
    } catch (err) {
      console.error("Error submitting event:", err);
      alert("Error creating event");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Admin Events Management</h1>

      {/* ✅ Event Creation Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2 w-full"
          />
          <input
            type="text"
            name="sport"
            placeholder="Sport (e.g. Football)"
            value={formData.sport}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2 w-full"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2 w-full"
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
          >
            <option value="Upcoming">Upcoming</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* ✅ Schools Dropdown */}
        <h3 className="text-lg font-semibold mb-2">Schools</h3>
        {formData.schools.map((school, index) => (
          <select
            key={index}
            value={school}
            onChange={(e) => handleChange(e, index, "school")}
            required
            className="border rounded px-3 py-2 w-full mb-2"
          >
            <option value="">Select School</option>
            {schools.map((s) => (
              <option key={s._id} value={s._id}>{s.name}</option>
            ))}
          </select>
        ))}

        {/* ✅ Game Dropdown */}
        <h3 className="text-lg font-semibold mb-2">Game</h3>
        <select
          value={formData.games[0]}
          onChange={(e) => handleChange(e, null, "game")}
          required
          className="border rounded px-3 py-2 w-full mb-4"
        >
          <option value="">Select Game</option>
          {games.map((g) => (
            <option key={g._id} value={g._id}>{g.name}</option>
          ))}
        </select>

        {/* ✅ Results Input */}
        <h3 className="text-lg font-semibold mb-2">Results</h3>
        {formData.results.map((result, index) => (
          <div key={index} className="flex gap-4 mb-2">
            <input
              type="number"
              name="result.goals"
              placeholder="Goals"
              value={result.goals}
              onChange={(e) => handleChange(e, index)}
              required
              className="border rounded px-3 py-2 w-24"
            />
          </div>
        ))}

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Create Event
        </button>
      </form>

      {/* ✅ Display Events */}
      <h2 className="text-2xl font-bold mb-4">All Events</h2>
      {events.map((event) => (
        <div key={event._id} className="mb-6 bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold text-green-700">{event.title}</h3>
          <p>{event.sport} — {new Date(event.date).toLocaleDateString()} — {event.status}</p>
          <ul className="list-disc pl-6">
            {event.results.map((r, idx) => (
              <li key={idx}>
                School: {r.school}, Goals: {r.goals}, Points: {r.points}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AdminEventsPage;
