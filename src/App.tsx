import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Hero3D from './components/3d/HeroScene'

interface Repo {
  id: number
  name: string
  description: string
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string
  fork: boolean
}

export default function App() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [loaded, setLoaded] = useState(false)
  const { scrollY } = useScroll()
  
  const y1 = useTransform(scrollY, [0, 1000], [0, 300])
  const y2 = useTransform(scrollY, [0, 1000], [0, -300])
  const opacity = useTransform(scrollY, [0, 500], [1, 0])

  useEffect(() => {
    fetch('https://api.github.com/users/M-Destiny/repos?sort=updated&per_page=12')
      .then(res => res.json())
      .then(data => setRepos(data.filter((r: Repo) => !r.fork)))
      .finally(() => setLoaded(true))
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center mix-blend-difference">
        <button onClick={() => scrollTo('home')} className="text-2xl font-bold tracking-tighter">
          <span className="text-cyan-400">M</span>EHUL
        </button>
        <div className="flex gap-8 text-sm">
          {['About', 'Work', 'Skills', 'Contact'].map(item => (
            <button key={item} onClick={() => scrollTo(item.toLowerCase())} 
              className="hover:text-cyan-400 transition-colors">
              {item}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="h-screen relative flex items-center justify-center">
        <Hero3D />
        
        <motion.div 
          style={{ y: y1, opacity }}
          className="relative z-10 text-center px-6"
        >
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-cyan-400 tracking-[0.3em] text-xs uppercase mb-6"
          >
            Full Stack Developer
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-7xl md:text-9xl font-black tracking-tighter mb-6"
          >
            <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
              MEHUL
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto mb-10"
          >
            Crafting immersive digital experiences with code
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center gap-4"
          >
            <button onClick={() => scrollTo('work')}
              className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform">
              View Work
            </button>
            <button onClick={() => scrollTo('contact')}
              className="px-8 py-4 border border-white/20 rounded-full hover:border-cyan-400 hover:text-cyan-400 transition-colors">
              Contact
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* About */}
      <section id="about" className="min-h-screen py-40 px-8 relative">
        <motion.div style={{ y: y2 }} className="max-w-6xl mx-auto">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-cyan-400 tracking-[0.3em] text-xs uppercase mb-4"
          >
            About
          </motion.p>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-12"
          >
            Building the
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              extraordinary
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-16">
            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-gray-400 text-lg leading-relaxed"
            >
              I'm a developer who loves creating memorable digital experiences. 
              From 3D webGL experiences to robust backend systems, I build 
              things that make an impact.
            </motion.p>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: '15+', label: 'Projects' },
                { num: '3+', label: 'Years Exp' },
                { num: '10+', label: 'Technologies' },
                { num: '100%', label: 'Dedication' }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 border border-white/10 rounded-2xl"
                >
                  <div className="text-3xl font-bold text-cyan-400">{stat.num}</div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Work */}
      <section id="work" className="min-h-screen py-40 px-8 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-cyan-400 tracking-[0.3em] text-xs uppercase mb-4"
          >
            Selected Work
          </motion.p>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-16"
          >
            Featured
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              Projects
            </span>
          </motion.h2>

          {!loaded ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.slice(0, 9).map((repo, i) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="group p-8 border border-white/10 rounded-3xl bg-black/50 backdrop-blur-sm hover:border-cyan-500/50 transition-all"
                >
                  <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
                    {repo.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-6 line-clamp-3">
                    {repo.description || 'No description'}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    {repo.language && (
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-400" />
                        {repo.language}
                      </span>
                    )}
                    <span>⭐ {repo.stargazers_count}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="min-h-screen py-40 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-cyan-400 tracking-[0.3em] text-xs uppercase mb-4"
          >
            Expertise
          </motion.p>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-16"
          >
            Skills &
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
              Technologies
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Frontend', skills: ['React', 'TypeScript', 'Three.js', 'Framer Motion', 'Tailwind'] },
              { title: 'Backend', skills: ['Node.js', 'Python', 'PostgreSQL', 'Socket.io', 'REST APIs'] },
              { title: 'Tools', skills: ['Git', 'Docker', 'AWS', 'Vercel', 'Figma'] }
            ].map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 border border-white/10 rounded-3xl"
              >
                <h3 className="text-2xl font-bold mb-6">{cat.title}</h3>
                <div className="flex flex-wrap gap-3">
                  {cat.skills.map(skill => (
                    <span key={skill} className="px-4 py-2 bg-white/5 rounded-full text-sm text-gray-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="min-h-[70vh] py-40 px-8 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-cyan-400 tracking-[0.3em] text-xs uppercase mb-4"
          >
            Get in Touch
          </motion.p>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-8"
          >
            Let's create
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
              something amazing
            </span>
          </motion.h2>
          
          <p className="text-gray-400 text-lg mb-12">
            Have a project in mind? Let's talk about it.
          </p>
          
          <div className="flex justify-center gap-6 mb-16">
            {[
              { name: 'GitHub', url: 'https://github.com/M-Destiny' },
              { name: 'LinkedIn', url: 'https://linkedin.com/in/destinymehul' },
              { name: 'Email', url: 'mailto:mehulr2801@gmail.com' }
            ].map(social => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                className="px-6 py-3 border border-white/20 rounded-full hover:border-cyan-400 hover:text-cyan-400 transition-colors"
              >
                {social.name}
              </a>
            ))}
          </div>
          
          <a 
            href="mailto:mehulr2801@gmail.com"
            className="inline-block px-12 py-5 bg-gradient-to-r from-cyan-500 to-purple-500 text-black font-bold rounded-full hover:scale-105 transition-transform"
          >
            Say Hello 👋
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 border-t border-white/10 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} Mehul. Built with React Three Fiber.
      </footer>
    </div>
  )
}
