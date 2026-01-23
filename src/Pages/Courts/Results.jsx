import React, { useEffect, useState } from "react";
import GameSelectionSlider from "./GameSelectionSlider";
import EventStandingsTable from "./EventStandingsTable";
import RecentResultsCarousel from "./RecentResultsCarousel"; 

const ResultsTable = () => {
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("https://scoreyetu-backend.onrender.com/api/events");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };
    fetchEvents();
  }, []);

  if (!events.length) return <p className="text-center mt-10">Loading events...</p>;

  return (
    <section className="bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <RecentResultsCarousel />
        <GameSelectionSlider
          events={events}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          getSportIcon={(sport) => sport}
        />
        <EventStandingsTable event={events[currentIndex]} />
      </div>
    </section>
  );
};

export default ResultsTable;
