import type { Challenge } from '@/types/challenge';

export const challenge: Challenge = {
  slug: 'design-api-gateway',
  title: 'Design an API Gateway',
  description:
    'Your company has 12 microservices, each with its own REST API. The frontend team is frustrated — they need to call 4-5 services per page and handle authentication, rate limiting, and error handling differently for each one. Design an API gateway that provides a unified interface for the frontend while keeping the backend services decoupled.',
  category: 'api-design',
  difficulty: 'advanced',
  constraints: [
    'The gateway must not become a bottleneck — current peak is 5K requests/sec',
    'Backend teams must be able to deploy their services independently',
    'The frontend needs a single authentication flow',
    'Some endpoints require real-time data, others can be cached aggressively',
  ],
  evaluationHints: [
    'Should address request routing and service discovery',
    'Should consider authentication/authorization at the gateway level',
    'Should mention rate limiting and circuit breaker patterns',
    'Should address response aggregation (BFF pattern) vs simple proxying',
    'Should consider how to handle partial failures when aggregating',
  ],
  concepts: ['api-gateway', 'microservices', 'authentication', 'rate-limiting'],
};
