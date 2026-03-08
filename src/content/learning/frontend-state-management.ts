import type { LearningMaterial } from '@/types/challenge';

export const learning: LearningMaterial = {
  challengeSlug: 'frontend-state-management',
  concepts: [
    {
      title: 'Server State vs Client State',
      explanation:
        'Server state is data that lives on the backend and is fetched/cached by the frontend (user profiles, product lists, inventory). Client state is data that exists only in the browser (form inputs, UI toggles, selected tab). Mixing them in one store causes unnecessary complexity. Tools like React Query handle server state; local state or Zustand handle client state.',
    },
    {
      title: 'State Ownership Boundaries',
      explanation:
        'In a multi-team frontend, each team should own their state scope. If Team A and Team B both write to the same global store, every change risks breaking the other team. Scoped stores (one per feature/team) with clear interfaces between them prevent coupling and allow independent deployments.',
    },
    {
      title: 'Real-Time Data Patterns',
      explanation:
        'Real-time updates can be delivered via WebSockets (bidirectional, persistent connection), Server-Sent Events (one-way, simpler), or polling (periodic fetch). WebSockets suit high-frequency updates; SSE suits one-way streams like notifications; polling suits low-frequency data where simplicity matters more than latency.',
    },
    {
      title: 'Incremental Migration',
      explanation:
        'Replacing a state management system across 200+ components at once is high-risk. Incremental migration means adopting the new approach in new features first, then migrating existing features team-by-team. The old and new systems coexist during transition. This requires both systems to work simultaneously without conflicts.',
    },
  ],
  commonMistakes: [
    {
      mistake: 'Putting everything in a single global store',
      why: 'Global state creates implicit coupling between unrelated features. When Team A changes the store shape, Team B breaks. Scope state to the smallest boundary that needs it.',
    },
    {
      mistake: 'Treating server-fetched data the same as UI state',
      why: 'Server data needs caching, revalidation, and background refresh. UI state does not. Mixing them in Redux/Zustand leads to manual cache management that libraries like React Query handle automatically.',
    },
    {
      mistake: 'Proposing a big-bang migration',
      why: 'Rewriting all state management at once stops feature development, introduces regressions, and usually takes 3x longer than estimated. Incremental adoption is almost always the right answer.',
    },
  ],
  quickCheck: [
    {
      question: 'Which type of data is best managed by a library like React Query instead of Redux?',
      options: [
        'Whether a modal is open or closed',
        'The currently selected theme (light/dark)',
        'A list of products fetched from the API',
        'The current step in a multi-step form',
      ],
      correctIndex: 2,
      explanation:
        'Product data comes from the server and needs caching, background revalidation, and loading/error states. React Query handles all of this automatically. The other options are pure client state that belongs in local or UI state.',
    },
    {
      question: 'In a multi-team frontend, what is the biggest risk of a shared global Redux store?',
      options: [
        'Redux is too slow for large apps',
        'Teams become coupled through shared state shape',
        'Redux does not support TypeScript',
        'Global stores cannot handle real-time data',
      ],
      correctIndex: 1,
      explanation:
        'When multiple teams read and write to the same store, any change to the state shape can break other teams. This coupling slows everyone down and makes independent deployments impossible.',
    },
  ],
};
