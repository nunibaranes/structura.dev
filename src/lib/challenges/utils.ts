import type { Challenge, ChallengeCategory, Difficulty } from '@/types/challenge';
import { challenges } from './data';

export function getChallengeBySlug(slug: string): Challenge | undefined {
  return challenges.find((c) => c.slug === slug);
}

export function getChallengesByCategory(category: ChallengeCategory): Challenge[] {
  return challenges.filter((c) => c.category === category);
}

export function getChallengesByDifficulty(difficulty: Difficulty): Challenge[] {
  return challenges.filter((c) => c.difficulty === difficulty);
}
