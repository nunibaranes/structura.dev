import type { Challenge } from '@/types/challenge';

export const challenge: Challenge = {
  slug: 'design-api-gateway',
  title: 'API Gateway Design',
  description:
    'Your company runs 6 microservices behind a single load balancer. Mobile and web clients make direct calls to individual services. Authentication is duplicated across services, there\'s no rate limiting, and a single slow service causes cascading timeouts. Design an API gateway layer that centralizes cross-cutting concerns while keeping backend services decoupled.',
  category: 'system-design',
  difficulty: 'intermediate',
  constraints: [
    'The gateway must not become a single point of failure or a performance bottleneck',
    'Backend teams must be able to deploy their services independently',
    'Mobile clients need aggregated responses — one request per screen, not five',
    'A failing downstream service must not cascade failures to other services',
  ],
  evaluationHints: [
    'Should centralize authentication/authorization at the gateway level',
    'Should address rate limiting and circuit breaker patterns',
    'Should address request aggregation (BFF pattern) for mobile clients',
    'Should ensure the gateway doesn\'t become a monolithic bottleneck with business logic',
    'Should consider how to handle partial failures when aggregating responses',
  ],
  concepts: ['api-gateway', 'circuit-breaker', 'bff-pattern', 'rate-limiting'],
};
