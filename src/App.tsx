import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Hero3D from './components/Hero3D';

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  fork: boolean;
}

function App() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    fetch('https://api.github.com/users/M-Destiny/repos?sort=updated&per_page=20')
      .then(res => res.json())
      .then(data => {
        setRepos(data.filter((r: Repo) => !r.fork));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navs = ['About', 'Projects', 'Contact'];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-black/20">
        <div className="text-2xl font-bold">
          <span className="text-indigo-500">D</span>ev
        </div>
        <div className="flex gap-8">
          {navs.map(nav => (
            <button
              key={nav}
              onClick={() => scrollTo(nav.toLowerCase())}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {nav}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section className="h-screen relative flex items-center justify-center overflow-hidden">
        <Hero3D />
        <motion.div 
          style={{ y: y1, opacity }}
          className="relative z-10 text-center px-4"
        >
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-indigo-400 mb-4"
          >
            Hello, I'm
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-6xl md:text-8xl font-black mb-4"
          >
            Destiny
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-gray-400 max-w-xl mx-auto"
          >
            Full Stack Developer building amazing experiences with code
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center gap-4 mt-8"
          >
            <a href="#projects" className="px-6 py-3 bg-indigo-600 rounded-full font-medium hover:bg-indigo-500 transition-colors">
              View Work
            </a>
            <a href="#contact" className="px-6 py-3 border border-gray-600 rounded-full font-medium hover:border-white transition-colors">
              Contact
            </a>
          </motion.div>
        </motion.div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">
            About <span className="text-indigo-500">Me</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                I'm a passionate developer who loves building cool things. 
                Currently working on developer tools and multiplayer games.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                I specialize in React, TypeScript, Node.js, and modern web technologies.
                Always learning, always creating.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: '10+', label: 'Projects' },
                { num: '2+', label: 'Years Exp' },
                { num: '5+', label: 'Skills' },
                { num: '100%', label: 'Dedicated' },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-900 p-6 rounded-2xl text-center border border-gray-800"
                >
                  <div className="text-3xl font-bold text-indigo-500">{stat.num}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-24 px-6 bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Tech <span className="text-indigo-500">Stack</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {['React', 'TypeScript', 'Node.js', 'Python', 'Three.js', 'Socket.io', 'PostgreSQL', 'AWS', 'Docker', 'Git'].map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="px-5 py-2.5 bg-gray-800 rounded-full text-gray-300 hover:bg-indigo-600 hover:text-white transition-all cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">
            Featured <span className="text-indigo-500">Projects</span>
          </h2>
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {repos.slice(0, 6).map((repo, i) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:border-indigo-500 transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold group-hover:text-indigo-400 transition-colors">
                      {repo.name}
                    </h3>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {repo.stargazers_count}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {repo.description || 'No description available'}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full" />
                        {repo.language}
                      </span>
                    )}
                    <span>{repo.forks_count} forks</span>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
          <div className="text-center mt-10">
            <a 
              href="https://github.com/M-Destiny" 
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300"
            >
              View all on GitHub
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 bg-gray-900/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Let's <span className="text-indigo-500">Connect</span>
          </h2>
          <p className="text-gray-400 mb-8">
            Have a project in mind or want to collaborate? Let's talk!
          </p>
          <div className="flex justify-center gap-6">
            <a 
              href="https://github.com/M-Destiny" 
              target="_blank"
              rel="noopener"
              className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
            <a 
              href="https://linkedin.com/in/destinymehul" 
              target="_blank"
              rel="noopener"
              className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a 
              href="mailto:mehulr2801@gmail.com"
              className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Destiny. Built with React & Three.js</p>
      </footer>
    </div>
  );
}

export default App;
