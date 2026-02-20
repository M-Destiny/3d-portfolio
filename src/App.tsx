import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Hero3D from './components/3d/HeroScene'
import './styles.css'

interface Repo {
  id: number
  name: string
  description: string
  html_url: string
  homepage: string
  stargazers_count: number
  fork: boolean
}

function ParallaxBackground() {
  const { scrollY } = useScroll()
  
  const y1 = useTransform(scrollY, [0, 1000], [0, -150])
  const y2 = useTransform(scrollY, [0, 1000], [0, 150])
  const y3 = useTransform(scrollY, [0, 1000], [0, -100])

  return (
    <div className="parallax-bg">
      <motion.div style={{ y: y1 }} className="parallax-bg__circle parallax-bg__circle--1" />
      <motion.div style={{ y: y2 }} className="parallax-bg__circle parallax-bg__circle--2" />
      <motion.div style={{ y: y3 }} className="parallax-bg__circle parallax-bg__circle--3" />
    </div>
  )
}

function Header() {
  return (
    <header className="header">
      <a href="#home" className="header__logo">MEHUL</a>
      <nav className="header__nav">
        {['About', 'Projects', 'Contact'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="header__link">
            {item}
          </a>
        ))}
      </nav>
    </header>
  )
}

function Hero() {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <section id="home" className="hero">
      <Hero3D />
      
      <motion.div 
        style={{ opacity }}
        className="hero__content"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="hero__badge">Full Stack Developer</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hero__title"
        >
          Hello, I'm <span>Mehul</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hero__subtitle"
        >
          I build beautiful, functional digital experiences
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hero__buttons"
        >
          <a href="#projects" className="btn btn--primary">View Work</a>
          <a href="#contact" className="btn btn--secondary">Contact</a>
        </motion.div>
      </motion.div>

      <div className="scroll-indicator">
        <div className="scroll-indicator__box">
          <div className="scroll-indicator__dot" />
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section section--gray">
      <div className="container">
        <div className="section__header">
          <p className="section__label">About</p>
          <h2 className="section__title">
            I create digital experiences that <span>matter</span>
          </h2>
        </div>
        
        <div className="about__content">
          <p className="about__text">
            Full-stack developer passionate about building immersive web experiences. 
            From 3D websites to real-time applications, I bring ideas to life with clean code and thoughtful design.
          </p>
          
          <div className="about__stats">
            <div className="stat">
              <div className="stat__number">15+</div>
              <div className="stat__label">Projects</div>
            </div>
            <div className="stat">
              <div className="stat__number">3+</div>
              <div className="stat__label">Years</div>
            </div>
            <div className="stat">
              <div className="stat__number">10+</div>
              <div className="stat__label">Tech Stack</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Projects({ repos }: { repos: Repo[] }) {
  const projectLinks: Record<string, string> = {
    '3d-portfolio': 'https://3d-portfolio-ebon-rho.vercel.app',
    'mini-games-hub': 'https://mini-games-hub-rouge.vercel.app',
    'OmniTools': 'https://omni-tools.vercel.app',
    'json-deduplicator': 'https://json-deduplicator.vercel.app',
    'minesweeper-clawe': 'https://minesweeper-clawe.vercel.app',
  }

  const getProjectIcon = (name: string) => {
    const icons: Record<string, string> = {
      '3d-portfolio': '🎨',
      'mini-games-hub': '🎮',
      'OmniTools': '🛠️',
      'json-deduplicator': '📋',
      'minesweeper-clawe': '💣',
    }
    return icons[name] || '📦'
  }

  const reposWithHomepage = repos.map(repo => ({
    ...repo,
    homepage: repo.homepage || projectLinks[repo.name] || ''
  }))

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section__header">
          <p className="section__label">Projects</p>
          <h2 className="section__title">Selected Work</h2>
        </div>

        <div className="projects__list">
          {reposWithHomepage.slice(0, 8).map((repo) => (
            <div key={repo.id} className="project-item">
              <div className="project-item__icon">
                {getProjectIcon(repo.name)}
              </div>
              <div className="project-item__content">
                <h3 className="project-item__title">{repo.name}</h3>
                <p className="project-item__desc">
                  {repo.description || 'No description available for this project.'}
                </p>
                <div className="project-item__buttons">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-item__btn project-item__btn--github"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                  {repo.homepage && (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-item__btn project-item__btn--live"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                      </svg>
                      Live
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="section section--gray">
      <div className="container">
        <div className="contact__content">
          <div className="section__header">
            <p className="section__label">Contact</p>
            <h2 className="section__title">Let's work together</h2>
          </div>
          
          <p className="contact__text">
            Have a project in mind? Get in touch.
          </p>
          
          <div className="contact__socials">
            <a href="https://github.com/M-Destiny" target="_blank" className="contact__social">
              GitHub
            </a>
            <a href="https://linkedin.com/in/destinymehul" target="_blank" className="contact__social">
              LinkedIn
            </a>
            <a href="mailto:mehulr2801@gmail.com" className="contact__social">
              Email
            </a>
          </div>
          
          <a 
            href="mailto:mehulr2801@gmail.com"
            className="btn btn--primary"
          >
            Say Hello
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__text">© {new Date().getFullYear()} Mehul</p>
        <p className="footer__text">Built with React</p>
      </div>
    </footer>
  )
}

export default function App() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch('https://api.github.com/users/M-Destiny/repos?sort=updated&per_page=12')
      .then(res => res.json())
      .then(data => setRepos(data.filter((r: Repo) => !r.fork)))
      .finally(() => setLoaded(true))
  }, [])

  return (
    <div className="app">
      <ParallaxBackground />
      <Header />
      <Hero />
      <About />
      {loaded && <Projects repos={repos} />}
      <Contact />
      <Footer />
    </div>
  )
}
