import { ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="py-12 relative overflow-hidden" style={{ borderTop: "1px solid #1f1f1f", backgroundColor: "#0A0A0A" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex flex-col items-center md:items-start gap-2">
          <button
            onClick={scrollToTop}
            className="text-2xl font-bold tracking-tighter"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            <span style={{ color: "#F5C518" }}>S</span>
            <span style={{ color: "#ffffff" }}>T</span>
            <span style={{ color: "#F5C518" }}>.</span>
          </button>
          <p className="text-sm" style={{ color: "#888" }}>
            Sarfaraz Tanwri &copy; {new Date().getFullYear()}
          </p>
        </div>

        <p className="text-sm" style={{ color: "#888" }}>
          Designed & Developed with passion in <span style={{ color: "#ffffff" }}>Karachi</span>
        </p>

        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="group flex items-center gap-2 px-5 py-3 rounded-full transition-all duration-300"
          style={{
            border: "1px solid #1f1f1f",
            backgroundColor: "rgba(255,255,255,0.02)",
            fontFamily: "Outfit, sans-serif",
            color: "#888",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#F5C518";
            e.currentTarget.style.borderColor = "#F5C518";
            e.currentTarget.style.color = "#0A0A0A";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.02)";
            e.currentTarget.style.borderColor = "#1f1f1f";
            e.currentTarget.style.color = "#888";
          }}
        >
          <span className="text-sm font-semibold">Back to Top</span>
          <ArrowUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </button>

      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none flex justify-center select-none -mb-8" style={{ opacity: 0.05 }}>
        <span
          className="font-bold text-white whitespace-nowrap leading-none tracking-tighter"
          style={{ fontFamily: "Outfit, sans-serif", fontSize: "15vw" }}
        >
          SARFARAZ
        </span>
      </div>
    </footer>
  );
}