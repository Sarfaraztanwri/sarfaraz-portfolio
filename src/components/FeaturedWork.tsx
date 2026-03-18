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
  const totalSlides = Math.ceil(projects.length / visibleCards);

  const [slide, setSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // 🔁 Auto Slide
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, totalSlides]);

  const next = () => {
    setSlide((prev) => (prev + 1) % totalSlides);
  };

  const prev = () => {
    setSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <section className="w-full py-20 bg-black text-white">
      <div className="max-w-1200px mx-auto px-4">

        {/* Heading */}
        <h2 className="text-4xl font-bold mb-2">
          Featured <span className="text-yellow-400">Work</span>
        </h2>
        <p className="text-gray-400 mb-10">
          A glimpse of my best design work
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
            className="absolute -left-14 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full 
            bg-white/10 border border-white/20 text-white flex items-center justify-center
            hover:bg-yellow-400 hover:text-black transition"
          >
            {"<"}
          </button>

          {/* Right Arrow */}
          <button
            onClick={next}
            className="absolute -right-14 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full 
            bg-white/10 border border-white/20 text-white flex items-center justify-center
            hover:bg-yellow-400 hover:text-black transition"
          >
            {">"}
          </button>

          {/* Cards */}
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${slide * 100}%` }}
              transition={{ duration: 0.5 }}
            >
              {Array.from({ length: totalSlides }).map((_, i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 min-w-full"
                >
                  {projects
                    .slice(i * visibleCards, i * visibleCards + visibleCards)
                    .map((project, index) => (
                      <div
                        key={index}
                        className="bg-gray-900 rounded-2xl overflow-hidden group"
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-250px object-cover group-hover:scale-105 transition duration-300"
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
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-8 gap-3">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`w-3 h-3 rounded-full transition ${
                slide === i ? "bg-yellow-400 scale-125" : "bg-gray-600"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}