import Home from "./pages/Home";
import { useEffect, useState, useRef } from "react";

function FloatingContactButton() {
  const [visible, setVisible] = useState(false);
  const [btnY, setBtnY] = useState(-80);
  const phaseRef = useRef<"dropping" | "floating" | "hidden">("hidden");
  const animRef = useRef<number>(0);
  const yRef = useRef(-80);
  const vyRef = useRef(0);
  const floatBaseRef = useRef(0);
  const floatTimeRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80 && phaseRef.current === "hidden") {
        // ✅ Start drop phase
        phaseRef.current = "dropping";
        yRef.current = -80;
        vyRef.current = 0;
        setVisible(true);
        cancelAnimationFrame(animRef.current);
        startLoop();
      }

      if (window.scrollY < 30 && phaseRef.current !== "hidden") {
        // ✅ Hide
        phaseRef.current = "hidden";
        setVisible(false);
        cancelAnimationFrame(animRef.current);
        yRef.current = -80;
        vyRef.current = 0;
        setBtnY(-80);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  const startLoop = () => {
    const targetY = window.innerHeight * 0.88;

    const loop = () => {
      if (phaseRef.current === "dropping") {
        // ── DROP PHASE ──
        vyRef.current += 1.3; // gravity
        yRef.current += vyRef.current;

        if (yRef.current >= targetY) {
          yRef.current = targetY;
          vyRef.current = -vyRef.current * 0.38;

          if (Math.abs(vyRef.current) < 1.2) {
            // ✅ Settle — switch to float phase
            vyRef.current = 0;
            yRef.current = targetY;
            floatBaseRef.current = targetY;
            floatTimeRef.current = 0;
            phaseRef.current = "floating";
          }
        }

        setBtnY(yRef.current);

      } else if (phaseRef.current === "floating") {
        // ── FLOAT PHASE — smooth sine wave up/down ──
        floatTimeRef.current += 0.025;
        const floatY = floatBaseRef.current + Math.sin(floatTimeRef.current) * 10;
        setBtnY(floatY);
      }

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
  };

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={() => scrollTo("#contact")}
      style={{
        position: "fixed",
        right: "30px",
        top: `${btnY}px`,
        zIndex: 999,
        backgroundColor: "#F5C518",
        color: "#0A0A0A",
        padding: "12px 24px",
        fontWeight: "bold",
        fontSize: "13px",
        fontFamily: "Outfit, sans-serif",
        border: "none",
        cursor: "pointer",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        boxShadow: "0 4px 20px rgba(245,197,24,0.35)",
        userSelect: "none",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = "#e6b800";
        (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = "#F5C518";
        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
      }}
    >
      Contact Me ↓
    </button>
  );
}

export default function App() {
  return (
    <>
      <FloatingContactButton />
      <Home />
      
    </>
  );
}