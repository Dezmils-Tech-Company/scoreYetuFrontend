import React, { useState, useEffect } from "react";
import SchoolCard from "./SchoolCard";
import Spinner from "../../Components/Shared/Spinner";
import { motion } from "framer-motion";

const SchoolsPage = () => {
  const [schools, setSchools] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch schools from backend
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await fetch("https://scoreyetu-backend.onrender.com/api/schools"); // backend endpoint
        if (!res.ok) throw new Error("Failed to fetch schools");
        const data = await res.json();
        setSchools(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  // Filter schools by search term
  const filteredSchools = schools.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="text-center mt-10"><Spinner /></p>;
  if (error) return <p className="text-center text-red-500 mt-10">Error: {error}</p>;

  return (
    <div className="mt-16 py-6 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      <motion.div
      className="bg-green-50 border border-green-200 rounded-md p-4 mb-4 shadow-sm"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h1 className="text-shadow-2xl sm:text-3xl font-bold text-green-700 text-center">
        <span className="text-red-600">Schools</span> Directory
      </h1>

      <motion.p
        className="text-gray-700 text-center italic leading-relaxed mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
       Explore schools within the western region and their sports programs. Discover the talented players representing each institution and the games they excel in.
      </motion.p>
    </motion.div>
     
     

      {/* Search */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search by name or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Search
        </button>
      </div>

      {/* School list */}
      <div className="space-y-3">
        {filteredSchools.map((school) => (
          <SchoolCard key={school._id} school={school} />
        ))}
      </div>
    </div>
  );
};

export default SchoolsPage;
