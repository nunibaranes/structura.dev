import type { Challenge } from '@/types/challenge';

export const challenge: Challenge = {
  slug: 'service-decomposition',
  title: 'Service Decomposition — Monolith to Services',
  description:
    'You\'re the architect of a growing SaaS product currently running as a monolith. The codebase has 4 major domains: User Management, Content Publishing, Billing, and Analytics. The team has grown to 25 engineers across 4 squads. Deployments take 45 minutes and a bug in analytics recently broke billing. Design a service decomposition strategy.',
  category: 'system-design',
  difficulty: 'intermediate',
  constraints: [
    'The migration must be incremental — no big-bang rewrite',
    'Each service must own its own data — no shared databases',
    'The existing monolith must keep running during migration',
    'Service boundaries should align with the 4 existing team boundaries',
    'The first extraction must be achievable within one quarter',
  ],
  evaluationHints: [
    'Should base boundaries on business domains, not technical layers',
    'Should explicitly address data ownership and the shared database problem',
    'Should propose an incremental migration strategy (strangler fig or similar)',
    'Should choose communication patterns (sync/async) with reasoning',
    'Should consider team topology alignment',
    'Should identify which domain to extract first and why',
  ],
  concepts: ['bounded-context', 'strangler-fig', 'data-ownership', 'service-boundaries', 'team-topology'],
};
