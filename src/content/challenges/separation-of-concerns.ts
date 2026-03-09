import type { Challenge } from '@/types/challenge';

export const challenge: Challenge = {
  slug: 'separation-of-concerns',
  title: 'Separation of Concerns in a Feature',
  description:
    'You\'re reviewing a feature implementation: a "Save to Wishlist" button. The current code is a single component that handles the click event, calls the API, updates local state, shows a toast notification, tracks an analytics event, and handles the error case with a retry. Redesign this feature with proper separation of concerns — break it into layers with clear interfaces.',
  category: 'frontend-architecture',
  difficulty: 'beginner',
  constraints: [
    'The feature must work identically from the user\'s perspective',
    'Each layer must be independently testable',
    'Removing analytics tracking must not require changing the API or UI layer',
    'Error handling must include retry logic for transient failures',
  ],
  evaluationHints: [
    'Should identify at least 3 distinct layers (UI, logic/state, API)',
    'Should decouple side effects (analytics, notifications) from core logic',
    'Should define clear interfaces between layers',
    'Should explain testability benefits of the separation',
    'Should address error handling as a first-class concern, not an afterthought',
  ],
  concepts: ['separation-of-concerns', 'layered-architecture', 'side-effects', 'testability'],
};
