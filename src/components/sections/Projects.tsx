"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

type Work = {
  id: number;
  image: string;
  type: string;
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
      { id: 1, image: "/images/Kashmir_Solidarity_Day.jpg", type: "Landing Page" },
      { id: 2, image: "/images/Champion_Insecticide_Ad.jpg", type: "Campaign" },
      { id: 3, image: "/images/saliqu-logo.jpg", type: "Brand Assets" },
      { id: 4, image: "/images/psl-safari.jpg", type: "Social Media" },
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

  useEffect(() => {
    gsap.fromTo(
      ".project-page",
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, [activeClient]);

  const handleWheel = (e: any) => {
    if (!slider.current) return;
    e.preventDefault();
    slider.current.scrollLeft += e.deltaY;
  };

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  const handleMouseDown = (e: any) => {
    if (!slider.current) return;
    isDown = true;
    startX = e.pageX - slider.current.offsetLeft;
    scrollLeft = slider.current.scrollLeft;
  };

  const handleMouseUp = () => (isDown = false);
  const handleMouseLeave = () => (isDown = false);

  const handleMouseMove = (e: any) => {
    if (!isDown || !slider.current) return;
    e.preventDefault();
    const x = e.pageX - slider.current.offsetLeft;
    const walk = (x - startX) * 2;
    slider.current.scrollLeft = scrollLeft - walk;
  };

  const magnetic = (e: any) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(el, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
    });
  };

  const resetMagnetic = (e: any) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.4 });
  };

  /* GRID PAGE */

  if (!activeClient) {
    return (
      <section
        style={{
          padding: "120px 40px",
          background: "#0A0A0A",
          minHeight: "100vh",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <span style={{ color: "#F5C518", letterSpacing: "3px", fontSize: "12px" }}>
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
            gridTemplateColumns: "repeat(auto-fit,minmax(400px,1fr))",
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
                  style={{
                    width: "100%",
                    height: "420px",
                    objectFit: "cover",
                    transition: "transform 0.6s ease",
                  }}
                />
              </div>

              <div style={{ marginTop: "20px", color: "white" }}>
                <p
                  style={{
                    fontSize: "12px",
                    letterSpacing: "2px",
                    color: "#888",
                  }}
                >
                  {client.type}
                </p>

                <h3
                  style={{
                    fontSize: "32px",
                    fontWeight: "700",
                    color: "#F5C518",
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
              style={{
                background: "#F5C518",
                color: "#0A0A0A",
                padding: "14px 40px",
                borderRadius: "50px",
                border: "none",
                fontWeight: "700",
                letterSpacing: "1px",
                cursor: "pointer",
              }}
            >
              SEE MORE
            </button>
          </div>
        )}
      </section>
    );
  }

  /* PROJECT PAGE */

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
        }}
      >
        ← BACK
      </button>
<div
  ref={slider}
  onWheel={handleWheel}
  onMouseDown={handleMouseDown}
  onMouseUp={handleMouseUp}
  onMouseLeave={handleMouseLeave}
  onMouseMove={handleMouseMove}
  style={{
    display: "flex",
    gap: "60px",
    overflowX: "scroll",
    scrollbarWidth: "none",
    cursor: "grab",
  }}
>

  {/* TEXT CARD */}

  <div
    style={{
      minWidth: "500px",
      color: "white",
    }}
  >
    <p style={{ color: "#888", fontSize: "12px" }}>
      {activeClient.type} — 2024
    </p>

    <h1
      style={{
        fontSize: "64px",
        fontWeight: "900",
      }}
    >
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
        minWidth: "700px",
        position: "relative",
      }}
    >
      <img
        src={work.image}
        style={{
          width: "100%",
          height: "450px",
          objectFit: "cover",
          borderRadius: "20px",
        }}
      />

      <p style={{ color: "#F5C518", marginTop: "10px" }}>
        {work.type}
      </p>
    </div>
  ))}
        <div>
          <p style={{ color: "#888", fontSize: "12px" }}>
            {activeClient.type} — 2024
          </p>

          <h1 style={{ fontSize: "64px", fontWeight: "900", color: "white" }}>
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

        <div
          ref={slider}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          style={{
            display: "flex",
            gap: "40px",
            overflowX: "scroll",
            scrollbarWidth: "none",
            cursor: "grab",
          }}
        >
          {activeClient.works.map((work) => (
            <div key={work.id} style={{ minWidth: "700px" }}>
              <img
                src={work.image}
                style={{
                  width: "100%",
                  height: "450px",
                  objectFit: "cover",
                  borderRadius: "20px",
                }}
              />

              <p style={{ color: "#F5C518", marginTop: "10px" }}>{work.type}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}