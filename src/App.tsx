import { Suspense, lazy } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import { profileData, skills } from './data/profile';

const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const Contact = lazy(() => import('./components/Contact'));

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
    </div>
  );
}

export default function App() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Navigation />
      
      <main>
        <Hero name={profileData.name} title={profileData.title} />
        
        <Suspense fallback={<Loading />}>
          <Skills skills={skills} />
          <Projects />
          <Experience />
          <Contact />
        </Suspense>
      </main>
    </div>
  );
}
