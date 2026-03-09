import type { LearningMaterial } from '@/types/challenge';

export const learning: LearningMaterial = {
  challengeSlug: 'design-api-gateway',
  concepts: [
    {
      title: 'API Gateway Pattern',
      explanation:
        'An API gateway sits between clients and backend services, providing a single entry point. It handles cross-cutting concerns like authentication, rate limiting, and request routing — so individual services don\'t have to. Think of it as a reverse proxy with intelligence.',
    },
    {
      title: 'Rate Limiting and Throttling',
      explanation:
        'Rate limiting protects your services from abuse and overload. Common strategies: fixed window (simple but bursty), sliding window (smoother), and token bucket (allows bursts up to a limit). The gateway enforces limits per client, per endpoint, or globally.',
    },
    {
      title: 'Request Aggregation (BFF Pattern)',
      explanation:
        'Mobile clients often need data from multiple services for a single screen. Instead of making 5 API calls from the client, the gateway aggregates them into one response. This Backend-for-Frontend (BFF) pattern reduces latency and simplifies client code.',
    },
    {
      title: 'Circuit Breaker Pattern',
      explanation:
        'When a downstream service is failing, the gateway can stop sending requests to it (open circuit) instead of waiting for timeouts. After a cool-down period, it sends a test request (half-open). If it succeeds, traffic resumes. This prevents cascading failures across services.',
    },
  ],
  commonMistakes: [
    {
      mistake: 'Making the gateway a single point of failure',
      why: 'If all traffic goes through one gateway instance and it goes down, everything is down. The gateway itself needs redundancy, health checks, and failover — the same resilience you\'d design for any critical service.',
    },
    {
      mistake: 'Putting business logic in the gateway',
      why: 'The gateway should handle routing, auth, and rate limiting — not business rules. If your gateway knows about order processing or user preferences, it becomes a monolith bottleneck that every team depends on.',
    },
    {
      mistake: 'No timeout or circuit breaker on downstream calls',
      why: 'Without timeouts, a slow downstream service causes the gateway to hold open connections and eventually exhaust resources. Always set timeouts and consider circuit breakers for dependencies.',
    },
  ],
  quickCheck: [
    {
      question: 'A mobile app needs data from 3 different microservices to render one screen. What gateway pattern reduces client-side complexity?',
      options: [
        'Rate limiting per service',
        'Request aggregation (BFF pattern)',
        'Circuit breaker on each service',
        'Load balancing across services',
      ],
      correctIndex: 1,
      explanation:
        'The BFF (Backend-for-Frontend) pattern lets the gateway aggregate multiple service calls into a single response. The client makes one request instead of three, reducing latency and simplifying mobile code.',
    },
    {
      question: 'A downstream service starts returning 500 errors on 80% of requests. What should the gateway do?',
      options: [
        'Retry every failed request immediately',
        'Return 500 to the client for each failure',
        'Open a circuit breaker and return a fallback or cached response',
        'Increase the timeout to give the service more time',
      ],
      correctIndex: 2,
      explanation:
        'A circuit breaker stops sending traffic to a failing service, preventing resource exhaustion and cascading failures. Return a fallback response (cached data, degraded experience) while the service recovers.',
    },
  ],
};
