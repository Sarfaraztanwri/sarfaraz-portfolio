"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";

// ✅ ONLY VALID ICONS (NO ERRORS)
import { FaReact, FaHtml5, FaJs, FaFigma, FaPaintBrush, FaPenNib } from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";

type Skill = {
  name: string;
  level: number;
  icon?: React.ReactNode;
};

type SkillCategory = {
  title: string;
  skills: Skill[];
};

const skillsData: SkillCategory[] = [
  {
    title: "Design",
    skills: [
      { name: "Photoshop", level: 95, icon: <FaPaintBrush /> },
      { name: "Illustrator", level: 90, icon: <FaPenNib /> },
      { name: "Figma", level: 85, icon: <FaFigma /> },
      { name: "Brand Identity", level: 88 },
    ],
  },
  {
    title: "Development",
    skills: [
      { name: "HTML/CSS", level: 98, icon: <FaHtml5 /> },
      { name: "JavaScript", level: 90, icon: <FaJs /> },
      { name: "React", level: 75, icon: <FaReact /> },
      { name: "Next.js", level: 70, icon: <SiNextdotjs /> },
    ],
  },
  {
    title: "Marketing",
    skills: [
      { name: "Social Media Strategy", level: 95 },
      { name: "Content Planning", level: 90 },
      { name: "Ads Creative", level: 85 },
      { name: "Analytics", level: 80 },
    ],
  },
];

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  function handleMouseMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative"
    >
      {children}
    </motion.div>
  );
}

export default function TechnicalSkills() {
  return (
    <section className="bg-[#0b0b0b] text-white py-28 px-6">

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl font-bold tracking-tight">
          TECHNICAL <span className="text-yellow-400">SKILLS</span>
        </h2>
      </motion.div>

      {/* Grid */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10">
        {skillsData.map((category, index) => (
          <TiltCard key={index}>
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative"
            >
              
              {/* Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-white/5 blur-xl rounded-2xl"></div>

              {/* Card */}
              <div className="relative backdrop-blur-2xl bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-yellow-400/40 transition duration-500 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
                
                {/* Title */}
                <h3 className="text-white/80 mb-6 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                  {category.title}
                </h3>

                {/* Skills */}
                <div className="space-y-6">
                  {category.skills.map((skill, i) => {
                    const isTop = skill.level >= 90;

                    return (
                      <div key={i} className="group/skill">
                        
                        {/* Name + % */}
                        <div className="flex justify-between items-center text-sm mb-2">
                          
                          <span className="flex items-center gap-2">
                            
                            {/* Icon */}
                            {skill.icon && (
                              <span className="text-yellow-400 text-lg">
                                {skill.icon}
                              </span>
                            )}

                            {/* Name */}
                            <span
                              className={`transition ${
                                isTop
                                  ? "text-yellow-300 font-semibold"
                                  : "group-hover/skill:text-yellow-300"
                              }`}
                            >
                              {skill.name}
                            </span>
                          </span>

                          {/* Percentage */}
                          <span
                            className={`${
                              isTop
                                ? "text-yellow-300 font-semibold"
                                : "text-yellow-400"
                            }`}
                          >
                            {skill.level}%
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden relative">
                          
                          {/* Glow for top skills */}
                          {isTop && (
                            <div className="absolute inset-0 bg-yellow-400/20 blur-md"></div>
                          )}

                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: i * 0.2 }}
                            viewport={{ once: true }}
                            className={`h-full rounded-full ${
                              isTop
                                ? "bg-linear-to-r from-yellow-300 to-yellow-500 shadow-[0_0_15px_rgba(255,200,0,0.6)]"
                                : "bg-linear-to-r from-yellow-400/70 to-yellow-500/70"
                            }`}
                          />
                        </div>

                      </div>
                    );
                  })}
                </div>

              </div>
            </motion.div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}