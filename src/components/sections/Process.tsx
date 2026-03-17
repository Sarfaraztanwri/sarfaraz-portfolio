import React from "react";

export default function Process() {
  const steps = [
    { number: "01", title: "Research", desc: "Understanding client goals" },
    { number: "02", title: "Strategy", desc: "Planning design direction" },
    { number: "03", title: "Design", desc: "Creating visual concepts" },
    { number: "04", title: "Delivery", desc: "Final assets & support" },
  ];

  return (
    <section className="bg-black py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">

        {/* Heading */}
        <p className="text-[#F5C518] text-sm tracking-widest mb-2">
          PROCESS
        </p>
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-16">
          MY WORK PROCESS
        </h2>

        {/* Line + Steps */}
        <div className="relative">

          {/* Horizontal Line */}
          <div className="hidden md:block absolute top-6 left-0 w-full h-2px bg-[#333]"></div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center relative">

                {/* Circle */}
                <div className="w-12 h-12 rounded-full border-2 border-[#333] bg-black flex items-center justify-center text-[#F5C518] font-bold z-10 hover:border-[#F5C518] transition">
                  {step.number}
                </div>

                {/* Title */}
                <h3 className="text-white mt-6 text-lg font-semibold">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm mt-2 text-center">
                  {step.desc}
                </p>

              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}