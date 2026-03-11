import type { Challenge } from '@/types/challenge';

export const challenge: Challenge = {
  slug: 'state-architecture',
  title: 'State Architecture — Where Should State Live?',
  description:
    'You\'re building a settings page with 4 tabs (Profile, Notifications, Privacy, Billing). A "Save All Changes" button saves all tabs at once. An "Unsaved Changes" banner appears when any tab is modified. The user\'s plan (free/pro) affects which settings are visible. Design where each piece of state lives and how it flows between components.',
  category: 'frontend-architecture',
  difficulty: 'beginner',
  constraints: [
    'Re-renders should be minimized — changing one tab should not re-render all four',
    'The "Unsaved Changes" detection must work across all tabs simultaneously',
    'The user plan type must be accessible to all tabs without prop drilling',
    'Adding a 5th tab in the future should require minimal state architecture changes',
  ],
  evaluationHints: [
    'Should place state at the lowest appropriate level',
    'Should use different strategies for different state types (form values vs user plan)',
    'Should consider re-render impact of each state placement decision',
    'Should clearly architect the "Unsaved Changes" detection mechanism',
    'Should distinguish between stable state and frequently-changing state',
  ],
  concepts: ['state-colocation', 'lifting-state', 'context-vs-store', 'rerender-optimization'],
};
