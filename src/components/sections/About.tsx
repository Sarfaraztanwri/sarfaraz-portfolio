import { FadeIn } from "../FadeIn";

export function About() {
  const stats = [
    { value: "4+", label: "Years Experience" },
    { value: "50+", label: "Projects Done" },
    { value: "Open", label: "For Freelance" },
  ];

  return (
    <section
      id="about"
      className="py-24 md:py-32"
      style={{
        backgroundColor: "rgba(255,255,255,0.02)",
        borderTop: "1px solid #1f1f1f",
        borderBottom: "1px solid #1f1f1f",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-5 relative">
            <FadeIn direction="right">
              <h2
                className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-tight relative z-10"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                About <br />
                <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.5)", color: "transparent" }}>Me</span>
              </h2>
              <div
                className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-32 hidden md:block"
                style={{ backgroundColor: "#F5C518" }}
              ></div>
            </FadeIn>
          </div>

          <div className="lg:col-span-7">
            <FadeIn direction="left" delay={0.2}>
              <div className="space-y-6 text-lg md:text-xl leading-relaxed" style={{ color: "#888" }}>
                <p>
                  I'm{" "}
                  <span className="text-white font-semibold">Sarfaraz Tanwri</span>, a passionate
                  Graphic Designer with 4+ years of experience and a Software Engineering student.
                </p>
                <p>
                  I specialize in creating impactful designs across branding, web, and print media.
                  I believe in turning complex ideas into visually stunning, user-centric solutions.
                  By bridging the gap between aesthetics and technical execution, I craft digital
                  experiences that leave a lasting impression.
                </p>
                <p style={{ color: "#F5C518" }} className="font-medium">
                  Based in Karachi, Pakistan — ready to collaborate worldwide.
                </p>
              </div>
            </FadeIn>

            <FadeIn
              direction="up"
              delay={0.4}
              className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="p-6 transition-colors duration-300 cursor-default"
                  style={{ border: "1px solid #1f1f1f", backgroundColor: "rgba(255,255,255,0.02)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(245,197,24,0.5)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#1f1f1f")}
                >
                  <div
                    className="text-3xl md:text-4xl font-bold text-white mb-2"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium uppercase tracking-wider" style={{ color: "#888" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
