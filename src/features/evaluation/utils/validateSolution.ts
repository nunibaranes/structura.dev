import type { UserSolution } from '@/types/challenge';

export function validateSolution(solution: UserSolution): string | null {
  if (!solution.components.trim()) {
    return 'Please describe the components in your architecture.';
  }
  if (!solution.dataFlow.trim()) {
    return 'Please describe how data flows through your system.';
  }
  return null;
}
