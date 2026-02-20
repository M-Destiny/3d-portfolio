import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Hero3D from './components/3d/HeroScene'

interface Repo {
  id: number
  name: string
  description: string
  html_url: string
  homepage: string
  stargazers_count: number
  forks_count: number
  language: string
  topics: string[]
  fork: boolean
}

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-black/60 backdrop-blur-xl border-b border-white/5">
      <a href="#home" className="text-xl font-bold hover:text-indigo-400 transition-colors">
        MEHUL
      </a>
      <nav className="hidden md:flex gap-8">
        {[
          { name: 'About', href: '#about' },
          { name: 'Projects', href: '#projects' },
          { name: 'Contact', href: '#contact' }
        ].map((item) => (
          <a 
            key={item.name}
            href={item.href}
            className="text-sm text-zinc-400 hover:text-white transition-colors relative group"
          >
            {item.name}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300" />
          </a>
        ))}
      </nav>
      <a href="#contact" className="md:hidden px-4 py-2 text-sm bg-white text-black font-medium rounded-full">
        Let's Talk
      </a>
    </header>
  )
}

function ProjectModal({ repo, onClose }: { repo: Repo; onClose: () => void }) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
      
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="relative w-full max-w-3xl bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl shadow-indigo-500/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-5 border-b border-zinc-800">
          <h2 className="text-xl font-bold">{repo.name}</h2>
          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors text-zinc-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="p-5 max-h-[70vh] overflow-y-auto">
          {repo.homepage && (
            <div className="mb-5 rounded-xl overflow-hidden border border-zinc-800">
              <iframe 
                src={repo.homepage} 
                className="w-full h-56 md:h-72" 
                title={repo.name}
              />
            </div>
          )}
          
          <p className="text-zinc-400 mb-5 leading-relaxed">
            {repo.description || 'No description available for this project.'}
          </p>
          
          <div className="flex flex-wrap gap-3">
            <a 
              href={repo.html_url} 
              target="_blank" 
              className="px-5 py-2.5 bg-white text-black font-medium rounded-lg hover:bg-zinc-200 transition-colors text-sm"
            >
              View Code
            </a>
            {repo.homepage && (
              <a 
                href={repo.homepage} 
                target="_blank" 
                className="px-5 py-2.5 border border-zinc-700 rounded-lg hover:bg-zinc-900 transition-colors text-sm"
              >
                Visit Site
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function App() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [loaded, setLoaded] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Repo | null>(null)
  const { scrollY } = useScroll()
  
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.95])

  useEffect(() => {
    fetch('https://api.github.com/users/M-Destiny/repos?sort=updated&per_page=12')
      .then(res => res.json())
      .then(data => setRepos(data.filter((r: Repo) => !r.fork)))
      .finally(() => setLoaded(true))
  }, [])

  const projectLinks: Record<string, string> = {
    '3d-portfolio': 'https://3d-portfolio-ebon-rho.vercel.app',
    'mini-games-hub': 'https://mini-games-hub-rouge.vercel.app',
    'OmniTools': 'https://omni-tools.vercel.app',
    'json-deduplicator': 'https://json-deduplicator.vercel.app',
    'minesweeper-clawe': 'https://minesweeper-clawe.vercel.app',
  }

  const reposWithHomepage = repos.map(repo => ({
    ...repo,
    homepage: repo.homepage || projectLinks[repo.name] || ''
  }))

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      <Header />

      {/* HERO */}
      <section id="home" className="h-screen relative flex items-center justify-center overflow-hidden">
        <Hero3D />
        
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 text-center px-4 max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4"
          >
            <span className="inline-block px-4 py-1.5 bg-indigo-500/20 text-indigo-400 text-xs uppercase tracking-[0.2em] rounded-full">
              Full Stack Developer
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
          >
            Hello, I'm <span className="text-indigo-400">Mehul</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-zinc-400 text-lg md:text-xl mb-10 max-w-lg mx-auto leading-relaxed"
          >
            I build beautiful, functional, and immersive digital experiences
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a 
              href="#projects" 
              className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 hover:shadow-lg hover:shadow-white/20 transition-all duration-300"
            >
              View My Work
            </a>
            <a 
              href="#contact" 
              className="px-8 py-4 border border-zinc-700 text-white font-medium rounded-full hover:bg-zinc-900 hover:border-zinc-600 transition-all duration-300"
            >
              Get In Touch
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-7 h-12 rounded-full border-2 border-zinc-700 flex justify-center pt-2">
            <motion.div 
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-zinc-500 rounded-full" 
            />
          </div>
        </motion.div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 md:py-36 px-6 bg-zinc-950/50">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <span className="text-indigo-400 text-xs uppercase tracking-[0.2em]">About Me</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-8 leading-tight"
          >
            I create digital experiences that{' '}
            <span className="text-indigo-400">inspire</span> and{' '}
            <span className="text-pink-400">engage</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-zinc-400 text-lg leading-relaxed mb-12"
          >
            I'm a passionate full-stack developer who loves bringing ideas to life through code. 
            From stunning 3D websites to powerful backend systems, I focus on creating 
            memorable user experiences that make an impact.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-4 md:gap-8"
          >
            {[
              { num: '15+', label: 'Projects' },
              { num: '3+', label: 'Years Exp' },
              { num: '10+', label: 'Technologies' },
            ].map((stat, i) => (
              <div 
                key={i} 
                className="p-5 md:p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800"
              >
                <div className="text-2xl md:text-4xl font-bold text-indigo-400 mb-1">{stat.num}</div>
                <div className="text-zinc-500 text-xs md:text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-28 md:py-36 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-16"
          >
            <span className="text-indigo-400 text-xs uppercase tracking-[0.2em]">Projects</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2">Selected Work</h2>
          </motion.div>

          {!loaded ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {reposWithHomepage.slice(0, 9).map((repo, i) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedProject(repo)}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-video bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 mb-4">
                    {repo.homepage ? (
                      <iframe 
                        src={repo.homepage}
                        className="w-full h-full object-cover"
                        title={repo.name}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-zinc-700">
                        <span className="text-4xl">📦</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <span className="px-5 py-2 bg-white text-black text-sm font-semibold rounded-full transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        View Details
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-indigo-400 transition-colors truncate">
                    {repo.name}
                  </h3>
                  <p className="text-zinc-500 text-sm line-clamp-2 h-10 overflow-hidden">
                    {repo.description || 'No description'}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-28 md:py-36 px-6 bg-zinc-950/50">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-indigo-400 text-xs uppercase tracking-[0.2em]">Get In Touch</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-6">Let's work together</h2>
            <p className="text-zinc-400 text-lg mb-10 leading-relaxed">
              Have a project in mind or want to collaborate? I'd love to hear from you.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {[
                { name: 'GitHub', url: 'https://github.com/M-Destiny' },
                { name: 'LinkedIn', url: 'https://linkedin.com/in/destinymehul' },
                { name: 'Email', url: 'mailto:mehulr2801@gmail.com' }
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  className="px-6 py-3 border border-zinc-700 rounded-full hover:bg-zinc-900 hover:border-zinc-600 transition-all duration-300 text-sm font-medium"
                >
                  {social.name}
                </a>
              ))}
            </div>
            
            <a 
              href="mailto:mehulr2801@gmail.com"
              className="inline-block px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300"
            >
              Say Hello 👋
            </a>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} Mehul. All rights reserved.
          </p>
          <p className="text-zinc-600 text-sm">
            Built with React & Three.js
          </p>
        </div>
      </footer>

      {selectedProject && (
        <ProjectModal repo={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  )
}
