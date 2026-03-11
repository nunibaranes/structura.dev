import type { LearningMaterial } from '@/types/challenge';

export const learning: LearningMaterial = {
  challengeSlug: 'event-driven-redesign',
  concepts: [
    {
      title: 'Event-Driven Architecture',
      explanation:
        'Instead of direct service-to-service calls, services emit events ("OrderPlaced") and other services react. This decouples the order flow from each downstream concern — adding a loyalty points service doesn\'t require changing the order service.',
    },
    {
      title: 'Mediator vs Broker Topology',
      explanation:
        'Mediator: a central orchestrator routes events and manages flow — gives control and visibility. Broker: events go to a channel and any subscriber reacts — gives flexibility and independence. The tradeoff is control vs decoupling.',
    },
    {
      title: 'Eventual Consistency',
      explanation:
        'In async systems, not everything is immediately consistent. The order is confirmed before the shipping label exists. The architecture must explicitly handle this gap — users see "Order placed, shipping details coming soon."',
    },
    {
      title: 'Idempotency',
      explanation:
        'Events may be delivered more than once due to retries or reprocessing. Each handler must produce the same result whether it processes an event once or three times. Without idempotency, duplicate charges or emails are inevitable.',
    },
  ],
  commonMistakes: [
    {
      mistake: 'Making everything asynchronous',
      why: 'Payment validation should probably stay synchronous — you need to confirm the charge before accepting the order. Not every step benefits from events. Define the sync/async boundary intentionally.',
    },
    {
      mistake: 'No dead letter queue for failed events',
      why: 'Failed events that are silently dropped mean lost orders or missing emails. Always plan for events that can\'t be processed — route them to a dead letter queue for investigation.',
    },
    {
      mistake: 'Ignoring event ordering dependencies',
      why: 'Some events have causal dependencies — shipping can\'t happen before payment succeeds. If your architecture doesn\'t enforce ordering where it matters, you\'ll get impossible states.',
    },
    {
      mistake: 'Tightly coupling services via event payloads',
      why: 'If the email service needs to understand inventory internals from the event payload, the services are coupled through their data contract. Keep event payloads focused and minimal.',
    },
  ],
  quickCheck: [
    {
      question:
        'The email service is down for 10 minutes. A customer places an order. What should happen?',
      options: [
        'The order fails because email confirmation can\'t be sent',
        'The order succeeds and the email is sent when the service recovers',
        'The order succeeds but the customer never gets an email',
        'The system retries the entire order flow every 30 seconds',
      ],
      correctIndex: 1,
      explanation:
        'Email is a non-critical async subscriber. The order succeeds immediately. The email event sits in the queue and is processed when the email service recovers. No data is lost.',
    },
    {
      question:
        'An event handler processes the same "OrderPlaced" event twice due to a network retry. What should happen?',
      options: [
        'The customer is charged twice',
        'The system throws a duplicate error',
        'The handler produces the same result as the first time — no duplicate side effects',
        'The second event is automatically filtered by the message broker',
      ],
      correctIndex: 2,
      explanation:
        'Handlers must be idempotent. Processing the same event twice should produce the same result — check if the action was already performed (e.g., payment already recorded) before executing.',
    },
    {
      question:
        'You\'re choosing between mediator and broker topology. You need strict ordering and visibility into the full order flow. Which fits better?',
      options: [
        'Broker — more flexible and decoupled',
        'Mediator — provides central control and flow visibility',
        'Either works equally well for this case',
        'Neither — use synchronous calls instead',
      ],
      correctIndex: 1,
      explanation:
        'A mediator topology provides a central orchestrator that controls event routing and flow order. This gives you the ordering guarantees and observability you need — at the cost of a central dependency.',
    },
  ],
};
