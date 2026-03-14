import { FadeIn } from "../FadeIn";
import { Palette, Code2, Film, Globe } from "lucide-react";

const skills = [
  {
    icon: Palette,
    title: "Graphic Design",
    tags: ["Logo Design", "Brand Identity", "Social Media Posts", "Flyer Design", "Poster Design", "Business Card"],
  },
  {
    icon: Globe,
    title: "Social Media Management",
    tags: ["Content Creation", "Post Scheduling", "Instagram", "Facebook", "TikTok", "Engagement Strategy"],
  },
  {
    icon: Film,
    title: "Video Editing",
    tags: ["Premiere Pro", "After Effects", "Reels", "YouTube Videos", "Motion Graphics", "Color Grading"],
  },
  {
    icon: Code2,
    title: "Web Development",
    tags: ["React", "TypeScript", "Tailwind CSS", "Responsive Design", "Landing Pages", "Portfolio Sites"],
  },
];

export function Skills() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 14;
    card.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = "translate(0px, 0px)";
    card.style.borderColor = "#1f1f1f";
    card.style.backgroundColor = "#111111";
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.borderColor = "#F5C518";
    card.style.backgroundColor = "#141414";
  };

  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn className="mb-16 md:mb-24 flex flex-col items-center text-center">
          <span className="font-medium tracking-widest uppercase text-sm mb-4 block" style={{ color: "#F5C518" }}>
            Expertise
          </span>
          <h2
            className="text-4xl md:text-6xl font-black text-white uppercase"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            What I Do
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <FadeIn key={index} delay={index * 0.1} direction="up">
                <div
                  className="group h-full p-8 relative overflow-hidden cursor-default"
                  style={{
                    backgroundColor: "#111111",
                    border: "1px solid #1f1f1f",
                    transition: "transform 0.15s ease, border-color 0.3s ease, background-color 0.3s ease",
                  }}
                  onMouseMove={handleMouseMove}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Top yellow line */}
                  <div
                    className="absolute top-0 left-0 w-full h-1 group-hover:bg-[#F5C518] transition-colors duration-300"
                    style={{ backgroundColor: "#1f1f1f" }}
                  />

                  <div
                    className="w-14 h-14 flex items-center justify-center mb-6"
                    style={{ backgroundColor: "#0A0A0A", border: "1px solid #1f1f1f" }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <h3
                    className="text-2xl font-bold text-white mb-6"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    {skill.title}
                  </h3>

                  <div className="flex flex-wrap gap-y-3">
                    {skill.tags.map((tag, i) => (
                      <span key={i} className="flex items-center">
                        <span className="text-sm font-medium" style={{ color: "#888888" }}>
                          {tag}
                        </span>
                        {i < skill.tags.length - 1 && (
                          <span className="mx-3 text-xs" style={{ color: "#888888" }}>|</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}