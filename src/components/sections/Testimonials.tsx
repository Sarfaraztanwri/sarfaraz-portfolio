import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Testimonials() {
  const testimonials = [
    {
      name: "Ali Khan",
      role: "Business Owner",
      image: "https://i.pravatar.cc/100?img=1",
      text: "Sarfaraz delivered amazing graphic design work. Highly professional."
    },
    {
      name: "Sarah Ahmed",
      role: "Marketing Manager",
      image: "https://i.pravatar.cc/100?img=5",
      text: "Very creative designer with great communication."
    },
    {
      name: "John Smith",
      role: "Startup Founder",
      image: "https://i.pravatar.cc/100?img=8",
      text: "Outstanding work and fast delivery."
    },
    {
      name: "Hamza Malik",
      role: "Entrepreneur",
      image: "https://i.pravatar.cc/100?img=12",
      text: "Highly recommended designer."
    }
  ];

  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile view
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-slide testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + (isMobile ? 1 : 2)) % testimonials.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [isMobile]);

  // Decide how many cards to show
  const visibleTestimonials = isMobile
    ? [testimonials[index]]
    : [
        testimonials[index],
        testimonials[(index + 1) % testimonials.length],
      ];

  return (
    <section
      style={{
        padding: "140px 20px",
        background: "rgba(255,255,255,0.02)",
        borderTop: "1px solid #1f1f1f"
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "auto", textAlign: "center" }}>
        <span style={{ color: "#F5C518", letterSpacing: "4px", fontSize: "12px" }}>
          CLIENTS
        </span>

        <h2
  style={{
    color: "white",
    fontSize: "clamp(28px, 6vw, 48px)", // ✅ mobile pe chhota, desktop pe 48
    fontWeight: "900",
    letterSpacing: "3px",
    marginTop: "10px",
  }}
>
  TESTIMONIALS
</h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "60px",
            marginTop: "70px",
            flexWrap: "wrap"
          }}
        >
          {visibleTestimonials.map((item, i) => (
            <motion.div
              key={index + i}
              // Desktop: first card from left, second card from right
              initial={{
                x: isMobile ? -300 : i === 0 ? -300 : 300,
                opacity: 0
              }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.6 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 35px rgba(245,197,24,0.45)"
              }}
              style={{
    width: "100%",           // ✅ mobile pe full width
    maxWidth: "420px",       // ✅ desktop pe 420px se zyada nahi
    padding: "24px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    backdropFilter: "blur(10px)",
    transition: "all 0.4s ease",
  }}
>
              {/* Profile */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "15px" }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid #F5C518"
                  }}
                />
                <div style={{ textAlign: "left" }}>
                  <h4 style={{ color: "#F5C518" }}>{item.name}</h4>
                  <span style={{ color: "#666", fontSize: "12px" }}>{item.role}</span>
                </div>
              </div>

              <div style={{ color: "#F5C518", marginBottom: "12px", fontSize: "18px" }}>★★★★★</div>

              <p style={{ color: "#888", fontSize: "15px", lineHeight: "1.6" }}>{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}