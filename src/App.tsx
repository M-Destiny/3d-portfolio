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
  
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.8])
  const aboutY = useTransform(scrollY, [400, 1200], [100, -50])

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
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center">
        <button onClick={() => scrollTo('home')} className="text-xl font-bold tracking-tighter">
          <span className="text-cyan-400">M</span>EHUL
        </button>
        <div className="flex gap-6 text-sm">
          {['About', 'Work', 'Skills', 'Contact'].map(item => (
            <button key={item} onClick={() => scrollTo(item.toLowerCase())} 
              className="hover:text-cyan-400 transition-colors text-gray-300">
              {item}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="h-screen relative flex items-center justify-center overflow-hidden">
        <Hero3D />
        
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 text-center px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="text-cyan-400 tracking-[0.4em] text-xs uppercase mb-6">
              Full Stack Developer
            </p>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-8xl md:text-[10rem] font-black tracking-tighter mb-4"
          >
            <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
              MEHUL
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-gray-400 text-xl md:text-2xl max-w-2xl mx-auto mb-12"
          >
            Building immersive digital experiences that captivate
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <button onClick={() => scrollTo('work')}
              className="px-10 py-5 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform">
              View My Work
            </button>
            <button onClick={() => scrollTo('contact')}
              className="px-10 py-5 border border-white/30 rounded-full hover:bg-white/10 transition-colors">
              Get In Touch
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-7 h-12 rounded-full border-2 border-white/20 flex justify-center pt-2">
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-cyan-400 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen py-48 px-6 relative">
        <motion.div style={{ y: aboutY }} className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-16"
          >
            <p className="text-cyan-400 tracking-[0.3em] text-xs uppercase mb-4">About Me</p>
            <h2 className="text-5xl md:text-7xl font-bold leading-tight">
              I build
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                remarkable things
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-gray-300 text-xl leading-relaxed mb-8">
                I'm a passionate developer who loves pushing the boundaries of web technology. 
                From stunning 3D experiences to robust backend systems, I create 
                digital products that leave lasting impressions.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                Currently building developer tools, multiplayer games, and exploring 
                the infinite possibilities of WebGL and modern web technologies.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { num: '15+', label: 'Projects', color: 'from-cyan-500 to-blue-500' },
                { num: '3+', label: 'Years', color: 'from-purple-500 to-pink-500' },
                { num: '10+', label: 'Technologies', color: 'from-green-500 to-cyan-500' },
                { num: '100%', label: 'Dedication', color: 'from-orange-500 to-red-500' },
              ].map((stat, i) => (
                <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/10">
                  <div className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                    {stat.num}
                  </div>
                  <div className="text-gray-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Work Section */}
      <section id="work" className="min-h-screen py-48 px-6 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-20"
          >
            <p className="text-cyan-400 tracking-[0.3em] text-xs uppercase mb-4">Selected Work</p>
            <h2 className="text-5xl md:text-7xl font-bold">
              Featured
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Projects
              </span>
            </h2>
          </motion.div>

          {!loaded ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-3 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {repos.slice(0, 9).map((repo, i) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all duration-300"
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-cyan-400 transition-colors">
                      {repo.name}
                    </h3>
                    <p className="text-gray-400 mb-6 line-clamp-3 min-h-[4.5rem]">
                      {repo.description || 'No description available.'}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {repo.language && (
                          <>
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: getLangColor(repo.language) }} />
                            <span className="text-sm text-gray-500">{repo.language}</span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <span>⭐</span>
                        <span>{repo.stargazers_count}</span>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen py-48 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-20"
          >
            <p className="text-cyan-400 tracking-[0.3em] text-xs uppercase mb-4">Expertise</p>
            <h2 className="text-5xl md:text-7xl font-bold">
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
                gradient: 'from-cyan-500 to-blue-500',
                skills: ['React', 'TypeScript', 'Three.js', 'Framer Motion', 'Tailwind CSS', 'Next.js']
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -5 }}
                className="p-10 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="text-4xl mb-6">{cat.icon}</div>
                <h3 className="text-3xl font-bold mb-6">{cat.title}</h3>
                <div className="flex flex-wrap gap-3">
                  {cat.skills.map(skill => (
                    <span 
                      key={skill} 
                      className={`px-5 py-2.5 bg-gradient-to-r ${cat.gradient} bg-opacity-10 rounded-full text-sm font-medium text-gray-200`}
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

      {/* Contact Section */}
      <section id="contact" className="min-h-[70vh] py-48 px-6 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <p className="text-cyan-400 tracking-[0.3em] text-xs uppercase mb-4">Get in Touch</p>
            <h2 className="text-5xl md:text-7xl font-bold mb-8">
              Let's create
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                something amazing
              </span>
            </h2>
            <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? I'd love to hear from you.
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
                  className="px-8 py-4 border border-white/20 rounded-full hover:bg-white/10 hover:border-cyan-400 transition-all"
                >
                  {social.name}
                </a>
              ))}
            </div>
            
            <a 
              href="mailto:mehulr2801@gmail.com"
              className="inline-block px-16 py-6 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-black font-bold text-xl rounded-full hover:scale-105 transition-transform"
            >
              Say Hello 👋
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500">
            © {new Date().getFullYear()} Mehul. All rights reserved.
          </p>
          <p className="text-gray-600 text-sm">
            Built with React Three Fiber & Framer Motion
          </p>
        </div>
      </footer>
    </div>
  )
}
