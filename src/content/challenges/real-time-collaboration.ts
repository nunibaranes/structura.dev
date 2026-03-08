import type { Challenge } from '@/types/challenge';

export const challenge: Challenge = {
  slug: 'real-time-collaboration',
  title: 'Real-Time Document Collaboration',
  description:
    'Design the architecture for a real-time collaborative document editor (similar to Google Docs). Multiple users should be able to edit the same document simultaneously, see each other\'s cursors, and resolve conflicts automatically. The system should work reliably even with intermittent network connectivity.',
  category: 'system-design',
  difficulty: 'advanced',
  constraints: [
    'Must support up to 20 concurrent editors per document',
    'Changes must appear on other users\' screens within 500ms',
    'Must handle offline editing and sync when reconnected',
    'Conflict resolution must be automatic — no manual merge required',
  ],
  evaluationHints: [
    'Should address CRDTs or Operational Transform as a conflict resolution strategy',
    'Should separate document content sync from presence/cursor data',
    'Should consider the WebSocket layer and how to scale it',
    'Should address offline support and eventual consistency',
    'Should mention document versioning or history',
  ],
  concepts: ['crdt', 'websockets', 'eventual-consistency', 'offline-first'],
};
