import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { MdSportsSoccer, MdSportsRugby, MdSportsBasketball } from "react-icons/md";
import { GiRunningShoe, GiTennisRacket } from "react-icons/gi";
import { FaHockeyPuck, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "completed": return "bg-green-500/5 text-green-600";
    case "ongoing": return "bg-red-500/5 text-red-600";
    case "upcoming": return "bg-blue-500/5 text-blue-600";
    default: return "bg-gray-500/5 text-gray-600";
  }
};

const getSportIcon = (sport) => {
  const iconProps = { size: 20, className: "mr-2" };
  const icons = {
    Football: <MdSportsSoccer {...iconProps} />,
    Rugby: <MdSportsRugby {...iconProps} />,
    Hockey: <FaHockeyPuck {...iconProps} />,
    Netball: <MdSportsBasketball {...iconProps} />,
    Athletics: <GiRunningShoe {...iconProps} />,
    Tennis: <GiTennisRacket {...iconProps} />,
  };
  return icons[sport] || "🏆";
};

const RecentResultsCarousel = () => {
  const [recentResults, setRecentResults] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/events");
        const data = await res.json();
        // Only show recent/completed events
        setRecentResults(data.filter(ev => ev.status.toLowerCase() === "completed"));
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };
    fetchEvents();
  }, []);

  return (
    <section className="bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-black mb-4 font-inter">
            Latest <span className="text-green-600">Game highlights</span>
          </h2>
          <p className="text-black text-xm max-w-2xl mx-auto">
            Live standings and results from inter-school championships across Kisumu county
          </p>
        </motion.div>

        {/* Results Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative group"
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            spaceBetween={24}
            breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            navigation={{ nextEl: ".results-button-next", prevEl: ".results-button-prev" }}
            className="w-full"
          >
            {recentResults.map((event) => (
              <SwiperSlide key={event._id}>
                <div className="bg-cyan-900/10 border border-green-500/30 rounded-xl p-8 h-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                  {/* Sport Badge & Status */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-bold text-red-600 uppercase tracking-widest bg-cyan-400/10 px-3 py-1 rounded-full flex items-center">
                      {getSportIcon(event.sport)} {event.sport}
                    </span>
                    <span className={`${getStatusColor(event.status)} px-2 py-1 rounded-full text-xs font-semibold uppercase`}>
                      {event.status}
                    </span>
                  </div>

                  {/* Score Display */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between gap-4">
                      {/* Home Team */}
                      <div className="flex-1 text-center">
                        <div className="text-sm font-semibold text-black mb-3 line-clamp-2">
                          {event.results?.[0]?.school?.name}
                        </div>
                        <div className="text-5xl font-black text-red-600 drop-shadow-lg">
                          {event.results?.[0]?.gf}
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="flex flex-col items-center gap-2">
                        <div className="text-gray-500 text-xs font-bold uppercase tracking-wider">vs</div>
                        <div className="h-12 w-px bg-gradient-to-b from-transparent via-gray-600 to-transparent"></div>
                      </div>

                      {/* Away Team */}
                      <div className="flex-1 text-center">
                        <div className="text-sm font-semibold text-black mb-3 line-clamp-2">
                          {event.results?.[1]?.school?.name}
                        </div>
                        <div className="text-5xl font-black text-red-600 drop-shadow-lg">
                          {event.results?.[1]?.gf}
                        </div>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="flex items-center justify-center gap-2 pt-6 border-t border-gray-700">
                      <div className="w-1 h-1 rounded-full bg-green-600"></div>
                      <span className="text-xs text-black font-medium">
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                      <div className="w-1 h-1 rounded-full bg-green-600"></div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation */}
          <button className="results-button-prev hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-40 w-12 h-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white transition-all shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] -ml-6 opacity-0 group-hover:opacity-100 duration-300">
            <FaArrowLeft className="w-5 h-5" />
          </button>
          <button className="results-button-next hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-40 w-12 h-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white transition-all shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] -mr-6 opacity-0 group-hover:opacity-100 duration-300">
            <FaArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default RecentResultsCarousel;
