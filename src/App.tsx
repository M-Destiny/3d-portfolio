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

function ProjectModal({ repo, onClose }: { repo: Repo; onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null)

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/90" />
      
      <motion.div 
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800"
      >
        <div className="flex justify-between items-center p-6 border-b border-zinc-800">
          <h2 className="text-2xl font-bold">{repo.name}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors">
            ✕
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {repo.homepage && (
            <div className="mb-6">
              <iframe src={repo.homepage} className="w-full h-64 rounded-lg border border-zinc-800" title={repo.name} />
            </div>
          )}
          
          <p className="text-zinc-400 mb-6">{repo.description || 'No description'}</p>
          
          <div className="flex gap-3">
            <a href={repo.html_url} target="_blank" className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-zinc-200 transition-colors">
              GitHub
            </a>
            {repo.homepage && (
              <a href={repo.homepage} target="_blank" className="px-6 py-3 border border-zinc-700 rounded-lg hover:bg-zinc-900 transition-colors">
                Live
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
  
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])

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
    <div className="bg-black text-white min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-5 flex justify-between items-center bg-black/80 backdrop-blur-sm">
        <button className="text-xl font-bold">MEHUL</button>
        <div className="flex gap-8 text-sm">
          <a href="#about" className="text-zinc-400 hover:text-white transition-colors">About</a>
          <a href="#projects" className="text-zinc-400 hover:text-white transition-colors">Projects</a>
          <a href="#contact" className="text-zinc-400 hover:text-white transition-colors">Contact</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="h-screen relative flex items-center justify-center">
        <Hero3D />
        
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-4">
          <p className="text-indigo-400 text-sm uppercase tracking-widest mb-4">Full Stack Developer</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Hello, I'm Mehul</h1>
          <p className="text-zinc-400 text-lg mb-8 max-w-md mx-auto">Building beautiful digital experiences</p>
          
          <div className="flex gap-4 justify-center">
            <a href="#projects" className="px-8 py-3 bg-white text-black font-medium rounded-full hover:scale-105 transition-transform">
              View Work
            </a>
            <a href="#contact" className="px-8 py-3 border border-zinc-700 rounded-full hover:bg-zinc-900 transition-colors">
              Contact
            </a>
          </div>
        </motion.div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-zinc-500 uppercase tracking-widest text-sm mb-4">About</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">I create things that <span className="text-indigo-400">work beautifully</span></h2>
          <p className="text-zinc-400 leading-relaxed">
            Full stack developer passionate about building immersive web experiences. 
            From 3D websites to real-time applications, I love bringing ideas to life.
          </p>
          
          <div className="flex justify-center gap-8 mt-10">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-400">15+</div>
              <div className="text-zinc-500 text-sm">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-400">3+</div>
              <div className="text-zinc-500 text-sm">Years</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-400">10+</div>
              <div className="text-zinc-500 text-sm">Tech</div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-24 px-6 bg-zinc-950">
        <div className="max-w-5xl mx-auto">
          <p className="text-zinc-500 uppercase tracking-widest text-sm mb-4">Projects</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Selected Work</h2>

          {!loaded ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reposWithHomepage.slice(0, 9).map((repo) => (
                <div
                  key={repo.id}
                  onClick={() => setSelectedProject(repo)}
                  className="cursor-pointer group"
                >
                  <div className="aspect-video bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 mb-4 relative">
                    {repo.homepage ? (
                      <iframe src={repo.homepage} className="w-full h-full" title={repo.name} />
                    ) : (
                      <div className="flex items-center justify-center h-full text-zinc-700">No Preview</div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-4 py-2 bg-white text-black text-sm font-medium rounded-full">View</span>
                    </div>
                  </div>
                  
                  <h3 className="font-bold mb-1 group-hover:text-indigo-400 transition-colors">{repo.name}</h3>
                  <p className="text-zinc-500 text-sm line-clamp-2">{repo.description || 'No description'}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-zinc-500 uppercase tracking-widest text-sm mb-4">Contact</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's work together</h2>
          <p className="text-zinc-400 mb-8">Have a project in mind? Get in touch.</p>
          
          <div className="flex gap-4 justify-center mb-8">
            <a href="https://github.com/M-Destiny" className="px-5 py-2 border border-zinc-800 rounded-lg hover:bg-zinc-900 transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/destinymehul" className="px-5 py-2 border border-zinc-800 rounded-lg hover:bg-zinc-900 transition-colors">LinkedIn</a>
            <a href="mailto:mehulr2801@gmail.com" className="px-5 py-2 border border-zinc-800 rounded-lg hover:bg-zinc-900 transition-colors">Email</a>
          </div>
          
          <a href="mailto:mehulr2801@gmail.com" className="inline-block px-10 py-4 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 transition-colors">
            Say Hello
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-zinc-900 text-center text-zinc-600 text-sm">
        © {new Date().getFullYear()} Mehul
      </footer>

      {selectedProject && <ProjectModal repo={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  )
}
