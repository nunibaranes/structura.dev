import type { LearningMaterial } from '@/types/challenge';

export const learning: LearningMaterial = {
  challengeSlug: 'real-time-collaboration',
  concepts: [
    {
      title: 'Operational Transformation (OT) vs CRDTs',
      explanation:
        'OT transforms concurrent operations against each other so they produce a consistent result (used by Google Docs). CRDTs are data structures that merge automatically without conflicts (used by Figma). OT requires a central server; CRDTs can work peer-to-peer but are harder to implement for rich data types.',
    },
    {
      title: 'Conflict Resolution Strategies',
      explanation:
        'When two users edit the same content simultaneously, the system must resolve the conflict. Options: last-write-wins (simple but loses data), operational transformation (preserves intent), or CRDTs (mathematically guaranteed convergence). The right choice depends on data type and consistency requirements.',
    },
    {
      title: 'WebSocket Architecture',
      explanation:
        'Real-time collaboration needs persistent bidirectional communication. WebSockets provide this, but you need to handle connection drops, reconnection with state sync, and message ordering. A presence channel (who\'s online, cursor positions) is separate from the document sync channel.',
    },
    {
      title: 'Optimistic Updates with Reconciliation',
      explanation:
        'For a responsive feel, apply the user\'s changes locally before the server confirms them. If the server rejects or transforms the change, reconcile by rolling back and replaying. This pattern makes collaboration feel instant even with network latency.',
    },
  ],
  commonMistakes: [
    {
      mistake: 'Using simple last-write-wins for concurrent edits',
      why: 'Last-write-wins silently discards other users\' changes. In a collaborative editor, this means work gets lost without anyone noticing. Use OT or CRDTs for content that multiple users edit simultaneously.',
    },
    {
      mistake: 'Ignoring offline and reconnection scenarios',
      why: 'Users lose connectivity. If your architecture doesn\'t handle offline edits and state reconciliation on reconnect, users will see data loss or conflicts when they come back online.',
    },
    {
      mistake: 'Sending full document state on every change',
      why: 'Sending the entire document on each keystroke wastes bandwidth and doesn\'t scale. Send operations (deltas) instead — "insert \'a\' at position 5" is far smaller than the full document.',
    },
  ],
  quickCheck: [
    {
      question: 'Two users simultaneously type at the same position in a document. What approach preserves both users\' changes?',
      options: [
        'Last-write-wins based on timestamp',
        'Lock the document so only one user can edit at a time',
        'Operational Transformation or CRDTs',
        'Queue edits and apply them one at a time',
      ],
      correctIndex: 2,
      explanation:
        'OT and CRDTs are designed specifically for this scenario. OT transforms the operations so both changes are applied consistently. CRDTs merge automatically. Both preserve user intent without locking.',
    },
    {
      question: 'A user goes offline and makes 10 edits. When they reconnect, what should happen?',
      options: [
        'Discard offline edits and sync the latest server state',
        'Replace the server state with the offline version',
        'Sync offline edits with the server and resolve any conflicts',
        'Show an error and ask the user to refresh',
      ],
      correctIndex: 2,
      explanation:
        'The system should sync offline edits with the current server state, resolving conflicts through OT, CRDTs, or a merge strategy. Discarding edits loses work; replacing server state loses others\' work.',
    },
  ],
};
