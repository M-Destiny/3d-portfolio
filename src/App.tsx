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

        <div className="projects__grid">
          {reposWithHomepage.slice(0, 9).map((repo) => (
            <a
              key={repo.id}
              href={repo.homepage || repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card"
            >
              <div className="project-card__preview">
                {repo.homepage ? (
                  <iframe 
                    src={repo.homepage}
                    title={repo.name}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#404040', fontSize: '2rem' }}>
                    📁
                  </div>
                )}
              </div>
              <h3 className="project-card__title">{repo.name}</h3>
              <p className="project-card__desc">
                {repo.description || 'No description'}
              </p>
            </a>
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
      <Header />
      <Hero />
      <About />
      {loaded && <Projects repos={repos} />}
      <Contact />
      <Footer />
    </div>
  )
}
