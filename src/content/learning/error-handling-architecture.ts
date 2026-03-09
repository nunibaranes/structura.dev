import type { LearningMaterial } from '@/types/challenge';

export const learning: LearningMaterial = {
  challengeSlug: 'error-handling-architecture',
  concepts: [
    {
      title: 'Error Classification',
      explanation:
        'Not all errors are equal. Network errors are temporary and retriable. Validation errors are user-fixable. Auth errors should redirect to login. Runtime crashes need a fallback UI. Classify first, then define a handling strategy per category.',
    },
    {
      title: 'Error Boundaries',
      explanation:
        'React error boundaries catch render-time crashes and show a fallback UI instead of a white screen. Place them strategically: one at the app root as a last resort, and one per major section to isolate failures. A crashing sidebar shouldn\'t take down the whole page.',
    },
    {
      title: 'Graceful Degradation',
      explanation:
        'When a non-critical feature fails (recommendations widget, analytics), the rest of the page should still work. Design components to degrade gracefully — show a placeholder or hide the section — rather than crashing the entire view.',
    },
    {
      title: 'Error Reporting',
      explanation:
        'Errors the user doesn\'t report are errors you never fix. Send structured error data (type, context, stack trace) to a monitoring service (Sentry, Datadog) automatically. Good reporting includes enough context to reproduce the issue without asking the user.',
    },
  ],
  commonMistakes: [
    {
      mistake: 'Catching errors silently with empty catch blocks',
      why: 'catch (e) {} hides bugs completely. Every caught error should either be shown to the user, logged to a monitoring service, or both. Silent failures are the hardest bugs to diagnose.',
    },
    {
      mistake: 'Showing technical error messages to users',
      why: '"TypeError: Cannot read property \'name\' of undefined" means nothing to a user. Map technical errors to human-friendly messages like "Something went wrong. Please try again."',
    },
    {
      mistake: 'Using a single error boundary for the entire app',
      why: 'If the sidebar crashes and the whole app shows an error page, the boundaries are too coarse. Place boundaries around independently-failing sections so one broken widget doesn\'t take down the page.',
    },
  ],
  quickCheck: [
    {
      question:
        'The recommendations widget fails to load. Should the entire product page show an error?',
      options: [
        'Yes — any error means the page is unreliable',
        'No — show a generic error banner at the top of the page',
        'No — the widget should degrade gracefully while the rest of the page works',
        'It depends on whether the error is a 4xx or 5xx',
      ],
      correctIndex: 2,
      explanation:
        'Recommendations are non-critical. The widget should degrade gracefully (show nothing or a placeholder) while the core product information continues to work. This is graceful degradation in action.',
    },
    {
      question: 'An API returns a 401 Unauthorized. What\'s the appropriate handling?',
      options: [
        'Show a generic "Something went wrong" message',
        'Retry the request 3 times',
        'Redirect the user to the login page',
        'Log the error and ignore it',
      ],
      correctIndex: 2,
      explanation:
        'A 401 means the user\'s session is invalid. The correct response is to redirect to login — not a generic error. Auth errors have a specific recovery path that should be built into the error handling architecture.',
    },
  ],
};
