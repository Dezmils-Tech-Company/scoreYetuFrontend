import React, { useEffect, useState } from "react";
import GameSelectionSlider from "./GameSelectionSlider";
import EventStandingsTable from "./EventStandingsTable";
import RecentResultsCarousel from "./RecentResultsCarousel";
import KenyaSpinner from "../../Components/Shared/Spinner";

const ResultsTable = () => {
  const [games, setGames] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [standings, setStandings] = useState([]);

  // Fetch games
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch("https://scoreyetu-backend.onrender.com/api/games");
        const data = await res.json();
        setGames(data);
      } catch (err) {
        console.error("Error fetching games:", err);
      }
    };
    fetchGames();
  }, []);

  // Fetch standings for selected game
  useEffect(() => {
    if (!games.length) return;
    const selectedGame = games[currentIndex];
    const fetchStandings = async () => {
      try {
        const res = await fetch(`https://scoreyetu-backend.onrender.com/api/standings/${selectedGame._id}`);
        const data = await res.json();
        setStandings(data);
      } catch (err) {
        console.error("Error fetching standings:", err);
      }
    };
    fetchStandings();
  }, [games, currentIndex]);

  if (!games.length) return <KenyaSpinner text="Loading Results...." />;

  return (
    <section className="bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <RecentResultsCarousel />
        <GameSelectionSlider
          games={games}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
        <EventStandingsTable
          gameName={games[currentIndex]?.name}
          standings={standings}
        />
      </div>
    </section>
  );
};

export default ResultsTable;
