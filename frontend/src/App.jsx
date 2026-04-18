import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  // Scroll reveal and active nav tracking
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    const handleScroll = () => {
      const sections = document.querySelectorAll('.section-nav');
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= (sectionTop - 120)) {
          current = section.getAttribute('id');
        }
      });
      setActiveNav(current || 'home');
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuActive(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'https://portfolio-backend-07u8.onrender.com';
      const response = await axios.post(`${API_URL}/api/query`, formData);
      if (response.status === 200) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      setStatus('Failed to send message. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="App">
      {/* NAV */}
      <nav>
        <div className="nav-logo">MSK</div>
        <div className={`nav-links ${isMenuActive ? 'active' : ''}`} id="nav-links">
          <a href="#about" className={`nav-item ${activeNav === 'about' ? 'active' : ''}`} onClick={(e) => handleNavClick(e, 'about')}>About</a>
          <a href="#skills" className={`nav-item ${activeNav === 'skills' ? 'active' : ''}`} onClick={(e) => handleNavClick(e, 'skills')}>Skills</a>
          <a href="#projects" className={`nav-item ${activeNav === 'projects' ? 'active' : ''}`} onClick={(e) => handleNavClick(e, 'projects')}>Projects</a>
          <a href="#contact" className={`nav-item ${activeNav === 'contact' ? 'active' : ''}`} onClick={(e) => handleNavClick(e, 'contact')}>Contact</a>
        </div>
        <div className={`menu-toggle ${isMenuActive ? 'is-active' : ''}`} id="mobile-menu" onClick={toggleMenu}>
          <span className="bar"></span>
          <span class="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero section-nav" id="home">
        <div className="hero-left reveal">
          <div className="hero-eyebrow">
            <div className="hero-eyebrow-line"></div>
            <span className="hero-eyebrow-text">Student by title, developer by practice</span>
          </div>
          <h1 className="hero-name">Milan<br /><em>Singh</em><br />Khati</h1>
          <p className="hero-tagline">
            I'm a front-end developer who likes building things that actually work. I write clean code, care about details, and enjoy solving problems with software!!!
          </p>
          <div className="hero-btns">
            <a href="#projects" className="btn btn-primary" onClick={(e) => handleNavClick(e, 'projects')}>See My Work →</a>
            <a href="/resume.pdf" download="Milan_Singh_Resume.pdf" className="btn btn-ghost">Download CV ↓</a>
            <a href="#contact" className="btn btn-ghost" onClick={(e) => handleNavClick(e, 'contact')}>Get In Touch</a>
          </div>
        </div>
        <div className="hero-right reveal d1">
          <div className="hero-image-wrapper">
            <img src="/port_02.jpeg" alt="Milan Singh Khati" className="hero-img" />
          </div>
          <div className="hero-availability">
            <div className="dot"></div>
            Open to opportunities
          </div>
          <div className="hero-quote-box">
            <p className="hero-quote-text">Good design is not just how something looks — it's how something works, feels, and holds together over time.</p>
            <div className="hero-quote-attr">— My approach to building</div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about-strip section-nav" id="about">
        <div className="about-inner reveal">
          <div className="about-big">A developer<br />who <em>builds</em><br />things.</div>
          <div className="about-body">
            <p>
              I am Milan Singh Khati, a developer driven by the challenge of turning complex problems into elegant, functional digital solutions. My journey in tech started with a curiosity about how things work, which quickly evolved into a passion for creating software that makes a real impact.
            </p>
            <p>
              Currently, I focus on <strong>Front-end Development</strong>. I don't just write code; I design experiences that are intuitive and robust.
            </p>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="skills-bg section-nav" id="skills">
        <div className="skills-layout">
          <div className="skills-sidebar reveal">
            <div className="sec-eyebrow">
              <div className="sec-eyebrow-line"></div>
              <span className="sec-eyebrow-text">Tools &amp; Tech</span>
            </div>
            <h2 className="sec-title" style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', marginBottom: '20px' }}>
              What I<br />work<br /><em>with</em>
            </h2>
            <p>Languages, tools, and areas I've actually used in projects and coursework — not just things I've heard of.</p>
          </div>
          <div className="skills-grid reveal d1">
            {['Python', 'HTML', 'CSS', 'JavaScript', 'GitHub', 'VS Code'].map((skill, index) => (
              <div key={index} className="skill-cell">
                <div className="skill-cell-name">{skill}</div>
                <div className="skill-cell-cat">{skill === 'Python' || skill === 'JavaScript' ? 'Language' : skill === 'HTML' ? 'Markup' : skill === 'CSS' ? 'Styling' : skill === 'GitHub' ? 'Version Control' : 'Tool'}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section-nav">
        <div className="sec-eyebrow reveal">
          <div className="sec-eyebrow-line"></div>
          <span className="sec-eyebrow-text">Selected Work</span>
        </div>
        <h2 className="sec-title reveal">Things I've <em>built</em></h2>
        <div className="projects-grid reveal">
          <div className="project-card featured">
            <div className="project-num">01</div>
            <div className="project-tag">Python · AI · Computer Vision</div>
            <div className="project-name">Virtual Air Mouse</div>
            <div className="project-desc">
              A mouse controller that uses your hand instead of hardware. It tracks your index finger in real time using a webcam and translates gestures into cursor movement, clicks, and scrolling. No physical mouse needed — just your hand in front of a camera. The system has a registered copyright!!
            </div>
            <a href="https://github.com/milan-3318/AirMouse" target="_blank" rel="noopener noreferrer" className="project-link">
              View on GitHub
              <svg viewBox="0 0 24 24" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>

          <div className="project-card">
            <div className="project-num">02</div>
            <div className="project-tag">Web · JavaScript · MERN</div>
            <div className="project-name">Eco Warrior</div>
            <div className="project-desc">
              An interactive web game that teaches proper waste segregation in a way that's actually fun. Players sort different types of waste into the correct bins under time pressure. Built with HTML, CSS, JavaScript, and the MERN stack. Tracks scores so players can improve over time.
            </div>
            <a href="https://eco-18.onrender.com/" target="_blank" rel="noopener noreferrer" className="project-link">
              View Live
              <svg viewBox="0 0 24 24" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section-nav">
        <div className="contact-inner reveal">
          <div>
            <div className="sec-eyebrow">
              <div className="sec-eyebrow-line"></div>
              <span className="sec-eyebrow-text">Say Hello!!</span>
            </div>
            <div className="contact-left-title">Let's work<br /><em>together.</em></div>
            <p className="contact-left-sub">
              I'm open to internships, freelance work, and interesting side projects. If you have something in mind, just reach out — I don't bite!!
            </p>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  value={formData.name} 
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  value={formData.email} 
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                  required 
                />
              </div>
              <div className="form-group">
                <textarea 
                  placeholder="Your Message" 
                  value={formData.message} 
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })} 
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
              {status && <p className="form-status">{status}</p>}
            </form>
          </div>
          <div className="contact-links">
            <a href="mailto:Khatimilan3318@gmail.com" className="contact-row">
              <div className="contact-row-icon">✉</div>
              <div>
                <div className="contact-row-label">Email</div>
                <div className="contact-row-val">Khatimilan3318@gmail.com</div>
              </div>
            </a>
            {/* ... other contact links ... */}
            <a href="https://github.com/milan-3318" target="_blank" rel="noopener noreferrer" className="contact-row">
              <div className="contact-row-icon" style={{ fontSize: '12px', fontWeight: 600 }}>GH</div>
              <div>
                <div className="contact-row-label">GitHub</div>
                <div className="contact-row-val">github.com/milan-3318</div>
              </div>
            </a>
            <a href="https://www.linkedin.com/in/milan-singh-khati-231417351" target="_blank" rel="noopener noreferrer" className="contact-row">
              <div className="contact-row-icon" style={{ fontSize: '12px', fontWeight: 600 }}>in</div>
              <div>
                <div className="contact-row-label">LinkedIn</div>
                <div className="contact-row-val">milan-singh-khati</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <span>© 2025 Milan Singh Khati</span>
        <span>Built with <span className="accent">craft</span> &amp; care</span>
      </footer>
    </div>
  );
}

export default App;
