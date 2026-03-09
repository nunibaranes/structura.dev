/**
 * CHALLENGE CONTENT TEMPLATE
 *
 * Copy this file, rename it to your-challenge-slug.ts, and fill in the fields.
 *
 * Checklist:
 * 1. Create the challenge file here in src/content/challenges/
 * 2. Create the learning file in src/content/learning/ (same slug)
 * 3. Add both to their barrel files:
 *    - src/lib/challenges/data.ts
 *    - src/lib/learning/data.ts
 *
 * Guidelines:
 * - slug: kebab-case, used in URLs (/challenges/your-slug)
 * - description: 3-5 sentences. Set the scene, state the problem, ask for a design.
 * - constraints: 3-5 realistic limitations that force tradeoffs
 * - evaluationHints: 4-6 criteria the AI uses privately (user never sees these)
 * - concepts: 3-5 keyword tags for filtering/display
 */

import type { Challenge } from '@/types/challenge';

export const challenge: Challenge = {
  slug: 'your-challenge-slug',
  title: 'Your Challenge Title',
  description: '',
  category: 'frontend-architecture', // 'system-design' | 'frontend-architecture' | 'data-modeling' | 'api-design'
  difficulty: 'intermediate', // 'beginner' | 'intermediate' | 'advanced'
  constraints: [],
  evaluationHints: [],
  concepts: [],
};
