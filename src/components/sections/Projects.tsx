import { useState } from "react";
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from "lucide-react";

const ALL_PROJECTS = [
  {
    id: 1,
    title: "Kashmir Solidarity Day",
    category: "Graphic Design",
    description: "Social media post design for World Memon Organization Pakistan Chapter — Kashmir Solidarity Day campaign.",
    image: "/images/Kashmir_Solidarity_Day.jpg",
    link: null,
  },
  {
    id: 2,
    title: "Champion Insecticide Ad",
    category: "Graphic Design",
    description: "Product advertisement design for Champion Insecticide by Zakaria Enterprises — Total Knock Out campaign.",
    image: "/images/Champion_Insecticide_Ad.jpg",
    link: null,
  },
  {
    id: 3,
    title: "Saliqu Logo Design",
    category: "Graphic Design",
    description: "Brand identity and logo design for Saliqu — modern S lettermark with mockup presentation.",
    image: "/images/saliqu-logo.jpg",
    link: null,
  },
  {
    id: 4,
    title: "Baitussalam Magazines Post",
    category: "Social Media",
    description: "Social media post design for Baitussalam Publications showcasing their magazine collection.",
    image: "/images/baitussalam-magazines.jpg",
    link: null,
  },
  {
    id: 5,
    title: "Miana Rawi Post",
    category: "Social Media",
    description: "Islamic social media post design for Baitussalam Publications — Urdu calligraphy content.",
    image: "/images/miana-rawi.jpg",
    link: null,
  },
  {
    id: 6,
    title: "PSL Safari Water Bottle Ad",
    category: "Graphic Design",
    description: "Sports event social media graphic for Safari Water Bottle — PSL 6 Multan Sultans vs Peshawar Zalmi.",
    image: "/images/psl-safari.jpg",
    link: null,
  },
  {
    id: 7,
    title: "Portfolio Website",
    category: "Web Development",
    description: "Personal portfolio built with React, TypeScript and Tailwind CSS with modern animations.",
    image: "/images/portfolio-web.png",
    link: "https://sarfaraztanwri.com",
  },
  {
    id: 8,
    title: "Liquid Soap Promo Reel",
    category: "Video Editing",
    description: "Short-form product promotional video with motion graphics and color grading for liquid soap brand.",
    image: "/images/video-reel.png",
    link: null,
  },
];

const FILTERS = ["All", "Graphic Design", "Social Media Management", "Web Development", "Video Editing"];

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = ALL_PROJECTS.filter(
    (p) => activeFilter === "All" || p.category === activeFilter
  );

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
        <div className="flex flex-col items-center text-center mb-10 md:mb-12">
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
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-16 md:mb-20">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className="px-5 py-2 text-sm md:text-base font-medium transition-all duration-300"
              style={{
                border: activeFilter === filter ? "1px solid #F5C518" : "1px solid #1f1f1f",
                backgroundColor: activeFilter === filter ? "rgba(245,197,24,0.1)" : "transparent",
                color: activeFilter === filter ? "#F5C518" : "#888",
                fontFamily: "Outfit, sans-serif",
              }}
              onMouseEnter={(e) => {
                if (activeFilter !== filter) {
                  (e.currentTarget as HTMLElement).style.borderColor = "#F5C518";
                  (e.currentTarget as HTMLElement).style.color = "#F5C518";
                }
              }}
              onMouseLeave={(e) => {
                if (activeFilter !== filter) {
                  (e.currentTarget as HTMLElement).style.borderColor = "#1f1f1f";
                  (e.currentTarget as HTMLElement).style.color = "#888";
                }
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project, index) => (
            <div
              key={project.id}
              style={{
                backgroundColor: "#111111",
                border: "1px solid #1f1f1f",
                transition: "border-color 0.3s ease, transform 0.3s ease",
              }}
              onMouseEnter={(e) => {
                setHoveredId(project.id);
                e.currentTarget.style.borderColor = "#F5C518";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                setHoveredId(null);
                e.currentTarget.style.borderColor = "#1f1f1f";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Square Image */}
              <div
                style={{
                  position: "relative",
                  aspectRatio: "1 / 1",
                  backgroundColor: "#1a1a1a",
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
                    objectPosition: "center",
                    transform: hoveredId === project.id ? "scale(1.08)" : "scale(1)",
                    transition: "transform 0.7s ease",
                  }}
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector(".placeholder-label")) {
                      parent.style.background =
                        "linear-gradient(135deg, #1a1a1a 0%, #111 50%, #1f1f1f 100%)";
                      const placeholder = document.createElement("div");
                      placeholder.className = "placeholder-label";
                      placeholder.style.cssText =
                        "position:absolute;inset:0;display:flex;align-items:center;justify-content:center;";
                      placeholder.innerHTML = `<span style="color:#F5C518;font-family:Outfit,sans-serif;font-size:14px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;opacity:0.6;">${project.category}</span>`;
                      parent.appendChild(placeholder);
                    }
                  }}
                />

                {/* Hover overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(10,10,10,0.85)",
                    backdropFilter: "blur(4px)",
                    opacity: hoveredId === project.id ? 1 : 0,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 font-bold uppercase tracking-wider text-sm"
                      style={{
                        backgroundColor: "#F5C518",
                        color: "#0A0A0A",
                        textDecoration: "none",
                        transform: hoveredId === project.id ? "translateY(0)" : "translateY(16px)",
                        transition: "transform 0.3s ease",
                      }}
                    >
                      View Live <ArrowUpRight className="w-4 h-4" />
                    </a>
                  ) : (
                    <button
                      onClick={() => openLightbox(index)}
                      className="flex items-center gap-2 px-6 py-3 font-bold uppercase tracking-wider text-sm"
                      style={{
                        backgroundColor: "#F5C518",
                        color: "#0A0A0A",
                        transform: hoveredId === project.id ? "translateY(0)" : "translateY(16px)",
                        transition: "transform 0.3s ease",
                        cursor: "pointer",
                      }}
                    >
                      View Project <ArrowUpRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Card Info */}
              <div className="p-6 relative">
                <div
                  className="absolute top-0 left-6 w-12 h-1 -translate-y-full"
                  style={{ backgroundColor: "#F5C518" }}
                />
                <span
                  className="text-xs font-bold uppercase tracking-wider mb-2 block"
                  style={{ color: "#F5C518" }}
                >
                  {project.category}
                </span>
                <h3
                  className="text-xl font-bold text-white mb-2"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {project.title}
                </h3>
                <p className="text-sm line-clamp-2" style={{ color: "#888" }}>
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Popup */}
      {lightboxIndex !== null && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            backgroundColor: "rgba(0,0,0,0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              backgroundColor: "#F5C518",
              color: "#0A0A0A",
              border: "none",
              borderRadius: "50%",
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 1001,
            }}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev button */}
          {filtered.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              style={{
                position: "absolute",
                left: "20px",
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(245,197,24,0.9)",
                color: "#0A0A0A",
                border: "none",
                borderRadius: "50%",
                width: "48px",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 1001,
              }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "90vw",
              maxHeight: "85vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <img
              src={filtered[lightboxIndex].image}
              alt={filtered[lightboxIndex].title}
              style={{
                maxWidth: "100%",
                maxHeight: "75vh",
                objectFit: "contain",
                boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
              }}
            />
            <div className="text-center">
              <p
                className="text-white font-bold text-xl"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {filtered[lightboxIndex].title}
              </p>
              <p className="text-sm mt-1" style={{ color: "#888" }}>
                {filtered[lightboxIndex].description}
              </p>
            </div>
          </div>

          {/* Next button */}
          {filtered.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              style={{
                position: "absolute",
                right: "20px",
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(245,197,24,0.9)",
                color: "#0A0A0A",
                border: "none",
                borderRadius: "50%",
                width: "48px",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 1001,
              }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>
      )}
    </section>
  );
}