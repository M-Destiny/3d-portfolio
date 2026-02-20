import { useState, useEffect } from 'react';
import type { Repository } from '../types';

const GITHUB_USERNAME = 'M-Destiny';

export function useGitHubRepos() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
        );
        
        if (!response.ok) throw new Error('Failed to fetch repos');
        
        const data = await response.json();
        
        const mappedRepos: Repository[] = data
          .filter((repo: any) => !repo.fork)
          .map((repo: any) => ({
            id: repo.id,
            name: repo.name,
            description: repo.description || '',
            url: repo.html_url,
            homepage: repo.homepage || '',
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language || 'Unknown',
            topics: repo.topics || [],
            updatedAt: repo.updated_at
          }))
          .sort((a: Repository, b: Repository) => b.stars - a.stars);
        
        setRepos(mappedRepos);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);

  return { repos, loading, error };
}

export function getTechCategory(language: string): string {
  const categories: Record<string, string> = {
    'TypeScript': 'Frontend',
    'JavaScript': 'Frontend',
    'Python': 'Backend',
    'Go': 'Backend',
    'Rust': 'Backend',
    'Java': 'Backend',
    'CSS': 'Frontend',
    'HTML': 'Frontend',
    'Shell': 'DevOps'
  };
  return categories[language] || 'Other';
}
