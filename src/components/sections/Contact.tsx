import { FadeIn } from "../FadeIn";
import { ArrowUpRight, Send } from "lucide-react";
import { useState } from "react";

const socials = [
  { name: "WhatsApp", url: "https://wa.me/923051008722", handle: "+92 305 1008722" },
  { name: "Instagram", url: "https://www.instagram.com/sarfaraztanwri/", handle: "@sarfaraztanwri" },
  { name: "Behance", url: "https://www.behance.net/sarfaraztanwri", handle: "sarfaraztanwri" },
  { name: "Facebook", url: "https://www.facebook.com/sarfaraztanwrii", handle: "sarfaraztanwrii" },
];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const mailto = `mailto:your@email.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.open(mailto);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  }

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{ width: "80vw", height: "80vw", backgroundColor: "rgba(245,197,24,0.02)", filter: "blur(100px)" }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left — heading + socials */}
          <div className="flex flex-col gap-12">
            <FadeIn>
              <h2
                className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                Let's Work <br />
                <span style={{ color: "#F5C518" }}>Together.</span>
              </h2>
              <p className="text-xl max-w-md mb-12" style={{ color: "#888" }}>
                Available for freelance projects and exciting collaborations. Slide into my DMs or
                drop a message to start a project.
              </p>
              <div className="flex flex-col mb-10">
                <span className="text-sm uppercase tracking-wider mb-1" style={{ color: "#888" }}>Location</span>
                <span className="text-lg text-white font-medium">Karachi, Pakistan</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="flex flex-col gap-3">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-5 transition-all duration-300"
                    style={{ border: "1px solid #1f1f1f", backgroundColor: "rgba(255,255,255,0.02)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#F5C518";
                      e.currentTarget.style.borderColor = "#F5C518";
                      const h4 = e.currentTarget.querySelector("h4");
                      const p = e.currentTarget.querySelector("p");
                      const div = e.currentTarget.querySelector(".icon-circle") as HTMLElement;
                      const svg = e.currentTarget.querySelector("svg");
                      if (h4) h4.style.color = "#0A0A0A";
                      if (p) p.style.color = "#0A0A0A";
                      if (div) div.style.borderColor = "#0A0A0A";
                      if (svg) svg.style.color = "#0A0A0A";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.02)";
                      e.currentTarget.style.borderColor = "#1f1f1f";
                      const h4 = e.currentTarget.querySelector("h4");
                      const p = e.currentTarget.querySelector("p");
                      const div = e.currentTarget.querySelector(".icon-circle") as HTMLElement;
                      const svg = e.currentTarget.querySelector("svg");
                      if (h4) h4.style.color = "#ffffff";
                      if (p) p.style.color = "#888";
                      if (div) div.style.borderColor = "#1f1f1f";
                      if (svg) svg.style.color = "#ffffff";
                    }}
                  >
                    <div>
                      <h4 className="text-lg font-bold text-white transition-colors" style={{ fontFamily: "Outfit, sans-serif" }}>
                        {social.name}
                      </h4>
                      <p className="text-sm mt-0.5 transition-colors" style={{ color: "#888" }}>
                        {social.handle}
                      </p>
                    </div>
                    <div
                      className="icon-circle w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{ border: "1px solid #1f1f1f" }}
                    >
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                  </a>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right — GET IN TOUCH + checkmarks + Form */}
          <div className="flex flex-col justify-center">
            <FadeIn delay={0.2}>

              {/* GET IN TOUCH + description + checkmarks */}
              <div className="mb-6">
                <span
                  className="text-xs font-semibold uppercase tracking-widest mb-3 block"
                  style={{ color: "#F5C518", fontFamily: "Outfit, sans-serif" }}
                >
                  Let's Talk
                </span>
                <p className="text-sm mb-5 leading-relaxed" style={{ color: "#888", fontFamily: "Outfit, sans-serif" }}>
                  Fill out the form and I'll get back to you within 24 hours. Let's build something amazing together.
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    "Response within 24 hours",
                    "Free project consultation",
                    "Custom solutions for your needs",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: "rgba(245,197,24,0.15)", border: "1px solid rgba(245,197,24,0.3)" }}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M1.5 6L4.5 9L10.5 3" stroke="#F5C518" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="text-sm" style={{ color: "#aaa", fontFamily: "Outfit, sans-serif" }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Card */}
              <div
                className="p-8 rounded-2xl"
                style={{ border: "1px solid #1f1f1f", backgroundColor: "rgba(255,255,255,0.02)" }}
              >
                <h3
                  className="text-2xl font-bold text-white mb-8"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  Send a Message
                </h3>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-white" style={{ fontFamily: "Outfit, sans-serif" }}>Name</label>
                      <input
                        type="text"
                        placeholder="Your name"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="px-4 py-3 rounded-lg text-white placeholder-gray-500 outline-none transition-all duration-200 text-sm"
                        style={{ backgroundColor: "#111", border: "1px solid #2a2a2a", fontFamily: "Outfit, sans-serif" }}
                        onFocus={(e) => (e.target.style.borderColor = "#F5C518")}
                        onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-white" style={{ fontFamily: "Outfit, sans-serif" }}>Email</label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="px-4 py-3 rounded-lg text-white placeholder-gray-500 outline-none transition-all duration-200 text-sm"
                        style={{ backgroundColor: "#111", border: "1px solid #2a2a2a", fontFamily: "Outfit, sans-serif" }}
                        onFocus={(e) => (e.target.style.borderColor = "#F5C518")}
                        onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-white" style={{ fontFamily: "Outfit, sans-serif" }}>Subject</label>
                    <input
                      type="text"
                      placeholder="What's this about?"
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="px-4 py-3 rounded-lg text-white placeholder-gray-500 outline-none transition-all duration-200 text-sm"
                      style={{ backgroundColor: "#111", border: "1px solid #2a2a2a", fontFamily: "Outfit, sans-serif" }}
                      onFocus={(e) => (e.target.style.borderColor = "#F5C518")}
                      onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-white" style={{ fontFamily: "Outfit, sans-serif" }}>Message</label>
                    <textarea
                      placeholder="Tell me about your project..."
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="px-4 py-3 rounded-lg text-white placeholder-gray-500 outline-none transition-all duration-200 text-sm resize-none"
                      style={{ backgroundColor: "#111", border: "1px solid #2a2a2a", fontFamily: "Outfit, sans-serif" }}
                      onFocus={(e) => (e.target.style.borderColor = "#F5C518")}
                      onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-lg font-bold text-sm transition-all duration-300"
                    style={{ backgroundColor: sent ? "#22c55e" : "#F5C518", color: "#0A0A0A", fontFamily: "Outfit, sans-serif" }}
                    onMouseEnter={(e) => { if (!sent) (e.currentTarget as HTMLButtonElement).style.opacity = "0.9"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
                  >
                    <Send className="w-4 h-4" />
                    {sent ? "Message Sent!" : "Send Message"}
                  </button>
                </form>
              </div>

            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}