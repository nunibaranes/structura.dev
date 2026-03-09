import type { Challenge } from '@/types/challenge';

export const challenge: Challenge = {
  slug: 'data-fetching-architecture',
  title: 'Designing a Data Fetching Layer',
  description:
    'Your React app currently makes fetch() calls directly in components — scattered across 40+ files with inconsistent error handling, no caching, no loading states, and duplicated requests when multiple components need the same data. Design a data fetching architecture that provides consistent patterns for loading, caching, error handling, and deduplication.',
  category: 'frontend-architecture',
  difficulty: 'beginner',
  constraints: [
    'Must support incremental migration — no big-bang rewrite',
    'Loading and error states must be handled consistently across all data hooks',
    'Identical requests made within the same render cycle must be deduplicated',
    'Cache invalidation must be addressed for at least mutation and time-based scenarios',
  ],
  evaluationHints: [
    'Should distinguish server state from client state',
    'Should propose a consistent return type pattern (data, loading, error)',
    'Should address caching with a clear invalidation strategy',
    'Should mention request deduplication',
    'Should include a migration path from the current scattered fetch calls',
  ],
  concepts: ['data-fetching', 'caching', 'server-state', 'stale-while-revalidate'],
};
