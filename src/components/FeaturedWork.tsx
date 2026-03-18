import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const projects = [
  { title: "1", category: "Branding", image: "https://via.placeholder.com/400" },
  { title: "2", category: "Social", image: "https://via.placeholder.com/400" },
  { title: "3", category: "Marketing", image: "https://via.placeholder.com/400" },
  { title: "4", category: "Design", image: "https://via.placeholder.com/400" },
  { title: "5", category: "Branding", image: "https://via.placeholder.com/400" },
  { title: "6", category: "Social", image: "https://via.placeholder.com/400" },
  { title: "7", category: "Marketing", image: "https://via.placeholder.com/400" },
  { title: "8", category: "Design", image: "https://via.placeholder.com/400" },
];

export default function FeaturedWork() {
  const visibleCards = 4;

  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto Slide
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      next();
    }, 3000);

    return () => clearInterval(interval);
  }, [index, isPaused]);

  const next = () => {
    if (index + visibleCards >= projects.length) {
      setIndex(0);
    } else {
      setIndex(index + visibleCards);
    }
  };

  const prev = () => {
    if (index === 0) {
      setIndex(projects.length - visibleCards);
    } else {
      setIndex(index - visibleCards);
    }
  };

  return (
    <section className="w-full py-20 bg-black text-white">
      <div className="max-w-[1200px] mx-auto px-4">

        {/* Heading */}
        <h2 className="text-4xl font-bold mb-2">
          Featured <span className="text-yellow-400">Work</span>
        </h2>
        <p className="text-gray-400 mb-10">
          A glimpse of my recent design work
        </p>

        {/* Slider */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >

          {/* Left Arrow */}
          <button
            onClick={prev}
            className="absolute -left-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full 
            bg-white/10 border border-white/20 text-white flex items-center justify-center
            hover:bg-yellow-400 hover:text-black transition"
          >
            {"<"}
          </button>

          {/* Right Arrow */}
          <button
            onClick={next}
            className="absolute -right-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full 
            bg-white/10 border border-white/20 text-white flex items-center justify-center
            hover:bg-yellow-400 hover:text-black transition"
          >
            {">"}
          </button>

          {/* Cards */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{ x: `-${(index / visibleCards) * 100}%` }}
              transition={{ duration: 0.5 }}
            >
              {projects.map((project, i) => (
                <div
                  key={i}
                  className="min-w-[calc(25%-18px)] bg-gray-900 rounded-2xl overflow-hidden group"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-[250px] object-cover group-hover:scale-105 transition duration-300"
                  />

                  <div className="p-4">
                    <h3 className="text-lg font-semibold">
                      Card {project.title}
                    </h3>
                    <p className="text-sm text-yellow-400">
                      {project.category}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}