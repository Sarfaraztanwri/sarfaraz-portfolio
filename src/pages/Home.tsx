import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import TechnicalSkills from "@/components/TechnicalSkills";
import FeaturedWork from "@/components/FeaturedWork";
import ToolsMarquee from "@/components/ToolsMarquee";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import  Process  from "@/components/sections/Process";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Testimonials } from "@/components/sections/Testimonials";
export default function Home() {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    let start = 0;
    const duration = 2400;
    const step = 16;
    const increment = 100 / (duration / step);

    const interval = setInterval(() => {
      start += increment;
      if (start >= 100) {
        setCount(100);
        clearInterval(interval);
        setTimeout(() => setZoom(true), 400);
        setTimeout(() => setIsLoading(false), 1400);
      } else {
        setCount(Math.floor(start));
      }
    }, step);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="hidden lg:block"><CustomCursor /></div>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            className="fixed inset-0 z-100 overflow-hidden flex items-center justify-center"
            style={{ backgroundColor: "#0A0A0A" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >

            {/* ST. — fade in then zoom out on exit */}
            <motion.div
              className="absolute flex items-end leading-none select-none"
              style={{
                fontFamily: "Outfit, sans-serif",
                fontWeight: 900,
                fontSize: "clamp(5rem, 14vw, 12rem)",
                letterSpacing: "-0.05em",
                zIndex: 10,
              }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={
                zoom
                  ? { opacity: 0, scale: 8 }
                  : { opacity: 1, scale: 1 }
              }
              transition={
                zoom
                  ? { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                  : { duration: 1.0, ease: "easeOut", delay: 0.2 }
              }
            >
              <span style={{ color: "#F5C518" }}>S</span>
              <span style={{ color: "#ffffff" }}>T</span>
              <span
                style={{
                  color: "#F5C518",
                  fontSize: "0.5em",
                  marginBottom: "0.15em",
                }}
              >
                .
              </span>
            </motion.div>

            {/* Counter — bottom left */}
            <div className="absolute bottom-10 left-10" style={{ overflow: "hidden" }}>
              <motion.p
                initial={{ y: "100%", opacity: 0 }}
                animate={
                  zoom
                    ? { y: "100%", opacity: 0 }
                    : { y: "0%", opacity: 1 }
                }
                transition={{
                  duration: 0.6,
                  ease: [0.76, 0, 0.24, 1],
                  delay: zoom ? 0 : 0.3,
                }}
                style={{
                  fontFamily: "Outfit, sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  color: "#ffffff",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}
              >
                {String(count).padStart(2, "0")}
              </motion.p>
            </div>

            {/* Tagline — bottom right */}
            <div className="absolute bottom-10 right-10" style={{ overflow: "hidden" }}>
              <motion.p
                initial={{ y: "100%", opacity: 0 }}
                animate={
                  zoom
                    ? { y: "100%", opacity: 0 }
                    : { y: "0%", opacity: 1 }
                }
                transition={{
                  duration: 0.6,
                  ease: [0.76, 0, 0.24, 1],
                  delay: zoom ? 0.05 : 0.5,
                }}
                style={{
                  fontFamily: "Outfit, sans-serif",
                  fontSize: "0.65rem",
                  color: "#555",
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  textAlign: "right",
                }}
              >
                Graphic Designer
                <br />& Web Developer
              </motion.p>
            </div>

            {/* Yellow progress line */}
            <motion.div
              className="absolute bottom-0 left-0 h-0.5"
              style={{ backgroundColor: "#F5C518" }}
              animate={{ width: `${count}%` }}
              transition={{ duration: 0.05, ease: "linear" }}
            />

          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Navbar />
            <main>
              <Hero />
              <About />
              <FeaturedWork />
              <TechnicalSkills />
              <Skills />
              <ToolsMarquee />
              <Process />
              <Projects />
              <Testimonials />

              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}