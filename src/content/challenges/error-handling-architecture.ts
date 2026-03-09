import type { Challenge } from '@/types/challenge';

export const challenge: Challenge = {
  slug: 'error-handling-architecture',
  title: 'Error Handling Architecture',
  description:
    'Your application has no consistent error handling strategy. Some components use try/catch, some ignore errors entirely, and users see raw error messages or blank screens. API failures, network errors, validation errors, and unexpected runtime errors are all handled differently (or not at all). Design an error handling architecture that provides a consistent, user-friendly experience.',
  category: 'frontend-architecture',
  difficulty: 'beginner',
  constraints: [
    'Must handle at least 4 error types: network, validation, auth, and runtime',
    'A failing non-critical widget must not crash the entire page',
    'Users must never see raw technical error messages',
    'All unhandled errors must be reported to a monitoring service',
  ],
  evaluationHints: [
    'Should classify errors into distinct categories with handling strategies',
    'Should place error boundaries strategically, not just at the app root',
    'Should address graceful degradation for non-critical features',
    'Should include error reporting/monitoring in the architecture',
    'Should define user-facing error states per category',
  ],
  concepts: ['error-boundaries', 'error-classification', 'graceful-degradation', 'monitoring'],
};
