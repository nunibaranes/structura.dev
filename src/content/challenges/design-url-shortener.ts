import type { Challenge } from '@/types/challenge';

export const challenge: Challenge = {
  slug: 'design-url-shortener',
  title: 'Design a URL Shortener',
  description:
    'Design the architecture for a URL shortening service like bit.ly. The service should generate short URLs, redirect users to the original URL, and handle high read traffic. Consider storage, encoding strategy, and how to handle collisions.',
  category: 'system-design',
  difficulty: 'intermediate',
  constraints: [
    'Must handle 10K new URLs per day',
    'Redirects must complete in under 50ms (p99)',
    'Short URLs should be 7 characters or fewer',
    'The system should be horizontally scalable',
  ],
  evaluationHints: [
    'Should address hashing vs counter-based ID generation',
    'Should consider read-heavy access patterns and caching',
    'Should mention collision handling strategy',
    'Should address storage estimates and data model',
    'Should consider expiration and cleanup of old URLs',
  ],
  concepts: ['hashing', 'caching', 'database-design', 'scalability'],
};
