import { useState } from "react";
import { motion } from "framer-motion";

const projects = [
  { title: "Neon Nexus", category: "Branding", image: "/images/project1.jpg" },
  { title: "Porsche Dream", category: "Social Media", image: "/images/project2.jpg" },
  { title: "Fitness Campaign", category: "Marketing", image: "/images/project3.jpg" },
  { title: "Coffee Brand", category: "Packaging", image: "/images/project4.jpg" },
  { title: "Tech Poster", category: "Poster", image: "/images/project5.jpg" },
  { title: "Creative Ad", category: "Advertising", image: "/images/project6.jpg" },
];

export default function FeaturedWork() {
  const [current, setCurrent] = useState(0);
  const visibleCards = 4;

  const nextSlide = () => {
    if (current < projects.length - visibleCards) {
      setCurrent(current + 1);
    }
  };

  const prevSlide = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  return (
    <section className="w-full py-20 bg-black text-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Work</h2>
        <p className="text-gray-400 mb-10">A glimpse of my best design work</p>

        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left--20px top-1/2 -translate-y-1/2 z-10 w-10 h-10 border border-yellow-400 text-yellow-400 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-black transition"
          >
            {'<'}
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right--20px top-1/2 -translate-y-1/2 z-10 w-10 h-10 border border-yellow-400 text-yellow-400 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-black transition"
          >
            {'>'}
          </button>

          {/* Carousel */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{ x: `-${current * 260}px` }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="w-240px shrink-0 bg-gray-900 rounded-2xl overflow-hidden shadow-lg group"
                >
                  <div className="relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-240px object-cover"
                    />

                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                      <button className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-semibold">
                        View Case Study
                      </button>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-sm font-semibold">{project.title}</h3>
                    <p className="text-xs text-yellow-400">{project.category}</p>
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

