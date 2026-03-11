import type { Challenge } from '@/types/challenge';

export const challenge: Challenge = {
  slug: 'event-driven-redesign',
  title: 'Event-Driven Redesign',
  description:
    'You\'re maintaining an e-commerce order processing system. Currently, when a user places an order, a single synchronous flow handles payment processing, inventory update, email confirmation, analytics tracking, and shipping label generation — all in one request. If any step fails, the entire order fails. Redesign this using an event-driven architecture.',
  category: 'system-design',
  difficulty: 'intermediate',
  constraints: [
    'Payment must still be confirmed before the order is accepted',
    'Email and analytics failures must not block or cancel the order',
    'Each event handler must be idempotent — duplicate events must not cause duplicate side effects',
    'The system must support adding new subscribers (e.g., loyalty points) without modifying existing code',
  ],
  evaluationHints: [
    'Should clearly identify what events are emitted and which services subscribe',
    'Should justify mediator vs broker topology choice',
    'Should address failure isolation for each handler',
    'Should acknowledge and manage eventual consistency',
    'Should define the synchronous/asynchronous boundary explicitly',
    'Should address idempotency in event handlers',
  ],
  concepts: ['event-driven-architecture', 'mediator-vs-broker', 'eventual-consistency', 'idempotency', 'failure-isolation'],
};
