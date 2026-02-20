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
  
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0])
  const heroY = useTransform(scrollY, [0, 500], [0, -100])

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

  return (
    <div className="bg-black text-white">
      {/* Navigation - Apple style: minimal, transparent */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-black/80 backdrop-blur-md">
        <button onClick={() => scrollTo('home')} className="text-lg font-semibold tracking-tight">
          Mehul
        </button>
        <div className="flex gap-8 text-sm">
          {['About', 'Work', 'Skills', 'Contact'].map(item => (
            <button key={item} onClick={() => scrollTo(item.toLowerCase())} 
              className="text-gray-400 hover:text-white transition-colors text-sm">
              {item}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero - Full screen, centered, minimal */}
      <section id="home" className="h-screen relative flex items-center justify-center">
        <Hero3D />
        
        <motion.div 
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 text-center px-4"
        >
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-gray-400 text-sm mb-4"
          >
            Full Stack Developer
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-7xl md:text-9xl font-semibold tracking-tight mb-6"
          >
            Hello, I'm Mehul
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 max-w-xl mx-auto mb-10"
          >
            Creating extraordinary digital experiences with code
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center gap-4"
          >
            <button onClick={() => scrollTo('work')}
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors">
              View Work
            </button>
            <button onClick={() => scrollTo('contact')}
              className="px-8 py-3 text-gray-400 hover:text-white transition-colors">
              Contact
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* About - Large text, minimal */}
      <section id="about" className="min-h-[80vh] flex items-center py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-500 text-sm mb-8"
          >
            ABOUT
          </motion.p>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-semibold leading-tight mb-12"
          >
            I build software that <span className="text-blue-500">inspires</span>.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-3 gap-12"
          >
            {[
              { num: '15+', label: 'Projects' },
              { num: '3+', label: 'Years' },
              { num: '10+', label: 'Technologies' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl font-semibold text-blue-500 mb-2">{stat.num}</div>
                <div className="text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Work - Apple style grid */}
      <section id="work" className="min-h-screen py-32 px-6 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-500 text-sm mb-12"
          >
            SELECTED WORK
          </motion.p>

          {!loaded ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {repos.slice(0, 6).map((repo, i) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="group p-8 bg-black rounded-3xl border border-gray-900 hover:border-gray-800 transition-all"
                >
                  <h3 className="text-2xl font-semibold mb-3 group-hover:text-blue-500 transition-colors">
                    {repo.name}
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {repo.description || 'No description'}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    {repo.language && (
                      <span className="flex items-center gap-2 text-gray-400">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getLangColor(repo.language) }} />
                        {repo.language}
                      </span>
                    )}
                    <span className="text-gray-600">⭐ {repo.stargazers_count}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Skills - Simple list */}
      <section id="skills" className="min-h-[60vh] flex items-center py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-500 text-sm mb-12"
          >
            SKILLS
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-3 gap-12"
          >
            {[
              { title: 'Frontend', skills: 'React, TypeScript, Three.js, Tailwind' },
              { title: 'Backend', skills: 'Node.js, Python, PostgreSQL, Socket.io' },
              { title: 'Tools', skills: 'Git, Docker, AWS, Vercel' },
            ].map((cat, i) => (
              <div key={i}>
                <h3 className="text-xl font-semibold mb-4">{cat.title}</h3>
                <p className="text-gray-500">{cat.skills}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact - Clean CTA */}
      <section id="contact" className="min-h-[50vh] flex items-center justify-center py-32 px-6 bg-gray-950">
        <div className="text-center">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-500 text-sm mb-6"
          >
            GET IN TOUCH
          </motion.p>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-semibold mb-8"
          >
            Let's work together
          </motion.h2>
          
          <motion.a 
            href="mailto:mehulr2801@gmail.com"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-10 py-4 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors"
          >
            Say Hello
          </motion.a>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-8 mt-12"
          >
            {['GitHub', 'LinkedIn', 'Email'].map(social => (
              <a
                key={social}
                href={social === 'GitHub' ? 'https://github.com/M-Destiny' : social === 'LinkedIn' ? 'https://linkedin.com/in/destinymehul' : 'mailto:mehulr2801@gmail.com'}
                target="_blank"
                className="text-gray-500 hover:text-white transition-colors"
              >
                {social}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className="py-8 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Mehul
          </p>
          <p className="text-gray-600 text-sm">
            Built with React
          </p>
        </div>
      </footer>
    </div>
  )
}
