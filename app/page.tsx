"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const skills = ["C++", "Java", "Python", "Next.js", "Oracle", "Git & GitHub"];

  const projects = [
    "Railway Reservation System",
    "ShadowOps Digital Twin",
  ];

  // Typing animation text
  const text = "Building Software Systems That Matter";
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setTyped(text.slice(0, i));
      i++;

      if (i > text.length) clearInterval(interval);
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* 🌌 BACKGROUND */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-green-950 to-black animate-bgMove"></div>

        <div className="absolute top-20 left-20 w-72 h-72 bg-green-500/20 rounded-full blur-3xl animate-float"></div>

        <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-float2"></div>

        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-green-300/10 rounded-full blur-3xl animate-float3"></div>
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 bg-black/60 backdrop-blur-md border-b border-green-500/20 z-50">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between">
          <h1 className="text-green-400 font-bold">
            Pragadeeshwaran
          </h1>

          <div className="hidden md:flex gap-6 text-gray-300">
            <a href="#about" className="hover:text-green-400">About</a>
            <a href="#skills" className="hover:text-green-400">Skills</a>
            <a href="#projects" className="hover:text-green-400">Projects</a>
            <a href="#contact" className="hover:text-green-400">Contact</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-32">

        <p className="text-green-400 tracking-widest animate-pulse">
          CRAFTING DIGITAL SYSTEMS
        </p>

        <h1 className="text-5xl md:text-7xl font-black leading-tight mt-4">
          {typed}
          <span className="text-green-400 animate-pulse"> |</span>
        </h1>

        <p className="mt-8 text-gray-300 max-w-2xl text-lg">
          I'm a Computer Science Engineering student passionate about software
          development, system design, and modern web apps.
        </p>

        <div className="flex gap-4 mt-10">

          <a
            href="https://github.com/pragadeesh1710"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-black px-6 py-3 rounded-lg font-bold hover:scale-110 transition"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/pragadeesh-waran-p-8b90b8373"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-green-500 px-6 py-3 rounded-lg hover:bg-green-500/10 transition"
          >
            LinkedIn
          </a>

          <a
            href="mailto:pragadeeshwaran060@gmail.com"
            className="border border-green-500 px-6 py-3 rounded-lg hover:bg-green-500/10 transition"
          >
            Email
          </a>

        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-green-400 mb-6">
          About Me
        </h2>

        <div className="bg-white/5 border border-green-500/20 p-6 rounded-xl hover:scale-[1.02] transition">
          Passionate developer focused on software engineering and modern web development.
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-green-400 mb-8">
          Skills
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {skills.map((s) => (
            <div
              key={s}
              className="bg-white/5 border border-green-500/20 p-6 rounded-xl hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(34,197,94,0.3)] transition"
            >
              {s}
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-green-400 mb-8">
          Projects
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div
              key={p}
              className="bg-white/5 border border-green-500/20 p-6 rounded-xl hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(34,197,94,0.3)] transition"
            >
              <h3 className="font-bold mb-2">{p}</h3>
              <p className="text-gray-400 text-sm">
                Click to explore project details.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-green-400 mb-6">
          Contact
        </h2>

        <div className="bg-white/5 border border-green-500/20 p-6 rounded-xl">
          <p>📧 pragadeeshwaran060@gmail.com</p>
          <p>🔗 LinkedIn available</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-10 text-gray-500 border-t border-green-500/20">
        © 2026 Pragadeeshwaran
      </footer>
    </main>
  );
}