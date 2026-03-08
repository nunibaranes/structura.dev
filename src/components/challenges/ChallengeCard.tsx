import Link from 'next/link';
import type { Challenge } from '@/types/challenge';
import { DifficultyBadge, CategoryBadge } from '@/components/ui/Badge';
import styles from './ChallengeCard.module.css';

interface ChallengeCardProps {
  challenge: Challenge;
}

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  return (
    <Link href={`/challenges/${challenge.slug}`} className={styles.card}>
      <div className={styles.badges}>
        <DifficultyBadge difficulty={challenge.difficulty} />
        <CategoryBadge category={challenge.category} />
      </div>
      <h3 className={styles.title}>{challenge.title}</h3>
      <p className={styles.description}>{challenge.description}</p>
      <div className={styles.concepts}>
        {challenge.concepts.map((concept) => (
          <span key={concept} className={styles.concept}>
            {concept}
          </span>
        ))}
      </div>
    </Link>
  );
}
