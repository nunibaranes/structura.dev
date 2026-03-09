import type { AIFeedback } from '@/types/challenge';

export function generateMockFeedback(challengeSlug: string): AIFeedback {
  return {
    challengeSlug,
    summary:
      'Your design separates the system into distinct services with a caching layer for read-heavy traffic and a background worker for cleanup — a practical foundation that correctly prioritizes the dominant access pattern.',
    strengths: [
      'Clean separation between the write path (API to database) and the read path (cache-first with database fallback). This correctly optimizes for the read-heavy access pattern described in the constraints.',
      'Including a background cleanup worker shows you\'re thinking about operational concerns, not just the happy path. Many solutions ignore what happens to stale data over time.',
      'Your choice to use auto-increment IDs with Base62 encoding eliminates collision handling entirely — a pragmatic tradeoff that simplifies the system at the cost of predictable short codes.',
    ],
    gapsAndRisks: [
      'Your cache sits in front of the database, but what\'s your invalidation strategy? When a URL expires or is deleted, how does the cache know to stop serving it?',
      'You mentioned the system should be horizontally scalable, but your auto-increment IDs come from a single database sequence. How would ID generation work across multiple database instances?',
      'What happens if a malicious user iterates through sequential short codes to enumerate all stored URLs? Your predictable ID scheme makes this trivial.',
    ],
    tradeoffs: [
      'You chose 301 (permanent) redirects for browser caching benefits. But 301s are cached by browsers indefinitely — if a URL owner wants to change the destination later, browsers that cached the old redirect will never see the update. Have you considered 302 for flexibility?',
      'Your single PostgreSQL instance handles the current load, but the constraints say "horizontally scalable." There\'s a tension between the simplicity of your current design and the stated scaling requirement. At what point would you need to revisit this?',
    ],
    nextStep:
      'Add a cache invalidation strategy. Define what triggers invalidation (URL expiration, manual deletion, TTL-based eviction) and how the cache is notified. This is the highest-risk gap — serving stale redirects breaks the core product promise.',
    reflectionQuestion:
      'Your system optimizes for reads (redirects) over writes (URL creation). But what if the access pattern changes — say, a viral link generates 100K redirects per second to a single URL? Does your caching strategy handle hot keys, or would a single popular URL overwhelm the cache layer?',
    evaluatedAt: new Date().toISOString(),
  };
}
