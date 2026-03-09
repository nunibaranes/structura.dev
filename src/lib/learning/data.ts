import { learning as designUrlShortener } from '@/content/learning/design-url-shortener';
import { learning as frontendStateManagement } from '@/content/learning/frontend-state-management';
import { learning as separationOfConcerns } from '@/content/learning/separation-of-concerns';
import { learning as dataFetchingArchitecture } from '@/content/learning/data-fetching-architecture';
import { learning as errorHandlingArchitecture } from '@/content/learning/error-handling-architecture';
import { learning as realTimeCollaboration } from '@/content/learning/real-time-collaboration';
import { learning as designApiGateway } from '@/content/learning/design-api-gateway';
import { learning as designSystemArchitecture } from '@/content/learning/design-system-architecture';
import type { LearningMaterial } from '@/types/challenge';

const learningMaterials: LearningMaterial[] = [
  designUrlShortener,
  frontendStateManagement,
  separationOfConcerns,
  dataFetchingArchitecture,
  errorHandlingArchitecture,
  realTimeCollaboration,
  designApiGateway,
  designSystemArchitecture,
];

export function getLearningMaterial(challengeSlug: string): LearningMaterial | undefined {
  return learningMaterials.find((m) => m.challengeSlug === challengeSlug);
}
