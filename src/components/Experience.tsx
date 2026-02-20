import { motion } from 'framer-motion';
import { experiences } from '../data/profile';
import type { Experience } from '../types';

function TimelineItem({ experience, index }: { experience: Experience; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
    >
      <div className="w-full md:w-5/12">
        <div className="relative p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 hover:border-purple-500 transition-all">
          <div className="absolute top-6 -right-2 w-4 h-4 bg-purple-500 rounded-full animate-pulse" />
          
          <h3 className="text-xl font-bold text-white mb-1">{experience.role}</h3>
          <p className="text-purple-400 font-medium mb-2">{experience.company}</p>
          <p className="text-gray-400 text-sm mb-3">{experience.duration}</p>
          <p className="text-gray-300 text-sm">{experience.description}</p>
          
          {experience.current && (
            <span className="inline-block mt-3 px-3 py-1 text-xs rounded-full bg-green-500/20 text-green-400">
              Current
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  return (
    <section id="experience" className="min-h-screen py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          Experience & <span className="text-purple-400">Journey</span>
        </h2>
        
        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500 hidden md:block" />
          
          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <TimelineItem key={exp.id} experience={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
