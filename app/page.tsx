"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const skills = [
    "C++",
    "Java",
    "Python",
    "Next.js",
    "JavaScript",
    "MySQL",
    "FastAPI",
    "Git & GitHub",
    "Data Structures",
    "Operating Systems",
    "DBMS",
    "OOPs"
  ];

  const projects = [
    {
      title: "LearnHub – Personalized Learning Platform",
      stack: "Next.js, JavaScript, Vercel",
      desc: "Full-stack web platform with course browsing, category filters, search, and a recommendation feed driven by user activity signals (searches, enrollments, ratings, learning time)."
    },
    {
      title: "Personal Portfolio Website",
      stack: "Next.js, JavaScript, CSS, Vercel",
      desc: "Responsive portfolio with About, Skills, Projects, Contact, and an integrated AI assistant querying profile information interactively."
    },
    {
      title: "Secure Question Paper Management System",
      stack: "Python, Flask, HTML, CSS, SQLite",
      desc: "Examination security platform featuring secure question paper management, controlled access, and data confidentiality protection."
    }
  ];

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
            <a href="#resume">Resume</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#ai">AI</a>
            <a href="#contact">Contact</a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="nav-resume-btn">
              Resume ↗
            </a>
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
          I'm a Computer Science Engineering student passionate about software development and building scalable, reliable software systems.
        </p>
        <div className="hero-actions">
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary">
            View Resume 📄
          </a>
          <a href="/resume.pdf" download="Pragadeeshwaran_P_Resume.pdf" className="btn-outline">
            Download CV ⬇
          </a>
          <a href="https://github.com/pragadeesh1710" target="_blank" rel="noopener noreferrer" className="btn-outline">
            GitHub ↗
          </a>
          <a href="https://linkedin.com/in/pragadeeshwaran-p" target="_blank" rel="noopener noreferrer" className="btn-outline">
            LinkedIn ↗
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section">
        <h2 className="section-title">About Me</h2>
        <div className="card">
          <p style={{ marginBottom: "12px" }}>
            Motivated Computer Science and Engineering student at Coimbatore Institute of Technology with a strong foundation in programming, problem-solving, and full-stack software development.
          </p>
          <p style={{ color: "#9ca3af" }}>
            Focused on building high-performance web platforms, data structures & algorithms, and secure software applications.
          </p>
        </div>
      </section>

      {/* RESUME */}
      <section id="resume" className="section">
        <h2 className="section-title">Resume 📄</h2>
        <div className="card resume-card">
          <div className="resume-info">
            <div>
              <h3 style={{ fontSize: "22px", fontWeight: "700", color: "#22c55e", marginBottom: "6px" }}>
                Pragadeeshwaran P
              </h3>
              <p style={{ color: "#e5e7eb", fontSize: "15px", marginBottom: "4px" }}>
                B.E. Computer Science and Engineering (2024 – 2028)
              </p>
              <p style={{ color: "#9ca3af", fontSize: "14px" }}>
                Coimbatore Institute of Technology • CGPA: 7.88
              </p>
            </div>
            <div className="resume-btns">
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary">
                View Full Resume ↗
              </a>
              <a href="/resume.pdf" download="Pragadeeshwaran_P_Resume.pdf" className="btn-outline">
                Download PDF ⬇
              </a>
            </div>
          </div>
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
            placeholder="Ask: Who is Pragadeesh? Or ask for his resume, skills, or projects..."
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
        <h2 className="section-title">Technical Skills</h2>
        <div className="grid">
          {skills.map((s) => (
            <div key={s} className="card">{s}</div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section">
        <h2 className="section-title">Featured Projects</h2>
        <div className="grid">
          {projects.map((p) => (
            <div key={p.title} className="card">
              <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#22c55e", marginBottom: "8px" }}>
                {p.title}
              </h3>
              <p style={{ color: "#86efac", fontSize: "13px", marginBottom: "10px", fontWeight: "500" }}>
                {p.stack}
              </p>
              <p style={{ color: "#d1d5db", fontSize: "14px", lineHeight: "1.6" }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section">
        <h2 className="section-title">Contact</h2>
        <div className="card">
          <p style={{ marginBottom: "8px" }}>📧 <strong>Email:</strong> <a href="mailto:pragadeeshwaran060@gmail.com" style={{ color: "#22c55e", textDecoration: "none" }}>pragadeeshwaran060@gmail.com</a></p>
          <p style={{ marginBottom: "8px" }}>📱 <strong>Phone:</strong> +91 7538873217</p>
          <p style={{ marginBottom: "8px" }}>💼 <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/pragadeeshwaran-p" target="_blank" rel="noopener noreferrer" style={{ color: "#22c55e", textDecoration: "none" }}>linkedin.com/in/pragadeeshwaran-p</a></p>
          <p>💻 <strong>GitHub:</strong> <a href="https://github.com/pragadeesh1710" target="_blank" rel="noopener noreferrer" style={{ color: "#22c55e", textDecoration: "none" }}>github.com/pragadeesh1710</a></p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">© 2026 Pragadeeshwaran</footer>
    </main>
  );
}
