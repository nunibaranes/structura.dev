import type { Challenge } from '@/types/challenge';
import { DifficultyBadge, CategoryBadge } from '@/components/ui/Badge';
import styles from './ChallengeBrief.module.css';

interface ChallengeBriefProps {
  challenge: Challenge;
}

export function ChallengeBrief({ challenge }: ChallengeBriefProps) {
  return (
    <section className={styles.brief}>
      <div className={styles.header}>
        <div className={styles.badges}>
          <DifficultyBadge difficulty={challenge.difficulty} />
          <CategoryBadge category={challenge.category} />
        </div>
        <h1 className={styles.title}>{challenge.title}</h1>
      </div>
      <p className={styles.description}>{challenge.description}</p>
      <div>
        <h2 className={styles.constraintsTitle}>Constraints</h2>
        <div className={styles.constraintsList}>
          {challenge.constraints.map((constraint) => (
            <p key={constraint} className={styles.constraint}>
              {constraint}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
