import React from "react";
import PlayerList from "./PlayerList";

const PlayersPage = () => (
  <div
    className="
      mt-10 sm:mt-16       
      px-4 sm:px-5 lg:px-12 
      max-w-7xl mx-auto    
    "
  >
    
    <div className=" rounded-md p-2 sm:p-4 mt-2">
      <PlayerList />
    </div>
  </div>
);

export default PlayersPage;
