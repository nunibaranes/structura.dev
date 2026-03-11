import type { LearningMaterial } from '@/types/challenge';

export const learning: LearningMaterial = {
  challengeSlug: 'state-architecture',
  concepts: [
    {
      title: 'State Colocation',
      explanation:
        'State should live as close as possible to where it\'s used. If only the Profile tab needs profile form state, it belongs in the Profile tab — not in a global store. Colocated state is simpler to reason about and causes fewer unnecessary re-renders.',
    },
    {
      title: 'Lifting State',
      explanation:
        'When two sibling components need the same state, lift it to their nearest common parent. The "Unsaved Changes" banner and the "Save All" button both need form change data — that state belongs above both of them.',
    },
    {
      title: 'Context for Stable Values',
      explanation:
        'React Context is good for values that many components need but rarely change — user plan, theme, locale. It\'s bad for frequently-changing state because every update re-renders all consumers.',
    },
    {
      title: 'External Stores for Cross-Cutting State',
      explanation:
        'When state is needed across many pages and components (auth, feature flags), an external store like Zustand avoids prop drilling without Context\'s re-render cost. Use for truly global, frequently-accessed state.',
    },
  ],
  commonMistakes: [
    {
      mistake: 'Putting everything in global state',
      why: 'Form input values in Redux is almost always wrong. Local state is simpler, faster, and doesn\'t pollute the global scope. Only globalize what truly needs to be global.',
    },
    {
      mistake: 'Using Context for rapidly-changing values',
      why: 'If form state lives in Context, every keystroke re-renders every consumer — all 4 tabs re-render when one input changes. Use Context for stable values, not input state.',
    },
    {
      mistake: 'Defaulting to prop drilling through 4+ layers',
      why: 'If you\'re passing a callback through 3 intermediary components that don\'t use it, the state is in the wrong place. Lift it, use Context, or restructure.',
    },
  ],
  quickCheck: [
    {
      question:
        'The user\'s plan type (free/pro) is needed by all 4 settings tabs to show/hide fields. Where should it live?',
      options: [
        'Local state in each tab (fetch independently)',
        'Lifted state in the parent page component',
        'React Context or an external store',
        'URL query parameters',
      ],
      correctIndex: 2,
      explanation:
        'The plan type is stable (doesn\'t change during the session), widely needed (all 4 tabs), and doesn\'t change often. Context or an external store is the right fit.',
    },
    {
      question:
        'The "Display Name" text input in the Profile tab is used nowhere else. Where should its state live?',
      options: [
        'Global store for consistency',
        'React Context so other tabs can access it if needed',
        'Local state in the Profile tab component',
        'Lifted to the settings page parent',
      ],
      correctIndex: 2,
      explanation:
        'No other component needs this value. Local state is the simplest, most performant choice. Only lift or globalize when there\'s a concrete reason.',
    },
    {
      question:
        'The "Unsaved Changes" banner needs to know if ANY of the 4 tabs has been modified. Where does this detection logic belong?',
      options: [
        'Each tab checks itself and sets a global flag',
        'A shared parent that tracks dirty state across all tabs',
        'The Save button component queries each tab on click',
        'A useEffect in each tab that syncs to localStorage',
      ],
      correctIndex: 1,
      explanation:
        'The parent component is the nearest common ancestor of all tabs and the banner. It\'s the natural place to aggregate dirty state and pass it to both the banner and the Save button.',
    },
  ],
};
