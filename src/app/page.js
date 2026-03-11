"use client";

import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { FiArrowRight, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  // --- Spotlight: useMotionValue + useTransform ---
  // Initialize to 0 to match SSR
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Offset so the orb is centered on the cursor
  const spotlightX = useTransform(mouseX, (val) => val - 400);
  const spotlightY = useTransform(mouseY, (val) => val - 400);

  useEffect(() => {
    setMounted(true);
    
    // Set initial position to center
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);
  
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (custom = 0) => ({
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, delay: custom * 0.1, ease: [0.16, 1, 0.3, 1] }
    })
  };

  return (
    <main style={{ minHeight: "100vh" }}>
      
      {/* Base Dark Background */}
      <motion.div 
        style={{
          position: "fixed",
          top: "0px",
          left: "0px",
          width: "100vw",
          height: "100vh",
          zIndex: -2,
          y: yBg,
          backgroundImage: "radial-gradient(circle at 50% 0%, rgba(30,30,30,0.4) 0%, rgba(0,0,0,1) 40%)",
        }}
      />
      
      {/* Interactive Mouseover Spotlight */}
      <motion.div
        style={{
          x: spotlightX,
          y: spotlightY,
          position: "fixed",
          top: "0px",
          left: "0px",
          width: "800px",
          height: "800px",
          borderRadius: "50%",
          backgroundImage: "radial-gradient(circle, rgba(120, 60, 255, 0.25) 0%, rgba(60, 120, 255, 0.15) 40%, rgba(0, 0, 0, 0) 70%)",
          filter: "blur(60px)",
          zIndex: 0,
          pointerEvents: "none",
          mixBlendMode: "screen",
        }}
      />

      {/* Navigation Layer */}
      <nav className="navbar">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ fontWeight: 600, fontSize: "1.1rem", letterSpacing: "0.05em" }}
        >
          J. LOUI
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ display: "flex", gap: "1.5rem" }}
        >
          <a href="https://github.com/johnloui17" target="_blank" rel="noreferrer" aria-label="GitHub" style={{ opacity: 0.7 }}><FiGithub size={20} /></a>
          <a href="https://www.linkedin.com/in/john-loui-26a8b9155" target="_blank" rel="noreferrer" aria-label="LinkedIn" style={{ opacity: 0.7 }}><FiLinkedin size={20} /></a>
        </motion.div>
      </nav>

      {/* 1. Hero Section (Minimal & Impactful) */}
      <section className="container section" style={{ paddingTop: "10vh" }}>
        <motion.div 
          initial="hidden"
          animate="visible"
          style={{ display: "flex", flexDirection: "column", maxWidth: "800px", alignItems: "flex-start" }}
        >
          <motion.div custom={1} variants={fadeUp} className="pill" style={{ marginBottom: "2rem" }}>
            <span style={{ width: "8px", height: "8px", background: "#fff", borderRadius: "50%", display: "inline-block" }} />
            Full-Stack Engineer
          </motion.div>
          
          <motion.h1 custom={2} variants={fadeUp} className="heading-hero" style={{ marginBottom: "1.5rem" }}>
            Precision engineering.<br/>
            <span className="text-gradient">Scalable architecture.</span>
          </motion.h1>
          
          <motion.p custom={3} variants={fadeUp} className="subheading" style={{ marginBottom: "3rem", maxWidth: "600px" }}>
            I build high-performance web applications with a focus on comprehensive testing, pixel-perfect design, and efficiency at scale.
          </motion.p>
          
          <motion.div custom={4} variants={fadeUp} style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="#projects" className="button-primary">
              View Work <FiArrowRight />
            </a>
            <a href="mailto:jonloui17@gmail.com" className="button-secondary">
              <FiMail /> Get in touch
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. Skills & Efficiency Matrix (Interactive Bento Box) */}
      <section className="container section">
        <motion.h2 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="heading-section"
        >
          Engineering Arsenal.
        </motion.h2>
        
        <div className="bento-grid">
          
          {/* Main Focus: Frontend */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp}
            className="bento-item span-2"
          >
            <div style={{ marginBottom: "auto" }}>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 500, marginBottom: "0.5rem", color: "#fff" }}>Frontend Ecosystem</h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>Architecting robust client-side applications with modern tooling.</p>
            </div>
            
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "2rem" }}>
              {["React 18", "Next.js 13-16", "TypeScript", "Styled Components", "Tailwind", "Flutter"].map((tag) => (
                <span key={tag} style={{ border: "1px solid var(--border-color)", padding: "0.4rem 0.8rem", borderRadius: "8px", fontSize: "0.9rem" }}>{tag}</span>
              ))}
            </div>
          </motion.div>

          {/* Scale & Efficiency Highlight */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp}
            className="bento-item span-2"
            style={{ 
               background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
               border: "1px solid rgba(255,255,255,0.15)"
            }}
          >
            <h3 style={{ fontSize: "1.5rem", fontWeight: 500, marginBottom: "1rem", color: "#fff" }}>Efficiency & Scale</h3>
            <ul style={{ color: "var(--text-secondary)", lineHeight: 1.8, listStyle: "none" }}>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "0.8rem" }}>
                <span style={{ color: "#fff" }}>↳</span>Led marketing site redesign: 609+ files, 29k+ loc.
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "0.8rem" }}>
                <span style={{ color: "#fff" }}>↳</span>Authored 400+ E2E tests for critical user flows.
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "0.8rem" }}>
                <span style={{ color: "#fff" }}>↳</span>Lighthouse optimizations across 6 web properties.
              </li>
            </ul>
          </motion.div>

          {/* Backend Block */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3} variants={fadeUp}
            className="bento-item span-2"
          >
             <h3 style={{ fontSize: "1.2rem", fontWeight: 500, marginBottom: "0.5rem", color: "#fff" }}>Backend & Cloud</h3>
             <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1.5rem" }}>
              {["Node.js", "Nest.js", "Express", "Firebase Admin", "Supabase", "MongoDB"].map((tag) => (
                <span key={tag} style={{ border: "1px solid var(--border-color)", padding: "0.4rem 0.8rem", borderRadius: "8px", fontSize: "0.9rem", color: "var(--text-secondary)" }}>{tag}</span>
              ))}
            </div>
          </motion.div>

           {/* Security Block */}
           <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={4} variants={fadeUp}
            className="bento-item span-1"
          >
             <h3 style={{ fontSize: "1.2rem", fontWeight: 500, marginBottom: "0.5rem", color: "#fff" }}>Security</h3>
             <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "1rem", lineHeight: 1.6 }}>HSTS, CSP, XSS Remediation, and Snyk Vulnerability Compliance.</p>
          </motion.div>

           {/* Analytics Block */}
           <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={5} variants={fadeUp}
            className="bento-item span-1"
          >
             <h3 style={{ fontSize: "1.2rem", fontWeight: 500, marginBottom: "0.5rem", color: "#fff" }}>Analytics</h3>
             <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "1rem", lineHeight: 1.6 }}>GTM, Mixpanel, CleverTap, and UTM Attribution modeling.</p>
          </motion.div>

        </div>
      </section>

      {/* 3. Projects Showcase */}
      <section id="projects" className="container section">
        <motion.h2 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="heading-section"
        >
          Selected Works.
        </motion.h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "4rem", marginTop: "2rem" }}>
          
          {/* Project 1: Carland360 */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
            style={{ 
              display: "grid", 
              gridTemplateColumns: "1fr", 
              gap: "2rem",
              borderTop: "1px solid var(--border-color)",
              paddingTop: "3rem"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <h3 style={{ fontSize: "2rem", fontWeight: 500, marginBottom: "0.5rem" }}>Carland360</h3>
                <p style={{ color: "var(--text-secondary)", maxWidth: "800px", lineHeight: 1.6 }}>
                  A comprehensive SaaS platform enabling professional vehicle inspections with digital reporting. Built from the ground up to handle multi-domain analytics, marketing automation, and business operations. Managed GTM setup for cross-domain tracking, integrated Freshsales CRM, and trained marketing interns.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1.5rem" }}>
                  {["React", "Node.js", "GTM", "Analytics"].map(tag => (
                     <span key={tag} style={{ border: "1px solid var(--border-color)", padding: "0.3rem 0.6rem", borderRadius: "6px", fontSize: "0.8rem", color: "var(--text-secondary)" }}>{tag}</span>
                  ))}
                </div>
              </div>
              <div className="pill">Founder & Engineer</div>
            </div>
          </motion.div>

          {/* Project 2: Marketfeed Systems */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
            style={{ 
              display: "grid", 
              gridTemplateColumns: "1fr", 
              gap: "2rem",
              borderTop: "1px solid var(--border-color)",
              paddingTop: "3rem"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <h3 style={{ fontSize: "2rem", fontWeight: 500, marginBottom: "0.5rem" }}>Marketfeed Systems</h3>
                <p style={{ color: "var(--text-secondary)", maxWidth: "800px", lineHeight: 1.6 }}>
                  Built a cross-platform workshop registration system with CRM lead capture across 6 domains. Developed the entire form infrastructure powering lead generation, offline event support, WhatsApp group integrations, and conversion attribution. Authored a private React component library used across the org.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1.5rem" }}>
                   {["Next.js", "Firebase", "Styled Components", "Cypress"].map(tag => (
                     <span key={tag} style={{ border: "1px solid var(--border-color)", padding: "0.3rem 0.6rem", borderRadius: "6px", fontSize: "0.8rem", color: "var(--text-secondary)" }}>{tag}</span>
                  ))}
                </div>
              </div>
              <div className="pill">Frontend Dev</div>
            </div>
          </motion.div>

          {/* Project 3: Financial Calculators & Web Stories */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
            style={{ 
              display: "grid", 
              gridTemplateColumns: "1fr", 
              gap: "2rem",
              borderTop: "1px solid var(--border-color)",
              paddingTop: "3rem"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <h3 style={{ fontSize: "2rem", fontWeight: 500, marginBottom: "0.5rem" }}>Financial Calculators & Web Stories</h3>
                <p style={{ color: "var(--text-secondary)", maxWidth: "800px", lineHeight: 1.6 }}>
                  Built the financial calculator suite from scratch (144 PRs), developing complex logic and integrating registration across pages. Also engineered the mobile WebView support platform (56 PRs) bridging native apps and web content, and launched a custom web stories platform focusing on SEO and XSS security.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1.5rem" }}>
                   {["React 18", "Next.js", "Mixpanel", "SEO/Lighthouse"].map(tag => (
                     <span key={tag} style={{ border: "1px solid var(--border-color)", padding: "0.3rem 0.6rem", borderRadius: "6px", fontSize: "0.8rem", color: "var(--text-secondary)" }}>{tag}</span>
                  ))}
                </div>
              </div>
              <div className="pill">Frontend Dev</div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {mounted ? new Date().getFullYear() : "2026"} John Loui. Built with Precision.</p>
      </footer>
    </main>
  );
}
