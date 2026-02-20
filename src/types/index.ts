export interface Repository {
  id: number;
  name: string;
  description: string;
  url: string;
  homepage: string;
  stars: number;
  forks: number;
  language: string;
  topics: string[];
  updatedAt: string;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  duration: string;
  description: string;
  current: boolean;
}

export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools' | 'other';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  repoUrl: string;
  image?: string;
}

export interface ProfileData {
  name: string;
  title: string;
  bio: string;
  email: string;
  github: string;
  linkedin: string;
  location: string;
  avatar: string;
}
