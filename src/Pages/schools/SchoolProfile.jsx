import React from "react";
import { useParams, Link } from "react-router-dom";
import { mockSchools } from "./mockSchools";

const SchoolProfile = () => {
  const { id } = useParams();
  const school = mockSchools.find((s) => s.id.toString() === id);

  if (!school) {
    return <p className="text-red-600">School not found</p>;
  }

  return (
    <div className="mt-16 px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto bg-white shadow-md rounded-md p-6 space-y-8">
      {/* Basic Info */}
      <div className="flex items-center gap-6">
        <img
          src={school.photo}
          alt={school.name}
          className="w-32 h-32 rounded-full object-cover border border-green-400"
        />
        <div>
          <h2 className="text-3xl font-bold text-green-700">{school.name}</h2>
          <p className="text-gray-600">{school.location}</p>
        </div>
      </div>

      {/* Teams */}
      <div>
        <h3 className="text-xl font-semibold text-green-700 mb-4">Teams</h3>
        {school.teams.map((team, i) => (
          <div key={i} className="mb-4 border p-4 rounded-md">
            <h4 className="font-bold text-lg">{team.name}</h4>
            <p className="text-sm text-gray-600">Coach: {team.coach}</p>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              {team.players.map((player, j) => (
                <li key={j}>{player}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Gallery */}
      <div>
        <h3 className="text-xl font-semibold text-green-700 mb-4">Gallery</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {school.gallery.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="School gallery"
              className="rounded-md shadow-md"
            />
          ))}
        </div>
      </div>

      {/* Recent Events */}
      <div>
        <h3 className="text-xl font-semibold text-green-700 mb-4">Recent Events</h3>
        <ul className="list-disc list-inside text-gray-700">
          {school.recentEvents.map((event, i) => (
            <li key={i}>
              {event.name} — <span className="text-gray-500">{event.date}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Upcoming Events */}
      <div>
        <h3 className="text-xl font-semibold text-green-700 mb-4">Upcoming Events</h3>
        <ul className="list-disc list-inside text-gray-700">
          {school.upcomingEvents.map((event, i) => (
            <li key={i}>
              {event.name} — <span className="text-gray-500">{event.date}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Vulnerabilities */}
      <div>
        <h3 className="text-xl font-semibold text-red-600 mb-4">Vulnerabilities</h3>
        <ul className="list-disc list-inside text-gray-700">
          {school.vulnerabilities.map((v, i) => (
            <li key={i}>{v}</li>
          ))}
        </ul>
      </div>

      {/* Challenges */}
      <div>
        <h3 className="text-xl font-semibold text-yellow-600 mb-4">Challenges</h3>
        <ul className="list-disc list-inside text-gray-700">
          {school.challenges.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>

      {/* Back Link */}
      <Link
        to="/schools"
        className="inline-block mt-6 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Back to Directory
      </Link>
    </div>
  );
};

export default SchoolProfile;
