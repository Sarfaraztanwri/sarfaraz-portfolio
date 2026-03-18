import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const roles = ["Graphic Designer", "Web Developer", "Creative Thinker", "Social Media Manager"];

export function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentRole) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        setDisplayText(currentRole.substring(0, displayText.length + (isDeleting ? -1 : 1)));
      }
    }, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex]);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -50, 0], rotate: [0, 90, 0], opacity: [0.03, 0.08, 0.03] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] rounded-full"
          style={{ border: "1px solid rgba(245,197,24,0.2)", background: "rgba(245,197,24,0.02)", filter: "blur(60px)" }}
        />
        <motion.div
          animate={{ y: [0, 50, 0], rotate: [0, -90, 0], opacity: [0.02, 0.06, 0.02] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] left-[5%] w-[30vw] h-[30vw] rounded-full"
          style={{ background: "rgba(245,197,24,0.03)", filter: "blur(60px)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="flex items-center justify-between gap-12">

          {/* Left - Text Content */}
          <div className="flex-1">

            {/* Hello I'm */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="font-medium mb-4 text-lg md:text-xl flex items-center gap-3"
              style={{ color: "#888" }}
            >
              <span className="w-12 block" style={{ height: "1px", backgroundColor: "#F5C518" }}></span>
              Hello, I'm
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="font-black leading-[0.9] text-white uppercase tracking-tighter"
              style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(3rem, 8vw, 7rem)" }}
            >
              Sarfaraz<br />
              <span style={{ WebkitTextStroke: "2px #F5C518", color: "transparent" }}>Tanwri</span>
            </motion.h1>

            {/* Role Typing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-6 md:mt-8"
            >
              <h2
                className="text-2xl md:text-4xl font-semibold"
                style={{ fontFamily: "Outfit, sans-serif", color: "rgba(255,255,255,0.9)" }}
              >
                A <span style={{ color: "#F5C518" }}>{displayText}</span>
                <span className="animate-pulse">|</span>
              </h2>
            </motion.div>

            {/* Location */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-6 text-lg md:text-xl max-w-2xl"
              style={{ color: "#888" }}
            >
              4+ Years of Design Experience{" "}
              <span style={{ color: "#F5C518", margin: "0 8px" }}>·</span>{" "}
              Karachi, Pakistan
            </motion.p>

            {/* Mobile Only Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="flex lg:hidden relative items-end justify-center w-full mt-6"
              style={{ height: "200px" }}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: "absolute", bottom: 0, left: 0, right: 0, top: 0 }}
              >
                <div
                  className="absolute rounded-full"
                  style={{
                    width: "170px",
                    height: "170px",
                    backgroundColor: "#F5C518",
                    bottom: "0",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 1,
                    backgroundImage:
                      "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.07) 10px, rgba(0,0,0,0.07) 12px)",
                  }}
                />
                <img
                  src="/01000.png"
                  alt="Sarfaraz Tanwri"
                  className="absolute"
                  style={{
                    zIndex: 2,
                    width: "200px",
                    height: "230px",
                    bottom: "0",
                    left: "50%",
                    transform: "translateX(-50%)",
                    objectFit: "contain",
                    objectPosition: "top center",
                    clipPath: "path('M 0 0 L 200 0 L 200 158 A 100 100 0 0 1 0 158 Z')",
                    filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.5))",
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Buttons */}
            {/* Hello I'm */}
            <motion.p
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.5 }}
  className="font-medium mt-8 mb-4 text-lg md:text-xl flex items-center gap-3"
  style={{ color: "#888" }}
>
  <span className="w-12 block" style={{ height: "1px", backgroundColor: "#F5C518" }}></span>
  🟡 Available For Freelance Projects
</motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 relative z-10"
            >
              <button
                onClick={() => scrollTo("#projects")}
                className="w-full sm:w-auto px-8 py-4 font-bold transition-all duration-300 hover:-translate-y-1"
                style={{ backgroundColor: "#F5C518", color: "#0A0A0A" }}
              >
                View My Work
              </button>
              <button
                onClick={() => scrollTo("#contact")}
                className="w-full sm:w-auto px-8 py-4 font-bold text-white transition-all duration-300 hover:-translate-y-1"
                style={{ border: "2px solid #1f1f1f" }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.borderColor = "#F5C518";
                  (e.target as HTMLElement).style.color = "#F5C518";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.borderColor = "#1f1f1f";
                  (e.target as HTMLElement).style.color = "#ffffff";
                }}
              >
                Hire Me
              </button>
            </motion.div>

          </div>

          {/* Right - Profile Image Desktop Only */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="hidden lg:flex relative items-end justify-center shrink-0"
            style={{ width: "500px", height: "620px" }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: "absolute", bottom: 0, left: 0, right: 0, top: 0 }}
            >
              <div
                className="absolute rounded-full"
                style={{
                  width: "400px",
                  height: "400px",
                  backgroundColor: "#F5C518",
                  bottom: "0",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 1,
                  backgroundImage:
                    "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.07) 10px, rgba(0,0,0,0.07) 12px)",
                }}
              />
              <img
                src="/01000.png"
                alt="Sarfaraz Tanwri"
                className="absolute"
                style={{
                  zIndex: 2,
                  width: "470px",
                  height: "550px",
                  bottom: "0",
                  left: "50.2%",
                  transform: "translateX(-50%)",
                  objectFit: "contain",
                  objectPosition: "top center",
                  clipPath: "path('M 0 0 L 470 0 L 470 385 A 235 235 0 0 1 0 385 Z')",
                  filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.5))",
                }}
              />
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator Desktop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-4"
      >
        <span className="text-xs uppercase tracking-widest" style={{ color: "#888" }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={{ width: "1px", height: "48px", background: "linear-gradient(to bottom, #F5C518, transparent)" }}
        />
      </motion.div>


    </section>
  );
}