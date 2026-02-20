import { useState, useEffect, useRef } from 'react'
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

interface ProjectModalProps {
  repo: Repo
  onClose: () => void
}

function ProjectModal({ repo, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [onClose])

  const getLangColor = (lang: string) => {
    const colors: Record<string, string> = {
      TypeScript: '#3178c6', JavaScript: '#f7df1e', Python: '#3776ab', 
      HTML: '#e34c26', CSS: '#563d7c', Shell: '#89e051'
    }
    return colors[lang] || '#6e7681'
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[90vh] bg-zinc-900 rounded-3xl overflow-hidden border border-white/10"
      >
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-white/10">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold mb-2">{repo.name}</h2>
              <div className="flex items-center gap-4 text-sm text-white/50">
                {repo.language && (
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: getLangColor(repo.language) }} />
                    {repo.language}
                  </span>
                )}
                <span>⭐ {repo.stargazers_count}</span>
                <span>🍴 {repo.forks_count}</span>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Live Preview */}
          {repo.homepage && (
            <div className="mb-8">
              <h3 className="text-sm font-medium text-white/50 mb-3 uppercase tracking-wider">Live Preview</h3>
              <div className="rounded-xl overflow-hidden border border-white/10 bg-black">
                <iframe 
                  src={repo.homepage}
                  className="w-full h-[300px] md:h-[400px]"
                  title={repo.name}
                />
              </div>
            </div>
          )}

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-white/50 mb-3 uppercase tracking-wider">About</h3>
            <p className="text-white/80 text-lg leading-relaxed">
              {repo.description || 'No description available for this project.'}
            </p>
          </div>

          {/* Topics */}
          {repo.topics && repo.topics.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-medium text-white/50 mb-3 uppercase tracking-wider">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {repo.topics.map((topic) => (
                  <span key={topic} className="px-4 py-2 bg-indigo-500/20 text-indigo-300 rounded-full text-sm">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-4">
            <a 
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform"
            >
              View on GitHub
            </a>
            {repo.homepage && (
              <a 
                href={repo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border border-white/20 rounded-full hover:bg-white/10 transition-colors"
              >
                Visit Live Site
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

  useEffect(() => {
    fetch('https://api.github.com/users/M-Destiny/repos?sort=updated&per_page=12')
      .then(res => res.json())
      .then(data => setRepos(data.filter((r: Repo) => !r.fork)))
      .finally(() => setLoaded(true))
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const getLangColor = (lang: string) => {
    const colors: Record<string, string> = {
      TypeScript: '#3178c6', JavaScript: '#f7df1e', Python: '#3776ab', 
      HTML: '#e34c26', CSS: '#563d7c', Shell: '#89e051'
    }
    return colors[lang] || '#6e7681'
  }

  // Map repos to their live URLs
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
    <div className="bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex justify-between items-center bg-black/50 backdrop-blur-xl border-b border-white/5">
        <button onClick={() => scrollTo('home')} className="text-xl font-bold">
          MEHUL
        </button>
        <div className="flex gap-6 text-sm">
          {['About', 'Projects', 'Contact'].map(item => (
            <button 
              key={item} 
              onClick={() => scrollTo(item.toLowerCase())} 
              className="text-white/70 hover:text-white transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="h-screen relative flex items-center justify-center overflow-hidden">
        <Hero3D />
        
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-6"
        >
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-indigo-400 tracking-[0.3em] uppercase text-sm mb-4"
          >
            Full Stack Developer
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold tracking-tight mb-4"
          >
            Hello, I'm <span className="text-indigo-400">Mehul</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/60 text-lg md:text-xl max-w-lg mx-auto mb-8"
          >
            I build stunning digital experiences with code
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button 
              onClick={() => scrollTo('projects')}
              className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform"
            >
              View Projects
            </button>
            <button 
              onClick={() => scrollTo('contact')}
              className="px-8 py-4 border border-white/20 rounded-full hover:bg-white/10 transition-colors"
            >
              Contact Me
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1 h-2 bg-white/60 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-white/50 uppercase tracking-widest text-sm mb-4">About Me</p>
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              Building <span className="text-indigo-400">amazing things</span> with code
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              I'm a passionate developer who loves creating memorable digital experiences. 
              From immersive 3D websites to powerful backend systems, I bring ideas to life.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-6"
          >
            {[
              { num: '15+', label: 'Projects' },
              { num: '3+', label: 'Years Exp' },
              { num: '10+', label: 'Technologies' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 bg-zinc-900/50 rounded-2xl border border-white/5">
                <div className="text-3xl font-bold text-indigo-400 mb-1">{stat.num}</div>
                <div className="text-white/50 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-32 px-6 md:px-12 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-white/50 uppercase tracking-widest text-sm mb-4">Selected Work</p>
            <h2 className="text-4xl md:text-6xl font-bold">My <span className="text-purple-400">Projects</span></h2>
          </motion.div>

          {!loaded ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  {/* Preview Card */}
                  <div className="relative aspect-video bg-zinc-900 rounded-2xl overflow-hidden border border-white/10 mb-4">
                    {repo.homepage ? (
                      <iframe 
                        src={repo.homepage}
                        className="w-full h-full opacity-70 group-hover:opacity-100 transition-opacity"
                        title={repo.name}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl">📁</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                      <span className="px-4 py-2 bg-white text-black text-sm font-medium rounded-full">
                        View Details
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">
                    {repo.name}
                  </h3>
                  <p className="text-white/50 text-sm line-clamp-2 mb-3">
                    {repo.description || 'No description'}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-white/40">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getLangColor(repo.language) }} />
                        {repo.language}
                      </span>
                    )}
                    <span>⭐ {repo.stargazers_count}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-32 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-white/50 uppercase tracking-widest text-sm mb-4">Get In Touch</p>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Let's <span className="text-indigo-400">collaborate</span>
            </h2>
            <p className="text-white/60 text-lg mb-10">
              Have a project in mind? I'd love to hear from you.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <a href="https://github.com/M-Destiny" target="_blank" className="px-6 py-3 border border-white/10 rounded-full hover:bg-white/10 transition-colors">
                GitHub
              </a>
              <a href="https://linkedin.com/in/destinymehul" target="_blank" className="px-6 py-3 border border-white/10 rounded-full hover:bg-white/10 transition-colors">
                LinkedIn
              </a>
              <a href="mailto:mehulr2801@gmail.com" className="px-6 py-3 border border-white/10 rounded-full hover:bg-white/10 transition-colors">
                Email
              </a>
            </div>
            
            <a 
              href="mailto:mehulr2801@gmail.com"
              className="inline-block px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full hover:scale-105 transition-transform"
            >
              Say Hello 👋
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5 text-center text-white/30 text-sm">
        © {new Date().getFullYear()} Mehul. All rights reserved.
      </footer>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal repo={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  )
}
