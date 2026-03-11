import type { LearningMaterial } from '@/types/challenge';

export const learning: LearningMaterial = {
  challengeSlug: 'service-decomposition',
  concepts: [
    {
      title: 'Bounded Context',
      explanation:
        'A Domain-Driven Design concept: each service owns a well-defined domain with its own language and models. "User" in Billing means payment method and plan. "User" in Content means author and permissions. They\'re different models that shouldn\'t be forced into one.',
    },
    {
      title: 'Strangler Fig Pattern',
      explanation:
        'Migrate incrementally by routing new functionality to services while the monolith handles existing features. Over time, the monolith shrinks. No big-bang rewrite — the riskiest approach in software engineering.',
    },
    {
      title: 'Data Ownership',
      explanation:
        'Each service owns its data store. No shared databases. If Billing needs user data, it requests it from User Management via API — it doesn\'t query the users table directly. Shared databases destroy the independence services are meant to provide.',
    },
    {
      title: 'Communication Patterns',
      explanation:
        'Synchronous (REST/gRPC) for real-time needs where you need an immediate response. Asynchronous (events/messages) for eventual consistency where speed matters more than immediacy. The wrong choice creates either tight coupling or data staleness.',
    },
  ],
  commonMistakes: [
    {
      mistake: 'Shared database between services',
      why: 'A shared database destroys the independence you\'re trying to create. Any schema change in one service can break another. Each service needs its own data store, even if that means some data duplication.',
    },
    {
      mistake: 'Big-bang migration — rewriting everything at once',
      why: 'This is how large-scale projects fail. Use the strangler fig pattern: extract one service, stabilize it, then extract the next. The monolith keeps running throughout.',
    },
    {
      mistake: 'Extracting too many services too fast',
      why: '4 domains doesn\'t mean 4 services on day one. Start with the most painful coupling (analytics breaking billing). Extract one, learn from it, then continue.',
    },
    {
      mistake: 'Drawing service boundaries along technical layers',
      why: 'A "database service" or "API service" is not a good boundary. Services should map to business domains (Billing, Content) — each owning its full stack from API to database.',
    },
  ],
  quickCheck: [
    {
      question:
        'Analytics and Billing share a database table. A schema change in Analytics recently broke Billing. What\'s the first step?',
      options: [
        'Add more tests for schema changes',
        'Create a shared schema versioning process',
        'Define data ownership — one service owns the table, the other accesses via API',
        'Move both services to a new shared database with better isolation',
      ],
      correctIndex: 2,
      explanation:
        'The root cause is shared ownership. Define which service owns the table. The other service should access that data through an API, not a direct database query. This eliminates the schema coupling.',
    },
    {
      question:
        'You extract Billing as a separate service. It needs user email addresses for sending receipts. How should it get them?',
      options: [
        'Query the monolith\'s users table directly',
        'Copy the users table into Billing\'s database',
        'Call User Management\'s API to request the email',
        'Store email addresses in both services',
      ],
      correctIndex: 2,
      explanation:
        'Billing should call User Management\'s API. Direct database access creates hidden coupling. Duplicating the full table is wasteful. An API call makes the dependency explicit and respects data ownership.',
    },
    {
      question:
        'The team wants to extract all 4 domains into services simultaneously. What\'s the biggest risk?',
      options: [
        'Not enough engineers to staff 4 migration projects',
        'Too much change at once — integration issues multiply exponentially',
        'The monolith will be too small to be useful',
        'Services will have identical code',
      ],
      correctIndex: 1,
      explanation:
        'Extracting everything at once means every service boundary is new and untested simultaneously. Integration issues compound. Extract one service, stabilize, learn, then extract the next.',
    },
  ],
};
