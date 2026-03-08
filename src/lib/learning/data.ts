import { learning as designUrlShortener } from '@/content/learning/design-url-shortener';
import { learning as frontendStateManagement } from '@/content/learning/frontend-state-management';
import type { LearningMaterial } from '@/types/challenge';

const learningMaterials: LearningMaterial[] = [
  designUrlShortener,
  frontendStateManagement,
];

export function getLearningMaterial(challengeSlug: string): LearningMaterial | undefined {
  return learningMaterials.find((m) => m.challengeSlug === challengeSlug);
}
