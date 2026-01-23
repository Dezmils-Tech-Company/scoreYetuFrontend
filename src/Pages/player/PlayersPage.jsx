import React from "react";
import PlayerList from "./PlayerList";
import { motion } from "framer-motion";

const PlayersPage = () => (
  <div
    className="
      mt-10 sm:mt-16       
      px-4 sm:px-5 lg:px-12 
      max-w-7xl mx-auto py-4   
    "
  >
    {/* Intro Section */}
    <motion.div
      className="bg-green-50 border border-green-200 rounded-md p-4 mb-4 shadow-sm"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h1 className="text-shadow-2xl sm:text-3xl font-bold text-green-700 text-center">
        <span className="text-red-600">Meet the Players</span> of Our Schools
      </h1>

      <motion.p
        className="text-gray-700 text-center italic leading-relaxed mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Every player record plays a vital role towards nurturing the next generation of champions. 
        Explore the directory below to learn more about individual players, their schools, 
        and the sports they represent.
      </motion.p>
    </motion.div>

    {/* Player List */}
    <div>
      <PlayerList />
    </div>
  </div>
);

export default PlayersPage;
