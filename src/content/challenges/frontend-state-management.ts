import type { Challenge } from '@/types/challenge';

export const challenge: Challenge = {
  slug: 'frontend-state-management',
  title: 'State Management at Scale',
  description:
    'You are the tech lead of a large e-commerce frontend. The app has grown to 200+ components across 5 feature teams. State is managed inconsistently — some teams use Redux, others use local state, and one team built a custom pub/sub system. The CEO wants to launch a real-time inventory feature that requires shared state across multiple page sections. Design a state management architecture for this application.',
  category: 'frontend-architecture',
  difficulty: 'intermediate',
  constraints: [
    '5 feature teams must be able to work independently',
    'Real-time inventory updates must reflect across all visible components within 2 seconds',
    'The solution must be incrementally adoptable (no big-bang rewrite)',
    'Bundle size matters — the app already has performance issues',
  ],
  evaluationHints: [
    'Should address the distinction between server state and client state',
    'Should consider team autonomy and code ownership boundaries',
    'Should have a migration strategy, not just a target architecture',
    'Real-time aspect should address WebSocket or SSE for inventory updates',
    'Should mention how shared state is scoped to avoid global coupling',
  ],
  concepts: ['state-management', 'scalability', 'team-architecture', 'real-time'],
};
