import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import HeroScene from './components/3d/HeroScene';

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

function MouseFollower() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed w-8 h-8 rounded-full border-2 border-cyan-400 pointer-events-none z-50 mix-blend-difference"
      style={{ x: mouseX, y: mouseY }}
    />
  );
}

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav 
      initial={{ y: -100 }} 
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/80 backdrop-blur-xl py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <motion.button 
          onClick={() => scrollTo('hero')}
          whileHover={{ scale: 1.1 }}
          className="text-3xl font-black tracking-tighter"
        >
          <span className="text-white">M</span>
          <span className="text-cyan-400">.</span>
        </motion.button>
        
        <div className="hidden md:flex gap-10">
          {['About', 'Work', 'Skills', 'Contact'].map((item, i) => (
            <motion.button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -3 }}
              className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors tracking-wide"
            >
              {item}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="hero" className="h-screen relative flex items-center justify-center overflow-hidden bg-black">
      <HeroScene />
      
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <p className="text-cyan-400 text-sm tracking-[0.5em] mb-6 uppercase font-medium">
            Full Stack Developer
          </p>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-8xl md:text-[10rem] font-black tracking-tighter mb-4 leading-none"
        >
          <motion.span 
            className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ backgroundSize: '200% 200%' }}
          >
            Mehul
          </motion.span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Building immersive digital experiences with cutting-edge technology
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center gap-6"
        >
          <motion.a 
            href="#work"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(34, 211, 238, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold rounded-full"
          >
            View Work
          </motion.a>
          <motion.a 
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 border-2 border-gray-600 text-white font-bold rounded-full hover:border-cyan-400 hover:text-cyan-400 transition-all"
          >
            Contact
          </motion.a>
        </motion.div>
      </motion.div>
      
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-gray-600 flex justify-center pt-2">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-3 bg-cyan-400 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}

function About() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [500, 1500], [100, -100]);

  return (
    <section id="about" className="min-h-screen py-40 px-8 relative overflow-hidden bg-black">
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      </motion.div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-cyan-400 text-sm tracking-[0.3em] mb-4 uppercase">About Me</p>
          <h2 className="text-6xl md:text-8xl font-black mb-12 leading-none">
            Creating
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
              Magic
            </span>
            <br />
            with Code
          </h2>
          
          <div className="grid md:grid-cols-2 gap-16 mt-20">
            <div className="space-y-6">
              <p className="text-xl text-gray-300 leading-relaxed">
                I'm a passionate developer who loves pushing the boundaries of what's possible on the web. 
                From immersive 3D experiences to scalable backend systems, I craft digital solutions 
                that leave lasting impressions.
              </p>
              <p className="text-xl text-gray-300 leading-relaxed">
                Currently building developer tools, multiplayer games, and exploring the infinite 
                possibilities of WebGL and modern web technologies.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { num: '15+', label: 'Projects', color: 'from-cyan-500 to-blue-500' },
                { num: '3+', label: 'Years', color: 'from-pink-500 to-rose-500' },
                { num: '10+', label: 'Tech Stack', color: 'from-purple-500 to-indigo-500' },
                { num: '100%', label: 'Passion', color: 'from-amber-500 to-orange-500' },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm"
                >
                  <div className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                    {stat.num}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Work() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/users/M-Destiny/repos?sort=updated&per_page=12')
      .then(res => res.json())
      .then(data => {
        setRepos(data.filter((r: Repo) => !r.fork));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getLangColor = (lang: string) => {
    const colors: Record<string, string> = {
      TypeScript: '#3178c6', JavaScript: '#f7df1e', Python: '#3776ab', 
      HTML: '#e34c26', CSS: '#563d7c', Shell: '#89e051'
    };
    return colors[lang] || '#6e7681';
  };

  return (
    <section id="work" className="min-h-screen py-40 px-8 bg-gradient-to-b from-black to-slate-900 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <p className="text-cyan-400 text-sm tracking-[0.3em] mb-4 uppercase">Selected Work</p>
          <h2 className="text-6xl md:text-8xl font-black">
            Featured
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Projects
            </span>
          </h2>
        </motion.div>
        
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {repos.slice(0, 9).map((repo, i) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-cyan-500/50 transition-all"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
                    {repo.name}
                  </h3>
                  <p className="text-gray-400 mb-6 line-clamp-3 min-h-[4.5rem]">
                    {repo.description || 'No description available for this project.'}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {repo.language && (
                        <span className="flex items-center gap-2 text-sm text-gray-500">
                          <span 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: getLangColor(repo.language) }}
                          />
                          {repo.language}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {repo.stargazers_count}
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        )}
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a 
            href="https://github.com/M-Destiny"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-lg"
          >
            View all projects on GitHub
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Skills() {
  const skillCategories = [
    {
      title: 'Frontend',
      icon: '⚡',
      skills: ['React', 'TypeScript', 'Three.js', 'Framer Motion', 'Tailwind'],
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      title: 'Backend',
      icon: '🔧',
      skills: ['Node.js', 'Python', 'PostgreSQL', 'Socket.io', 'REST APIs'],
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      title: 'Tools',
      icon: '🛠️',
      skills: ['Git', 'Docker', 'AWS', 'Vercel', 'Figma'],
      gradient: 'from-purple-500 to-indigo-500'
    }
  ];

  return (
    <section id="skills" className="min-h-screen py-40 px-8 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/5 to-pink-500/5 rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <p className="text-cyan-400 text-sm tracking-[0.3em] mb-4 uppercase">Expertise</p>
          <h2 className="text-6xl md:text-8xl font-black">
            Skills &
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
              Technologies
            </span>
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="text-4xl mb-6">{category.icon}</div>
              <h3 className="text-2xl font-bold mb-6">{category.title}</h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span 
                    key={skill}
                    className={`px-4 py-2 rounded-full bg-gradient-to-r ${category.gradient} bg-opacity-20 text-white text-sm font-medium`}
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
  );
}

function Contact() {
  return (
    <section id="contact" className="min-h-[80vh] py-40 px-8 bg-gradient-to-b from-black to-slate-900 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-cyan-400 text-sm tracking-[0.3em] mb-4 uppercase">Get in Touch</p>
          <h2 className="text-6xl md:text-8xl font-black mb-8">
            Let's
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-cyan-400"
                  style={{ backgroundSize: '200% 200%' }}>
              Collaborate
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Have a project in mind or want to work together? I'd love to hear from you.
          </p>
          
          <div className="flex justify-center gap-6 mb-16">
            {[
              { name: 'GitHub', url: 'https://github.com/M-Destiny', icon: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' },
              { name: 'LinkedIn', url: 'https://linkedin.com/in/destinymehul', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
              { name: 'Email', url: 'mailto:mehulr2801@gmail.com', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' }
            ].map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener"
                whileHover={{ scale: 1.1, y: -5 }}
                className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all"
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d={social.icon} />
                </svg>
              </motion.a>
            ))}
          </div>
          
          <motion.a
            href="mailto:mehulr2801@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-16 py-5 bg-gradient-to-r from-cyan-500 to-pink-500 text-black font-bold text-xl rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
          >
            Say Hello 👋
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500">
          © {new Date().getFullYear()} Mehul. All rights reserved.
        </p>
        <p className="text-gray-500 text-sm">
          Built with React Three Fiber & Framer Motion
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden">
      <MouseFollower />
      <Navigation />
      <Hero />
      <About />
      <Work />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}
