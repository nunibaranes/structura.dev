import type { LearningMaterial } from '@/types/challenge';

export const learning: LearningMaterial = {
  challengeSlug: 'separation-of-concerns',
  concepts: [
    {
      title: 'Separation of Concerns',
      explanation:
        'Each module should handle one aspect of the feature. The button component shouldn\'t know about the API URL. The API layer shouldn\'t know about toast notifications. When concerns are separated, you can change one layer without breaking another.',
    },
    {
      title: 'UI Layer vs Logic Layer',
      explanation:
        'The component renders UI and responds to user events. The logic layer (hooks, services) handles what happens when those events fire. Separating them means you can test business logic without rendering components, and test UI without mocking APIs.',
    },
    {
      title: 'Side Effects Are a Separate Concern',
      explanation:
        'Analytics tracking, toast notifications, and logging are side effects — they don\'t affect the core feature logic. They should be decoupled so removing analytics doesn\'t break the wishlist. Think of side effects as observers, not participants.',
    },
    {
      title: 'Interfaces Between Layers',
      explanation:
        'Each layer should expose a clean API to the layer above it. The UI calls `addToWishlist()` — it doesn\'t care whether that\'s a REST call, GraphQL, or a local mock. Clean interfaces make layers swappable and testable.',
    },
  ],
  commonMistakes: [
    {
      mistake: 'Putting API calls directly in onClick handlers',
      why: 'This couples UI events to network logic. If you want to add optimistic updates or retry logic, you have to modify the component. Extract to a hook or service instead.',
    },
    {
      mistake: 'Making error handling an afterthought',
      why: 'Error states are part of the architecture, not a patch. If your design doesn\'t show how errors flow from the API layer to the UI, errors will be handled inconsistently — or not at all.',
    },
    {
      mistake: 'Coupling analytics to the API call',
      why: 'If your test suite needs a mock analytics library to test a wishlist API call, your concerns aren\'t separated. Analytics should observe the action, not be wired into it.',
    },
  ],
  quickCheck: [
    {
      question:
        'A component directly calls fetch() in its onClick handler and shows an alert on error. What\'s the first concern to extract?',
      options: [
        'The error alert styling',
        'The API call into a hook or service',
        'The onClick handler into a parent component',
        'The loading state into Redux',
      ],
      correctIndex: 1,
      explanation:
        'The API call is the first thing to extract. Move it to a custom hook or service function so the component calls addToWishlist() and doesn\'t know about fetch, URLs, or headers.',
    },
    {
      question: 'Should analytics tracking live in the API layer or the UI layer?',
      options: [
        'The API layer, so every call is tracked',
        'The UI layer, so you track what the user sees',
        'Neither — it\'s a side effect that should be decoupled from both',
        'It doesn\'t matter as long as it works',
      ],
      correctIndex: 2,
      explanation:
        'Analytics is a side effect — a separate concern. It should observe the action (via a callback, event, or middleware) without being wired into the API call or the button click handler.',
    },
  ],
};
