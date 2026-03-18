import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Linkedin, Github, Mail } from "lucide-react";

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

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
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
            ? "rgba(10,10,10,0.6)"
            : "rgba(10,10,10,0.25)",
          backdropFilter: "blur(16px) saturate(180%)",
          WebkitBackdropFilter: "blur(16px) saturate(180%)",
          borderBottom: isScrolled
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid rgba(255,255,255,0.05)",
          padding: isScrolled ? "14px 0" : "24px 0",
        }}
      >

<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between gap-4">

          {/* Logo Left */}
          <div className="flex justify-start">
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, "#home")}
              className="text-2xl font-bold tracking-tighter group"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              <span className="text-[#F5C518] group-hover:text-white transition">
                S
              </span>
              <span className="text-white group-hover:text-[#F5C518] transition">
                T
              </span>
              <span className="text-[#F5C518]">.</span>
            </a>
          </div>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center justify-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-sm font-medium relative group text-[#888] hover:text-white transition"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F5C518] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}

            <a
  href="/cv.pdf"
  download
  className="px-5 py-2 text-sm font-bold border border-[#1f1f1f] hover:border-[#F5C518] transition whitespace-nowrap"
>
  <span className="text-[#F5C518]">Download</span>{" "}
  <span className="text-white">CV</span>
</a>
          </nav>

          {/* Right Icons */}
          <div className="hidden md:flex justify-end items-center gap-4">
            <a
              href="https://www.linkedin.com/in/sarfaraztanwri/"
              target="_blank"
              className="text-[#888] hover:text-[#F5C518] transition-transform hover:scale-110"
            >
              <Linkedin size={18} />
            </a>

            <a
              href="https://github.com/yourusername"
              target="_blank"
              className="text-[#888] hover:text-[#F5C518] transition-transform hover:scale-110"
            >
              <Github size={18} />
            </a>

            <a
              href="sarfaraztanwari06@gmail.com"
              className="text-[#888] hover:text-[#F5C518] transition-transform hover:scale-110"
            >
              <Mail size={18} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white justify-self-end"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-[#0A0A0A]/90 backdrop-blur-xl flex flex-col items-center justify-center gap-8 z-40"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-3xl font-bold text-white hover:text-[#F5C518]"
              >
                {link.name}
              </a>
            ))}

            <a
              href="/cv.pdf"
              download
              className="px-8 py-3 border-2 border-[#1f1f1f]"
            >
              <span className="text-[#F5C518]">Download</span>{" "}
              <span className="text-white">CV</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}