import Home from "./pages/Home";
import { useEffect, useState, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";

function FloatingContactButton() {
  const [visible, setVisible] = useState(false);
  const [btnY, setBtnY] = useState(-80);
  const phaseRef = useRef<"dropping" | "floating" | "hidden">("hidden");
  const animRef = useRef<number>(0);
  const yRef = useRef(-80);
  const vyRef = useRef(0);
  const floatBaseRef = useRef(0);
  const floatTimeRef = useRef(0);

  // WhatsApp number - change this to your number
  const whatsappNumber = "+923051008722"; // Replace with your WhatsApp number

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

  const openWhatsApp = () => {
    // Open WhatsApp with pre-filled message
    const message = "Hello! I would like to contact you.";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  if (!visible) return null;

  return (
    <button
      onClick={openWhatsApp}
      style={{
        position: "fixed",
        right: "30px",
        top: `${btnY}px`,
        zIndex: 999,
        backgroundColor: "#25D366",
        color: "#FFFFFF",
        padding: "16px",
        border: "none",
        cursor: "pointer",
        borderRadius: "50%",
        boxShadow: "0 4px 20px rgba(37, 211, 102, 0.45)",
        userSelect: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "60px",
        height: "60px",
        transition: "transform 0.2s ease, background-color 0.2s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = "#20BD5A";
        (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = "#25D366";
        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
      }}
      aria-label="Contact on WhatsApp"
    >
      <FaWhatsapp size={32} />
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
