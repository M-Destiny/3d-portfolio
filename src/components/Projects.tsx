import { useGitHubRepos } from '../hooks/useGitHubRepos';
import { motion } from 'framer-motion';
import type { Repository } from '../types';

function RepoCard({ repo, index }: { repo: Repository; index: number }) {
  const getLanguageColor = (lang: string) => {
    const colors: Record<string, string> = {
      TypeScript: '#3178c6',
      JavaScript: '#f7df1e',
      Python: '#3776ab',
      HTML: '#e34c26',
      CSS: '#563d7c',
      Shell: '#89e051',
      Go: '#00add8',
      Rust: '#dea584'
    };
    return colors[lang] || '#6e7681';
  };

  return (
    <motion.a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="block p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 hover:border-purple-500 transition-all hover:transform hover:-translate-y-1"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-bold text-white truncate flex-1">{repo.name}</h3>
        <div className="flex items-center gap-1 text-yellow-400">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-sm">{repo.stars}</span>
        </div>
      </div>
      
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
        {repo.description || 'No description'}
      </p>
      
      <div className="flex items-center gap-4 text-sm">
        {repo.language && (
          <div className="flex items-center gap-1">
            <span 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: getLanguageColor(repo.language) }}
            />
            <span className="text-gray-400">{repo.language}</span>
          </div>
        )}
        <div className="flex items-center gap-1 text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          {repo.forks}
        </div>
      </div>
      
      {repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {repo.topics.slice(0, 3).map(topic => (
            <span key={topic} className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300">
              {topic}
            </span>
          ))}
        </div>
      )}
    </motion.a>
  );
}

export default function Projects() {
  const { repos, loading, error } = useGitHubRepos();

  if (loading) {
    return (
      <section id="projects" className="min-h-screen py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            Projects & <span className="text-purple-400">Repositories</span>
          </h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="min-h-screen py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            Projects & <span className="text-purple-400">Repositories</span>
          </h2>
          <p className="text-center text-red-400">Failed to load repositories</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="min-h-screen py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-white">
          Projects & <span className="text-purple-400">Repositories</span>
        </h2>
        <p className="text-center text-gray-400 mb-12">
          {repos.length} repositories • Auto-synced from GitHub
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo, i) => (
            <RepoCard key={repo.id} repo={repo} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
