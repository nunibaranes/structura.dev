import { challenge as designUrlShortener } from '@/content/challenges/design-url-shortener';
import { challenge as frontendStateManagement } from '@/content/challenges/frontend-state-management';
import { challenge as separationOfConcerns } from '@/content/challenges/separation-of-concerns';
import { challenge as dataFetchingArchitecture } from '@/content/challenges/data-fetching-architecture';
import { challenge as errorHandlingArchitecture } from '@/content/challenges/error-handling-architecture';
import { challenge as realTimeCollaboration } from '@/content/challenges/real-time-collaboration';
import { challenge as designApiGateway } from '@/content/challenges/design-api-gateway';
import { challenge as designSystemArchitecture } from '@/content/challenges/design-system-architecture';
import type { Challenge } from '@/types/challenge';

export const challenges: Challenge[] = [
  designUrlShortener,
  frontendStateManagement,
  separationOfConcerns,
  dataFetchingArchitecture,
  errorHandlingArchitecture,
  realTimeCollaboration,
  designApiGateway,
  designSystemArchitecture,
];
