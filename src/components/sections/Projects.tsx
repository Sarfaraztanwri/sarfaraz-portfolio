import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

type Work = {
  id: number;
  image: string;
  type: string;
  link?: string;
  
};

type Client = {
  id: number;
  name: string;
  type: string;
  description: string;
  services: string[];
  thumbnail: string;
  works: Work[];
};

const CLIENTS: Client[] = [
  {
    id: 1,
    name: "Neon Nexus",
    type: "WEB • DESIGN",
    description:
      "A futuristic digital platform designed to connect urban explorers with the heartbeat of Los Angeles.",
    services: ["Web Design", "Development", "Interaction", "3D Assets"],
    thumbnail: "/images/Kashmir_Solidarity_Day.jpg", 
    works: [
      {
    id: 1,
    image: "/images/Kashmir_Solidarity_Day.jpg",
    type: "Landing Page",
    link: "https://yourwebsite.com",
  },
      {
    id: 2,
    image: "/images/Champion_Insecticide_Ad.jpg",
    type: "Campaign",
    link: "/pdf/campaign.pdf",
  },
      {
    id: 3,
    image: "/images/saliqu-logo.jpg",
    type: "Brand Assets",
  },
      {
    id: 4,
    image: "/images/psl-safari.jpg",
    type: "Social Media",
    link: "https://instagram.com",
  },
    ],
  },
  {
    id: 2,
    name: "Porsche Dream",
    type: "CONCEPT • MOTION",
    description:
      "High-end concept motion campaign showcasing futuristic automotive storytelling.",
    services: ["Motion Design", "Video Editing"],
    thumbnail: "/images/Champion_Insecticide_Ad.jpg",
    works: [
      { id: 1, image: "/images/Champion_Insecticide_Ad.jpg", type: "Poster" },
      { id: 2, image: "/images/psl-safari.jpg", type: "Instagram Campaign" },
      { id: 3, image: "/images/Kashmir_Solidarity_Day.jpg", type: "Story Post" },
    ],
  },
  {
    id: 3,
    name: "Safari Adventure",
    type: "BRANDING • SOCIAL",
    description:
      "Full brand identity and social campaign for travel adventure company.",
    services: ["Branding", "Social Media", "Design System"],
    thumbnail: "/images/psl-safari.jpg",
    works: [
      { id: 1, image: "/images/psl-safari.jpg", type: "Poster" },
      { id: 2, image: "/images/saliqu-logo.jpg", type: "Logo Design" },
      { id: 3, image: "/images/Champion_Insecticide_Ad.jpg", type: "Ad Campaign" },
    ],
  },
  {
    id: 4,
    name: "Saliqu Studio",
    type: "BRAND • IDENTITY",
    description:
      "Minimal brand identity design system for a modern design studio.",
    services: ["Logo Design", "Brand Identity", "Guidelines"],
    thumbnail: "/images/saliqu-logo.jpg",
    works: [
      { id: 1, image: "/images/saliqu-logo.jpg", type: "Logo Concept" },
      { id: 2, image: "/images/Kashmir_Solidarity_Day.jpg", type: "Poster" },
      { id: 3, image: "/images/psl-safari.jpg", type: "Social Media" },
    ],
  },
];

export default function Projects() {
  const [activeClient, setActiveClient] = useState<Client | null>(null);
  const [visibleProjects, setVisibleProjects] = useState(2);
  const slider = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftVal = useRef(0);

  useEffect(() => {
    gsap.fromTo(
      ".project-page",
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, [activeClient]);

  const handleWheel = (e: React.WheelEvent) => {
    if (!slider.current) return;
    e.preventDefault();
    slider.current.scrollLeft += e.deltaY;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!slider.current) return;
    isDown.current = true;
    startX.current = e.pageX - slider.current.offsetLeft;
    scrollLeftVal.current = slider.current.scrollLeft;
  };

  const handleMouseUp = () => {
    isDown.current = false;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !slider.current) return;
    e.preventDefault();
    const x = e.pageX - slider.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    slider.current.scrollLeft = scrollLeftVal.current - walk;
  };

  const magnetic = (e: React.MouseEvent) => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.3 });
  };

  const resetMagnetic = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.4 });
  };

  /* ── GRID PAGE ── */
  if (!activeClient) {
    return (
      <section
        id="projects"
        style={{
          padding: "120px 40px",
          background: "#0A0A0A",
          minHeight: "100vh",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <span
            style={{
              color: "#F5C518",
              letterSpacing: "3px",
              fontSize: "12px",
            }}
          >
            PORTFOLIO
          </span>
          <h2
            style={{
              fontSize: "56px",
              fontWeight: "900",
              marginTop: "10px",
              color: "white",
            }}
          >
            MY WORK
          </h2>
        </div>

        <div
          style={{
            maxWidth: "1200px",
            margin: "auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "40px",
          }}
        >
          {CLIENTS.slice(0, visibleProjects).map((client) => (
            <div
              key={client.id}
              onClick={() => setActiveClient(client)}
              onMouseMove={magnetic}
              onMouseLeave={resetMagnetic}
              style={{
                cursor: "pointer",
                overflow: "hidden",
                borderRadius: "20px",
              }}
            >
              <div style={{ overflow: "hidden", borderRadius: "20px" }}>
                <img
                  src={client.thumbnail}
                  alt={client.name}
                  style={{
                    width: "100%",
                    height: "420px",
                    objectFit: "cover",
                    transition: "transform 0.6s ease",
                  }}
                />
              </div>

              {/* ✅ Category + Yellow Title — Neon Nexus style */}
              <div style={{ marginTop: "20px", color: "white" }}>
                <p
                  style={{
                    fontSize: "12px",
                    letterSpacing: "2px",
                    color: "#888",
                    fontWeight: "600",
                    margin: 0,
                  }}
                >
                  {client.type}
                </p>
                <h3
                  style={{
                    fontSize: "32px",
                    fontWeight: "700",
                    color: "#F5C518",
                    marginTop: "6px",
                    lineHeight: "1.1",
                  }}
                >
                  {client.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {visibleProjects < CLIENTS.length && (
          <div style={{ textAlign: "center", marginTop: "60px" }}>
            <button
              onClick={() => setVisibleProjects(visibleProjects + 2)}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#0A0A0A";
                e.currentTarget.style.color = "#F5C518";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#F5C518";
                e.currentTarget.style.color = "#0A0A0A";
              }}
              style={{
                background: "#F5C518",
                color: "#0A0A0A",
                padding: "14px 40px",
                borderRadius: "50px",
                border: "none",
                fontWeight: "700",
                letterSpacing: "1px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              SEE MORE
            </button>
          </div>
        )}
      </section>
    );
  }

  /* ── PROJECT DETAIL PAGE ── */
  return (
    <section
      className="project-page"
      style={{
        background: "#0A0A0A",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflowY: "auto",
        padding: "100px 40px",
        zIndex: 9999,
      }}
    >
      <button
        onClick={() => setActiveClient(null)}
        style={{
          background: "none",
          border: "none",
          color: "#F5C518",
          marginBottom: "40px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        ← BACK
      </button>

      {/* Horizontal scroll carousel — NO scrollbar */}
      <div
        ref={slider}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        className="no-scrollbar"
        style={{
          display: "flex",
          gap: "60px",
          overflowX: "auto",
          cursor: "grab",
        }}
      >
        {/* TEXT CARD */}
        <div
          style={{
            minWidth: "280px",
            maxWidth: "480px",
            width: "80vw",
            color: "white",
            flexShrink: 0,
          }}
        >
          <p style={{ color: "#888", fontSize: "12px" }}>
            {activeClient.type} — 2024
          </p>
          <h1 style={{ fontSize: "64px", fontWeight: "900" }}>
            {activeClient.name}
          </h1>
          <p style={{ color: "#aaa", marginTop: "20px" }}>
            {activeClient.description}
          </p>
          <h4 style={{ marginTop: "40px", color: "#F5C518" }}>SERVICES</h4>
          {activeClient.services.map((s, i) => (
            <p key={i} style={{ color: "#ccc" }}>
              • {s}
            </p>
          ))}
        </div>

        {/* IMAGE CARDS */}
        {activeClient.works.map((work) => (
          <div
            key={work.id}
            style={{
              minWidth: "280px",
              maxWidth: "640px",
              width: "80vw",
              position: "relative",
              flexShrink: 0,
              overflow: "hidden",
              borderRadius: "20px",
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget.querySelector(".arrow-btn") as HTMLElement;
              const img = e.currentTarget.querySelector("img") as HTMLElement;
              if (btn) btn.style.opacity = "1";
              if (btn) btn.style.transform = "scale(1)";
              if (img) img.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget.querySelector(".arrow-btn") as HTMLElement;
              const img = e.currentTarget.querySelector("img") as HTMLElement;
              if (btn) btn.style.opacity = "0";
              if (btn) btn.style.transform = "scale(0.7)";
              if (img) img.style.transform = "scale(1)";
            }}
          >
            {/* ARROW BUTTON */}
            <div
              className="arrow-btn"
              onClick={(e) => {
                e.stopPropagation();
                window.open(work.image, "_blank");
              }}
              style={{
                position: "absolute",
                top: "14px",
                right: "14px",
                cursor: "pointer",
                background: "rgba(0,0,0,0.6)",
                borderRadius: "50%",
                padding: "12px",
                zIndex: 10,
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.2)",
                opacity: 0,
                transform: "scale(0.7)",
                transition: "all 0.3s ease",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                stroke="#F5C518"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </div>

            {/* IMAGE */}
            <img
              src={work.image}
              alt={work.type}
              style={{
                width: "100%",
                height: "450px",
                objectFit: "cover",
                borderRadius: "20px",
                transition: "transform 0.5s ease",
              }}
            />

            {/* TYPE LABEL */}
            <p style={{ color: "#F5C518", marginTop: "10px" }}>
              {work.type}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}