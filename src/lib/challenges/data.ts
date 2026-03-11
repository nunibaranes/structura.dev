import { challenge as componentBoundaries } from '@/content/challenges/component-boundaries';
import { challenge as separationOfConcerns } from '@/content/challenges/separation-of-concerns';
import { challenge as stateArchitecture } from '@/content/challenges/state-architecture';
import { challenge as dataFetchingArchitecture } from '@/content/challenges/data-fetching-architecture';
import { challenge as errorHandlingArchitecture } from '@/content/challenges/error-handling-architecture';
import { challenge as eventDrivenRedesign } from '@/content/challenges/event-driven-redesign';
import { challenge as designApiGateway } from '@/content/challenges/design-api-gateway';
import { challenge as serviceDecomposition } from '@/content/challenges/service-decomposition';
import type { Challenge } from '@/types/challenge';

export const challenges: Challenge[] = [
  componentBoundaries,
  separationOfConcerns,
  stateArchitecture,
  dataFetchingArchitecture,
  errorHandlingArchitecture,
  eventDrivenRedesign,
  designApiGateway,
  serviceDecomposition,
];
