import type { Challenge } from '@/types/challenge';

export const challenge: Challenge = {
  slug: 'component-boundaries',
  title: 'Drawing Component Boundaries',
  description:
    'You\'re building a dashboard page that shows user profile info, a list of recent orders, a notification bell with a dropdown, and a sidebar navigation. A junior developer put it all in one 600-line component. Redesign the component architecture — decide where to draw boundaries and why.',
  category: 'frontend-architecture',
  difficulty: 'beginner',
  constraints: [
    'The dashboard must support adding new sections without modifying existing components',
    'At least two components should be reusable outside this page',
    'Data fetching should not be mixed into presentational components',
    'The component tree should be neither too flat (1 level) nor too deep (5+ levels)',
  ],
  evaluationHints: [
    'Should define 4-8 components with clear names reflecting responsibility',
    'Should base boundaries on responsibility, not visual layout',
    'Should explain data flow between components',
    'Should identify which components are reusable vs page-specific',
    'Should reason explicitly about each boundary, not just draw a tree',
  ],
  concepts: ['single-responsibility', 'cohesion', 'coupling', 'component-api'],
};
