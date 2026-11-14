"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const skills = ["C++", "Java", "Python", "Next.js", "Oracle", "Git & GitHub"];
  const projects = ["Railway Reservation System", "ShadowOps Digital Twin"];

  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!input.trim() || loading) return;
    setLoading(true);
    setReply("");
    try {
      const res = await fetch("/api/ping_ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();
      if (!res.ok) {
        setReply(data.error || "An error occurred while contacting the AI.");
      } else {
        setReply(data.reply || data.answer || "No response received.");
      }
    } catch (err) {
      setReply("Error connecting to AI service. Please check your network connection.");
    } finally {
      setLoading(false);
    }
  };

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
    <main className="portfolio-main">

      {/* BACKGROUND — pointer-events none on every child individually */}
      <div className="bg-layer">
        <div className="bg-gradient animate-bgMove" />
        <div className="blob blob-1 animate-float" />
        <div className="blob blob-2 animate-float2" />
        <div className="blob blob-3 animate-float3" />
      </div>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-inner">
          <h1 className="nav-logo">Pragadeeshwaran</h1>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#ai">AI</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="section hero-section">
        <p className="hero-sub">CRAFTING DIGITAL SYSTEMS</p>
        <h1 className="hero-title">
          {typed}
          <span className="cursor">|</span>
        </h1>
        <p className="hero-desc">
          I'm a Computer Science Engineering student passionate about software development.
        </p>
      </section>

      {/* ABOUT */}
      <section id="about" className="section">
        <h2 className="section-title">About Me</h2>
        <div className="card">
          Passionate developer focused on software engineering and modern web development.
        </div>
      </section>

      {/* AI SECTION */}
      <section id="ai" className="section">
        <h2 className="section-title">Ask AI About Me 🤖</h2>
        <div className="ai-row">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !loading && askAI()}
            placeholder="Ask: Who is Pragadeesh?"
            className="ai-input"
            disabled={loading}
          />
          <button onClick={askAI} className="ai-btn" disabled={loading}>
            {loading ? "..." : "Ask"}
          </button>
        </div>
        {loading && <p className="thinking">Thinking...</p>}
        {reply && <div className="card reply-card">{reply}</div>}
      </section>

      {/* SKILLS */}
      <section id="skills" className="section">
        <h2 className="section-title">Skills</h2>
        <div className="grid">
          {skills.map((s) => (
            <div key={s} className="card">{s}</div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section">
        <h2 className="section-title">Projects</h2>
        <div className="grid">
          {projects.map((p) => (
            <div key={p} className="card">{p}</div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section">
        <h2 className="section-title">Contact</h2>
        <div className="card">
          <p>Email: pragadeeshwaran060@gmail.com</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">© 2026 Pragadeeshwaran</footer>
    </main>
  );
}
