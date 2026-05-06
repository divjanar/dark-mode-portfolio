import { useState } from "react";
import simplePortfolio from "./assets/simple-portfolio.png";
import simpleHtml from "./assets/simple-html.png";
import airDj from "./assets/air-dj.png";
import fitnessWidget from "./assets/fitness-widget.png";


const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&family=Syne:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --red: #EB0004;
    --black: #0a0a0a;
    --white: #f5f2ec;
    --gray: #1a1a1a;
    --mid: #2e2e2e;
    --text-muted: #888;
    --border: rgba(255,255,255,0.1);
  }

  body { background: var(--black); color: var(--white); font-family: 'Syne', sans-serif; overflow-x: hidden; }

  .kala-root { min-height: 100vh; background: var(--black); }

  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.25rem 2.5rem;
    border-bottom: 1px solid var(--border);
    backdrop-filter: blur(12px);
    background: rgba(10,10,10,0.85);
  }
  .nav-logo {
    font-family: 'DM Serif Display', serif;
    font-size: 1.5rem; letter-spacing: -0.02em; color: var(--white);
    text-decoration: none;
    display: flex; align-items: center; gap: 8px;
  }
  .nav-logo span { color: var(--red); }
  .nav-links { display: flex; gap: 2rem; list-style: none; }
  .nav-links a {
    color: var(--text-muted); text-decoration: none; font-size: 0.85rem;
    font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase;
    transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--white); }
  .nav-cta {
    background: var(--red); color: white; border: none; cursor: pointer;
    padding: 0.55rem 1.25rem; font-family: 'Syne', sans-serif; font-weight: 600;
    font-size: 0.8rem; letter-spacing: 0.05em; text-transform: uppercase;
    text-decoration: none; transition: opacity 0.2s;
  }
  .nav-cta:hover { opacity: 0.85; }

  .hero {
    min-height: 100vh; display: flex; flex-direction: column;
    justify-content: flex-end; padding: 0 2.5rem 4rem;
    position: relative; overflow: hidden;
  }
  .hero-bg {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 60% 60% at 70% 30%, rgba(235,0,4,0.08) 0%, transparent 70%);
  }
  .hero-grid {
    position: absolute; inset: 0;
    background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 60px 60px;
  }
  .hero-eyebrow {
    font-family: 'DM Mono', monospace; font-size: 0.75rem;
    color: var(--red); letter-spacing: 0.15em; text-transform: uppercase;
    margin-bottom: 1.5rem; display: flex; align-items: center; gap: 10px;
  }
  .hero-eyebrow::before { content: ''; display: block; width: 32px; height: 1px; background: var(--red); }
  .hero-title {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(3.5rem, 9vw, 8rem);
    line-height: 0.95; letter-spacing: -0.02em;
    color: var(--white); max-width: 900px;
    position: relative; z-index: 1;
  }
  .hero-title em { color: var(--red); font-style: italic; }
  .hero-sub {
    margin-top: 2rem; font-size: 1rem; color: var(--text-muted);
    max-width: 420px; line-height: 1.7; position: relative; z-index: 1;
  }
  .hero-bottom {
    display: flex; align-items: flex-end; justify-content: space-between;
    margin-top: 3rem; position: relative; z-index: 1;
  }
  .hero-cta {
    display: flex; align-items: center; gap: 1rem;
  }
  .btn-primary {
    background: var(--red); color: white; border: none; cursor: pointer;
    padding: 0.9rem 2rem; font-family: 'Syne', sans-serif; font-weight: 700;
    font-size: 0.85rem; letter-spacing: 0.05em; text-transform: uppercase;
    text-decoration: none; transition: opacity 0.2s; display: inline-block;
  }
  .btn-primary:hover { opacity: 0.85; }
  .btn-outline {
    background: transparent; color: var(--white);
    border: 1px solid var(--border); cursor: pointer;
    padding: 0.9rem 2rem; font-family: 'Syne', sans-serif; font-weight: 600;
    font-size: 0.85rem; letter-spacing: 0.05em; text-transform: uppercase;
    text-decoration: none; transition: border-color 0.2s; display: inline-block;
  }
  .btn-outline:hover { border-color: var(--white); }
  .hero-scroll {
    display: flex; align-items: center; gap: 10px;
    font-family: 'DM Mono', monospace; font-size: 0.7rem;
    color: var(--text-muted); letter-spacing: 0.1em; text-transform: uppercase;
  }
  .scroll-line { width: 1px; height: 48px; background: var(--text-muted); }

  .ticker {
    border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
    padding: 1rem 0; overflow: hidden; background: var(--gray);
  }
  .ticker-inner {
    display: flex; gap: 3rem; white-space: nowrap;
    animation: ticker 20s linear infinite;
  }
  .ticker-item {
    font-family: 'DM Mono', monospace; font-size: 0.75rem;
    letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted);
    display: flex; align-items: center; gap: 1rem; flex-shrink: 0;
  }
  .ticker-dot { width: 4px; height: 4px; background: var(--red); border-radius: 50%; }
  @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }

  section { padding: 7rem 2.5rem; }
  .section-label {
    font-family: 'DM Mono', monospace; font-size: 0.7rem;
    color: var(--red); letter-spacing: 0.15em; text-transform: uppercase;
    margin-bottom: 1rem; display: flex; align-items: center; gap: 8px;
  }
  .section-label::before { content: ''; display: block; width: 20px; height: 1px; background: var(--red); }
  h2.section-title {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(2rem, 5vw, 4rem); line-height: 1.05;
    letter-spacing: -0.02em; color: var(--white);
    margin-bottom: 3rem;
  }
  h2.section-title em { color: var(--red); font-style: italic; }

  .projects-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5px; background: var(--border); }
  .project-card {
    background: var(--black); overflow: hidden; cursor: pointer;
    position: relative; aspect-ratio: 4/3;
  }
  .project-card-img {
    width: 100%; height: 100%; object-fit: cover;
    transition: transform 0.6s ease; display: block;
  }
  .project-card:hover .project-card-img { transform: scale(1.04); }
  .project-card-overlay {
    position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%);
    padding: 2rem; display: flex; flex-direction: column; justify-content: flex-end;
    opacity: 0; transition: opacity 0.3s;
  }
  .project-card:hover .project-card-overlay { opacity: 1; }
  .project-type {
    font-family: 'DM Mono', monospace; font-size: 0.65rem;
    color: var(--red); letter-spacing: 0.1em; text-transform: uppercase;
    margin-bottom: 0.4rem;
  }
  .project-name {
    font-family: 'DM Serif Display', serif; font-size: 1.4rem;
    color: white; line-height: 1.2;
  }
  .project-meta {
    font-size: 0.75rem; color: rgba(255,255,255,0.5);
    margin-top: 0.4rem; font-family: 'DM Mono', monospace;
  }
  .project-placeholder {
    width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
    font-family: 'DM Serif Display', serif; font-size: 3rem; color: var(--mid);
  }

  .process-section { background: var(--gray); }
  .process-intro {
    display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; margin-bottom: 5rem;
  }
  .process-text { font-size: 1.05rem; color: var(--text-muted); line-height: 1.8; }
  .process-text p + p { margin-top: 1rem; }
  .process-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; }
  .process-step { border-top: 1px solid var(--border); padding-top: 1.5rem; }
  .step-num {
    font-family: 'DM Mono', monospace; font-size: 0.7rem;
    color: var(--red); letter-spacing: 0.1em; margin-bottom: 1rem;
  }
  .step-title {
    font-family: 'DM Serif Display', serif; font-size: 1.25rem;
    color: var(--white); margin-bottom: 0.75rem;
  }
  .step-desc { font-size: 0.85rem; color: var(--text-muted); line-height: 1.7; }

  .about-section { overflow: hidden; padding: 0; }
  .about-inner { padding: 7rem 2.5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
  .about-text { font-size: 1.05rem; color: var(--text-muted); line-height: 1.8; }
  .about-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 3rem; }
  .stat { border-left: 2px solid var(--red); padding-left: 1.25rem; }
  .stat-num {
    font-family: 'DM Serif Display', serif; font-size: 2.5rem; color: var(--white); line-height: 1;
  }
  .stat-label { font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem; }
  .marquee-wrap { border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 1.5rem 0; overflow: hidden; }
  .marquee-inner {
    display: flex; gap: 0; white-space: nowrap;
    animation: ticker 25s linear infinite;
  }
  .marquee-item {
    font-family: 'DM Serif Display', serif; font-size: 3.5rem;
    color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,0.15);
    padding: 0 2rem; flex-shrink: 0; letter-spacing: -0.02em;
    transition: color 0.3s;
  }
  .marquee-item:hover { color: var(--red); -webkit-text-stroke: 1px var(--red); }

  .form-section { background: var(--black); }
  .form-section h2.section-title { max-width: 600px; }
  .form-layout { display: grid; grid-template-columns: 1fr 1.5fr; gap: 5rem; }
  .form-info p { color: var(--text-muted); font-size: 0.95rem; line-height: 1.8; margin-bottom: 2rem; }
  .form-socials { display: flex; flex-direction: column; gap: 0.75rem; }
  .form-social-link {
    display: flex; align-items: center; gap: 0.75rem; color: var(--text-muted);
    text-decoration: none; font-size: 0.85rem; font-family: 'DM Mono', monospace;
    letter-spacing: 0.05em; transition: color 0.2s;
  }
  .form-social-link:hover { color: var(--white); }
  .form-social-link::before { content: '→'; color: var(--red); }
  .contact-form { display: flex; flex-direction: column; gap: 1.25rem; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .field-wrap { display: flex; flex-direction: column; gap: 0.4rem; }
  .field-wrap label {
    font-family: 'DM Mono', monospace; font-size: 0.7rem;
    color: var(--text-muted); letter-spacing: 0.1em; text-transform: uppercase;
  }
  .field-wrap input, .field-wrap textarea, .field-wrap select {
    background: var(--gray); border: 1px solid var(--border);
    color: var(--white); padding: 0.75rem 1rem; font-family: 'Syne', sans-serif;
    font-size: 0.9rem; outline: none; width: 100%;
    transition: border-color 0.2s; appearance: none;
  }
  .field-wrap input:focus, .field-wrap textarea:focus, .field-wrap select:focus {
    border-color: var(--red);
  }
  .field-wrap textarea { resize: vertical; min-height: 100px; }
  .budget-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; }
  .budget-btn {
    background: var(--gray); border: 1px solid var(--border);
    color: var(--text-muted); padding: 0.6rem 0.5rem;
    font-family: 'DM Mono', monospace; font-size: 0.7rem;
    letter-spacing: 0.04em; cursor: pointer; text-align: center;
    transition: all 0.2s;
  }
  .budget-btn:hover { border-color: var(--red); color: var(--white); }
  .budget-btn.active { background: var(--red); border-color: var(--red); color: white; }
  .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; }
  .service-btn {
    background: var(--gray); border: 1px solid var(--border);
    color: var(--text-muted); padding: 0.6rem 0.5rem;
    font-family: 'DM Mono', monospace; font-size: 0.7rem;
    letter-spacing: 0.04em; cursor: pointer; text-align: center;
    transition: all 0.2s;
  }
  .service-btn:hover { border-color: var(--red); color: var(--white); }
  .service-btn.active { background: var(--red); border-color: var(--red); color: white; }
  .form-hint { font-family: 'DM Mono', monospace; font-size: 0.7rem; color: var(--text-muted); }
  .submit-btn {
    background: var(--red); color: white; border: none; cursor: pointer;
    padding: 1rem 2.5rem; font-family: 'Syne', sans-serif; font-weight: 700;
    font-size: 0.85rem; letter-spacing: 0.08em; text-transform: uppercase;
    align-self: flex-start; transition: opacity 0.2s; margin-top: 0.5rem;
  }
  .submit-btn:hover { opacity: 0.85; }

  footer {
    background: var(--gray); border-top: 1px solid var(--border);
    padding: 4rem 2.5rem 2rem;
  }
  .footer-top {
    display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 4rem;
    margin-bottom: 4rem;
  }
  .footer-logo {
    font-family: 'DM Serif Display', serif; font-size: 2rem;
    color: var(--white); margin-bottom: 1rem; display: block; letter-spacing: -0.02em;
  }
  .footer-tagline { font-size: 0.875rem; color: var(--text-muted); line-height: 1.7; max-width: 320px; }
  .footer-col h4 {
    font-family: 'DM Mono', monospace; font-size: 0.7rem;
    color: var(--red); letter-spacing: 0.12em; text-transform: uppercase;
    margin-bottom: 1.25rem;
  }
  .footer-links { list-style: none; display: flex; flex-direction: column; gap: 0.7rem; }
  .footer-links a {
    color: var(--text-muted); text-decoration: none; font-size: 0.875rem;
    transition: color 0.2s;
  }
  .footer-links a:hover { color: var(--white); }
  .footer-bottom {
    border-top: 1px solid var(--border); padding-top: 2rem;
    display: flex; justify-content: space-between; align-items: center;
  }
  .footer-copy { font-family: 'DM Mono', monospace; font-size: 0.7rem; color: var(--text-muted); }
  .footer-legal { display: flex; gap: 1.5rem; }
  .footer-legal a {
    font-family: 'DM Mono', monospace; font-size: 0.7rem;
    color: var(--text-muted); text-decoration: none; transition: color 0.2s;
  }
  .footer-legal a:hover { color: var(--white); }

  @media (max-width: 900px) {
    nav { padding: 1rem 1.25rem; }
    .nav-links { display: none; }
    section { padding: 4rem 1.25rem; }
    .hero { padding: 0 1.25rem 3rem; }
    .projects-grid { grid-template-columns: 1fr; }
    .process-intro { grid-template-columns: 1fr; gap: 2rem; }
    .process-steps { grid-template-columns: 1fr 1fr; }
    .about-inner { grid-template-columns: 1fr; gap: 2rem; }
    .form-layout { grid-template-columns: 1fr; gap: 2.5rem; }
    .form-row { grid-template-columns: 1fr; }
    .footer-top { grid-template-columns: 1fr; gap: 2rem; }
    .footer-bottom { flex-direction: column; gap: 1rem; align-items: flex-start; }
  }
`;

const BUDGETS = ["Freelance", "Part-Time", "Full-Time", "Contract", "Collab", "Open", "Let's Talk"];
const SERVICES = ["Web Design", "Frontend", "Creative Direction", "Branding", "UI/UX", "Development", "Other"];

const TICKER_ITEMS = [
  "Creative Developer",
  "Personal Portfolio",
  "UI / UX Design",
  "Frontend Development",
  "Brand Identity",
  "Digital Experiences",
  "Visual Storytelling",
  "Open to Collaborate"
];

const MARQUEE_ITEMS = ["Design", "Code", "Motion", "Identity", "Portfolio"];

const PROJECTS = [
  {
    type: "Personal Portfolio",
    name: "Simple Portfolio",
    location: "Live Website",
    year: "2025",
    image: simplePortfolio,
    link: "https://divjanar.github.io/Simple_Portfolio/",
  },
  {
    type: "HTML / CSS Website",
    name: "SimpleHTML",
    location: "Live Website",
    year: "2025",
    image: simpleHtml,
    link: "https://divjanar.github.io/SimpleHTML/",
  },
  {
    type: "Computer Vision + Audio",
    name: "Air DJ",
    location: "GitHub Project",
    year: "2026",
    image: airDj,
    link: "https://github.com/divjanar/Air_DJ",
  },
  {
    type: "Desktop Fitness App",
    name: "Fitness Widget",
    location: "GitHub Project",
    year: "2026",
    image: fitnessWidget,
    link: "https://github.com/divjanar/Fitness-Widget",
  },
];

const STEPS = [
  { num: "01", title: "Research", desc: "Every project starts with understanding the story, audience, and purpose behind the work." },
  { num: "02", title: "Concept", desc: "I explore layout, direction, and visuals to shape a clear and compelling digital identity." },
  { num: "03", title: "Build", desc: "Designs are turned into clean, responsive, and modern experiences built with intention." },
  { num: "04", title: "Refine", desc: "The final stage focuses on polish, performance, and details that make the work feel complete." },
];

export default function GreycardPortfolio() {
  const [budget, setBudget] = useState("");
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({ name: "", contact: "", website: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const toggleService = (s) =>
    setServices((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const tickerItems = [...TICKER_ITEMS, ...TICKER_ITEMS];
  const marqueeItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <>
      <style>{styles}</style>
      <div className="kala-root">
        <nav>
          <a href="#" className="nav-logo">greycard <span>[portfolio]</span></a>
          <ul className="nav-links">
            <li><a href="#projects">Projects</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <a href="#contact" className="nav-cta">Let’s Connect</a>
        </nav>

        <section className="hero">
          <div className="hero-bg" />
          <div className="hero-grid" />
          <div style={{ position: "relative", zIndex: 1 }}>
            <p className="hero-eyebrow">Personal Portfolio</p>
            <h1 className="hero-title">
              Building bold<br />digital <em>experiences</em><br />with purpose
            </h1>
            <p className="hero-sub">
              I’m greycard — a creative designer and developer focused on clean visuals,
              thoughtful interaction, and modern web experiences.
            </p>
          </div>
          <div className="hero-bottom">
            <div className="hero-cta">
              <a href="#contact" className="btn-primary">Get In Touch</a>
              <a href="#projects" className="btn-outline">View Projects</a>
            </div>
            <div className="hero-scroll">
              <div className="scroll-line" />
              Scroll
            </div>
          </div>
        </section>

        <div className="ticker">
          <div className="ticker-inner">
            {tickerItems.map((item, i) => (
              <span className="ticker-item" key={i}>
                <span className="ticker-dot" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <section id="projects" style={{ padding: "7rem 0" }}>
          <div style={{ padding: "0 2.5rem", marginBottom: "3rem" }}>
            <p className="section-label">Featured Work</p>
            <h2 className="section-title">Selected <em>Projects</em></h2>
          </div>
          <div className="projects-grid">
            {PROJECTS.map((p, i) => (
              <a
                className="project-card-link"
                href={p.link}
                target="_blank"
                rel="noreferrer"
                key={i}
              >
                <div className="project-card">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="project-card-img"
                  />

                  <div className="project-card-overlay">
                    <p className="project-type">{p.type}</p>
                    <p className="project-name">{p.name}</p>
                    <p className="project-meta">{p.location} · {p.year}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="process-section" id="about">
          <div className="process-intro">
            <div>
              <p className="section-label">What I Do</p>
              <h2 className="section-title">Creative process,<br /><em>from idea to build</em></h2>
            </div>
            <div className="process-text">
              <p>
                My work blends design thinking, visual storytelling, and frontend development
                to create websites and digital experiences that feel distinct and intentional.
              </p>
              <p>
                I care about clean layouts, strong identity, responsive design, and polished
                user experiences. Every project is built to communicate clearly and look sharp.
              </p>
              <p style={{ marginTop: "2rem" }}>
                <a href="#contact" className="btn-primary" style={{ display: "inline-block" }}>Work With Me</a>
              </p>
            </div>
          </div>
          <div className="process-steps">
            {STEPS.map((s) => (
              <div className="process-step" key={s.num}>
                <p className="step-num">{s.num}</p>
                <p className="step-title">{s.title}</p>
                <p className="step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="about-section">
          <div className="about-inner">
            <div>
              <p className="section-label">About greycard</p>
              <h2 className="section-title" style={{ marginBottom: "1.5rem" }}>
                Design-focused,<br /><em>detail-driven</em>
              </h2>
              <p className="about-text">
                I’m a multidisciplinary creative focused on building work that feels modern,
                memorable, and functional. From concept to final polish, I enjoy shaping digital
                experiences that connect strong visuals with thoughtful execution.
              </p>
            </div>
            <div>
              <div className="about-stats">
                {[
                  { num: "12+", label: "Projects Built" },
                  { num: "100%", label: "Creative Focus" },
                  { num: "5+", label: "Years Exploring Design" },
                  { num: "24h", label: "Response Time" },
                ].map((s, i) => (
                  <div className="stat" key={i}>
                    <p className="stat-num">{s.num}</p>
                    <p className="stat-label">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="marquee-wrap">
            <div className="marquee-inner">
              {marqueeItems.map((item, i) => (
                <span className="marquee-item" key={i}>{item} ✦ </span>
              ))}
            </div>
          </div>
        </div>

        <section className="form-section" id="contact">
          <div className="form-layout">
            <div className="form-info">
              <p className="section-label">Contact</p>
              <h2 className="section-title">Let’s build<br /><em>something good</em></h2>
              <p>
                I’m always open to new opportunities, freelance projects, and creative
                collaborations. Feel free to reach out through the links below or send a message.
              </p>
              <div className="form-socials">
                {[
                  { label: "hello@greycard.com", href: "mailto:hello@greycard.com" },
                  { label: "Instagram", href: "https://www.instagram.com/grey_cardz/" },
                  { label: "LinkedIn", href: "https://www.linkedin.com/in/YOUR_USERNAME/" },
                  { label: "GitHub", href: "https://github.com/divjanar" },
                ].map((l, i) => (
                  <a
                    className="form-social-link"
                    href={l.href}
                    key={i}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <p className="form-hint">Fill out the form and I’ll get back to you soon.</p>

              <div className="form-row">
                <div className="field-wrap">
                  <label>Your Name *</label>
                  <input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Jane Smith"
                  />
                </div>
                <div className="field-wrap">
                  <label>Contact (Phone or Email) *</label>
                  <input
                    required
                    value={formData.contact}
                    onChange={(e) => setFormData((p) => ({ ...p, contact: e.target.value }))}
                    placeholder="jane@example.com"
                  />
                </div>
              </div>

              <div className="field-wrap">
                <label>Website or Social Link (optional)</label>
                <input
                  value={formData.website}
                  onChange={(e) => setFormData((p) => ({ ...p, website: e.target.value }))}
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div className="field-wrap">
                <label>Project Type</label>
                <div className="budget-grid">
                  {BUDGETS.map((b) => (
                    <button
                      type="button"
                      className={`budget-btn${budget === b ? " active" : ""}`}
                      key={b}
                      onClick={() => setBudget(b)}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div className="field-wrap">
                <label>What are you looking for?</label>
                <div className="services-grid">
                  {SERVICES.map((s) => (
                    <button
                      type="button"
                      className={`service-btn${services.includes(s) ? " active" : ""}`}
                      key={s}
                      onClick={() => toggleService(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="field-wrap">
                <label>Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                  placeholder="Tell me about your idea…"
                />
              </div>

              <button type="submit" className="submit-btn">
                {submitted ? "✓ Sent!" : "Send Message"}
              </button>
            </form>
          </div>
        </section>

        <footer>
          <div className="footer-top">
            <div className="footer-brand">
              <span className="footer-logo">greycard</span>
              <p className="footer-tagline">
                A personal portfolio built around design, code, and creative direction.
                Open to freelance work, collaborations, and new ideas.
              </p>
            </div>
            <div className="footer-col">
              <h4>Pages</h4>
              <ul className="footer-links">
                {["About", "Projects", "Contact"].map((l) => (
                  <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <h4>Socials</h4>
              <ul className="footer-links">
                <li><a href="mailto:hello@greycard.com">Email</a></li>
                <li><a href="https://www.instagram.com/grey_cardz/" target="_blank" rel="noreferrer">Instagram</a></li>
                <li><a href="https://www.linkedin.com/in/YOUR_USERNAME/" target="_blank" rel="noreferrer">LinkedIn</a></li>
                <li><a href="https://github.com/divjanar" target="_blank" rel="noreferrer">GitHub</a></li>
              </ul> 
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copy">Created by greycard © 2026</p>
            <div className="footer-legal">
              <a href="#">Terms</a>
              <a href="#">Privacy</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
