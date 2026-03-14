import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovering(!!(
        t.tagName === "A" || t.tagName === "BUTTON" ||
        t.closest("a") || t.closest("button")
      ));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[999] mix-blend-difference"
        style={{ backgroundColor: "#F5C518" }}
        animate={{ x: pos.x - 8, y: pos.y - 8, scale: hovering ? 2.5 : 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[998]"
        style={{ border: "1px solid rgba(245,197,24,0.3)" }}
        animate={{ x: pos.x - 20, y: pos.y - 20, scale: hovering ? 0 : 1, opacity: hovering ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      />
    </>
  );
}
