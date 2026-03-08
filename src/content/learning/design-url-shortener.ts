import type { LearningMaterial } from '@/types/challenge';

export const learning: LearningMaterial = {
  challengeSlug: 'design-url-shortener',
  concepts: [
    {
      title: 'Hashing vs Counter-Based IDs',
      explanation:
        'URL shorteners need a strategy to generate short, unique codes. Hashing (e.g., MD5/SHA then truncating) produces codes from the URL itself but risks collisions. Counter-based IDs (auto-increment → Base62 encode) guarantee uniqueness but produce predictable, sequential codes. The tradeoff is collision risk vs predictability.',
    },
    {
      title: 'Read-Heavy Access Patterns',
      explanation:
        'URL shorteners receive far more redirects (reads) than new URL creations (writes) — often 100:1 or more. This means the architecture should optimize for fast lookups. Caching the most-accessed URLs in memory (Redis, Memcached) can serve the majority of traffic without hitting the database.',
    },
    {
      title: 'Base62 Encoding',
      explanation:
        'Base62 uses [a-zA-Z0-9] to encode numbers into short strings. A 7-character Base62 string can represent ~3.5 trillion unique values (62^7). This is the most common encoding for short URLs because it produces URL-safe characters without special symbols.',
    },
    {
      title: 'Horizontal Scalability',
      explanation:
        'A system is horizontally scalable when you can add more machines to handle more load (scale out), rather than upgrading a single machine (scale up). For a URL shortener, this means stateless API servers behind a load balancer, with the database and cache as shared services.',
    },
  ],
  commonMistakes: [
    {
      mistake: 'Using a full hash (MD5/SHA256) without addressing collisions',
      why: 'Truncating a hash to 7 characters dramatically increases collision probability. You need a check-and-retry or fallback strategy.',
    },
    {
      mistake: 'Ignoring the read/write ratio in the design',
      why: 'Designing equally for reads and writes wastes resources. The redirect path should be highly optimized (cache-first), even if the creation path is slightly slower.',
    },
    {
      mistake: 'No expiration or cleanup strategy',
      why: 'Without TTL or cleanup, storage grows unbounded. Old, unused URLs accumulate. A background job or TTL-based eviction keeps the system healthy.',
    },
  ],
  quickCheck: [
    {
      question: 'A URL shortener receives 1M redirects/day but only 10K new URLs/day. Which optimization has the most impact?',
      options: [
        'Faster database writes for URL creation',
        'Caching popular short URLs in Redis',
        'Using a faster hashing algorithm',
        'Adding more write replicas',
      ],
      correctIndex: 1,
      explanation:
        'With a 100:1 read/write ratio, caching the redirect lookups has by far the greatest impact. Most traffic is reads, so optimizing reads moves the needle.',
    },
    {
      question: 'What is the main risk of using truncated MD5 hashes for short code generation?',
      options: [
        'MD5 is too slow to compute',
        'Truncation increases collision probability',
        'MD5 produces URL-unsafe characters',
        'The codes will be too long',
      ],
      correctIndex: 1,
      explanation:
        'A full MD5 hash is 128 bits, but a 7-character code only has ~41 bits of entropy. Truncating dramatically increases the chance that two different URLs produce the same short code.',
    },
  ],
};
