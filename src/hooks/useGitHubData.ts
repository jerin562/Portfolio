import { useEffect, useState } from 'react';
import {
  GitHubRepoSummary,
  GitHubUserSummary,
  normalizeGitHubRepo,
  normalizeGitHubUser,
} from '../utils/portfolioLogic';

interface GitHubState {
  loading: boolean;
  error: string | null;
  user: GitHubUserSummary | null;
  aurelRepo: GitHubRepoSummary | null;
}

export function useGitHubData(username: string): GitHubState {
  const [state, setState] = useState<GitHubState>({
    loading: true,
    error: null,
    user: null,
    aurelRepo: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function load() {
      try {
        const [userRes, repoRes] = await Promise.all([
          fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
            signal: controller.signal,
            headers: { Accept: 'application/vnd.github+json' },
          }),
          fetch(`https://api.github.com/repos/${encodeURIComponent(username)}/aurel-commerce`, {
            signal: controller.signal,
            headers: { Accept: 'application/vnd.github+json' },
          }),
        ]);

        if (!active) return;

        let user: GitHubUserSummary | null = null;
        if (userRes.ok) {
          user = normalizeGitHubUser(await userRes.json());
        }

        let aurelRepo: GitHubRepoSummary | null = null;
        if (repoRes.ok) {
          const repoJson = (await repoRes.json()) as { size?: number };
          let contentsJson: unknown = null;
          if (typeof repoJson.size === 'number' && repoJson.size > 0) {
            const contentsRes = await fetch(
              `https://api.github.com/repos/${encodeURIComponent(username)}/aurel-commerce/contents`,
              {
                signal: controller.signal,
                headers: { Accept: 'application/vnd.github+json' },
              }
            );
            if (!active) return;
            contentsJson = contentsRes.ok ? await contentsRes.json() : null;
          }
          aurelRepo = normalizeGitHubRepo(repoJson, contentsJson);
        }

        if (!user && !aurelRepo) {
          setState({
            loading: false,
            error: 'GitHub API is currently unavailable or rate-limited.',
            user: null,
            aurelRepo: null,
          });
          return;
        }

        setState({
          loading: false,
          error: null,
          user,
          aurelRepo,
        });
      } catch (err) {
        if (!active || (err instanceof Error && err.name === 'AbortError')) return;
        setState({
          loading: false,
          error: 'Could not reach GitHub API.',
          user: null,
          aurelRepo: null,
        });
      }
    }

    load();
    return () => {
      active = false;
      controller.abort();
    };
  }, [username]);

  return state;
}
