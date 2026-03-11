"use client";

import { useEffect, useRef, useState } from "react";
import { FiArrowRight, FiGithub, FiLinkedin, FiMail, FiDownload, FiExternalLink } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Background from "@/components/Background";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);

  useEffect(() => {
    const handleMounted = () => {
      setMounted(true);
      ScrollTrigger.refresh();
    };
    requestAnimationFrame(handleMounted);
    
    const ctx = gsap.context(() => {
      // Hero Animations
      gsap.fromTo(".hero-content > *", 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power4.out", delay: 0.5 }
      );

      // Section Fade-ins
      if (aboutRef.current) {
        gsap.fromTo(aboutRef.current.querySelectorAll(".fade-up"), 
          { y: 40, opacity: 0 },
          {
            scrollTrigger: {
              trigger: aboutRef.current,
              start: "top 85%",
              toggleActions: "play none none none"
            },
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out"
          }
        );
      }

      if (skillsRef.current) {
        // Heading
        gsap.fromTo(skillsRef.current.querySelector(".heading-section"), 
          { y: 40, opacity: 0 },
          {
            scrollTrigger: {
              trigger: skillsRef.current,
              start: "top 85%",
            },
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
          }
        );

        // Bento Grid Stagger
        const bentoItems = skillsRef.current.querySelectorAll(".bento-item");
        gsap.fromTo(bentoItems, 
          { scale: 0.9, opacity: 0, y: 30 },
          {
            scrollTrigger: {
              trigger: skillsRef.current,
              start: "top 75%"
            },
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
          }
        );
      }

      if (projectsRef.current) {
        gsap.fromTo(projectsRef.current.querySelectorAll(".fade-up"), 
          { y: 40, opacity: 0 },
          {
            scrollTrigger: {
              trigger: projectsRef.current,
              start: "top 85%",
              toggleActions: "play none none none"
            },
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out"
          }
        );
      }
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <main ref={containerRef} style={{ minHeight: "100vh" }}>
      <Background />

      {/* Navigation Layer */}
      <nav className="navbar">
        <div style={{ fontWeight: 600, fontSize: "1.1rem", letterSpacing: "0.05em" }}>
          J. LOUI
        </div>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <a href="https://github.com/johnloui17" target="_blank" rel="noreferrer" aria-label="GitHub" style={{ opacity: 0.7 }}><FiGithub size={20} /></a>
          <a href="https://www.linkedin.com/in/john-loui-26a8b9155" target="_blank" rel="noreferrer" aria-label="LinkedIn" style={{ opacity: 0.7 }}><FiLinkedin size={20} /></a>
        </div>
      </nav>

      {/* 1. Hero Section */}
      <section ref={heroRef} className="container section" style={{ paddingTop: "10vh" }}>
        <div className="hero-content" style={{ display: "flex", flexDirection: "column", maxWidth: "800px", alignItems: "flex-start" }}>
          <div className="pill" style={{ marginBottom: "2rem" }}>
            <span style={{ width: "8px", height: "8px", background: "#fff", borderRadius: "50%", display: "inline-block" }} />
            Full-Stack Engineer
          </div>
          
          <h1 className="heading-hero" style={{ marginBottom: "1.5rem" }}>
            Precision engineering.<br/>
            <span className="text-gradient">Scalable architecture.</span>
          </h1>
          
          <p className="subheading" style={{ marginBottom: "3rem", maxWidth: "600px" }}>
            I build high-performance web applications with a focus on comprehensive testing, pixel-perfect design, and efficiency at scale.
          </p>
          
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="#projects" className="button-primary">
              View Work <FiArrowRight />
            </a>
            <a href="/resume.pdf" target="_blank" className="button-secondary">
              <FiDownload /> Download Resume
            </a>
          </div>
        </div>
      </section>

      {/* 2. About Me Section (New) */}
      <section ref={aboutRef} id="about" className="container section">
        <div className="fade-up">
          <h2 className="heading-section">About Me.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem" }}>
            <p className="subheading">
              My journey into software engineering was driven by a fascination with how complex systems can be distilled into elegant, functional code. I specialize in building robust full-stack applications that don&apos;t just work, but excel under pressure. 
              <br/><br/>
              Whether I&apos;m architecting a multi-domain lead generation system or fine-tuning a pixel-perfect UI, I prioritize scalability, security, and developer experience.
            </p>
            <p className="subheading">
              Beyond the code, I&apos;m a firm believer in continuous learning and knowledge sharing. I&apos;ve led teams in redesigns of massive codebases and established testing cultures that significantly reduced production regressions.
              <br/><br/>
              When I&apos;m not in front of a screen, I&apos;m usually exploring new technologies or finding ways to optimize real-world processes.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Skills & Efficiency Matrix */}
      <section ref={skillsRef} className="container section">
        <h2 className="heading-section fade-up">Engineering Arsenal.</h2>
        
        <div className="bento-grid">
          {/* Main Focus: Frontend */}
          <div className="bento-item span-2">
            <div style={{ marginBottom: "auto" }}>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 500, marginBottom: "0.5rem", color: "#fff" }}>Frontend Ecosystem</h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>Architecting robust client-side applications with modern tooling.</p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "2rem" }}>
              {["React 18", "Next.js", "TypeScript", "SCSS", "GSAP", "Three.js"].map((tag) => (
                <span key={tag} style={{ border: "1px solid var(--border-color)", padding: "0.4rem 0.8rem", borderRadius: "8px", fontSize: "0.9rem" }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Scale & Efficiency */}
          <div className="bento-item span-2" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)", border: "1px solid rgba(255,255,255,0.15)" }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 500, marginBottom: "1rem", color: "#fff" }}>Efficiency & Scale</h3>
            <ul style={{ color: "var(--text-secondary)", lineHeight: 1.8, listStyle: "none" }}>
              <li><span style={{ color: "#fff" }}>↳</span>Led marketing site redesign: 609+ files, 29k+ loc.</li>
              <li><span style={{ color: "#fff" }}>↳</span>Authored 400+ E2E tests for critical user flows.</li>
              <li><span style={{ color: "#fff" }}>↳</span>Lighthouse optimizations across 6 web properties.</li>
            </ul>
          </div>

          {/* Backend Block */}
          <div className="bento-item span-2">
             <h3 style={{ fontSize: "1.2rem", fontWeight: 500, marginBottom: "0.5rem", color: "#fff" }}>Backend & Cloud</h3>
             <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1.5rem" }}>
              {["Node.js", "Express", "Firebase", "Supabase", "MongoDB", "PostgreSQL"].map((tag) => (
                <span key={tag} style={{ border: "1px solid var(--border-color)", padding: "0.4rem 0.8rem", borderRadius: "8px", fontSize: "0.9rem", color: "var(--text-secondary)" }}>{tag}</span>
              ))}
            </div>
          </div>

           {/* Security Block */}
           <div className="bento-item span-1">
             <h3 style={{ fontSize: "1.2rem", fontWeight: 500, marginBottom: "0.5rem", color: "#fff" }}>Security</h3>
             <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "1rem", lineHeight: 1.6 }}>HSTS, CSP, XSS Remediation, and Snyk Compliance.</p>
          </div>

           {/* Analytics Block */}
           <div className="bento-item span-1">
             <h3 style={{ fontSize: "1.2rem", fontWeight: 500, marginBottom: "0.5rem", color: "#fff" }}>Analytics</h3>
             <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "1rem", lineHeight: 1.6 }}>GTM, Mixpanel, and UTM Attribution modeling.</p>
          </div>
        </div>
      </section>

      {/* 4. Projects Showcase */}
      <section ref={projectsRef} id="projects" className="container section">
        <h2 className="heading-section fade-up">Selected Works.</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "6rem", marginTop: "2rem" }}>
          
          {[
            {
              title: "Carland360",
              role: "Founder & Engineer",
              desc: "A comprehensive SaaS platform enabling professional vehicle inspections with digital reporting. Built to handle multi-domain analytics, marketing automation, and business operations. I solved the problem of fragmented inspection data by centralizing it into a real-time dashboard.",
              tags: ["React", "Node.js", "GTM", "Analytics"],
              github: "https://github.com/johnloui17",
              demo: "#"
            },
            {
              title: "Marketfeed Systems",
              role: "Frontend Dev",
              desc: "Developed a cross-platform workshop registration system with CRM lead capture across 6 domains. I engineered the form infrastructure to ensure zero lead loss during high-traffic events, integrating directly with WhatsApp and CRM APIs.",
              tags: ["Next.js", "Firebase", "Styled Components", "Cypress"],
              github: "https://github.com/johnloui17",
              demo: "#"
            },
            {
              title: "Financial Calculators",
              role: "Frontend Dev",
              desc: "Built a suite of 15+ financial calculators from scratch. The challenge was ensuring mathematical precision across complex logic while maintaining a smooth user experience. Launched a custom web stories platform that boosted mobile engagement by 40%.",
              tags: ["React 18", "Next.js", "Mixpanel", "SEO"],
              github: "https://github.com/johnloui17",
              demo: "#"
            }
          ].map((project, i) => (
            <div key={i} className="fade-up" style={{ borderTop: "1px solid var(--border-color)", paddingTop: "3rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
                <div style={{ flex: "1 1 600px" }}>
                  <h3 style={{ fontSize: "2.5rem", fontWeight: 500, marginBottom: "0.5rem" }}>{project.title}</h3>
                  <div className="pill" style={{ marginBottom: "1.5rem" }}>{project.role}</div>
                  <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "2rem" }}>{project.desc}</p>
                  
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
                    <a href={project.github} className="button-secondary" style={{ padding: "0.6rem 1.2rem", fontSize: "0.9rem" }}>
                      <FiGithub /> Repository
                    </a>
                    <a href={project.demo} className="button-secondary" style={{ padding: "0.6rem 1.2rem", fontSize: "0.9rem" }}>
                      <FiExternalLink /> Live Demo
                    </a>
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {project.tags.map(tag => (
                       <span key={tag} style={{ border: "1px solid var(--border-color)", padding: "0.3rem 0.6rem", borderRadius: "6px", fontSize: "0.8rem", color: "var(--text-secondary)" }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {mounted ? new Date().getFullYear() : "2026"} John Loui. Built with Precision, GSAP, and Three.js.</p>
        <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "center", gap: "1.5rem" }}>
           <a href="mailto:jonloui17@gmail.com" aria-label="Email"><FiMail size={20} /></a>
           <a href="https://github.com/johnloui17" target="_blank" rel="noreferrer" aria-label="GitHub"><FiGithub size={20} /></a>
           <a href="https://www.linkedin.com/in/john-loui-26a8b9155" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FiLinkedin size={20} /></a>
        </div>
      </footer>
    </main>
  );
}
