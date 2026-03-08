import { challenges } from '@/lib/challenges/data';
import { ChallengeCard } from '@/components/challenges/ChallengeCard';
import styles from './page.module.css';

export default function ChallengesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Architecture Challenges</h1>
        <p className={styles.subtitle}>
          Pick a challenge, design your solution, and get AI-powered feedback.
        </p>
      </div>
      <div className={styles.grid}>
        {challenges.map((challenge) => (
          <ChallengeCard key={challenge.slug} challenge={challenge} />
        ))}
      </div>
    </div>
  );
}
