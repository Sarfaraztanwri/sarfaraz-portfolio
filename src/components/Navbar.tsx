import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Work", href: "#work" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: isScrolled
            ? "rgba(10, 10, 10, 0.6)"
            : "rgba(10, 10, 10, 0.25)",
          backdropFilter: "blur(16px) saturate(180%)",
          WebkitBackdropFilter: "blur(16px) saturate(180%)",
          borderBottom: isScrolled
            ? "1px solid rgba(255, 255, 255, 0.1)"
            : "1px solid rgba(255, 255, 255, 0.05)",
          boxShadow: isScrolled
            ? "0 4px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.06)"
            : "0 2px 20px rgba(0, 0, 0, 0.2)",
          padding: isScrolled ? "14px 0" : "24px 0",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">

          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, "#home")}
            className="text-2xl font-bold tracking-tighter z-50 relative group"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            <span style={{ color: "#F5C518" }} className="group-hover:text-white transition-colors duration-300">S</span>
            <span style={{ color: "#ffffff" }} className="group-hover:text-[#F5C518] transition-colors duration-300">T</span>
            <span style={{ color: "#F5C518" }}>.</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-sm font-medium relative group transition-colors duration-200"
                style={{ color: "#888" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={e => (e.currentTarget.style.color = "#888")}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: "#F5C518" }} />
              </a>
            ))}

            {/* Download CV Button */}
            <a
              href="/cv.pdf"
              download
              className="px-5 py-2 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              style={{ border: "2px solid #1f1f1f" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "#F5C518";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "#1f1f1f";
              }}
            >
              <span style={{ color: "#F5C518" }}>Download</span> <span style={{ color: "#ffffff" }}>CV</span>
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white z-50 relative p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 pt-16"
            style={{
              backgroundColor: "rgba(10, 10, 10, 0.75)",
              backdropFilter: "blur(30px) saturate(200%)",
              WebkitBackdropFilter: "blur(30px) saturate(200%)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-3xl font-bold text-white hover:text-[#F5C518] transition-colors"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {link.name}
              </motion.a>
            ))}

            {/* Mobile Download CV Button */}
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.1 }}
              href="/cv.pdf"
              download
              className="px-8 py-4 text-xl font-bold transition-all duration-300"
              style={{ border: "2px solid #1f1f1f", fontFamily: "Outfit, sans-serif" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "#F5C518";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "#1f1f1f";
              }}
            >
              <span style={{ color: "#F5C518" }}>Download</span> <span style={{ color: "#ffffff" }}>CV</span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}