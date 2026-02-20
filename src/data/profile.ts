import type { ProfileData, Experience, Skill, Project } from '../types';

export const profileData: ProfileData = {
  name: 'Destiny',
  title: 'Full Stack Developer & AI Enthusiast',
  bio: 'Building cool things with code. Passionate about clean architecture, modern web tech, and creating delightful user experiences.',
  email: 'mehulr2801@gmail.com',
  github: 'M-Destiny',
  linkedin: 'destinymehul',
  location: 'India',
  avatar: 'https://avatars.githubusercontent.com/u/your-username'
};

export const experiences: Experience[] = [
  {
    id: 1,
    company: 'OmniTools',
    role: 'Founder & Developer',
    duration: '2024 - Present',
    description: 'Building a collection of useful developer tools with modern web technologies.',
    current: true
  },
  {
    id: 2,
    company: 'Mini Games Hub',
    role: 'Creator',
    duration: '2025 - Present',
    description: 'Multiplayer mini-games platform with real-time features.',
    current: true
  }
];

export const skills: Skill[] = [
  { name: 'React', level: 95, category: 'frontend' },
  { name: 'TypeScript', level: 90, category: 'frontend' },
  { name: 'Three.js', level: 75, category: 'frontend' },
  { name: 'Node.js', level: 85, category: 'backend' },
  { name: 'Python', level: 80, category: 'backend' },
  { name: 'PostgreSQL', level: 70, category: 'backend' },
  { name: 'Git', level: 90, category: 'tools' },
  { name: 'Docker', level: 65, category: 'tools' },
  { name: 'AWS', level: 60, category: 'tools' },
  { name: 'Figma', level: 70, category: 'tools' }
];

export const projects: Project[] = [
  {
    id: 'omnitools',
    title: 'OmniTools',
    description: 'Collection of useful developer tools',
    tech: ['React', 'TypeScript', 'Vite'],
    liveUrl: 'https://omni-tools.vercel.app',
    repoUrl: 'https://github.com/M-Destiny/OmniTools'
  },
  {
    id: 'mini-games-hub',
    title: 'Mini Games Hub',
    description: 'Multiplayer mini-games platform',
    tech: ['React', 'Socket.io', 'TypeScript'],
    liveUrl: 'https://mini-games-hub-rouge.vercel.app',
    repoUrl: 'https://github.com/M-Destiny/mini-games-hub'
  }
];
