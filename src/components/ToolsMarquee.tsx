import { useEffect, useRef, useCallback } from "react";

const logos = [
  { name: "Nike", src: "https://cdn.simpleicons.org/nike/ffffff" },
  { name: "CocaCola", src: "https://cdn.simpleicons.org/cocacola/ffffff" },
  { name: "Upwork", src: "https://cdn.simpleicons.org/upwork/ffffff" },
  { name: "Fiverr", src: "https://cdn.simpleicons.org/fiverr/ffffff" },
  { name: "Google", src: "https://cdn.simpleicons.org/google/ffffff" },
  { name: "Apple", src: "https://cdn.simpleicons.org/apple/ffffff" },
];

export default function ToolsMarquee() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const autoSpeedRef = useRef(2.21); // continuous auto-scroll speed
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const scrollStartRef = useRef(0);
  const dragVelocityRef = useRef(0);
  const lastDragXRef = useRef(0);
  const lastDragTimeRef = useRef(0);
  const momentumRef = useRef(0); // momentum after drag release

  // Duplicate logos many times for seamless infinite scroll
  const allLogos = [...logos, ...logos, ...logos, ...logos, ...logos, ...logos];

  const loopScroll = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const half = slider.scrollWidth / 2;
    if (slider.scrollLeft >= half) {
      slider.scrollLeft -= half;
    }
    if (slider.scrollLeft <= 0) {
      slider.scrollLeft += half;
    }
  }, []);

  // Main animation loop — always auto-scrolls
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Start somewhere in the middle so looping works both directions
    slider.scrollLeft = slider.scrollWidth / 4;

    const animate = () => {
      if (!isDraggingRef.current) {
        // Apply momentum (decays over time)
        if (Math.abs(momentumRef.current) > 0.2) {
          slider.scrollLeft += momentumRef.current;
          momentumRef.current *= 0.95; // friction
        } else {
          momentumRef.current = 0;
          // Normal auto-scroll when no momentum
          slider.scrollLeft += autoSpeedRef.current;
        }
      }

      loopScroll();
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current);
  }, [loopScroll]);

  // Mouse drag handlers
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      momentumRef.current = 0;
      dragStartXRef.current = e.clientX;
      scrollStartRef.current = slider.scrollLeft;
      lastDragXRef.current = e.clientX;
      lastDragTimeRef.current = performance.now();
      slider.style.cursor = "grabbing";
      e.preventDefault();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - dragStartXRef.current;
      slider.scrollLeft = scrollStartRef.current - dx;

      // Track velocity for momentum
      const now = performance.now();
      const dt = now - lastDragTimeRef.current;
      if (dt > 0) {
        dragVelocityRef.current = (lastDragXRef.current - e.clientX) / dt * 16; // normalize to ~60fps
      }
      lastDragXRef.current = e.clientX;
      lastDragTimeRef.current = now;
    };

    const onMouseUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      slider.style.cursor = "grab";

      // Apply momentum from drag velocity
      momentumRef.current = dragVelocityRef.current;
      dragVelocityRef.current = 0;
    };

    const onMouseLeave = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        slider.style.cursor = "grab";
        momentumRef.current = dragVelocityRef.current * 0.5;
        dragVelocityRef.current = 0;
      }
    };

    // Touch support
    const onTouchStart = (e: TouchEvent) => {
      isDraggingRef.current = true;
      momentumRef.current = 0;
      dragStartXRef.current = e.touches[0].clientX;
      scrollStartRef.current = slider.scrollLeft;
      lastDragXRef.current = e.touches[0].clientX;
      lastDragTimeRef.current = performance.now();
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.touches[0].clientX - dragStartXRef.current;
      slider.scrollLeft = scrollStartRef.current - dx;

      const now = performance.now();
      const dt = now - lastDragTimeRef.current;
      if (dt > 0) {
        dragVelocityRef.current =
          (lastDragXRef.current - e.touches[0].clientX) / dt * 16;
      }
      lastDragXRef.current = e.touches[0].clientX;
      lastDragTimeRef.current = now;
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
      momentumRef.current = dragVelocityRef.current;
      dragVelocityRef.current = 0;
    };

    slider.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    slider.addEventListener("mouseleave", onMouseLeave);
    slider.addEventListener("touchstart", onTouchStart, { passive: true });
    slider.addEventListener("touchmove", onTouchMove, { passive: true });
    slider.addEventListener("touchend", onTouchEnd);

    return () => {
      slider.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      slider.removeEventListener("mouseleave", onMouseLeave);
      slider.removeEventListener("touchstart", onTouchStart);
      slider.removeEventListener("touchmove", onTouchMove);
      slider.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <section
      className="relative py-20 overflow-hidden select-none"
      style={{
        background: "#0d0d0d",
        borderTop: "1px solid #1f1f1f",
        borderBottom: "1px solid #1f1f1f",
      }}
    >
      {/* Heading */}
      <div className="text-center mb-14">
        <h3
          className="uppercase tracking-[8px] text-sm"
          style={{ color: "#F5C518", fontFamily: "Outfit, sans-serif" }}
        >
          Worked With
        </h3>
      </div>

      {/* Blur edges */}
      <div
        className="absolute left-0 top-0 bottom-0 w-40 pointer-events-none z-10"
        style={{ background: "linear-gradient(to right, #0d0d0d, transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-40 pointer-events-none z-10"
        style={{ background: "linear-gradient(to left, #0d0d0d, transparent)" }}
      />

      {/* Carousel */}
      <div
        ref={sliderRef}
        className="flex gap-16 px-8 md:px-32 cursor-grab"
        style={{
          overflowX: "hidden",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {allLogos.map((logo, index) => (
          <div
            key={index}
            className="flex items-center justify-center shrink-0 opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110"
            style={{ minWidth: "180px" }}
          >
            <img
              src={logo.src}
              alt={logo.name}
              draggable={false}
              className="h-16 w-auto object-contain pointer-events-none"
              style={{ filter: "drop-shadow(0 0 0 transparent)" }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
