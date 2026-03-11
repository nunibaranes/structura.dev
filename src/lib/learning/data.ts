import { learning as componentBoundaries } from '@/content/learning/component-boundaries';
import { learning as separationOfConcerns } from '@/content/learning/separation-of-concerns';
import { learning as stateArchitecture } from '@/content/learning/state-architecture';
import { learning as dataFetchingArchitecture } from '@/content/learning/data-fetching-architecture';
import { learning as errorHandlingArchitecture } from '@/content/learning/error-handling-architecture';
import { learning as eventDrivenRedesign } from '@/content/learning/event-driven-redesign';
import { learning as designApiGateway } from '@/content/learning/design-api-gateway';
import { learning as serviceDecomposition } from '@/content/learning/service-decomposition';
import type { LearningMaterial } from '@/types/challenge';

const learningMaterials: LearningMaterial[] = [
  componentBoundaries,
  separationOfConcerns,
  stateArchitecture,
  dataFetchingArchitecture,
  errorHandlingArchitecture,
  eventDrivenRedesign,
  designApiGateway,
  serviceDecomposition,
];

export function getLearningMaterial(challengeSlug: string): LearningMaterial | undefined {
  return learningMaterials.find((m) => m.challengeSlug === challengeSlug);
}
