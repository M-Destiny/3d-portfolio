import { motion } from 'framer-motion';
import { profileData } from '../data/profile';

export default function Contact() {
  const socialLinks = [
    { name: 'GitHub', url: `https://github.com/${profileData.github}`, icon: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' },
    { name: 'LinkedIn', url: `https://linkedin.com/in/${profileData.linkedin}`, icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
    { name: 'Email', url: `mailto:${profileData.email}`, icon: 'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.16c2.053 0 3.828.94 4.936 2.398L12 11.585 7.064 4.558C8.172 3.1 9.947 2.16 12 2.16zm0 17.68c-2.053 0-3.828-.94-4.936-2.398L12 12.415l4.936-4.973C15.828 8.94 14.053 8 12 8c-2.053 0-3.828.94-4.936 2.398L12 14.585l4.936-4.973C15.828 10.06 17.603 11 20.456 11 22.527 11 24 9.627 24 7.68 24 5.733 22.527 4.16 20.456 4.16c-1.195 0-2.277.55-3.026 1.398L12 10.585 6.57 5.558C7.319 4.71 8.401 4.16 9.544 4.16c1.947 0 3.636 1.572 3.636 3.52 0 1.105-.546 2.057-1.35 2.608L12 15.415l-.126-.127C11.186 14.837 10.64 13.885 10.64 12.78c0-1.948 1.689-3.52 3.636-3.52 1.143 0 2.225.55 2.976 1.398L22.456 16C21.707 16.85 20.625 17.4 19.48 17.4c-1.947 0-3.636-1.572-3.636-3.52 0-1.105.546-2.057 1.35-2.608L12 6.415l.126.127C12.814 7.163 13.36 8.115 13.36 9.22c0 1.948-1.689 3.52-3.636 3.52-1.143 0-2.225-.55-2.976-1.398L1.544 8C2.293 7.15 3.475 6.6 4.62 6.6c1.947 0 3.636 1.572 3.636 3.52 0 1.105-.546 2.057-1.35 2.608L12 17.585l4.936-4.973C15.828 12.94 14.053 12 12 12z' }
  ];

  return (
    <section id="contact" className="min-h-[70vh] py-20 bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6 text-white">
          Let's <span className="text-purple-400">Connect</span>
        </h2>
        
        <p className="text-gray-400 max-w-xl mx-auto mb-12">
          Have a project in mind or want to collaborate? Feel free to reach out!
        </p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-6 mb-12"
        >
          {socialLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -5 }}
              className="p-4 bg-gray-800 rounded-full border border-gray-700 hover:border-purple-500 transition-colors"
            >
              <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
                <path d={link.icon} />
              </svg>
            </motion.a>
          ))}
        </motion.div>
        
        <motion.a
          href={`mailto:${profileData.email}`}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all"
        >
          Get In Touch
        </motion.a>
        
        <p className="mt-12 text-gray-500 text-sm">
          © {new Date().getFullYear()} {profileData.name}. Built with React Three Fiber.
        </p>
      </div>
    </section>
  );
}
