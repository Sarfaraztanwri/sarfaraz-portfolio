import { useState } from "react";
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from "lucide-react";

const ALL_PROJECTS = [
  {
    id: 1,
    title: "Kashmir Solidarity Day",
    category: "Graphic Design",
    description:
      "Social media post design for World Memon Organization Pakistan Chapter — Kashmir Solidarity Day campaign.",
    image: "/images/Kashmir_Solidarity_Day.jpg",
    link: null,
  },
  {
    id: 2,
    title: "Champion Insecticide Ad",
    category: "Graphic Design",
    description:
      "Product advertisement design for Champion Insecticide by Zakaria Enterprises — Total Knock Out campaign.",
    image: "/images/Champion_Insecticide_Ad.jpg",
    link: null,
  },
  {
    id: 3,
    title: "Saliqu Logo Design",
    category: "Graphic Design",
    description:
      "Brand identity and logo design for Saliqu — modern S lettermark with mockup presentation.",
    image: "/images/saliqu-logo.jpg",
    link: null,
  },
  {
    id: 4,
    title: "Baitussalam Magazines Post",
    category: "Social Media",
    description:
      "Social media post design for Baitussalam Publications showcasing their magazine collection.",
    image: "/images/baitussalam-magazines.jpg",
    link: null,
  },
  {
    id: 5,
    title: "Miana Rawi Post",
    category: "Social Media",
    description:
      "Islamic social media post design for Baitussalam Publications — Urdu calligraphy content.",
    image: "/images/miana-rawi.jpg",
    link: null,
  },
  {
    id: 6,
    title: "PSL Safari Water Bottle Ad",
    category: "Graphic Design",
    description:
      "Sports event social media graphic for Safari Water Bottle — PSL 6 Multan Sultans vs Peshawar Zalmi.",
    image: "/images/psl-safari.jpg",
    link: null,
  },
  {
    id: 7,
    title: "Portfolio Website",
    category: "Web Development",
    description:
      "Personal portfolio built with React, TypeScript and Tailwind CSS with modern animations.",
    image: "/images/portfolio-web.png",
    link: "https://sarfaraztanwri.com",
  },
  {
    id: 8,
    title: "Liquid Soap Promo Reel",
    category: "Video Editing",
    description:
      "Short-form product promotional video with motion graphics and color grading for liquid soap brand.",
    image: "/images/video-reel.png",
    link: null,
  },
  {
    id: 9,
    title: "Additional Project 1",
    category: "Graphic Design",
    description: "Another amazing graphic design project showcase.",
    image: "/images/placeholder.jpg",
    link: null,
  },
  {
    id: 10,
    title: "Additional Project 2",
    category: "Web Development",
    description: "Modern web application with cutting-edge features.",
    image: "/images/placeholder.jpg",
    link: null,
  },
];

const FILTERS = [
  "All",
  "Graphic Design",
  "Social Media",
  "Web Development",
  "Video Editing",
];

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(9);

  const filtered = ALL_PROJECTS.filter(
    (p) => activeFilter === "All" || p.category === activeFilter
  );

  const displayedProjects = filtered.slice(0, visibleCount);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  };

  const nextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filtered.length);
  };

  const loadMoreProjects = () => {
    setVisibleCount((prev) => prev + 9);
  };

  const hasMoreProjects = visibleCount < filtered.length;

  return (
    <section
      id="work"
      className="py-24 md:py-32"
      style={{
        backgroundColor: "rgba(255,255,255,0.02)",
        borderTop: "1px solid #1f1f1f",
        borderBottom: "1px solid #1f1f1f",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-12">
          <span
            className="font-medium tracking-widest uppercase text-sm mb-4 block"
            style={{ color: "#F5C518" }}
          >
            Portfolio
          </span>

          <h2
            className="text-4xl md:text-6xl font-black text-white uppercase"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            My Work
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-20">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className="px-5 py-2 text-sm font-medium transition-all duration-300"
              style={{
                border:
                  activeFilter === filter
                    ? "1px solid #F5C518"
                    : "1px solid #1f1f1f",
                backgroundColor:
                  activeFilter === filter
                    ? "rgba(245,197,24,0.1)"
                    : "transparent",
                color: activeFilter === filter ? "#F5C518" : "#888",
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {displayedProjects.map((project, index) => (
            <div
              key={project.id}
              style={{
                backgroundColor: "#111111",
                border: "1px solid #1f1f1f",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div
                style={{
                  position: "relative",
                  aspectRatio: "1 / 1",
                  overflow: "hidden",
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform:
                      hoveredId === project.id ? "scale(1.08)" : "scale(1)",
                    transition: "transform 0.7s ease",
                  }}
                />

                {/* Hover Overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(10,10,10,0.85)",
                    opacity: hoveredId === project.id ? 1 : 0,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      className="flex items-center gap-2 px-6 py-3 font-bold uppercase text-sm"
                      style={{
                        backgroundColor: "#F5C518",
                        color: "#0A0A0A",
                        textDecoration: "none",
                      }}
                    >
                      View Live <ArrowUpRight size={16} />
                    </a>
                  ) : (
                    <button
                      onClick={() => openLightbox(index)}
                      className="flex items-center gap-2 px-6 py-3 font-bold uppercase text-sm"
                      style={{
                        backgroundColor: "#F5C518",
                        color: "#0A0A0A",
                      }}
                    >
                      View Project <ArrowUpRight size={16} />
                    </button>
                  )}
                </div>
              </div>

              <div className="p-6">
                <span
                  className="text-xs font-bold uppercase block mb-2"
                  style={{ color: "#F5C518" }}
                >
                  {project.category}
                </span>

                <h3 className="text-xl font-bold text-white mb-2">
                  {project.title}
                </h3>

                <p className="text-sm" style={{ color: "#888" }}>
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* SEE MORE BUTTON */}
        {hasMoreProjects && (
          <div className="flex justify-center">
            <button
              onClick={loadMoreProjects}
              className="px-8 py-4 font-bold uppercase tracking-wider transition-all duration-300"
              style={{
                backgroundColor: "#F5C518",
                color: "#0A0A0A",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 30px rgba(245,197,24,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              See More
            </button>
          </div>
        )}
      </div>
      {lightboxIndex !== null && (
        <div
          onClick={closeLightbox}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
          }}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            style={{
              position: "absolute",
              top: 30,
              right: 30,
              background: "#F5C518",
              width: 45,
              height: 45,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={20} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            style={{
              position: "absolute",
              left: 30,
              top: "50%",
              transform: "translateY(-50%)",
              background: "#F5C518",
              width: 45,
              height: 45,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ChevronLeft />
          </button>

          {/* Image */}
          <img
            src={filtered[lightboxIndex].image}
            style={{
              maxWidth: "85vw",
              maxHeight: "80vh",
              objectFit: "contain",
            }}
          />

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            style={{
              position: "absolute",
              right: 30,
              top: "50%",
              transform: "translateY(-50%)",
              background: "#F5C518",
              width: 45,
              height: 45,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ChevronRight />
          </button>
        </div>
      )}

    </section>
  );
}