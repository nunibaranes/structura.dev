import type { Difficulty } from '@/types/challenge';
import styles from './Badge.module.css';

interface DifficultyBadgeProps {
  difficulty: Difficulty;
}

export function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  return <span className={`${styles.badge} ${styles[difficulty]}`}>{difficulty}</span>;
}

interface CategoryBadgeProps {
  category: string;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const label = category.replace(/-/g, ' ');
  return <span className={`${styles.badge} ${styles.category}`}>{label}</span>;
}
