"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";

type Skill = {
  name: string;
  level: number;
};

type SkillCategory = {
  title: string;
  skills: Skill[];
};

const skillsData: SkillCategory[] = [
  {
    title: "Design",
    skills: [
      { name: "Photoshop", level: 95 },
      { name: "Illustrator", level: 90 },
      { name: "Figma", level: 85 },
      { name: "Brand Identity", level: 88 },
    ],
  },
  {
    title: "Development",
    skills: [
      { name: "HTML/CSS", level: 98 },
      { name: "JavaScript", level: 90 },
      { name: "React", level: 75 },
      { name: "Next.js", level: 70 },
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
          Technical <span className="text-white/70">Skills</span>
        </h2>
      </motion.div>

      {/* Grid */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
        {skillsData.map((category, index) => (
          <TiltCard key={index}>
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative"
            >
              
              {/* Subtle Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-white/5 blur-xl rounded-2xl"></div>

              {/* Glass Card */}
              <div className="relative backdrop-blur-2xl bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition duration-500 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
                
                {/* Title */}
                <h3 className="text-white/80 mb-6 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                  {category.title}
                </h3>

                {/* Skills */}
                <div className="space-y-6">
                  {category.skills.map((skill, i) => (
                    <div key={i}>
                      
                      {/* Name + % */}
                      <div className="flex justify-between text-sm mb-2">
                        <span className="group-hover:text-yellow-300 transition">
                          {skill.name}
                        </span>
                        <span className="text-yellow-400">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: i * 0.2 }}
                          viewport={{ once: true }}
                          className="h-full rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500"
                        />
                      </div>

                    </div>
                  ))}
                </div>

              </div>
            </motion.div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}