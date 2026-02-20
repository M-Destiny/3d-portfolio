import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface Repo {
  id: number
  name: string
  description: string
  html_url: string
  homepage: string
  stargazers_count: number
  forks_count: number
  language: string
  fork: boolean
}

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <a href="#home" className="text-lg font-bold tracking-tight hover:text-gray-600 transition-colors">
        MEHUL
      </a>
      <nav className="flex gap-8">
        {['About', 'Projects', 'Contact'].map((item) => (
          <a 
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-sm text-gray-500 hover:text-black transition-colors"
          >
            {item}
          </a>
        ))}
      </nav>
    </header>
  )
}

function Hero() {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-8 py-32">
      <motion.div 
        style={{ opacity }}
        className="text-center max-w-2xl mx-auto"
      >
        <p className="text-sm text-gray-500 uppercase tracking-widest mb-4">Full Stack Developer</p>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          Hello, I'm Mehul
        </h1>
        <p className="text-gray-600 text-lg mb-10 max-w-lg mx-auto">
          I build beautiful, functional digital experiences
        </p>
        <div className="flex gap-4 justify-center">
          <a href="#projects" className="px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-colors">
            View Work
          </a>
          <a href="#contact" className="px-8 py-3 border border-gray-300 rounded-full hover:border-black transition-colors">
            Contact
          </a>
        </div>
      </motion.div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="py-32 px-8 bg-gray-50">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-sm text-gray-500 uppercase tracking-widest mb-4">About</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          I create digital experiences that matter
        </h2>
        <p className="text-gray-600 leading-relaxed text-lg">
          Full-stack developer passionate about building immersive web experiences. 
          From 3D websites to real-time applications, I bring ideas to life with clean code and thoughtful design.
        </p>
        <div className="flex justify-center gap-12 mt-12">
          {[
            { num: '15+', label: 'Projects' },
            { num: '3+', label: 'Years' },
            { num: '10+', label: 'Tech' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold">{stat.num}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
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
    <section id="projects" className="py-32 px-8">
      <div className="max-w-5xl mx-auto">
        <p className="text-sm text-gray-500 uppercase tracking-widest mb-4">Projects</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Selected Work</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reposWithHomepage.slice(0, 9).map((repo) => (
            <a
              key={repo.id}
              href={repo.homepage || repo.html_url}
              target="_blank"
              className="group block"
            >
              <div className="aspect-video bg-gray-100 rounded-xl mb-4 overflow-hidden">
                {repo.homepage ? (
                  <iframe 
                    src={repo.homepage}
                    className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500"
                    title={repo.name}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <span className="text-4xl">📁</span>
                  </div>
                )}
              </div>
              <h3 className="font-semibold mb-1 group-hover:text-gray-600 transition-colors">
                {repo.name}
              </h3>
              <p className="text-gray-500 text-sm line-clamp-2">
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
    <section id="contact" className="py-32 px-8 bg-gray-50">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-sm text-gray-500 uppercase tracking-widest mb-4">Contact</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's work together</h2>
        <p className="text-gray-600 mb-8">
          Have a project in mind? Get in touch.
        </p>
        
        <div className="flex gap-4 justify-center mb-8">
          {[
            { name: 'GitHub', url: 'https://github.com/M-Destiny' },
            { name: 'LinkedIn', url: 'https://linkedin.com/in/destinymehul' },
          ].map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              className="px-5 py-2 border border-gray-300 rounded-full hover:border-black transition-colors text-sm"
            >
              {social.name}
            </a>
          ))}
        </div>
        
        <a 
          href="mailto:mehulr2801@gmail.com"
          className="inline-block px-10 py-4 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-colors"
        >
          Say Hello
        </a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-8 px-8 border-t border-gray-100">
      <div className="max-w-5xl mx-auto flex justify-between items-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Mehul</p>
        <p>Built with React</p>
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
    <div className="bg-white text-black min-h-screen">
      <Header />
      <Hero />
      <About />
      {loaded && <Projects repos={repos} />}
      <Contact />
      <Footer />
    </div>
  )
}
