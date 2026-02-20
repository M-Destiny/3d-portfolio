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
  
  // Parallax transforms
  const heroY = useTransform(scrollY, [0, 800], [0, 200])
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0])
  const text1Y = useTransform(scrollY, [200, 1000], [0, -300])
  const bg1Y = useTransform(scrollY, [0, 1000], [0, -200])
  const bg2Y = useTransform(scrollY, [0, 1000], [0, 200])

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
    <div className="bg-black text-white overflow-x-hidden">
      {/* Navigation - Fixed */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex justify-between items-center">
        <button onClick={() => scrollTo('home')} className="text-2xl font-bold tracking-tight">
          Mehul
        </button>
        <div className="hidden md:flex gap-10 text-sm">
          {['About', 'Work', 'Skills', 'Contact'].map(item => (
            <button key={item} onClick={() => scrollTo(item.toLowerCase())} 
              className="text-white/70 hover:text-white transition-colors font-medium">
              {item}
            </button>
          ))}
        </div>
      </nav>

      {/* SECTION 1: HERO - Full screen with 3D */}
      <section id="home" className="h-screen relative flex items-center justify-center overflow-hidden">
        <Hero3D />
        
        {/* Parallax text on top of 3D */}
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 text-center px-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="mb-4"
          >
            <span className="text-white/60 text-lg tracking-[0.4em] uppercase">Full Stack Developer</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[15vw] leading-none font-black tracking-tighter mb-0"
          >
            HELLO,
          </motion.h1>
          
          <motion.h2 
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-[15vw] leading-none font-black tracking-tighter mb-6"
          >
            I'M MEHUL
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex justify-center gap-6"
          >
            <button onClick={() => scrollTo('work')}
              className="px-12 py-5 bg-white text-black font-bold text-lg rounded-full hover:scale-105 transition-transform shadow-lg shadow-white/20">
              View My Work
            </button>
            <button onClick={() => scrollTo('contact')}
              className="px-12 py-5 border-2 border-white/30 rounded-full hover:bg-white/10 transition-colors text-lg font-medium">
              Contact Me
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          animate={{ y: [0, 25, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-8 h-14 rounded-full border-2 border-white/30 flex justify-center pt-3">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-4 bg-white/70 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: ABOUT - Full screen with parallax background */}
      <section id="about" className="h-screen relative flex items-center justify-center overflow-hidden">
        {/* Parallax background blobs */}
        <motion.div style={{ y: bg1Y }} className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px]" />
        </motion.div>
        <motion.div style={{ y: bg2Y }} className="absolute inset-0">
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[150px]" />
        </motion.div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <p className="text-white/50 tracking-[0.3em] uppercase text-sm mb-6">About Me</p>
          </motion.div>
          
          <motion.div style={{ y: text1Y }}>
            <motion.h2 
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[8vw] leading-none font-bold tracking-tighter"
            >
              Building
            </motion.h2>
            <motion.h2 
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-[8vw] leading-none font-bold tracking-tighter"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                Extraordinary
              </span>
            </motion.h2>
            <motion.h2 
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-[8vw] leading-none font-bold tracking-tighter"
            >
              Experiences
            </motion.h2>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="text-white/60 text-xl md:text-2xl max-w-2xl mx-auto mt-12"
          >
            I create stunning digital experiences with code. From 3D websites to powerful applications.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="flex justify-center gap-12 mt-16"
          >
            {[
              { num: '15+', label: 'Projects' },
              { num: '3+', label: 'Years' },
              { num: '10+', label: 'Tech Stack' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
                  {stat.num}
                </div>
                <div className="text-white/50 mt-2">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: WORK - Full screen */}
      <section id="work" className="min-h-screen py-32 px-8 relative overflow-hidden">
        <motion.div style={{ y: bg2Y }} className="absolute inset-0">
          <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[120px]" />
        </motion.div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <p className="text-white/50 tracking-[0.3em] uppercase text-sm mb-6">Selected Work</p>
            <h2 className="text-7xl md:text-9xl font-bold tracking-tighter">
              Featured
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Projects
              </span>
            </h2>
          </motion.div>

          {!loaded ? (
            <div className="flex justify-center py-32">
              <div className="w-12 h-12 border-3 border-purple-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {repos.slice(0, 6).map((repo, i) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10, scale: 1.01 }}
                  className="group p-12 bg-white/5 rounded-3xl border border-white/10 hover:border-purple-500/50 transition-all duration-500 backdrop-blur-sm"
                >
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-bold group-hover:text-purple-400 transition-colors">
                      {repo.name}
                    </h3>
                    <span className="text-yellow-500 text-lg">⭐ {repo.stargazers_count}</span>
                  </div>
                  <p className="text-white/50 mb-8 line-clamp-3 min-h-[4rem]">
                    {repo.description || 'No description available.'}
                  </p>
                  <div className="flex items-center gap-3">
                    {repo.language && (
                      <>
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: getLangColor(repo.language) }} />
                        <span className="text-white/50">{repo.language}</span>
                      </>
                    )}
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 4: SKILLS - Full screen */}
      <section id="skills" className="min-h-screen flex items-center py-32 px-8 relative overflow-hidden">
        <motion.div style={{ y: bg1Y }} className="absolute inset-0">
          <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-cyan-600/15 rounded-full blur-[150px]" />
        </motion.div>
        
        <div className="max-w-6xl mx-auto relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <p className="text-white/50 tracking-[0.3em] uppercase text-sm mb-6">Expertise</p>
            <h2 className="text-7xl md:text-9xl font-bold tracking-tighter">
              Skills &
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
                Technologies
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Frontend', 
                icon: '⚡',
                gradient: 'from-indigo-500 to-cyan-500',
                skills: ['React', 'TypeScript', 'Three.js', 'Framer Motion', 'Tailwind', 'Next.js']
              },
              { 
                title: 'Backend', 
                icon: '🔧',
                gradient: 'from-purple-500 to-pink-500',
                skills: ['Node.js', 'Python', 'PostgreSQL', 'Socket.io', 'REST APIs', 'GraphQL']
              },
              { 
                title: 'Tools', 
                icon: '🛠️',
                gradient: 'from-green-500 to-cyan-500',
                skills: ['Git', 'Docker', 'AWS', 'Vercel', 'Figma', 'Linux']
              }
            ].map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -8 }}
                className="p-10 bg-white/5 rounded-3xl border border-white/10 hover:border-white/20 transition-all backdrop-blur-sm"
              >
                <div className="text-5xl mb-6">{cat.icon}</div>
                <h3 className="text-3xl font-bold mb-6">{cat.title}</h3>
                <div className="flex flex-wrap gap-3">
                  {cat.skills.map(skill => (
                    <span 
                      key={skill} 
                      className={`px-5 py-2.5 bg-gradient-to-r ${cat.gradient} bg-opacity-10 rounded-full text-sm font-medium text-white/80 border border-white/5`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: CONTACT - Full screen */}
      <section id="contact" className="min-h-[80vh] flex items-center justify-center py-32 px-8 relative overflow-hidden">
        <motion.div style={{ y: bg2Y }} className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-pink-600/20 rounded-full blur-[150px]" />
        </motion.div>
        
        <div className="text-center max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-white/50 tracking-[0.3em] uppercase text-sm mb-6">Get In Touch</p>
            <h2 className="text-7xl md:text-9xl font-bold tracking-tighter mb-8">
              Let's
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                Collaborate
              </span>
            </h2>
            <p className="text-white/60 text-xl mb-12 max-w-xl mx-auto">
              Have a project in mind? Let's create something amazing together.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                { name: 'GitHub', url: 'https://github.com/M-Destiny' },
                { name: 'LinkedIn', url: 'https://linkedin.com/in/destinymehul' },
                { name: 'Email', url: 'mailto:mehulr2801@gmail.com' }
              ].map(social => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  className="px-10 py-4 border border-white/20 rounded-full hover:bg-white/10 hover:border-purple-500/50 transition-all font-medium"
                >
                  {social.name}
                </a>
              ))}
            </div>
            
            <a 
              href="mailto:mehulr2801@gmail.com"
              className="inline-block px-16 py-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-xl rounded-full hover:scale-105 transition-transform shadow-xl shadow-purple-500/30"
            >
              Say Hello 👋
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40">
            © {new Date().getFullYear()} Mehul. All rights reserved.
          </p>
          <p className="text-white/30 text-sm">
            Built with React & Three.js
          </p>
        </div>
      </footer>
    </div>
  )
}
