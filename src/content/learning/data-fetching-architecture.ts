import type { LearningMaterial } from '@/types/challenge';

export const learning: LearningMaterial = {
  challengeSlug: 'data-fetching-architecture',
  concepts: [
    {
      title: 'Server State vs Client State',
      explanation:
        'Data from your API (products, users, orders) is server state — the frontend holds a cached copy. UI state (modal open, selected tab) is client state — it exists only in the browser. They need different management strategies. Mixing them (e.g., API data in Redux alongside form state) creates unnecessary complexity.',
    },
    {
      title: 'Stale-While-Revalidate',
      explanation:
        'Show cached data immediately (fast), then refetch in the background (fresh). The user sees content instantly and gets updated data without a loading spinner. This is the core pattern behind React Query and SWR.',
    },
    {
      title: 'Request Deduplication',
      explanation:
        'If 3 components mount simultaneously and all request the same user data, the fetching layer should make 1 API call, not 3. Deduplication prevents wasted bandwidth, reduces server load, and eliminates race conditions between identical requests.',
    },
    {
      title: 'Cache Invalidation',
      explanation:
        'The hardest problem in data fetching. When a user updates their profile, the cached profile data is stale. The fetching layer needs a strategy: invalidate on mutation, time-based expiry, or manual refetch. Without it, users see outdated data.',
    },
  ],
  commonMistakes: [
    {
      mistake: 'Building a custom fetching layer when React Query/SWR exists',
      why: 'Unless you have unusual requirements, use a proven library. Custom solutions miss edge cases like race conditions, garbage collection, focus refetching, and retry backoff.',
    },
    {
      mistake: 'Ignoring loading and error states in the architecture',
      why: 'Every fetch has 3 states: loading, success, error. If your architecture doesn\'t enforce handling all 3, some components will show broken UIs — spinners that never stop, or blank screens on failure.',
    },
    {
      mistake: 'Caching without an invalidation strategy',
      why: 'A cache that never updates is a bug factory. If a user changes their name and the header still shows the old one, your cache is the problem. Define when and how cached data becomes stale.',
    },
  ],
  quickCheck: [
    {
      question:
        'Two components on the same page both call useUser(userId). How many API requests should this trigger?',
      options: [
        'Two — each component needs its own data',
        'One — the fetching layer should deduplicate identical requests',
        'Zero — the data should already be in global state',
        'It depends on the component render order',
      ],
      correctIndex: 1,
      explanation:
        'The fetching layer should deduplicate identical in-flight requests. Both components get the same data from a single API call, avoiding wasted bandwidth and potential race conditions.',
    },
    {
      question:
        'A user updates their display name. The header still shows the old name. What\'s missing?',
      options: [
        'The header component needs a force re-render',
        'The mutation should directly update the header\'s local state',
        'Cache invalidation — the user data cache should be invalidated after mutation',
        'The API is returning stale data',
      ],
      correctIndex: 2,
      explanation:
        'After a mutation, the cached user data is stale. The fetching layer should invalidate the user cache (or optimistically update it) so all components consuming that data reflect the change.',
    },
  ],
};
